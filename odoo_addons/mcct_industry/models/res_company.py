from dateutil.relativedelta import relativedelta

from odoo import fields, models

from ..fiscal import NATURE_TAX

LEGAL_FORMS = [
    ('sarl', "SARL"),
    ('sarlau', "SARL AU"),
    ('sa', "SA"),
    ('sas', "SAS"),
    ('snc', "SNC"),
    ('scs', "SCS"),
    ('ei', "Entreprise individuelle"),
]
# Durée de validité de l'attestation de régularité fiscale (communiqué DGI, 2024).
TAX_CERTIFICATE_VALIDITY = relativedelta(months=6)


class ResCompany(models.Model):
    _inherit = 'res.company'

    # Mentions légales marocaines (l'ICE est le champ standard company_registry).
    mcct_if = fields.Char("Identifiant fiscal (IF)")
    mcct_rc = fields.Char("Registre de commerce (RC)")
    mcct_patente = fields.Char("Patente / Taxe professionnelle")
    mcct_cnss = fields.Char("N° CNSS")
    mcct_legal_form = fields.Selection(LEGAL_FORMS, string="Forme juridique")
    mcct_capital = fields.Monetary("Capital social", currency_field='currency_id')
    mcct_rc_city = fields.Char("Ville du RC (tribunal)", help="Ex. : Casablanca")

    # Retenue à la source sur la TVA (article 117 du CGI).
    mcct_tax_certificate_date = fields.Date(
        "Date de l'attestation de régularité fiscale",
        help="Attestation délivrée par la DGI (Simpl-Attestations), valable 6 mois. "
             "Tant qu'elle est valable, les clients retiennent 75 % de la TVA sur les "
             "prestations de services et rien sur les travaux ; sinon ils retiennent "
             "100 % de la TVA.")
    mcct_vat_withholding_account_id = fields.Many2one(
        'account.account', string="Compte TVA retenue à la source",
        check_company=True,
        help="Débité lorsque la TVA retenue par un client est constatée (par défaut "
             "345810 État - TVA retenue à la source par les clients).")

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

    def _mcct_tax_certificate_valid(self, date):
        self.ensure_one()
        start = self.mcct_tax_certificate_date
        return bool(start) and start <= date <= start + TAX_CERTIFICATE_VALIDITY

    def _mcct_vat_withholding_rates(self, date):
        """Part de la TVA retenue par un client soumis à la retenue, par nature."""
        self.ensure_one()
        if self._mcct_tax_certificate_valid(date):
            return {'services': 0.75, 'travaux': 0.0}
        return {'services': 1.0, 'travaux': 1.0}

    def _mcct_nature_tax(self, nature):
        """TVA 20 % correspondant à une nature d'opération (plan comptable marocain)."""
        self.ensure_one()
        if not nature or self.chart_template != 'ma':
            return self.env['account.tax']
        tax = self.env['account.chart.template'].with_company(self).ref(
            NATURE_TAX[nature], raise_if_not_found=False)
        return tax or self.env['account.tax']

    def _mcct_line_nature(self, product, taxes):
        """Nature d'une ligne : celle de l'article, sinon déduite de sa TVA, sinon travaux."""
        self.ensure_one()
        if product.mcct_vat_nature:
            return product.mcct_vat_nature
        for nature in ('services', 'travaux'):
            if self._mcct_nature_tax(nature) & taxes:
                return nature
        return 'travaux'

    def _mcct_address_line(self):
        self.ensure_one()
        return ", ".join(part for part in (self.street, self.street2, self.city) if part)

    def _mcct_legal_form_label(self):
        self.ensure_one()
        return dict(LEGAL_FORMS).get(self.mcct_legal_form, '')

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
