import React from "react";

const GalleryTab = () => {
  const images = [
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
    "/images/gallery4.jpg",
  ];

  return (
    <div className="space-y-8">
      <h3 className="font-headline text-2xl font-bold text-primary text-center">
        Galerie
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-xl shadow-industrial">
            <img src={src} alt={`Galerie ${index + 1}`} className="w-full h-40 object-cover hover:scale-105 transition-transform" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryTab;
