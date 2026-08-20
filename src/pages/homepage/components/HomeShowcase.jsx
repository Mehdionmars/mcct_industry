import React from 'react';
import Reveal from '../../../components/ui/Reveal';
import { ACCENT, headingFont, container } from '../../../components/ui/mcctTheme';
import { sectors } from '../../../data/mcct';
import { img } from '../../../data/gallery';

export const FeaturedProject = () => (
  <section className="relative flex min-h-[78vh] items-end overflow-hidden bg-[#0D0F10]">
    <img
      src={img('IMG_7866')}
      alt="Hangar industriel livré par MCCT Industrie"
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,15,16,0.2)_0%,rgba(13,15,16,0.85)_100%)]" />
    <Reveal className={`${container} relative pb-[72px] pt-[120px] text-white`}>
      <p className="mb-4 text-[13px] font-extrabold tracking-[0.24em] text-[#cfd6dc]">04 — PROJET À LA UNE</p>
      <h2
        className="text-[clamp(2.2rem,4.5vw,4.2rem)] font-extrabold leading-none tracking-[-0.03em]"
        style={headingFont}
      >
        HANGAR INDUSTRIEL
        <br />
        CLÉ EN MAIN
        <span style={{ color: ACCENT }}>.</span>
      </h2>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
        <p className="text-[15px] tracking-[0.08em] text-[#c4cad0]">CONSTRUCTION MÉTALLIQUE — MAROC</p>
        <a
          href="#projets"
          className="inline-flex items-center gap-3 border border-[rgba(255,255,255,0.4)] px-[26px] py-[15px] text-[12.5px] font-extrabold tracking-[0.16em] text-white transition-colors hover:border-white hover:bg-white hover:text-[#17191C]"
        >
          VOIR LE PROJET <span aria-hidden="true">→</span>
        </a>
      </div>
    </Reveal>
  </section>
);

export const EngagementSection = () => (
  <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-[#0D0F10]">
    <img
      src={img('IMG_7887')}
      alt="Montage d'une structure métallique sur site"
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover opacity-50"
    />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,15,16,0.92)_0%,rgba(13,15,16,0.45)_70%)]" />
    <Reveal className={`${container} relative flex flex-wrap items-center justify-between gap-12 py-[90px] text-white`}>
      <div className="min-w-0 max-w-[640px]">
        <p className="mb-[18px] text-[13px] font-extrabold tracking-[0.26em]" style={{ color: ACCENT }}>
          NOTRE ENGAGEMENT
        </p>
        <h2
          className="text-[clamp(2.2rem,5vw,4.4rem)] font-bold leading-none tracking-[-0.02em]"
          style={headingFont}
        >
          CONSTRUIRE AVEC PRÉCISION.
          <br />
          LIVRER AVEC EXIGENCE
          <span style={{ color: ACCENT }}>.</span>
        </h2>
        <p className="mt-[26px] max-w-[480px] text-[17px] leading-[1.7] text-[#c4cad0]">
          Chaque projet est piloté par une équipe technique dédiée, de l&apos;étude d&apos;exécution à la réception sur
          site.
        </p>
      </div>
      <a
        href="#projets"
        aria-label="Voir nos réalisations"
        className="flex h-[168px] w-[168px] shrink-0 flex-col items-center justify-center gap-2 rounded-full border border-[rgba(255,255,255,0.45)] text-center text-[11.5px] font-extrabold tracking-[0.2em] text-white transition-all [transition-duration:400ms] hover:scale-[1.06] hover:border-[#2478BE] hover:bg-[#2478BE]"
      >
        <span aria-hidden="true" className="text-[22px]">
          →
        </span>
        <span>
          NOS
          <br />
          RÉALISATIONS
        </span>
      </a>
    </Reveal>
  </section>
);

export const SectorsSection = () => (
  <section className="bg-[#17191C] py-[120px] text-white">
    <div className={container}>
      <Reveal className="mb-14">
        <p className="mb-[18px] text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
          SECTEURS D&apos;INTERVENTION
        </p>
        <h2
          className="text-[clamp(2.2rem,4.6vw,4rem)] font-bold leading-none tracking-[-0.02em]"
          style={headingFont}
        >
          UNE EXPERTISE
          <br />
          MULTI-SECTORIELLE
          <span style={{ color: ACCENT }}>.</span>
        </h2>
      </Reveal>

      <div className="grid snap-x snap-mandatory grid-flow-col auto-cols-[78%] gap-4 overflow-x-auto pb-3 min-[900px]:auto-cols-auto min-[900px]:grid-flow-row min-[900px]:gap-6 min-[900px]:overflow-visible min-[900px]:pb-0 min-[900px]:[grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
        {sectors?.map((sector) => (
          <Reveal key={sector?.title} className="group relative min-h-[420px] snap-start overflow-hidden">
            <img
              src={sector?.thumbSrc}
              alt={sector?.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-60 transition-all [transition-duration:700ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07] group-hover:opacity-45"
            />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,25,28,0)_35%,rgba(23,25,28,0.9)_100%)]" />
            <span className="relative flex min-h-[420px] flex-col justify-end p-7">
              <span className="mb-4 block h-[3px] w-10 bg-[#2478BE]" />
              <span className="block text-[23px] font-extrabold tracking-[-0.01em]">{sector?.title}</span>
              <span className="mt-2.5 block text-[14.5px] leading-[1.55] text-[#c4cad0]">{sector?.desc}</span>
            </span>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
