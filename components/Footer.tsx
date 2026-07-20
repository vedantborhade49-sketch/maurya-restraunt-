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
      className="relative w-full bg-[#161413] text-[#F8F5EF] pt-16 pb-12 overflow-hidden font-sans select-none z-30"
    >
      {/* ── TORN HANDMADE PAPER TOP EDGE TRANSITION ────────────────────── */}
      <div className="absolute -top-7 left-0 w-full overflow-hidden leading-none pointer-events-none drop-shadow-[0_-6px_12px_rgba(0,0,0,0.25)] z-20">
        <svg
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          className="w-full h-8 text-[#F8F5EF] fill-current"
        >
          <path d="M0,0 L1200,0 L1200,20 Q1170,32 1140,24 Q1110,6 1080,16 Q1050,30 1020,22 Q990,4 960,14 Q930,32 900,24 Q870,8 840,18 Q810,34 780,26 Q750,6 720,16 Q690,32 660,20 Q630,4 600,12 Q570,30 540,24 Q510,8 480,18 Q450,32 420,20 Q390,4 360,14 Q330,30 300,22 Q270,6 240,16 Q210,34 180,26 Q150,8 120,18 Q90,32 60,24 Q30,12 0,22 Z" />
        </svg>
      </div>

      <div className="container-maurya relative z-10 pt-4 space-y-12">
        
        {/* ── 4 COMPACT CALM COLUMNS ───────────────────────────────────────── */}
        <div className="content-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 text-left">
          
          {/* Column 1: MAURYA / VISIT */}
          <div className="quiet-goodbye-col space-y-4">
            <h3 className="font-heading text-xl text-[#F8F5EF] tracking-wider uppercase font-semibold">
              MAURYA
            </h3>
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
