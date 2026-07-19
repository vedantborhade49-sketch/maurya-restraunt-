"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function Chapter05Sequence() {
  const containerRef = useRef<HTMLElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the whole container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Scroll distance for 2 page turns
          scrub: true,
          pin: true,
        }
      });

      // Page 2 slides up over Page 1 physically
      tl.fromTo(page2Ref.current,
        { y: "100%", boxShadow: "0 -20px 50px rgba(0,0,0,0.5)" },
        { y: "0%", ease: "none", duration: 1 }
      );

      // Page 3 slides up over Page 2 physically
      tl.fromTo(page3Ref.current,
        { y: "100%", boxShadow: "0 -20px 50px rgba(0,0,0,0.5)" },
        { y: "0%", ease: "none", duration: 1 }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#1F1F1F] overflow-hidden">
      
      {/* Page 1 (Base) */}
      <div className="absolute inset-0 w-full h-full z-10">
        <ImagePlaceholder 
          category="Sequence 1" 
          description="Giant printed page 1. Fullscreen cinematic moment." 
          aspectRatio="h-full" 
        />
        <div className="absolute top-12 left-12 text-[#F6F1E8] font-mono text-[10px] tracking-widest mix-blend-difference">
          MOMENT 01
        </div>
      </div>

      {/* Page 2 */}
      <div ref={page2Ref} className="absolute inset-0 w-full h-full z-20 origin-bottom">
        <ImagePlaceholder 
          category="Sequence 2" 
          description="Giant printed page 2 sliding over the first." 
          aspectRatio="h-full" 
        />
        <div className="absolute top-12 left-12 text-[#F6F1E8] font-mono text-[10px] tracking-widest mix-blend-difference">
          MOMENT 02
        </div>
      </div>

      {/* Page 3 */}
      <div ref={page3Ref} className="absolute inset-0 w-full h-full z-30 origin-bottom">
        <ImagePlaceholder 
          category="Sequence 3" 
          description="Giant printed page 3 sealing the sequence." 
          aspectRatio="h-full" 
        />
        <div className="absolute top-12 left-12 text-[#F6F1E8] font-mono text-[10px] tracking-widest mix-blend-difference">
          MOMENT 03
        </div>
      </div>

    </section>
  );
}
