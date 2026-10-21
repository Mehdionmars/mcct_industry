// Visuels MCCT Industrie servis depuis public/assets/gallery.
// Deux tailles : `thumb` (640px) pour les grilles, la version pleine (1400px) pour
// les images de fond.

const BASE = '/assets/gallery';

/** Image pleine taille (1400px de large). */
export const img = (id) => `${BASE}/${id}.webp`;
/** Vignette 640px, à utiliser dès qu'une image est affichée en petit format. */
export const thumb = (id) => `${BASE}/thumb/${id}.webp`;
