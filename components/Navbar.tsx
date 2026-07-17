"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTableStore } from "../stores/table-store";
import TableIcon from "./navigation/TableIcon";
import { Menu, X } from "lucide-react";
import { useTransition } from "./PageTransition";

// Magnetic Navigation Link Wrapper Component
interface MagneticLinkProps {
  href: string;
  isActive: boolean;
  prefix: string;
  label: string;
  isHeroMode: boolean;
  onClick: (e: React.MouseEvent, href: string) => void;
}

function MagneticLink({ href, isActive, prefix, label, isHeroMode, onClick }: MagneticLinkProps) {
  const [drift, setDrift] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // drift up to 6px toward cursor and lift by 2px on hover
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.15;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.15 - 2;
    setDrift({ x, y });
  };

  const handleMouseLeave = () => {
    setDrift({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <a
      href={href}
      onClick={(e) => onClick(e, href)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        transform: `translate3d(${drift.x}px, ${drift.y}px, 0)`,
        transition: drift.x === 0 ? "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
      }}
      className="group relative cursor-pointer py-1.5 transition-colors duration-300 block select-none nav-entrance-item"
    >
      {/* Numbers stacked directly above the Navigation labels */}
      <div className="flex flex-col items-center leading-none">
        <span className={`text-[11px] font-mono tracking-wider transition-opacity duration-300 ${
          isHeroMode ? "text-[#F3E8D4]/60" : "text-[#350709]/60"
        }`}>
          {prefix}
        </span>
        <span className={`text-[14px] font-sans font-medium tracking-[0.16em] uppercase transition-colors duration-300 nav-label ${
          isHovered 
            ? "text-[#8F1115]" 
            : isHeroMode 
              ? "text-[#F3E8D4]" 
              : "text-[#350709]"
        }`}>
          {label}
        </span>
      </div>

      {/* Calligraphy Crimson Underline on Hover (draws itself in 250ms) */}
      <svg 
        className="absolute bottom-[-10px] left-0 w-full h-[6px] text-[#8F1115] fill-none overflow-visible pointer-events-none" 
        viewBox="0 0 100 10" 
        preserveAspectRatio="none"
      >
        <path 
          d="M0,5 Q50,1 100,5" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          style={{
            strokeDasharray: "120",
            strokeDashoffset: isHovered ? "0" : "120",
            transition: "stroke-dashoffset 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
      </svg>

      {/* Active Page Indicator: Thin brass rule + Crimson curve + Tiny center brass dot */}
      {isActive && (
        <svg 
          className="absolute bottom-[-10px] left-0 w-full h-[6px] fill-none overflow-visible pointer-events-none" 
          viewBox="0 0 100 10" 
          preserveAspectRatio="none"
        >
          {/* Thin brass rule */}
          <line x1="0" y1="5" x2="100" y2="5" stroke="#D8B26E" strokeWidth="0.8" opacity="0.45" />
          {/* Crimson curve */}
          <path d="M 15 5 Q 50 1 85 5" stroke="#8F1115" strokeWidth="1.2" strokeLinecap="round" />
          {/* Tiny glowing brass dot in center */}
          <circle cx="50" cy="5" r="1.5" fill="#D8B26E" className="animate-pulse" />
        </svg>
      )}
    </a>
  );
}

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { setIsOpen } = useTableStore();
  const { startTransition } = useTransition();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeroMode, setIsHeroMode] = useState(pathname === "/");
  const [isFloating, setIsFloating] = useState(pathname !== "/");
  const [isCompact, setIsCompact] = useState(false);

  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    // Staggered navigation entrance
    const tl = gsap.timeline();
    
    // Logo entrance: Fade + 6px upward motion
    tl.fromTo(".nav-entrance-logo",
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    );
    
    // Stagger items: delayed by 60ms per item
    tl.fromTo(".nav-entrance-item",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" },
      "-=0.45"
    );

    // Scroll listener for V3 visual transformations
    const handleScroll = () => {
      const y = window.scrollY;
      
      if (pathname !== "/") {
        setIsHeroMode(false);
        setIsFloating(true);
        setIsCompact(y > 100);
        return;
      }

      if (y === 0) {
        setIsHeroMode(true);
        setIsFloating(false);
        setIsCompact(false);
      } else if (y > 0 && y <= 80) {
        setIsHeroMode(false);
        setIsFloating(true);
        setIsCompact(false);
      } else {
        setIsHeroMode(false);
        setIsFloating(true);
        setIsCompact(y > 200);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (isAdmin) return null;

  const navItems = [
    { label: "THE MENU", href: "/menu", prefix: "01" },
    { label: "OUR STORY", href: "/our-story", prefix: "02" },
    { label: "GALLERY", href: "/gallery", prefix: "03" },
    { label: "GROUP DINING", href: "/group-dining", prefix: "04" },
    { label: "VISIT", href: "/visit", prefix: "05" },
  ];

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Transition clicked label color to crimson
    const label = e.currentTarget.querySelector(".nav-label");
    if (label) {
      (label as HTMLElement).style.color = "#8F1115";
    }

    startTransition(href, rect);
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden select-none ${
          isHeroMode 
            ? "w-[95%] max-w-7xl top-9 h-32 bg-transparent border-transparent rounded-none shadow-none py-6"
            : isCompact
              ? "w-[95%] max-w-[1320px] top-4 h-16 bg-[#F3E8D4] border border-[#D8B26E] rounded-[18px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] py-2"
              : "w-[95%] max-w-[1320px] top-4 h-22 bg-[#F3E8D4] border border-[#D8B26E] rounded-[18px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] py-3.5"
        }`}
        id="main-navbar"
      >
        {/* Subtle Paper Grain overlay inside warm ivory states */}
        {!isHeroMode && (
          <div 
            className="absolute inset-0 rounded-[18px] opacity-[0.025] pointer-events-none z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        )}

        <div className="relative w-full h-full">
          {/* Logo segment: Glides from top-center to left depending on scroll state */}
          <div 
            className={`absolute transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 ${
              isHeroMode
                ? "top-1 left-1/2 -translate-x-1/2 -translate-y-0"
                : isCompact
                  ? "top-1/2 left-8 -translate-y-1/2 translate-x-0 scale-90"
                  : "top-1/2 left-8 -translate-y-1/2 translate-x-0 scale-100"
            }`}
          >
            <Link 
              href="/" 
              onClick={(e) => handleLinkClick(e, "/")}
              className="inline-block transition-transform duration-300 hover:rotate-[2deg] nav-entrance-logo"
            >
              <span className={`font-serif text-[30px] tracking-wide ${
                isHeroMode ? "text-[#F3E8D4]" : "text-[#350709]"
              }`}>
                MAURYA
              </span>
            </Link>
          </div>

          {/* Center Navigation Links: Glides from middle-bottom to center-row */}
          <div 
            className={`absolute transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 ${
              isHeroMode
                ? "top-[64px] left-1/2 -translate-x-1/2 -translate-y-0"
                : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            }`}
          >
            <nav className="flex items-center gap-7 lg:gap-9">
              {navItems.map((item, i) => (
                <MagneticLink
                  key={i}
                  href={item.href}
                  isActive={pathname === item.href}
                  prefix={item.prefix}
                  label={item.label}
                  isHeroMode={isHeroMode}
                  onClick={handleLinkClick}
                />
              ))}
            </nav>
          </div>

          {/* Right side Table Cart Trigger */}
          <div 
            className={`absolute right-8 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 ${
              isHeroMode
                ? "top-[60px] -translate-y-1.5"
                : "top-1/2 -translate-y-1/2"
            }`}
          >
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center justify-center rounded-lg hover:opacity-90 transition-opacity nav-entrance-item"
              aria-label="Your Table"
            >
              <TableIcon isHeroMode={isHeroMode} />
            </button>
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`transition-colors duration-300 ${
                isHeroMode ? "text-[#F3E8D4] hover:text-[#B98532]" : "text-[#350709] hover:text-[#8F1115]"
              }`}
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (Wine Red Editorial Menu Book) */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#350709] flex flex-col justify-between p-8 md:hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-full pointer-events-none"
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E")`,
        }}
      >
        <div>
          {/* Header segment */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-10">
            <span className="font-serif text-[30px] tracking-wide text-[#F3E8D4]">
              MAURYA
            </span>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#F3E8D4] hover:text-[#B98532] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Book menu items */}
          <nav className="flex flex-col gap-6">
            {navItems.concat({ label: "SAVE YOUR TABLE", href: "/book-a-table", prefix: "06" }).map((item, i) => (
              <div 
                key={i} 
                className="overflow-hidden border-b border-white/5 pb-3 min-h-[48px] flex items-center"
              >
                <Link 
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex flex-col items-start leading-tight hover:text-[#B98532] text-[#F3E8D4] transition-all duration-600 transform ${
                    mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                  }`}
                  style={{ 
                    transitionDelay: mobileMenuOpen ? `${i * 70}ms` : "0ms",
                  }}
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#B98532] font-semibold">
                    {item.prefix}
                  </span>
                  <span className="font-serif font-medium italic text-3xl tracking-wide mt-1">
                    {item.label}
                  </span>
                </Link>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer of Menu Book */}
        <div className="border-t border-white/5 pt-6 text-[10px] tracking-[0.18em] uppercase text-[#F3E8D4]/40 font-sans">
          KONDHWA · PUNE
        </div>
      </div>
    </>
  );
}
