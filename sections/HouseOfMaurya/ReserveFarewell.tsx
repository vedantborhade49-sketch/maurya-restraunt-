"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ReserveFarewell() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(textRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 75%",
            }
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[80vh] bg-[#161413] text-[#F8F5EF] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Chapter Marker */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#B98532] font-bold mb-2">
          Chapter 06
        </span>
        <div className="w-[1px] h-12 bg-[#B98532]/20" />
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg">
        
        <h2 className="font-serif text-4xl sm:text-6xl md:text-[80px] italic leading-[0.9] text-[#F8F5EF] mb-8 tracking-tight">
          Your table<br />is waiting.
        </h2>
        
        <p className="font-sans text-[13px] sm:text-[15px] leading-relaxed text-[#F8F5EF]/60 font-light mb-12">
          Experience the warmth of our heritage, crafted fresh every day.
        </p>

        <Link
          href="/visit#reserve"
          className="group relative inline-flex items-center justify-center font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] px-10 py-5 bg-[#8F1115] text-[#F8F5EF] hover:bg-[#B98532] transition-colors duration-500 overflow-hidden"
        >
          <span className="relative z-10">Reserve Your Table</span>
        </Link>
        
      </div>

      {/* Ambient Floor Light */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#B98532]/5 to-transparent pointer-events-none" />

    </section>
  );
}
