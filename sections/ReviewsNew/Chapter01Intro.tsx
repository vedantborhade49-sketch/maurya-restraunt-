"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Chapter01Intro() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic pause
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#F6F1E8] flex flex-col justify-center items-center text-center overflow-hidden">
      
      <div className="mb-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#B98555] font-bold block mb-1">CHAPTER VIII</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#B98555] font-bold block">VOICES</span>
      </div>

      <h1 className="font-serif text-[10vw] md:text-[8vw] leading-[0.85] tracking-tight text-[#1F1F1F]">
        The Stories<br />
        <span className="italic text-[#B98555]">They Left</span><br />
        Behind.
      </h1>

    </section>
  );
}
