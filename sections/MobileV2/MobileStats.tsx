"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MobileStats() {
  return (
    <section className="relative w-full bg-[#6D2323] flex flex-col items-center py-24 px-5 overflow-hidden">
      <div className="w-full max-w-[340px] flex flex-col gap-6">
        
        {/* Stat 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full bg-[#F8F6F1] border border-[#B98532]/50 rounded-[16px] py-8 flex flex-col items-center justify-center text-center shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        >
          <div className="w-12 h-[1px] bg-[#B98532]/40 mb-4" />
          <span className="font-serif italic text-[36px] text-[#6D2323] leading-none mb-3">35+</span>
          <span className="font-sans text-[15px] uppercase tracking-wider text-[#1F1F1F] font-medium">Years of Legacy</span>
          <div className="w-12 h-[1px] bg-[#B98532]/40 mt-4" />
        </motion.div>

        {/* Stat 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full bg-[#F8F6F1] border border-[#B98532]/50 rounded-[16px] py-8 flex flex-col items-center justify-center text-center shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        >
          <div className="w-12 h-[1px] bg-[#B98532]/40 mb-4" />
          <span className="font-serif italic text-[36px] text-[#6D2323] leading-none mb-3">100%</span>
          <span className="font-sans text-[15px] uppercase tracking-wider text-[#1F1F1F] font-medium">Pure Vegetarian</span>
          <div className="w-12 h-[1px] bg-[#B98532]/40 mt-4" />
        </motion.div>

        {/* Stat 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full bg-[#F8F6F1] border border-[#B98532]/50 rounded-[16px] py-8 flex flex-col items-center justify-center text-center shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        >
          <div className="w-12 h-[1px] bg-[#B98532]/40 mb-4" />
          <span className="font-serif italic text-[36px] text-[#6D2323] leading-none mb-3">4.9★</span>
          <span className="font-sans text-[15px] uppercase tracking-wider text-[#1F1F1F] font-medium">Google Rating</span>
          <div className="w-12 h-[1px] bg-[#B98532]/40 mt-4" />
        </motion.div>

      </div>
    </section>
  );
}
