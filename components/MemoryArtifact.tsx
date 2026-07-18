"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { WashiTape, BrassPin, PaperClip, PressedFlower, HandwrittenUnderline } from "@/components/MicroArtifacts";

export type ArtifactVariant = "torn-notebook" | "sticky" | "polaroid" | "receipt" | "aged-paper" | "lined-scrap";

interface MemoryArtifactProps {
  variant: ArtifactVariant;
  text: string;
  meta?: string;
  time?: string;
  image?: string;
  rotate: number;
  top: string;
  left?: string;
  right?: string;
  bottom?: string;
  className?: string;
  delay?: number;
  zIndex?: number;
}

export function MemoryArtifact({ 
  variant,
  text, 
  meta, 
  time,
  image,
  rotate, 
  top, 
  left, 
  right, 
  bottom,
  className = "",
  delay = 0,
  zIndex = 10
}: MemoryArtifactProps) {
  const artifactRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Ambient floating animation (very slow)
    const floatAnim = gsap.to(containerRef.current, {
      y: "+=4",
      rotation: rotate + (Math.random() > 0.5 ? 0.5 : -0.5),
      duration: 4 + Math.random() * 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: delay,
    });

    return () => floatAnim.kill();
  }, [rotate, delay]);

  const handleMouseEnter = () => {
    if (!artifactRef.current) return;
    gsap.to(artifactRef.current, {
      scale: 1.03,
      boxShadow: "0 25px 40px -10px rgba(0,0,0,0.15), 0 10px 20px -5px rgba(0,0,0,0.05)",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!artifactRef.current) return;
    gsap.to(artifactRef.current, {
      scale: 1,
      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04)",
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const renderContent = () => {
    switch (variant) {
      
      // 1. Torn Notebook (Top Left)
      case "torn-notebook":
        return (
          <div 
            ref={artifactRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-[280px] md:w-[340px] bg-[#fdfbf7] p-8 shadow-xl cursor-pointer transition-transform texture-ch3-paper"
            style={{ 
              // Realistic jagged edge on top and right
              clipPath: "polygon(2% 2%, 10% 0%, 20% 3%, 30% 0%, 40% 2%, 50% 0%, 60% 3%, 70% 1%, 80% 2%, 90% 0%, 98% 3%, 100% 10%, 98% 20%, 100% 30%, 97% 40%, 100% 50%, 98% 60%, 100% 70%, 99% 80%, 100% 90%, 98% 100%, 0% 100%, 0% 0%)",
              backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #a0c4ff 31px, #a0c4ff 32px)",
              backgroundPosition: "0 1.5rem"
            }}
          >
            <BrassPin className="top-4 left-6" />
            
            {/* Coffee Stain */}
            <div className="absolute bottom-[-10px] right-[-10px] w-24 h-24 rounded-full border-[3px] border-[#6b4c2a]/15 opacity-50 transform rotate-12 scale-x-110 pointer-events-none" />
            
            <div className="absolute top-0 bottom-0 left-[35px] w-[1px] bg-[#ffadad] opacity-60 pointer-events-none" />
            
            <div className="relative z-10 pl-6 mt-8">
              <span className="text-[#b98532] text-[10px] tracking-[0.4em] mb-2 block">★★★★★</span>
              <p className="font-heading italic text-xl md:text-2xl text-[#2b2a27] leading-[32px]">
                {text}
              </p>
              
              <div className="mt-6 flex flex-col">
                <span className="font-sans text-[11px] text-[#2b2a27]/70">— {meta}</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#2b2a27]/40 mt-2">
                  {time}
                </span>
              </div>
            </div>
          </div>
        );

      // 2. Polaroid
      case "polaroid":
        return (
          <div 
            ref={artifactRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-[220px] md:w-[260px] bg-[#fbfbfb] p-4 pb-12 md:pb-16 shadow-[0_15px_30px_rgba(0,0,0,0.12)] cursor-pointer"
          >
            <WashiTape className="top-[-10px] left-1/2 -translate-x-1/2 rotate-[-2deg]" />
            
            <div className="w-full aspect-[4/5] md:aspect-square bg-[#0b0908] overflow-hidden border border-black/5">
              {image && (
                <img src={image} alt="Memory" className="w-full h-full object-cover grayscale-[10%] contrast-110 sepia-[10%]" />
              )}
            </div>
            
            <div className="absolute bottom-4 md:bottom-6 left-0 w-full text-center flex flex-col items-center px-4">
              <p className="font-heading text-lg md:text-2xl text-[#1a1715] transform -rotate-3 opacity-90 leading-tight">
                {text}
              </p>
              <HandwrittenUnderline className="w-12 md:w-16 bottom-[-2px] left-1/2 -translate-x-1/2 text-[#1a1715]/40 opacity-40" />
            </div>
            <span className="absolute bottom-2 md:bottom-3 right-4 font-mono text-[10px] md:text-[14px] opacity-40">♡</span>
          </div>
        );

      // 3. Receipt (Bottom Mid-Left)
      case "receipt":
        return (
          <div 
            ref={artifactRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-[220px] bg-[#fdfdfd] p-6 shadow-lg cursor-pointer border-l border-r border-black/5"
            style={{
              clipPath: "polygon(0% 0%, 5% 2%, 10% 0%, 15% 2%, 20% 0%, 25% 2%, 30% 0%, 35% 2%, 40% 0%, 45% 2%, 50% 0%, 55% 2%, 60% 0%, 65% 2%, 70% 0%, 75% 2%, 80% 0%, 85% 2%, 90% 0%, 95% 2%, 100% 0%, 100% 100%, 95% 98%, 90% 100%, 85% 98%, 80% 100%, 75% 98%, 70% 100%, 65% 98%, 60% 100%, 55% 98%, 50% 100%, 45% 98%, 40% 100%, 35% 98%, 30% 100%, 25% 98%, 20% 100%, 15% 98%, 10% 100%, 5% 98%, 0% 100%)"
            }}
          >
            <PaperClip className="top-[-10px] left-4" />
            
            <div className="flex flex-col items-start border-b border-dashed border-black/20 pb-4 mb-4 mt-4">
              <span className="font-mono text-[14px] font-bold text-black uppercase mb-2">Table 08</span>
              <span className="font-mono text-[9px] text-black/60 uppercase">Family Dinner</span>
              <span className="font-mono text-[9px] text-black/60 uppercase mt-1">Party of 12</span>
            </div>
            
            <div className="flex flex-col gap-2 mb-6 border-b border-dashed border-black/20 pb-4">
              <div className="flex justify-between w-full font-mono text-[9px] text-black/80">
                <span>Maurya Veg Family Restaurant</span>
              </div>
              <div className="flex justify-between w-full font-mono text-[8px] text-black/50">
                <span>Kondhwa, Pune</span>
              </div>
            </div>

            <div className="flex justify-between w-full font-mono text-[10px] text-black mb-1">
              <span>Sunday Lunch</span>
              <span>{time}</span>
            </div>
            <div className="flex justify-between w-full font-mono text-[10px] font-bold text-black mb-8">
              <span>Total</span>
              <span>₹3,240</span>
            </div>

            <div className="relative text-center mt-4">
              <p className="relative z-10 font-heading italic text-[18px] leading-tight text-[#1a1715] transform -rotate-3">
                Great food, great<br/>memories!
              </p>
              <span className="absolute bottom-[-10px] right-2 font-mono text-[12px] opacity-40">♡</span>
            </div>
          </div>
        );

      // 4. Aged Paper (Bottom Mid)
      case "aged-paper":
        return (
          <div 
            ref={artifactRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-[260px] md:w-[300px] bg-[#ebd8b7] p-8 shadow-md cursor-pointer texture-ch2"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 98%, 90% 100%, 80% 97%, 70% 100%, 60% 98%, 50% 100%, 40% 97%, 30% 100%, 20% 98%, 10% 100%, 0% 98%)"
            }}
          >
            <WashiTape color="red" className="top-[-8px] left-1/2 -translate-x-1/2 rotate-[2deg]" />
            <PressedFlower className="bottom-2 right-[-10px] opacity-30 transform scale-75" />
            
            <div className="relative z-10">
              <span className="text-[#8a6b1c] text-[10px] tracking-[0.4em] mb-4 block">★★★★★</span>
              <p className="font-sans text-[15px] text-[#350709] leading-[1.6]">
                {text}
              </p>
              
              <div className="mt-8 flex flex-col">
                <span className="font-sans text-[11px] text-[#350709]/70">— {meta}</span>
                <span className="font-heading italic text-[14px] text-[#b98532] mt-2">Anniversary Dinner</span>
                <span className="font-mono text-[8px] uppercase tracking-widest text-[#350709]/40 mt-2">
                  Google Review • {time}
                </span>
              </div>
            </div>
          </div>
        );

      // 5. Lined Scrap (Bottom Right)
      case "lined-scrap":
        return (
          <div 
            ref={artifactRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-[240px] bg-[#f9f6f0] p-6 shadow-lg cursor-pointer texture-ch3-paper"
            style={{ 
              clipPath: "polygon(2% 0%, 98% 2%, 100% 98%, 95% 100%, 90% 97%, 85% 100%, 80% 98%, 75% 100%, 70% 97%, 65% 100%, 60% 98%, 55% 100%, 50% 97%, 45% 100%, 40% 98%, 35% 100%, 30% 97%, 25% 100%, 20% 98%, 15% 100%, 10% 97%, 5% 100%, 0% 98%, 0% 5%)",
              backgroundImage: "repeating-linear-gradient(transparent, transparent 19px, #d1d5db 19px, #d1d5db 20px)",
              backgroundPosition: "0 1rem"
            }}
          >
            <BrassPin className="top-3 left-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 mt-4">
              <span className="text-[#b98532] text-[10px] tracking-[0.4em] mb-3 block">★★★★★</span>
              <p className="font-sans text-[14px] text-[#2b2a27] leading-[20px]">
                {text}
              </p>
              
              <div className="mt-6 flex flex-col">
                <span className="font-sans text-[11px] text-[#2b2a27]/70">— {meta}</span>
                <span className="font-heading italic text-[14px] text-[#b98532] mt-1">Sunday Lunch</span>
                <span className="font-mono text-[8px] uppercase tracking-widest text-[#2b2a27]/40 mt-2">
                  {time}
                </span>
              </div>
            </div>
          </div>
        );

      // 6. Sticky Note (Top Right)
      case "sticky":
        return (
          <div 
            ref={artifactRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-[220px] h-[230px] bg-[#f3e3b3] p-5 shadow-md cursor-pointer texture-ch2 flex flex-col justify-between"
          >
            <WashiTape className="top-[-10px] right-4 rotate-[15deg]" />
            
            {/* Folded Corner */}
            <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[20px] border-l-[20px] border-b-[#f3e8d4] border-l-transparent shadow-[-2px_-2px_4px_rgba(0,0,0,0.1)]" />

            <div className="relative z-10">
              <span className="text-[#b98532] text-[10px] tracking-[0.4em] mb-3 block">★★★★★</span>
              <p className="font-sans text-[13px] text-[#350709] leading-relaxed">
                {text}
              </p>
            </div>
            
            <div className="flex flex-col relative z-10">
              <span className="font-sans text-[10px] text-[#350709]/70">— {meta}</span>
              <span className="font-heading italic text-[13px] text-[#b98532] mt-1">Family Dinner</span>
              <span className="font-mono text-[8px] uppercase tracking-widest text-[#350709]/50 mt-2">
                {time}
              </span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`absolute memory-artifact-wrapper ${className}`}
      style={{ top, bottom, left, right, transform: `rotate(${rotate}deg)`, zIndex }}
    >
      {renderContent()}
    </div>
  );
}
