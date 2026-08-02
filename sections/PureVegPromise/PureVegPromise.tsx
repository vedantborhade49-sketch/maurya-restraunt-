"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import SteamMotif from "@/components/SteamMotif";
import PureVegSVGAnimation from "@/components/PureVegSVGAnimation";

export default function PureVegPromise() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Main text section reveal
      gsap.fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Staggered reveal for pillars
      if (pillarsRef.current) {
        const items = pillarsRef.current.querySelectorAll(".pillar-item");
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.18,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      num: "01",
      title: "Fresh Morning Selection",
      desc: "Vegetables and dairy delivered before dawn every single day, guaranteeing farm-fresh purity.",
    },
    {
      num: "02",
      title: "Slow-Cooked Ember Craft",
      desc: "Rich gravies simmered overnight over authentic clay-tandoor embers for signature depth.",
    },
    {
      num: "03",
      title: "100% Dedicated Kitchen",
      desc: "Separate cookware, zero cross-contamination, and 35 years of uncompromised family recipes.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full material-light text-[#272322] py-12 md:py-32 overflow-hidden select-none border-t border-[#9A5C3B]/15"
    >
      {/* Background Culinary Steam Wisps */}
      <SteamMotif className="opacity-20" />

      {/* Warm Lighting Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FAF7F0] via-[#F8F5EF] to-[#EFE8DB]/85 pointer-events-none z-0" />

      <div className="container-maurya relative z-10">
        <div className="content-grid grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-14 items-center max-w-[1180px] mx-auto">
          
          {/* Left Column: Pure Veg SVG Animated Symbol with Motion Reveal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            whileTap={{ scale: 0.96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative flex items-center justify-center py-2 md:py-0"
          >
            <PureVegSVGAnimation />
          </motion.div>

          {/* Right Column: Editorial Oath & Pillars */}
          <div ref={textRef} className="lg:col-span-7 space-y-6 md:space-y-8">
            
            <div className="space-y-3.5 md:space-y-4">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#164C2B]/10 border border-[#164C2B]/30 text-[#164C2B]">
                <span className="w-2 h-2 rounded-full bg-[#164C2B] animate-pulse" />
                <span className="font-mono text-[9.5px] uppercase tracking-[0.3em] font-extrabold">
                  ACT III &nbsp;·&nbsp; OUR PURE VEG SANCTUARY
                </span>
              </div>

              <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl text-[#272322] leading-[0.94] tracking-tight uppercase">
                Pure Veg.<br />
                <span className="italic text-[#9A5C3B] font-serif lowercase">Zero Compromise.</span>
              </h2>

              <p className="font-sans text-sm sm:text-base md:text-lg text-[#272322]/85 leading-relaxed font-light max-w-[560px]">
                At Maurya, our kitchen is a sacred sanctuary. For over 35 years, every single dish is prepared with hand-selected whole spices, fresh morning produce, and authentic tandoori embers—never compromising on purity, heritage, or taste.
              </p>
            </div>

            {/* 3 Pillars */}
            <div ref={pillarsRef} className="space-y-3 md:space-y-4 pt-3 md:pt-4 border-t border-[#9A5C3B]/25">
              {pillars.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileTap={{ scale: 0.98 }}
                  className="pillar-item group p-3.5 sm:p-5 rounded-2xl bg-[#FAF7F2]/80 hover:bg-[#FAF7F2] border border-[#9A5C3B]/20 hover:border-[#164C2B]/40 transition-all duration-300 flex items-start gap-3.5 sm:gap-5 cursor-default shadow-xs"
                >
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-xs text-[#9A5C3B] tracking-[0.2em] font-extrabold pt-0.5 group-hover:text-[#164C2B] transition-colors">
                      {item.num}
                    </span>
                    <div className="w-[1px] h-8 bg-[#9A5C3B]/20 group-hover:bg-[#164C2B]/40 transition-colors mt-2" />
                  </div>

                  <div className="space-y-1 flex-1">
                    <h3 className="font-heading text-base sm:text-xl text-[#272322] leading-snug group-hover:text-[#164C2B] transition-colors font-bold">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#272322]/75 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
