"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const testimonials = [
  {
    quote: "Our Sunday tradition for the last ten years.",
    meta: "TABLE 04",
  },
  {
    quote: "Celebrated our 25th anniversary here. Unforgettable.",
    meta: "PRIVATE DINING",
    image: true
  },
  {
    quote: "The warmth of a home, the precision of fine dining.",
    meta: "GUEST BOOK",
  },
  {
    quote: "Every flavor tells a story of heritage and passion.",
    meta: "EVENING SERVICE",
  }
];

export default function Scene4Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const wrapper = scrollWrapperRef.current;
      if (!wrapper) return;

      // Calculate how far to scroll horizontally
      const getScrollAmount = () => {
        let wrapperWidth = wrapper.scrollWidth;
        return -(wrapperWidth - window.innerWidth);
      };

      const tween = gsap.to(wrapper, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#FDFBF7] overflow-hidden flex flex-col items-center justify-center z-10">
      
      {/* ─── BACKGROUND: CREAM LINEN WALL ─── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Linen Texture */}
        <div className="absolute inset-0 opacity-[0.2] mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
        {/* Gentle lighting gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-[#E8DCC7]/30" />
      </div>

      {/* Floating Header */}
      <div className="absolute top-16 md:top-24 left-6 md:left-12 z-20 pointer-events-none">
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#A65B3E] mb-4 block">The Ledger</span>
        <h2 className="font-serif text-3xl md:text-5xl text-[#292421] font-normal tracking-tight">
          Why People <span className="italic text-[#8A4B38]">Return.</span>
        </h2>
      </div>

      {/* ─── HORIZONTAL SCROLL TRACK ─── */}
      <div 
        ref={scrollWrapperRef} 
        className="flex items-center gap-16 md:gap-32 px-[10vw] md:px-[20vw] mt-20 md:mt-32"
        style={{ width: "fit-content" }}
      >
        
        {testimonials.map((t, i) => (
          <div 
            key={i} 
            className="w-[320px] md:w-[480px] shrink-0 p-10 md:p-16 bg-[#F6F0E7]/80 backdrop-blur-sm shadow-[10px_20px_40px_rgba(41,36,33,0.08)] border border-[#E8DCC7]/60 flex flex-col items-center text-center relative group overflow-hidden"
          >
            {/* Top decorative line */}
            <div className="w-12 h-[1px] bg-[#A65B3E]/40 mb-10" />
            
            {t.image && (
              <div className="w-full aspect-[21/9] bg-[#E8DCC7] mb-10 relative overflow-hidden shadow-inner">
                 <div className="absolute inset-0 bg-gradient-to-br from-[#A65B3E]/30 to-[#292421]/50 mix-blend-multiply" />
                 <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
              </div>
            )}

            <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-[#292421] leading-relaxed">
              "{t.quote}"
            </p>
            
            <div className="mt-12 flex items-center justify-center gap-4 w-full">
              <div className="h-[1px] flex-grow bg-[#A65B3E]/20" />
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#A65B3E] shrink-0">
                {t.meta}
              </span>
              <div className="h-[1px] flex-grow bg-[#A65B3E]/20" />
            </div>

            {/* Subtle overlay on hover to give depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        ))}
        
        {/* Spacer at the end of the track to allow overscroll padding */}
        <div className="w-[10vw] md:w-[20vw] shrink-0" />
      </div>
      
    </section>
  );
}
