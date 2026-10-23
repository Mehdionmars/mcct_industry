from datetime import timedelta

from odoo import fields
from odoo.tests import TransactionCase, tagged

from odoo.addons.mcct_industry.cities import CITIES, find_city


@tagged('post_install', '-at_install')
class TestMcctChantierMap(TransactionCase):

    def test_find_city(self):
        self.assertEqual(find_city("Aïn-Harrouda"), "Aïn Harrouda")
        self.assertEqual(find_city("CASA"), "Casablanca")
        self.assertEqual(find_city("fes"), "Fès")
        self.assertEqual(find_city("Laayoune"), "Laâyoune")
        self.assertEqual(find_city("Zone industrielle de Settat"), "Settat")
        self.assertEqual(find_city("Casablanca - Aïn Sebaâ"), "Casablanca")
        self.assertIsNone(find_city("Douar Ouled Ali"))
        self.assertIsNone(find_city(""))

    def test_cities_inside_kingdom(self):
        # Garde-fou contre les fautes de frappe dans la table (Tanger -> Lagouira).
        for city, (lat, lng) in CITIES.items():
            self.assertTrue(20.7 < lat < 36.0 and -17.2 < lng < -1.0, city)

    def test_map_data_grouped_by_city(self):
        today = fields.Date.context_today(self.env['project.project'])
        client = self.env['res.partner'].create({'name': "Client carte", 'is_company': True})

        def site(name, city, phase='montage', **vals):
            return self.env['project.project'].create({
                'name': name, 'partner_id': client.id, 'mcct_is_site': True,
                'mcct_phase': phase, 'mcct_site_city': city, **vals,
            })

        settat_1 = site("Hangar", "Settat", mcct_contract_amount=1000000.0)
        settat_2 = site("Convoyeurs", "settat", mcct_contract_amount=500000.0,
                        date=today - timedelta(days=5))
        dakhla = site("Chambre froide", "Dakhla", phase='reception_definitive')
        unknown = site("Station de pompage", "Douar Ouled Ali")
        gps = site("Forage", "Bir Anzarane", mcct_latitude=23.89, mcct_longitude=-14.53)
        ours = (settat_1 | settat_2 | dakhla | unknown | gps).ids

        crane = self.env['maintenance.equipment'].create({'name': "Grue", 'mcct_project_id': settat_1.id})
        self.assertTrue(crane)

        data = self.env['project.project'].mcct_get_map_data(scope='all')
        cities = {city['name']: city for city in data['cities']
                  if any(item['id'] in ours for item in city['projects'])}
        self.assertEqual(set(cities), {"Settat", "Dakhla", "Bir Anzarane"})
        settat = cities["Settat"]
        self.assertEqual(settat['count'], 2)
        self.assertEqual((settat['lat'], settat['lng']), CITIES["Settat"])
        self.assertAlmostEqual(settat['amount'], 1500000.0)
        self.assertEqual(settat['equipment_count'], 1)
        self.assertTrue(settat['late'])
        self.assertTrue(cities["Dakhla"]['received'])
        self.assertEqual((cities["Bir Anzarane"]['lat'], cities["Bir Anzarane"]['lng']), (23.89, -14.53))
        self.assertIn(unknown.id, [item['id'] for item in data['unlocated']])
        self.assertTrue(data['landmarks'])

        active = self.env['project.project'].mcct_get_map_data(scope='active')
        active_ids = [item['id'] for city in active['cities'] for item in city['projects']]
        self.assertNotIn(dakhla.id, active_ids)
        self.assertIn(settat_1.id, active_ids)
        received = self.env['project.project'].mcct_get_map_data(scope='received')
        received_ids = [item['id'] for city in received['cities'] for item in city['projects']]
        self.assertEqual([i for i in received_ids if i in ours], [dakhla.id])

        self.assertEqual(settat_1.mcct_map_city, "Settat")
        self.assertFalse(unknown.mcct_map_city)
