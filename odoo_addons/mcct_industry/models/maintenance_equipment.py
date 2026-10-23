from datetime import timedelta

from dateutil.relativedelta import relativedelta

from odoo import api, fields, models
from odoo.exceptions import ValidationError

EQUIPMENT_KINDS = [
    ('engin', "Engin"),
    ('machine', "Machine"),
    ('materiel', "Matériel"),
]
EQUIPMENT_STATUSES = [
    ('available', "Au dépôt"),
    ('site', "Sur chantier"),
    ('maintenance', "En maintenance"),
]
# Chantiers proposés dans le planning du parc (colonnes du kanban).
OPEN_SITE_DOMAIN = [
    ('mcct_is_site', '=', True),
    ('mcct_phase', 'not in', ('reception_provisoire', 'reception_definitive')),
]


class MaintenanceEquipmentCategory(models.Model):
    _inherit = 'maintenance.equipment.category'

    mcct_kind = fields.Selection(EQUIPMENT_KINDS, string="Type", default='materiel')
    mcct_inspection_months = fields.Integer(
        "Périodicité du contrôle (mois)",
        help="Intervalle entre deux vérifications réglementaires (organisme agréé). "
             "0 = pas de contrôle périodique.")


class MaintenanceEquipment(models.Model):
    _inherit = 'maintenance.equipment'

    mcct_kind = fields.Selection(
        EQUIPMENT_KINDS, string="Type", compute='_compute_mcct_kind', store=True,
        readonly=False, tracking=True)
    mcct_status = fields.Selection(
        EQUIPMENT_STATUSES, string="Disponibilité", compute='_compute_mcct_status',
        store=True)
    mcct_project_id = fields.Many2one(
        'project.project', string="Chantier actuel", tracking=True, index='btree_not_null',
        domain=[('mcct_is_site', '=', True)], group_expand='_read_group_mcct_project_id',
        help="Changer de chantier clôture l'affectation en cours et en ouvre une nouvelle.")
    mcct_assignment_ids = fields.One2many(
        'mcct.equipment.assignment', 'equipment_id', string="Affectations")
    mcct_ownership = fields.Selection(
        [('owned', "Propriété de l'entreprise"), ('rented', "Loué à un tiers")],
        string="Statut", default='owned', required=True)
    mcct_registration = fields.Char("Immatriculation")
    mcct_operator_id = fields.Many2one('hr.employee', string="Conducteur / opérateur")
    mcct_hour_meter = fields.Float("Compteur (heures)", tracking=True)
    mcct_currency_id = fields.Many2one(
        'res.currency', compute='_compute_mcct_currency_id')
    mcct_daily_cost = fields.Monetary(
        "Coût journalier", currency_field='mcct_currency_id',
        help="Coût interne (amortissement, carburant, entretien) ou prix de location "
             "par jour, imputé aux chantiers selon la durée d'affectation.")
    mcct_inspection_date = fields.Date("Dernier contrôle réglementaire", tracking=True)
    mcct_next_inspection_date = fields.Date(
        "Prochain contrôle", compute='_compute_mcct_next_inspection_date', store=True,
        readonly=False)
    mcct_inspection_overdue = fields.Boolean(compute='_compute_mcct_inspection_overdue')
    mcct_insurance_date = fields.Date("Échéance de l'assurance")

    @api.depends('category_id.mcct_kind')
    def _compute_mcct_kind(self):
        for equipment in self:
            equipment.mcct_kind = equipment.category_id.mcct_kind or equipment.mcct_kind or 'materiel'

    @api.depends('mcct_project_id', 'maintenance_open_count')
    def _compute_mcct_status(self):
        for equipment in self:
            if equipment.maintenance_open_count:
                equipment.mcct_status = 'maintenance'
            elif equipment.mcct_project_id:
                equipment.mcct_status = 'site'
            else:
                equipment.mcct_status = 'available'

    @api.depends('company_id')
    def _compute_mcct_currency_id(self):
        for equipment in self:
            equipment.mcct_currency_id = (equipment.company_id or self.env.company).currency_id

    @api.depends('mcct_inspection_date', 'category_id.mcct_inspection_months')
    def _compute_mcct_next_inspection_date(self):
        for equipment in self:
            months = equipment.category_id.mcct_inspection_months
            if equipment.mcct_inspection_date and months:
                equipment.mcct_next_inspection_date = (
                    equipment.mcct_inspection_date + relativedelta(months=months))
            else:  # saisie manuelle conservée
                equipment.mcct_next_inspection_date = equipment.mcct_next_inspection_date

    @api.depends('mcct_next_inspection_date')
    def _compute_mcct_inspection_overdue(self):
        today = fields.Date.context_today(self)
        for equipment in self:
            equipment.mcct_inspection_overdue = bool(
                equipment.mcct_next_inspection_date and equipment.mcct_next_inspection_date <= today)

    @api.model
    def _read_group_mcct_project_id(self, projects, domain):
        return projects | projects.search(OPEN_SITE_DOMAIN)

    # ------------------------------------------------------------------
    # Historique des affectations
    # ------------------------------------------------------------------
    # Le contexte « mcct_skip_assignment » évite que la fiche matériel et
    # l'historique se mettent à jour l'un l'autre en boucle.
    @api.model_create_multi
    def create(self, vals_list):
        equipments = super().create(vals_list)
        if not self.env.context.get('mcct_skip_assignment'):
            today = fields.Date.context_today(self)
            for equipment in equipments.filtered('mcct_project_id'):
                equipment._mcct_open_assignment(today)
        return equipments

    def write(self, vals):
        if 'mcct_daily_cost' in vals:
            self.mcct_assignment_ids.filtered(lambda a: not a.date_end).with_context(
                mcct_skip_assignment=True).daily_cost = vals['mcct_daily_cost']
        if 'mcct_project_id' not in vals or self.env.context.get('mcct_skip_assignment'):
            return super().write(vals)
        previous = {equipment.id: equipment.mcct_project_id for equipment in self}
        result = super().write(vals)
        today = fields.Date.context_today(self)
        for equipment in self:
            if equipment.mcct_project_id != previous[equipment.id]:
                equipment.mcct_assignment_ids._mcct_close(today)
                if equipment.mcct_project_id:
                    equipment._mcct_open_assignment(today)
        return result

    def _mcct_open_assignment(self, date):
        self.ensure_one()
        self.env['mcct.equipment.assignment'].with_context(mcct_skip_assignment=True).create({
            'equipment_id': self.id,
            'project_id': self.mcct_project_id.id,
            'date_start': date,
            'daily_cost': self.mcct_daily_cost,
        })
        if not self.assign_date:
            self.with_context(mcct_skip_assignment=True).assign_date = date

    def action_mcct_return_to_depot(self):
        self.write({'mcct_project_id': False})


class McctEquipmentAssignment(models.Model):
    _name = 'mcct.equipment.assignment'
    _description = "Affectation de matériel à un chantier"
    _order = 'date_start desc, id desc'

    equipment_id = fields.Many2one(
        'maintenance.equipment', string="Matériel", required=True, ondelete='cascade',
        index=True)
    project_id = fields.Many2one(
        'project.project', string="Chantier", required=True, ondelete='cascade', index=True,
        domain=[('mcct_is_site', '=', True)])
    company_id = fields.Many2one(related='project_id.company_id', store=True)
    currency_id = fields.Many2one(related='equipment_id.mcct_currency_id')
    kind = fields.Selection(related='equipment_id.mcct_kind', string="Type")
    category_id = fields.Many2one(related='equipment_id.category_id', string="Catégorie")
    date_start = fields.Date("Arrivée sur chantier", required=True, default=fields.Date.context_today)
    date_end = fields.Date("Départ du chantier", help="Vide tant que le matériel est sur le chantier.")
    days = fields.Integer("Jours", compute='_compute_cost')
    daily_cost = fields.Monetary("Coût journalier", currency_field='currency_id')
    cost = fields.Monetary("Coût imputé", compute='_compute_cost', currency_field='currency_id')
    note = fields.Char("Commentaire")

    @api.depends('date_start', 'date_end', 'daily_cost')
    def _compute_cost(self):
        today = fields.Date.context_today(self)
        for assignment in self:
            end = assignment.date_end or today
            days = (end - assignment.date_start).days + 1 if assignment.date_start else 0
            assignment.days = max(days, 0)
            assignment.cost = assignment.days * assignment.daily_cost

    @api.model_create_multi
    def create(self, vals_list):
        assignments = super().create(vals_list)
        if not self.env.context.get('mcct_skip_assignment'):
            # Affectation saisie depuis le chantier : elle devient la position actuelle.
            for assignment in assignments.filtered(lambda a: not a.date_end):
                equipment = assignment.equipment_id
                (equipment.mcct_assignment_ids - assignment)._mcct_close(assignment.date_start)
                equipment.with_context(mcct_skip_assignment=True).mcct_project_id = assignment.project_id
        return assignments

    def write(self, vals):
        closing = self.browse()
        if vals.get('date_end') and not self.env.context.get('mcct_skip_assignment'):
            closing = self.filtered(lambda a: not a.date_end)
        result = super().write(vals)
        for assignment in closing:
            # Départ du chantier saisi dans l'historique : retour au dépôt.
            equipment = assignment.equipment_id
            if equipment.mcct_project_id == assignment.project_id:
                equipment.with_context(mcct_skip_assignment=True).mcct_project_id = False
        return result

    def _mcct_close(self, date):
        """Clôture la veille de « date » ; une affectation commencée ce jour-là est une correction."""
        for assignment in self.with_context(mcct_skip_assignment=True).filtered(lambda a: not a.date_end):
            if assignment.date_start >= date:
                assignment.unlink()
            else:
                assignment.date_end = date - timedelta(days=1)

    @api.constrains('date_start', 'date_end')
    def _check_dates(self):
        for assignment in self:
            if assignment.date_end and assignment.date_end < assignment.date_start:
                raise ValidationError("La date de départ du chantier précède la date d'arrivée.")
