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
      // Create pinned story timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1.2,
        }
      });

      // Initially set states
      gsap.set("#story-img-container", { scale: 0.8, opacity: 0, filter: "brightness(0.08)" });
      gsap.set(triggerRef.current, {
        "--spotlight-x": "30%",
        "--spotlight-y": "30%",
        "--spotlight-r": "0%",
      });

      // 0.00 - 0.18: "Some dishes are ordered."
      tl.fromTo("#story-text-1", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: MAURYA_EASE.heavy }
      );
      tl.to("#story-text-1", { opacity: 0, y: -30, duration: 0.4, delay: 0.4 });

      // 0.18 - 0.36: "Some are recommended."
      tl.fromTo("#story-text-2", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: MAURYA_EASE.heavy }
      );
      tl.to("#story-text-2", { opacity: 0, y: -30, duration: 0.4, delay: 0.4 });

      // 0.36 - 0.58: Silhouette of Veg Maratha enters
      tl.fromTo("#story-img-container",
        { scale: 0.75, opacity: 0 },
        { scale: 1.0, opacity: 0.7, duration: 0.8, ease: MAURYA_EASE.heavy }
      );

      // 0.58 - 0.76: "And some become the reason you return."
      tl.fromTo("#story-text-3", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: MAURYA_EASE.heavy }
      );
      tl.to("#story-text-3", { opacity: 0, y: -30, duration: 0.4, delay: 0.4 });

      // 0.76 - 0.90: Spotlight sweeps across the dish to reveal details
      tl.to(triggerRef.current, {
        "--spotlight-x": "50%",
        "--spotlight-y": "50%",
        "--spotlight-r": "40%",
        duration: 0.8,
        ease: "power2.inOut",
      });
      tl.to("#story-img-container", {
        filter: "brightness(1)",
        opacity: 1,
        scale: 1.05,
        duration: 0.8,
        ease: "power2.inOut",
      }, "-=0.8");

      // 0.90 - 1.00: Final lockup fades in
      tl.fromTo("#story-lockup",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: MAURYA_EASE.heavy }
      );

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={triggerRef} 
      id="food-story"
      className="relative w-full h-[400vh] bg-[#0b0908] text-[#F3E8D4]"
    >
      <div 
        ref={containerRef}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10"
      >
        {/* Background dark grain */}
        <div className="absolute inset-0 bg-[#0b0908]" />

        {/* Narrative Texts */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-6 z-20 pointer-events-none">
          <h3 
            id="story-text-1" 
            className="opacity-0 font-display italic text-4xl md:text-6xl text-[#F3E8D4]/90"
          >
            Some dishes are ordered.
          </h3>
          <h3 
            id="story-text-2" 
            className="opacity-0 font-display italic text-4xl md:text-6xl text-[#F3E8D4]/90 absolute"
          >
            Some are recommended.
          </h3>
          <h3 
            id="story-text-3" 
            className="opacity-0 font-display italic text-4xl md:text-6xl text-[#F3E8D4]/90 absolute"
          >
            And some become the reason you return.
          </h3>
        </div>

        {/* Veg Maratha spotlight image */}
        <div 
          id="story-img-container" 
          className="relative w-80 h-80 md:w-[420px] md:h-[420px] rounded-full overflow-hidden border-2 border-[#B98532]/20 shadow-[0_30px_70px_rgba(0,0,0,0.8)] opacity-0 z-10"
        >
          <Image
            src="/editorial-food-4.png"
            alt="Veg Maratha Spotlight"
            fill
            sizes="(max-width: 768px) 320px, 420px"
            className="object-cover"
          />

          {/* Animated mask layer to simulate the spotlight sweep */}
          <div 
            className="absolute inset-0 bg-[#0b0908] mix-blend-multiply pointer-events-none"
            style={{
              maskImage: "radial-gradient(circle at var(--spotlight-x) var(--spotlight-y), transparent var(--spotlight-r), black 75%)",
              WebkitMaskImage: "radial-gradient(circle at var(--spotlight-x) var(--spotlight-y), transparent var(--spotlight-r), black 75%)",
            }}
          />
        </div>

        {/* Final lockup */}
        <div 
          id="story-lockup" 
          className="absolute bottom-20 flex flex-col items-center gap-2 z-30 opacity-0 pointer-events-none"
        >
          <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#B98532] font-bold">
            A MAURYA FAVOURITE
          </span>
          <h4 className="font-display uppercase text-3xl md:text-5xl text-[#F3E8D4] tracking-wide">
            VEG MARATHA
          </h4>
        </div>
      </div>
    </div>
  );
}
