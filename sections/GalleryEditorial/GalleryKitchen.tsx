"use client";

import React, { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const KITCHEN_IMAGES = [
  { src: "/editorial-food-5.png", alt: "The Chef's Hands" },
  { src: "/editorial-food-mains.png", alt: "Copper Pot Spices" },
  { src: "/editorial-food-rice.png", alt: "Glassware Reflection" },
  { src: "/editorial-food-3.png", alt: "Plating Dosa Detail" },
  { src: "/editorial-food-2.png", alt: "Kitchen Service Rush" },
  { src: "/editorial-spices.png", alt: "Aromatics Study" },
  { src: "/editorial-food-desserts.png", alt: "Sweet Prep Finish" },
  { src: "/editorial-texture.png", alt: "Rustic Board Grain" },
  { src: "/cinematic-overhead-table.png", alt: "Table Details" },
];

const COLLAGE_STATES = [
  { x: -50, y: -40, rot: -12, scale: 1.2 },
  { x: 10, y: -60, rot: 8, scale: 1.3 },
  { x: 60, y: -30, rot: -8, scale: 1.2 },
  { x: -70, y: 10, rot: 15, scale: 1.25 },
  { x: 0, y: 0, rot: -4, scale: 1.4 },
  { x: 70, y: -10, rot: 6, scale: 1.15 },
  { x: -40, y: 50, rot: -10, scale: 1.2 },
  { x: 20, y: 60, rot: 12, scale: 1.3 },
  { x: 50, y: 40, rot: -6, scale: 1.2 },
];

const GalleryKitchen = memo(function GalleryKitchen() {
  const containerRef = useRef<HTMLElement>(null);
  const breakTextRef = useRef<HTMLHeadingElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      
      // Editorial Break Fade
      if (breakTextRef.current) {
        gsap.fromTo(breakTextRef.current,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.5, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: breakTextRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // The Signature Moment Timeline - Scrapbook pile to clean aligned grid
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sequenceRef.current,
          start: "top top",
          end: "+=1200", // Shorter, cleaner pin duration
          scrub: 1,
          pin: true,
          onEnter: () => itemsRef.current.forEach(el => gsap.set(el, { willChange: "transform, opacity" })),
          onLeave: () => itemsRef.current.forEach(el => gsap.set(el, { willChange: "auto" })),
          onEnterBack: () => itemsRef.current.forEach(el => gsap.set(el, { willChange: "transform, opacity" })),
          onLeaveBack: () => itemsRef.current.forEach(el => gsap.set(el, { willChange: "auto" })),
        }
      });

      // Scatter to Grid Transition
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        const start = COLLAGE_STATES[i];
        
        // Setup initial messy heap state
        gsap.set(el, { 
          xPercent: isMobile ? start.x / 1.8 : start.x, 
          yPercent: isMobile ? start.y / 1.8 : start.y, 
          rotationZ: start.rot, 
          scale: start.scale,
          opacity: 0
        });

        // Assemble into clean 3x3 layout
        tl.to(el, {
          xPercent: 0,
          yPercent: 0,
          rotationZ: 0,
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: "power3.inOut"
        }, 0);
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const setItemRef = (index: number) => (el: HTMLDivElement | null) => {
    itemsRef.current[index] = el!;
  };

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden content-visibility-auto pt-12 z-10">
      
      {/* The Signature Sequence */}
      <div ref={sequenceRef} className="relative w-full h-screen flex flex-col items-center justify-center bg-[#E0D8D0]">
        
        {/* Grease paper / rough texture overlay */}
        <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-30 mix-blend-multiply pointer-events-none" />

        {/* Integrated Background Typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h2 ref={breakTextRef} className="font-serif text-5xl md:text-8xl italic opacity-20 text-[#8B7355] text-center tracking-tighter mix-blend-multiply">
            Every Plate<br />Carries A Story.
          </h2>
        </div>

        {/* Aligned Grid with Polaroid styling & Hover Focus States */}
        <div className="relative z-10 w-full max-w-[850px] px-6 grid grid-cols-3 gap-3 md:gap-6 mt-16">
          {KITCHEN_IMAGES.map((img, i) => (
            <div 
              key={`kitchen-${i}`}
              ref={setItemRef(i)}
              className="relative aspect-square md:aspect-[4/5] bg-[#FAF7F2] p-2 md:p-3 shadow-md hover:shadow-2xl border border-black/5 transition-all duration-300 hover:scale-[1.06] hover:z-40 cursor-pointer group"
            >
              <div className="relative w-full h-full overflow-hidden border border-black/5">
                <Image 
                  src={img.src} 
                  alt={img.alt} 
                  fill 
                  sizes="(max-width: 768px) 30vw, 20vw" 
                  className="object-cover contrast-105 transition-transform duration-500 group-hover:scale-105" 
                  decoding="async" 
                  loading="lazy" 
                />
                
                {/* Vintage dark wine label cover overlay on hover */}
                <div className="absolute inset-0 bg-[#350709]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 md:p-4 text-left pointer-events-none">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#B98532] block mb-1">
                    Detail {i + 1}
                  </span>
                  <span className="font-serif text-[11px] md:text-xs text-white/90 leading-tight italic">
                    {img.alt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ambient tags */}
        <div className="absolute bottom-10 left-10 font-mono text-[9px] uppercase tracking-widest text-black/60 pointer-events-none">
          Kitchen Ritual
        </div>
        <div className="absolute top-10 right-10 font-mono text-[9px] uppercase tracking-widest text-black/60 pointer-events-none">
          Plating Study
        </div>
      </div>

    </section>
  );
});

export default GalleryKitchen;
