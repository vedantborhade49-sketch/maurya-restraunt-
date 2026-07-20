"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { 
  Instagram, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUpRight, 
  MessageSquare 
} from "lucide-react";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import ButtonSecondary from "@/components/ui/ButtonSecondary";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".quiet-goodbye-col",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
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
    <footer
      ref={footerRef}
      className="relative w-full bg-[#161413] text-[#F8F5EF] pt-20 pb-16 font-sans select-none z-30"
    >
      {/* ── AUTHENTIC ORGANIC TORN PAPER EDGE TRANSITION ────────────────── */}
      <div className="absolute top-0 left-0 w-full -translate-y-[99%] pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)] z-30 leading-none">
        
        {/* Layer 1: Under-Tear Deckle Paper Shadow Accent */}
        <svg
          viewBox="0 0 1200 45"
          preserveAspectRatio="none"
          className="w-full h-10 md:h-14 text-[#EFE8DB] fill-current absolute top-1 left-0 opacity-80"
        >
          <path d="M0,0 L1200,0 L1200,20 C1160,30 1120,16 1080,24 C1040,32 1000,18 960,26 C920,14 880,22 840,16 C800,10 760,24 720,18 C680,12 640,26 600,18 C560,10 520,22 480,16 C440,24 400,14 360,22 C320,30 280,18 240,24 C200,14 160,22 120,16 C80,10 40,22 0,16 Z" />
        </svg>

        {/* Layer 2: Main Ivory Ripped Paper Sheet */}
        <svg
          viewBox="0 0 1200 45"
          preserveAspectRatio="none"
          className="w-full h-10 md:h-14 text-[#F8F5EF] fill-current relative"
        >
          <path d="M0,0 L1200,0 L1200,18 C1170,26 1140,14 1110,22 C1080,30 1050,16 1020,24 C990,32 960,18 930,26 C900,14 870,22 840,16 C810,10 780,24 750,18 C720,12 690,26 660,18 C630,10 600,22 570,16 C540,24 510,14 480,22 C450,30 420,18 390,24 C360,14 330,22 300,16 C270,10 240,24 210,18 C180,12 150,22 120,16 C90,24 60,14 30,22 C15,18 0,20 0,20 Z" />
        </svg>

      </div>

      <div className="container-maurya relative z-10 pt-4 space-y-14">
        
        {/* ── 4 CALM COLUMNS ───────────────────────────────────────────────── */}
        <div className="content-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 text-left">
          
          {/* Column 1: MAURYA LOGO / VISIT */}
          <div className="quiet-goodbye-col space-y-4">
            <Link href="/" className="inline-block">
              <img
                src="/morya-logo.png"
                alt="Maurya"
                className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </Link>
            <div className="space-y-2.5 text-sm md:text-base font-light text-[#F8F5EF]/80 leading-relaxed">
              <p className="font-serif italic font-medium text-base md:text-lg text-[#F8F5EF]">Pure Veg Heritage</p>
              <p>Shop 1/2, Near Tilekar Nagar, Kamthe Pat, Kondhwa Khurd, Pune 411048</p>
              <p className="text-[#9A5C3B] font-mono text-xs sm:text-sm pt-1">Open Daily: 11:00 AM – 11:00 PM</p>
              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Maurya+Pure+Veg+Restaurant+Kondhwa+Pune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#F8F5EF] hover:text-[#9A5C3B] transition-colors font-mono text-xs sm:text-sm uppercase tracking-wider font-bold"
                >
                  <span>Get Directions</span>
                  <ArrowUpRight className="w-4 h-4 text-[#9A5C3B]" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: EXPLORE */}
          <div className="quiet-goodbye-col space-y-4">
            <h3 className="font-mono text-sm text-[#9A5C3B] font-bold uppercase tracking-[0.25em]">
              EXPLORE
            </h3>
            <ul className="space-y-3 text-sm md:text-base font-light text-[#F8F5EF]/80">
              <li>
                <Link href="/menu" className="hover:text-[#9A5C3B] transition-colors">
                  The Menu
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-[#9A5C3B] transition-colors">
                  Around Our Table
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#9A5C3B] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/visit#reserve" className="hover:text-[#9A5C3B] transition-colors">
                  Reserve A Table
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: CONTACT */}
          <div className="quiet-goodbye-col space-y-4">
            <h3 className="font-mono text-sm text-[#9A5C3B] font-bold uppercase tracking-[0.25em]">
              CONTACT
            </h3>
            <ul className="space-y-3 text-sm md:text-base font-light text-[#F8F5EF]/80">
              <li>
                <a href="tel:+917030777051" className="inline-flex items-center gap-2.5 hover:text-[#9A5C3B] transition-colors">
                  <Phone className="w-4 h-4 text-[#9A5C3B]" />
                  <span>+91 70307 77051</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/917030777051" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-[#9A5C3B] transition-colors">
                  <MessageSquare className="w-4 h-4 text-[#9A5C3B]" />
                  <span>WhatsApp Booking</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@mauryapureveg.com" className="inline-flex items-center gap-2.5 hover:text-[#9A5C3B] transition-colors">
                  <Mail className="w-4 h-4 text-[#9A5C3B]" />
                  <span>info@mauryapureveg.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: FOLLOW */}
          <div className="quiet-goodbye-col space-y-4">
            <h3 className="font-mono text-sm text-[#9A5C3B] font-bold uppercase tracking-[0.25em]">
              FOLLOW
            </h3>
            <ul className="space-y-3 text-sm md:text-base font-light text-[#F8F5EF]/80">
              <li>
                <a
                  href="https://www.instagram.com/restaurant_mauryaveg?igsh=djFnNDV6N2c1dTN1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-[#9A5C3B] transition-colors group"
                >
                  <Instagram className="w-4 h-4 text-[#9A5C3B]" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Maurya+Pure+Veg+Restaurant+Kondhwa+Pune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#9A5C3B] transition-colors"
                >
                  <span>Google Reviews (4.8★)</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ── BOTTOM COPYRIGHT & SIGNATURE STRIP ──────────────────────────── */}
        <div className="content-grid pt-8 border-t border-[#9A5C3B]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left font-mono text-xs sm:text-sm text-[#F8F5EF]/60">
          <p>© 2026 Maurya Pure Veg. All rights reserved.</p>

          <p className="flex items-center gap-1.5">
            <span>Crafted by</span>
            <a
              href="https://akaristudios.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#F8F5EF] hover:text-[#9A5C3B] transition-colors tracking-wider"
            >
              AKARI STUDIOS
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
