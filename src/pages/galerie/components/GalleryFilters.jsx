import React from 'react';
import { useI18n } from '../../../i18n/LanguageProvider';
import { galleryCategories } from '../../../data/gallery';

/**
 * Filtres en pastilles, à toutes les largeurs.
 *
 * Sous 900px le groupe défile horizontalement (barre masquée, débord jusqu'aux
 * bords de l'écran) au lieu de s'empiler : les sept catégories tiennent sur une
 * seule ligne et restent toutes visibles d'un coup d'œil.
 */
const GalleryFilters = ({ value, onChange }) => {
  const { t, tx } = useI18n();

  return (
    <div
      role="group"
      aria-label={t('common.filter')}
      className="mcct-rail mb-11 -mx-5 flex gap-2.5 overflow-x-auto px-5 min-[900px]:mx-0 min-[900px]:flex-wrap min-[900px]:overflow-visible min-[900px]:px-0"
    >
      {galleryCategories?.map((category) => {
        const isActive = value === category?.key;
        return (
          <button
            key={category?.key}
            type="button"
            onClick={() => onChange(category?.key)}
            aria-pressed={isActive}
            className={`min-h-[44px] shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-5 py-3 text-[12px] font-extrabold tracking-[0.14em] transition-all [transition-duration:250ms] ${
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
  );
};

export default GalleryFilters;
