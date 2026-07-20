"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SteamMotif from "@/components/SteamMotif";
import { MarginNote } from "@/components/MicroArtifacts";
import LittleMonkeyBadge from "@/components/LittleMonkeyBadge";

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
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      // 1. Headline fades in then fades out slightly as focus shifts to images
      tl.fromTo(headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "none" },
        0
      );

      // 2. Image 1 (Ingredient) scales slightly
      tl.fromTo(img1Ref.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "none" },
        1
      );

      // 3. Image 2 (Preparation) wipes/fades over Image 1
      tl.fromTo(img2Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "none" },
        2.5
      );
      
      // Image 2 slight scale down while visible
      tl.fromTo(img2Ref.current,
        { scale: 1.05 },
        { scale: 1, duration: 2.5, ease: "none" },
        2.5
      );

      // 4. Image 3 (Finished Dish) fades over Image 2
      tl.fromTo(img3Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "none" },
        4.5
      );

      tl.fromTo(img3Ref.current,
        { scale: 1.05 },
        { scale: 1, duration: 2.5, ease: "none" },
        4.5
      );

      // 5. Final Steam Transition engulfs the screen at the very end
      tl.fromTo(finalSteamRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1.5, duration: 2, ease: "power2.inOut" },
        6.5
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={`relative w-full bg-[#EFE8DB] text-[#272322] ${isMobile ? "h-auto py-16" : "h-[300vh]"}`}>
      {/* Background Texture - Paper Grain */}
      <div className="absolute inset-0 z-0 opacity-40 texture-ch3-paper pointer-events-none mix-blend-multiply" />

      <div className={isMobile ? "relative w-full flex flex-col items-center gap-8 container-maurya" : "sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center"}>
        
        {/* Layer 1: The Sequence of Photographs */}
        <div className={isMobile ? "relative w-full z-10" : "absolute inset-0 w-full h-full z-10 flex items-center justify-center"}>
          
          <div className={`overflow-hidden bg-[#1a1715] relative shadow-2xl rounded-sm ${isMobile ? "w-full h-[45vh] mx-auto" : "w-full md:w-[70vw] lg:w-[50vw] h-[60vh] md:h-[80vh]"}`}>
            
            {/* Image 1: Ingredients */}
            <img 
              ref={img1Ref}
              src="/editorial-spices.png" 
              alt="Raw ingredients and spices" 
              className={`absolute inset-0 w-full h-full object-cover grayscale-[20%] ${isMobile ? "opacity-0" : "opacity-0"}`}
            />

            {/* Image 2: Preparation */}
            <img 
              ref={img2Ref}
              src="/editorial-process.png" 
              alt="Chef preparing the dish" 
              className={`absolute inset-0 w-full h-full object-cover grayscale-[10%] ${isMobile ? "opacity-0" : "opacity-0"}`}
            />

            {/* Image 3: Finished Dish */}
            <img 
              ref={img3Ref}
              src="/editorial-food-2.png" 
              alt="Finished vegetarian dish in copper vessel" 
              className={`absolute inset-0 w-full h-full object-cover ${isMobile ? "opacity-100" : "opacity-0"}`}
            />
            
            <SteamMotif className="opacity-20 mix-blend-screen pointer-events-none z-20" />
            
            {/* Minimal Editorial Captions */}
            <MarginNote text="The Craft" className="absolute top-8 left-8 text-[#9A5C3B] z-30 opacity-80" rotate="0deg" />
          </div>
        </div>

        {/* Layer 2: Editorial Typography */}
        <div className={isMobile ? "relative z-20 w-full text-center" : "relative z-20 container-maurya h-full flex flex-col justify-end pb-24 md:pb-32 pointer-events-none"}>
          
          <div ref={headlineRef} className={`content-grid flex flex-col items-center text-center ${isMobile ? "opacity-100" : "opacity-0"}`}>
            {/* Little Monkey UI Accent */}
            <div className="mb-4">
              <LittleMonkeyBadge variant="menu" message="Monkey's Fresh Picks 🍌" />
            </div>

            <h2 className={`font-heading text-[#272322] leading-[1.0] tracking-tight ${isMobile ? "text-[10vw] mb-4" : "text-[12vw] md:text-[6vw]"}`}>
              Fresh Every Morning.<br/>
              <span className="italic text-[#9A5C3B]">Served Every Evening.</span>
            </h2>
          </div>

        </div>

        {/* Layer 3: Transition Steam (Fills screen at end) */}
        {!isMobile && (
          <div ref={finalSteamRef} className="absolute inset-0 z-50 pointer-events-none opacity-0 flex items-center justify-center bg-[#EFE8DB]/60">
            <SteamMotif className="w-[200%] h-[200%] mix-blend-multiply opacity-60" />
          </div>
        )}

      </div>
    </section>
  );
}
