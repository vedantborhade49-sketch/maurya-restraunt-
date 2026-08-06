"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Chapter01Opening from "@/sections/OurStory/Chapter01Opening";
import Chapter02LivingTable from "@/sections/OurStory/Chapter02LivingTable";
import Chapter03FarmToPlate from "@/sections/OurStory/Chapter03FarmToPlate";
import Chapter04PromiseManifesto from "@/sections/OurStory/Chapter04PromiseManifesto";
import Chapter05KitchenCare from "@/sections/OurStory/Chapter05KitchenCare";
import Chapter06MemoryWall from "@/sections/OurStory/Chapter06MemoryWall";
import Chapter07ClosingQuote from "@/sections/OurStory/Chapter07ClosingQuote";

export default function OurStoryClient() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <main className="relative w-full bg-[#F8F6F1] text-[#350709] selection:bg-[#350709] selection:text-[#F8F6F1]">
      <Chapter01Opening />
      <Chapter02LivingTable />
      <Chapter03FarmToPlate />
      <Chapter04PromiseManifesto />
      <Chapter05KitchenCare />
      <Chapter06MemoryWall />
      <Chapter07ClosingQuote />
    </main>
  );
}
