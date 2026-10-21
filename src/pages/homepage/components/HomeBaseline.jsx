import React from 'react';
import Reveal from '../../../components/ui/Reveal';
import { useI18n } from '../../../i18n/LanguageProvider';
import { Handshake, ShieldCheck, Timer } from 'lucide-react';
import { container } from '../../../components/ui/mcctTheme';
import { card } from '../../../components/ui/Corporate';
import { getBaseline } from '../../../data/mcct';

/**
 * Bandeau de promesse de marque (EXCELLENCE — RAPIDITÉ — SATISFACTION),
 * repris de la couverture de la brochure MCCT.
 */
const HomeBaseline = () => {
  const { lang, t } = useI18n();
  const baseline = getBaseline(lang);

  const icons = [ShieldCheck, Timer, Handshake];

  return (
    <section aria-label={t('home.baselineEyebrow')} className="bg-white pb-6 pt-24">
      <div className={container}>
        <ul className="grid list-none gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
          {baseline?.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Reveal as="li" key={item?.key} delay={index * 90} className={`${card} p-8`}>
                <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-sky text-brand">
                  <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <p className="font-display text-[22px] font-bold text-navy">{item?.title}</p>
                <p className="mt-2.5 text-[15.5px] leading-[1.65] text-copy">{item?.desc}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default HomeBaseline;
