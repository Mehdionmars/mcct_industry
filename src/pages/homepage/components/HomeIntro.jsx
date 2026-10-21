import React, { useEffect, useRef, useState } from 'react';
import Reveal from '../../../components/ui/Reveal';
import { useI18n } from '../../../i18n/LanguageProvider';
import { container } from '../../../components/ui/mcctTheme';
import { Eyebrow, SectionTitle } from '../../../components/ui/Corporate';
import { getKeyFigures } from '../../../data/mcct';
import { img } from '../../../data/gallery';

/** Compteur animé au moment où le chiffre entre dans le champ de vision. */
const Counter = ({ value }) => {
  const ref = useRef(null);
  const [displayed, setDisplayed] = useState(value);

  useEffect(() => {
    const node = ref?.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')?.matches;
    if (!node || reduced || !('IntersectionObserver' in window)) return undefined;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries?.forEach((entry) => {
          if (!entry?.isIntersecting) return;
          observer.unobserve(entry?.target);
          const start = performance.now();
          const duration = 1500;
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            setDisplayed(Math.round(value * (1 - Math.pow(1 - progress, 3))));
            if (progress < 1) frame = requestAnimationFrame(tick);
          };
          setDisplayed(0);
          frame = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={ref}>{displayed}</span>;
};

const HomeIntro = () => {
  const { lang, t } = useI18n();
  const keyFigures = getKeyFigures(lang);
  const title = t('home.introTitle');

  return (
  <section id="apropos" className="bg-white py-24">
    <div className={container}>
      <div className="grid items-center gap-14 min-[1000px]:grid-cols-2">
        <Reveal className="relative min-w-0">
          <div className="overflow-hidden rounded-3xl shadow-[0_30px_70px_-30px_rgba(15,42,71,0.4)]">
            <img
              src={img('IMG_7864')}
              alt={t('home.introImageAlt')}
              loading="lazy"
              className="block h-[clamp(320px,50vh,520px)] w-full object-cover transition-transform [transition-duration:800ms] hover:scale-[1.03]"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-5 -right-5 -z-10 hidden h-40 w-40 rounded-3xl bg-sky min-[1000px]:block"
          />
        </Reveal>
        <Reveal className="min-w-0">
          <Eyebrow>{t('home.introEyebrow')}</Eyebrow>
          <SectionTitle title={title} accentLast />
          <p className="mt-6 text-[17px] leading-[1.75] text-copy">{t('home.introP1')}</p>
          <p className="mt-4 text-[17px] leading-[1.75] text-copy">{t('home.introP2')}</p>
          <a
            href="#savoirfaire"
            className="mt-7 inline-flex items-center gap-2 text-[15.5px] font-semibold text-brand transition-colors hover:text-navy"
          >
            {t('home.introLink')} <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>

      {/* Chiffres clés en cartes. */}
      <div className="mt-20 grid grid-cols-2 gap-4 min-[900px]:grid-cols-4 min-[900px]:gap-6">
        {keyFigures?.map((figure) => (
          <Reveal key={figure?.label} className="min-w-0 rounded-2xl bg-mist p-6 min-[600px]:p-8">
            <p className="font-display text-[clamp(2.4rem,4.4vw,3.4rem)] font-extrabold leading-none tracking-[-0.02em] text-brand">
              <Counter value={figure?.value} />+
            </p>
            <p className="mt-3 text-[15px] font-medium leading-[1.4] text-navy">{figure?.label}</p>
          </Reveal>
        ))}
      </div>
    </div>
    </section>
  );
};

export default HomeIntro;
