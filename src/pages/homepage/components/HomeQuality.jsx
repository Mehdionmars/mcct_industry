import React from 'react';
import Reveal from '../../../components/ui/Reveal';
import { useI18n } from '../../../i18n/LanguageProvider';
import { ACCENT, headingFont, container } from '../../../components/ui/mcctTheme';

const QualitySection = () => {
  const { t } = useI18n();
  const title = t('home.qualityTitle');
  const points = t('home.qualityPoints');

  return (
  <section id="qualite" className="bg-[#F5F5F2] py-[120px]">
    <div className={container}>
      <Reveal>
        <p className="mb-[18px] text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
          {t('home.qualityEyebrow')}
        </p>
        <h2
          className="text-[clamp(2.4rem,9vw,122px)] font-extrabold leading-none tracking-[-0.03em]"
          style={headingFont}
        >
          {title?.[0]}
          <br />
          {title?.[1]}
          <span style={{ color: ACCENT }}>.</span>
        </h2>
      </Reveal>

      <Reveal className="mt-14 max-w-[620px]">
        <p className="text-[17px] leading-[1.7] text-[#3a3f45]">{t('home.qualityText')}</p>
      </Reveal>

      <ul className="mt-14 grid list-none gap-[2px] bg-[#d7d7d2] [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
        {points?.map((point, index) => (
          <Reveal
            as="li"
            key={point?.label}
            delay={index * 80}
            className="bg-[#F5F5F2] px-[26px] pb-9 pt-7 transition-colors duration-300 hover:bg-white"
          >
            <span aria-hidden="true" className="mb-9 block h-[3px] w-10 bg-[#2478BE]" />
            <p className="text-[16px] font-extrabold tracking-[0.06em]">{point?.label}</p>
            <p className="mt-2.5 text-[13.5px] leading-[1.55] text-[#565e66]">{point?.text}</p>
          </Reveal>
        ))}
      </ul>
    </div>
    </section>
  );
};

export default QualitySection;
