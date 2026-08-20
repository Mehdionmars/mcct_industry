import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../../../components/ui/Reveal';
import { ACCENT, headingFont, container } from '../../../components/ui/mcctTheme';
import { activities, processSteps } from '../../../data/mcct';

export const ActivitiesSection = () => (
  <section id="activites" className="bg-[#F5F5F2] py-[120px]">
    <div className={container}>
      <Reveal className="mb-16 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-[18px] text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
            02 — NOS ACTIVITÉS
          </p>
          <h2
            className="text-[clamp(2.4rem,4.6vw,4.4rem)] font-extrabold leading-none tracking-[-0.03em]"
            style={headingFont}
          >
            DES SOLUTIONS
            <br />
            CONÇUES POUR
            <br />
            L&apos;INDUSTRIE
            <span style={{ color: ACCENT }}>.</span>
          </h2>
        </div>
        <p className="max-w-[380px] text-[16px] leading-[1.65] text-[#3a3f45]">
          Un périmètre d&apos;intervention complet, de la charpente métallique aux équipements industriels.
        </p>
      </Reveal>

      <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
        {activities?.map((activity) => (
          <Reveal key={activity?.num}>
            <Link
              to="/services"
              className="group relative block min-h-[380px] overflow-hidden bg-[#0D0F10] text-white"
            >
              <img
                src={activity?.thumbSrc}
                alt={activity?.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-55 transition-all [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:opacity-40"
              />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,15,16,0)_30%,rgba(13,15,16,0.85)_100%)]" />
              <span className="relative flex min-h-[380px] flex-col justify-between p-7">
                <span className="text-[13px] font-extrabold tracking-[0.2em]" style={{ color: ACCENT }}>
                  {activity?.num}
                </span>
                <span>
                  <span className="mb-4 block h-[3px] w-10 bg-[#2478BE]" />
                  <span className="block text-[24px] font-extrabold leading-[1.1] tracking-[-0.01em]">
                    {activity?.title}
                  </span>
                  <span className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-[14px] leading-[1.55] text-[#c4cad0]">{activity?.short}</span>
                    <span
                      aria-hidden="true"
                      className="text-[20px] transition-transform duration-300 group-hover:translate-x-2"
                      style={{ color: ACCENT }}
                    >
                      →
                    </span>
                  </span>
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export const SavoirFaireSection = () => (
  <section id="savoirfaire" className="bg-[#E7E7E4] py-[120px]">
    <div className={container}>
      <Reveal className="mb-16">
        <p className="mb-[18px] text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
          03 — NOTRE SAVOIR-FAIRE
        </p>
        <h2
          className="text-[clamp(2.4rem,4.6vw,4.4rem)] font-extrabold leading-none tracking-[-0.03em]"
          style={headingFont}
        >
          DE L&apos;IDÉE
          <br />
          À LA RÉALISATION
          <span style={{ color: ACCENT }}>.</span>
        </h2>
      </Reveal>

      <div className="grid gap-[2px] bg-[#cfcfcb] [grid-template-columns:repeat(auto-fit,minmax(min(100%,170px),1fr))]">
        {processSteps?.map((step) => (
          <Reveal key={step?.num} className="bg-[#F5F5F2] px-[22px] pb-9 pt-7 transition-colors duration-300 hover:bg-white">
            <p className="mb-10 text-[13px] font-extrabold tracking-[0.18em]" style={{ color: ACCENT }}>
              {step?.num}
            </p>
            <p className="text-[16px] font-extrabold tracking-[0.06em]">{step?.title}</p>
            <p className="mt-2.5 text-[13.5px] leading-[1.55] text-[#565e66]">{step?.desc}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
