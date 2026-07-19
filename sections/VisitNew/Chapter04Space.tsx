"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function Chapter04Space() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // Asymmetrical vertical scroll (Left goes up faster than right)
      tl.to(leftColRef.current, { y: -200, ease: "none" }, 0);
      tl.to(rightColRef.current, { y: -50, ease: "none" }, 0);

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-40 min-h-[150vh] bg-[#F6F1E8] overflow-hidden">
      
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 mb-24">
        <h2 className="font-serif text-6xl md:text-8xl text-[#1F1F1F]">
          Choose<br />
          <span className="italic text-[#B98555]">Your Corner.</span>
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col md:flex-row gap-16 md:gap-32">
        
        {/* Left Column */}
        <div ref={leftColRef} className="w-full md:w-1/2 flex flex-col gap-32 pt-24">
          <div className="w-full aspect-[4/5] relative group">
            <ImagePlaceholder category="Architecture" description="Private dining area. Rich dark wood. Intimate." aspectRatio="h-full" />
            <p className="absolute -bottom-8 left-0 font-mono text-[9px] uppercase tracking-[0.2em] text-[#1F1F1F]/60">Private Dining</p>
          </div>
          
          <div className="w-4/5 aspect-square relative group ml-auto">
            <ImagePlaceholder category="Architecture" description="Window seating at sunset." aspectRatio="h-full" />
            <p className="absolute -bottom-8 right-0 font-mono text-[9px] uppercase tracking-[0.2em] text-[#1F1F1F]/60">The Windows</p>
          </div>
        </div>

        {/* Right Column */}
        <div ref={rightColRef} className="w-full md:w-1/2 flex flex-col gap-32">
          <div className="w-4/5 aspect-square relative group">
            <ImagePlaceholder category="Architecture" description="Family tables. Spacious, welcoming." aspectRatio="h-full" />
            <p className="absolute -bottom-8 left-0 font-mono text-[9px] uppercase tracking-[0.2em] text-[#1F1F1F]/60">Family Tables</p>
          </div>

          <div className="w-full aspect-[3/4] relative group">
            <ImagePlaceholder category="Architecture" description="Warm evening ambience. The central hall." aspectRatio="h-full" />
            <p className="absolute -bottom-8 right-0 font-mono text-[9px] uppercase tracking-[0.2em] text-[#1F1F1F]/60">The Central Hall</p>
          </div>
        </div>

      </div>

    </section>
  );
}
