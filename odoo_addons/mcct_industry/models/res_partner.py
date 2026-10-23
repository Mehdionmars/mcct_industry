from odoo import fields, models

PAYMENT_MODES = [
    ('virement', "Virement bancaire"),
    ('cheque', "Chèque"),
    ('effet', "Effet de commerce (LCN)"),
    ('especes', "Espèces"),
    ('carte', "Carte bancaire"),
    ('compensation', "Compensation"),
]


class ResPartner(models.Model):
    _inherit = 'res.partner'

    mcct_vat_withholding = fields.Boolean(
        "Retient la TVA à la source",
        help="Client tenu d'opérer la retenue à la source sur la TVA (article 117 du CGI) : "
             "État, collectivités, établissements et entreprises publics, et grandes "
             "entreprises selon le calendrier de la loi de finances.")
    mcct_payment_mode = fields.Selection(
        PAYMENT_MODES, string="Mode de paiement", default='virement',
        help="Imprimé sur les factures (article 145 du CGI).")
    mcct_vat_exemption_ref = fields.Char(
        "Attestation d'exonération / suspension",
        help="Numéro et date de l'attestation (exonération article 92 ou suspension "
             "article 94 du CGI), imprimés sur les factures.")
