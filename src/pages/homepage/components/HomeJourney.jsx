import React from 'react';
import useScrollProgress from '../../../hooks/useScrollProgress';
import { useI18n } from '../../../i18n/LanguageProvider';
import { headingFont, container } from '../../../components/ui/mcctTheme';
import { Mark } from '../../../components/ui/Blueprint';
import { getJourney } from '../../../data/mcct';

/**
 * Récit d'ouverture joué au défilement : une section haute dont le contenu
 * reste épinglé pendant que les chapitres s'enchaînent sur des photos de
 * chantier en plein cadre.
 *
 * Remplace l'ancienne maquette 3D (Three.js) : mêmes intentions narratives,
 * mais avec les vraies réalisations MCCT, sans dépendance externe et pour une
 * fraction du poids.
 */
const HomeJourney = () => {
  const { lang, t } = useI18n();
  const chapters = getJourney(lang);
  const { ref, progress } = useScrollProgress();

  // Le dernier chapitre garde la main jusqu'en bas : on répartit la progression
  // sur `length` paliers plutôt que sur `length - 1`.
  const count = chapters?.length || 1;
  const index = Math.min(count - 1, Math.floor(progress * count));

  return (
    <section
      ref={ref}
      aria-label={t('home.journeyLabel')}
      className="relative h-[300vh] bg-night min-[900px]:h-[360vh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Photos empilées : seule l'active est opaque, avec un lent recadrage. */}
        {chapters?.map((chapter, i) => (
          <img
            key={chapter?.num}
            src={chapter?.src}
            alt={i === index ? chapter?.label : ''}
            aria-hidden={i !== index}
            loading={i === 0 ? 'eager' : 'lazy'}
            className="absolute inset-0 h-full w-full object-cover transition-all [transition-duration:1100ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{
              opacity: i === index ? 1 : 0,
              transform: i === index ? 'scale(1.04)' : 'scale(1)'
            }}
          />
        ))}

        {/*
          Deux voiles : le vertical assoit le haut et le bas de l'image, le
          latéral garantit le contraste du texte quelle que soit la photo —
          sans lui, le sur-titre bleu se perdait sur les zones claires.
        */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,27,44,0.75)_0%,rgba(11,27,44,0.42)_38%,rgba(11,27,44,0.93)_100%)]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,27,44,0.92)_0%,rgba(11,27,44,0.72)_38%,rgba(11,27,44,0.2)_72%,transparent_100%)]"
        />
        <span aria-hidden="true" className="bp-grid-dark absolute inset-0" />

        <div className={`${container} relative flex h-full flex-col justify-between pb-10 pt-[128px] text-snow`}>
          {/* ------------------------------------------------------- chapitre */}
          <div className="relative flex-1">
            {chapters?.map((chapter, i) => (
              <div
                key={chapter?.num}
                aria-hidden={i !== index}
                className="absolute inset-0 flex flex-col justify-center transition-all [transition-duration:700ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                style={{
                  opacity: i === index ? 1 : 0,
                  transform: i === index ? 'translateY(0)' : 'translateY(26px)',
                  pointerEvents: i === index ? 'auto' : 'none'
                }}
              >
                {/*
                  Compteur « 01 / 04 » et non « 01 — » : la section est encadrée
                  par les sur-titres numérotés 03 et 04, un simple « 01 » se
                  lirait comme un numéro de section.
                */}
                <p className="mb-6 flex items-center gap-3 font-mono text-[12.5px] font-medium uppercase tracking-[0.14em] text-brandlt">
                  <span className="inline-flex h-7 items-center border border-current px-2">
                    {chapter?.num} / {String(chapters?.length)?.padStart(2, '0')}
                  </span>
                  {chapter?.label}
                </p>
                <h2
                  className="max-w-[15ch] whitespace-pre-line text-[clamp(2.6rem,7vw,6rem)] font-bold uppercase leading-[1.02] tracking-[-0.01em]"
                  style={headingFont}
                >
                  {chapter?.title?.replace(/\.$/, '')}
                  <Mark />
                </h2>
                <p className="mt-7 max-w-[500px] text-[17px] leading-[1.65] text-snow/85">{chapter?.desc}</p>
              </div>
            ))}
          </div>

          {/* -------------------------------------------- rail de progression */}
          {/* Toujours sur une ligne : les libellés tombent sous 700px, pas les repères. */}
          <ul className="grid list-none grid-cols-4 gap-2.5 min-[700px]:gap-3">
            {chapters?.map((chapter, i) => (
              <li key={chapter?.num} className="flex flex-col gap-2.5">
                <span aria-hidden="true" className="relative block h-[14px] w-full">
                  <span className="bp-ruler absolute inset-0 text-snow/25" />
                  <span
                    className="absolute bottom-0 left-0 block h-[4px] w-full origin-left bg-safety transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                    style={{ transform: `scaleX(${i <= index ? 1 : 0})` }}
                  />
                </span>
                <span
                  className="hidden font-mono text-[11.5px] font-medium uppercase tracking-[0.14em] transition-colors duration-500 min-[700px]:block"
                  style={{ color: i === index ? '#E9EFF5' : 'rgba(233,239,245,0.5)' }}
                >
                  {chapter?.num} · {chapter?.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HomeJourney;
