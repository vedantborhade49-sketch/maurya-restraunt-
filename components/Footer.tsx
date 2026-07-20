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
      className="relative w-full bg-[#161413] text-[#F8F5EF] pt-16 pb-12 font-sans select-none z-30"
    >
      {/* ── REALISTIC ORGANIC TORN PAPER EDGE TRANSITION (MATCHING USER REFERENCE) ── */}
      <div className="absolute top-0 left-0 w-full -translate-y-[98%] pointer-events-none drop-shadow-[0_14px_22px_rgba(0,0,0,0.38)] z-30 leading-none">
        
        {/* Layer 1: Under-Tear Deckle Paper Shadow Layer */}
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-full h-12 md:h-16 text-[#EFE8DB] fill-current absolute top-1 left-0 opacity-85"
        >
          <path d="M0,60 L0,44 L20,46 L35,42 L50,48 L65,44 L80,49 L95,45 L110,50 L130,47 L150,51 L170,48 L190,54 L210,50 L230,55 L250,51 L270,54 L290,48 L310,52 L330,47 L350,50 L370,45 L390,48 L410,41 L430,44 L450,37 L470,40 L490,33 L510,36 L530,29 L550,33 L570,24 L590,28 L610,20 L630,25 L650,17 L670,22 L690,16 L710,20 L730,18 L750,24 L770,19 L790,26 L810,21 L830,28 L850,22 L870,30 L890,24 L910,33 L930,27 L950,35 L970,30 L990,38 L1010,32 L1030,40 L1050,36 L1070,42 L1090,38 L1110,44 L1130,40 L1150,46 L1170,42 L1190,47 L1200,45 L1200,60 Z" />
        </svg>

        {/* Layer 2: Main Ivory Ripped Paper Sheet (Top section paper) */}
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-full h-12 md:h-16 text-[#F8F5EF] fill-current relative"
        >
          <path d="M0,60 L0,42 L20,44 L35,40 L50,46 L65,42 L80,47 L95,43 L110,48 L130,45 L150,49 L170,46 L190,52 L210,48 L230,53 L250,49 L270,52 L290,46 L310,50 L330,45 L350,48 L370,43 L390,46 L410,39 L430,42 L450,35 L470,38 L490,31 L510,34 L530,27 L550,31 L570,22 L590,26 L610,18 L630,23 L650,15 L670,20 L690,14 L710,18 L730,16 L750,22 L770,17 L790,24 L810,19 L830,26 L850,20 L870,28 L890,22 L910,31 L930,25 L950,33 L970,28 L990,36 L1010,30 L1030,38 L1050,34 L1070,40 L1090,36 L1110,42 L1130,38 L1150,44 L1170,40 L1190,45 L1200,43 L1200,60 Z" />
        </svg>

      </div>

      <div className="container-maurya relative z-10 pt-4 space-y-12">
        
        {/* ── 4 COMPACT CALM COLUMNS ───────────────────────────────────────── */}
        <div className="content-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 text-left">
          
          {/* Column 1: MAURYA LOGO / VISIT */}
          <div className="quiet-goodbye-col space-y-4">
            <Link href="/" className="inline-block">
              <img
                src="/morya-logo.png"
                alt="Maurya"
                className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </Link>
            <div className="space-y-2 text-xs font-light text-[#F8F5EF]/75 leading-relaxed">
              <p className="font-serif italic font-medium text-sm text-[#F8F5EF]">Pure Veg Heritage</p>
              <p>Shop 1/2, Near Tilekar Nagar, Kamthe Pat, Kondhwa Khurd, Pune 411048</p>
              <p className="text-[#9A5C3B] font-mono text-[11px] pt-1">Open Daily: 11:00 AM – 11:00 PM</p>
              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Maurya+Pure+Veg+Restaurant+Kondhwa+Pune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#F8F5EF] hover:text-[#9A5C3B] transition-colors font-mono text-[10px] uppercase tracking-wider font-bold"
                >
                  <span>Get Directions</span>
                  <ArrowUpRight className="w-3 h-3 text-[#9A5C3B]" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: EXPLORE */}
          <div className="quiet-goodbye-col space-y-4">
            <h3 className="font-mono text-xs text-[#9A5C3B] font-bold uppercase tracking-[0.25em]">
              EXPLORE
            </h3>
            <ul className="space-y-2.5 text-xs font-light text-[#F8F5EF]/75">
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
            <h3 className="font-mono text-xs text-[#9A5C3B] font-bold uppercase tracking-[0.25em]">
              CONTACT
            </h3>
            <ul className="space-y-2.5 text-xs font-light text-[#F8F5EF]/75">
              <li>
                <a href="tel:+917030777051" className="inline-flex items-center gap-2 hover:text-[#9A5C3B] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#9A5C3B]" />
                  <span>+91 70307 77051</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/917030777051" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#9A5C3B] transition-colors">
                  <MessageSquare className="w-3.5 h-3.5 text-[#9A5C3B]" />
                  <span>WhatsApp Booking</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@mauryapureveg.com" className="inline-flex items-center gap-2 hover:text-[#9A5C3B] transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#9A5C3B]" />
                  <span>info@mauryapureveg.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: FOLLOW */}
          <div className="quiet-goodbye-col space-y-4">
            <h3 className="font-mono text-xs text-[#9A5C3B] font-bold uppercase tracking-[0.25em]">
              FOLLOW
            </h3>
            <ul className="space-y-2.5 text-xs font-light text-[#F8F5EF]/75">
              <li>
                <a
                  href="https://www.instagram.com/restaurant_mauryaveg?igsh=djFnNDV6N2c1dTN1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#9A5C3B] transition-colors group"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#9A5C3B]" />
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
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#9A5C3B] transition-colors"
                >
                  <span>Facebook</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ── BOTTOM COPYRIGHT & SIGNATURE STRIP ──────────────────────────── */}
        <div className="content-grid pt-8 border-t border-[#9A5C3B]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left font-mono text-[10px] text-[#F8F5EF]/50">
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
