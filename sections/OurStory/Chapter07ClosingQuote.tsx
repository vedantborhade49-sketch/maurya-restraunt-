"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import ButtonSecondary from "@/components/ui/ButtonSecondary";

export default function Chapter07ClosingQuote() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 md:py-48 px-6 bg-[#350709] text-[#F8F6F1] overflow-hidden select-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoise)' opacity='0.03'/%3E%3C/svg%3E")`,
      }}
    >
      <div ref={contentRef} className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
        
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] font-bold text-[#B98532] block">
          CHAPTER 07 — THE INVITATION
        </span>

        <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight font-normal text-[#F8F6F1]">
          COME HUNGRY.<br />
          <span className="italic font-serif text-[#B98532] block mt-2">
            LEAVE WITH A STORY.
          </span>
        </h2>

        <p className="font-sans text-sm md:text-base lg:text-lg text-[#F8F6F1]/80 max-w-lg mx-auto font-light leading-relaxed">
          We have a table waiting for you and your loved ones. Join us at Maurya for an unforgettable dining story.
        </p>

        {/* Dual Premium CTAs */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link href="/menu">
            <ButtonPrimary className="w-full sm:w-auto bg-[#B98532] text-[#350709] hover:bg-[#D4A373]">
              Reserve Your Table
            </ButtonPrimary>
          </Link>

          <Link href="/menu">
            <ButtonSecondary className="w-full sm:w-auto border-[#B98532] text-[#F8F6F1] hover:bg-[#B98532] hover:text-[#350709]">
              Explore Our Menu
            </ButtonSecondary>
          </Link>
        </div>

      </div>
    </section>
  );
}
