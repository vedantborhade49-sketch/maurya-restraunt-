"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function Chapter03MemoryWall() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const notes = gsap.utils.toArray(".memory-note");
      
      notes.forEach((note: any, i) => {
        // Different parallax speed and slight rotation for every note
        const speed = 0.5 + (i % 3) * 0.3;
        const rotate = (i % 2 === 0 ? 1 : -1) * (1 + (i % 3));
        
        gsap.to(note, {
          y: -200 * speed,
          rotation: `+=${rotate}`,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-40 min-h-[300vh] bg-[#EFE8DB] overflow-hidden">
      
      {/* Background physical textures (Coffee rings, stains) */}
      <div className="absolute top-[10%] left-[20%] w-64 h-64 rounded-full border-[4px] border-[#B98555]/10 pointer-events-none mix-blend-multiply rotate-12" />
      <div className="absolute top-[40%] right-[15%] w-48 h-48 rounded-full border-2 border-[#B98555]/10 pointer-events-none mix-blend-multiply -rotate-6" />
      <div className="absolute bottom-[20%] left-[30%] w-32 h-32 rounded-full border-[3px] border-[#B98555]/5 pointer-events-none mix-blend-multiply rotate-45" />

      <div className="max-w-[1600px] mx-auto relative w-full h-full">
        
        {/* Memory Note 1: Handwritten Quote */}
        <div className="memory-note absolute top-[5%] left-[10%] w-[70vw] md:w-[35vw] bg-[#F9F7F1] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] rotate-[-2deg] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] group z-10">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#EFE8DB]/80 mix-blend-multiply rotate-[-3deg] shadow-sm pointer-events-none" />
          <h3 className="font-serif italic text-3xl md:text-5xl text-[#1F1F1F]/80 leading-snug group-hover:text-[#1F1F1F] transition-colors duration-500">
            "The food reminds<br />me of home."
          </h3>
          <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.2em] text-[#1F1F1F]/40">Google Review • Oct 2023</p>
        </div>

        {/* Memory Note 2: Polaroid */}
        <div className="memory-note absolute top-[15%] right-[5%] md:right-[15%] w-[50vw] md:w-[25vw] bg-white p-3 shadow-[0_15px_40px_rgba(0,0,0,0.08)] rotate-[3deg] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] group z-20">
          <div className="relative w-full aspect-square">
            <ImagePlaceholder category="Memory" description="Family celebrating a birthday, natural smiles." aspectRatio="h-full" />
          </div>
          <div className="mt-4 pb-2 text-center">
             <span className="font-serif italic text-2xl text-[#1F1F1F]/70 group-hover:text-[#1F1F1F] transition-colors">Our 10th Anniversary</span>
          </div>
        </div>

        {/* Memory Note 3: Printed Restaurant Bill / Review snippet */}
        <div className="memory-note absolute top-[35%] left-[5%] md:left-[25%] w-[60vw] md:w-[25vw] bg-[#FFFCF5] p-10 shadow-[0_5px_20px_rgba(0,0,0,0.04)] rotate-[-1deg] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] group z-30 border-l-[3px] border-[#B98555]/30">
          <h3 className="font-serif text-2xl md:text-3xl text-[#1F1F1F]/80 leading-relaxed group-hover:text-[#1F1F1F] transition-colors">
            "We have been visiting Maurya every Sunday for the past 5 years. The consistency is unmatched."
          </h3>
          <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.2em] text-[#1F1F1F]/40">Zomato Review • Jan 2024</p>
        </div>

        {/* Memory Note 4: Large Overlapping Polaroid */}
        <div className="memory-note absolute top-[55%] right-[10%] md:right-[25%] w-[75vw] md:w-[35vw] bg-white p-4 shadow-[0_25px_60px_rgba(0,0,0,0.1)] rotate-[2deg] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(0,0,0,0.15)] group z-10">
          {/* Copper Paperclip */}
          <div className="absolute -top-6 right-12 w-4 h-16 border-[2px] border-[#B98555] rounded-full shadow-sm rotate-12 pointer-events-none" />
          <div className="relative w-full aspect-[4/3]">
            <ImagePlaceholder category="Memory" description="Waiters serving fresh food, warm ambience, candid." aspectRatio="h-full" />
          </div>
        </div>

        {/* Memory Note 5: Folded Note */}
        <div className="memory-note absolute top-[75%] left-[10%] md:left-[15%] w-[55vw] md:w-[20vw] bg-[#F3EFE6] p-8 shadow-[0_10px_25px_rgba(0,0,0,0.06)] rotate-[-4deg] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.1)] group z-20">
          <div className="absolute inset-x-0 top-1/2 h-px bg-black/5 mix-blend-multiply shadow-[0_1px_2px_rgba(0,0,0,0.02)] pointer-events-none" />
          <h3 className="font-serif italic text-2xl md:text-4xl text-[#1F1F1F]/80 group-hover:text-[#1F1F1F] transition-colors text-center mt-4">
            "Absolutely<br />perfect."
          </h3>
          <p className="mt-8 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-[#1F1F1F]/40">Swiggy • Aug 2023</p>
        </div>

      </div>

    </section>
  );
}
