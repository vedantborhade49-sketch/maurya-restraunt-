"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import IntroTransition from "@/sections/GalleryNew/IntroTransition";
import Chapter01Morning from "@/sections/GalleryNew/Chapter01Morning";
import Chapter02Asymmetrical from "@/sections/GalleryNew/Chapter02Asymmetrical";
import Chapter03Spotlight from "@/sections/GalleryNew/Chapter03Spotlight";
import Chapter04Collage from "@/sections/GalleryNew/Chapter04Collage";
import Chapter05Sequence from "@/sections/GalleryNew/Chapter05Sequence";
import Chapter06Panorama from "@/sections/GalleryNew/Chapter06Panorama";
import Chapter07Break from "@/sections/GalleryNew/Chapter07Break";
import Chapter08Wall from "@/sections/GalleryNew/Chapter08Wall";
import Chapter09Ending from "@/sections/GalleryNew/Chapter09Ending";

export default function GalleryPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Refresh ScrollTrigger after a slight delay
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <main className="relative w-full bg-[#F6F1E8] text-[#1F1F1F] selection:bg-[#3A0F16] selection:text-[#F6F1E8] overflow-hidden">
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

      <IntroTransition />
      <Chapter01Morning />
      <Chapter02Asymmetrical />
      <Chapter03Spotlight />
      <Chapter04Collage />
      <Chapter05Sequence />
      <Chapter06Panorama />
      <Chapter07Break />
      <Chapter08Wall />
      <Chapter09Ending />
    </main>
  );
}
