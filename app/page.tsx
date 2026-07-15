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
import OurStory from "@/sections/OurStory/OurStory";
import Footer from "@/components/brand/Footer";

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

        {/* Section 07: Our Story */}
        <OurStory />

        {/* Section 08: Remastered Footer */}
        <Footer />
      </main>
    </>
  );
}
