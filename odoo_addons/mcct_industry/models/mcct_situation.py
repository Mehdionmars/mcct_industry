from odoo import api, fields, models
from odoo.exceptions import UserError, ValidationError
from odoo.fields import Command
from odoo.tools import float_is_zero

from ..tools import amount_to_french_words
from .project_project import VALIDATED_STATES

SITUATION_STATES = [
    ('draft', "Brouillon"),
    ('sent', "Envoyée au client"),
    ('approved', "Approuvée"),
    ('invoiced', "Facturée"),
    ('cancel', "Annulée"),
]
OPEN_STATES = ('draft', 'sent')
# Champs modifiables uniquement en brouillon (les montants des lignes sont verrouillés à part).
LOCKED_FIELDS = {
    'retention_rate', 'retention_cap_rate', 'retention_base', 'advance_rate',
    'advance_deduction', 'retention_amount', 'project_id',
}
DISPLAY_TYPES = [
    ('line_section', "Section"),
    ('line_subsection', "Sous-section"),
    ('line_note', "Note"),
]


class McctSituation(models.Model):
    _name = 'mcct.situation'
    _description = "Situation de travaux"
    _inherit = ['portal.mixin', 'mail.thread', 'mail.activity.mixin']
    _order = 'project_id, number desc, id desc'
    _check_company_auto = True

    name = fields.Char("Référence", compute='_compute_name', store=True)
    number = fields.Integer("N°", readonly=True, copy=False)
    project_id = fields.Many2one(
        'project.project', string="Chantier", required=True, index=True,
        ondelete='restrict', check_company=True, tracking=True,
        domain="[('mcct_is_site', '=', True)]")
    partner_id = fields.Many2one(
        'res.partner', string="Client", related='project_id.partner_id', store=True)
    company_id = fields.Many2one(
        'res.company', string="Société", required=True, index=True,
        default=lambda self: self.env.company)
    currency_id = fields.Many2one(related='company_id.currency_id')
    date = fields.Date("Date", default=fields.Date.context_today, required=True, tracking=True)
    period_start = fields.Date("Période du")
    period_end = fields.Date("au")
    state = fields.Selection(
        SITUATION_STATES, string="Statut", default='draft', required=True,
        tracking=True, copy=False, index=True)
    line_ids = fields.One2many('mcct.situation.line', 'situation_id', string="Lignes", copy=True)
    note = fields.Html("Observations")

    retention_rate = fields.Float(
        "Retenue de garantie (%)", compute='_compute_rates', store=True, readonly=False, precompute=True)
    retention_cap_rate = fields.Float(
        "Plafond retenue (% du marché)", compute='_compute_rates', store=True, readonly=False, precompute=True)
    retention_base = fields.Selection(
        [('untaxed', "Montant HT"), ('total', "Montant TTC")], string="Base de la retenue",
        compute='_compute_retention_base', store=True, readonly=False, precompute=True)
    advance_rate = fields.Float(
        "Déduction de l'avance (%)", compute='_compute_rates', store=True, readonly=False, precompute=True)

    amount_contract = fields.Monetary("Montant du marché HT", compute='_compute_amounts', store=True)
    amount_contract_total = fields.Monetary("Montant du marché TTC", compute='_compute_amounts', store=True)
    amount_previous = fields.Monetary("Situations précédentes HT", compute='_compute_amounts', store=True)
    amount_cumulative = fields.Monetary("Travaux cumulés HT", compute='_compute_amounts', store=True)
    amount_current = fields.Monetary("Travaux de la période HT", compute='_compute_amounts', store=True)
    amount_current_tax = fields.Monetary("TVA sur travaux de la période", compute='_compute_amounts', store=True)
    progress = fields.Float(
        "Avancement cumulé (%)", compute='_compute_amounts', store=True, aggregator='max')

    advance_deduction = fields.Monetary(
        "Déduction avance HT", compute='_compute_advance_deduction', store=True, readonly=False)
    advance_deduction_tax = fields.Monetary(compute='_compute_totals', store=True)
    amount_untaxed = fields.Monetary("Total HT", compute='_compute_totals', store=True)
    amount_tax = fields.Monetary("TVA", compute='_compute_totals', store=True)
    amount_total = fields.Monetary("Total TTC", compute='_compute_totals', store=True)
    retention_amount = fields.Monetary(
        "Retenue de garantie", compute='_compute_retention_amount', store=True, readonly=False)
    vat_withholding_amount = fields.Monetary(
        "TVA retenue à la source", compute='_compute_vat_withholding', store=True,
        help="Part de la TVA versée directement par le client à la DGI (article 117 du CGI).")
    amount_net = fields.Monetary("Net à payer", compute='_compute_amount_net', store=True)

    invoice_id = fields.Many2one('account.move', string="Facture", readonly=True, copy=False)
    invoice_payment_state = fields.Selection(related='invoice_id.payment_state', string="Paiement")
    approved_by = fields.Char("Approuvée par", readonly=True, copy=False)
    approved_date = fields.Datetime("Approuvée le", readonly=True, copy=False)

    # ------------------------------------------------------------------
    # Calculs
    # ------------------------------------------------------------------
    @api.depends('number')
    def _compute_name(self):
        for situation in self:
            situation.name = "Situation N°%02d" % situation.number if situation.number else "Nouvelle situation"

    @api.depends('name', 'project_id.name')
    def _compute_display_name(self):
        for situation in self:
            situation.display_name = (
                f"{situation.name} — {situation.project_id.name}" if situation.project_id
                else situation.name)

    def _get_report_base_filename(self):
        self.ensure_one()
        return f"{self.name} - {self.project_id.name}"

    def _compute_access_url(self):
        super()._compute_access_url()
        for situation in self:
            situation.access_url = f'/my/chantiers/{situation.project_id.id}'

    @api.depends('company_id')
    def _compute_retention_base(self):
        # Copié à la création : changer le paramètre société ne modifie pas l'historique.
        for situation in self:
            situation.retention_base = situation.company_id.mcct_retention_base or 'total'

    @api.depends('project_id')
    def _compute_rates(self):
        for situation in self:
            project = situation.project_id
            situation.retention_rate = project.mcct_retention_rate
            situation.retention_cap_rate = project.mcct_retention_cap_rate
            situation.advance_rate = project.mcct_advance_rate

    @api.depends(
        'line_ids.contract_amount', 'line_ids.contract_qty', 'line_ids.previous_amount',
        'line_ids.cumulative_amount', 'line_ids.current_amount', 'line_ids.current_qty',
        'line_ids.tax_ids', 'line_ids.price_unit',
    )
    def _compute_amounts(self):
        for situation in self:
            lines = situation.line_ids.filtered(lambda line: not line.display_type)
            contract = sum(lines.mapped('contract_amount'))
            cumulative = sum(lines.mapped('cumulative_amount'))
            situation.amount_contract = contract
            situation.amount_contract_total = sum(
                line._mcct_tax_included(line.contract_qty) for line in lines)
            situation.amount_previous = sum(lines.mapped('previous_amount'))
            situation.amount_cumulative = cumulative
            situation.amount_current = sum(lines.mapped('current_amount'))
            situation.amount_current_tax = sum(
                line._mcct_tax_included(line.current_qty) - line.current_amount for line in lines)
            situation.progress = (cumulative / contract * 100.0) if contract else 0.0

    @api.depends('amount_current', 'advance_rate')
    def _compute_advance_deduction(self):
        for situation in self:
            if situation.advance_rate <= 0 or situation.amount_current <= 0:
                situation.advance_deduction = 0.0
                continue
            project = situation.project_id
            advance_invoiced = sum(project.sudo().mcct_invoice_ids.filtered(
                lambda m: m.mcct_is_advance and m.state == 'posted').mapped('amount_untaxed_signed'))
            already_deducted = sum(situation._get_previous_situations().mapped('advance_deduction'))
            available = max(advance_invoiced - already_deducted, 0.0)
            wanted = situation.amount_current * situation.advance_rate / 100.0
            situation.advance_deduction = situation.currency_id.round(min(wanted, available))

    @api.depends('amount_current', 'amount_current_tax', 'advance_deduction')
    def _compute_totals(self):
        for situation in self:
            advance_tax = 0.0
            if situation.advance_deduction:
                taxes = situation._mcct_advance_taxes()
                if taxes:
                    res = taxes.compute_all(situation.advance_deduction, situation.currency_id)
                    advance_tax = res['total_included'] - res['total_excluded']
            situation.advance_deduction_tax = advance_tax
            situation.amount_untaxed = situation.amount_current - situation.advance_deduction
            situation.amount_tax = situation.amount_current_tax - advance_tax
            situation.amount_total = situation.amount_untaxed + situation.amount_tax

    @api.depends(
        'amount_current', 'amount_current_tax', 'amount_contract', 'amount_contract_total',
        'retention_rate', 'retention_cap_rate', 'retention_base',
    )
    def _compute_retention_amount(self):
        for situation in self:
            on_total = situation.retention_base == 'total'
            base = situation.amount_current + (situation.amount_current_tax if on_total else 0.0)
            amount = base * situation.retention_rate / 100.0
            if situation.retention_cap_rate > 0:
                contract = situation.amount_contract_total if on_total else situation.amount_contract
                cap = contract * situation.retention_cap_rate / 100.0
                already = sum(situation._get_previous_situations().mapped('retention_amount'))
                amount = min(amount, cap - already)
            situation.retention_amount = situation.currency_id.round(max(amount, 0.0))

    @api.depends(
        'date', 'partner_id.commercial_partner_id.mcct_vat_withholding',
        'line_ids.current_amount', 'line_ids.tax_ids', 'line_ids.product_id',
        'advance_deduction_tax')
    def _compute_vat_withholding(self):
        for situation in self:
            if situation.state in ('approved', 'invoiced'):
                # Figé une fois la situation approuvée par le client.
                situation.vat_withholding_amount = situation.vat_withholding_amount
                continue
            if not situation.partner_id.commercial_partner_id.mcct_vat_withholding:
                situation.vat_withholding_amount = 0.0
                continue
            company = situation.company_id
            rates = company._mcct_vat_withholding_rates(situation.date or fields.Date.context_today(situation))
            amount = 0.0
            for line in situation.line_ids.filtered(lambda l: not l.display_type):
                tax = line._mcct_tax_included(line.current_qty) - line.current_amount
                amount += tax * rates[company._mcct_line_nature(line.product_id, line.tax_ids)]
            # La déduction d'avance (travaux) réduit la TVA, donc la retenue.
            amount -= situation.advance_deduction_tax * rates['travaux']
            situation.vat_withholding_amount = situation.currency_id.round(max(amount, 0.0))

    @api.depends('amount_total', 'retention_amount', 'vat_withholding_amount')
    def _compute_amount_net(self):
        for situation in self:
            situation.amount_net = (
                situation.amount_total - situation.retention_amount - situation.vat_withholding_amount)

    def _mcct_amount_net_words(self):
        self.ensure_one()
        return amount_to_french_words(self.amount_net, self.currency_id.name)

    def _get_previous_situations(self):
        """Situations validées antérieures du même chantier (la plus récente d'abord)."""
        self.ensure_one()
        if not self.project_id:
            return self.browse()
        domain = [('project_id', '=', self.project_id.id), ('state', 'in', VALIDATED_STATES)]
        if self.number:
            domain.append(('number', '<', self.number))
        if self.id:
            domain.append(('id', '!=', self.id))
        return self.search(domain, order='number desc, id desc')

    def _mcct_advance_taxes(self):
        product = self.env.ref('mcct_industry.product_advance', raise_if_not_found=False)
        if not product:
            return self.env['account.tax']
        return product.taxes_id.filtered(lambda tax: tax.company_id == self.company_id)

    # ------------------------------------------------------------------
    # Contraintes / CRUD
    # ------------------------------------------------------------------
    @api.constrains('state', 'project_id')
    def _check_single_open_situation(self):
        for situation in self.filtered(lambda s: s.state in OPEN_STATES):
            others = self.search_count([
                ('project_id', '=', situation.project_id.id),
                ('state', 'in', OPEN_STATES),
                ('id', '!=', situation.id),
            ])
            if others:
                raise ValidationError(
                    "Le chantier %s a déjà une situation en cours (brouillon ou envoyée). "
                    "Validez-la ou annulez-la avant d'en créer une nouvelle." % situation.project_id.name)

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            project = self.env['project.project'].browse(vals.get('project_id'))
            if project:
                last = self.search([('project_id', '=', project.id), ('state', '!=', 'cancel')],
                                   order='number desc', limit=1)
                vals['number'] = last.number + 1
                if project.company_id:
                    vals.setdefault('company_id', project.company_id.id)
        situations = super().create(vals_list)
        for situation in situations.filtered(lambda s: not s.line_ids):
            situation._prefill_lines()
        return situations

    def write(self, vals):
        locked_fields = LOCKED_FIELDS.intersection(vals)
        if locked_fields and not self.env.context.get('mcct_skip_lock'):
            if any(situation.state != 'draft' for situation in self):
                raise UserError(
                    "Remettez la situation en brouillon pour modifier les taux, la retenue "
                    "ou la déduction d'avance.")
        return super().write(vals)

    def unlink(self):
        if any(situation.state not in ('draft', 'cancel') for situation in self):
            raise UserError("Seules les situations en brouillon ou annulées peuvent être supprimées.")
        return super().unlink()

    def _prefill_lines(self):
        """Reprend les lignes de la situation précédente, sinon le devis du chantier."""
        self.ensure_one()
        previous = self._get_previous_situations()[:1]
        if previous:
            commands = [Command.create(line._prepare_next_situation_line()) for line in previous.line_ids]
        else:
            sale_lines = self.project_id._mcct_contract_sale_lines()
            commands = [Command.create(self.env['mcct.situation.line']._prepare_from_sale_line(line))
                        for line in sale_lines]
        if commands:
            self.line_ids = commands
        if not self.project_id.mcct_contract_amount and self.amount_contract:
            self.project_id.mcct_contract_amount = self.amount_contract

    # ------------------------------------------------------------------
    # Workflow
    # ------------------------------------------------------------------
    def action_send(self):
        """Ouvre l'assistant d'e-mail avec le PDF de la situation."""
        self.ensure_one()
        template = self.env.ref('mcct_industry.mail_template_situation', raise_if_not_found=False)
        return {
            'type': 'ir.actions.act_window',
            'res_model': 'mail.compose.message',
            'view_mode': 'form',
            'views': [(False, 'form')],
            'target': 'new',
            'context': {
                'default_model': 'mcct.situation',
                'default_res_ids': self.ids,
                'default_template_id': template.id if template else False,
                'default_composition_mode': 'comment',
                'default_email_layout_xmlid': 'mail.mail_notification_layout_with_responsible_signature',
                'mark_situation_as_sent': True,
                'force_email': True,
            },
        }

    def message_post(self, **kwargs):
        if self.env.context.get('mark_situation_as_sent'):
            self.filtered(lambda s: s.state == 'draft').write({'state': 'sent'})
        return super().message_post(**kwargs)

    def action_mark_sent(self):
        self._check_has_lines()
        self.filtered(lambda s: s.state == 'draft').write({'state': 'sent'})

    def action_approve(self, approved_by=None):
        for situation in self:
            if situation.state not in OPEN_STATES:
                raise UserError("Seule une situation en brouillon ou envoyée peut être approuvée.")
            situation._check_has_lines()
            situation.write({
                'state': 'approved',
                'approved_by': approved_by or self.env.user.name,
                'approved_date': fields.Datetime.now(),
            })
            situation._sync_sale_delivered_qty()

    def action_reset_draft(self):
        for situation in self:
            if situation.state not in ('sent', 'approved', 'cancel'):
                raise UserError("Cette situation ne peut pas être remise en brouillon.")
            if situation.invoice_id and situation.invoice_id.state != 'cancel':
                raise UserError("Annulez d'abord la facture liée à cette situation.")
            if situation._get_later_situations():
                raise UserError("Une situation plus récente existe : seule la dernière peut être modifiée.")
        self.write({'state': 'draft', 'approved_by': False, 'approved_date': False})

    def action_cancel(self):
        for situation in self:
            if situation.invoice_id and situation.invoice_id.state != 'cancel':
                raise UserError("Annulez d'abord la facture liée à cette situation.")
            if situation._get_later_situations():
                raise UserError("Une situation plus récente existe : seule la dernière peut être annulée.")
        self.write({'state': 'cancel'})

    def _get_later_situations(self):
        self.ensure_one()
        return self.search([
            ('project_id', '=', self.project_id.id),
            ('state', '!=', 'cancel'),
            ('number', '>', self.number),
        ])

    def _check_has_lines(self):
        for situation in self:
            if not situation.line_ids.filtered(lambda line: not line.display_type):
                raise UserError("La situation %s ne contient aucune ligne de travaux." % situation.name)

    def _sync_sale_delivered_qty(self):
        """Reporte les quantités cumulées sur les lignes de commande (livré manuel)."""
        for line in self.line_ids.filtered('sale_line_id'):
            sale_line = line.sale_line_id.sudo()
            if sale_line.qty_delivered_method == 'manual':
                qty = line.cumulative_qty
                if line.uom_id and sale_line.product_uom_id and line.uom_id != sale_line.product_uom_id:
                    qty = line.uom_id._compute_quantity(qty, sale_line.product_uom_id)
                sale_line.qty_delivered = qty

    def action_create_invoice(self):
        self.ensure_one()
        if self.state != 'approved':
            raise UserError("La situation doit être approuvée avant d'être facturée.")
        if not self.partner_id:
            raise UserError("Renseignez le client du chantier.")
        invoice_vals = self._prepare_invoice_vals()
        if not any(cmd[2].get('product_id') or cmd[2].get('price_unit')
                   for cmd in invoice_vals['invoice_line_ids']):
            raise UserError("Aucun montant à facturer sur cette situation.")
        invoice = self.env['account.move'].with_company(self.company_id).create(invoice_vals)
        self.write({'invoice_id': invoice.id, 'state': 'invoiced'})
        self.message_post(body="Facture %s créée." % invoice._get_html_link())
        return self.action_view_invoice()

    def _prepare_invoice_vals(self):
        self.ensure_one()
        project = self.project_id
        analytic = project._mcct_analytic_distribution()
        lines = []
        pending = []  # sections / notes en attente : écrites seulement si un ouvrage suit
        for line in self.line_ids:
            if line.display_type:
                vals = {'display_type': line.display_type, 'name': line.name, 'sequence': line.sequence}
                if line.display_type == 'line_section':
                    pending = [vals]
                elif line.display_type == 'line_subsection':
                    pending = [p for p in pending if p['display_type'] == 'line_section'] + [vals]
                else:
                    pending.append(vals)
                continue
            rounding = line.uom_id.rounding or 0.01
            if float_is_zero(line.current_qty, precision_rounding=rounding):
                continue
            lines.extend(Command.create(vals) for vals in pending)
            pending = []
            vals = {
                'sequence': line.sequence,
                'product_id': line.product_id.id,
                'name': line.name,
                'quantity': line.current_qty,
                'product_uom_id': line.uom_id.id,
                'price_unit': line.price_unit,
                'tax_ids': [Command.set(line.tax_ids.ids)],
                'analytic_distribution': analytic,
            }
            if line.sale_line_id:
                vals['sale_line_ids'] = [Command.link(line.sale_line_id.id)]
            lines.append(Command.create(vals))
        if not self.currency_id.is_zero(self.advance_deduction):
            product = self.env.ref('mcct_industry.product_advance').product_variant_id
            lines.append(Command.create({
                'display_type': 'line_section',
                'name': "Avance sur travaux",
                'sequence': 99998,
            }))
            lines.append(Command.create({
                'sequence': 99999,
                'product_id': product.id,
                'name': "Déduction de l'avance sur travaux (%s %%)" % f"{self.advance_rate:g}",
                'quantity': 1.0,
                'price_unit': -self.advance_deduction,
                'tax_ids': [Command.set(self._mcct_advance_taxes().ids)],
                'analytic_distribution': analytic,
            }))
        return {
            'move_type': 'out_invoice',
            'company_id': self.company_id.id,
            'partner_id': self.partner_id.address_get(['invoice'])['invoice'],
            'mcct_project_id': project.id,
            'mcct_situation_id': self.id,
            'invoice_origin': f"{project.name} — {self.name}",
            'ref': project.mcct_contract_ref or self.name,
            'invoice_line_ids': lines,
        }

    def action_view_invoice(self):
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'res_model': 'account.move',
            'res_id': self.invoice_id.id,
            'view_mode': 'form',
            'target': 'current',
        }

    def action_preview_portal(self):
        self.ensure_one()
        return {'type': 'ir.actions.act_url', 'url': self.get_portal_url(), 'target': 'new'}

    # ------------------------------------------------------------------
    # Portail client
    # ------------------------------------------------------------------
    def _mcct_portal_approve(self, signer_name):
        self.ensure_one()
        if self.state != 'sent':
            raise UserError("Cette situation n'est plus en attente d'approbation.")
        self.action_approve(approved_by=signer_name)
        self.message_post(body="Situation approuvée en ligne par %s." % signer_name)

    def _mcct_portal_request_changes(self, signer_name, comment):
        self.ensure_one()
        if self.state != 'sent':
            raise UserError("Cette situation n'est plus en attente d'approbation.")
        self.state = 'draft'
        self.message_post(body="Correction demandée par %s : %s" % (signer_name, comment or '—'))
        self.activity_schedule(
            'mail.mail_activity_data_todo',
            summary="Correction demandée par le client",
            note=comment,
            user_id=(self.project_id.user_id or self.env.user).id,
        )


class McctSituationLine(models.Model):
    _name = 'mcct.situation.line'
    _description = "Ligne de situation de travaux"
    _order = 'situation_id, sequence, id'
    _check_company_auto = True

    situation_id = fields.Many2one(
        'mcct.situation', string="Situation", required=True, index=True, ondelete='cascade')
    company_id = fields.Many2one(related='situation_id.company_id', store=True, index=True)
    currency_id = fields.Many2one(related='situation_id.currency_id')
    situation_state = fields.Selection(related='situation_id.state', string="Statut situation")
    sequence = fields.Integer(default=10)
    display_type = fields.Selection(DISPLAY_TYPES, default=False)
    name = fields.Text("Désignation", required=True)
    product_id = fields.Many2one(
        'product.product', string="Ouvrage / article", check_company=True,
        domain="[('sale_ok', '=', True)]")
    uom_id = fields.Many2one(
        'uom.uom', string="Unité", compute='_compute_from_product', store=True, readonly=False)
    tax_ids = fields.Many2many(
        'account.tax', string="Taxes", compute='_compute_from_product', store=True, readonly=False,
        check_company=True, domain="[('type_tax_use', '=', 'sale')]")
    sale_line_id = fields.Many2one('sale.order.line', string="Ligne de commande", readonly=True, copy=False)
    origin_line_id = fields.Many2one(
        'mcct.situation.line', string="Ligne de la situation précédente", readonly=True, copy=False,
        index='btree_not_null')

    contract_qty = fields.Float("Qté marché", digits='Product Unit')
    price_unit = fields.Float("PU HT", digits='Product Price')
    contract_amount = fields.Monetary("Montant marché HT", compute='_compute_line_amounts', store=True)
    previous_qty = fields.Float(
        "Qté cumul précédent", digits='Product Unit', compute='_compute_previous_qty', store=True)
    cumulative_qty = fields.Float("Qté cumulée", digits='Product Unit')
    progress = fields.Float(
        "% cumulé", compute='_compute_progress', inverse='_inverse_progress', store=True)
    current_qty = fields.Float(
        "Qté période", digits='Product Unit', compute='_compute_line_amounts', store=True)
    previous_amount = fields.Monetary("Montant précédent HT", compute='_compute_line_amounts', store=True)
    cumulative_amount = fields.Monetary("Montant cumulé HT", compute='_compute_line_amounts', store=True)
    current_amount = fields.Monetary("Montant période HT", compute='_compute_line_amounts', store=True)

    @api.depends('product_id')
    def _compute_from_product(self):
        for line in self:
            if not line.product_id:
                continue
            line.uom_id = line.product_id.uom_id
            company = line.company_id or self.env.company
            line.tax_ids = line.product_id.taxes_id.filtered(lambda tax: tax.company_id == company)

    @api.depends('origin_line_id.cumulative_qty')
    def _compute_previous_qty(self):
        for line in self:
            line.previous_qty = line.origin_line_id.cumulative_qty

    @api.depends('cumulative_qty', 'contract_qty')
    def _compute_progress(self):
        for line in self:
            line.progress = (line.cumulative_qty / line.contract_qty * 100.0) if line.contract_qty else 0.0

    def _inverse_progress(self):
        for line in self:
            if line.contract_qty:
                line.cumulative_qty = line.contract_qty * line.progress / 100.0

    @api.onchange('progress')
    def _onchange_progress(self):
        if self.contract_qty:
            self.cumulative_qty = self.contract_qty * self.progress / 100.0

    @api.onchange('product_id')
    def _onchange_product_id(self):
        if self.product_id and not self.name:
            self.name = self.product_id.get_product_multiline_description_sale()
        if self.product_id and not self.price_unit:
            self.price_unit = self.product_id.lst_price

    @api.depends('contract_qty', 'price_unit', 'previous_qty', 'cumulative_qty', 'display_type')
    def _compute_line_amounts(self):
        for line in self:
            if line.display_type:
                line.update({
                    'contract_amount': 0.0, 'current_qty': 0.0, 'previous_amount': 0.0,
                    'cumulative_amount': 0.0, 'current_amount': 0.0,
                })
                continue
            currency = line.currency_id or self.env.company.currency_id
            line.contract_amount = currency.round(line.contract_qty * line.price_unit)
            line.previous_amount = currency.round(line.previous_qty * line.price_unit)
            line.cumulative_amount = currency.round(line.cumulative_qty * line.price_unit)
            line.current_qty = line.cumulative_qty - line.previous_qty
            line.current_amount = line.cumulative_amount - line.previous_amount

    def _mcct_tax_included(self, quantity):
        """Montant TTC d'une quantité de cette ligne."""
        self.ensure_one()
        currency = self.currency_id or self.env.company.currency_id
        amount_untaxed = currency.round(quantity * self.price_unit)
        if not self.tax_ids or not quantity:
            return amount_untaxed
        res = self.tax_ids.compute_all(
            self.price_unit, currency, quantity, product=self.product_id,
            partner=self.situation_id.partner_id)
        return amount_untaxed + (res['total_included'] - res['total_excluded'])

    # ------------------------------------------------------------------
    # Préparation des lignes
    # ------------------------------------------------------------------
    @api.model
    def _prepare_from_sale_line(self, sale_line):
        vals = {
            'sequence': sale_line.sequence,
            'display_type': sale_line.display_type or False,
            'name': sale_line.name,
            'sale_line_id': sale_line.id,
        }
        if not sale_line.display_type:
            price = sale_line.price_unit * (1.0 - (sale_line.discount or 0.0) / 100.0)
            vals.update({
                'product_id': sale_line.product_id.id,
                'uom_id': sale_line.product_uom_id.id,
                'tax_ids': [Command.set(sale_line.tax_ids.ids)],
                'contract_qty': sale_line.product_uom_qty,
                'price_unit': price,
            })
        return vals

    def _prepare_next_situation_line(self):
        self.ensure_one()
        return {
            'sequence': self.sequence,
            'display_type': self.display_type,
            'name': self.name,
            'product_id': self.product_id.id,
            'uom_id': self.uom_id.id,
            'tax_ids': [Command.set(self.tax_ids.ids)],
            'sale_line_id': self.sale_line_id.id,
            'origin_line_id': self.id,
            'contract_qty': self.contract_qty,
            'price_unit': self.price_unit,
            'cumulative_qty': self.cumulative_qty,
        }

    # ------------------------------------------------------------------
    # Verrouillage après validation
    # ------------------------------------------------------------------
    def _check_situation_editable(self, situations):
        if self.env.context.get('mcct_skip_lock'):
            return
        locked = situations.filtered(lambda s: s.state != 'draft')
        if locked:
            raise UserError(
                "La situation %s n'est plus en brouillon : remettez-la en brouillon pour la modifier."
                % locked[0].name)

    @api.model_create_multi
    def create(self, vals_list):
        situations = self.env['mcct.situation'].browse(
            [vals['situation_id'] for vals in vals_list if vals.get('situation_id')])
        self._check_situation_editable(situations)
        return super().create(vals_list)

    def write(self, vals):
        self._check_situation_editable(self.situation_id)
        return super().write(vals)

    def unlink(self):
        self._check_situation_editable(self.situation_id)
        return super().unlink()
