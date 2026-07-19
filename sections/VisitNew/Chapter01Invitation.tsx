"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Chapter01Invitation() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Breathing animation independent of scroll
      gsap.to(textRef.current, {
        scale: 1.02,
        opacity: 0.9,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      // Pin and hold for a cinematic pause on scroll
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
    <section ref={containerRef} className="relative w-full h-screen bg-[#F6F1E8] flex flex-col justify-center px-12 md:px-24 overflow-hidden">
      
      <div className="absolute top-[15%] left-12 md:left-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#B98555] font-bold block mb-1">VISIT</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#B98555] font-bold block">MAURYA</span>
      </div>

      <h1 
        ref={textRef}
        className="font-serif text-[12vw] md:text-[10vw] leading-[0.85] tracking-tight text-[#1F1F1F] max-w-[90vw]"
      >
        We'll Keep<br />
        A Table<br />
        <span className="italic text-[#B98555]">Ready.</span>
      </h1>

    </section>
  );
}
