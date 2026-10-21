import React from 'react';
import { Eye, Gem, Quote, Target } from 'lucide-react';
import PageMeta from '../../components/ui/PageMeta';
import SiteHeader from '../../components/ui/SiteHeader';
import SiteCTA from '../../components/ui/SiteCTA';
import WhatsAppFab from '../../components/ui/WhatsAppFab';
import Reveal from '../../components/ui/Reveal';
import { useI18n, localize } from '../../i18n/LanguageProvider';
import { bodyFont, container } from '../../components/ui/mcctTheme';
import { Eyebrow, PageHero, SectionTitle, card } from '../../components/ui/Corporate';
import { signatureQuote } from '../../data/mcct';
import { img } from '../../data/gallery';

const pillarIcons = [Target, Eye, Gem];

const About = () => {
  const { lang, t } = useI18n();
  const title = t('about.title');
  const pillars = t('about.pillars');
  const signature = localize(signatureQuote, lang);

  return (
    <div className="min-h-screen bg-white text-navy antialiased" style={bodyFont}>
      <PageMeta title={t('meta.about.title')} description={t('meta.about.description')} />

      <WhatsAppFab />
      <SiteHeader />

      <PageHero
        eyebrow={t('about.eyebrow')}
        title={title}
        image={img('IMG_7940')}
        imageAlt={t('about.heroAlt')}
        crumb={t('nav.about')}
      />

      <section className="py-24">
        <div className={`${container} grid items-start gap-14 min-[1000px]:grid-cols-2`}>
          <Reveal className="min-w-0">
            <Eyebrow>{t('about.whoEyebrow')}</Eyebrow>
            <SectionTitle title={t('about.whoTitle')} />
          </Reveal>
          <Reveal className="min-w-0 min-[1000px]:pt-14">
            <p className="text-[17px] leading-[1.75] text-copy">{t('about.p1')}</p>
            <p className="mt-4 text-[17px] leading-[1.75] text-copy">{t('about.p2')}</p>
            <p className="mt-4 text-[17px] leading-[1.75] text-copy">{t('about.p3')}</p>
          </Reveal>
        </div>

        {/* Citation de la direction. */}
        <Reveal className={`${container} mt-16`}>
          <figure className="relative m-0 overflow-hidden rounded-3xl bg-mist px-8 py-12 min-[900px]:px-14">
            <Quote aria-hidden="true" className="mb-6 h-10 w-10 text-brand" fill="currentColor" strokeWidth={0} />
            <blockquote className="max-w-[900px] font-display text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-[1.35] tracking-[-0.01em] text-navy">
              {signature}
            </blockquote>
            <figcaption className="mt-6 text-[15px] font-semibold text-brand">{t('about.signatureLabel')}</figcaption>
          </figure>
        </Reveal>
      </section>

      <section className="bg-mist py-24">
        <ul className={`${container} grid list-none gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]`}>
          {pillars?.map((pillar, index) => {
            const Icon = pillarIcons[index % pillarIcons.length];
            return (
              <Reveal as="li" key={pillar?.label} delay={index * 90} className={`${card} p-8`}>
                <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-sky text-brand">
                  <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <p className="font-display text-[22px] font-bold text-navy">{pillar?.label}</p>
                <p className="mt-3 text-[16px] leading-[1.7] text-copy">{pillar?.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </section>

      <section className="pt-24">
        <div className={`${container} grid grid-cols-1 gap-6 min-[900px]:[grid-template-columns:2fr_1fr]`}>
          <Reveal className="min-w-0 overflow-hidden rounded-3xl">
            <img
              src={img('IMG_7947')}
              alt={t('about.imageAlt1')}
              loading="lazy"
              className="block h-[420px] w-full object-cover transition-transform [transition-duration:600ms] hover:scale-[1.03]"
            />
          </Reveal>
          <Reveal className="min-w-0 overflow-hidden rounded-3xl">
            <img
              src={img('IMG_7912')}
              alt={t('about.imageAlt2')}
              loading="lazy"
              className="block h-[420px] w-full object-cover transition-transform [transition-duration:600ms] hover:scale-[1.03]"
            />
          </Reveal>
        </div>
      </section>

      <SiteCTA />
    </div>
  );
};

export default About;
