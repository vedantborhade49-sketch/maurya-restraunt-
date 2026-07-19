"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Chapter04Highlights() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray(".highlight-word");
      
      gsap.fromTo(words, 
        { opacity: 0, y: 50 },
        {
          opacity: 1, 
          y: 0,
          duration: 1.5,
          stagger: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom bottom",
            scrub: true
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-32 min-h-[150vh] bg-[#F6F1E8] flex flex-col items-center justify-center text-center overflow-hidden">
      
      <div className="flex flex-col items-center gap-24">
        
        <h2 className="highlight-word font-serif text-[10vw] md:text-[8vw] leading-[0.85] tracking-tight text-[#1F1F1F] opacity-0">
          Family<br />
          <span className="italic text-[#B98555]">Gatherings</span>
        </h2>

        <div className="highlight-word w-px h-24 bg-[#B98555]/30 opacity-0" />

        <h2 className="highlight-word font-serif text-[10vw] md:text-[8vw] leading-[0.85] tracking-tight text-[#1F1F1F] opacity-0">
          Authentic<br />
          <span className="italic text-[#B98555]">Taste</span>
        </h2>

        <div className="highlight-word w-px h-24 bg-[#B98555]/30 opacity-0" />

        <h2 className="highlight-word font-serif text-[10vw] md:text-[8vw] leading-[0.85] tracking-tight text-[#1F1F1F] opacity-0">
          Sunday<br />
          <span className="italic text-[#B98555]">Tradition</span>
        </h2>

        <div className="highlight-word w-px h-24 bg-[#B98555]/30 opacity-0" />

        <h2 className="highlight-word font-serif text-[10vw] md:text-[8vw] leading-[0.85] tracking-tight text-[#1F1F1F] opacity-0">
          Worth<br />
          <span className="italic text-[#B98555]">Returning</span><br />
          For.
        </h2>

      </div>

    </section>
  );
}
