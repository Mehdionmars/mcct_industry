import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/ui/PageMeta';
import SiteHeader from '../components/ui/SiteHeader';
import SiteCTA from '../components/ui/SiteCTA';
import WhatsAppFab from '../components/ui/WhatsAppFab';
import { useI18n } from '../i18n/LanguageProvider';
import { bodyFont, headingFont, container, navLinks } from '../components/ui/mcctTheme';
import { Eyebrow, PageHero } from '../components/ui/Blueprint';
import { img } from '../data/gallery';

const NotFound = () => {
  const { t } = useI18n();
  const title = t('notFound.title');

  const rows = [{ key: 'home', num: '00', to: '/' }, ...(navLinks || [])];

  return (
    <div className="min-h-screen bg-paper text-ink antialiased" style={bodyFont}>
      <PageMeta title={t('meta.notFound.title')} description={t('meta.notFound.description')} />

      <WhatsAppFab />
      <SiteHeader />

      <PageHero
        eyebrow={t('notFound.eyebrow')}
        title={title}
        text={t('notFound.text')}
        image={img('IMG_7873')}
        imageAlt={t('notFound.heroAlt')}
        fig="404"
      />

      <section className="py-[90px]">
        <div className={container}>
          <Eyebrow>{t('notFound.where')}</Eyebrow>
          {/* Renvois vers les pages du site, en lignes de nomenclature. */}
          <nav aria-label={t('notFound.pagesNav')} className="flex flex-col border-t border-ink">
            {rows?.map((link) => (
              <Link
                key={link?.to}
                to={link?.to}
                className="group flex items-center gap-7 border-b border-ink py-6 transition-colors duration-300 hover:bg-paper2"
              >
                <span className="w-10 shrink-0 font-mono text-[12px] tracking-[0.14em] text-brand">{link?.num}</span>
                <span
                  className="text-[clamp(1.8rem,3.6vw,3rem)] font-bold uppercase leading-none"
                  style={headingFont}
                >
                  {t(`nav.${link?.key}`)}
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto pr-2 font-mono text-[22px] text-ink transition-transform duration-300 group-hover:translate-x-2"
                >
                  →
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <SiteCTA titleKey="cta.info" ctaKey="cta.writeUs" sheet={null} />
    </div>
  );
};

export default NotFound;
