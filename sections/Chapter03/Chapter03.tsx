"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SteamMotif from "@/components/SteamMotif";
import { MarginNote } from "@/components/MicroArtifacts";

const STAGES = [
  {
    step: "01",
    label: "FRESH INGREDIENTS",
    title: "Handpicked Every Morning",
    desc: "Whole spices, farm tomatoes, and fresh mint gathered at sunrise.",
    badge: "FARMFRESH 6:00 AM",
    image: "/editorial-spices.png",
    accentColor: "#9A5C3B",
  },
  {
    step: "02",
    label: "PREPARED WITH CARE",
    title: "Artisanal Kitchen Craft",
    desc: "Hand-ground spices & fresh dough kneaded with traditional care.",
    badge: "HAND-GROUND DAILY",
    image: "/cooking.jpeg",
    accentColor: "#8F1115",
  },
  {
    step: "03",
    label: "COOKED FRESH",
    title: "Slow-Cooked Over Embers",
    desc: "Simmered in copper degs over slow-burning clay-tandoor embers.",
    badge: "AUTHENTIC EMBERS",
    image: "/inside1.jpeg",
    accentColor: "#B98532",
  },
  {
    step: "04",
    label: "SERVED EVERY MORNING",
    title: "Served Hot to Your Table",
    desc: "Plated fresh with hot steam and uncompromised vegetarian purity.",
    badge: "READY TO SERVE",
    image: "/inside3.png",
    accentColor: "#164C2B",
  },
];

export default function Chapter03() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // Smooth pinned scroll progression through the 4 culinary scenes
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
        
        {/* Layer 1: Editorial Typography (Preserved 100% identically) */}
        <div className="content-grid w-full text-center max-w-[900px] mx-auto">
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#9A5C3B] font-bold mb-3 block">
            02 &nbsp;·&nbsp; THE CRAFT & THE TABLE
          </span>
          <h2 className="font-heading text-[40px] sm:text-[60px] md:text-[76px] text-[#272322] leading-[0.98] tracking-tight">
            Fresh Every Morning.<br/>
            <span className="italic text-[#9A5C3B]">Served Every Evening.</span>
          </h2>
        </div>

        {/* Layer 2: Warm Parchment Animated Culinary Experience Container */}
        <div className="relative w-full max-w-[900px] mx-auto z-10">
          
          <div className="overflow-hidden bg-[#FAF7F2] relative shadow-[0_20px_50px_rgba(154,92,59,0.15)] rounded-2xl w-full h-[52vh] md:h-[65vh] border-2 border-[#9A5C3B]/30 transform-gpu">
            
            {/* Top Warm Metallic Brass Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#9A5C3B] to-transparent z-40" />

            {/* Top Stage Navigation Indicator Pills */}
            <div className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
              <div className="bg-[#FAF7F2]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest text-[#9A5C3B] border border-[#9A5C3B]/30 uppercase font-extrabold shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8F1115] animate-pulse" />
                <span>MAURYA CULINARY JOURNEY</span>
              </div>

              <div className="flex items-center gap-1.5 bg-[#EFE8DB]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#9A5C3B]/20">
                {STAGES.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      activeStep === idx
                        ? "w-6 bg-[#8F1115]"
                        : "w-1.5 bg-[#9A5C3B]/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* ── SMOOTH SCENE TRANSITIONS ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Visual Imagery with Warm Tint */}
                <img
                  src={STAGES[activeStep].image}
                  alt={STAGES[activeStep].title}
                  className="w-full h-full object-cover transition-transform duration-[9s] ease-out scale-105"
                />

                {/* Warm Parchment Vignette Gradient for Seamless Background Matching */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#350709]/85 via-[#350709]/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/40 via-transparent to-transparent mix-blend-soft-light" />
              </motion.div>
            </AnimatePresence>

            {/* Dynamic Rising Steam for Cooking Scenes */}
            {(activeStep === 2 || activeStep === 3) && (
              <SteamMotif className="opacity-30 mix-blend-screen pointer-events-none z-20" />
            )}

            {/* ── ELEGANT ON-SCREEN SCENE BADGE OVERLAYS ── */}
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 z-30 pointer-events-none flex flex-col items-start">
              <motion.div
                key={`badge-${activeStep}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col items-start max-w-xl"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2]/90 border border-[#9A5C3B]/40 text-[#8F1115] font-mono text-[9px] uppercase tracking-[0.25em] font-extrabold mb-2 shadow-md backdrop-blur-md">
                  <span>STAGE {STAGES[activeStep].step}</span>
                  <span>•</span>
                  <span>{STAGES[activeStep].label}</span>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl text-[#F8F5EF] drop-shadow-md">
                  {STAGES[activeStep].title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#F8F5EF]/90 mt-1 font-light tracking-wide drop-shadow">
                  {STAGES[activeStep].desc}
                </p>
              </motion.div>
            </div>

            {/* Minimal Editorial Corner Note */}
            <MarginNote
              text="Sanctuary Culinary Craft"
              className="absolute top-5 left-5 text-[#FAF7F2]/80 z-20 font-mono text-[9px]"
              rotate="0deg"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
