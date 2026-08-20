import React, { useEffect, useRef, useState } from 'react';

const MIN_VISIBLE = 1100; // laisse le temps de lire la signature
const MAX_VISIBLE = 2400; // ne bloque jamais l'accès au site
const FADE = 520;

/**
 * Écran d'accueil affiché avant le site : logo MCCT + signature « Your vision, our mission ».
 * Disparaît dès que la page est chargée (au plus tard après MAX_VISIBLE), une seule
 * fois par session, et s'efface immédiatement si l'utilisateur refuse les animations.
 */
const SplashScreen = ({ onDone }) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')?.matches;
    const start = performance.now();
    let leaveTimer;
    let doneTimer;

    const leave = () => {
      if (doneRef?.current) return;
      doneRef.current = true;
      document.documentElement.classList.remove('mcct-booting');
      if (reduced) {
        onDone();
        return;
      }
      setIsLeaving(true);
      doneTimer = setTimeout(onDone, FADE);
    };

    const schedule = () => {
      const elapsed = performance.now() - start;
      leaveTimer = setTimeout(leave, Math.max(reduced ? 0 : MIN_VISIBLE - elapsed, 0));
    };

    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    const safety = setTimeout(leave, MAX_VISIBLE);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('load', schedule);
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
      clearTimeout(safety);
      document.body.style.overflow = previousOverflow;
    };
  }, [onDone]);

  return (
    <div
      role="status"
      aria-label="Chargement du site MCCT Industrie"
      className="fixed inset-0 z-[400] flex flex-col items-center justify-center gap-[clamp(20px,4vw,36px)] bg-[#0D0F10] px-6 text-center"
      style={{
        opacity: isLeaving ? 0 : 1,
        transform: isLeaving ? 'scale(1.04)' : 'scale(1)',
        transition: `opacity ${FADE}ms ease, transform ${FADE}ms cubic-bezier(0.22, 1, 0.36, 1)`
      }}
    >
      <img
        src="/logo1.png"
        alt="MCCT Industrie"
        className="h-[clamp(38px,7vw,68px)] w-auto animate-mcct-rise brightness-0 invert"
        style={{ animationDuration: '0.7s' }}
      />

      <img
        src="/assets/brand/tagline-light.webp"
        alt="Your vision, our mission"
        className="w-[min(78vw,620px)] animate-mcct-rise"
        style={{ animationDelay: '0.18s', animationDuration: '0.8s' }}
      />

      <span aria-hidden="true" className="block h-px w-[min(60vw,320px)] overflow-hidden bg-[#23272b]">
        <span className="block h-full w-full origin-left animate-mcct-load bg-[#2478BE]" />
      </span>
    </div>
  );
};

export default SplashScreen;
