import React, { useMemo, useState } from 'react';
import Reveal from '../../../components/ui/Reveal';
import { useI18n } from '../../../i18n/LanguageProvider';
import { headingFont, container } from '../../../components/ui/mcctTheme';
import { Eyebrow, Figure, Mark } from '../../../components/ui/Blueprint';
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
    <section id="projets" className="bg-paper py-[110px] text-ink">
      <div className={container}>
        <Reveal className="mb-11">
          <Eyebrow>{t('home.projectsEyebrow')}</Eyebrow>
          <h2
            className="text-[clamp(2.6rem,5vw,4.8rem)] font-bold uppercase leading-[1.02] tracking-[-0.01em]"
            style={headingFont}
          >
            {title?.[0]}
            <br />
            {title?.[1]}
            <br />
            {title?.[2]}
            <Mark />
          </h2>
        </Reveal>

        {/*
          Onglets à toutes les largeurs. Sous 900px ils défilent
          horizontalement (barre masquée, débord jusqu'aux bords de l'écran)
          plutôt que de s'empiler sur plusieurs lignes.
        */}
        <div
          role="group"
          aria-label={t('common.filter')}
          className="mcct-rail -mx-5 mb-12 flex overflow-x-auto px-5 min-[900px]:mx-0 min-[900px]:flex-wrap min-[900px]:overflow-visible min-[900px]:px-0"
        >
          <div className="flex border-l border-t border-ink">
            {projectCategories?.map((category) => {
              const isActive = filter === category?.key;
              return (
                <button
                  key={category?.key}
                  type="button"
                  onClick={() => setFilter(category?.key)}
                  aria-pressed={isActive}
                  className={`min-h-[46px] shrink-0 cursor-pointer whitespace-nowrap border-b border-r border-ink px-5 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors duration-200 ${
                    isActive ? 'bg-ink text-safety' : 'bg-transparent text-ink hover:bg-paper2'
                  }`}
                >
                  {tx(category?.label)}
                </button>
              );
            })}
          </div>
        </div>

        <div
          key={`${filter}-${lang}`}
          className="grid animate-galerie-fade gap-x-8 gap-y-12 [grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]"
        >
          {visibleProjects?.map((project, index) => (
            <article key={project?.slug} className="group">
              <Figure
                src={project?.thumbSrc}
                alt={project?.title}
                frameClassName="h-[290px]"
                imgClassName="h-full w-full object-cover transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />
              <div className="mt-5 grid grid-cols-[auto_1fr] border-l border-t border-ink/25 font-mono text-[11.5px] uppercase tracking-[0.1em]">
                <span className="border-b border-r border-ink/25 px-3 py-2 text-steel">{t('bp.fig')} {String(index + 1)?.padStart(2, '0')}</span>
                <span className="border-b border-r border-ink/25 px-3 py-2 text-brand">{project?.categoryLabel}</span>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="text-[23px] font-bold uppercase leading-[1.14]" style={headingFont}>
                  {project?.title}
                </h3>
                <span className="shrink-0 font-mono text-[12px] uppercase tracking-[0.08em] text-steel">{project?.location}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeProjects;
