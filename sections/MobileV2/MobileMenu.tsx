"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CATEGORIES = ["Starters", "Chinese", "Punjabi", "South Indian", "Rice", "Desserts"];

const FEATURED_DISHES = [
  { id: "paneer-tikka", category: "Starters", name: "Paneer Tikka Ajwaini", desc: "Cottage cheese marinated in carom seeds, yogurt & ground spices, roasted in clay oven.", price: 395, img: "/dish-paneer-butter-masala.png" },
  { id: "kung-pao", category: "Chinese", name: "Kung Pao Paneer", desc: "Crispy paneer tossed with peanuts, dry red chillies, and classic kung pao sauce.", price: 375, img: "/dish-manchurian.png" },
  { id: "dal-makhani", category: "Punjabi", name: "Dal Makhani", desc: "Our signature black lentils simmered overnight with tomatoes, butter and cream.", price: 345, img: "/editorial-table-feast.png" },
];

export default function MobileMenu() {
  const [activeCategory, setActiveCategory] = useState("Starters");
  
  return (
    <section id="menu" className="relative w-full bg-[#F8F6F1] pt-24 pb-32 text-[#1F1F1F]">
      
      {/* Section Header */}
      <div className="px-5 mb-8 text-center">
        <h2 className="font-sans text-[15px] tracking-[0.25em] font-bold text-[#6D2323] uppercase mb-4">
          Culinary Journey
        </h2>
        <h3 className="font-serif italic text-[36px] leading-tight text-[#1F1F1F]">
          A Taste of <br/>Heritage
        </h3>
      </div>

      {/* Sticky Category Rail */}
      <div className="sticky top-[68px] z-40 w-full bg-[#F8F6F1]/95 backdrop-blur-md border-y border-[#B98532]/20 shadow-sm py-4 mb-10">
        <div className="flex overflow-x-auto gap-6 px-5 no-scrollbar scroll-smooth snap-x">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap font-sans text-[16px] transition-colors snap-center ${
                activeCategory === cat 
                  ? "text-[#6D2323] font-bold border-b-2 border-[#6D2323] pb-1" 
                  : "text-[#1F1F1F]/60 font-medium pb-1"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Dishes List */}
      <div className="px-5 flex flex-col gap-12">
        {FEATURED_DISHES.map((dish, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col w-full"
          >
            {/* Large Image */}
            <div className="w-full aspect-square rounded-[24px] overflow-hidden mb-6 shadow-md border border-[#B98532]/10 bg-white">
              <img src={dish.img} alt={dish.name} className="w-full h-full object-cover" />
            </div>
            
            {/* Dish Info */}
            <div className="flex flex-col items-center text-center px-4">
              <span className="font-sans text-[12px] uppercase tracking-widest text-[#B98532] font-bold mb-3">
                {dish.category}
              </span>
              <h4 className="font-serif text-[28px] text-[#1F1F1F] mb-3 leading-tight">
                {dish.name}
              </h4>
              <p className="font-sans text-[16px] leading-[1.6] text-[#1F1F1F]/70 mb-6">
                {dish.desc}
              </p>
              <div className="flex items-center justify-between w-full border-t border-[#B98532]/20 pt-6">
                <span className="font-sans text-[20px] font-bold text-[#6D2323]">₹{dish.price}</span>
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
                  className="h-[48px] px-8 bg-[#1F1F1F] text-[#F8F6F1] rounded-full font-sans text-[14px] font-bold uppercase tracking-wider active:scale-95 transition-transform shadow-md"
                >
                  Add +
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
