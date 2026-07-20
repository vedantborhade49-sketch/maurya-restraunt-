"use client";

import React, { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const KITCHEN_IMAGES = [
  { src: "https://images.unsplash.com/photo-1581184953963-d15972933fc1?q=80&w=800", alt: "The Chef" },
  { src: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?q=80&w=800", alt: "Tools" },
  { src: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=800", alt: "Glassware" },
  { src: "/editorial-food-3.png", alt: "Plating" },
  { src: "/editorial-food-2.png", alt: "Service" },
  { src: "https://images.unsplash.com/photo-1414235077428-9710c28afbb3?q=80&w=800", alt: "Atmosphere" },
];

const COLLAGE_STATES = [
  { x: 100, y: 50, rot: -5, scale: 1.4 },
  { x: -80, y: 120, rot: 8, scale: 1.6 },
  { x: -150, y: -50, rot: -12, scale: 1.5 },
  { x: 120, y: -100, rot: 15, scale: 1.3 },
  { x: 50, y: 150, rot: -8, scale: 1.5 },
  { x: -100, y: -150, rot: 6, scale: 1.4 },
];

const EXHIBITION_STATES = [
  { x: -300, y: -200, rot: 0, scale: 1.2 },
  { x: 0, y: -250, rot: 0, scale: 1.3 },
  { x: 300, y: -150, rot: 0, scale: 1.1 },
  { x: -250, y: 200, rot: 0, scale: 1.2 },
  { x: 50, y: 250, rot: 0, scale: 1.4 },
  { x: 350, y: 180, rot: 0, scale: 1.2 },
];

const GalleryKitchen = memo(function GalleryKitchen() {
  const containerRef = useRef<HTMLElement>(null);
  const breakTextRef = useRef<HTMLHeadingElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      
      // Editorial Break Fade
      if (breakTextRef.current) {
        gsap.fromTo(breakTextRef.current,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.5, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: breakTextRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // The Signature Moment Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sequenceRef.current,
          start: "top top",
          end: "+=2000", // Long scroll for cinematic pacing
          scrub: 1,
          pin: true,
          onEnter: () => itemsRef.current.forEach(el => gsap.set(el, { willChange: "transform, opacity" })),
          onLeave: () => itemsRef.current.forEach(el => gsap.set(el, { willChange: "auto" })),
          onEnterBack: () => itemsRef.current.forEach(el => gsap.set(el, { willChange: "transform, opacity" })),
          onLeaveBack: () => itemsRef.current.forEach(el => gsap.set(el, { willChange: "auto" })),
        }
      });

      // Part 1: Dense Collage -> Contact Sheet Grid
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        const start = COLLAGE_STATES[i];
        
        // Initial state set
        gsap.set(el, { 
          xPercent: isMobile ? start.x / 2 : start.x, 
          yPercent: isMobile ? start.y / 2 : start.y, 
          rotationZ: start.rot, 
          scale: start.scale,
          opacity: 0
        });

        // Tween to grid
        tl.to(el, {
          xPercent: 0,
          yPercent: 0,
          rotationZ: 0,
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: "power2.inOut"
        }, 0);
      });

      // Pause (represented by empty space in the timeline)
      tl.addLabel("pause", "+=0.5");

      // Part 2: Contact Sheet -> Museum Exhibition
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        const end = EXHIBITION_STATES[i];
        
        tl.to(el, {
          xPercent: isMobile ? end.x / 2 : end.x,
          yPercent: isMobile ? end.y / 2 : end.y,
          scale: end.scale,
          duration: 2.5,
          ease: "power1.inOut"
        }, "pause");
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const setItemRef = (index: number) => (el: HTMLDivElement | null) => {
    itemsRef.current[index] = el!;
  };

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden content-visibility-auto">
      
      {/* Editorial Break */}
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h2 ref={breakTextRef} className="font-serif text-3xl md:text-5xl italic opacity-80 text-center tracking-wide">
          Every Plate<br />Carries A Story.
        </h2>
      </div>

      {/* The Signature Sequence */}
      <div ref={sequenceRef} className="relative w-full h-screen flex items-center justify-center bg-[#E0D8D0]">
        
        {/* Grease paper / rough texture overlay */}
        <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-30 mix-blend-multiply pointer-events-none" />

        <div className="relative z-10 w-full max-w-[900px] px-4 grid grid-cols-3 gap-2 md:gap-4">
          {KITCHEN_IMAGES.map((img, i) => (
            <div 
              key={`kitchen-${i}`}
              ref={setItemRef(i)}
              className="relative aspect-square md:aspect-[4/5] bg-white p-2 shadow-lg"
              // Torn notebook edge effect using CSS mask-image (simple radial gradient approximation)
              style={{ maskImage: "radial-gradient(circle at center, black 100%, transparent 100%)" }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image 
                  src={img.src} 
                  alt={img.alt} 
                  fill 
                  sizes="(max-width: 768px) 30vw, 20vw" 
                  className="object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700" 
                  decoding="async" 
                  loading="lazy" 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Floating Typography */}
        <div className="absolute bottom-10 left-10 font-mono text-[9px] uppercase tracking-widest text-black/60 pointer-events-none">
          Kitchen Ritual
        </div>
        <div className="absolute top-10 right-10 font-mono text-[9px] uppercase tracking-widest text-black/60 pointer-events-none">
          Plating Study
        </div>
      </div>

    </section>
  );
});

export default GalleryKitchen;
