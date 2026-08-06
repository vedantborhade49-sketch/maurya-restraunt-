"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const JournalHero = dynamic(() => import("@/components/gallery/JournalHero"), { ssr: true });
const SignatureCollection = dynamic(() => import("@/components/gallery/SignatureCollection"), { ssr: false });
const JournalClosing = dynamic(() => import("@/components/gallery/JournalClosing"), { ssr: false });

export default function GalleryClient() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Minor scroll trigger refresh on mount for dynamic images
    const timeoutId = setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <main ref={containerRef} className="relative w-full min-h-screen bg-[#F8F5EF] text-[#2a2420] overflow-hidden selection:bg-[#8F1115] selection:text-[#F8F5EF]">
      
      {/* Warm Paper Background & Subtle Coffee Stain Layers */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_70%_20%,rgba(143,17,21,0.02)_0%,transparent_40%)] mix-blend-multiply" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_20%_80%,rgba(185,133,50,0.02)_0%,transparent_50%)] mix-blend-multiply" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply" />

      <div className="relative z-10">
        <JournalHero />
        <SignatureCollection />
        <JournalClosing />
      </div>

    </main>
  );
}
