"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialImage from "@/components/EditorialImage";

export default function Chapter02Arrival() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Parallax image drift
      gsap.fromTo(
        imageRef.current,
        { y: "8%" },
        {
          y: "-8%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 md:py-40 px-6 md:px-16 bg-[#F8F6F1] text-[#350709] overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Editorial Arrival Text */}
        <div ref={textRef} className="lg:col-span-6 space-y-8">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-[#B98532]">
            CHAPTER 02 — THE ARRIVAL
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#350709] font-normal leading-[1.05] tracking-tight">
            As You Turn Off<br />
            NIBM Road <span className="italic text-[#B98532]">Into Tilekar Nagar.</span>
          </h2>

          <div className="w-16 h-[2px] bg-[#B98532]/40" />

          <p className="font-serif text-xl md:text-2xl text-[#350709]/90 leading-relaxed font-light italic">
            "The ambient golden glow of Maurya welcomes you in, past open doors, warm copper fixtures, and fragrant aromas."
          </p>

          <p className="font-sans text-sm md:text-base text-[#1F1F1F]/80 leading-relaxed max-w-lg">
            Whether arriving for a quiet weekday lunch or a lively Sunday family dinner, our staff receives every guest with genuine warmth and attentive hospitality.
          </p>

          <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.25em] text-[#B98532] font-bold pt-2">
            <span>KONDHWA KHURD</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B98532]" />
            <span>PUNE</span>
          </div>
        </div>

        {/* Right Side: Entrance Photography */}
        <div ref={imageRef} className="lg:col-span-6 relative">
          <div className="relative w-full aspect-[4/5] bg-[#350709] border border-[#B98532]/30 p-3 shadow-2xl overflow-hidden group">
            <div className="relative w-full h-full overflow-hidden">
              <EditorialImage src="/editorial-entrance.png" alt="Maurya Entrance Golden Hour" />
            </div>
            <div className="absolute top-6 right-6 font-mono text-[9px] uppercase tracking-[0.2em] text-[#F8F6F1] bg-[#350709]/80 px-3 py-1 border border-[#B98532]/30 backdrop-blur-md">
              GOLDEN HOUR ENTRANCE
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
