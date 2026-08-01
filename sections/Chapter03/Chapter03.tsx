"use client";

import { useRef } from "react";
import { MarginNote } from "@/components/MicroArtifacts";

export default function Chapter03() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#EFE8DB] text-[#272322] py-16 md:py-24 overflow-hidden flex flex-col justify-center select-none"
    >
      {/* Background Texture - Warm Paper Grain */}
      <div className="absolute inset-0 z-0 opacity-40 texture-ch3-paper pointer-events-none mix-blend-multiply" />

      <div className="relative w-full flex flex-col items-center gap-8 md:gap-12 container-maurya z-10 my-auto">
        
        {/* Layer 1: Editorial Typography (Preserved 100% identically) */}
        <div className="content-grid w-full text-center max-w-[900px] mx-auto">
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#9A5C3B] font-bold mb-3 block">
            02 &nbsp;·&nbsp; THE CRAFT & THE TABLE
          </span>
          <h2 className="font-heading text-[40px] sm:text-[60px] md:text-[76px] text-[#272322] leading-[0.98] tracking-tight">
            Fresh Every Morning.<br/>
            <span className="italic text-[#9A5C3B]">Served Every Evening.</span>
          </h2>
        </div>

        {/* Layer 2: White Background Smooth Video Canvas Container (maurya2.mp4) */}
        <div className="relative w-full max-w-[900px] mx-auto z-10">
          
          <div className="overflow-hidden bg-white relative shadow-[0_20px_60px_rgba(0,0,0,0.08)] rounded-2xl w-full h-[48vh] md:h-[65vh] border border-[#9A5C3B]/20 transform-gpu flex flex-col items-center justify-center p-2 sm:p-4 group">
            
            {/* Top Subtle Metallic Shimmer Bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#9A5C3B]/40 to-transparent z-40" />

            {/* Seamless White Video Element */}
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-white flex items-center justify-center">
              <video
                ref={videoRef}
                src="/maurya2.mp4"
                playsInline
                autoPlay
                loop
                muted
                preload="auto"
                className="w-full h-full object-contain md:object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />

              {/* Light Vignette Soft Blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/20 pointer-events-none" />
            </div>

            {/* Floating Top Badge Pill */}
            <div className="absolute top-6 left-6 z-30 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest text-[#8F1115] border border-[#9A5C3B]/30 uppercase font-extrabold shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#164C2B] animate-pulse" />
              <span>MAURYA CULINARY FILM</span>
            </div>

            {/* Minimal Editorial Corner Note */}
            <MarginNote
              text="The Living Craft"
              className="absolute bottom-6 right-6 text-[#272322]/70 z-30 font-mono text-[9px]"
              rotate="0deg"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
