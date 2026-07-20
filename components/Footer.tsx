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
      {/* ── REALISTIC ORGANIC TORN PAPER EDGE TRANSITION ────────────────── */}
      <div className="absolute top-0 left-0 w-full -translate-y-[98%] pointer-events-none drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)] z-30 leading-none">
        
        {/* Layer 1: Under-Tear Deckle Paper Shadow Layer */}
        <svg
          viewBox="0 0 1200 45"
          preserveAspectRatio="none"
          className="w-full h-10 md:h-12 text-[#EFE8DB] fill-current absolute top-1 left-0 opacity-80"
        >
          <path d="M0,45 L0,20 L14,26 L24,14 L33,23 L45,11 L56,25 L70,16 L83,27 L94,12 L107,21 L120,9 L134,24 L148,14 L161,27 L175,11 L188,21 L203,13 L216,26 L230,10 L243,20 L258,14 L272,28 L285,13 L299,22 L314,8 L327,25 L341,15 L354,26 L369,11 L383,20 L396,12 L410,26 L424,14 L439,27 L452,10 L466,21 L480,13 L494,25 L509,9 L523,23 L536,15 L551,27 L565,12 L578,20 L593,10 L607,26 L620,14 L634,25 L648,11 L662,21 L676,12 L691,26 L705,15 L719,27 L733,10 L746,22 L760,13 L775,25 L789,9 L803,23 L816,15 L831,27 L845,12 L858,20 L873,10 L887,26 L900,14 L914,25 L928,11 L942,21 L956,12 L971,26 L985,15 L999,27 L1013,10 L1026,22 L1040,13 L1055,25 L1069,9 L1083,23 L1096,15 L1111,27 L1125,12 L1138,20 L1153,10 L1167,26 L1180,14 L1194,23 L1200,16 L1200,45 Z" />
        </svg>

        {/* Layer 2: Main Jagged Ripped Paper Sheet */}
        <svg
          viewBox="0 0 1200 45"
          preserveAspectRatio="none"
          className="w-full h-10 md:h-12 text-[#F8F5EF] fill-current relative"
        >
          <path d="M0,45 L0,18 L12,24 L22,12 L31,21 L43,9 L54,23 L68,14 L81,25 L92,10 L105,19 L118,7 L132,22 L146,12 L159,25 L173,9 L186,19 L201,11 L214,24 L228,8 L241,18 L256,12 L270,26 L283,11 L297,20 L312,6 L325,23 L339,13 L352,24 L367,9 L381,18 L394,10 L408,24 L422,12 L437,25 L450,8 L464,19 L478,11 L492,23 L507,7 L521,21 L534,13 L549,25 L563,10 L576,18 L591,8 L605,24 L618,12 L632,23 L646,9 L660,19 L674,10 L689,24 L703,13 L717,25 L731,8 L744,20 L758,11 L773,23 L787,7 L801,21 L814,13 L829,25 L843,10 L856,18 L871,8 L885,24 L898,12 L912,23 L926,9 L940,19 L954,10 L969,24 L983,13 L997,25 L1011,8 L1024,20 L1038,11 L1053,23 L1067,7 L1081,21 L1094,13 L1109,25 L1123,10 L1136,18 L1151,8 L1165,24 L1178,12 L1192,21 L1200,14 L1200,45 Z" />
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
