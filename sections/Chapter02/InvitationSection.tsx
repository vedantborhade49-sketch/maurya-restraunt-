"use client";

import React, { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import Link from "next/link";
import SteamMotif from "@/components/SteamMotif";

export default function InvitationSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Parallax / cursor tilt values for interactive micro-interactions
  const rotateX = useSpring(0, { stiffness: 100, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 100, damping: 20 });
  const lightX = useSpring(50, { stiffness: 120, damping: 25 });
  const lightY = useSpring(50, { stiffness: 120, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Convert to minor rotation degrees (-4 to 4)
    rotateX.set((y - 0.5) * 8);
    rotateY.set((x - 0.5) * -8);

    // Light highlights position (0% to 100%)
    lightX.set(x * 100);
    lightY.set(y * 100);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    lightX.set(50);
    lightY.set(50);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full bg-[#F8F6F1] text-[#350709] overflow-hidden py-24 md:py-36 border-b border-[#B98532]/25 select-none"
      style={{
        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjAwIDIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSdub2lzZSc+PGZlVHVyYnVsZW5jZSB0eXBlPSdmcmFjdGFsTm9pc2UnIGJhc2VGcmVxdWVuY3k9JzAuNjUnIG51bU9jdGF2ZXM9JzMnIHN0aXRjaFRpbGVzPSdzdGl0Y2gnLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWx0ZXI9J3VybCgjbm9pc2UpJyBvcGFjaXR5PScwLjAzJy8+PC9zdmc+")`,
      }}
    >
      {/* 1. Subtle Radial Ambient Lighting Catch (Subconscious highlight) */}
      <motion.div
        className="pointer-events-none absolute inset-0 mix-blend-color-burn opacity-25 z-0"
        style={{
          background: `radial-gradient(circle 350px at var(--light-x, 50%) var(--light-y, 50%), rgba(185, 133, 50, 0.15) 0%, transparent 100%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* PHASE 3 — Chapter Label */}
        <div className="mb-12 flex flex-col items-center md:items-start">
          <span className="font-sans text-[10px] tracking-[0.35em] text-[#8F1115] font-bold uppercase mb-1.5">
            CHAPTER 01 / THE LIVING TABLE
          </span>
          <div className="w-16 h-[1.5px] bg-[#B98532]/50" />
        </div>

        {/* PHASE 2 — Asymmetrical Grid Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Typography Statement & Paragraph */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-center text-center md:text-left">
            {/* PHASE 4 & 7 — Typography Hierarchy & Overlapping */}
            <div className="relative inline-block">
              <h2 className="font-heading text-6xl md:text-8xl tracking-tight leading-[0.88] text-[#350709] font-bold uppercase">
                TABLES<br />
                WERE NEVER<br />
                MADE FOR
              </h2>
              {/* Accent Word overlapping */}
              <span className="absolute -bottom-6 right-4 sm:right-16 md:right-auto md:left-24 font-instrument italic text-7xl md:text-9xl text-[#8F1115] z-20 font-normal select-none">
                Silence.
              </span>
            </div>

            {/* PHASE 5 — Editorial Paragraph (60-80 words) */}
            <p className="font-sans text-[15px] sm:text-[17px] md:text-[18px] leading-[1.65] text-[#350709]/80 font-light pt-8 max-w-[460px] mx-auto md:mx-0">
              At Maurya, every table carries a story. Some celebrate milestones, some reconnect old friends, and some simply bring families together over a warm meal. Long after the food is finished, those moments remain.
            </p>

            {/* PHASE 13 — Call To Experience */}
            <div className="pt-6 flex flex-col sm:flex-row items-center gap-6 font-sans text-xs font-bold uppercase tracking-[0.2em] justify-center md:justify-start">
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

          {/* Right Column: Layered Scrapbook Composition */}
          <div className="lg:col-span-7 flex justify-center relative py-12">
            <motion.div
              style={{ rotateX, rotateY }}
              className="relative w-full max-w-[500px] h-[360px] sm:h-[450px] transform-gpu"
            >
              {/* Material: Walnut wood/Paper base backboard layer */}
              <div className="absolute inset-0 bg-[#F4EFE6] border border-[#B98532]/25 shadow-xl rounded-sm p-4 overflow-hidden">
                {/* Large Dining Image (Main Centerpiece) */}
                <div className="relative w-full h-full rounded-sm overflow-hidden group">
                  <img
                    src="/editorial-food-starters.png"
                    alt="Gathered around the table"
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[6s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F8F6F1]/50 to-transparent mix-blend-overlay" />
                  
                  {/* Subtle Steam Rising Overlay */}
                  <SteamMotif className="absolute inset-0 w-full h-full mix-blend-screen opacity-15 pointer-events-none" />
                </div>
              </div>

              {/* Polaroid Snapshot Overlay (Close-up Dish) */}
              <div className="absolute -left-6 sm:-left-12 bottom-6 w-32 sm:w-44 bg-white p-2.5 shadow-2xl border border-black/5 rotate-[-6deg] rounded-sm transform hover:rotate-[2deg] hover:scale-105 transition-all duration-500 z-30">
                <div className="w-full h-24 sm:h-32 overflow-hidden bg-[#F4EFE6]">
                  <img
                    src="/editorial-food-dosa.png"
                    alt="Gourmet Dosa detail"
                    className="w-full h-full object-cover scale-110"
                  />
                </div>
                <div className="pt-2 text-center">
                  <span className="font-serif italic text-[9px] sm:text-[11px] text-[#350709]/60">Crispy Dosa</span>
                </div>
              </div>

              {/* Vintage Restaurant Receipt */}
              <div className="absolute -right-4 sm:-right-8 top-[-20px] w-36 sm:w-44 bg-[#F4EFE6] p-4 shadow-2xl border border-[#B98532]/30 rotate-[6deg] rounded-sm z-20 font-mono text-[9px] text-[#350709]/75 flex flex-col justify-between">
                <div>
                  <div className="text-center font-bold tracking-widest text-[#8F1115] border-b border-dashed border-[#B98532]/35 pb-1">
                    MAURYA VEG
                  </div>
                  <div className="flex justify-between mt-2 text-[8px] opacity-60">
                    <span>TBL 12 / GST 4</span>
                    <span>2026</span>
                  </div>
                  <div className="border-b border-dashed border-[#B98532]/35 my-1.5" />
                  <ul className="space-y-1 text-[8px]">
                    <li className="flex justify-between">
                      <span>1x Cheese Masala Dosa</span>
                      <span>160</span>
                    </li>
                    <li className="flex justify-between">
                      <span>1x Paneer Tikka Masala</span>
                      <span>280</span>
                    </li>
                    <li className="flex justify-between">
                      <span>2x Butter Garlic Naan</span>
                      <span>120</span>
                    </li>
                  </ul>
                  <div className="border-b border-dashed border-[#B98532]/35 my-1.5" />
                  <div className="flex justify-between font-bold text-[#8F1115]">
                    <span>TOTAL</span>
                    <span>INR 560</span>
                  </div>
                </div>
                
                {/* Stamp & Ink Logo */}
                <div className="mt-4 flex justify-between items-center">
                  <svg width="24" height="24" viewBox="0 0 40 40" className="text-[#8F1115] opacity-75">
                    <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="5" y="24" className="text-[7px] font-sans fill-current font-bold tracking-tighter">MAURYA</text>
                  </svg>
                  <span className="text-[7px] italic opacity-50">#01726</span>
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
          </div>

        </div>
      </div>
    </section>
  );
}
