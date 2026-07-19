"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ExcerptsSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const quotes = gsap.utils.toArray(".floating-quote");
      
      quotes.forEach((quote: any, i) => {
        // Random drift direction (up or down) and intensity (10 to 30px)
        const direction = i % 2 === 0 ? 1 : -1;
        const distance = 15 + Math.random() * 15;
        
        gsap.to(quote, {
          y: direction * distance,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const excerpts = [
    { text: "The closest thing to home.", align: "self-start", width: "max-w-[400px]" },
    { text: "Twenty years and still our first choice.", align: "self-end", width: "max-w-[350px]" },
    { text: "Every birthday begins here.", align: "self-center", width: "max-w-[300px]" },
    { text: "Food made with care.", align: "self-start md:ml-[15%]", width: "max-w-[400px]" },
    { text: "Sunday tradition.", align: "self-end md:mr-[10%]", width: "max-w-[300px]" },
    { text: "Worth every visit.", align: "self-start", width: "max-w-[350px]" },
  ];

  return (
    <section ref={containerRef} className="w-full py-40 px-8 md:px-24 flex flex-col justify-center">
      <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-32 md:gap-40">
        
        {excerpts.map((excerpt, index) => (
          <div key={index} className={`floating-quote flex flex-col ${excerpt.align} ${excerpt.width}`}>
            <div className="flex gap-1 mb-6 text-[#B98555] text-[10px]">★★★★★</div>
            <blockquote className="font-serif text-3xl md:text-5xl text-[#1F1F1F] leading-[1.1]">
              "{excerpt.text}"
            </blockquote>
          </div>
        ))}

      </div>
    </section>
  );
}
