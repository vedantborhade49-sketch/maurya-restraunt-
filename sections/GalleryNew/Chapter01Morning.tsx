"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialImage from "@/components/EditorialImage";

export default function Chapter01Morning() {
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

      // The image drifts upward slowly
      tl.fromTo(imageRef.current,
        { y: "15vh" },
        { y: "-15vh", ease: "none", duration: 1 }
      );

      // Caption drifts at a slightly different speed (parallax)
      tl.fromTo(captionRef.current,
        { y: 50 },
        { y: -50, ease: "none", duration: 1 },
        0
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[150vh] bg-[#F6F1E8] flex items-center justify-center py-32 overflow-hidden">
      
      {/* Almost full viewport image container */}
      <div className="relative w-[92vw] h-[85vh] z-10 flex flex-col items-center">
        
        <div ref={imageRef} className="w-full h-full relative overflow-hidden group">
          <EditorialImage 
            src="/editorial-entrance.png" 
            alt="Warm sunlight entering the restaurant" 
            priority
          />
          {/* Subtle hover tilt effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>

        {/* Tiny editorial caption */}
        <div 
          ref={captionRef}
          className="absolute -bottom-16 md:-bottom-24 left-0 md:left-12 max-w-xs z-20"
        >
          <span className="font-serif text-2xl md:text-3xl text-[#1F1F1F] block mb-2 italic">Morning.</span>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1F1F1F]/60">
            Before Every Story Begins.
          </p>
        </div>
        
      </div>

    </section>
  );
}
