import React, { useMemo, useState } from 'react';
import Reveal from '../../../components/ui/Reveal';
import { useI18n } from '../../../i18n/LanguageProvider';
import { ACCENT, headingFont, container } from '../../../components/ui/mcctTheme';
import { getHomeProjects, projectCategories } from '../../../data/mcct';

const HomeProjects = () => {
  const { lang, t, tx } = useI18n();
  const [filter, setFilter] = useState('ALL');
  const homeProjects = useMemo(() => getHomeProjects(lang), [lang]);
  const title = t('home.projectsTitle');

  const visibleProjects = useMemo(
    () => (filter === 'ALL' ? homeProjects : homeProjects?.filter((project) => project?.category === filter)),
    [filter, homeProjects]
  );

  return (
    <section id="projets" className="bg-[#F5F5F2] py-[120px]">
      <div className={container}>
        <Reveal className="mb-11">
          <p className="mb-[18px] text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
            {t('home.projectsEyebrow')}
          </p>
          <h2
            className="text-[clamp(2.4rem,4.6vw,4.4rem)] font-extrabold leading-none tracking-[-0.03em]"
            style={headingFont}
          >
            {title?.[0]}
            <br />
            {title?.[1]}
            <br />
            {title?.[2]}
            <span style={{ color: ACCENT }}>.</span>
          </h2>
        </Reveal>

        {/*
          Pastilles à toutes les largeurs. Sous 900px elles défilent
          horizontalement (barre masquée, débord jusqu'aux bords de l'écran)
          plutôt que de s'empiler sur trois lignes.
        */}
        <div
          role="group"
          aria-label={t('common.filter')}
          className="mcct-rail mb-12 -mx-5 flex gap-2.5 overflow-x-auto px-5 min-[900px]:mx-0 min-[900px]:flex-wrap min-[900px]:overflow-visible min-[900px]:px-0"
        >
          {projectCategories?.map((category) => {
            const isActive = filter === category?.key;
            return (
              <button
                key={category?.key}
                type="button"
                onClick={() => setFilter(category?.key)}
                aria-pressed={isActive}
                className={`min-h-[44px] shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-5 py-3 text-[12px] font-extrabold tracking-[0.14em] transition-all [transition-duration:250ms] ${
                  isActive
                    ? 'border-[#2478BE] bg-[#2478BE] text-white'
                    : 'border-[#c6c6c1] bg-transparent text-[#565e66] hover:border-[#2478BE] hover:text-[#2478BE]'
                }`}
              >
                {tx(category?.label)}
              </button>
            );
          })}
        </div>

        <div
          key={`${filter}-${lang}`}
          className="grid animate-galerie-fade gap-7 [grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]"
        >
          {visibleProjects?.map((project) => (
            <figure key={project?.slug} className="group m-0">
              <div className="overflow-hidden bg-[#0D0F10]">
                <img
                  src={project?.thumbSrc}
                  alt={project?.title}
                  loading="lazy"
                  className="block h-[300px] w-full object-cover transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
              </div>
              <figcaption className="flex items-baseline justify-between gap-4 pt-4">
                <div>
                  <span className="block text-[11.5px] font-extrabold tracking-[0.18em]" style={{ color: ACCENT }}>
                    {project?.categoryLabel}
                  </span>
                  <span className="mt-1.5 block text-[19px] font-extrabold tracking-[-0.01em]">{project?.title}</span>
                </div>
                <span className="whitespace-nowrap text-[13px] tracking-[0.08em] text-[#565e66]">
                  {project?.location}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeProjects;
