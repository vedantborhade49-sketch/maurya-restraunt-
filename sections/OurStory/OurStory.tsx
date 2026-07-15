"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MAURYA_EASE } from "../../lib/motion/maurya-motion";

export default function OurStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ScrollTrigger reveal animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        }
      });

      gsap.set(".story-line", { y: "105%" });

      tl.to(".story-line", {
        y: "0%",
        duration: 0.8,
        stagger: 0.1,
        ease: MAURYA_EASE.heavy,
      });

      tl.fromTo(imageRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.0, ease: "power3.out" },
        0.2
      );

      tl.fromTo(".story-para",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" },
        0.4
      );

      tl.fromTo("#story-closing",
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.8, ease: MAURYA_EASE.heavy },
        0.8
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="story" 
      ref={sectionRef}
      className="relative w-full bg-[#F3E8D4] text-[#350709] py-24 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-[#350709]/10"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E")`,
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">
        
        {/* Left 40%: Large Vertical Framed Restaurant Image */}
        <div ref={imageRef} className="lg:w-[40%] flex items-center justify-center opacity-0">
          <div className="relative w-full max-w-[400px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(53,7,9,0.18)] border-[6px] border-[#350709]/5 bg-[#350709]/5">
            <Image
              src="/restaurant-interior.png"
              alt="Maurya Restaurant Atmosphere"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover transition-transform duration-[2s] hover:scale-105"
              priority
            />
          </div>
        </div>

        {/* Right 60%: Editorial Story Content */}
        <div ref={contentRef} className="lg:w-[60%] flex flex-col justify-between py-2">
          
          <div className="space-y-8">
            {/* Header segment with location marker */}
            <div className="flex justify-between items-start border-b border-[#350709]/10 pb-4">
              <div>
                <span className="font-sans text-[10px] tracking-[0.25em] text-[#8F1115] font-extrabold block">
                  01 THE BEGINNING
                </span>
              </div>
              <div className="text-right flex items-center gap-3">
                <span className="font-sans text-[8px] tracking-[0.2em] uppercase text-[#350709]/60 leading-none">
                  KONDHWA<br />PUNE
                </span>
                <div className="h-6 w-[1px] bg-[#B98532]/40" />
              </div>
            </div>

            {/* Huge statement with clipped line reveals */}
            <h2 className="font-serif font-bold text-4xl sm:text-5xl md:text-[4rem] leading-[0.95] tracking-tight text-[#8F1115]">
              <div className="overflow-hidden pb-1">
                <div className="story-line">MAURYA WASN'T</div>
              </div>
              <div className="overflow-hidden pb-1">
                <div className="story-line">BUILT AROUND</div>
              </div>
              <div className="overflow-hidden pb-1">
                <div className="story-line">A MENU.</div>
              </div>
              <div className="overflow-hidden pb-1 text-[#350709] italic font-normal mt-2">
                <div className="story-line">IT WAS BUILT</div>
              </div>
              <div className="overflow-hidden pb-1 text-[#350709] italic font-normal">
                <div className="story-line">AROUND A TABLE.</div>
              </div>
            </h2>

            {/* Paragraph Block: split editorial narrative */}
            <div className="space-y-5 max-w-xl text-[#350709]/95 font-sans font-light text-sm sm:text-base leading-relaxed">
              <p className="story-para opacity-0">
                We believe there is no greater joy than having guests gather around a table with good food, satisfaction in mind, and a smile on their faces. It is why we created a space dedicated to the pureness and vibrancy of fine Indian vegetarian cuisine.
              </p>
              <p className="story-para opacity-0">
                Our kitchen is built around rich spices, aromatic curries, and mouthwatering flavors crafted by our talented chefs. We are here to offer you the tastes you didn't know you were missing, all in the heart of Kondhwa, Pune.
              </p>
              <p className="story-para opacity-0">
                Whether it is a special celebration, a birthday party, a romantic dinner date, or a simple weekend meal with family, Maurya is designed to host your most memorable moments.
              </p>
            </div>
          </div>

          {/* Footer segment: CTA and Emotional Closing line */}
          <div className="mt-10 pt-6 border-t border-[#350709]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <Link
              href="/our-story"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-[#8F1115] hover:bg-[#8F1115]/90 text-[#F3E8D4] text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-[0_10px_20px_rgba(143,17,21,0.15)] hover:-translate-y-0.5 active:translate-y-px"
            >
              Our Philosophy
            </Link>

            <div 
              id="story-closing" 
              className="opacity-0 flex flex-col items-end sm:text-right"
            >
              <span className="font-serif italic text-xl md:text-2xl text-[#8F1115] leading-none">
                A place for one more plate.
              </span>
              <span className="font-sans text-[8px] tracking-[0.18em] uppercase text-[#350709]/50 mt-1 block">
                COME HUNGRY. LEAVE WITH A STORY.
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
