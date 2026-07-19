"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function Chapter04Collage() {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".collage-item");
      
      // Each item reveals naturally
      gsap.fromTo(items,
        { opacity: 0, y: 50, rotateZ: 5 },
        { 
          opacity: 1, 
          y: 0, 
          rotateZ: 0,
          ease: "power2.out", 
          duration: 1, 
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        }
      );

      // Subtle parallax on the whole collage
      gsap.to(containerRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-40 min-h-[150vh] bg-[#EFE8DB] overflow-hidden">
      
      {/* Physical coffee stain texture (using a subtle SVG circle stroke for now) */}
      <div className="absolute top-[20%] left-[30%] w-48 h-48 rounded-full border-[3px] border-[#B98555]/10 pointer-events-none mix-blend-multiply rotate-12" />
      <div className="absolute top-[60%] right-[20%] w-32 h-32 rounded-full border-2 border-[#B98555]/10 pointer-events-none mix-blend-multiply -rotate-6" />

      <div className="max-w-[1400px] mx-auto relative w-full h-[100vh]">
        
        {/* Item 1 */}
        <div className="collage-item absolute top-[10%] left-[10%] md:left-[20%] w-[50vw] md:w-[25vw] rotate-[-2deg] bg-white p-2 md:p-4 shadow-[0_15px_30px_rgba(0,0,0,0.08)] z-10 transition-transform hover:rotate-0 hover:z-50">
          {/* Masking tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#EFE8DB]/80 mix-blend-multiply rotate-[-3deg] shadow-sm z-20" />
          <div className="relative w-full aspect-[4/5]">
            <ImagePlaceholder category="Collage" description="Hands kneading dough." aspectRatio="h-full" />
          </div>
          <p className="font-mono text-[8px] uppercase text-[#1F1F1F]/60 mt-3 px-2 text-center">
            Fig 01. The Foundation.
          </p>
        </div>

        {/* Item 2 */}
        <div className="collage-item absolute top-[30%] right-[10%] md:right-[25%] w-[60vw] md:w-[35vw] rotate-[3deg] bg-white p-2 shadow-[0_20px_40px_rgba(0,0,0,0.1)] z-20 transition-transform hover:rotate-1 hover:z-50">
           {/* Copper paper clip */}
           <div className="absolute -top-4 right-8 w-4 h-12 border-2 border-[#B98555] rounded-full shadow-sm z-20 rotate-12" />
           <div className="relative w-full aspect-[16/9]">
            <ImagePlaceholder category="Collage" description="Wide shot of ingredients scattered." aspectRatio="h-full" />
          </div>
        </div>

        {/* Item 3 */}
        <div className="collage-item absolute top-[60%] left-[15%] md:left-[35%] w-[45vw] md:w-[20vw] rotate-[-5deg] bg-white p-2 shadow-[0_10px_20px_rgba(0,0,0,0.05)] z-30 transition-transform hover:-rotate-1 hover:z-50">
          <div className="relative w-full aspect-square">
            <ImagePlaceholder category="Collage" description="Close up of a single spice." aspectRatio="h-full" />
          </div>
          {/* Editorial markup */}
          <div className="absolute -bottom-6 -right-6 font-serif italic text-3xl text-[#B98555]/60 -rotate-12 pointer-events-none">
            Perfect.
          </div>
        </div>

      </div>

    </section>
  );
}
