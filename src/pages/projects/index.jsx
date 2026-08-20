import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/LanguageProvider';
import PageMeta from '../../components/ui/PageMeta';
import SiteHeader from '../../components/ui/SiteHeader';
import SiteCTA from '../../components/ui/SiteCTA';
import WhatsAppFab from '../../components/ui/WhatsAppFab';
import { ACCENT, bodyFont, headingFont, container } from '../../components/ui/mcctTheme';
import { getProjects, projectCategories } from '../../data/mcct';
import { img } from '../../data/gallery';

const Projects = () => {
  const { lang, t, tx } = useI18n();
  const [filter, setFilter] = useState('ALL');
  const projects = useMemo(() => getProjects(lang), [lang]);
  const title = t('projects.title');

  const visibleProjects = useMemo(
    () => (filter === 'ALL' ? projects : projects?.filter((project) => project?.category === filter)),
    [filter, projects]
  );

  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#17191C] antialiased" style={bodyFont}>
      <PageMeta title={t('meta.projects.title')} description={t('meta.projects.description')} />

      <WhatsAppFab />
      <SiteHeader />

      <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-[#0D0F10]">
        <img
          src={img('IMG_7866')}
          alt={t('projects.heroAlt')}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,15,16,0.4),rgba(13,15,16,0.85))]" />
        <div className={`${container} relative pb-16 pt-[140px] text-white`}>
          <p className="mb-4 text-[13px] font-extrabold tracking-[0.26em] text-[#cfd6dc]">{t('projects.eyebrow')}</p>
          <h1
            className="text-[clamp(2.6rem,6vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.02em]"
            style={headingFont}
          >
            {title?.[0]}
            <br />
            {title?.[1]}
            <br />
            {title?.[2]}
            <span style={{ color: ACCENT }}>.</span>
          </h1>
        </div>
      </section>

      <section className="pb-[120px] pt-[90px]">
        <div className={container}>
          <div className="mb-12 flex flex-wrap gap-2.5">
            {projectCategories?.map((category) => {
              const isActive = filter === category?.key;
              return (
                <button
                  key={category?.key}
                  type="button"
                  onClick={() => setFilter(category?.key)}
                  aria-pressed={isActive}
                  className={`min-h-[44px] cursor-pointer border px-5 py-3 text-[12px] font-extrabold tracking-[0.14em] transition-all [transition-duration:250ms] ${
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
            className="grid animate-galerie-fade gap-7 [grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))]"
          >
            {visibleProjects?.map((project) => (
              <figure key={project?.slug} className="group m-0">
                <Link to={`/projects/${project?.slug}`} className="block overflow-hidden bg-[#0D0F10]">
                  <img
                    src={project?.thumbSrc}
                    alt={project?.title}
                    loading="lazy"
                    className="block h-[320px] w-full object-cover transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                </Link>
                <figcaption className="flex items-baseline justify-between gap-4 pt-4">
                  <Link to={`/projects/${project?.slug}`} className="hover:text-[#2478BE]">
                    <span className="block text-[11.5px] font-extrabold tracking-[0.18em]" style={{ color: ACCENT }}>
                      {project?.categoryLabel}
                    </span>
                    <span className="mt-1.5 block text-[19px] font-extrabold tracking-[-0.01em]">
                      {project?.title}
                    </span>
                  </Link>
                  <span className="whitespace-nowrap text-[13px] tracking-[0.08em] text-[#565e66]">
                    {project?.location}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <SiteCTA titleKey="cta.nextSite" accentSuffix="." />
    </div>
  );
};

export default Projects;
