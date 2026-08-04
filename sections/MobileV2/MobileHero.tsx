"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MobileHero() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[65dvh] min-h-[480px] bg-[#F8F6F1] flex flex-col justify-end overflow-hidden rounded-b-[20px] shadow-lg"
    >
      {/* Background Cinematic Image with Scroll Zoom */}
      <motion.div 
        style={{ scale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="/editorial-table-feast.png" 
          alt="Maurya Feast" 
          className="w-full h-full object-cover object-center"
        />
        {/* Editorial Gradient Overlay (Rich Wine & Charcoal) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1414]/95 via-[#1C1414]/40 to-[#1C1414]/10" />
      </motion.div>

      {/* Overlay Content */}
      <div className="relative z-10 px-6 pb-10 w-full flex flex-col items-start">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mb-7"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#B98532] mb-3 block opacity-90">
            MAURYA
          </span>
          <h1 className="font-heading text-[52px] leading-[0.92] text-[#F8F6F1] tracking-tight">
            Every Table<br />
            <span className="italic text-[#B98532] font-serif">Has A Story.</span>
          </h1>
        </motion.div>

        {/* Action Buttons (One filled, one text link) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center gap-6"
        >
          <Link 
            href="/visit#reserve"
            className="flex items-center gap-2 bg-[#F8F6F1] text-[#6D2323] px-6 py-3.5 rounded-full font-sans text-[11px] font-extrabold uppercase tracking-[0.15em] transition-transform active:scale-95 shadow-md"
          >
            Reserve Table <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
          
          <Link
            href="/menu"
            className="font-sans text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#F8F6F1] border-b border-[#B98532]/60 pb-0.5 hover:border-[#B98532] transition-colors"
          >
            Explore Menu
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
