"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Chapter01Opening() {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Background subtle zoom on scroll
      gsap.fromTo(
        bgRef.current,
        { scale: 1 },
        {
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Text slow fade & upward motion
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[650px] flex items-center justify-center overflow-hidden bg-[#350709] text-[#F8F6F1] select-none"
    >
      {/* Background Photography with Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          ref={bgRef}
          className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform will-change-transform opacity-60"
          style={{ backgroundImage: `url('/editorial-entrance.png')` }}
        />
        {/* Soft Vignette & Warm Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0908]/80 via-[#350709]/65 to-[#0B0908]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,9,8,0.6)_100%)]" />
      </div>

      {/* Chapter Content */}
      <div ref={textRef} className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-6">
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] font-bold text-[#B98532] block">
          AROUND OUR TABLE — CHAPTER 01
        </span>

        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight font-normal text-[#F8F6F1]">
          Every Table<br />
          <span className="italic font-serif text-[#B98532] block mt-2">
            Has A Story.
          </span>
        </h1>

        <p className="font-sans text-sm md:text-base lg:text-lg text-[#F8F6F1]/80 max-w-xl mx-auto font-light leading-relaxed pt-4">
          Some meals are remembered for their taste. The best ones are remembered for the people around the table.
        </p>

        {/* Scroll Indicator */}
        <div className="pt-12 flex flex-col items-center gap-2 text-[#B98532]/80">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Scroll To Turn Page</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-[#B98532] to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
