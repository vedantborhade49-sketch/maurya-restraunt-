"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function IntroTransition() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section to allow the dramatic reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // 2 viewport heights of scrolling to hold the moment
          scrub: 1,
          pin: true,
        }
      });

      // Initially hold for a moment (empty space)
      tl.to({}, { duration: 0.2 });

      // Typography color fades from #1F1F1F to transparent, revealing the background image
      // We use string rgba for smooth GSAP interpolation
      tl.to(textRef.current, {
        color: "rgba(31, 31, 31, 0)", 
        ease: "none",
        duration: 1
      });

      // The label fades out as the image is fully revealed
      tl.to(labelRef.current, {
        opacity: 0,
        duration: 0.5
      }, "<");
      
      // The text scales up slightly for cinematic effect
      tl.to(textRef.current, {
        scale: 1.1,
        ease: "power1.inOut",
        duration: 1
      }, "<");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#F6F1E8] flex flex-col justify-center overflow-hidden">
      
      <div className="absolute top-[15%] left-12 md:left-24" ref={labelRef}>
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#B98555] font-bold">
          GALLERY
        </span>
      </div>

      <div className="w-full px-12 md:px-24">
        <h1 
          ref={textRef}
          className="font-serif text-[12vw] md:text-[10vw] leading-[0.85] tracking-tight origin-left"
          style={{
            // Placeholder background to represent the image that will reveal inside the text
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='100' fill='%23d0c8b8'/%3E%3Ctext x='50' y='50' font-family='monospace' font-size='4' fill='%231F1F1F' text-anchor='middle' alignment-baseline='middle'%3E[ IMAGE MASK ]%3C/text%3E%3C/svg%3E")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "#1F1F1F", // Solid color initially hides the background
          }}
        >
          Moments<br />
          Worth<br />
          Returning<br />
          To.
        </h1>
      </div>

    </section>
  );
}
