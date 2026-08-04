"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MobileReservation() {
  return (
    <section className="relative w-full bg-[#F8F6F1] py-24 text-[#1F1F1F] px-5 border-t border-[#B98532]/10" id="reserve">
      
      <div className="text-center mb-12">
        <h2 className="font-serif italic text-[40px] leading-tight text-[#1F1F1F] mb-4">
          Reserve <br/>Your Table
        </h2>
        <p className="font-sans text-[15px] text-[#1F1F1F]/70 max-w-[280px] mx-auto">
          Join us for an unforgettable dining experience.
        </p>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-6 w-full max-w-[400px] mx-auto"
      >
        {/* Large Fields */}
        <input 
          type="text" 
          placeholder="Your Name" 
          className="w-full h-[64px] bg-transparent border-b border-[#1F1F1F]/20 text-[18px] font-sans placeholder-[#1F1F1F]/40 focus:outline-none focus:border-[#6D2323] transition-colors rounded-none"
        />
        <input 
          type="tel" 
          placeholder="Phone Number" 
          className="w-full h-[64px] bg-transparent border-b border-[#1F1F1F]/20 text-[18px] font-sans placeholder-[#1F1F1F]/40 focus:outline-none focus:border-[#6D2323] transition-colors rounded-none"
        />
        <div className="flex gap-4">
          <input 
            type="date" 
            className="w-1/2 h-[64px] bg-transparent border-b border-[#1F1F1F]/20 text-[16px] font-sans text-[#1F1F1F]/70 focus:outline-none focus:border-[#6D2323] transition-colors rounded-none"
          />
          <select 
            className="w-1/2 h-[64px] bg-transparent border-b border-[#1F1F1F]/20 text-[16px] font-sans text-[#1F1F1F]/70 focus:outline-none focus:border-[#6D2323] transition-colors rounded-none appearance-none"
          >
            <option>2 Guests</option>
            <option>3 Guests</option>
            <option>4 Guests</option>
            <option>5+ Guests</option>
          </select>
        </div>

        {/* Large CTA */}
        <button 
          type="button"
          className="w-full h-[64px] bg-[#6D2323] text-[#F8F6F1] rounded-full font-sans text-[16px] font-bold uppercase tracking-widest mt-6 active:scale-[0.98] transition-transform shadow-lg"
        >
          Confirm Reservation
        </button>
      </motion.form>

    </section>
  );
}
