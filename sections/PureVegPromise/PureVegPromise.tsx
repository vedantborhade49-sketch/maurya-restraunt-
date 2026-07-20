"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PureVegBadge from "@/components/ui/PureVegBadge";
import BrassDivider from "@/components/ui/BrassDivider";

export default function PureVegPromise() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        ".pv-header",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "power4.out" }
      );

      tl.fromTo(
        ".pv-pillar",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.18, ease: "power3.out" },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      num: "01",
      title: "Fresh Daily Ingredients",
      desc: "Hand-selected vegetables and farm-fresh dairy delivered before dawn every single morning.",
    },
    {
      num: "02",
      title: "Slow-Cooked Ember Craft",
      desc: "Simmered overnight over authentic tandoori embers for rich, natural smoky depth.",
    },
    {
      num: "03",
      title: "Pure Vegetarian Kitchen",
      desc: "100% pure vegetarian. Dedicated cookware and family recipes passed down over 28 years.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0E1B14] text-[#F8F5EF] py-24 md:py-36 overflow-hidden select-none border-t border-[#9A5C3B]/25"
    >
      {/* Radial Emerald-Gold Ambient Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(27,59,39,0.5)_0%,_rgba(14,27,20,0.95)_75%)] pointer-events-none z-0" />

      <div className="container-maurya relative z-10 space-y-16">
        
        {/* Editorial Header Block */}
        <div className="pv-header text-center space-y-5 content-grid max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <PureVegBadge showText={true} />
            <span className="text-[#9A5C3B] opacity-60">·</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#9A5C3B] font-bold">
              03 &nbsp;·&nbsp; OUR PURE VEG SANCTUARY
            </span>
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl text-[#F8F5EF] leading-tight font-normal tracking-tight">
            Pure Veg. <span className="italic text-[#9A5C3B] font-serif">Zero Compromise.</span>
          </h2>

          <p className="font-sans text-base md:text-lg text-[#F8F5EF]/75 max-w-xl mx-auto leading-relaxed font-light">
            Dining at Maurya is a sacred tradition—pure ingredients, traditional clay-tandoor embers, and 28 years of pure hospitality.
          </p>
        </div>

        {/* Minimalist 3-Pillar Editorial Layout (No Boxed Cards) */}
        <div className="content-grid grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 pt-4 border-t border-[#9A5C3B]/20">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="pv-pillar space-y-4 pr-0 md:pr-4 border-b md:border-b-0 md:border-r border-[#9A5C3B]/15 pb-8 md:pb-0 last:border-none"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-[#9A5C3B] tracking-[0.25em] font-bold">
                  {item.num}
                </span>
                <div className="h-[1px] w-8 bg-[#9A5C3B]/40" />
              </div>
              <h3 className="font-heading text-2xl text-[#F8F5EF] leading-snug">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-[#F8F5EF]/70 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <BrassDivider showLogo={false} className="opacity-30 pt-4" />
      </div>
    </section>
  );
}
