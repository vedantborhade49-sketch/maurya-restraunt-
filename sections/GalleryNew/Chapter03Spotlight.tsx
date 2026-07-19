"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialImage from "@/components/EditorialImage";

export default function Chapter03Spotlight() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: true,
        }
      });

      // Spotlight reveals the dish
      tl.fromTo(imageRef.current,
        { scale: 0.9, opacity: 0, filter: "brightness(0.5)" },
        { scale: 1, opacity: 1, filter: "brightness(1)", ease: "power2.out", duration: 1 }
      );

      // Huge typography rises
      tl.fromTo(textRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", duration: 1 },
        0.5
      );

      // Steam fills viewport transition
      tl.fromTo(steamRef.current,
        { opacity: 0, y: "10%" },
        { opacity: 0.8, y: "-10%", ease: "none", duration: 2 },
        0
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#0A0A0A] overflow-hidden flex flex-col items-center justify-center">
      
      {/* Spotlight Effect overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.9)_60%,rgba(10,10,10,1)_100%)]" />

      {/* Steam Transition Layer */}
      <div 
        ref={steamRef}
        className="absolute inset-0 z-20 pointer-events-none mix-blend-screen opacity-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.01' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.3' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: "cover"
        }}
      />

      <div className="relative z-0 w-[50vw] md:w-[30vw] aspect-[4/5] mx-auto">
        <div ref={imageRef} className="w-full h-full shadow-[0_0_100px_rgba(255,255,255,0.1)]">
          <EditorialImage 
            src="/editorial-food-2.png" 
            alt="Single signature dish, incredibly sharp, dark museum lighting." 
          />
        </div>
      </div>

      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
        <h2 
          ref={textRef}
          className="font-serif text-6xl md:text-[8vw] text-[#F6F1E8] leading-[0.9] text-center mix-blend-difference"
        >
          Craft<br/>
          <span className="italic text-[#B98555]">Requires</span><br/>
          Patience.
        </h2>
      </div>

    </section>
  );
}
