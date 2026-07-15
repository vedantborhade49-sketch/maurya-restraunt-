"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MAURYA_EASE } from "../../lib/motion/maurya-motion";

export default function TheGathering() {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 1.2,
        }
      });

      // Initially hide items
      gsap.set(".gather-img", { opacity: 0, scale: 0.95 });
      gsap.set("#gather-headline", { opacity: 0, y: 30 });
      gsap.set(".gather-statement", { opacity: 0, y: 20 });
      gsap.set("#gather-final", { opacity: 0, scale: 0.96 });

      // 1. Headline & Images fade in
      tl.to("#gather-headline", {
        opacity: 0.9,
        y: 0,
        duration: 0.8,
        ease: MAURYA_EASE.heavy,
      });

      tl.to(".gather-img", {
        opacity: 0.8,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.6");

      // 2. Headline fades up
      tl.to("#gather-headline", {
        opacity: 0,
        y: -50,
        duration: 0.5,
        delay: 0.5,
      });

      // 3. Statements reveal sequentially
      tl.to("#gather-stmt-1", { opacity: 0.8, y: 0, duration: 0.5, ease: "power2.out" });
      tl.to("#gather-stmt-2", { opacity: 0.8, y: 0, duration: 0.5, ease: "power2.out" }, "+=0.2");
      tl.to("#gather-stmt-3", { opacity: 0.8, y: 0, duration: 0.5, ease: "power2.out" }, "+=0.2");

      // 4. Statements fade out
      tl.to(".gather-statement", {
        opacity: 0,
        y: -30,
        duration: 0.5,
        stagger: 0.05,
        delay: 0.4,
      });

      // 5. Final: THIS IS MAURYA
      tl.to("#gather-final", {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: MAURYA_EASE.heavy,
      });

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={triggerRef} 
      id="gathering"
      className="relative w-full h-[350vh] bg-[#350709] text-[#F3E8D4] overflow-hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E")`,
      }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center z-10 px-8">
        
        {/* Left Editorial Photo (serving hands / sharing) */}
        <div className="absolute left-8 xl:left-24 top-1/4 w-[16vw] aspect-[3/4] rounded-lg overflow-hidden border border-[#F3E8D4]/10 shadow-2xl gather-img hidden lg:block">
          <Image 
            src="/editorial-process.png" 
            alt="Tempering detail" 
            fill
            sizes="20vw"
            className="object-cover"
          />
        </div>

        {/* Right Editorial Photo (roti / gathering) */}
        <div className="absolute right-8 xl:right-24 bottom-1/4 w-[16vw] aspect-[3/4] rounded-lg overflow-hidden border border-[#F3E8D4]/10 shadow-2xl gather-img hidden lg:block">
          <Image 
            src="/editorial-spices.png" 
            alt="Grinding spices" 
            fill
            sizes="20vw"
            className="object-cover"
          />
        </div>

        {/* Central Text Core */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl z-20 pointer-events-none">
          {/* Main Headline */}
          <h2 
            id="gather-headline" 
            className="font-display uppercase text-4xl sm:text-6xl md:text-7xl leading-tight opacity-0"
          >
            Tables were never<br />
            made for silence.
          </h2>

          {/* Sequential Statements */}
          <div className="flex flex-col gap-4 mt-6">
            <div 
              id="gather-stmt-1" 
              className="font-heading italic text-2xl sm:text-4xl text-gold gather-statement opacity-0"
            >
              Pass the plate.
            </div>
            <div 
              id="gather-stmt-2" 
              className="font-heading italic text-2xl sm:text-4xl text-gold gather-statement opacity-0"
            >
              Order one more.
            </div>
            <div 
              id="gather-stmt-3" 
              className="font-heading italic text-2xl sm:text-4xl text-gold gather-statement opacity-0"
            >
              Stay a little longer.
            </div>
          </div>

          {/* Final Brand Statement */}
          <div 
            id="gather-final" 
            className="absolute opacity-0 flex flex-col items-center gap-3"
          >
            <span className="font-sans text-[10px] tracking-[0.25em] text-gold font-bold uppercase">
              THE LIVING TABLE
            </span>
            <h3 className="font-display uppercase text-5xl sm:text-7xl md:text-8xl text-[#F3E8D4] leading-none">
              THIS IS MAURYA.
            </h3>
          </div>
        </div>

      </div>
    </div>
  );
}
