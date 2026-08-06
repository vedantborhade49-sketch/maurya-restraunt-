"use client";

import React from "react";
import { motion } from "framer-motion";

const GALLERY_IMAGES = [
  "/home.png",
  "/inside-1.jpeg",
  "/inside-2.jpeg",
  "/inside3.png"
];

export default function MobileGallery() {
  return (
    <section id="gallery" className="relative w-full bg-[#1C1414] py-20 text-[#F8F6F1] overflow-hidden">
      <div className="px-6 mb-8 text-center">
        <h2 className="font-sans text-[12px] tracking-[0.25em] font-bold text-[#B98532] uppercase mb-2">
          Atmosphere
        </h2>
        <h3 className="font-serif italic text-[32px] leading-tight text-[#F8F6F1]">
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
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
        ))}
      </div>
    </section>
  );
}
