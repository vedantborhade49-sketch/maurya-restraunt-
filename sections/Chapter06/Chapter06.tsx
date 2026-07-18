"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MarginNote, WashiTape, BrassPin, PaperClip, FloatingHandwriting } from "@/components/MicroArtifacts";

const MEMORIES = [
  {
    type: "note",
    title: "18th Anniversary",
    text: "Still sitting at Table 7. Thank you for making every year feel the same.",
    author: "— Joshi Family",
    date: "12 Oct",
    rotation: -2,
    tape: true
  },
  {
    type: "polaroid",
    title: "Dad's Favorite",
    text: "Dad insisted we celebrate here. Now our children do too.",
    author: "— Patil Family",
    date: "Summer '19",
    rotation: 1,
    pin: true,
    image: "/restaurant-interior.png"
  },
  {
    type: "napkin",
    title: "First Birthday",
    text: "Our son's first birthday. 2016. Today he ordered the same dosa himself.",
    author: "— The Sharma's",
    date: "2016 / 2024",
    rotation: -1,
    clip: true
  }
];

export default function Chapter06() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      
      const pages = gsap.utils.toArray<HTMLElement>(".memory-page");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: `+=${MEMORIES.length * 100}%`,
          scrub: 1,
        }
      });

      pages.forEach((page, i) => {
        // Last page doesn't flip away
        if (i === pages.length - 1) return;

        // Subtle page turn effect: lift, rotate slightly, and move away
        tl.to(page, {
          yPercent: -120,
          rotationZ: -5,
          scale: 0.95,
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0)",
          opacity: 0,
          duration: 1,
          ease: "power2.inOut"
        }, `turn${i}`);

        // The page underneath subtle scale up
        tl.fromTo(pages[i + 1],
          { scale: 0.95, opacity: 0.5, yPercent: 5 },
          { scale: 1, opacity: 1, yPercent: 0, duration: 1, ease: "power2.inOut" },
          `turn${i}`
        );
      });

      // Subtle ambient motion for shadows/photos
      gsap.to(".ambient-shadow", {
        x: 10,
        y: 10,
        opacity: 0.6,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#1c1815] text-[#262626] overflow-hidden z-20">
      
      {/* Desk Lamp Ambient Lighting */}
      <div className="absolute top-0 right-[20%] w-[60vw] h-[60vw] rounded-full bg-[#f9e0b8] opacity-10 blur-[100px] pointer-events-none z-0 mix-blend-screen" />
      <div className="absolute bottom-0 left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#8B5A2B] opacity-10 blur-[120px] pointer-events-none z-0" />

      {/* Stack of Pages Container */}
      <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12 z-10">
        
        {/* Background stack visual layer to give depth */}
        <div className="absolute w-[90vw] md:w-[50vw] aspect-[4/5] bg-[#e6dfd1] rounded-sm shadow-2xl opacity-40 translate-y-4 translate-x-2 texture-ch3-paper" />
        <div className="absolute w-[90vw] md:w-[50vw] aspect-[4/5] bg-[#eae4d8] rounded-sm shadow-xl opacity-60 translate-y-2 translate-x-1 texture-ch3-paper" />

        {MEMORIES.map((memory, i) => (
          <div 
            key={i}
            className="memory-page absolute w-[90vw] md:w-[50vw] aspect-[4/5] md:aspect-square lg:aspect-[4/5] bg-[#f4ebd8] rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center justify-center p-8 md:p-16 texture-ch3-paper"
            style={{ 
              zIndex: MEMORIES.length - i,
              opacity: i === 0 ? 1 : 0.5,
              transform: i === 0 ? "scale(1)" : "scale(0.95) translateY(5%)"
            }}
          >
            {/* Edge texture / wear */}
            <div className="absolute inset-0 border border-[#8B5A2B]/10 rounded-sm pointer-events-none" />
            <div className="ambient-shadow absolute inset-0 shadow-[inset_0_0_100px_rgba(139,90,43,0.05)] pointer-events-none" />

            {/* Inner Content Area */}
            <div 
              className="relative w-full max-w-[400px] bg-white/40 p-10 md:p-14 shadow-sm"
              style={{ transform: `rotate(${memory.rotation}deg)` }}
            >
              {memory.tape && <WashiTape className="top-[-15px] left-[20%]" />}
              {memory.pin && <BrassPin className="top-4 left-1/2 -translate-x-1/2" />}
              {memory.clip && <PaperClip className="top-[-10px] right-8" />}

              {memory.type === "polaroid" && memory.image && (
                <div className="w-full aspect-square bg-[#080706] mb-6 p-3 pb-12 bg-white shadow-md relative">
                  <img src={memory.image} alt={memory.title} className="w-full h-full object-cover grayscale-[40%] sepia-[20%]" />
                  <FloatingHandwriting text={memory.title} className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[#262626] text-sm" />
                </div>
              )}

              {memory.type !== "polaroid" && (
                <h3 className="font-heading text-2xl md:text-3xl text-[#262626] mb-6 border-b border-[#262626]/10 pb-4">
                  {memory.title}
                </h3>
              )}

              <p className="font-heading italic text-2xl md:text-[28px] text-[#4a3b32] leading-[1.4]">
                "{memory.text}"
              </p>

              <div className="mt-8 flex justify-between items-end border-t border-[#262626]/10 pt-4">
                <FloatingHandwriting text={memory.author} className="text-[#6B2525] text-xl" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#262626]/40">
                  {memory.date}
                </span>
              </div>
            </div>

            <p className="absolute bottom-6 right-8 font-mono text-[9px] uppercase tracking-widest text-[#262626]/30">
              Page 0{i + 1}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}
