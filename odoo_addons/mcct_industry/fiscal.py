"""Paramétrage fiscal marocain d'une société (plan comptable « ma » d'Odoo).

Utilisé à l'installation (hooks.py) et lors de la mise à jour (migrations/).

* MCCT ne vend pas de marchandises : chaque ligne facturée est soit un ouvrage
  (travaux immobiliers, 20 %, ligne 87 de la déclaration), soit une prestation
  de services (20 %, ligne 81). La localisation d'Odoo applique déjà le régime
  des encaissements (exigibilité au paiement).
* Comptes de produits du PCGM : 71241 Travaux, 71242 Études, 71243 Prestations
  de services.
* Positions fiscales : exonération (article 92 du CGI) et suspension (article 94).
* Compte « État – TVA retenue à la source » pour constater la retenue opérée par
  les clients (article 117 du CGI).
* Délai de paiement par défaut de 60 jours (loi 69-21).
"""
import logging

_logger = logging.getLogger(__name__)

NATURE_TAX = {
    'travaux': 'vat_out_20_87',     # Opérations d'entreprises de travaux immobiliers
    'services': 'vat_out_20_81',    # Prestations de services
}
NATURE_ACCOUNT = {
    'travaux': 'pcg_71241',     # Travaux
    'services': 'pcg_71243',    # Prestations de services
}
# TVA par défaut de la localisation (ligne 80, vente de biens produits) : sans objet ici.
GENERIC_SALE_TAX = 'vat_out_20_80'
# Catalogue livré avec le module : nature fiscale et, au besoin, compte particulier.
PRODUCT_NATURE = {
    'product_etude': ('services', 'pcg_71242'),  # Études
    'product_charpente_kg': ('travaux', None),
    'product_bardage_m2': ('travaux', None),
    'product_couverture_m2': ('travaux', None),
    'product_tuyauterie_ml': ('travaux', None),
    'product_garde_corps_ml': ('travaux', None),
    'product_peinture_m2': ('travaux', None),
    'product_beton_m3': ('travaux', None),
    'product_dallage_m2': ('travaux', None),
    'product_advance': ('travaux', None),
    'product_milestone': ('travaux', None),
    'product_chaudronnerie_kg': ('travaux', None),
    'product_montage_h': ('services', None),
    'product_levage_forfait': ('services', None),
}
EXEMPTIONS = [
    {
        'key': 'fp_exoneration_art92',
        'name': "Exonération de TVA (article 92 du CGI)",
        'tax': 'vat_out_0_40',
        'tax_name': "0% 40 Exonération art. 92",
        'note': "<p>Vente en exonération de la TVA en application de l'article 92 du "
                "Code Général des Impôts.</p>",
    },
    {
        'key': 'fp_suspension_art94',
        'name': "Suspension de TVA (article 94 du CGI)",
        'tax': 'vat_out_0_50',
        'tax_name': "0% 50 Suspension art. 94",
        'note': "<p>Vente en suspension de la TVA en application de l'article 94 du "
                "Code Général des Impôts.</p>",
    },
]
WITHHOLDING_ACCOUNT_CODE = '345810'
WITHHOLDING_ACCOUNT_NAME = "État - TVA retenue à la source par les clients"


def setup_moroccan_tax(env, company):
    """Applique le paramétrage fiscal marocain (sans écraser les choix existants)."""
    if company.chart_template != 'ma':
        return
    chart = env['account.chart.template'].with_company(company)

    def ref(xmlid):
        return chart.ref(xmlid, raise_if_not_found=False)

    taxes = {nature: ref(xmlid) for nature, xmlid in NATURE_TAX.items()}
    for tax in [*taxes.values(), *(ref(e['tax']) for e in EXEMPTIONS)]:
        if tax and not tax.active:
            tax.active = True

    # TVA par défaut de la société : travaux immobiliers (activité principale) au
    # lieu de la TVA « production et distribution » proposée par la localisation.
    if taxes['travaux'] and company.account_sale_tax_id in (ref(GENERIC_SALE_TAX), env['account.tax']):
        company.account_sale_tax_id = taxes['travaux']

    _setup_products(env, company, ref, taxes)
    _setup_exemptions(env, company, ref, taxes)
    _setup_withholding_account(env, company, ref)
    _setup_payment_term(env, company)


def _setup_products(env, company, ref, taxes):
    # TVA remplaçables : celles des natures et la TVA 20 % « production et
    # distribution » que la localisation pose par défaut sur tous les articles.
    replaceable = env['account.tax'].browse([t.id for t in taxes.values() if t])
    replaceable |= ref(GENERIC_SALE_TAX) or env['account.tax']
    for xmlid, (nature, account_xmlid) in PRODUCT_NATURE.items():
        template = env.ref(f'mcct_industry.{xmlid}', raise_if_not_found=False)
        if not template:
            continue
        template = template.with_company(company)
        vals = {'mcct_vat_nature': nature}
        account = ref(account_xmlid or NATURE_ACCOUNT[nature])
        if account:
            vals['property_account_income_id'] = account.id
        tax = taxes.get(nature)
        company_taxes = template.taxes_id.filtered(lambda t: t.company_id == company)
        # On remplace la TVA 20 % générique par celle de la nature, sans toucher
        # à un taux choisi manuellement (14 %, 10 %, exonéré…).
        if tax and (not company_taxes or company_taxes <= replaceable):
            vals['taxes_id'] = [(3, t.id) for t in company_taxes] + [(4, tax.id)]
        template.write(vals)


def _setup_exemptions(env, company, ref, taxes):
    """Positions fiscales d'exonération et de suspension.

    Dans Odoo 19, une taxe remplace ses « taxes d'origine » dans toutes les
    positions fiscales auxquelles elle appartient. Les TVA 0 % de la localisation
    appartiennent aussi à la position « Maroc » appliquée par défaut aux clients
    marocains : on utilise donc une copie dédiée à chaque position, sinon toutes
    les factures nationales passeraient à 0 %.
    """
    sources = env['account.tax'].browse([t.id for t in taxes.values() if t])
    for exemption in EXEMPTIONS:
        base_tax = ref(exemption['tax'])
        if not base_tax:
            continue
        if base_tax.original_tax_ids & sources:
            base_tax.original_tax_ids = [(3, source.id) for source in base_tax.original_tax_ids & sources]
        position = _company_record(env, company, exemption['key'])
        if not position:
            position = env['account.fiscal.position'].create({
                'name': exemption['name'],
                'company_id': company.id,
                'note': exemption['note'],
                'auto_apply': False,
            })
            _register_company_record(env, company, exemption['key'], position)
        tax = _company_record(env, company, f"{exemption['key']}_tax")
        if not tax:
            tax = base_tax.copy({
                'name': exemption['tax_name'],
                'fiscal_position_ids': [(6, 0, position.ids)],
                'original_tax_ids': [(6, 0, sources.ids)],
            })
            _register_company_record(env, company, f"{exemption['key']}_tax", tax)
        position.tax_ids = [(3, base_tax.id), (4, tax.id)]


def _company_record(env, company, key):
    return env.ref(f'mcct_industry.{company.id}_{key}', raise_if_not_found=False)


def _register_company_record(env, company, key, record):
    env['ir.model.data'].create({
        'module': 'mcct_industry',
        'name': f'{company.id}_{key}',
        'model': record._name,
        'res_id': record.id,
        'noupdate': True,
    })


def _setup_withholding_account(env, company, ref):
    if company.mcct_vat_withholding_account_id:
        return
    Account = env['account.account'].with_company(company)
    account = Account.search([
        ('code', '=', WITHHOLDING_ACCOUNT_CODE),
        ('company_ids', 'in', company.id),
    ], limit=1)
    if not account:
        account = Account.create({
            'code': WITHHOLDING_ACCOUNT_CODE,
            'name': WITHHOLDING_ACCOUNT_NAME,
            'account_type': 'asset_current',
            'company_ids': [(6, 0, [company.id])],
        })
    company.mcct_vat_withholding_account_id = account


def _setup_payment_term(env, company):
    term = env.ref('mcct_industry.payment_term_60_days', raise_if_not_found=False)
    if not term:
        return
    defaults = env['ir.default'].sudo()
    if not defaults._get('res.partner', 'property_payment_term_id', company_id=company.id):
        defaults.set('res.partner', 'property_payment_term_id', term.id, company_id=company.id)
