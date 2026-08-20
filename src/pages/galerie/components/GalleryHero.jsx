import React from 'react';
import { useI18n } from '../../../i18n/LanguageProvider';
import { ACCENT, headingFont, container } from '../../../components/ui/mcctTheme';
import { galleryHeroImage } from '../../../data/gallery';

const GalleryHero = () => {
  const { t } = useI18n();
  const title = t('gallery.title');

  return (
  <section
    aria-labelledby="galerie-title"
    className="relative flex min-h-[58vh] items-end overflow-hidden bg-[#0D0F10]"
  >
    <img
      src={galleryHeroImage}
      alt={t('gallery.heroAlt')}
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,15,16,0.35),rgba(13,15,16,0.88))]" />

    <div className={`${container} relative pb-14 pt-[130px] text-white`}>
      <p className="mb-4 text-[13px] font-extrabold tracking-[0.26em] text-[#cfd6dc]">{t('gallery.eyebrow')}</p>
      <h1
        id="galerie-title"
        className="text-[clamp(2.6rem,6vw,5.4rem)] font-bold leading-[0.98] tracking-[-0.02em]"
        style={headingFont}
      >
        {title?.[0]}
        <br />
        {title?.[1]}
        <span style={{ color: ACCENT }}>.</span>
      </h1>
      <p className="mt-[22px] max-w-[520px] text-[16.5px] leading-[1.7] text-[#c4cad0]">
        {t('gallery.subtitle')}
      </p>
    </div>
    </section>
  );
};

export default GalleryHero;
