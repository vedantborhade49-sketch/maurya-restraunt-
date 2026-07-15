"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import gsap from "gsap";

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: string;
  aspect: string; // Tailwind aspect-ratio or styling override
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    src: "/editorial-food-1.png",
    title: "Crispy Golden Starters",
    category: "STARTERS",
    aspect: "aspect-[4/3] md:col-span-8",
  },
  {
    id: 2,
    src: "/editorial-food-2.png",
    title: "Rich Aromatic Curries",
    category: "MAINS",
    aspect: "aspect-[3/4] md:col-span-4",
  },
  {
    id: 3,
    src: "/editorial-food-3.png",
    title: "Tandoori Specialities",
    category: "TANDOOR",
    aspect: "aspect-[3/4] md:col-span-4",
  },
  {
    id: 4,
    src: "/restaurant-interior.png",
    title: "Warm Heritage Ambience",
    category: "AMBIENCE",
    aspect: "aspect-[16/10] md:col-span-8",
  },
  {
    id: 5,
    src: "/editorial-food-4.png",
    title: "The Celebrated Veg Paratha",
    category: "SIGNATURES",
    aspect: "aspect-[4/3] md:col-span-6",
  },
  {
    id: 6,
    src: "/editorial-food-5.png",
    title: "Sweet Traditional Delights",
    category: "DESSERTS",
    aspect: "aspect-[4/3] md:col-span-6",
  },
];

export default function GalleryPage() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal animation for gallery items
    const ctx = gsap.context(() => {
      gsap.fromTo(".gallery-card", 
        { opacity: 0, y: 40, scale: 0.98 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.08, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gallery-grid",
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === "Escape") setActivePhotoIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex]);

  const handleNext = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev !== null && prev < GALLERY_ITEMS.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : GALLERY_ITEMS.length - 1));
  };

  const activePhoto = activePhotoIndex !== null ? GALLERY_ITEMS[activePhotoIndex] : null;

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#0B0908] text-[#F3E8D4] pt-32 pb-24 px-4 sm:px-6 md:px-12 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Header segment */}
        <div className="text-center space-y-4">
          <span className="font-sans text-[10px] tracking-[0.3em] text-[#B98532] font-extrabold uppercase block">
            VISUAL STORIES
          </span>
          <h1 className="font-serif font-bold text-5xl md:text-7xl tracking-tight text-white leading-none">
            The Gallery
          </h1>
          <p className="text-xs text-[#F3E8D4]/60 max-w-sm mx-auto tracking-wide uppercase font-sans">
            A window into the flavors and moments of the Maurya kitchen.
          </p>
          <div className="w-16 h-[1.5px] bg-[#B98532] mx-auto mt-6" />
        </div>

        {/* Asymmetric Masonry Grid */}
        <div className="gallery-grid grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActivePhotoIndex(index)}
              className={`gallery-card group relative rounded-2xl overflow-hidden cursor-pointer border border-white/5 bg-wine/5 shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-all duration-500 hover:border-[#B98532]/30 ${item.aspect}`}
            >
              {/* Image and hover overlays */}
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Interactive icons/tags */}
              <div className="absolute top-4 left-4 bg-[#8F1115] text-[#F3E8D4] font-sans text-[9px] font-bold tracking-widest px-2.5 py-1 rounded">
                {item.category}
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 p-2 rounded-full border border-white/10">
                <Maximize2 className="w-4 h-4 text-[#B98532]" />
              </div>

              <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <h3 className="font-serif italic text-xl sm:text-2xl text-white tracking-wide">
                  {item.title}
                </h3>
                <p className="font-sans text-[9px] tracking-widest text-[#B98532] uppercase">
                  Click to Expand
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Sticky footer CTAs */}
        <div className="border-t border-white/10 pt-12 text-center space-y-6">
          <p className="font-serif italic text-lg sm:text-xl text-[#F3E8D4]/80">
            "Your table is ready and waiting for a story."
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/menu"
              className="px-8 py-3.5 bg-[#8F1115] hover:bg-[#8F1115]/90 text-[#F3E8D4] text-xs font-bold uppercase tracking-widest rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-px"
            >
              Order Online
            </Link>
            <Link
              href="/book-a-table"
              className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
            >
              Book Table
            </Link>
          </div>
        </div>

      </div>

      {/* Full-featured Lightbox Overlay */}
      {activePhoto && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col justify-between items-center p-4 md:p-8 backdrop-blur-sm select-none">
          
          {/* Lightbox Header */}
          <div className="w-full max-w-5xl flex justify-between items-center z-10">
            <span className="font-sans text-xs tracking-widest text-[#B98532] font-bold">
              {activePhoto.category} ({activePhotoIndex! + 1} / {GALLERY_ITEMS.length})
            </span>
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="text-[#F3E8D4] hover:text-[#B98532] transition-colors p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Main Stage */}
          <div className="w-full flex items-center justify-between gap-4 flex-1">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="text-[#F3E8D4] hover:text-[#B98532] transition-colors p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Photo Wrapper */}
            <div className="relative w-full max-w-3xl aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.9)]">
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="object-cover"
                priority
              />
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="text-[#F3E8D4] hover:text-[#B98532] transition-colors p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Footer Info */}
          <div className="w-full max-w-2xl text-center space-y-1 z-10 pb-4">
            <h2 className="font-serif italic text-2xl md:text-3xl text-white tracking-wide">
              {activePhoto.title}
            </h2>
            <p className="font-sans text-[10px] tracking-widest text-[#B98532] uppercase">
              USE LEFT / RIGHT ARROW KEYS TO NAVIGATE
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
