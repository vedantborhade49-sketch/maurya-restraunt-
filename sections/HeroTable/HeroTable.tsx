"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_DISHES } from "./hero-dishes";
import HeroDish from "./HeroDish";
import MauryaCurve from "../../components/brand/MauryaCurve";

export default function HeroTable() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      if (mediaQuery.matches) return;
      // Coordinates normalized to range [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Dynamic end trigger heights based on device
      const isMobile = window.innerWidth < 768;
      const scrollHeight = isMobile ? "+=150%" : "+=250%";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: scrollHeight,
          pin: true,
          scrub: 1.2,
        }
      });

      // Initial States
      gsap.set(".hero-headline-word", { y: "105%" });

      // Clipped typography reveals: COME reveals first, HUNGRY follows 120ms later
      tl.to("#hero-come-text", { y: "0%", duration: 0.5, ease: "power4.out" }, 0.05)
        .to("#hero-hungry-text", { y: "0%", duration: 0.5, ease: "power4.out" }, 0.17);

      // Subtle table light drift
      tl.to("#hero-table-light", {
        scale: 1.15,
        x: 30,
        y: -20,
        duration: 0.8,
        ease: "sine.inOut"
      }, 0);

      // Dishes drift outward & gain subtle scale (staggered exit vectors)
      HERO_DISHES.forEach((dish) => {
        tl.to(`#${dish.id}`, {
          x: dish.exitX,
          y: dish.exitY,
          rotation: dish.exitRotation,
          scale: dish.exitScale,
          opacity: 0.05,
          duration: 0.75,
          ease: "power2.inOut",
        }, 0.08 + (dish.depth * 0.1));
      });

      // COME exits upward. HUNGRY remains pinned.
      tl.to("#hero-come-wrapper", {
        y: -100,
        opacity: 0,
        duration: 0.45,
        ease: "power3.inOut"
      }, 0.18);

      // HUNGRY grows slightly, then exits downward
      tl.to("#hero-hungry-wrapper", {
        scale: 1.08,
        duration: 0.4,
        ease: "power2.out"
      }, 0.28);

      tl.to("#hero-hungry-wrapper", {
        y: 120,
        opacity: 0,
        duration: 0.45,
        ease: "power3.inOut"
      }, 0.40);

      // Dark center mask expands
      tl.to("#hero-table-light", {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      }, 0.40);

      // Frame 02 Content enters (LEAVE WITH A STORY)
      tl.fromTo("#hero-leave-with",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0.52
      );

      tl.fromTo("#hero-a-story",
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power4.out" },
        0.62
      );

      // Maurya Curve begins drawing
      tl.fromTo("#hero-curve-path",
        { pathLength: 0, opacity: 0 },
        { pathLength: 1, opacity: 1, duration: 0.6, ease: "power2.inOut" },
        0.72
      );

      // Final brand lockup stamp appears
      tl.fromTo("#hero-lockup",
        { opacity: 0, scale: 0.96, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "expo.out" },
        0.84
      );

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  // Lerped parallax values for the headline (maximum 1-2px in opposite direction)
  const headlineX = -mousePos.x * 2;
  const headlineY = -mousePos.y * 2;

  return (
    <section 
      id="hero-table" 
      ref={triggerRef}
      className="relative w-full h-screen bg-[#0B0908] text-[#F3E8D4] overflow-hidden"
    >
      {/* ─── Ambient physical table background layers ─── */}
      <div 
        id="hero-table-light"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(143,17,21,0.2)_0%,rgba(53,7,9,0.35)_40%,#0B0908_80%)] pointer-events-none z-0"
      />
      <div className="absolute inset-0 bg-noise opacity-[0.03] z-0 pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.85)] z-10 pointer-events-none" />

      {/* Subtle steam animations (atmospheric detail) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-30 select-none">
        <div className="absolute w-[50%] h-[50%] left-[25%] top-[25%] bg-[radial-gradient(circle_at_center,rgba(243,232,212,0.06)_0%,transparent_60%)] blur-[40px] animate-[pulse_6s_infinite]" />
      </div>

      {/* ─── Frame 01: Typographical Center Stage ─── */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-between py-28 px-6 z-20"
        style={{
          transform: isReducedMotion ? "none" : `translate3d(${headlineX}px, ${headlineY}px, 0)`,
          transition: "transform 1.2s cubic-bezier(0.1, 0.8, 0.2, 1)",
        }}
      >
        {/* COME wrapper */}
        <div 
          id="hero-come-wrapper" 
          className="overflow-hidden mt-[10vh]"
        >
          <div 
            id="hero-come-text"
            className="hero-headline-word font-serif font-bold italic tracking-[-0.055em] uppercase text-center select-none leading-none
                       text-7xl sm:text-[9rem] md:text-[12rem] lg:text-[14rem]"
          >
            COME
          </div>
        </div>

        {/* HUNGRY. wrapper */}
        <div 
          id="hero-hungry-wrapper" 
          className="overflow-hidden mb-[6vh]"
        >
          <div 
            id="hero-hungry-text"
            className="hero-headline-word font-serif font-bold tracking-[-0.055em] uppercase text-center select-none leading-none
                       text-7xl sm:text-[9rem] md:text-[12rem] lg:text-[14rem]"
          >
            HUNGRY.
          </div>
        </div>
      </div>

      {/* Dynamic crop-positioned food plates */}
      {HERO_DISHES.map((dish) => (
        <HeroDish 
          key={dish.id} 
          dish={dish} 
          mouseX={mousePos.x} 
          mouseY={mousePos.y} 
        />
      ))}

      {/* ─── Frame 02: Cinematic Narrative Reveal ─── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-40 px-6 pointer-events-none select-none">
        
        {/* LEAVE WITH A STORY. */}
        <div className="flex flex-col items-center gap-2 mb-12">
          <div 
            id="hero-leave-with"
            className="opacity-0 font-serif font-bold uppercase text-center leading-none text-4xl sm:text-[4.5rem] md:text-[6.5rem] tracking-tight"
          >
            LEAVE WITH
          </div>
          <div 
            id="hero-a-story"
            className="opacity-0 font-serif font-bold italic text-[#B98532] text-center leading-none text-4xl sm:text-[4.5rem] md:text-[6.5rem] tracking-tight mt-2"
          >
            A STORY.
          </div>
        </div>

        {/* Maurya Curve Sweep device in Center */}
        <div className="w-36 h-8 sm:w-48 sm:h-12 relative overflow-hidden mb-16">
          <svg viewBox="0 0 100 20" className="w-full h-full text-[#B98532] fill-none">
            <path
              id="hero-curve-path"
              d="M5,10 C30,3 70,17 95,10"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="opacity-0"
            />
          </svg>
        </div>

        {/* Brand Stamp Lockup */}
        <div 
          id="hero-lockup" 
          className="opacity-0 flex flex-col items-center gap-1.5"
        >
          <h2 className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#F3E8D4] font-extrabold">
            MAURYA PURE VEG
          </h2>
          <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#F3E8D4]/50">
            KONDHWA · PUNE
          </p>
        </div>

      </div>
    </section>
  );
}
