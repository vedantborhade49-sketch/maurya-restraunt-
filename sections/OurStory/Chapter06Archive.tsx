"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
const ch6Image = "/editorial-entrance.png";

export default function Chapter06Archive() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle entry fade for archive items
      const items = gsap.utils.toArray(".archive-item");
      
      gsap.fromTo(items,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          ease: "power2.out",
          duration: 1.2,
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-[#EFE8DB] overflow-hidden">
      
      <div className="max-w-[1200px] mx-auto px-8 relative h-[100vh] md:h-[120vh]">
        
        <div className="absolute top-10 left-10 z-10">
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#B98555] font-bold">
            THE ARCHIVE
          </span>
        </div>

        {/* Scattered Archive Items - absolute positioning to look laid naturally */}
        
        {/* Vintage Menu */}
        <div className="archive-item absolute top-[15%] left-[5%] md:left-[10%] w-[45vw] md:w-[25vw] aspect-[3/4] bg-[#F6F1E8] p-4 shadow-[0_15px_30px_rgba(31,31,31,0.05)] rotate-[-4deg] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_40px_rgba(31,31,31,0.1)] hover:rotate-[-2deg] z-10">
          <div className="w-full h-full border border-[#B98555]/30 flex flex-col items-center justify-center p-4 text-center">
            <span className="font-serif text-[#1F1F1F] text-2xl mb-4">Menu</span>
            <div className="w-8 h-[1px] bg-[#B98555]/50 mb-4" />
            <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#1F1F1F]/50">1998</span>
          </div>
        </div>

        {/* Old Receipt */}
        <div className="archive-item absolute top-[40%] right-[10%] md:right-[20%] w-[35vw] md:w-[15vw] aspect-[1/2] bg-[#ffffff] p-3 shadow-[0_10px_20px_rgba(31,31,31,0.04)] rotate-[6deg] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_35px_rgba(31,31,31,0.08)] hover:rotate-[8deg] z-20">
          <div className="w-full h-full border-t-2 border-b-2 border-dashed border-[#1F1F1F]/10 flex flex-col pt-4">
            <span className="font-mono text-[8px] text-[#1F1F1F]/60 text-center mb-2">TABLE 4</span>
            <div className="h-2 w-full bg-[#1F1F1F]/5 mb-1" />
            <div className="h-2 w-3/4 bg-[#1F1F1F]/5 mb-1" />
            <div className="h-2 w-5/6 bg-[#1F1F1F]/5 mb-1" />
          </div>
        </div>

        {/* Old Photograph */}
        <div className="archive-item absolute bottom-[15%] left-[20%] md:left-[30%] w-[50vw] md:w-[30vw] aspect-[4/3] bg-white p-3 shadow-[0_20px_40px_rgba(31,31,31,0.08)] rotate-[-2deg] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_50px_rgba(31,31,31,0.12)] hover:rotate-[0deg] z-30">
          <div className="relative w-full h-full overflow-hidden bg-[#d0c8b8]">
            <Image
              src={ch6Image}
              alt="Archive Photo"
              fill
              className="object-cover grayscale-[80%] sepia-[40%]"
            />
          </div>
          <p className="font-mono text-[8px] uppercase tracking-widest text-[#1F1F1F]/50 mt-3 text-right">
            First Sunday
          </p>
        </div>

      </div>
    </section>
  );
}
