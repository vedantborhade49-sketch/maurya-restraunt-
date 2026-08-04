"use client";

import React from "react";
import Link from "next/link";

export default function MobileFooter() {
  return (
    <footer className="relative w-full bg-[#1F1F1F] text-[#F8F6F1] pt-32 pb-16 px-5 flex flex-col items-center text-center overflow-hidden">
      
      {/* Torn Paper Edge Effect (SVG) */}
      <div className="absolute top-0 left-0 w-full h-[24px] rotate-180 text-[#F8F6F1]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C52.43,26.43,109.11,48.24,167.33,56.57c51.72,7.4,103.18,9.75,154.06-.13Z"></path>
        </svg>
      </div>

      {/* 1. Logo */}
      <img src="/morya-logo.png" alt="Maurya" className="h-16 w-auto object-contain brightness-0 invert mb-12" />

      {/* 2. Links Grid */}
      <div className="flex flex-col gap-6 mb-16 w-full max-w-[200px]">
        <Link href="/visit" className="font-sans text-[16px] uppercase tracking-[0.2em] font-medium hover:text-[#B98532] transition-colors">
          Visit
        </Link>
        <div className="w-full h-[1px] bg-[#B98532]/20" />
        <a href="tel:+911234567890" className="font-sans text-[16px] uppercase tracking-[0.2em] font-medium hover:text-[#B98532] transition-colors">
          Call
        </a>
        <div className="w-full h-[1px] bg-[#B98532]/20" />
        <a href="#" className="font-sans text-[16px] uppercase tracking-[0.2em] font-medium hover:text-[#B98532] transition-colors">
          Instagram
        </a>
        <div className="w-full h-[1px] bg-[#B98532]/20" />
        <a href="#" className="font-sans text-[16px] uppercase tracking-[0.2em] font-medium hover:text-[#B98532] transition-colors">
          Google
        </a>
      </div>

      {/* 3. Credits */}
      <div className="flex flex-col items-center opacity-60">
        <span className="font-sans text-[10px] uppercase tracking-widest text-[#F8F6F1] mb-2">
          Designed by
        </span>
        <a href="#" className="font-serif italic text-[16px] hover:text-[#B98532] transition-colors">
          Akari Studios
        </a>
      </div>

    </footer>
  );
}
