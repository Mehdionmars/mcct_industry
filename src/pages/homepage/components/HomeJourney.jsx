import React from 'react';
import useScrollProgress from '../../../hooks/useScrollProgress';
import { useI18n } from '../../../i18n/LanguageProvider';
import { container } from '../../../components/ui/mcctTheme';
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
      className="relative h-[300vh] bg-navy min-[900px]:h-[360vh]"
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
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,42,71,0.7)_0%,rgba(15,42,71,0.35)_38%,rgba(15,42,71,0.9)_100%)]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,42,71,0.92)_0%,rgba(15,42,71,0.7)_38%,rgba(15,42,71,0.15)_72%,transparent_100%)]"
        />

        <div className={`${container} relative flex h-full flex-col justify-between pb-10 pt-[128px] text-white`}>
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
                <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold text-skytext">
                  {chapter?.num} / {String(chapters?.length)?.padStart(2, '0')}
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current" />
                  {chapter?.label}
                </p>
                <h2 className="max-w-[16ch] whitespace-pre-line font-display text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[1.06] tracking-[-0.03em]">
                  {chapter?.title}
                </h2>
                <p className="mt-6 max-w-[500px] text-[17.5px] leading-[1.7] text-white/85">{chapter?.desc}</p>
              </div>
            ))}
          </div>

          {/* -------------------------------------------- rail de progression */}
          {/* Toujours sur une ligne : les libellés tombent sous 700px, pas les repères. */}
          <ul className="grid list-none grid-cols-4 gap-2.5 min-[700px]:gap-3">
            {chapters?.map((chapter, i) => (
              <li key={chapter?.num} className="flex flex-col gap-2.5">
                <span aria-hidden="true" className="block h-1 w-full overflow-hidden rounded-full bg-white/20">
                  <span
                    className="block h-full w-full origin-left rounded-full bg-skytext transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                    style={{ transform: `scaleX(${i <= index ? 1 : 0})` }}
                  />
                </span>
                <span
                  className="hidden text-[14px] font-medium transition-colors duration-500 min-[700px]:block"
                  style={{ color: i === index ? '#FFFFFF' : 'rgba(255,255,255,0.55)' }}
                >
                  {chapter?.label}
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
