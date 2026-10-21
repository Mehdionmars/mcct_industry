import React, { useMemo, useState } from 'react';
import Reveal from '../../../components/ui/Reveal';
import { useI18n } from '../../../i18n/LanguageProvider';
import { MapPin } from 'lucide-react';
import { container } from '../../../components/ui/mcctTheme';
import { Eyebrow, SectionTitle, card } from '../../../components/ui/Corporate';
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
    <section id="projets" className="bg-mist py-24">
      <div className={container}>
        <Reveal className="mb-10 max-w-[720px]">
          <Eyebrow>{t('home.projectsEyebrow')}</Eyebrow>
          <SectionTitle title={title} accentLast />
        </Reveal>

        {/*
          Filtres en pastilles. Sous 900px ils défilent horizontalement
          (barre masquée) plutôt que de s'empiler sur plusieurs lignes.
        */}
        <div
          role="group"
          aria-label={t('common.filter')}
          className="mcct-rail -mx-5 scroll-px-5 min-[900px]:scroll-px-0 mb-10 flex gap-2.5 overflow-x-auto px-5 pb-1 min-[900px]:mx-0 min-[900px]:flex-wrap min-[900px]:overflow-visible min-[900px]:px-0"
        >
          {projectCategories?.map((category) => {
            const isActive = filter === category?.key;
            return (
              <button
                key={category?.key}
                type="button"
                onClick={() => setFilter(category?.key)}
                aria-pressed={isActive}
                className={`min-h-[42px] shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-5 text-[14.5px] font-semibold transition-colors duration-200 ${
                  isActive
                    ? 'border-navy bg-navy text-white'
                    : 'border-line bg-white text-copy hover:border-brand hover:text-brand'
                }`}
              >
                {tx(category?.label)}
              </button>
            );
          })}
        </div>

        <div
          key={`${filter}-${lang}`}
          className="grid animate-galerie-fade gap-6 [grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]"
        >
          {visibleProjects?.map((project) => (
            <article key={project?.slug} className={`${card} group overflow-hidden`}>
              <div className="relative h-[240px] overflow-hidden">
                <img
                  src={project?.thumbSrc}
                  alt={project?.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:600ms] group-hover:scale-[1.05]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[13px] font-semibold text-brand shadow-sm">
                  {project?.categoryLabel}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-[19px] font-bold leading-[1.3] text-navy">{project?.title}</h3>
                <p className="mt-2 inline-flex items-center gap-1.5 text-[14.5px] text-subtle">
                  <MapPin aria-hidden="true" className="h-4 w-4" />
                  {project?.location}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeProjects;
