"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MarginNote } from "@/components/MicroArtifacts";

export default function Chapter03() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // Pinned ScrollTrigger scrubbing through 4 cartoon animation scenes
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: isMobile ? "+=200%" : "+=260%",
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.25) setActiveStep(0);
            else if (p < 0.5) setActiveStep(1);
            else if (p < 0.75) setActiveStep(2);
            else setActiveStep(3);
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#EFE8DB] text-[#272322] py-16 md:py-24 overflow-hidden flex flex-col justify-center select-none"
    >
      {/* Background Texture - Warm Paper Grain */}
      <div className="absolute inset-0 z-0 opacity-40 texture-ch3-paper pointer-events-none mix-blend-multiply" />

      <div className="relative w-full flex flex-col items-center gap-8 md:gap-12 container-maurya z-10 my-auto">
        
        {/* Layer 1: Editorial Typography (Kept 100% identical layout) */}
        <div className="content-grid w-full text-center max-w-[900px] mx-auto">
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#9A5C3B] font-bold mb-3 block">
            02 &nbsp;·&nbsp; THE CRAFT & THE TABLE
          </span>
          <h2 className="font-heading text-[40px] sm:text-[60px] md:text-[76px] text-[#272322] leading-[0.98] tracking-tight">
            Fresh Every Morning.<br/>
            <span className="italic text-[#9A5C3B]">Served Every Evening.</span>
          </h2>
        </div>

        {/* Layer 2: 100% Photo-Free Cartoon/Vector JS & CSS Animated Canvas Container */}
        <div className="relative w-full max-w-[900px] mx-auto z-10">
          
          <div className="overflow-hidden bg-[#FAF7F2] relative shadow-[0_20px_50px_rgba(154,92,59,0.15)] rounded-2xl w-full h-[52vh] md:h-[65vh] border-2 border-[#9A5C3B]/30 transform-gpu flex flex-col justify-between p-6 sm:p-8">
            
            {/* Top Warm Metallic Brass Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#9A5C3B] to-transparent z-40" />

            {/* Top Stage Indicator Pills */}
            <div className="w-full z-40 flex items-center justify-between pointer-events-none">
              <div className="bg-[#EFE8DB] px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest text-[#8F1115] border border-[#9A5C3B]/30 uppercase font-extrabold shadow-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#164C2B] animate-pulse" />
                <span>CARTOON CULINARY ANIMATION</span>
              </div>

              <div className="flex items-center gap-2 bg-[#EFE8DB] px-3.5 py-1 rounded-full border border-[#9A5C3B]/20">
                {[0, 1, 2, 3].map((idx) => (
                  <span
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      activeStep === idx
                        ? "w-7 bg-[#8F1115]"
                        : "w-2 bg-[#9A5C3B]/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* ── CARTOON VECTOR ANIMATION STAGES (NO PHOTOS) ── */}
            <div className="relative w-full flex-1 flex items-center justify-center my-4">
              <AnimatePresence mode="wait">
                
                {/* ── CARTOON SCENE 0: FRESH HARVEST ── */}
                {activeStep === 0 && (
                  <motion.div
                    key="cartoon0"
                    initial={{ opacity: 0, scale: 0.85, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
                    className="relative flex flex-col items-center justify-center"
                  >
                    {/* Woven Basket SVG & Bouncing Veggies */}
                    <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
                      
                      {/* Floating Vegetable Vectors */}
                      <motion.div
                        animate={{ y: [-15, 0, -15], rotate: [-10, 10, -10] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="absolute -top-4 left-6 z-20"
                      >
                        {/* Tomato Cartoon Vector */}
                        <svg width="54" height="54" viewBox="0 0 100 100">
                          <circle cx="50" cy="55" r="40" fill="#E53935" stroke="#B71C1C" strokeWidth="4" />
                          <path d="M50 15 C45 25, 30 25, 30 25 M50 15 C55 25, 70 25, 70 25 M50 15 L50 30" stroke="#2E7D32" strokeWidth="6" strokeLinecap="round" />
                          <circle cx="35" cy="45" r="5" fill="#FFEBEE" opacity="0.6" />
                        </svg>
                      </motion.div>

                      <motion.div
                        animate={{ y: [0, -18, 0], rotate: [12, -8, 12] }}
                        transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}
                        className="absolute -top-2 right-4 z-20"
                      >
                        {/* Capsicum Cartoon Vector */}
                        <svg width="50" height="50" viewBox="0 0 100 100">
                          <path d="M25 35 C25 20, 75 20, 75 35 C85 50, 80 85, 50 85 C20 85, 15 50, 25 35 Z" fill="#4CAF50" stroke="#1B5E20" strokeWidth="4" />
                          <path d="M50 15 L50 25" stroke="#1B5E20" strokeWidth="6" strokeLinecap="round" />
                          <path d="M40 35 C40 60, 45 75, 50 75" stroke="#388E3C" strokeWidth="3" fill="none" />
                        </svg>
                      </motion.div>

                      <motion.div
                        animate={{ y: [-10, 10, -10], rotate: [5, -15, 5] }}
                        transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                        className="absolute bottom-10 -left-6 z-20"
                      >
                        {/* Chilli Cartoon Vector */}
                        <svg width="46" height="46" viewBox="0 0 100 100">
                          <path d="M80 20 C60 30, 20 50, 20 80 C20 85, 25 90, 30 85 C50 60, 75 40, 85 25 Z" fill="#D32F2F" stroke="#8E0000" strokeWidth="4" />
                          <path d="M80 20 L90 10" stroke="#2E7D32" strokeWidth="5" strokeLinecap="round" />
                        </svg>
                      </motion.div>

                      {/* Cartoon Woven Basket Vector */}
                      <svg width="180" height="120" viewBox="0 0 200 140" className="mt-12">
                        <path d="M20 30 L180 30 L160 120 L40 120 Z" fill="#D7CCC8" stroke="#5D4037" strokeWidth="6" />
                        <path d="M20 30 Q100 50 180 30" fill="none" stroke="#5D4037" strokeWidth="6" />
                        {/* Basket Texture lines */}
                        <path d="M50 30 L60 120 M90 30 L95 120 M130 30 L130 120 M160 30 L150 120" stroke="#8D6E63" strokeWidth="3" strokeDasharray="6 6" />
                      </svg>
                    </div>

                    {/* Cartoon Stage Label */}
                    <div className="mt-2 text-center">
                      <span className="font-mono text-[10px] text-[#8F1115] font-extrabold uppercase tracking-[0.25em] bg-[#EFE8DB] px-3 py-1 rounded-full border border-[#9A5C3B]/30">
                        STEP 01 · FRESH HARVEST
                      </span>
                      <h3 className="font-heading text-2xl sm:text-3xl text-[#272322] mt-2">
                        Fresh Ingredients
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#272322]/70 mt-0.5">
                        Handpicked every morning at dawn.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ── CARTOON SCENE 1: CHEF PREPARATION ── */}
                {activeStep === 1 && (
                  <motion.div
                    key="cartoon1"
                    initial={{ opacity: 0, scale: 0.85, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
                    className="relative flex flex-col items-center justify-center"
                  >
                    <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
                      
                      {/* Cartoon Wooden Cutting Board */}
                      <svg width="200" height="130" viewBox="0 0 200 130">
                        <rect x="20" y="20" width="160" height="90" rx="15" fill="#BCAAA4" stroke="#4E342E" strokeWidth="5" />
                        <rect x="30" y="30" width="140" height="70" rx="10" fill="#D7CCC8" />
                        {/* Handle */}
                        <rect x="5" y="50" width="20" height="30" rx="5" fill="#BCAAA4" stroke="#4E342E" strokeWidth="4" />
                      </svg>

                      {/* Animated Cartoon Chef Knife Slicing */}
                      <motion.div
                        animate={{ rotate: [-20, 10, -20], y: [-10, 15, -10] }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                        className="absolute -top-4 right-8 z-30"
                      >
                        <svg width="90" height="60" viewBox="0 0 100 60">
                          {/* Blade */}
                          <path d="M10 40 Q50 10 90 20 L90 40 Z" fill="#ECEFF1" stroke="#37474F" strokeWidth="4" />
                          {/* Handle */}
                          <rect x="0" y="32" width="25" height="14" rx="4" fill="#37474F" />
                        </svg>
                      </motion.div>

                      {/* Cartoon Chopped Herbs Sprinkles */}
                      <motion.div
                        animate={{ y: [0, 25, 0], opacity: [1, 0.4, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                        className="absolute z-20 flex gap-2"
                      >
                        <span className="text-xl">🌿</span>
                        <span className="text-xl">🍃</span>
                        <span className="text-xl">🌿</span>
                      </motion.div>
                    </div>

                    {/* Cartoon Stage Label */}
                    <div className="mt-2 text-center">
                      <span className="font-mono text-[10px] text-[#8F1115] font-extrabold uppercase tracking-[0.25em] bg-[#EFE8DB] px-3 py-1 rounded-full border border-[#9A5C3B]/30">
                        STEP 02 · KITCHEN PREPARATION
                      </span>
                      <h3 className="font-heading text-2xl sm:text-3xl text-[#272322] mt-2">
                        Prepared with Care
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#272322]/70 mt-0.5">
                        Sliced, chopped & hand-ground daily.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ── CARTOON SCENE 2: TANDOOR COOKING ── */}
                {activeStep === 2 && (
                  <motion.div
                    key="cartoon2"
                    initial={{ opacity: 0, scale: 0.85, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
                    className="relative flex flex-col items-center justify-center"
                  >
                    <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
                      
                      {/* Animated Cartoon Steam Lines */}
                      <motion.div
                        animate={{ y: [-10, -35, -10], opacity: [0.2, 0.9, 0.2] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="absolute -top-8 z-30 flex gap-4 text-2xl"
                      >
                        <span>♨️</span>
                        <span>♨️</span>
                        <span>♨️</span>
                      </motion.div>

                      {/* Cartoon Cooking Handi Pot */}
                      <svg width="170" height="130" viewBox="0 0 180 140" className="z-20">
                        {/* Pot Body */}
                        <path d="M30 40 C20 70, 20 110, 90 120 C160 110, 160 70, 150 40 Z" fill="#B98532" stroke="#5D4037" strokeWidth="5" />
                        {/* Rim */}
                        <ellipse cx="90" cy="40" rx="65" ry="12" fill="#D4AF37" stroke="#5D4037" strokeWidth="4" />
                        {/* Handles */}
                        <circle cx="20" cy="60" r="10" fill="none" stroke="#5D4037" strokeWidth="4" />
                        <circle cx="160" cy="60" r="10" fill="none" stroke="#5D4037" strokeWidth="4" />
                      </svg>

                      {/* Animated Cartoon Flames underneath */}
                      <motion.div
                        animate={{ scaleY: [0.85, 1.15, 0.85] }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                        className="absolute bottom-2 z-10 flex gap-2 text-3xl"
                      >
                        <span>🔥</span>
                        <span>🔥</span>
                        <span>🔥</span>
                      </motion.div>
                    </div>

                    {/* Cartoon Stage Label */}
                    <div className="mt-2 text-center">
                      <span className="font-mono text-[10px] text-[#8F1115] font-extrabold uppercase tracking-[0.25em] bg-[#EFE8DB] px-3 py-1 rounded-full border border-[#9A5C3B]/30">
                        STEP 03 · TANDOORI EMBERS
                      </span>
                      <h3 className="font-heading text-2xl sm:text-3xl text-[#272322] mt-2">
                        Cooked Fresh
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#272322]/70 mt-0.5">
                        Simmered slow over authentic clay flames.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ── CARTOON SCENE 3: SERVED FRESH ── */}
                {activeStep === 3 && (
                  <motion.div
                    key="cartoon3"
                    initial={{ opacity: 0, scale: 0.85, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
                    className="relative flex flex-col items-center justify-center"
                  >
                    <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
                      
                      {/* Animated Sparkles */}
                      <motion.div
                        animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, 90, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="absolute -top-4 right-4 z-30 text-3xl"
                      >
                        ✨
                      </motion.div>

                      {/* Cartoon Royal Thali Plate Vector */}
                      <svg width="190" height="130" viewBox="0 0 200 140" className="z-20">
                        {/* Brass Thali Base */}
                        <ellipse cx="100" cy="80" rx="90" ry="45" fill="#D4AF37" stroke="#5D4037" strokeWidth="5" />
                        <ellipse cx="100" cy="80" rx="78" ry="38" fill="#FFF8E1" stroke="#B98532" strokeWidth="3" />

                        {/* Cartoon Katori Bowls on Thali */}
                        <ellipse cx="60" cy="65" rx="22" ry="12" fill="#E53935" stroke="#5D4037" strokeWidth="3" />
                        <ellipse cx="100" cy="60" rx="22" ry="12" fill="#4CAF50" stroke="#5D4037" strokeWidth="3" />
                        <ellipse cx="140" cy="65" rx="22" ry="12" fill="#FFB300" stroke="#5D4037" strokeWidth="3" />
                        {/* Naan Bread */}
                        <ellipse cx="100" cy="92" rx="35" ry="16" fill="#FFE082" stroke="#8D6E63" strokeWidth="3" />
                      </svg>

                      {/* Animated Steam */}
                      <motion.div
                        animate={{ y: [-5, -25, -5], opacity: [0.3, 0.9, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                        className="absolute top-2 z-30 text-2xl"
                      >
                        ♨️
                      </motion.div>
                    </div>

                    {/* Cartoon Stage Label */}
                    <div className="mt-2 text-center">
                      <span className="font-mono text-[10px] text-[#164C2B] font-extrabold uppercase tracking-[0.25em] bg-[#EFE8DB] px-3 py-1 rounded-full border border-[#164C2B]/30">
                        STEP 04 · SERVED FRESH
                      </span>
                      <h3 className="font-heading text-2xl sm:text-3xl text-[#272322] mt-2">
                        Served Every Morning
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#272322]/70 mt-0.5">
                        Plated hot & fresh directly to your table.
                      </p>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Bottom Step Control Buttons */}
            <div className="w-full z-40 flex items-center justify-center gap-2 pt-2 border-t border-[#9A5C3B]/20">
              {[
                { num: "01", name: "HARVEST" },
                { num: "02", name: "PREPARATION" },
                { num: "03", name: "COOKING" },
                { num: "04", name: "SERVED" },
              ].map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[10px] tracking-wider transition-all border ${
                    activeStep === idx
                      ? "bg-[#8F1115] text-[#F8F5EF] border-[#8F1115] font-bold shadow-md"
                      : "bg-[#EFE8DB]/60 text-[#272322]/70 border-[#9A5C3B]/20 hover:bg-[#EFE8DB]"
                  }`}
                >
                  {btn.num} {btn.name}
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
