"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Chapter01Opening from "@/sections/OurStory/Chapter01Opening";
import Chapter02Beginning from "@/sections/OurStory/Chapter02Beginning";
import Chapter03Founder from "@/sections/OurStory/Chapter03Founder";
import Chapter04Kitchen from "@/sections/OurStory/Chapter04Kitchen";
import Chapter05TheTable from "@/sections/OurStory/Chapter05TheTable";
import Chapter06Archive from "@/sections/OurStory/Chapter06Archive";
import Chapter07Today from "@/sections/OurStory/Chapter07Today";
import Chapter08Invitation from "@/sections/OurStory/Chapter08Invitation";

export default function OurStoryPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Refresh ScrollTrigger after a slight delay to ensure all images and fonts are loaded
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <main className="relative w-full bg-[#F6F1E8] text-[#1F1F1F] selection:bg-[#3A0F16] selection:text-[#F6F1E8]">
      {/* SVG Paper Texture applied globally via mix-blend */}
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

      <Chapter01Opening />
      <Chapter02Beginning />
      <Chapter03Founder />
      <Chapter04Kitchen />
      <Chapter05TheTable />
      <Chapter06Archive />
      <Chapter07Today />
      <Chapter08Invitation />
    </main>
  );
}
