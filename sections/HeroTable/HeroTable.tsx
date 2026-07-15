"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_DISHES } from "./hero-dishes";
import HeroDish from "./HeroDish";

export default function HeroTable() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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
      // Main scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1.5,
        }
      });

      // Frame 01 Exit animations: Dishes fly out according to exit vectors
      HERO_DISHES.forEach((dish) => {
        tl.to(`#${dish.id}`, {
          x: dish.exitX,
          y: dish.exitY,
          opacity: 0,
          scale: dish.scale * 0.7,
          rotation: dish.rotation * 1.5,
          ease: "power2.inOut",
        }, 0);
      });

      // COME text moves up and fades
      tl.to("#hero-come", {
        y: -150,
        opacity: 0,
        ease: "power2.inOut",
      }, 0);

      // HUNGRY stays pinned longer, then fades out
      tl.to("#hero-hungry", {
        y: 100,
        opacity: 0,
        ease: "power2.inOut",
      }, 0.6);

      // Deep dark overlay fades in to bring total blackness
      tl.fromTo("#hero-overlay",
        { opacity: 0 },
        { opacity: 1, ease: "none" },
        0.3
      );

      // Frame 02 enters: LEAVE WITH A STORY
      tl.fromTo("#hero-frame2-content",
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, ease: "power3.out" },
        1.2
      );

      // Final brand lockup
      tl.fromTo("#hero-lockup",
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, ease: "power3.out" },
        2.0
      );

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero-table" 
      ref={triggerRef}
      className="relative w-full h-screen bg-[#0b0908] text-[#F3E8D4] overflow-hidden"
    >
      {/* ─── Frame 01: The Living Table ─── */}
      <div className="absolute inset-0 flex flex-col items-center justify-between py-24 px-6 z-20">
        
        {/* TOP WORD: COME */}
        <div 
          id="hero-come" 
          className="font-display uppercase text-center mt-[12vh] select-none"
        >
          COME
        </div>

        {/* BOTTOM WORD: HUNGRY. */}
        <div 
          id="hero-hungry" 
          className="font-display uppercase text-center mb-[8vh] select-none"
        >
          HUNGRY.
        </div>
      </div>

      {/* Art-Directed dishes surrounding the text */}
      {HERO_DISHES.map((dish) => (
        <HeroDish 
          key={dish.id} 
          dish={dish} 
          mouseX={mousePos.x} 
          mouseY={mousePos.y} 
        />
      ))}

      {/* ─── Frame 02: Cinematic Transition ─── */}
      {/* Dark overlay to consume the table scene */}
      <div 
        id="hero-overlay" 
        className="absolute inset-0 bg-[#0b0908] opacity-0 z-30 pointer-events-none"
      />

      {/* Frame 02 Content container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-40 px-6">
        <div 
          id="hero-frame2-content" 
          className="opacity-0 flex flex-col items-center gap-6"
        >
          <div className="text-center font-display uppercase leading-tight select-none">
            LEAVE WITH<br />
            <span className="italic text-[#B98532] font-normal font-display">A STORY.</span>
          </div>
        </div>

        {/* Brand stamp footer */}
        <div 
          id="hero-lockup" 
          className="absolute bottom-16 opacity-0 flex flex-col items-center gap-2"
        >
          <h1 className="font-heading text-sm tracking-[0.22em] uppercase text-[#F3E8D4] font-bold">
            MAURYA PURE VEG
          </h1>
          <p className="font-sans text-[9px] tracking-[0.18em] uppercase text-[#F3E8D4]/50">
            KONDHWA · PUNE
          </p>
        </div>
      </div>
    </section>
  );
}
