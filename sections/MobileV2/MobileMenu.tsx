"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["All", "Starters", "Chinese", "Punjabi", "South Indian", "Rice", "Desserts"];

const ALL_DISHES = [
  // Starters
  { id: "paneer-tikka", category: "Starters", name: "Paneer Tikka Ajwaini", desc: "Cottage cheese marinated in carom seeds, yogurt & ground spices, roasted in clay oven.", price: 395, img: "/dish-paneer-butter-masala.png" },
  { id: "manchurian-dry", category: "Starters", name: "Veg Manchurian Dry", desc: "Crispy vegetable dumplings tossed with ginger, garlic, cilantro and dark soy sauce.", price: 345, img: "/dish-manchurian.png" },
  { id: "cheese-balls", category: "Starters", name: "Cheese Corn Croquettes", desc: "Golden fried sweet corn & melted cheese bites served with mint chutney.", price: 345, img: "/editorial-table-feast.png" },

  // Chinese
  { id: "kung-pao", category: "Chinese", name: "Kung Pao Paneer", desc: "Crispy paneer tossed with peanuts, dry red chillies, and classic kung pao sauce.", price: 375, img: "/dish-manchurian.png" },
  { id: "hakka-noodles", category: "Chinese", name: "Veg Hakka Noodles", desc: "Thin noodles wok-tossed with shredded vegetables, white pepper and light soy sauce.", price: 325, img: "/editorial-table-feast.png" },
  { id: "chili-paneer", category: "Chinese", name: "Chilli Paneer Gravy", desc: "Paneer cubes simmered in a spicy bell pepper and soy chili garlic sauce.", price: 365, img: "/dish-paneer-butter-masala.png" },

  // Punjabi
  { id: "dal-makhani", category: "Punjabi", name: "Dal Makhani", desc: "Our signature black lentils simmered overnight with tomatoes, butter and cream.", price: 345, img: "/editorial-table-feast.png" },
  { id: "paneer-butter", category: "Punjabi", name: "Paneer Butter Masala", desc: "Soft cottage cheese cooked in a rich, velvety tomato butter gravy with aromatic spices.", price: 385, img: "/dish-paneer-butter-masala.png" },
  { id: "veg-maratha", category: "Punjabi", name: "Maurya Special Veg Maratha", desc: "Spicy Maharashtrian delicacy made with vegetable cutlets in a robust dark gravy.", price: 365, img: "/dish-manchurian.png" },

  // South Indian
  { id: "mysore-dosa", category: "South Indian", name: "Mysore Cheese Masala Dosa", desc: "Crispy golden dosa smeared with spicy red chutney, filled with potato masala & melted cheese.", price: 245, img: "/editorial-table-feast.png" },
  { id: "rava-dosa", category: "South Indian", name: "Rava Onion Dosa", desc: "Lacy semolina crepe dotted with caramelized onions, green chillies & curry leaves.", price: 215, img: "/dish-paneer-butter-masala.png" },
  { id: "medu-vada", category: "South Indian", name: "Crispy Medu Vada (2 pcs)", desc: "Traditional savory lentil donuts served with piping hot sambar & fresh coconut chutney.", price: 165, img: "/dish-manchurian.png" },

  // Rice
  { id: "maurya-biryani", category: "Rice", name: "Maurya Veg Special Biryani", desc: "Long-grain basmati rice layered with fragrant spices, slow-cooked in dum style.", price: 365, img: "/editorial-table-feast.png" },
  { id: "jeera-rice", category: "Rice", name: "Aromatic Jeera Rice", desc: "Basmati rice tempered with roasted cumin seeds and fresh ghee.", price: 225, img: "/dish-paneer-butter-masala.png" },
  { id: "kashmiri-pulao", category: "Rice", name: "Royal Kashmiri Pulao", desc: "Mildly sweet saffron basmati rice garnishing with dry fruits, nuts & fresh pomegranate.", price: 295, img: "/dish-manchurian.png" },

  // Desserts
  { id: "gulab-jamun", category: "Desserts", name: "Gulab Jamun with Ice Cream", desc: "Warm milk-solid dumplings soaked in rose syrup served alongside vanilla ice cream.", price: 185, img: "/editorial-table-feast.png" },
  { id: "matka-kulfi", category: "Desserts", name: "Traditional Matka Kulfi", desc: "Creamy cardamom & saffron kulfi set in earthen pots with pistachios.", price: 165, img: "/dish-paneer-butter-masala.png" },
  { id: "sizzling-brownie", category: "Desserts", name: "Sizzling Chocolate Brownie", desc: "Hot fudge brownie served on a sizzling hot plate topped with cold vanilla ice cream.", price: 245, img: "/dish-manchurian.png" },
];

export default function MobileMenu() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredDishes = activeCategory === "All" 
    ? ALL_DISHES 
    : ALL_DISHES.filter((d) => d.category === activeCategory);

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

      {/* Sticky Category Rail */}
      <div className="sticky top-[68px] z-40 w-full bg-[#F8F6F1]/95 backdrop-blur-md border-y border-[#B98532]/20 shadow-sm py-3.5 mb-10">
        <div className="flex overflow-x-auto gap-5 px-6 no-scrollbar scroll-smooth snap-x">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap font-sans text-[15px] transition-colors snap-center cursor-pointer ${
                activeCategory === cat 
                  ? "text-[#6D2323] font-bold border-b-2 border-[#6D2323] pb-0.5" 
                  : "text-[#1F1F1F]/60 font-medium pb-0.5 hover:text-[#1F1F1F]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Dishes List */}
      <div className="px-6 min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-10 max-w-[420px] mx-auto"
          >
            {filteredDishes.map((dish) => (
              <div 
                key={dish.id}
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
                      className="h-[44px] px-6 bg-[#1F1F1F] text-[#F8F6F1] rounded-full font-sans text-[12px] font-bold uppercase tracking-wider active:scale-95 transition-transform shadow-sm flex items-center justify-center cursor-pointer"
                    >
                      Add +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
}
