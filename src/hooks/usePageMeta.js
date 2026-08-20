import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_NAME = 'MCCT Industrie';
// Domaine de production, utilisé pour les URL canoniques et Open Graph.
const SITE_URL = 'https://www.mcct-industry.ma';

const upsert = (selector, create) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
};

const setMeta = (name, content, attr = 'name') => {
  if (!content) return;
  const el = upsert(`meta[${attr}="${name}"]`, () => {
    const tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    return tag;
  });
  el.setAttribute('content', content);
};

/**
 * Renseigne titre, description, URL canonique et cartes de partage de la page courante.
 *
 * react-helmet n'applique pas ses effets de façon fiable sous React 18 : le titre
 * restait figé sur celui de la page précédente lors des navigations côté client.
 * Cet effet, lui, s'exécute à chaque changement de page.
 */
const usePageMeta = (title, description, image) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const url = `${SITE_URL}${pathname}`;
    const absoluteImage = image ? `${SITE_URL}${image}` : `${SITE_URL}/assets/gallery/IMG_7861.webp`;

    if (title) document.title = title;
    setMeta('description', description);

    const canonical = upsert('link[rel="canonical"]', () => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      return link;
    });
    canonical.setAttribute('href', url);

    setMeta('og:site_name', SITE_NAME, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:locale', 'fr_MA', 'property');
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:image', absoluteImage, 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', absoluteImage);
  }, [title, description, image, pathname]);
};

export default usePageMeta;
