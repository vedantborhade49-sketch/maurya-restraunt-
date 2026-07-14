"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const NAV_ITEMS = [
  { label: "Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // ─── GSAP scroll behaviour ────────────────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hide initially — the masterTimeline will reveal it
    gsap.set(navRef.current, { y: -50, opacity: 0 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "body",
        start: "top -80",
        end: "max",
        onUpdate: (self) => {
          const scrolled = self.progress > 0;
          if (!navRef.current) return;

          gsap.to(navRef.current, {
            y: scrolled ? -10 : 0,
            boxShadow: scrolled
              ? "0 12px 48px rgba(10, 10, 10, 0.12), 0 2px 8px rgba(10, 10, 10, 0.06)"
              : "0 4px 24px rgba(10, 10, 10, 0.04)",
            duration: 0.8,
            ease: "power3.out",
          });

          // Logo scale
          if (logoRef.current) {
            gsap.to(logoRef.current, {
              scale: scrolled ? 0.92 : 1,
              duration: 0.8,
              ease: "power3.out",
            });
          }

          // Links opacity
          linksRef.current.forEach((link) => {
            if (link) {
              gsap.to(link, {
                opacity: scrolled ? 1 : 0.85,
                duration: 0.8,
                ease: "power3.out",
              });
            }
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // ─── Link hover — GSAP tactile effect ─────────────────────
  const handleLinkEnter = useCallback((el: HTMLAnchorElement | null) => {
    if (!el) return;
    const underline = el.querySelector(".nav-underline") as HTMLElement;
    gsap.to(el, { y: -2, duration: 0.4, ease: "power3.out" });
    gsap.to(el, { opacity: 1, duration: 0.3, ease: "power2.out" });
    if (underline) {
      gsap.to(underline, {
        scaleX: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, []);

  const handleLinkLeave = useCallback(
    (el: HTMLAnchorElement | null, idx: number) => {
      if (!el) return;
      const underline = el.querySelector(".nav-underline") as HTMLElement;
      gsap.to(el, { y: 0, duration: 0.4, ease: "power3.out" });
      gsap.to(el, {
        opacity: idx === activeIndex ? 1 : 0.85,
        duration: 0.3,
        ease: "power2.out",
      });
      if (underline && idx !== activeIndex) {
        gsap.to(underline, {
          scaleX: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    },
    [activeIndex]
  );

  // ─── CTA magnetic hover ───────────────────────────────────
  const handleCtaMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ctaRef.current || !ctaContainerRef.current) return;
      const rect = ctaContainerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.15;
      const dy = (e.clientY - cy) * 0.15;
      gsap.to(ctaRef.current, {
        x: dx,
        y: dy,
        duration: 0.4,
        ease: "power3.out",
      });
    },
    []
  );

  const handleCtaMouseLeave = useCallback(() => {
    if (!ctaRef.current) return;
    gsap.to(ctaRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  const handleCtaMouseEnter = useCallback(() => {
    if (!ctaRef.current) return;
    gsap.to(ctaRef.current, {
      scale: 1.02,
      duration: 0.4,
      ease: "power3.out",
    });
  }, []);

  // ─── Mobile menu GSAP timeline ────────────────────────────
  const openMobileMenu = useCallback(() => {
    setMobileOpen(true);
    // Timeline created in useEffect after render
  }, []);

  const closeMobileMenu = useCallback(() => {
    if (mobileTimelineRef.current) {
      mobileTimelineRef.current.reverse();
      // Wait for reverse to finish before unmounting
      setTimeout(() => setMobileOpen(false), 800);
    } else {
      setMobileOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!mobileOpen || !mobileMenuRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // Backdrop fade
    tl.fromTo(
      mobileMenuRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );

    // Staggered link reveals
    tl.fromTo(
      ".mobile-nav-link",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      },
      0.2
    );

    // CTA reveal
    tl.fromTo(
      ".mobile-nav-cta",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      0.6
    );

    // Close button
    tl.fromTo(
      ".mobile-nav-close",
      { opacity: 0, rotate: -90 },
      { opacity: 1, rotate: 0, duration: 0.5 },
      0.3
    );

    mobileTimelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [mobileOpen]);

  // ─── Active section tracking ──────────────────────────────
  useEffect(() => {
    const sectionIds = ["story", "menu", "gallery", "reviews", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionIds.indexOf(entry.target.id);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ─── Desktop Navbar ─────────────────────────────────── */}
      <nav
        ref={navRef}
        id="main-navbar"
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center justify-between h-[60px] w-[92%] max-w-[1200px] rounded-[999px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(244, 239, 232, 0.97) 0%, rgba(248, 245, 240, 0.95) 100%)",
          border: "1px solid rgba(196, 154, 72, 0.08)",
          boxShadow: "0 4px 24px rgba(10, 10, 10, 0.04)",
          paddingLeft: "clamp(20px, 3vw, 36px)",
          paddingRight: "clamp(12px, 2vw, 20px)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <img
            ref={logoRef}
            src="/morya-logo.png"
            alt="Maurya"
            className="h-7 w-auto object-contain will-change-transform"
            style={{ transformOrigin: "left center" }}
          />
        </div>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center justify-center gap-10 flex-1">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              ref={(el) => { linksRef.current[i] = el; }}
              onMouseEnter={() => handleLinkEnter(linksRef.current[i])}
              onMouseLeave={() => handleLinkLeave(linksRef.current[i], i)}
              className="relative cursor-pointer will-change-transform"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "15px",
                fontWeight: 400,
                letterSpacing: "0.14em",
                color: i === activeIndex ? "#262626" : "rgba(38, 38, 38, 0.85)",
                textDecoration: "none",
                transition: "color 0.4s ease",
              }}
            >
              {item.label}
              {/* Underline */}
              <span
                className="nav-underline absolute -bottom-1 left-1/2 h-[1px] bg-gold origin-center will-change-transform"
                style={{
                  width: "100%",
                  transform: `translateX(-50%) scaleX(${i === activeIndex ? 1 : 0})`,
                }}
              />
            </a>
          ))}
        </div>

        {/* CTA — Reserve Table */}
        <div
          ref={ctaContainerRef}
          className="hidden md:flex items-center shrink-0 ml-8"
          onMouseMove={handleCtaMouseMove}
          onMouseLeave={handleCtaMouseLeave}
          onMouseEnter={handleCtaMouseEnter}
          style={{ padding: "8px" }}
        >
          <button
            ref={ctaRef}
            className="relative overflow-hidden will-change-transform"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              color: "#3A2A12",
              background:
                "linear-gradient(135deg, #C49A48 0%, #D4A84E 50%, #B8893C 100%)",
              padding: "10px 28px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              boxShadow:
                "0 2px 8px rgba(196, 154, 72, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              transition: "box-shadow 0.5s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 4px 16px rgba(196, 154, 72, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 2px 8px rgba(196, 154, 72, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)";
            }}
          >
            Reserve Table
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] items-center justify-center w-10 h-10 cursor-pointer"
          onClick={openMobileMenu}
          aria-label="Open menu"
          style={{ background: "none", border: "none" }}
        >
          <span
            className="block w-5 h-[1.5px] rounded-full"
            style={{ background: "rgba(38, 38, 38, 0.7)" }}
          />
          <span
            className="block w-3.5 h-[1.5px] rounded-full"
            style={{ background: "rgba(38, 38, 38, 0.5)" }}
          />
        </button>
      </nav>

      {/* ─── Mobile Menu Overlay ─────────────────────────────── */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{
            background:
              "linear-gradient(180deg, rgba(244, 239, 232, 0.98) 0%, rgba(248, 245, 240, 0.99) 100%)",
            backdropFilter: "blur(4px)",
            opacity: 0,
          }}
        >
          {/* Close button */}
          <button
            className="mobile-nav-close absolute top-8 right-8 w-10 h-10 flex items-center justify-center cursor-pointer"
            onClick={closeMobileMenu}
            aria-label="Close menu"
            style={{
              background: "none",
              border: "1px solid rgba(38, 38, 38, 0.1)",
              borderRadius: "50%",
              opacity: 0,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="rgba(38, 38, 38, 0.6)"
              strokeWidth="1.5"
            >
              <line x1="2" y1="2" x2="14" y2="14" />
              <line x1="14" y1="2" x2="2" y2="14" />
            </svg>
          </button>

          {/* Logo */}
          <div className="mb-16">
            <img
              src="/morya-logo.png"
              alt="Maurya"
              className="h-8 w-auto object-contain opacity-60"
            />
          </div>

          {/* Nav Links */}
          <div className="flex flex-col items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="mobile-nav-link"
                onClick={closeMobileMenu}
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(28px, 6vw, 40px)",
                  fontWeight: 300,
                  letterSpacing: "0.08em",
                  color: "rgba(38, 38, 38, 0.8)",
                  textDecoration: "none",
                  opacity: 0,
                  lineHeight: 1.3,
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mobile-nav-cta mt-16" style={{ opacity: 0 }}>
            <button
              onClick={closeMobileMenu}
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "15px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "#3A2A12",
                background:
                  "linear-gradient(135deg, #C49A48 0%, #D4A84E 50%, #B8893C 100%)",
                padding: "14px 40px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 2px 12px rgba(196, 154, 72, 0.2)",
              }}
            >
              Reserve Table
            </button>
          </div>

          {/* Decorative line */}
          <div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            style={{
              width: "40px",
              height: "1px",
              background: "rgba(196, 154, 72, 0.3)",
            }}
          />
        </div>
      )}
    </>
  );
}
