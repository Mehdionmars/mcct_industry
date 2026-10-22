from odoo import api, fields, models

WEATHER = [
    ('soleil', "Ensoleillé"),
    ('nuageux', "Nuageux"),
    ('pluie', "Pluie"),
    ('vent', "Vent fort"),
    ('chaleur', "Forte chaleur"),
]


class McctSiteReport(models.Model):
    _name = 'mcct.site.report'
    _description = "Rapport de chantier"
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'date desc, id desc'
    _check_company_auto = True

    name = fields.Char("Objet", required=True, default="Rapport journalier", tracking=True)
    project_id = fields.Many2one(
        'project.project', string="Chantier", required=True, index=True, ondelete='cascade',
        check_company=True, domain="[('mcct_is_site', '=', True)]")
    partner_id = fields.Many2one(related='project_id.partner_id', string="Client", store=True)
    company_id = fields.Many2one(
        'res.company', string="Société", required=True, index=True,
        default=lambda self: self.env.company)
    date = fields.Date("Date", required=True, default=fields.Date.context_today, tracking=True)
    user_id = fields.Many2one(
        'res.users', string="Rédigé par", default=lambda self: self.env.user,
        domain="[('share', '=', False)]")
    phase = fields.Selection(related='project_id.mcct_phase', string="Phase du chantier")
    weather = fields.Selection(WEATHER, string="Météo")
    workforce = fields.Integer("Effectif sur site")
    hours_worked = fields.Float("Heures travaillées")
    progress = fields.Float("Avancement estimé (%)")
    work_done = fields.Html("Travaux réalisés")
    issues = fields.Html("Problèmes / réserves")
    next_steps = fields.Html("Prévisions")
    photo_ids = fields.Many2many(
        'ir.attachment', 'mcct_site_report_photo_rel', 'report_id', 'attachment_id',
        string="Photos")
    photo_count = fields.Integer(compute='_compute_photo_count')
    state = fields.Selection(
        [('draft', "Brouillon"), ('published', "Publié au client")],
        string="Statut", default='draft', required=True, tracking=True)

    @api.depends('photo_ids')
    def _compute_photo_count(self):
        for report in self:
            report.photo_count = len(report.photo_ids)

    @api.depends('name', 'date')
    def _compute_display_name(self):
        for report in self:
            date = report.date.strftime('%d/%m/%Y') if report.date else ''
            report.display_name = f"{report.name} — {date}" if date else report.name

    def _get_report_base_filename(self):
        self.ensure_one()
        return f"Rapport chantier - {self.project_id.name} - {self.date}"

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            project = self.env['project.project'].browse(vals.get('project_id'))
            if project.company_id:
                vals.setdefault('company_id', project.company_id.id)
        reports = super().create(vals_list)
        reports._attach_photos()
        return reports

    def write(self, vals):
        res = super().write(vals)
        if 'photo_ids' in vals:
            self._attach_photos()
        return res

    def _attach_photos(self):
        """Rattache les photos téléversées au rapport (sinon elles restent orphelines)."""
        for report in self:
            report.photo_ids.filtered(lambda a: not a.res_id).sudo().write({
                'res_model': self._name, 'res_id': report.id,
            })

    def action_publish(self):
        self.write({'state': 'published'})

    def action_unpublish(self):
        self.write({'state': 'draft'})
