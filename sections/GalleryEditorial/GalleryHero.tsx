"use client";

import React, { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Colorful illustrative Ganpati animated icon (no photo, no text)
const ColorfulGanpatiIcon = () => (
  <div className="relative mb-6 flex items-center justify-center select-none pointer-events-auto group">
    {/* Animated rotating golden halo */}
    <div 
      className="absolute w-24 h-24 rounded-full border-2 border-dashed border-[#FFCC00]/50 animate-[spin_20s_linear_infinite] group-hover:border-[#FFCC00] transition-colors"
    />
    <div 
      className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF9900]/20 via-[#FFCC00]/30 to-[#FF3300]/20 animate-pulse blur-sm"
    />
    {/* Illustrative Ganesha colorful SVG */}
    <div className="relative z-10 transform transition-transform duration-500 group-hover:scale-110">
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_4px_10px_rgba(255,153,0,0.6)]">
        <defs>
          <linearGradient id="ganpatiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFCC00" />
            <stop offset="50%" stopColor="#FF9900" />
            <stop offset="100%" stopColor="#D84315" />
          </linearGradient>
          <linearGradient id="crownGrad" x1="0%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#D84315" />
            <stop offset="50%" stopColor="#FFCC00" />
            <stop offset="100%" stopColor="#FFF176" />
          </linearGradient>
        </defs>
        
        {/* Crown (Mukut) */}
        <path d="M50 12 L36 32 L64 32 Z" fill="url(#crownGrad)" />
        <circle cx="50" cy="10" r="3.5" fill="#FFF176" className="animate-ping" style={{ animationDuration: "3s" }} />
        <circle cx="50" cy="10" r="3" fill="#FFCC00" />
        <path d="M40 32 L50 18 L60 32 Z" fill="#FF9900" />
        
        {/* Ears */}
        <path d="M34 36 C20 36, 16 54, 30 62 C34 58, 36 48, 34 36 Z" fill="url(#ganpatiGrad)" opacity="0.9" />
        <path d="M66 36 C80 36, 84 54, 70 62 C66 58, 64 48, 66 36 Z" fill="url(#ganpatiGrad)" opacity="0.9" />
        
        {/* Face / Head */}
        <circle cx="50" cy="46" r="14" fill="url(#ganpatiGrad)" />
        
        {/* Trunk (Sond) curved elegantly */}
        <path d="M46 54 Q50 64 58 68 Q66 72 62 80 Q56 86 44 82 Q48 76 52 74 Q44 68 46 54 Z" fill="url(#ganpatiGrad)" />
        
        {/* Tika / Tilak on forehead */}
        <path d="M48 38 L52 38 L50 45 Z" fill="#D84315" />
        <circle cx="50" cy="41" r="1.5" fill="#FFF176" />
        
        {/* Tusks */}
        <path d="M42 53 L38 58 L43 55 Z" fill="#FFF8E1" />
        <path d="M58 53 L61 56 L57 55 Z" fill="#FFF8E1" />

        {/* Decorative sparkles */}
        <circle cx="25" cy="25" r="1.5" fill="#FFCC00" className="animate-pulse" />
        <circle cx="75" cy="28" r="1.5" fill="#FFCC00" className="animate-pulse" style={{ animationDelay: "1s" }} />
      </svg>
    </div>
  </div>
);

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
    <section ref={containerRef} className="relative w-full min-h-[70vh] flex flex-col justify-center items-center pt-32 pb-12 px-6 md:px-12 overflow-visible content-visibility-auto [contain-intrinsic-size:70vh]">
      
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

        {/* The Gallery Header with Colorful Animated Ganpati Icon */}
        <div className="w-full flex flex-col items-center text-center z-20 mt-12 mb-20">
          <ColorfulGanpatiIcon />
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] opacity-80 mb-4 block">The Gallery</span>
          <h1 className="font-serif text-5xl md:text-8xl leading-[0.9] tracking-tighter">
            Visual<br />
            <span className="italic opacity-80">Moments.</span>
          </h1>
        </div>

        {/* Museum Mounted Hero Photograph: OUTSIDE.JPEG IN STARTING */}
        <div 
          ref={heroImgRef}
          className="relative w-full md:w-[75%] aspect-[16/9] md:aspect-[21/9] bg-[#F6EFE6] p-4 md:p-8 shadow-[0_40px_80px_rgba(0,0,0,0.25)] z-30 transform transition-transform duration-1000 hover:scale-[1.02] hover:shadow-[0_50px_100px_rgba(0,0,0,0.35)] border border-black/10"
        >
          <div className="relative w-full h-full overflow-hidden border border-black/10 bg-black">
            <Image 
              src="/outside.jpeg" 
              alt="The Maurya Exterior at Start" 
              fill 
              priority 
              sizes="(max-width: 768px) 100vw, 75vw" 
              className="object-cover transition-transform duration-1000 hover:scale-105" 
              decoding="async" 
            />
            {/* Shimmer light animation */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
          {/* Museum Mount Plaque */}
          <div className="absolute -bottom-16 md:-bottom-20 right-0 md:right-10 flex flex-col items-end text-right">
            <span className="font-mono text-[9px] uppercase tracking-widest opacity-75 font-bold">The Entrance • Kondhwa, Pune</span>
            <span className="font-serif text-sm italic mt-1 text-[#8F1115] font-semibold">Since 1989</span>
          </div>
        </div>

      </div>
    </section>
  );
});

export default GalleryHero;
