"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MAURYA_EASE } from "../../lib/motion/maurya-motion";

export default function FoodStory() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pinned story timeline over 280vh height (tightened & continuous)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=180%", // Pinned for 280vh total height
          pin: true,
          scrub: 1.0,
        }
      });

      // Initial States: Dish exists at brightness 0.04 and 0.96 scale
      gsap.set("#story-img-container", { 
        scale: 0.96, 
        opacity: 0.8, 
        filter: "brightness(0.04)",
        rotation: 0 
      });
      gsap.set(triggerRef.current, {
        "--spotlight-x": "50%",
        "--spotlight-y": "50%",
        "--spotlight-r": "0%",
      });

      // ─── Timeline Choreography (0.00 to 1.00) ───

      // 0.00 - 0.16: Text 1 (SOME DISHES ARE ORDERED.) reveals
      tl.fromTo("#story-text-1", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.16, ease: MAURYA_EASE.heavy },
        0
      );

      // 0.12 - 0.30: Text 1 exits. Dish rotates 0 -> 0.5deg. Subtle brightness bump.
      tl.to("#story-text-1", { opacity: 0, y: -30, duration: 0.12, ease: "power2.in" }, 0.12)
        .to("#story-img-container", { 
          rotation: 0.5, 
          filter: "brightness(0.1)",
          duration: 0.18, 
          ease: "sine.inOut" 
        }, 0.12);

      // 0.22 - 0.40: Text 2 (SOME ARE RECOMMENDED.) reveals
      tl.fromTo("#story-text-2", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.18, ease: MAURYA_EASE.heavy },
        0.22
      );

      // 0.34 - 0.52: Text 2 exits. Dish scales 0.96 -> 1.0. Light mask expands.
      tl.to("#story-text-2", { opacity: 0, y: -30, duration: 0.12, ease: "power2.in" }, 0.34)
        .to("#story-img-container", { 
          scale: 1.0, 
          duration: 0.18, 
          ease: "sine.inOut" 
        }, 0.34)
        .to(triggerRef.current, {
          "--spotlight-r": "15%",
          duration: 0.18,
          ease: "power2.inOut"
        }, 0.34);

      // 0.44 - 0.68: Text 3 (AND SOME BECOME THE REASON YOU RETURN.) reveals
      tl.fromTo("#story-text-3", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.24, ease: MAURYA_EASE.heavy },
        0.44
      );

      // 0.58 - 0.82: Text 3 exits. Dish spotlight progressively expands.
      tl.to("#story-text-3", { opacity: 0, y: -30, duration: 0.16, ease: "power2.in" }, 0.58)
        .to(triggerRef.current, {
          "--spotlight-r": "50%",
          duration: 0.24,
          ease: "power3.inOut"
        }, 0.58)
        .to("#story-img-container", {
          filter: "brightness(1)",
          scale: 1.04,
          duration: 0.24,
          ease: "power3.inOut"
        }, 0.58);

      // 0.74 - 0.92: VEG PARATHA title enters
      tl.fromTo("#story-title",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.18, ease: MAURYA_EASE.heavy },
        0.74
      );

      // 0.84 - 1.00: A MAURYA FAVOURITE subtext reveals
      tl.fromTo("#story-subtitle",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.16, ease: "power2.out" },
        0.84
      );

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={triggerRef} 
      id="food-story"
      className="relative w-full h-[280vh] bg-[#0b0908] text-[#F3E8D4]"
    >
      <div 
        ref={containerRef}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10"
      >
        {/* Background dark grain */}
        <div className="absolute inset-0 bg-[#0b0908]" />
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

        {/* Narrative Texts */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-6 z-20 pointer-events-none">
          <h3 
            id="story-text-1" 
            className="opacity-0 font-serif font-bold italic text-4xl sm:text-5xl md:text-7xl text-[#F3E8D4]/90"
          >
            Some dishes<br />are ordered.
          </h3>
          <h3 
            id="story-text-2" 
            className="opacity-0 font-serif font-bold italic text-4xl sm:text-5xl md:text-7xl text-[#F3E8D4]/90 absolute"
          >
            Some are<br />recommended.
          </h3>
          <h3 
            id="story-text-3" 
            className="opacity-0 font-serif font-bold italic text-4.5xl sm:text-5xl md:text-7xl text-[#F3E8D4]/90 absolute leading-tight"
          >
            And some become<br />the reason<br />you return.
          </h3>
        </div>

        {/* Veg Paratha spotlight image */}
        <div 
          id="story-img-container" 
          className="relative w-80 h-80 md:w-[440px] md:h-[440px] rounded-full overflow-hidden border-[6px] border-[#B98532]/25 shadow-[0_30px_70px_rgba(0,0,0,0.9)] z-10"
        >
          <Image
            src="/editorial-food-4.png"
            alt="Veg Paratha Spotlight"
            fill
            sizes="(max-width: 768px) 320px, 440px"
            className="object-cover"
            priority
          />

          {/* Animated mask layer to simulate the spotlight sweep */}
          <div 
            className="absolute inset-0 bg-[#0b0908] mix-blend-multiply pointer-events-none"
            style={{
              maskImage: "radial-gradient(circle at var(--spotlight-x) var(--spotlight-y), transparent var(--spotlight-r), black 80%)",
              WebkitMaskImage: "radial-gradient(circle at var(--spotlight-x) var(--spotlight-y), transparent var(--spotlight-r), black 80%)",
            }}
          />
        </div>

        {/* Final lockup */}
        <div 
          className="absolute bottom-16 flex flex-col items-center gap-2 z-30 pointer-events-none select-none text-center"
        >
          <h4 
            id="story-title"
            className="opacity-0 font-serif font-bold uppercase text-3xl sm:text-4xl md:text-6xl text-[#F3E8D4] tracking-wide"
          >
            VEG PARATHA
          </h4>
          <span 
            id="story-subtitle"
            className="opacity-0 font-sans text-[10px] uppercase tracking-[0.25em] text-[#B98532] font-extrabold"
          >
            A MAURYA FAVOURITE
          </span>
        </div>
      </div>
    </div>
  );
}
