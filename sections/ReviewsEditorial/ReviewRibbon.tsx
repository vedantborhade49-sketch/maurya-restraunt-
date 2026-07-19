"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ReviewRibbon() {
  const containerRef = useRef<HTMLElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // The signature interaction: horizontal translation tied to vertical scroll
      gsap.to(ribbonRef.current, {
        xPercent: -30, // Moves left as you scroll down
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // Slight smoothing
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Repeating excerpts for the long ribbon
  const ribbonText = "★★★★★ Great service • ★★★★★ Family favourite • ★★★★★ Worth returning • ★★★★★ Amazing ambience • ★★★★★ Authentic taste • ★★★★★ Great service • ★★★★★ Family favourite • ★★★★★ Worth returning • ★★★★★ Amazing ambience • ★★★★★ Authentic taste";

  return (
    <section ref={containerRef} className="w-full py-20 overflow-hidden flex items-center bg-[#F6F1E8]">
      <div ref={ribbonRef} className="whitespace-nowrap flex" style={{ width: "200vw", transform: "translateX(0)" }}>
        <h2 className="font-serif italic text-4xl md:text-6xl text-[#1F1F1F] tracking-wide opacity-80">
          {ribbonText}
        </h2>
      </div>
    </section>
  );
}
