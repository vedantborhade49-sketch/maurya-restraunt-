"use client";

import { useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroHeadline from "./HeroHeadline";
import HeroMedia from "./HeroMedia";
import HeroButtons from "./HeroButtons";
import HeroScrollHint from "./HeroScrollHint";
import { playAfterVideoTimeline } from "../../lib/animations/masterTimeline";
import HeroParticles from "../../components/HeroParticles";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const handleVideoEnd = useCallback(() => {
    if (!timelineRef.current && containerRef.current) {
      const ctx = gsap.context(() => {
        timelineRef.current = playAfterVideoTimeline();
        timelineRef.current.play();
      }, containerRef);
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Phase 3 — Pinned scroll transformation timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%", // Scroll height to pin
          pin: true,
          scrub: 1,
        }
      });

      // 0–20% scroll: Separate and fade hero text content
      scrollTl.to("#hero-content-wrapper", { 
        y: -100, 
        opacity: 0, 
        scale: 0.95,
        ease: "power2.inOut" 
      }, 0);

      // 20–50% scroll: Camera zooms into background video
      scrollTl.to("#hero-main-video", { 
        scale: 1.4, 
        opacity: 0.3,
        ease: "power1.inOut" 
      }, 0.2);

      // 40–80% scroll: Plate isolated and approaches
      scrollTl.fromTo("#transition-plate-container", 
        { scale: 0, opacity: 0, rotation: -30 },
        { scale: 1, opacity: 1, rotation: 0, ease: "power2.inOut" },
        0.3
      );

      // 80–100% scroll: Plate fills viewport as transition mask
      scrollTl.to("#transition-plate-container", {
        scale: 15,
        opacity: 0.95,
        ease: "power3.in"
      }, 0.8);
      
      // Also fade out hint
      scrollTl.to("#hero-scroll-hint", { opacity: 0, ease: "none" }, 0);
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100svh] overflow-hidden flex flex-col justify-center px-6 md:px-24 pt-16 bg-midnight"
    >
      <HeroMedia onVideoEnd={handleVideoEnd} />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-between items-center h-full pointer-events-none">
        <div id="hero-content-wrapper" className="w-full relative z-10 pointer-events-auto origin-center">
          <HeroHeadline />
          <HeroButtons />
        </div>
      </div>

      {/* Floating Transition Plate (Hidden initially, zooms in on scroll) */}
      <div 
        id="transition-plate-container" 
        className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center opacity-0 scale-0 origin-center"
      >
        <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-4 border-gold/30">
          <img 
            src="/editorial-food-4.png" 
            alt="Veg Maratha Signature Dish" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 to-transparent" />
          
          {/* Circular Text Label overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/20">
            <h3 className="font-heading text-lg md:text-2xl text-gold tracking-widest uppercase">
              ONE TABLE.
            </h3>
            <p className="text-[8px] md:text-[10px] tracking-[0.2em] text-royal-ivory uppercase mt-1">
              ENDLESS CRAVINGS
            </p>
          </div>
        </div>
      </div>
      
      <HeroParticles />
      <HeroScrollHint />
    </section>
  );
}
