"use client";

import React from "react";
import { motion } from "framer-motion";

const GALLERY_IMAGES = [
  "/home.png",
  "/inside1.jpeg",
  "/inside2.jpeg",
  "/inside3.png"
];

export default function MobileGallery() {
  return (
    <section className="relative w-full bg-[#F8F6F1] py-24 overflow-hidden">
      <div className="px-5 mb-10">
        <h2 className="font-sans text-[15px] tracking-[0.25em] font-bold text-[#6D2323] uppercase mb-4">
          Atmosphere
        </h2>
        <h3 className="font-serif italic text-[36px] leading-tight text-[#1F1F1F]">
          The Dining <br/>Room
        </h3>
      </div>

      <div className="w-full flex overflow-x-auto gap-4 px-5 pb-8 no-scrollbar snap-x snap-mandatory scroll-smooth">
        {GALLERY_IMAGES.map((src, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-[85vw] shrink-0 aspect-[4/5] rounded-[24px] overflow-hidden shadow-lg snap-center border border-[#B98532]/20"
          >
            <img src={src} alt="Gallery" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>
      
      {/* Scroll Hint */}
      <div className="flex justify-center mt-2 gap-2">
        {GALLERY_IMAGES.map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#1F1F1F]/20" />
        ))}
      </div>
    </section>
  );
}
