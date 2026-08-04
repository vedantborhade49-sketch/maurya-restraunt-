"use client";

import React, { useRef } from "react";
import { motion, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import SteamMotif from "@/components/SteamMotif";

export default function InvitationSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Parallax / cursor tilt values for interactive micro-interactions
  const rotateX = useSpring(0, { stiffness: 100, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 100, damping: 20 });
  
  // Spotlight follow using Motion Values for high-performance updates
  const lightX = useMotionValue(50);
  const lightY = useMotionValue(50);
  const lightXSpring = useSpring(lightX, { stiffness: 120, damping: 25 });
  const lightYSpring = useSpring(lightY, { stiffness: 120, damping: 25 });



  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    lightX.set(x);
    lightY.set(y);

    // Convert to minor rotation degrees (-4 to 4)
    rotateX.set(((e.clientY - rect.top) / rect.height - 0.5) * 10);
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * -10);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    lightX.set(50);
    lightY.set(50);
  };

  // Define spotlight radial gradient using Framer Motion template
  const spotlightBg = useMotionTemplate`radial-gradient(circle 380px at ${lightXSpring}% ${lightYSpring}%, rgba(185, 133, 50, 0.22) 0%, transparent 100%)`;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full bg-[#F8F6F1] text-[#350709] overflow-hidden py-12 md:py-36 border-b border-[#B98532]/25 select-none"
      style={{
        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjAwIDIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSdub2lzZSc+PGZlVHVyYnVsZW5jZSB0eXBlPSdmcmFjdGFsTm9pc2UnIGJhc2VGcmVxdWVuY3k9JzAuNjUnIG51bU9jdGF2ZXM9JzMnIHN0aXRjaFRpbGVzPSdzdGl0Y2gnLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWx0ZXI9J3VybCgjbm9pc2UpJyBvcGFjaXR5PScwLjAzJy8+PC9zdmc+")`,
      }}
    >
      {/* 1. Subtle Radial Ambient Lighting Catch (Subconscious highlight follow) */}
      <motion.div
        className="pointer-events-none absolute inset-0 mix-blend-color-burn opacity-35 z-0"
        style={{ background: spotlightBg }}
      />

      {/* 2. Hidden Pencil Recipe Sketch - Spotlight revealed */}
      <div className="absolute left-[8%] top-[12%] opacity-15 pointer-events-none z-0 text-[#350709]/75 select-none hidden lg:block">
        <svg width="110" height="110" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M20 50 C20 80, 80 80, 80 50 Z" />
          <path d="M30 48 L70 48" />
          <path d="M58 48 L72 24" strokeWidth="1.3" />
          <circle cx="50" cy="62" r="2.5" />
          <circle cx="42" cy="58" r="1.5" />
          <circle cx="58" cy="65" r="1.8" />
        </svg>
        <span className="block font-instrument italic text-[11px] leading-tight text-[#8F1115]/80 mt-1">
          Traditional spice mortar
        </span>
        <span className="block font-mono text-[7px] uppercase tracking-wider opacity-60">
          Cardamom, Clove, Cinnamon
        </span>
      </div>

      {/* 3. Floating Interactive Spices */}
      <div className="absolute inset-0 overflow-visible pointer-events-none z-0 hidden lg:block">
        {/* Floating Cardamom Pod */}
        <motion.div
          className="absolute left-[3%] bottom-[15%] opacity-35 text-[#B98532]"
          animate={{
            x: lightX.get() * 0.15,
            y: [lightY.get() * 0.15, (lightY.get() * 0.15) - 10, lightY.get() * 0.15],
            rotate: [15, 20, 15],
          }}
          transition={{
            y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" }
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <ellipse cx="12" cy="12" rx="6" ry="10" />
            <path d="M12 2v20M8 8c2 2 6 2 8 0" />
          </svg>
        </motion.div>

        {/* Floating Mint Leaf */}
        <motion.div
          className="absolute right-[4%] top-[25%] opacity-30 text-[#8F1115]"
          animate={{
            x: -lightX.get() * 0.12,
            y: [lightY.get() * 0.12, (lightY.get() * 0.12) + 12, lightY.get() * 0.12],
            rotate: [-8, -12, -8],
          }}
          transition={{
            y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M12 22C12 22 4 17 4 12C4 7 12 2 12 2C12 2 20 7 20 12C20 17 12 22 12 22Z" />
            <path d="M12 2v20M4 12h16" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* PHASE 3 — Chapter Label */}
        <div className="mb-6 md:mb-12 flex flex-col items-center md:items-start">
          <span className="font-sans text-[10px] tracking-[0.35em] text-[#8F1115] font-bold uppercase mb-1.5">
            CHAPTER 01 / THE LIVING TABLE
          </span>
          <div className="w-16 h-[1.5px] bg-[#B98532]/50" />
        </div>

        {/* PHASE 2 — Asymmetrical Grid Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-center">
          
          {/* Left Column: Typography Statement & Paragraph */}
          <div className="lg:col-span-5 space-y-5 md:space-y-8 flex flex-col justify-center text-center md:text-left">
            {/* PHASE 4 & 7 — Typography Hierarchy & Overlapping */}
            <div className="relative inline-block text-left w-full">
              <h2 className="font-heading text-3xl sm:text-6xl md:text-8xl tracking-tight leading-[0.92] text-[#350709] font-bold uppercase">
                TABLES<br />
                WERE NEVER<br />
                <span className="inline-flex flex-wrap items-baseline gap-x-2 sm:gap-x-3 md:gap-x-5">
                  <span>MADE FOR</span>
                  <span className="font-instrument italic text-4xl sm:text-7xl md:text-9xl text-[#8F1115] font-normal normal-case select-none flex translate-y-1 md:translate-y-2 tracking-normal">
                    {"Silence.".split("").map((char, idx) => (
                      <motion.span
                        key={idx}
                        whileHover={{ y: -8, color: "#B98532" }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                </span>
              </h2>
            </div>

            {/* PHASE 5 — Editorial Paragraph (60-80 words) */}
            <p className="font-sans text-[14px] sm:text-[17px] md:text-[18px] leading-[1.6] text-[#350709]/80 font-light pt-3 md:pt-8 max-w-[460px] mx-auto md:mx-0">
              At Maurya, every table carries a story. Some celebrate milestones, some reconnect old friends, and some simply bring families together over a warm meal. Long after the food is finished, those moments remain.
            </p>

            {/* PHASE 13 — Call To Experience */}
            <div className="pt-3 md:pt-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 font-sans text-xs font-bold uppercase tracking-[0.2em] justify-center md:justify-start">
              <Link
                href="/visit#reserve"
                className="group flex items-center gap-2 text-[#8F1115] hover:text-[#B98532] transition-colors"
              >
                <span>Reserve A Table</span>
                <span className="text-[10px] transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <div className="hidden sm:block w-4 h-[1px] bg-[#B98532]/50" />
              <Link
                href="/menu"
                className="group flex items-center gap-2 text-[#350709]/70 hover:text-[#350709] transition-colors"
              >
                <span>Explore Today's Menu</span>
                <span className="text-[10px] transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Layered Scrapbook Composition with Mobile Scroll Entrance & Touch Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.93, y: 25 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex justify-center relative py-4 md:py-12 w-full"
          >
            <motion.div
              style={{ rotateX, rotateY }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full max-w-[600px] aspect-[4/3] sm:aspect-auto sm:h-[550px] transform-gpu"
            >
              {/* Material: Walnut wood/Paper base backboard layer */}
              <div 
                className="absolute inset-0 bg-[#F4EFE6] border border-[#B98532]/35 shadow-xl rounded-xl sm:rounded-sm p-2 sm:p-4 overflow-hidden"
                style={{
                  backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjAwIDIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSdub2lzZSc+PGZlVHVyYnVsZW5jZSB0eXBlPSdmcmFjdGFsTm9pc2UnIGJhc2VGcmVxdWVuY3k9JzAuNjUnIG51bU9jdGF2ZXM9JzMnIHN0aXRjaFRpbGVzPSdzdGl0Y2gnLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWx0ZXI9J3VybCgjbm9pc2UpJyBvcGFjaXR5PScwLjA0Jy8+PC9zdmc+")`,
                }}
              >
                {/* Large Dining Image (Original home.png Centerpiece at Full 100% Opacity) */}
                <div className="relative w-full h-full rounded-lg sm:rounded-sm overflow-hidden group">
                  <img
                    src="/home.png"
                    alt="Maurya Pure Veg Dining Atmosphere"
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-all duration-[6s] ease-out"
                  />
                  
                  {/* Floating Photo Tag */}
                  <div className="absolute top-2.5 left-2.5 bg-[#350709]/90 backdrop-blur-md px-2.5 py-1 rounded text-[8.5px] font-mono tracking-widest text-[#F8F5EF] border border-[#B98532]/40 uppercase font-extrabold shadow-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#164C2B] animate-pulse" />
                    <span>MAIN DINING HALL</span>
                  </div>

                  {/* Subtle Steam Rising Overlay */}
                  <SteamMotif className="absolute inset-0 w-full h-full mix-blend-screen opacity-15 pointer-events-none" />
                </div>
              </div>



              {/* Chef Signature Overlay */}
              <div className="absolute right-4 bottom-[-15px] z-30 pointer-events-none">
                <svg viewBox="0 0 200 60" className="w-32 h-auto text-[#B98532] opacity-80">
                  <path d="M10,40 Q30,10 50,40 T90,40 T130,20 T170,30" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M40,25 Q80,55 120,25" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <text x="35" y="52" className="font-serif italic text-[11px] fill-[#350709]/60 select-none">Maurya Chef</text>
                </svg>
              </div>

            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
