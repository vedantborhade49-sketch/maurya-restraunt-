"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { motion } from "framer-motion";
import InvitationSection from "@/sections/Chapter02/InvitationSection";
import PureVegPromise from "@/sections/PureVegPromise/PureVegPromise";
import Chapter04 from "@/sections/Chapter04/Chapter04";
import Guestbook from "@/sections/Guestbook/Guestbook";

import MobileHero from "@/sections/MobileV2/MobileHero";
import MobileEditorial from "@/sections/MobileV2/MobileEditorial";
import MobileStats from "@/sections/MobileV2/MobileStats";
import MobileMenu from "@/sections/MobileV2/MobileMenu";
import MobileStory from "@/sections/MobileV2/MobileStory";
import MobileGallery from "@/sections/MobileV2/MobileGallery";
import MobileReviews from "@/sections/MobileV2/MobileReviews";
import MobileReservation from "@/sections/MobileV2/MobileReservation";

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


        {/* ── 1. DESKTOP HERO (Dark Vintage) ─────────────────────────────────── */}
        <section className="hidden md:flex sticky top-0 w-full min-h-[100dvh] md:h-[100dvh] overflow-hidden bg-[#1C1414] z-0 flex-col justify-between">

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
            className="relative z-[20] container-maurya h-full flex flex-col justify-between pt-16 pb-8 md:pt-24 md:pb-16"
            style={{ opacity: 0 }}
          >
            {/* Core Emotional Hook */}
            <div className="content-grid my-auto flex flex-col justify-center">


              <h1 className="font-heading text-[32px] sm:text-[64px] md:text-[84px] lg:text-[96px] leading-[0.94] tracking-tight text-[#F8F5EF] max-w-[900px]">
                Every Table<br />
                <span className="italic text-[#9A5C3B]">Has A Story.</span>
              </h1>

              {/* Popped-Out 3D Glassmorphism Mobile Video Reel Frame (< md) with Motion Scroll & Touch Feedback */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileTap={{ scale: 0.97 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="md:hidden relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-[#9A5C3B]/70 shadow-[0_20px_50px_rgba(143,17,21,0.45),0_8px_16px_rgba(0,0,0,0.8)] my-4 bg-black group"
              >
                {/* Metallic Gold Top Shimmer Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#9A5C3B] to-transparent z-20" />
                
                <video
                  src="/morya-hero.mp4"
                  playsInline
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                />

                {/* Gradient Overlays for Cinematic Touch */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 bg-[#1C1414]/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-mono tracking-widest text-[#F8F5EF] border border-[#9A5C3B]/50 uppercase font-extrabold shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  <span className="text-[#9A5C3B]">REC</span>
                  <span>• HERITAGE FILM</span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="font-serif italic text-xs text-[#F8F5EF]/90 tracking-wide">
                    Pure Vegetarian Dining Sanctuary
                  </span>
                  <span className="font-mono text-[9px] text-[#9A5C3B] uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded border border-[#9A5C3B]/30">
                    HD 1080p
                  </span>
                </div>
              </motion.div>

              {/* Mobile Quick Highlight Stats Bar */}
              <div className="grid grid-cols-3 gap-2 my-2 md:hidden">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#1C1414]/90 border border-[#9A5C3B]/40 p-2.5 rounded-xl text-center backdrop-blur-md shadow-md active:border-[#9A5C3B]"
                >
                  <span className="block font-mono text-base font-bold text-[#9A5C3B]">35+</span>
                  <span className="font-sans text-[9px] uppercase tracking-wider text-[#F8F5EF]/70">Years Legend</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.08 }}
                  className="bg-[#1C1414]/90 border border-[#9A5C3B]/40 p-2.5 rounded-xl text-center backdrop-blur-md shadow-md active:border-[#164C2B]"
                >
                  <span className="block font-mono text-base font-bold text-[#164C2B]">100%</span>
                  <span className="font-sans text-[9px] uppercase tracking-wider text-[#F8F5EF]/70">Pure Veg</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.16 }}
                  className="bg-[#1C1414]/90 border border-[#9A5C3B]/40 p-2.5 rounded-xl text-center backdrop-blur-md shadow-md active:border-amber-400"
                >
                  <span className="block font-mono text-base font-bold text-amber-400">4.9 ★</span>
                  <span className="font-sans text-[9px] uppercase tracking-wider text-[#F8F5EF]/70">Rating</span>
                </motion.div>
              </div>

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
          <MobileReservation />
        </div>

        {/* ── 3. DESKTOP STORY (Warm Ivory Paper) ──────────────────────── */}
        <div className="hidden md:block">
          <InvitationSection />
        </div>

        {/* ── 4. DESKTOP PROMISE (Forest Green) ────────────────────────── */}
        <div className="hidden md:block">
          <PureVegPromise />
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
