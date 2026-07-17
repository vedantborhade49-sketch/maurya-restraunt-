"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Chapter04() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRefs = useRef<(HTMLElement | null)[]>([]);

  const addToParallax = (el: HTMLElement | null) => {
    if (el && !parallaxRefs.current.includes(el)) {
      parallaxRefs.current.push(el);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Very subtle parallax: Images move 10-20px, Text 5px.
      parallaxRefs.current.forEach((el) => {
        if (!el) return;
        const speed = parseFloat(el.dataset.speed || "10");
        
        gsap.to(el, {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#F7F2EB", color: "#2B2522" }}
    >
      {/* Paper Grain Texture (Subtle 1-2%) */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.015] z-0 mix-blend-multiply" 
        style={{ backgroundImage: 'url("/editorial-texture.png")', backgroundSize: '150px', backgroundRepeat: 'repeat' }} 
      />

      {/* --- PAGE 1: THE REVEAL --- */}
      <div className="relative w-full min-h-[120vh] max-w-[1600px] mx-auto px-6 md:px-12 pt-32 lg:pt-48 pb-32 flex flex-col justify-center">
        <div className="grid grid-cols-12 gap-6 relative z-10 w-full">
          
          {/* Left Side: Typography */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-start">
            <h2 
              ref={addToParallax}
              data-speed="5"
              className="font-heading text-[110px] md:text-[130px] lg:text-[150px] leading-[0.85] tracking-tighter mb-24"
            >
              <span className="block text-2xl font-mono tracking-widest mb-6 opacity-70" style={{ color: "#8C6F5B" }}>04</span>
              THE<br />
              MORNING<br />
              RITUAL
            </h2>

            <div 
              ref={addToParallax}
              data-speed="5"
              className="max-w-[320px] lg:ml-12"
            >
              <p className="font-heading italic text-[20px] md:text-[24px] leading-relaxed mb-6" style={{ color: "#8C6F5B" }}>
                Before guests arrive...<br />
                there is another restaurant.
              </p>
              <p className="font-heading italic text-[20px] md:text-[24px] leading-relaxed" style={{ color: "#8C6F5B" }}>
                One built only for fire,<br />
                discipline<br />
                and silence.
              </p>
            </div>
          </div>

          {/* Right Side: Portrait Image */}
          <div className="col-span-12 lg:col-span-5 flex justify-end items-end lg:items-start mt-24 lg:mt-0">
            <div className="flex flex-col items-start w-full lg:w-auto lg:mr-[10%]">
              <div 
                ref={addToParallax}
                data-speed="-15"
                className="relative w-full max-w-[480px] aspect-[480/700] bg-[#D8CFC6]"
              >
                <Image
                  src="/editorial-process.png"
                  alt="Morning preparation"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
              {/* Caption */}
              <div 
                ref={addToParallax}
                data-speed="5"
                className="mt-5 flex flex-col w-full"
              >
                <div className="flex justify-between w-full font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "#8C6F5B" }}>
                  <span>04:30 AM</span>
                  <span>Issue 04</span>
                </div>
                <div className="h-[0.5px] w-full my-2" style={{ backgroundColor: "#D8CFC6" }} />
                <span className="font-mono text-[10px] tracking-[0.1em]" style={{ color: "#2B2522" }}>
                  Steam begins to rise.
                </span>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* --- PAGE 2: EDITORIAL COLLAGE --- */}
      <div className="relative w-full min-h-[160vh] max-w-[1600px] mx-auto px-6 md:px-12 py-32 flex flex-col justify-center overflow-hidden">
        
        {/* Giant Background Words */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-around py-[15vh] z-0" style={{ opacity: 0.06 }}>
          <span className="font-heading text-[22vw] leading-[0.8] tracking-tighter -ml-[5%]">FIRE</span>
          <span className="font-heading text-[22vw] leading-[0.8] tracking-tighter text-right -mr-[5%]">SLOW</span>
          <span className="font-heading text-[22vw] leading-[0.8] tracking-tighter ml-[10%]">TIME</span>
          <span className="font-heading text-[22vw] leading-[0.8] tracking-tighter text-center">CRAFT</span>
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-12 relative z-10 w-full h-full">
          
          {/* Collage Image 1: Cropped / Partially visible / Rotated */}
          <div className="col-span-6 md:col-span-4 lg:col-span-3 lg:col-start-2 mt-24" ref={addToParallax} data-speed="-12">
            <div className="relative w-full aspect-square bg-[#D8CFC6] overflow-hidden rotate-[1.5deg]">
              <Image src="/editorial-food-1.png" alt="Detail 1" fill sizes="25vw" className="object-cover scale-150 origin-top-left translate-y-[-20%] translate-x-[-10%]" />
            </div>
            <div className="mt-4 flex flex-col gap-1 w-[80%] font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "#8C6F5B" }}>
              <div className="flex justify-between mb-1">
                <span>Kitchen Notes</span>
                <span>07</span>
              </div>
              <div className="h-[0.5px] w-full" style={{ backgroundColor: "#D8CFC6" }} />
              <span className="mt-1">Edition 2026</span>
            </div>
          </div>

          {/* Collage Image 2: Large Landscape overlap */}
          <div className="col-span-10 md:col-span-8 lg:col-span-6 lg:col-start-6 -mt-12 lg:-mt-32 z-20" ref={addToParallax} data-speed="-18">
            <div className="relative w-full aspect-[4/3] bg-[#D8CFC6]">
              <Image src="/editorial-spices.png" alt="Detail 2" fill sizes="50vw" className="object-cover" />
            </div>
            <div className="mt-4 flex justify-between w-full font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "#8C6F5B" }}>
              <span>Fire Station</span>
              <span>Issue 04</span>
            </div>
          </div>

          {/* Editorial Pull Quote */}
          <div className="col-span-12 lg:col-span-7 lg:col-start-3 mt-32 mb-40 flex items-center" ref={addToParallax} data-speed="-6">
            <h3 className="font-heading italic text-[45px] md:text-[65px] lg:text-[85px] leading-[1.05] tracking-tight" style={{ color: "#2B2522" }}>
              "A meal begins<br />
              long before<br />
              the first customer arrives."
            </h3>
          </div>

          {/* Collage Image 3: Small Portrait misaligned */}
          <div className="col-span-6 md:col-span-4 lg:col-span-3 lg:col-start-1 mt-12 -rotate-[1deg]" ref={addToParallax} data-speed="-10">
            <div className="relative w-full aspect-[3/4] bg-[#D8CFC6]">
              <Image src="/editorial-food-3.png" alt="Detail 3" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "#8C6F5B" }}>
              <div className="h-[0.5px] w-[50%] mb-2" style={{ backgroundColor: "#D8CFC6" }} />
              <span>Fresh coriander.</span>
            </div>
          </div>

          {/* Collage Image 4: Bleeding outside grid (40% visible) */}
          <div className="col-span-6 lg:col-span-4 lg:col-start-9 mt-[-20vh] opacity-95 z-30" ref={addToParallax} data-speed="-20">
            <div className="relative w-[130%] aspect-[4/5] bg-[#D8CFC6] translate-x-[20%]">
              <Image src="/editorial-food-5.png" alt="Detail 4" fill sizes="33vw" className="object-cover" />
            </div>
            <div className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] translate-x-[20%]" style={{ color: "#8C6F5B" }}>
              <span>Recipe Archive</span>
            </div>
          </div>

        </div>
      </div>

      {/* --- PAGE 3: SPLIT MAGAZINE LAYOUT --- */}
      <div className="relative w-full min-h-[120vh] max-w-[1600px] mx-auto px-6 md:px-12 py-32 flex flex-col justify-center">
        
        {/* Top editorial rule */}
        <div className="w-full h-[0.5px] mb-24 lg:mb-32" style={{ backgroundColor: "#D8CFC6" }} />

        <div className="grid grid-cols-12 gap-12 lg:gap-24 relative z-10 w-full">
          
          {/* Left: Huge Paragraph */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-center order-2 lg:order-1" ref={addToParallax} data-speed="-5">
            <p className="font-heading text-[38px] md:text-[50px] lg:text-[60px] leading-[1.15] tracking-tight mb-16 text-[#8C6F5B]">
              Every morning<br />
              the kitchen begins<br />
              without applause.
            </p>
            <p className="font-heading text-[38px] md:text-[50px] lg:text-[60px] leading-[1.15] tracking-tight">
              The first flame<br />
              belongs only<br />
              to those who built it.
            </p>
          </div>

          {/* Right: Three stacked images */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-20 lg:gap-32 order-1 lg:order-2 lg:pl-16 border-l-0 lg:border-l-[0.5px]" style={{ borderColor: "#D8CFC6" }}>
            
            {/* Image A */}
            <div className="flex flex-col items-start w-[85%] max-w-[420px]" ref={addToParallax} data-speed="-12">
              <div className="relative w-full aspect-[4/3] bg-[#D8CFC6]">
                <Image src="/editorial-food-2.png" alt="Knife" fill sizes="33vw" className="object-cover" />
              </div>
              <div className="mt-4 flex justify-between w-full font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "#8C6F5B" }}>
                <span>Knife.</span>
                <span>Issue 04</span>
              </div>
            </div>

            {/* Image B */}
            <div className="flex flex-col items-end w-[95%] max-w-[500px] self-end" ref={addToParallax} data-speed="-16">
              <div className="relative w-full aspect-[16/9] bg-[#D8CFC6]">
                <Image src="/editorial-process.png" alt="Steam" fill sizes="40vw" className="object-cover" />
              </div>
              <div className="mt-4 flex justify-between w-full font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "#8C6F5B" }}>
                <span>Steam.</span>
                <span>Edition 2026</span>
              </div>
            </div>

            {/* Image C */}
            <div className="flex flex-col items-start w-[75%] max-w-[360px] ml-[5%]" ref={addToParallax} data-speed="-10">
              <div className="relative w-full aspect-square bg-[#D8CFC6]">
                <Image src="/editorial-food-4.png" alt="Preparation" fill sizes="33vw" className="object-cover" />
              </div>
              <div className="mt-4 flex justify-between w-full font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "#8C6F5B" }}>
                <span>Preparation.</span>
                <span>Issue 04</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Page Numbers */}
      <div className="absolute top-[5vh] left-6 font-mono text-[10px] tracking-widest pointer-events-none" style={{ color: "#8C6F5B" }}>
        042
      </div>
      <div className="absolute top-[130vh] right-6 font-mono text-[10px] tracking-widest pointer-events-none" style={{ color: "#8C6F5B" }}>
        043
      </div>
      <div className="absolute bottom-[5vh] left-6 font-mono text-[10px] tracking-widest pointer-events-none" style={{ color: "#8C6F5B" }}>
        044
      </div>

    </section>
  );
}
