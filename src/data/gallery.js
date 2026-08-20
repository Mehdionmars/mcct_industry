// Visuels MCCT Industrie servis depuis public/assets/gallery.
// Deux tailles : `thumb` (640px) pour les grilles, la version pleine (1400px) pour
// la visionneuse et les images de fond.
//
// Légendes et catégories vérifiées photo par photo (août 2026) : elles décrivent
// ce que l'image montre réellement, car elles servent aussi de texte alternatif.
const BASE = '/assets/gallery';

/** Image pleine taille (1400px de large). */
export const img = (id) => `${BASE}/${id}.webp`;
/** Vignette 640px, à utiliser dès qu'une image est affichée en petit format. */
export const thumb = (id) => `${BASE}/thumb/${id}.webp`;

export const galleryCategories = [
  'TOUT',
  'CHARPENTE',
  'CHANTIER',
  'ATELIER',
  'CHAUDRONNERIE',
  'ÉQUIPEMENTS',
  'MAINTENANCE'
];

// [ identifiant, description, catégorie, hauteur (1 = normale, 2 = double), projet lié ]
const rawItems = [
  ['IMG_7847', 'Aménagement intérieur en cours sous ossature de plafond', 'CHANTIER', 1, null],
  ['IMG_7861', 'Auvent en charpente acier à couverture translucide', 'CHARPENTE', 2, 'auvent-en-charpente-acier'],
  ['IMG_7864', 'Intérieur d’un hangar métallique livré', 'CHARPENTE', 1, 'hangar-livre-cle-en-main'],
  ['IMG_7866', 'Hangar industriel livré, bardage et portes sectionnelles', 'CHARPENTE', 1, 'hangar-livre-cle-en-main'],
  ['IMG_7871', 'Façade bardée éclairée de nuit', 'CHARPENTE', 1, null],
  ['IMG_7873', 'Pose de la couverture depuis une nacelle élévatrice', 'CHANTIER', 2, null],
  ['IMG_7876', 'Finitions intérieures d’un bâtiment métallique', 'CHANTIER', 1, null],
  ['IMG_7882', 'Bâtiment métallique en cours de finition', 'CHARPENTE', 1, null],
  ['IMG_7886', 'Montage d’une paroi de cuve métallique', 'CHAUDRONNERIE', 1, 'reservoir-metallique'],
  ['IMG_7887', 'Levage d’une paroi de cuve à la grue', 'CHAUDRONNERIE', 2, 'reservoir-metallique'],
  ['IMG_7890', 'Ossature acier en élévation', 'CHARPENTE', 1, 'ossature-acier-chantier'],
  ['IMG_7894', 'Pose de couverture en bac acier', 'CHANTIER', 1, null],
  ['IMG_7897', 'Charpente métallique en cours de montage', 'CHARPENTE', 1, 'hangar-metallique'],
  ['IMG_7898', 'Ossature de hangar et profilés en attente de levage', 'CHARPENTE', 2, 'hangar-metallique'],
  ['IMG_7905', 'Convoyeur à bande sous couverture', 'ÉQUIPEMENTS', 1, 'convoyeur-industriel'],
  ['IMG_7907', 'Supports de process assemblés sur site', 'ÉQUIPEMENTS', 1, 'structure-de-process'],
  ['IMG_7912', 'Coulage des massifs de fondation', 'CHANTIER', 1, null],
  ['IMG_7916', 'Soudure d’assemblages en atelier', 'ATELIER', 2, null],
  ['IMG_7918', 'Trémie chaudronnée chargée à l’atelier', 'ATELIER', 1, 'ensembles-chaudronnes'],
  ['IMG_7924', 'Tronçon de tuyauterie grand diamètre en préparation', 'ATELIER', 1, 'tuyauterie-grand-diametre'],
  ['IMG_7938', 'Intervention sur un réservoir métallique', 'MAINTENANCE', 1, 'maintenance-de-station'],
  ['IMG_7939', 'Levage d’un module technique', 'MAINTENANCE', 2, 'levage-d-equipements'],
  ['IMG_7941', 'Intervention sur une ligne de tuyauterie', 'MAINTENANCE', 1, null],
  ['IMG_7943', 'Poste de détente gaz — tuyauterie et robinetterie', 'MAINTENANCE', 1, 'installations-gaz'],
  ['IMG_7947', 'Montage de charpente au chariot télescopique', 'CHANTIER', 1, null],
  ['IMG_7955', 'Local industriel livré, bardage intérieur', 'CHARPENTE', 1, null]
];

export const galleryItems = rawItems?.map(([id, alt, category, span, projectSlug]) => ({
  id,
  src: img(id),
  thumbSrc: thumb(id),
  alt,
  category,
  span,
  projectSlug
}));

/** Légende de référence d'une image, réutilisée comme texte alternatif ailleurs. */
export const captionOf = (id) => galleryItems?.find((item) => item?.id === id)?.alt ?? '';

export const galleryHeroImage = img('IMG_7890');

export default galleryItems;
