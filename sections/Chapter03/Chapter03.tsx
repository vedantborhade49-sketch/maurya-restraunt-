"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SteamMotif from "@/components/SteamMotif";
import { MarginNote } from "@/components/MicroArtifacts";

export default function Chapter03() {
  const containerRef = useRef<HTMLElement>(null);

  // Scene references
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);

  // Text overlay references
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // Master ScrollTrigger timeline with pinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: isMobile ? "+=220%" : "+=280%",
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Initial state: Scene 1 visible, others prepped
      gsap.set(scene1Ref.current, { opacity: 1, scale: 1.12 });
      gsap.set(text1Ref.current, { opacity: 1, y: 0 });

      gsap.set(scene2Ref.current, { opacity: 0, scale: 1.1 });
      gsap.set(text2Ref.current, { opacity: 0, y: 20 });

      gsap.set(scene3Ref.current, { opacity: 0, scale: 1.1 });
      gsap.set(text3Ref.current, { opacity: 0, y: 20 });

      gsap.set(scene4Ref.current, { opacity: 0, scale: 1.1 });
      gsap.set(text4Ref.current, { opacity: 0, y: 20 });

      // ── SCENE 1: Fresh Ingredients (0s to 1.8s) ──
      tl.to(scene1Ref.current, { scale: 1.0, duration: 1.8, ease: "none" }, 0);

      // ── TRANSITION TO SCENE 2: Prepared with Care (1.8s to 3.5s) ──
      tl.to(scene1Ref.current, { opacity: 0, duration: 1.0, ease: "power1.inOut" }, 1.8);
      tl.to(text1Ref.current, { opacity: 0, y: -20, duration: 0.8, ease: "power1.in" }, 1.8);

      tl.to(scene2Ref.current, { opacity: 1, scale: 1.0, duration: 1.2, ease: "power1.out" }, 2.0);
      tl.to(text2Ref.current, { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 2.2);

      // ── TRANSITION TO SCENE 3: Cooked Fresh (3.8s to 5.5s) ──
      tl.to(scene2Ref.current, { opacity: 0, duration: 1.0, ease: "power1.inOut" }, 3.8);
      tl.to(text2Ref.current, { opacity: 0, y: -20, duration: 0.8, ease: "power1.in" }, 3.8);

      tl.to(scene3Ref.current, { opacity: 1, scale: 1.0, duration: 1.2, ease: "power1.out" }, 4.0);
      tl.to(text3Ref.current, { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 4.2);

      // ── TRANSITION TO SCENE 4: Served Every Morning (5.8s to 8.0s) ──
      tl.to(scene3Ref.current, { opacity: 0, duration: 1.0, ease: "power1.inOut" }, 5.8);
      tl.to(text3Ref.current, { opacity: 0, y: -20, duration: 0.8, ease: "power1.in" }, 5.8);

      tl.to(scene4Ref.current, { opacity: 1, scale: 1.0, duration: 1.2, ease: "power1.out" }, 6.0);
      tl.to(text4Ref.current, { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 6.2);

      // Hold Scene 4 at end smoothly
      tl.to(scene4Ref.current, { scale: 1.03, duration: 1.5, ease: "none" }, 7.2);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#EFE8DB] text-[#272322] py-16 md:py-24 overflow-hidden flex flex-col justify-center">
      {/* Background Texture - Paper Grain */}
      <div className="absolute inset-0 z-0 opacity-40 texture-ch3-paper pointer-events-none mix-blend-multiply" />

      <div className="relative w-full flex flex-col items-center gap-8 md:gap-12 container-maurya z-10 my-auto">
        
        {/* Layer 1: Editorial Typography (Kept exactly identical to existing layout) */}
        <div className="content-grid w-full text-center max-w-[900px] mx-auto">
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#9A5C3B] font-bold mb-3 block">
            02 &nbsp;·&nbsp; THE CRAFT & THE TABLE
          </span>
          <h2 className="font-heading text-[40px] sm:text-[60px] md:text-[76px] text-[#272322] leading-[0.98] tracking-tight">
            Fresh Every Morning.<br/>
            <span className="italic text-[#9A5C3B]">Served Every Evening.</span>
          </h2>
        </div>

        {/* Layer 2: Pinned 4-Scene Scroll-Driven Animated Visual Experience */}
        <div className="relative w-full max-w-[900px] mx-auto z-10">
          
          <div className="overflow-hidden bg-[#1a1715] relative shadow-2xl rounded-sm w-full h-[48vh] md:h-[65vh] border border-[#9A5C3B]/30 transform-gpu">
            
            {/* Metallic Gold Top Shimmer Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent z-40" />

            {/* ── SCENE 1: Fresh Ingredients ── */}
            <div ref={scene1Ref} className="absolute inset-0 w-full h-full transform-gpu">
              <img 
                src="/editorial-spices.png" 
                alt="Fresh Ingredients" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
            </div>

            {/* ── SCENE 2: Prepared with Care ── */}
            <div ref={scene2Ref} className="absolute inset-0 w-full h-full transform-gpu">
              <img 
                src="/cooking.jpeg" 
                alt="Chef preparing dish" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
              {/* Subtle falling spice dust overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* ── SCENE 3: Cooked Fresh ── */}
            <div ref={scene3Ref} className="absolute inset-0 w-full h-full transform-gpu">
              <img 
                src="/inside1.jpeg" 
                alt="Slow cooked tandoori ember dish" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
              {/* Live Tandoori Flame & Steam Motif */}
              <SteamMotif className="opacity-30 mix-blend-screen pointer-events-none z-20" />
              <div className="absolute inset-0 bg-amber-600/10 mix-blend-color-dodge animate-pulse pointer-events-none" />
            </div>

            {/* ── SCENE 4: Served Every Morning ── */}
            <div ref={scene4Ref} className="absolute inset-0 w-full h-full transform-gpu">
              <img 
                src="/inside3.png" 
                alt="Beautifully plated dish served" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
            </div>
            
            {/* ── DYNAMIC SCENE TEXT OVERLAYS ── */}
            {/* Text Overlay Scene 1 */}
            <div ref={text1Ref} className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 z-30 pointer-events-none flex flex-col items-start">
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] bg-black/60 px-3 py-1 rounded border border-[#D4AF37]/40 mb-2">
                SCENE 01 / INGREDIENTS
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl text-[#F8F5EF] drop-shadow-lg">
                Fresh Ingredients
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#F8F5EF]/85 mt-1 font-light tracking-wide drop-shadow">
                Handpicked every morning.
              </p>
            </div>

            {/* Text Overlay Scene 2 */}
            <div ref={text2Ref} className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 z-30 pointer-events-none flex flex-col items-start">
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] bg-black/60 px-3 py-1 rounded border border-[#D4AF37]/40 mb-2">
                SCENE 02 / CRAFTSMANSHIP
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl text-[#F8F5EF] drop-shadow-lg">
                Prepared with Care
              </h3>
            </div>

            {/* Text Overlay Scene 3 */}
            <div ref={text3Ref} className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 z-30 pointer-events-none flex flex-col items-start">
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] bg-black/60 px-3 py-1 rounded border border-[#D4AF37]/40 mb-2">
                SCENE 03 / TANDOORI EMBERS
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl text-[#F8F5EF] drop-shadow-lg">
                Cooked Fresh
              </h3>
            </div>

            {/* Text Overlay Scene 4 */}
            <div ref={text4Ref} className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 z-30 pointer-events-none flex flex-col items-start">
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] bg-black/60 px-3 py-1 rounded border border-[#D4AF37]/40 mb-2">
                SCENE 04 / PRESENTATION
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl text-[#F8F5EF] drop-shadow-lg">
                Served Every Morning
              </h3>
            </div>

            {/* Minimal Editorial Corner Note (Original layout preservation) */}
            <MarginNote text="The Culinary Sequence" className="absolute top-6 left-6 text-[#F8F5EF] z-30 opacity-90 font-mono text-[10px]" rotate="0deg" />
          </div>
        </div>

      </div>
    </section>
  );
}
