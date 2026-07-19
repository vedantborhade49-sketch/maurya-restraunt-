"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Link from "next/link";

export default function TrustEditorial() {
  const containerRef = useRef<HTMLElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  const horizontalWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Horizontal Scroll for Singular Awards
      const sections = gsap.utils.toArray(".horizontal-panel");
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalWrapperRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + horizontalContainerRef.current?.offsetWidth
        }
      });

      // 2. The Final Invitation - Return to Maroon
      gsap.to(containerRef.current, {
        backgroundColor: "#1A050A", // Deep Maroon
        color: "#F9F6F0",
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".scene-invitation",
          start: "top 60%",
          end: "top 20%",
          scrub: true
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#F9F6F0] text-[#1F1F1F] selection:bg-[#B98555] selection:text-[#F9F6F0] transition-colors relative z-20">
      
      {/* Texture overlay for paper feeling */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />

      {/* =========================================================================
          SCENE 01: THE SINGULAR AWARD (Horizontal Scroll)
      ========================================================================= */}
      <div ref={horizontalWrapperRef} className="w-full h-screen overflow-hidden bg-[#F9F6F0]">
        <div ref={horizontalContainerRef} className="w-[400vw] h-full flex flex-nowrap">
          
          {/* Panel 1: Google */}
          <div className="horizontal-panel w-screen h-full flex flex-col items-center justify-center">
            <span className="font-serif text-[25vw] md:text-[20vw] italic text-[#B98555] leading-none mb-8">4.5★</span>
            <div className="flex items-center gap-4 opacity-70">
              {/* Subtle Google Multi-color dot */}
              <svg width="12" height="12" viewBox="0 0 12 12" className="mt-1">
                <path d="M6 0 A6 6 0 0 1 12 6 L6 6 Z" fill="#EA4335" />
                <path d="M12 6 A6 6 0 0 1 6 12 L6 6 Z" fill="#FBBC05" />
                <path d="M6 12 A6 6 0 0 1 0 6 L6 6 Z" fill="#34A853" />
                <path d="M0 6 A6 6 0 0 1 6 0 L6 6 Z" fill="#4285F4" />
              </svg>
              <span className="font-mono text-sm md:text-base uppercase tracking-[0.4em]">Google Reviews</span>
            </div>
          </div>

          {/* Panel 2: 888 Families */}
          <div className="horizontal-panel w-screen h-full flex flex-col items-center justify-center">
            <span className="font-serif text-[25vw] md:text-[20vw] italic text-[#1F1F1F] leading-none mb-8">888</span>
            <span className="font-mono text-sm md:text-base uppercase tracking-[0.4em] opacity-70">Families</span>
          </div>

          {/* Panel 3: Zomato */}
          <div className="horizontal-panel w-screen h-full flex flex-col items-center justify-center">
            <span className="font-serif text-[20vw] md:text-[15vw] italic text-[#B98555] leading-none mb-8">2200+</span>
            <div className="flex items-center gap-4 opacity-70">
              <div className="w-3 h-3 rounded-full bg-[#E23744] mt-1" />
              <span className="font-mono text-sm md:text-base uppercase tracking-[0.4em]">Meals Shared</span>
            </div>
          </div>

          {/* Panel 4: Swiggy */}
          <div className="horizontal-panel w-screen h-full flex flex-col items-center justify-center">
            <span className="font-serif text-[20vw] md:text-[15vw] italic text-[#1F1F1F] leading-none mb-8">800+</span>
            <div className="flex items-center gap-4 opacity-70">
              <div className="w-3 h-3 rounded-full bg-[#FC8019] mt-1" />
              <span className="font-mono text-sm md:text-base uppercase tracking-[0.4em]">Delivered</span>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          SCENE 02: ONE-LINE TRUTHS (Unpredictable Rhythm)
      ========================================================================= */}
      
      {/* Screen A: Typography Only */}
      <div className="w-full min-h-screen flex items-center justify-center px-8 text-center py-40">
        <h3 className="font-serif text-5xl md:text-7xl lg:text-[6vw] leading-[1.1] tracking-tight">
          <span className="text-[#B98555] italic">Because...</span><br />
          Our recipes<br />never changed.
        </h3>
      </div>

      {/* Screen B: Photography Only */}
      <div className="w-full h-screen px-4 md:px-12 py-12">
        <div className="w-full h-full bg-[#E8E1D5] overflow-hidden shadow-2xl">
          <ImagePlaceholder category="Dining" description="Massive edge-to-edge image of the kitchen or dining. Natural light." aspectRatio="h-full" />
        </div>
      </div>

      {/* Screen C: Mixed Offset */}
      <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-40 gap-16">
        <h3 className="font-serif text-4xl md:text-6xl lg:text-[4vw] leading-[1.1] tracking-tight md:w-1/2">
          <span className="text-[#B98555] italic">Because...</span><br />
          Grandparents<br />still recommend us.
        </h3>
        <div className="w-full md:w-[40%] aspect-[3/4] bg-[#E8E1D5] shadow-2xl">
          <ImagePlaceholder category="Portrait" description="Small portrait photograph. Authentic smile." aspectRatio="h-full" />
        </div>
      </div>

      {/* Screen D: Photography Only */}
      <div className="w-full h-[70vh] bg-[#E8E1D5] overflow-hidden">
        <ImagePlaceholder category="Food" description="Huge close-up image of the Dal Makhani." aspectRatio="h-full" />
      </div>

      {/* Screen E: Typography Only */}
      <div className="w-full min-h-[80vh] flex items-center justify-center px-8 text-center py-40">
        <h3 className="font-serif text-5xl md:text-7xl lg:text-[6vw] leading-[1.1] tracking-tight">
          <span className="text-[#B98555] italic">Because...</span><br />
          Sunday still<br />belongs to family.
        </h3>
      </div>

      {/* =========================================================================
          SCENE 03: THE EDITORIAL PAUSE
      ========================================================================= */}
      <div className="w-full py-[20vh] flex flex-col items-center justify-center text-center px-8">
        <span className="font-serif italic text-4xl md:text-5xl text-[#1F1F1F] mb-6">888 Reviews.</span>
        <span className="font-serif text-4xl md:text-5xl text-[#1F1F1F]">One Feeling.</span>
      </div>


      {/* =========================================================================
          SCENE 04: THE FINAL INVITATION (Transition back to Maroon)
      ========================================================================= */}
      <div className="scene-invitation w-full pt-40 pb-20 px-8 md:px-24 flex flex-col items-center justify-center text-center transition-colors duration-1000">
        
        <h2 className="font-serif text-[12vw] md:text-[9vw] leading-[1.05] tracking-tight mb-24">
          <span className="italic text-[#B98555]">The Table</span><br />
          Will Be Waiting.
        </h2>

        {/* Glowing Cinematic Exterior */}
        <div className="w-full max-w-[1200px] aspect-[21/9] bg-[#0A0204] relative mb-24 shadow-[0_40px_100px_rgba(0,0,0,0.8)] border-[0.5px] border-[#B98555]/20 overflow-hidden">
           <ImagePlaceholder 
              category="Setting" 
              description="Restaurant exterior at golden hour. Warm lights glowing from inside. Prepared empty tables." 
              aspectRatio="h-full" 
            />
            {/* Cinematic warm glow from inside */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(185,133,85,0.15)_0%,transparent_70%)] mix-blend-screen pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A050A] via-transparent to-transparent pointer-events-none" />
        </div>

        {/* CTA Button */}
        <Link 
          href="/book-a-table"
          className="group relative inline-flex items-center justify-center px-16 py-6 border border-[#B98555]/50 transition-all duration-700 hover:border-[#B98555] hover:shadow-[0_0_30px_rgba(185,133,85,0.2)] bg-[#1A050A]/80 backdrop-blur-md mb-40"
        >
          <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#F9F6F0] font-bold group-hover:tracking-[0.6em] transition-all duration-700">
            Reserve A Table
          </span>
        </Link>

        {/* Editorial Signature */}
        <div className="flex flex-col items-center opacity-40">
           <span className="font-serif italic text-lg mb-2">Maurya Veg</span>
           <span className="font-mono text-[8px] uppercase tracking-[0.4em]">Family Restaurant</span>
           <span className="font-mono text-[8px] uppercase tracking-[0.4em] mt-1 text-[#B98555]">Since 2003</span>
        </div>

      </div>

    </section>
  );
}
