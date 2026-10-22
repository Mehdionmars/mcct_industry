from odoo import api, fields, models
from odoo.exceptions import UserError

ACTIVITIES = [
    ('charpente', "Charpente métallique"),
    ('chaudronnerie', "Chaudronnerie"),
    ('tuyauterie', "Tuyauterie industrielle"),
    ('installation', "Installation d'équipements"),
    ('maintenance', "Maintenance industrielle"),
    ('construction', "Construction / génie civil"),
    ('autre', "Autre"),
]

PHASES = [
    ('etude', "Étude & plans"),
    ('approvisionnement', "Approvisionnement"),
    ('fabrication', "Fabrication atelier"),
    ('traitement', "Traitement de surface"),
    ('livraison', "Livraison"),
    ('montage', "Montage sur site"),
    ('essais', "Essais & mise en service"),
    ('reception_provisoire', "Réception provisoire"),
    ('reception_definitive', "Réception définitive"),
]

# Situations prises en compte dans les cumuls (approuvées par le client ou facturées).
VALIDATED_STATES = ('approved', 'invoiced')


class ProjectProject(models.Model):
    _inherit = 'project.project'

    mcct_is_site = fields.Boolean("Chantier", default=False, index=True)
    mcct_activity = fields.Selection(ACTIVITIES, string="Activité", tracking=True)
    mcct_phase = fields.Selection(
        PHASES, string="Phase", default='etude', tracking=True, group_expand=True,
        help="Étape en cours, visible par le client sur son portail.")
    mcct_site_address = fields.Char("Adresse du chantier")
    mcct_site_city = fields.Char("Ville du chantier")
    mcct_contract_ref = fields.Char("Réf. marché / BC client", tracking=True)
    mcct_contract_date = fields.Date("Date du marché")
    mcct_contract_amount = fields.Monetary(
        "Montant du marché HT", currency_field='currency_id',
        compute='_compute_mcct_contract_amount', store=True, readonly=False, tracking=True,
        help="Repris du devis confirmé lorsqu'il existe ; modifiable (avenants).")
    mcct_progress = fields.Float(
        "Avancement (%)", compute='_compute_mcct_progress', store=True, readonly=False,
        aggregator='avg',
        help="Calculé à partir de la dernière situation approuvée ; modifiable.")

    mcct_retention_rate = fields.Float(
        "Retenue de garantie (%)",
        default=lambda self: self.env.company.mcct_retention_rate)
    mcct_retention_cap_rate = fields.Float(
        "Plafond retenue (% du marché)",
        default=lambda self: self.env.company.mcct_retention_cap_rate)
    mcct_retention_released = fields.Boolean("Retenue libérée", copy=False, tracking=True)
    mcct_advance_rate = fields.Float(
        "Avance sur travaux (%)",
        help="Avance facturée au démarrage puis déduite au même taux sur chaque situation.")

    mcct_date_reception_provisoire = fields.Date("Réception provisoire", copy=False, tracking=True)
    mcct_date_reception_definitive = fields.Date("Réception définitive", copy=False, tracking=True)

    mcct_situation_ids = fields.One2many('mcct.situation', 'project_id', string="Situations")
    mcct_site_report_ids = fields.One2many('mcct.site.report', 'project_id', string="Rapports de chantier")
    mcct_invoice_ids = fields.One2many(
        'account.move', 'mcct_project_id', string="Factures chantier",
        domain=[('move_type', 'in', ('out_invoice', 'out_refund'))])
    mcct_document_ids = fields.Many2many(
        'ir.attachment', 'mcct_project_document_rel', 'project_id', 'attachment_id',
        string="Documents partagés avec le client",
        help="Plans, PV, fiches techniques… téléchargeables depuis le portail client.")

    mcct_situation_count = fields.Integer(compute='_compute_mcct_counts')
    mcct_site_report_count = fields.Integer(compute='_compute_mcct_counts')
    mcct_invoice_count = fields.Integer(compute='_compute_mcct_invoice_count', compute_sudo=True)

    mcct_amount_done = fields.Monetary(
        "Travaux réalisés HT", compute='_compute_mcct_finance', compute_sudo=True)
    mcct_amount_remaining = fields.Monetary(
        "Reste à réaliser HT", compute='_compute_mcct_finance', compute_sudo=True)
    mcct_amount_invoiced = fields.Monetary(
        "Facturé TTC", compute='_compute_mcct_finance', compute_sudo=True)
    mcct_amount_paid = fields.Monetary(
        "Encaissé", compute='_compute_mcct_finance', compute_sudo=True)
    mcct_amount_residual = fields.Monetary(
        "Reste à encaisser", compute='_compute_mcct_finance', compute_sudo=True)
    mcct_retention_held = fields.Monetary(
        "Retenue de garantie détenue", compute='_compute_mcct_finance', compute_sudo=True)
    mcct_advance_amount = fields.Monetary(
        "Avance prévue HT", compute='_compute_mcct_finance', compute_sudo=True)
    mcct_advance_invoiced = fields.Monetary(
        "Avance facturée HT", compute='_compute_mcct_finance', compute_sudo=True)
    mcct_advance_remaining = fields.Monetary(
        "Avance restant à déduire HT", compute='_compute_mcct_finance', compute_sudo=True)

    # ------------------------------------------------------------------
    # Calculs
    # ------------------------------------------------------------------
    @api.depends('sale_line_id.order_id.amount_untaxed', 'sale_line_id.order_id.state')
    def _compute_mcct_contract_amount(self):
        for project in self:
            order = project.sale_line_id.order_id
            if order and order.state == 'sale':
                project.mcct_contract_amount = order.amount_untaxed

    @api.depends('mcct_situation_ids.state', 'mcct_situation_ids.progress')
    def _compute_mcct_progress(self):
        for project in self:
            last = project._mcct_last_validated_situation()
            if last:
                project.mcct_progress = last.progress

    @api.depends('mcct_situation_ids', 'mcct_site_report_ids')
    def _compute_mcct_counts(self):
        for project in self:
            project.mcct_situation_count = len(project.mcct_situation_ids)
            project.mcct_site_report_count = len(project.mcct_site_report_ids)

    @api.depends('mcct_invoice_ids')
    def _compute_mcct_invoice_count(self):
        for project in self:
            project.mcct_invoice_count = len(project.mcct_invoice_ids)

    @api.depends(
        'mcct_contract_amount', 'mcct_advance_rate', 'mcct_retention_released',
        'mcct_situation_ids.state', 'mcct_situation_ids.amount_cumulative',
        'mcct_situation_ids.retention_amount', 'mcct_situation_ids.advance_deduction',
        'mcct_invoice_ids.state', 'mcct_invoice_ids.amount_total_signed',
        'mcct_invoice_ids.amount_residual_signed', 'mcct_invoice_ids.amount_untaxed_signed',
    )
    def _compute_mcct_finance(self):
        for project in self:
            validated = project.mcct_situation_ids.filtered(lambda s: s.state in VALIDATED_STATES)
            last = project._mcct_last_validated_situation()
            invoices = project.mcct_invoice_ids.filtered(lambda m: m.state == 'posted')
            advance_invoices = invoices.filtered('mcct_is_advance')

            done = last.amount_cumulative if last else 0.0
            project.mcct_amount_done = done
            project.mcct_amount_remaining = max(project.mcct_contract_amount - done, 0.0)
            project.mcct_amount_invoiced = sum(invoices.mapped('amount_total_signed'))
            project.mcct_amount_residual = sum(invoices.mapped('amount_residual_signed'))
            project.mcct_amount_paid = project.mcct_amount_invoiced - project.mcct_amount_residual
            project.mcct_retention_held = (
                0.0 if project.mcct_retention_released
                else sum(validated.mapped('retention_amount')))
            project.mcct_advance_amount = project.mcct_contract_amount * project.mcct_advance_rate / 100.0
            project.mcct_advance_invoiced = sum(advance_invoices.mapped('amount_untaxed_signed'))
            project.mcct_advance_remaining = max(
                project.mcct_advance_invoiced - sum(validated.mapped('advance_deduction')), 0.0)

    def _mcct_last_validated_situation(self):
        self.ensure_one()
        validated = self.mcct_situation_ids.filtered(lambda s: s.state in VALIDATED_STATES)
        return validated.sorted(lambda s: (s.number, s.id))[-1:] if validated else validated

    def _mcct_contract_sale_lines(self):
        """Lignes des commandes confirmées rattachées au chantier (bordereau des prix)."""
        self.ensure_one()
        orders = self.env['sale.order'].search([
            ('project_id', '=', self.id), ('state', '=', 'sale'),
        ])
        if self.sale_line_id.order_id.state == 'sale':
            orders |= self.sale_line_id.order_id
        advance = self.env.ref('mcct_industry.product_advance', raise_if_not_found=False)
        return orders.order_line.filtered(
            lambda line: not line.is_downpayment
            and (not advance or line.product_id != advance.product_variant_id)
        ).sorted(lambda line: (line.order_id.id, line.sequence, line.id))

    def _mcct_phase_steps(self):
        """Étapes pour la frise du portail : [(clé, libellé, 'done'|'current'|'todo')]."""
        self.ensure_one()
        keys = [key for key, _label in PHASES]
        current = keys.index(self.mcct_phase) if self.mcct_phase in keys else -1
        steps = []
        for index, (key, label) in enumerate(PHASES):
            if index < current or (index == current and key == 'reception_definitive'):
                status = 'done'
            elif index == current:
                status = 'current'
            else:
                status = 'todo'
            steps.append((key, label, status))
        return steps

    # ------------------------------------------------------------------
    # Actions
    # ------------------------------------------------------------------
    def _mcct_action(self, xmlid, extra_context=None):
        self.ensure_one()
        action = self.env['ir.actions.act_window']._for_xml_id(xmlid)
        action['domain'] = [('project_id', '=', self.id)]
        action['context'] = {'default_project_id': self.id, **(extra_context or {})}
        return action

    def action_mcct_view_situations(self):
        return self._mcct_action('mcct_industry.action_mcct_situation')

    def action_mcct_view_site_reports(self):
        return self._mcct_action('mcct_industry.action_mcct_site_report')

    def action_mcct_view_invoices(self):
        self.ensure_one()
        action = self.env['ir.actions.act_window']._for_xml_id('account.action_move_out_invoice_type')
        action['domain'] = [('mcct_project_id', '=', self.id),
                            ('move_type', 'in', ('out_invoice', 'out_refund'))]
        action['context'] = {'default_move_type': 'out_invoice',
                             'default_mcct_project_id': self.id,
                             'default_partner_id': self.partner_id.id}
        return action

    def action_mcct_new_situation(self):
        self.ensure_one()
        situation = self.env['mcct.situation'].create({'project_id': self.id})
        return {
            'type': 'ir.actions.act_window',
            'res_model': 'mcct.situation',
            'res_id': situation.id,
            'view_mode': 'form',
            'target': 'current',
        }

    def action_mcct_invoice_advance(self):
        """Facture d'avance sur travaux (brouillon), déduite ensuite des situations."""
        self.ensure_one()
        if not self.partner_id:
            raise UserError("Renseignez le client du chantier avant de facturer l'avance.")
        if self.mcct_advance_rate <= 0 or not self.mcct_contract_amount:
            raise UserError("Renseignez le montant du marché et le taux d'avance.")
        already = sum(self.mcct_invoice_ids.filtered(
            lambda m: m.mcct_is_advance and m.state != 'cancel').mapped('amount_untaxed_signed'))
        amount = self.currency_id.round(self.mcct_advance_amount - already)
        if amount <= 0:
            raise UserError("L'avance prévue est déjà entièrement facturée.")
        product = self.env.ref('mcct_industry.product_advance').product_variant_id
        company = self.company_id or self.env.company
        invoice = self.env['account.move'].with_company(company).create({
            'move_type': 'out_invoice',
            'partner_id': self.partner_id.address_get(['invoice'])['invoice'],
            'mcct_project_id': self.id,
            'mcct_is_advance': True,
            'invoice_origin': self.name,
            'ref': self.mcct_contract_ref or False,
            'invoice_line_ids': [(0, 0, {
                'product_id': product.id,
                'name': "Avance sur travaux (%s %%) — %s" % (
                    f"{self.mcct_advance_rate:g}", self.name),
                'quantity': 1.0,
                'price_unit': amount,
                'analytic_distribution': self._mcct_analytic_distribution(),
            })],
        })
        return {
            'type': 'ir.actions.act_window',
            'res_model': 'account.move',
            'res_id': invoice.id,
            'view_mode': 'form',
            'target': 'current',
        }

    def action_mcct_release_retention(self):
        for project in self:
            if not project.mcct_date_reception_definitive:
                raise UserError("Renseignez la date de réception définitive avant de libérer la retenue.")
            project.mcct_retention_released = True
            project.message_post(body="Retenue de garantie libérée (réception définitive du %s)." % (
                project.mcct_date_reception_definitive.strftime('%d/%m/%Y')))

    def action_mcct_open_portal(self):
        self.ensure_one()
        return {
            'type': 'ir.actions.act_url',
            'url': '/my/chantiers/%s' % self.id,
            'target': 'new',
        }

    def _mcct_analytic_distribution(self):
        self.ensure_one()
        return {str(self.account_id.id): 100} if self.account_id else False
