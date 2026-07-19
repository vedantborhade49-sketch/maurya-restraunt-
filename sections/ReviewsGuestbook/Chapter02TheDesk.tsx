"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function Chapter02TheDesk() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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

      // The desk slowly emerges (drifting upwards)
      tl.fromTo(imageRef.current,
        { y: 150, scale: 0.95 },
        { y: -100, scale: 1, ease: "none", duration: 1 }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[150vh] bg-[#F6F1E8] flex flex-col items-center justify-center overflow-hidden">
      
      <div className="relative w-[85vw] max-w-[1200px] h-[85vh] z-10" ref={imageRef}>
        
        <div className="w-full h-full relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] group">
          <ImagePlaceholder 
            category="The Desk" 
            description="Top-down camera. Huge handcrafted wooden table. Warm sunlight. Copper reading lamp. Vintage fountain pen. Fresh flower. Reading glasses. Closed leather guestbook." 
            aspectRatio="h-full" 
          />
          {/* Simulate soft sunlight crossing the desk */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#B98555]/20 to-transparent mix-blend-color-burn opacity-0 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none" />
        </div>
        
      </div>

    </section>
  );
}
