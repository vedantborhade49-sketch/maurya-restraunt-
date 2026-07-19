"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FeaturedReview() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      // Line by line reveal utilizing overflow-hidden masks
      tl.fromTo(".review-line", 
        { y: "100%" },
        { 
          y: "0%", 
          duration: 1.5, 
          stagger: 0.15, 
          ease: "power3.out"
        }
      );
      
      // Fade in stars and attribution
      tl.fromTo(".review-fade",
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.5"
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full py-40 px-8 md:px-24 flex flex-col items-center justify-center text-center">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        
        <div className="review-fade flex gap-2 mb-16 text-[#B98555] opacity-0">
          ★★★★★
        </div>

        <blockquote className="font-serif text-4xl md:text-6xl lg:text-[4.5vw] leading-[1.15] text-[#1F1F1F] mb-16">
          <div className="overflow-hidden pb-2"><div className="review-line translate-y-full">"We've celebrated every family</div></div>
          <div className="overflow-hidden pb-2"><div className="review-line translate-y-full">milestone here. It never</div></div>
          <div className="overflow-hidden pb-2"><div className="review-line translate-y-full">feels like a restaurant.</div></div>
          <div className="overflow-hidden pt-4 pb-2"><div className="review-line translate-y-full italic text-[#B98555]">It feels like home."</div></div>
        </blockquote>

        <div className="review-fade flex items-center gap-6 opacity-0">
          <div className="w-12 h-[1px] bg-[#B98555]/40" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#1F1F1F]/60">Google Review</span>
          <div className="w-12 h-[1px] bg-[#B98555]/40" />
        </div>

      </div>
    </section>
  );
}
