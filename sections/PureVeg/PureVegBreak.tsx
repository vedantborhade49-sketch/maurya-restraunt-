"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MAURYA_EASE } from "../../lib/motion/maurya-motion";

export default function PureVegBreak() {
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

      // Initially green slit is vertical line in center
      gsap.set("#veg-slit", { width: "2px", height: "100%", opacity: 1, backgroundColor: "#164C2B" });
      gsap.set("#veg-content", { opacity: 0 });
      gsap.set("#veg-left", { x: 0 });
      gsap.set("#veg-right", { x: 0 });
      gsap.set("#veg-center", { opacity: 0, scale: 0.9 });
      gsap.set("#veg-subtext", { opacity: 0, y: 20 });

      // 1. Slit expands horizontally to fill viewport
      tl.to("#veg-slit", {
        width: "100%",
        duration: 1,
        ease: "power2.inOut",
      });

      // 2. Content wrapper fades in once screen is green
      tl.to("#veg-content", {
        opacity: 1,
        duration: 0.3,
      });

      // 3. NOTHING TO HIDE splits horizontally, revealing 100% PURE VEG
      tl.to("#veg-left", {
        x: -250,
        opacity: 0,
        duration: 0.8,
        ease: "power3.inOut",
      }, "+=0.2");
      
      tl.to("#veg-right", {
        x: 250,
        opacity: 0,
        duration: 0.8,
        ease: "power3.inOut",
      }, "-=0.8");

      tl.to("#veg-center", {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: MAURYA_EASE.heavy,
      }, "-=0.6");

      // 4. Subtext and logo fade in
      tl.to("#veg-subtext", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: MAURYA_EASE.heavy,
      }, "-=0.2");

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={triggerRef} 
      id="pure-veg"
      className="relative w-full h-[350vh] bg-[#0b0908] overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center z-10">
        
        {/* The expanding green vertical slit panel */}
        <div 
          id="veg-slit" 
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 select-none"
        />

        {/* Content layer */}
        <div 
          id="veg-content" 
          className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 opacity-0"
        >
          {/* Headline horizontal split lockup */}
          <div className="relative flex items-center justify-center font-display uppercase tracking-tight text-[#F3E8D4] text-5xl sm:text-7xl md:text-8xl select-none">
            <div id="veg-left" className="z-10 bg-[#164C2B] py-2 px-1">
              NOTHING
            </div>
            <div id="veg-right" className="z-10 bg-[#164C2B] py-2 px-1 ml-4">
              TO HIDE.
            </div>

            {/* Revealed 100% PURE VEG text */}
            <div 
              id="veg-center" 
              className="absolute opacity-0 z-0 font-sans font-extrabold text-[#F3E8D4] text-center text-3xl sm:text-5xl md:text-6xl tracking-wider leading-none"
            >
              100%<br />
              <span className="text-gold font-heading italic text-4xl sm:text-6xl md:text-7xl normal-case">Pure Veg.</span>
            </div>
          </div>

          {/* Subtext and ivory Logo stamp */}
          <div 
            id="veg-subtext" 
            className="opacity-0 flex flex-col items-center gap-6 mt-16 text-center select-none"
          >
            <p className="font-display italic text-lg sm:text-2xl text-[#F3E8D4]/80">
              Always has been. Always will be.
            </p>
            
            <img 
              src="/morya-logo.png" 
              alt="Maurya Logo" 
              className="h-10 w-auto object-contain brightness-0 invert opacity-40 mt-2" 
            />
          </div>
        </div>

      </div>
    </div>
  );
}
