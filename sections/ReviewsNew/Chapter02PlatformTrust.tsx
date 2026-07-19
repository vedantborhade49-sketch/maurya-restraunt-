"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Chapter02PlatformTrust() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".trust-item");
      
      gsap.fromTo(items, 
        { opacity: 0, y: 50 },
        {
          opacity: 1, 
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-40 min-h-[150vh] bg-[#F6F1E8] flex flex-col items-center justify-center text-center">
      
      {/* Google */}
      <div className="trust-item flex flex-col items-center mb-32">
        <span className="font-serif text-5xl md:text-7xl text-[#1F1F1F] mb-6 tracking-tight">Google</span>
        <span className="font-serif text-4xl md:text-5xl italic text-[#B98555] mb-4">4.5★</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#1F1F1F]/60">888 Reviews</span>
      </div>

      <div className="trust-item w-px h-32 bg-[#B98555]/30 mb-32" />

      {/* Zomato */}
      <div className="trust-item flex flex-col items-center mb-32">
        <span className="font-serif text-5xl md:text-7xl text-[#1F1F1F] mb-6 tracking-tight">Zomato</span>
        
        <div className="flex flex-col md:flex-row gap-12 text-center">
          <div>
            <span className="font-serif text-4xl md:text-5xl italic text-[#B98555] block mb-4">4.2★</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#1F1F1F]/60">Dining</span>
          </div>
          <div className="hidden md:block w-px h-16 bg-[#B98555]/30 self-center" />
          <div>
            <span className="font-serif text-4xl md:text-5xl italic text-[#B98555] block mb-4">4.0★</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#1F1F1F]/60">Delivery</span>
          </div>
        </div>
      </div>

      <div className="trust-item w-px h-32 bg-[#B98555]/30 mb-32" />

      {/* Swiggy */}
      <div className="trust-item flex flex-col items-center">
        <span className="font-serif text-5xl md:text-7xl text-[#1F1F1F] mb-6 tracking-tight">Swiggy</span>
        <span className="font-serif text-4xl md:text-5xl italic text-[#B98555] mb-4">4.5★</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#1F1F1F]/60">800+ Ratings</span>
      </div>

    </section>
  );
}
