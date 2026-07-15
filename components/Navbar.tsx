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
  }, []);

  if (isAdmin) return null;

  const navItems = [
    { label: "HOME", href: "/" },
    { label: "ABOUT US", href: "/#story" },
    { label: "MENU", href: "/menu" },
    { label: "GALLERY", href: "/#kitchen" },
    { label: "CONTACT", href: "/#story" },
    { label: "ORDER NOW", href: "/order" },
  ];

  const handleItemClick = (item: typeof navItems[0], e: React.MouseEvent) => {
    if (item.label === "ORDER NOW") {
      e.preventDefault();
      setIsOpen(true);
    }
    setMobileMenuOpen(false);
  };

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

        {/* Center / Right Nav links (Desktop only) */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <nav className="flex items-center gap-8 lg:gap-10 font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#F3E8D4]/80">
            {navItems.map((item, i) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={i}
                  href={item.href}
                  onClick={(e) => handleItemClick(item, e)}
                  className="group relative cursor-pointer py-1.5 transition-colors hover:text-[#F3E8D4]"
                >
                  <span>{item.label}</span>
                  {/* Underline Indicator exactly like screenshot */}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#F3E8D4] transition-transform duration-300 origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`} 
                  />
                </Link>
              );
            })}
          </nav>

          {/* Table Cart trigger Icon */}
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 pl-4 border-l border-white/10 hover:opacity-80 transition-opacity"
            aria-label="Your Table"
          >
            <TableIcon />
          </button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="hover:opacity-80 transition-opacity"
            aria-label="Your Table"
          >
            <TableIcon />
          </button>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-[#F3E8D4] hover:text-gold transition-colors"
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#0b0908] flex flex-col justify-between p-8 transition-transform duration-500 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-12">
            <img src="/morya-logo.png" alt="Maurya" className="h-10 w-auto object-contain" />
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
                onClick={(e) => handleItemClick(item, e)}
                className="hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
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
