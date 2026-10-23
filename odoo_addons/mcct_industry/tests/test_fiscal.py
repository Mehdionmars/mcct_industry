from dateutil.relativedelta import relativedelta

from odoo import Command, fields
from odoo.exceptions import UserError
from odoo.tests import tagged

from odoo.addons.account.tests.common import AccountTestInvoicingCommon
from odoo.addons.mcct_industry.fiscal import setup_moroccan_tax


@tagged('post_install', '-at_install')
class TestMcctFiscal(AccountTestInvoicingCommon):
    """Fiscalité marocaine : TVA par nature, exonérations, retenue à la source,
    délais de paiement (loi 69-21) et mentions de l'article 145 du CGI."""

    @classmethod
    @AccountTestInvoicingCommon.setup_country('ma')
    def setUpClass(cls):
        super().setUpClass()
        cls.company = cls.env.company
        setup_moroccan_tax(cls.env, cls.company)
        chart = cls.env['account.chart.template'].with_company(cls.company)
        cls.tax_travaux = chart.ref('vat_out_20_87')
        cls.tax_services = chart.ref('vat_out_20_81')
        cls.ma = cls.env.ref('base.ma')
        cls.travaux = cls.env['product.product'].create({
            'name': "Charpente métallique", 'type': 'service', 'mcct_vat_nature': 'travaux',
            'taxes_id': [Command.set(cls.tax_travaux.ids)],
        })
        cls.services = cls.env['product.product'].create({
            'name': "Étude", 'type': 'service', 'mcct_vat_nature': 'services',
            'taxes_id': [Command.set(cls.tax_services.ids)],
        })
        cls.private_client = cls.env['res.partner'].create({
            'name': "Client privé", 'is_company': True, 'country_id': cls.ma.id,
        })
        cls.public_client = cls.env['res.partner'].create({
            'name': "Office public", 'is_company': True, 'country_id': cls.ma.id,
            'mcct_vat_withholding': True,
        })

    def _invoice(self, partner, lines, post=True, **vals):
        move = self.env['account.move'].create({
            'move_type': 'out_invoice',
            'partner_id': partner.id,
            'invoice_date': fields.Date.today(),
            'invoice_line_ids': [
                Command.create({'product_id': product.id, 'quantity': 1, 'price_unit': price})
                for product, price in lines
            ],
            **vals,
        })
        if post:
            move.action_post()
        return move

    def _render(self, move):
        return self.env['ir.actions.report']._render_qweb_html(
            'account.report_invoice', move.ids)[0].decode()

    # ------------------------------------------------------------------
    # Natures : travaux immobiliers et prestations de services uniquement
    # ------------------------------------------------------------------
    def test_natures_without_goods(self):
        natures = dict(self.env['product.template']._fields['mcct_vat_nature'].selection)
        self.assertEqual(set(natures), {'travaux', 'services'})
        self.assertEqual(self.company.account_sale_tax_id, self.tax_travaux)

        catalog = {
            'product_etude': (self.tax_services, '712420'),
            'product_montage_h': (self.tax_services, '712430'),
            'product_charpente_kg': (self.tax_travaux, '712410'),
            'product_chaudronnerie_kg': (self.tax_travaux, '712410'),
        }
        for xmlid, (tax, account_code) in catalog.items():
            template = self.env.ref(f'mcct_industry.{xmlid}').with_company(self.company)
            self.assertEqual(template.taxes_id.filtered(lambda t: t.company_id == self.company), tax, xmlid)
            self.assertEqual(template.property_account_income_id.code, account_code, xmlid)

    def test_domestic_invoice_keeps_vat(self):
        """La position « Maroc » appliquée aux clients marocains ne doit rien exonérer."""
        invoice = self._invoice(self.private_client, [(self.travaux, 100000.0)])
        self.assertEqual(invoice.invoice_line_ids.tax_ids, self.tax_travaux)
        self.assertAlmostEqual(invoice.amount_tax, 20000.0)
        self.assertAlmostEqual(invoice.mcct_vat_withholding_amount, 0.0)
        self.assertAlmostEqual(invoice.mcct_net_to_pay, 120000.0)

    def test_exemption_fiscal_position(self):
        position = self.env.ref(f'mcct_industry.{self.company.id}_fp_exoneration_art92')
        client = self.env['res.partner'].create({
            'name': "Exportateur", 'is_company': True, 'country_id': self.ma.id,
            'property_account_position_id': position.id,
            'mcct_vat_exemption_ref': "Attestation n° 123/2026 du 02/01/2026",
        })
        invoice = self._invoice(client, [(self.travaux, 50000.0), (self.services, 5000.0)])
        exempt_tax = invoice.invoice_line_ids.tax_ids
        self.assertEqual(len(exempt_tax), 1)
        self.assertEqual(exempt_tax.amount, 0.0)
        self.assertEqual(exempt_tax.fiscal_position_ids, position)
        # Base déclarée sur la ligne 40 de la déclaration de TVA.
        base_tags = exempt_tax.invoice_repartition_line_ids.filtered(
            lambda l: l.repartition_type == 'base').tag_ids
        self.assertIn('40', base_tags.mapped('name'))
        self.assertAlmostEqual(invoice.amount_tax, 0.0)
        html = self._render(invoice)
        self.assertIn("article 92", html)
        self.assertIn("Attestation n° 123/2026", html)

    # ------------------------------------------------------------------
    # Retenue à la source sur la TVA (article 117 du CGI)
    # ------------------------------------------------------------------
    def test_withholding_without_certificate(self):
        self.company.mcct_tax_certificate_date = False
        invoice = self._invoice(self.public_client, [(self.travaux, 100000.0), (self.services, 10000.0)])
        self.assertAlmostEqual(invoice.amount_tax, 22000.0)
        self.assertAlmostEqual(invoice.mcct_vat_withholding_amount, 22000.0)
        self.assertAlmostEqual(invoice.mcct_net_to_pay, 110000.0)
        self.assertEqual(invoice._mcct_vat_withholding_rate_label(), "100 %")

    def test_withholding_with_valid_certificate(self):
        self.company.mcct_tax_certificate_date = fields.Date.today() - relativedelta(months=1)
        invoice = self._invoice(self.public_client, [(self.travaux, 100000.0), (self.services, 10000.0)])
        # Travaux : rien ; services : 75 % de 2 000.
        self.assertAlmostEqual(invoice.mcct_vat_withholding_amount, 1500.0)
        self.assertAlmostEqual(invoice.mcct_net_to_pay, 132000.0 - 1500.0)
        self.assertEqual(invoice._mcct_vat_withholding_rate_label(), "75 %")
        html = self._render(invoice)
        self.assertIn("TVA retenue à la source", html)
        self.assertIn("Net à payer", html)

    def test_withholding_with_expired_or_future_certificate(self):
        today = fields.Date.today()
        for certificate_date in (today - relativedelta(months=7), today + relativedelta(days=5)):
            self.company.mcct_tax_certificate_date = certificate_date
            invoice = self._invoice(self.public_client, [(self.services, 10000.0)])
            self.assertAlmostEqual(invoice.mcct_vat_withholding_amount, 2000.0, msg=str(certificate_date))

    def test_withholding_frozen_once_posted(self):
        self.company.mcct_tax_certificate_date = False
        invoice = self._invoice(self.public_client, [(self.services, 10000.0)])
        self.assertAlmostEqual(invoice.mcct_vat_withholding_amount, 2000.0)
        self.company.mcct_tax_certificate_date = fields.Date.today()
        self.public_client.mcct_vat_withholding = False
        invoice.invalidate_recordset()
        self.assertAlmostEqual(invoice.mcct_vat_withholding_amount, 2000.0)

    def test_certificate_entered_after_draft(self):
        self.company.mcct_tax_certificate_date = False
        draft = self._invoice(self.public_client, [(self.services, 10000.0)], post=False)
        self.assertAlmostEqual(draft.mcct_vat_withholding_amount, 2000.0)
        self.company.mcct_tax_certificate_date = fields.Date.today()
        draft.action_post()
        self.assertAlmostEqual(draft.mcct_vat_withholding_amount, 1500.0)

    def test_record_withholding_entry(self):
        self.company.mcct_tax_certificate_date = False
        invoice = self._invoice(self.public_client, [(self.travaux, 100000.0)])
        invoice.action_mcct_record_vat_withholding()
        entry = invoice.mcct_vat_withholding_move_id
        self.assertEqual(entry.state, 'posted')
        debit = entry.line_ids.filtered(lambda l: l.debit)
        self.assertEqual(debit.account_id, self.company.mcct_vat_withholding_account_id)
        self.assertEqual(debit.account_id.code, '345810')
        self.assertAlmostEqual(debit.debit, 20000.0)
        # Reste dû par le client : le HT, la TVA étant versée par lui à la DGI.
        self.assertAlmostEqual(invoice.amount_residual, 100000.0)
        with self.assertRaises(UserError):
            invoice.action_mcct_record_vat_withholding()

    def test_no_withholding_for_private_client(self):
        invoice = self._invoice(self.private_client, [(self.services, 10000.0)])
        self.assertAlmostEqual(invoice.mcct_vat_withholding_amount, 0.0)
        with self.assertRaises(UserError):
            invoice.action_mcct_record_vat_withholding()

    # ------------------------------------------------------------------
    # Délais de paiement (loi 69-21) et mentions obligatoires
    # ------------------------------------------------------------------
    def test_default_payment_term_60_days(self):
        partner = self.env['res.partner'].with_company(self.company).create({'name': "Nouveau client"})
        self.assertEqual(
            partner.with_company(self.company).property_payment_term_id,
            self.env.ref('mcct_industry.payment_term_60_days'))

    def test_payment_delay_over_120_days(self):
        invoice = self._invoice(self.private_client, [(self.travaux, 1000.0)], post=False)
        invoice.invoice_payment_term_id = False
        invoice.invoice_date_due = invoice.invoice_date + relativedelta(days=150)
        self.assertTrue(invoice.mcct_payment_delay_exceeded)
        invoice.invoice_date_due = invoice.invoice_date + relativedelta(days=60)
        self.assertFalse(invoice.mcct_payment_delay_exceeded)

    def test_payment_mode_and_legal_mentions(self):
        self.company.write({
            'mcct_legal_form': 'sarl',
            'mcct_capital': 1000000.0,
            'mcct_rc': '123456',
            'mcct_rc_city': 'Casablanca',
            'mcct_if': '12345678',
            'company_registry': '001122334000055',
            'mcct_patente': '34567890',
            'street': 'Route 310, km 6',
            'city': 'Aïn Harrouda',
        })
        self.private_client.write({'mcct_payment_mode': 'effet', 'company_registry': '009988776000011'})
        invoice = self._invoice(self.private_client, [(self.travaux, 1000.0)])
        self.assertEqual(invoice.mcct_payment_mode, 'effet')
        html = self._render(invoice)
        self.assertIn("Effet de commerce (LCN)", html)
        self.assertIn("SARL", html)
        self.assertIn("au capital de", html)
        self.assertIn("RC Casablanca n°", html)
        self.assertIn("001122334000055", html)
        self.assertIn("TP :", html)
