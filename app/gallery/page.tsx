"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TheSpace from "@/sections/TheSpace/TheSpace";

export default function GalleryPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <main className="relative w-full bg-[#F8F5EF] text-[#1F1F1F] selection:bg-[#3A0F16] selection:text-[#F8F5EF] overflow-hidden">
      {/* Global grain / physical paper texture */}
      <svg className="hidden" aria-hidden="true">
        <filter id="paper-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
      </svg>
      <div
        className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03] mix-blend-multiply"
        style={{ filter: "url(#paper-texture)", backgroundColor: "#a09070" }}
      />

      <TheSpace />
    </main>
  );
}
