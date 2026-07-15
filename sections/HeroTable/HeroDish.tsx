"use client";

import React from "react";
import Image from "next/image";
import { HeroDishType } from "./hero-dishes";

interface HeroDishProps {
  dish: HeroDishType;
  mouseX: number;
  mouseY: number;
}

export default function HeroDish({ dish, mouseX, mouseY }: HeroDishProps) {
  // Parallax translation offset: 3-8px max based on depth
  const px = mouseX * dish.depth * 8;
  const py = mouseY * dish.depth * 8;

  const style = {
    transform: `translate3d(${px}px, ${py}px, 0)`,
    transition: "transform 1.0s cubic-bezier(0.1, 0.8, 0.2, 1)",
    zIndex: dish.zIndex,
    
    // Responsive coordinate variables
    "--top-desktop": dish.desktop.top ?? "auto",
    "--left-desktop": dish.desktop.left ?? "auto",
    "--right-desktop": dish.desktop.right ?? "auto",
    "--bottom-desktop": dish.desktop.bottom ?? "auto",
    
    "--top-mobile": dish.mobile.top ?? "auto",
    "--left-mobile": dish.mobile.left ?? "auto",
    "--right-mobile": dish.mobile.right ?? "auto",
    "--bottom-mobile": dish.mobile.bottom ?? "auto",
    
    "--scale": dish.scale,
  } as React.CSSProperties;

  return (
    <div
      id={dish.id}
      className="absolute select-none pointer-events-none will-change-transform
                 top-[var(--top-mobile)] left-[var(--left-mobile)] right-[var(--right-mobile)] bottom-[var(--bottom-mobile)]
                 md:top-[var(--top-desktop)] md:left-[var(--left-desktop)] md:right-[var(--right-desktop)] md:bottom-[var(--bottom-desktop)]"
      style={style}
    >
      <div 
        className="relative overflow-hidden rounded-full shadow-[0_30px_70px_rgba(0,0,0,0.85)] border-[5px] border-[#F3E8D4]/10 bg-[#350709]
                   w-[calc(130px*var(--scale))] h-[calc(130px*var(--scale))]
                   md:w-[calc(240px*var(--scale))] md:h-[calc(240px*var(--scale))]"
        style={{
          transform: `rotate(${dish.rotation}deg)`,
        }}
      >
        <Image
          src={dish.asset}
          alt="Maurya Dish"
          fill
          sizes="(max-width: 768px) 200px, 400px"
          priority
          className="object-cover scale-110"
        />
      </div>
    </div>
  );
}
