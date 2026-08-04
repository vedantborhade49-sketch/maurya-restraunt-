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
    <section className="relative w-full bg-[#F8F6F1] py-24 pb-32 overflow-hidden border-t border-[#B98532]/10">
      
      <div className="w-full flex flex-col items-center px-5 min-h-[400px] relative">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full flex flex-col items-center text-center justify-center absolute top-0 pt-4"
          >
            <div className="text-[#B98532] text-2xl mb-8 tracking-widest drop-shadow-sm">★★★★★</div>
            
            <h3 className="font-serif italic text-[26px] leading-[1.4] text-[#1F1F1F] mb-10 max-w-[320px]">
              "{REVIEWS[currentIndex].quote}"
            </h3>
            
            <div className="flex flex-col items-center">
              <span className="font-sans text-[14px] font-bold uppercase tracking-widest text-[#1F1F1F] mb-2">
                {REVIEWS[currentIndex].name}
              </span>
              <span className="font-sans text-[12px] text-[#6D2323] mb-4">
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
      <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-3">
        {REVIEWS.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-700 ${i === currentIndex ? 'w-8 bg-[#B98532]' : 'w-2 bg-[#B98532]/20'}`}
          />
        ))}
      </div>

    </section>
  );
}
