import React, { useState } from 'react';
import Reveal from '../../../components/ui/Reveal';
import { ACCENT, headingFont, container } from '../../../components/ui/mcctTheme';
import { capabilities, values, clients } from '../../../data/mcct';
import { img } from '../../../data/gallery';

export const CapabilitiesSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#0D0F10] py-[120px] text-white">
      <div className={`${container} grid items-start gap-16 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]`}>
        <Reveal>
          <p className="mb-[18px] text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
            06 — CAPACITÉS INDUSTRIELLES
          </p>
          <h2
            className="mb-9 text-[clamp(2.2rem,4.2vw,3.8rem)] font-extrabold leading-none tracking-[-0.03em]"
            style={headingFont}
          >
            CONÇUS POUR
            <br />
            LES PROJETS
            <br />
            COMPLEXES
            <span style={{ color: ACCENT }}>.</span>
          </h2>
          <div className="overflow-hidden">
            <img
              src={img('IMG_7916')}
              alt="Soudure en atelier MCCT"
              loading="lazy"
              className="block h-[380px] w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal className="flex flex-col">
          {capabilities?.map((capability, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={capability?.title} className="border-b border-[#23272b]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent py-5 text-left text-white"
                >
                  <span className="flex items-center gap-[18px]">
                    <span
                      className="text-[12px] font-extrabold tracking-[0.14em]"
                      style={{ color: isOpen ? ACCENT : '#565e66' }}
                    >
                      {capability?.num}
                    </span>
                    <span className="text-[20px] font-extrabold tracking-[0.04em]">{capability?.title}</span>
                  </span>
                  <span aria-hidden="true" className="text-[18px]" style={{ color: isOpen ? ACCENT : '#565e66' }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen ? (
                  <p className="max-w-[440px] pb-[22px] pl-[42px] text-[14.5px] leading-[1.65] text-[#9aa2a9]">
                    {capability?.desc}
                  </p>
                ) : null}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
};

// Affichée seulement quand des logos clients sont fournis (voir `clients` dans data/mcct).
export const ClientsSection = () => {
  if (!clients?.length) return null;

  return (
    <section className="border-t border-[#e0e0dc] bg-[#F5F5F2] py-[110px]">
      <div className={container}>
        <Reveal className="mb-12">
          <p className="mb-[18px] text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
            RÉFÉRENCES
          </p>
          <h2 className="text-[clamp(2rem,4.2vw,3.6rem)] font-bold leading-none tracking-[-0.02em]" style={headingFont}>
            LA CONFIANCE DE
            <br />
            PARTENAIRES INDUSTRIELS
            <span style={{ color: ACCENT }}>.</span>
          </h2>
        </Reveal>
        <Reveal className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))]">
          {clients?.map((client) => (
            <div
              key={client?.name}
              className="flex min-h-[120px] items-center justify-center border border-[#dcdcd8] bg-white p-6"
            >
              <img src={client?.src} alt={client?.name} loading="lazy" className="max-h-14 w-auto object-contain" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export const QualitySection = () => (
  <section id="qualite" className="bg-[#F5F5F2] py-[120px]">
    <div className={container}>
      <Reveal>
        <p className="mb-[18px] text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
          07 — QUALITÉ &amp; HSE
        </p>
        <h2
          className="text-[clamp(2.4rem,9vw,122px)] font-extrabold leading-none tracking-[-0.03em]"
          style={headingFont}
        >
          LA PERFORMANCE
          <br />
          SANS COMPROMIS
          <span style={{ color: ACCENT }}>.</span>
        </h2>
      </Reveal>
    </div>
  </section>
);

export const ValuesSection = () => (
  <section className="bg-[#E7E7E4] py-[120px]">
    <div className={container}>
      <Reveal as="p" className="mb-10 text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
        08 — CE QUI NOUS ANIME
      </Reveal>
      <div className="flex flex-col">
        {values?.map((value) => (
          <Reveal
            key={value?.num}
            className="flex items-baseline gap-7 border-t border-[#c6c6c1] py-[26px] text-[#17191C] transition-colors duration-300 hover:text-[#2478BE]"
          >
            <span className="text-[13px] font-extrabold tracking-[0.18em] text-[#8a9096]">{value?.num}</span>
            <span
              className="text-[clamp(2rem,4.4vw,3.8rem)] font-extrabold leading-none tracking-[-0.02em]"
              style={headingFont}
            >
              {value?.title}
            </span>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
