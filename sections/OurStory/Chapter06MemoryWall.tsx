"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialImage from "@/components/EditorialImage";

export default function Chapter06MemoryWall() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".scrapbook-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 50, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const memories = [
    {
      title: "Birthday Dinner",
      quote: "Grandparents, parents, and grandchildren sharing sweet moments over gulab jamun.",
      image: "/editorial-food-desserts.png",
      rotate: "rotate-[-3deg]",
      tape: "top",
    },
    {
      title: "Family Lunch",
      quote: "A Sunday table overflowing with sizzling starters, warm naan, and fragrant rice.",
      image: "/editorial-food-mains.png",
      rotate: "rotate-[2deg]",
      tape: "right",
    },
    {
      title: "Friends Gathering",
      quote: "Laughter that lingers long after the last plate of crispy dosa is clear.",
      image: "/editorial-food-dosa.png",
      rotate: "rotate-[-2deg]",
      tape: "left",
    },
    {
      title: "Festival Celebration",
      quote: "Festive dining surrounded by warm lights, festive cheer, and royal thalis.",
      image: "/editorial-food-rice.png",
      rotate: "rotate-[4deg]",
      tape: "top",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 md:py-40 px-6 md:px-12 bg-[#F6F1E8] text-[#350709] overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-[#B98532]">
            CHAPTER 06 — GUEST MEMORIES
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#350709] leading-tight font-normal">
            Dining Moments.<br />
            <span className="italic text-[#B98532]">Preserved In Time.</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-[#1F1F1F]/75">
            Real guest memories created around the tables of Maurya Pure Veg.
          </p>
        </div>

        {/* Scrapbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pt-4">
          {memories.map((item, index) => (
            <div
              key={index}
              className={`scrapbook-item relative bg-white border border-[#B98532]/30 p-4 shadow-[0_15px_35px_rgba(0,0,0,0.08)] ${item.rotate} transition-transform duration-500 hover:rotate-0 hover:z-30 hover:scale-105`}
            >
              {/* Masking tape visual accent */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#EFE8DB]/90 border border-[#B98532]/20 rotate-[-2deg] shadow-sm z-20" />

              <div className="relative w-full aspect-[4/3] overflow-hidden border border-[#B98532]/15 mb-4">
                <EditorialImage src={item.image} alt={item.title} />
              </div>

              <div className="space-y-2 text-center pt-1 px-1">
                <h3 className="font-serif italic text-2xl text-[#350709] font-normal">
                  "{item.title}"
                </h3>
                <p className="font-sans text-xs text-[#1F1F1F]/75 leading-relaxed">
                  {item.quote}
                </p>
                <div className="pt-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[#B98532] font-bold">
                  MAURYA MEMORY #{index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
