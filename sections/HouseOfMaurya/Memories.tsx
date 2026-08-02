"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Memories() {
  const containerRef = useRef<HTMLElement>(null);
  const scrapbookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Gentle floating entrance for scrapbook elements
      if (scrapbookRef.current) {
        const elements = scrapbookRef.current.children;
        gsap.fromTo(elements,
          { opacity: 0, y: 30, rotation: () => gsap.utils.random(-3, 3) },
          {
            opacity: 1,
            y: 0,
            rotation: () => gsap.utils.random(-2, 2),
            duration: 1.5,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: scrapbookRef.current,
              start: "top 70%",
            }
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-[#F4F1EA] text-[#350709] overflow-hidden">
      
      {/* Chapter Marker */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#8F1115] font-bold mb-2">
          Chapter 05
        </span>
        <div className="w-[1px] h-12 bg-[#8F1115]/20" />
      </div>

      <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-12 relative z-10 pt-16">
        
        {/* Title */}
        <div className="text-center mb-24">
          <h2 className="font-serif text-5xl sm:text-7xl text-[#350709] tracking-tight mb-6">
            The Guestbook.
          </h2>
          <p className="font-sans text-[14px] text-[#350709]/70 max-w-md mx-auto">
            Pages filled with celebrations, quiet dinners, and the people who make Maurya a home.
          </p>
        </div>

        {/* Scrapbook Composition */}
        <div ref={scrapbookRef} className="relative w-full min-h-[600px] flex flex-wrap justify-center items-center gap-12 md:gap-24">
          
          {/* Main Memory Photo */}
          <div className="relative w-[300px] h-[350px] bg-white p-4 shadow-xl border border-[#EBE7DF] transform -rotate-2">
            <div className="relative w-full h-[85%] overflow-hidden border border-[#EBE7DF]/50">
              <Image src="/memory-wall.png" alt="Guest Memory" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <p className="font-serif italic text-xs text-center mt-4 text-[#350709]/80">"Our Sunday tradition."</p>
          </div>

          {/* Written Note 1 */}
          <div className="relative w-[280px] bg-[#FDFBF7] p-8 shadow-lg border border-[#EBE7DF] transform rotate-1">
            <p className="font-sans text-sm leading-relaxed text-[#350709]/80 mb-4">
              "Every family occasion somehow ends at Maurya. The food is always perfect, but it's the warmth that keeps us coming back."
            </p>
            <div className="w-8 h-[1px] bg-[#8F1115]/30 mb-2" />
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#8F1115]">Neha T. · Anniversary Dinner</p>
          </div>

          {/* Written Note 2 */}
          <div className="relative w-[280px] bg-[#FDFBF7] p-8 shadow-lg border border-[#EBE7DF] transform -rotate-1 mt-12">
            <p className="font-sans text-sm leading-relaxed text-[#350709]/80 mb-4">
              "The kids loved it, and the service was wonderful. It truly feels like walking into a heritage home."
            </p>
            <div className="w-8 h-[1px] bg-[#8F1115]/30 mb-2" />
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#8F1115]">Rahul M. · Family Lunch</p>
          </div>

        </div>
      </div>

    </section>
  );
}
