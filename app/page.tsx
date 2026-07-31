"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import InvitationSection from "@/sections/Chapter02/InvitationSection";
import Chapter03 from "@/sections/Chapter03/Chapter03";
import PureVegPromise from "@/sections/PureVegPromise/PureVegPromise";
import Chapter04 from "@/sections/Chapter04/Chapter04";
import Guestbook from "@/sections/Guestbook/Guestbook";

export default function Home() {
  const videoRef       = useRef<HTMLVideoElement>(null);
  const overlayRef     = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    video.loop = false;

    const enterAmbient = () => {
      video.pause();
      video.currentTime = 0;
      video.loop = true;
      video.play().catch(() => {});

      gsap.to(video, { opacity: 0.4, duration: 1.4, ease: "power2.inOut" });
      gsap.to(video, { filter: "brightness(0.65) saturate(0.5)", duration: 1.4, ease: "power2.inOut" });
      gsap.to(overlayRef.current, { opacity: 1, duration: 1.4, ease: "power2.inOut" });
      gsap.fromTo(heroContentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 0.15 }
      );
    };

    const startIntro = async () => {
      try { await video.play(); }
      catch { enterAmbient(); }
    };

    video.addEventListener("ended", enterAmbient);
    startIntro();

    return () => { video.removeEventListener("ended", enterAmbient); };
  }, []);

  return (
    <>
      {/* SVG film grain */}
      <svg className="hidden" aria-hidden="true">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
      </svg>

      <main className="relative w-full bg-[#161413] text-[#F8F5EF] selection:bg-[#C62828] selection:text-[#F8F5EF]">

        {/* Film grain */}
        <div
          className="pointer-events-none fixed inset-0 z-[100] opacity-[0.035] mix-blend-multiply"
          style={{ filter: "url(#grain)", backgroundColor: "#a09070" }}
        />


        {/* ── 1. HERO (Dark Vintage) ─────────────────────────────────── */}
        <section className="sticky top-0 w-full min-h-[100dvh] md:h-[100dvh] overflow-hidden bg-[#1C1414] z-0 flex flex-col justify-between">

          {/* Background Layer 1: Mobile-Optimized Video Container */}
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#1C1414]">
            {/* Ambient Blurred Video Background for Mobile View (fills portrait height smoothly) */}
            <video
              src="/morya-hero.mp4"
              playsInline
              autoPlay
              loop
              muted
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-45 md:hidden pointer-events-none"
            />
            {/* Main Hero Video: Complete video frame visible on mobile (object-contain) & seamless cover on desktop (md:object-cover) */}
            <video
              ref={videoRef}
              src="/morya-hero.mp4"
              playsInline
              muted
              preload="auto"
              className="absolute inset-0 w-full h-full object-contain md:object-cover transition-all duration-500"
              style={{ opacity: 1 }}
            />
          </div>

          {/* Background Layer 2: Warm Wall Texture & Dining Room Shadows */}
          <div
            ref={overlayRef}
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              opacity: 0,
              background: `
                radial-gradient(ellipse at 50% 30%, rgba(90,31,31,0.35) 0%, transparent 70%),
                radial-gradient(circle at center, transparent 40%, rgba(22,20,19,0.85) 100%),
                linear-gradient(180deg, rgba(22,20,19,0.4) 0%, rgba(22,20,19,0.1) 40%, rgba(22,20,19,0.9) 100%)
              `,
            }}
          />

          {/* Background Layer 3: Embossed Maurya Watermark & Restrained Brass Sparkles */}
          <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center opacity-[0.06] select-none">
            <svg viewBox="0 0 300 300" className="w-[45vw] max-w-[500px] h-auto fill-none stroke-[#9A5C3B] stroke-[1]">
              <circle cx="150" cy="150" r="140" strokeDasharray="4 4" />
              <circle cx="150" cy="150" r="120" />
              <path d="M150,30 L170,130 L270,150 L170,170 L150,270 L130,170 L30,150 L130,130 Z" />
            </svg>
          </div>

          {/* Restrained Brass Sparkle Accent */}
          <div className="absolute top-[25%] right-[15%] w-2 h-2 rounded-full bg-[#9A5C3B] blur-[1px] animate-pulse opacity-40 z-10 pointer-events-none" />
          <div className="absolute bottom-[35%] left-[12%] w-1.5 h-1.5 rounded-full bg-[#9A5C3B] blur-[0.5px] opacity-30 z-10 pointer-events-none" />

          {/* Foreground Hero Content Grid */}
          <div
            ref={heroContentRef}
            className="relative z-[20] container-maurya h-full flex flex-col justify-between pt-24 pb-12 md:pb-16"
            style={{ opacity: 0 }}
          >
            {/* Core Emotional Hook */}
            <div className="content-grid my-auto flex flex-col justify-center">
              <h1 className="font-heading text-[38px] sm:text-[64px] md:text-[84px] lg:text-[96px] leading-[0.95] tracking-tight text-[#F8F5EF] max-w-[900px]">
                Every Table<br />
                <span className="italic text-[#9A5C3B]">Has A Story.</span>
              </h1>

              {/* Dedicated Widescreen Video Player Showcase for Mobile View (< md) */}
              <div className="md:hidden relative w-full aspect-video rounded-xl overflow-hidden border border-[#9A5C3B]/50 shadow-[0_20px_50px_rgba(0,0,0,0.7)] my-5 bg-black group">
                <video
                  src="/morya-hero.mp4"
                  playsInline
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#1C1414]/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-mono tracking-widest text-[#9A5C3B] border border-[#9A5C3B]/40 uppercase font-extrabold shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9A5C3B] animate-pulse" />
                  MAURYA HERITAGE FILM
                </div>
              </div>

              <p className="mt-2 md:mt-6 font-sans text-[14px] sm:text-[17px] md:text-[19px] leading-[1.6] text-[#F8F5EF]/80 max-w-[540px]">
                A sanctuary of pure vegetarian dining, where families return for generations, friends celebrate, and every meal becomes a memory.
              </p>

              {/* Action Buttons */}
              <div className="mt-6 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-[480px]">
                <Link
                  href="/visit#reserve"
                  className="cta-button font-mono text-[11px] uppercase tracking-[0.25em] px-8 py-4 inline-flex items-center justify-center text-center font-bold"
                >
                  Reserve a Table
                </Link>
                <Link
                  href="/menu"
                  className="cta-button-secondary font-mono text-[11px] uppercase tracking-[0.25em] px-8 py-4 inline-flex items-center justify-center text-center font-bold"
                >
                  View the Menu
                </Link>
              </div>
            </div>

          </div>

          {/* Vintage Red Page-Like Frame */}
          <div className="absolute inset-4 md:inset-8 border-[3px] border-[#8F1115]/35 z-30 pointer-events-none rounded-sm shadow-[inset_0_0_30px_rgba(143,17,21,0.15),0_0_20px_rgba(143,17,21,0.1)]">
            {/* Inner thin border */}
            <div className="absolute inset-1.5 border border-[#8F1115]/20">
              {/* Decorative corner dots */}
              <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-[#8F1115]/40" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#8F1115]/40" />
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-[#8F1115]/40" />
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-[#8F1115]/40" />
            </div>
            
            {/* Corner Bracket Flourishes */}
            {/* Top Left */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-[#8F1115] -translate-x-[3px] -translate-y-[3px]" />
            {/* Top Right */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-[#8F1115] translate-x-[3px] -translate-y-[3px]" />
            {/* Bottom Left */}
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-[#8F1115] -translate-x-[3px] translate-y-[3px]" />
            {/* Bottom Right */}
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-[#8F1115] translate-x-[3px] translate-y-[3px]" />
          </div>

        </section>

        {/* ── 2. STORY (Warm Ivory Paper) ───────────────────────────── */}
        <InvitationSection />

        {/* ── 3. MENU PREVIEW (Warm Beige) ──────────────────────────── */}
        <Chapter03 />

        {/* ── 4. PROMISE (Forest Green) ─────────────────────────────── */}
        <PureVegPromise />

        {/* ── 5. GALLERY / SPACE (Dark Wood Grain) ──────────────────── */}
        <Chapter04 />

        {/* ── 6. DINING MEMORIES (Guestbook Paper) ──────────────────── */}
        <Guestbook />

      </main>
    </>
  );
}
