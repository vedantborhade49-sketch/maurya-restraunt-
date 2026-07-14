"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTableStore } from "../stores/table-store";
import { ShoppingBag } from "lucide-react";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { items, setIsOpen, getItemCount } = useTableStore();

  const isAdmin = pathname?.startsWith("/admin");
  const itemCount = getItemCount();

  useEffect(() => {
    // Fade in navbar after preloader has finished
    gsap.fromTo(
      navRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: "power3.out" }
    );
  }, []);

  if (isAdmin) return null;

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Our Story", href: "/#story" },
    { label: "Gallery", href: "/#gallery" },
  ];

  return (
    <div
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 md:px-8 h-16 w-[92%] max-w-5xl rounded-full border border-white/10 bg-[#0d0b09]/60 backdrop-blur-[16px] shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
      id="main-navbar"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <span className="font-heading text-lg text-gold font-bold tracking-widest">MAURYA</span>
      </Link>

      {/* Nav items */}
      <div className="hidden md:flex items-center gap-8 font-sans text-xs uppercase tracking-widest text-[#FFF9EF]/80">
        {navItems.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="group relative cursor-pointer overflow-hidden pb-1"
          >
            <span className="inline-block transition-all duration-300 group-hover:text-gold">
              {item.label}
            </span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Table/Cart Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-gold/30 hover:bg-wine/10 text-soft-ivory hover:text-gold transition-all duration-200"
          data-cursor="GO"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="text-xs font-mono font-bold">{itemCount}</span>
        </button>

        <div className="h-4 w-[1px] bg-white/15 hidden md:block" />

        {/* Reserve CTA */}
        <Link
          href="/book-a-table"
          className="group relative overflow-hidden font-sans text-xs uppercase tracking-widest px-4 py-2 border border-gold text-gold rounded-full hover:bg-gold hover:text-midnight transition-colors duration-300"
        >
          Reserve
        </Link>
      </div>
    </div>
  );
}
