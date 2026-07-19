"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Floating paper effect on scroll (Micro-parallax)
      const lines = gsap.utils.toArray(".hero-line");
      
      lines.forEach((line: any, index) => {
        // Varying speeds based on index
        const yOffset = (index % 2 === 0) ? -40 : 40;
        
        gsap.to(line, {
          y: yOffset,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full min-h-screen pt-48 pb-20 px-8 md:px-24 flex flex-col justify-center relative">
      <div className="absolute top-12 left-8 md:left-24">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#1F1F1F]/50">Chapter VIII</span>
      </div>
      <div className="absolute top-12 right-8 md:right-24">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#1F1F1F]/50">Voices</span>
      </div>

      <div className="max-w-[1200px] mx-auto w-full">
        <h1 className="font-serif text-[11vw] md:text-[8vw] leading-[0.95] tracking-tight text-[#1F1F1F]">
          <div className="hero-line block">Some Places</div>
          <div className="hero-line block">Serve Food.</div>
          <div className="hero-line block italic text-[#B98555] ml-0 md:ml-24">Others</div>
          <div className="hero-line block">Become Tradition.</div>
        </h1>
      </div>
    </section>
  );
}
