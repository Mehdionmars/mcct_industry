import React, { useEffect, useRef, useState } from 'react';
import Reveal from '../../../components/ui/Reveal';
import { useI18n } from '../../../i18n/LanguageProvider';
import { headingFont, container } from '../../../components/ui/mcctTheme';
import { Eyebrow, Figure, Mark } from '../../../components/ui/Blueprint';
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
  <section id="apropos" className="bg-paper pb-[110px] pt-[110px] text-ink">
    <div className={container}>
      <div className="grid items-start gap-14 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
        <Reveal>
          <Eyebrow>{t('home.introEyebrow')}</Eyebrow>
          <h2
            className="text-[clamp(2.6rem,5vw,4.8rem)] font-bold uppercase leading-[1.02] tracking-[-0.01em]"
            style={headingFont}
          >
            {title?.[0]}
            <br />
            {title?.[1]}
            <Mark />
          </h2>
        </Reveal>
        <Reveal className="max-w-[540px] border-l border-ink/20 pl-7 min-[900px]:mt-12">
          <p className="mb-5 text-[17px] leading-[1.7] text-ink2">{t('home.introP1')}</p>
          <p className="mb-8 text-[17px] leading-[1.7] text-ink2">{t('home.introP2')}</p>
          <a
            href="#savoirfaire"
            className="inline-flex items-center gap-2.5 border-b-2 border-safety pb-1.5 font-mono text-[13px] font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:text-brand"
          >
            {t('home.introLink')} <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>

      <Reveal className="mt-[72px]">
        <Figure
          src={img('IMG_7864')}
          alt={t('home.introImageAlt')}
          fig="02"
          caption={t('home.introImageAlt')}
          frameClassName="h-[clamp(300px,52vh,600px)]"
          imgClassName="h-full w-full object-cover transition-transform [transition-duration:800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
        />
      </Reveal>

      {/* Chiffres clés présentés comme un tableau de caractéristiques. */}
      <div className="mt-16 grid grid-cols-2 border-l border-t border-ink min-[900px]:grid-cols-4">
        {keyFigures?.map((figure, index) => (
          <Reveal key={figure?.label} className="min-w-0 border-b border-r border-ink bg-paper p-5 min-[600px]:p-7">
            <p className="font-mono text-[11px] tracking-[0.16em] text-steel">
              {t('bp.ref')} K-{String(index + 1)?.padStart(2, '0')}
            </p>
            <p
              className="mt-6 text-[clamp(2.6rem,5.4vw,5rem)] font-bold leading-none tracking-[-0.02em] text-ink"
              style={headingFont}
            >
              <Counter value={figure?.value} />
              <span className="text-brand">+</span>
            </p>
            <p className="mt-3 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-ink2">{figure?.label}</p>
          </Reveal>
        ))}
      </div>
    </div>
    </section>
  );
};

export default HomeIntro;
