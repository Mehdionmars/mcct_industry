"""Configuration initiale : société MCCT au Maroc, dirham, plan comptable
marocain, unités métriques et interface en français."""
import base64
import logging
from datetime import timedelta

from odoo import fields
from odoo.tools.misc import file_open

from .fiscal import setup_moroccan_tax

_logger = logging.getLogger(__name__)

# Noms donnés par Odoo à la société d'une base neuve.
DEFAULT_COMPANY_NAMES = ('YourCompany', 'Your Company', 'My Company')

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
        setup_moroccan_tax(registry_env, target)
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

    _load_demo_sites(env, company)
    _load_demo_equipment(env, company, project)


# Autres chantiers de démonstration pour la carte : (client, ICE, ville du client,
# chantier, activité, phase, montant HT, avancement, ville, fin prévue dans N jours).
DEMO_SITES = [
    ("Atlas Énergie SARL", "002345678000091", "Mohammedia",
     "Réservoirs de stockage gasoil 2 × 1 500 m³", 'chaudronnerie', 'fabrication',
     2450000.0, 35.0, "Mohammedia", 120),
    ("Phosphates & Engrais du Littoral SA", "003456789000012", "El Jadida",
     "Passerelle de convoyeur phosphate", 'charpente', 'montage',
     3800000.0, 60.0, "Jorf Lasfar", -10),
    ("Tanger Logistique Parc SA", "004567890000034", "Tanger",
     "Atelier de maintenance et pont roulant 10 t", 'construction', 'approvisionnement',
     1950000.0, 10.0, "Tanger Med", 210),
    ("Souss Agro Industrie SARL", "005678901000056", "Agadir",
     "Réseau de tuyauterie vapeur", 'tuyauterie', 'essais',
     860000.0, 90.0, "Agadir", 15),
    ("Dakhla Halieutique SARL", "006789012000078", "Dakhla",
     "Charpente de l'unité de congélation", 'charpente', 'etude',
     1200000.0, 5.0, "Dakhla", 300),
    ("Atlantic Auto Composants SA", "007890123000090", "Kénitra",
     "Bardage et désenfumage de l'usine", 'charpente', 'reception_provisoire',
     1450000.0, 100.0, "Kénitra", -60),
    ("Sahara Logistique SARL", "008901234000013", "Laâyoune",
     "Hangar logistique 2 400 m²", 'charpente', 'fabrication',
     1680000.0, 25.0, "Laâyoune", 150),
]


def _load_demo_sites(env, company):
    today = fields.Date.context_today(env['project.project'])
    client = env.ref('mcct_industry.demo_partner_client')
    sites = [(client, "Maintenance des convoyeurs du broyeur", 'maintenance', 'montage',
              420000.0, 50.0, "Settat", 45)]
    for name, ice, partner_city, *site in DEMO_SITES:
        partner = env['res.partner'].create({
            'name': name,
            'is_company': True,
            'city': partner_city,
            'country_id': env.ref('base.ma').id,
            'company_registry': ice,
            'lang': 'fr_FR' if env['res.lang'].search([('code', '=', 'fr_FR')]) else 'en_US',
        })
        sites.append((partner, *site))
    for partner, name, activity, phase, amount, progress, city, end_in in sites:
        env['project.project'].with_company(company).create({
            'name': f"{name} — {city}",
            'partner_id': partner.id,
            'company_id': company.id,
            'mcct_is_site': True,
            'privacy_visibility': 'portal',
            'allow_billable': True,
            'mcct_activity': activity,
            'mcct_phase': phase,
            'mcct_contract_amount': amount,
            'mcct_progress': progress,
            'mcct_site_city': city,
            'date_start': today - timedelta(days=90),
            'date': today + timedelta(days=end_in),
            'user_id': env.ref('base.user_admin').id,
        })


# (nom, modèle, famille, immatriculation, coût/jour, ville du chantier ou None = dépôt,
#  arrivé depuis N jours, dernier contrôle il y a N mois)
DEMO_EQUIPMENT = [
    ("Grue mobile 60 t", "Liebherr LTM 1060-3.1", 'levage', "45872-A-6", 6500.0, "Settat", 40, 5),
    ("Nacelle articulée 16 m", "Haulotte HA16 RTJ", 'levage', None, 1200.0, "Settat", 35, 2),
    ("Chariot télescopique 18 m", "Manitou MT 1840", 'levage', None, 1500.0, "Jorf Lasfar", 60, 7),
    ("Camion grue 12 t·m", "Iveco Eurocargo + Fassi F120", 'vehicules', "31207-B-6", 2200.0, "Mohammedia", 20, 3),
    ("Camion plateau 26 t", "Mercedes-Benz Actros 2643", 'vehicules', "18934-A-1", 1800.0, None, 0, 4),
    ("Pelle sur chenilles 21 t", "Caterpillar 320", 'terrassement', "WW-5521", 3500.0, "Tanger Med", 12, 6),
    ("Plieuse hydraulique 3 m — 135 t", "Amada HFE 1303", 'atelier', None, 900.0, None, 0, 8),
    ("Cisaille guillotine 3 m", "Durma SBT 3006", 'atelier', None, 600.0, None, 0, 8),
    ("Poste à souder MIG 400 A", "Lincoln Powertec i420S", 'soudage', None, 150.0, "Mohammedia", 50, 9),
    ("Poste TIG 300 A", "Fronius MagicWave 3000", 'soudage', None, 150.0, "Agadir", 70, 9),
    ("Groupe électrogène 100 kVA", "SDMO J110", 'materiel', None, 800.0, "Jorf Lasfar", 60, 10),
    ("Échafaudage multidirectionnel 400 m²", "Layher Allround", 'materiel', None, 600.0, "Settat", 38, 11),
    ("Compresseur 7 bar", "Atlas Copco XAS 88", 'materiel', None, 400.0, "Agadir", 70, 10),
]


def _load_demo_equipment(env, company, main_project):
    today = fields.Date.context_today(env['project.project'])
    sites = env['project.project'].search([('mcct_is_site', '=', True), ('company_id', '=', company.id)])
    site_by_city = {}
    for site in sites.sorted('id'):
        site_by_city.setdefault(site.mcct_site_city, site)
    site_by_city["Settat"] = main_project
    team = env['maintenance.team'].search([('company_id', '=', company.id)], limit=1)
    if not team:
        team = env['maintenance.team'].create({'name': "Atelier & parc matériel", 'company_id': company.id})
    Equipment = env['maintenance.equipment'].with_company(company)
    for name, model, family, plate, cost, city, days_ago, months_ago in DEMO_EQUIPMENT:
        site = site_by_city.get(city) if city else False
        equipment = Equipment.create({
            'name': name,
            'model': model,
            'category_id': env.ref(f'mcct_industry.equipment_category_{family}').id,
            'company_id': company.id,
            'maintenance_team_id': team.id,
            'mcct_registration': plate or False,
            'mcct_daily_cost': cost,
            'mcct_project_id': site.id if site else False,
            'mcct_inspection_date': today - timedelta(days=30 * months_ago),
        })
        if site and days_ago:
            equipment.mcct_assignment_ids.with_context(mcct_skip_assignment=True).date_start = (
                today - timedelta(days=days_ago))
    # Historique : la grue était sur le chantier de Kénitra avant Settat.
    crane = Equipment.search([('name', '=', "Grue mobile 60 t"), ('company_id', '=', company.id)], limit=1)
    kenitra = site_by_city.get("Kénitra")
    if crane and kenitra:
        env['mcct.equipment.assignment'].with_context(mcct_skip_assignment=True).create({
            'equipment_id': crane.id,
            'project_id': kenitra.id,
            'date_start': today - timedelta(days=95),
            'date_end': today - timedelta(days=41),
            'daily_cost': crane.mcct_daily_cost,
        })
    truck = Equipment.search([('name', '=', "Camion plateau 26 t"), ('company_id', '=', company.id)], limit=1)
    if truck:
        env['maintenance.request'].with_company(company).create({
            'name': "Fuite hydraulique sur la ridelle",
            'equipment_id': truck.id,
            'company_id': company.id,
            'maintenance_team_id': team.id,
            'maintenance_type': 'corrective',
            'priority': '2',
        })
