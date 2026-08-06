"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import Link from "next/link";

const FEATURED_DISHES = [
  { id: "paneer-tikka", category: "Starters", name: "Paneer Tikka Ajwaini", desc: "Cottage cheese marinated in carom seeds, yogurt & ground spices, roasted in clay oven.", price: 395, img: "/dish-paneer-butter-masala.webp" },
  { id: "kung-pao", category: "Chinese", name: "Kung Pao Paneer", desc: "Crispy paneer tossed with peanuts, dry red chillies, and classic kung pao sauce.", price: 375, img: "/dish-manchurian.webp" },
  { id: "dal-makhani", category: "Punjabi", name: "Dal Makhani", desc: "Our signature black lentils simmered overnight with tomatoes, butter and cream.", price: 345, img: "/editorial-table-feast.webp" },
];

export default function MobileMenu() {
  
  return (
    <section id="menu" className="relative w-full bg-[#F8F6F1] pt-20 pb-24 text-[#1F1F1F]">
      
      {/* Section Header */}
      <div className="px-6 mb-8 text-center">
        <h2 className="font-sans text-[12px] tracking-[0.25em] font-bold text-[#6D2323] uppercase mb-2">
          Culinary Journey
        </h2>
        <h3 className="font-serif italic text-[32px] leading-tight text-[#1F1F1F]">
          A Taste of <br/>Heritage
        </h3>
      </div>



      {/* Featured Dishes List */}
      <div className="px-6 flex flex-col gap-10 max-w-[420px] mx-auto">
        {FEATURED_DISHES.map((dish, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col w-full bg-white p-5 rounded-[24px] shadow-md border border-[#B98532]/15"
          >
            {/* Dish Image */}
            <div className="w-full aspect-[4/3] rounded-[18px] overflow-hidden mb-5 bg-[#1C1414] relative">
              <img src={dish.img} alt={dish.name} className="w-full h-full object-cover" />
            </div>
            
            {/* Dish Info */}
            <div className="flex flex-col items-start text-left">
              <span className="font-sans text-[11px] uppercase tracking-widest text-[#B98532] font-bold mb-1">
                {dish.category}
              </span>
              <h4 className="font-serif text-[24px] text-[#1F1F1F] mb-2 leading-tight">
                {dish.name}
              </h4>
              <p className="font-sans text-[14px] leading-[1.5] text-[#1F1F1F]/70 mb-5">
                {dish.desc}
              </p>
              <div className="flex items-center justify-between w-full border-t border-[#B98532]/10 pt-4">
                <span className="font-sans text-[18px] font-bold text-[#6D2323]">₹{dish.price}</span>
                <button 
                  onClick={() => {
                    const { useTableStore } = require("@/stores/table-store");
                    useTableStore.getState().addItem({
                      id: dish.id,
                      name: dish.name,
                      price: dish.price,
                      description: dish.desc,
                      image_url: dish.img,
                      category: dish.category,
                      is_veg: true
                    });
                    useTableStore.getState().setIsOpen(true);
                  }}
                  className="h-[44px] px-6 bg-[#1F1F1F] text-[#F8F6F1] rounded-full font-sans text-[12px] font-bold uppercase tracking-wider active:scale-95 transition-transform shadow-sm flex items-center justify-center"
                >
                  Add +
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {/* View Full Menu CTA */}
        <div className="mt-4 flex justify-center w-full">
          <Link
            href="/menu"
            className="w-full h-[52px] bg-[#6D2323] text-[#F8F6F1] rounded-full flex items-center justify-center font-sans text-[13px] font-bold uppercase tracking-wider shadow-md active:scale-95 transition-transform"
          >
            View Complete Menu &rarr;
          </Link>
        </div>
      </div>

    </section>
  );
}
