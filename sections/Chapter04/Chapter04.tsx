"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MarginNote } from "@/components/MicroArtifacts";
import CulinarySmokeEffect from "@/components/CulinarySmokeEffect";

export default function Chapter04() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".reveal-line");

      if (isMobile) {
        // Mobile entrance reveals without pinning
        gsap.fromTo(lines,
          { yPercent: 50, opacity: 0 },
          { 
            yPercent: 0, 
            opacity: 1, 
            stagger: 0.15, 
            duration: 1.0, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 85%"
            }
          }
        );

        gsap.fromTo(".reveal-accent",
          { opacity: 0, scale: 0.95 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.8, 
            scrollTrigger: {
              trigger: ".reveal-accent",
              start: "top 90%"
            }
          }
        );
        return;
      }
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: "+=120%",
          scrub: 1,
        }
      });

      // Initially text is hidden
      gsap.set(lines, { yPercent: 80, opacity: 0 });
      gsap.set(".reveal-accent", { opacity: 0, scale: 0.9, y: -20 });

      // Animate the text revealing with scroll scrub
      tl.to(".reveal-accent", {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, 0);

      tl.to(lines, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.25,
        duration: 1.5,
        ease: "power2.out"
      }, 0.2);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className={`relative w-full bg-[#141010] text-[#F8F5EF] overflow-hidden z-20 flex flex-col items-center justify-center ${isMobile ? "py-12 min-h-[420px]" : "h-screen"}`}
    >
      {/* Real-time Atmospheric Culinary Smoke & Spice Embers Effect */}
      <CulinarySmokeEffect />

      {/* Decorative Vintage Ring Frame around center content */}
      <div className="absolute inset-8 sm:inset-16 md:inset-24 border border-[#9A5C3B]/20 pointer-events-none rounded-sm z-10 hidden sm:block">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#141010] px-4 font-mono text-[9px] uppercase tracking-[0.3em] text-[#9A5C3B]/60">
          MAURYA • HERITAGE CRAFT
        </div>
      </div>

      {/* Typography and Layout */}
      <div className={`relative z-20 container-maurya flex flex-col items-center justify-center text-center my-auto ${isMobile ? "py-4" : "py-16 md:py-24"}`}>
        
        <div className="content-grid flex flex-col items-center max-w-[920px] mx-auto">
          
          <div className="reveal-accent mb-4 md:mb-10 flex flex-col items-center">
            <MarginNote text="Act II — The Craft" className="text-[#9A5C3B]" rotate="0deg" />
            <div className="w-[1px] h-8 md:h-10 bg-gradient-to-b from-[#9A5C3B]/60 to-transparent mt-2 md:mt-3" />
          </div>

          <h2 
            ref={headlineRef} 
            className={`font-heading leading-[0.9] tracking-tight uppercase overflow-hidden ${isMobile ? "text-[8vw]" : "text-[9vw] md:text-[6.2vw]"}`}
          >
            <div className="reveal-line">Every Plate Begins</div>
            <div className="reveal-line italic text-[#9A5C3B] drop-shadow-[0_4px_25px_rgba(154,92,59,0.3)]">Long Before It</div>
            <div className="reveal-line">Reaches Your Plate</div>
          </h2>
          
          <div className="mt-5 md:mt-10 overflow-hidden max-w-[560px] mx-auto">
            <p className="reveal-line font-sans text-[13.5px] md:text-[17px] text-[#F8F5EF]/85 leading-relaxed font-light">
              The foundation of our cuisine isn't just a recipe. It's the hands that roll the dough, the patience required for overnight slow-cooking, and the uncompromising selection of whole spices.
            </p>
          </div>

          {/* Subtle Bottom Aesthetic Brass Accent */}
          <div className="reveal-line mt-6 md:mt-8 flex items-center justify-center gap-3 opacity-60">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#9A5C3B]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#9A5C3B]" />
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#9A5C3B]" />
          </div>

        </div>

      </div>

    </section>
  );
}
