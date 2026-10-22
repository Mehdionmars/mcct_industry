"""Portail client « Mes chantiers ».

Un contact client voit les chantiers de sa société (projets marqués « Chantier »,
visibilité « portail », client = sa société). Les enregistrements sont lus en
sudo, après contrôle explicite de cet accès.
"""
from odoo import http
from odoo.exceptions import AccessError, MissingError, UserError
from odoo.http import request

from odoo.addons.portal.controllers.portal import CustomerPortal
from odoo.addons.portal.controllers.portal import pager as portal_pager

PORTAL_SITUATION_STATES = ('sent', 'approved', 'invoiced')
FINISHED_PHASES = ('reception_provisoire', 'reception_definitive')


class McctCustomerPortal(CustomerPortal):

    # ------------------------------------------------------------------
    # Contrôle d'accès
    # ------------------------------------------------------------------
    def _mcct_projects_domain(self):
        partner = request.env.user.partner_id.commercial_partner_id
        return [
            ('mcct_is_site', '=', True),
            ('privacy_visibility', '=', 'portal'),
            ('partner_id', 'child_of', partner.id),
        ]

    def _mcct_is_internal_preview(self):
        user = request.env.user
        return user._is_internal() and user.has_group('project.group_project_user')

    def _mcct_get_project(self, project_id):
        project = request.env['project.project'].sudo().browse(project_id).exists()
        if not project or not project.mcct_is_site:
            raise MissingError("Ce chantier n'existe pas.")
        if self._mcct_is_internal_preview():
            return project
        if not project.filtered_domain(self._mcct_projects_domain()):
            raise AccessError("Vous n'avez pas accès à ce chantier.")
        return project

    def _mcct_get_situation(self, situation_id):
        situation = request.env['mcct.situation'].sudo().browse(situation_id).exists()
        if not situation or situation.state not in PORTAL_SITUATION_STATES:
            raise MissingError("Cette situation n'existe pas.")
        self._mcct_get_project(situation.project_id.id)
        return situation

    def _mcct_signer_name(self, name):
        name = (name or '').strip()[:128]
        return name or request.env.user.partner_id.name

    # ------------------------------------------------------------------
    # Accueil du portail
    # ------------------------------------------------------------------
    def _prepare_home_portal_values(self, counters):
        values = super()._prepare_home_portal_values(counters)
        if 'mcct_site_count' in counters:
            values['mcct_site_count'] = request.env['project.project'].sudo().search_count(
                self._mcct_projects_domain())
        return values

    # ------------------------------------------------------------------
    # Liste et fiche chantier
    # ------------------------------------------------------------------
    @http.route(['/my/chantiers', '/my/chantiers/page/<int:page>'],
                type='http', auth='user', website=True)
    def portal_my_chantiers(self, page=1, sortby=None, filterby=None, **kw):
        Project = request.env['project.project'].sudo()
        searchbar_sortings = {
            'date': {'label': "Plus récents", 'order': 'create_date desc, id desc'},
            'name': {'label': "Nom", 'order': 'name asc, id asc'},
            'progress': {'label': "Avancement", 'order': 'mcct_progress desc, id desc'},
        }
        searchbar_filters = {
            'all': {'label': "Tous", 'domain': []},
            'open': {'label': "En cours", 'domain': [('mcct_phase', 'not in', FINISHED_PHASES)]},
            'done': {'label': "Réceptionnés", 'domain': [('mcct_phase', 'in', FINISHED_PHASES)]},
        }
        sortby = sortby if sortby in searchbar_sortings else 'date'
        filterby = filterby if filterby in searchbar_filters else 'all'
        domain = self._mcct_projects_domain() + searchbar_filters[filterby]['domain']

        total = Project.search_count(domain)
        pager = portal_pager(
            url='/my/chantiers', url_args={'sortby': sortby, 'filterby': filterby},
            total=total, page=page, step=self._items_per_page)
        projects = Project.search(
            domain, order=searchbar_sortings[sortby]['order'],
            limit=self._items_per_page, offset=pager['offset'])
        return request.render('mcct_industry.portal_my_chantiers', {
            'projects': projects,
            'page_name': 'mcct_chantiers',
            'default_url': '/my/chantiers',
            'pager': pager,
            'searchbar_sortings': searchbar_sortings,
            'sortby': sortby,
            'searchbar_filters': searchbar_filters,
            'filterby': filterby,
        })

    @http.route('/my/chantiers/<int:project_id>', type='http', auth='user', website=True)
    def portal_my_chantier(self, project_id, message=None, **kw):
        try:
            project = self._mcct_get_project(project_id)
        except (AccessError, MissingError):
            return request.redirect('/my')
        situations = project.mcct_situation_ids.filtered(
            lambda s: s.state in PORTAL_SITUATION_STATES).sorted('number', reverse=True)
        invoices = project.mcct_invoice_ids.filtered(lambda m: m.state == 'posted').sorted(
            lambda m: (m.invoice_date or m.date, m.id), reverse=True)
        reports = project.mcct_site_report_ids.filtered(lambda r: r.state == 'published')[:30]
        return request.render('mcct_industry.portal_my_chantier', {
            'mcct_project': project,
            'phase_steps': project._mcct_phase_steps(),
            'situations': situations,
            'invoices': invoices,
            'site_reports': reports,
            'documents': project.mcct_document_ids,
            'message': message,
            'page_name': 'mcct_chantier',
            'is_internal_preview': self._mcct_is_internal_preview(),
        })

    # ------------------------------------------------------------------
    # Situations de travaux
    # ------------------------------------------------------------------
    @http.route('/my/chantiers/situation/<int:situation_id>/pdf', type='http', auth='user', website=True)
    def portal_situation_pdf(self, situation_id, download=False, **kw):
        try:
            situation = self._mcct_get_situation(situation_id)
        except (AccessError, MissingError):
            return request.redirect('/my')
        return self._show_report(
            model=situation, report_type='pdf',
            report_ref='mcct_industry.action_report_situation', download=download)

    @http.route('/my/chantiers/situation/<int:situation_id>/approve', type='http', auth='user',
                methods=['POST'], website=True)
    def portal_situation_approve(self, situation_id, signer_name=None, **kw):
        try:
            situation = self._mcct_get_situation(situation_id)
        except (AccessError, MissingError):
            return request.redirect('/my')
        message = 'approved'
        try:
            situation._mcct_portal_approve(self._mcct_signer_name(signer_name))
        except UserError:
            message = 'not_pending'
        return request.redirect(f'/my/chantiers/{situation.project_id.id}?message={message}#situations')

    @http.route('/my/chantiers/situation/<int:situation_id>/changes', type='http', auth='user',
                methods=['POST'], website=True)
    def portal_situation_changes(self, situation_id, signer_name=None, comment=None, **kw):
        try:
            situation = self._mcct_get_situation(situation_id)
        except (AccessError, MissingError):
            return request.redirect('/my')
        message = 'changes'
        try:
            situation._mcct_portal_request_changes(
                self._mcct_signer_name(signer_name), (comment or '').strip()[:2000])
        except UserError:
            message = 'not_pending'
        return request.redirect(f'/my/chantiers/{situation.project_id.id}?message={message}#situations')

    # ------------------------------------------------------------------
    # Rapports, photos et documents
    # ------------------------------------------------------------------
    @http.route('/my/chantiers/rapport/<int:report_id>/pdf', type='http', auth='user', website=True)
    def portal_site_report_pdf(self, report_id, download=False, **kw):
        report = request.env['mcct.site.report'].sudo().browse(report_id).exists()
        try:
            if not report or report.state != 'published':
                raise MissingError("Ce rapport n'existe pas.")
            self._mcct_get_project(report.project_id.id)
        except (AccessError, MissingError):
            return request.redirect('/my')
        return self._show_report(
            model=report, report_type='pdf',
            report_ref='mcct_industry.action_report_site_report', download=download)

    @http.route('/my/chantiers/<int:project_id>/fichier/<int:attachment_id>',
                type='http', auth='user', website=True)
    def portal_chantier_attachment(self, project_id, attachment_id, download=False, **kw):
        try:
            project = self._mcct_get_project(project_id)
        except (AccessError, MissingError):
            return request.not_found()
        published_photos = project.mcct_site_report_ids.filtered(
            lambda r: r.state == 'published').photo_ids
        attachment = (project.mcct_document_ids | published_photos).filtered(
            lambda a: a.id == attachment_id)
        if not attachment:
            return request.not_found()
        stream = request.env['ir.binary']._get_stream_from(attachment.sudo())
        return stream.get_response(as_attachment=bool(download))
