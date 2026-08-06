"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialImage from "@/components/EditorialImage";

export default function Chapter08FinalScene() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen min-h-[600px] bg-[#350709] text-[#F8F6F1] overflow-hidden flex flex-col items-center justify-center select-none">
      
      {/* Night Scene Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-40">
        <EditorialImage src="/editorial-entrance.webp" alt="Night Scene at Maurya" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0908]/90 via-[#350709]/70 to-[#0B0908]/95" />
      </div>

      <div ref={textRef} className="relative z-10 text-center max-w-4xl px-6 space-y-6">
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] font-bold text-[#B98532] block">
          CHAPTER 08 — UNTIL TONIGHT
        </span>

        <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl leading-[0.95] text-[#F8F6F1] font-normal">
          The Lights Are On.<br />
          <span className="italic text-[#B98532] font-serif block mt-2">The Table Is Prepared.</span>
        </h2>

        <p className="font-sans text-sm md:text-base text-[#F8F6F1]/80 max-w-md mx-auto font-light leading-relaxed pt-2">
          We look forward to welcoming you to Maurya Pure Veg.
        </p>
      </div>

    </section>
  );
}
