"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import SteamMotif from "@/components/SteamMotif";

export default function InvitationSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const feastOverlayRef = useRef<HTMLDivElement>(null);
  const candleLightRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse interactivity: candle light flicker & cutlery specular highlights
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current || !candleLightRef.current || isMobile) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(candleLightRef.current, {
      left: x,
      top: y,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Slow Camera Push (3-5%) on scroll
      gsap.fromTo(
        cameraRef.current,
        { scale: 1.05, filter: "brightness(0.85)" },
        {
          scale: 1.0,
          filter: "brightness(1.0)",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 25%",
            scrub: 1,
          },
        }
      );

      // 2. Emotional Statement Reveal
      gsap.fromTo(
        statementRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statementRef.current,
            start: "top 70%",
          },
        }
      );

      // 3. Feast Dish Fill Transition (Setting the table for the Menu)
      gsap.fromTo(
        feastOverlayRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom 60%",
            end: "bottom 10%",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#161312] text-[#F8F5EF] select-none z-10 border-b border-[#9A5C3B]/20 overflow-hidden py-16 md:py-28"
    >
      {/* Interactive Candlelight & Specular Light Follow */}
      {!isMobile && (
        <div
          ref={candleLightRef}
          className="pointer-events-none absolute w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(185,133,50,0.22)_0%,_transparent_70%)] mix-blend-screen z-20 transition-transform duration-200"
          style={{ left: "50%", top: "50%" }}
        />
      )}

      {/* Ambient Lighting Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(15,13,12,0.9)_100%)] pointer-events-none z-10" />

      {/* ── SCENE 02: THE TABLE (CINEMATIC OVERHEAD VISUAL) ──────────────── */}
      <div className="container-maurya relative z-20 flex flex-col items-center gap-12 text-center">
        
        {/* Scene Chapter Counter */}
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9A5C3B] animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#9A5C3B] font-bold">
            01 &nbsp;·&nbsp; THE INVITATION
          </span>
        </div>

        {/* 4K Overhead Dining Table Frame */}
        <div className="relative w-full max-w-[960px] mx-auto h-[48vh] sm:h-[58vh] md:h-[68vh] rounded-sm overflow-hidden border border-[#9A5C3B]/25 shadow-2xl bg-[#1C1414]">
          
          {/* Frame A: Empty Table with One Chair Awaiting */}
          <div ref={cameraRef} className="absolute inset-0 w-full h-full">
            <img
              src="/cinematic-overhead-table.png"
              alt="A Seat Awaits You Around Our Table"
              className="w-full h-full object-cover"
            />
            {/* Soft Warm Lighting Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#161312] via-transparent to-black/30 opacity-70" />
            <SteamMotif className="absolute inset-0 w-full h-full mix-blend-screen opacity-20 pointer-events-none" />
          </div>

          {/* Frame B: Feast Transition (Table Fills with Dishes) */}
          <div
            ref={feastOverlayRef}
            className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
          >
            <img
              src="/editorial-table-feast.png"
              alt="The Table Filled With Dishes"
              className="w-full h-full object-cover sepia-[15%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161312] via-transparent to-transparent opacity-80" />
            <SteamMotif className="absolute inset-0 w-full h-full mix-blend-screen opacity-35 pointer-events-none" />
          </div>

          {/* Restrained Subconscious Invite Accent */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#9A5C3B] bg-[#161312]/80 px-4 py-1.5 rounded-full border border-[#9A5C3B]/30 backdrop-blur-md">
              THERE’S ALWAYS ROOM FOR ONE MORE
            </span>
          </div>
        </div>

        {/* ── SCENE 03: THE SINGLE EMOTIONAL STATEMENT ───────────────────── */}
        <div ref={statementRef} className="content-grid max-w-[800px] mx-auto space-y-6 pt-4">
          <h2 className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-[#F8F5EF] font-normal leading-[1.1] tracking-tight">
            "Every celebration begins around a table."
          </h2>

          <p className="font-sans text-[15px] sm:text-[17px] md:text-[19px] leading-[1.65] text-[#F8F5EF]/75 font-light max-w-[600px] mx-auto">
            At Maurya, food is only one part of the experience. The laughter across the table, the aroma from the kitchen, and the conversations shared over every meal are what make people return.
          </p>

          {/* Restrained Minimal CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-6 font-mono text-[11px] uppercase tracking-[0.25em] font-bold">
            <Link
              href="/visit#reserve"
              className="px-8 py-3.5 bg-[#5A1F1F] text-[#F8F5EF] hover:bg-[#9A5C3B] rounded-full border border-[#9A5C3B]/40 shadow-sm transition-all duration-300 hover:scale-105"
            >
              Reserve A Table
            </Link>
            <Link
              href="/menu"
              className="text-[#F8F5EF]/80 hover:text-[#9A5C3B] transition-colors border-b border-[#F8F5EF]/30 hover:border-[#9A5C3B] pb-0.5"
            >
              Explore Today's Menu
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
