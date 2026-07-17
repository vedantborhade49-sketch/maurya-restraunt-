"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTableStore } from "../stores/table-store";
import TableIcon from "./navigation/TableIcon";
import { Menu, X } from "lucide-react";

// Magnetic Link Wrapper Component
interface MagneticLinkProps {
  href: string;
  isActive: boolean;
  prefix: string;
  label: string;
  onClick?: () => void;
}

function MagneticLink({ href, isActive, prefix, label, onClick }: MagneticLinkProps) {
  const [drift, setDrift] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // drift up to 6px toward cursor
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.2;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.2 - 2; // lifts by 2px on hover
    setDrift({ x, y });
  };

  const handleMouseLeave = () => {
    setDrift({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        transform: `translate3d(${drift.x}px, ${drift.y}px, 0)`,
        transition: drift.x === 0 ? "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
      }}
      className="group relative cursor-pointer py-2 transition-colors duration-300 block text-[#350709]/80 hover:text-[#350709] select-none"
    >
      <div className="flex items-center gap-1.5 font-sans font-medium text-[10px] tracking-[0.18em] uppercase">
        <span className="text-[#B98532] font-semibold text-[8px]">{prefix}</span>
        <span>{label}</span>
      </div>

      {/* Underline Calligraphy Ribbon on Hover (draws itself) */}
      <svg 
        className="absolute bottom-[-6px] left-0 w-full h-[6px] text-[#8F1115] fill-none overflow-visible pointer-events-none" 
        viewBox="0 0 100 10" 
        preserveAspectRatio="none"
      >
        <path 
          d="M0,5 Q25,1 50,7 T100,5" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          className="transition-all duration-500 ease-out"
          style={{
            strokeDasharray: "120",
            strokeDashoffset: isHovered ? "0" : "120",
          }}
        />
      </svg>

      {/* Active Page Indicator: Thin aged brass line + crimson curve + tiny glowing dot */}
      {isActive && (
        <svg 
          className="absolute bottom-[-6px] left-0 w-full h-[6px] fill-none overflow-visible pointer-events-none" 
          viewBox="0 0 100 10" 
          preserveAspectRatio="none"
        >
          {/* Thin aged brass line */}
          <line x1="0" y1="5" x2="100" y2="5" stroke="#B98532" strokeWidth="0.8" opacity="0.35" />
          {/* Crimson curve */}
          <path d="M 15 5 Q 50 2 85 5" stroke="#8F1115" strokeWidth="1.2" strokeLinecap="round" />
          {/* Tiny glowing brass dot in center */}
          <circle cx="50" cy="5" r="1.5" fill="#B98532" className="animate-pulse" />
        </svg>
      )}
    </Link>
  );
}

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { setIsOpen } = useTableStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(pathname !== "/");

  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    // Entrance animation
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, delay: 0.2, ease: "power4.out" }
      );
    }

    // Scroll listener for V3 visual transformations
    const handleScroll = () => {
      if (pathname !== "/") {
        setIsScrolled(true);
        return;
      }
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Run layout initializer on mount/dependency updates
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
    { label: "SAVE YOUR TABLE", href: "/book-a-table", prefix: "05" },
    { label: "VISIT", href: "/visit", prefix: "06" },
  ];

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-[95%] max-w-7xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled 
            ? "h-[68px] px-8 py-2.5 bg-[#F3E8D4]/92 backdrop-blur-md border border-[#B98532]/25 rounded-[28px] shadow-[0_12px_40px_rgba(53,7,9,0.06)]"
            : "h-[88px] px-6 py-4 bg-transparent border-transparent rounded-none shadow-none"
        }`}
        id="main-navbar"
      >
        {/* Subtle Paper Grain overlay inside solid navbar */}
        {isScrolled && (
          <div 
            className="absolute inset-0 rounded-[28px] opacity-[0.02] pointer-events-none z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        )}

        {/* Brand Wordmark Logo on Left */}
        <Link 
          href="/" 
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center shrink-0 z-10 transition-transform duration-300 hover:scale-105"
        >
          {isScrolled ? (
            // Small scroll state Logo
            <span className="font-heading text-lg tracking-[0.25em] text-[#350709] font-bold">
              MAURYA
            </span>
          ) : (
            // Normal Logo
            <img
              src="/morya-logo.png"
              alt="Maurya"
              className="h-10 md:h-12 w-auto object-contain transition-all duration-500"
            />
          )}
        </Link>

        {/* Center Nav links (Smoothly expands past the hero hero like an unfolding menu book) */}
        <div 
          className={`hidden md:flex items-center justify-center flex-1 px-8 overflow-hidden z-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled ? "max-w-[1000px] opacity-100" : "max-w-0 opacity-0 pointer-events-none"
          }`}
          style={{
            clipPath: isScrolled ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)"
          }}
        >
          <nav className="flex items-center gap-7 lg:gap-9">
            {navItems.map((item, i) => (
              <MagneticLink
                key={i}
                href={item.href}
                isActive={pathname === item.href}
                prefix={item.prefix}
                label={item.label}
              />
            ))}
          </nav>
        </div>

        {/* Right side Table Cart Trigger */}
        <div className="flex items-center gap-3 z-10">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:opacity-85 transition-opacity"
            aria-label="Your Table"
          >
            <TableIcon />
          </button>

          {/* Mobile Hamburger Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`text-[#F3E8D4] hover:text-[#B98532] transition-colors md:hidden ${
              isScrolled ? "text-[#350709]" : "text-[#F3E8D4]"
            }`}
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu (Transforming into an Editorial Menu Book) */}
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
            <span className="font-heading text-xl tracking-[0.25em] text-[#F3E8D4] font-bold">
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
          <nav className="flex flex-col gap-8">
            {navItems.map((item, i) => (
              <div 
                key={i} 
                className="overflow-hidden border-b border-white/5 pb-4"
              >
                <Link 
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex flex-col items-start gap-1 hover:text-[#B98532] text-[#F3E8D4] transition-all duration-600 transform ${
                    mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                  }`}
                  style={{ 
                    transitionDelay: mobileMenuOpen ? `${i * 90}ms` : "0ms",
                  }}
                >
                  <span className="font-sans text-[10px] tracking-[0.2em] text-[#B98532] font-semibold">
                    {item.prefix}
                  </span>
                  <span className="font-serif font-medium italic text-4xl tracking-wide leading-none mt-1">
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
