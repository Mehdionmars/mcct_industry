from odoo import api, fields, models

from ..tools import amount_to_french_words


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
    mcct_net_to_pay = fields.Monetary(
        "Net à payer", compute='_compute_mcct_net_to_pay', store=True)

    @api.depends('amount_total', 'mcct_situation_id.retention_amount', 'move_type')
    def _compute_mcct_net_to_pay(self):
        for move in self:
            retention = move.mcct_situation_id.retention_amount if move.move_type == 'out_invoice' else 0.0
            move.mcct_retention_amount = retention
            move.mcct_net_to_pay = move.amount_total - retention

    def _compute_amount_total_words(self):
        super()._compute_amount_total_words()
        for move in self.filtered(lambda m: m.currency_id.name == 'MAD'):
            move.amount_total_words = amount_to_french_words(move.amount_total, 'MAD')

    def _mcct_net_to_pay_words(self):
        self.ensure_one()
        return amount_to_french_words(self.mcct_net_to_pay, self.currency_id.name)

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
