"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTableStore } from "../../stores/table-store";

export default function TableIcon() {
  const { getItemCount } = useTableStore();
  const itemCount = getItemCount();
  const prevCountRef = useRef(itemCount);
  const [mounted, setMounted] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (itemCount > prevCountRef.current) {
      // Dish added! Trigger brass ripple
      setRippleActive(true);
      const timer = setTimeout(() => {
        setRippleActive(false);
      }, 600);
      return () => clearTimeout(timer);
    }
    prevCountRef.current = itemCount;
  }, [itemCount, mounted]);

  const currentCount = mounted ? itemCount : 0;
  const isEmpty = currentCount === 0;
  const isOne = currentCount === 1;
  const isFull = currentCount >= 2;

  return (
    <div className="relative w-10 h-10 flex items-center justify-center select-none group cursor-pointer">
      <style>{`
        @keyframes rippleEffect {
          0% { r: 26px; opacity: 1; stroke-width: 1.8px; }
          100% { r: 46px; opacity: 0; stroke-width: 0.5px; }
        }
        .animate-table-ripple {
          animation: rippleEffect 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes steamRise {
          0% { stroke-dashoffset: 16; opacity: 0; transform: translateY(0px); }
          20% { opacity: 0.5; }
          80% { opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; transform: translateY(-6px); }
        }
        .steam-path {
          stroke-dasharray: 16;
          stroke-dashoffset: 16;
          opacity: 0;
          transform-origin: bottom center;
        }
        .group:hover .steam-path {
          animation: steamRise 1.4s infinite linear;
        }
      `}</style>

      {/* Table Icon Glyph */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-[34px] h-[34px] text-[#B98532] fill-none stroke-current"
      >
        {/* Four Chairs (top view arcs) */}
        {/* Top Chair */}
        <path d="M 38 12 Q 50 6 62 12" strokeWidth="2.2" strokeLinecap="round" />
        {/* Bottom Chair */}
        <path d="M 38 88 Q 50 94 62 88" strokeWidth="2.2" strokeLinecap="round" />
        {/* Left Chair */}
        <path d="M 12 38 Q 6 50 12 62" strokeWidth="2.2" strokeLinecap="round" />
        {/* Right Chair */}
        <path d="M 88 38 Q 94 50 88 62" strokeWidth="2.2" strokeLinecap="round" />

        {/* Central Dining Table Base */}
        <circle cx="50" cy="50" r="26" strokeWidth="2" />

        {/* Floating Steam lines rising on Hover */}
        <path d="M 44 26 Q 42 18 46 12" strokeWidth="1" strokeLinecap="round" className="steam-path" style={{ animationDelay: "0s" }} />
        <path d="M 50 24 Q 52 16 48 10" strokeWidth="1" strokeLinecap="round" className="steam-path" style={{ animationDelay: "0.2s" }} />
        <path d="M 56 26 Q 54 18 58 12" strokeWidth="1" strokeLinecap="round" className="steam-path" style={{ animationDelay: "0.4s" }} />

        {/* Plates/Dishes inside the Table */}
        {isOne && (
          // One Dish State (1 small central plate)
          <circle cx="50" cy="50" r="6.5" className="fill-[#B98532] stroke-none shadow-[0_0_8px_rgba(185,133,50,0.5)] animate-pulse" />
        )}

        {isFull && (
          // Full Table State (3 plates arranged asymmetrically)
          <>
            <circle cx="44" cy="46" r="4.5" className="fill-[#B98532] stroke-none" />
            <circle cx="56" cy="46" r="4.5" className="fill-[#B98532] stroke-none" />
            <circle cx="50" cy="57" r="4.5" className="fill-[#B98532] stroke-none" />
          </>
        )}

        {/* Dynamic added ripple ring */}
        {rippleActive && (
          <circle 
            cx="50" 
            cy="50" 
            className="animate-table-ripple stroke-[#B98532] fill-none" 
          />
        )}
      </svg>

      {/* Item badge count bubble (represented as a tiny elegant gold indicator inside table, or floating on right) */}
      {!isEmpty && (
        <span className="absolute -top-0.5 -right-0.5 bg-[#8F1115] text-[#F3E8D4] font-sans text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-[#0B0908]">
          {currentCount}
        </span>
      )}
    </div>
  );
}
