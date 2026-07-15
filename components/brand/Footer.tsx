"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[#0B0908] text-[#F3E8D4] pt-24 pb-12 px-6 md:px-12 lg:px-24 border-t border-white/5 overflow-hidden">
      {/* Torn / Brush Edge SVG at the top of the footer to match the screenshot */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] -translate-y-[1px]">
        <svg 
          className="relative block w-full h-8 text-[#0B0908] fill-current" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path d="M0,0 Q150,90 300,30 T600,60 T900,20 T1200,80 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-16">
        {/* Contact Us Column */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h3 className="font-heading text-2xl text-[#B98532] tracking-wide">
            Contact Us
          </h3>
          <p className="font-sans text-xs leading-relaxed text-[#F3E8D4]/70 max-w-xs">
            Shop no 5,6 Sun Radiant Commercial Complex,<br />
            Yewalewadi Road, Khadi Machine Chowk,<br />
            Kondhwa Budruk, Pune 411048
          </p>
          <p className="font-sans text-xs text-[#F3E8D4]/90 font-medium">
            <span className="text-[#8F1115] mr-1">Phone:</span> +91 8329895846
          </p>
          <a 
            href="mailto:maurya@mauryaveg.com"
            className="font-sans text-xs text-[#F3E8D4]/80 hover:text-gold transition-colors underline decoration-gold/30"
          >
            maurya@mauryaveg.com
          </a>
        </div>

        {/* Stay Connected Column */}
        <div className="flex flex-col items-center gap-4">
          <h3 className="font-heading text-2xl text-[#B98532] tracking-wide">
            Stay Connected
          </h3>
          <p className="font-sans text-xs text-[#F3E8D4]/60">
            Follow us on social media channels
          </p>
          {/* Social media icons in brand red */}
          <div className="flex items-center gap-6 mt-2">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#8F1115] hover:text-[#C9371D] transition-colors text-xl font-bold font-sans"
              aria-label="Facebook"
            >
              f
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#8F1115] hover:text-[#C9371D] transition-colors text-xl font-bold font-sans"
              aria-label="Instagram"
            >
              📷
            </a>
            <a 
              href="https://google.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#8F1115] hover:text-[#C9371D] transition-colors text-xl font-bold font-sans"
              aria-label="Google"
            >
              G
            </a>
          </div>
        </div>

        {/* Timings Column */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <h3 className="font-heading text-2xl text-[#B98532] tracking-wide">
            Timings
          </h3>
          <p className="font-sans text-xs text-[#F3E8D4]/80 font-medium">
            Monday - Sunday : 08:30 AM - 11:00 PM
          </p>
        </div>
      </div>

      {/* Navigation Links and Copyright */}
      <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] uppercase tracking-[0.2em] font-sans font-semibold">
          <Link href="/" className="text-[#8F1115] hover:text-[#C9371D] transition-colors">HOME</Link>
          <span className="text-white/10">|</span>
          <Link href="/#story" className="text-[#8F1115] hover:text-[#C9371D] transition-colors">ABOUT</Link>
          <span className="text-white/10">|</span>
          <Link href="/menu" className="text-[#8F1115] hover:text-[#C9371D] transition-colors">MENU</Link>
          <span className="text-white/10">|</span>
          <Link href="/#kitchen" className="text-[#8F1115] hover:text-[#C9371D] transition-colors">GALLERY</Link>
          <span className="text-white/10">|</span>
          <Link href="#story" className="text-[#8F1115] hover:text-[#C9371D] transition-colors">CONTACT</Link>
          <span className="text-white/10">|</span>
          <Link href="/order" className="text-[#8F1115] hover:text-[#C9371D] transition-colors">ORDER NOW</Link>
        </div>

        <p className="font-sans text-[10px] text-[#F3E8D4]/40 text-center tracking-widest leading-loose">
          Copyright © 2023 Maurya Veg All Rights Reserved Designed By Petpooja.
        </p>
      </div>
    </footer>
  );
}
