"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Scene4Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const notesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      
      // Notes settling into place on scroll
      notesRef.current.forEach((note, i) => {
        if (!note) return;
        
        gsap.fromTo(note,
          { 
            y: 100, 
            opacity: 0, 
            rotationZ: gsap.utils.random(-15, 15),
            rotationX: 45 // 3D paper lift effect
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            rotationZ: gsap.utils.random(-5, 5), // Settles at a slight organic angle
            duration: 1.5,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: note,
              start: "top 85%",
            }
          }
        );

        // Continuous paper breeze effect
        gsap.to(note, {
          rotationX: gsap.utils.random(-5, 5),
          rotationY: gsap.utils.random(-5, 5),
          z: gsap.utils.random(0, 20),
          duration: gsap.utils.random(3, 5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[150vh] bg-[#FDFBF7] overflow-hidden flex flex-col items-center py-32 perspective-[1000px]">
      
      {/* ─── BACKGROUND: CREAM LINEN WALL ─── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Linen Texture */}
        <div className="absolute inset-0 opacity-[0.2] mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
        {/* Gentle lighting gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-[#E8DCC7]/30" />
      </div>

      <div className="relative w-full max-w-[1200px] flex flex-col items-center px-6 md:px-12 z-10">
        
        {/* Section Header */}
        <div className="text-center mb-24 md:mb-32">
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#A65B3E] mb-6 block">The Ledger</span>
          <h2 className="font-serif text-4xl md:text-6xl text-[#292421] font-normal tracking-tight">
            Why People <span className="italic text-[#8A4B38]">Return.</span>
          </h2>
        </div>

        {/* ─── ORGANIC WALL OF NOTES ─── */}
        <div className="w-full relative min-h-[80vh]">
          
          {/* Note 1: Sunday Tradition */}
          <div 
            ref={el => { notesRef.current[0] = el!; }}
            className="absolute top-0 left-[5%] md:left-[10%] w-[260px] p-8 bg-[#F6F0E7] shadow-[10px_20px_30px_rgba(41,36,33,0.15)] transform-style-3d border border-[#E8DCC7]"
          >
            {/* Wax Seal */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#582028] shadow-md border-2 border-[#582028]/80 flex items-center justify-center">
              <span className="font-serif text-[10px] text-white/90">M</span>
            </div>
            <p className="font-serif italic text-xl text-[#292421] leading-relaxed text-center mt-4">
              "Our Sunday tradition for the last ten years."
            </p>
            <div className="mt-6 text-center font-mono text-[8px] uppercase tracking-widest text-[#A65B3E]">
              Table 04
            </div>
          </div>

          {/* Note 2: Anniversary (Polaroid style) */}
          <div 
            ref={el => { notesRef.current[1] = el!; }}
            className="absolute top-[30%] md:top-[20%] right-[5%] md:right-[15%] w-[280px] p-4 pb-12 bg-white shadow-[15px_25px_40px_rgba(41,36,33,0.12)] transform-style-3d"
          >
            <div className="w-full aspect-square bg-[#E8DCC7] mb-6 relative overflow-hidden">
               {/* Abstract blur to simulate a faded polaroid photo */}
               <div className="absolute inset-0 bg-gradient-to-br from-[#A65B3E]/40 to-[#292421]/60 mix-blend-multiply" />
               <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
            </div>
            <p className="font-serif italic text-lg text-[#292421] text-center">
              "Celebrated our 25th anniversary here. Unforgettable."
            </p>
          </div>

          {/* Note 3: Family Dinner */}
          <div 
            ref={el => { notesRef.current[2] = el!; }}
            className="absolute top-[60%] md:top-[50%] left-[10%] md:left-[30%] w-[320px] p-10 bg-[#FDFBF7] shadow-[5px_15px_25px_rgba(41,36,33,0.1)] transform-style-3d border-t-2 border-[#B8893F]"
          >
            {/* Paper texture overlay */}
            <div className="absolute inset-0 opacity-[0.2] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
            
            <p className="font-serif italic text-2xl text-[#292421] leading-relaxed text-center relative z-10">
              "The warmth of a home, the precision of fine dining."
            </p>
            <div className="mt-8 flex justify-center items-center gap-2 relative z-10">
               <div className="w-4 h-[1px] bg-[#A65B3E]" />
               <span className="font-sans text-[9px] uppercase tracking-widest text-[#292421]/60">Guest Book Entry</span>
               <div className="w-4 h-[1px] bg-[#A65B3E]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
