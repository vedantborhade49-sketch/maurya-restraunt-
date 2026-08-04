"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REVIEWS = [
  {
    quote: "The finest pure vegetarian dining experience I have ever had. The attention to detail is remarkable.",
    name: "Arjun Mehta",
    dish: "Paneer Tikka Ajwaini",
    verified: true
  },
  {
    quote: "A timeless institution. Every visit feels like coming home to luxury hospitality.",
    name: "Priya Sharma",
    dish: "Dal Makhani",
    verified: true
  },
  {
    quote: "The flavors are as rich as the history of this place. Highly recommended for family dinners.",
    name: "Vikram Singh",
    dish: "Kung Pao Paneer",
    verified: true
  }
];

export default function MobileReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="relative w-full bg-[#F8F6F1] py-20 overflow-hidden border-t border-[#B98532]/10">
      
      <div className="w-full flex flex-col items-center px-6 min-h-[340px] relative">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full flex flex-col items-center text-center justify-center absolute top-0"
          >
            <div className="text-[#B98532] text-xl mb-6 tracking-widest">★★★★★</div>
            
            <h3 className="font-serif italic text-[22px] leading-[1.45] text-[#1F1F1F] mb-6 max-w-[300px]">
              "{REVIEWS[currentIndex].quote}"
            </h3>
            
            <div className="flex flex-col items-center">
              <span className="font-sans text-[13px] font-bold uppercase tracking-widest text-[#1F1F1F] mb-1">
                {REVIEWS[currentIndex].name}
              </span>
              <span className="font-sans text-[12px] text-[#6D2323] mb-3">
                Favorite: {REVIEWS[currentIndex].dish}
              </span>
              {REVIEWS[currentIndex].verified && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-[#B98532]/20 shadow-sm">
                  <span className="text-[#4285F4] font-bold text-xs">G</span>
                  <span className="font-sans text-[9px] uppercase tracking-wider text-[#1F1F1F]/60">Google Verified</span>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {REVIEWS.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-6 bg-[#B98532]' : 'w-1.5 bg-[#B98532]/20'}`}
          />
        ))}
      </div>

    </section>
  );
}
