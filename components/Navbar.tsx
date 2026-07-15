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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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

    // Scroll listener for desktop navbar expansion
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between h-20 px-6 md:px-12 lg:px-20 border-b border-white/10 bg-[#0B0908]/90 backdrop-blur-md transition-all duration-300"
        id="main-navbar"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.015'/%3E%3C/svg%3E")`,
        }}
      >
        {/* Flat Remastered Logo on Left */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/morya-logo.png"
            alt="Maurya"
            className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Center Nav links (Expands after scroll threshold) */}
        <div className="hidden md:flex items-center justify-center flex-1 px-8 overflow-hidden">
          <nav 
            className={`flex items-center gap-8 lg:gap-10 font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#F3E8D4]/80 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isExpanded ? "max-w-[1000px] opacity-100" : "max-w-0 opacity-0 pointer-events-none"
            }`}
          >
            {navItems.map((item, i) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={i}
                  href={item.href}
                  className="group relative cursor-pointer py-1.5 transition-colors hover:text-[#F3E8D4]"
                >
                  <span className="relative overflow-hidden block">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">{item.label}</span>
                    <span className="absolute inset-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-[#B98532]">{item.label}</span>
                  </span>
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B98532] transition-transform duration-300 origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`} 
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right side Table Cart Trigger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 pl-4 border-l border-white/10 hover:opacity-80 transition-opacity"
            aria-label="Your Table"
          >
            <TableIcon />
          </button>

          {/* Mobile Hamburger Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-[#F3E8D4] hover:text-[#B98532] transition-colors md:hidden"
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu (Wine Red full screen panel) */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#350709] flex flex-col justify-between p-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          mobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-full pointer-events-none"
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E")`,
        }}
      >
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-12">
            <img src="/morya-logo.png" alt="Maurya" className="h-10 w-auto object-contain brightness-0 invert" />
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#F3E8D4] hover:text-[#B98532] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-6">
            {navItems.map((item, i) => (
              <div 
                key={i} 
                className="overflow-hidden"
              >
                <Link 
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-baseline gap-4 hover:text-[#B98532] text-[#F3E8D4] transition-all duration-500 transform ${
                    mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                  style={{ 
                    transitionDelay: mobileMenuOpen ? `${i * 80}ms` : "0ms",
                  }}
                >
                  <span className="font-sans text-xs tracking-widest text-[#B98532] font-bold">
                    {item.prefix}
                  </span>
                  <span className="font-serif font-bold italic text-4xl sm:text-5xl tracking-tight">
                    {item.label}
                  </span>
                </Link>
              </div>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/5 pt-6 text-[10px] tracking-[0.18em] uppercase text-[#F3E8D4]/40 font-sans">
          KONDHWA · PUNE
        </div>
      </div>
    </>
  );
}
