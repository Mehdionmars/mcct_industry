// Jetons visuels partagés — charte « corporate clair ».
// Les mêmes valeurs existent en classes Tailwind (bg-navy, text-brand, bg-mist…).
export const ACCENT = '#1F6AAE'; // bleu MCCT
export const ACCENT_DARK = '#7DB8EC'; // bleu MCCT sur fond sombre
export const NAVY = '#0F2A47';
export const MIST = '#F4F7FB';

export const bodyFont = { fontFamily: "'Inter', system-ui, sans-serif" };
export const headingFont = { fontFamily: "'Inter', system-ui, sans-serif" };

// Le point de rupture de la maquette (900px) ne fait pas partie de l'échelle Tailwind :
// les composants utilisent les variantes arbitraires min-[900px]: / max-[899px]:.
// `key` renvoie vers ui.nav.<key> pour le libellé traduit.
export const navLinks = [
  { key: 'about', num: '01', to: '/about' },
  { key: 'services', num: '02', to: '/services' },
  { key: 'contact', num: '03', to: '/contact' }
];

export const PHONE = '+212 661 49 47 61';
export const PHONE_HREF = 'tel:+212661494761';
export const EMAIL = 'mcctindustry@gmail.com';
export const EMAIL_HREF = 'mailto:mcctindustry@gmail.com';
export const WHATSAPP_HREF = 'https://wa.me/212661494761';
export const ADDRESS_LINES = [
  'Route 310, km 6,',
  'Chellalate',
  'Aïn Harrouda — Maroc'
];


// Conteneur central commun à toutes les sections (1240px, marges latérales).
export const container = 'mx-auto w-full max-w-[1240px] px-5 min-[900px]:px-10';
