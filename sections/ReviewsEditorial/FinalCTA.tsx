"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function FinalCTA() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cta-element", 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.5, 
          stagger: 0.3, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full py-40 px-8 md:px-24 flex flex-col items-center justify-center text-center">
      <div className="max-w-[800px] mx-auto flex flex-col items-center">
        
        <h2 className="cta-element font-serif text-[10vw] md:text-[6vw] leading-[1] tracking-tight text-[#1F1F1F] mb-20">
          Perhaps<br />
          <span className="italic text-[#B98555]">Your Story</span><br />
          Will Be<br />
          Next.
        </h2>

        <Link 
          href="/menu"
          className="cta-element group relative inline-flex items-center justify-center px-12 py-5 border border-[#B98555]/60 hover:border-[#B98555] transition-colors duration-500 overflow-hidden"
        >
          {/* Subtle fill on hover */}
          <div className="absolute inset-0 bg-[#B98555]/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#1F1F1F] font-bold relative z-10 group-hover:text-[#3A0F16] transition-colors duration-500">
            Explore the Menu
          </span>
        </Link>

      </div>
    </section>
  );
}
