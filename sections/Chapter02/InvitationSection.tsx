"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import SteamMotif from "@/components/SteamMotif";

export default function InvitationSection() {
  const containerRef = useRef<HTMLElement>(null);
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const candleLightRef = useRef<HTMLDivElement>(null);
  const feastOverlayRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Interactive cursor candle light follow
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
      // Scene 2: Breathing Space Single Sentence ("There's always room for one more...")
      gsap.fromTo(
        scene1Ref.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: scene1Ref.current,
            start: "top 80%",
          },
        }
      );

      // Scene 3: Overhead Table Visual & Camera Push
      gsap.fromTo(
        scene2Ref.current,
        { opacity: 0, scale: 1.04 },
        {
          opacity: 1,
          scale: 1.0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: scene2Ref.current,
            start: "top 75%",
          },
        }
      );

      // Scene 4: Action Links Reveal
      gsap.fromTo(
        scene3Ref.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scene3Ref.current,
            start: "top 70%",
          },
        }
      );

      // Table Feast Dish Fill Transition (Setting the table for Chapter 03 Menu)
      gsap.fromTo(
        feastOverlayRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom 55%",
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
      className="relative w-full bg-[#161312] text-[#F8F5EF] select-none z-10 border-b border-[#9A5C3B]/20 overflow-hidden py-24 md:py-36 space-y-24 md:space-y-32"
    >
      {/* Interactive Specular Candlelight Follow */}
      {!isMobile && (
        <div
          ref={candleLightRef}
          className="pointer-events-none absolute w-[450px] h-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(185,133,50,0.25)_0%,_transparent_70%)] mix-blend-screen z-20 transition-transform duration-200"
          style={{ left: "50%", top: "50%" }}
        />
      )}

      {/* Warm Ambient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(15,13,12,0.95)_100%)] pointer-events-none z-10" />

      {/* ── SCENE 2: THE TRANSITION (ONLY ONE SENTENCE) ─────────────────── */}
      <div
        ref={scene1Ref}
        className="container-maurya relative z-20 text-center pt-8 md:pt-12"
      >
        <div className="content-grid max-w-[840px] mx-auto space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9A5C3B] animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#9A5C3B] font-bold">
              CHAPTER 02 &nbsp;·&nbsp; THE INVITATION
            </span>
          </div>
          
          {/* Single Pure Sentence — Nothing else on screen */}
          <h2 className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-[#F8F5EF] font-normal leading-[1.15] tracking-tight py-4">
            "There's always room for one more at our table."
          </h2>

          <div className="w-[1px] h-12 bg-[#9A5C3B]/35 mx-auto mt-2" />
        </div>
      </div>

      {/* ── SCENE 3: THE TABLE (OVERHEAD ATMOSPHERE) ────────────────────── */}
      <div
        ref={scene2Ref}
        className="container-maurya relative z-20 text-center"
      >
        <div className="relative w-full max-w-[960px] mx-auto h-[48vh] sm:h-[58vh] md:h-[68vh] rounded-sm overflow-hidden border border-[#9A5C3B]/25 shadow-2xl bg-[#1C1414]">
          
          {/* Frame A: Overhead Empty Dining Table */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/cinematic-overhead-table.png"
              alt="A Seat Awaits You Around Our Table"
              className="w-full h-full object-cover"
            />
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

          {/* Subconscious Seat Invitation Accent */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#9A5C3B] bg-[#161312]/80 px-4 py-1.5 rounded-full border border-[#9A5C3B]/30 backdrop-blur-md">
              A SEAT AWAITS YOU
            </span>
          </div>

        </div>
      </div>

      {/* ── SCENE 4: THE INVITATION ACTIONS ─────────────────────────────── */}
      <div
        ref={scene3Ref}
        className="container-maurya relative z-20 text-center pb-8"
      >
        <div className="content-grid max-w-[640px] mx-auto space-y-6">
          <p className="font-sans text-[15px] sm:text-[17px] md:text-[19px] leading-[1.65] text-[#F8F5EF]/75 font-light">
            At Maurya, food is only one part of the experience. The laughter across the table, the aroma from the kitchen, and the conversations shared over every meal are what make people return.
          </p>

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
