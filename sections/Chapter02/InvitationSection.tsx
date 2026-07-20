"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function InvitationSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".invitation-content > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full material-light py-28 md:py-36 z-10 border-b border-[#9A5C3B]/15"
    >
      <div className="container-maurya">
        <div className="content-grid max-w-[900px] invitation-content space-y-8">
          
          <div className="flex items-center gap-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#9A5C3B] font-bold">
              THE INVITATION
            </span>
            <div className="h-[1px] w-12 bg-[#9A5C3B]/30" />
          </div>

          <h2 className="font-heading text-[42px] sm:text-[60px] md:text-[76px] leading-[0.98] tracking-tight text-[#272322]">
            Every meal begins<br />
            <span className="italic text-[#9A5C3B]">with an invitation.</span>
          </h2>

          <p className="font-sans text-[17px] sm:text-[20px] md:text-[24px] leading-[1.6] text-[#272322]/85 font-light max-w-[720px]">
            At Maurya, we don't simply serve food. We create tables where families gather, friends celebrate, and memories are made.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-[480px]">
            <Link
              href="/visit#reserve"
              className="cta-button font-mono text-[11px] uppercase tracking-[0.25em] px-8 py-4 inline-flex items-center justify-center text-center font-bold"
            >
              Reserve
            </Link>
            <Link
              href="/menu"
              className="px-8 py-4 border border-[#272322]/30 hover:border-[#9A5C3B] hover:text-[#9A5C3B] text-[#272322] font-mono text-[11px] uppercase tracking-[0.25em] inline-flex items-center justify-center text-center font-bold rounded-full transition-all"
            >
              Explore the Menu
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
