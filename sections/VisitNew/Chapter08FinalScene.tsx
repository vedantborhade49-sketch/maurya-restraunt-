"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function Chapter08FinalScene() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom bottom",
          scrub: true,
        }
      });

      // Subtle scale down on background to reveal more of the scene
      tl.fromTo(imageRef.current,
        { scale: 1.1 },
        { scale: 1, ease: "none", duration: 1 },
        0
      );

      // Typography rises up
      tl.fromTo(textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", duration: 1 },
        0.3
      );
      
      // Signature fades in
      tl.fromTo(signatureRef.current,
        { opacity: 0 },
        { opacity: 1, ease: "power2.out", duration: 1 },
        0.6
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#3A0F16] overflow-hidden flex flex-col items-center justify-center">
      
      {/* Night Scene Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div ref={imageRef} className="w-full h-full">
          <ImagePlaceholder 
            category="Final Scene" 
            description="Night. Restaurant glowing. Warm interior visible through glass. Prepared table. No people. The restaurant waits." 
            aspectRatio="h-full" 
          />
        </div>
        {/* Deep maroon gradient overlay merging into the contact page */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#3A0F16] via-transparent to-[#3A0F16] opacity-90 mix-blend-multiply pointer-events-none" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-32">
        <h2 
          ref={textRef}
          className="font-serif text-6xl md:text-8xl lg:text-[9vw] leading-[0.9] text-[#F6F1E8] tracking-tight mb-16"
        >
          <span className="block">Until</span>
          <span className="block italic text-[#B98555]">Next Sunday.</span>
        </h2>
        
        <div ref={signatureRef} className="flex flex-col items-center">
          <img src="/morya-logo.png" alt="Maurya Signature" className="h-6 md:h-8 w-auto brightness-0 invert opacity-60 mb-4" />
          <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-[#F6F1E8]/40">Since 2003</p>
        </div>
      </div>

    </section>
  );
}
