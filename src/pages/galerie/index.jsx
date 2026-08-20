import React, { useCallback, useMemo, useState } from 'react';
import PageMeta from '../../components/ui/PageMeta';
import SiteHeader from '../../components/ui/SiteHeader';
import SiteCTA from '../../components/ui/SiteCTA';
import WhatsAppFab from '../../components/ui/WhatsAppFab';
import { bodyFont, container } from '../../components/ui/mcctTheme';
import GalleryHero from './components/GalleryHero';
import GalleryFilters from './components/GalleryFilters';
import GalleryGrid from './components/GalleryGrid';
import Lightbox from '../../components/ui/Lightbox';
import { galleryItems } from '../../data/gallery';

const Galerie = () => {
  const [filter, setFilter] = useState('TOUT');
  const [index, setIndex] = useState(-1);

  const visibleItems = useMemo(
    () => (filter === 'TOUT' ? galleryItems : galleryItems?.filter((item) => item?.category === filter)),
    [filter]
  );

  const handleFilter = useCallback((next) => {
    setFilter(next);
    setIndex(-1);
  }, []);

  const step = useCallback(
    (direction) => {
      const total = visibleItems?.length;
      if (!total) return;
      setIndex((current) => (current < 0 ? current : (current + direction + total) % total));
    },
    [visibleItems]
  );

  const closeLightbox = useCallback(() => setIndex(-1), []);
  const showPrev = useCallback(() => step(-1), [step]);
  const showNext = useCallback(() => step(1), [step]);

  const currentItem = index >= 0 ? visibleItems?.[index] : null;
  const counter = currentItem
    ? `${String(index + 1)?.padStart(2, '0')} / ${String(visibleItems?.length)?.padStart(2, '0')}`
    : '';

  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#17191C] antialiased" style={bodyFont}>
      <PageMeta title="Galerie chantiers et atelier | MCCT Industrie" description="Galerie MCCT Industrie : une sélection de nos environnements industriels, chantiers et réalisations en construction métallique." />

      <WhatsAppFab />
      <SiteHeader />
      <GalleryHero />

      <section className="pb-[120px] pt-[72px]">
        <div className={container}>
          <GalleryFilters value={filter} onChange={handleFilter} />
          <GalleryGrid items={visibleItems} onOpen={setIndex} />
          <p className="mt-9 text-[12.5px] tracking-[0.1em] text-[#8a9096]">
            {`${visibleItems?.length} VISUELS — ${filter}`}
          </p>
        </div>
      </section>

      {currentItem ? (
        <Lightbox
          item={currentItem}
          counter={counter}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
        />
      ) : null}

      <SiteCTA />
    </div>
  );
};

export default Galerie;
