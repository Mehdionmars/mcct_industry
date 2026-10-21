import React, { useEffect, useRef, useState } from 'react';
import Reveal from '../../../components/ui/Reveal';
import { useI18n } from '../../../i18n/LanguageProvider';
import { ACCENT, headingFont, container } from '../../../components/ui/mcctTheme';
import { getSectors } from '../../../data/mcct';
import { img } from '../../../data/gallery';

export const FeaturedProject = () => {
  const { t } = useI18n();
  const title = t('home.featuredTitle');

  return (
  <section className="relative flex min-h-[78vh] items-end overflow-hidden bg-[#0D0F10]">
    <img
      src={img('IMG_7951')}
      alt={t('home.featuredAlt')}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,15,16,0.2)_0%,rgba(13,15,16,0.85)_100%)]" />
    <Reveal className={`${container} relative pb-[72px] pt-[120px] text-white`}>
      <p className="mb-4 text-[13px] font-extrabold tracking-[0.24em] text-[#cfd6dc]">{t('home.featuredEyebrow')}</p>
      <h2
        className="text-[clamp(2.2rem,4.5vw,4.2rem)] font-extrabold leading-none tracking-[-0.03em]"
        style={headingFont}
      >
        {title?.[0]}
        <br />
        {title?.[1]}
        <span style={{ color: ACCENT }}>.</span>
      </h2>
      <p className="mt-6 text-[15px] tracking-[0.08em] text-[#c4cad0]">{t('home.featuredMeta')}</p>
    </Reveal>
    </section>
  );
};

export const EngagementSection = () => {
  const { t } = useI18n();
  const title = t('home.commitmentTitle');

  return (
  <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-[#0D0F10]">
    <img
      src={img('IMG_7887')}
      alt={t('home.commitmentAlt')}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover opacity-50"
    />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,15,16,0.92)_0%,rgba(13,15,16,0.45)_70%)]" />
    <Reveal className={`${container} relative flex flex-wrap items-center justify-between gap-12 py-[90px] text-white`}>
      <div className="min-w-0 max-w-[640px]">
        <p className="mb-[18px] text-[13px] font-extrabold tracking-[0.26em]" style={{ color: ACCENT }}>
          {t('home.commitmentEyebrow')}
        </p>
        <h2
          className="text-[clamp(2.2rem,5vw,4.4rem)] font-bold leading-none tracking-[-0.02em]"
          style={headingFont}
        >
          {title?.[0]}
          <br />
          {title?.[1]}
          <span style={{ color: ACCENT }}>.</span>
        </h2>
        <p className="mt-[26px] max-w-[480px] text-[17px] leading-[1.7] text-[#c4cad0]">
          {t('home.commitmentText')}
        </p>
      </div>
      <a
        href="#contact"
        className="flex h-[168px] w-[168px] shrink-0 flex-col items-center justify-center gap-2 rounded-full border border-[rgba(255,255,255,0.45)] text-center text-[11.5px] font-extrabold tracking-[0.2em] text-white transition-all [transition-duration:400ms] hover:scale-[1.06] hover:border-[#2478BE] hover:bg-[#2478BE]"
      >
        <span aria-hidden="true" className="text-[22px]">
          →
        </span>
        <span>{t('cta.defaultLabel')}</span>
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
  <section id="secteurs" className="bg-[#17191C] py-[120px] text-white">
    <div className={container}>
      <Reveal className="mb-14">
        <p className="mb-[18px] text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
          {t('home.sectorsEyebrow')}
        </p>
        <h2
          className="text-[clamp(2.2rem,4.6vw,4rem)] font-bold leading-none tracking-[-0.02em]"
          style={headingFont}
        >
          {title?.[0]}
          <br />
          {title?.[1]}
          <span style={{ color: ACCENT }}>.</span>
        </h2>
      </Reveal>

      {/* `mcct-rail` masque la barre de défilement native : sur mobile elle
          barrait le bas des cartes. Les repères ci-dessous la remplacent. */}
      <div
        ref={railRef}
        className="mcct-rail grid snap-x snap-mandatory grid-flow-col auto-cols-[78%] gap-4 overflow-x-auto min-[900px]:auto-cols-auto min-[900px]:grid-flow-row min-[900px]:gap-6 min-[900px]:overflow-visible min-[900px]:[grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]"
      >
        {sectors?.map((sector, index) => (
          <Reveal
            key={sector?.title}
            delay={index * 90}
            data-card
            className="group relative min-h-[420px] snap-start overflow-hidden"
          >
            <img
              src={sector?.thumbSrc}
              alt={sector?.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-60 transition-all [transition-duration:700ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07] group-hover:opacity-45"
            />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,25,28,0)_35%,rgba(23,25,28,0.9)_100%)]" />
            <span className="relative flex min-h-[420px] flex-col justify-end p-7">
              <span className="mb-4 block h-[3px] w-10 origin-left bg-[#2478BE] transition-transform [transition-duration:500ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-[2.6] motion-reduce:transition-none" />
              <span className="block text-[23px] font-extrabold tracking-[-0.01em]">{sector?.title}</span>
              <span className="mt-2.5 block text-[14.5px] leading-[1.55] text-[#c4cad0] transition-transform [transition-duration:500ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 motion-reduce:transition-none">
                {sector?.desc}
              </span>
            </span>
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
            className="h-1.5 cursor-pointer rounded-full border-none p-0 transition-all [transition-duration:400ms]"
            style={{
              width: index === active ? 28 : 10,
              backgroundColor: index === active ? ACCENT : 'rgba(255,255,255,0.28)'
            }}
          />
        ))}
      </div>
    </div>
    </section>
  );
};
