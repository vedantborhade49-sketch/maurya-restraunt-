"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MobileHero() {
  return (
    <section className="relative w-full h-[100dvh] bg-[#1F1F1F] flex flex-col pt-[88px] pb-6 px-5 overflow-hidden">
      {/* 1. Logo (Hindi) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center mb-6 shrink-0"
      >
        <img src="/morya-logo.png" alt="Maurya" className="h-12 w-auto object-contain brightness-0 invert" />
      </motion.div>

      {/* 2. Hero Video (Fixed cropping, no overlapping) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative w-full flex-1 min-h-[250px] rounded-[24px] overflow-hidden mb-8 border border-[#B98532]/20 shadow-lg shrink-0"
      >
        <video
          src="/morya-hero.mp4"
          playsInline
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* 3. Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col items-center text-center shrink-0 mb-8"
      >
        <h1 className="font-heading text-[52px] leading-[1] text-[#F8F6F1] max-w-[300px]">
          Every Table<br />
          <span className="italic text-[#B98532]">Has A Story.</span>
        </h1>
      </motion.div>

      {/* 4. Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col gap-4 w-full shrink-0 mb-6"
      >
        <Link 
          href="/visit#reserve" 
          className="w-full h-[56px] bg-[#6D2323] text-[#F8F6F1] rounded-full flex items-center justify-center font-sans text-[16px] font-bold shadow-md active:scale-[0.98] transition-transform"
        >
          Reserve A Table
        </Link>
        <Link 
          href="/menu" 
          className="w-full h-[56px] bg-transparent border border-[#B98532]/40 text-[#F8F6F1] rounded-full flex items-center justify-center font-sans text-[16px] font-bold active:scale-[0.98] transition-transform"
        >
          Explore Menu
        </Link>
      </motion.div>

      {/* 5. Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="flex justify-center shrink-0"
      >
        <div className="w-px h-10 bg-gradient-to-b from-[#B98532]/50 to-transparent" />
      </motion.div>
    </section>
  );
}
