import React from 'react';
import PageMeta from '../../components/ui/PageMeta';
import SiteHeader from '../../components/ui/SiteHeader';
import SiteCTA from '../../components/ui/SiteCTA';
import WhatsAppFab from '../../components/ui/WhatsAppFab';
import Reveal from '../../components/ui/Reveal';
import { useI18n, localize } from '../../i18n/LanguageProvider';
import { ACCENT, bodyFont, headingFont, container } from '../../components/ui/mcctTheme';
import { signatureQuote } from '../../data/mcct';
import { img } from '../../data/gallery';

const About = () => {
  const { lang, t } = useI18n();
  const title = t('about.title');
  const pillars = t('about.pillars');
  const signature = localize(signatureQuote, lang);

  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#17191C] antialiased" style={bodyFont}>
      <PageMeta title={t('meta.about.title')} description={t('meta.about.description')} />

      <WhatsAppFab />
      <SiteHeader />

      <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-[#0D0F10]">
        <img src={img('IMG_7940')} alt={t('about.heroAlt')} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,15,16,0.4),rgba(13,15,16,0.85))]" />
        <div className={`${container} relative pb-16 pt-[140px] text-white`}>
          <p className="mb-4 text-[13px] font-extrabold tracking-[0.26em] text-[#cfd6dc]">{t('about.eyebrow')}</p>
          <h1
            className="text-[clamp(2.6rem,6vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.02em]"
            style={headingFont}
          >
            {title?.[0]}
            <br />
            {title?.[1]}
            <br />
            {title?.[2]}
            <span style={{ color: ACCENT }}>.</span>
          </h1>
        </div>
      </section>

      <section className="py-[110px]">
        <div className={`${container} grid items-start gap-14 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]`}>
          <Reveal>
            <p className="mb-[18px] text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
              {t('about.whoEyebrow')}
            </p>
            <h2
              className="text-[clamp(2.2rem,4.2vw,3.8rem)] font-bold leading-none tracking-[-0.02em]"
              style={headingFont}
            >
              {t('about.whoTitle')}
              <span style={{ color: ACCENT }}>.</span>
            </h2>
          </Reveal>
          <Reveal className="max-w-[520px] pt-3">
            <p className="mb-5 text-[17px] leading-[1.7] text-[#3a3f45]">{t('about.p1')}</p>
            <p className="mb-5 text-[17px] leading-[1.7] text-[#3a3f45]">{t('about.p2')}</p>
            <p className="text-[17px] leading-[1.7] text-[#3a3f45]">{t('about.p3')}</p>
          </Reveal>
        </div>

        <Reveal className={`${container} mt-16 border-t border-[#d7d7d2] pt-12`}>
          <blockquote
            className="max-w-[900px] text-[clamp(1.35rem,3vw,2.3rem)] font-medium leading-[1.35] tracking-[-0.02em] text-[#17191C]"
            style={headingFont}
          >
            <span style={{ color: ACCENT }}>«&nbsp;</span>
            {signature}
            <span style={{ color: ACCENT }}>&nbsp;»</span>
          </blockquote>
          <p className="mt-6 text-[12px] font-bold tracking-[0.22em] text-[#8a9096]">{t('about.signatureLabel')}</p>
        </Reveal>
      </section>

      <section className="bg-[#0D0F10] py-[110px] text-white">
        <div className={`${container} grid gap-12 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]`}>
          {pillars?.map((pillar) => (
            <Reveal key={pillar?.label} className="border-t-[3px] border-[#2478BE] pt-7">
              <p className="mb-3.5 text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
                {pillar?.label}
              </p>
              <p className="text-[19px] leading-[1.6] text-[#d8dde1]">{pillar?.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-[110px]">
        <div className={`${container} grid gap-6 min-[900px]:[grid-template-columns:2fr_1fr]`}>
          <Reveal className="overflow-hidden">
            <img
              src={img('IMG_7909')}
              alt={t('about.imageAlt1')}
              loading="lazy"
              className="block h-[420px] w-full object-cover transition-transform [transition-duration:600ms] hover:scale-[1.04]"
            />
          </Reveal>
          <Reveal className="overflow-hidden">
            <img
              src={img('IMG_7944')}
              alt={t('about.imageAlt2')}
              loading="lazy"
              className="block h-[420px] w-full object-cover object-left transition-transform [transition-duration:600ms] hover:scale-[1.04]"
            />
          </Reveal>
        </div>
      </section>

      <SiteCTA />
    </div>
  );
};

export default About;
