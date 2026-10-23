import base64

from odoo import Command
from odoo.http import Request
from odoo.tests import HttpCase, tagged

from odoo.addons.base.tests.common import BaseCommon


@tagged('post_install', '-at_install')
class TestMcctPortal(BaseCommon, HttpCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        Partner = cls.env['res.partner']
        cls.client = Partner.create({'name': "Client Portail SA", 'is_company': True})
        cls.other_client = Partner.create({'name': "Autre Client SA", 'is_company': True})
        cls.portal_user = cls._create_new_portal_user(login='client_portail')
        cls.portal_user.partner_id.parent_id = cls.client

        cls.project = cls.env['project.project'].create({
            'name': "Hangar Portail",
            'partner_id': cls.client.id,
            'mcct_is_site': True,
            'privacy_visibility': 'portal',
            'mcct_phase': 'montage',
            'mcct_contract_amount': 100000.0,
        })
        cls.other_project = cls.env['project.project'].create({
            'name': "Chantier Confidentiel",
            'partner_id': cls.other_client.id,
            'mcct_is_site': True,
            'privacy_visibility': 'portal',
        })
        cls.situation = cls._make_situation(cls.project)
        cls.situation.action_mark_sent()
        cls.other_situation = cls._make_situation(cls.other_project)
        cls.other_situation.action_mark_sent()

        cls.document = cls.env['ir.attachment'].create({
            'name': 'plan-implantation.pdf',
            'datas': base64.b64encode(b'%PDF-1.4 plan'),
            'res_model': 'project.project',
            'res_id': cls.project.id,
        })
        cls.project.mcct_document_ids = [Command.link(cls.document.id)]
        cls.private_attachment = cls.env['ir.attachment'].create({
            'name': 'interne.txt',
            'datas': base64.b64encode(b'interne'),
            'res_model': 'project.project',
            'res_id': cls.project.id,
        })
        cls.env['mcct.site.report'].create({
            'project_id': cls.project.id,
            'name': "Pose des pannes",
            'workforce': 8,
            'state': 'published',
        })
        cls.env['mcct.site.report'].create({
            'project_id': cls.project.id,
            'name': "Brouillon interne",
            'state': 'draft',
        })

    @classmethod
    def _make_situation(cls, project):
        situation = cls.env['mcct.situation'].create({'project_id': project.id})
        situation.line_ids = [Command.create({
            'name': "Charpente",
            'uom_id': cls.env.ref('uom.product_uom_kgm').id,
            'contract_qty': 1000.0,
            'price_unit': 100.0,
            'cumulative_qty': 300.0,
        })]
        return situation

    def setUp(self):
        super().setUp()
        self.authenticate(self.portal_user.login, self.portal_user.login)

    def test_list_shows_only_own_sites(self):
        response = self.url_open('/my/chantiers')
        self.assertEqual(response.status_code, 200)
        self.assertIn("Hangar Portail", response.text)
        self.assertNotIn("Chantier Confidentiel", response.text)

    def test_site_page(self):
        response = self.url_open(f'/my/chantiers/{self.project.id}')
        self.assertEqual(response.status_code, 200)
        page = response.text
        self.assertIn("Montage sur site", page)
        self.assertIn("Situations de travaux", page)
        self.assertIn("À approuver", page)
        self.assertIn("Pose des pannes", page)
        self.assertNotIn("Brouillon interne", page)
        self.assertIn("plan-implantation.pdf", page)

    def test_site_page_lists_equipment_on_site(self):
        crane = self.env['maintenance.equipment'].create({
            'name': "Grue mobile 60 t", 'model': "LTM 1060", 'mcct_daily_cost': 6500.0,
            'mcct_project_id': self.project.id,
        })
        page = self.url_open(f'/my/chantiers/{self.project.id}').text
        self.assertIn("Moyens matériels sur le chantier", page)
        self.assertIn("Grue mobile 60 t", page)
        self.assertNotIn("6 500", page)  # coût interne jamais montré au client
        crane.action_mcct_return_to_depot()
        page = self.url_open(f'/my/chantiers/{self.project.id}').text
        self.assertNotIn("Grue mobile 60 t", page)

    def test_other_client_site_is_hidden(self):
        response = self.url_open(f'/my/chantiers/{self.other_project.id}', allow_redirects=False)
        self.assertIn(response.status_code, (302, 303))
        response = self.url_open(f'/my/chantiers/situation/{self.other_situation.id}/pdf', allow_redirects=False)
        self.assertIn(response.status_code, (302, 303))
        response = self.url_open(
            f'/my/chantiers/situation/{self.other_situation.id}/approve',
            data={'csrf_token': Request.csrf_token(self), 'signer_name': 'Pirate'},
            allow_redirects=False)
        self.assertIn(response.status_code, (302, 303))
        self.assertEqual(self.other_situation.state, 'sent')

    def test_situation_pdf(self):
        # En mode test, Odoo renvoie le rapport en HTML.
        response = self.url_open(f'/my/chantiers/situation/{self.situation.id}/pdf')
        self.assertEqual(response.status_code, 200)
        self.assertIn("Situation de travaux N°01", response.text)

    def test_approve_situation(self):
        response = self.url_open(
            f'/my/chantiers/situation/{self.situation.id}/approve',
            data={'csrf_token': Request.csrf_token(self), 'signer_name': 'Karim Benali'},
            allow_redirects=False)
        self.assertIn(response.status_code, (302, 303))
        self.assertIn('message=approved', response.headers['Location'])
        self.assertEqual(self.situation.state, 'approved')
        self.assertEqual(self.situation.approved_by, 'Karim Benali')

    def test_request_changes(self):
        self.url_open(
            f'/my/chantiers/situation/{self.situation.id}/changes',
            data={'csrf_token': Request.csrf_token(self), 'comment': 'Bardage : 120 m² et non 150 m²'},
            allow_redirects=False)
        self.assertEqual(self.situation.state, 'draft')
        self.assertTrue(self.situation.activity_ids)

    def test_attachments(self):
        response = self.url_open(f'/my/chantiers/{self.project.id}/fichier/{self.document.id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b'%PDF-1.4 plan')
        response = self.url_open(f'/my/chantiers/{self.project.id}/fichier/{self.private_attachment.id}')
        self.assertEqual(response.status_code, 404)
        response = self.url_open(f'/my/chantiers/{self.other_project.id}/fichier/{self.document.id}')
        self.assertEqual(response.status_code, 404)

    def test_home_counter(self):
        result = self.make_jsonrpc_request('/my/counters', {'counters': ['mcct_site_count']})
        self.assertEqual(result['mcct_site_count'], 1)
