import React from 'react';

/**
 * Pictogrammes du savoir-faire MCCT — tracés au trait, dans l'esprit des icônes
 * de la brochure. Dessinés en interne plutôt que tirés d'une librairie : le jeu
 * couvre des gestes métier (levage, soudure, boulonnage) qu'aucun set générique
 * ne rend correctement.
 *
 * `name` est stable et indépendant de la langue (voir `icon` dans data/mcct).
 */
const PATHS = {
  // Compas de traçage : l'étude et le dimensionnement.
  engineering: (
    <>
      <circle cx="12" cy="4.4" r="1.7" />
      <path d="M10.8 5.9 6.2 19.6" />
      <path d="M13.2 5.9 17.8 19.6" />
      <path d="M8.7 12.6a8 8 0 0 0 6.6 0" />
      <path d="M5.4 19.2 6.2 21l1.6-1" />
    </>
  ),
  // Plan d'exécution : feuille cotée.
  design: (
    <>
      <rect x="3.4" y="4.2" width="17.2" height="15.6" rx="1.2" />
      <path d="M3.4 9.1h17.2" />
      <path d="M8.6 9.1v10.7" />
      <path d="M11.9 12.7h5.6" />
      <path d="M11.9 16.1h3.6" />
    </>
  ),
  // Étincelles de soudure au-dessus de la pièce en cours.
  fabrication: (
    <>
      <path d="M3 20.4h18" />
      <path d="M7.2 20.4v-3.8h9.6v3.8" />
      <path d="M12 3.2v3.9" />
      <path d="M8.9 4.3l1.7 2.9" />
      <path d="M15.1 4.3l-1.7 2.9" />
      <path d="M6.3 7.6l2.9 1.7" />
      <path d="M17.7 7.6l-2.9 1.7" />
    </>
  ),
  // Écrou six pans : l'assemblage boulonné.
  assembly: (
    <>
      <path d="M12 3.3 19.5 7.7v8.6L12 20.7 4.5 16.3V7.7z" />
      <circle cx="12" cy="12" r="3.4" />
    </>
  ),
  // Grue à tour : le levage et le montage sur site.
  installation: (
    <>
      <path d="M5.6 20.8h7" />
      <path d="M9.1 20.8V4.1" />
      <path d="M4.6 4.1h15" />
      <path d="M9.1 6.9 12.6 4.1" />
      <path d="M17.4 4.1v3.5" />
      <path d="M15.9 7.6h3v2.2h-3z" />
    </>
  ),
  // Clé plate : l'entretien et les interventions en exploitation.
  maintenance: (
    <>
      <path d="M15.4 4.3a4.7 4.7 0 0 0-6 6l-5.4 5.4a1.7 1.7 0 0 0 0 2.4l1.9 1.9a1.7 1.7 0 0 0 2.4 0l5.4-5.4a4.7 4.7 0 0 0 6-6l-3 3-2.6-.7-.7-2.6z" />
      <path d="M6.4 17.6h.01" />
    </>
  )
};

const ProcessIcon = ({ name, className = '' }) => {
  const paths = PATHS?.[name];
  if (!paths) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths}
    </svg>
  );
};

export default ProcessIcon;
