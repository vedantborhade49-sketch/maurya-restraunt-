"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function Scene5Location() {
  const containerRef = useRef<HTMLElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const destinationRef = useRef<SVGCircleElement>(null);
  const destinationGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      
      // Route Drawing Animation
      if (routeRef.current) {
        const length = routeRef.current.getTotalLength();
        gsap.set(routeRef.current, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(routeRef.current, {
          strokeDashoffset: 0,
          duration: 3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
          }
        });
      }

      // Destination Glow
      gsap.fromTo(destinationRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 1,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 20%",
          }
        }
      );

      gsap.to(destinationGlowRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power1.out",
      });

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

        {/* ─── LUXURY ILLUSTRATED MAP ─── */}
        <div className="relative w-full max-w-[800px] aspect-video border border-[#B8893F]/20 bg-[#FDFBF7]/40 backdrop-blur-sm shadow-[20px_30px_60px_rgba(41,36,33,0.05)] p-8 md:p-12">
          
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Abstract Street Lines */}
            <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full stroke-[#6B5A3E]/10 fill-none" strokeWidth="2">
              <path d="M-100,50 L300,100 L500,50 L900,150" />
              <path d="M-100,200 L400,200 L600,100 L900,200" />
              <path d="M200,-50 L250,200 L150,450" />
              <path d="M600,-50 L550,200 L650,450" />
            </svg>

            {/* The Gold Route */}
            <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full fill-none">
              <path 
                ref={routeRef}
                d="M100,350 Q300,350 400,250 T600,150" 
                className="stroke-[#B8893F]" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                style={{ filter: "drop-shadow(0px 5px 10px rgba(184, 137, 63, 0.4))" }}
              />
              
              {/* Destination Point */}
              <circle 
                ref={destinationRef}
                cx="600" 
                cy="150" 
                r="8" 
                className="fill-[#582028]" 
              />
            </svg>

            {/* Glowing Destination Marker */}
            <div 
              className="absolute w-4 h-4"
              style={{ left: "calc((600/800) * 100%)", top: "calc((150/400) * 100%)", transform: "translate(-50%, -50%)" }}
            >
               <div ref={destinationGlowRef} className="absolute inset-0 bg-[#582028] rounded-full blur-[4px]" />
               
               {/* Minimal Map Label */}
               <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-center">
                 <span className="font-serif italic text-lg text-[#292421]">Maurya</span>
                 <span className="block font-mono text-[8px] uppercase tracking-widest text-[#6B5A3E] mt-1">Kondhwa Khurd</span>
               </div>
            </div>

            {/* Arrow Decoration */}
            <div className="absolute bottom-8 left-8 flex items-center gap-4 text-[#B8893F]">
              <span className="font-mono text-[8px] uppercase tracking-widest">NIBM Road</span>
              <svg width="24" height="8" viewBox="0 0 24 8" fill="none">
                <path d="M0,4 L22,4 M18,0 L24,4 L18,8" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>

          </div>
        </div>

        {/* ─── CTAS ─── */}
        <div className="mt-20 flex flex-col sm:flex-row items-center gap-12 sm:gap-24">
          
          <Link href="https://maps.google.com" target="_blank" className="group flex flex-col items-center gap-3 cursor-pointer">
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
