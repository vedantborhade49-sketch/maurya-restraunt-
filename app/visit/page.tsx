"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Chapter01Invitation from "@/sections/VisitNew/Chapter01Invitation";
import Chapter02Arrival from "@/sections/VisitNew/Chapter02Arrival";
import Chapter03Journey from "@/sections/VisitNew/Chapter03Journey";
import Chapter04Space from "@/sections/VisitNew/Chapter04Space";
import Chapter05Experience from "@/sections/VisitNew/Chapter05Experience";
import Chapter06Reservation from "@/sections/VisitNew/Chapter06Reservation";
import Chapter07Contact from "@/sections/VisitNew/Chapter07Contact";
import Chapter08FinalScene from "@/sections/VisitNew/Chapter08FinalScene";

export default function VisitPage() {
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

      <Chapter01Invitation />
      <Chapter02Arrival />
      <Chapter03Journey />
      <Chapter04Space />
      <Chapter05Experience />
      <Chapter06Reservation />
      <Chapter07Contact />
      <Chapter08FinalScene />
    </main>
  );
}
