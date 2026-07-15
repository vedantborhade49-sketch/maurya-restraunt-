"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { MAURYA_EASE } from "../../lib/motion/maurya-motion";

export default function OurStoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade page in smoothly
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.8, ease: "power2.out" }
      );
      
      gsap.fromTo(".reveal-item", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: MAURYA_EASE.heavy }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#F3E8D4] text-[#350709] pt-32 pb-24 px-6 md:px-12 relative overflow-hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E")`,
      }}
    >
      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <span className="reveal-item font-sans text-xs tracking-[0.3em] text-[#8F1115] font-extrabold uppercase block">
            THE LIVING TABLE
          </span>
          <h1 className="reveal-item font-serif font-bold text-5xl md:text-7xl text-[#8F1115] tracking-tight leading-none">
            Our Story
          </h1>
          <div className="reveal-item w-20 h-[1.5px] bg-[#B98532] mx-auto mt-6" />
        </div>

        {/* Narrative Image Banner */}
        <div className="reveal-item relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(53,7,9,0.12)] border-4 border-white/40">
          <Image
            src="/restaurant-interior.png"
            alt="Maurya Dining Room"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Main Editorial Copy */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start reveal-item">
          
          {/* Accent statement */}
          <div className="md:col-span-5 font-serif font-bold text-2xl md:text-3xl text-[#8F1115] leading-snug italic">
            "A table is not just a piece of wood. It is a stage where stories unfold, and memories are shared over warm meals."
          </div>

          {/* Core copy */}
          <div className="md:col-span-7 space-y-6 font-sans font-light text-base leading-relaxed text-[#350709]/90">
            <p>
              Maurya was born in Kondhwa, Pune out of a simple belief: that fine vegetarian cuisine has a soul, a warmth, and a richness that deserves a grand table. We did not build Maurya around a list of recipes; we built it as a home for gatherings.
            </p>
            <p>
              Our culinary philosophy is rooted in authenticity. Our chefs treat every spice with reverence, extracting the true character of classical North Indian curries, delicate Maharashtrian dishes, and vibrant Chinese-inspired favourites. Every plate we serve is 100% pure veg, prepared with devotion and served with pride.
            </p>
            <p>
              From family celebrations and birthday parties to casual dinners on busy weekends, our goal remains unchanged: to send you home with food in your stomach, satisfaction in your mind, and a story to tell.
            </p>
          </div>
        </div>

        {/* Footer lockup & CTAs */}
        <div className="reveal-item border-t border-[#350709]/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <span className="font-serif italic text-2xl text-[#8F1115]">
              A Place for One More Plate.
            </span>
            <p className="font-sans text-[10px] tracking-widest text-[#350709]/50 uppercase mt-1">
              Maurya Vegetarian Dining · Kondhwa, Pune
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href="/menu"
              className="px-6 py-3 bg-[#8F1115] hover:bg-[#8F1115]/90 text-[#F3E8D4] text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md hover:-translate-y-0.5"
            >
              Explore Menu
            </Link>
            <Link
              href="/book-a-table"
              className="px-6 py-3 border border-[#350709]/20 hover:bg-[#350709]/5 text-[#350709] text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
            >
              Request Table
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
