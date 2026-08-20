import React, { useCallback, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageMeta from '../../components/ui/PageMeta';
import SiteHeader from '../../components/ui/SiteHeader';
import SiteCTA from '../../components/ui/SiteCTA';
import WhatsAppFab from '../../components/ui/WhatsAppFab';
import Lightbox from '../../components/ui/Lightbox';
import Reveal from '../../components/ui/Reveal';
import NotFound from '../NotFound';
import { useI18n } from '../../i18n/LanguageProvider';
import { ACCENT, bodyFont, headingFont, container } from '../../components/ui/mcctTheme';
import { getProjects, getProjectBySlug } from '../../data/mcct';

const ProjectDetail = () => {
  const { id } = useParams();
  const { lang, t } = useI18n();
  const [index, setIndex] = useState(-1);

  const project = useMemo(() => getProjectBySlug(id, lang), [id, lang]);
  const gallery = project?.gallery ?? [];

  const step = useCallback(
    (direction) => {
      const total = gallery?.length;
      if (!total) return;
      setIndex((current) => (current < 0 ? current : (current + direction + total) % total));
    },
    [gallery]
  );

  // Un slug inconnu doit répondre « page introuvable », pas afficher un projet par défaut.
  if (!project) return <NotFound />;

  const currentItem = index >= 0 ? gallery?.[index] : null;
  const counter = currentItem
    ? `${String(index + 1)?.padStart(2, '0')} / ${String(gallery?.length)?.padStart(2, '0')}`
    : '';

  // Seules les informations réellement disponibles sont affichées.
  const specLabels = t('projects.specs');
  const specs = [
    { key: specLabels?.category, value: project?.categoryLabel },
    { key: specLabels?.location, value: project?.location },
    project?.year ? { key: specLabels?.year, value: project?.year } : null,
    project?.client ? { key: specLabels?.client, value: project?.client } : null,
    project?.services?.length ? { key: specLabels?.services, value: project?.services?.join(' · ') } : null
  ]?.filter(Boolean);

  const related = getProjects(lang)
    ?.filter((item) => item?.slug !== project?.slug)
    ?.sort((a, b) => (b?.category === project?.category) - (a?.category === project?.category))
    ?.slice(0, 3);

  const meta = [project?.location?.toUpperCase(), project?.year]?.filter(Boolean)?.join(' · ');
  const wideImage = gallery?.length > 1 ? gallery?.[gallery.length - 1] : null;

  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#17191C] antialiased" style={bodyFont}>
      <PageMeta
        title={`${project?.title} — ${project?.categoryLabel?.toLowerCase()} | MCCT Industrie`}
        description={project?.introduction}
        image={project?.src}
      />

      <WhatsAppFab />
      <SiteHeader />

      <section className="relative flex min-h-[82vh] items-end overflow-hidden bg-[#0D0F10]">
        <img src={project?.src} alt={project?.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,15,16,0.3),rgba(13,15,16,0.9))]" />
        <div className={`${container} relative pb-16 pt-[140px] text-white`}>
          <Link
            to="/projects"
            className="mb-[26px] inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.18em] text-[#c4cad0] transition-colors hover:text-white"
          >
            {t('projects.back')}
          </Link>
          <p className="mb-4 text-[13px] font-extrabold tracking-[0.26em]" style={{ color: ACCENT }}>
            {project?.categoryLabel}
          </p>
          <h1
            className="text-[clamp(2.4rem,5.6vw,5rem)] font-bold uppercase leading-[0.98] tracking-[-0.02em]"
            style={headingFont}
          >
            {project?.title}
          </h1>
          {meta ? <p className="mt-[22px] text-[15px] tracking-[0.1em] text-[#c4cad0]">{meta}</p> : null}
        </div>
      </section>

      <section className="bg-[#0D0F10] pb-[90px] text-white">
        <div
          className={`${container} grid gap-8 border-t border-[#23272b] pt-12 [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))]`}
        >
          {specs?.map((spec) => (
            <div key={spec?.key}>
              <p className="mb-2 text-[11px] font-extrabold tracking-[0.2em]" style={{ color: ACCENT }}>
                {spec?.key}
              </p>
              <p className="text-[17px] font-bold text-white">{spec?.value}</p>
            </div>
          ))}
        </div>
      </section>

      {project?.introduction ? (
        <section className="pt-[110px]">
          <div className={container}>
            <Reveal
              as="p"
              className="max-w-[880px] text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.5]"
              style={headingFont}
            >
              {project?.introduction}
            </Reveal>
          </div>
        </section>
      ) : null}

      {project?.sections?.length ? (
        <section className="pt-16">
          <div className={container}>
            {project?.sections?.map((section, sectionIndex) => (
              <Reveal
                key={section?.title}
                className="grid items-start gap-12 pb-[72px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]"
              >
                <div className="min-w-0">
                  <p className="mb-3.5 text-[12px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
                    {String(sectionIndex + 1)?.padStart(2, '0')}
                  </p>
                  <h2
                    className="text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold leading-[1.04] tracking-[-0.02em]"
                    style={headingFont}
                  >
                    {section?.title}
                  </h2>
                </div>
                <p className="max-w-[560px] text-[17px] leading-[1.7] text-[#3a3f45]">{section?.body}</p>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {project?.materials?.length ? (
        <section className="pb-[90px]">
          <div className={container}>
            <p className="mb-4 text-[12px] font-extrabold tracking-[0.24em] text-[#565e66]">{t('projects.materials')}</p>
            <div className="flex flex-wrap gap-2.5">
              {project?.materials?.map((material) => (
                <span
                  key={material}
                  className="border border-[#c6c6c1] px-4 py-2.5 text-[11.5px] font-bold tracking-[0.14em] text-[#565e66]"
                >
                  {material}
                </span>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {wideImage ? (
        <section className="overflow-hidden">
          <img
            src={wideImage?.src}
            alt={wideImage?.alt}
            loading="lazy"
            className="block h-[clamp(320px,62vh,680px)] w-full object-cover"
          />
        </section>
      ) : null}

      {gallery?.length > 1 ? (
        <section className="py-[110px]">
          <div className={container}>
            <Reveal
              as="h2"
              className="mb-10 text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold leading-none tracking-[-0.02em]"
              style={headingFont}
            >
              {t('projects.gallery')}
              <span style={{ color: ACCENT }}>.</span>
            </Reveal>

            <div className="grid auto-rows-[150px] grid-cols-2 gap-2.5 min-[900px]:auto-rows-[230px] min-[900px]:gap-4 min-[900px]:[grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]">
              {gallery?.map((item, itemIndex) => (
                <button
                  key={item?.id}
                  type="button"
                  onClick={() => setIndex(itemIndex)}
                  aria-label={item?.alt}
                  className="group relative min-h-0 cursor-pointer overflow-hidden border-none bg-[#0D0F10] p-0"
                >
                  <img
                    src={item?.thumbSrc}
                    alt={item?.alt}
                    loading="lazy"
                    className="block h-full w-full object-cover transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {currentItem ? (
        <Lightbox
          item={currentItem}
          counter={counter}
          onClose={() => setIndex(-1)}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          showProjectLink={false}
        />
      ) : null}

      <section className="bg-[#E7E7E4] py-[100px]">
        <div className={container}>
          <p className="mb-9 text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
            {t('projects.related')}
          </p>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
            {related?.map((item) => (
              <Link key={item?.slug} to={`/projects/${item?.slug}`} className="group block">
                <span className="block overflow-hidden bg-[#0D0F10]">
                  <img
                    src={item?.thumbSrc}
                    alt={item?.title}
                    loading="lazy"
                    className="block h-[260px] w-full object-cover transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </span>
                <span className="mt-3.5 block text-[11.5px] font-extrabold tracking-[0.18em]" style={{ color: ACCENT }}>
                  {item?.categoryLabel}
                </span>
                <span className="mt-1.5 block text-[19px] font-extrabold tracking-[-0.01em]">{item?.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteCTA titleKey="cta.nextSite" accentSuffix="." />
    </div>
  );
};

export default ProjectDetail;
