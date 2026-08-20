import React, { useEffect, useRef, useState } from 'react';
import Reveal from '../../../components/ui/Reveal';
import { useI18n } from '../../../i18n/LanguageProvider';
import { ACCENT, headingFont, container } from '../../../components/ui/mcctTheme';
import { getKeyFigures } from '../../../data/mcct';
import { img } from '../../../data/gallery';

/** Compteur animé au moment où le chiffre entre dans le champ de vision. */
const Counter = ({ value }) => {
  const ref = useRef(null);
  const [displayed, setDisplayed] = useState(value);

  useEffect(() => {
    const node = ref?.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')?.matches;
    if (!node || reduced || !('IntersectionObserver' in window)) return undefined;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries?.forEach((entry) => {
          if (!entry?.isIntersecting) return;
          observer.unobserve(entry?.target);
          const start = performance.now();
          const duration = 1500;
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            setDisplayed(Math.round(value * (1 - Math.pow(1 - progress, 3))));
            if (progress < 1) frame = requestAnimationFrame(tick);
          };
          setDisplayed(0);
          frame = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={ref}>{displayed}</span>;
};

const HomeIntro = () => {
  const { lang, t } = useI18n();
  const keyFigures = getKeyFigures(lang);
  const title = t('home.introTitle');

  return (
  <section id="apropos" className="bg-[#F5F5F2] pt-[120px]">
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

    <div className="-mt-[120px] bg-[#0D0F10] pb-[88px] pt-[220px] text-white">
      <div className={`${container} grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]`}>
        {keyFigures?.map((figure) => (
          <Reveal key={figure?.label}>
            <p
              className="text-[clamp(3rem,5vw,4.6rem)] font-extrabold tracking-[-0.03em]"
              style={{ color: ACCENT }}
            >
              <Counter value={figure?.value} />+
            </p>
            <p className="mt-2 text-[12.5px] font-bold tracking-[0.2em] text-[#9aa2a9]">{figure?.label}</p>
          </Reveal>
        ))}
      </div>
    </div>
    </section>
  );
};

export default HomeIntro;
