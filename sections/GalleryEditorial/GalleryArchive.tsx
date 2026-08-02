"use client";

import React, { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Colorful illustrative Ganpati animated icon (no photo, no text)
const ColorfulGanpatiIcon = () => (
  <div className="relative my-4 flex items-center justify-center select-none pointer-events-auto group">
    <div className="absolute w-20 h-20 rounded-full border-2 border-dashed border-[#FFCC00]/50 animate-[spin_25s_linear_infinite]" />
    <div className="absolute w-14 h-14 rounded-full bg-gradient-to-tr from-[#FF9900]/25 via-[#FFCC00]/30 to-[#FF3300]/25 animate-pulse blur-md" />
    <div className="relative z-10 transform transition-transform duration-500 group-hover:scale-110">
      <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-[0_4px_10px_rgba(255,153,0,0.6)]">
        <defs>
          <linearGradient id="archiveGanpatiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFCC00" />
            <stop offset="50%" stopColor="#FF9900" />
            <stop offset="100%" stopColor="#D84315" />
          </linearGradient>
        </defs>
        <path d="M50 12 L36 32 L64 32 Z" fill="url(#archiveGanpatiGrad)" />
        <circle cx="50" cy="10" r="3" fill="#FFF176" className="animate-ping" style={{ animationDuration: "3s" }} />
        <circle cx="50" cy="10" r="2.5" fill="#FFCC00" />
        <path d="M40 32 L50 18 L60 32 Z" fill="#FF9900" />
        <path d="M34 36 C20 36, 16 54, 30 62 C34 58, 36 48, 34 36 Z" fill="url(#archiveGanpatiGrad)" />
        <path d="M66 36 C80 36, 84 54, 70 62 C66 58, 64 48, 66 36 Z" fill="url(#archiveGanpatiGrad)" />
        <circle cx="50" cy="46" r="14" fill="url(#archiveGanpatiGrad)" />
        <path d="M46 54 Q50 64 58 68 Q66 72 62 80 Q56 86 44 82 Q48 76 52 74 Q44 68 46 54 Z" fill="url(#archiveGanpatiGrad)" />
        <path d="M48 38 L52 38 L50 45 Z" fill="#D84315" />
        <circle cx="50" cy="41" r="1.5" fill="#FFF176" />
        <path d="M42 53 L38 58 L43 55 Z" fill="#FFF8E1" />
        <path d="M58 53 L61 56 L57 55 Z" fill="#FFF8E1" />
      </svg>
    </div>
  </div>
);

const GalleryArchive = memo(function GalleryArchive() {
  const containerRef = useRef<HTMLElement>(null);
  const breakTextRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
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
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Staggered Entrance for Showcase items
      ScrollTrigger.batch(itemsRef.current, {
        start: "top 85%",
        once: true,
        onEnter: (elements) => {
          gsap.fromTo(elements,
            { y: 60, opacity: 0, scale: 0.95 },
            { 
              y: 0, 
              opacity: 1, 
              scale: 1,
              duration: 1.4, 
              ease: "power3.out", 
              stagger: 0.2,
              onComplete: () => gsap.set(elements, { clearProps: "willChange" })
            }
          );
        }
      });

      // Zoom-in entrance animation on media inside cards
      const mediaElements = containerRef.current?.querySelectorAll(".collage-media");
      if (mediaElements && mediaElements.length > 0) {
        gsap.fromTo(mediaElements,
          { scale: 1.15 },
          {
            scale: 1,
            duration: 1.8,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            }
          }
        );
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const setItemRef = (index: number) => (el: HTMLDivElement | null) => {
    itemsRef.current[index] = el!;
  };

  return (
    <section ref={containerRef} className="relative w-full overflow-visible content-visibility-auto pt-8 md:pt-16 z-20">
      
      {/* The Master Archive Content */}
      <div className="relative w-full min-h-[60vh] flex flex-col justify-start items-center pt-4 pb-16 md:pt-8 md:pb-32 px-4 md:px-12">
        
        {/* Ambient Dust/Paper texture layer */}
        <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-20 mix-blend-overlay pointer-events-none" />

        <div className="relative w-full max-w-[1350px] z-10 flex flex-col items-center gap-10 md:gap-24">
          
          {/* Integrated Editorial Header */}
          <div className="w-full flex flex-col items-center justify-center text-center pb-4 md:pb-6 border-b border-black/10">
            <ColorfulGanpatiIcon />
            <span className="font-mono text-[9px] md:text-xs uppercase tracking-[0.35em] text-[#8F1115] font-bold block mb-1.5 md:mb-2">
              • THE MASTER ARCHIVE •
            </span>
            <h2 ref={breakTextRef} className="font-serif text-3xl sm:text-5xl md:text-7xl italic opacity-95 tracking-tight mix-blend-multiply text-black">
              Cinematic Heritage Since 1989.
            </h2>
          </div>
          
          {/* ═════════════════════════════════════════════════════════════════
              MASTER 5-ASSET SHOWCASE GRID
              Left: video.mp4 (in actual vertical reel size, aspect-[9/16])
              Right & Below: The 4 architectural core photographs
             ═════════════════════════════════════════════════════════════════ */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 items-start">
            
            {/* 1. LEFT COLUMN: VIDEO.MP4 (VERTICAL REEL IN ACTUAL PROPORTIONS) */}
            <div ref={setItemRef(0)} className="w-full aspect-[9/16] md:aspect-[9/14] relative bg-[#1c1a18] p-3 sm:p-4 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] rounded-sm transform transition-all duration-700 hover:scale-[1.01] active:scale-[0.98] hover:shadow-[0_35px_80px_rgba(0,0,0,0.4)] cursor-pointer group border-2 border-black/80 flex flex-col justify-between">
              
              {/* Metallic Director Binder Mount */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-gradient-to-b from-stone-200 via-stone-400 to-stone-600 rounded-t-md shadow-lg z-30 border-t border-white/60 flex items-center justify-center">
                <span className="font-mono text-[9px] uppercase tracking-widest text-black font-extrabold">MASTER REEL 001</span>
              </div>
              
              <div className="relative w-full flex-1 my-2 overflow-hidden border border-white/15 bg-black shadow-inner rounded-xs">
                <video 
                  src="/video.mp4" 
                  playsInline 
                  autoPlay 
                  loop 
                  muted 
                  className="collage-media w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
                />
                
                {/* Shimmer light beam animation */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                {/* Director REC Indicator */}
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase z-10 flex items-center gap-1.5 border border-red-500/50 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  <span className="text-red-500 font-extrabold">REC</span>
                  <span className="text-white/90">• REEL</span>
                </div>
                
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-[#FFCC00] px-2.5 py-1 rounded text-[9px] font-mono tracking-widest uppercase border border-[#FFCC00]/40 z-10 font-bold shadow-md">
                  TIMECODE: 19:89:00:24 • LIVE
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 px-1 text-[#F8F4ED]/80">
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#FFCC00] font-bold">★ THE LIVE REEL • ACTUAL SIZE</p>
                <span className="font-serif italic text-xs text-white/90">Untouched Atmosphere</span>
              </div>
            </div>

            {/* RIGHT COLUMN: OUTSIDE.JPEG & COOKING.JPEG STACKED */}
            <div className="w-full flex flex-col gap-6 md:gap-14">
              
              {/* 2. OUTSIDE.JPEG (HERITAGE ENTRANCE ON THE RIGHT) */}
              <div ref={setItemRef(1)} className="w-full aspect-[16/10] relative bg-[#1c1a18] p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.25)] transform -rotate-1 transition-all duration-500 hover:rotate-0 hover:scale-[1.02] active:scale-[0.98] hover:shadow-2xl cursor-pointer group border border-black rounded-sm">
                {/* Kodak Sprocket Holes */}
                <div className="absolute top-1 inset-x-4 flex justify-between px-2 pointer-events-none z-20">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="w-3 h-2 bg-[#F8F4ED] rounded-xs opacity-80" />
                  ))}
                </div>
                <div className="absolute bottom-1 inset-x-4 flex justify-between px-2 pointer-events-none z-20">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="w-3 h-2 bg-[#F8F4ED] rounded-xs opacity-80" />
                  ))}
                </div>
                
                <div className="absolute -top-3 right-6 w-24 h-7 bg-[#e4decb]/95 rotate-3 shadow-md z-30 flex items-center justify-center">
                  <span className="font-mono text-[8px] text-black font-bold tracking-widest">KODAK 35MM</span>
                </div>

                <div className="relative w-full h-full my-2 overflow-hidden border border-white/20 bg-black">
                  <Image 
                    src="/outside.jpeg" 
                    alt="Restaurant Exterior" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw" 
                    className="collage-media object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                    decoding="async" 
                  />
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase border border-white/20 z-10 font-bold">
                    REF: 101-EXT / THE ENTRANCE
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2 px-1 text-white/90 font-mono text-[10px] uppercase tracking-wider">
                  <span className="text-[#FFCC00]">PUNE ESTD 1989</span>
                  <span className="font-serif italic text-xs text-white/80">The Original Doors</span>
                </div>
              </div>

              {/* 3. COOKING.JPEG (LIVE KITCHEN CRAFT ON THE RIGHT BELOW OUTSIDE) */}
              <div ref={setItemRef(2)} className="w-full aspect-[16/10] relative bg-[#fdfbf7] p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.2)] transform rotate-1 transition-all duration-500 hover:rotate-0 hover:scale-[1.02] active:scale-[0.98] hover:shadow-2xl cursor-pointer group border border-black/10 rounded-sm">
                <div className="absolute -top-3 left-8 w-24 h-6 bg-[#8F1115] text-white shadow-md z-30 flex items-center justify-center rounded-sm">
                  <span className="font-mono text-[8px] font-bold tracking-widest">CHEF'S JOURNAL</span>
                </div>
                
                <div className="relative w-full h-full overflow-hidden border border-black/15 bg-black">
                  <Image 
                    src="/cooking.jpeg" 
                    alt="Live Kitchen Cooking" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw" 
                    className="collage-media object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                    decoding="async" 
                  />
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-[#FFCC00] px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase border border-[#FFCC00]/40 z-10 font-bold shadow-md">
                    LIVE TAWA CRAFT • MASTERY
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3 px-1 text-black/80 font-mono text-[10px] uppercase tracking-wider">
                  <span className="font-bold text-[#8F1115]">REF: 301-KIT / THE FIRE</span>
                  <span className="font-serif italic text-xs text-black/70">Authentic Preparation</span>
                </div>
              </div>

            </div>

          </div>

          {/* ═════════════════════════════════════════════════════════════════
              BOTTOM ROW: INSIDE1.JPEG & INSIDE2.JPEG
              ═════════════════════════════════════════════════════════════════ */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 items-start mt-2">
            
            {/* 4. INSIDE1.JPEG (MAIN DINING HALL) */}
            <div ref={setItemRef(3)} className="w-full aspect-[16/10] relative bg-[#fdfbf7] p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.2)] transform rotate-1 transition-all duration-500 hover:rotate-0 hover:scale-[1.02] active:scale-[0.98] hover:shadow-2xl cursor-pointer group border border-black/10 rounded-sm">
              <div className="absolute -top-3 right-10 w-28 h-6 bg-[#e4decb]/95 -rotate-2 shadow-md z-30 flex items-center justify-center">
                <span className="font-mono text-[8px] text-black font-bold tracking-widest">FAMILY SANCTUARY</span>
              </div>

              <div className="relative w-full h-full overflow-hidden border border-black/15 bg-black">
                <Image 
                  src="/inside1.jpeg" 
                  alt="Main Dining Hall" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw" 
                  className="collage-media object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                  decoding="async" 
                />
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase border border-white/20 z-10 font-bold">
                  REF: 201-INT / MAIN HALL
                </div>
              </div>
              <div className="flex justify-between items-center mt-3 px-1 text-black/80 font-mono text-[10px] uppercase tracking-wider">
                <span className="font-bold text-[#8F1115]">PUNE SANCTUARY</span>
                <span className="font-serif italic text-xs text-black/70">Where Generations Return</span>
              </div>
            </div>

            {/* 5. INSIDE2.JPEG (EVENING DINING AMBIENCE) */}
            <div ref={setItemRef(4)} className="w-full aspect-[16/10] relative bg-[#1c1a18] p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.25)] transform -rotate-1 transition-all duration-500 hover:rotate-0 hover:scale-[1.02] active:scale-[0.98] hover:shadow-2xl cursor-pointer group border border-black rounded-sm">
              <div className="absolute -top-3 left-10 w-28 h-6 bg-[#FFCC00] text-black shadow-md z-30 flex items-center justify-center rounded-sm rotate-2">
                <span className="font-mono text-[8px] font-extrabold tracking-widest">WARM EVENINGS</span>
              </div>

              <div className="relative w-full h-full my-1 overflow-hidden border border-white/20 bg-black">
                <Image 
                  src="/inside2.jpeg" 
                  alt="Evening Ambience Setup" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw" 
                  className="collage-media object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                  decoding="async" 
                />
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-[#FFCC00] px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase border border-[#FFCC00]/40 z-10 font-bold">
                  REF: 204-INT / ATMOSPHERE
                </div>
              </div>
              <div className="flex justify-between items-center mt-2 px-1 text-white/90 font-mono text-[10px] uppercase tracking-wider">
                <span className="text-[#FFCC00]">TIMELINE AMBIENCE</span>
                <span className="font-serif italic text-xs text-white/80">Every Table Has A Story</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
});

export default GalleryArchive;
