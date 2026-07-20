"use client";

import React, { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const GalleryTable = memo(function GalleryTable() {
  const containerRef = useRef<HTMLElement>(null);
  const breakTextRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
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

      // Staggered Entrance for Acrylic Frames
      ScrollTrigger.batch(itemsRef.current, {
        start: "top 85%",
        once: true,
        onEnter: (elements) => {
          gsap.fromTo(elements,
            { y: 50, opacity: 0, scale: 0.95 },
            { 
              y: 0, 
              opacity: 1, 
              scale: 1,
              duration: 1.5, 
              ease: "power3.out", 
              stagger: 0.2,
              onComplete: () => gsap.set(elements, { clearProps: "willChange" })
            }
          );
        }
      });

      // Subtle breathing Parallax
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        const speed = i === 0 ? -15 : -30;
        gsap.to(item, {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onEnter: () => gsap.set(item, { willChange: "transform" }),
            onLeave: () => gsap.set(item, { willChange: "auto" }),
            onEnterBack: () => gsap.set(item, { willChange: "transform" }),
            onLeaveBack: () => gsap.set(item, { willChange: "auto" }),
          }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const setItemRef = (index: number) => (el: HTMLDivElement | null) => {
    itemsRef.current[index] = el!;
  };

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden content-visibility-auto text-[#F5E8D5]">
      
      {/* Editorial Break */}
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h2 ref={breakTextRef} className="font-serif text-3xl md:text-5xl italic opacity-80 text-center tracking-wide">
          Craft Before<br />Comfort.
        </h2>
      </div>

      {/* The Table Content (Deep Cocoa environment) */}
      <div className="relative w-full min-h-[150vh] flex flex-col justify-start items-center py-20 px-6 md:px-12">
        
        {/* Animated Candle Glow Reflection */}
        <div className="absolute top-[20%] right-[-10%] w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,rgba(255,180,120,0.1)_0%,transparent_50%)] rounded-full blur-3xl pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-[10%] left-[-20%] w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(255,200,150,0.08)_0%,transparent_50%)] rounded-full blur-3xl pointer-events-none mix-blend-screen" />

        <div className="relative w-full max-w-[1200px] z-10 flex flex-col items-center gap-32">
          
          {/* Oversized Macro Crop */}
          <div ref={setItemRef(0)} className="w-full md:w-[70%] aspect-[16/9] md:aspect-[21/9] relative group">
            {/* Acrylic Glassmorphism Frame */}
            <div className="absolute inset-[-15px] bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-0 rounded-sm" />
            <div className="relative w-full h-full overflow-hidden z-10 bg-black/20">
              <Image src="/editorial-food-3.png" alt="Macro Detail" fill sizes="(max-width: 768px) 100vw, 70vw" className="object-cover scale-110 opacity-90 transition-transform duration-1000 group-hover:scale-100" decoding="async" loading="lazy" />
              {/* Visual steam/refraction cue */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent mix-blend-overlay" />
            </div>
            <p className="absolute -bottom-8 left-0 font-mono text-[9px] uppercase tracking-widest text-[#F5E8D5]/60">Table No. 12</p>
          </div>

          {/* Floating Glass Panels */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 mt-12 px-0 md:px-16">
            
            <div ref={setItemRef(1)} className="w-full aspect-[3/4] relative group mt-0 md:mt-24">
              <div className="absolute inset-[-10px] bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.4)] z-0 rounded-sm" />
              <div className="relative w-full h-full overflow-hidden z-10">
                <Image src="/editorial-food-1.png" alt="Plating Detail" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover opacity-85 transition-opacity duration-700 group-hover:opacity-100" decoding="async" loading="lazy" />
              </div>
            </div>

            <div ref={setItemRef(2)} className="w-full aspect-square relative group">
              <div className="absolute inset-[-10px] bg-white/5 backdrop-blur-sm border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.4)] z-0 rounded-sm" />
              <div className="relative w-full h-full overflow-hidden z-10">
                <Image src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800" alt="First Pour" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover opacity-85 transition-opacity duration-700 group-hover:opacity-100" decoding="async" loading="lazy" />
              </div>
              <p className="absolute -bottom-8 right-0 font-mono text-[9px] uppercase tracking-widest text-[#F5E8D5]/60 text-right">First Pour</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
});

export default GalleryTable;
