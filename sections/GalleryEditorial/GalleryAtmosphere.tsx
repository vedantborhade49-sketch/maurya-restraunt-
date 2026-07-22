"use client";

import React, { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const GalleryAtmosphere = memo(function GalleryAtmosphere() {
  const containerRef = useRef<HTMLElement>(null);
  const breakTextRef = useRef<HTMLHeadingElement>(null);
  const panoRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      
      // Editorial Break Fade
      if (breakTextRef.current) {
        gsap.fromTo(breakTextRef.current,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.5, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: breakTextRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Quicker Progression Panoramic Scroll
      if (panoRef.current) {
        gsap.fromTo(panoRef.current,
          { xPercent: 15 },
          {
            xPercent: -15,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5, // Faster scrub for quicker progression
              onEnter: () => gsap.set(panoRef.current, { willChange: "transform" }),
              onLeave: () => gsap.set(panoRef.current, { willChange: "auto" }),
              onEnterBack: () => gsap.set(panoRef.current, { willChange: "transform" }),
              onLeaveBack: () => gsap.set(panoRef.current, { willChange: "auto" }),
            }
          }
        );
      }

      // Moving Deep Shadow
      if (shadowRef.current) {
        gsap.to(shadowRef.current, {
          x: "50vw",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden content-visibility-auto text-[#F6EFE6] pt-12 z-30">
      
      {/* The Atmosphere Content */}
      <div className="relative w-full min-h-[80vh] flex flex-col justify-center items-center overflow-hidden py-16">
        
        {/* Deep Moving Shadow Layer */}
        <div ref={shadowRef} className="absolute inset-0 z-20 bg-gradient-to-r from-black/80 via-transparent to-black/80 w-[150%] left-[-25%] pointer-events-none mix-blend-multiply" />

        {/* Integrated Typography */}
        <div className="absolute top-[20%] left-0 w-full flex items-center justify-center pointer-events-none z-30">
          <h2 ref={breakTextRef} className="font-serif text-4xl md:text-6xl italic opacity-90 text-center tracking-wide mix-blend-overlay">
            The Evening<br />Begins.
          </h2>
        </div>

        {/* Borderless Panoramic Canvas */}
        <div className="relative w-full h-[60vh] md:h-[80vh] flex items-center overflow-hidden z-10">
          
          <div ref={panoRef} className="absolute w-[130%] h-full left-[-15%]">
            <Image 
              src="/editorial-entrance.png" 
              alt="Dinner Rush Atmosphere" 
              fill 
              sizes="130vw" 
              className="object-cover opacity-90" 
              decoding="async" 
              loading="lazy" 
            />
          </div>

          <div className="absolute bottom-10 left-10 md:left-24 font-mono text-[9px] uppercase tracking-widest text-white/70 z-30">
            Warm Light
          </div>
          <div className="absolute top-10 right-10 md:right-24 font-mono text-[9px] uppercase tracking-widest text-white/70 z-30">
            Dinner Rush
          </div>

        </div>

      </div>
    </section>
  );
});

export default GalleryAtmosphere;
