"use client";

import React from "react";
import { MenuItem } from "../../stores/table-store";
import { motion } from "framer-motion";

interface FloatingFoodPreviewProps {
  item: MenuItem | null;
  mouseX: number;
  mouseY: number;
}

export default function FloatingFoodPreview({ item, mouseX, mouseY }: FloatingFoodPreviewProps) {
  if (!item || !item.image_url) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      style={{
        left: mouseX,
        top: mouseY,
      }}
      className="fixed z-50 pointer-events-none hidden md:block w-72 bg-[#350709] border border-[#B98532]/40 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] rotate-[1.5deg]"
    >
      <div className="relative w-full h-44 bg-[#0B0908] overflow-hidden mb-3 border border-[#B98532]/20">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-1 text-center">
        <h4 className="font-serif text-lg text-[#F8F6F1] font-normal leading-snug">
          {item.name}
        </h4>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#B98532] font-bold">
          ₹{item.price}
        </p>
      </div>
    </motion.div>
  );
}
