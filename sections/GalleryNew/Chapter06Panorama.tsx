"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function Chapter06Panorama() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll effect
      const totalScroll = scrollWrapperRef.current ? scrollWrapperRef.current.scrollWidth - window.innerWidth : 0;
      
      gsap.to(scrollWrapperRef.current, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalScroll}`, // Scroll distance equals the width of the panorama
          scrub: 1,
          pin: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#1F1F1F] overflow-hidden">
      
      <div 
        ref={scrollWrapperRef} 
        className="absolute top-0 left-0 h-full flex items-center"
        style={{ width: "300vw" }} // Massive panoramic width
      >
        <div className="relative w-full h-[80vh] mx-12">
          <ImagePlaceholder 
            category="Panorama" 
            description="Massive edge-to-edge panoramic interior. Tiny details hidden throughout." 
            aspectRatio="h-full" 
          />
          {/* Subtle details/captions scattered across the panorama */}
          <div className="absolute top-[20%] left-[10%] font-mono text-[10px] text-[#F6F1E8] mix-blend-difference">A Family</div>
          <div className="absolute bottom-[30%] left-[40%] font-mono text-[10px] text-[#F6F1E8] mix-blend-difference">The Chef</div>
          <div className="absolute top-[40%] left-[70%] font-mono text-[10px] text-[#F6F1E8] mix-blend-difference">Warm Lighting</div>
          <div className="absolute bottom-[20%] left-[90%] font-mono text-[10px] text-[#F6F1E8] mix-blend-difference">A Waiter</div>
        </div>
      </div>

    </section>
  );
}
