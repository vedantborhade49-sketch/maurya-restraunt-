"use client";

import React from "react";
import { motion } from "framer-motion";

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
  return (
    <section className="relative w-full bg-[#F8F6F1] py-24 pb-32 overflow-hidden border-t border-[#B98532]/10">
      
      <div className="w-full flex overflow-x-auto px-5 gap-6 no-scrollbar snap-x snap-mandatory scroll-smooth">
        {REVIEWS.map((review, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full shrink-0 snap-center flex flex-col items-center text-center justify-center min-h-[300px]"
          >
            <div className="text-[#B98532] text-2xl mb-8 tracking-widest">★★★★★</div>
            
            <h3 className="font-serif italic text-[26px] leading-[1.4] text-[#1F1F1F] mb-10 max-w-[320px]">
              "{review.quote}"
            </h3>
            
            <div className="flex flex-col items-center">
              <span className="font-sans text-[14px] font-bold uppercase tracking-widest text-[#1F1F1F] mb-2">
                {review.name}
              </span>
              <span className="font-sans text-[12px] text-[#6D2323] mb-4">
                Favorite: {review.dish}
              </span>
              {review.verified && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-[#B98532]/20 shadow-sm">
                  <span className="text-[#4285F4] font-bold text-xs">G</span>
                  <span className="font-sans text-[9px] uppercase tracking-wider text-[#1F1F1F]/60">Google Verified</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
