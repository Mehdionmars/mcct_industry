import React from 'react';
import PageMeta from '../../components/ui/PageMeta';
import SiteHeader from '../../components/ui/SiteHeader';
import SiteCTA from '../../components/ui/SiteCTA';
import WhatsAppFab from '../../components/ui/WhatsAppFab';
import Reveal from '../../components/ui/Reveal';
import { useI18n, localize } from '../../i18n/LanguageProvider';
import { bodyFont, headingFont, container } from '../../components/ui/mcctTheme';
import { Eyebrow, Figure, Mark, PageHero } from '../../components/ui/Blueprint';
import { signatureQuote } from '../../data/mcct';
import { img } from '../../data/gallery';

const About = () => {
  const { lang, t } = useI18n();
  const title = t('about.title');
  const pillars = t('about.pillars');
  const signature = localize(signatureQuote, lang);

  return (
    <div className="min-h-screen bg-paper text-ink antialiased" style={bodyFont}>
      <PageMeta title={t('meta.about.title')} description={t('meta.about.description')} />

      <WhatsAppFab />
      <SiteHeader />

      <PageHero
        eyebrow={t('about.eyebrow')}
        title={title}
        image={img('IMG_7940')}
        imageAlt={t('about.heroAlt')}
        fig="01"
        sheet="02"
      />

      <section className="py-[110px]">
        <div className={`${container} grid items-start gap-14 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]`}>
          <Reveal>
            <Eyebrow>{t('about.whoEyebrow')}</Eyebrow>
            <h2
              className="text-[clamp(2.4rem,4.6vw,4.2rem)] font-bold uppercase leading-[1.02] tracking-[-0.01em]"
              style={headingFont}
            >
              {t('about.whoTitle')}
              <Mark />
            </h2>
          </Reveal>
          <Reveal className="max-w-[540px] border-l border-ink/20 pl-7 min-[900px]:mt-12">
            <p className="mb-5 text-[17px] leading-[1.7] text-ink2">{t('about.p1')}</p>
            <p className="mb-5 text-[17px] leading-[1.7] text-ink2">{t('about.p2')}</p>
            <p className="text-[17px] leading-[1.7] text-ink2">{t('about.p3')}</p>
          </Reveal>
        </div>

        {/* Citation de la direction, encadrée comme une note de plan. */}
        <Reveal className={`${container} mt-16`}>
          <div className="relative border border-ink bg-paper2 p-8 min-[900px]:p-12">
            <span className="absolute -top-3 left-8 bg-safety px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-ink">
              NOTE
            </span>
            <blockquote
              className="max-w-[920px] text-[clamp(1.4rem,3vw,2.3rem)] font-medium leading-[1.3] tracking-[-0.01em] text-ink"
              style={headingFont}
            >
              <span className="text-brand">«&nbsp;</span>
              {signature}
              <span className="text-brand">&nbsp;»</span>
            </blockquote>
            <p className="mt-6 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-steel">
              — {t('about.signatureLabel')}
            </p>
          </div>
        </Reveal>
      </section>

      <section className="bp-grid-dark bg-night py-[110px] text-snow">
        <div className={container}>
        <div className="grid border-l border-t border-nightrule [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
          {pillars?.map((pillar, index) => (
            <Reveal key={pillar?.label} className="border-b border-r border-nightrule p-8 min-[900px]:p-10">
              <p className="mb-8 flex items-center justify-between font-mono text-[12px] uppercase tracking-[0.16em] text-brandlt">
                <span>{pillar?.label}</span>
                <span className="text-fog">0{index + 1}</span>
              </p>
              <p className="text-[19px] leading-[1.6] text-snow/90">{pillar?.text}</p>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      <section className="py-[110px]">
        <div className={`${container} grid grid-cols-1 gap-10 min-[900px]:[grid-template-columns:2fr_1fr]`}>
          <Reveal>
            <Figure
              src={img('IMG_7947')}
              alt={t('about.imageAlt1')}
              fig="02"
              caption={t('about.imageAlt1')}
              frameClassName="h-[420px]"
              imgClassName="h-full w-full object-cover transition-transform [transition-duration:600ms] hover:scale-[1.04]"
            />
          </Reveal>
          <Reveal>
            <Figure
              src={img('IMG_7912')}
              alt={t('about.imageAlt2')}
              fig="03"
              frameClassName="h-[420px]"
              imgClassName="h-full w-full object-cover transition-transform [transition-duration:600ms] hover:scale-[1.04]"
            />
          </Reveal>
        </div>
      </section>

      <SiteCTA sheet="02" />
    </div>
  );
};

export default About;
