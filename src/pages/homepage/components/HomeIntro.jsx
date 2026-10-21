import React from 'react';
import Reveal from '../../../components/ui/Reveal';
import { useI18n } from '../../../i18n/LanguageProvider';
import { container } from '../../../components/ui/mcctTheme';
import { Eyebrow, SectionTitle } from '../../../components/ui/Corporate';
import { img } from '../../../data/gallery';

const HomeIntro = () => {
  const { t } = useI18n();
  const title = t('home.introTitle');

  return (
  <section id="apropos" className="bg-white py-24">
    <div className={container}>
      <div className="grid items-center gap-14 min-[1000px]:grid-cols-2">
        <Reveal className="relative min-w-0">
          <div className="overflow-hidden rounded-3xl shadow-[0_30px_70px_-30px_rgba(15,42,71,0.4)]">
            <img
              src={img('IMG_7864')}
              alt={t('home.introImageAlt')}
              loading="lazy"
              className="block h-[clamp(320px,50vh,520px)] w-full object-cover transition-transform [transition-duration:800ms] hover:scale-[1.03]"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-5 -right-5 -z-10 hidden h-40 w-40 rounded-3xl bg-sky min-[1000px]:block"
          />
        </Reveal>
        <Reveal className="min-w-0">
          <Eyebrow>{t('home.introEyebrow')}</Eyebrow>
          <SectionTitle title={title} accentLast />
          <p className="mt-6 text-[17px] leading-[1.75] text-copy">{t('home.introP1')}</p>
          <p className="mt-4 text-[17px] leading-[1.75] text-copy">{t('home.introP2')}</p>
          <a
            href="#savoirfaire"
            className="mt-7 inline-flex items-center gap-2 text-[15.5px] font-semibold text-brand transition-colors hover:text-navy"
          >
            {t('home.introLink')} <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>

    </div>
    </section>
  );
};

export default HomeIntro;
