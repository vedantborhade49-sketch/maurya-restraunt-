"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PureVegBadge from "@/components/ui/PureVegBadge";
import BrassDivider from "@/components/ui/BrassDivider";
import { Leaf, Flame, HeartHandshake } from "lucide-react";

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
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "power4.out" }
      );

      tl.fromTo(
        ".pv-card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const promiseItems = [
    {
      icon: Leaf,
      title: "Fresh Daily Ingredients",
      description: "Hand-selected vegetables and farm-fresh dairy delivered every morning before dawn. We never compromise on natural freshness.",
    },
    {
      icon: Flame,
      title: "Slow-Cooked Ember Craft",
      description: "Our dal and signature gravies simmer overnight over tandoori embers, capturing authentic smoky depth and rich traditional aromas.",
    },
    {
      icon: HeartHandshake,
      title: "Pure Vegetarian Kitchen",
      description: "100% pure vegetarian. Dedicated cookware and traditional family recipes passed down over 28 years of pure hospitality.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F8F6F1] text-[#350709] py-28 px-6 md:px-12 lg:px-20 overflow-hidden font-sans border-t border-[#B98532]/20"
    >
      <div className="max-w-[1320px] mx-auto space-y-16">
        
        {/* Header Block */}
        <div className="pv-header text-center space-y-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <PureVegBadge showText={true} />
            <span className="text-[#B98532]">·</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B98532] font-bold">
              OUR PROMISE
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#350709] leading-tight font-normal">
            Pure Veg. <span className="italic text-[#B98532]">Zero Compromise.</span>
          </h2>

          <p className="font-sans text-sm md:text-base text-[#1F1F1F]/80 max-w-xl mx-auto leading-relaxed">
            Dining at Maurya is more than a meal—it is a sacred tradition of pure ingredients,
            traditional clay-tandoor embers, and heartfelt hospitality.
          </p>
        </div>

        {/* 3-Column Manifesto Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {promiseItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="pv-card bg-[#F8F6F1] border border-[#B98532]/25 p-8 md:p-10 space-y-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-none bg-[#350709] text-[#F8F6F1] flex items-center justify-center">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-2xl text-[#350709] leading-snug">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-[#1F1F1F]/75 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <BrassDivider showLogo={false} className="opacity-50" />
      </div>
    </section>
  );
}
