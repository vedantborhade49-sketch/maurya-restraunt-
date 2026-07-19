"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TheConstellation from "@/sections/ReviewsConstellation/TheConstellation";
import TrustEditorial from "@/sections/TrustEditorial/TrustEditorial";

export default function ReviewsPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <main className="w-full bg-[#1A050A] selection:bg-[#B98555] selection:text-[#1A050A] overflow-x-hidden">
      <TheConstellation />
      <TrustEditorial />
    </main>
  );
}
