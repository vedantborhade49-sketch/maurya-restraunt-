"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DiningMemories from "@/components/reviews/DiningMemories";

export default function ReviewsPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <main className="w-full bg-[#F8F6F1] text-[#350709] selection:bg-[#350709] selection:text-[#F8F6F1] overflow-x-hidden">
      <DiningMemories />
    </main>
  );
}
