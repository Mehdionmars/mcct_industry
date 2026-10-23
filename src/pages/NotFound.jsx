import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/ui/PageMeta';
import SiteHeader from '../components/ui/SiteHeader';
import SiteCTA from '../components/ui/SiteCTA';
import WhatsAppFab from '../components/ui/WhatsAppFab';
import { useI18n } from '../i18n/LanguageProvider';
import { ACCENT, bodyFont, headingFont, container, navLinks } from '../components/ui/mcctTheme';
import { img } from '../data/gallery';

const NotFound = () => {
  const { t } = useI18n();
  const title = t('notFound.title');

  return (
  <div className="min-h-screen bg-[#F5F5F2] text-[#17191C] antialiased" style={bodyFont}>
    <PageMeta title={t('meta.notFound.title')} description={t('meta.notFound.description')} />

    <WhatsAppFab />
    <SiteHeader />

    <section className="relative flex min-h-[72vh] items-end overflow-hidden bg-[#0D0F10]">
      <img
        src={img('IMG_7873')}
        alt={t('notFound.heroAlt')}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,15,16,0.45),rgba(13,15,16,0.9))]" />
      <div className={`${container} relative pb-16 pt-[140px] text-white`}>
        <p className="mb-4 text-[13px] font-extrabold tracking-[0.26em] text-[#cfd6dc]">{t('notFound.eyebrow')}</p>
        <h1
          className="text-[clamp(2.6rem,6vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.02em]"
          style={headingFont}
        >
          {title?.[0]}
          <br />
          {title?.[1]}
          <span style={{ color: ACCENT }}>.</span>
        </h1>
        <p className="mt-[22px] max-w-[520px] text-[16.5px] leading-[1.7] text-[#c4cad0]">
          {t('notFound.text')}
        </p>
      </div>
    </section>

    <section className="py-[90px]">
      <div className={container}>
        <p className="mb-8 text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
          {t('notFound.where')}
        </p>
        <nav aria-label={t('notFound.pagesNav')} className="flex flex-col">
          <Link
            to="/"
            className="flex items-baseline gap-7 border-t border-[#c6c6c1] py-6 transition-colors duration-300 hover:text-[#2478BE]"
          >
            <span
              className="text-[clamp(1.6rem,3.4vw,2.8rem)] font-extrabold leading-none tracking-[-0.02em]"
              style={headingFont}
            >
              {t('nav.home')}
            </span>
          </Link>
          {navLinks?.map((link) => (
            <Link
              key={link?.to}
              to={link?.to}
              className="flex items-baseline gap-7 border-t border-[#c6c6c1] py-6 transition-colors duration-300 hover:text-[#2478BE]"
            >
              <span
                className="text-[clamp(1.6rem,3.4vw,2.8rem)] font-extrabold leading-none tracking-[-0.02em]"
                style={headingFont}
              >
                {t(`nav.${link?.key}`)}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </section>

    <SiteCTA titleKey="cta.info" ctaKey="cta.writeUs" />
    </div>
  );
};

export default NotFound;
