"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function JournalClosing() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      if (textRef.current) {
        gsap.fromTo(textRef.current, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
            }
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={containerRef} className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden flex items-center justify-center">
        
        {/* Cinematic Full-Width Photo */}
        <div className="absolute inset-0 z-0 bg-[#161413]">
          <div ref={imageRef} className="absolute inset-[-5%] w-[110%] h-[110%]">
            <Image
              src="/outside.jpeg"
              alt="Maurya Night Ambience"
              fill
              className="object-cover"
              style={{ objectPosition: "center center" }}
              sizes="100vw"
            />
          </div>
          {/* Subtle overlay for text readability instead of heavy black */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161413] via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Closing Sentence */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-12 md:pb-24 px-6 gap-6 md:gap-8">
          <p ref={textRef} className="font-serif text-4xl sm:text-6xl md:text-8xl italic text-[#F8F5EF] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] text-center">
            Hungry?
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <Link
              href="/menu"
              className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] px-10 py-4 border border-[#F8F5EF] text-[#F8F5EF] hover:bg-[#F8F5EF] hover:text-[#161413] transition-colors shadow-xl"
            >
              Explore Full Menu →
            </Link>
            <Link
              href="/visit#reserve"
              className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] px-10 py-4 bg-[#8F1115] text-[#F8F5EF] hover:bg-[#a3161a] transition-colors shadow-xl border border-[#8F1115]"
            >
              Reserve Your Table →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
