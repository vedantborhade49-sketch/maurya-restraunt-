"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTableStore } from "../stores/table-store";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { setIsOpen, getItemCount } = useTableStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

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

    setMounted(true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const itemCount = mounted ? getItemCount() : 0;

  if (isAdmin) return null;

  const navItems = [
    { label: "THE MENU", href: "/menu", prefix: "01" },
    { label: "AROUND OUR TABLE", href: "/our-story", prefix: "02" },
    { label: "GALLERY", href: "/gallery", prefix: "03" },
    { label: "REVIEWS", href: "/reviews", prefix: "04" },
    { label: "VISIT", href: "/visit", prefix: "05" },
  ];

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[94%] max-w-6xl z-50 flex items-center transition-all duration-500 rounded-full border border-[#9A5C3B]/45 shadow-[0_25px_60px_rgba(0,0,0,0.6)] ${
          isExpanded
            ? "h-14 md:h-16 bg-[#472020]/95 backdrop-blur-md px-5 md:px-8"
            : "h-16 md:h-20 bg-[#161413]/95 backdrop-blur-md px-5 md:px-8"
        }`}
        id="main-navbar"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.015'/%3E%3C/svg%3E")`,
        }}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo on Left */}
          <Link href="/" className="flex items-center shrink-0 pl-1 md:pl-2">
            <img
              src="/morya-logo.png"
              alt="Maurya"
              className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Center Nav links */}
          <div className="hidden md:flex items-center justify-center flex-1 px-8 overflow-hidden">
            <nav 
              className="flex items-center gap-7 lg:gap-10 font-sans text-[11px] uppercase tracking-[0.22em] font-bold text-[#F8F5EF]/90 transition-all duration-500"
            >
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={i}
                    href={item.href}
                    className="group relative cursor-pointer py-1.5 transition-colors hover:text-[#FFCC00]"
                  >
                    <span className="relative overflow-hidden block">
                      <span className="block transition-transform duration-300 group-hover:-translate-y-full">{item.label}</span>
                      <span className="absolute inset-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-[#FFCC00]">{item.label}</span>
                    </span>
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#FFCC00] transition-transform duration-300 origin-left ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`} 
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right side Order Cart Triggers */}
          <div className="flex items-center gap-3 pr-1 md:pr-2">
            {/* Desktop View Order Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[#8F1115] hover:bg-[#A3161A] text-[#F8F5EF] border border-[#FFCC00]/50 rounded-full font-sans text-xs font-bold uppercase tracking-[0.18em] transition-all hover:scale-105 active:scale-95 shrink-0 cursor-pointer shadow-[0_4px_15px_rgba(143,17,21,0.5)]"
            >
              <span>ORDER ONLINE &rarr;</span>
              {itemCount > 0 && (
                <span className="font-mono text-[10px] bg-[#FFCC00] text-black font-extrabold px-2 py-0.5 rounded-full">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile View Order Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="flex md:hidden items-center gap-1.5 px-4 py-2 bg-[#8F1115] hover:bg-[#A3161A] text-[#F8F5EF] border border-[#FFCC00]/50 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <span>ORDER &rarr;</span>
              {itemCount > 0 && (
                <span className="font-mono text-[9px] bg-[#FFCC00] text-black font-extrabold px-1.5 py-0.5 rounded-full">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-[#F8F5EF] hover:text-[#FFCC00] transition-colors md:hidden p-1.5 ml-1 rounded-full bg-white/5 border border-white/10"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (Wine Red full screen panel) */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#472020] flex flex-col justify-between p-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
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
              className="text-[#F8F5EF] hover:text-[#9A5C3B] transition-colors"
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
                  className={`flex items-baseline gap-4 hover:text-[#9A5C3B] text-[#F8F5EF] transition-all duration-500 transform ${
                    mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                  style={{ 
                    transitionDelay: mobileMenuOpen ? `${i * 80}ms` : "0ms",
                  }}
                >
                  <span className="font-sans text-xs tracking-widest text-[#9A5C3B] font-bold">
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

        <div className="border-t border-white/5 pt-6 text-[10px] tracking-[0.18em] uppercase text-[#F8F5EF]/40 font-sans">
          KONDHWA · PUNE
        </div>
      </div>
    </>
  );
}
