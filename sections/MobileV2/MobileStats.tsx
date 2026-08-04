"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MobileStats() {
  return (
    <section className="relative w-full bg-[#6D2323] flex flex-col items-center py-20 px-6 overflow-hidden">
      <div className="w-full max-w-[340px] flex flex-col gap-4">
        
        {/* Stat 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full bg-[#F8F6F1] border border-[#B98532]/40 rounded-[20px] py-6 flex flex-col items-center justify-center text-center shadow-md"
        >
          <span className="font-serif italic text-[36px] text-[#6D2323] leading-none mb-1">35+</span>
          <span className="font-sans text-[13px] uppercase tracking-wider text-[#1F1F1F] font-bold">Years of Legacy</span>
        </motion.div>

        {/* Stat 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full bg-[#F8F6F1] border border-[#B98532]/40 rounded-[20px] py-6 flex flex-col items-center justify-center text-center shadow-md"
        >
          <span className="font-serif italic text-[36px] text-[#6D2323] leading-none mb-1">100%</span>
          <span className="font-sans text-[13px] uppercase tracking-wider text-[#1F1F1F] font-bold">Pure Vegetarian</span>
        </motion.div>

        {/* Stat 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full bg-[#F8F6F1] border border-[#B98532]/40 rounded-[20px] py-6 flex flex-col items-center justify-center text-center shadow-md"
        >
          <span className="font-serif italic text-[36px] text-[#6D2323] leading-none mb-1">4.9★</span>
          <span className="font-sans text-[13px] uppercase tracking-wider text-[#1F1F1F] font-bold">Google Rating</span>
        </motion.div>

      </div>
    </section>
  );
}
