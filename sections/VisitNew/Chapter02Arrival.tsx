"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function Chapter02Arrival() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

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

      // Photography slowly moves upward (Camera drift)
      tl.fromTo(imageRef.current,
        { y: "15vh" },
        { y: "-15vh", ease: "none", duration: 1 }
      );

      // Typography overlaps naturally with parallax
      tl.fromTo(captionRef.current,
        { y: 100 },
        { y: -100, ease: "none", duration: 1 },
        0
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[150vh] bg-[#F6F1E8] flex items-center justify-center py-20 overflow-hidden">
      
      <div className="relative w-[90vw] md:w-[85vw] h-[85vh] z-10">
        
        <div ref={imageRef} className="w-full h-full relative overflow-hidden group">
          <ImagePlaceholder 
            category="Entrance" 
            description="Restaurant entrance. Golden hour. Warm lighting. Natural plants. Copper details. Wood. Open doors." 
            aspectRatio="h-full" 
          />
          {/* Warm light subtle shift on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 bg-gradient-to-tr from-[#B98555]/40 to-transparent pointer-events-none mix-blend-color-burn" />
        </div>

        {/* Overlapping Typography */}
        <div 
          ref={captionRef}
          className="absolute -bottom-16 md:-bottom-24 right-0 md:right-12 z-20 text-right mix-blend-difference text-[#F6F1E8]"
        >
          <span className="font-serif text-4xl md:text-6xl block mb-2">Every Evening</span>
          <span className="font-serif text-4xl md:text-6xl italic text-[#B98555] block">A New Story Begins.</span>
        </div>
        
      </div>

    </section>
  );
}
