"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Scene3Ambience() {
  const containerRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const candlelightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      
      // Floating Images Parallax
      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        
        gsap.fromTo(img, 
          { y: 150 - (i * 50) },
          {
            y: -150 + (i * 30),
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            }
          }
        );
      });

      // Candlelight pulsing
      gsap.to(candlelightRef.current, {
        opacity: 0.8,
        scale: 1.1,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[150vh] bg-[#2A2A1E] overflow-hidden flex items-center justify-center py-32">
      
      {/* ─── BACKGROUND: DEEP OLIVE & ESPRESSO ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A14] to-[#2A2A1E]" />
        
        {/* Pulsing Candlelight Overlay */}
        <div 
          ref={candlelightRef}
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle,rgba(232,220,199,0.15)_0%,rgba(184,137,63,0.05)_40%,transparent_70%)] mix-blend-color-dodge blur-[80px]"
        />
        
        <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
      </div>

      <div className="relative w-full max-w-[1400px] h-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0 px-6 md:px-12">

        {/* Left Column Text */}
        <div className="w-full md:w-1/3 z-20 flex flex-col justify-center relative">
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#B8893F] mb-6">The Ambience</span>
          <h2 className="font-serif text-5xl lg:text-7xl text-[#FDFBF7] font-normal leading-[1.1] mb-8">
            Warmth<br />
            <span className="italic text-[#8A4B38]">& Light.</span>
          </h2>
          <p className="font-sans text-sm text-[#FDFBF7]/60 leading-relaxed max-w-sm">
            Architecture designed to fade into the background, leaving only the warmth of conversation and the glow of the evening.
          </p>
        </div>

        {/* Right Column: Overlapping Gallery */}
        <div className="w-full md:w-2/3 relative h-[80vh] md:h-[100vh] flex items-center justify-center">
          
          {/* Image 1: Tall Portrait (Background) */}
          <div 
            ref={el => { imagesRef.current[0] = el!; }}
            className="absolute left-[10%] md:left-[20%] top-[10%] w-[50%] md:w-[40%] aspect-[3/4] shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-10 border border-[#FDFBF7]/5"
          >
            <div className="w-full h-full relative overflow-hidden bg-[#1A1A14]">
              <Image src="/editorial-entrance.png" alt="Interior Details" fill className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000" />
            </div>
          </div>

          {/* Image 2: Wide Landscape (Foreground Right) */}
          <div 
            ref={el => { imagesRef.current[1] = el!; }}
            className="absolute right-[5%] md:right-[10%] top-[40%] md:top-[30%] w-[60%] md:w-[50%] aspect-[16/9] shadow-[0_40px_80px_rgba(0,0,0,0.9)] z-20 border border-[#FDFBF7]/10"
          >
            <div className="w-full h-full relative overflow-hidden bg-[#1A1A14]">
              <Image src="/editorial-food-2.png" alt="Warm Atmosphere" fill className="object-cover sepia-[0.3] contrast-125" />
            </div>
            {/* Cinematic Caption */}
            <div className="absolute -bottom-8 right-0 font-mono text-[8px] uppercase tracking-widest text-[#FDFBF7]/40">
              The Dining Room, 8:00 PM
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
