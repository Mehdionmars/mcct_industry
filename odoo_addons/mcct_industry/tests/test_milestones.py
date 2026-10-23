from datetime import timedelta

from odoo import fields
from odoo.exceptions import UserError, ValidationError
from odoo.tests import tagged

from odoo.addons.account.tests.common import AccountTestInvoicingCommon
from odoo.addons.mcct_industry.fiscal import setup_moroccan_tax


@tagged('post_install', '-at_install')
class TestMcctMilestones(AccountTestInvoicingCommon):
    """Échéancier de paiement : échéances du marché, factures et encaissements."""

    @classmethod
    @AccountTestInvoicingCommon.setup_country('ma')
    def setUpClass(cls):
        super().setUpClass()
        setup_moroccan_tax(cls.env, cls.env.company)
        cls.today = fields.Date.today()
        cls.client = cls.env['res.partner'].create({
            'name': "Client échéancier", 'is_company': True, 'country_id': cls.env.ref('base.ma').id,
        })
        cls.tax_travaux = cls.env['account.chart.template'].with_company(cls.env.company).ref('vat_out_20_87')

    @classmethod
    def get_default_groups(cls):
        return super().get_default_groups() | cls.env.ref('project.group_project_manager')

    def _site(self, **vals):
        return self.env['project.project'].create({
            'name': "Réservoirs", 'partner_id': self.client.id, 'mcct_is_site': True,
            'mcct_contract_amount': 1000000.0, 'mcct_contract_ref': "CMD-01",
            'mcct_contract_date': self.today - timedelta(days=10), 'mcct_phase': 'fabrication',
            'mcct_billing_mode': 'milestones', **vals,
        })

    def _pay(self, invoice, amount=None):
        vals = {'amount': amount} if amount else {}
        self.env['account.payment.register'].with_context(
            active_model='account.move', active_ids=invoice.ids).create(vals)._create_payments()

    def test_standard_schedule(self):
        site = self._site()
        site.action_mcct_milestone_template()
        milestones = site.mcct_milestone_ids.sorted('sequence')
        self.assertEqual(milestones.mapped('rate'), [30.0, 40.0, 20.0, 10.0])
        self.assertEqual(milestones.mapped('number'), [1, 2, 3, 4])
        self.assertEqual(site.mcct_milestone_rate_total, 100.0)
        self.assertAlmostEqual(milestones[0].amount_untaxed, 300000.0)
        self.assertAlmostEqual(milestones[0].amount_total, 360000.0)  # TVA travaux 20 %
        # L'avance (datée du marché) est exigible ; la livraison attend sa phase.
        self.assertEqual(milestones.mapped('display_state'), ['due', 'planned', 'planned', 'planned'])
        self.assertEqual(site.mcct_milestone_due_count, 1)
        with self.assertRaises(UserError):
            site.action_mcct_milestone_template()

    def test_invoice_and_payment(self):
        site = self._site()
        site.action_mcct_milestone_template()
        advance = site.mcct_milestone_ids.sorted('sequence')[0]
        action = advance.action_create_invoice()
        invoice = advance.invoice_id
        self.assertEqual(action['res_id'], invoice.id)
        self.assertEqual(invoice.state, 'draft')
        self.assertEqual(invoice.mcct_project_id, site)
        self.assertIn("Échéance 1/4 — Avance à la commande (30 % du marché)", invoice.invoice_line_ids.name)
        self.assertEqual(invoice.invoice_line_ids.tax_ids, self.tax_travaux)
        self.assertAlmostEqual(invoice.amount_untaxed, 300000.0)
        # Un brouillon existant est rouvert, pas dupliqué.
        advance.action_create_invoice()
        self.assertEqual(advance.invoice_id, invoice)

        invoice.action_post()
        self.assertEqual(advance.state, 'invoiced')
        self.assertEqual(advance.display_state, 'invoiced')
        with self.assertRaises(UserError):
            advance.action_create_invoice()
        with self.assertRaises(UserError):
            advance.unlink()

        self._pay(invoice, 100000.0)
        self.assertEqual(advance.state, 'invoiced')
        self.assertAlmostEqual(advance.amount_paid, 100000.0)
        self._pay(invoice)
        self.assertEqual(advance.state, 'paid')
        self.assertEqual(advance.display_state, 'paid')
        self.assertAlmostEqual(advance.amount_paid, 360000.0)
        self.assertEqual(advance.date_paid, self.today)
        self.assertAlmostEqual(site.mcct_milestone_amount_paid, 360000.0)

    def test_overdue_and_cancelled_invoice(self):
        site = self._site()
        site.action_mcct_milestone_template()
        advance = site.mcct_milestone_ids.sorted('sequence')[0]
        advance.action_create_invoice()
        invoice = advance.invoice_id
        invoice.invoice_date = self.today - timedelta(days=90)
        invoice.action_post()
        self.assertLess(invoice.invoice_date_due, self.today)
        self.assertEqual(advance.display_state, 'overdue')

        invoice.button_draft()
        invoice.button_cancel()
        self.assertEqual(advance.state, 'planned')
        advance.action_create_invoice()
        self.assertNotEqual(advance.invoice_id, invoice)
        self.assertEqual(advance.invoice_id.state, 'draft')

    def test_phase_makes_milestone_due(self):
        site = self._site()
        site.action_mcct_milestone_template()
        delivery = site.mcct_milestone_ids.filtered(lambda m: m.phase == 'livraison')
        self.assertEqual(delivery.display_state, 'planned')
        site.mcct_phase = 'montage'  # au-delà de la livraison
        self.assertTrue(delivery.phase_reached)
        self.assertEqual(delivery.display_state, 'due')
        activity = site.activity_ids.filtered(lambda a: a.summary == "Échéance à facturer")
        self.assertEqual(len(activity), 1)
        self.assertIn("À la livraison sur site", activity.note)
        action = site.action_mcct_invoice_due_milestones()
        self.assertEqual(len(site.mcct_milestone_ids.invoice_id), 2)  # avance + livraison
        self.assertEqual(action['res_model'], 'account.move')

    def test_amounts_follow_contract_until_invoiced(self):
        site = self._site()
        site.action_mcct_milestone_template()
        advance, delivery = site.mcct_milestone_ids.sorted('sequence')[:2]
        advance.action_create_invoice()
        advance.invoice_id.action_post()
        site.mcct_contract_amount = 1200000.0  # avenant
        self.assertAlmostEqual(advance.amount_untaxed, 300000.0)
        self.assertAlmostEqual(delivery.amount_untaxed, 480000.0)
        # Saisie d'un montant : le pourcentage suit.
        delivery.amount_untaxed = 600000.0
        self.assertAlmostEqual(delivery.rate, 50.0)
        self.assertEqual(site.mcct_milestone_rate_total, 110.0)

    def test_billing_mode_guards(self):
        situations_site = self._site(mcct_billing_mode='situations')
        situations_site.action_mcct_milestone_template()
        with self.assertRaises(UserError):
            situations_site.mcct_milestone_ids[0].action_create_invoice()

        site = self._site()
        with self.assertRaises(UserError):
            site.action_mcct_new_situation()
        with self.assertRaises(ValidationError):
            self.env['mcct.situation'].create({'project_id': site.id})
        site.action_mcct_milestone_template()
        site.mcct_milestone_ids[0].action_create_invoice()
        site.mcct_milestone_ids[0].invoice_id.action_post()
        with self.assertRaises(UserError):
            site.mcct_billing_mode = 'situations'

    def test_withholding_applies_to_milestone_invoice(self):
        self.client.mcct_vat_withholding = True
        self.env.company.mcct_tax_certificate_date = False
        site = self._site()
        site.action_mcct_milestone_template()
        advance = site.mcct_milestone_ids.sorted('sequence')[0]
        advance.action_create_invoice()
        self.assertAlmostEqual(advance.invoice_id.mcct_vat_withholding_amount, 60000.0)
