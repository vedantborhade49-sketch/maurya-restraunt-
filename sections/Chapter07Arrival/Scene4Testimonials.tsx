"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EditorialImage from "@/components/EditorialImage";

const slides = [
  {
    quote: "Our Sunday tradition for the last ten years.",
    meta: "TABLE 04",
    image: "/outside.jpeg",
  },
  {
    quote: "Celebrated our 25th anniversary here. Unforgettable.",
    meta: "PRIVATE DINING",
    image: "/inside1.jpeg",
  },
  {
    quote: "The warmth of a home, the precision of fine dining.",
    meta: "GUEST BOOK",
    image: "/inside2.jpeg",
  },
  {
    quote: "Every flavor tells a story of heritage and passion.",
    meta: "EVENING SERVICE",
    image: "/inside3.png",
  }
];

export default function Scene4Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[120vh] bg-[#1A1716] flex flex-col items-center justify-center overflow-hidden py-32">
      {/* ─── MOODY BACKGROUND ─── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Photo Slideshow */}
        <div className="lg:col-span-5 relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] bg-[#350709] border border-[#B98532]/20 p-4 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
          <div className="relative w-full h-full overflow-hidden bg-[#110E0E]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <EditorialImage src={slides[currentIndex].image} alt="Maurya Experience" />
                <div className="absolute inset-0 bg-[#350709]/10 mix-blend-multiply" />
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Progress Indicators */}
          <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 transition-all duration-500 rounded-full ${
                  i === currentIndex ? "w-10 bg-[#B98532]" : "w-3 bg-[#F8F6F1]/20 hover:bg-[#F8F6F1]/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Review Slideshow */}
        <div className="lg:col-span-7 relative flex flex-col justify-center text-center lg:text-left h-full mt-12 lg:mt-0">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#B98532] mb-16 block">
            Why People Return
          </span>
          
          <div className="relative h-[280px] md:h-[220px] flex flex-col justify-center items-center lg:items-start w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute w-full"
              >
                <p className="font-serif italic text-3xl md:text-5xl lg:text-6xl text-[#F8F6F1] leading-[1.3] font-light max-w-2xl">
                  "{slides[currentIndex].quote}"
                </p>
                <div className="mt-12 flex items-center justify-center lg:justify-start gap-6">
                  <div className="w-12 h-[1px] bg-[#B98532]/40" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B98532]">
                    {slides[currentIndex].meta}
                  </span>
                  <div className="w-12 h-[1px] bg-[#B98532]/40 lg:hidden" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
