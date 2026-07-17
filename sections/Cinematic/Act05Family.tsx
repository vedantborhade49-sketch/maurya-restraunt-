"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Act05Family() {
  const containerRef = useRef<HTMLElement>(null);
  const photosRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax float for the photos
      photosRef.current.forEach((el, index) => {
        if (!el) return;
        const speed = parseFloat(el.dataset.speed || "10");
        
        gsap.fromTo(el, 
          { y: speed * 5 },
          {
            y: -speed * 5,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[150vh] bg-[#F7F1E8] overflow-hidden py-32">
      
      {/* Background warm wash */}
      <div className="absolute inset-0 bg-[#F2E8DA] opacity-50" />
      
      <div className="absolute top-32 left-0 w-full text-center z-20">
        <h2 className="font-heading italic text-[40px] md:text-[60px] text-[#7D2F34] mb-4">
          Create memories.
        </h2>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#AF6048]">
          The real USP is not food. It's family.
        </p>
      </div>

      <div className="relative w-full max-w-[1200px] mx-auto h-[100vh] mt-32 z-10">
        
        {/* Photo 1: Birthday */}
        <div 
          ref={el => { photosRef.current[0] = el }} 
          data-speed="15"
          className="absolute top-[10%] left-[10%] w-[45%] md:w-[30%] aspect-square bg-[#fff] p-2 md:p-4 shadow-xl rotate-[-3deg]"
        >
          <div className="relative w-full h-[85%]">
            <Image src="/restaurant-interior.png" alt="Birthday" fill className="object-cover filter sepia-[0.5] contrast-125" />
          </div>
          <p className="font-heading text-center mt-2 text-[14px] text-[#2E2926]">Birthday. 2012.</p>
        </div>

        {/* Photo 2: Anniversary */}
        <div 
          ref={el => { photosRef.current[1] = el }} 
          data-speed="-10"
          className="absolute top-[30%] right-[10%] w-[50%] md:w-[35%] aspect-[4/3] bg-[#fff] p-2 md:p-4 shadow-xl rotate-[2deg]"
        >
          <div className="relative w-full h-[85%]">
            <Image src="/editorial-food-3.png" alt="Anniversary" fill className="object-cover filter sepia-[0.4] grayscale-[0.3]" />
          </div>
          <p className="font-heading text-center mt-2 text-[14px] text-[#2E2926]">Anniversary. 2015.</p>
        </div>

        {/* Photo 3: Grandparents */}
        <div 
          ref={el => { photosRef.current[2] = el }} 
          data-speed="20"
          className="absolute bottom-[20%] left-[25%] w-[40%] md:w-[25%] aspect-[3/4] bg-[#fff] p-2 md:p-4 shadow-2xl rotate-[-1deg]"
        >
          <div className="relative w-full h-[85%]">
            <Image src="/editorial-food-1.png" alt="Grandparents" fill className="object-cover filter sepia-[0.6] contrast-150" />
          </div>
          <p className="font-heading text-center mt-2 text-[14px] text-[#2E2926]">Grandparents.</p>
        </div>

      </div>

    </section>
  );
}
