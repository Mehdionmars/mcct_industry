import React from 'react';
import { ACCENT, headingFont, container } from '../../../components/ui/mcctTheme';
import { galleryHeroImage } from '../../../data/gallery';

const GalleryHero = () => (
  <section
    aria-labelledby="galerie-title"
    className="relative flex min-h-[58vh] items-end overflow-hidden bg-[#0D0F10]"
  >
    <img
      src={galleryHeroImage}
      alt="Chantier de construction métallique MCCT"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,15,16,0.35),rgba(13,15,16,0.88))]" />

    <div className={`${container} relative pb-14 pt-[130px] text-white`}>
      <p className="mb-4 text-[13px] font-extrabold tracking-[0.26em] text-[#cfd6dc]">GALERIE</p>
      <h1
        id="galerie-title"
        className="text-[clamp(2.6rem,6vw,5.4rem)] font-bold leading-[0.98] tracking-[-0.02em]"
        style={headingFont}
      >
        MCCT INDUSTRIE,
        <br />
        SUR LE TERRAIN
        <span style={{ color: ACCENT }}>.</span>
      </h1>
      <p className="mt-[22px] max-w-[520px] text-[16.5px] leading-[1.7] text-[#c4cad0]">
        Une sélection de nos environnements industriels, chantiers et réalisations.
      </p>
    </div>
  </section>
);

export default GalleryHero;
