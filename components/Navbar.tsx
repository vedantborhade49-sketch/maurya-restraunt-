"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTableStore } from "../stores/table-store";
import TableIcon from "./navigation/TableIcon";
import { Menu, X } from "lucide-react";
export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { setIsOpen } = useTableStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    // Scroll listener to toggle minimal vs expanded navbar
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial entrance animation
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.8, ease: "power4.out" }
    );

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAdmin) return null;

  const navItems = [
    { label: "The Menu", href: "/menu" },
    { label: "Our Story", href: "/#story" },
    { label: "Visit", href: "/book-a-table" },
  ];

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between rounded-full border transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] h-16 ${
          isScrolled 
            ? "w-[92%] max-w-5xl px-8 border-[#B98532]/25 bg-[#0b0908]/90 shadow-[0_10px_40px_rgba(185,133,50,0.12)]" 
            : "w-[180px] md:w-[220px] px-5 border-[#B98532]/35 bg-[#0b0908]/95 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
        }`}
        id="main-navbar"
      >
        {/* Logo wrapped in an ivory backing card for high visibility & contrast */}
        <Link href="/" className="flex items-center shrink-0">
          <div className="bg-[#F3E8D4]/90 p-1.5 rounded-xl border border-[#B98532]/40 flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-105">
            <img
              src="/morya-logo.png"
              alt="Maurya"
              className={`w-auto object-contain transition-all duration-500 ${
                isScrolled ? "h-9" : "h-8"
              }`}
            />
          </div>
        </Link>

        {/* Center Nav items (Desktop only) - Animate width and opacity */}
        <div 
          className={`hidden md:flex items-center justify-center gap-8 font-sans text-[10px] uppercase tracking-[0.18em] text-[#F3E8D4]/80 transition-all duration-500 overflow-hidden ${
            isScrolled 
              ? "opacity-100 max-w-lg pointer-events-auto mx-4" 
              : "opacity-0 max-w-0 pointer-events-none"
          }`}
        >
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="group relative cursor-pointer py-1"
            >
              <span className="inline-block transition-all duration-300 group-hover:text-gold">
                {item.label}
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        {/* Actions / Right end */}
        <div className="flex items-center gap-4">
          {/* Table Cart trigger */}
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="Your Table"
          >
            <TableIcon />
            {isScrolled && (
              <span className="hidden md:inline font-sans text-[9px] uppercase tracking-[0.2em] text-gold font-bold transition-all duration-300 animate-[fadeIn_0.5s_ease-out]">
                Your Table
              </span>
            )}
          </button>

          {/* Mobile hamburger menu (shows only when collapsed/not scrolled on mobile) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-[#F3E8D4] hover:text-gold transition-colors"
            aria-label="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#0b0908] flex flex-col justify-between p-8 transition-transform duration-500 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-12">
            <img src="/morya-logo.png" alt="Maurya" className="h-8 w-auto object-contain" />
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#F3E8D4] hover:text-gold transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-8 font-heading italic text-4xl text-[#F3E8D4]">
            {navItems.map((item, i) => (
              <Link 
                key={i} 
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setIsOpen(true);
              }}
              className="text-left hover:text-gold transition-colors"
            >
              Your Table
            </button>
          </nav>
        </div>

        <div className="border-t border-white/5 pt-6 text-[10px] tracking-[0.18em] uppercase text-[#F3E8D4]/40 font-sans">
          KONDHWA · PUNE
        </div>
      </div>
    </>
  );
}
