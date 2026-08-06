"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialImage from "@/components/EditorialImage";

export default function Chapter05Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const totalScroll = scrollWrapperRef.current ? scrollWrapperRef.current.scrollWidth - window.innerWidth : 0;
      
      gsap.to(scrollWrapperRef.current, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalScroll}`, 
          scrub: 1,
          pin: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const timelineItems = [
    { label: "01. Arrival", desc: "Walking through open doors into warm golden ambient light.", image: "/editorial-entrance.webp" },
    { label: "02. Hospitality", desc: "A smiling welcome and immediate seating at your prepared table.", image: "/editorial-food-starters.webp" },
    { label: "03. Crispy Appetizers", desc: "Sizzling paneer tikka and hot tandoori starters brought to the table.", image: "/editorial-food-dosa.webp" },
    { label: "04. Shared Main Course", desc: "Creamy butter Paneer Maratha, dal tadka, and hot garlic naans.", image: "/editorial-food-mains.webp" },
    { label: "05. Fragrant Rice", desc: "Aromatic Hyderabadi veg biryani served in traditional copper handis.", image: "/editorial-food-rice.webp" },
    { label: "06. Sweet Finale", desc: "Hot gulab jamuns and chilled rabdi to complete your evening.", image: "/editorial-food-desserts.webp" },
  ];

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#350709] text-[#F8F6F1] overflow-hidden flex items-center select-none">
      
      <div 
        ref={scrollWrapperRef} 
        className="flex items-center px-[10vw] h-full gap-24"
        style={{ width: "fit-content" }}
      >
        {/* Intro Card */}
        <div className="flex-shrink-0 w-[40vw] md:w-[25vw] space-y-4">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-[#B98532] block">
            CHAPTER 05 — THE DINING FLOW
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-[#F8F6F1] leading-none">
            The Timeline<br />
            <span className="italic text-[#B98532]">Of A Meal.</span>
          </h2>
          <p className="font-sans text-xs text-[#F8F6F1]/70 leading-relaxed">
            Scroll horizontally to experience every chapter of dining at Maurya Pure Veg.
          </p>
        </div>

        {timelineItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-shrink-0 w-[70vw] md:w-[35vw]">
            <div className="w-full aspect-[4/5] bg-[#250406] p-3 border border-[#B98532]/30 shadow-2xl relative group hover:border-[#B98532] transition-colors duration-500 overflow-hidden">
              <div className="relative w-full h-full overflow-hidden">
                <EditorialImage src={item.image} alt={item.label} />
              </div>
            </div>
            <div className="mt-8 text-center space-y-2 max-w-sm">
              <span className="font-serif text-2xl md:text-4xl italic text-[#B98532] block">{item.label}</span>
              <p className="font-sans text-xs text-[#F8F6F1]/80 leading-relaxed font-light">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
