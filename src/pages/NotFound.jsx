import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/ui/PageMeta';
import SiteHeader from '../components/ui/SiteHeader';
import SiteCTA from '../components/ui/SiteCTA';
import WhatsAppFab from '../components/ui/WhatsAppFab';
import { ACCENT, bodyFont, headingFont, container, navLinks } from '../components/ui/mcctTheme';
import { img } from '../data/gallery';

const NotFound = () => (
  <div className="min-h-screen bg-[#F5F5F2] text-[#17191C] antialiased" style={bodyFont}>
    <PageMeta
      title="Page introuvable — MCCT Industrie"
      description="Cette page n’existe pas. Retrouvez les activités, projets et coordonnées de MCCT Industrie."
    />

    <WhatsAppFab />
    <SiteHeader />

    <section className="relative flex min-h-[72vh] items-end overflow-hidden bg-[#0D0F10]">
      <img
        src={img('IMG_7873')}
        alt="Structure métallique en cours de montage"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,15,16,0.45),rgba(13,15,16,0.9))]" />
      <div className={`${container} relative pb-16 pt-[140px] text-white`}>
        <p className="mb-4 text-[13px] font-extrabold tracking-[0.26em] text-[#cfd6dc]">ERREUR 404</p>
        <h1
          className="text-[clamp(2.6rem,6vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.02em]"
          style={headingFont}
        >
          CETTE PAGE
          <br />
          N&apos;EXISTE PAS
          <span style={{ color: ACCENT }}>.</span>
        </h1>
        <p className="mt-[22px] max-w-[520px] text-[16.5px] leading-[1.7] text-[#c4cad0]">
          Le lien est peut-être obsolète ou mal saisi. Reprenez depuis l’une des pages ci-dessous.
        </p>
      </div>
    </section>

    <section className="py-[90px]">
      <div className={container}>
        <p className="mb-8 text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
          OÙ ALLER
        </p>
        <nav aria-label="Pages du site" className="flex flex-col">
          <Link
            to="/"
            className="flex items-baseline gap-7 border-t border-[#c6c6c1] py-6 transition-colors duration-300 hover:text-[#2478BE]"
          >
            <span className="text-[13px] font-extrabold tracking-[0.18em] text-[#8a9096]">00</span>
            <span
              className="text-[clamp(1.6rem,3.4vw,2.8rem)] font-extrabold leading-none tracking-[-0.02em]"
              style={headingFont}
            >
              ACCUEIL
            </span>
          </Link>
          {navLinks?.map((link) => (
            <Link
              key={link?.to}
              to={link?.to}
              className="flex items-baseline gap-7 border-t border-[#c6c6c1] py-6 transition-colors duration-300 hover:text-[#2478BE]"
            >
              <span className="text-[13px] font-extrabold tracking-[0.18em] text-[#8a9096]">{link?.num}</span>
              <span
                className="text-[clamp(1.6rem,3.4vw,2.8rem)] font-extrabold leading-none tracking-[-0.02em]"
                style={headingFont}
              >
                {link?.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </section>

    <SiteCTA title="BESOIN D'UN RENSEIGNEMENT" ctaLabel="NOUS ÉCRIRE" />
  </div>
);

export default NotFound;
