import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * État partagé des carrousels (horizontal comme vertical).
 *
 * - `index` / `goTo` / `next` / `prev` : navigation cyclique.
 * - Lecture automatique optionnelle, mise en pause au survol, au focus clavier,
 *   quand l'onglet passe en arrière-plan et quand le carrousel sort de l'écran.
 * - Respecte `prefers-reduced-motion` : dans ce cas rien ne défile tout seul.
 *
 * `containerProps` est à étaler sur l'élément qui englobe le carrousel : il
 * câble la pause au survol/focus et la navigation au clavier (flèches).
 */
const useCarousel = (length, { auto = false, interval = 5200, orientation = 'horizontal' } = {}) => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef(null);

  const goTo = useCallback(
    (next) => {
      if (!length) return;
      setIndex(((next % length) + length) % length);
    },
    [length]
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Lecture automatique : suspendue dès que l'utilisateur regarde ailleurs.
  useEffect(() => {
    if (!auto || isPaused || length < 2) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)')?.matches) return undefined;

    const node = ref?.current;
    let visible = true;
    const observer =
      node && 'IntersectionObserver' in window
        ? new IntersectionObserver((entries) => {
            visible = entries?.[0]?.isIntersecting ?? true;
          })
        : null;
    observer?.observe(node);

    const timer = setInterval(() => {
      if (visible && !document.hidden) setIndex((current) => (current + 1) % length);
    }, interval);

    return () => {
      clearInterval(timer);
      observer?.disconnect();
    };
  }, [auto, isPaused, interval, length]);

  const onKeyDown = useCallback(
    (event) => {
      const back = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
      const forward = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
      if (event?.key === back) {
        event.preventDefault();
        prev();
      } else if (event?.key === forward) {
        event.preventDefault();
        next();
      }
    },
    [next, prev, orientation]
  );

  const containerProps = {
    ref,
    onMouseEnter: () => setIsPaused(true),
    onMouseLeave: () => setIsPaused(false),
    onFocusCapture: () => setIsPaused(true),
    onBlurCapture: () => setIsPaused(false),
    onKeyDown
  };

  return { index, goTo, next, prev, containerProps };
};

export default useCarousel;
