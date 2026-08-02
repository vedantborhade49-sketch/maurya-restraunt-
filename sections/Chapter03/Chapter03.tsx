"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { MarginNote } from "@/components/MicroArtifacts";

export default function Chapter03() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#EFE8DB] text-[#272322] py-12 md:py-24 overflow-hidden flex flex-col justify-center select-none"
    >
      {/* Background Texture - Warm Paper Grain */}
      <div className="absolute inset-0 z-0 opacity-40 texture-ch3-paper pointer-events-none mix-blend-multiply" />

      <div className="relative w-full flex flex-col items-center gap-6 md:gap-12 container-maurya z-10 my-auto">
        
        {/* Layer 1: Editorial Typography */}
        <div className="content-grid w-full text-center max-w-[900px] mx-auto">
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#9A5C3B] font-bold mb-2.5 block">
            02 &nbsp;·&nbsp; THE CRAFT & THE TABLE
          </span>
          <h2 className="font-heading text-3xl sm:text-[60px] md:text-[76px] text-[#272322] leading-[0.98] tracking-tight">
            Freshly Crafted.<br/>
            <span className="italic text-[#9A5C3B]">Lovingly Served.</span>
          </h2>
        </div>

        {/* Layer 2: White Background Smooth Video Canvas Container (maurya2.mp4) with Motion Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          whileTap={{ scale: 0.98 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full max-w-[900px] mx-auto z-10"
        >
          
          <div className="overflow-hidden bg-white relative shadow-[0_20px_60px_rgba(0,0,0,0.08)] rounded-2xl w-full aspect-video md:aspect-auto md:h-[65vh] border border-[#9A5C3B]/20 transform-gpu flex flex-col items-center justify-center p-1.5 sm:p-4 group">
            
            {/* Top Subtle Metallic Shimmer Bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#9A5C3B]/40 to-transparent z-40" />

            {/* Seamless White Video Element */}
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-white flex items-center justify-center">
              <video
                ref={videoRef}
                src="/logo3.mp4"
                playsInline
                autoPlay
                loop
                muted
                preload="auto"
                className="w-full h-full object-cover sm:object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />

              {/* Light Vignette Soft Blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/20 pointer-events-none" />
            </div>



            {/* Minimal Editorial Corner Note */}
            <MarginNote
              text="The Living Craft"
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-[#272322]/70 z-30 font-mono text-[8px] sm:text-[9px]"
              rotate="0deg"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
