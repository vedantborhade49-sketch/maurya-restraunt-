"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import JournalLightbox, { GalleryImage } from "./JournalLightbox";

// Define the full gallery dataset
const galleryData: (GalleryImage & { category: string; className?: string })[] = [
  // --- THE RESTAURANT ---
  {
    category: "THE RESTAURANT",
    src: "/inside-1.jpeg",
    alt: "The Warm Dining Room",
    caption: "Our dining room on a quiet afternoon.",
    aspectRatio: "portrait",
    objectPosition: "center",
    className: "col-span-12 md:col-span-6", 
  },
  {
    category: "THE RESTAURANT",
    src: "/inside-2.jpeg",
    alt: "Detailed Woodwork",
    caption: "Hand-carved woodwork separating the booths.",
    aspectRatio: "portrait",
    objectPosition: "center",
    className: "col-span-12 md:col-span-6",
  },
  {
    category: "THE RESTAURANT",
    src: "/inside3.png",
    alt: "Heritage Ambience",
    caption: "A table waiting for its guests.",
    aspectRatio: "landscape",
    objectPosition: "center",
    className: "col-span-12 md:col-span-8",
  },
  {
    category: "THE RESTAURANT",
    src: "/outside.jpeg",
    alt: "Maurya Exterior",
    caption: "Welcoming you since 1999.",
    aspectRatio: "square",
    objectPosition: "center",
    className: "col-span-12 md:col-span-4",
  },

  // --- THE KITCHEN ---

  {
    category: "THE KITCHEN",
    src: "/editorial-food-3.png",
    alt: "Food Prep",
    caption: "Delicate garnishing.",
    aspectRatio: "portrait",
    objectPosition: "center",
    className: "col-span-12 md:col-span-4",
  },
  {
    category: "THE KITCHEN",
    src: "/editorial-spices.png",
    alt: "Fresh Spices",
    caption: "The foundation of flavor.",
    aspectRatio: "landscape",
    objectPosition: "center",
    className: "col-span-12 md:col-span-8",
  },

  // --- SIGNATURE DISHES ---
  {
    category: "SIGNATURE DISHES",
    src: "/dish-masala-dosa.png",
    alt: "Masala Dosa",
    caption: "The golden crisp of our Masala Dosa.",
    aspectRatio: "landscape",
    objectPosition: "center",
    className: "col-span-12 md:col-span-7",
  },
  {
    category: "SIGNATURE DISHES",
    src: "/dish-paneer-butter-masala.png",
    alt: "Paneer Butter Masala",
    caption: "Rich, creamy, unforgettable.",
    aspectRatio: "square",
    objectPosition: "center",
    className: "col-span-12 md:col-span-5",
  },
  {
    category: "SIGNATURE DISHES",
    src: "/dish-veg-biryani.png",
    alt: "Veg Biryani",
    caption: "Aromatic layers of saffron and spice.",
    aspectRatio: "square",
    objectPosition: "center bottom",
    className: "col-span-12 md:col-span-4",
  },
  {
    category: "SIGNATURE DISHES",
    src: "/dish-hot-sour-soup.png",
    alt: "Hot & Sour Soup",
    caption: "The perfect start.",
    aspectRatio: "landscape",
    objectPosition: "center",
    className: "col-span-12 md:col-span-4",
  },
  {
    category: "SIGNATURE DISHES",
    src: "/editorial-table-feast.png",
    alt: "A Grand Feast",
    caption: "Our signature spread, meant to be shared.",
    aspectRatio: "landscape",
    objectPosition: "center top",
    className: "col-span-12 md:col-span-8",
  },

  // --- THE DETAILS ---
  {
    category: "THE DETAILS",
    src: "/editorial-texture.png",
    alt: "Wall Texture",
    caption: "Imperfections that tell a story.",
    aspectRatio: "portrait",
    objectPosition: "center",
    className: "col-span-12 md:col-span-4",
  },

];

export default function JournalGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxState, setLightboxState] = useState<{ isOpen: boolean; index: number | null }>({
    isOpen: false,
    index: null,
  });

  const categories = useMemo(() => {
    const cats = new Set(galleryData.map(img => img.category));
    return Array.from(cats);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Gentle fade in for images as they scroll into view
      const images = gsap.utils.toArray(".journal-image-container");
      images.forEach((img: any) => {
        gsap.fromTo(img, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const openLightbox = (index: number) => {
    setLightboxState({ isOpen: true, index });
  };

  const closeLightbox = () => {
    setLightboxState({ isOpen: false, index: null });
  };

  const nextLightbox = () => {
    setLightboxState(prev => {
      if (prev.index === null) return prev;
      return { ...prev, index: (prev.index + 1) % galleryData.length };
    });
  };

  const prevLightbox = () => {
    setLightboxState(prev => {
      if (prev.index === null) return prev;
      return { ...prev, index: (prev.index - 1 + galleryData.length) % galleryData.length };
    });
  };

  const getAspectClass = (aspectRatio: string) => {
    switch (aspectRatio) {
      case "portrait": return "aspect-[4/5]";
      case "square": return "aspect-square";
      case "hero": return "aspect-[21/9]";
      case "landscape":
      default: return "aspect-[16/9]";
    }
  };

  return (
    <section ref={containerRef} className="w-full relative z-20 py-16 md:py-32">
      
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col gap-24 md:gap-40">
        {categories.map((category) => {
          // Filter images by category
          const categoryImages = galleryData.map((img, i) => ({ ...img, globalIndex: i })).filter(img => img.category === category);
          
          return (
            <div key={category} className="flex flex-col gap-8 md:gap-12">
              
              {/* Editorial Chapter Heading */}
              <div className="border-b border-[#350709]/10 pb-4 flex items-baseline justify-between">
                <h2 className="font-serif text-3xl md:text-5xl italic text-[#350709] opacity-90 tracking-tight">
                  {category}
                </h2>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#B98532] hidden sm:block">
                  Chapter
                </span>
              </div>

              {/* Magazine Grid */}
              <div className="grid grid-cols-12 gap-4 md:gap-8">
                {categoryImages.map((image) => (
                  <div 
                    key={image.globalIndex}
                    className={`journal-image-container group cursor-pointer flex flex-col ${image.className}`}
                    onClick={() => openLightbox(image.globalIndex)}
                  >
                    {/* The Frame */}
                    <div className="relative w-full bg-[#FAF7F2] p-2 md:p-3 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#EBE7DF] transition-all duration-500 ease-out group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] overflow-hidden rounded-sm">
                      
                      {/* Image Container */}
                      <div className={`relative w-full overflow-hidden ${getAspectClass(image.aspectRatio)}`}>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover transition-transform duration-[10s] ease-out group-hover:scale-[1.03]"
                          style={{ objectPosition: image.objectPosition }}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {/* Soft light reflection overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      </div>

                    </div>

                    {/* Small Caption */}
                    <div className="mt-3 md:mt-4 flex justify-between items-start opacity-70 group-hover:opacity-100 transition-opacity duration-300 px-1">
                      <span className="font-serif italic text-xs md:text-sm text-[#350709]">
                        {image.caption}
                      </span>
                      <span className="font-mono text-[8px] tracking-[0.2em] text-[#8F1115] mt-1 shrink-0 ml-4">
                        + VIEW
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

      <JournalLightbox 
        images={galleryData}
        isOpen={lightboxState.isOpen}
        currentIndex={lightboxState.index}
        onClose={closeLightbox}
        onNext={nextLightbox}
        onPrev={prevLightbox}
      />
    </section>
  );
}
