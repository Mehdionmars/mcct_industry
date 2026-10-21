import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../../i18n/LanguageProvider';
import { headingFont, container } from '../../../components/ui/mcctTheme';
import { DimLine, Eyebrow, Figure, Mark, Ruler, btnGhost, btnPrimary } from '../../../components/ui/Blueprint';
import { img } from '../../../data/gallery';

// Vidéo hébergée localement (jamais de hotlink externe) : chantier de charpente
// métallique filmé par drone. Source : Pexels (licence Pexels, usage commercial
// libre, sans attribution) — https://www.pexels.com/video/11396197/
const HERO_VIDEO = '/videos/mcct-hero.mp4';
const HERO_IMAGE = img('IMG_7861');

/**
 * La vidéo n'est chargée que sur grand écran, hors « économiseur de données »,
 * hors connexion lente et hors préférence « animations réduites ».
 * Partout ailleurs : l'image, qui sert aussi de poster.
 */
const shouldPlayVideo = () => {
  if (typeof window === 'undefined') return false;
  if (!window.matchMedia('(min-width: 900px)')?.matches) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)')?.matches) return false;
  const connection = navigator?.connection;
  if (connection?.saveData) return false;
  if (['slow-2g', '2g', '3g']?.includes(connection?.effectiveType)) return false;
  return true;
};

const HomeHero = () => {
  const { t } = useI18n();
  const title = t('home.heroTitle');
  const videoRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [withVideo, setWithVideo] = useState(false);
  // La vidéo n'est révélée qu'une fois réellement jouable : sur une connexion
  // lente, l'élément restait visible et noir par-dessus l'image de fond.
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Décidé après le premier rendu : l'image reste l'élément peint en premier.
  useEffect(() => {
    setWithVideo(shouldPlayVideo());
    const mq = window.matchMedia('(min-width: 900px)');
    const onChange = () => setWithVideo(shouldPlayVideo());
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (withVideo) videoRef?.current?.play()?.catch(() => {});
  }, [withVideo]);

  return (
    <section id="top" className="bp-grid relative overflow-hidden bg-paper text-ink">
      <div className={`${container} relative pb-14 pt-[120px] min-[900px]:pb-16 min-[900px]:pt-[132px]`}>
        {/* Bandeau de feuille : référence à gauche, localisation à droite. */}
        <div
          className="mb-10 flex animate-mcct-rise flex-wrap items-center justify-between gap-3 border-y border-ink/15 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-steel"
          style={{ animationDelay: '0.05s' }}
        >
          <span>
            {t('bp.ref')} MCCT-IND — {t('bp.sheet')} 01 / 04
          </span>
          <span>{t('common.cityLine')}</span>
        </div>

        <div className="grid items-end gap-12 min-[1000px]:grid-cols-12 min-[1000px]:gap-10">
          <div className="min-w-0 min-[1000px]:col-span-7">
            <div className="animate-mcct-rise" style={{ animationDelay: '0.15s' }}>
              <Eyebrow>{t('home.heroEyebrow')}</Eyebrow>
            </div>
            <h1
              className="animate-mcct-rise text-[clamp(3.1rem,8.4vw,8.4rem)] font-bold uppercase leading-[1] tracking-[-0.015em]"
              style={{ ...headingFont, animationDelay: '0.3s' }}
            >
              {title?.[0]}
              <br />
              <span className="text-brand">{title?.[1]}</span>
              <br />
              {title?.[2]}
              <Mark />
            </h1>

            <p
              className="mt-8 max-w-[520px] animate-mcct-rise text-[17.5px] leading-[1.65] text-ink2"
              style={{ animationDelay: '0.5s' }}
            >
              {t('home.heroText')}
            </p>

            <div
              className="mt-9 flex animate-mcct-rise flex-col gap-3 min-[560px]:flex-row min-[560px]:flex-wrap"
              style={{ animationDelay: '0.65s' }}
            >
              <a href="#activites" className={`${btnPrimary} animate-mcct-pulse`}>
                {t('home.heroCta1')} <span aria-hidden="true">→</span>
              </a>
              <a href="#projets" className={btnGhost}>
                {t('home.heroCta2')}
              </a>
            </div>
          </div>

          {/* Vue du chantier : cotée et encadrée comme une figure de plan. */}
          <div className="min-w-0 animate-mcct-rise min-[1000px]:col-span-5" style={{ animationDelay: '0.45s' }}>
            <DimLine label={`${t('bp.view')} 01`} className="mb-4" />
            <div className="flex gap-4">
              <Figure
                className="min-w-0 flex-1"
                frameClassName="h-[clamp(300px,52vh,560px)]"
                fig="01"
                caption={t('home.heroImageAlt')}
                loading="eager"
                src={HERO_IMAGE}
                alt={t('home.heroImageAlt')}
                imgClassName={`h-full w-full object-cover ${isVideoReady ? '' : 'animate-mcct-hero-zoom'}`}
                imgProps={{ fetchpriority: 'high' }}
              >
                {withVideo ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={HERO_IMAGE}
                    aria-hidden="true"
                    tabIndex={-1}
                    onCanPlay={() => setIsVideoReady(true)}
                    // Réseau coupé, format refusé, fichier absent : on retire la vidéo et
                    // l'image reprend seule la main, sans écran noir.
                    onError={() => {
                      setIsVideoReady(false);
                      setWithVideo(false);
                    }}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                    style={{ opacity: isVideoReady ? 1 : 0 }}
                  >
                    <source src={HERO_VIDEO} type="video/mp4" />
                  </video>
                ) : null}
              </Figure>
              {/* Cote verticale, grand écran seulement. */}
              <div
                aria-hidden="true"
                className="hidden w-4 flex-col items-center text-steel min-[1000px]:flex"
                style={{ height: 'clamp(300px,52vh,560px)' }}
              >
                <span className="h-px w-3 bg-current" />
                <span className="w-px flex-1 bg-current" />
                <span className="h-px w-3 bg-current" />
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mt-12 flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.16em] text-steel transition-opacity duration-500"
          style={{ opacity: isScrolled ? 0.35 : 1 }}
        >
          <span className="shrink-0">{t('home.scroll')} ↓</span>
          <Ruler className="flex-1" />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
