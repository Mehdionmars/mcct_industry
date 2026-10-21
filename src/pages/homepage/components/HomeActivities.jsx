import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../../../components/ui/Reveal';
import ProcessIcon from '../../../components/ui/ProcessIcon';
import { useI18n } from '../../../i18n/LanguageProvider';
import { headingFont, container } from '../../../components/ui/mcctTheme';
import { DimLine, Eyebrow, Mark, Ruler, squareBtn } from '../../../components/ui/Blueprint';
import { getActivities, getProcessSteps } from '../../../data/mcct';

export const ActivitiesSection = () => {
  const { lang, t } = useI18n();
  const activities = getActivities(lang);
  const title = t('home.activitiesTitle');
  const railRef = useRef(null);
  const [progress, setProgress] = useState({ ratio: 0, atStart: true, atEnd: false });

  // Défilement natif + accroche : le tactile fonctionne sans code, les flèches
  // se contentent de faire glisser d'une carte. La progression est relue depuis
  // le rail, ce qui reste juste quel que soit le nombre de cartes visibles.
  const readProgress = useCallback(() => {
    const rail = railRef?.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    const left = rail.scrollLeft;
    setProgress({
      ratio: max > 0 ? left / max : 0,
      atStart: left <= 2,
      atEnd: max - left <= 2
    });
  }, []);

  useEffect(() => {
    readProgress();
    const rail = railRef?.current;
    if (!rail) return undefined;
    rail.addEventListener('scroll', readProgress, { passive: true });
    window.addEventListener('resize', readProgress, { passive: true });
    return () => {
      rail.removeEventListener('scroll', readProgress);
      window.removeEventListener('resize', readProgress);
    };
  }, [readProgress]);

  const scrollByCard = (direction) => {
    const rail = railRef?.current;
    if (!rail) return;
    const card = rail.querySelector('[data-card]');
    const step = card ? card.getBoundingClientRect().width + 24 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: step * direction, behavior: 'smooth' });
  };

  return (
  <section id="activites" className="bp-grid bg-paper py-[110px] text-ink">
    <div className={container}>
      <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>{t('home.activitiesEyebrow')}</Eyebrow>
          <h2
            className="text-[clamp(2.6rem,5vw,4.8rem)] font-bold uppercase leading-[1.02] tracking-[-0.01em]"
            style={headingFont}
          >
            {title?.[0]}
            <br />
            {title?.[1]}
            <br />
            {title?.[2]}
            <Mark />
          </h2>
        </div>
        <p className="max-w-[380px] border-l border-ink/20 pl-6 text-[16px] leading-[1.65] text-ink2">
          {t('home.activitiesText')}
        </p>
      </Reveal>

      {/* Barre de progression + flèches : l'état du rail est reflété des deux côtés. */}
      <Reveal className="mb-8 flex items-center gap-6">
        <div className="relative h-[14px] flex-1">
          <Ruler className="absolute inset-0" />
          <div
            className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-brand transition-transform duration-300"
            style={{ transform: `scaleX(${Math.max(0.08, progress?.ratio)})` }}
          />
        </div>
        <p className="shrink-0 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-steel">
          {String(activities?.length)?.padStart(2, '0')} {t('home.activitiesCountLabel')}
        </p>
        <div className="flex shrink-0 gap-2.5">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={progress?.atStart}
            aria-label={t('home.activitiesPrev')}
            className={squareBtn()}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={progress?.atEnd}
            aria-label={t('home.activitiesNext')}
            className={squareBtn()}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </Reveal>

      <ul
        ref={railRef}
        className="mcct-rail flex list-none snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {activities?.map((activity) => (
          <li
            key={activity?.num}
            data-card
            className="w-[82%] shrink-0 snap-start min-[700px]:w-[calc((100%-24px)/2)] min-[1100px]:w-[calc((100%-48px)/3)]"
          >
            <Link
              to="/services"
              className="group flex h-full flex-col border border-ink bg-paper transition-colors duration-300 hover:bg-white"
            >
              <span className="relative block h-[250px] overflow-hidden border-b border-ink">
                <img
                  src={activity?.thumbSrc}
                  alt={activity?.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
                <span className="absolute left-0 top-0 border-b border-r border-ink bg-safety px-3 py-1.5 font-mono text-[11.5px] font-semibold tracking-[0.12em] text-ink">
                  A-{activity?.num}
                </span>
              </span>
              <span className="flex flex-1 flex-col justify-between gap-6 p-7">
                <span>
                  <span className="block text-[26px] font-bold uppercase leading-[1.14]" style={headingFont}>
                    {activity?.title}
                  </span>
                  <span className="mt-3 block text-[14.5px] leading-[1.6] text-ink2">{activity?.short}</span>
                </span>
                <span className="flex items-center justify-between border-t border-ink/15 pt-4 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-brand">
                  {t('nav.services')}
                  <span aria-hidden="true" className="text-[18px] transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </section>
  );
};

export const SavoirFaireSection = () => {
  const { lang, t } = useI18n();
  const processSteps = getProcessSteps(lang);
  const title = t('home.processTitle');

  return (
  <section id="savoirfaire" className="bg-paper2 py-[110px] text-ink">
    <div className={container}>
      <Reveal className="mb-14">
        <Eyebrow>{t('home.processEyebrow')}</Eyebrow>
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

      <DimLine label={`P-01 → P-${String(processSteps?.length)?.padStart(2, '0')}`} className="mb-6" />

      <div className="grid border-l border-t border-ink [grid-template-columns:repeat(auto-fit,minmax(min(100%,170px),1fr))]">
        {processSteps?.map((step, index) => (
          <Reveal
            key={step?.num}
            delay={index * 70}
            className="group relative border-b border-r border-ink bg-paper2 px-[22px] pb-9 pt-6 transition-colors duration-300 hover:bg-paper"
          >
            {/* Filet jaune qui se déploie au survol. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[4px] origin-left scale-x-0 bg-safety transition-transform [transition-duration:450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
            />
            <p className="mb-8 font-mono text-[11.5px] tracking-[0.14em] text-steel">P-{step?.num}</p>
            <ProcessIcon
              name={step?.icon}
              className="mb-6 h-10 w-10 text-ink transition-all [transition-duration:450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:text-brand motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
            />
            <p className="text-[19px] font-bold uppercase tracking-[0.01em]" style={headingFont}>
              {step?.title}
            </p>
            <p className="mt-2 text-[14px] leading-[1.55] text-ink2">{step?.desc}</p>
          </Reveal>
        ))}
      </div>
    </div>
    </section>
  );
};
