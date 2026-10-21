import React, { useEffect, useRef, useState } from 'react';
import Reveal from '../../../components/ui/Reveal';
import { useI18n } from '../../../i18n/LanguageProvider';
import { SAFETY, headingFont, container } from '../../../components/ui/mcctTheme';
import { Eyebrow, Mark, btnGhostDark } from '../../../components/ui/Blueprint';
import { getSectors } from '../../../data/mcct';
import { img } from '../../../data/gallery';

export const FeaturedProject = () => {
  const { t } = useI18n();
  const title = t('home.featuredTitle');

  return (
  <section className="relative flex min-h-[80vh] items-end overflow-hidden bg-night text-snow">
    <img
      src={img('IMG_7951')}
      alt={t('home.featuredAlt')}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,27,44,0.1)_0%,rgba(11,27,44,0.55)_55%,rgba(11,27,44,0.92)_100%)]" />
    <div aria-hidden="true" className="bp-grid-dark absolute inset-0" />
    <Reveal className={`${container} relative pb-16 pt-[140px]`}>
      {/* Fiche projet posée sur la photo, comme une étiquette de plan. */}
      <div className="relative max-w-[720px] border border-nightrule bg-night/85 p-7 backdrop-blur-sm min-[900px]:p-10">
        <span aria-hidden="true" className="bp-corners text-safety" />
        <Eyebrow tone="dark">{t('home.featuredEyebrow')}</Eyebrow>
        <h2
          className="text-[clamp(2.4rem,5vw,4.6rem)] font-bold uppercase leading-[1.02] tracking-[-0.01em]"
          style={headingFont}
        >
          {title?.[0]}
          <br />
          {title?.[1]}
          <Mark />
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-nightrule pt-6">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-fog">{t('home.featuredMeta')}</p>
          <a href="#projets" className={btnGhostDark}>
            {t('home.featuredLink')} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </Reveal>
    </section>
  );
};

export const EngagementSection = () => {
  const { t } = useI18n();
  const title = t('home.commitmentTitle');
  const circle = t('home.commitmentCircle');

  return (
  <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-night text-snow">
    <img
      src={img('IMG_7887')}
      alt={t('home.commitmentAlt')}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover opacity-45"
    />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,27,44,0.95)_0%,rgba(11,27,44,0.6)_65%,rgba(11,27,44,0.35)_100%)]" />
    <div aria-hidden="true" className="bp-grid-dark absolute inset-0" />
    <Reveal className={`${container} relative flex flex-wrap items-center justify-between gap-12 py-[100px]`}>
      <div className="min-w-0 max-w-[660px]">
        <Eyebrow tone="dark">{t('home.commitmentEyebrow')}</Eyebrow>
        <h2
          className="text-[clamp(2.4rem,5.4vw,4.8rem)] font-bold uppercase leading-[1.02] tracking-[-0.01em]"
          style={headingFont}
        >
          {title?.[0]}
          <br />
          {title?.[1]}
          <Mark />
        </h2>
        <p className="mt-[26px] max-w-[480px] text-[17px] leading-[1.7] text-snow/85">{t('home.commitmentText')}</p>
      </div>
      {/* Mire de visée : cible carrée avec réticule, remplit en jaune au survol. */}
      <a
        href="#projets"
        aria-label={t('home.commitmentAria')}
        className="group relative flex h-[176px] w-[176px] shrink-0 flex-col items-center justify-center gap-2 border border-snow/60 text-center font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-snow transition-colors duration-300 hover:border-safety hover:bg-safety hover:text-ink"
      >
        <span aria-hidden="true" className="absolute left-1/2 top-0 h-5 w-px bg-current" />
        <span aria-hidden="true" className="absolute bottom-0 left-1/2 h-5 w-px bg-current" />
        <span aria-hidden="true" className="absolute left-0 top-1/2 h-px w-5 bg-current" />
        <span aria-hidden="true" className="absolute right-0 top-1/2 h-px w-5 bg-current" />
        <span aria-hidden="true" className="text-[22px] transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
        <span>
          {circle?.[0]}
          <br />
          {circle?.[1]}
        </span>
      </a>
    </Reveal>
    </section>
  );
};

export const SectorsSection = () => {
  const { lang, t } = useI18n();
  const sectors = getSectors(lang);
  const title = t('home.sectorsTitle');
  const railRef = useRef(null);
  const [active, setActive] = useState(0);

  // Repère actif déduit de la position du rail (mobile uniquement).
  //
  // La position est rapportée à la course totale, et non à la largeur d'une
  // carte : les cartes ne font que 78% de l'écran, la dernière ne peut donc
  // jamais s'aligner à gauche. Rapporter à la course fait correspondre
  // exactement la fin du rail au dernier repère — dans les deux sens.
  const lastIndex = Math.max(1, (sectors?.length || 1) - 1);

  useEffect(() => {
    const rail = railRef?.current;
    if (!rail) return undefined;
    const read = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      setActive(max > 0 ? Math.round((rail.scrollLeft / max) * lastIndex) : 0);
    };
    read();
    rail.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read, { passive: true });
    return () => {
      rail.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, [lastIndex]);

  const scrollToCard = (index) => {
    const rail = railRef?.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    rail.scrollTo({ left: (max * index) / lastIndex, behavior: 'smooth' });
  };

  return (
  <section id="secteurs" className="bp-grid-dark bg-night py-[110px] text-snow">
    <div className={container}>
      <Reveal className="mb-14">
        <Eyebrow tone="dark">{t('home.sectorsEyebrow')}</Eyebrow>
        <h2
          className="text-[clamp(2.4rem,5vw,4.4rem)] font-bold uppercase leading-[1.02] tracking-[-0.01em]"
          style={headingFont}
        >
          {title?.[0]}
          <br />
          {title?.[1]}
          <Mark />
        </h2>
      </Reveal>

      {/* `mcct-rail` masque la barre de défilement native : sur mobile elle
          barrait le bas des cartes. Les repères ci-dessous la remplacent. */}
      <div
        ref={railRef}
        className="mcct-rail grid snap-x snap-mandatory grid-flow-col auto-cols-[82%] gap-5 overflow-x-auto px-2 py-2 min-[900px]:auto-cols-auto min-[900px]:grid-flow-row min-[900px]:gap-8 min-[900px]:overflow-visible min-[900px]:px-0 min-[900px]:[grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]"
      >
        {sectors?.map((sector, index) => (
          <Reveal
            key={sector?.title}
            delay={index * 90}
            data-card
            className="group snap-start border border-nightrule bg-night2 transition-colors duration-300 hover:border-brandlt"
          >
            <div className="relative h-[240px] overflow-hidden border-b border-nightrule">
              <img
                src={sector?.thumbSrc}
                alt={sector?.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:700ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />
              <span className="absolute left-0 top-0 bg-night px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-brandlt">
                S-{String(index + 1)?.padStart(2, '0')}
              </span>
            </div>
            <div className="p-7">
              <span className="block text-[26px] font-bold uppercase leading-[1.14]" style={headingFont}>
                {sector?.title}
              </span>
              <span className="mt-3 block text-[15px] leading-[1.6] text-fog">{sector?.desc}</span>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Repères de position, mobile uniquement (la grille reprend dès 900px). */}
      <div className="mt-6 flex justify-center gap-2 min-[900px]:hidden">
        {sectors?.map((sector, index) => (
          <button
            key={sector?.title}
            type="button"
            onClick={() => scrollToCard(index)}
            aria-label={sector?.title}
            aria-current={index === active}
            className="flex h-6 cursor-pointer items-center border-none bg-transparent p-0"
          >
            <span
              className="block h-[6px] transition-all [transition-duration:400ms]"
              style={{
                width: index === active ? 28 : 10,
                backgroundColor: index === active ? SAFETY : 'rgba(233,239,245,0.3)'
              }}
            />
          </button>
        ))}
      </div>
    </div>
    </section>
  );
};
