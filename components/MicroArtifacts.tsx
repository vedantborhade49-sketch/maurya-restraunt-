"use client";

import React from "react";

export function CropMarks({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none opacity-40 ${className}`}>
      {/* Top Left */}
      <div className="absolute top-0 left-0 w-4 h-[1px] bg-current" />
      <div className="absolute top-0 left-0 w-[1px] h-4 bg-current" />
      {/* Top Right */}
      <div className="absolute top-0 right-0 w-4 h-[1px] bg-current" />
      <div className="absolute top-0 right-0 w-[1px] h-4 bg-current" />
      {/* Bottom Left */}
      <div className="absolute bottom-0 left-0 w-4 h-[1px] bg-current" />
      <div className="absolute bottom-0 left-0 w-[1px] h-4 bg-current" />
      {/* Bottom Right */}
      <div className="absolute bottom-0 right-0 w-4 h-[1px] bg-current" />
      <div className="absolute bottom-0 right-0 w-[1px] h-4 bg-current" />
    </div>
  );
}

export function ArchitecturalGuides({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none opacity-[0.15] z-0 ${className}`}>
      {/* Vertical Guide 1 */}
      <div className="absolute top-0 bottom-0 left-[15%] w-[1px] bg-[#350709]" />
      {/* Vertical Guide 2 */}
      <div className="absolute top-0 bottom-0 right-[25%] w-[1px] bg-[#350709]" />
      {/* Horizontal Guide 1 */}
      <div className="absolute left-0 right-0 top-[20%] h-[1px] bg-[#350709]" />
      {/* Horizontal Guide 2 */}
      <div className="absolute left-0 right-0 bottom-[30%] h-[1px] bg-[#350709]" />
      
      {/* Intersection Crosshairs */}
      <div className="absolute top-[20%] left-[15%] w-8 h-8 -translate-x-1/2 -translate-y-1/2 border border-[#350709] rounded-full opacity-50" />
      <div className="absolute bottom-[30%] right-[25%] w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-[#350709] rounded-full opacity-30" />
    </div>
  );
}

export function RestaurantSeal({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none opacity-40 mix-blend-multiply ${className}`}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="58" stroke="#8a6b1c" strokeWidth="1" strokeDasharray="4 2" />
        <circle cx="60" cy="60" r="45" stroke="#8a6b1c" strokeWidth="0.5" />
        <path id="curve" d="M 15 60 A 45 45 0 1 1 105 60 A 45 45 0 1 1 15 60" fill="transparent" />
        <text className="font-mono text-[8px] uppercase tracking-[0.3em]" fill="#8a6b1c">
          <textPath href="#curve" startOffset="10%">
            Maurya Veg Family Restaurant •
          </textPath>
        </text>
        <text x="60" y="55" className="font-heading text-[10px] uppercase tracking-widest" fill="#8a6b1c" textAnchor="middle">ESTD</text>
        <text x="60" y="70" className="font-heading text-[14px] uppercase tracking-widest" fill="#8a6b1c" textAnchor="middle">1998</text>
      </svg>
    </div>
  );
}

export function PressedFlower({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none opacity-60 mix-blend-multiply ${className}`}>
      <svg width="80" height="160" viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 160 Q45 100 35 40" stroke="#5c4712" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M40 120 Q55 110 50 90" stroke="#5c4712" strokeWidth="1" fill="none" />
        <path d="M38 100 Q20 90 25 70" stroke="#5c4712" strokeWidth="1" fill="none" />
        {/* Abstract petals */}
        <circle cx="35" cy="40" r="4" fill="#8a6b1c" opacity="0.8" />
        <circle cx="30" cy="35" r="3" fill="#8a6b1c" opacity="0.6" />
        <circle cx="40" cy="36" r="3.5" fill="#8a6b1c" opacity="0.7" />
        <circle cx="34" cy="30" r="2.5" fill="#8a6b1c" opacity="0.5" />
        <circle cx="50" cy="90" r="2" fill="#8a6b1c" opacity="0.6" />
        <circle cx="25" cy="70" r="2.5" fill="#8a6b1c" opacity="0.7" />
      </svg>
    </div>
  );
}

export function BrassRule({ className = "", vertical = false }: { className?: string, vertical?: boolean }) {
  if (vertical) {
    return <div className={`w-[1px] h-full bg-[#8a6b1c] opacity-30 ${className}`} />;
  }
  return <div className={`w-full h-[1px] bg-[#8a6b1c] opacity-30 ${className}`} />;
}

export function MarginNote({ text, className = "", rotate = "-2deg" }: { text: string, className?: string, rotate?: string }) {
  return (
    <div 
      className={`absolute font-mono text-[9px] uppercase tracking-[0.2em] opacity-60 whitespace-nowrap ${className}`}
      style={{ transform: `rotate(${rotate})` }}
    >
      {text}
    </div>
  );
}

export function FloatingHandwriting({ text, className = "", rotate = "-2deg" }: { text: string, className?: string, rotate?: string }) {
  return (
    <div 
      className={`absolute font-heading italic text-[16px] text-[#350709] opacity-70 whitespace-nowrap ${className}`}
      style={{ transform: `rotate(${rotate})` }}
    >
      {text}
    </div>
  );
}

export function HandwrittenUnderline({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={`absolute left-0 bottom-[-4px] w-full h-[12px] opacity-60 overflow-visible ${className}`} 
      viewBox="0 0 100 10" 
      preserveAspectRatio="none"
    >
      <path 
        d="M2,8 Q25,2 50,6 T98,4" 
        fill="none" 
        stroke="#8a6b1c" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
    </svg>
  );
}

/* 
  Physical Attachments 
*/

export function WashiTape({ className = "", color = "cream" }: { className?: string, color?: "cream" | "red" }) {
  const bgClass = color === "red" ? "bg-[#8f1115]/30 pattern-dots" : "bg-[#f3e8d4]/70";
  return (
    <div className={`absolute w-12 h-5 ${bgClass} backdrop-blur-[2px] shadow-sm border border-white/20 ${className}`} />
  );
}

export function BrassPin({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute w-3 h-3 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8a6b1c] shadow-[1px_2px_4px_rgba(0,0,0,0.3)] border border-[#5c4712]/30 ${className}`}>
      {/* Pin Highlight */}
      <div className="absolute top-[2px] left-[2px] w-1 h-1 bg-white/40 rounded-full" />
    </div>
  );
}

export function PaperClip({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute w-4 h-12 border-[2.5px] border-[#8a6b1c] rounded-full shadow-[2px_2px_3px_rgba(0,0,0,0.15)] ${className}`}>
      <div className="absolute top-1 right-[2px] w-2 h-8 border-[2px] border-[#8a6b1c] border-r-0 rounded-l-full opacity-60" />
    </div>
  );
}
