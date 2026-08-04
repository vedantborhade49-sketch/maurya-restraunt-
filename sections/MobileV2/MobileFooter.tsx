"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

export default function MobileFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mobile-footer-fade",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative w-full bg-[#1A1716] text-[#F8F6F1] pt-24 pb-16 px-6 flex flex-col items-center text-center overflow-hidden">
      
      {/* Background Texture & Vignette */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-overlay pointer-events-none" />
      
      {/* Torn Paper Edge Effect (SVG) - Matches section above */}
      <div className="absolute top-0 left-0 w-full h-[24px] rotate-180 text-[#F8F6F1] z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C52.43,26.43,109.11,48.24,167.33,56.57c51.72,7.4,103.18,9.75,154.06-.13Z"></path>
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center">
        
        {/* Maurya Signature */}
        <div className="mobile-footer-fade flex flex-col items-center mb-12 mt-4">
          <img 
            src="/morya-logo.png" 
            alt="Maurya" 
            className="h-[40px] w-auto object-contain brightness-0 invert opacity-90 mb-4"
          />
          <span className="font-serif italic font-light text-[16px] text-[#F8F6F1]/80">
            Since 1991
          </span>
        </div>
        
        {/* Thin brass divider */}
        <div className="mobile-footer-fade w-24 h-[1px] bg-[#B98532]/40 mb-12" />

        {/* The Poem */}
        <div className="mobile-footer-fade font-serif text-[28px] italic font-light leading-relaxed mb-12 max-w-[240px]">
          <p>Come Hungry.</p>
          <p>Leave With A Story.</p>
        </div>

        {/* Thin brass divider */}
        <div className="mobile-footer-fade w-24 h-[1px] bg-[#B98532]/40 mb-12" />

        {/* Editorial Navigation */}
        <div className="mobile-footer-fade flex flex-col items-center gap-6 mb-12 w-full">
          <div className="flex items-center justify-center gap-8 w-full">
            <Link href="/visit" className="font-sans text-[15px] font-normal tracking-wide text-[#F8F6F1] hover:text-[#B98532] transition-colors relative group">
              Visit
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B98532] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <span className="text-[#B98532]/40">&bull;</span>
            <Link href="/menu" className="font-sans text-[15px] font-normal tracking-wide text-[#F8F6F1] hover:text-[#B98532] transition-colors relative group">
              Menu
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B98532] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 w-full">
            <Link href="/reservation" className="font-sans text-[15px] font-normal tracking-wide text-[#F8F6F1] hover:text-[#B98532] transition-colors relative group">
              Reserve
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B98532] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <span className="text-[#B98532]/40">&bull;</span>
            <a href="https://www.instagram.com/restaurant_mauryaveg?igsh=djFnNDV6N2c1dTN1" target="_blank" rel="noopener noreferrer" className="font-sans text-[15px] font-normal tracking-wide text-[#F8F6F1] hover:text-[#B98532] transition-colors relative group">
              Instagram
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B98532] transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </div>

        {/* Thin brass divider */}
        <div className="mobile-footer-fade w-24 h-[1px] bg-[#B98532]/40 mb-12" />

        {/* Final CTA */}
        <div className="mobile-footer-fade mb-20">
          <Link href="/reservation" className="font-serif italic text-[20px] text-[#A63A4B] hover:text-[#B98532] transition-colors flex items-center gap-2 group">
            Reserve Your Table
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>

        {/* Thin brass divider */}
        <div className="mobile-footer-fade w-24 h-[1px] bg-[#B98532]/40 mb-12" />

        {/* Studio Signature */}
        <div className="mobile-footer-fade flex flex-col items-center">
          <span className="font-mono text-[9px] text-[#B98532]/80 tracking-[0.2em] mb-4">
            EXPERIENCE DESIGN
          </span>
          <a href="https://akaristudios.com" className="font-sans text-[12px] uppercase tracking-[0.2em] font-medium text-[#F8F6F1] hover:text-[#B98532] transition-colors mb-2">
            AKARI STUDIOS
          </a>
          <span className="font-sans text-[10px] uppercase tracking-widest text-[#F8F6F1]/50">
            Mumbai &bull; India
          </span>
        </div>

      </div>
    </footer>
  );
}
