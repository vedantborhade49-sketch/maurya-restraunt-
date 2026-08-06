"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Chapter05PlatformDetail() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".detail-item");
      
      gsap.fromTo(items, 
        { opacity: 0, y: 30 },
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
    <section ref={containerRef} className="relative w-full py-40 min-h-screen bg-[#3A0F16] flex flex-col items-center justify-center overflow-hidden">
      
      <div className="w-full max-w-[800px] mx-auto px-8">
        
        {/* Google Detail */}
        <div className="detail-item flex flex-col md:flex-row items-center justify-between py-12 border-b border-[#B98555]/20 gap-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#B98555]">Google</span>
          <span className="font-serif text-5xl md:text-6xl text-[#F6F1E8]">4.5<span className="italic text-[#B98555]">★</span></span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F6F1E8]/60">888 Reviews</span>
        </div>

        {/* Zomato Detail */}
        <div className="detail-item flex flex-col md:flex-row items-center justify-between py-12 border-b border-[#B98555]/20 gap-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#B98555]">Zomato</span>
          <div className="flex gap-8 text-center">
            <div>
              <span className="font-serif text-3xl md:text-4xl text-[#F6F1E8]">4.2<span className="italic text-[#B98555]">★</span></span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#F6F1E8]/60 mt-2">Dining</span>
            </div>
            <div className="w-px bg-[#B98555]/20" />
            <div>
              <span className="font-serif text-3xl md:text-4xl text-[#F6F1E8]">4.0<span className="italic text-[#B98555]">★</span></span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#F6F1E8]/60 mt-2">Delivery</span>
            </div>
          </div>
        </div>

        {/* Swiggy Detail */}
        <div className="detail-item flex flex-col md:flex-row items-center justify-between py-12 border-b border-[#B98555]/20 gap-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#B98555]">Swiggy</span>
          <span className="font-serif text-5xl md:text-6xl text-[#F6F1E8]">4.5<span className="italic text-[#B98555]">★</span></span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F6F1E8]/60">800+ Ratings</span>
        </div>

        {/* Signature */}
        <div className="detail-item mt-32 flex flex-col items-center">
          <img src="/morya-logo.webp" alt="Maurya Signature" className="h-6 md:h-8 w-auto brightness-0 invert opacity-60 mb-6" />
          <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-[#F6F1E8]/40 text-center leading-loose">
            Maurya Veg Family Restaurant<br />
            Authentic Taste Since 2003
          </p>
        </div>

      </div>

    </section>
  );
}
