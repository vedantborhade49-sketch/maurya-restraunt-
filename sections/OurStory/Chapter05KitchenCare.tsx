"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialImage from "@/components/EditorialImage";

export default function Chapter05KitchenCare() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".kitchen-photo-card");
      gsap.fromTo(
        items,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          stagger: 0.2,
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

  const craftGrid = [
    {
      title: "Hand-Rolled Dough",
      subtitle: "Fresh flatbreads cooked on iron griddles.",
      image: "/editorial-food-dosa.webp",
      caption: "FIG 05-A. PRECISION",
    },
    {
      title: "Simmered Over Embers",
      subtitle: "Rich gravy curries infused with slow tandoori heat.",
      image: "/editorial-food-mains.webp",
      caption: "FIG 05-B. SLOW CRAFT",
    },
    {
      title: "Seared Tandoori Kebabs",
      subtitle: "Marinated paneer seared over hot clay oven coals.",
      image: "/editorial-food-starters.webp",
      caption: "FIG 05-C. FIRE & SMOKE",
    },
    {
      title: "Hand-Garnished Finishing",
      subtitle: "Fresh herbs, fragrant oils & raw aromatic spices.",
      image: "/editorial-spices.webp",
      caption: "FIG 05-D. FINAL TOUCH",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 md:py-40 px-6 md:px-12 bg-[#350709] text-[#F8F6F1] overflow-hidden"
    >
      {/* Gold Dot Pattern Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(#B98532 1.5px, transparent 1.5px)`,
          backgroundSize: '36px 36px'
        }}
      />
      <div className="relative z-10 max-w-[1320px] mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-[#B98532]">
            CHAPTER 05 — THE KITCHEN
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F8F6F1] leading-tight font-normal">
            Behind Every Plate<br />
            <span className="italic text-[#B98532]">Is Care.</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-[#F8F6F1]/80 max-w-xl mx-auto font-light leading-relaxed">
            Hands that remember the recipes. Cooks who take pride in every pinch of salt, every stir of the ladle, and every hot dish served.
          </p>
        </div>

        {/* 4-Card Craftsmanship Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {craftGrid.map((item, index) => (
            <div
              key={index}
              className="kitchen-photo-card group relative bg-[#250406] border border-[#B98532]/30 p-4 space-y-4 shadow-xl hover:border-[#B98532] transition-all duration-300"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden border border-[#B98532]/20">
                <EditorialImage src={item.image} alt={item.title} />
              </div>

              <div className="space-y-1 pt-1">
                <h3 className="font-serif text-xl text-[#F8F6F1] font-medium">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-[#F8F6F1]/70 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
