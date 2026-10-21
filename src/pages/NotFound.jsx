import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/ui/PageMeta';
import SiteHeader from '../components/ui/SiteHeader';
import SiteCTA from '../components/ui/SiteCTA';
import WhatsAppFab from '../components/ui/WhatsAppFab';
import { useI18n } from '../i18n/LanguageProvider';
import { ArrowRight } from 'lucide-react';
import { bodyFont, container, navLinks } from '../components/ui/mcctTheme';
import { Eyebrow, PageHero, card } from '../components/ui/Corporate';
import { img } from '../data/gallery';

const NotFound = () => {
  const { t } = useI18n();
  const title = t('notFound.title');

  const rows = [{ key: 'home', to: '/' }, ...(navLinks || [])];

  return (
    <div className="min-h-screen bg-white text-navy antialiased" style={bodyFont}>
      <PageMeta title={t('meta.notFound.title')} description={t('meta.notFound.description')} />

      <WhatsAppFab />
      <SiteHeader />

      <PageHero
        eyebrow={t('notFound.eyebrow')}
        title={title}
        text={t('notFound.text')}
        image={img('IMG_7873')}
        imageAlt={t('notFound.heroAlt')}
        crumb={t('notFound.eyebrow')}
      />

      <section className="py-20">
        <div className={container}>
          <Eyebrow>{t('notFound.where')}</Eyebrow>
          <nav aria-label={t('notFound.pagesNav')} className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
            {rows?.map((link) => (
              <Link
                key={link?.to}
                to={link?.to}
                className={`${card} group flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:border-brand`}
              >
                <span className="font-display text-[19px] font-bold text-navy">{t(`nav.${link?.key}`)}</span>
                <ArrowRight aria-hidden="true" className="h-5 w-5 text-brand transition-transform duration-300 group-hover:translate-x-1" />
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
