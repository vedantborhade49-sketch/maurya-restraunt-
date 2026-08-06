"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialImage from "@/components/EditorialImage";
import Link from "next/link";

export default function TheSpace() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // CONTINUOUS TIME-DRIVEN LIGHTING
      // Transition through specific times of day imperceptibly
      gsap.to(containerRef.current, {
        keyframes: [
          { backgroundColor: "#F8F5EF", color: "#1F1F1F" }, // Morning ivory
          { backgroundColor: "#F0EAD6", color: "#1F1F1F" }, // Warm cream
          { backgroundColor: "#E6DCC8", color: "#3A0F16" }, // Afternoon beige
          { backgroundColor: "#D4A373", color: "#1A050A" }, // Golden amber
          { backgroundColor: "#8C5E45", color: "#F8F5EF" }, // Walnut brown
          { backgroundColor: "#5C2B29", color: "#F8F5EF" }, // Deep maroon
          { backgroundColor: "#1A050A", color: "#F8F5EF" }  // Night oxblood
        ],
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });

      // SCENE 3: The Drift (Layers)
      gsap.to(".scene3-img-layer", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: ".scene3",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(".scene3-text-layer", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".scene3",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // SCENE 4: Golden Hour Asymmetry
      gsap.to(".scene4-img-small", {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: ".scene4",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // SCENE 5: The Bleed
      gsap.to(".scene5-bleed", {
        xPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: ".scene5",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // SCENE 6: Night Stillness (The End) - No pin, natural scroll
      gsap.fromTo(".scene6-text .word",
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.out",
          scrollTrigger: {
            trigger: ".scene6",
            start: "top 60%"
          }
        }
      );
      
      gsap.fromTo(".scene6-cta",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { 
          opacity: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out",
          scrollTrigger: {
            trigger: ".scene6",
            start: "top 40%" // Delays reveal until further scrolled
          }
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full relative bg-[#F8F5EF] text-[#1F1F1F]">
      
      {/* 
        =========================================================
        SCENE 1: MORNING (THE ANCHOR)
        Extreme Typography Scale. No grids. No animation.
        ========================================================= 
      */}
      <section className="scene1 relative w-full pt-32 pb-40 px-4 md:px-12">
        {/* Subtle Visual Anchor */}
        <div className="absolute top-12 left-12 md:left-24 w-[1px] h-20 bg-[#B98555]/30" />
        
        <div className="mt-12 md:mt-24 ml-4 md:ml-12 relative">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#B98555] block mb-6 md:mb-12">
            The Space
          </span>
          <h2 className="font-serif text-[12vw] md:text-[8vw] leading-[0.85] tracking-tight max-w-[90vw] md:max-w-[70vw]">
            The first chair<br />
            is always <span className="italic text-[#B98555]">pulled out</span><br />
            before the first<br />
            guest arrives.
          </h2>
        </div>

        {/* Tiny annotation hugging the far right margin */}
        <div className="absolute top-32 md:top-48 right-4 md:right-12 text-right">
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#1F1F1F]/40 writing-vertical-rl rotate-180">
            08:30 AM — PREPARATION
          </p>
        </div>
      </section>

      {/* 
        =========================================================
        SCENE 2: LATE MORNING (THE PAUSE)
        Pure visual silence. One image bleeding off the edge.
        ========================================================= 
      */}
      <section className="scene2 relative w-full min-h-screen py-24 md:py-40">
        <div className="w-[85vw] md:w-[60vw] h-[80vh] md:h-[120vh] relative shadow-[0_40px_100px_rgba(0,0,0,0.1)] -ml-[10vw]">
          <EditorialImage src="/editorial-entrance.webp" alt="Morning Light Entrance" priority />
        </div>
      </section>

      {/* 
        =========================================================
        SCENE 3: AFTERNOON (THE DRIFT)
        Deep layering. 5 layers of depth. Huge clipping text.
        ========================================================= 
      */}
      <section className="scene3 relative w-full min-h-[150vh] py-40 overflow-hidden px-4 md:px-24">
        <div className="relative w-full max-w-[1400px] mx-auto h-[100vh]">
          
          {/* Layer 1: Background paper texture is global */}
          
          {/* Layer 2: Architectural Shadow */}
          <div className="absolute top-[25%] left-[25%] w-[50vw] aspect-[4/5] bg-black/5 blur-3xl pointer-events-none" />

          {/* Layer 3: Photography */}
          <div className="scene3-img-layer absolute top-[20%] left-[20%] w-[60vw] md:w-[35vw] aspect-[4/5] bg-white p-3 z-10 shadow-xl rotate-[-2deg]">
             <div className="relative w-full h-full">
               <EditorialImage src="/editorial-food-4.webp" alt="Afternoon Lunch" />
             </div>
          </div>

          {/* Layer 4: Tiny Handwritten Annotation */}
          <div className="absolute top-[75%] left-[15%] md:left-[35%] z-20 pointer-events-none rotate-3">
             <p className="font-serif italic text-lg md:text-2xl text-[#1F1F1F]/60">Table 04.</p>
          </div>

          {/* Layer 5: Headline and Observational Copy */}
          <div className="scene3-text-layer absolute top-[50%] left-[40%] md:left-[45%] z-30 pointer-events-none mix-blend-difference text-[#F8F5EF]">
            <h3 className="font-serif text-5xl md:text-8xl leading-[0.9] tracking-tight">
              The Space<br />
              <span className="italic">Between</span><br />
              Meals.
            </h3>
            <p className="font-mono text-[10px] uppercase tracking-widest mt-8 max-w-[200px] opacity-80 border-l border-current pl-4">
              Sunday lunch usually lasts longer than expected.
            </p>
          </div>

          {/* Micro Imperfection: Subtle Architectural Drawing */}
          <svg className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] opacity-10 mix-blend-multiply pointer-events-none stroke-current" viewBox="0 0 100 100" fill="none">
            <rect x="10" y="10" width="80" height="80" strokeWidth="0.5" />
            <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="20" strokeWidth="0.5" />
            <path d="M 30 30 L 70 70 M 70 30 L 30 70" strokeWidth="0.5" />
          </svg>

          {/* Micro Imperfection: Page Number */}
          <div className="absolute bottom-[10%] left-[5%] font-mono text-[8px] text-current opacity-40">
            Pg. 03
          </div>

        </div>
      </section>

      {/* 
        =========================================================
        SCENE 4: GOLDEN HOUR (THE DETAILS)
        Asymmetry and mismatching alignments.
        ========================================================= 
      */}
      <section className="scene4 relative w-full min-h-[150vh] py-40 px-4 md:px-12 flex flex-col justify-center">
        
        {/* Micro Imperfection: Embossed Stamp */}
        <div className="absolute top-24 right-24 w-16 h-16 rounded-full border border-current opacity-10 flex items-center justify-center font-mono text-[6px] tracking-widest shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
          MAURYA
        </div>

        <div className="ml-auto mr-12 text-right mb-32 max-w-[70vw] z-20 mix-blend-overlay opacity-80">
          <h2 className="font-serif text-6xl md:text-8xl leading-[0.9] tracking-tight">
            Crafted By<br />
            <span className="italic text-[#B98555]">Time.</span>
          </h2>
          <p className="font-mono text-[10px] uppercase tracking-widest mt-6 max-w-[250px] ml-auto">
            Hands that remember the recipes.
          </p>
        </div>

        <div className="relative w-full max-w-[1200px] mx-auto flex items-end">
          {/* Massive detail shot */}
          <div className="w-[70vw] md:w-[45vw] aspect-[4/3] shadow-2xl relative z-0">
             <EditorialImage src="/editorial-food-1.webp" alt="Craftsmanship" />
          </div>

          {/* Tiny detail shot hugging the bottom edge */}
          <div className="scene4-img-small w-[35vw] md:w-[20vw] aspect-[3/4] shadow-xl relative z-10 -ml-[15vw] -mb-[10vw]">
             <EditorialImage src="/editorial-food-3.webp" alt="Copper Bowls" />
          </div>
        </div>

      </section>

      {/* 
        =========================================================
        SCENE 5: EVENING TRANSITION (THE BLEED)
        Massive bleeding image. GSAP color transition is active here.
        ========================================================= 
      */}
      <section className="scene5 relative w-full h-screen mt-40 mb-40 overflow-hidden flex items-center">
        <div className="w-[150vw] h-[100vh] relative -ml-[25vw] will-change-transform">
           <div className="scene5-bleed w-full h-full relative opacity-90">
             <EditorialImage src="https://images.unsplash.com/photo-1414235077428-9710c28afbb3?q=80&w=2500&auto=format&fit=crop" alt="Evening Atmosphere Bleed" />
           </div>
           {/* Dark gradient to blend into the oxblood background */}
           <div className="absolute inset-0 bg-gradient-to-t from-current via-transparent to-transparent opacity-50" />
        </div>
        
        {/* Absolute positioned text spanning across */}
        <div className="absolute top-[30%] left-[10%] z-20 mix-blend-difference text-[#F8F5EF] pointer-events-none">
          <h2 className="font-serif text-6xl md:text-8xl leading-[0.8] tracking-tight">
            A Place<br />
            <span className="italic">To Stay.</span>
          </h2>
          <p className="font-mono text-[10px] uppercase tracking-widest mt-8 max-w-[250px] opacity-80 border-l border-current pl-4">
            Families rarely leave after just one conversation.
          </p>
        </div>
      </section>

      {/* 
        =========================================================
        SCENE 6: NIGHT (STILLNESS)
        Pure silence. Pinned frame. Delayed CTA.
        ========================================================= 
      */}
      <section className="scene6 relative w-full h-screen flex flex-col items-center justify-center">
        
        {/* Monumental Empty Table - Night Lighting */}
        <div className="w-full max-w-[1200px] aspect-[16/9] shadow-[0_0_100px_rgba(0,0,0,0.8)] relative border border-[#B98555]/10">
          <EditorialImage src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2000&auto=format&fit=crop" alt="Night Stillness Empty Table" />
          <div className="absolute inset-0 bg-[#1A050A]/40 mix-blend-multiply pointer-events-none" />
        </div>

        {/* Text Container overlays the image naturally */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
           
           <h2 className="scene6-text font-serif text-[12vw] md:text-[8vw] leading-[1] text-[#F8F5EF] text-center mb-12">
             <span className="word inline-block overflow-hidden"><span className="inline-block">We'll</span></span>{' '}
             <span className="word inline-block overflow-hidden"><span className="inline-block italic text-[#B98555]">Be Here.</span></span>
           </h2>

           <div className="scene6-cta pointer-events-auto">
             <Link 
               href="/menu"
               className="group relative inline-flex items-center justify-center px-12 py-5 border border-[#B98555]/30 hover:border-[#B98555] bg-[#1A050A]/50 backdrop-blur-md overflow-hidden transition-all duration-700"
             >
               <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.4em] text-[#F8F5EF] group-hover:tracking-[0.6em] transition-all duration-700">
                 Explore the Menu
               </span>
               <div className="absolute inset-0 bg-[#B98555]/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-out" />
             </Link>
           </div>
        </div>

      </section>

    </div>
  );
}
