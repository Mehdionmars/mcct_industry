from odoo import api, fields, models

VAT_NATURES = [
    ('travaux', "Travaux immobiliers"),
    ('services', "Prestations de services"),
]


class ProductTemplate(models.Model):
    _inherit = 'product.template'

    mcct_vat_nature = fields.Selection(
        VAT_NATURES, string="Nature fiscale (TVA)",
        help="Ouvrage (travaux immobiliers, ligne 87 de la déclaration de TVA) ou "
             "prestation de services (ligne 81). Détermine aussi la retenue à la "
             "source opérée par les clients concernés.")

    @api.onchange('mcct_vat_nature')
    def _onchange_mcct_vat_nature(self):
        tax = self.env.company._mcct_nature_tax(self.mcct_vat_nature)
        if tax:
            self.taxes_id = tax
