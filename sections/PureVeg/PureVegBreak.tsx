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
          end: "+=180%", // Tightened height (200vh total) to avoid blank space
          pin: true,
          scrub: 1.0,
        }
      });

      // Initial States
      gsap.set("#veg-slit", { width: "2px", height: "100%", opacity: 1, backgroundColor: "#164C2B" });
      gsap.set("#veg-content", { opacity: 0 });
      gsap.set("#veg-left", { x: 0 });
      gsap.set("#veg-right", { x: 0 });
      gsap.set("#veg-center", { opacity: 0, scale: 0.9 });
      gsap.set("#veg-subtext", { opacity: 0, y: 15 });
      gsap.set("#veg-watermark", { scale: 0.9, opacity: 0 });

      // ─── Continuous Width Progression Timeline (0.00 to 1.00) ───

      // 0.00 - 0.25: Slit expands width 2px -> 8px -> 12vw -> 100vw
      tl.to("#veg-slit", { width: "8px", duration: 0.08, ease: "power1.inOut" })
        .to("#veg-slit", { width: "12vw", duration: 0.08, ease: "power1.inOut" })
        .to("#veg-slit", { width: "100vw", duration: 0.14, ease: "power2.inOut" });

      // 0.20 - 0.35: Content wrapper reveals as screen becomes green
      tl.to("#veg-content", { opacity: 1, duration: 0.1 }, 0.20);

      // 0.30 - 0.50: Watermark scales up & fades in softly in background
      tl.to("#veg-watermark", { 
        opacity: 0.045, 
        scale: 1.05, 
        duration: 0.25, 
        ease: "sine.out" 
      }, 0.30);

      // 0.40 - 0.70: NOTHING TO HIDE splits horizontally, revealing 100% PURE VEG.
      tl.to("#veg-left", {
        x: -280,
        opacity: 0,
        duration: 0.25,
        ease: "power3.inOut"
      }, 0.40);
      
      tl.to("#veg-right", {
        x: 280,
        opacity: 0,
        duration: 0.25,
        ease: "power3.inOut"
      }, 0.40);

      // 100% PURE VEG reveals in center
      tl.to("#veg-center", {
        opacity: 1,
        scale: 1,
        duration: 0.22,
        ease: MAURYA_EASE.heavy
      }, 0.48);

      // Watermark continues to scale slightly on scroll
      tl.to("#veg-watermark", { 
        scale: 1.15, 
        duration: 0.35, 
        ease: "sine.inOut" 
      }, 0.55);

      // 0.68 - 0.90: Subtext and logo fade in
      tl.to("#veg-subtext", {
        opacity: 1,
        y: 0,
        duration: 0.20,
        ease: MAURYA_EASE.heavy
      }, 0.68);

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={triggerRef} 
      id="pure-veg"
      className="relative w-full h-[200vh] bg-[#0b0908] overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center z-10">
        
        {/* The expanding green vertical slit panel */}
        <div 
          id="veg-slit" 
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 select-none"
        />

        {/* Faint leaf watermark behind the text */}
        <div 
          id="veg-watermark" 
          className="absolute pointer-events-none select-none z-10 flex items-center justify-center"
        >
          <svg 
            viewBox="0 0 100 100" 
            className="w-[85vw] h-[85vw] max-w-[550px] text-[#F3E8D4] fill-none stroke-current stroke-[1.2] stroke-linecap-round stroke-linejoin-round"
          >
            <path d="M50,12 C28,34 30,70 50,88 C70,70 72,34 50,12 Z" />
            <path d="M50,12 L50,88" />
            <path d="M50,38 Q38,43 32,40" />
            <path d="M50,47 Q62,52 68,49" />
            <path d="M50,56 Q38,61 32,58" />
            <path d="M50,65 Q62,70 68,67" />
          </svg>
        </div>

        {/* Content layer */}
        <div 
          id="veg-content" 
          className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 opacity-0"
        >
          {/* Headline horizontal split lockup */}
          <div className="relative flex items-center justify-center font-serif font-bold uppercase tracking-tight text-[#F3E8D4] text-5xl sm:text-7xl md:text-8.5xl select-none w-full max-w-4xl">
            <div id="veg-left" className="z-10 bg-[#164C2B] py-2 px-1">
              NOTHING
            </div>
            <div id="veg-right" className="z-10 bg-[#164C2B] py-2 px-1 ml-4 md:ml-6">
              TO HIDE.
            </div>

            {/* Revealed 100% PURE VEG text */}
            <div 
              id="veg-center" 
              className="absolute opacity-0 z-0 font-sans font-extrabold text-[#F3E8D4] text-center text-3xl sm:text-5xl md:text-7xl tracking-wider leading-none"
            >
              100%<br />
              <span className="text-[#B98532] font-serif italic text-4xl sm:text-6xl md:text-8vw normal-case font-bold mt-2 block">Pure Veg.</span>
            </div>
          </div>

          {/* Subtext and Logo stamp */}
          <div 
            id="veg-subtext" 
            className="opacity-0 flex flex-col items-center gap-6 mt-16 text-center select-none"
          >
            <p className="font-serif italic text-lg sm:text-2xl text-[#F3E8D4]/90">
              Always has been. Always will be.
            </p>
            
            <img 
              src="/morya-logo.png" 
              alt="Maurya Logo" 
              className="h-10 w-auto object-contain brightness-0 invert opacity-40 mt-1" 
            />
          </div>
        </div>

      </div>
    </div>
  );
}
