import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../../../components/ui/Reveal';
import ProcessIcon from '../../../components/ui/ProcessIcon';
import { useI18n } from '../../../i18n/LanguageProvider';
import { ACCENT, headingFont, container } from '../../../components/ui/mcctTheme';
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
  <section id="activites" className="bg-[#F5F5F2] py-[120px]">
    <div className={container}>
      <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-[18px] text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
            {t('home.activitiesEyebrow')}
          </p>
          <h2
            className="text-[clamp(2.4rem,4.6vw,4.4rem)] font-extrabold leading-none tracking-[-0.03em]"
            style={headingFont}
          >
            {title?.[0]}
            <br />
            {title?.[1]}
            <br />
            {title?.[2]}
            <span style={{ color: ACCENT }}>.</span>
          </h2>
        </div>
        <p className="max-w-[380px] text-[16px] leading-[1.65] text-[#3a3f45]">
          {t('home.activitiesText')}
        </p>
      </Reveal>

      {/* Barre de progression + flèches : l'état du rail est reflété des deux côtés. */}
      <Reveal className="mb-7 flex items-center gap-6">
        <div className="h-[3px] flex-1 bg-[#dcdcd8]">
          <div
            className="h-full origin-left bg-[#2478BE] transition-transform duration-300"
            style={{ transform: `scaleX(${Math.max(0.08, progress?.ratio)})` }}
          />
        </div>
        <div className="flex shrink-0 gap-2.5">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={progress?.atStart}
            aria-label={t('home.activitiesPrev')}
            className="flex h-11 w-11 cursor-pointer items-center justify-center border border-[#c6c6c1] bg-transparent text-[18px] text-[#17191C] transition-colors hover:border-[#2478BE] hover:bg-[#2478BE] hover:text-white disabled:cursor-default disabled:opacity-35 disabled:hover:border-[#c6c6c1] disabled:hover:bg-transparent disabled:hover:text-[#17191C]"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={progress?.atEnd}
            aria-label={t('home.activitiesNext')}
            className="flex h-11 w-11 cursor-pointer items-center justify-center border border-[#c6c6c1] bg-transparent text-[18px] text-[#17191C] transition-colors hover:border-[#2478BE] hover:bg-[#2478BE] hover:text-white disabled:cursor-default disabled:opacity-35 disabled:hover:border-[#c6c6c1] disabled:hover:bg-transparent disabled:hover:text-[#17191C]"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </Reveal>

      <ul
        ref={railRef}
        className="mcct-rail flex list-none snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth"
      >
        {activities?.map((activity) => (
          <li
            key={activity?.num}
            data-card
            className="w-[82%] shrink-0 snap-start min-[700px]:w-[calc((100%-24px)/2)] min-[1100px]:w-[calc((100%-48px)/3)]"
          >
            <Link
              to="/services"
              className="group relative block min-h-[420px] overflow-hidden bg-[#0D0F10] text-white"
            >
              <img
                src={activity?.thumbSrc}
                alt={activity?.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-55 transition-all [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:opacity-40"
              />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,15,16,0)_30%,rgba(13,15,16,0.85)_100%)]" />
              <span className="relative flex min-h-[420px] flex-col justify-end p-7">
                <span>
                  <span className="mb-4 block h-[3px] w-10 bg-[#2478BE]" />
                  <span className="block text-[24px] font-extrabold leading-[1.1] tracking-[-0.01em]">
                    {activity?.title}
                  </span>
                  <span className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-[14px] leading-[1.55] text-[#c4cad0]">{activity?.short}</span>
                    <span
                      aria-hidden="true"
                      className="text-[20px] transition-transform duration-300 group-hover:translate-x-2"
                      style={{ color: ACCENT }}
                    >
                      →
                    </span>
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
  <section id="savoirfaire" className="bg-[#E7E7E4] py-[120px]">
    <div className={container}>
      <Reveal className="mb-16">
        <p className="mb-[18px] text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
          {t('home.processEyebrow')}
        </p>
        <h2
          className="text-[clamp(2.4rem,4.6vw,4.4rem)] font-extrabold leading-none tracking-[-0.03em]"
          style={headingFont}
        >
          {title?.[0]}
          <br />
          {title?.[1]}
          <span style={{ color: ACCENT }}>.</span>
        </h2>
      </Reveal>

      <div className="grid gap-[2px] bg-[#cfcfcb] [grid-template-columns:repeat(auto-fit,minmax(min(100%,170px),1fr))]">
        {processSteps?.map((step, index) => (
          <Reveal
            key={step?.num}
            delay={index * 70}
            className="group relative bg-[#F5F5F2] px-[22px] pb-9 pt-7 transition-colors duration-300 hover:bg-white"
          >
            {/* Filet d'accent qui se déploie au survol. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[#2478BE] transition-transform [transition-duration:450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
            />
            <div className="mb-8 flex items-start justify-between gap-3">
              <ProcessIcon
                name={step?.icon}
                className="h-9 w-9 text-[#17191C] transition-all [transition-duration:450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:text-[#2478BE] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
              />
            </div>
            <p className="text-[16px] font-extrabold tracking-[0.06em]">{step?.title}</p>
            <p className="mt-2.5 text-[13.5px] leading-[1.55] text-[#565e66]">{step?.desc}</p>
          </Reveal>
        ))}
      </div>
    </div>
    </section>
  );
};
