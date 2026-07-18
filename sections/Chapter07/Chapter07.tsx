"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { MarginNote } from "@/components/MicroArtifacts";

export default function Chapter07() {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      
      const elements = gsap.utils.toArray<HTMLElement>(".fade-in-up");
      
      elements.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 2, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          }
        );
      });

      // Subtle slow scale on the aerial image
      gsap.to(".aerial-image", {
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#fcf9f2] text-[#262626] overflow-hidden z-10">
      
      {/* 
        The Transition: 
        We use a gradient overlay at the very top to blend from the dark/warm Memory Book 
        into the bright daylight of this final chapter.
      */}
      <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[#1c1815] to-transparent z-20 pointer-events-none" />

      {/* Golden Hour / Daylight Aerial Photograph */}
      <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
        <img 
          src="/restaurant-interior.png" 
          alt="Maurya Golden Hour" 
          className="aerial-image w-full h-[120%] -mt-[10%] object-cover sepia-[10%] brightness-110 contrast-90" 
        />
        {/* Soft golden hour gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcf9f2] via-[#fcf9f2]/20 to-transparent" />
        <div className="absolute inset-0 mix-blend-color bg-[#f9e0b8] opacity-20 pointer-events-none" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative -mt-32 md:-mt-48 z-30 pb-32 md:pb-48">
        
        {/* The Invitation Typography */}
        <div className="text-center mb-32 md:mb-48 fade-in-up">
          <MarginNote text="Visit Maurya" className="text-[#8B5A2B] mb-12" rotate="0deg" />
          <h2 className="font-heading text-[12vw] md:text-[7vw] leading-[0.9] tracking-tight max-w-[1000px] mx-auto">
            Come Hungry.<br/>
            Leave With<br/>
            <span className="italic text-[#8B5A2B]">Another Memory.</span>
          </h2>
        </div>

        {/* Minimal Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 max-w-[1000px] mx-auto border-t border-[#262626]/10 pt-16 fade-in-up">
          
          <div className="flex flex-col">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#262626]/40 mb-4 block">Location</span>
            <p className="font-sans text-[14px] leading-relaxed text-[#262626]/80">
              Khadi Machine Chowk,<br/>
              Kondhwa, Pune,<br/>
              Maharashtra 411048
            </p>
            <Link href="#" className="mt-4 font-mono text-[9px] uppercase tracking-widest text-[#8B5A2B] hover:text-[#262626] transition-colors">
              Get Directions →
            </Link>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#262626]/40 mb-4 block">Hours</span>
            <p className="font-sans text-[14px] leading-relaxed text-[#262626]/80">
              Open Everyday<br/>
              11:30 AM — 11:30 PM
            </p>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#262626]/40 mb-4 block">Contact</span>
            <p className="font-sans text-[14px] leading-relaxed text-[#262626]/80">
              Reservations & Takeaway<br/>
              +91 98765 43210
            </p>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#262626]/40 mb-4 block">Amenities</span>
            <p className="font-sans text-[14px] leading-relaxed text-[#262626]/80">
              Valet Parking Available<br/>
              Wheelchair Accessible<br/>
              Pure Vegetarian Kitchen
            </p>
          </div>

        </div>

      </div>

      {/* Extremely Minimal Footer */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-8 flex flex-col md:flex-row justify-between items-center border-t border-[#262626]/5 pt-8 text-[#262626]/30 fade-in-up">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} Maurya Veg Family Restaurant.
        </span>
        <div className="flex gap-8 mt-4 md:mt-0">
          <Link href="#" className="font-mono text-[9px] uppercase tracking-[0.2em] hover:text-[#262626] transition-colors">Instagram</Link>
          <Link href="#" className="font-mono text-[9px] uppercase tracking-[0.2em] hover:text-[#262626] transition-colors">Facebook</Link>
        </div>
      </div>

    </section>
  );
}
