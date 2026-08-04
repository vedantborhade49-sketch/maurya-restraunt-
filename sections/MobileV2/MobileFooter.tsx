"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function MobileFooter() {
  return (
    <footer className="relative w-full bg-[#161413] text-[#F8F6F1] pt-32 pb-16 px-5 flex flex-col items-center text-center overflow-hidden">
      
      {/* Background Textures */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-overlay pointer-events-none" />
      
      {/* Torn Paper Edge Effect (SVG) - Color matches section above */}
      <div className="absolute top-0 left-0 w-full h-[24px] rotate-180 text-[#F8F6F1] z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C52.43,26.43,109.11,48.24,167.33,56.57c51.72,7.4,103.18,9.75,154.06-.13Z"></path>
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center">
        
        {/* Intro Section */}
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[#B98532] mb-8 block drop-shadow-sm">
          THE FAREWELL
        </span>
        
        <img src="/morya-logo.png" alt="Maurya" className="h-16 w-auto object-contain brightness-0 invert opacity-95 mb-10 drop-shadow-md" />

        <p className="font-serif text-2xl md:text-3xl italic font-light leading-relaxed opacity-90 mb-16 max-w-xs text-center drop-shadow-md">
          "Every meal shared is another story waiting to be remembered."
        </p>

        {/* Contact Cards Grid */}
        <div className="w-full flex flex-col gap-4 mb-20">
          
          <a href="/visit" className="group relative w-full bg-[#F8F6F1] border border-[#B98532]/30 rounded-[20px] p-6 flex flex-col items-center justify-center transition-all duration-300 active:scale-[0.98] hover:-translate-y-1 hover:border-[#B98532] hover:shadow-[0_6px_24px_rgba(185,133,50,0.2)] overflow-hidden">
            <span className="text-2xl mb-2 block transition-transform group-hover:scale-110 duration-500">📍</span>
            <span className="font-serif text-xl text-[#350709] mb-1">Visit Us</span>
            <span className="font-sans text-[11px] uppercase tracking-widest text-[#B98532] font-semibold opacity-90 group-hover:opacity-100 transition-opacity">Get Directions &rarr;</span>
          </a>

          <a href="tel:+911234567890" className="group relative w-full bg-[#F8F6F1] border border-[#B98532]/30 rounded-[20px] p-6 flex flex-col items-center justify-center transition-all duration-300 active:scale-[0.98] hover:-translate-y-1 hover:border-[#B98532] hover:shadow-[0_6px_24px_rgba(185,133,50,0.2)] overflow-hidden">
            <span className="text-2xl mb-2 block transition-transform group-hover:scale-110 duration-500">📞</span>
            <span className="font-serif text-xl text-[#350709] mb-1">Call Us</span>
            <span className="font-mono text-[11px] tracking-widest text-[#350709]/80 font-semibold">+91 XXXXX XXXXX</span>
          </a>

          <a href="#" className="group relative w-full bg-[#F8F6F1] border border-[#B98532]/30 rounded-[20px] p-6 flex flex-col items-center justify-center transition-all duration-300 active:scale-[0.98] hover:-translate-y-1 hover:border-[#B98532] hover:shadow-[0_6px_24px_rgba(185,133,50,0.2)] overflow-hidden">
            <span className="text-2xl mb-2 block transition-transform group-hover:scale-110 duration-500">🟢</span>
            <span className="font-serif text-xl text-[#350709] mb-1">WhatsApp</span>
            <span className="font-sans text-[11px] uppercase tracking-widest text-[#B98532] font-semibold opacity-90 group-hover:opacity-100 transition-opacity">Order Direct &rarr;</span>
          </a>

          <a href="#" className="group relative w-full bg-[#F8F6F1] border border-[#B98532]/30 rounded-[20px] p-6 flex flex-col items-center justify-center transition-all duration-300 active:scale-[0.98] hover:-translate-y-1 hover:border-[#B98532] hover:shadow-[0_6px_24px_rgba(185,133,50,0.2)] overflow-hidden">
            <span className="text-2xl mb-2 block transition-transform group-hover:scale-110 duration-500">📷</span>
            <span className="font-serif text-xl text-[#350709] mb-1">Instagram</span>
            <span className="font-sans text-[11px] uppercase tracking-widest text-[#B98532] font-semibold opacity-90 group-hover:opacity-100 transition-opacity">Follow Our Journey &rarr;</span>
          </a>

        </div>

        {/* Opening Hours */}
        <div className="flex flex-col items-center mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-[#B98532] mb-3">
            OPEN TODAY
          </span>
          <span className="font-serif text-2xl mb-2">11:00 AM &mdash; 11:30 PM</span>
          <span className="font-sans text-sm opacity-70">Every Day</span>
          <div className="w-6 h-[1px] bg-[#B98532]/40 mt-8" />
        </div>

        {/* Google Rating */}
        <div className="flex flex-col items-center mb-20 space-y-2">
          <div className="flex gap-1 text-[#B98532] text-xl mb-1 drop-shadow-sm">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <span className="font-serif text-3xl font-medium tracking-tight">4.9</span>
          <span className="font-mono text-[9px] uppercase tracking-widest opacity-60 mt-1">Based on 1,200+ Happy Guests</span>
        </div>

        {/* Final CTA */}
        <div className="mb-24">
          <Link href="/reservation" className="font-sans text-[13px] uppercase tracking-[0.25em] font-bold text-[#F8F6F1] hover:text-[#B98532] transition-colors border-b border-[#B98532]/30 hover:border-[#B98532] pb-1.5 inline-block">
            Reserve Your Table &rarr;
          </Link>
        </div>

        {/* Decorative Divider & Studio Credit */}
        <div className="flex flex-col items-center space-y-5">
          <div className="font-mono text-[8px] text-[#B98532]/70 tracking-widest flex items-center gap-2 drop-shadow-sm">
            <span>────</span>
            <span className="text-[10px]">✦</span>
            <span>────</span>
          </div>
          <div className="flex flex-col items-center opacity-70">
            <span className="font-sans text-[8px] uppercase tracking-widest text-[#F8F6F1] mb-1.5 opacity-80">
              Crafted with care by
            </span>
            <a href="https://akaristudios.com" className="font-mono text-[9px] uppercase tracking-widest text-[#B98532] hover:text-[#F8F6F1] transition-colors drop-shadow-sm font-bold">
              AKARI STUDIOS
            </a>
          </div>
        </div>

        {/* The Diya Motif (Hospitality Touch) */}
        <div className="mt-16 mb-4 relative flex items-center justify-center h-12 w-12">
          {/* Glowing Aura */}
          <div className="absolute w-8 h-8 bg-[#B98532]/30 rounded-full blur-[10px] animate-pulse" style={{ animationDuration: '3s' }} />
          {/* Flame Base */}
          <div className="absolute w-4 h-4 bg-[#B98532]/40 rounded-full blur-[4px] animate-pulse" style={{ animationDuration: '2s' }} />
          {/* SVG Diya */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="relative z-10 text-[#B98532] drop-shadow-md">
            {/* Flame */}
            <path d="M12 2C12 2 15 6 15 10C15 12.33 13.5 14.17 12 15C10.5 14.17 9 12.33 9 10C9 6 12 2 12 2Z" fill="currentColor" opacity="0.9"/>
            {/* Lamp base */}
            <path d="M3 14C3 18.5 7.5 22 12 22C16.5 22 21 18.5 21 14C17 14 16 16 12 16C8 16 7 14 3 14Z" fill="currentColor" />
          </svg>
        </div>

      </div>
    </footer>
  );
}
