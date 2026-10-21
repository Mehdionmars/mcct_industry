// Jetons visuels partagés — charte « plan technique ».
// Les mêmes valeurs existent en classes Tailwind (bg-paper, text-ink, bg-safety…).
export const ACCENT = '#1F6AAE'; // bleu MCCT sur fond clair
export const ACCENT_DARK = '#5AA7EA'; // bleu MCCT sur fond sombre
export const SAFETY = '#F2B705'; // jaune sécurité
export const INK = '#0E2235';
export const PAPER = '#F2F4F6';
export const NIGHT = '#0B1B2C';

export const bodyFont = { fontFamily: "'IBM Plex Sans', system-ui, sans-serif" };
export const headingFont = { fontFamily: "'IBM Plex Sans Condensed', 'Arial Narrow', sans-serif" };
export const monoFont = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

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
