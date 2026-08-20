import React from 'react';
import { galleryCategories } from '../../../data/gallery';

const GalleryFilters = ({ value, onChange }) => (
  <>
    {/* Mobile : liste déroulante compacte */}
    <label className="mb-8 flex flex-col gap-2 text-[11.5px] font-extrabold tracking-[0.18em] text-[#565e66] min-[900px]:hidden">
      FILTRER
      <select
        value={value}
        onChange={(e) => onChange(e?.target?.value)}
        className="min-h-[48px] border border-[#c6c6c1] bg-white px-4 py-3.5 text-[15px] font-bold text-[#17191C]"
      >
        {galleryCategories?.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </label>

    {/* Desktop : filtres en pastilles */}
    <div className="mb-11 hidden flex-wrap gap-2.5 min-[900px]:flex">
      {galleryCategories?.map((category) => {
        const isActive = value === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={isActive}
            className={`min-h-[44px] cursor-pointer border px-5 py-3 text-[12px] font-extrabold tracking-[0.14em] transition-all [transition-duration:250ms] ${
              isActive
                ? 'border-[#2478BE] bg-[#2478BE] text-white'
                : 'border-[#c6c6c1] bg-transparent text-[#565e66] hover:border-[#2478BE] hover:text-[#2478BE]'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  </>
);

export default GalleryFilters;
