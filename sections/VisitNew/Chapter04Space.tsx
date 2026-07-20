"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialImage from "@/components/EditorialImage";

export default function Chapter04Space() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.to(leftColRef.current, { y: -120, ease: "none" }, 0);
      tl.to(rightColRef.current, { y: -40, ease: "none" }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-28 md:py-40 bg-[#F8F6F1] text-[#350709] overflow-hidden">
      
      <div className="max-w-[1320px] mx-auto px-6 md:px-12 mb-16">
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-[#B98532] block mb-3">
          CHAPTER 04 — ATMOSPHERIC CORNERS
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#350709] leading-tight font-normal">
          Choose<br />
          <span className="italic text-[#B98532]">Your Corner.</span>
        </h2>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        
        {/* Left Column */}
        <div ref={leftColRef} className="space-y-16 pt-8">
          <div className="space-y-4 group">
            <div className="relative w-full aspect-[4/5] bg-[#350709] border border-[#B98532]/30 p-2 shadow-xl overflow-hidden">
              <EditorialImage src="/editorial-food-1.png" alt="Main Dining Hall" />
            </div>
            <div className="flex items-center justify-between border-b border-[#B98532]/20 pb-2">
              <h3 className="font-serif text-2xl text-[#350709]">Main Dining Hall</h3>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#B98532]">FAMILY SEATING</span>
            </div>
            <p className="font-sans text-xs text-[#1F1F1F]/70 leading-relaxed">
              Warm wooden tables, brass fixtures, and generous seating designed for large family gatherings.
            </p>
          </div>

          <div className="space-y-4 group">
            <div className="relative w-full aspect-square bg-[#350709] border border-[#B98532]/30 p-2 shadow-xl overflow-hidden">
              <EditorialImage src="/editorial-spices.png" alt="Spiced Kitchen View" />
            </div>
            <div className="flex items-center justify-between border-b border-[#B98532]/20 pb-2">
              <h3 className="font-serif text-2xl text-[#350709]">The Spice Kitchen View</h3>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#B98532]">OPEN KITCHEN</span>
            </div>
            <p className="font-sans text-xs text-[#1F1F1F]/70 leading-relaxed">
              Witness fresh curries simmering over coals and whole spices ground fresh daily.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div ref={rightColRef} className="space-y-16">
          <div className="space-y-4 group">
            <div className="relative w-full aspect-[4/5] bg-[#350709] border border-[#B98532]/30 p-2 shadow-xl overflow-hidden">
              <EditorialImage src="/editorial-food-3.png" alt="Private Family Booths" />
            </div>
            <div className="flex items-center justify-between border-b border-[#B98532]/20 pb-2">
              <h3 className="font-serif text-2xl text-[#350709]">Private Family Booths</h3>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#B98532]">INTIMATE CORNERS</span>
            </div>
            <p className="font-sans text-xs text-[#1F1F1F]/70 leading-relaxed">
              Quiet booths sheltered from main walkway noise, ideal for celebratory birthdays and dinners.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
