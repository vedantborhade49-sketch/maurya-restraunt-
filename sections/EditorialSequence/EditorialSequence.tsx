"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SteamMotif from "@/components/SteamMotif";
import { CropMarks, BrassRule, MarginNote, HandwrittenUnderline, ArchitecturalGuides, RestaurantSeal, FloatingHandwriting } from "@/components/MicroArtifacts";
import { MemoryArtifact } from "@/components/MemoryArtifact";

export default function EditorialSequence() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Spread Refs
  const spread01Ref = useRef<HTMLDivElement>(null);
  const spread02Ref = useRef<HTMLDivElement>(null);
  const spread03Ref = useRef<HTMLDivElement>(null);
  const spread04Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      
      // SPREAD 01: The Hook (Overlaps Hero)
      if (spread01Ref.current) {
        const darkener = spread01Ref.current.querySelector(".spread-darkener");
        const typo = spread01Ref.current.querySelector(".spread-typo");
        const photoWrapper = spread01Ref.current.querySelector(".spread-photo");
        const annotations = spread01Ref.current.querySelectorAll(".spread-annotation");
        
        // Darken Hero
        gsap.to(darkener, {
          opacity: 1, ease: "none",
          scrollTrigger: { trigger: spread01Ref.current, start: "top bottom", end: "top top", scrub: true }
        });

        // Emerge from darkness
        gsap.fromTo(typo, 
          { opacity: 0, x: -30 }, 
          { opacity: 1, x: 0, duration: 2, ease: "power2.out", scrollTrigger: { trigger: spread01Ref.current, start: "top 60%" }}
        );

        gsap.fromTo(photoWrapper, 
          { opacity: 0, scale: 1.05 }, 
          { opacity: 1, scale: 1, duration: 2.5, ease: "power2.out", delay: 0.2, scrollTrigger: { trigger: spread01Ref.current, start: "top 55%" }}
        );

        gsap.fromTo(annotations,
          { opacity: 0 },
          { opacity: 1, duration: 2, stagger: 0.3, delay: 1, ease: "power1.out", scrollTrigger: { trigger: spread01Ref.current, start: "top 40%" }}
        );
      }

      // SPREAD 02: The Voice (Whitespace Overlap)
      if (spread02Ref.current) {
        const bgs = spread02Ref.current.querySelectorAll(".spread-bg");
        const quotes = spread02Ref.current.querySelectorAll(".spread-quote");
        const lockup = spread02Ref.current.querySelector(".spread-lockup");
        const notes = spread02Ref.current.querySelectorAll(".spread-note");
        
        gsap.fromTo(bgs,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "none", scrollTrigger: { trigger: spread02Ref.current, start: "top bottom", end: "top center", scrub: true }}
        );

        gsap.fromTo(quotes,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 2, stagger: 0.2, ease: "power2.out", scrollTrigger: { trigger: spread02Ref.current, start: "top 60%" }}
        );

        gsap.fromTo(lockup,
          { opacity: 0 },
          { opacity: 1, duration: 1.5, delay: 0.8, ease: "none", scrollTrigger: { trigger: spread02Ref.current, start: "top 50%" }}
        );

        gsap.fromTo(notes,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1.5, stagger: 0.2, ease: "power2.out", scrollTrigger: { trigger: spread02Ref.current, start: "top 45%" }}
        );
      }

      // Removed Spread 03 and Spread 04

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full z-10 pointer-events-none">
      
      {/* 
        SPREAD 01: The Hook (120vh)
        Massive Typography + 1 Dominant Photo + Annotations
      */}
      <div ref={spread01Ref} className="relative w-full h-[120vh] pointer-events-auto">
        <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
          
          <div className="spread-darkener absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1715] to-[#0b0908] opacity-0 z-0" />
          
          <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
            
            {/* LAYER 1: Hero Typography */}
            <div className="spread-typo w-full md:w-[45%] flex flex-col leading-[0.8] mb-12 md:mb-0 relative py-8 px-4 opacity-0 text-[#F3E8D4]">
              <CropMarks className="text-[#F3E8D4]/30" />
              <span className="font-heading italic text-[24vw] md:text-[14vw] text-[#b98532] ml-[-1vw]">884</span>
              <span className="font-heading text-[18vw] md:text-[11vw]">Reasons</span>
              <span className="font-heading text-[18vw] md:text-[11vw] ml-[3vw]">People</span>
              <span className="font-heading italic text-[18vw] md:text-[11vw]">Return</span>
            </div>

            {/* LAYER 1: Dominant Photograph */}
            <div className="spread-photo relative w-full md:w-[45%] flex flex-col items-end opacity-0">
              
              <div className="relative w-[90%] md:w-[85%] aspect-[4/5] bg-[#0b0908] overflow-visible">
                <img 
                  src="/editorial-food-3.png" 
                  alt="Family sharing food" 
                  className="w-full h-full object-cover grayscale-[30%] opacity-90"
                />
                
                {/* LAYER 3: Editorial Annotations */}
                <MarginNote text="Sunday Favourite" className="spread-annotation top-[-25px] right-[-15px] text-[#F3E8D4]" rotate="3deg" />
                <MarginNote text="Since 1998" className="spread-annotation bottom-[-20px] left-[-30px] text-[#F3E8D4]" rotate="-4deg" />
                <MarginNote text="Served Hot" className="spread-annotation top-1/2 left-[-60px] text-[#b98532]" rotate="-90deg" />
              </div>
              
              {/* LAYER 2: Supporting Story */}
              <div className="mt-8 w-[90%] md:w-[85%]">
                <p className="font-sans text-[11px] md:text-[13px] leading-relaxed text-[#F3E8D4]/60 max-w-[240px]">
                  Meals begin together. The warmth of the kitchen extends to the table, where every dish is passed by hand.
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* 
        SPREAD 02: The Voice (Static Image)
      */}
      <div ref={spread02Ref} className="relative w-full h-[120vh] pointer-events-auto mt-[-20vh] bg-[#f5f2eb]">
        <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
          
          <img 
            src="/memory-wall.png" 
            alt="Memory Wall Scrapbook" 
            className="spread-bg opacity-0 w-full h-full object-cover object-center"
          />

        </div>
      </div>



    </div>
  );
}
