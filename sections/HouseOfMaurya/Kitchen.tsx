"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SteamMotif from "@/components/SteamMotif";

export default function Kitchen() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Parallax for the images
      if (imagesRef.current) {
        gsap.to(imagesRef.current, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // Text reveal
      if (textRef.current) {
        gsap.fromTo(textRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 70%",
            }
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[100vh] bg-[#4A3728] text-[#F8F5EF] overflow-hidden py-32 flex flex-col justify-center">
      
      {/* Seamless Transition Overlay (Fog/Steam from top) */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#F8F5EF] to-transparent pointer-events-none z-10 opacity-40" />

      {/* Steam Ambient Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen">
        <SteamMotif className="w-full h-full" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left: Typography */}
        <div ref={textRef} className="lg:w-5/12 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#B98532] font-bold mb-4 block">
            Chapter 02
          </span>
          <h2 className="font-serif text-5xl sm:text-7xl lg:text-[100px] leading-[0.9] tracking-tight mb-8">
            Fresh.<br />
            <span className="italic text-[#B98532]">Every Day.</span>
          </h2>
          <p className="font-sans text-[13px] sm:text-[15px] leading-[1.8] text-[#F8F5EF]/70 font-light max-w-sm">
            Hand-ground spices. Dough rolled to order. Curries simmered for hours. Our kitchen is a testament to the timeless art of Indian culinary craftsmanship.
          </p>
        </div>

        {/* Right: Photographic Composition */}
        <div className="lg:w-7/12 relative w-full h-[60vh] lg:h-[80vh] order-1 lg:order-2">
          <div ref={imagesRef} className="absolute inset-0 flex justify-center items-center">
            
            {/* Main Image */}
            <div className="relative w-full max-w-[500px] aspect-[4/5] overflow-hidden rounded-sm shadow-2xl border border-[#B98532]/20 z-10">
              <Image
                src="/editorial-spices.png"
                alt="Fresh Spices and Ingredients"
                fill
                className="object-cover transition-transform duration-[15s] ease-out hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Secondary Floating Image */}
            <div className="absolute -left-4 sm:-left-12 bottom-12 w-2/3 max-w-[300px] aspect-square overflow-hidden rounded-sm shadow-2xl border border-[#B98532]/30 z-20">
              <Image
                src="/editorial-food-3.png"
                alt="Delicate garnishing"
                fill
                className="object-cover transition-transform duration-[15s] ease-out hover:scale-110"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
