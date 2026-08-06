"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
const ch2Image = "/editorial-texture.webp";

export default function Chapter02Beginning() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPageRef = useRef<HTMLDivElement>(null);
  const rightPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom center",
          scrub: true,
        }
      });

      tl.fromTo(leftPageRef.current,
        { y: 100, opacity: 0, rotateZ: -2 },
        { y: 0, opacity: 1, rotateZ: -1, ease: "power2.out", duration: 1 }
      );

      tl.fromTo(rightPageRef.current,
        { y: 150, opacity: 0, rotateZ: 2 },
        { y: 0, opacity: 1, rotateZ: 1, ease: "power2.out", duration: 1 },
        0.2
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[120vh] bg-[#EFE8DB] py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-16 md:gap-24">
        
        {/* Left: Old Building Photograph */}
        <div 
          ref={leftPageRef}
          className="w-full md:w-1/2 relative bg-white p-4 md:p-6 shadow-[0_20px_50px_rgba(31,31,31,0.08)] rounded-sm"
        >
          <div className="relative w-full aspect-[4/5] bg-[#d0c8b8] overflow-hidden">
            <Image
              src={ch2Image}
              alt="Old Maurya Building"
              fill
              className="object-cover grayscale sepia-[30%] opacity-90"
            />
            {/* Vintage overlay */}
            <div className="absolute inset-0 bg-[#B98555] mix-blend-color opacity-20 pointer-events-none" />
          </div>
          <div className="mt-4 flex justify-between items-center font-mono text-[8px] uppercase tracking-[0.2em] text-[#5F6245]">
            <span>Fig 01. The Beginning</span>
            <span>Circa 1998</span>
          </div>
        </div>

        {/* Right: The Story */}
        <div 
          ref={rightPageRef}
          className="w-full md:w-1/2 flex flex-col justify-center"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#B98555] font-bold mb-8 block">
            CHAPTER II
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-[#1F1F1F] leading-[1.1] mb-10 max-w-md">
            Before Maurya<br/>
            became a restaurant...
          </h2>
          <p className="font-sans text-lg md:text-xl font-light text-[#1F1F1F]/80 leading-relaxed max-w-md">
            It was simply a place where people gathered. A small garden, a few tables, and a family recipe that slowly made its way into the hearts of Kondhwa.
          </p>
          <p className="font-sans text-lg md:text-xl font-light text-[#1F1F1F]/80 leading-relaxed max-w-md mt-6">
            There were no grand openings. Just warm food, honest conversations, and a belief that every meal should feel like home.
          </p>
        </div>

      </div>
    </section>
  );
}
