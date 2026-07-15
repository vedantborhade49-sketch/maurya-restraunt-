"use client";

import { useState } from "react";
import BrandIntro from "@/components/brand/BrandIntro";
import BrandGrain from "@/components/brand/BrandGrain";

import HeroTable from "@/sections/HeroTable/HeroTable";
import ChapterTransition from "@/components/ChapterTransition";
import Chapter02 from "@/sections/Chapter02/Chapter02";
import Chapter03 from "@/sections/Chapter03/Chapter03";
import FoodStory from "@/sections/FoodStory/FoodStory";
import PureVegBreak from "@/sections/PureVeg/PureVegBreak";
import TheGathering from "@/sections/Gathering/TheGathering";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {/* Cinematic Preloader */}
      <BrandIntro onComplete={() => setIntroDone(true)} />

      {/* Global Tactile Paper Grain */}
      <BrandGrain />



      {/* Main Brand Sections */}
      <main 
        className={`relative min-h-screen transition-opacity duration-700 ${
          introDone ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Section 01 & 02: Intro & Hero Table */}
        <div id="intro" />
        <HeroTable />
        
        {/* Section 03: Kitchen (Chapter02 & Chapter03 spreads) */}
        <div id="kitchen" />
        <ChapterTransition to="ch2" height={300} fromColor="#0b0908" overlap={false} />
        <Chapter02 />
        
        <ChapterTransition to="ch3" height={400} overlap={true} />
        <Chapter03 />
        
        {/* Section 04: Signature spotlight (FoodStory) */}
        <FoodStory />
        
        {/* Section 05: Pure Veg Break slit transition */}
        <PureVegBreak />
        
        {/* Section 06: Gathering (emotional heart) */}
        <TheGathering />

        {/* Section 07: Visit / Footer stub */}
        <div id="visit" className="h-64 bg-[#0b0908] flex flex-col items-center justify-center border-t border-white/5 text-center px-6">
          <span className="font-sans text-[10px] tracking-[0.25em] text-[#B98532] font-bold uppercase mb-3">
            COME HUNGRY. LEAVE WITH A STORY.
          </span>
          <h3 className="font-heading text-xl sm:text-2xl text-[#F3E8D4]/90 mb-2">
            MAURYA PURE VEG
          </h3>
          <p className="font-sans text-[10px] text-[#F3E8D4]/40 uppercase tracking-widest">
            Kondhwa Main Road, Pune, Maharashtra 411048
          </p>
        </div>
      </main>
    </>
  );
}
