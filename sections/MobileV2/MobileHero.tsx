"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTableStore } from "@/stores/table-store";

const slides = [
  "/editorial-table-feast.webp",
  "/editorial-food-1.webp",
  "/inside-1.webp",
  "/editorial-food-3.webp",
  "/outside.webp"
];

export default function MobileHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      className="relative w-full h-[100svh] min-h-[640px] bg-[#1C1414] flex flex-col justify-end overflow-hidden"
    >
      {/* Background Cinematic Slideshow using GPU CSS */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {slides.map((src, i) => (
          <img
            key={src}
            src={src}
            alt="Maurya Experience"
            fetchPriority={i === 0 ? "high" : "low"}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover object-center brightness-[0.85] transition-opacity duration-1000 ease-in-out ${
              i === currentIndex ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-105"
            } transition-transform duration-[6000ms]`}
          />
        ))}

        {/* Editorial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1414] via-[#1C1414]/60 to-transparent pointer-events-none" />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 px-6 pb-8 w-full flex flex-col items-start">
        
        {/* Progress Indicators */}
        <div className="flex gap-1.5 mb-6">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-6 bg-[#B98532]' : 'w-1.5 bg-white/30'}`}
            />
          ))}
        </div>

        {/* Heading */}
        <div className="mb-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B98532] mb-2 block opacity-90 font-bold">
            EST. 1985 · PURE VEG
          </span>
          <h1 className="font-heading text-[44px] leading-[0.95] text-[#F8F6F1] tracking-tight drop-shadow-md">
            Every Table<br />
            <span className="italic text-[#B98532] font-serif">Has A Story.</span>
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col w-full gap-3">
          <button 
            onClick={() => useTableStore.getState().setIsOpen(true)}
            className="flex items-center justify-center gap-3 w-full h-[52px] bg-[#8F1115] hover:bg-[#A3161A] text-[#F8F6F1] px-6 rounded-full font-sans text-[13px] font-extrabold uppercase tracking-[0.15em] transition-transform active:scale-[0.98] shadow-[0_4px_15px_rgba(143,17,21,0.5)] border border-[#FFCC00]/30"
          >
            Order Online <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
          
          <Link
            href="/menu"
            className="flex items-center justify-center gap-2 w-full h-[52px] bg-white/10 hover:bg-white/20 text-[#F8F6F1] px-6 rounded-full font-sans text-[13px] font-extrabold uppercase tracking-[0.15em] border border-[#F8F6F1]/20 backdrop-blur-md transition-all active:scale-[0.98]"
          >
            Explore Menu
          </Link>
        </div>
      </div>

    </section>
  );
}
