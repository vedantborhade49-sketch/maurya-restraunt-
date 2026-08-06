"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
const ch3Image = "/editorial-food-1.webp";

export default function Chapter03Founder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom center",
          scrub: true,
        }
      });

      // Subtle scale up on the portrait
      tl.fromTo(imageRef.current,
        { scale: 1.05 },
        { scale: 1, ease: "none", duration: 2 },
        0
      );

      // Text reveal
      tl.fromTo(textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 1 },
        0.5
      );

      // SVG Signature drawing
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(pathRef.current, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, 1);
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#F6F1E8] py-32 flex flex-col items-center justify-center overflow-hidden">
      
      <div className="max-w-[1200px] w-full mx-auto px-8 md:px-16 flex flex-col items-center">
        
        {/* Massive Portrait */}
        <div className="relative w-full max-w-[700px] aspect-[3/4] overflow-hidden mb-12 shadow-[0_20px_50px_rgba(31,31,31,0.1)]">
          <Image
            ref={imageRef}
            src={ch3Image}
            alt="The Founder"
            fill
            className="object-cover grayscale"
          />
        </div>

        {/* Signature & Quote */}
        <div ref={textRef} className="flex flex-col items-center text-center max-w-xl">
          {/* Simulated Cursive Signature via SVG */}
          <svg className="w-48 md:w-64 h-24 text-[#B98555] mb-8" viewBox="0 0 200 80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path ref={pathRef} d="M20,60 C40,20 60,10 80,40 C100,70 110,60 120,40 C130,20 140,20 160,50 C170,60 180,50 190,40" />
          </svg>

          <p className="font-serif text-2xl md:text-3xl text-[#1F1F1F] italic leading-relaxed">
            "Food has never been the business.<br /> People always were."
          </p>
        </div>

      </div>
    </section>
  );
}
