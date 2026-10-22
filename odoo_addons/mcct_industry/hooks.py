"""Configuration initiale : société MCCT au Maroc, dirham, plan comptable
marocain, unités métriques et interface en français."""
import base64
import logging

from odoo.tools.misc import file_open

_logger = logging.getLogger(__name__)

# Noms donnés par Odoo à la société d'une base neuve.
DEFAULT_COMPANY_NAMES = ('YourCompany', 'Your Company', 'My Company')

# Comptes de produits du plan comptable marocain (PCGM).
WORKS_INCOME_ACCOUNT = 'pcg_71241'   # Travaux (production au Maroc)
STUDIES_INCOME_ACCOUNT = 'pcg_71242'  # Études (production au Maroc)

STUDY_PRODUCTS = ('mcct_industry.product_etude',)
WORK_PRODUCTS = (
    'mcct_industry.product_advance',
    'mcct_industry.product_charpente_kg',
    'mcct_industry.product_bardage_m2',
    'mcct_industry.product_couverture_m2',
    'mcct_industry.product_tuyauterie_ml',
    'mcct_industry.product_garde_corps_ml',
    'mcct_industry.product_chaudronnerie_kg',
    'mcct_industry.product_peinture_m2',
    'mcct_industry.product_beton_m3',
    'mcct_industry.product_dallage_m2',
    'mcct_industry.product_montage_h',
    'mcct_industry.product_levage_forfait',
)


def post_init_hook(env):
    env.ref('base.MAD').active = True
    with_demo = env['ir.module.module'].search([('name', '=', 'mcct_industry')]).demo
    company = env.ref('base.main_company')
    if with_demo:
        # En démo, la société principale d'Odoo est américaine (USD) et a déjà des
        # écritures : on utilise la société marocaine de démonstration de l10n_ma.
        company = _setup_demo_company(env) or company
    _setup_company(env, company, force=with_demo)
    _setup_language(env, company)

    # Odoo charge le plan comptable de la société à la fin du chargement des
    # modules (module « account », _register_hook) : le plan générique écraserait
    # le plan marocain s'il était chargé maintenant. On passe donc après lui.
    previous_loader = getattr(env.registry, '_auto_install_template', None)

    def finalize(registry_env):
        target = registry_env['res.company'].browse(company.id)
        loads_moroccan_chart = target == registry_env.company and target.country_id.code == 'MA'
        if previous_loader and not loads_moroccan_chart:
            previous_loader(registry_env)
        _setup_chart_and_currency(registry_env, target)
        _setup_products_accounting(registry_env, target)
        if with_demo:
            try:
                with registry_env.cr.savepoint():
                    _load_demo(registry_env, target)
            except Exception:  # noqa: BLE001 — la démo ne doit pas bloquer l'installation
                _logger.exception("Données de démonstration MCCT non chargées.")

    if env.registry.loaded:
        finalize(env)
    else:
        env.registry._auto_install_template = finalize


def _setup_demo_company(env):
    company = env.ref('base.demo_company_ma', raise_if_not_found=False)
    if not company:
        return None
    admin = env.ref('base.user_admin')
    admin.write({'company_ids': [(4, company.id)], 'company_id': company.id})
    return company


def _setup_company(env, company, force=False):
    """Coordonnées MCCT sur une société neuve (ou sur la société de démo)."""
    vals = {}
    if force or company.name in DEFAULT_COMPANY_NAMES:
        vals.update({
            'name': 'MCCT Industry',
            'street': 'Route 310, km 6',
            'street2': 'Chellalate',
            'city': 'Aïn Harrouda',
            'phone': '+212 661 49 47 61',
            'email': 'mcctindustry@gmail.com',
            'website': 'https://www.mcct-industry.ma',
            'report_header': "Ingénierie industrielle — Fabrication · Construction",
        })
        with file_open('mcct_industry/static/img/logo.png', 'rb') as logo:
            vals['logo'] = base64.b64encode(logo.read())
    if not company.country_id:
        vals['country_id'] = env.ref('base.ma').id
    if vals:
        company.write(vals)


def _setup_chart_and_currency(env, company):
    mad = env.ref('base.MAD')
    if company.country_id.code != 'MA':
        _logger.info("Société hors Maroc : plan comptable et devise inchangés.")
        return
    if company.chart_template != 'ma':
        if company._existing_accounting():
            _logger.warning(
                "La société %s a déjà des écritures comptables : le plan comptable "
                "marocain n'a pas été chargé automatiquement.", company.name)
        else:
            env['account.chart.template'].try_loading('ma', company, install_demo=False)
    if company.currency_id != mad and not company._existing_accounting():
        company.currency_id = mad


def _setup_products_accounting(env, company):
    """Comptes de produits « Travaux » / « Études » et TVA 20 % sur le catalogue."""
    if company.chart_template != 'ma':
        return
    chart = env['account.chart.template'].with_company(company)
    accounts = {
        STUDY_PRODUCTS: chart.ref(STUDIES_INCOME_ACCOUNT, raise_if_not_found=False),
        WORK_PRODUCTS: chart.ref(WORKS_INCOME_ACCOUNT, raise_if_not_found=False),
    }
    sale_tax = company.account_sale_tax_id
    for xmlids, account in accounts.items():
        for xmlid in xmlids:
            template = env.ref(xmlid, raise_if_not_found=False)
            if not template:
                continue
            template = template.with_company(company)
            vals = {}
            if account:
                vals['property_account_income_id'] = account.id
            if sale_tax and not template.taxes_id.filtered(lambda t: t.company_id == company):
                vals['taxes_id'] = [(4, sale_tax.id)]
            if vals:
                template.write(vals)


def _setup_language(env, company):
    """Installe le français et l'applique à la société et à l'administrateur."""
    lang = env['res.lang']._activate_lang('fr_FR')
    if not lang:
        return
    try:
        env['ir.module.module'].search([('state', '=', 'installed')])._update_translations(['fr_FR'])
    except Exception:  # noqa: BLE001 — la traduction ne doit pas bloquer l'installation
        _logger.exception("Chargement des traductions françaises impossible.")
    partners = company.partner_id
    admin = env.ref('base.user_admin', raise_if_not_found=False)
    if admin:
        partners |= admin.partner_id
    partners.filtered(lambda p: p.lang in (False, 'en_US')).write({'lang': 'fr_FR'})


def _load_demo(env, company):
    """Chantier de démonstration complet : devis, chantier, situations, rapports."""
    client = env.ref('mcct_industry.demo_partner_client', raise_if_not_found=False)
    if not client or env['project.project'].search_count([('partner_id', '=', client.id)]):
        return
    if env['res.lang'].search([('code', '=', 'fr_FR')]):
        (client | client.child_ids).write({'lang': 'fr_FR'})

    prices = {
        'mcct_industry.product_etude': 15000.0,
        'mcct_industry.product_charpente_kg': 28.0,
        'mcct_industry.product_couverture_m2': 280.0,
        'mcct_industry.product_bardage_m2': 320.0,
        'mcct_industry.product_garde_corps_ml': 650.0,
        'mcct_industry.product_peinture_m2': 85.0,
    }
    for xmlid, price in prices.items():
        env.ref(xmlid).list_price = price

    def line(xmlid, qty):
        product = env.ref(xmlid).product_variant_id
        return (0, 0, {'product_id': product.id, 'product_uom_qty': qty})

    def section(name):
        return (0, 0, {'display_type': 'line_section', 'name': name})

    order = env['sale.order'].with_company(company).create({
        'partner_id': client.id,
        'client_order_ref': 'BC-2026-0418',
        'order_line': [
            section("Lot 1 — Études"),
            line('mcct_industry.product_etude', 1),
            section("Lot 2 — Charpente et couverture"),
            line('mcct_industry.product_charpente_kg', 24000),
            line('mcct_industry.product_couverture_m2', 1800),
            line('mcct_industry.product_peinture_m2', 2600),
            section("Lot 3 — Bardage et sécurité"),
            line('mcct_industry.product_bardage_m2', 1200),
            line('mcct_industry.product_garde_corps_ml', 85),
        ],
    })
    order.action_confirm()
    project = env['project.project'].search([('sale_line_id.order_id', '=', order.id)], limit=1)
    if not project:
        return
    project.write({
        'name': "Hangar de stockage clinker — Settat",
        'mcct_activity': 'charpente',
        'mcct_phase': 'montage',
        'mcct_site_address': "Route de Ben Ahmed, km 4",
        'mcct_site_city': "Settat",
        'mcct_advance_rate': 10.0,
        'user_id': env.ref('base.user_admin').id,
    })

    # Avance de démarrage (10 %), validée.
    project.action_mcct_invoice_advance()
    project.mcct_invoice_ids.filtered('mcct_is_advance').action_post()

    progress_by_product = [
        {'mcct_industry.product_etude': 1, 'mcct_industry.product_charpente_kg': 9600,
         'mcct_industry.product_peinture_m2': 900},
        {'mcct_industry.product_etude': 1, 'mcct_industry.product_charpente_kg': 19200,
         'mcct_industry.product_peinture_m2': 2100, 'mcct_industry.product_couverture_m2': 600,
         'mcct_industry.product_bardage_m2': 250},
    ]
    Situation = env['mcct.situation']
    for index, quantities in enumerate(progress_by_product):
        situation = Situation.create({'project_id': project.id})
        by_product = {env.ref(xmlid).product_variant_id: qty for xmlid, qty in quantities.items()}
        for sit_line in situation.line_ids.filtered(lambda l: not l.display_type):
            if sit_line.product_id in by_product:
                sit_line.cumulative_qty = by_product[sit_line.product_id]
        if index == 0:
            situation.action_approve(approved_by="Karim Benali")
            situation.action_create_invoice()
            situation.invoice_id.action_post()
        else:
            situation.action_mark_sent()

    reports = [
        ("Levage des portiques file A", 14, 'soleil',
         "<p>Levage des portiques A1 à A6 à la grue mobile 60 t. Contreventements posés.</p>",
         "<p>Accès poids lourds à renforcer côté nord (sol détrempé).</p>"),
        ("Pose couverture travées 1 à 3", 11, 'vent',
         "<p>Pose de 600 m² de bac acier. Arrêt de 2 h pour vent fort l'après-midi.</p>", False),
    ]
    for name, workforce, weather, work_done, issues in reports:
        env['mcct.site.report'].create({
            'project_id': project.id,
            'name': name,
            'user_id': env.ref('base.user_admin').id,
            'workforce': workforce,
            'hours_worked': workforce * 8.0,
            'weather': weather,
            'work_done': work_done,
            'issues': issues,
            'state': 'published',
        })
