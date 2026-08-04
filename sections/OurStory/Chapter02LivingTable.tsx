"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialImage from "@/components/EditorialImage";

export default function Chapter02LivingTable() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Text reveal animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );

      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.96, rotate: 2 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 md:py-40 px-6 md:px-16 bg-[#F8F6F1] text-[#350709] overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Editorial Typography */}
        <div ref={textRef} className="lg:col-span-6 space-y-8">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-[#B98532]">
            CHAPTER 02 — THE LIVING TABLE
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#350709] font-normal leading-[1.05] tracking-tight">
            Tables Were Never<br />
            Made For <span className="italic text-[#B98532]">Silence.</span>
          </h2>

          <div className="w-16 h-[2px] bg-[#B98532]/40" />

          <p className="font-serif text-xl md:text-2xl lg:text-3xl text-[#350709]/90 leading-relaxed font-light italic">
            "At Maurya, every table becomes a place where families gather, conversations begin, and celebrations become memories."
          </p>

          <p className="font-sans text-sm md:text-base text-[#1F1F1F]/80 leading-relaxed max-w-lg">
            Food is simply how those moments start. We don't measure our success in tables served, but in laughter shared, stories passed across the cloth, and memories taken home.
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs font-mono uppercase tracking-[0.25em] text-[#B98532] font-bold">
            <span>KONDHWA KHURD</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B98532]" />
            <span>SINCE 1998</span>
          </div>
        </div>

        {/* Right Side: Cinematic Editorial Photo */}
        <div ref={imageRef} className="lg:col-span-6 relative">
          <div className="relative w-full aspect-[4/5] bg-[#350709] border border-[#B98532]/30 p-3 shadow-2xl overflow-hidden group">
            <div className="relative w-full h-full overflow-hidden">
              <EditorialImage src="/bulk.png" alt="The Living Table Experience" />
            </div>
            {/* Corner brass accent */}
            <div className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-[0.25em] text-[#F8F6F1] bg-[#350709]/80 px-3 py-1 border border-[#B98532]/30 backdrop-blur-md">
              FIG 02. GATHERING
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
