"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SteamMotif from "@/components/SteamMotif";
import { FloatingHandwriting } from "@/components/MicroArtifacts";

export default function Chapter02() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Refs for animation targeting
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineLinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLImageElement>(null);
  const image2Ref = useRef<HTMLImageElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const notesRef = useRef<(HTMLDivElement | null)[]>([]);
  const overallWrapperRef = useRef<HTMLDivElement>(null);

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
        // Simple mobile entrance animations
        gsap.fromTo(headlineLinesRef.current,
          { opacity: 0, y: 15, filter: "blur(5px)" },
          { 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)", 
            duration: 1.0, 
            stagger: 0.15, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            }
          }
        );

        if (imageWrapperRef.current) {
          gsap.fromTo(imageWrapperRef.current,
            { clipPath: "circle(0% at 50% 50%)" },
            { 
              clipPath: "circle(100% at 50% 50%)", 
              duration: 1.5, 
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: imageWrapperRef.current,
                start: "top 75%",
              }
            }
          );
        }

        // Crossfade to image 2 on mobile scroll reveal
        gsap.to(image2Ref.current, {
          opacity: 1,
          duration: 1.0,
          delay: 0.8,
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top 75%"
          }
        });

        gsap.fromTo(paraRef.current,
          { opacity: 0, y: 15 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.0, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: paraRef.current,
              start: "top 90%",
            }
          }
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom center",
          scrub: true,
        }
      });

      // SCENE 01: Silence (0 - 1.5)
      // Label is already visible. We hold silence by doing nothing for the first 1.5 units.
      
      // SCENE 02: Typography Takes Over (1.5 - 3.5)
      // Grows naturally: blur from 10px to 0px, opacity from 0 to 1, slight y shift.
      tl.fromTo(headlineLinesRef.current,
        { opacity: 0, y: 20, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 2, stagger: 0.5, ease: "power1.inOut" },
        1.5
      );

      // SCENE 03: Steam Reveals Memory (3.5 - 6.0)
      // Animate the clip-path of the image wrapper using a proxy for perfect GSAP compatibility
      const clipProxy = { radius: 0 };
      tl.to(clipProxy, {
        radius: 150,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (imageWrapperRef.current) {
            imageWrapperRef.current.style.clipPath = `circle(${clipProxy.radius}% at 50% 50%)`;
            imageWrapperRef.current.style.setProperty('-webkit-clip-path', `circle(${clipProxy.radius}% at 50% 50%)`);
          }
        }
      }, 3.5);

      // Parallax the steam heavily during the reveal
      tl.fromTo(steamRef.current,
        { x: "-20%", opacity: 0 },
        { x: "10%", opacity: 0.4, duration: 2.5, ease: "none" },
        3.5
      );

      // Image 1 subtly scales up during the reveal
      tl.fromTo(image1Ref.current,
        { scale: 1 },
        { scale: 1.05, duration: 2.5, ease: "none" },
        3.5
      );

      // SCENE 04: The Table Comes Alive (6.0 - 8.0)
      // Crossfade from Image 1 (food close-up) to Image 2 (family table)
      tl.fromTo(image2Ref.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 2, ease: "power1.inOut" },
        6.0
      );

      // SCENE 05: Memory (8.0 - 10.0)
      // Paragraph and handwritten notes appear
      tl.fromTo(paraRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power1.out" },
        8.0
      );

      tl.fromTo(notesRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 0.8, scale: 1, duration: 1.5, stagger: 0.3, ease: "power1.out" },
        8.2
      );

      // GLOBAL: The entire composition slowly drifts upwards
      gsap.to(overallWrapperRef.current, {
        y: "-10vh",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom center",
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  const addToHeadline = (el: HTMLSpanElement | null) => {
    if (el && !headlineLinesRef.current.includes(el)) {
      headlineLinesRef.current.push(el);
    }
  };

  const addToNotes = (el: HTMLDivElement | null) => {
    if (el && !notesRef.current.includes(el)) {
      notesRef.current.push(el);
    }
  };

  return (
    <section 
      ref={containerRef} 
      className={`relative w-full bg-[#F8F5EF] text-[#262626] ${isMobile ? "h-auto py-12" : "h-[260vh]"}`}
    >
      {/* Texture Layer - Barely visible paper fibers */}
      <div className="absolute inset-0 z-0 opacity-30 texture-ch3-paper pointer-events-none mix-blend-multiply" />

      <div className={isMobile ? "relative w-full" : "sticky top-0 w-full h-screen overflow-hidden"}>
        <div 
          ref={overallWrapperRef} 
          className={isMobile ? "relative w-full flex flex-col px-6" : "absolute inset-0 w-full h-full flex flex-col items-center justify-center pt-20"}
        >
          <div className={`relative z-10 w-full max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between ${isMobile ? "gap-6" : "h-full px-8 md:px-16"}`}>
            
            {/* LEFT: Typography Column (Scene 01, 02, 05) */}
            <div className={`w-full md:w-[45%] flex flex-col justify-center relative pointer-events-none ${isMobile ? "pt-12 text-center items-center" : "h-full md:pr-12"}`}>
              
              {/* Scene 01: Tiny Editorial Label */}
              <div 
                ref={labelRef} 
                className={`flex items-center gap-4 opacity-70 ${isMobile ? "mb-6 justify-center" : "absolute top-[15%] md:top-[10%] left-8 md:left-16"}`}
              >
                <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-[#6B2525]">
                  Chapter II
                </span>
                <div className="w-8 h-[1px] bg-[#6B2525]/30" />
                <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-[#6B2525]">
                  The Table That Always Waits
                </span>
              </div>

              {/* Scene 02: Massive Headline */}
              <h2 className={`font-heading text-[#262626] tracking-tight ${isMobile ? "text-[11vw] leading-[1.0] mb-4" : "text-[16vw] md:text-[10vw] leading-[0.9]"}`}>
                <span ref={addToHeadline} className="block w-full">Some Tables</span>
                <span ref={addToHeadline} className={`block w-full italic text-[#8B5A2B] ${isMobile ? "" : "pl-[5%] md:pl-[10%]"}`}>Are Never</span>
                <span ref={addToHeadline} className={`block w-full ${isMobile ? "" : "pl-[2%] md:pl-[5%]"}`}>Forgotten.</span>
              </h2>

              {/* Scene 05: The Memory Paragraph */}
              <p 
                ref={paraRef} 
                className={`font-sans text-[13px] md:text-[14px] leading-[1.8] text-[#262626]/80 max-w-[340px] ${
                  isMobile ? "mt-4 text-center mx-auto" : "mt-16 ml-[5%] md:ml-[10%]"
                }`}
              >
                Every celebration begins somewhere. For generations, families have gathered around this table—not just to eat, but to spend time together.
              </p>
            </div>

            {/* RIGHT: Cinematic Photographic Reveal (Scene 03, 04) */}
            <div className={`z-20 pointer-events-none ${
              isMobile 
                ? "relative w-full h-[40vh] mt-4" 
                : "absolute right-0 top-[20%] md:top-1/2 md:-translate-y-1/2 w-[90vw] md:w-[60vw] lg:w-[50vw] h-[50vh] md:h-[80vh]"
            }`}>
              
              {/* The Masked Container (Steam Reveal) */}
              <div 
                ref={imageWrapperRef} 
                className="relative w-full h-full overflow-hidden"
                style={{ clipPath: isMobile ? "circle(100% at 50% 50%)" : "circle(0% at 50% 50%)", WebkitClipPath: isMobile ? "circle(100% at 50% 50%)" : "circle(0% at 50% 50%)" }}
              >
                
                {/* Image 1: The Food (Close up) */}
                <img 
                  ref={image1Ref}
                  src="/editorial-food-3.png" 
                  alt="Steaming vegetarian dish" 
                  className={`absolute inset-0 w-full h-full object-cover transform-origin-center grayscale-[10%] sepia-[10%] ${isMobile ? "opacity-0" : "opacity-90"}`}
                  loading="lazy"
                />

                {/* Image 2: The Family Table (Wide) */}
                <img 
                  ref={image2Ref}
                  src="/editorial-food-5.png" 
                  alt="Families gathering at the table" 
                  className={`absolute inset-0 w-full h-full object-cover transform-origin-center grayscale-[15%] sepia-[15%] ${isMobile ? "opacity-100" : "opacity-0"}`}
                  loading="lazy"
                />
                
                {/* Overlay Steam */}
                <div ref={steamRef} className="absolute inset-0 z-10 pointer-events-none">
                  <SteamMotif className="w-[150%] h-[150%] mix-blend-screen opacity-0" />
                </div>
              </div>
            </div>

            {/* Scene 05: Editorial Handwritten Notes (Z-Index 30) */}
            {!isMobile && (
              <div className="absolute inset-0 pointer-events-none z-30 max-w-[1600px] mx-auto w-full">
                <div ref={addToNotes} className="absolute top-[25%] left-[55%] md:left-[45%]">
                  <FloatingHandwriting text="Sunday Lunch" rotate="-4deg" className="text-[#8B5A2B] text-lg md:text-2xl" />
                </div>
                <div ref={addToNotes} className="absolute bottom-[20%] left-[8%] md:left-[25%]">
                  <FloatingHandwriting text="Since Childhood" rotate="3deg" className="text-[#6B2525] text-lg md:text-2xl" />
                </div>
                <div ref={addToNotes} className="absolute top-[55%] right-[5%] md:right-[30%]">
                  <FloatingHandwriting text="Passed Around" rotate="-2deg" className="text-[#F8F5EF] drop-shadow-md text-lg md:text-2xl" />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
