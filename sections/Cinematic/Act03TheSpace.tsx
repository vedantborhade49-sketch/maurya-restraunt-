"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Act03TheSpace() {
  const containerRef = useRef<HTMLElement>(null);
  const gardenRef = useRef<HTMLDivElement>(null);
  const diningRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1.5,
          pin: true,
        }
      });

      // Walkthrough effect:
      // Garden scales up and fades out while Dining fades in and scales up from a smaller size.
      tl.to(gardenRef.current, { scale: 2, opacity: 0, duration: 2, ease: "power1.inOut" }, 0)
        .fromTo(diningRef.current, { scale: 0.8, opacity: 0 }, { scale: 1.2, opacity: 1, duration: 2, ease: "power1.inOut" }, 0)
        
      // Dining scales up and fades out, Plate fades in.
      tl.to(diningRef.current, { scale: 2, opacity: 0, duration: 2, ease: "power1.inOut" }, "+=0.5")
        .fromTo(plateRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 2, ease: "power1.inOut" }, "-=2");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#2E2926] overflow-hidden">
      
      {/* Layer 3: Plate (End of walkthrough) */}
      <div ref={plateRef} className="absolute inset-0 z-30 opacity-0 flex flex-col justify-center items-center">
        <div className="absolute inset-0">
          <Image src="/editorial-food-4.png" alt="Plate" fill className="object-cover opacity-70 filter brightness-75 sepia-[0.2]" />
          <div className="absolute inset-0 bg-[#2E2926] opacity-40 mix-blend-multiply" />
        </div>
        <h2 className="relative z-10 font-heading text-[50px] md:text-[80px] text-[#F7F1E8] tracking-widest uppercase drop-shadow-2xl">
          The Table
        </h2>
      </div>

      {/* Layer 2: Open Dining */}
      <div ref={diningRef} className="absolute inset-0 z-20 opacity-0 flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/restaurant-interior.png" alt="Dining" fill className="object-cover opacity-50 filter sepia-[0.4]" />
          <div className="absolute inset-0 bg-[#9B6A43] opacity-30 mix-blend-color" />
        </div>
        <h2 className="relative z-10 font-heading text-[32px] md:text-[50px] text-[#F2E8DA] italic drop-shadow-xl">
          Warm lights. Open spaces.
        </h2>
      </div>

      {/* Layer 1: Garden */}
      <div ref={gardenRef} className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/editorial-texture.png" alt="Garden" fill className="object-cover opacity-30 filter sepia-[0.3]" />
          <div className="absolute inset-0 bg-[#8D8C6A] opacity-40 mix-blend-multiply" />
        </div>
        <h2 className="relative z-10 font-heading text-[32px] md:text-[50px] text-[#F2E8DA] italic drop-shadow-xl">
          The Garden Path
        </h2>
      </div>

    </section>
  );
}
