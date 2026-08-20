import React from 'react';
import PageMeta from '../../components/ui/PageMeta';
import SiteHeader from '../../components/ui/SiteHeader';
import SiteCTA from '../../components/ui/SiteCTA';
import WhatsAppFab from '../../components/ui/WhatsAppFab';
import Reveal from '../../components/ui/Reveal';
import { ACCENT, bodyFont, headingFont, container } from '../../components/ui/mcctTheme';
import { activities } from '../../data/mcct';
import { img } from '../../data/gallery';

const ActivitySection = ({ activity, index }) => {
  const isDark = index % 2 === 1;

  return (
    <section
      className={`py-[100px] ${isDark ? 'bg-[#0D0F10] text-white' : 'bg-[#F5F5F2] text-[#17191C]'}`}
      aria-labelledby={`activite-${activity?.num}`}
    >
      <div className={`${container} grid items-center gap-14 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]`}>
        <Reveal className={isDark ? 'min-[900px]:order-2' : undefined}>
          <p className="mb-4 text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
            {`${activity?.num} — ${activity?.title?.toUpperCase()}`}
          </p>
          <h2
            id={`activite-${activity?.num}`}
            className="mb-5 text-[clamp(1.9rem,3.4vw,3rem)] font-bold leading-[1.02] tracking-[-0.02em]"
            style={headingFont}
          >
            {activity?.title}
          </h2>
          <p className={`mb-6 text-[16.5px] leading-[1.7] ${isDark ? 'text-[#c4cad0]' : 'text-[#3a3f45]'}`}>
            {activity?.description}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {activity?.tags?.map((tag) => (
              <span
                key={tag}
                className={`border px-4 py-2.5 text-[11.5px] font-bold tracking-[0.14em] ${
                  isDark ? 'border-[#2c3136] text-[#9aa2a9]' : 'border-[#c6c6c1] text-[#565e66]'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal className="overflow-hidden">
          <img
            src={activity?.src}
            alt={activity?.title}
            loading="lazy"
            className="block h-[400px] w-full object-cover transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
          />
        </Reveal>
      </div>
    </section>
  );
};

const Activites = () => (
  <div className="min-h-screen bg-[#F5F5F2] text-[#17191C] antialiased" style={bodyFont}>
    <PageMeta title="Charpente, chaudronnerie et tuyauterie industrielle | MCCT Industrie" description="Construction métallique, chaudronnerie, tuyauterie industrielle, montage, maintenance et équipements : les activités de MCCT Industrie." />

    <WhatsAppFab />
    <SiteHeader />

    <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-[#0D0F10]">
      <img
        src={img('IMG_7905')}
        alt="Convoyeur industriel réalisé par MCCT"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,15,16,0.4),rgba(13,15,16,0.85))]" />
      <div className={`${container} relative pb-16 pt-[140px] text-white`}>
        <p className="mb-4 text-[13px] font-extrabold tracking-[0.26em] text-[#cfd6dc]">NOS ACTIVITÉS</p>
        <h1
          className="text-[clamp(2.6rem,6vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.02em]"
          style={headingFont}
        >
          DES SOLUTIONS
          <br />
          CONÇUES POUR
          <br />
          L&apos;INDUSTRIE
          <span style={{ color: ACCENT }}>.</span>
        </h1>
      </div>
    </section>

    {activities?.map((activity, index) => (
      <ActivitySection key={activity?.num} activity={activity} index={index} />
    ))}

    <SiteCTA title="BESOIN D'UNE EXPERTISE" ctaLabel="DEMANDER UN DEVIS" />
  </div>
);

export default Activites;
