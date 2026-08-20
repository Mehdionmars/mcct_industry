import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getProjectBySlug } from '../../data/mcct';
import { useI18n } from '../../i18n/LanguageProvider';

const Lightbox = ({ item, counter, onClose, onPrev, onNext, showProjectLink = true }) => {
  const { lang, t } = useI18n();
  const touchStartX = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e?.key === 'Escape') onClose();
      if (e?.key === 'ArrowRight') onNext();
      if (e?.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    const onTouchStart = (e) => {
      touchStartX.current = e?.changedTouches?.[0]?.clientX ?? null;
    };
    const onTouchEnd = (e) => {
      if (touchStartX?.current == null) return;
      const dx = (e?.changedTouches?.[0]?.clientX ?? 0) - touchStartX?.current;
      if (Math.abs(dx) > 50) {
        if (dx < 0) onNext();
        else onPrev();
      }
      touchStartX.current = null;
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [onNext, onPrev]);

  // Verrouille le défilement de la page pendant la visionneuse.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef?.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const linkedProject = item?.projectSlug ? getProjectBySlug(item?.projectSlug, lang) : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('lightbox.dialog')}
      onClick={(e) => {
        if (e?.target === e?.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[300] flex animate-galerie-fade flex-col bg-[rgba(8,9,10,0.96)]"
    >
      <div className="flex items-center justify-between px-[22px] py-[18px]">
        <span className="text-[12px] font-extrabold tracking-[0.2em] text-[#9aa2a9]">{counter}</span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t('lightbox.close')}
          className="min-h-[48px] min-w-[48px] cursor-pointer border border-[#2c3136] px-[18px] text-[13px] font-extrabold tracking-[0.16em] text-white transition-colors hover:border-[#2478BE] hover:text-[#2478BE]"
        >
          ✕
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center px-4 pb-3">
        <img
          key={item?.src}
          src={item?.src}
          alt={item?.alt}
          className="block max-h-full max-w-full animate-galerie-pop object-contain"
        />
      </div>

      <div className="flex items-center justify-between gap-4 px-[22px] pb-[26px] pt-3">
        <button
          type="button"
          onClick={(e) => {
            e?.stopPropagation();
            onPrev();
          }}
          aria-label={t('lightbox.prev')}
          className="min-h-[48px] min-w-[56px] cursor-pointer border border-[#2c3136] text-[15px] text-white transition-colors hover:border-[#2478BE] hover:text-[#2478BE]"
        >
          ←
        </button>
        <span className="min-w-0 flex-1 text-center text-[13.5px] text-[#c4cad0]">
          {item?.alt}
          {showProjectLink && linkedProject ? (
            <Link
              to={`/projects/${linkedProject?.slug}`}
              onClick={(e) => e?.stopPropagation()}
              className="mt-1.5 block text-[12px] font-extrabold tracking-[0.16em] text-[#2478BE] hover:text-white"
            >
              {t('common.viewProject')} : {linkedProject?.title?.toUpperCase()} →
            </Link>
          ) : null}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e?.stopPropagation();
            onNext();
          }}
          aria-label={t('lightbox.next')}
          className="min-h-[48px] min-w-[56px] cursor-pointer border border-[#2c3136] text-[15px] text-white transition-colors hover:border-[#2478BE] hover:text-[#2478BE]"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Lightbox;
