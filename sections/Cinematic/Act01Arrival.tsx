"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Act01Arrival() {
  const containerRef = useRef<HTMLElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Background slow ambient animation (Fog)
      gsap.to(fogRef.current, {
        x: "10%",
        y: "-5%",
        opacity: 0.6,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // The Narrative Sequence (Scroll driven)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%", // Scroll a long way to finish Act 1
          scrub: 1.5,
          pin: true,
        }
      });

      // 1. Text reveals slowly
      tl.to(textRef.current, { opacity: 1, y: 0, duration: 1 })
        .to(textRef.current, { opacity: 0, y: -20, duration: 1 }, "+=0.5")
      
      // 2. Door slowly opens (simulating warm light escaping)
      tl.to(doorRef.current, { opacity: 1, scale: 1.5, duration: 2 }, "-=0.5")
      
      // 3. Camera pushes aggressively in, flying through the door
      tl.to(cameraRef.current, { scale: 5, opacity: 0, filter: "blur(20px)", duration: 2 }, "-=1");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#2E2926]" // Charcoal Brown base
    >
      {/* Dark Burgundy Sky / Ambient base */}
      <div className="absolute inset-0 bg-[#7D2F34] opacity-30 mix-blend-multiply" />

      {/* Simulated Camera container (everything inside scales up to simulate walking forward) */}
      <div ref={cameraRef} className="absolute inset-0 flex items-center justify-center transform origin-center">
        
        {/* Background plate (Garden/Outside) */}
        <div className="absolute inset-0">
          <Image 
            src="/restaurant-interior.png" 
            alt="Atmosphere" 
            fill 
            className="object-cover opacity-20 filter blur-sm grayscale contrast-150" 
          />
        </div>

        {/* Slow Fog layer */}
        <div 
          ref={fogRef}
          className="absolute inset-[-20%] opacity-30 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(242,232,218,0.2) 0%, transparent 60%)",
            filter: "blur(40px)"
          }}
        />

        {/* Warm light escaping from the doorway */}
        <div 
          ref={doorRef}
          className="absolute inset-0 opacity-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[10vw] h-[40vh] bg-[#9B6A43] blur-[60px] opacity-80" />
        </div>

        {/* Narrative Text */}
        <div 
          ref={textRef}
          className="relative z-20 text-center opacity-0 translate-y-8 flex flex-col items-center"
        >
          <p className="font-heading italic text-[24px] md:text-[36px] text-[#F7F1E8] mb-4">
            Some places feed people.
          </p>
          <p className="font-heading italic text-[24px] md:text-[36px] text-[#F7F1E8]">
            Some become family traditions.
          </p>
        </div>

      </div>
      
    </section>
  );
}
