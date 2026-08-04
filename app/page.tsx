"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { motion } from "framer-motion";
import InvitationSection from "@/sections/Chapter02/InvitationSection";
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

      <main className="relative w-full bg-[#F8F6F1] md:bg-[#161413] text-[#1E1A17] md:text-[#F8F5EF] selection:bg-[#6D2323] selection:text-[#F8F5EF]">

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

        {/* ── 1. MOBILE HERO (Editorial Luxury - MAURYA V15) ───────────────── */}
        <section className="md:hidden relative w-full min-h-[110vh] bg-[#F8F6F1] z-10 flex flex-col items-center pt-28 pb-12 px-5 text-[#1E1A17] overflow-hidden">
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

          {/* Chapter Label */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="flex flex-col items-center mb-8"
          >
            <span className="font-sans text-[9px] tracking-[0.3em] font-bold text-[#6D2323] uppercase mb-2">
              WELCOME HOME
            </span>
            <div className="w-8 h-[1px] bg-[#B98532]" />
          </motion.div>

          {/* Large Serif Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif italic text-5xl leading-[1.1] text-center text-[#1E1A17] max-w-[280px] mx-auto mb-10"
          >
            Every Table<br/>Has A Story.
          </motion.h1>

          {/* Cinematic Photograph */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
            className="w-full aspect-[4/5] rounded-[24px] overflow-hidden mb-10 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
          >
            <img src="/home.png" alt="Maurya Elegant Dining Setup" className="w-full h-full object-cover" />
          </motion.div>

          {/* Statistic Cards */}
          <div className="w-full grid grid-cols-3 gap-2 mb-10">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-[#F8F6F1] border border-[#B98532]/30 rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm">
              <span className="font-serif italic text-lg text-[#6D2323]">35+</span>
              <span className="font-sans text-[8px] uppercase tracking-wider text-[#5A3A22] mt-1">Years of Legacy</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-[#F8F6F1] border border-[#B98532]/30 rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm">
              <span className="font-serif italic text-lg text-[#6D2323]">100%</span>
              <span className="font-sans text-[8px] uppercase tracking-wider text-[#5A3A22] mt-1">Pure Vegetarian</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="bg-[#F8F6F1] border border-[#B98532]/30 rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm">
              <span className="font-serif italic text-lg text-[#6D2323]">4.9★</span>
              <span className="font-sans text-[8px] uppercase tracking-wider text-[#5A3A22] mt-1">Google Rating</span>
            </motion.div>
          </div>

          {/* Minimal Emotional Copy */}
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }}
            className="font-sans font-light text-[15px] leading-[1.6] text-center text-[#5A3A22] max-w-[300px] mb-10"
          >
            Every meal begins with fresh ingredients, warm hospitality and ends with another beautiful memory.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
            className="w-full flex flex-col gap-3"
          >
            <Link href="/visit#reserve" className="w-full h-[56px] bg-[#6D2323] text-[#F8F6F1] rounded-full flex items-center justify-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.15em] shadow-md active:scale-95 transition-transform">
              Reserve A Table
              <span className="text-[#B98532]">→</span>
            </Link>
            <Link href="/menu" className="w-full h-[56px] bg-transparent border border-[#B98532]/40 text-[#5A3A22] rounded-full flex items-center justify-center font-sans text-[11px] font-bold uppercase tracking-[0.15em] active:scale-95 transition-transform">
              Explore Menu
            </Link>
          </motion.div>
        </section>

        {/* ── 2. STORY (Warm Ivory Paper) ───────────────────────────── */}
        <InvitationSection />

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
