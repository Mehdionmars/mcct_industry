import React from 'react';
import Reveal from '../../../components/ui/Reveal';
import { useI18n } from '../../../i18n/LanguageProvider';
import { ACCENT, headingFont, container } from '../../../components/ui/mcctTheme';
import { img } from '../../../data/gallery';

const HomeIntro = () => {
  const { t } = useI18n();
  const title = t('home.introTitle');

  return (
  <section id="apropos" className="bg-[#F5F5F2] pb-[120px] pt-[120px]">
    <div className={container}>
      <div className="grid items-start gap-14 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
        <Reveal>
          <p className="mb-[18px] text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
            {t('home.introEyebrow')}
          </p>
          <h2
            className="text-[clamp(2.4rem,4.6vw,4.4rem)] font-extrabold leading-none tracking-[-0.03em]"
            style={headingFont}
          >
            {title?.[0]}
            <br />
            {title?.[1]}
            <span style={{ color: ACCENT }}>.</span>
          </h2>
        </Reveal>
        <Reveal className="max-w-[520px] pt-3">
          <p className="mb-5 text-[17px] leading-[1.7] text-[#3a3f45]">
            {t('home.introP1')}
          </p>
          <p className="mb-8 text-[17px] leading-[1.7] text-[#3a3f45]">
            {t('home.introP2')}
          </p>
          <a
            href="#savoirfaire"
            className="inline-flex items-center gap-2.5 border-b-2 border-[#2478BE] pb-2 text-[12.5px] font-extrabold tracking-[0.16em] text-[#17191C] transition-colors hover:text-[#2478BE]"
          >
            {t('home.introLink')} <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </div>

    <Reveal className={`${container} mt-[72px]`}>
      <div className="overflow-hidden">
        <img
          src={img('IMG_7864')}
          alt={t('home.introImageAlt')}
          loading="lazy"
          className="block h-[clamp(320px,55vh,620px)] w-full object-cover transition-transform [transition-duration:800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
        />
      </div>
    </Reveal>

    </section>
  );
};

export default HomeIntro;
