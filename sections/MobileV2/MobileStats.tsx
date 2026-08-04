"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Sparkles, Star, Heart } from "lucide-react";

export default function MobileStats() {
  const stats = [
    {
      num: "35+",
      label: "Years Legacy",
      sub: "Since 1985",
    },
    {
      num: "100%",
      label: "Pure Veg",
      sub: "Satvik Kitchen",
    },
    {
      num: "4.9★",
      label: "Top Rated",
      sub: "3,000+ Reviews",
    },
  ];

  return (
    <section className="relative w-full bg-[#161413] py-10 px-5 overflow-hidden">
      {/* Subtle Gold Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[120px] bg-[#B98532]/10 blur-[50px] rounded-full" />
      </div>

      {/* Luxury Container with Fine Gold Filigree Border */}
      <div className="relative max-w-[420px] mx-auto bg-gradient-to-b from-[#2D0D10] via-[#220709] to-[#1C1414] border border-[#B98532]/35 rounded-[24px] p-5 shadow-[0_15px_35px_rgba(0,0,0,0.5)] backdrop-blur-md">
        
        {/* Top Decorative Label */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-[1px] w-6 bg-gradient-to-r from-transparent to-[#B98532]/60" />
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#B98532] font-bold">
            The Maurya Heritage
          </span>
          <div className="h-[1px] w-6 bg-gradient-to-l from-transparent to-[#B98532]/60" />
        </div>

        {/* 3 Stats Connected Row */}
        <div className="grid grid-cols-3 divide-x divide-[#B98532]/20 py-2">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center px-1.5"
            >
              <span className="font-serif italic text-[28px] sm:text-[30px] text-[#F8F6F1] font-bold tracking-tight leading-none mb-1.5 drop-shadow-sm">
                {stat.num}
              </span>
              <span className="font-sans text-[11px] uppercase tracking-wider text-[#B98532] font-extrabold leading-tight mb-0.5">
                {stat.label}
              </span>
              <span className="font-sans text-[9px] text-[#F8F6F1]/50 leading-tight">
                {stat.sub}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Line */}
        <div className="mt-4 pt-3 border-t border-[#B98532]/15 flex items-center justify-center gap-1.5">
          <Heart className="w-3 h-3 text-[#B98532] fill-[#B98532]" />
          <span className="font-sans text-[10px] text-[#F8F6F1]/70 tracking-wide font-medium">
            Welcoming Pune families for over 3 decades
          </span>
        </div>

      </div>
    </section>
  );
}
