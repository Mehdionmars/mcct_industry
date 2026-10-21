import React from 'react';
import Reveal from '../../../components/ui/Reveal';
import { useI18n } from '../../../i18n/LanguageProvider';
import { headingFont, container } from '../../../components/ui/mcctTheme';
import { Eyebrow, Mark } from '../../../components/ui/Blueprint';

const QualitySection = () => {
  const { t } = useI18n();
  const title = t('home.qualityTitle');
  const points = t('home.qualityPoints');

  return (
  <section id="qualite" className="bp-grid bg-paper py-[110px] text-ink">
    <div className={container}>
      <Reveal>
        <Eyebrow>{t('home.qualityEyebrow')}</Eyebrow>
        <h2
          className="text-[clamp(2.8rem,10vw,148px)] font-bold uppercase leading-[0.98] tracking-[-0.015em]"
          style={headingFont}
        >
          {title?.[0]}
          <br />
          <span className="text-brand">{title?.[1]}</span>
          <Mark />
        </h2>
      </Reveal>

      <Reveal className="mt-12 max-w-[640px] border-l-4 border-safety pl-6">
        <p className="text-[17px] leading-[1.7] text-ink2">{t('home.qualityText')}</p>
      </Reveal>

      {/* Points de contrôle, présentés comme une liste de vérification. */}
      <ul className="mt-14 grid list-none border-l border-t border-ink [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
        {points?.map((point, index) => (
          <Reveal
            as="li"
            key={point?.label}
            delay={index * 80}
            className="border-b border-r border-ink bg-paper px-[26px] pb-9 pt-6 transition-colors duration-300 hover:bg-white"
          >
            <div className="mb-8 flex items-center justify-between font-mono text-[11.5px] tracking-[0.14em] text-steel">
              <span>Q-{String(index + 1)?.padStart(2, '0')}</span>
              <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center border border-ink text-[13px] text-brand">
                ✓
              </span>
            </div>
            <p className="text-[20px] font-bold uppercase leading-[1.1]" style={headingFont}>
              {point?.label}
            </p>
            <p className="mt-2.5 text-[14px] leading-[1.55] text-ink2">{point?.text}</p>
          </Reveal>
        ))}
      </ul>
    </div>
    </section>
  );
};

export default QualitySection;
