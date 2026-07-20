"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { 
  Leaf, 
  Clock, 
  Users, 
  Home as HomeIcon, 
  ShoppingBag, 
  MessageSquare,
  Instagram,
  Facebook,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight
} from "lucide-react";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

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

      // 1. Closing Statement Heading (Fade up 40px, 1.0s)
      tl.fromTo(
        ".footer-closing-heading",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "power4.out" }
      );

      // 2. Paragraph (80ms delay)
      tl.fromTo(
        ".footer-closing-text",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.72"
      );

      // 3. CTA Buttons
      tl.fromTo(
        ".footer-cta-buttons",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.64"
      );

      // 4. Brass Divider Draw (Center outward, 0.6s)
      tl.fromTo(
        ".footer-divider-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "expo.out", transformOrigin: "center center" },
        "-=0.5"
      );

      // 5. Logo Fade and Scale (0.95 -> 1, 0.7s)
      tl.fromTo(
        ".footer-logo",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
        "-=0.45"
      );

      // 6. Navigation Columns (Staggered 80ms)
      tl.fromTo(
        ".footer-nav-col",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" },
        "-=0.4"
      );

      // 7. Restaurant Info Strip
      tl.fromTo(
        ".footer-info-strip",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      );

      // 8. Social Links
      tl.fromTo(
        ".footer-social-links",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      );

      // 9. Copyright
      tl.fromTo(
        ".footer-copyright",
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.1"
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const restaurantInfoItems = [
    { icon: Leaf, label: "PURE VEGETARIAN" },
    { icon: Clock, label: "OPEN DAILY (11 AM — 11 PM)" },
    { icon: Users, label: "FAMILY DINING" },
    { icon: HomeIcon, label: "INDOOR & GARDEN SEATING" },
    { icon: ShoppingBag, label: "TAKEAWAY & DELIVERY" },
    { icon: MessageSquare, label: "WHATSAPP ORDERING" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#F8F6F1] text-[#350709] border-t border-[#B98532] pt-24 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden font-sans select-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoise)' opacity='0.02'/%3E%3C/svg%3E")`,
      }}
    >
      <div className="max-w-[1320px] mx-auto space-y-20">

        {/* ── SECTION 1: CLOSING STATEMENT ─────────────────────────────── */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h2 className="footer-closing-heading font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#350709] leading-[0.95] tracking-tight font-normal">
            <span>COME HUNGRY</span>
            <br />
            <span className="italic font-serif text-[#B98532] block mt-2">
              LEAVE WITH A STORY
            </span>
          </h2>

          <p className="footer-closing-text font-sans text-sm md:text-base lg:text-lg text-[#350709]/80 max-w-[640px] mx-auto leading-relaxed pt-2">
            Every meal at Maurya is crafted with fresh ingredients, authentic flavours,
            and warm hospitality.
          </p>
        </div>

        {/* ── SECTION 2: PRIMARY CALL TO ACTION ────────────────────────── */}
        <div className="footer-cta-buttons flex flex-col sm:flex-row items-center justify-center gap-5 pt-2">
          {/* Primary Button */}
          <Link
            href="/menu"
            className="w-full sm:w-auto min-h-[48px] px-10 py-3.5 bg-[#350709] hover:bg-[#250406] text-[#F8F6F1] font-mono text-[11px] uppercase tracking-[0.25em] font-bold rounded-none flex items-center justify-center transition-transform duration-250 hover:-translate-y-0.5 active:translate-y-0 shadow-none"
          >
            Reserve A Table
          </Link>

          {/* Secondary Button */}
          <a
            href="https://wa.me/917030777051"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[48px] px-10 py-3.5 bg-transparent border border-[#B98532] text-[#350709] hover:bg-[#350709] hover:text-[#F8F6F1] hover:border-[#350709] font-mono text-[11px] uppercase tracking-[0.25em] font-bold rounded-none flex items-center justify-center transition-all duration-250 hover:-translate-y-0.5 active:translate-y-0"
          >
            Order on WhatsApp
          </a>
        </div>

        {/* ── SECTION 3: DECORATIVE DIVIDER & LOGO ────────────────────── */}
        <div className="relative py-8 flex items-center justify-center">
          {/* Thin Brass Divider Line */}
          <div
            ref={dividerRef}
            className="footer-divider-line absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#B98532]/40 w-full"
          />

          {/* Centered Logo Badge */}
          <div
            ref={logoRef}
            className="footer-logo relative z-10 bg-[#F8F6F1] px-8 py-2 flex items-center justify-center"
          >
            <img
              src="/morya-logo.png"
              alt="Maurya Pure Veg"
              className="h-[70px] w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* ── SECTION 4: FOOTER NAVIGATION (4 COLUMNS) ──────────────────── */}
        <nav aria-label="Footer Navigation" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 pt-4">
          
          {/* Column 1: EXPLORE */}
          <div className="footer-nav-col space-y-6">
            <h3 className="font-mono text-xs text-[#B98532] font-bold uppercase tracking-[0.25em]">
              EXPLORE
            </h3>
            <ul className="space-y-3.5 text-sm font-medium text-[#350709]/80">
              <li>
                <Link href="/menu" className="group inline-flex items-center gap-1 hover:text-[#350709] transition-colors">
                  <span>The Menu</span>
                  <span className="h-[1px] w-0 bg-[#350709] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="group inline-flex items-center gap-1 hover:text-[#350709] transition-colors">
                  <span>Our Story</span>
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
                <Link href="/group-dining" className="group inline-flex items-center gap-1 hover:text-[#350709] transition-colors">
                  <span>Group Dining</span>
                  <span className="h-[1px] w-0 bg-[#350709] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="group inline-flex items-center gap-1 hover:text-[#350709] transition-colors">
                  <span>Guest Reviews</span>
                  <span className="h-[1px] w-0 bg-[#350709] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: VISIT */}
          <div className="footer-nav-col space-y-6">
            <h3 className="font-mono text-xs text-[#B98532] font-bold uppercase tracking-[0.25em]">
              VISIT
            </h3>
            <address className="not-italic space-y-3.5 text-sm font-medium text-[#350709]/80 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B98532] shrink-0 mt-0.5 stroke-[1.5]" />
                <span>
                  Maurya Pure Veg,<br />
                  Near Mithanagar, Kondhwa Khurd,<br />
                  Pune, Maharashtra 411048
                </span>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#B98532] shrink-0 stroke-[1.5]" />
                <span>11:00 AM — 11:00 PM Daily</span>
              </div>
              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Maurya+Pure+Veg+Kondhwa+Pune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.15em] text-[#B98532] font-bold hover:text-[#350709] transition-colors"
                >
                  <span>Get Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2]" />
                </a>
              </div>
            </address>
          </div>

          {/* Column 3: CONTACT */}
          <div className="footer-nav-col space-y-6">
            <h3 className="font-mono text-xs text-[#B98532] font-bold uppercase tracking-[0.25em]">
              CONTACT
            </h3>
            <ul className="space-y-3.5 text-sm font-medium text-[#350709]/80">
              <li>
                <a href="tel:+917030777051" className="inline-flex items-center gap-2.5 hover:text-[#350709] transition-colors">
                  <Phone className="w-4 h-4 text-[#B98532] shrink-0 stroke-[1.5]" />
                  <span>+91 70307 77051</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/917030777051" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-[#350709] transition-colors">
                  <MessageSquare className="w-4 h-4 text-[#B98532] shrink-0 stroke-[1.5]" />
                  <span>WhatsApp Direct</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@mauryaveg.com" className="inline-flex items-center gap-2.5 hover:text-[#350709] transition-colors">
                  <Mail className="w-4 h-4 text-[#B98532] shrink-0 stroke-[1.5]" />
                  <span>contact@mauryaveg.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: FOLLOW */}
          <div className="footer-nav-col space-y-6">
            <h3 className="font-mono text-xs text-[#B98532] font-bold uppercase tracking-[0.25em]">
              FOLLOW
            </h3>
            <ul className="space-y-3.5 text-sm font-medium text-[#350709]/80">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#350709] transition-colors">
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B98532] stroke-[2]" />
                </a>
              </li>
              <li>
                <Link href="/reviews" className="inline-flex items-center gap-2 hover:text-[#350709] transition-colors">
                  <span>Google Reviews (4.5★)</span>
                </Link>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#350709] transition-colors">
                  <span>Facebook</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B98532] stroke-[2]" />
                </a>
              </li>
            </ul>
          </div>

        </nav>

        {/* ── SECTION 5: RESTAURANT INFORMATION STRIP ─────────────────── */}
        <div className="footer-info-strip border-t border-b border-[#B98532]/25 py-8 my-10">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-center">
            {restaurantInfoItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-[#B98532] stroke-[1.5]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-[#350709]/90">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── SECTION 6: SOCIAL LINKS & COPYRIGHT ─────────────────────── */}
        <div className="space-y-6 pt-4">

          {/* Social Links Row */}
          <div className="footer-social-links flex items-center justify-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-3 border border-[#B98532]/30 text-[#350709]/70 hover:text-[#350709] hover:border-[#350709] transition-all duration-250 hover:-translate-y-0.5"
            >
              <Instagram className="w-4 h-4 stroke-[1.5]" />
            </a>
            <a
              href="https://wa.me/917030777051"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-3 border border-[#B98532]/30 text-[#350709]/70 hover:text-[#350709] hover:border-[#350709] transition-all duration-250 hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4 stroke-[1.5]" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-3 border border-[#B98532]/30 text-[#350709]/70 hover:text-[#350709] hover:border-[#350709] transition-all duration-250 hover:-translate-y-0.5"
            >
              <Facebook className="w-4 h-4 stroke-[1.5]" />
            </a>
          </div>

          {/* Copyright Text */}
          <div className="footer-copyright text-center space-y-1.5 pt-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#350709]/60">
              © 2026 Maurya Pure Veg. All rights reserved.
            </p>
            <p className="font-serif italic text-xs text-[#350709]/50">
              Crafted with care by Akari Studios
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}
