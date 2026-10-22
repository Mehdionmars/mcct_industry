from odoo import models


class SaleOrder(models.Model):
    _inherit = 'sale.order'

    def _mcct_site_project(self):
        """Chantier rattaché à la commande (projet choisi ou créé par la commande)."""
        self.ensure_one()
        if self.project_id.mcct_is_site:
            return self.project_id
        projects = self.env['project.project'].sudo().search([
            ('sale_line_id.order_id', '=', self.id), ('mcct_is_site', '=', True),
        ], limit=1)
        return projects

    def _prepare_invoice(self):
        vals = super()._prepare_invoice()
        project = self._mcct_site_project()
        if project:
            vals['mcct_project_id'] = project.id
        return vals


class SaleOrderLine(models.Model):
    _inherit = 'sale.order.line'

    def _timesheet_create_project_prepare_values(self):
        """Le projet créé à la confirmation du devis devient un chantier."""
        vals = super()._timesheet_create_project_prepare_values()
        order = self.order_id
        vals.update({
            'name': f"{order.name} — {order.partner_id.commercial_partner_id.name}",
            'mcct_is_site': True,
            'privacy_visibility': 'portal',
            'mcct_contract_ref': order.client_order_ref or order.name,
            'mcct_contract_date': order.date_order.date() if order.date_order else False,
        })
        return vals
