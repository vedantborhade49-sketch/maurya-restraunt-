"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { useTableStore } from "../stores/table-store";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { setIsOpen, getItemCount } = useTableStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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

  const mobileNavItems = [
    { label: "THE MENU", href: "/menu", prefix: "01" },
    { label: "AROUND OUR TABLE", href: "/our-story", prefix: "02" },
    { label: "GALLERY", href: "/gallery", prefix: "03" },
    { label: "REVIEWS", href: "/reviews", prefix: "04" },
    { label: "VISIT", href: "/visit", prefix: "05" },
  ];

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#9A5C3B] origin-left z-[60]"
        style={{ scaleX }}
      />
      <header
        ref={navRef}
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[94%] max-w-6xl z-50 flex items-center transition-all duration-500 rounded-full border border-[#B98532]/50 shadow-[0_8px_20px_rgba(0,0,0,0.06)] md:shadow-[0_25px_60px_rgba(0,0,0,0.6)] ${
          isExpanded
            ? "h-[68px] md:h-16 bg-[#161413]/95 md:bg-[#472020]/95 backdrop-blur-md px-5 md:px-8 text-white"
            : "h-[68px] md:h-20 bg-[#161413]/95 backdrop-blur-md px-5 md:px-8 text-white"
        }`}
        id="main-navbar"
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo on Left */}
          <Link href="/" className="flex items-center shrink-0 pl-1 md:pl-2">
            <img
              src="/morya-logo.webp"
              alt="Maurya"
              className="hidden md:block h-8 md:h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
            {/* Mobile Logo */}
            <img
              src="/morya-logo.webp"
              alt="Maurya"
              className="md:hidden h-14 w-auto object-contain scale-[1.2] transition-transform duration-300 active:scale-95"
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
              className="flex md:hidden items-center justify-center px-4 py-2 bg-[#6D2323] text-[#F8F6F1] rounded-full font-sans text-[10px] font-bold uppercase tracking-[0.1em] transition-all"
            >
              Order Online
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => {
                setMobileMenuOpen(true);
                if (navigator.vibrate) navigator.vibrate(10); // Haptic feedback
              }}
              className="flex items-center justify-center text-white hover:text-[#B98532] transition-colors md:hidden p-2 ml-2 rounded-full border border-[#B98532]/20"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (Warm Ivory full screen panel sliding from right) */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#F8F5EF] flex flex-col justify-between p-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          mobileMenuOpen ? "translate-x-0 shadow-[-20px_0_40px_rgba(0,0,0,0.1)] pointer-events-auto" : "translate-x-full pointer-events-none"
        }`}
      >
        <div>
          <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-6 mb-12">
            <img 
              src="/morya-logo.webp"
              alt="Maurya"
              className="h-16 w-auto object-contain scale-[1.2]"
            />
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                if (navigator.vibrate) navigator.vibrate(10);
              }}
              aria-label="Close menu"
              className="text-[#6D2323] hover:text-[#B98532] transition-colors p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-6">
            {mobileNavItems.map((item, i) => (
              <div 
                key={i} 
                className="overflow-hidden"
              >
                <Link 
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-baseline gap-4 hover:text-[#6D2323] text-[#1C1414] transition-all duration-500 transform ${
                    mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                  }`}
                  style={{ 
                    transitionDelay: mobileMenuOpen ? `${i * 80}ms` : "0ms",
                  }}
                >
                  <span className="font-sans text-xs tracking-widest text-[#B98532] font-bold">
                    {item.prefix}
                  </span>
                  <span className="font-serif font-bold italic text-4xl sm:text-5xl tracking-tight text-[#6D2323]">
                    {item.label}
                  </span>
                </Link>
              </div>
            ))}
          </nav>
        </div>

        <div className="border-t border-[#6D2323]/10 pt-6 text-[10px] tracking-[0.18em] uppercase text-[#1C1414]/60 font-sans">
          KONDHWA · PUNE
        </div>
      </div>
    </>
  );
}
