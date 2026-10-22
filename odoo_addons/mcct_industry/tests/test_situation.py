from odoo import Command
from odoo.exceptions import UserError, ValidationError
from odoo.tests import tagged

from odoo.addons.account.tests.common import AccountTestInvoicingCommon


@tagged('post_install', '-at_install')
class TestMcctSituation(AccountTestInvoicingCommon):

    @classmethod
    @AccountTestInvoicingCommon.setup_country('ma')
    def setUpClass(cls):
        super().setUpClass()
        cls.tax_20 = cls.company_data['default_tax_sale']
        cls.uom_kg = cls.env.ref('uom.product_uom_kgm')
        cls.uom_m2 = cls.env.ref('uom.product_uom_square_meter')
        cls.client = cls.env['res.partner'].create({
            'name': "Client chantier",
            'is_company': True,
            'country_id': cls.env.ref('base.ma').id,
            'company_registry': '001234567000089',
        })
        service_vals = {
            'type': 'service',
            'invoice_policy': 'delivery',
            'service_type': 'manual',
            'service_tracking': 'project_only',
            'taxes_id': [Command.set(cls.tax_20.ids)],
        }
        cls.charpente = cls.env['product.product'].create({
            **service_vals, 'name': "Charpente", 'uom_id': cls.uom_kg.id, 'list_price': 30.0,
        })
        cls.bardage = cls.env['product.product'].create({
            **service_vals, 'name': "Bardage", 'uom_id': cls.uom_m2.id, 'list_price': 300.0,
        })
        # Avance : même TVA que les travaux dans la société de test.
        cls.advance_product = cls.env.ref('mcct_industry.product_advance')
        cls.advance_product.with_company(cls.env.company).taxes_id = [Command.set(cls.tax_20.ids)]

    @classmethod
    def get_default_groups(cls):
        # Utilisateur type : chef de projet, commercial et comptable.
        return (
            super().get_default_groups()
            | cls.env.ref('project.group_project_manager')
            | cls.env.ref('sales_team.group_sale_manager')
        )

    # ------------------------------------------------------------------
    # Outils
    # ------------------------------------------------------------------
    def _confirm_order(self):
        """Devis 60 000 DH HT : 1 000 kg × 30 + 100 m² × 300 → chantier créé."""
        order = self.env['sale.order'].create({
            'partner_id': self.client.id,
            'client_order_ref': 'BC-TEST',
            'order_line': [
                Command.create({'display_type': 'line_section', 'name': "Lot 1"}),
                Command.create({'product_id': self.charpente.id, 'product_uom_qty': 1000}),
                Command.create({'product_id': self.bardage.id, 'product_uom_qty': 100}),
            ],
        })
        order.action_confirm()
        project = self.env['project.project'].search([('sale_line_id.order_id', '=', order.id)])
        self.assertEqual(len(project), 1)
        return order, project

    def _set_cumulative(self, situation, quantities):
        for line in situation.line_ids.filtered(lambda l: not l.display_type):
            if line.product_id in quantities:
                line.cumulative_qty = quantities[line.product_id]

    def _manual_project(self, **vals):
        return self.env['project.project'].create({
            'name': "Chantier manuel",
            'partner_id': self.client.id,
            'mcct_is_site': True,
            'mcct_retention_rate': 0.0,
            **vals,
        })

    def _manual_situation(self, project, amount):
        situation = self.env['mcct.situation'].create({'project_id': project.id})
        situation.line_ids = [Command.create({
            'name': "Travaux",
            'product_id': self.bardage.id,
            'contract_qty': 1.0,
            'price_unit': project.mcct_contract_amount,
            'cumulative_qty': amount / project.mcct_contract_amount,
        })]
        return situation

    # ------------------------------------------------------------------
    # Tests
    # ------------------------------------------------------------------
    def test_order_creates_site_and_situations(self):
        order, project = self._confirm_order()
        self.assertTrue(project.mcct_is_site)
        self.assertEqual(project.privacy_visibility, 'portal')
        self.assertEqual(project.mcct_contract_ref, 'BC-TEST')
        self.assertEqual(project.mcct_contract_amount, 60000.0)
        self.assertEqual(project.mcct_retention_rate, 10.0)
        self.assertEqual(project.mcct_retention_cap_rate, 7.0)

        # Situation N°1 : reprise du bordereau du devis (section + 2 ouvrages).
        sit1 = self.env['mcct.situation'].create({'project_id': project.id})
        self.assertEqual(sit1.number, 1)
        self.assertEqual(sit1.name, "Situation N°01")
        self.assertEqual(len(sit1.line_ids), 3)
        line_kg = sit1.line_ids.filtered(lambda l: l.product_id == self.charpente)
        line_m2 = sit1.line_ids.filtered(lambda l: l.product_id == self.bardage)
        self.assertEqual(line_kg.uom_id, self.uom_kg)
        self.assertEqual(line_m2.uom_id, self.uom_m2)
        self.assertEqual(line_kg.sale_line_id.order_id, order)

        line_kg.cumulative_qty = 400
        line_m2.progress = 50.0  # saisie en % → 50 m²
        self.assertEqual(line_m2.cumulative_qty, 50.0)
        self.assertEqual(sit1.amount_contract, 60000.0)
        self.assertEqual(sit1.amount_current, 27000.0)
        self.assertEqual(sit1.amount_current_tax, 5400.0)
        self.assertEqual(sit1.amount_total, 32400.0)
        self.assertEqual(sit1.amount_contract_total, 72000.0)
        # Retenue 10 % du TTC = 3 240 (plafond 7 % de 72 000 = 5 040 non atteint).
        self.assertEqual(sit1.retention_amount, 3240.0)
        self.assertEqual(sit1.amount_net, 29160.0)
        self.assertAlmostEqual(sit1.progress, 45.0)

        with self.assertRaises(ValidationError):
            self.env['mcct.situation'].create({'project_id': project.id})

        sit1.action_mark_sent()
        sit1.action_approve(approved_by="M. Client")
        self.assertEqual(sit1.state, 'approved')
        self.assertEqual(sit1.approved_by, "M. Client")
        # Quantités cumulées reportées comme « livrées » sur la commande.
        self.assertEqual(line_kg.sale_line_id.qty_delivered, 400)
        self.assertEqual(line_m2.sale_line_id.qty_delivered, 50)
        with self.assertRaises(UserError):
            line_kg.cumulative_qty = 500

        sit1.action_create_invoice()
        invoice = sit1.invoice_id
        self.assertEqual(sit1.state, 'invoiced')
        self.assertEqual(invoice.mcct_project_id, project)
        self.assertEqual(invoice.amount_untaxed, 27000.0)
        self.assertEqual(invoice.amount_total, 32400.0)
        self.assertEqual(invoice.mcct_retention_amount, 3240.0)
        self.assertEqual(invoice.mcct_net_to_pay, 29160.0)
        self.assertEqual(invoice.amount_total_words, "Trente-deux mille quatre cents dirhams")
        product_lines = invoice.invoice_line_ids.filtered(lambda l: l.display_type == 'product')
        self.assertEqual(sorted(product_lines.mapped('quantity')), [50.0, 400.0])
        self.assertEqual(product_lines.filtered(lambda l: l.product_id == self.charpente).product_uom_id, self.uom_kg)
        invoice.action_post()
        self.assertEqual(line_kg.sale_line_id.qty_invoiced, 400)
        self.assertEqual(project.mcct_amount_invoiced, 32400.0)
        self.assertEqual(project.mcct_amount_residual, 32400.0)
        self.assertEqual(project.mcct_retention_held, 3240.0)
        self.assertEqual(project.mcct_amount_done, 27000.0)
        self.assertAlmostEqual(project.mcct_progress, 45.0)

        # Situation N°2 : reprise des cumuls de la N°1, retenue plafonnée.
        sit2 = self.env['mcct.situation'].create({'project_id': project.id})
        self.assertEqual(sit2.number, 2)
        line2_kg = sit2.line_ids.filtered(lambda l: l.product_id == self.charpente)
        self.assertEqual(line2_kg.previous_qty, 400)
        self.assertEqual(sit2.amount_current, 0.0)
        self._set_cumulative(sit2, {self.charpente: 1000, self.bardage: 100})
        self.assertEqual(sit2.amount_previous, 27000.0)
        self.assertEqual(sit2.amount_current, 33000.0)
        self.assertEqual(sit2.amount_total, 39600.0)
        # 10 % de 39 600 = 3 960, mais plafond 5 040 − 3 240 déjà retenus = 1 800.
        self.assertEqual(sit2.retention_amount, 1800.0)
        self.assertAlmostEqual(sit2.progress, 100.0)

        # Le report PDF contient les mentions clés.
        html = self.env['ir.actions.report']._render_qweb_html(
            'mcct_industry.action_report_situation', sit2.ids)[0].decode()
        self.assertIn("Situation de travaux N°02", html)
        self.assertIn("Net à payer", html)
        self.assertIn("dirhams", html)
        invoice_html = self.env['ir.actions.report']._render_qweb_html(
            'account.report_invoice', invoice.ids)[0].decode()
        self.assertIn("Retenue de garantie", invoice_html)
        self.assertIn("Arrêtée la présente facture", invoice_html)
        self.assertIn("Trente-deux mille quatre cents dirhams", invoice_html)

    def test_advance_invoice_and_deduction(self):
        project = self._manual_project(mcct_contract_amount=100000.0, mcct_advance_rate=10.0)
        project.action_mcct_invoice_advance()
        advance = project.mcct_invoice_ids
        self.assertTrue(advance.mcct_is_advance)
        self.assertEqual(advance.amount_untaxed, 10000.0)
        advance.action_post()
        self.assertEqual(project.mcct_advance_invoiced, 10000.0)
        with self.assertRaises(UserError):
            project.action_mcct_invoice_advance()  # déjà entièrement facturée

        situation = self._manual_situation(project, 40000.0)
        self.assertEqual(situation.amount_current, 40000.0)
        self.assertEqual(situation.advance_deduction, 4000.0)
        self.assertEqual(situation.amount_untaxed, 36000.0)
        self.assertEqual(situation.amount_total, 43200.0)
        situation.action_approve()
        situation.action_create_invoice()
        self.assertEqual(situation.invoice_id.amount_untaxed, 36000.0)
        self.assertEqual(situation.invoice_id.amount_total, 43200.0)
        deduction = situation.invoice_id.invoice_line_ids.filtered(
            lambda l: l.product_id == self.advance_product.product_variant_id)
        self.assertEqual(deduction.price_unit, -4000.0)
        self.assertEqual(project.mcct_advance_remaining, 6000.0)

    def test_invoice_skips_empty_sections(self):
        project = self._manual_project(mcct_contract_amount=100000.0, mcct_advance_rate=10.0)
        project.action_mcct_invoice_advance()
        project.mcct_invoice_ids.action_post()
        situation = self.env['mcct.situation'].create({'project_id': project.id})
        situation.line_ids = [
            Command.create({'display_type': 'line_section', 'name': "Lot 1", 'sequence': 1}),
            Command.create({'name': "Bardage", 'product_id': self.bardage.id, 'sequence': 2,
                            'contract_qty': 100, 'price_unit': 500, 'cumulative_qty': 40}),
            Command.create({'display_type': 'line_section', 'name': "Lot 2", 'sequence': 3}),
            Command.create({'name': "Charpente", 'product_id': self.charpente.id, 'sequence': 4,
                            'contract_qty': 1000, 'price_unit': 50, 'cumulative_qty': 0}),
        ]
        situation.action_approve()
        situation.action_create_invoice()
        sections = situation.invoice_id.invoice_line_ids.filtered(
            lambda l: l.display_type == 'line_section').mapped('name')
        # « Lot 2 » n'a rien sur la période ; la déduction d'avance a sa propre section.
        self.assertEqual(sections, ["Lot 1", "Avance sur travaux"])

    def test_retention_on_untaxed_base(self):
        self.env.company.mcct_retention_base = 'untaxed'
        project = self._manual_project(
            mcct_contract_amount=100000.0, mcct_retention_rate=10.0, mcct_retention_cap_rate=0.0)
        situation = self._manual_situation(project, 50000.0)
        self.assertEqual(situation.retention_base, 'untaxed')
        self.assertEqual(situation.retention_amount, 5000.0)
        # Le paramètre société ne réécrit pas les situations existantes.
        self.env.company.mcct_retention_base = 'total'
        self.assertEqual(situation.retention_base, 'untaxed')

    def test_cancelled_invoice_releases_situation(self):
        project = self._manual_project(mcct_contract_amount=10000.0)
        situation = self._manual_situation(project, 5000.0)
        situation.action_approve()
        situation.action_create_invoice()
        invoice = situation.invoice_id
        invoice.button_cancel()
        self.assertEqual(situation.state, 'approved')
        self.assertFalse(situation.invoice_id)
        situation.action_create_invoice()
        self.assertEqual(situation.state, 'invoiced')
        situation.invoice_id.unlink()
        self.assertEqual(situation.state, 'approved')

    def test_only_latest_situation_can_change(self):
        project = self._manual_project(mcct_contract_amount=10000.0)
        sit1 = self._manual_situation(project, 2000.0)
        sit1.action_approve()
        sit2 = self.env['mcct.situation'].create({'project_id': project.id})
        self.assertEqual(sit2.line_ids.previous_qty, 0.2)
        with self.assertRaises(UserError):
            sit1.action_reset_draft()
        with self.assertRaises(UserError):
            sit1.action_cancel()
        with self.assertRaises(UserError):
            sit1.retention_rate = 5.0
        sit2.action_cancel()
        sit1.action_reset_draft()
        self.assertEqual(sit1.state, 'draft')
        with self.assertRaises(UserError):
            sit1.action_create_invoice()

    def test_phase_steps(self):
        project = self._manual_project(mcct_phase='fabrication')
        steps = dict((key, status) for key, _label, status in project._mcct_phase_steps())
        self.assertEqual(steps['etude'], 'done')
        self.assertEqual(steps['fabrication'], 'current')
        self.assertEqual(steps['montage'], 'todo')
        project.mcct_phase = 'reception_definitive'
        self.assertTrue(all(status == 'done' for _k, _l, status in project._mcct_phase_steps()))
