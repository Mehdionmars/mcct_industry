from datetime import timedelta

from dateutil.relativedelta import relativedelta

from odoo import fields
from odoo.tests import TransactionCase, new_test_user, tagged


@tagged('post_install', '-at_install')
class TestMcctEquipment(TransactionCase):
    """Parc matériel, engins et machines affectés aux chantiers."""

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.today = fields.Date.context_today(cls.env['project.project'])
        client = cls.env['res.partner'].create({'name': "Client", 'is_company': True})
        Project = cls.env['project.project']
        cls.site_a = Project.create({
            'name': "Hangar Settat", 'partner_id': client.id, 'mcct_is_site': True,
            'mcct_phase': 'montage', 'mcct_site_city': "Settat",
        })
        cls.site_b = Project.create({
            'name': "Réservoirs Agadir", 'partner_id': client.id, 'mcct_is_site': True,
            'mcct_phase': 'fabrication', 'mcct_site_city': "Agadir",
        })
        cls.site_done = Project.create({
            'name': "Bardage Kénitra", 'partner_id': client.id, 'mcct_is_site': True,
            'mcct_phase': 'reception_definitive', 'mcct_site_city': "Kénitra",
        })
        cls.crane = cls.env['maintenance.equipment'].create({
            'name': "Grue mobile 60 t",
            'category_id': cls.env.ref('mcct_industry.equipment_category_levage').id,
            'mcct_daily_cost': 1000.0,
        })

    def _open(self, equipment):
        return equipment.mcct_assignment_ids.filtered(lambda a: not a.date_end)

    def test_kind_from_category(self):
        self.assertEqual(self.crane.mcct_kind, 'engin')
        press = self.env['maintenance.equipment'].create({
            'name': "Plieuse 3 m",
            'category_id': self.env.ref('mcct_industry.equipment_category_atelier').id,
        })
        self.assertEqual(press.mcct_kind, 'machine')
        self.assertEqual(self.crane.mcct_status, 'available')

    def test_assignment_history_and_cost(self):
        self.crane.mcct_project_id = self.site_a
        first = self._open(self.crane)
        self.assertEqual(first.project_id, self.site_a)
        self.assertEqual(first.date_start, self.today)
        self.assertEqual(self.crane.mcct_status, 'site')
        self.assertEqual(self.site_a.mcct_equipment_count, 1)

        # Arrivé il y a 10 jours, part aujourd'hui pour Agadir.
        first.with_context(mcct_skip_assignment=True).date_start = self.today - timedelta(days=10)
        self.crane.mcct_project_id = self.site_b
        self.assertEqual(first.date_end, self.today - timedelta(days=1))
        self.assertEqual(first.days, 10)
        self.assertAlmostEqual(self.site_a.mcct_equipment_cost, 10000.0)
        self.assertEqual(self.site_a.mcct_equipment_count, 0)
        self.assertEqual(self._open(self.crane).project_id, self.site_b)

        # Correction le jour même : l'affectation erronée disparaît.
        self.crane.mcct_project_id = self.site_a
        self.assertNotIn(self.site_b, self.crane.mcct_assignment_ids.project_id)
        self.assertEqual(self._open(self.crane).project_id, self.site_a)

        self.crane.action_mcct_return_to_depot()
        self.assertFalse(self.crane.mcct_project_id)
        self.assertFalse(self._open(self.crane))
        self.assertEqual(self.crane.mcct_status, 'available')

    def test_assignment_entered_from_chantier(self):
        assignment = self.env['mcct.equipment.assignment'].create({
            'equipment_id': self.crane.id,
            'project_id': self.site_b.id,
            'date_start': self.today - timedelta(days=3),
            'daily_cost': 1000.0,
        })
        self.assertEqual(self.crane.mcct_project_id, self.site_b)
        self.assertEqual(len(self.crane.mcct_assignment_ids), 1)
        assignment.date_end = self.today
        self.assertFalse(self.crane.mcct_project_id)
        self.assertAlmostEqual(self.site_b.mcct_equipment_cost, 4000.0)

    def test_daily_cost_follows_current_assignment(self):
        self.crane.mcct_project_id = self.site_a
        self.crane.mcct_daily_cost = 1500.0
        self.assertAlmostEqual(self._open(self.crane).daily_cost, 1500.0)

    def test_maintenance_status(self):
        self.crane.mcct_project_id = self.site_a
        self.env['maintenance.request'].create({'name': "Fuite hydraulique", 'equipment_id': self.crane.id})
        self.assertEqual(self.crane.mcct_status, 'maintenance')

    def test_regulatory_inspection(self):
        self.crane.mcct_inspection_date = self.today - relativedelta(months=7)
        self.assertEqual(self.crane.mcct_next_inspection_date, self.today - relativedelta(months=1))
        self.assertTrue(self.crane.mcct_inspection_overdue)
        self.crane.mcct_inspection_date = self.today
        self.assertFalse(self.crane.mcct_inspection_overdue)

    def test_planning_columns_show_open_sites(self):
        Equipment = self.env['maintenance.equipment']
        columns = Equipment._read_group_mcct_project_id(self.env['project.project'], [])
        self.assertIn(self.site_a, columns)
        self.assertIn(self.site_b, columns)
        self.assertNotIn(self.site_done, columns)

    def test_project_user_assigns_whole_park(self):
        user = new_test_user(self.env, login='chef_chantier', groups='project.group_project_user')
        crane = self.crane.with_user(user)
        self.assertIn(self.crane, self.env['maintenance.equipment'].with_user(user).search([]))
        crane.mcct_project_id = self.site_a
        self.assertEqual(self.site_a.mcct_equipment_count, 1)
