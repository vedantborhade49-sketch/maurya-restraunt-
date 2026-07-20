"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

export default function Chapter07Arrival() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  
  // Elements
  const sunlightRef = useRef<HTMLDivElement>(null);
  const m1TextRef = useRef<HTMLDivElement>(null);
  const linenRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const spoonRef = useRef<HTMLDivElement>(null);
  const forkRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Moment 5 (Climax)
  const candlelightRef = useRef<HTMLDivElement>(null);
  const steamRefs = useRef<HTMLDivElement[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=4000", // 4000px of scrolling for the table prep
          pin: true,
          scrub: 1,
        }
      });

      // INITIAL STATES
      gsap.set(linenRef.current, { y: "120%", rotationZ: 5 });
      gsap.set(plateRef.current, { x: "-150vw", rotationZ: -45 });
      gsap.set(spoonRef.current, { y: "-100vh", opacity: 0 });
      gsap.set(forkRef.current, { y: "100vh", opacity: 0 });
      gsap.set(cardRef.current, { x: "100vw", rotationZ: 15 });
      gsap.set(candlelightRef.current, { opacity: 0, scale: 0.5 });
      gsap.set(ctaRef.current, { opacity: 0 });

      // ─── MOMENT 1: EXPECTING YOU ──────────────────────────────────
      tl.to(m1TextRef.current, { opacity: 1, duration: 1, ease: "power2.inOut" }, 0)
        .to(m1TextRef.current, { opacity: 0, y: -30, duration: 1, ease: "power2.in" }, 2);

      // ─── MOMENT 2: THE LINEN ──────────────────────────────────────
      tl.to(linenRef.current, {
        y: "0%", rotationZ: -2,
        duration: 3, ease: "power2.out"
      }, 2.5);

      // ─── MOMENT 3: THE PLACE SETTING ──────────────────────────────
      // Plate slides in
      tl.to(plateRef.current, {
        x: "0vw", rotationZ: 0,
        duration: 2.5, ease: "back.out(1.1)"
      }, 4.5);
      
      // Cutlery slides in
      tl.to(forkRef.current, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }, 5.5);
      tl.to(spoonRef.current, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }, 5.7);

      // ─── MOMENT 4: RESERVATION CARD ───────────────────────────────
      tl.to(cardRef.current, {
        x: "0vw", rotationZ: -4,
        duration: 2.5, ease: "power3.out"
      }, 7.5);

      // ─── MOMENT 5: CANDLELIGHT & STEAM ────────────────────────────
      tl.to(sunlightRef.current, { opacity: 0, duration: 2 }, 10) // Fade daylight
        .to(candlelightRef.current, { opacity: 1, scale: 1, duration: 2, ease: "power2.inOut" }, 10) // Candle washes table
        .to(cardRef.current, { rotationZ: -1, scale: 1.05, duration: 2, ease: "power2.inOut" }, 10.5) // Card rotates toward visitor
        .to(ctaRef.current, { opacity: 1, duration: 1 }, 11.5); // CTA Signature reveals

      // Steam animation (loops independently once revealed)
      steamRefs.current.forEach((steam, i) => {
        if (!steam) return;
        gsap.to(steam, {
          y: -150,
          opacity: 0,
          scale: 2,
          duration: 3 + i,
          repeat: -1,
          ease: "power1.inOut",
          delay: i * 0.5,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-[#292421]">
      
      {/* ─── BACKGROUND: WALNUT WOOD TABLE ─── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Wood Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4A2E1B] to-[#292421]" />
        {/* Wood Texture/Grain */}
        <div 
          className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05 0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(41,36,33,0.8)_100%)]" />
      </div>

      {/* Sunlight Overlay (Fades out in Moment 5) */}
      <div ref={sunlightRef} className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#F6F0E7]/10 to-[#F6F0E7]/20 mix-blend-soft-light pointer-events-none" />

      {/* Candlelight Wash (Fades in in Moment 5) */}
      <div ref={candlelightRef} className="absolute inset-0 pointer-events-none z-40 origin-bottom-right">
        <div className="absolute bottom-[-20%] right-[-10%] w-[120vw] h-[120vw] rounded-full bg-[radial-gradient(circle,rgba(232,220,199,0.3)_0%,rgba(184,137,63,0.15)_40%,transparent_80%)] mix-blend-color-dodge blur-[50px]" />
      </div>

      <div ref={pinContainerRef} className="relative w-full h-full max-w-[1400px] mx-auto">
        
        {/* ━━━━━━━━ MOMENT 1: TEXT ━━━━━━━━ */}
        <div ref={m1TextRef} className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none z-10">
          <h2 className="font-serif text-4xl md:text-6xl text-[#E8DCC7] font-normal tracking-wide drop-shadow-xl">
            We've Been Expecting You.
          </h2>
        </div>

        {/* ━━━━━━━━ MOMENT 2: LINEN CLOTH ━━━━━━━━ */}
        <div 
          ref={linenRef}
          className="absolute bottom-0 left-[-10%] w-[120%] h-[75%] md:h-[85%] bg-[#F6F0E7] shadow-[0_-30px_60px_rgba(0,0,0,0.5)] z-20"
        >
          {/* Linen Texture */}
          <div className="absolute inset-0 opacity-[0.4] mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
          {/* Fabric Fold Shadow */}
          <div className="absolute top-0 left-1/4 w-[100px] h-full bg-gradient-to-r from-transparent via-black/5 to-transparent blur-[10px]" />
        </div>

        {/* ━━━━━━━━ MOMENT 3: PLACE SETTING ━━━━━━━━ */}
        <div className="absolute top-[20%] left-[2%] md:left-[5%] lg:left-[10%] w-[500px] h-[500px] flex items-center justify-center z-30 pointer-events-none">
          
          {/* Cutlery - Fork (Left) */}
          <div ref={forkRef} className="absolute left-[20px] md:left-[40px] flex flex-col items-center">
            {/* Fork Head */}
            <div className="flex justify-between w-[24px] h-[50px] bg-gradient-to-b from-[#E8DCC7] via-[#B8893F] to-[#9A6D2F] rounded-b-[40%] shadow-[5px_10px_15px_rgba(0,0,0,0.4)] p-[1px] pt-0 z-10 border-t border-[#FDFBF7]/40 relative">
              <div className="w-[3px] h-full bg-[#292421]/20 shadow-inner rounded-b-full"></div>
              <div className="w-[3px] h-full bg-[#292421]/20 shadow-inner rounded-b-full"></div>
              <div className="w-[3px] h-full bg-[#292421]/20 shadow-inner rounded-b-full"></div>
            </div>
            {/* Fork Handle */}
            <div className="w-[10px] h-[160px] md:h-[180px] bg-gradient-to-b from-[#9A6D2F] via-[#B8893F] to-[#6B5A3E] rounded-b-full shadow-[10px_15px_25px_rgba(0,0,0,0.4)] -mt-2 border-t border-[#FDFBF7]/20"></div>
          </div>

          {/* Plate (Center) */}
          <div 
            ref={plateRef}
            className="w-[280px] md:w-[350px] aspect-square rounded-full bg-[#FDFBF7] shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.4),0_20px_40px_rgba(0,0,0,0.15),10px_15px_25px_rgba(0,0,0,0.2),2px_5px_10px_rgba(0,0,0,0.4)] z-30 flex items-center justify-center border border-[#E8DCC7]/50 relative"
          >
            {/* Inner Plate Detail */}
            <div className="w-[72%] h-[72%] rounded-full shadow-[inset_5px_10px_25px_rgba(0,0,0,0.2)] overflow-hidden relative border border-[#E8DCC7]/20">
              <Image src="/editorial-food-2.png" alt="Prepared Dish" fill className="object-cover sepia-[0.1] contrast-110 brightness-[1.05]" />
              
              {/* Steam Particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[0,1,2].map(i => (
                  <div 
                    key={i}
                    ref={el => { steamRefs.current[i] = el!; }}
                    className="absolute top-[40%] left-[40%] w-12 h-12 bg-white/20 blur-[15px] rounded-full opacity-0 mix-blend-screen"
                    style={{ marginLeft: i * 10 }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Cutlery - Spoon (Right) */}
          <div ref={spoonRef} className="absolute right-[20px] md:right-[40px] flex flex-col items-center">
            {/* Spoon Head */}
            <div className="w-[32px] h-[55px] rounded-[50%_50%_45%_45%] bg-gradient-to-br from-[#FDFBF7] via-[#B8893F] to-[#9A6D2F] shadow-[10px_15px_25px_rgba(0,0,0,0.4),inset_-2px_-2px_8px_rgba(0,0,0,0.3),inset_2px_2px_12px_rgba(255,255,255,0.8)] z-10 border-t border-[#FDFBF7]/40" />
            {/* Spoon Handle */}
            <div className="w-[10px] h-[160px] md:h-[180px] bg-gradient-to-b from-[#9A6D2F] via-[#B8893F] to-[#6B5A3E] rounded-b-full shadow-[10px_15px_25px_rgba(0,0,0,0.4)] -mt-2 border-t border-[#FDFBF7]/20"></div>
          </div>

        </div>


        {/* ━━━━━━━━ MOMENT 4 & 5: RESERVATION CARD ━━━━━━━━ */}
        <div 
          ref={cardRef}
          className="absolute top-[15%] md:top-[20%] right-[5%] md:right-[15%] w-[85%] md:w-[400px] lg:w-[450px] bg-[#FDFBF7] shadow-[20px_40px_80px_rgba(41,36,33,0.5)] z-40 p-8 md:p-12 border border-[#E8DCC7]"
        >
          {/* Paper Texture */}
          <div className="absolute inset-0 opacity-[0.2] mix-blend-multiply pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

          {/* Letterhead */}
          <div className="text-center border-b border-[#B8893F]/30 pb-6 mb-8">
            <h3 className="font-serif text-3xl md:text-4xl text-[#292421] mb-2">Maurya</h3>
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#B8893F]">Reservation Details</span>
          </div>

          {/* Details (Handwritten feel via italics/serif) */}
          <div className="space-y-6 mb-12 relative">
            <div className="flex flex-col">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#292421]/50 mb-1">Location</span>
              <span className="font-serif italic text-lg text-[#292421]">Tilekar Nagar, Kondhwa Khurd</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#292421]/50 mb-1">Hours</span>
              <span className="font-serif italic text-lg text-[#292421]">11:00 AM — 11:00 PM</span>
            </div>
            
            {/* Natural Trust Markers */}
            <div className="absolute -right-4 top-4 transform rotate-12 bg-[#B8893F] text-[#FDFBF7] px-3 py-1 shadow-lg">
              <span className="font-mono text-[8px] uppercase tracking-widest">Est. 2014</span>
            </div>
            
            <div className="pt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#582028] shadow-inner flex items-center justify-center">
                <span className="font-serif text-[#FDFBF7] text-xs">M</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm text-[#292421] font-bold">4.8 ★ Google Rating</span>
                <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#A65B3E]">Loved Across Pune</span>
              </div>
            </div>
          </div>

          {/* Final Signature CTA (Moment 5 Reveal) */}
          <div ref={ctaRef} className="text-center pt-8 border-t border-[#B8893F]/20">
            <h4 className="font-serif italic text-2xl md:text-3xl text-[#582028] mb-6">
              We'd Love To Welcome You.
            </h4>
            <Link href="/visit#reserve" className="group inline-flex flex-col items-center gap-2 cursor-pointer relative z-50">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#292421] group-hover:text-[#B8893F] transition-colors duration-300">
                Reserve Your Evening
              </span>
              {/* Handwritten-style underline stroke */}
              <div className="w-full h-[1px] bg-[#292421] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
