"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MobileEditorial() {
  return (
    <section className="relative w-full bg-[#F8F6F1] flex flex-col items-center pt-20 pb-20 px-6 text-[#1F1F1F] overflow-hidden">
      {/* 1. Large Editorial Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[360px] aspect-[4/5] rounded-[24px] overflow-hidden mb-10 shadow-lg border border-[#B98532]/20 relative"
      >
        <img src="/home.png" alt="Maurya Editorial" className="w-full h-full object-cover" />
      </motion.div>

      {/* 2. Heading */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-4"
      >
        <h2 className="font-serif italic text-[32px] leading-[1.15] text-[#1F1F1F] max-w-[280px] mx-auto">
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
        className="font-sans text-[16px] leading-[1.6] text-center text-[#1F1F1F]/80 max-w-[300px] mb-10"
      >
        Every meal begins with fresh ingredients, warm hospitality and ends with another beautiful memory.
      </motion.p>

      {/* 4. Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full flex flex-col gap-3 max-w-[320px]"
      >
        <button 
          onClick={() => {
            const { useTableStore } = require("@/stores/table-store");
            useTableStore.getState().setIsOpen(true);
          }}
          className="w-full h-[52px] bg-[#6D2323] text-[#F8F6F1] rounded-full flex items-center justify-center font-sans text-[14px] font-bold tracking-wider uppercase shadow-md active:scale-[0.98] transition-transform"
        >
          Order Online
        </button>
        <button 
          onClick={() => {
            const el = document.getElementById("menu");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="w-full h-[52px] bg-transparent border border-[#B98532]/40 text-[#1F1F1F] rounded-full flex items-center justify-center font-sans text-[14px] font-bold tracking-wider uppercase active:scale-[0.98] transition-transform"
        >
          Explore Menu
        </button>
      </motion.div>
    </section>
  );
}
