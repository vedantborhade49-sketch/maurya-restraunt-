"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Chapter01Intro() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic hold
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: true,
        }
      });
      
      // Subtle typography breathing
      gsap.to(textRef.current, {
        scale: 1.02,
        opacity: 0.9,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#F6F1E8] flex flex-col justify-center items-center text-center overflow-hidden">
      
      <div className="mb-16">
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#B98555] font-bold block mb-1">CHAPTER VIII</span>
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#B98555] font-bold block">THE LIVING GUESTBOOK</span>
      </div>

      <h1 
        ref={textRef}
        className="font-serif text-[10vw] md:text-[8vw] leading-[0.85] tracking-tight text-[#1F1F1F]"
      >
        Every Signature<br />
        <span className="italic text-[#B98555]">Marks</span><br />
        A Memory.
      </h1>

    </section>
  );
}
