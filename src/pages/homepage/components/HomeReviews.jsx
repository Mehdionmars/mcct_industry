import React from 'react';
import Reveal from '../../../components/ui/Reveal';
import { useI18n } from '../../../i18n/LanguageProvider';
import { ACCENT, headingFont, container } from '../../../components/ui/mcctTheme';
import { getReviews } from '../../../data/mcct';

/** Cinq étoiles pleines, purement décoratives (la note est portée par le texte). */
const Stars = () => (
  <span aria-hidden="true" className="flex gap-1">
    {[0, 1, 2, 3, 4]?.map((i) => (
      <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5" fill={ACCENT}>
        <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z" />
      </svg>
    ))}
  </span>
);

const ReviewCard = ({ review, ...props }) => (
  <li
    {...props}
    className="group w-[300px] shrink-0 border border-[#23272b] bg-[#16191c] p-7 transition-colors duration-300 hover:border-[#2478BE] min-[700px]:w-[380px]"
  >
    <div className="mb-5 flex items-center justify-between gap-4">
      <Stars />
      <span aria-hidden="true" className="text-[34px] leading-none text-[#2c3136] transition-colors duration-300 group-hover:text-[#2478BE]">
        &rdquo;
      </span>
    </div>
    <p className="text-[15px] leading-[1.7] text-[#d8dde1]">{review?.text}</p>
    <p className="mt-6 border-t border-[#23272b] pt-4 text-[12px] font-bold tracking-[0.14em] text-[#9aa2a9]">
      <span className="text-white">{review?.role}</span>
      <span className="mx-2 text-[#565e66]">—</span>
      {review?.sector}
    </p>
  </li>
);

/**
 * Avis clients en défilement continu.
 *
 * La piste contient deux copies de la liste et se translate de -50% : la
 * boucle est donc invisible. L'animation s'arrête au survol et au focus
 * clavier, et `motion-reduce` la neutralise complètement — la liste redevient
 * alors un rail que l'on fait défiler à la main.
 */
const HomeReviews = () => {
  const { lang, t } = useI18n();
  const reviews = getReviews(lang);
  const title = t('home.reviewsTitle');
  if (!reviews?.length) return null;

  return (
    <section id="avis" className="overflow-hidden bg-[#0D0F10] py-[110px] text-white">
      <div className={container}>
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="mb-[18px] text-[13px] font-extrabold tracking-[0.24em]" style={{ color: ACCENT }}>
              {t('home.reviewsEyebrow')}
            </p>
            <h2
              className="text-[clamp(2.2rem,4.6vw,4rem)] font-extrabold leading-none tracking-[-0.03em]"
              style={headingFont}
            >
              {title?.[0]}
              <br />
              {title?.[1]}
              <span style={{ color: ACCENT }}>.</span>
            </h2>
          </div>
          <p className="max-w-[380px] text-[16px] leading-[1.65] text-[#9aa2a9]">{t('home.reviewsText')}</p>
        </Reveal>
      </div>

      {/* Pleine largeur, hors conteneur : la piste doit sortir de l'écran. */}
      <Reveal className="group relative">
        {/* Fondus latéraux : les cartes entrent et sortent sans coupure nette. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-[linear-gradient(90deg,#0D0F10,transparent)] min-[900px]:w-36"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-[linear-gradient(270deg,#0D0F10,transparent)] min-[900px]:w-36"
        />

        <div className="mcct-rail overflow-x-auto motion-safe:overflow-hidden">
          <ul className="flex w-max list-none gap-5 px-5 motion-safe:animate-mcct-marquee motion-safe:group-hover:[animation-play-state:paused] motion-safe:group-focus-within:[animation-play-state:paused]">
            {reviews?.map((review) => (
              <ReviewCard key={review?.id} review={review} />
            ))}
            {/* Seconde copie : sert uniquement à fermer la boucle. */}
            {reviews?.map((review) => (
              <ReviewCard key={`${review?.id}-bis`} review={review} aria-hidden="true" />
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
};

export default HomeReviews;
