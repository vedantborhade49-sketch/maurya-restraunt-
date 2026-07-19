"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
const ch8Image = "/editorial-entrance.png";

export default function Chapter08Invitation() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);

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

      // Background color darkens
      tl.to(containerRef.current, {
        backgroundColor: "#111111",
        ease: "none",
        duration: 1
      }, 0);

      // Image fades in and scales slightly
      tl.fromTo(bgImageRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 0.4, scale: 1, ease: "none", duration: 1 },
        0.2
      );

      // Typography rises up
      tl.fromTo(textRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", duration: 1 },
        0.5
      );
      
      // Button fades in
      tl.fromTo(buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 1 },
        1
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] bg-[#F6F1E8] overflow-hidden flex flex-col items-center justify-center pt-20 transition-colors duration-1000">
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          ref={bgImageRef}
          src={ch8Image}
          alt="Restaurant Entrance at Dusk"
          fill
          className="object-cover opacity-0 mix-blend-luminosity"
        />
        {/* Deep dark gradient overlay to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F] via-[#3A0F16]/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-8 md:px-16 flex flex-col items-center text-center">
        
        <h2 
          ref={textRef}
          className="font-heading text-6xl md:text-8xl lg:text-[9vw] leading-[0.9] text-[#F6F1E8] tracking-tight mb-16"
        >
          <span className="block">Perhaps</span>
          <span className="block italic text-[#B98555]">The Next Story</span>
          <span className="block">Will Be Yours.</span>
        </h2>

        <Link 
          ref={buttonRef}
          href="/book-a-table"
          className="inline-flex items-center justify-center font-sans text-xs uppercase tracking-[0.3em] text-[#F6F1E8] font-bold border-b border-[#B98555] pb-2 hover:text-[#B98555] transition-colors"
        >
          Join Us At The Table
        </Link>
        
      </div>
    </section>
  );
}
