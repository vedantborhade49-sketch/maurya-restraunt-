"use client";

import React, { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const GalleryHero = memo(function GalleryHero() {
  const containerRef = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1, // Normal pacing
        }
      });
      
      // Hero image parallax & fade
      if (heroImgRef.current) {
        tl.to(heroImgRef.current, { yPercent: 20, ease: "none" }, 0);
      }
      
      // Warm spotlight sweep
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          x: "100vw",
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[120vh] flex flex-col justify-center items-center py-32 px-6 md:px-12 overflow-hidden content-visibility-auto [contain-intrinsic-size:120vh]">
      
      {/* Animated Warm Spotlight */}
      <div 
        ref={spotlightRef}
        className="absolute top-[-20%] left-[-50%] w-[150vw] h-[150vh] bg-[radial-gradient(ellipse_at_center,rgba(255,220,180,0.15)_0%,transparent_60%)] pointer-events-none mix-blend-overlay z-20"
      />

      <div className="relative w-full max-w-[1400px] mx-auto z-10 flex flex-col items-center">
        
        {/* Oversized Architectural Typography */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-between items-start pointer-events-none opacity-10 select-none z-0">
          <span className="font-serif text-[20vw] leading-none tracking-tighter mix-blend-multiply">SATURDAY</span>
        </div>
        <div className="absolute bottom-10 right-0 w-full h-full flex justify-end items-end pointer-events-none opacity-10 select-none z-0">
          <span className="font-serif text-[18vw] leading-none tracking-tighter mix-blend-multiply">EVENING</span>
        </div>

        {/* The Gallery Header */}
        <div className="w-full flex flex-col items-center text-center z-20 mt-12 mb-20">
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] opacity-80 mb-6 block">The Gallery</span>
          <h1 className="font-serif text-5xl md:text-8xl leading-[0.9] tracking-tighter">
            Visual<br />
            <span className="italic opacity-80">Moments.</span>
          </h1>
        </div>

        {/* Museum Mounted Hero Photograph */}
        <div 
          ref={heroImgRef}
          className="relative w-full md:w-[65%] aspect-[16/9] md:aspect-[21/9] bg-[#F6EFE6] p-4 md:p-8 shadow-[0_40px_80px_rgba(0,0,0,0.2)] z-30 transform transition-transform duration-1000 hover:scale-[1.02] hover:shadow-[0_50px_100px_rgba(0,0,0,0.3)]"
        >
          <div className="relative w-full h-full overflow-hidden border border-black/5">
            <Image 
              src="/editorial-food-3.png" 
              alt="Saturday Evening Preparation" 
              fill 
              priority 
              sizes="(max-width: 768px) 100vw, 65vw" 
              className="object-cover transition-transform duration-1000 hover:scale-105" 
              decoding="async" 
            />
          </div>
          {/* Museum Mount Plaque */}
          <div className="absolute -bottom-16 md:-bottom-20 right-0 md:right-10 flex flex-col items-end text-right">
            <span className="font-mono text-[8px] uppercase tracking-widest opacity-60">Saturday Evening</span>
            <span className="font-serif text-sm italic mt-1">Since 1989</span>
          </div>
        </div>

      </div>
    </section>
  );
});

export default GalleryHero;
