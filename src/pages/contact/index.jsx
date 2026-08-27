import React from 'react';
import PageMeta from '../../components/ui/PageMeta';
import SiteHeader from '../../components/ui/SiteHeader';
import WhatsAppFab from '../../components/ui/WhatsAppFab';
import McctContactForm from '../../components/ui/McctContactForm';
import useParallax from '../../hooks/useParallax';
import { useI18n } from '../../i18n/LanguageProvider';
import { img } from '../../data/gallery';
import {
  ACCENT,
  bodyFont,
  headingFont,
  container,
  EMAIL,
  EMAIL_HREF,
  PHONE,
  PHONE_HREF,
  WHATSAPP_HREF
} from '../../components/ui/mcctTheme';

const ContactPage = () => {
  const { t } = useI18n();
  const title = t('contact.title');
  const { ref: parallaxRef, offset } = useParallax(50);

  return (
  <div className="min-h-screen bg-[#111315] text-white antialiased" style={bodyFont}>
    <PageMeta title={t('meta.contact.title')} description={t('meta.contact.description')} />

    <WhatsAppFab />
    <SiteHeader variant="dark" />

    <section ref={parallaxRef} className="relative overflow-hidden pb-[120px] pt-[110px]">
      {/*
        Fond de page : un technicien MCCT en gilet, décalé en parallaxe.
        Le voile en dégradé garantit le contraste du titre et du formulaire.
      */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[780px] overflow-hidden">
        <img
          src={img('IMG_7941')}
          alt=""
          fetchpriority="high"
          className="absolute left-0 top-[-10%] h-[120%] w-full object-cover object-center will-change-transform"
          style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        />
        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,19,21,0.78)_0%,rgba(17,19,21,0.86)_45%,#111315_100%)]" />
      </div>

      <div className={`${container} relative`}>
        <h1
          className="mb-16 text-[clamp(2.8rem,7vw,6.4rem)] font-bold leading-[0.96] tracking-[-0.02em]"
          style={headingFont}
        >
          {title?.[0]}
          <br />
          {title?.[1]}
          <br />
          {title?.[2]}
          <span style={{ color: ACCENT }}>.</span>
        </h1>

        <div className="grid items-start gap-16 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          <div>
            <div className="text-[15.5px] leading-[2] text-[#9aa2a9]">
              <p className="font-extrabold tracking-[0.14em] text-white">MCCT INDUSTRIE</p>
              <p className="mt-3">
                {t('common.addressLine1')}
                <br />
                {t('common.addressLine2')}
                <br />
                {t('common.addressCity')}
              </p>
              <p className="mt-4">
                <a href={PHONE_HREF} className="text-[#c4cad0] hover:text-[#2478BE]">
                  {PHONE}
                </a>
              </p>
              <p>
                <a href={EMAIL_HREF} className="text-[#c4cad0] hover:text-[#2478BE]">
                  {EMAIL}
                </a>
              </p>
              <p className="mt-4">
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#25D366] hover:text-white"
                >
                  {t('common.whatsapp')}
                </a>
              </p>
            </div>

            <div className="mt-10 overflow-hidden border border-[#23272b]">
              <iframe
                title={t('contact.mapTitle')}
                src="https://www.google.com/maps?q=Route+310+km+6+Chellalate+Ain+Harrouda&output=embed"
                loading="lazy"
                className="block h-[300px] w-full border-0 grayscale contrast-[1.05]"
              />
            </div>
          </div>

          <McctContactForm />
        </div>
      </div>
    </section>

    <div
      className={`${container} flex flex-wrap justify-between gap-4 border-t border-[#23272b] pb-[34px] pt-6 text-[12px] tracking-[0.08em] text-[#565e66]`}
    >
      <span>{t('common.copyright')}</span>
      <span>{t('common.legal')}</span>
    </div>
    </div>
  );
};

export default ContactPage;
