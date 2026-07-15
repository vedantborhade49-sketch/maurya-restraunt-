"use client";

import React, { useEffect, useState } from "react";

const SECTIONS = [
  { id: "intro", label: "INTRO", num: "01" },
  { id: "hero-table", label: "TABLE", num: "02" },
  { id: "kitchen", label: "KITCHEN", num: "03" },
  { id: "food-story", label: "FAVOURITE", num: "04" },
  { id: "pure-veg", label: "PURE", num: "05" },
  { id: "gathering", label: "GATHER", num: "06" },
  { id: "visit", label: "VISIT", num: "07" },
];

export default function SectionIndex() {
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initially
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-8 font-sans text-[9px] tracking-[0.25em] select-none">
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <div 
            key={sec.id} 
            className="flex items-center gap-4 transition-all duration-300 cursor-pointer h-5 group"
            onClick={() => {
              const el = document.getElementById(sec.id);
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span className={`font-mono transition-colors duration-300 ${isActive ? "text-gold font-bold" : "text-soft-ivory/40 group-hover:text-soft-ivory/70"}`}>
              {sec.num}
            </span>
            
            {isActive ? (
              <span className="flex items-center gap-2 text-gold font-bold transition-all duration-300 animate-[fadeIn_0.3s_ease-out]">
                <span className="w-10 h-[1px] bg-gold block" />
                {sec.label}
              </span>
            ) : (
              <span className="opacity-0 group-hover:opacity-40 transition-opacity duration-300 text-soft-ivory">
                {sec.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
