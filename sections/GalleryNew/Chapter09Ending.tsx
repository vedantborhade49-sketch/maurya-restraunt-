"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialImage from "@/components/EditorialImage";

export default function Chapter09Ending() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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

      // Background drifts down
      tl.fromTo(imageRef.current,
        { y: "-10%", scale: 1.05 },
        { y: "0%", scale: 1, ease: "none", duration: 1 },
        0
      );

      // Typography rises up
      tl.fromTo(textRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", duration: 1 },
        0.3
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] bg-[#111111] overflow-hidden flex flex-col items-center justify-center">
      
      {/* Golden Hour Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div ref={imageRef} className="w-full h-full">
          <EditorialImage 
            src="https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=2000&auto=format&fit=crop" 
            alt="Restaurant exterior at golden hour" 
          />
        </div>
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-[#3A0F16]/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <h2 
          ref={textRef}
          className="font-serif text-6xl md:text-8xl lg:text-[10vw] leading-[0.9] text-[#F6F1E8] tracking-tight"
        >
          <span className="block">Until</span>
          <span className="block italic text-[#B98555]">Next Time.</span>
        </h2>
      </div>

    </section>
  );
}
