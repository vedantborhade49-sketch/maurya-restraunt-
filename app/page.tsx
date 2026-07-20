"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import EditorialSequence from "@/sections/EditorialSequence/EditorialSequence";
import Chapter02 from "@/sections/Chapter02/Chapter02";
import Chapter03 from "@/sections/Chapter03/Chapter03";
import Chapter04 from "@/sections/Chapter04/Chapter04";


import PureVegPromise from "@/sections/PureVegPromise/PureVegPromise";
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

      <main className="relative w-full bg-[#F8F5EF] text-[#272322] selection:bg-[#6E3236] selection:text-[#F8F5EF]">

        {/* Film grain */}
        <div
          className="pointer-events-none fixed inset-0 z-[100] opacity-[0.04] mix-blend-multiply"
          style={{ filter: "url(#grain)", backgroundColor: "#a09070" }}
        />


        {/* ── HERO ────────────────────────────────────────────────── */}
        <section className="sticky top-0 w-full h-[100dvh] overflow-hidden bg-black z-0">

          <video
            ref={videoRef}
            src="/morya-hero.mp4"
            playsInline
            muted
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 1 }}
          />

          <div
            ref={overlayRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0,
              background: "linear-gradient(160deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.65) 100%)",
            }}
          />

          <div
            ref={heroContentRef}
            className="absolute inset-0 z-[20] flex flex-col justify-end"
            style={{ opacity: 0 }}
          >
            <div className="max-w-[1400px] mx-auto w-full px-8 md:px-12 pb-16 md:pb-20">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#F8F5EF]/60 mb-8 leading-relaxed">
                Issue 001 &nbsp;·&nbsp; Pune
              </p>
              <h1 className="font-heading text-[40px] md:text-[56px] leading-[1.0] tracking-tight text-[#F8F5EF] max-w-[380px]">
                Where families<br />return.
              </h1>
              <p className="mt-5 font-heading italic text-[15px] md:text-[18px] leading-[1.5] text-[#F8F5EF]/65 max-w-[260px]">
                A place where every meal<br />becomes a memory.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Link
                  href="/menu"
                  className="cta-button font-mono text-[10px] uppercase tracking-[0.25em] px-8 py-4 inline-flex items-center justify-center"
                >
                  Explore the Menu
                </Link>
                <div className="flex items-center gap-5 font-mono text-[8px] uppercase tracking-[0.2em] text-[#F8F5EF]/45">
                  <span>Pure Veg</span>
                  <span className="text-[#A56A43]">·</span>
                  <span>Garden Dining</span>
                  <span className="text-[#A56A43]">·</span>
                  <span>Since 1998</span>
                </div>
              </div>
            </div>
          </div>

        </section>

        <Chapter02 />
        <EditorialSequence />
        <Chapter03 />
        <Chapter04 />
        <PureVegPromise />
        <Guestbook />
      </main>
    </>
  );
}
