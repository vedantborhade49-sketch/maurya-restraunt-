"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PureVegBadge from "@/components/ui/PureVegBadge";
import SteamMotif from "@/components/SteamMotif";

export default function PureVegPromise() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { scale: 1.06, opacity: 0.6 },
        {
          scale: 1.0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      num: "01",
      title: "Fresh Morning Selection",
      desc: "Vegetables and dairy delivered before dawn every single day.",
    },
    {
      num: "02",
      title: "Slow-Cooked Ember Craft",
      desc: "Gravies simmered overnight over authentic clay-tandoor embers.",
    },
    {
      num: "03",
      title: "100% Dedicated Kitchen",
      desc: "Separate cookware and 28 years of uncompromised family recipes.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full material-light text-[#272322] py-20 md:py-32 overflow-hidden select-none border-t border-[#9A5C3B]/15"
    >
      {/* Warm Lighting Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FAF7F0] via-[#F8F5EF] to-[#EFE8DB]/80 pointer-events-none z-0" />

      <div className="container-maurya relative z-10">
        <div className="content-grid grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center max-w-[1100px] mx-auto">
          
          {/* Left Column: Editorial Spices & Tandoor Photograph */}
          <div className="lg:col-span-5 relative">
            <div
              ref={imgRef}
              className="relative w-full h-[420px] sm:h-[480px] rounded-sm overflow-hidden border border-[#9A5C3B]/25 shadow-2xl bg-[#1C1414]"
            >
              <img
                src="/editorial-spices.png"
                alt="Fresh spices and raw ingredients"
                className="w-full h-full object-cover grayscale-[15%] sepia-[10%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#272322]/80 via-transparent to-transparent" />
              <SteamMotif className="absolute inset-0 w-full h-full mix-blend-screen opacity-25 pointer-events-none" />

              {/* Floating Pure Veg Heritage Seal */}
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2.5 bg-[#FAF7F0]/90 px-4 py-2 rounded-full border border-[#9A5C3B]/30 backdrop-blur-md shadow-md">
                <PureVegBadge showText={false} size={16} />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#5A1F1F] font-bold">
                  100% PURE VEGETARIAN SANCTUARY
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Oath & Pillars */}
          <div ref={textRef} className="lg:col-span-7 space-y-8">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9A5C3B] animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#9A5C3B] font-bold">
                  03 &nbsp;·&nbsp; OUR PURE VEG SANCTUARY
                </span>
              </div>

              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-[#272322] leading-[0.96] tracking-tight uppercase">
                Pure Veg.<br />
                <span className="italic text-[#9A5C3B] font-serif lowercase">Zero Compromise.</span>
              </h2>

              <p className="font-sans text-base md:text-lg text-[#272322]/80 leading-relaxed font-light max-w-[540px]">
                At Maurya, our kitchen is a sacred sanctuary. For over 28 years, every dish is crafted with hand-selected ingredients and slow-cooked tandoori embers—never compromising on purity or taste.
              </p>
            </div>

            {/* 3 Quiet Pillars */}
            <div className="space-y-5 pt-4 border-t border-[#9A5C3B]/20">
              {pillars.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <span className="font-mono text-[10px] text-[#9A5C3B] tracking-[0.2em] font-bold pt-1">
                    {item.num}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-heading text-lg text-[#272322] leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#272322]/70 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
