import { Component, onWillStart, useRef, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { ControlPanel } from "@web/search/control_panel/control_panel";
import { formatMonetary } from "@web/views/fields/formatters";
import { standardActionServiceProps } from "@web/webclient/actions/action_service";

import { BOUNDS, MOROCCO_PATH, PROJECTION } from "./morocco_outline";

const PADDING = 30;
const BASE_VIEW = {
    x: BOUNDS.minX - PADDING,
    y: BOUNDS.minY - PADDING,
    w: BOUNDS.maxX - BOUNDS.minX + 2 * PADDING,
    h: BOUNDS.maxY - BOUNDS.minY + 2 * PADDING,
};
const MAX_ZOOM = 10;
const COS_LAT0 = Math.cos((PROJECTION.lat0 * Math.PI) / 180);

/** Coordonnées (latitude, longitude) -> repère du contour. */
export function projectPoint(lat, lng) {
    return {
        x: (lng - PROJECTION.lon0) * COS_LAT0 * PROJECTION.scale,
        y: (PROJECTION.latTop - lat) * PROJECTION.scale,
    };
}

export class ChantierMap extends Component {
    static template = "mcct_industry.ChantierMap";
    static components = { ControlPanel };
    static props = { ...standardActionServiceProps };

    setup() {
        this.orm = useService("orm");
        this.actionService = useService("action");
        this.svgRef = useRef("svg");
        this.outline = MOROCCO_PATH;
        this.scopes = [
            { key: "active", label: "En cours" },
            { key: "received", label: "Réceptionnés" },
            { key: "all", label: "Tous" },
        ];
        this.state = useState({
            scope: "active",
            data: null,
            selected: null,
            view: { ...BASE_VIEW },
        });
        this.drag = null;
        onWillStart(() => this.load());
    }

    async load() {
        const data = await this.orm.call("project.project", "mcct_get_map_data", [], {
            scope: this.state.scope,
        });
        if (this.state.selected && !data.cities.some((city) => city.key === this.state.selected)) {
            this.state.selected = null;
        }
        this.state.data = data;
    }

    async setScope(scope) {
        if (scope !== this.state.scope) {
            this.state.scope = scope;
            await this.load();
        }
    }

    // ------------------------------------------------------------------
    // Données affichées
    // ------------------------------------------------------------------
    /** Échelle courante : 1 = tout le Maroc ; les repères gardent une taille fixe à l'écran. */
    get unit() {
        return this.state.view.w / BASE_VIEW.w;
    }

    get viewBox() {
        const { x, y, w, h } = this.state.view;
        return `${x} ${y} ${w} ${h}`;
    }

    /**
     * Cercles des villes, position de leur libellé (à droite, sinon à gauche, sinon masqué)
     * et repères gris qui ne gênent aucun libellé.
     */
    get layout() {
        const unit = this.unit;
        const data = this.state.data || { cities: [], landmarks: [] };
        const markers = data.cities.map((city) => {
            const { x, y } = projectPoint(city.lat, city.lng);
            const r = (7 + 4 * Math.sqrt(city.count)) * unit;
            return { ...city, x, y, r, selected: city.key === this.state.selected, labelSide: null };
        });
        const overlaps = (a, b) => a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2;
        const circles = markers.map((m) => ({ key: m.key, x1: m.x - m.r, x2: m.x + m.r, y1: m.y - m.r, y2: m.y + m.r }));
        const labels = [];
        const ordered = [...markers].sort((a, b) => b.selected - a.selected || b.count - a.count);
        for (const marker of ordered) {
            const width = marker.name.length * 7 * unit;
            const gap = marker.r + 4 * unit;
            const box = (x1) => ({ x1, x2: x1 + width, y1: marker.y - 8 * unit, y2: marker.y + 8 * unit });
            const candidates = [["start", box(marker.x + gap)], ["end", box(marker.x - gap - width)]];
            const isFree = ([, candidate]) =>
                labels.every((other) => !overlaps(candidate, other)) &&
                circles.every((c) => c.key === marker.key || !overlaps(candidate, c));
            // La ville sélectionnée garde toujours son nom.
            const chosen = candidates.find(isFree) || (marker.selected && candidates[0]);
            if (chosen) {
                marker.labelSide = chosen[0];
                labels.push(chosen[1]);
            }
        }
        const obstacles = [...labels, ...circles];
        const landmarks = data.landmarks
            .map((landmark) => ({ ...landmark, ...projectPoint(landmark.lat, landmark.lng) }))
            .filter((landmark) => {
                const box = {
                    x1: landmark.x - 3 * unit,
                    x2: landmark.x + (6 + landmark.name.length * 6) * unit,
                    y1: landmark.y - 7 * unit,
                    y2: landmark.y + 7 * unit,
                };
                return obstacles.every((other) => !overlaps(box, other));
            });
        // Les petits cercles au-dessus des gros pour rester cliquables.
        markers.sort((a, b) => b.r - a.r);
        return { markers, landmarks };
    }

    get selectedCity() {
        return (this.state.data?.cities || []).find((city) => city.key === this.state.selected);
    }

    markerClass(marker) {
        return {
            o_mcct_marker: true,
            "o_mcct_marker--late": marker.late,
            "o_mcct_marker--received": marker.received && !marker.late,
            "o_mcct_marker--selected": marker.selected,
        };
    }

    markerTitle(marker) {
        const count = marker.count > 1 ? `${marker.count} chantiers` : "1 chantier";
        return `${marker.name} — ${count} — ${this.formatAmount(marker.amount)}`;
    }

    formatAmount(value) {
        return formatMonetary(value || 0, { currencyId: this.state.data?.currency_id });
    }

    formatProgress(value) {
        return `${Math.round(value || 0)} %`;
    }

    plural(count, singular, plural) {
        return `${count} ${count > 1 ? plural : singular}`;
    }

    // ------------------------------------------------------------------
    // Interactions
    // ------------------------------------------------------------------
    selectCity(key) {
        this.state.selected = this.state.selected === key ? null : key;
    }

    onMarkerClick(marker) {
        if (!this.drag?.moved) {
            this.selectCity(marker.key);
        }
    }

    openProject(projectId) {
        this.actionService.doAction({
            type: "ir.actions.act_window",
            res_model: "project.project",
            res_id: projectId,
            views: [[false, "form"]],
            target: "current",
        });
    }

    toSvgPoint(ev) {
        const svg = this.svgRef.el;
        const point = svg.createSVGPoint();
        point.x = ev.clientX;
        point.y = ev.clientY;
        return point.matrixTransform(svg.getScreenCTM().inverse());
    }

    zoom(factor, center) {
        const view = this.state.view;
        const width = Math.min(BASE_VIEW.w, Math.max(BASE_VIEW.w / MAX_ZOOM, view.w * factor));
        const ratio = width / view.w;
        const cx = center ? center.x : view.x + view.w / 2;
        const cy = center ? center.y : view.y + view.h / 2;
        this.state.view = {
            x: cx - (cx - view.x) * ratio,
            y: cy - (cy - view.y) * ratio,
            w: width,
            h: view.h * ratio,
        };
        if (width === BASE_VIEW.w) {
            this.resetView();
        }
    }

    resetView() {
        this.state.view = { ...BASE_VIEW };
    }

    onWheel(ev) {
        ev.preventDefault();
        this.zoom(ev.deltaY < 0 ? 0.8 : 1.25, this.toSvgPoint(ev));
    }

    onPointerDown(ev) {
        if (ev.button !== 0) {
            return;
        }
        const rect = this.svgRef.el.getBoundingClientRect();
        this.drag = {
            x: ev.clientX,
            y: ev.clientY,
            view: { ...this.state.view },
            // Unités du repère par pixel (preserveAspectRatio « meet »).
            scale: Math.max(this.state.view.w / rect.width, this.state.view.h / rect.height),
            moved: false,
        };
    }

    onPointerMove(ev) {
        const drag = this.drag;
        if (!drag || !(ev.buttons & 1)) {
            return;
        }
        const dx = ev.clientX - drag.x;
        const dy = ev.clientY - drag.y;
        if (!drag.moved && Math.hypot(dx, dy) < 4) {
            return;
        }
        drag.moved = true;
        this.state.view = {
            ...drag.view,
            x: drag.view.x - dx * drag.scale,
            y: drag.view.y - dy * drag.scale,
        };
    }

    onPointerUp() {
        // Laisse le « click » qui suit savoir s'il s'agissait d'un glissement.
        setTimeout(() => (this.drag = null));
    }
}

registry.category("actions").add("mcct_industry.chantier_map", ChantierMap);
