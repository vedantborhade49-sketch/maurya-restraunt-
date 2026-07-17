"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Act04Craft() {
  const containerRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1,
          pin: true,
        }
      });

      // Quick crossfades between 4 macro shots
      tl.fromTo(imagesRef.current[0], { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 1 })
        .to(imagesRef.current[0], { opacity: 0, duration: 0.5 }, "+=1")
        
        .fromTo(imagesRef.current[1], { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 1 }, "-=0.5")
        .to(imagesRef.current[1], { opacity: 0, duration: 0.5 }, "+=1")
        
        .fromTo(imagesRef.current[2], { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 1 }, "-=0.5")
        .to(imagesRef.current[2], { opacity: 0, duration: 0.5 }, "+=1")
        
        .fromTo(imagesRef.current[3], { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 1 }, "-=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#2E2926] overflow-hidden">
      
      {/* Background ambient text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <h2 className="font-heading text-[25vw] text-[#F2E8DA] tracking-tighter">CRAFT</h2>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <h3 className="font-mono text-[10px] md:text-[14px] uppercase tracking-[0.3em] text-[#F2E8DA] opacity-50 absolute bottom-12">
          The Kitchen
        </h3>
      </div>

      {/* Sequence 1: Steam */}
      <div ref={el => { imagesRef.current[0] = el }} className="absolute inset-0 opacity-0 flex items-center justify-center">
        <div className="relative w-[120vw] h-[120vh]">
          <Image src="/editorial-process.png" alt="Steam" fill className="object-cover filter contrast-125 saturate-50" />
        </div>
        <span className="absolute z-10 font-heading italic text-[40px] text-[#F2E8DA] drop-shadow-md">Steam.</span>
      </div>

      {/* Sequence 2: Knife */}
      <div ref={el => { imagesRef.current[1] = el }} className="absolute inset-0 opacity-0 flex items-center justify-center">
        <div className="relative w-[120vw] h-[120vh]">
          <Image src="/editorial-food-2.png" alt="Knife" fill className="object-cover filter contrast-125 saturate-50" />
        </div>
        <span className="absolute z-10 font-heading italic text-[40px] text-[#F2E8DA] drop-shadow-md">Knife.</span>
      </div>

      {/* Sequence 3: Tadka */}
      <div ref={el => { imagesRef.current[2] = el }} className="absolute inset-0 opacity-0 flex items-center justify-center">
        <div className="relative w-[120vw] h-[120vh]">
          <Image src="/editorial-spices.png" alt="Tadka" fill className="object-cover filter contrast-125 saturate-150" />
        </div>
        <span className="absolute z-10 font-heading italic text-[40px] text-[#F2E8DA] drop-shadow-md">Tadka.</span>
      </div>

      {/* Sequence 4: Serving */}
      <div ref={el => { imagesRef.current[3] = el }} className="absolute inset-0 opacity-0 flex items-center justify-center">
        <div className="relative w-[120vw] h-[120vh]">
          <Image src="/editorial-food-5.png" alt="Serving" fill className="object-cover filter contrast-125 saturate-50" />
        </div>
        <span className="absolute z-10 font-heading italic text-[40px] text-[#F2E8DA] drop-shadow-md">Serving.</span>
      </div>

    </section>
  );
}
