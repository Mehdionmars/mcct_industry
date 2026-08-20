import React from 'react';

const GalleryGrid = ({ items, onOpen }) => (
  <div className="grid auto-rows-[150px] grid-cols-2 gap-2.5 min-[900px]:auto-rows-[220px] min-[900px]:gap-4 min-[900px]:[grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
    {items?.map((item, index) => (
      <button
        key={item?.id}
        type="button"
        onClick={() => onOpen(index)}
        aria-label={item?.alt}
        className={`group relative min-h-0 cursor-pointer overflow-hidden border-none bg-[#0D0F10] p-0 ${
          item?.span === 2 ? 'row-span-1 min-[900px]:row-span-2' : 'row-span-1'
        }`}
      >
        <img
          src={item?.thumbSrc}
          alt={item?.alt}
          loading="lazy"
          className="block h-full w-full object-cover transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,15,16,0)_45%,rgba(13,15,16,0.8)_100%)] opacity-0 transition-opacity [transition-duration:400ms] group-hover:opacity-100 group-focus-visible:opacity-100" />
        <span className="absolute bottom-4 left-[18px] right-[18px] translate-y-2 text-left opacity-0 transition-all [transition-duration:400ms] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <span className="block text-[10.5px] font-extrabold tracking-[0.2em] text-[#2478BE]">
            {item?.categoryLabel}
          </span>
          <span className="mt-[5px] block text-[15px] font-bold text-white">{item?.alt}</span>
        </span>
      </button>
    ))}
  </div>
);

export default GalleryGrid;
