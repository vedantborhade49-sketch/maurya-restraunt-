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
      className="relative w-full bg-[#164C2B] text-[#F8F5EF] py-28 md:py-36 overflow-hidden font-sans border-t border-[#9A5C3B]/30"
      style={{
        backgroundImage: `radial-gradient(circle at center, transparent 60%, rgba(10,35,20,0.8) 100%), url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E")`,
      }}
    >
      <div className="container-maurya space-y-16">
        
        {/* Header Block */}
        <div className="pv-header text-center space-y-4 content-grid max-w-3xl">
          <div className="flex items-center justify-center gap-3">
            <PureVegBadge showText={true} />
            <span className="text-[#9A5C3B]">·</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#9A5C3B] font-bold">
              OUR PROMISE
            </span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-[#F8F5EF] leading-tight font-normal">
            Pure Veg. <span className="italic text-[#9A5C3B]">Zero Compromise.</span>
          </h2>

          <p className="font-sans text-sm md:text-base text-[#F8F5EF]/80 max-w-xl mx-auto leading-relaxed">
            Dining at Maurya is more than a meal—it is a sacred tradition of pure ingredients,
            traditional clay-tandoor embers, and heartfelt hospitality.
          </p>
        </div>

        {/* 3-Column Manifesto Grid */}
        <div className="content-grid grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {promiseItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="pv-card bg-[#133D23] border border-[#9A5C3B]/30 p-8 md:p-10 space-y-5 transition-transform duration-300 hover:-translate-y-1 shadow-xl"
              >
                <div className="w-12 h-12 rounded-none bg-[#9A5C3B] text-[#F8F5EF] flex items-center justify-center">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-heading text-2xl text-[#F8F5EF] leading-snug">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-[#F8F5EF]/75 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <BrassDivider showLogo={false} className="opacity-40" />
      </div>
    </section>
  );
}
