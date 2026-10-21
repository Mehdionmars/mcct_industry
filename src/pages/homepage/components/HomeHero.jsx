import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../../i18n/LanguageProvider';
import { container } from '../../../components/ui/mcctTheme';
import { Eyebrow, btnPrimary, btnSecondary } from '../../../components/ui/Corporate';
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
  const [withVideo, setWithVideo] = useState(false);
  // La vidéo n'est révélée qu'une fois réellement jouable : sur une connexion
  // lente, l'élément restait visible et noir par-dessus l'image de fond.
  const [isVideoReady, setIsVideoReady] = useState(false);

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
    <section id="top" className="relative overflow-hidden bg-mist">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 -top-48 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(31,106,174,0.14),transparent_70%)]"
      />
      <div className={`${container} relative grid items-center gap-14 pb-20 pt-[120px] min-[1000px]:grid-cols-12 min-[1000px]:pb-24 min-[1000px]:pt-[150px]`}>
        <div className="min-w-0 min-[1000px]:col-span-6">
          <div className="animate-mcct-rise" style={{ animationDelay: '0.1s' }}>
            <Eyebrow>{t('home.heroEyebrow')}</Eyebrow>
          </div>
          <h1
            className="animate-mcct-rise font-display text-[clamp(2.6rem,5.4vw,4.5rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-navy"
            style={{ animationDelay: '0.25s' }}
          >
            {title?.[0]} <span className="text-brand">{title?.slice(1)?.join(' ')}</span>
          </h1>

          <p
            className="mt-6 max-w-[520px] animate-mcct-rise text-[18.5px] leading-[1.7] text-copy"
            style={{ animationDelay: '0.4s' }}
          >
            {t('home.heroText')}
          </p>

          <div
            className="mt-9 flex animate-mcct-rise flex-col gap-3 min-[520px]:flex-row min-[520px]:flex-wrap"
            style={{ animationDelay: '0.55s' }}
          >
            <a href="#activites" className={btnPrimary}>
              {t('home.heroCta1')} <span aria-hidden="true">→</span>
            </a>
            <a href="#projets" className={btnSecondary}>
              {t('home.heroCta2')}
            </a>
          </div>
        </div>

        <div className="relative min-w-0 animate-mcct-rise min-[1000px]:col-span-6" style={{ animationDelay: '0.35s' }}>
          <div className="relative h-[clamp(320px,58vh,580px)] overflow-hidden rounded-[28px] bg-sky shadow-[0_30px_70px_-30px_rgba(15,42,71,0.45)]">
            <img
              src={HERO_IMAGE}
              alt={t('home.heroImageAlt')}
              fetchpriority="high"
              className={`absolute inset-0 h-full w-full object-cover ${isVideoReady ? '' : 'animate-mcct-hero-zoom'}`}
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
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeHero;
