import React from 'react';
import Reveal from '../../../components/ui/Reveal';
import useCarousel from '../../../hooks/useCarousel';
import useParallax from '../../../hooks/useParallax';
import { useI18n } from '../../../i18n/LanguageProvider';
import { SAFETY, headingFont, container } from '../../../components/ui/mcctTheme';
import { Eyebrow, Mark, squareBtn } from '../../../components/ui/Blueprint';
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
    <section ref={parallaxRef} className="relative overflow-hidden bg-night py-[110px] text-snow">
      {/* Couche parallaxe : surdimensionnée pour ne jamais laisser de bord nu. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={values?.[0]?.src}
          alt=""
          loading="lazy"
          className="absolute left-0 top-[-12%] h-[124%] w-full object-cover opacity-[0.16] will-change-transform"
          style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        />
        <span className="absolute inset-0 bg-[linear-gradient(180deg,#0B1B2C_0%,rgba(11,27,44,0.72)_45%,#0B1B2C_100%)]" />
        <span className="bp-grid-dark absolute inset-0" />
      </div>

      <div className={`${container} relative`}>
        <Reveal className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow tone="dark">{t('home.valuesEyebrow')}</Eyebrow>
            <h2
              className="text-[clamp(2.4rem,5vw,4.4rem)] font-bold uppercase leading-[1.02] tracking-[-0.01em]"
              style={headingFont}
            >
              {t('home.valuesTitle')?.[0]}
              <br />
              {t('home.valuesTitle')?.[1]}
              <Mark />
            </h2>
          </div>
          <p className="max-w-[360px] border-l border-nightrule pl-6 text-[16px] leading-[1.65] text-fog">{t('home.valuesText')}</p>
        </Reveal>

        <div
          {...containerProps}
          tabIndex={0}
          role="group"
          aria-roledescription="carrousel"
          aria-label={t('home.valuesEyebrow')}
          className="grid gap-12 outline-none focus-visible:ring-2 focus-visible:ring-safety/70 min-[900px]:[grid-template-columns:1fr_minmax(280px,420px)]"
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
                    className="block w-[4px] transition-all duration-500"
                    style={{
                      height: i === index ? '100%' : '38%',
                      backgroundColor: i === index ? SAFETY : '#24405C'
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
                    <p className="mb-4 font-mono text-[12px] tracking-[0.14em] text-brandlt">V-{value?.num}</p>
                    <p
                      className="text-[clamp(2.4rem,5.6vw,4.4rem)] font-bold uppercase leading-[1.02] tracking-[-0.01em]"
                      style={headingFont}
                    >
                      {value?.title}
                    </p>
                    <p className="mt-5 max-w-[520px] text-[16px] leading-[1.7] text-snow/85">{value?.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ------------------------------------------------ visuel + commandes */}
          <div className="flex flex-col gap-5">
            <div className="relative">
            <span aria-hidden="true" className="bp-corners z-10 text-brandlt" />
            <div className="relative h-[270px] overflow-hidden min-[900px]:h-[330px]">
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
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,transparent,rgba(11,27,44,0.6))]"
              />
            </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="font-mono text-[12px] tracking-[0.14em] text-fog">
                <span className="text-snow">{active?.num}</span> / {String(values?.length)?.padStart(2, '0')}
              </p>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={prev}
                  aria-label={t('home.valuesPrev')}
                  className={squareBtn('dark')}
                >
                  <span aria-hidden="true">↑</span>
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label={t('home.valuesNext')}
                  className={squareBtn('dark')}
                >
                  <span aria-hidden="true">↓</span>
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
