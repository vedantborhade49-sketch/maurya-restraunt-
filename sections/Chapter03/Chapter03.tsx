"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SteamMotif from "@/components/SteamMotif";
import { MarginNote } from "@/components/MicroArtifacts";

export default function Chapter03() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const headlineRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);
  const img3Ref = useRef<HTMLImageElement>(null);
  const finalSteamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (isMobile) {
        gsap.fromTo(headlineRef.current,
          { opacity: 0, y: 15 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.0, 
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            }
          }
        );

        gsap.fromTo(img3Ref.current,
          { opacity: 0 },
          { 
            opacity: 1, 
            duration: 1.2, 
            scrollTrigger: {
              trigger: img3Ref.current,
              start: "top 75%",
            }
          }
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        }
      });

      // 1. Headline fades in
      tl.fromTo(headlineRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        0
      );

      // 2. Image 1 (Spices) starts visible and scales smoothly
      tl.fromTo(img1Ref.current,
        { scale: 1.08, opacity: 1 },
        { scale: 1, opacity: 1, duration: 1, ease: "none" },
        0
      );

      // 3. Image 2 (Process) wipes over Image 1
      tl.fromTo(img2Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "none" },
        1.5
      );

      // 4. Image 3 (Finished Dish) fades over Image 2
      tl.fromTo(img3Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "none" },
        3.0
      );

      // 5. Final Steam Transition
      tl.fromTo(finalSteamRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1.3, duration: 1.5, ease: "power2.inOut" },
        4.5
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#EFE8DB] text-[#272322] py-20 md:py-28 overflow-hidden">
      {/* Background Texture - Paper Grain */}
      <div className="absolute inset-0 z-0 opacity-40 texture-ch3-paper pointer-events-none mix-blend-multiply" />

      <div className="relative w-full flex flex-col items-center gap-12 container-maurya z-10">
        
        {/* Layer 1: Editorial Typography */}
        <div ref={headlineRef} className="content-grid w-full text-center max-w-[900px] mx-auto opacity-0">
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#9A5C3B] font-bold mb-3 block">
            02 &nbsp;·&nbsp; THE CRAFT & THE TABLE
          </span>
          <h2 className="font-heading text-[40px] sm:text-[60px] md:text-[76px] text-[#272322] leading-[0.98] tracking-tight">
            Fresh Every Morning.<br/>
            <span className="italic text-[#9A5C3B]">Served Every Evening.</span>
          </h2>
        </div>

        {/* Layer 2: The Sequence of Photographs */}
        <div className="relative w-full max-w-[900px] mx-auto z-10">
          
          <div className="overflow-hidden bg-[#1a1715] relative shadow-2xl rounded-sm w-full h-[45vh] md:h-[65vh] border border-[#9A5C3B]/20">
            
            {/* Image 1: Ingredients */}
            <img 
              ref={img1Ref}
              src="/editorial-spices.png" 
              alt="Raw ingredients and spices" 
              className="absolute inset-0 w-full h-full object-cover grayscale-[15%] opacity-100"
            />

            {/* Image 2: Preparation */}
            <img 
              ref={img2Ref}
              src="/editorial-process.png" 
              alt="Chef preparing the dish" 
              className="absolute inset-0 w-full h-full object-cover grayscale-[10%] opacity-0"
            />

            {/* Image 3: Finished Dish */}
            <img 
              ref={img3Ref}
              src="/editorial-food-2.png" 
              alt="Finished vegetarian dish in copper vessel" 
              className="absolute inset-0 w-full h-full object-cover opacity-0"
            />
            
            <SteamMotif className="opacity-20 mix-blend-screen pointer-events-none z-20" />
            
            {/* Minimal Editorial Captions */}
            <MarginNote text="The Craft" className="absolute top-6 left-6 text-[#F8F5EF] z-30 opacity-90 font-mono text-[10px]" rotate="0deg" />
          </div>
        </div>

        {/* Layer 3: Transition Steam Accent */}
        {!isMobile && (
          <div ref={finalSteamRef} className="absolute inset-0 z-50 pointer-events-none opacity-0 flex items-center justify-center bg-[#EFE8DB]/40">
            <SteamMotif className="w-[150%] h-[150%] mix-blend-multiply opacity-50" />
          </div>
        )}

      </div>
    </section>
  );
}
