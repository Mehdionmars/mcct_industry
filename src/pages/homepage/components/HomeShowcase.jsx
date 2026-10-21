import React, { useEffect, useRef, useState } from 'react';
import Reveal from '../../../components/ui/Reveal';
import { useI18n } from '../../../i18n/LanguageProvider';
import { Building2, Factory, Store } from 'lucide-react';
import { ACCENT, container } from '../../../components/ui/mcctTheme';
import { Eyebrow, SectionTitle, btnOnDark, card } from '../../../components/ui/Corporate';
import { getSectors } from '../../../data/mcct';
import { img } from '../../../data/gallery';

const sectorIcons = [Factory, Store, Building2];

export const FeaturedProject = () => {
  const { t } = useI18n();
  const title = t('home.featuredTitle');

  return (
  <section className="bg-white pb-24">
    <div className={container}>
      <Reveal className="relative flex min-h-[clamp(440px,72vh,640px)] items-end overflow-hidden rounded-3xl bg-navy">
        <img
          src={img('IMG_7951')}
          alt={t('home.featuredAlt')}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,42,71,0)_30%,rgba(15,42,71,0.88)_100%)]" />
        <div className="relative w-full p-8 min-[900px]:p-12">
          <Eyebrow tone="dark">{t('home.featuredEyebrow')}</Eyebrow>
          <SectionTitle title={title} tone="dark" className="max-w-[620px]" />
          <p className="mt-3 text-[16px] text-onnavy">{t('home.featuredMeta')}</p>
        </div>
      </Reveal>
    </div>
  </section>
  );
};

export const EngagementSection = () => {
  const { t } = useI18n();
  const title = t('home.commitmentTitle');

  return (
  <section className="bg-white py-24">
    <div className={container}>
      <Reveal className="grid overflow-hidden rounded-3xl bg-navy min-[1000px]:grid-cols-2">
        <div className="relative p-8 min-[900px]:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(125,184,236,0.22),transparent_70%)]"
          />
          <div className="relative">
            <Eyebrow tone="dark">{t('home.commitmentEyebrow')}</Eyebrow>
            <SectionTitle title={title} tone="dark" />
            <p className="mt-5 max-w-[480px] text-[17px] leading-[1.7] text-onnavy">{t('home.commitmentText')}</p>
            <a href="#contact" className={`${btnOnDark} mt-9`}>
              {t('cta.defaultLabel')} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="relative min-h-[300px]">
          <img
            src={img('IMG_7887')}
            alt={t('home.commitmentAlt')}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </Reveal>
    </div>
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
  <section id="secteurs" className="bg-mist py-24">
    <div className={container}>
      <Reveal className="mb-12 max-w-[720px]">
        <Eyebrow>{t('home.sectorsEyebrow')}</Eyebrow>
        <SectionTitle title={title} accentLast />
      </Reveal>

      {/* `mcct-rail` masque la barre de défilement native : sur mobile elle
          barrait le bas des cartes. Les repères ci-dessous la remplacent. */}
      <div
        ref={railRef}
        className="mcct-rail -mx-5 scroll-px-5 min-[900px]:scroll-px-0 grid snap-x snap-mandatory grid-flow-col auto-cols-[82%] gap-5 overflow-x-auto px-5 pb-4 min-[900px]:mx-0 min-[900px]:auto-cols-auto min-[900px]:grid-flow-row min-[900px]:gap-6 min-[900px]:overflow-visible min-[900px]:px-0 min-[900px]:[grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]"
      >
        {sectors?.map((sector, index) => {
          const Icon = sectorIcons[index % sectorIcons.length];
          return (
            <Reveal
              key={sector?.title}
              delay={index * 90}
              data-card
              className={`${card} group snap-start overflow-hidden transition-transform duration-300 hover:-translate-y-1`}
            >
              <div className="relative h-[220px] overflow-hidden">
                <img
                  src={sector?.thumbSrc}
                  alt={sector?.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:700ms] group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-7">
                <span className="relative z-10 -mt-14 mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand shadow-md">
                  <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <span className="block font-display text-[21px] font-bold text-navy">{sector?.title}</span>
                <span className="mt-2 block text-[15.5px] leading-[1.65] text-copy">{sector?.desc}</span>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Repères de position, mobile uniquement (la grille reprend dès 900px). */}
      <div className="mt-4 flex justify-center gap-2 min-[900px]:hidden">
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
              className="block h-2 rounded-full transition-all [transition-duration:400ms]"
              style={{
                width: index === active ? 26 : 8,
                backgroundColor: index === active ? ACCENT : 'rgba(15,42,71,0.2)'
              }}
            />
          </button>
        ))}
      </div>
    </div>
    </section>
  );
};
