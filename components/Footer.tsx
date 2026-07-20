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
      {/* ── REALISTIC BRUSH STROKE / DISTRESSED INK TEAR TOP EDGE (MATCHING USER REFERENCE) ── */}
      <div className="absolute top-0 left-0 w-full -translate-y-[99%] pointer-events-none z-30 leading-none overflow-visible">
        
        {/* Layer 1: Fine Dry-Brush Bristle Scratches & Floating Ink Texture */}
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-full h-12 md:h-16 text-[#161413] fill-none stroke-current opacity-70 absolute -top-1 left-0"
        >
          <path
            d="M50,12 L120,15 M180,9 L260,14 M340,18 L420,22 M520,10 L610,16 M700,8 L780,12 M850,14 L940,19 M1010,11 L1120,16"
            strokeWidth="1.5"
            strokeDasharray="4 2 8 3"
          />
          <path
            d="M20,16 L90,18 M290,12 L360,15 M480,24 L560,28 M640,12 L730,16 M810,10 L890,14 M980,18 L1060,21"
            strokeWidth="1.0"
            strokeDasharray="2 4 6 2"
          />
        </svg>

        {/* Layer 2: Main Dark Charcoal Painted Brush Stroke Body */}
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-full h-12 md:h-16 text-[#161413] fill-current relative"
        >
          <path d="M0,60 L0,18 L8,24 L14,19 L21,26 L27,21 L34,28 L40,23 L47,29 L53,24 L60,31 L66,26 L73,32 L79,27 L86,33 L92,28 L99,35 L105,30 L112,36 L118,31 L125,37 L131,32 L138,38 L144,33 L151,40 L157,35 L164,41 L170,36 L177,42 L183,37 L190,43 L196,38 L203,44 L209,39 L216,45 L222,40 L229,46 L235,41 L242,47 L248,42 L255,48 L261,43 L268,49 L274,44 L281,50 L287,45 L294,51 L300,46 L307,51 L313,46 L320,52 L326,47 L333,52 L339,47 L346,53 L352,48 L359,53 L365,48 L372,54 L378,49 L385,54 L391,49 L398,53 L404,48 L411,53 L417,48 L424,52 L430,47 L437,52 L443,47 L450,51 L456,46 L463,51 L469,46 L476,50 L482,45 L489,50 L495,45 L502,49 L508,44 L515,49 L521,44 L528,48 L534,43 L541,48 L547,43 L554,47 L560,42 L567,47 L573,42 L580,46 L586,41 L593,46 L599,41 L606,45 L612,40 L619,45 L625,40 L632,44 L638,39 L645,44 L651,39 L658,43 L664,38 L671,43 L677,38 L684,42 L690,37 L697,42 L703,37 L710,41 L716,36 L723,41 L729,36 L736,40 L742,35 L749,40 L755,35 L762,39 L768,34 L775,39 L781,34 L788,38 L794,33 L801,38 L807,33 L814,37 L820,32 L827,37 L833,32 L840,36 L846,31 L853,36 L859,31 L866,35 L872,30 L879,35 L885,30 L892,34 L898,29 L905,34 L911,29 L918,33 L924,28 L931,33 L937,28 L944,32 L950,27 L957,32 L963,27 L970,31 L976,26 L983,31 L989,26 L996,30 L1002,25 L1009,30 L1015,25 L1022,29 L1028,24 L1035,29 L1041,24 L1048,28 L1054,23 L1061,28 L1067,23 L1074,27 L1080,22 L1087,27 L1093,22 L1100,26 L1106,21 L1113,26 L1119,21 L1126,25 L1132,20 L1139,25 L1145,20 L1152,24 L1158,19 L1165,24 L1171,19 L1178,23 L1184,18 L1191,23 L1197,18 L1200,21 L1200,60 Z" />
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
