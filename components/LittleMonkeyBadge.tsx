"use client";

import React, { useState } from "react";

interface LittleMonkeyBadgeProps {
  variant?: "menu" | "reviews";
  message?: string;
  className?: string;
}

export default function LittleMonkeyBadge({
  variant = "menu",
  message,
  className = "",
}: LittleMonkeyBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);

  const defaultMessage =
    variant === "menu"
      ? "Monkey's Favorite Dish! 🍌"
      : "100% Pure Veg & Monkey Approved! 🐒";

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-flex items-center gap-3 bg-[#FAF7F0] border-2 border-[#9A5C3B] px-4 py-2 shadow-[0_6px_20px_rgba(71,32,32,0.12)] rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl select-none cursor-pointer z-30 ${className}`}
    >
      {/* ── CUTEST VINTAGE MONKEY SVG MASCOT ── */}
      <div className="relative w-8 h-8 flex-shrink-0">
        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full text-[#5A1F1F] fill-current transition-transform duration-300 ${
            isHovered ? "rotate-[12deg] scale-110" : "rotate-0"
          }`}
        >
          {/* Left Ear */}
          <circle cx="22" cy="45" r="14" fill="#6B2C2C" />
          <circle cx="22" cy="45" r="8" fill="#EFE8DB" />
          {/* Right Ear */}
          <circle cx="78" cy="45" r="14" fill="#6B2C2C" />
          <circle cx="78" cy="45" r="8" fill="#EFE8DB" />
          {/* Main Head */}
          <circle cx="50" cy="50" r="32" fill="#5A1F1F" />
          {/* Face Patch */}
          <ellipse cx="50" cy="56" rx="24" ry="20" fill="#EFE8DB" />
          {/* Eye Left */}
          <circle cx="40" cy="48" r="4.5" fill="#1C1414" />
          <circle cx="39" cy="46.5" r="1.5" fill="#FFFFFF" />
          {/* Eye Right */}
          <circle cx="60" cy="48" r="4.5" fill="#1C1414" />
          <circle cx="59" cy="46.5" r="1.5" fill="#FFFFFF" />
          {/* Cute Muzzle & Nose */}
          <ellipse cx="50" cy="58" rx="8" ry="5" fill="#D8CFBC" />
          <circle cx="50" cy="56" r="2.5" fill="#472020" />
          {/* Cheerful Smile */}
          <path
            d="M42,63 Q50,71 58,63"
            fill="none"
            stroke="#5A1F1F"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Little Brass Chef Hat / Crown Accent */}
          <path
            d="M38,22 L42,12 L50,18 L58,12 L62,22 Z"
            fill="#9A5C3B"
            stroke="#472020"
            strokeWidth="2"
          />
          <circle cx="50" cy="11" r="3" fill="#B98532" />
        </svg>

        {/* Floating Wiggle Star */}
        <span
          className={`absolute -top-1 -right-1 text-xs text-[#9A5C3B] transition-transform duration-300 ${
            isHovered ? "scale-125 rotate-45" : "scale-100"
          }`}
        >
          ✦
        </span>
      </div>

      {/* ── SPEECH / VINTAGE BADGE TEXT ── */}
      <div className="flex flex-col text-left">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#9A5C3B] font-bold leading-none">
          MAURYA MASCOT
        </span>
        <span className="font-heading italic text-xs md:text-sm font-semibold text-[#5A1F1F] leading-tight">
          {message || defaultMessage}
        </span>
      </div>
    </div>
  );
}
