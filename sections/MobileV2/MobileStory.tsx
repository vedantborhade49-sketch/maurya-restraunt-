"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MobileStory() {
  return (
    <section id="story" className="relative w-full bg-[#1C1414] text-[#F8F6F1] py-20 overflow-hidden">
      <div className="px-6 mb-12 text-center">
        <h2 className="font-sans text-[12px] tracking-[0.25em] font-bold text-[#B98532] uppercase mb-2">
          Our Heritage
        </h2>
        <h3 className="font-serif italic text-[32px] leading-tight text-[#F8F6F1]">
          A Legacy Built <br/>On Tradition
        </h3>
      </div>

      <div className="flex flex-col gap-16 max-w-[420px] mx-auto px-6">
        {/* Story Block 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <div className="w-full aspect-[4/3] rounded-[20px] overflow-hidden mb-6 shadow-xl border border-[#B98532]/20">
            <img src="/home.webp" alt="Generations" className="w-full h-full object-cover filter brightness-90 grayscale-[10%]" />
          </div>
          <h4 className="font-serif text-[24px] text-[#F8F6F1] mb-2 leading-tight">
            The Beginning
          </h4>
          <p className="font-sans text-[15px] leading-[1.6] text-[#F8F6F1]/70">
            Three generations ago, we set out to create a sanctuary where the authenticity of Indian vegetarian cuisine could be celebrated without compromise.
          </p>
        </motion.div>

        {/* Story Block 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <div className="w-full aspect-[4/3] rounded-[20px] overflow-hidden mb-6 shadow-xl border border-[#B98532]/20">
            <img src="/editorial-spices.webp" alt="Craftsmanship" className="w-full h-full object-cover filter brightness-90 grayscale-[10%]" />
          </div>
          <h4 className="font-serif text-[24px] text-[#F8F6F1] mb-2 leading-tight">
            The Craft
          </h4>
          <p className="font-sans text-[15px] leading-[1.6] text-[#F8F6F1]/70">
            Every spice is hand-ground. Every recipe has been passed down through our family. There are no shortcuts, only a dedication to the craft of fine dining.
          </p>
        </motion.div>
      </div>

    </section>
  );
}
