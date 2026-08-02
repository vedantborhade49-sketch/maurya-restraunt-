"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function DiningHall() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Slow camera push and tiny depth parallax
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1.08,
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // Warm candle light flicker effect using GSAP
      if (lightRef.current) {
        gsap.to(lightRef.current, {
          opacity: 0.6,
          duration: 2,
          yoyo: true,
          repeat: -1,
          ease: "rough({ template: none.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false })",
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] bg-[#EAE0D5] overflow-hidden flex items-center justify-center">
      
      {/* Chapter Marker */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#350709]/60 font-bold mb-2">
          Chapter 03
        </span>
        <div className="w-[1px] h-12 bg-[#350709]/20" />
      </div>

      {/* Cinematic Dining Hall Photo */}
      <div className="absolute inset-0 z-0">
        <div ref={imageRef} className="relative w-[110%] h-[110%] -left-[5%] -top-[5%]">
          <Image
            src="/inside1.jpeg" // Using the warm dining room image
            alt="The Maurya Dining Hall"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* Ambient Warm Light Flicker Overlay */}
        <div ref={lightRef} className="absolute inset-0 bg-gradient-to-tr from-[#B98532]/20 via-transparent to-[#B98532]/10 mix-blend-color-dodge pointer-events-none opacity-40" />

        {/* Shadow Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#EAE0D5]/20 to-[#EAE0D5]/90 pointer-events-none" />
      </div>

      {/* Foreground Content - Minimal text to let the room breathe */}
      <div className="relative z-10 text-center px-4 max-w-lg mt-auto pb-32">
        <p className="font-serif italic text-2xl sm:text-3xl text-[#350709] drop-shadow-md">
          "Where stories unfold and memories are made."
        </p>
      </div>

    </section>
  );
}
