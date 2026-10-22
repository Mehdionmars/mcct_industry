from odoo import fields, models


class ResCompany(models.Model):
    _inherit = 'res.company'

    # Mentions légales marocaines (l'ICE est le champ standard company_registry).
    mcct_if = fields.Char("Identifiant fiscal (IF)")
    mcct_rc = fields.Char("Registre de commerce (RC)")
    mcct_patente = fields.Char("Patente / Taxe professionnelle")
    mcct_cnss = fields.Char("N° CNSS")

    # Valeurs par défaut des nouveaux chantiers.
    mcct_retention_rate = fields.Float(
        "Retenue de garantie (%)", default=10.0,
        help="Pourcentage retenu sur chaque situation de travaux.")
    mcct_retention_cap_rate = fields.Float(
        "Plafond de la retenue (% du marché)", default=7.0,
        help="La retenue cesse de croître lorsqu'elle atteint ce pourcentage "
             "du montant du marché. 0 = pas de plafond.")
    mcct_retention_base = fields.Selection(
        [('untaxed', "Montant HT"), ('total', "Montant TTC")],
        string="Base de la retenue", default='total', required=True)

    def action_mcct_open_settings(self):
        return {
            'type': 'ir.actions.act_window',
            'name': "Paramètres chantiers",
            'res_model': 'res.company',
            'res_id': self.env.company.id,
            'view_mode': 'form',
            'views': [(self.env.ref('mcct_industry.view_company_form_mcct_settings').id, 'form')],
            'target': 'current',
        }
