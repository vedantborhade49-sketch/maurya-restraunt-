"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MobileStory() {
  return (
    <section className="relative w-full bg-[#1F1F1F] py-24 text-[#F8F6F1]">
      <div className="px-5 mb-16 text-center">
        <h2 className="font-sans text-[15px] tracking-[0.25em] font-bold text-[#B98532] uppercase mb-4">
          Our Heritage
        </h2>
        <h3 className="font-serif italic text-[36px] leading-tight text-[#F8F6F1]">
          A Legacy Built <br/>On Tradition
        </h3>
      </div>

      <div className="flex flex-col gap-24">
        {/* Story Block 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col px-5"
        >
          <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-8 shadow-xl">
            <img src="/home.png" alt="Generations" className="w-full h-full object-cover filter brightness-90 grayscale-[20%]" />
          </div>
          <h4 className="font-serif text-[28px] text-[#F8F6F1] mb-4 leading-tight">
            The Beginning
          </h4>
          <p className="font-sans text-[18px] leading-[1.6] text-[#F8F6F1]/70">
            Three generations ago, we set out to create a sanctuary where the authenticity of Indian vegetarian cuisine could be celebrated without compromise.
          </p>
        </motion.div>

        {/* Story Block 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col px-5"
        >
          <div className="w-full aspect-[3/4] rounded-[24px] overflow-hidden mb-8 shadow-xl">
            <img src="/editorial-spices.png" alt="Craftsmanship" className="w-full h-full object-cover filter brightness-90 grayscale-[20%]" />
          </div>
          <h4 className="font-serif text-[28px] text-[#F8F6F1] mb-4 leading-tight">
            The Craft
          </h4>
          <p className="font-sans text-[18px] leading-[1.6] text-[#F8F6F1]/70">
            Every spice is hand-ground. Every recipe has been passed down through our family. There are no shortcuts, only a dedication to the craft of fine dining.
          </p>
        </motion.div>
      </div>

    </section>
  );
}
