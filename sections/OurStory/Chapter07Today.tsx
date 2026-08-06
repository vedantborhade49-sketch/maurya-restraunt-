"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
const ch7Image = "/editorial-food-5.webp";

export default function Chapter07Today() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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

      // Background gets lighter
      tl.to(containerRef.current, {
        backgroundColor: "#F6F1E8",
        ease: "none",
        duration: 0.5
      }, 0);

      // Subtle parallax on the bright modern image
      tl.fromTo(imageRef.current,
        { y: "-10%" },
        { y: "10%", ease: "none", duration: 1 },
        0
      );

      // Text rises
      tl.fromTo(textRef.current,
        { y: 50 },
        { y: -50, ease: "none", duration: 1 },
        0
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[120vh] bg-[#EFE8DB] overflow-hidden flex flex-col justify-center items-center py-20 transition-colors duration-1000">
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-16 h-full">
        
        <div className="w-full md:w-1/2 relative h-[50vh] md:h-[70vh] rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(31,31,31,0.08)]">
          <Image
            ref={imageRef}
            src={ch7Image}
            alt="Modern Maurya Dining"
            fill
            className="object-cover scale-110"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 
            ref={textRef}
            className="font-heading text-5xl md:text-7xl text-[#1F1F1F] leading-[1.0] tracking-tight"
          >
            The Story<br/>
            Continues<br/>
            <span className="italic text-[#B98555]">Every Day.</span>
          </h2>
        </div>
        
      </div>
    </section>
  );
}
