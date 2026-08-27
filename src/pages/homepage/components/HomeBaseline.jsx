import React from 'react';
import Reveal from '../../../components/ui/Reveal';
import { useI18n } from '../../../i18n/LanguageProvider';
import { ACCENT, headingFont, container } from '../../../components/ui/mcctTheme';
import { getBaseline } from '../../../data/mcct';

/**
 * Bandeau de promesse de marque (EXCELLENCE — RAPIDITÉ — SATISFACTION),
 * repris de la couverture de la brochure MCCT.
 */
const HomeBaseline = () => {
  const { lang, t } = useI18n();
  const baseline = getBaseline(lang);

  return (
    <section aria-label={t('home.baselineEyebrow')} className="bg-[#0D0F10] py-[72px] text-white">
      <div className={container}>
        <Reveal as="p" className="mb-10 text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
          {t('home.baselineEyebrow')}
        </Reveal>

        <ul className="grid list-none gap-x-12 gap-y-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
          {baseline?.map((item, index) => (
            <Reveal as="li" key={item?.key} delay={index * 90} className="border-t-[3px] border-[#2478BE] pt-6">
              <p
                className="text-[clamp(1.7rem,3vw,2.6rem)] font-extrabold leading-none tracking-[-0.02em]"
                style={headingFont}
              >
                {item?.title}
                <span style={{ color: ACCENT }}>.</span>
              </p>
              <p className="mt-4 max-w-[340px] text-[15px] leading-[1.65] text-[#9aa2a9]">{item?.desc}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HomeBaseline;
