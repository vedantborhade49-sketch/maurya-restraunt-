"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTableStore } from "@/stores/table-store";

export default function MobileFooter() {
  return (
    <footer className="w-full bg-[#1B1715] pt-24 pb-12 px-4 md:px-8 flex flex-col items-center">
      
      {/* Vintage Scroll */}
      <div className="w-full max-w-sm md:max-w-md bg-[#F4EFE6] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] text-[#350709] rounded-sm flex flex-col items-center text-center py-24 px-6 md:px-12 relative overflow-hidden shadow-[inset_0_30px_30px_-20px_rgba(0,0,0,0.25),inset_0_-30px_30px_-20px_rgba(0,0,0,0.25),0_20px_50px_rgba(0,0,0,0.8)] border-y-[12px] border-[#2A1810]">
        
        {/* Subtle inner line to separate wood from paper */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/20" />

        {/* Logo */}
        <img 
          src="/morya-logo.webp" 
          alt="Maurya" 
          className="h-36 md:h-48 w-auto object-contain mb-[64px] scale-[1.2]"
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

        {/* Quick Nav Links */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6 text-center w-full max-w-[280px]">
          <Link href="/" className="font-mono text-[12px] uppercase tracking-widest font-bold text-[#350709]/80 hover:text-[#350709] transition-all min-h-[44px] inline-flex items-center px-2">
            Home
          </Link>
          <Link href="/menu" className="font-mono text-[12px] uppercase tracking-widest font-bold text-[#350709]/80 hover:text-[#350709] transition-all min-h-[44px] inline-flex items-center px-2">
            Menu
          </Link>
          <Link href="/our-story" className="font-mono text-[12px] uppercase tracking-widest font-bold text-[#350709]/80 hover:text-[#350709] transition-all min-h-[44px] inline-flex items-center px-2">
            Story
          </Link>
          <Link href="/gallery" className="font-mono text-[12px] uppercase tracking-widest font-bold text-[#350709]/80 hover:text-[#350709] transition-all min-h-[44px] inline-flex items-center px-2">
            Gallery
          </Link>
        </div>

        {/* Tiny Divider */}
        <div className="w-8 h-[1px] bg-[#350709]/20 mb-6" />

        {/* Navigation Links */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-[48px] text-center w-full max-w-[260px]">
          <a href="https://maps.google.com/?q=Maurya+Pure+Veg+Restaurant+Kondhwa+Pune" target="_blank" rel="noopener noreferrer" className="font-sans text-[15px] font-medium tracking-wide text-[#350709] min-h-[44px] inline-flex items-center justify-center hover:underline underline-offset-4 decoration-[#350709]/40 transition-all">
            Visit &rarr;
          </a>
          <a href="tel:+918329895846" className="font-sans text-[15px] font-medium tracking-wide text-[#350709] min-h-[44px] inline-flex items-center justify-center hover:underline underline-offset-4 decoration-[#350709]/40 transition-all">
            Call &rarr;
          </a>
          <a href="https://www.instagram.com/restaurant_mauryaveg?igsh=djFnNDV6N2c1dTN1" target="_blank" rel="noopener noreferrer" className="font-sans text-[15px] font-medium tracking-wide text-[#350709] min-h-[44px] inline-flex items-center justify-center hover:underline underline-offset-4 decoration-[#350709]/40 transition-all">
            Instagram &rarr;
          </a>
          <a href="https://www.google.com/search?client=ubuntu-chr&hs=vEl&sca_esv=dc96f26ba5476417&sxsrf=APpeQnuV0GUDvT8XWVnicsUZ6xpXKzHolw:1785874281776&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_6LJNp3rs9TdnT_8kcseuspc2A6dnaNwtKacpGWK-1Bi2QCIWbcOg6GIZMix8k6FLXz8dI2IJiD36h2k-M7dxNiYrTIlG4GzQg2nQutwGg54I1FFhQ%3D%3D&q=Maurya+Veg+Family+Restaurant+Reviews&sa=X&ved=2ahUKEwiY27aR5IeWAxWKkeEIHaJEOq4Q0bkNegQIOxAH&biw=1366&bih=649&dpr=1#lrd=0x3bc2eb08e54c74ed:0xc584a87476215455,3,,,," target="_blank" rel="noopener noreferrer" className="font-sans text-[15px] font-medium tracking-wide text-[#350709] min-h-[44px] inline-flex items-center justify-center hover:underline underline-offset-4 decoration-[#350709]/40 transition-all">
            Reviews &rarr;
          </a>
        </div>

        {/* Order Online CTA */}
        <div className="mb-[48px]">
          <button 
            onClick={() => useTableStore.getState().setIsOpen(true)}
            className="font-sans text-[16px] font-bold tracking-wide text-[#8F1115] hover:underline underline-offset-4 min-h-[44px] inline-flex items-center px-4 transition-all cursor-pointer"
          >
            Order Online &rarr;
          </button>
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
        
      </div>
    </footer>
  );
}
