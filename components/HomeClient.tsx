"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import below-the-fold sections to optimize initial bundle & LCP
const InvitationSection = dynamic(() => import("@/sections/Chapter02/InvitationSection"), { ssr: false });
const Chapter04 = dynamic(() => import("@/sections/Chapter04/Chapter04"), { ssr: false });
const Guestbook = dynamic(() => import("@/sections/Guestbook/Guestbook"), { ssr: false });

import MobileHero from "@/sections/MobileV2/MobileHero";
const MobileEditorial = dynamic(() => import("@/sections/MobileV2/MobileEditorial"), { ssr: false });
const MobileStats = dynamic(() => import("@/sections/MobileV2/MobileStats"), { ssr: false });
const MobileMenu = dynamic(() => import("@/sections/MobileV2/MobileMenu"), { ssr: false });
const MobileStory = dynamic(() => import("@/sections/MobileV2/MobileStory"), { ssr: false });
const MobileGallery = dynamic(() => import("@/sections/MobileV2/MobileGallery"), { ssr: false });
const MobileReviews = dynamic(() => import("@/sections/MobileV2/MobileReviews"), { ssr: false });

export default function HomeClient() {
  const videoRef       = useRef<HTMLVideoElement>(null);
  const overlayRef     = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only initialize video animations on desktop viewports
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

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
      <main className="relative w-full bg-[#161413] text-[#F8F5EF] selection:bg-[#C62828] selection:text-[#F8F5EF]">

        {/* ── 1. DESKTOP HERO (Dark Vintage) ─────────────────────────────────── */}
        <section className="hidden md:flex relative w-full min-h-[100dvh] md:h-[100dvh] overflow-hidden bg-[#1C1414] z-0 flex-col justify-between">

          {/* Background Layer 1: Desktop Hero Video Container */}
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#1C1414]">
            {/* Main Hero Video with lightweight poster for instant LCP paint */}
            <video
              ref={videoRef}
              src="/morya-hero.mp4"
              poster="/morya-hero-poster.webp"
              playsInline
              muted
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
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
            className="relative z-[20] container-maurya h-full flex flex-col justify-between pt-16 pb-8 md:pt-24 md:pb-16"
            style={{ opacity: 0 }}
          >
            {/* Core Emotional Hook */}
            <div className="content-grid my-auto flex flex-col justify-center">

              <h1 className="font-heading text-[32px] sm:text-[64px] md:text-[84px] lg:text-[96px] leading-[0.94] tracking-tight text-[#F8F5EF] max-w-[900px]">
                Every Table<br />
                <span className="italic text-[#9A5C3B]">Has A Story.</span>
              </h1>

              <p className="mt-3 md:mt-6 font-sans text-[14px] sm:text-[17px] md:text-[19px] leading-[1.55] text-[#F8F5EF]/80 max-w-[540px]">
                A sanctuary of pure vegetarian dining, where families return for generations, friends celebrate, and every meal becomes a memory.
              </p>

              {/* Action Buttons */}
              <div className="mt-5 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-[480px]">
                <Link
                  href="/visit#reserve"
                  className="cta-button font-mono text-[11px] uppercase tracking-[0.25em] px-8 py-3.5 sm:py-4 inline-flex items-center justify-center text-center font-bold shadow-[0_10px_30px_rgba(143,17,21,0.5)] active:scale-[0.98] transition-transform"
                >
                  Reserve a Table
                </Link>
                <Link
                  href="/menu"
                  className="cta-button-secondary font-mono text-[11px] uppercase tracking-[0.25em] px-8 py-3.5 sm:py-4 inline-flex items-center justify-center text-center font-bold active:scale-[0.98] transition-transform"
                >
                  View the Menu
                </Link>
              </div>
            </div>

          </div>

        </section>

        {/* ── 2. MOBILE V2 REBUILD ─────────────────────────────────────── */}
        <div className="md:hidden w-full flex flex-col">
          <MobileHero />
          <MobileEditorial />
          <MobileStats />
          <MobileMenu />
          <MobileStory />
          <MobileGallery />
          <MobileReviews />
        </div>

        {/* ── 3. DESKTOP STORY (Warm Ivory Paper) ──────────────────────── */}
        <div className="hidden md:block">
          <InvitationSection />
        </div>

        {/* ── 5. DESKTOP GALLERY / SPACE (Dark Wood Grain) ─────────────── */}
        <div className="hidden md:block">
          <Chapter04 />
        </div>

        {/* ── 6. DESKTOP DINING MEMORIES (Guestbook Paper) ─────────────── */}
        <div className="hidden md:block">
          <Guestbook />
        </div>

      </main>
    </>
  );
}
