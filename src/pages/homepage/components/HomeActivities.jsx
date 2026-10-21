import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../../../components/ui/Reveal';
import ProcessIcon from '../../../components/ui/ProcessIcon';
import { useI18n } from '../../../i18n/LanguageProvider';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { container } from '../../../components/ui/mcctTheme';
import { Eyebrow, SectionTitle, card, roundBtn } from '../../../components/ui/Corporate';
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
  <section id="activites" className="bg-white py-24">
    <div className={container}>
      <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-8">
        <div className="max-w-[640px]">
          <Eyebrow>{t('home.activitiesEyebrow')}</Eyebrow>
          <SectionTitle title={title} accentLast />
          <p className="mt-5 text-[17px] leading-[1.7] text-copy">{t('home.activitiesText')}</p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={progress?.atStart}
            aria-label={t('home.activitiesPrev')}
            className={roundBtn()}
          >
            <ArrowLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={progress?.atEnd}
            aria-label={t('home.activitiesNext')}
            className={roundBtn()}
          >
            <ArrowRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </Reveal>

      <ul
        ref={railRef}
        className="mcct-rail -mx-5 scroll-px-5 min-[900px]:scroll-px-0 flex list-none snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-6 pt-1 min-[900px]:mx-0 min-[900px]:px-1"
      >
        {activities?.map((activity) => (
          <li
            key={activity?.num}
            data-card
            className="w-[82%] shrink-0 snap-start min-[700px]:w-[calc((100%-24px)/2)] min-[1100px]:w-[calc((100%-48px)/3)]"
          >
            <Link to="/services" className={`${card} group flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1`}>
              <span className="relative block h-[230px] overflow-hidden">
                <img
                  src={activity?.thumbSrc}
                  alt={activity?.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:600ms] group-hover:scale-[1.05]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[13px] font-semibold text-navy shadow-sm">
                  {activity?.num}
                </span>
              </span>
              <span className="flex flex-1 flex-col justify-between gap-5 p-7">
                <span>
                  <span className="block font-display text-[21px] font-bold leading-[1.25] text-navy">{activity?.title}</span>
                  <span className="mt-2.5 block text-[15px] leading-[1.6] text-copy">{activity?.short}</span>
                </span>
                <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-brand">
                  {t('footer.learnMore')}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Progression du rail. */}
      <div className="mt-2 flex items-center gap-5">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
          <div
            className="h-full origin-left rounded-full bg-brand transition-transform duration-300"
            style={{ transform: `scaleX(${Math.max(0.08, progress?.ratio)})` }}
          />
        </div>
        <p className="shrink-0 text-[14px] font-medium text-subtle">
          {activities?.length} {t('home.activitiesCountLabel')?.toLowerCase()}
        </p>
      </div>
    </div>
    </section>
  );
};

export const SavoirFaireSection = () => {
  const { lang, t } = useI18n();
  const processSteps = getProcessSteps(lang);
  const title = t('home.processTitle');

  return (
  <section id="savoirfaire" className="bg-mist py-24">
    <div className={container}>
      <Reveal className="mb-12 max-w-[720px]">
        <Eyebrow>{t('home.processEyebrow')}</Eyebrow>
        <SectionTitle title={title} accentLast />
      </Reveal>

      <ol className="grid list-none gap-5 min-[700px]:grid-cols-2 min-[1000px]:grid-cols-3">
        {processSteps?.map((step, index) => (
          <Reveal as="li" key={step?.num} delay={index * 70} className={`${card} group p-7 transition-transform duration-300 hover:-translate-y-1`}>
            <div className="mb-6 flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                <ProcessIcon name={step?.icon} className="h-6 w-6" />
              </span>
              <span aria-hidden="true" className="font-display text-[28px] font-extrabold text-brand/20">{step?.num}</span>
            </div>
            <p className="font-display text-[19px] font-bold text-navy">{step?.title}</p>
            <p className="mt-2 text-[15px] leading-[1.6] text-copy">{step?.desc}</p>
          </Reveal>
        ))}
      </ol>
    </div>
    </section>
  );
};
