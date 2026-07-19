"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
const ch1Image = "/editorial-entrance.png";

export default function Chapter01Opening() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the container to allow the text to move up and image to reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: true,
        }
      });

      // Text moves up slightly
      tl.to(textRef.current, {
        y: "-15vh",
        opacity: 0.2,
        ease: "none",
        duration: 1
      }, 0);

      // Image reveals with a cinematic clip-path from bottom
      tl.fromTo(imageWrapperRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "power1.inOut", duration: 1 },
        0.2
      );

      // Image subtle scale during reveal
      tl.fromTo(imageRef.current,
        { scale: 1.1 },
        { scale: 1, ease: "power1.out", duration: 1 },
        0.2
      );
      
      // Global upward drift of the entire pinned scene towards the end
      tl.to(containerRef.current, {
        y: "-10vh",
        ease: "none",
        duration: 0.5
      }, 0.8);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#F6F1E8] overflow-hidden flex flex-col items-center justify-center pt-20">
      <div className="absolute top-[12%] left-8 md:left-16 flex items-center gap-4 z-20">
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#B98555] font-bold">
          OUR STORY
        </span>
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8 md:px-16 flex flex-col items-center justify-center h-full">
        <h1 
          ref={textRef}
          className="font-heading text-[12vw] md:text-[8vw] leading-[0.9] text-[#1F1F1F] tracking-tight text-center max-w-[90vw]"
        >
          <span className="block">Some Stories</span>
          <span className="block italic text-[#B98555]">Are Written</span>
          <span className="block">Around</span>
          <span className="block pl-[10%]">A Table.</span>
        </h1>

        <div 
          ref={imageWrapperRef}
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        >
          <div className="absolute inset-x-0 bottom-0 h-[70vh] w-full max-w-[1200px] mx-auto">
            <Image
              ref={imageRef}
              src={ch1Image}
              alt="Atmosphere"
              fill
              className="object-cover object-top opacity-90"
              priority
            />
            {/* Cinematic light overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#F6F1E8] via-transparent to-transparent opacity-80 mix-blend-screen" />
          </div>
        </div>
      </div>
    </section>
  );
}
