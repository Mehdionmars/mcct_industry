from odoo import api, fields, models
from odoo.exceptions import UserError

from ..cities import CITIES, find_city, normalize

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
RECEIVED_PHASES = ('reception_provisoire', 'reception_definitive')
# Échéancier proposé par défaut : (désignation, % du marché, phase déclenchante).
STANDARD_SCHEDULE = [
    ("Avance à la commande", 30.0, False),
    ("À la livraison sur site", 40.0, 'livraison'),
    ("À la réception provisoire", 20.0, 'reception_provisoire'),
    ("À la réception définitive", 10.0, 'reception_definitive'),
]
# Repères affichés en gris sur la carte pour s'orienter.
MAP_LANDMARKS = ('Tanger', 'Rabat', 'Casablanca', 'Fès', 'Oujda', 'Marrakech', 'Agadir',
                 'Errachidia', 'Laâyoune', 'Dakhla')


class ProjectProject(models.Model):
    _inherit = 'project.project'

    mcct_is_site = fields.Boolean("Chantier", default=False, index=True)
    mcct_activity = fields.Selection(ACTIVITIES, string="Activité", tracking=True)
    mcct_phase = fields.Selection(
        PHASES, string="Phase", default='etude', tracking=True, group_expand=True,
        help="Étape en cours, visible par le client sur son portail.")
    mcct_site_address = fields.Char("Adresse du chantier")
    mcct_site_city = fields.Char("Ville du chantier")
    mcct_latitude = fields.Float(
        "Latitude", digits=(10, 6),
        help="Facultatif : position exacte du chantier. Sinon, la carte utilise la ville.")
    mcct_longitude = fields.Float("Longitude", digits=(10, 6))
    mcct_map_city = fields.Char(
        "Ville sur la carte", compute='_compute_mcct_map_city',
        help="Ville reconnue pour la carte des chantiers.")
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
    mcct_billing_mode = fields.Selection(
        [('situations', "Situations de travaux (au métré)"),
         ('milestones', "Échéancier de paiement")],
        string="Mode de facturation", default='situations', required=True, tracking=True,
        help="Situations : facturation à l'avancement mesuré. Échéancier : facturation aux "
             "échéances prévues au marché (à la commande, à la livraison, à la réception…).")
    mcct_milestone_ids = fields.One2many(
        'mcct.payment.milestone', 'project_id', string="Échéancier de paiement", copy=True)
    mcct_milestone_rate_total = fields.Float(
        "Total de l'échéancier (%)", compute='_compute_mcct_milestones')
    mcct_milestone_due_count = fields.Integer(
        "Échéances à facturer", compute='_compute_mcct_milestones')
    mcct_milestone_amount_paid = fields.Monetary(
        "Échéances encaissées", compute='_compute_mcct_milestones')
    mcct_milestone_amount_total = fields.Monetary(
        "Total des échéances TTC", compute='_compute_mcct_milestones')
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

    mcct_equipment_ids = fields.One2many(
        'maintenance.equipment', 'mcct_project_id', string="Matériel sur le chantier")
    mcct_equipment_assignment_ids = fields.One2many(
        'mcct.equipment.assignment', 'project_id', string="Affectations de matériel")
    mcct_equipment_count = fields.Integer(
        compute='_compute_mcct_equipment', compute_sudo=True)
    mcct_equipment_cost = fields.Monetary(
        "Coût du matériel", compute='_compute_mcct_equipment', compute_sudo=True,
        help="Jours d'affectation × coût journalier de chaque matériel, engin ou machine.")

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

    @api.depends('mcct_site_city')
    def _compute_mcct_map_city(self):
        for project in self:
            project.mcct_map_city = find_city(project.mcct_site_city) or False

    @api.depends('mcct_milestone_ids.rate', 'mcct_milestone_ids.state',
                 'mcct_milestone_ids.amount_untaxed', 'mcct_milestone_ids.phase_reached',
                 'mcct_milestone_ids.date_planned')
    def _compute_mcct_milestones(self):
        for project in self:
            milestones = project.mcct_milestone_ids
            project.mcct_milestone_rate_total = sum(milestones.mapped('rate'))
            project.mcct_milestone_due_count = len(milestones.filtered(lambda m: m.display_state == 'due'))
            project.mcct_milestone_amount_paid = sum(milestones.mapped('amount_paid'))
            project.mcct_milestone_amount_total = sum(milestones.mapped('amount_total'))

    @api.depends('mcct_equipment_ids', 'mcct_equipment_assignment_ids.cost')
    def _compute_mcct_equipment(self):
        for project in self:
            project.mcct_equipment_count = len(project.mcct_equipment_ids)
            project.mcct_equipment_cost = sum(project.mcct_equipment_assignment_ids.mapped('cost'))

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

    def action_mcct_view_equipment(self):
        self.ensure_one()
        action = self.env['ir.actions.act_window']._for_xml_id('mcct_industry.action_mcct_equipment')
        action['domain'] = [('mcct_project_id', '=', self.id)]
        action['context'] = {'default_mcct_project_id': self.id}
        return action

    def action_mcct_view_invoices(self):
        self.ensure_one()
        action = self.env['ir.actions.act_window']._for_xml_id('account.action_move_out_invoice_type')
        action['domain'] = [('mcct_project_id', '=', self.id),
                            ('move_type', 'in', ('out_invoice', 'out_refund'))]
        action['context'] = {'default_move_type': 'out_invoice',
                             'default_mcct_project_id': self.id,
                             'default_partner_id': self.partner_id.id}
        return action

    def write(self, vals):
        if 'mcct_billing_mode' in vals:
            self._mcct_check_billing_mode_change(vals['mcct_billing_mode'])
        due_before = {}
        if 'mcct_phase' in vals:
            due_before = {project.id: project.mcct_milestone_ids.filtered('phase_reached')
                          for project in self}
        result = super().write(vals)
        if due_before:
            for project in self:
                newly_due = project.mcct_milestone_ids.filtered(
                    lambda m: m.phase_reached and m.state == 'planned') - due_before[project.id]
                if newly_due:
                    project._mcct_notify_due_milestones(newly_due)
        return result

    def _mcct_check_billing_mode_change(self, mode):
        for project in self.filtered(lambda p: p.mcct_billing_mode != mode):
            if mode == 'milestones' and project.mcct_situation_ids.filtered(lambda s: s.state != 'cancel'):
                raise UserError("Ce chantier a déjà des situations de travaux : il reste facturé par situations.")
            if mode == 'situations' and project.mcct_milestone_ids.filtered(lambda m: m.invoice_id.state == 'posted'):
                raise UserError("Des échéances de ce chantier sont déjà facturées : il reste facturé par échéancier.")

    def _mcct_notify_due_milestones(self, milestones):
        self.ensure_one()
        lines = ", ".join(f"{m.name} ({self.currency_id.format(m.amount_untaxed)} HT)" for m in milestones)
        body = f"Phase « {dict(PHASES).get(self.mcct_phase)} » atteinte : échéance(s) à facturer — {lines}."
        self.message_post(body=body)
        self.activity_schedule(
            'mail.mail_activity_data_todo',
            summary="Échéance à facturer",
            note=body,
            user_id=(self.user_id or self.env.user).id,
        )

    def action_mcct_milestone_template(self):
        """Échéancier type : 30 % à la commande, 40 % à la livraison, 20 % et 10 % aux réceptions."""
        for project in self:
            if project.mcct_milestone_ids:
                raise UserError("L'échéancier de ce chantier est déjà renseigné.")
            today = fields.Date.context_today(self)
            project.mcct_milestone_ids = [
                (0, 0, {
                    'sequence': index * 10,
                    'name': name,
                    'rate': rate,
                    'phase': phase,
                    'date_planned': (project.mcct_contract_date or today) if not phase else False,
                })
                for index, (name, rate, phase) in enumerate(STANDARD_SCHEDULE, start=1)
            ]
        return True

    def action_mcct_invoice_due_milestones(self):
        self.ensure_one()
        due = self.mcct_milestone_ids.filtered(lambda m: m.display_state == 'due')
        if not due:
            raise UserError("Aucune échéance à facturer pour le moment.")
        return due.action_create_invoice()

    def action_mcct_new_situation(self):
        self.ensure_one()
        if self.mcct_billing_mode == 'milestones':
            raise UserError("Ce chantier est facturé par échéancier de paiement : utilisez "
                            "l'onglet « Échéancier » pour facturer.")
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
        if self.mcct_billing_mode == 'milestones':
            raise UserError("En échéancier de paiement, l'avance est une échéance de l'échéancier.")
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

    # ------------------------------------------------------------------
    # Carte des chantiers
    # ------------------------------------------------------------------
    @api.model
    def mcct_get_map_data(self, scope='active'):
        """Chantiers regroupés par ville pour la carte (client action « Carte des chantiers »)."""
        domain = [('mcct_is_site', '=', True)]
        if scope == 'active':
            domain.append(('mcct_phase', 'not in', RECEIVED_PHASES))
        elif scope == 'received':
            domain.append(('mcct_phase', 'in', RECEIVED_PHASES))
        projects = self.search(domain, order='name')
        phases = dict(PHASES)
        today = fields.Date.context_today(self)
        cities, unlocated = {}, []
        for project in projects:
            received = project.mcct_phase in RECEIVED_PHASES
            item = {
                'id': project.id,
                'name': project.name,
                'partner': project.partner_id.display_name or '',
                'city': project.mcct_site_city or '',
                'phase': project.mcct_phase or '',
                'phase_label': phases.get(project.mcct_phase, ''),
                'progress': project.mcct_progress,
                'amount': project.mcct_contract_amount,
                'equipment_count': project.mcct_equipment_count,
                'received': received,
                'late': bool(project.date and project.date < today and not received),
            }
            city = find_city(project.mcct_site_city)
            if city:
                key, (lat, lng) = normalize(city), CITIES[city]
            elif project.mcct_latitude or project.mcct_longitude:
                city = project.mcct_site_city or project.name
                key, lat, lng = 'gps:%s' % normalize(city), project.mcct_latitude, project.mcct_longitude
            else:
                unlocated.append(item)
                continue
            entry = cities.setdefault(key, {
                'key': key, 'name': city, 'lat': lat, 'lng': lng, 'projects': [],
            })
            entry['projects'].append(item)
        for entry in cities.values():
            items = entry['projects']
            entry.update({
                'count': len(items),
                'amount': sum(item['amount'] for item in items),
                'equipment_count': sum(item['equipment_count'] for item in items),
                'late': any(item['late'] for item in items),
                'received': all(item['received'] for item in items),
            })
        located = [item for entry in cities.values() for item in entry['projects']]
        return {
            'cities': sorted(cities.values(), key=lambda entry: (-entry['count'], entry['name'])),
            'unlocated': unlocated,
            'landmarks': [
                {'name': name, 'lat': CITIES[name][0], 'lng': CITIES[name][1]}
                for name in MAP_LANDMARKS
            ],
            'currency_id': self.env.company.currency_id.id,
            'totals': {
                'count': len(projects),
                'cities': len(cities),
                'amount': sum(item['amount'] for item in located + unlocated),
                'late': sum(1 for item in located + unlocated if item['late']),
                'equipment': sum(item['equipment_count'] for item in located + unlocated),
            },
        }
