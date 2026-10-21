import React from 'react';
import PageMeta from '../../components/ui/PageMeta';
import SiteHeader from '../../components/ui/SiteHeader';
import SiteCTA from '../../components/ui/SiteCTA';
import WhatsAppFab from '../../components/ui/WhatsAppFab';
import Reveal from '../../components/ui/Reveal';
import { useI18n } from '../../i18n/LanguageProvider';
import { CircleCheck } from 'lucide-react';
import { bodyFont, container } from '../../components/ui/mcctTheme';
import { Eyebrow, PageHero, SectionTitle } from '../../components/ui/Corporate';
import { getActivities } from '../../data/mcct';
import { img } from '../../data/gallery';

const ActivitySection = ({ activity, index }) => {
  const { t } = useI18n();
  const isAlt = index % 2 === 1;

  return (
    <section className={`py-24 ${isAlt ? 'bg-mist' : 'bg-white'}`} aria-labelledby={`activite-${activity?.num}`}>
      <div className={`${container} grid items-center gap-14 min-[1000px]:grid-cols-2`}>
        <Reveal className={`min-w-0 ${isAlt ? 'min-[1000px]:order-2' : ''}`}>
          <Eyebrow>{`${t('nav.services')} · ${activity?.num}`}</Eyebrow>
          <SectionTitle id={`activite-${activity?.num}`} title={activity?.title} className="mb-5" />
          <p className="mb-7 text-[17px] leading-[1.75] text-copy">{activity?.description}</p>
          {activity?.bullets?.length ? (
            <ul className="mb-8 grid list-none gap-3">
              {activity?.bullets?.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <CircleCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={2} />
                  <span className="text-[16px] leading-[1.6] text-navy">{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {activity?.tags?.map((tag) => (
              <span key={tag} className="rounded-full bg-sky px-3.5 py-1.5 text-[13.5px] font-semibold text-brand">
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal className="min-w-0 overflow-hidden rounded-3xl shadow-[0_30px_70px_-30px_rgba(15,42,71,0.4)]">
          <img
            src={activity?.src}
            alt={activity?.title}
            loading="lazy"
            className="block h-[clamp(300px,46vh,460px)] w-full object-cover transition-transform [transition-duration:600ms] hover:scale-[1.03]"
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
  <div className="min-h-screen bg-white text-navy antialiased" style={bodyFont}>
    <PageMeta title={t('meta.services.title')} description={t('meta.services.description')} />

    <WhatsAppFab />
    <SiteHeader />

    <PageHero
      eyebrow={t('services.eyebrow')}
      title={title}
      text={t('home.activitiesText')}
      image={img('IMG_7905')}
      imageAlt={t('services.heroAlt')}
      crumb={t('nav.services')}
    />

    {activities?.map((activity, index) => (
      <ActivitySection key={activity?.num} activity={activity} index={index} />
    ))}

    <SiteCTA titleKey="cta.expertise" ctaKey="cta.quote" />
  </div>
  );
};

export default Activites;
