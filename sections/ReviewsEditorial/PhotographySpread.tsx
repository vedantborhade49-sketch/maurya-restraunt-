"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function PhotographySpread() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Vertical clip-path reveals (like a paper unrolling)
      gsap.utils.toArray(".photo-mask").forEach((photo: any) => {
        gsap.fromTo(photo, 
          { clipPath: "inset(100% 0% 0% 0%)" }, // Fully masked from the bottom
          { 
            clipPath: "inset(0% 0% 0% 0%)",     // Fully revealed
            duration: 1.8, 
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: photo,
              start: "top 85%",
            }
          }
        );
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full py-40 px-8 md:px-12 flex flex-col items-center justify-center">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        
        {/* Left Column - Portrait */}
        <div className="md:col-span-5 flex flex-col justify-center">
          <div className="photo-mask w-full aspect-[3/4] bg-[#E8E1D5] overflow-hidden">
            <div className="w-full h-full opacity-90 saturate-50 mix-blend-multiply">
              <ImagePlaceholder category="Dining" description="Family enjoying dinner. Warm documentary style." aspectRatio="h-full" />
            </div>
          </div>
        </div>

        {/* Right Column - Asymmetrical stack */}
        <div className="md:col-span-7 flex flex-col gap-16 md:gap-32 md:pt-32">
          
          {/* Panoramic */}
          <div className="photo-mask w-full aspect-[16/9] bg-[#E8E1D5] overflow-hidden">
            <div className="w-full h-full opacity-90 saturate-50 mix-blend-multiply">
              <ImagePlaceholder category="Ambience" description="Wide panoramic shot of warm restaurant ambience." aspectRatio="h-full" />
            </div>
          </div>

          {/* Square/Landscape offset */}
          <div className="photo-mask w-3/4 self-end aspect-square bg-[#E8E1D5] overflow-hidden">
            <div className="w-full h-full opacity-90 saturate-50 mix-blend-multiply">
              <ImagePlaceholder category="Craft" description="Chef serving food. Natural expression." aspectRatio="h-full" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
