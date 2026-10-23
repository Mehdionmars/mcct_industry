"""Mise à jour 19.0.1.2.0 : nature fiscale de l'article « Échéance du marché »."""
from odoo import SUPERUSER_ID, api

from odoo.addons.mcct_industry.fiscal import setup_moroccan_tax


def migrate(cr, version):
    env = api.Environment(cr, SUPERUSER_ID, {})
    for company in env['res.company'].search([('chart_template', '=', 'ma')]):
        setup_moroccan_tax(env, company)
