"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function SignatureDishes() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Elegant parallax scroll into the dish
      if (imageRef.current) {
        gsap.fromTo(imageRef.current, 
          { scale: 1.1, yPercent: 15 },
          {
            scale: 1,
            yPercent: -5,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
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
              start: "top 70%",
            }
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[120vh] bg-[#1F1B1A] text-[#F8F5EF] overflow-hidden py-32 flex flex-col justify-center">
      
      {/* Chapter Marker */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#B98532] font-bold mb-2">
          Chapter 04
        </span>
        <div className="w-[1px] h-12 bg-[#B98532]/20" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-12 relative z-10 flex flex-col items-center">
        
        {/* Large Editorial Presentation */}
        <div className="w-full relative h-[60vh] md:h-[80vh] overflow-hidden rounded-sm shadow-2xl border border-[#B98532]/20 mb-16">
          <div ref={imageRef} className="absolute inset-[-10%] w-[120%] h-[120%]">
            <Image
              src="/editorial-table-feast.png"
              alt="Maurya Signature Spread"
              fill
              className="object-cover"
              style={{ objectPosition: "center 20%" }}
              sizes="100vw"
            />
            {/* Elegant dark vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#1F1B1A]/80 pointer-events-none" />
          </div>
        </div>

        {/* Story & CTA */}
        <div ref={textRef} className="flex flex-col items-center text-center max-w-[700px]">
          <span className="font-serif italic text-xl md:text-2xl text-[#B98532] mb-6 block">
            A feast for the senses.
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-tight tracking-tight mb-8">
            The Maurya Spread
          </h2>
          <p className="font-sans text-[14px] sm:text-[16px] leading-relaxed text-[#F8F5EF]/70 font-light mb-12 px-4">
            Passed down through generations, our signature dishes are crafted to be shared. From the crisp perfection of our dosas to the rich, slow-cooked gravies, every dish is an invitation to celebrate.
          </p>

          <Link
            href="/menu"
            className="group flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#B98532] hover:text-[#F8F5EF] transition-colors"
          >
            <span>Explore The Menu</span>
            <div className="w-[1px] h-8 bg-[#B98532] group-hover:bg-[#F8F5EF] transition-colors" />
          </Link>
        </div>

      </div>

    </section>
  );
}
