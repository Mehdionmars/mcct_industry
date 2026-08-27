import { useEffect, useRef, useState } from 'react';

/**
 * Décalage parallaxe piloté par le défilement.
 *
 * Renvoie `{ ref, offset }` : `offset` va de `-distance` à `+distance` pendant
 * que l'élément traverse le viewport (0 quand il est parfaitement centré).
 * À appliquer en `translate3d(0, offset, 0)` sur la couche de fond.
 *
 * La mesure est faite dans un rAF et l'écouteur est passif : aucun reflow
 * synchrone pendant le scroll. Neutralisé si l'utilisateur a demandé des
 * animations réduites, et tant que l'élément est hors du viewport.
 */
const useParallax = (distance = 60) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const node = ref?.current;
    if (!node) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)')?.matches) return undefined;

    let frame = 0;
    let visible = true;

    const update = () => {
      frame = 0;
      if (!visible) return;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // Centre de l'élément rapporté au centre du viewport, normalisé sur [-1, 1].
      const progress = (rect.top + rect.height / 2 - viewport / 2) / (viewport / 2 + rect.height / 2);
      setOffset(Math.max(-1, Math.min(1, progress)) * distance);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              visible = entries?.[0]?.isIntersecting ?? true;
              if (visible) onScroll();
            },
            { rootMargin: '200px 0px' }
          )
        : null;
    observer?.observe(node);

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      observer?.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [distance]);

  return { ref, offset };
};

export default useParallax;
