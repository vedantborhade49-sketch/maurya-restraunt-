"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Chapter01Invitation() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Pin hero & zoom background
      gsap.to(bgRef.current, {
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[650px] flex flex-col justify-center px-8 md:px-20 overflow-hidden bg-[#350709] text-[#F8F6F1] select-none"
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          ref={bgRef}
          className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform opacity-50"
          style={{ backgroundImage: `url('/editorial-entrance.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0908]/85 via-[#350709]/60 to-[#0B0908]/90" />
      </div>

      <div ref={textRef} className="relative z-10 space-y-6 max-w-5xl">
        <div className="flex items-center gap-3">
          <span className="w-8 h-[1px] bg-[#B98532]" />
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] font-bold text-[#B98532]">
            THE ART OF ARRIVAL — VISIT MAURYA
          </span>
        </div>

        <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl leading-[0.9] tracking-tight text-[#F8F6F1] font-normal">
          We'll Keep<br />
          A Table<br />
          <span className="italic text-[#B98532] font-serif block mt-1">Ready.</span>
        </h1>

        <p className="font-sans text-sm md:text-base lg:text-lg text-[#F8F6F1]/80 max-w-xl font-light leading-relaxed pt-2">
          Shop 5,6 Sun Radiant Commercial Society, Khadi Machine Chowk, Kondhwa, Pune — Open Daily from 8:00 AM to 11:30 PM.
        </p>
      </div>
    </section>
  );
}
