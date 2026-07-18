"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MarginNote } from "@/components/MicroArtifacts";
import Link from "next/link";

export default function Chapter08() {
  const containerRef = useRef<HTMLElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      
      // 1. Smooth Transition from Chapter 07 (Light) to Chapter 08 (Dark)
      // The background starts as light paper and crossfades to dark.
      gsap.fromTo(transitionRef.current,
        { opacity: 1 },
        { 
          opacity: 0, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "top 30%",
            scrub: true
          }
        }
      );

      // 2. Fade up elements
      const elements = gsap.utils.toArray(".fade-up");
      
      elements.forEach((el: any) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.5, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#0b0908] text-[#F8F5EF] pt-48 pb-16 md:pt-64 md:pb-24 z-20 overflow-hidden">
      
      {/* Transition overlay masking the hard cut from Chapter 07 */}
      <div ref={transitionRef} className="absolute inset-0 bg-[#F8F5EF] z-50 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 relative z-10">
        
        {/* LEFT: Massive Typography */}
        <div className="md:col-span-6 flex flex-col fade-up">
          <MarginNote text="Final Chapter" className="text-[#b98532] mb-12" rotate="0deg" />
          <h2 className="font-heading text-[15vw] md:text-[8vw] leading-[0.9] tracking-tight mb-8">
            Your Table<br/>
            <span className="italic text-[#8B5A2B]">Awaits.</span>
          </h2>
        </div>

        {/* RIGHT: Minimal Information */}
        <div className="md:col-span-5 md:col-start-8 flex flex-col justify-end fade-up">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 border-t border-[#b98532]/20 pt-12">
            
            {/* Location */}
            <div className="flex flex-col">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#F8F5EF]/40 mb-4">Location</span>
              <p className="font-sans text-[14px] text-[#F8F5EF]/80 leading-relaxed mb-4">
                Khadi Machine Chowk,<br/>
                Kondhwa, Pune,<br/>
                Maharashtra 411048
              </p>
              <Link href="#" className="font-mono text-[10px] uppercase tracking-widest text-[#b98532] hover:text-[#F8F5EF] transition-colors inline-block mt-2">
                Open in Maps →
              </Link>
            </div>

            {/* Hours */}
            <div className="flex flex-col">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#F8F5EF]/40 mb-4">Hours</span>
              <p className="font-sans text-[14px] text-[#F8F5EF]/80 leading-relaxed">
                <span className="block mb-2">Mon - Sun</span>
                11:30 AM — 11:30 PM
              </p>
            </div>

          </div>

          <div className="mt-16 border-t border-[#b98532]/20 pt-12">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#F8F5EF]/40 mb-4 block">Reservations</span>
            <p className="font-sans text-[14px] text-[#F8F5EF]/80 leading-relaxed max-w-[280px] mb-8">
              We highly recommend saving your table in advance for weekend dinners and large family gatherings.
            </p>
            <button className="bg-[#6B2525] text-[#F8F5EF] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-[#8B5A2B] transition-colors">
              Save Your Table
            </button>
          </div>

        </div>

      </div>

      {/* Extreme Minimal Footer */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-32 md:mt-48 flex flex-col md:flex-row justify-between items-center border-t border-[#b98532]/10 pt-8 fade-up">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#F8F5EF]/30">
          © {new Date().getFullYear()} Maurya Veg Family Restaurant. All Rights Reserved.
        </span>
        <div className="flex gap-8 mt-4 md:mt-0">
          <Link href="#" className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#F8F5EF]/30 hover:text-[#b98532] transition-colors">Instagram</Link>
          <Link href="#" className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#F8F5EF]/30 hover:text-[#b98532] transition-colors">Facebook</Link>
        </div>
      </div>

    </section>
  );
}
