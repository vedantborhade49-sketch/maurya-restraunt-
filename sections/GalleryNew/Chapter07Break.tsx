"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialImage from "@/components/EditorialImage";

export default function Chapter07Break() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%", // Extremely long pause
          scrub: true,
          pin: true,
        }
      });

      // Text fades in
      tl.fromTo(textRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
      );

      // Long pause
      tl.to({}, { duration: 1.5 });

      // Tiny photo appears confidently
      tl.fromTo(photoRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#F6F1E8] flex flex-col items-center justify-center overflow-hidden">
      
      <h2 
        ref={textRef}
        className="font-serif text-[12vw] md:text-[10vw] leading-[0.85] text-[#1F1F1F] text-center"
      >
        Every Table<br/>
        Has<br/>
        <span className="italic text-[#B98555]">Its Story.</span>
      </h2>

      <div 
        ref={photoRef}
        className="absolute bottom-16 md:bottom-24 right-16 md:right-32 w-32 md:w-48 aspect-square shadow-[0_20px_40px_rgba(0,0,0,0.1)] p-2 bg-white rotate-3"
      >
        <div className="relative w-full h-full">
          <EditorialImage src="/editorial-food-dosa.png" alt="One confident tiny photograph" />
        </div>
      </div>

    </section>
  );
}
