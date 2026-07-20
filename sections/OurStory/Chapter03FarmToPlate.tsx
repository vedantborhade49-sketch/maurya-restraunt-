"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialImage from "@/components/EditorialImage";

export default function Chapter03FarmToPlate() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".journey-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      step: "01",
      title: "Fresh Vegetables",
      desc: "Hand-selected produce sourced fresh from local markets at dawn.",
      image: "/editorial-spices.png",
    },
    {
      step: "02",
      title: "Daily Preparation",
      desc: "Whole spices stone-ground daily for authentic aroma & depth.",
      image: "/editorial-food-3.png",
    },
    {
      step: "03",
      title: "Traditional Recipes",
      desc: "Time-honoured recipes preserved across generations.",
      image: "/editorial-food-2.png",
    },
    {
      step: "04",
      title: "Clay Oven & Embers",
      desc: "Curries simmered over gentle tandoori embers.",
      image: "/editorial-food-4.png",
    },
    {
      step: "05",
      title: "Served With Care",
      desc: "Brought piping hot to your table with genuine warmth.",
      image: "/editorial-food-starters.png",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 md:py-36 px-6 md:px-12 bg-[#F6F1E8] text-[#350709] overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-[#B98532]">
            CHAPTER 03 — THE JOURNEY TO YOUR PLATE
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#350709] leading-tight">
            From Fresh Ingredients<br />
            <span className="italic text-[#B98532]">To Your Table.</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-[#1F1F1F]/70">
            No shortcuts. No prep boxes. Just honest, fresh ingredients prepared every day.
          </p>
        </div>

        {/* 5-Step Storytelling Strip Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((item, index) => (
            <div
              key={index}
              className="journey-card relative bg-[#F8F6F1] border border-[#B98532]/30 p-5 flex flex-col justify-between space-y-4 shadow-sm hover:border-[#B98532] hover:shadow-lg transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#B98532]/20 pb-3">
                  <span className="font-mono text-xs font-bold text-[#B98532] tracking-widest">
                    STEP {item.step}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#B98532]" />
                </div>

                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm border border-[#B98532]/20">
                  <EditorialImage src={item.image} alt={item.title} />
                </div>

                <h3 className="font-serif text-xl text-[#350709] font-medium pt-1">
                  {item.title}
                </h3>

                <p className="font-sans text-xs text-[#1F1F1F]/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Small Brass Divider Line at bottom */}
              <div className="w-8 h-[2px] bg-[#B98532]/50 pt-2" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
