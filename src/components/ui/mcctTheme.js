// Jetons visuels partagés par les pages issues de la maquette MCCT.
export const ACCENT = '#2478BE';
export const INK = '#17191C';
export const PAPER = '#F5F5F2';
export const NIGHT = '#0D0F10';

export const bodyFont = { fontFamily: "'Manrope', sans-serif" };
export const headingFont = { fontFamily: "'Space Grotesk', 'Manrope', sans-serif" };

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


// Conteneur central commun à toutes les sections de la maquette (1280px, 40px de marge).
export const container = 'mx-auto w-full max-w-[1280px] px-5 min-[900px]:px-10';
