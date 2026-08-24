import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../../../components/ui/Reveal';
import McctContactForm from '../../../components/ui/McctContactForm';
import { brochureUrl } from '../../../data/mcct';
import { useI18n } from '../../../i18n/LanguageProvider';
import {
  ACCENT,
  headingFont,
  container,
  navLinks,
  EMAIL,
  EMAIL_HREF,
  PHONE,
  PHONE_HREF,
  WHATSAPP_HREF
} from '../../../components/ui/mcctTheme';

const HomeContact = () => {
  const { t } = useI18n();
  const title = t('home.contactTitle');
  const subtitle = t('home.contactSubtitle');
  const brochure = t('home.brochureCta');

  return (
  <section id="contact" className="bg-[#111315] pt-[130px] text-white">
    <div className={container}>
      <Reveal className="flex flex-wrap items-end justify-between gap-10 border-b border-[#23272b] pb-[90px]">
        <h2
          className="text-[clamp(2.6rem,6vw,6rem)] font-extrabold leading-[0.98] tracking-[-0.03em]"
          style={headingFont}
        >
          {title?.[0]}
          <br />
          {title?.[1]}
          <span style={{ color: ACCENT }}> ?</span>
        </h2>
        <div className="flex flex-wrap gap-3.5">
          <a
            href={EMAIL_HREF}
            className="relative inline-flex shrink-0 items-center gap-3.5 overflow-hidden whitespace-nowrap bg-[#2478BE] px-[34px] py-5 text-[13px] font-extrabold tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#17191C]"
          >
            {t('cta.defaultLabel')} <span aria-hidden="true">→</span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 h-full w-[45%] animate-mcct-shine bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.45),transparent)]"
            />
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] px-[34px] py-5 text-[13px] font-extrabold tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#17191C]"
          >
            WHATSAPP
          </a>
        </div>
      </Reveal>

      <div className="grid gap-16 border-b border-[#23272b] py-20 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
        <Reveal>
          <p className="mb-[18px] text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
            {t('home.contactEyebrow')}
          </p>
          <h3
            className="mb-7 text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.05] tracking-[-0.02em]"
            style={headingFont}
          >
            {subtitle?.[0]}
            <br />
            {subtitle?.[1]}
            <span style={{ color: ACCENT }}>.</span>
          </h3>
          <div className="text-[15px] leading-[2] text-[#9aa2a9]">
            <p className="font-extrabold tracking-[0.1em] text-white">MCCT INDUSTRIE</p>
            <p className="mt-2.5">
              {t('common.addressLine1')}
              <br />
              {t('common.addressLine2')}
              <br />
              {t('common.addressCity')}
            </p>
            <p className="mt-3.5">
              <a href={PHONE_HREF} className="text-[#c4cad0] hover:text-[#2478BE]">
                {PHONE}
              </a>
            </p>
            <p>
              <a href={EMAIL_HREF} className="text-[#c4cad0] hover:text-[#2478BE]">
                {EMAIL}
              </a>
            </p>
            <p className="mt-3.5">
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
        </Reveal>

        <Reveal>
          <McctContactForm rows={5} longNote />
        </Reveal>
      </div>

      <footer className="grid gap-10 py-16 [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
        <div>
          <img
            src="/logo1.png"
            alt="MCCT Industrie"
            className="mb-[18px] block h-11 w-auto brightness-0 invert"
          />
          <p className="text-[14px] leading-[1.65] text-[#9aa2a9]">
            {t('home.footerTagline')}
          </p>
        </div>

        <nav aria-label="Pied de page" className="flex flex-col gap-3 text-[13px] font-bold tracking-[0.12em]">
          {navLinks?.map((link) => (
            <Link key={link?.to} to={link?.to} className="text-[#c4cad0] hover:text-[#2478BE]">
              {t(`nav.${link?.key}`)}
            </Link>
          ))}
        </nav>

        {brochureUrl ? (
          <div>
            <p className="mb-4 text-[13px] font-extrabold tracking-[0.14em] text-white">{t('home.brochure')}</p>
            <a
              href={brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 border border-[#23272b] p-4 transition-colors duration-300 hover:border-[#2478BE] hover:bg-[#16191c]"
            >
              <span
                aria-hidden="true"
                className="h-12 w-[38px] shrink-0 border-l-[3px] border-[#2478BE] bg-[linear-gradient(150deg,#2c3136,#1a1d20)] shadow-[3px_3px_0_rgba(0,0,0,0.35)]"
              />
              <span className="text-[12.5px] font-bold leading-[1.5] tracking-[0.12em] text-[#c4cad0]">
                {brochure?.[0]}
                <br />
                {brochure?.[1]}
              </span>
            </a>
          </div>
        ) : null}

        <div className="text-[14px] leading-[2] text-[#9aa2a9]">
          <p className="font-extrabold tracking-[0.14em] text-white">{t('common.cityLine')}</p>
          <p className="mt-2">
            {t('common.addressLine1')}
            <br />
            {t('common.addressLine2')}
            <br />
            {t('common.addressCity')}
          </p>
          <p className="mt-2">
            <a href={PHONE_HREF} className="text-[#c4cad0] hover:text-[#2478BE]">
              {PHONE}
            </a>
          </p>
          <p>
            <a href={EMAIL_HREF} className="text-[#c4cad0] hover:text-[#2478BE]">
              {EMAIL}
            </a>
          </p>
          <p className="mt-2">
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="text-[#25D366]">
              WhatsApp
            </a>
          </p>
        </div>
      </footer>

      <div className="flex flex-wrap justify-between gap-4 border-t border-[#23272b] pb-[34px] pt-[22px] text-[12px] tracking-[0.08em] text-[#565e66]">
        <span>{t('common.copyrightAll')}</span>
        <span>{t('common.legal')}</span>
      </div>
    </div>
    </section>
  );
};

export default HomeContact;
