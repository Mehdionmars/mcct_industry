import React from 'react';
import Reveal from '../../../components/ui/Reveal';
import useParallax from '../../../hooks/useParallax';
import McctContactForm from '../../../components/ui/McctContactForm';
import { brochureUrl } from '../../../data/mcct';
import { img } from '../../../data/gallery';
import { useI18n } from '../../../i18n/LanguageProvider';
import {
  headingFont,
  container,
  EMAIL,
  EMAIL_HREF,
  PHONE,
  PHONE_HREF,
  WHATSAPP_HREF
} from '../../../components/ui/mcctTheme';
import { DimLine, Eyebrow, Mark, TitleBlock, btnPrimaryDark } from '../../../components/ui/Blueprint';

const HomeContact = () => {
  const { t } = useI18n();
  const title = t('home.contactTitle');
  const subtitle = t('home.contactSubtitle');
  const brochure = t('home.brochureCta');
  const { ref: parallaxRef, offset } = useParallax(50);

  return (
    <section ref={parallaxRef} id="contact" className="relative overflow-hidden bg-night pt-[120px] text-snow">
      {/*
        Fond de section : un technicien MCCT en gilet, décalé en parallaxe,
        sous un voile bleu de plan et le quadrillage.
      */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[860px] overflow-hidden">
        <img
          src={img('IMG_7941')}
          alt=""
          loading="lazy"
          className="absolute left-0 top-[-10%] h-[120%] w-full object-cover object-center will-change-transform"
          style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        />
        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,27,44,0.85)_0%,rgba(11,27,44,0.9)_45%,#0B1B2C_100%)]" />
      </div>
      <div aria-hidden="true" className="bp-grid-dark pointer-events-none absolute inset-0" />

      <div className={`${container} relative`}>
        <Reveal className="flex flex-wrap items-end justify-between gap-10 pb-14">
          <h2
            className="text-[clamp(2.8rem,7vw,6.6rem)] font-bold uppercase leading-[1] tracking-[-0.015em]"
            style={headingFont}
          >
            {title?.[0]}
            <br />
            {title?.[1]}
            <span className="text-safety"> ?</span>
          </h2>
          <div className="flex flex-wrap gap-3.5">
            <a href={EMAIL_HREF} className={btnPrimaryDark}>
              {t('cta.defaultLabel')} <span aria-hidden="true">→</span>
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center gap-3 border border-[#3BD16F] bg-[#25D366] px-6 font-mono text-[13px] font-semibold uppercase tracking-[0.1em] text-night transition-colors hover:bg-snow"
            >
              WhatsApp
            </a>
          </div>
        </Reveal>

        <DimLine tone="dark" label={t('home.contactEyebrow')?.replace(/^\d{2}\s*—\s*/, '')} />

        <div className="grid gap-16 py-20 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
          <Reveal>
            <Eyebrow tone="dark">{t('home.contactEyebrow')}</Eyebrow>
            <h3
              className="mb-8 text-[clamp(2rem,3.4vw,3rem)] font-bold uppercase leading-[1.04]"
              style={headingFont}
            >
              {subtitle?.[0]}
              <br />
              {subtitle?.[1]}
              <Mark />
            </h3>

            {/* Coordonnées en tableau, comme une nomenclature. */}
            <dl className="grid grid-cols-[auto_1fr] border-l border-t border-nightrule text-[15px] leading-[1.7]">
              <dt className="border-b border-r border-nightrule px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-brandlt">
                {t('bp.address')}
              </dt>
              <dd className="border-b border-r border-nightrule px-4 py-3 text-fog">
                <span className="text-snow">MCCT INDUSTRIE</span>
                <br />
                {t('common.addressLine1')} {t('common.addressLine2')}
                <br />
                {t('common.addressCity')}
              </dd>
              <dt className="border-b border-r border-nightrule px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-brandlt">
                {t('contact.form.phone')}
              </dt>
              <dd className="border-b border-r border-nightrule px-4 py-3">
                <a href={PHONE_HREF} className="text-snow hover:text-safety">
                  {PHONE}
                </a>
              </dd>
              <dt className="border-b border-r border-nightrule px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-brandlt">
                {t('contact.form.email')}
              </dt>
              <dd className="min-w-0 border-b border-r border-nightrule px-4 py-3">
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

            {brochureUrl ? (
              <a
                href={brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-3.5 border border-nightrule p-4 font-mono text-[12px] uppercase tracking-[0.1em] text-snow transition-colors hover:border-safety"
              >
                <span aria-hidden="true" className="h-10 w-8 shrink-0 border-l-[3px] border-safety bg-night2" />
                <span>
                  {brochure?.[0]}
                  <br />
                  {brochure?.[1]}
                </span>
              </a>
            ) : null}
          </Reveal>

          <Reveal>
            <McctContactForm rows={5} />
          </Reveal>
        </div>
      </div>

      <div className="relative">
        <TitleBlock sheet="01" />
      </div>
    </section>
  );
};

export default HomeContact;
