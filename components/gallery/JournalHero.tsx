"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function JournalHero() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Gentle parallax for the hero image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[85vh] flex flex-col justify-end overflow-hidden pb-12 pt-32">
      
      {/* Huge Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <div ref={imageRef} className="absolute inset-[-10%] w-[120%] h-[120%]">
          <Image
            src="/inside-1.jpeg"
            alt="Maurya Dining Room Ambience"
            fill
            className="object-cover"
            style={{ objectPosition: "center 40%" }}
            priority
            sizes="100vw"
          />
        </div>
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
      </div>

      {/* Editorial Title Overlay */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <div className="bg-[#FAF7F2]/90 backdrop-blur-md px-8 py-10 md:px-16 md:py-16 inline-flex flex-col items-center shadow-xl border border-[#B98532]/20">
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-[#8F1115] font-bold mb-6">
            CHAPTER 04
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl tracking-tight text-[#2a2420] leading-[1.0] max-w-2xl mx-auto">
            THE SIGNATURE<br />
            <span className="italic text-[#8F1115]">COLLECTION</span>
          </h1>
          
          <div className="mt-8 max-w-sm">
            <p className="font-sans text-xs md:text-sm text-[#2a2420]/70 leading-relaxed font-light">
              Flipping through the visual journal of our dining room, kitchens, and the moments that define us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
