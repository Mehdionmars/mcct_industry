import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../../i18n/LanguageProvider';
import { ACCENT, headingFont, container } from '../../../components/ui/mcctTheme';
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
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#0D0F10]">
      <img
        src={HERO_IMAGE}
        alt={t('home.heroImageAlt')}
        fetchpriority="high"
        className={`absolute inset-0 h-full w-full object-cover ${
          isVideoReady ? '' : 'animate-mcct-hero-zoom'
        }`}
      />

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
          // l'image de fond reprend seule la main, sans écran noir.
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

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,15,16,0.55)_0%,rgba(13,15,16,0.35)_40%,rgba(13,15,16,0.88)_100%)]" />

      <div className={`${container} relative pb-[72px] pt-40 text-white`}>
        <p
          className="mb-5 animate-mcct-rise text-[12.5px] font-bold tracking-[0.28em] text-[#cfd6dc]"
          style={{ animationDelay: '0.15s' }}
        >
          {t('home.heroEyebrow')}
        </p>
        <h1
          className="animate-mcct-rise text-[clamp(2.8rem,7vw,7.2rem)] font-extrabold leading-[0.96] tracking-[-0.03em]"
          style={{ ...headingFont, animationDelay: '0.3s' }}
        >
          {title?.[0]}
          <br />
          {title?.[1]}
          <br />
          {title?.[2]}
          <span style={{ color: ACCENT }}>.</span>
        </h1>

        <div className="mt-9 flex flex-wrap items-end justify-between gap-8">
          <p
            className="max-w-[460px] animate-mcct-rise text-[17px] leading-[1.65] text-[#d8dde1]"
            style={{ animationDelay: '0.5s' }}
          >
            {t('home.heroText')}
          </p>
          <div
            className="flex w-full animate-mcct-rise flex-col flex-wrap gap-3 min-[900px]:w-auto min-[900px]:flex-row min-[900px]:gap-4"
            style={{ animationDelay: '0.65s' }}
          >
            <a
              href="#activites"
              className="relative inline-flex min-h-[54px] shrink-0 animate-mcct-pulse items-center justify-center gap-3 overflow-hidden whitespace-nowrap bg-[#2478BE] px-6 text-[12.5px] font-extrabold tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#17191C] min-[900px]:min-h-0 min-[900px]:justify-start min-[900px]:px-7 min-[900px]:py-[17px]"
            >
              {t('home.heroCta1')} <span aria-hidden="true">→</span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 h-full w-[45%] animate-mcct-shine bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.45),transparent)]"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-[54px] items-center justify-center gap-3 border border-[rgba(255,255,255,0.4)] px-6 text-[12.5px] font-extrabold tracking-[0.16em] text-white transition-colors hover:border-white hover:bg-[rgba(255,255,255,0.08)] min-[900px]:min-h-0 min-[900px]:justify-start min-[900px]:px-7 min-[900px]:py-4"
            >
              {t('cta.defaultLabel')}
            </a>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none mt-10 text-center transition-opacity duration-500"
          style={{ opacity: isScrolled ? 0 : 1 }}
        >
          <span className="text-[11px] font-extrabold tracking-[0.28em] text-[#cfd6dc]">{t('home.scroll')}</span>
          <span className="mx-auto mt-3 block h-[42px] w-px bg-[linear-gradient(180deg,#2478BE,transparent)]" />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
