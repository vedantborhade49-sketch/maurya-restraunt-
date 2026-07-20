"use client";

import React from "react";

interface PureVegBadgeProps {
  className?: string;
  showText?: boolean;
}

export default function PureVegBadge({ className = "", showText = true }: PureVegBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* FSSAI Standard Pure Veg Green Symbol */}
      <div className="w-4 h-4 border border-[#164C2B] p-[2px] flex items-center justify-center bg-white shrink-0">
        <div className="w-2 h-2 rounded-full bg-[#164C2B]" />
      </div>

      {showText && (
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-[#164C2B]">
          PURE VEG
        </span>
      )}
    </div>
  );
}
