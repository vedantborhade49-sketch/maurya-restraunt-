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
    <section ref={containerRef} className={`relative w-full bg-[#0b0908] text-[#F8F5EF] ${isMobile ? "h-auto py-12" : "h-[300vh]"}`}>
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 opacity-10 texture-ch3-paper pointer-events-none mix-blend-screen" />

      <div className={isMobile ? "relative w-full flex flex-col items-center gap-8 px-6" : "sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center"}>
        
        {/* Layer 1: The Sequence of Photographs */}
        <div className={isMobile ? "relative w-full z-10" : "absolute inset-0 w-full h-full z-10 flex items-center justify-center"}>
          
          <div className={`overflow-hidden bg-[#1a1715] relative ${isMobile ? "w-[90vw] h-[45vh] mx-auto" : "w-full md:w-[70vw] lg:w-[50vw] h-[60vh] md:h-[80vh]"}`}>
            
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
            <MarginNote text="The Craft" className="absolute top-8 left-8 text-[#b98532] z-30 opacity-70" rotate="0deg" />
          </div>
        </div>

        {/* Layer 2: Editorial Typography */}
        <div className={isMobile ? "relative z-20 w-full text-center" : "relative z-20 w-full max-w-[1600px] mx-auto px-8 md:px-16 pointer-events-none h-full flex flex-col justify-end pb-24 md:pb-32"}>
          
          <div ref={headlineRef} className={`flex flex-col ${isMobile ? "opacity-100" : "opacity-0"}`}>
            <h2 className={`font-heading text-[#F8F5EF] leading-[1.0] tracking-tight ${isMobile ? "text-[10vw] mb-4" : "text-[12vw] md:text-[6vw] mix-blend-difference"}`}>
              Fresh Every Morning.<br/>
              <span className={`italic text-[#b98532] ${isMobile ? "" : "mix-blend-normal"}`}>Served Every Evening.</span>
            </h2>
          </div>

        </div>

        {/* Layer 3: Transition Steam (Fills screen at end) */}
        {!isMobile && (
          <div ref={finalSteamRef} className="absolute inset-0 z-50 pointer-events-none opacity-0 flex items-center justify-center bg-[#0b0908]/40">
            <SteamMotif className="w-[200%] h-[200%] mix-blend-screen opacity-80" />
          </div>
        )}

      </div>
    </section>
  );
}
