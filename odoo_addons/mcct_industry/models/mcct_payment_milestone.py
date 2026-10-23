from odoo import api, fields, models
from odoo.exceptions import UserError

from .project_project import PHASES

MILESTONE_STATES = [
    ('planned', "À venir"),
    ('due', "À facturer"),
    ('invoiced', "Facturée"),
    ('overdue', "Échue impayée"),
    ('paid', "Encaissée"),
]
PAID_STATES = ('paid', 'in_payment')
PHASE_ORDER = [key for key, _label in PHASES]


class McctPaymentMilestone(models.Model):
    _name = 'mcct.payment.milestone'
    _description = "Échéance de paiement d'un marché"
    _order = 'project_id, sequence, id'

    project_id = fields.Many2one(
        'project.project', string="Chantier", required=True, ondelete='cascade', index=True,
        domain=[('mcct_is_site', '=', True)])
    company_id = fields.Many2one(related='project_id.company_id', store=True)
    currency_id = fields.Many2one(related='project_id.currency_id', store=True)
    partner_id = fields.Many2one(related='project_id.partner_id', string="Client")
    sequence = fields.Integer(default=10)
    number = fields.Integer("N°", compute='_compute_number')
    name = fields.Char("Échéance", required=True)
    phase = fields.Selection(
        PHASES, string="Phase déclenchante",
        help="L'échéance devient exigible lorsque le chantier atteint cette phase.")
    date_planned = fields.Date(
        "Date prévue", help="Date prévue de facturation. Passée cette date, l'échéance est à facturer.")
    rate = fields.Float("% du marché", digits=(5, 2))
    amount_untaxed = fields.Monetary(
        "Montant HT", compute='_compute_amount_untaxed', inverse='_inverse_amount_untaxed',
        store=True, readonly=False)
    amount_total = fields.Monetary(
        "Montant TTC", compute='_compute_amounts',
        help="Montant de la facture, ou estimation avec la TVA des travaux tant qu'elle n'est pas émise.")
    invoice_id = fields.Many2one(
        'account.move', string="Facture", readonly=True, copy=False, ondelete='set null',
        index='btree_not_null')
    invoice_date = fields.Date(related='invoice_id.invoice_date', string="Facturée le")
    invoice_date_due = fields.Date(related='invoice_id.invoice_date_due', string="Échéance de paiement")
    amount_paid = fields.Monetary("Encaissé", compute='_compute_amounts')
    amount_residual = fields.Monetary("Reste dû", compute='_compute_amounts')
    date_paid = fields.Date("Encaissée le", compute='_compute_amounts')
    state = fields.Selection(
        [('planned', "Non facturée"), ('invoiced', "Facturée"), ('paid', "Encaissée")],
        string="Facturation", compute='_compute_state', store=True, index=True)
    phase_reached = fields.Boolean(compute='_compute_phase_reached', store=True)
    display_state = fields.Selection(MILESTONE_STATES, string="Statut", compute='_compute_display_state')
    note = fields.Char("Commentaire")

    # ------------------------------------------------------------------
    # Calculs
    # ------------------------------------------------------------------
    @api.depends('project_id.mcct_milestone_ids.sequence')
    def _compute_number(self):
        for milestone in self:
            siblings = milestone.project_id.mcct_milestone_ids.sorted(lambda m: (m.sequence, m.id))
            milestone.number = list(siblings).index(milestone) + 1 if milestone in siblings else 0

    @api.depends('rate', 'project_id.mcct_contract_amount')
    def _compute_amount_untaxed(self):
        for milestone in self:
            if milestone.state in ('invoiced', 'paid'):
                # Montant facturé : un avenant ne le modifie plus.
                milestone.amount_untaxed = milestone.amount_untaxed
            else:
                milestone.amount_untaxed = milestone.currency_id.round(
                    milestone.project_id.mcct_contract_amount * milestone.rate / 100.0)

    def _inverse_amount_untaxed(self):
        for milestone in self:
            contract = milestone.project_id.mcct_contract_amount
            if contract and milestone.state == 'planned':
                milestone.rate = milestone.amount_untaxed / contract * 100.0

    @api.depends('invoice_id.state', 'invoice_id.payment_state')
    def _compute_state(self):
        for milestone in self:
            invoice = milestone.invoice_id
            if not invoice or invoice.state != 'posted':
                milestone.state = 'planned'
            elif invoice.payment_state in PAID_STATES:
                milestone.state = 'paid'
            else:
                milestone.state = 'invoiced'

    @api.depends('phase', 'project_id.mcct_phase')
    def _compute_phase_reached(self):
        for milestone in self:
            current = milestone.project_id.mcct_phase
            milestone.phase_reached = bool(
                milestone.phase and current in PHASE_ORDER
                and PHASE_ORDER.index(current) >= PHASE_ORDER.index(milestone.phase))

    @api.depends('amount_untaxed', 'invoice_id.amount_total', 'invoice_id.amount_residual',
                 'invoice_id.state')
    def _compute_amounts(self):
        product = self.env.ref('mcct_industry.product_milestone', raise_if_not_found=False)
        for milestone in self:
            invoice = milestone.invoice_id
            if invoice and invoice.state == 'posted':
                milestone.amount_total = invoice.amount_total
                milestone.amount_residual = invoice.amount_residual
                milestone.amount_paid = invoice.amount_total - invoice.amount_residual
                milestone.date_paid = milestone._paid_date() if milestone.state == 'paid' else False
                continue
            company = milestone.company_id or self.env.company
            taxes = product.with_company(company).taxes_id.filtered(
                lambda t: t.company_id == company) if product else self.env['account.tax']
            total = milestone.amount_untaxed
            if taxes:
                total = taxes.compute_all(milestone.amount_untaxed, milestone.currency_id)['total_included']
            milestone.amount_total = total
            milestone.amount_residual = total
            milestone.amount_paid = 0.0
            milestone.date_paid = False

    def _paid_date(self):
        receivable = self.invoice_id.line_ids.filtered(
            lambda l: l.account_id.account_type == 'asset_receivable')
        dates = (receivable.matched_credit_ids | receivable.matched_debit_ids).mapped('max_date')
        return max(dates) if dates else False

    @api.depends('state', 'phase_reached', 'date_planned', 'invoice_date_due')
    def _compute_display_state(self):
        today = fields.Date.context_today(self)
        for milestone in self:
            if milestone.state == 'paid':
                milestone.display_state = 'paid'
            elif milestone.state == 'invoiced':
                overdue = milestone.invoice_date_due and milestone.invoice_date_due < today
                milestone.display_state = 'overdue' if overdue else 'invoiced'
            elif milestone.phase_reached or (milestone.date_planned and milestone.date_planned <= today):
                milestone.display_state = 'due'
            else:
                milestone.display_state = 'planned'

    # ------------------------------------------------------------------
    # Facturation
    # ------------------------------------------------------------------
    def action_create_invoice(self):
        invoices = self.env['account.move']
        for milestone in self:
            project = milestone.project_id
            if project.mcct_billing_mode != 'milestones':
                raise UserError("Ce chantier est facturé par situations de travaux. Passez-le en "
                                "« Échéancier de paiement » pour facturer ses échéances.")
            if milestone.state != 'planned':
                raise UserError(f"L'échéance « {milestone.name} » est déjà facturée.")
            if milestone.invoice_id.state == 'draft':
                invoices |= milestone.invoice_id
                continue
            if not project.partner_id:
                raise UserError("Renseignez le client du chantier avant de facturer.")
            if milestone.currency_id.compare_amounts(milestone.amount_untaxed, 0.0) <= 0:
                raise UserError(f"Le montant de l'échéance « {milestone.name} » est nul.")
            invoice = milestone._create_invoice()
            milestone.invoice_id = invoice
            invoices |= invoice
        if len(invoices) == 1:
            return {
                'type': 'ir.actions.act_window',
                'res_model': 'account.move',
                'res_id': invoices.id,
                'view_mode': 'form',
                'target': 'current',
            }
        return {
            'type': 'ir.actions.act_window',
            'name': "Factures d'échéances",
            'res_model': 'account.move',
            'view_mode': 'list,form',
            'domain': [('id', 'in', invoices.ids)],
        }

    def _create_invoice(self):
        self.ensure_one()
        project = self.project_id
        product = self.env.ref('mcct_industry.product_milestone').product_variant_id
        count = len(project.mcct_milestone_ids)
        label = f"Échéance {self.number}/{count} — {self.name}"
        if self.rate:
            label += f" ({self.rate:g} % du marché)".replace('.', ',')
        if project.mcct_contract_ref:
            label += f"\nMarché {project.mcct_contract_ref}"
        return self.env['account.move'].with_company(project.company_id or self.env.company).create({
            'move_type': 'out_invoice',
            'partner_id': project.partner_id.address_get(['invoice'])['invoice'],
            'mcct_project_id': project.id,
            'invoice_origin': project.name,
            'ref': project.mcct_contract_ref or False,
            'invoice_line_ids': [(0, 0, {
                'product_id': product.id,
                'name': label,
                'quantity': 1.0,
                'price_unit': self.amount_untaxed,
                'analytic_distribution': project._mcct_analytic_distribution(),
            })],
        })

    def action_open_invoice(self):
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'res_model': 'account.move',
            'res_id': self.invoice_id.id,
            'view_mode': 'form',
            'target': 'current',
        }

    def unlink(self):
        if any(milestone.state != 'planned' for milestone in self):
            raise UserError("Une échéance facturée ne peut pas être supprimée : annulez d'abord sa facture.")
        return super().unlink()
