"use client";

import { useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroHeadline from "./HeroHeadline";
import HeroMedia from "./HeroMedia";
import HeroButtons from "./HeroButtons";
import HeroScrollHint from "./HeroScrollHint";
import HeroParticles from "@/components/HeroParticles";
import Navbar from "@/components/Navbar";
import { playAfterVideoTimeline } from "@/lib/animations/masterTimeline";

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
      // The scroll transition (magical lighting and parallax)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1,
        }
      });

      // Scale headline down
      scrollTl.to("#hero-content-wrapper", { scale: 0.9, y: -50, ease: "none" }, 0);
      
      // Parallax video
      scrollTl.to("#hero-main-video", { yPercent: 30, ease: "none" }, 0);
      
      // Lighten overlays to transition to warm ivory
      scrollTl.to("#hero-overlay-black", { opacity: 0, ease: "none" }, 0);
      scrollTl.to("#hero-overlay-gradient", { opacity: 0.3, ease: "none" }, 0);
      scrollTl.to("#hero-overlay-ivory", { opacity: 0.4, ease: "none" }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100vh] min-h-[800px] overflow-hidden flex flex-col justify-center px-12 md:px-24 pt-20"
    >
      <Navbar />
      
      <HeroMedia onVideoEnd={handleVideoEnd} />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-between items-center h-full pointer-events-none">
        <div id="hero-content-wrapper" className="w-full relative z-10 pointer-events-auto origin-center">
          <HeroHeadline />
          <HeroButtons />
        </div>
      </div>
      
      <HeroParticles />
      <HeroScrollHint />
    </section>
  );
}
