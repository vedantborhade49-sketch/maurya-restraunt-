"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import MobileFooter from "@/sections/MobileV2/MobileFooter";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-fade-elem",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
    <footer
      ref={footerRef}
      className="hidden md:flex relative w-full bg-[#1A1716] text-[#F8F6F1] pt-32 pb-24 font-sans select-none z-30 flex-col items-center text-center overflow-hidden"
    >
      {/* Background Texture & Vignette */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-overlay pointer-events-none" />

      {/* ── AUTHENTIC ORGANIC TORN PAPER EDGE TRANSITION ────────────────── */}
      <div className="absolute top-0 left-0 w-full -translate-y-[99%] pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] z-30 leading-none">
        {/* Main Ivory Ripped Paper Sheet */}
        <svg
          viewBox="0 0 1200 45"
          preserveAspectRatio="none"
          className="w-full h-10 md:h-14 text-[#F8F6F1] fill-current relative"
        >
          <path d="M0,0 L1200,0 L1200,18 C1170,26 1140,14 1110,22 C1080,30 1050,16 1020,24 C990,32 960,18 930,26 C900,14 870,22 840,16 C810,10 780,24 750,18 C720,12 690,26 660,18 C630,10 600,22 570,16 C540,24 510,14 480,22 C450,30 420,18 390,24 C360,14 330,22 300,16 C270,10 240,24 210,18 C180,12 150,22 120,16 C90,24 60,14 30,22 C15,18 0,20 0,20 Z" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center px-8">
        
        {/* Maurya Signature */}
        <div className="footer-fade-elem flex flex-col items-center mb-16">
          <img
            src="/morya-logo.png"
            alt="Maurya"
            className="h-[48px] w-auto object-contain brightness-0 invert opacity-90 mb-4"
          />
          <span className="font-serif italic font-light text-[18px] text-[#F8F6F1]/80">
            Since 1991
          </span>
        </div>

        {/* Thin brass divider */}
        <div className="footer-fade-elem w-24 h-[1px] bg-[#B98532]/40 mb-16" />

        {/* Final Quote */}
        <div className="footer-fade-elem mb-16">
          <p className="font-serif italic font-light text-[34px] leading-relaxed text-[#F8F6F1]">
            Come Hungry.<br />
            Leave With A Story.
          </p>
        </div>

        {/* Thin brass divider */}
        <div className="footer-fade-elem w-24 h-[1px] bg-[#B98532]/40 mb-16" />

        {/* Editorial Navigation */}
        <div className="footer-fade-elem flex items-center justify-center gap-12 mb-16">
          <Link href="/visit" className="font-sans text-[16px] font-normal tracking-wider text-[#F8F6F1] hover:text-[#B98532] transition-colors relative group">
            Visit
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B98532] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/menu" className="font-sans text-[16px] font-normal tracking-wider text-[#F8F6F1] hover:text-[#B98532] transition-colors relative group">
            Menu
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B98532] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/reservation" className="font-sans text-[16px] font-normal tracking-wider text-[#F8F6F1] hover:text-[#B98532] transition-colors relative group">
            Reserve
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B98532] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <a href="https://www.instagram.com/restaurant_mauryaveg?igsh=djFnNDV6N2c1dTN1" target="_blank" rel="noopener noreferrer" className="font-sans text-[16px] font-normal tracking-wider text-[#F8F6F1] hover:text-[#B98532] transition-colors relative group">
            Instagram
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B98532] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        {/* Thin brass divider */}
        <div className="footer-fade-elem w-24 h-[1px] bg-[#B98532]/40 mb-16" />

        {/* Final CTA */}
        <div className="footer-fade-elem mb-24">
          <Link href="/reservation" className="font-serif italic text-[24px] text-[#A63A4B] hover:text-[#B98532] transition-colors flex items-center gap-2 group">
            Reserve Your Table
            <span className="text-[20px] transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>

        {/* Studio Signature */}
        <div className="footer-fade-elem flex flex-col items-center">
          <div className="font-mono text-[9px] text-[#B98532]/80 tracking-[0.2em] mb-4">
            EXPERIENCE DESIGN
          </div>
          <a href="https://akaristudios.com" target="_blank" rel="noopener noreferrer" className="font-sans text-[12px] uppercase tracking-[0.2em] font-medium text-[#F8F6F1] hover:text-[#B98532] transition-colors mb-2">
            AKARI STUDIOS
          </a>
          <span className="font-sans text-[10px] uppercase tracking-widest text-[#F8F6F1]/50">
            Mumbai &bull; India
          </span>
        </div>

      </div>
    </footer>

    {/* Mobile Footer for V23 Rebuild */}
    <div className="md:hidden">
      <MobileFooter />
    </div>
    </>
  );
}
