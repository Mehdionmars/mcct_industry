import React from 'react';
import useScrollProgress from '../../../hooks/useScrollProgress';
import { useI18n } from '../../../i18n/LanguageProvider';
import { ACCENT, headingFont, container } from '../../../components/ui/mcctTheme';
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
      className="relative h-[300vh] bg-[#0D0F10] min-[900px]:h-[360vh]"
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
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,15,16,0.72)_0%,rgba(13,15,16,0.42)_38%,rgba(13,15,16,0.92)_100%)]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,15,16,0.9)_0%,rgba(13,15,16,0.72)_38%,rgba(13,15,16,0.2)_72%,transparent_100%)]"
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
                <p className="mb-5 text-[12.5px] font-extrabold tracking-[0.26em]" style={{ color: ACCENT }}>
                  {chapter?.num} / {String(chapters?.length)?.padStart(2, '0')}
                  <span className="mx-2.5 text-[rgba(255,255,255,0.4)]">—</span>
                  {chapter?.label}
                </p>
                <h2
                  className="max-w-[15ch] whitespace-pre-line text-[clamp(2.2rem,6.4vw,5.4rem)] font-extrabold leading-[0.98] tracking-[-0.03em]"
                  style={headingFont}
                >
                  {chapter?.title}
                </h2>
                <p className="mt-7 max-w-[500px] text-[16.5px] leading-[1.65] text-[#d8dde1]">{chapter?.desc}</p>
              </div>
            ))}
          </div>

          {/* -------------------------------------------- rail de progression */}
          {/* Toujours sur une ligne : les libellés tombent sous 700px, pas les repères. */}
          <ul className="grid list-none grid-cols-4 gap-2.5 min-[700px]:gap-3">
            {chapters?.map((chapter, i) => (
              <li key={chapter?.num} className="flex flex-col gap-2.5">
                <span aria-hidden="true" className="block h-[3px] w-full overflow-hidden bg-[rgba(255,255,255,0.22)]">
                  <span
                    className="block h-full origin-left bg-[#2478BE] transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                    style={{ transform: `scaleX(${i <= index ? 1 : 0})` }}
                  />
                </span>
                <span
                  className="hidden text-[11.5px] font-extrabold tracking-[0.18em] transition-colors duration-500 min-[700px]:block"
                  style={{ color: i === index ? '#ffffff' : 'rgba(255,255,255,0.45)' }}
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
