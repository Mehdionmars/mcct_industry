from odoo import api, fields, models
from odoo.exceptions import UserError
from odoo.fields import Command

from ..tools import amount_to_french_words
from .res_partner import PAYMENT_MODES

# Délai de paiement maximal convenu entre entreprises (loi 69-21).
MAX_PAYMENT_DELAY_DAYS = 120


class AccountMove(models.Model):
    _inherit = 'account.move'

    mcct_project_id = fields.Many2one(
        'project.project', string="Chantier", index='btree_not_null', copy=False,
        domain="[('mcct_is_site', '=', True)]", tracking=True)
    mcct_situation_id = fields.Many2one(
        'mcct.situation', string="Situation de travaux", readonly=True, copy=False,
        index='btree_not_null')
    mcct_is_advance = fields.Boolean("Facture d'avance", readonly=True, copy=False)
    mcct_retention_rate = fields.Float(related='mcct_situation_id.retention_rate')
    mcct_retention_amount = fields.Monetary(
        "Retenue de garantie", compute='_compute_mcct_net_to_pay', store=True)
    mcct_vat_withholding_amount = fields.Monetary(
        "TVA retenue à la source", compute='_compute_mcct_vat_withholding', store=True,
        help="Part de la TVA que le client verse directement à la DGI (article 117 du CGI).")
    mcct_vat_withholding_move_id = fields.Many2one(
        'account.move', string="Écriture de retenue à la source", readonly=True, copy=False)
    mcct_net_to_pay = fields.Monetary(
        "Net à payer", compute='_compute_mcct_net_to_pay', store=True)
    mcct_payment_mode = fields.Selection(
        PAYMENT_MODES, string="Mode de paiement", compute='_compute_mcct_payment_mode',
        store=True, readonly=False, precompute=True)
    mcct_payment_delay_exceeded = fields.Boolean(compute='_compute_mcct_payment_delay_exceeded')

    @api.depends('partner_id')
    def _compute_mcct_payment_mode(self):
        for move in self:
            if move.is_sale_document(include_receipts=True):
                move.mcct_payment_mode = move.commercial_partner_id.mcct_payment_mode or 'virement'
            else:
                move.mcct_payment_mode = False

    @api.depends(
        'move_type', 'invoice_date', 'commercial_partner_id.mcct_vat_withholding',
        'invoice_line_ids.price_total', 'invoice_line_ids.price_subtotal',
        'invoice_line_ids.tax_ids', 'invoice_line_ids.product_id')
    def _compute_mcct_vat_withholding(self):
        for move in self:
            if move.state == 'posted':
                # Montant figé à la validation (attestation et statut du client à cette date).
                move.mcct_vat_withholding_amount = move.mcct_vat_withholding_amount
                continue
            if move.move_type != 'out_invoice' or not move.commercial_partner_id.mcct_vat_withholding:
                move.mcct_vat_withholding_amount = 0.0
                continue
            company = move.company_id
            rates = company._mcct_vat_withholding_rates(move.invoice_date or fields.Date.context_today(move))
            amount = 0.0
            for line in move.invoice_line_ids.filtered(lambda l: l.display_type == 'product'):
                nature = company._mcct_line_nature(line.product_id, line.tax_ids)
                amount += (line.price_total - line.price_subtotal) * rates[nature]
            move.mcct_vat_withholding_amount = move.currency_id.round(max(amount, 0.0))

    @api.depends('amount_total', 'mcct_situation_id.retention_amount', 'move_type',
                 'mcct_vat_withholding_amount')
    def _compute_mcct_net_to_pay(self):
        for move in self:
            retention = move.mcct_situation_id.retention_amount if move.move_type == 'out_invoice' else 0.0
            move.mcct_retention_amount = retention
            move.mcct_net_to_pay = move.amount_total - retention - move.mcct_vat_withholding_amount

    @api.depends('invoice_date', 'invoice_date_due', 'move_type')
    def _compute_mcct_payment_delay_exceeded(self):
        for move in self:
            start = move.invoice_date or fields.Date.context_today(move)
            move.mcct_payment_delay_exceeded = bool(
                move.is_sale_document() and move.invoice_date_due
                and (move.invoice_date_due - start).days > MAX_PAYMENT_DELAY_DAYS)

    def _post(self, soft=True):
        # L'attestation de régularité fiscale a pu être saisie après la création du brouillon.
        self.filtered(lambda m: m.move_type == 'out_invoice')._compute_mcct_vat_withholding()
        return super()._post(soft)

    def _compute_amount_total_words(self):
        super()._compute_amount_total_words()
        for move in self.filtered(lambda m: m.currency_id.name == 'MAD'):
            move.amount_total_words = amount_to_french_words(move.amount_total, 'MAD')

    def _mcct_net_to_pay_words(self):
        self.ensure_one()
        return amount_to_french_words(self.mcct_net_to_pay, self.currency_id.name)

    def _mcct_payment_mode_label(self):
        self.ensure_one()
        return dict(PAYMENT_MODES).get(self.mcct_payment_mode, '')

    def _mcct_vat_withholding_rate_label(self):
        """« 75 % », « 100 % » ou « 75 % / 100 % » selon les lignes de la facture."""
        self.ensure_one()
        company = self.company_id
        rates = company._mcct_vat_withholding_rates(self.invoice_date or fields.Date.context_today(self))
        used = sorted({
            rates[company._mcct_line_nature(line.product_id, line.tax_ids)]
            for line in self.invoice_line_ids.filtered(lambda l: l.display_type == 'product' and l.tax_ids)
        } - {0.0})
        return " / ".join(f"{rate * 100:g} %" for rate in used)

    # ------------------------------------------------------------------
    # Constatation de la TVA retenue à la source par le client
    # ------------------------------------------------------------------
    def action_mcct_record_vat_withholding(self):
        """Solde la part de TVA payée par le client à la DGI.

        Débit « État - TVA retenue à la source », crédit du compte client,
        lettré avec la facture : le reste dû correspond alors à ce que le client
        doit réellement verser.
        """
        for move in self:
            if move.state != 'posted' or move.move_type != 'out_invoice':
                raise UserError("La retenue à la source se constate sur une facture client validée.")
            if move.mcct_vat_withholding_move_id:
                raise UserError("La retenue à la source de cette facture est déjà constatée.")
            if move.currency_id.is_zero(move.mcct_vat_withholding_amount):
                raise UserError("Aucune TVA retenue à la source sur cette facture.")
            account = move.company_id.mcct_vat_withholding_account_id
            if not account:
                raise UserError("Renseignez le compte « TVA retenue à la source » dans les paramètres.")
            receivable = move.line_ids.filtered(
                lambda l: l.account_id.account_type == 'asset_receivable' and not l.reconciled)
            if not receivable:
                raise UserError("La facture est déjà soldée.")
            journal = self.env['account.journal'].search([
                *self.env['account.journal']._check_company_domain(move.company_id),
                ('type', '=', 'general'),
            ], limit=1)
            amount = move.mcct_vat_withholding_amount
            label = f"TVA retenue à la source — {move.name}"
            entry = self.env['account.move'].create({
                'move_type': 'entry',
                'journal_id': journal.id,
                'company_id': move.company_id.id,
                'date': fields.Date.context_today(move),
                'ref': label,
                'line_ids': [
                    Command.create({
                        'name': label, 'account_id': account.id,
                        'partner_id': move.commercial_partner_id.id, 'debit': amount,
                    }),
                    Command.create({
                        'name': label, 'account_id': receivable[0].account_id.id,
                        'partner_id': move.commercial_partner_id.id, 'credit': amount,
                    }),
                ],
            })
            entry.action_post()
            (receivable | entry.line_ids.filtered(
                lambda l: l.account_id == receivable[0].account_id)).reconcile()
            move.mcct_vat_withholding_move_id = entry
            move.message_post(body="TVA retenue à la source constatée : %s." % entry._get_html_link())
        return True

    # ------------------------------------------------------------------
    # Situations de travaux
    # ------------------------------------------------------------------
    def _mcct_release_situations(self):
        """Une facture annulée ou supprimée rend la situation à nouveau facturable."""
        situations = self.mcct_situation_id.filtered(lambda s: s.state == 'invoiced')
        situations.write({'state': 'approved', 'invoice_id': False})

    def button_cancel(self):
        res = super().button_cancel()
        self.filtered(lambda m: m.state == 'cancel')._mcct_release_situations()
        return res

    def unlink(self):
        self._mcct_release_situations()
        return super().unlink()
