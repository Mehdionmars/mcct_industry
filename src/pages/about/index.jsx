import React from 'react';
import PageMeta from '../../components/ui/PageMeta';
import SiteHeader from '../../components/ui/SiteHeader';
import SiteCTA from '../../components/ui/SiteCTA';
import WhatsAppFab from '../../components/ui/WhatsAppFab';
import Reveal from '../../components/ui/Reveal';
import { ACCENT, bodyFont, headingFont, container } from '../../components/ui/mcctTheme';
import { keyFigures } from '../../data/mcct';
import { img } from '../../data/gallery';

const pillars = [
  {
    label: 'MISSION',
    text: 'Réaliser des solutions industrielles fiables et précises, en accompagnant nos clients de l’étude à la mise en service.'
  },
  {
    label: 'VISION',
    text: 'Devenir un référent marocain de la construction métallique et des projets industriels à forte exigence technique.'
  },
  {
    label: 'VALEURS',
    text: 'Excellence, sécurité, innovation, engagement — à chaque étape, en atelier comme sur chantier.'
  }
];

const About = () => (
  <div className="min-h-screen bg-[#F5F5F2] text-[#17191C] antialiased" style={bodyFont}>
    <PageMeta title="À propos — constructeur métallique à Casablanca | MCCT Industrie" description="MCCT Industrie, entreprise marocaine basée à Casablanca, spécialisée dans l’ingénierie, la fabrication et la construction métallique." />

    <WhatsAppFab />
    <SiteHeader />

    <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-[#0D0F10]">
      <img
        src={img('IMG_7894')}
        alt="Équipe MCCT sur un chantier de couverture"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,15,16,0.4),rgba(13,15,16,0.85))]" />
      <div className={`${container} relative pb-16 pt-[140px] text-white`}>
        <p className="mb-4 text-[13px] font-extrabold tracking-[0.26em] text-[#cfd6dc]">À PROPOS</p>
        <h1
          className="text-[clamp(2.6rem,6vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.02em]"
          style={headingFont}
        >
          UNE ENTREPRISE
          <br />
          D&apos;INGÉNIEURS
          <br />
          ET DE BÂTISSEURS
          <span style={{ color: ACCENT }}>.</span>
        </h1>
      </div>
    </section>

    <section className="py-[110px]">
      <div className={`${container} grid items-start gap-14 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]`}>
        <Reveal>
          <p className="mb-[18px] text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
            01 — QUI SOMMES-NOUS
          </p>
          <h2
            className="text-[clamp(2.2rem,4.2vw,3.8rem)] font-bold leading-none tracking-[-0.02em]"
            style={headingFont}
          >
            MOROCCAN COMPANY OF CONSTRUCTION TECHNOLOGY
            <span style={{ color: ACCENT }}>.</span>
          </h2>
        </Reveal>
        <Reveal className="max-w-[520px] pt-3">
          <p className="mb-5 text-[17px] leading-[1.7] text-[#3a3f45]">
            MCCT Industrie est une entreprise marocaine basée à Casablanca, spécialisée dans l’ingénierie, la
            fabrication et la construction métallique.
          </p>
          <p className="text-[17px] leading-[1.7] text-[#3a3f45]">
            Nous intervenons sur l’ensemble du cycle des projets industriels : études, fabrication en atelier, montage
            sur site et maintenance des installations.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="bg-[#0D0F10] py-[110px] text-white">
      <div className={`${container} grid gap-12 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]`}>
        {pillars?.map((pillar) => (
          <Reveal key={pillar?.label} className="border-t-[3px] border-[#2478BE] pt-7">
            <p className="mb-3.5 text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
              {pillar?.label}
            </p>
            <p className="text-[19px] leading-[1.6] text-[#d8dde1]">{pillar?.text}</p>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="py-[110px]">
      <div className={`${container} grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]`}>
        {keyFigures?.map((figure) => (
          <Reveal key={figure?.label}>
            <p
              className="text-[clamp(3rem,5vw,4.6rem)] font-extrabold tracking-[-0.03em]"
              style={{ color: ACCENT }}
            >
              {figure?.value}+
            </p>
            <p className="mt-2 text-[12.5px] font-bold tracking-[0.2em] text-[#565e66]">{figure?.label}</p>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="pb-[110px]">
      <div className={`${container} grid gap-6 min-[900px]:[grid-template-columns:2fr_1fr]`}>
        <Reveal className="overflow-hidden">
          <img
            src={img('IMG_7864')}
            alt="Hangar métallique MCCT"
            loading="lazy"
            className="block h-[420px] w-full object-cover transition-transform [transition-duration:600ms] hover:scale-[1.04]"
          />
        </Reveal>
        <Reveal className="overflow-hidden">
          <img
            src={img('IMG_7916')}
            alt="Atelier de soudure MCCT"
            loading="lazy"
            className="block h-[420px] w-full object-cover transition-transform [transition-duration:600ms] hover:scale-[1.04]"
          />
        </Reveal>
      </div>
    </section>

    <SiteCTA />
  </div>
);

export default About;
