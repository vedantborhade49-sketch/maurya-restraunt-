"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ch5Image from "C:/Users/SELVA/.gemini/antigravity/brain/dfc7ea73-439f-4aab-a57b-21b9458bdaaf/story_ch5_table_1784486792477.png";

export default function Chapter05TheTable() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLDivElement>(null);
  const textRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // Extreme cinematic parallax on the huge image
      tl.fromTo(imageRef.current,
        { y: "-15%" },
        { y: "15%", ease: "none", duration: 1 }
      );

      // Typography moves at slightly different speeds for depth
      tl.fromTo(textLeftRef.current,
        { y: 100 },
        { y: -50, ease: "none", duration: 1 },
        0
      );

      tl.fromTo(textRightRef.current,
        { y: 150 },
        { y: -100, ease: "none", duration: 1 },
        0
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] bg-[#1F1F1F] overflow-hidden flex items-center justify-center">
      
      {/* Massive Cinematic Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          ref={imageRef}
          src={ch5Image}
          alt="The Dining Table"
          fill
          className="object-cover opacity-60 mix-blend-luminosity scale-110"
        />
        {/* Deep vignetting */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#1F1F1F]/60 to-[#1F1F1F] opacity-90 pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8 md:px-16 h-full flex flex-col justify-center">
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-16 md:gap-0 mt-32">
          
          <div ref={textLeftRef} className="w-full md:w-1/2">
            <h2 className="font-heading text-5xl md:text-7xl text-[#F6F1E8] leading-[1.0] tracking-tight max-w-[400px]">
              The table remains constant.
            </h2>
          </div>

          <div ref={textRightRef} className="w-full md:w-1/3 text-right">
            <p className="font-serif text-2xl md:text-3xl italic text-[#B98555] leading-relaxed">
              People change.<br />
              Children grow older.<br />
              But the stories are always shared here.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
