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
  MessageSquare, 
  Calendar 
} from "lucide-react";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import ButtonSecondary from "@/components/ui/ButtonSecondary";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const ornamentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // 1. Closing statement & buttons fade-up
      tl.fromTo(
        ".quiet-goodbye-closing",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // 2. Center brass ornament draw outward
      tl.fromTo(
        ornamentRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.7, ease: "expo.out", transformOrigin: "center center" },
        "-=0.4"
      );

      // 3. 4-Column Grid Rise (Staggered)
      tl.fromTo(
        ".quiet-goodbye-col",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" },
        "-=0.3"
      );

      // 4. Copyright & Akari Signature fade
      tl.fromTo(
        ".quiet-goodbye-bottom",
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#F8F6F1] text-[#350709] border-t border-[#B98532]/30 py-16 md:py-20 px-6 md:px-12 lg:px-20 overflow-hidden font-sans select-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoise)' opacity='0.02'/%3E%3C/svg%3E")`,
      }}
    >
      <div className="max-w-[1240px] mx-auto space-y-12">
        
        {/* ── SECTION 1 & 2: CLOSING STATEMENT & CTAS ─────────────────────── */}
        <div className="quiet-goodbye-closing text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#350709] tracking-tight leading-tight">
            COME HUNGRY.<br />
            <span className="italic text-[#B98532]">LEAVE WITH A STORY.</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#350709]/80 font-light max-w-md mx-auto">
            Thank you for sharing your table with us. We look forward to welcoming you again.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/menu">
              <ButtonPrimary className="w-full sm:w-auto bg-[#350709] text-[#F8F6F1] hover:bg-[#B98532] hover:text-[#350709] text-xs py-3 px-6">
                Reserve A Table
              </ButtonPrimary>
            </Link>

            <a
              href="https://wa.me/917030777051"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <ButtonSecondary className="w-full sm:w-auto border-[#350709] text-[#350709] hover:bg-[#350709] hover:text-[#F8F6F1] text-xs py-3 px-6">
                Order On WhatsApp
              </ButtonSecondary>
            </a>
          </div>
        </div>

        {/* ── SECTION 3: CENTER BRASS ORNAMENT ─────────────────────────────── */}
        <div
          ref={ornamentRef}
          className="flex items-center justify-center gap-4 text-[#B98532] py-2 max-w-xl mx-auto"
        >
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#B98532]/40 to-[#B98532]" />
          <span className="text-sm font-serif italic font-bold">❖</span>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#B98532]/40 to-[#B98532]" />
        </div>

        {/* ── SECTION 4: EXACTLY FOUR COLUMNS GRID ──────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pt-4 text-center sm:text-left">
          
          {/* Column 1: VISIT */}
          <div className="quiet-goodbye-col space-y-4">
            <h3 className="font-mono text-xs text-[#B98532] font-bold uppercase tracking-[0.25em]">
              VISIT
            </h3>
            <div className="space-y-2 text-xs font-medium text-[#350709]/80 leading-relaxed">
              <p className="font-serif italic font-bold text-sm text-[#350709]">Maurya Pure Veg</p>
              <p>Shop 1/2, Near Tilekar Nagar, Kamthe Pat, Kondhwa Khurd, Pune 411048</p>
              <p className="text-[#B98532] font-mono text-[11px] pt-1">Open Daily: 11:00 AM – 11:00 PM</p>
              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Maurya+Pure+Veg+Restaurant+Kondhwa+Pune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#350709] hover:text-[#B98532] transition-colors font-mono text-[10px] uppercase tracking-wider font-bold"
                >
                  <span>Get Directions</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: EXPLORE */}
          <div className="quiet-goodbye-col space-y-4">
            <h3 className="font-mono text-xs text-[#B98532] font-bold uppercase tracking-[0.25em]">
              EXPLORE
            </h3>
            <ul className="space-y-2.5 text-xs font-medium text-[#350709]/80">
              <li>
                <Link href="/menu" className="group inline-flex items-center gap-1 hover:text-[#350709] transition-colors">
                  <span>The Menu</span>
                  <span className="h-[1px] w-0 bg-[#350709] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="group inline-flex items-center gap-1 hover:text-[#350709] transition-colors">
                  <span>The Maurya Experience</span>
                  <span className="h-[1px] w-0 bg-[#350709] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="group inline-flex items-center gap-1 hover:text-[#350709] transition-colors">
                  <span>Gallery</span>
                  <span className="h-[1px] w-0 bg-[#350709] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
              <li>
                <Link href="/menu" className="group inline-flex items-center gap-1 hover:text-[#350709] transition-colors">
                  <span>Reserve A Table</span>
                  <span className="h-[1px] w-0 bg-[#350709] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: CONTACT */}
          <div className="quiet-goodbye-col space-y-4">
            <h3 className="font-mono text-xs text-[#B98532] font-bold uppercase tracking-[0.25em]">
              CONTACT
            </h3>
            <ul className="space-y-2.5 text-xs font-medium text-[#350709]/80">
              <li>
                <a href="tel:+917030777051" className="inline-flex items-center justify-center sm:justify-start gap-2 hover:text-[#350709] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#B98532]" />
                  <span>+91 70307 77051</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/917030777051" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center sm:justify-start gap-2 hover:text-[#350709] transition-colors">
                  <MessageSquare className="w-3.5 h-3.5 text-[#B98532]" />
                  <span>WhatsApp Reservation</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@mauryapureveg.com" className="inline-flex items-center justify-center sm:justify-start gap-2 hover:text-[#350709] transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#B98532]" />
                  <span>info@mauryapureveg.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: FOLLOW */}
          <div className="quiet-goodbye-col space-y-4">
            <h3 className="font-mono text-xs text-[#B98532] font-bold uppercase tracking-[0.25em]">
              FOLLOW
            </h3>
            <ul className="space-y-2.5 text-xs font-medium text-[#350709]/80">
              <li>
                <a
                  href="https://www.instagram.com/restaurant_mauryaveg?igsh=djFnNDV6N2c1dTN1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center sm:justify-start gap-2 hover:text-[#350709] transition-colors group"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#B98532] transition-transform duration-200 group-hover:-translate-y-0.5" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Maurya+Pure+Veg+Restaurant+Kondhwa+Pune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center sm:justify-start gap-2 hover:text-[#350709] transition-colors"
                >
                  <span>Google Reviews (4.8★)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center sm:justify-start gap-2 hover:text-[#350709] transition-colors"
                >
                  <span>Facebook</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ── SECTION 5: BOTTOM COPYRIGHT STRIP & AKARI STUDIOS SIGNATURE ───── */}
        <div className="quiet-goodbye-bottom pt-8 border-t border-[#B98532]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left font-mono text-[10px] text-[#350709]/60">
          <p>© {new Date().getFullYear()} Maurya Pure Veg. All rights reserved.</p>

          <p className="flex items-center gap-1">
            <span>Crafted with precision by</span>
            <a
              href="https://akaristudios.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#350709] hover:text-[#B98532] transition-colors underline underline-offset-2"
            >
              AKARI STUDIOS
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
