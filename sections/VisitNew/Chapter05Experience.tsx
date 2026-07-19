"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function Chapter05Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll timeline for the photographic journey
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
    { label: "01. Arrival", desc: "Walking through the doors." },
    { label: "02. Greeting", desc: "Warm hospitality." },
    { label: "03. Fresh Food", desc: "The first bite." },
    { label: "04. Conversations", desc: "Laughter flowing." },
    { label: "05. Dessert", desc: "Sweet endings." },
    { label: "06. Leaving", desc: "Until tomorrow." },
  ];

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#EFE8DB] overflow-hidden flex items-center">
      
      <div 
        ref={scrollWrapperRef} 
        className="flex items-center px-[20vw] h-full gap-32"
        style={{ width: "fit-content" }}
      >
        {timelineItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-shrink-0 w-[60vw] md:w-[35vw]">
            <div className="w-full aspect-[4/5] bg-white p-2 shadow-2xl relative group hover:scale-[1.02] transition-transform duration-700">
              <ImagePlaceholder category="Timeline" description={item.desc} aspectRatio="h-full" />
            </div>
            <div className="mt-12 text-center">
              <span className="font-serif text-3xl md:text-5xl italic text-[#1F1F1F] block">{item.label}</span>
              <div className="w-px h-16 bg-[#B98555]/30 mx-auto mt-8" />
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
