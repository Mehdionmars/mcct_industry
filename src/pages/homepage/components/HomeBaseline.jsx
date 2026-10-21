import React from 'react';
import Reveal from '../../../components/ui/Reveal';
import { useI18n } from '../../../i18n/LanguageProvider';
import { headingFont, container } from '../../../components/ui/mcctTheme';
import { Eyebrow, Mark } from '../../../components/ui/Blueprint';
import { getBaseline } from '../../../data/mcct';

/**
 * Bandeau de promesse de marque (EXCELLENCE — RAPIDITÉ — SATISFACTION),
 * repris de la couverture de la brochure MCCT.
 */
const HomeBaseline = () => {
  const { lang, t } = useI18n();
  const baseline = getBaseline(lang);

  return (
    <section aria-label={t('home.baselineEyebrow')} className="bp-grid-dark bg-night py-[80px] text-snow">
      <div className={container}>
        <Reveal>
          <Eyebrow tone="dark">{t('home.baselineEyebrow')}</Eyebrow>
        </Reveal>

        <ul className="grid list-none border-l border-t border-nightrule [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
          {baseline?.map((item, index) => (
            <Reveal as="li" key={item?.key} delay={index * 90} className="border-b border-r border-nightrule p-7 min-[900px]:p-9">
              <p className="mb-8 font-mono text-[11.5px] tracking-[0.16em] text-brandlt">B-{String(index + 1)?.padStart(2, '0')}</p>
              <p
                className="text-[clamp(2rem,3.4vw,3rem)] font-bold uppercase leading-none tracking-[-0.01em]"
                style={headingFont}
              >
                {item?.title}
                <Mark />
              </p>
              <p className="mt-4 max-w-[340px] text-[15px] leading-[1.65] text-fog">{item?.desc}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HomeBaseline;
