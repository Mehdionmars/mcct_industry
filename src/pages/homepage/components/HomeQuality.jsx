import React from 'react';
import Reveal from '../../../components/ui/Reveal';
import { useI18n } from '../../../i18n/LanguageProvider';
import { ClipboardCheck, FileCheck, HardHat, ScanSearch } from 'lucide-react';
import { container } from '../../../components/ui/mcctTheme';
import { Eyebrow, SectionTitle, card } from '../../../components/ui/Corporate';

const QualitySection = () => {
  const { t } = useI18n();
  const title = t('home.qualityTitle');
  const points = t('home.qualityPoints');

  const icons = [FileCheck, HardHat, ClipboardCheck, ScanSearch];

  return (
  <section id="qualite" className="bg-mist py-24">
    <div className={`${container} grid gap-14 min-[1000px]:grid-cols-[1fr_1.2fr] min-[1000px]:items-center`}>
      <Reveal>
        <Eyebrow>{t('home.qualityEyebrow')}</Eyebrow>
        <SectionTitle title={title} accentLast />
        <p className="mt-6 max-w-[520px] text-[17px] leading-[1.75] text-copy">{t('home.qualityText')}</p>
      </Reveal>

      <ul className="grid list-none gap-5 min-[600px]:grid-cols-2">
        {points?.map((point, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Reveal as="li" key={point?.label} delay={index * 80} className={`${card} p-7`}>
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sky text-brand">
                <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <p className="font-display text-[18.5px] font-bold text-navy">{point?.label}</p>
              <p className="mt-2 text-[15px] leading-[1.6] text-copy">{point?.text}</p>
            </Reveal>
          );
        })}
      </ul>
    </div>
    </section>
  );
};

export default QualitySection;
