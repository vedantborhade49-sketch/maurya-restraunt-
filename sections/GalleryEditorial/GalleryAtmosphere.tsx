"use client";

import React, { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion } from "framer-motion";

const GalleryAtmosphere = memo(function GalleryAtmosphere() {
  const containerRef = useRef<HTMLElement>(null);
  const breakTextRef = useRef<HTMLHeadingElement>(null);
  const panoRef = useRef<HTMLDivElement>(null);

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
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Panoramic Scroll Parallax
      if (panoRef.current) {
        gsap.fromTo(panoRef.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full overflow-visible bg-[#161413] text-[#F6EFE6] py-24 md:py-36 z-30">
      
      {/* Texture Background Overlay */}
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-15 mix-blend-overlay pointer-events-none" />

      {/* Main Container */}
      <div className="relative w-full max-w-[1200px] mx-auto px-6 md:px-12 z-10 flex flex-col items-center">
        
        {/* Cinematic Centered Title */}
        <div className="text-center mb-16 md:mb-24 z-20">
          <h2 ref={breakTextRef} className="font-heading text-5xl md:text-8xl tracking-tight leading-none text-[#F8F6F1] font-bold uppercase select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            THE EVENING<br />
            <span className="font-instrument italic text-[#B98532] lowercase normal-case tracking-normal block mt-3 font-normal text-6xl md:text-9xl">
              Begins.
            </span>
          </h2>
        </div>

        {/* Widescreen Film Canvas Container */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] border-[6px] md:border-[10px] border-white/5 bg-black overflow-hidden rounded-sm shadow-[0_30px_70px_rgba(0,0,0,0.8)] z-10 group cursor-pointer">
          {/* Inner Vignette shadow */}
          <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />
          
          <div ref={panoRef} className="absolute w-full h-[120%] -top-[10%] left-0">
            <Image 
              src="/outside.jpeg" 
              alt="Dinner Rush Atmosphere" 
              fill 
              className="object-cover opacity-85 transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:opacity-100" 
              decoding="async" 
              loading="lazy" 
            />
          </div>

          {/* Film Accents */}
          <div className="absolute bottom-6 left-6 md:left-12 font-mono text-[9px] uppercase tracking-widest text-white/50 z-30">
            WARM LIGHT / 35MM
          </div>
          <div className="absolute top-6 right-6 md:right-12 font-mono text-[9px] uppercase tracking-widest text-white/50 z-30">
            DINNER RUSH
          </div>
        </div>

        {/* Floating Scrapbook Overlays Container */}
        <div className="relative w-full max-w-[1100px] mt-8 md:mt-0 md:-translate-y-12 z-20 flex flex-col md:flex-row items-center justify-between gap-12 pointer-events-none">
          
          {/* 1. Vintage Handwritten Guest Log Sheet */}
          <motion.div 
            initial={{ rotate: -4 }}
            whileHover={{ rotate: 1, scale: 1.04, y: -10 }}
            transition={{ type: "spring", stiffness: 250, damping: 15 }}
            className="w-full max-w-[280px] p-6 bg-[#FAF7F2] text-black shadow-[0_15px_35px_rgba(0,0,0,0.25)] rounded-sm pointer-events-auto transform border border-black/5"
          >
            {/* Header */}
            <div className="border-b-2 border-dashed border-[#8F1115]/30 pb-3 mb-4">
              <p className="font-mono text-[9px] uppercase tracking-widest text-black/50">MAURYA - PUNE</p>
              <h4 className="font-serif italic text-lg text-[#8F1115] mt-1">Guest Log</h4>
            </div>
            {/* Log Entries */}
            <ul className="space-y-3 font-mono text-[10px] text-black/85 leading-normal">
              <li>
                <span className="font-bold text-[#8F1115]">TBL 04</span> / 02 Guests<br />
                <span className="italic font-serif text-[11px] text-black/60 font-medium">"Celebrating 40 winters together."</span>
              </li>
              <li>
                <span className="font-bold text-[#8F1115]">TBL 11</span> / 06 Guests<br />
                <span className="italic font-serif text-[11px] text-black/60 font-medium">"The laughter carries across rooms."</span>
              </li>
              <li>
                <span className="font-bold text-[#8F1115]">TBL 09</span> / 04 Guests<br />
                <span className="italic font-serif text-[11px] text-black/60 font-medium">"Savoring the last warm Dosa."</span>
              </li>
            </ul>
          </motion.div>

          {/* 2. Floating Polaroid card of Sweet Endings */}
          <motion.div 
            initial={{ rotate: 5 }}
            whileHover={{ rotate: -2, scale: 1.05, y: -12 }}
            transition={{ type: "spring", stiffness: 250, damping: 15 }}
            className="w-full max-w-[240px] p-4 pb-8 bg-[#fdfbf7] shadow-[0_15px_35px_rgba(0,0,0,0.25)] rounded-sm pointer-events-auto border border-black/5"
          >
            {/* Image Box */}
            <div className="relative aspect-square w-full bg-black overflow-hidden border border-black/5 mb-3">
              <Image 
                src="/editorial-food-desserts.png" 
                alt="Sweet Finish" 
                fill 
                className="object-cover contrast-110 saturate-[0.85]" 
                loading="lazy"
              />
            </div>
            {/* Polaroid Handwriting */}
            <p className="font-serif italic text-center text-black/75 text-[15px] select-none">
              "The sweet finish."
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
});

export default GalleryAtmosphere;
