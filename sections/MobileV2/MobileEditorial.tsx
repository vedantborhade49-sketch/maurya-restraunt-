"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MobileEditorial() {
  return (
    <section className="relative w-full bg-[#F8F6F1] flex flex-col items-center pt-24 pb-16 px-5 text-[#1F1F1F] overflow-hidden">
      {/* 1. Large Editorial Image (90% width, rounded 24px) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-[90%] aspect-[4/5] rounded-[24px] overflow-hidden mb-12 shadow-xl border border-[#B98532]/20"
      >
        <img src="/home.png" alt="Maurya Editorial" className="w-full h-full object-cover" />
      </motion.div>

      {/* 2. Heading */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6"
      >
        <h2 className="font-serif italic text-[36px] leading-[1.1] text-[#1F1F1F] max-w-[280px] mx-auto">
          Every Table<br />
          <span className="text-[#6D2323]">Has A Story.</span>
        </h2>
      </motion.div>

      {/* 3. Small Copy */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-sans text-[18px] leading-[1.6] text-center text-[#1F1F1F]/80 max-w-[320px] mb-12"
      >
        Every meal begins with fresh ingredients, warm hospitality and ends with another beautiful memory.
      </motion.p>

      {/* 4. Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full flex flex-col gap-4 max-w-[340px]"
      >
        <Link 
          href="/visit#reserve" 
          className="w-full h-[56px] bg-[#6D2323] text-[#F8F6F1] rounded-full flex items-center justify-center font-sans text-[16px] font-bold shadow-md active:scale-[0.98] transition-transform"
        >
          Reserve A Table
        </Link>
        <Link 
          href="/menu" 
          className="w-full h-[56px] bg-transparent border border-[#B98532]/40 text-[#1F1F1F] rounded-full flex items-center justify-center font-sans text-[16px] font-bold active:scale-[0.98] transition-transform"
        >
          Explore Menu
        </Link>
      </motion.div>
    </section>
  );
}
