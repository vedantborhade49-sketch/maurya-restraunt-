"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Chapter07Arrival from "@/sections/Chapter07Arrival/Chapter07Arrival";
import Scene2Chef from "@/sections/Chapter07Arrival/Scene2Chef";
import Scene3Ambience from "@/sections/Chapter07Arrival/Scene3Ambience";
import Scene4Testimonials from "@/sections/Chapter07Arrival/Scene4Testimonials";
import Scene5Location from "@/sections/Chapter07Arrival/Scene5Location";
import DesktopReservationSection from "@/sections/VisitNew/DesktopReservationSection";
import MobileVisit from "@/sections/MobileV2/MobileVisit";

export default function VisitClient() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <main className="relative w-full bg-[#292421] text-[#FDFBF7] overflow-hidden">
      {/* Mobile Visit Experience */}
      <div className="md:hidden w-full">
        <MobileVisit />
      </div>

      {/* Desktop Cinematic GSAP Experience */}
      <div className="hidden md:block">
        <Chapter07Arrival />
        <Scene2Chef />
        <Scene3Ambience />
        <Scene4Testimonials />
        <Scene5Location />
        <DesktopReservationSection />
      </div>
    </main>
  );
}
