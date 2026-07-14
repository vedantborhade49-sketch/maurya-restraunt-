"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialImageLayer from "./EditorialImageLayer";

export default function Chapter02() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Create a pinned timeline that scrubs as the user scrolls
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Pin for 2 viewport heights
          pin: true,
          scrub: 1,
        },
      });

      // 1. The initial statement physically separates
      tl.to("#ch2-part-1", { y: "-30vh", x: "-20vw", scale: 0.8, ease: "power1.inOut" }, 0);
      tl.to("#ch2-part-2", { y: "30vh", x: "20vw", scale: 0.8, ease: "power1.inOut" }, 0);

      // 2. Maroon divider lines animate into place (creating a frame)
      tl.to("#ch2-line-h", { scaleX: 1, ease: "power1.inOut" }, 0.2);
      tl.to("#ch2-line-v", { scaleY: 1, ease: "power1.inOut" }, 0.3);

      // 3. Tiny editorial annotations fade in to complete the composition
      tl.to(".ch2-annotation", { opacity: 1, ease: "power1.inOut", stagger: 0.1 }, 0.4);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-ch2-bg text-ch2-text overflow-hidden"
    >
      {/* ─── Layer 0: Background ─────────────────────────── */}
      <div className="texture-ch2" />
      <div className="absolute inset-0 pointer-events-none z-[2]" style={{ background: "radial-gradient(circle at 50% 40%, rgba(245,242,238,0.2) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(36,32,28,0.06)] pointer-events-none z-[2]" />

      {/* ─── Layer 1: Lines / Grid (existing — unchanged) ── */}
      <div id="ch2-line-h" className="absolute top-1/2 left-0 right-0 h-[1px] bg-ch2-accent/20 origin-left scale-x-0" style={{ zIndex: 5 }} />
      <div id="ch2-line-v" className="absolute top-0 bottom-0 left-[35vw] w-[1px] bg-ch2-accent/20 origin-top scale-y-0" style={{ zIndex: 5 }} />

      {/* ─── Layer 2: Editorial Images — always behind text (z-8) ── */}
      <EditorialImageLayer />

      {/* ─── Layer 3: Typography ──── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6" style={{ zIndex: 20 }}>
        
        <h2 className="font-heading text-5xl md:text-7xl lg:text-[110px] leading-[1.1] tracking-tight text-center text-ch2-text max-w-[1200px]">
          <div id="ch2-part-1" className="inline-block origin-bottom">
            Established in <span className="italic font-light text-ch2-accent">1999.</span>
          </div>
          <br className="hidden md:block" />
          <div id="ch2-part-2" className="inline-block mt-4 md:mt-8 origin-top">
            A legacy of vegetarian hospitality.
          </div>
        </h2>

      </div>

      {/* ─── Layer 4: Annotations (existing — unchanged) ── */}
      
      {/* Top Left Label */}
      <div className="absolute top-12 left-12 md:left-24 font-label text-[10px] tracking-[0.3em] uppercase text-ch2-text/60 ch2-annotation opacity-0" style={{ zIndex: 25 }}>
        02 — The Foundation
      </div>

      {/* Bottom Right Label */}
      <div className="absolute bottom-12 right-12 md:right-24 font-serif italic text-sm text-ch2-accent ch2-annotation opacity-0 text-right" style={{ zIndex: 25 }}>
        "Rooted in Pune."<br/>
        <span className="font-sans text-[10px] uppercase tracking-widest text-ch2-text/60 not-italic mt-2 block">Our Heritage</span>
      </div>

      {/* Vertical Spine Text */}
      <div className="absolute top-[60vh] left-6 md:left-[32vw] font-label text-[10px] tracking-[0.2em] uppercase text-ch2-text/40 rotate-180 ch2-annotation opacity-0 hidden md:block" style={{ writingMode: 'vertical-rl', zIndex: 25 }}>
        Tradition over Trend
      </div>

    </section>
  );
}
