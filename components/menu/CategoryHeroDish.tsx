"use client";

import React from "react";
import { MenuItem } from "../../stores/table-store";
import { Star, Plus, Check } from "lucide-react";
import ButtonPrimary from "../ui/ButtonPrimary";
import PureVegBadge from "../ui/PureVegBadge";

interface CategoryHeroDishProps {
  item: MenuItem;
  onAdd: (item: MenuItem, e?: React.MouseEvent) => void;
  quantity: number;
}

export default function CategoryHeroDish({ item, onAdd, quantity }: CategoryHeroDishProps) {
  return (
    <div className="relative w-full my-12 bg-[#350709] text-[#F8F6F1] border border-[#B98532]/40 rounded-none overflow-hidden p-8 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
      {/* Background Subtle Gradient & Grain */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#350709] via-[#250406] to-[#0B0908] opacity-95 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        
        {/* Left Dish Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-[#B98532] text-[#350709] font-mono text-[9px] font-bold uppercase tracking-[0.25em]">
              CHEF'S RECOMMENDATION
            </span>
            <PureVegBadge showText={false} />
            <div className="flex items-center gap-1 text-[#B98532]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#B98532] stroke-none" />
              ))}
            </div>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F8F6F1] leading-[0.95] tracking-tight">
            {item.name}
          </h2>

          <p className="font-serif italic text-lg md:text-xl text-[#B98532] font-normal">
            Smoky · Charred · Hand-Crafted
          </p>

          <p className="font-sans text-sm md:text-base text-[#F8F6F1]/80 leading-relaxed max-w-xl">
            {item.description}
          </p>

          <div className="pt-4 flex items-center gap-6">
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#B98532]">
                PRICE
              </span>
              <span className="font-mono text-2xl md:text-3xl font-bold text-[#F8F6F1]">
                ₹{item.price}
              </span>
            </div>

            <ButtonPrimary
              onClick={() => onAdd(item)}
              className="bg-[#B98532] text-[#350709] hover:bg-[#D4A373]"
            >
              {quantity > 0 ? (
                <span className="inline-flex items-center gap-2">
                  <Check className="w-4 h-4" /> ADDED TO TABLE ({quantity})
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <Plus className="w-4 h-4" /> ADD TO TABLE
                </span>
              )}
            </ButtonPrimary>
          </div>
        </div>

        {/* Right Hero Image Showcase */}
        <div className="lg:col-span-5 relative">
          <div className="relative w-full aspect-[4/3] md:aspect-square bg-[#0B0908] border border-[#B98532]/30 overflow-hidden rotate-[1deg] hover:rotate-0 transition-transform duration-500 shadow-2xl">
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 hover:scale-105 transition-all duration-700"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#350709] to-[#0B0908]">
                <span className="font-serif italic text-5xl text-[#B98532] font-bold mb-2">
                  {item.name[0]}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#B98532]">
                  MAURYA SIGNATURE
                </span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
