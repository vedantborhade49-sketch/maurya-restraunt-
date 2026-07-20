"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import SteamMotif from "@/components/SteamMotif";

export default function InvitationSection() {
  const containerRef = useRef<HTMLElement>(null);
  const tableImgRef = useRef<HTMLDivElement>(null);
  const feastImgRef = useRef<HTMLDivElement>(null);
  const quietNoteRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const chairPulseRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial Quiet Opening Note Reveal ("There's always room for one more...")
      gsap.fromTo(
        quietNoteRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: quietNoteRef.current,
            start: "top 80%",
          },
        }
      );

      // 2. Poetic Typography Mask & Fade
      const lines = gsap.utils.toArray<HTMLElement>(".invitation-poetry-line");
      gsap.fromTo(
        lines,
        { yPercent: 40, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statementRef.current,
            start: "top 75%",
          },
        }
      );

      if (isMobile) return;

      // 3. Living Table Interactive Scroll Sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: "+=220%",
          scrub: 1,
        },
      });

      // Camera slowly moves toward the table (walk to your seat)
      tl.fromTo(
        tableImgRef.current,
        { scale: 1.12, opacity: 0.4 },
        { scale: 1.0, opacity: 1, duration: 2, ease: "none" },
        0
      );

      // Empty chair pulls back slightly (inviting you to sit)
      tl.to(
        chairPulseRef.current,
        { y: -15, opacity: 1, duration: 1.5, ease: "power1.out" },
        1.0
      );

      // Transition: Table gradually fills with dishes (Feast Image cross-fade)
      tl.fromTo(
        feastImgRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1.0, duration: 2.5, ease: "power2.inOut" },
        2.5
      );

    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={containerRef}
      className={`relative w-full material-light text-[#272322] select-none z-10 border-b border-[#9A5C3B]/15 overflow-hidden ${
        isMobile ? "py-20" : "min-h-screen flex flex-col justify-between"
      }`}
    >
      {/* Subtle Layered Warm Lighting & Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FAF7F0] via-[#F8F5EF] to-[#EFE8DB]/80 pointer-events-none z-0" />

      {/* ── 1. QUIET OPENING NOTE (CREATIVE IDEA ⭐⭐⭐⭐⭐) ──────────────────── */}
      <div
        ref={quietNoteRef}
        className="container-maurya relative z-20 pt-16 md:pt-24 text-center"
      >
        <div className="content-grid max-w-[760px] mx-auto space-y-3">
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#9A5C3B] font-bold">
              01 &nbsp;·&nbsp; THE INVITATION
            </span>
          </div>
          <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#5A1F1F] font-normal leading-relaxed tracking-tight">
            "There's always room for one more at our table."
          </p>
          <div className="w-[1px] h-10 bg-[#9A5C3B]/40 mx-auto mt-4" />
        </div>
      </div>

      {/* ── 2. POETIC STATEMENT & EDITORIAL COPY ─────────────────────────── */}
      <div
        ref={statementRef}
        className="container-maurya relative z-20 my-auto py-12 text-center"
      >
        <div className="content-grid max-w-[960px] mx-auto space-y-8 flex flex-col items-center">
          
          <h2 className="font-heading text-[44px] sm:text-[64px] md:text-[84px] lg:text-[96px] leading-[0.92] tracking-tight text-[#272322] uppercase">
            <div className="invitation-poetry-line">Every Great Meal</div>
            <div className="invitation-poetry-line">Begins With</div>
            <div className="invitation-poetry-line italic text-[#9A5C3B] font-serif lowercase py-1">
              Someone Waiting
            </div>
            <div className="invitation-poetry-line">At The Table.</div>
          </h2>

          <p className="font-sans text-[16px] sm:text-[18px] md:text-[21px] leading-[1.65] text-[#272322]/85 font-light max-w-[680px]">
            At Maurya, food is only one part of the experience. The laughter across the table, the aroma from the kitchen, and the conversations shared over every meal are what make people return.
          </p>

          {/* Minimal Elegant CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-6 font-mono text-[11px] uppercase tracking-[0.25em] font-bold">
            <Link
              href="/visit#reserve"
              className="px-8 py-3.5 bg-[#5A1F1F] text-[#F8F5EF] hover:bg-[#472020] rounded-full border border-[#9A5C3B]/40 shadow-sm transition-all duration-300 hover:scale-105"
            >
              Reserve A Table
            </Link>
            <div className="hidden sm:block text-[#9A5C3B] opacity-50">↓</div>
            <Link
              href="/menu"
              className="text-[#272322] hover:text-[#9A5C3B] transition-colors border-b border-[#272322]/30 hover:border-[#9A5C3B] pb-0.5"
            >
              Explore Today's Menu
            </Link>
          </div>

        </div>
      </div>

      {/* ── 3. THE LIVING TABLE VISUAL & SEAMLESS MENU TRANSITION ───────────── */}
      <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden z-20 border-t border-[#9A5C3B]/20">
        
        {/* Frame A: Empty Table with One Chair Invited */}
        <div ref={tableImgRef} className="absolute inset-0 w-full h-full">
          <img
            src="/editorial-living-table.png"
            alt="A Seat Awaits You"
            className="w-full h-full object-cover sepia-[15%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#EFE8DB] via-transparent to-transparent opacity-80" />
        </div>

        {/* Chair Pull-Back Subconscious Invite Accent */}
        <div
          ref={chairPulseRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center opacity-0"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F8F5EF]/90 border border-[#9A5C3B]/40 rounded-full backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#9A5C3B] animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#5A1F1F] font-bold">
              YOUR CHAIR IS SET
            </span>
          </div>
        </div>

        {/* Frame B: Seamless Transition — Table Fills with Feast Dishes */}
        <div
          ref={feastImgRef}
          className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
        >
          <img
            src="/editorial-table-feast.png"
            alt="Table Filled With Dishes"
            className="w-full h-full object-cover sepia-[10%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#EFE8DB] via-[#EFE8DB]/30 to-transparent" />
          <SteamMotif className="absolute inset-0 w-full h-full mix-blend-multiply opacity-40 pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
