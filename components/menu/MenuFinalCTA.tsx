"use client";

import React from "react";
import ButtonPrimary from "../ui/ButtonPrimary";
import ButtonSecondary from "../ui/ButtonSecondary";
import BrassDivider from "../ui/BrassDivider";

interface MenuFinalCTAProps {
  onSelectOption?: (option: string) => void;
}

export default function MenuFinalCTA({ onSelectOption }: MenuFinalCTAProps) {
  return (
    <section className="relative w-full bg-[#350709] text-[#F8F6F1] py-24 px-6 md:px-12 my-16 border-t border-b border-[#B98532]/30 text-center font-sans overflow-hidden">
      {/* Background Subtle Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#350709] via-[#250406] to-[#0B0908] opacity-90 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        <BrassDivider showLogo={true} />

        <div className="space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B98532] font-bold">
            RECOMMENDATION ENGINE
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F8F6F1] leading-tight font-normal">
            LET MAURYA <span className="italic text-[#B98532]">SET THE TABLE</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-[#F8F6F1]/80 max-w-xl mx-auto leading-relaxed">
            Whether you're dining alone or celebrating together with family,
            we'll curate the perfect meal for your table.
          </p>
        </div>

        {/* 3 Interactive Dining Options */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <ButtonSecondary
            onClick={() => onSelectOption?.("one")}
            className="w-full sm:w-auto border-[#B98532] text-[#F8F6F1] hover:bg-[#B98532] hover:text-[#350709] hover:border-[#B98532]"
          >
            FOR ONE
          </ButtonSecondary>

          <ButtonSecondary
            onClick={() => onSelectOption?.("two")}
            className="w-full sm:w-auto border-[#B98532] text-[#F8F6F1] hover:bg-[#B98532] hover:text-[#350709] hover:border-[#B98532]"
          >
            FOR TWO
          </ButtonSecondary>

          <ButtonPrimary
            onClick={() => onSelectOption?.("table")}
            className="w-full sm:w-auto bg-[#B98532] text-[#350709] hover:bg-[#D4A373]"
          >
            FAMILY FEAST
          </ButtonPrimary>
        </div>

        <BrassDivider showLogo={false} className="opacity-40" />
      </div>
    </section>
  );
}
