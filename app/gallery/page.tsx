"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const GalleryHero = dynamic(() => import("@/sections/GalleryEditorial/GalleryHero"), { ssr: true });
const GalleryArchive = dynamic(() => import("@/sections/GalleryEditorial/GalleryArchive"), { ssr: false });
const GalleryKitchen = dynamic(() => import("@/sections/GalleryEditorial/GalleryKitchen"), { ssr: false });
const GalleryTable = dynamic(() => import("@/sections/GalleryEditorial/GalleryTable"), { ssr: false });
const GalleryAtmosphere = dynamic(() => import("@/sections/GalleryEditorial/GalleryAtmosphere"), { ssr: false });
const GalleryExhibition = dynamic(() => import("@/sections/GalleryEditorial/GalleryExhibition"), { ssr: false });

export default function GalleryPage() {
  const containerRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      
      const cursor = cursorRef.current;
      if (cursor) {
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        
        window.addEventListener("mousemove", (e) => {
          gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
          });
        });

        document.addEventListener("mouseenter", (e) => {
          const target = e.target as HTMLElement;
          if (target && target.classList && target.classList.contains("hover-reveal")) {
            gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
          }
        }, true);
        
        document.addEventListener("mouseleave", (e) => {
          const target = e.target as HTMLElement;
          if (target && target.classList && target.classList.contains("hover-reveal")) {
            gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.out" });
          }
        }, true);
      }

      // Discrete color journey
      const sections = gsap.utils.toArray("section");
      const themes = [
        { bg: "#F8F4ED", text: "#322A26" }, // 1. Warm Ivory
        { bg: "#F2E6D8", text: "#322A26" }, // 2. Linen
        { bg: "#E0D8D0", text: "#322A26" }, // 3. Stone
        { bg: "#322A26", text: "#F5E8D5" }, // 4. Deep Cocoa
        { bg: "#273128", text: "#F6EFE6" }, // 5. Dark Olive
        { bg: "#F8F4ED", text: "#322A26" }  // 6. Warm Ivory
      ];

      sections.forEach((section: any, i: number) => {
        const theme = themes[i] || themes[themes.length - 1];
        
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%", // Trigger when section hits middle of screen
          end: "bottom 50%",
          onEnter: () => {
            gsap.to(containerRef.current, {
              backgroundColor: theme.bg,
              color: theme.text,
              duration: 0.9,
              ease: "power2.inOut",
              overwrite: "auto"
            });
          },
          onEnterBack: () => {
            gsap.to(containerRef.current, {
              backgroundColor: theme.bg,
              color: theme.text,
              duration: 0.9,
              ease: "power2.inOut",
              overwrite: "auto"
            });
          }
        });
      });
      
    }, containerRef);
    
    const timeoutId = setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      clearTimeout(timeoutId);
      ctx.revert();
    };
  }, []);

  return (
    <main ref={containerRef} className="relative w-full min-h-screen bg-[#F8F4ED] text-[#322A26] overflow-hidden transition-colors duration-[900ms] will-change-[background-color,color]">
      
      {/* Global Custom Cursor */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-16 h-16 rounded-full border border-current bg-white/20 backdrop-blur-sm pointer-events-none z-[100] flex items-center justify-center opacity-0 scale-0 mix-blend-difference">
        <span className="font-mono text-[8px] uppercase tracking-widest text-white">View</span>
      </div>

      {/* Premium Background Layers */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.05] mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08)_0%,transparent_80%)] mix-blend-overlay" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply" />
      <svg className="pointer-events-none fixed inset-0 z-0 w-full h-full opacity-[0.03] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
        <pattern id="arch-lines" width="120" height="120" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="120" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="120" y2="0" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="0.3" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#arch-lines)" />
      </svg>

      <div className="relative z-10">
        <GalleryHero />
        <GalleryArchive />
        <GalleryKitchen />
        <GalleryTable />
        <GalleryAtmosphere />
        <GalleryExhibition />
      </div>
    </main>
  );
}
