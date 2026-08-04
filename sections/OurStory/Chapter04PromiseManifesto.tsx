"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PureVegBadge from "@/components/ui/PureVegBadge";

export default function Chapter04PromiseManifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Center-growing brass divider animation
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.0,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );

      // Fade in manifesto text
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 md:py-44 px-6 bg-[#164C2B] text-[#F8F6F1] overflow-hidden select-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoise)' opacity='0.04'/%3E%3C/svg%3E")`,
      }}
    >
      {/* Veggie Pattern Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url('/food-pattern-collage-bg.png')`,
          backgroundSize: '300px',
          backgroundRepeat: 'repeat',
        }}
      />
      <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
        
        <div className="flex flex-col items-center gap-3">
          <PureVegBadge showText={false} />
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] font-bold text-[#B98532]">
            CHAPTER 04 — OUR PROMISE
          </span>
        </div>

        {/* Center-growing brass divider */}
        <div
          ref={dividerRef}
          className="w-32 h-[1px] bg-[#B98532] mx-auto origin-center"
        />

        <div ref={textRef} className="space-y-6">
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-tight font-normal text-[#F8F6F1]">
            OUR PROMISE
          </h2>

          <div className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#B98532] space-y-3 font-normal max-w-2xl mx-auto leading-relaxed">
            <p>Fresh every day.</p>
            <p>100% Pure Vegetarian.</p>
            <p>No compromise on quality.</p>
            <p>Hospitality before everything.</p>
          </div>

          <p className="font-sans text-xs md:text-sm text-[#F8F6F1]/80 max-w-lg mx-auto pt-6 leading-relaxed">
            We prepare every meal with the same reverence and care as if serving our own family at home.
          </p>
        </div>

      </div>
    </section>
  );
}
