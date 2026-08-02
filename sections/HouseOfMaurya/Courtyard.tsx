"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Courtyard() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Gentle parallax for the cinematic image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // Fade in text as the user walks in
      if (textRef.current) {
        gsap.fromTo(textRef.current,
          { opacity: 0, y: 40 },
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
    <section ref={containerRef} className="relative w-full h-[120vh] bg-[#F8F5EF] overflow-hidden flex flex-col justify-end">
      
      {/* CHAPTER 01 MARKER */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#350709]/60 font-bold mb-2">
          Chapter 01
        </span>
        <div className="w-[1px] h-12 bg-[#350709]/20" />
      </div>

      {/* Cinematic Courtyard Image */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pt-24 px-4 sm:px-8">
        <div ref={imageRef} className="relative w-full h-full max-w-[1400px] mx-auto overflow-hidden rounded-t-[40vw] sm:rounded-t-[30vw] md:rounded-t-[20vw] rounded-b-sm border border-[#350709]/10 shadow-[0_20px_50px_rgba(53,7,9,0.05)]">
          <Image
            src="/outside.jpeg"
            alt="Maurya Courtyard"
            fill
            className="object-cover transition-transform duration-[20s] ease-out hover:scale-105"
            style={{ objectPosition: "center 40%" }}
            sizes="100vw"
            priority
          />
          {/* Sunlight overlay (warm gradient) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#F8F5EF]/30 via-transparent to-[#B98532]/10 mix-blend-overlay pointer-events-none" />
          
          {/* Edge fade to ground */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8F5EF] via-[#F8F5EF]/40 to-transparent opacity-90 pointer-events-none" />
        </div>
      </div>

      {/* Copy overlay */}
      <div className="relative z-10 w-full flex flex-col items-center justify-end pb-32 text-center px-4">
        <div ref={textRef} className="flex flex-col items-center max-w-[600px]">
          <h2 className="font-serif text-5xl sm:text-7xl md:text-[90px] text-[#350709] tracking-tight leading-[0.9] italic mb-6 drop-shadow-sm">
            Welcome Home.
          </h2>
          <p className="font-sans text-[13px] sm:text-[15px] leading-relaxed text-[#350709]/70 font-light tracking-wide px-8">
            Every visit begins with a warm welcome and ends with a memory worth sharing.
          </p>
        </div>
      </div>

    </section>
  );
}
