import React from 'react';
import { Quote, Star } from 'lucide-react';
import Reveal from '../../../components/ui/Reveal';
import { useI18n } from '../../../i18n/LanguageProvider';
import { container } from '../../../components/ui/mcctTheme';
import { Eyebrow, SectionTitle, card } from '../../../components/ui/Corporate';
import { getReviews } from '../../../data/mcct';

/** Cinq étoiles pleines, purement décoratives (la note est portée par le texte). */
const Stars = () => (
  <span aria-hidden="true" className="flex gap-0.5 text-[#F5A524]">
    {[0, 1, 2, 3, 4]?.map((i) => (
      <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
    ))}
  </span>
);

const ReviewCard = ({ review, ...props }) => (
  <li {...props} className={`${card} flex w-[300px] shrink-0 flex-col p-7 min-[700px]:w-[380px]`}>
    <div className="mb-5 flex items-center justify-between gap-4">
      <Stars />
      <Quote aria-hidden="true" className="h-7 w-7 text-sky" fill="currentColor" strokeWidth={0} />
    </div>
    <p className="flex-1 text-[15.5px] leading-[1.7] text-copy">{review?.text}</p>
    <p className="mt-6 border-t border-line pt-4 text-[14.5px] leading-[1.5]">
      <span className="block font-semibold text-navy">{review?.role}</span>
      <span className="text-subtle">{review?.sector}</span>
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
    <section id="avis" className="overflow-hidden bg-white py-24">
      <div className={container}>
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-[640px]">
            <Eyebrow>{t('home.reviewsEyebrow')}</Eyebrow>
            <SectionTitle title={title} accentLast />
          </div>
          <p className="max-w-[380px] text-[16px] leading-[1.65] text-copy">{t('home.reviewsText')}</p>
        </Reveal>
      </div>

      {/* Pleine largeur, hors conteneur : la piste doit sortir de l'écran. */}
      <Reveal className="group relative">
        {/* Fondus latéraux : les cartes entrent et sortent sans coupure nette. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-[linear-gradient(90deg,#FFFFFF,transparent)] min-[900px]:w-36"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-[linear-gradient(270deg,#FFFFFF,transparent)] min-[900px]:w-36"
        />

        <div className="mcct-rail overflow-x-auto motion-safe:overflow-hidden">
          <ul className="flex w-max list-none gap-6 px-5 py-3 motion-safe:animate-mcct-marquee motion-safe:group-hover:[animation-play-state:paused] motion-safe:group-focus-within:[animation-play-state:paused]">
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
