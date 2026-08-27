import { useEffect, useRef, useState } from 'react';

/**
 * Progression du défilement à l'intérieur d'une section « épinglée ».
 *
 * Renvoie `{ ref, progress }` où `progress` va de 0 (le haut de la section
 * atteint le haut du viewport) à 1 (son bas y arrive). À utiliser sur une
 * section haute contenant un enfant `sticky top-0 h-screen`.
 *
 * Mesure faite dans un rAF, écouteur passif, et rien n'est calculé tant que la
 * section est hors champ.
 */
const useScrollProgress = () => {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref?.current;
    if (!node) return undefined;

    let frame = 0;
    let visible = true;

    const update = () => {
      frame = 0;
      if (!visible) return;
      const rect = node.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.max(0, Math.min(1, -rect.top / travel)));
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
            { rootMargin: '100px 0px' }
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
  }, []);

  return { ref, progress };
};

export default useScrollProgress;
