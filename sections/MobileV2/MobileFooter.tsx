"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function MobileFooter() {
  return (
    <footer className="w-full bg-[#1B1715] pt-24 pb-12 px-4 md:px-8 flex flex-col items-center">
      
      {/* Floating Luxury Business Card */}
      <div className="w-full max-w-sm md:max-w-md bg-[#F8F6F1] text-[#350709] rounded-sm flex flex-col items-center text-center py-24 px-6 md:px-12 relative overflow-hidden">
        
        {/* Top Divider */}
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-[#350709]/10" />

        {/* Logo */}
        <img 
          src="/morya-logo.png" 
          alt="Maurya" 
          className="h-12 w-auto object-contain mb-[64px]"
        />

        {/* The Poem */}
        <div className="font-serif text-lg md:text-xl italic font-light leading-relaxed mb-[64px] max-w-[240px] space-y-8">
          <p>
            Every visit begins<br />
            with a warm welcome.
          </p>
          <p>
            Every goodbye<br />
            comes with a promise<br />
            to return.
          </p>
        </div>

        {/* Reserve CTA */}
        <div className="mb-[64px]">
          <Link href="/reservation" className="font-sans text-[15px] font-normal tracking-wide text-[#350709] hover:underline underline-offset-4 decoration-[#350709]/40 transition-all">
            Reserve &rarr;
          </Link>
        </div>

        {/* Bottom Divider */}
        <div className="w-full h-[1px] bg-[#350709]/10 mb-[48px]" />

        {/* Studio Credit */}
        <div className="flex flex-col items-center opacity-80">
          <span className="font-sans text-[12px] font-light tracking-wide text-[#350709] mb-1">
            Crafted by
          </span>
          <a href="https://akaristudios.com" className="font-mono text-[12px] tracking-widest text-[#350709] uppercase hover:opacity-70 transition-opacity">
            AKARI STUDIOS
          </a>
        </div>
        
        {/* Bottom Divider (absolute bottom) */}
        <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-[#350709]/10" />

      </div>
    </footer>
  );
}
