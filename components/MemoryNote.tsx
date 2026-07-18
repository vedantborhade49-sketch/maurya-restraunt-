"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface MemoryNoteProps {
  text: string;
  meta: string;
  time: string;
  rotate: number;
  top: string;
  left?: string;
  right?: string;
  type?: "tape" | "pin" | "stain" | "clean";
  className?: string;
  delay?: number;
  zIndex?: number;
}

export function MemoryNote({ 
  text, 
  meta, 
  time, 
  rotate, 
  top, 
  left, 
  right, 
  type = "clean",
  className = "",
  delay = 0,
  zIndex = 10
}: MemoryNoteProps) {
  const noteRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Ambient floating animation
    const floatAnim = gsap.to(containerRef.current, {
      y: "+=6",
      rotation: rotate + (Math.random() > 0.5 ? 1 : -1), // Slight sway
      duration: 3 + Math.random() * 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: delay,
    });

    return () => {
      floatAnim.kill();
    };
  }, [rotate, delay]);

  const handleMouseEnter = () => {
    if (!noteRef.current) return;
    gsap.to(noteRef.current, {
      scale: 1.05,
      rotation: 0, // Correct rotation on hover
      boxShadow: "0 15px 30px -5px rgba(0,0,0,0.15), 0 8px 10px -5px rgba(0,0,0,0.05)",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!noteRef.current) return;
    gsap.to(noteRef.current, {
      scale: 1,
      rotation: rotate, // Return to original rotation
      boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div 
      ref={containerRef}
      className={`absolute memory-note-wrapper ${className}`}
      style={{ top, left, right, transform: `rotate(${rotate}deg)`, zIndex }}
    >
      <div 
        ref={noteRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative bg-[#f9f6f0] p-6 w-[240px] md:w-[280px] shadow-[0_4px_15px_rgba(0,0,0,0.05)] cursor-pointer transition-colors duration-300 texture-ch3-paper border border-[#e5dbcc]/50"
      >
        {/* Physical Artifacts */}
        {type === "tape" && (
          <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-6 bg-[#e5dbcc]/40 rotate-[-2deg] backdrop-blur-sm" />
        )}
        
        {type === "pin" && (
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8a6b1c] shadow-sm border border-[#5c4712]/20" />
        )}

        {type === "stain" && (
          <div className="absolute bottom-[-10px] right-[-10px] w-16 h-16 rounded-full border border-[#8f1115]/10 opacity-30 transform rotate-12 scale-x-110" />
        )}

        {/* Folded Corner (CSS Trick) */}
        <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[12px] border-l-[12px] border-b-[#f3e8d4] border-l-transparent shadow-[-2px_-2px_3px_rgba(0,0,0,0.05)]" />

        <div className="relative z-10 flex flex-col h-full pointer-events-none">
          <span className="text-[#b98532] text-[10px] tracking-[0.4em] mb-3">★★★★★</span>
          
          <p className="font-heading italic text-lg md:text-xl text-[#350709] leading-snug mb-6 flex-grow">
            "{text}"
          </p>
          
          <div className="flex flex-col mt-auto pt-4 border-t border-[#350709]/10">
            <span className="font-sans text-[11px] font-medium text-[#0b0908]/80 mb-1">
              {meta}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#0b0908]/40">
              Google Review • {time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
