"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTableStore } from "../../stores/table-store";
import MauryaCurve from "../brand/MauryaCurve";

export default function TableIcon() {
  const { getItemCount } = useTableStore();
  const itemCount = getItemCount();
  const prevCountRef = useRef(itemCount);
  const [animateState, setAnimateState] = useState<"idle" | "recently-added">("idle");
  const [trailOpacity, setTrailOpacity] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (itemCount > prevCountRef.current) {
      // Dish added! Trigger compression animation
      setAnimateState("recently-added");
      setTrailOpacity(0.8);
      
      const timer = setTimeout(() => {
        setAnimateState("idle");
      }, 180);

      const fadeTimer = setTimeout(() => {
        setTrailOpacity(0);
      }, 600);

      return () => {
        clearTimeout(timer);
        clearTimeout(fadeTimer);
      };
    }
    prevCountRef.current = itemCount;
  }, [itemCount, mounted]);

  const currentCount = mounted ? itemCount : 0;
  const isEmpty = currentCount === 0;
  const isOne = currentCount === 1;
  const isActive = currentCount >= 2;

  return (
    <div className="relative w-8 h-8 flex items-center justify-center select-none">
      {/* Table Icon Glyph */}
      <svg 
        viewBox="0 0 100 100" 
        className={`w-7 h-7 text-[#B98532] transition-all duration-300 ${
          animateState === "recently-added" ? "scale-75 rotate-12" : "scale-100"
        }`}
      >
        {/* Four Chairs (top, bottom, left, right circles) */}
        <circle cx="50" cy="18" r="7" className="fill-none stroke-current stroke-[2]" />
        <circle cx="50" cy="82" r="7" className="fill-none stroke-current stroke-[2]" />
        <circle cx="18" cy="50" r="7" className="fill-none stroke-current stroke-[2]" />
        <circle cx="82" cy="50" r="7" className="fill-none stroke-current stroke-[2]" />

        {/* Central Dining Plate */}
        <circle 
          cx="50" 
          cy="50" 
          r="18" 
          className={`transition-all duration-500 stroke-current stroke-[2] ${
            isEmpty ? "fill-none" : "fill-current"
          } ${
            isActive ? "animate-[pulse_2s_infinite]" : ""
          }`}
        />
      </svg>

      {/* Floating curve trail that sweeps across on item add */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ opacity: trailOpacity }}
      >
        <MauryaCurve 
          variant="trail" 
          className="w-full h-full text-[#C9371D]" 
        />
      </div>

      {/* Item badge count bubble (small and clean) */}
      {!isEmpty && (
        <span className="absolute -top-1.5 -right-1.5 bg-[#8F1115] text-[#F3E8D4] font-mono text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#0B0908]">
          {currentCount}
        </span>
      )}
    </div>
  );
}
