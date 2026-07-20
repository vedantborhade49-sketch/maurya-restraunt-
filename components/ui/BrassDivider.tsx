"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface BrassDividerProps {
  showLogo?: boolean;
  className?: string;
}

export default function BrassDivider({ showLogo = true, className = "" }: BrassDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            ease: "expo.out",
            transformOrigin: "center center",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative py-6 flex items-center justify-center w-full ${className}`}
    >
      <div
        ref={lineRef}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#B98532]/40 w-full"
      />

      {showLogo && (
        <div className="relative z-10 bg-[#F8F6F1] px-6 py-1 flex items-center justify-center">
          <img
            src="/morya-logo.png"
            alt="Maurya"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </div>
      )}
    </div>
  );
}
