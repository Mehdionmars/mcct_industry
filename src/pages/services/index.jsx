import React from 'react';
import PageMeta from '../../components/ui/PageMeta';
import SiteHeader from '../../components/ui/SiteHeader';
import SiteCTA from '../../components/ui/SiteCTA';
import WhatsAppFab from '../../components/ui/WhatsAppFab';
import Reveal from '../../components/ui/Reveal';
import { useI18n } from '../../i18n/LanguageProvider';
import { bodyFont, headingFont, container } from '../../components/ui/mcctTheme';
import { Eyebrow, Figure, Mark, PageHero } from '../../components/ui/Blueprint';
import { getActivities } from '../../data/mcct';
import { img } from '../../data/gallery';

const ActivitySection = ({ activity, index }) => {
  const isDark = index % 2 === 1;
  const tone = isDark ? 'dark' : 'light';

  return (
    <section
      className={`py-[100px] ${isDark ? 'bp-grid-dark bg-night text-snow' : 'bg-paper text-ink'}`}
      aria-labelledby={`activite-${activity?.num}`}
    >
      <div className={`${container} grid items-center gap-14 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]`}>
        <Reveal className={isDark ? 'min-[900px]:order-2' : undefined}>
          <Eyebrow tone={tone}>{`${activity?.num} — ${activity?.title?.toUpperCase()}`}</Eyebrow>
          <h2
            id={`activite-${activity?.num}`}
            className="mb-6 text-[clamp(2.2rem,4vw,3.6rem)] font-bold uppercase leading-[1.02] tracking-[-0.01em]"
            style={headingFont}
          >
            {activity?.title}
            <Mark />
          </h2>
          <p className={`mb-8 text-[16.5px] leading-[1.7] ${isDark ? 'text-snow/85' : 'text-ink2'}`}>
            {activity?.description}
          </p>
          {activity?.bullets?.length ? (
            <ul className={`mb-8 list-none border-t ${isDark ? 'border-nightrule' : 'border-ink/20'}`}>
              {activity?.bullets?.map((bullet, i) => (
                <li
                  key={bullet}
                  className={`flex gap-4 border-b py-3 ${isDark ? 'border-nightrule' : 'border-ink/20'}`}
                >
                  <span className={`shrink-0 pt-0.5 font-mono text-[11.5px] tracking-[0.12em] ${isDark ? 'text-brandlt' : 'text-brand'}`}>
                    {String(i + 1)?.padStart(2, '0')}
                  </span>
                  <span className={`text-[15.5px] leading-[1.6] ${isDark ? 'text-snow/90' : 'text-ink2'}`}>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {activity?.tags?.map((tag) => (
              <span
                key={tag}
                className={`border px-3 py-2 font-mono text-[11.5px] font-medium uppercase tracking-[0.1em] ${
                  isDark ? 'border-nightrule text-fog' : 'border-ink/40 text-steel'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <Figure
            src={activity?.src}
            alt={activity?.title}
            tone={tone}
            fig={`A-${activity?.num}`}
            caption={activity?.title}
            frameClassName="h-[420px]"
            imgClassName="h-full w-full object-cover transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
          />
        </Reveal>
      </div>
    </section>
  );
};

const Activites = () => {
  const { lang, t } = useI18n();
  const activities = getActivities(lang);
  const title = t('services.title');

  return (
  <div className="min-h-screen bg-paper text-ink antialiased" style={bodyFont}>
    <PageMeta title={t('meta.services.title')} description={t('meta.services.description')} />

    <WhatsAppFab />
    <SiteHeader />

    <PageHero
      eyebrow={t('services.eyebrow')}
      title={title}
      image={img('IMG_7905')}
      imageAlt={t('services.heroAlt')}
      fig="01"
      sheet="03"
    />

    {activities?.map((activity, index) => (
      <ActivitySection key={activity?.num} activity={activity} index={index} />
    ))}

    <SiteCTA titleKey="cta.expertise" ctaKey="cta.quote" sheet="03" />
  </div>
  );
};

export default Activites;
