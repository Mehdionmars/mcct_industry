// Jetons visuels partagés par les pages issues de la maquette MCCT.
export const ACCENT = '#2478BE';
export const INK = '#17191C';
export const PAPER = '#F5F5F2';
export const NIGHT = '#0D0F10';

export const bodyFont = { fontFamily: "'Manrope', sans-serif" };
export const headingFont = { fontFamily: "'Space Grotesk', 'Manrope', sans-serif" };

// Le point de rupture de la maquette (900px) ne fait pas partie de l'échelle Tailwind :
// les composants utilisent les variantes arbitraires min-[900px]: / max-[899px]:.
export const navLinks = [
  { num: '01', label: 'À PROPOS', to: '/about' },
  { num: '02', label: 'ACTIVITÉS', to: '/services' },
  { num: '03', label: 'PROJETS', to: '/projects' },
  { num: '04', label: 'GALERIE', to: '/galerie' },
  { num: '05', label: 'CONTACT', to: '/contact' }
];

export const PHONE = '+212 666 149 4761';
export const PHONE_HREF = 'tel:+2126661494761';
export const EMAIL = 'contact@mcct-industry.ma';
export const EMAIL_HREF = 'mailto:contact@mcct-industry.ma';
export const WHATSAPP_HREF = 'https://wa.me/2126661494761';
export const ADDRESS_LINES = [
  '13, rue Ahmed El Mejatti — ex Alpes,',
  'rés. les Alpes, 1er étage',
  'Casablanca — Maroc'
];


// Conteneur central commun à toutes les sections de la maquette (1280px, 40px de marge).
export const container = 'mx-auto w-full max-w-[1280px] px-5 min-[900px]:px-10';
