{
    'name': 'MCCT Industry — Chantiers & Facturation',
    'version': '19.0.1.0.0',
    'summary': "Suivi de chantiers industriels, situations de travaux, "
               "retenue de garantie et portail client (MAD, mètres)",
    'description': """
MCCT Industry — Ingénierie industrielle · Fabrication · Construction
====================================================================

Module Odoo pour suivre les chantiers (charpente métallique, chaudronnerie,
tuyauterie, installation d'équipements, maintenance) et les facturer
selon les usages marocains :

* Chantiers : phase, avancement, adresse, réf. marché, dates de réception.
* Situations de travaux (décomptes) : quantités du marché, cumul précédent,
  cumul à date, montant de la période.
* Avance sur travaux et déduction automatique sur chaque situation.
* Retenue de garantie (10 % par défaut) plafonnée à 7 % du marché.
* Facture générée depuis la situation, montant en lettres en français,
  ICE du client, net à payer.
* Rapports de chantier journaliers avec photos.
* Portail client « Mes chantiers » : avancement, situations, factures,
  rapports et documents partagés, approbation des situations en ligne.
* Société en dirham marocain (MAD), plan comptable marocain, unités
  métriques (m, m², m³, kg).
""",
    'category': 'Services/Project',
    'author': 'MCCT Industry',
    'website': 'https://www.mcct-industry.ma',
    'license': 'LGPL-3',
    'depends': [
        'sale_project',
        'hr_timesheet',
        'purchase',
        'portal',
        'l10n_ma',
    ],
    'data': [
        'security/mcct_security.xml',
        'security/ir.model.access.csv',
        'data/mcct_data.xml',
        'data/product_data.xml',
        'report/report_paperformat.xml',
        'report/report_situation.xml',
        'report/report_site_report.xml',
        'report/report_invoice.xml',
        'data/mail_template_data.xml',
        'views/project_project_views.xml',
        'views/mcct_situation_views.xml',
        'views/mcct_site_report_views.xml',
        'views/account_move_views.xml',
        'views/res_company_views.xml',
        'views/portal_templates.xml',
        'views/menus.xml',
    ],
    'demo': [
        'demo/mcct_demo.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'mcct_industry/static/src/scss/portal.scss',
        ],
        'web.report_assets_common': [
            'mcct_industry/static/src/scss/report.scss',
        ],
    },
    'post_init_hook': 'post_init_hook',
    'application': True,
    'installable': True,
}
