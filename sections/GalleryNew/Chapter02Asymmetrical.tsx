"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialImage from "@/components/EditorialImage";

export default function Chapter02Asymmetrical() {
  const containerRef = useRef<HTMLElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        }
      });

      // Complex overlapping parallax
      // Image 1 moves slow
      tl.to(img1Ref.current, { y: -100, ease: "none", duration: 1 }, 0);
      
      // Image 2 moves faster, overlapping 1
      tl.to(img2Ref.current, { y: -250, ease: "none", duration: 1 }, 0);
      
      // Image 3 moves fastest
      tl.to(img3Ref.current, { y: -400, ease: "none", duration: 1 }, 0);
      
      // Typography moves underneath
      tl.to(textRef.current, { y: 150, opacity: 0.2, ease: "none", duration: 1 }, 0);

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[200vh] bg-[#F6F1E8] py-40 overflow-hidden">
      
      <div className="max-w-[1600px] mx-auto px-8 md:px-24 relative h-full">
        
        {/* Background Typography moving underneath */}
        <div ref={textRef} className="absolute top-[20%] right-[10%] z-0 pointer-events-none">
          <span className="font-serif italic text-6xl md:text-9xl text-[#d0c8b8] opacity-40">
            Details.
          </span>
        </div>

        {/* Portrait Image (Top Left) */}
        <div 
          ref={img1Ref}
          className="absolute top-[10%] left-[5%] md:left-[15%] w-[60vw] md:w-[25vw] aspect-[3/4] z-10 shadow-2xl group transition-transform duration-700 hover:-rotate-1"
        >
          <EditorialImage 
            src="/editorial-food-1.png" 
            alt="Close up of food preparation" 
          />
        </div>

        {/* Panoramic Image (Middle Right) */}
        <div 
          ref={img2Ref}
          className="absolute top-[35%] right-[5%] md:right-[10%] w-[80vw] md:w-[45vw] aspect-[21/9] z-20 shadow-2xl group transition-transform duration-700 hover:rotate-1"
        >
          <EditorialImage 
            src="/editorial-spices.png" 
            alt="Panoramic macro shot of raw spices" 
          />
        </div>

        {/* Square Image (Bottom Center-Left) */}
        <div 
          ref={img3Ref}
          className="absolute top-[60%] left-[10%] md:left-[30%] w-[50vw] md:w-[30vw] aspect-square z-30 shadow-2xl group transition-transform duration-700 hover:-rotate-2"
        >
          <EditorialImage 
            src="/editorial-texture.png" 
            alt="Copper utensils catching warm light" 
          />
        </div>

      </div>
    </section>
  );
}
