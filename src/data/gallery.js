// Visuels MCCT Industrie servis depuis public/assets/gallery.
// Deux tailles : `thumb` (640px) pour les grilles, la version pleine (1400px) pour
// la visionneuse et les images de fond.
//
// Légendes vérifiées photo par photo (août 2026) : elles décrivent ce que l'image
// montre réellement, car elles servent aussi de texte alternatif. Chaque légende
// existe en français et en anglais.
import { localize } from '../i18n/LanguageProvider';

const BASE = '/assets/gallery';

/** Image pleine taille (1400px de large). */
export const img = (id) => `${BASE}/${id}.webp`;
/** Vignette 640px, à utiliser dès qu'une image est affichée en petit format. */
export const thumb = (id) => `${BASE}/thumb/${id}.webp`;

/** Catégories : `key` est stable (filtrage), `label` est traduit (affichage). */
export const galleryCategories = [
  { key: 'ALL', label: { fr: 'TOUT', en: 'ALL' } },
  { key: 'CHARPENTE', label: { fr: 'CHARPENTE', en: 'STEELWORK' } },
  { key: 'CHANTIER', label: { fr: 'CHANTIER', en: 'ON SITE' } },
  { key: 'ATELIER', label: { fr: 'ATELIER', en: 'WORKSHOP' } },
  { key: 'CHAUDRONNERIE', label: { fr: 'CHAUDRONNERIE', en: 'BOILERMAKING' } },
  { key: 'EQUIPEMENTS', label: { fr: 'ÉQUIPEMENTS', en: 'EQUIPMENT' } },
  { key: 'MAINTENANCE', label: { fr: 'MAINTENANCE', en: 'MAINTENANCE' } }
];

export const categoryLabel = (key, lang) =>
  localize(galleryCategories?.find((category) => category?.key === key)?.label, lang) ?? key;

// [ identifiant, légende { fr, en }, catégorie, hauteur (1 = normale, 2 = double), projet lié ]
const rawItems = [
  [
    'IMG_7847',
    { fr: 'Aménagement intérieur en cours sous ossature de plafond', en: 'Interior fit-out under a ceiling frame' },
    'CHANTIER',
    1,
    null
  ],
  [
    'IMG_7861',
    { fr: 'Auvent en charpente acier à couverture translucide', en: 'Steel canopy with translucent roofing' },
    'CHARPENTE',
    2,
    'auvent-en-charpente-acier'
  ],
  [
    'IMG_7864',
    { fr: 'Intérieur d’un hangar métallique livré', en: 'Interior of a completed steel warehouse' },
    'CHARPENTE',
    1,
    'hangar-livre-cle-en-main'
  ],
  [
    'IMG_7951',
    {
      fr: 'Hangar industriel livré, bardage métallique',
      en: 'Completed industrial building with steel cladding'
    },
    'CHARPENTE',
    1,
    'hangar-livre-cle-en-main'
  ],
  ['IMG_7871', { fr: 'Façade bardée éclairée de nuit', en: 'Clad façade lit at night' }, 'CHARPENTE', 1, null],
  [
    'IMG_7873',
    { fr: 'Pose de la couverture depuis une nacelle élévatrice', en: 'Roof sheeting installed from a scissor lift' },
    'CHANTIER',
    2,
    null
  ],
  [
    'IMG_7876',
    { fr: 'Finitions intérieures d’un bâtiment métallique', en: 'Interior finishing of a steel building' },
    'CHANTIER',
    1,
    null
  ],
  [
    'IMG_7882',
    { fr: 'Bâtiment métallique en cours de finition', en: 'Steel building being finished' },
    'CHARPENTE',
    1,
    null
  ],
  [
    'IMG_7886',
    { fr: 'Montage d’une paroi de cuve métallique', en: 'Assembling a steel tank wall' },
    'CHAUDRONNERIE',
    1,
    'reservoir-metallique'
  ],
  [
    'IMG_7887',
    { fr: 'Levage d’une paroi de cuve à la grue', en: 'Craning a tank wall into position' },
    'CHAUDRONNERIE',
    2,
    'reservoir-metallique'
  ],
  [
    'charpente-ossature-elevation',
    { fr: 'Ossature acier en élévation', en: 'Steel frame going up' },
    'CHARPENTE',
    1,
    'ossature-acier-chantier'
  ],
  [
    'IMG_7940',
    { fr: 'Levage d’un module à la grue sur chantier', en: 'Craning a modular unit into place on site' },
    'CHANTIER',
    1,
    null
  ],
  [
    'charpente-montage-telescopique',
    { fr: 'Charpente métallique en cours de montage', en: 'Steel structure being erected' },
    'CHARPENTE',
    1,
    'hangar-metallique'
  ],
  [
    'charpente-profiles-attente',
    { fr: 'Ossature de hangar et profilés en attente de levage', en: 'Building frame with sections awaiting lifting' },
    'CHARPENTE',
    2,
    'hangar-metallique'
  ],
  [
    'IMG_7905',
    { fr: 'Convoyeur à bande sous couverture', en: 'Belt conveyor under a roof structure' },
    'EQUIPEMENTS',
    1,
    'convoyeur-industriel'
  ],
  [
    'IMG_7907',
    { fr: 'Supports de process assemblés sur site', en: 'Process supports assembled on site' },
    'EQUIPEMENTS',
    1,
    'structure-de-process'
  ],
  ['IMG_7912', { fr: 'Coulage des massifs de fondation', en: 'Pouring the foundation blocks' }, 'CHANTIER', 1, null],
  ['IMG_7916', { fr: 'Soudure d’assemblages en atelier', en: 'Welding assemblies in the workshop' }, 'ATELIER', 2, null],
  [
    'IMG_7918',
    { fr: 'Trémie chaudronnée chargée à l’atelier', en: 'Fabricated hopper loaded at the workshop' },
    'ATELIER',
    1,
    'ensembles-chaudronnes'
  ],
  [
    'IMG_7924',
    { fr: 'Tronçon de tuyauterie grand diamètre en préparation', en: 'Large-diameter pipe spool being prepared' },
    'ATELIER',
    1,
    'tuyauterie-grand-diametre'
  ],
  [
    'IMG_7938',
    { fr: 'Intervention sur un réservoir métallique', en: 'Intervention on a steel tank' },
    'MAINTENANCE',
    1,
    'maintenance-de-station'
  ],
  [
    'IMG_7939',
    { fr: 'Levage d’un module technique', en: 'Lifting a technical module' },
    'MAINTENANCE',
    2,
    'levage-d-equipements'
  ],
  [
    'IMG_7941',
    { fr: 'Intervention sur une ligne de tuyauterie', en: 'Work on a piping line' },
    'MAINTENANCE',
    1,
    null
  ],
  [
    'IMG_7943',
    { fr: 'Poste de détente gaz — tuyauterie et robinetterie', en: 'Gas pressure-reduction skid — piping and valves' },
    'MAINTENANCE',
    1,
    'installations-gaz'
  ],
  [
    'IMG_7947',
    { fr: 'Montage de charpente au chariot télescopique', en: 'Erecting steelwork with a telehandler' },
    'CHANTIER',
    1,
    null
  ],
  [
    'IMG_7955',
    { fr: 'Local industriel livré, bardage intérieur', en: 'Completed industrial unit with interior cladding' },
    'CHARPENTE',
    1,
    null
  ]
];

/** Visuels de la galerie, légendes et catégories dans la langue demandée. */
export const getGalleryItems = (lang = 'fr') =>
  rawItems?.map(([id, alt, category, span, projectSlug]) => ({
    id,
    src: img(id),
    thumbSrc: thumb(id),
    alt: localize(alt, lang),
    category,
    categoryLabel: categoryLabel(category, lang),
    span,
    projectSlug
  }));

/** Légende de référence d'une image (texte alternatif réutilisable). */
export const captionOf = (id, lang = 'fr') => localize(rawItems?.find((item) => item?.[0] === id)?.[1], lang) ?? '';

export const galleryHeroImage = img('charpente-ossature-elevation');

export default getGalleryItems;
