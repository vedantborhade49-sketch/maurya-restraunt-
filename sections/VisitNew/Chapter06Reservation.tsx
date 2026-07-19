"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function Chapter06Reservation() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom bottom",
          scrub: true,
        }
      });

      // Background transitions into deep oxblood
      tl.to(containerRef.current, {
        backgroundColor: "#3A0F16",
        ease: "none",
        duration: 1
      }, 0);

      // Typography rises up
      tl.fromTo(textRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", duration: 1 },
        0.5
      );
      
      // Button fades in
      tl.fromTo(btnRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 1 },
        1
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] bg-[#EFE8DB] overflow-hidden flex flex-col items-center justify-center pt-20 transition-colors duration-1000 group/section">
      
      {/* Background subtly brightens on section hover (custom logic inside className) */}
      <div className="absolute inset-0 bg-[#B98555] opacity-0 group-hover/section:opacity-5 transition-opacity duration-1000 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-8 md:px-16 flex flex-col items-center text-center">
        
        <h2 
          ref={textRef}
          className="font-serif text-6xl md:text-8xl lg:text-[9vw] leading-[0.9] text-[#F6F1E8] tracking-tight mb-16"
        >
          <span className="block">Join Us</span>
          <span className="block italic text-[#B98555]">At The Table.</span>
        </h2>

        <Link 
          ref={btnRef}
          href="/book-a-table"
          className="group relative inline-flex items-center justify-center px-12 py-6 border border-[#B98555]/40 overflow-hidden transition-all duration-700 hover:border-[#B98555]"
        >
          {/* Subtle illumination effect */}
          <div className="absolute inset-0 bg-[#B98555] opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
          
          <span className="font-sans text-xs uppercase tracking-[0.3em] group-hover:tracking-[0.4em] text-[#F6F1E8] font-bold transition-all duration-700 relative z-10">
            Secure A Reservation
          </span>
        </Link>
        
      </div>
    </section>
  );
}
