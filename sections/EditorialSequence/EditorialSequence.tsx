"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { CropMarks, MarginNote } from "@/components/MicroArtifacts";

export default function EditorialSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Spread Refs
  const spread01Ref = useRef<HTMLDivElement>(null);
  const spread02Ref = useRef<HTMLDivElement>(null);
  const spread03Ref = useRef<HTMLDivElement>(null);
  const spread04Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Simple entrance animations for mobile view
        gsap.fromTo(".spread-typo", 
          { opacity: 0, y: 15 }, 
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.0, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".spread-typo",
              start: "top 80%",
            }
          }
        );
        gsap.fromTo(".spread-photo", 
          { opacity: 0, y: 15 }, 
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.0, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".spread-photo",
              start: "top 75%",
            }
          }
        );
        gsap.fromTo(".spread-bg", 
          { opacity: 0 }, 
          { 
            opacity: 1, 
            duration: 1.2, 
            ease: "power1.out",
            scrollTrigger: {
              trigger: ".spread-bg",
              start: "top 80%",
            }
          }
        );
        return;
      }
      
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

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full z-10 pointer-events-none">
      
      {/* 
        SPREAD 01: The Hook (120vh)
        Massive Typography + 1 Dominant Photo + Annotations
      */}
      <div ref={spread01Ref} className={`relative w-full pointer-events-auto ${isMobile ? "h-auto py-12 bg-[#1a1715]" : "h-[120vh]"}`}>
        <div className={isMobile ? "relative w-full" : "sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center"}>
          
          {!isMobile && <div className="spread-darkener absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1715] to-[#0b0908] opacity-0 z-0" />}
          
          <div className={`relative z-10 w-full max-w-[1500px] mx-auto flex flex-col md:flex-row items-center justify-between ${isMobile ? "gap-8 px-6" : "px-6 md:px-12"}`}>
            
            {/* LAYER 1: Hero Typography */}
            <div className={`spread-typo w-full md:w-[45%] flex flex-col leading-[0.8] mb-8 md:mb-0 relative py-8 px-4 text-[#F3E8D4] ${isMobile ? "opacity-100 items-center text-center" : "opacity-0"}`}>
              <CropMarks className="text-[#F3E8D4]/20" />
              <span className="font-heading italic text-[18vw] md:text-[14vw] text-[#b98532] ml-[-1vw]">884</span>
              <span className="font-heading text-[14vw] md:text-[11vw]">Reasons</span>
              <span className="font-heading text-[14vw] md:text-[11vw] ml-[3vw]">People</span>
              <span className="font-heading italic text-[14vw] md:text-[11vw]">Return</span>
            </div>

            {/* LAYER 1: Dominant Photograph */}
            <div className={`spread-photo relative w-full md:w-[45%] flex flex-col items-center md:items-end ${isMobile ? "opacity-100" : "opacity-0"}`}>
              
              <div className="relative w-[85%] md:w-[85%] aspect-[4/5] bg-[#0b0908] overflow-visible">
                <img 
                  src="/editorial-food-3.png" 
                  alt="Family sharing food" 
                  className="w-full h-full object-cover grayscale-[30%] opacity-90"
                />
                
                {/* LAYER 3: Editorial Annotations */}
                <MarginNote text="Sunday Favourite" className="spread-annotation top-[-20px] right-[-10px] text-[#F3E8D4]" rotate="3deg" />
                <MarginNote text="Since 1998" className="spread-annotation bottom-[-15px] left-[-20px] text-[#F3E8D4]" rotate="-4deg" />
                {!isMobile && <MarginNote text="Served Hot" className="spread-annotation top-1/2 left-[-60px] text-[#b98532]" rotate="-90deg" />}
              </div>
              
              {/* LAYER 2: Supporting Story */}
              <div className="mt-8 w-[85%] text-center md:text-left">
                <p className="font-sans text-[12px] md:text-[13px] leading-relaxed text-[#F3E8D4]/60 max-w-[280px] mx-auto md:mx-0">
                  Meals begin together. The warmth of the kitchen extends to the table, where every dish is passed by hand.
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
