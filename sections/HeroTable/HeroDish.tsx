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
  // Parallax translation offset: 3-6px max
  const px = mouseX * dish.depth * 6;
  const py = mouseY * dish.depth * 6;

  return (
    <div
      id={dish.id}
      className="absolute select-none pointer-events-none will-change-transform z-10"
      style={{
        top: dish.top,
        left: dish.left,
        right: dish.right,
        bottom: dish.bottom,
        transform: `translate3d(${px}px, ${py}px, 0)`,
        transition: "transform 1.2s cubic-bezier(0.1, 0.8, 0.2, 1)", // heavy spring feel
      }}
    >
      <div 
        className="relative overflow-hidden rounded-full shadow-[0_25px_60px_rgba(0,0,0,0.7)] border-[6px] border-[#F3E8D4]/10 bg-[#350709]"
        style={{
          width: `${180 * dish.scale}px`,
          height: `${180 * dish.scale}px`,
          transform: `rotate(${dish.rotation}deg)`,
        }}
      >
        <Image
          src={dish.asset}
          alt="Maurya Dish"
          fill
          sizes="200px"
          priority
          className="object-cover scale-110"
        />
      </div>
    </div>
  );
}
