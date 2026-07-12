"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The navbar should be hidden initially and fade in after the Opening Scene
    gsap.set(navRef.current, { y: -50, opacity: 0 });
  }, []);

  const navItems = ["About", "Experience", "Menu", "Gallery", "Contact"];

  return (
    <div
      ref={navRef}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-8 h-16 w-[90%] max-w-5xl rounded-[999px] border border-white/10 bg-[#141414]/22 backdrop-blur-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.1)]"
      id="main-navbar"
    >
      <div className="flex items-center">
        <img src="/morya-logo.png" alt="Maurya Logo" className="h-6 w-auto object-contain" />
      </div>

      <div className="hidden md:flex items-center gap-8 font-label text-sm uppercase tracking-widest text-[#F8F5F0]/80">
        {navItems.map((item, i) => (
          <div key={i} className="group relative cursor-pointer overflow-hidden pb-1">
            <span className="inline-block transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:tracking-[0.15em]">
              {item}
            </span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="h-6 w-[1px] bg-[#F8F5F0]/30 hidden md:block" />
        <button className="group relative overflow-hidden font-label text-sm uppercase tracking-widest px-6 py-2 text-[#F8F5F0]">
          <span className="relative z-10 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:tracking-[0.15em]">
            Reserve
          </span>
          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
        </button>
      </div>
    </div>
  );
}
