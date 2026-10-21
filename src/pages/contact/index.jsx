import React from 'react';
import PageMeta from '../../components/ui/PageMeta';
import SiteHeader from '../../components/ui/SiteHeader';
import WhatsAppFab from '../../components/ui/WhatsAppFab';
import McctContactForm from '../../components/ui/McctContactForm';
import useParallax from '../../hooks/useParallax';
import { useI18n } from '../../i18n/LanguageProvider';
import { img } from '../../data/gallery';
import {
  bodyFont,
  headingFont,
  container,
  EMAIL,
  EMAIL_HREF,
  PHONE,
  PHONE_HREF,
  WHATSAPP_HREF
} from '../../components/ui/mcctTheme';
import { DimLine, Eyebrow, Mark, TitleBlock } from '../../components/ui/Blueprint';

const ContactPage = () => {
  const { t } = useI18n();
  const title = t('contact.title');
  const { ref: parallaxRef, offset } = useParallax(50);

  const rowLabel =
    'border-b border-r border-nightrule px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-brandlt';
  const rowValue = 'min-w-0 border-b border-r border-nightrule px-4 py-3';

  return (
    <div className="min-h-screen bg-night text-snow antialiased" style={bodyFont}>
      <PageMeta title={t('meta.contact.title')} description={t('meta.contact.description')} />

      <WhatsAppFab />
      <SiteHeader variant="dark" />

      <section ref={parallaxRef} className="relative overflow-hidden pb-[100px] pt-10">
        {/*
          Fond de page : un technicien MCCT en gilet, décalé en parallaxe,
          sous un voile bleu de plan et le quadrillage.
        */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[780px] overflow-hidden">
          <img
            src={img('IMG_7941')}
            alt=""
            fetchpriority="high"
            className="absolute left-0 top-[-10%] h-[120%] w-full object-cover object-center will-change-transform"
            style={{ transform: `translate3d(0, ${offset}px, 0)` }}
          />
          <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,27,44,0.84)_0%,rgba(11,27,44,0.9)_45%,#0B1B2C_100%)]" />
        </div>
        <div aria-hidden="true" className="bp-grid-dark pointer-events-none absolute inset-0" />

        <div className={`${container} relative`}>
          <div className="mb-12 flex flex-wrap items-center justify-between gap-3 border-y border-nightrule py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fog">
            <span>
              {t('bp.ref')} MCCT-IND — {t('bp.sheet')} 04 / 04
            </span>
            <span>{t('common.cityLine')}</span>
          </div>

          <Eyebrow tone="dark">{t('nav.contact')}</Eyebrow>
          <h1
            className="mb-14 animate-mcct-rise text-[clamp(2.8rem,7vw,6.6rem)] font-bold uppercase leading-[1] tracking-[-0.015em]"
            style={headingFont}
          >
            {title?.[0]}
            <br />
            {title?.[1]}
            <br />
            {title?.[2]}
            <Mark />
          </h1>

          <DimLine tone="dark" label="MCCT INDUSTRIE" className="mb-14" />

          <div className="grid items-start gap-16 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
            <div>
              {/* Coordonnées en tableau, comme une nomenclature. */}
              <dl className="grid grid-cols-[auto_1fr] border-l border-t border-nightrule text-[15.5px] leading-[1.7]">
                <dt className={rowLabel}>{t('bp.address')}</dt>
                <dd className={`${rowValue} text-fog`}>
                  <span className="text-snow">MCCT INDUSTRIE</span>
                  <br />
                  {t('common.addressLine1')} {t('common.addressLine2')}
                  <br />
                  {t('common.addressCity')}
                </dd>
                <dt className={rowLabel}>{t('contact.form.phone')}</dt>
                <dd className={rowValue}>
                  <a href={PHONE_HREF} className="text-snow hover:text-safety">
                    {PHONE}
                  </a>
                </dd>
                <dt className={rowLabel}>{t('contact.form.email')}</dt>
                <dd className={rowValue}>
                  <a href={EMAIL_HREF} className="break-all text-snow hover:text-safety">
                    {EMAIL}
                  </a>
                </dd>
              </dl>

              <p className="mt-6">
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[13px] font-semibold uppercase tracking-[0.08em] text-[#3BD16F] hover:text-snow"
                >
                  {t('common.whatsapp')}
                </a>
              </p>

              {/* Plan d'accès, encadré de repères de coupe. */}
              <figure className="m-0 mt-12">
                <div className="relative">
                  <div className="overflow-hidden border border-nightrule">
                    <iframe
                      title={t('contact.mapTitle')}
                      src="https://www.google.com/maps?q=Route+310+km+6+Chellalate+Ain+Harrouda&output=embed"
                      loading="lazy"
                      className="block h-[300px] w-full border-0 grayscale contrast-[1.05]"
                    />
                  </div>
                  <span aria-hidden="true" className="bp-corners text-brandlt" />
                </div>
                <figcaption
                  aria-hidden="true"
                  className="mt-3.5 flex justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.12em] text-fog"
                >
                  <span>{t('bp.fig')} 01</span>
                  <span className="truncate">{t('common.addressCity')}</span>
                </figcaption>
              </figure>
            </div>

            <McctContactForm />
          </div>
        </div>
      </section>

      <TitleBlock sheet="04" />
    </div>
  );
};

export default ContactPage;
