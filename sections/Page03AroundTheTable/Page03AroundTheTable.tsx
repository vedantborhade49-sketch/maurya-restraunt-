"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Page03AroundTheTable() {
  const containerRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      elementsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#4a503d] text-[#F8F5EF] overflow-hidden"
    >
      {/* Background Ambient Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/restaurant-interior.png" 
          alt="Maurya Restaurant Interior" 
          className="w-full h-full object-cover object-center opacity-40 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-[#4a503d]/60 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F5EF] via-transparent to-transparent opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 py-32 md:py-48 min-h-screen flex flex-col justify-between">
        
        {/* Top Floating Fragments */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-0 mb-32 md:mb-0">
          <p 
            ref={el => { elementsRef.current[0] = el; }}
            className="font-sans italic text-sm md:text-base text-[#F8F5EF]/60 max-w-[200px] ml-4 md:ml-20"
          >
            "A place that has grown with our family over the years..."
          </p>
          <p 
            ref={el => { elementsRef.current[1] = el; }}
            className="font-sans italic text-sm md:text-base text-[#F8F5EF]/60 max-w-[200px] mr-4 md:mr-32 mt-12 md:mt-0 text-right md:text-left"
          >
            "The same taste, the same warmth, every single time."
          </p>
        </div>

        {/* Center Anchored Review */}
        <div 
          ref={el => { elementsRef.current[2] = el; }}
          className="flex flex-col items-center text-center my-20 md:my-auto max-w-4xl mx-auto"
        >
          <div className="w-[1px] h-12 bg-[#F8F5EF]/30 mb-12"></div>
          
          <h3 className="font-heading text-3xl md:text-5xl lg:text-6xl leading-[1.2] tracking-tight text-[#F8F5EF]">
            "More than just a meal.<br className="hidden md:block"/> It feels like coming home."
          </h3>
          
          <div className="mt-12 flex flex-col items-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F8F5EF]/70 mb-2">
              — The Sharma Family
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#F8F5EF]/40">
              Visiting since 2004
            </p>
          </div>
        </div>

        {/* Bottom Trust Credentials */}
        <div 
          ref={el => { elementsRef.current[3] = el; }}
          className="mt-32 md:mt-0 flex flex-col md:flex-row justify-between items-center border-t border-[#F8F5EF]/15 pt-8"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#F8F5EF]/50 mb-6 md:mb-0">
            Around the Table
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-[#D4AF37] text-sm">★</span>
            <div className="flex flex-col">
              <span className="font-sans font-medium text-[13px] tracking-wide text-[#F8F5EF]">
                4.5 Google Rating
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#F8F5EF]/50">
                From 884 Local Reviews
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
