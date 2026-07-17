"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTableStore } from "../../stores/table-store";

export default function TableIcon({ isHeroMode = false }: { isHeroMode?: boolean }) {
  const { getItemCount, getSubtotal } = useTableStore();
  const itemCount = getItemCount();
  const subtotal = getSubtotal();
  
  const prevCountRef = useRef(itemCount);
  const [mounted, setMounted] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (itemCount > prevCountRef.current) {
      // Trigger ripple animation on item addition
      setRippleActive(true);
      const timer = setTimeout(() => setRippleActive(false), 600);
      return () => clearTimeout(timer);
    }
    prevCountRef.current = itemCount;
  }, [itemCount, mounted]);

  const currentCount = mounted ? itemCount : 0;
  const currentSubtotal = mounted ? subtotal : 0;
  const isEmpty = currentCount === 0;

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center gap-2.5 px-3 py-1.5 border rounded-lg transition-all duration-400 select-none group h-10 ${
        isHeroMode 
          ? "border-[#F3E8D4]/20 hover:border-[#F3E8D4]/50" 
          : "border-[#D8B26E]/30 hover:border-[#D8B26E]/60"
      }`}
    >
      <style>{`
        @keyframes rippleEffect {
          0% { r: 18px; opacity: 1; stroke-width: 1.8px; }
          100% { r: 38px; opacity: 0; stroke-width: 0.5px; }
        }
        .animate-icon-ripple {
          animation: rippleEffect 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* ◎ Icon Part */}
      <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 100 100" className="w-5 h-5 text-[#B98532] fill-none stroke-current">
          {/* Outer ring ◎ */}
          <circle cx="50" cy="50" r="40" strokeWidth="3" />
          {/* Inner dot/ring */}
          <circle cx="50" cy="50" r="16" strokeWidth="2.5" />
          
          {/* Ripple animation on added item */}
          {rippleActive && (
            <circle cx="50" cy="50" className="animate-icon-ripple stroke-[#B98532] fill-none" />
          )}
        </svg>

        {/* Collapsed Count indicator overlay (if not hovered) */}
        {!isHovered && !isEmpty && (
          <span className="absolute -top-1 -right-1.5 bg-[#8F1115] text-[#F3E8D4] font-sans text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-[#0B0908]">
            {currentCount}
          </span>
        )}
      </div>

      {/* Expanded / Hover Text Panels */}
      <div 
        className={`flex flex-col items-start transition-all duration-400 overflow-hidden leading-[1.1] font-sans ${
          isHovered ? "max-w-[150px] opacity-100" : "max-w-0 opacity-0 pointer-events-none"
        }`}
      >
        <span className={`text-[10px] font-bold tracking-wider uppercase whitespace-nowrap ${
          isHeroMode ? "text-[#F3E8D4]" : "text-[#350709]"
        }`}>
          YOUR TABLE
        </span>
        <span className={`text-[8px] whitespace-nowrap ${
          isHeroMode ? "text-[#F3E8D4]/60" : "text-[#350709]/60"
        }`}>
          {currentCount} ITEMS · ₹{currentSubtotal}
        </span>
      </div>
    </div>
  );
}
