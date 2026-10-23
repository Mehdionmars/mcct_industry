{
    'name': 'MCCT Industry — Chantiers & Facturation',
    'version': '19.0.1.1.0',
    'summary': "Suivi de chantiers industriels, situations de travaux, "
               "retenue de garantie et portail client (MAD, mètres)",
    'description': """
MCCT Industry — Ingénierie industrielle · Fabrication · Construction
====================================================================

Module Odoo pour suivre les chantiers (charpente métallique, chaudronnerie,
tuyauterie, installation d'équipements, maintenance) et les facturer
selon les usages marocains. L'entreprise ne vend pas de marchandises :
elle facture des ouvrages et des prestations, et gère son parc de matériel,
d'engins et de machines.

* Chantiers : phase, avancement, adresse, réf. marché, dates de réception.
* Situations de travaux (décomptes) : quantités du marché, cumul précédent,
  cumul à date, montant de la période.
* Avance sur travaux et déduction automatique sur chaque situation.
* Retenue de garantie (10 % par défaut) plafonnée à 7 % du marché.
* Facture générée depuis la situation, montant en lettres en français,
  ICE du client, net à payer.
* Rapports de chantier journaliers avec photos.
* Parc matériel, engins et machines : affectation aux chantiers par
  glisser-déposer, historique, coût d'immobilisation imputé au chantier,
  contrôles réglementaires et maintenance.
* Carte des chantiers : villes du Maroc (provinces du Sud incluses) avec le
  nombre de chantiers, leur avancement et le matériel sur site.
* Portail client « Mes chantiers » : avancement, situations, factures,
  rapports et documents partagés, approbation des situations en ligne.
* Société en dirham marocain (MAD), plan comptable marocain, unités
  métriques (m, m², m³, kg).
* Fiscalité marocaine : TVA par nature (travaux immobiliers ou prestations
  de services, pas de vente de marchandises) au régime des encaissements,
  retenue à la source sur la TVA
  (article 117 du CGI), exonération (article 92) et suspension (article 94),
  mentions légales (article 145 du CGI : ICE, IF, RC, TP, mode de paiement),
  délai de paiement de 60 jours (loi 69-21).
""",
    'category': 'Services/Project',
    'author': 'MCCT Industry',
    'website': 'https://www.mcct-industry.ma',
    'license': 'LGPL-3',
    'depends': [
        'sale_project',
        'hr_timesheet',
        'purchase',
        'maintenance',
        'portal',
        'l10n_ma',
    ],
    'data': [
        'security/mcct_security.xml',
        'security/ir.model.access.csv',
        'data/mcct_data.xml',
        'data/product_data.xml',
        'data/equipment_data.xml',
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
        'views/fiscal_views.xml',
        'views/equipment_views.xml',
        'views/chantier_map_views.xml',
        'views/portal_templates.xml',
        'views/menus.xml',
    ],
    'demo': [
        'demo/mcct_demo.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'mcct_industry/static/src/chantier_map/**/*',
        ],
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
