import React from 'react';
import Reveal from '../../../components/ui/Reveal';
import useCarousel from '../../../hooks/useCarousel';
import useParallax from '../../../hooks/useParallax';
import { useI18n } from '../../../i18n/LanguageProvider';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { ACCENT_DARK, container } from '../../../components/ui/mcctTheme';
import { Eyebrow, SectionTitle, roundBtn } from '../../../components/ui/Corporate';
import { getValues } from '../../../data/mcct';

/**
 * « Ce qui nous anime » — carrousel vertical sur fond parallaxe.
 *
 * La photo de fond se décale au défilement pendant que les valeurs défilent
 * verticalement (lecture automatique, flèches, rail de progression cliquable).
 * L'image de droite est croisée avec la valeur active.
 */
const HomeValues = () => {
  const { lang, t } = useI18n();
  const values = getValues(lang);
  const { index, goTo, next, prev, containerProps } = useCarousel(values?.length, {
    auto: true,
    interval: 5600,
    orientation: 'vertical'
  });
  const { ref: parallaxRef, offset } = useParallax(70);
  const active = values?.[index];

  return (
    <section ref={parallaxRef} className="relative overflow-hidden bg-navy py-24 text-white">
      {/* Couche parallaxe : surdimensionnée pour ne jamais laisser de bord nu. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={values?.[0]?.src}
          alt=""
          loading="lazy"
          className="absolute left-0 top-[-12%] h-[124%] w-full object-cover opacity-[0.16] will-change-transform"
          style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        />
        <span className="absolute inset-0 bg-[linear-gradient(180deg,#0F2A47_0%,rgba(15,42,71,0.78)_45%,#0F2A47_100%)]" />
      </div>

      <div className={`${container} relative`}>
        <Reveal className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow tone="dark">{t('home.valuesEyebrow')}</Eyebrow>
            <SectionTitle title={t('home.valuesTitle')} tone="dark" accentLast className="max-w-[640px]" />
          </div>
          <p className="max-w-[380px] text-[16px] leading-[1.65] text-onnavy">{t('home.valuesText')}</p>
        </Reveal>

        <div
          {...containerProps}
          tabIndex={0}
          role="group"
          aria-roledescription="carrousel"
          aria-label={t('home.valuesEyebrow')}
          className="grid gap-12 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-skytext/70 min-[900px]:[grid-template-columns:1fr_minmax(280px,440px)]"
        >
          {/* ------------------------------------------------ carrousel vertical */}
          <div className="flex gap-7">
            {/* Rail de progression : indique et pilote la valeur active. */}
            <div className="flex shrink-0 flex-col items-center gap-2 pt-2" aria-hidden="true">
              {values?.map((value, i) => (
                <button
                  key={value?.num}
                  type="button"
                  tabIndex={-1}
                  onClick={() => goTo(i)}
                  className="group relative flex h-16 w-3 cursor-pointer items-center justify-center border-none bg-transparent p-0"
                >
                  <span
                    className="block w-[4px] rounded-full transition-all duration-500"
                    style={{
                      height: i === index ? '100%' : '38%',
                      backgroundColor: i === index ? ACCENT_DARK : 'rgba(255,255,255,0.2)'
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Fenêtre : une seule valeur visible, les autres translatées hors champ. */}
            <div className="relative h-[290px] flex-1 overflow-hidden min-[900px]:h-[270px]">
              {/*
                Un pourcentage de `translate` se rapporte à la hauteur de la piste
                entière (n slides) : un cran vaut donc 100/n, et non 100.
              */}
              <div
                className="absolute inset-x-0 top-0 transition-transform [transition-duration:700ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translate3d(0, ${(index * -100) / (values?.length || 1)}%, 0)` }}
              >
                {values?.map((value, i) => (
                  <div
                    key={value?.num}
                    aria-hidden={i !== index}
                    className="flex h-[290px] flex-col justify-center transition-opacity duration-500 min-[900px]:h-[270px]"
                    style={{ opacity: i === index ? 1 : 0 }}
                  >
                    <p className="mb-3 text-[14px] font-semibold text-skytext">{value?.num}</p>
                    <p className="font-display text-[clamp(2.2rem,4.8vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
                      {value?.title}
                    </p>
                    <p className="mt-5 max-w-[520px] text-[16.5px] leading-[1.7] text-white/85">{value?.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ------------------------------------------------ visuel + commandes */}
          <div className="flex flex-col gap-5">
            <div className="relative">
            <div className="relative h-[270px] overflow-hidden rounded-2xl min-[900px]:h-[330px]">
              {values?.map((value, i) => (
                <img
                  key={value?.num}
                  src={value?.thumbSrc}
                  alt={i === index ? value?.title : ''}
                  aria-hidden={i !== index}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-all [transition-duration:800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
                  style={{ opacity: i === index ? 1 : 0, transform: i === index ? 'scale(1)' : 'scale(1.06)' }}
                />
              ))}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,transparent,rgba(15,42,71,0.5))]"
              />
            </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[14px] font-medium text-onnavy">
                <span className="text-white">{active?.num}</span> / {String(values?.length)?.padStart(2, '0')}
              </p>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={prev}
                  aria-label={t('home.valuesPrev')}
                  className={roundBtn('dark')}
                >
                  <ArrowUp aria-hidden="true" className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label={t('home.valuesNext')}
                  className={roundBtn('dark')}
                >
                  <ArrowDown aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeValues;
