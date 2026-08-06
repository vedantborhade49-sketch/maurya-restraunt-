"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
const ch4Image = "/editorial-spices.webp";

export default function Chapter04Kitchen() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageGridRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the dark section to create an immersive theater
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: true,
        }
      });

      // Background gets progressively darker
      tl.to(containerRef.current, {
        backgroundColor: "#1F1F1F", // Deep charcoal
        ease: "none",
        duration: 0.5
      }, 0);

      // Typography color changes from dark to light copper
      tl.to(textRef.current, {
        color: "#B98555",
        ease: "none",
        duration: 0.5
      }, 0);

      // Steam drifts across
      tl.fromTo(steamRef.current,
        { opacity: 0, x: "-10%" },
        { opacity: 0.3, x: "10%", ease: "none", duration: 2 },
        0
      );

      // Macro images slide in from staggered positions
      const images = gsap.utils.toArray(".kitchen-macro");
      tl.fromTo(images,
        { opacity: 0, y: 100, scale: 1.1 },
        { opacity: 1, y: 0, scale: 1, ease: "power2.out", stagger: 0.2, duration: 1 },
        0.5
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#F6F1E8] overflow-hidden flex flex-col justify-center items-center py-20 transition-colors duration-1000">
      
      {/* Steam motif layer */}
      <div 
        ref={steamRef} 
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-0"
        style={{
          backgroundImage: `url('/editorial-texture.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col h-full justify-center">
        
        <h2 
          ref={textRef}
          className="font-heading text-[10vw] md:text-[8vw] leading-[1.0] tracking-tight mb-16 text-[#1F1F1F] z-20"
        >
          <span className="block">Every Morning</span>
          <span className="block italic">Begins</span>
          <span className="block pl-[10%]">With Fire.</span>
        </h2>

        {/* Cinematic Macro Shots Grid */}
        <div ref={imageGridRef} className="w-full flex items-end justify-end gap-6 md:gap-12 relative z-10 h-[40vh] md:h-[50vh]">
          <div className="kitchen-macro relative w-1/3 md:w-1/4 aspect-square rounded-full overflow-hidden shadow-2xl">
            <Image
              src="/editorial-spices.webp"
              alt="Fresh Spices"
              fill
              className="object-cover sepia-[20%] opacity-90"
            />
          </div>
          <div className="kitchen-macro relative w-1/2 md:w-[40%] aspect-[4/3] rounded-sm overflow-hidden shadow-2xl -translate-y-[10%]">
            <Image
              src={ch4Image}
              alt="Kitchen Fire"
              fill
              className="object-cover saturate-[1.2] opacity-90"
            />
          </div>
        </div>
        
      </div>
    </section>
  );
}
