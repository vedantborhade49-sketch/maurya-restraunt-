"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function Scene5Location() {
  const containerRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      
      // Simple fade in for the map container
      gsap.fromTo(mapRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[120vh] bg-[#E8DCC7] overflow-hidden flex flex-col items-center justify-center py-32">
      
      {/* ─── BACKGROUND: CHAMPAGNE & STONE ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDFBF7] to-[#E8DCC7]" />
        {/* Stone Texture */}
        <div className="absolute inset-0 opacity-[0.2] mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02 0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
      </div>

      <div className="relative w-full max-w-[1200px] flex flex-col items-center z-10 px-6 md:px-12">
        
        {/* Minimal Typography */}
        <div className="text-center mb-16 md:mb-24">
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#6B5A3E] mb-6 block">Location</span>
          <h2 className="font-serif text-5xl md:text-7xl text-[#292421] font-normal tracking-tight">
            Find Your <span className="italic text-[#B8893F]">Way.</span>
          </h2>
        </div>

        {/* ─── GOOGLE MAPS EMBED ─── */}
        <div ref={mapRef} className="relative w-full max-w-[900px] aspect-square md:aspect-[21/9] border border-[#B8893F]/20 bg-[#FDFBF7]/40 backdrop-blur-sm shadow-[20px_30px_60px_rgba(41,36,33,0.05)] p-4 md:p-8">
          
          <div className="relative w-full h-full overflow-hidden bg-[#E8DCC7]">
            <iframe 
              src="https://maps.google.com/maps?q=Maurya%20Pure%20Veg%20Restaurant%20Kondhwa%20Pune&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              className="w-full h-full grayscale opacity-80 mix-blend-multiply" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* ─── CTAS ─── */}
        <div className="mt-20 flex flex-col sm:flex-row items-center gap-12 sm:gap-24">
          
          <Link href="https://maps.google.com/?q=Maurya+Pure+Veg+Restaurant+Kondhwa+Pune" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 cursor-pointer">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#6B5A3E] group-hover:text-[#292421] transition-colors duration-300">
              Open Google Maps
            </span>
            <div className="w-full h-[1px] bg-[#6B5A3E]/30 group-hover:bg-[#292421] transition-colors duration-300" />
          </Link>

          <Link href="/visit#reserve" className="group flex flex-col items-center gap-3 cursor-pointer">
            <span className="font-serif italic text-xl text-[#292421] group-hover:text-[#B8893F] transition-colors duration-300">
              Reserve Your Evening
            </span>
            <div className="w-full h-[1px] bg-[#B8893F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          </Link>

        </div>

      </div>
    </section>
  );
}
