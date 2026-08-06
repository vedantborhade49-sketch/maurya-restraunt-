"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTableStore } from "@/stores/table-store";

const slides = [
  "/editorial-table-feast.png",
  "/editorial-food-1.png",
  "/editorial-food-2.png",
  "/editorial-food-3.png",
  "/inside-1.jpeg",
  "/inside-2.jpeg",
  "/editorial-food-4.png",
  "/editorial-food-5.png",
  "/dish-paneer-butter-masala.png",
  "/outside.jpeg",
  "/dish-veg-biryani.png",
  "/dish-masala-dosa.png"
];

export default function MobileHero() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[100svh] min-h-[640px] bg-[#1C1414] flex flex-col justify-end overflow-hidden"
    >
      {/* Background Cinematic Slideshow */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 w-full h-full"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Main Background Image */}
            <img 
              src={slides[currentIndex]} 
              alt="Maurya Experience" 
              className="w-full h-full object-cover object-center brightness-[0.85]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Editorial Gradient Overlay (Rich Wine & Charcoal) for maximum legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1414] via-[#1C1414]/60 to-transparent" />
      </motion.div>

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
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B98532] mb-2 block opacity-90 font-bold">
            EST. 1985 · PURE VEG
          </span>
          <h1 className="font-heading text-[44px] leading-[0.95] text-[#F8F6F1] tracking-tight drop-shadow-md">
            Every Table<br />
            <span className="italic text-[#B98532] font-serif">Has A Story.</span>
          </h1>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col w-full gap-3"
        >
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
        </motion.div>
      </div>

    </section>
  );
}
