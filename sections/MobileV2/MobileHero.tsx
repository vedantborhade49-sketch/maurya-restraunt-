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
  "/inside1.jpeg",
  "/editorial-food-4.png",
  "/editorial-food-5.png",
  "/dish-paneer-butter-masala.png",
  "/cooking.jpeg",
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
      className="relative w-full h-[100svh] bg-[#1C1414] flex flex-col justify-end overflow-hidden"
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
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={slides[currentIndex]} 
              alt="Maurya Experience" 
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Editorial Gradient Overlay (Rich Wine & Charcoal) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1414] via-[#1C1414]/50 to-[#1C1414]/10" />
      </motion.div>

      {/* Overlay Content */}
      <div className="relative z-10 px-6 pb-16 w-full flex flex-col items-start">
        
        {/* Progress Indicators */}
        <div className="flex gap-2 mb-8">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-0.5 rounded-full transition-all duration-700 ${i === currentIndex ? 'w-8 bg-[#B98532]' : 'w-2 bg-white/30'}`}
            />
          ))}
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#B98532] mb-3 block opacity-90">
            MAURYA
          </span>
          <h1 className="font-heading text-[52px] leading-[0.92] text-[#F8F6F1] tracking-tight drop-shadow-lg">
            Every Table<br />
            <span className="italic text-[#B98532] font-serif">Has A Story.</span>
          </h1>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col w-full gap-4"
        >
          <button 
            onClick={() => useTableStore.getState().setIsOpen(true)}
            className="flex items-center justify-center gap-3 w-full bg-[#8F1115] text-[#F8F6F1] px-6 py-4 rounded-full font-sans text-[12px] font-extrabold uppercase tracking-[0.15em] transition-transform active:scale-95 shadow-[0_4px_15px_rgba(143,17,21,0.5)] border border-[#FFCC00]/30"
          >
            Order Online <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
          
          <Link
            href="/menu"
            className="flex items-center justify-center gap-2 w-full bg-transparent text-[#F8F6F1] px-6 py-4 rounded-full font-sans text-[12px] font-extrabold uppercase tracking-[0.15em] border border-[#F8F6F1]/20 backdrop-blur-sm transition-colors active:bg-white/10"
          >
            Explore Menu
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
