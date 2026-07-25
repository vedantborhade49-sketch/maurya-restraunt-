"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Folder, FolderOpen, RotateCcw } from "lucide-react";

interface ScrapItem {
  id: string;
  type: "recipe" | "ticket" | "polaroid" | "leaf" | "stamp" | "bappa";
  title: string;
  rotation: number;
  initialX: number;
  initialY: number;
  width: string;
  height: string;
}

export default function MemoryDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [polaroidDeveloped, setPolaroidDeveloped] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);

  const handlePolaroidClick = () => {
    if (polaroidDeveloped) return;
    setShakeCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        setPolaroidDeveloped(true);
      }
      return next;
    });
  };

  const resetScrapbook = () => {
    setPolaroidDeveloped(false);
    setShakeCount(0);
  };

  const scraps: ScrapItem[] = [
    { id: "recipe", type: "recipe", title: "Secret Recipe", rotation: -8, initialX: 80, initialY: 100, width: "w-64", height: "h-80" },
    { id: "ticket", type: "ticket", title: "First Order", rotation: 5, initialX: 420, initialY: 160, width: "w-56", height: "h-48" },
    { id: "polaroid", type: "polaroid", title: "The Spices", rotation: 12, initialX: 180, initialY: 340, width: "w-60", height: "h-72" },
    { id: "leaf", type: "leaf", title: "Bay Leaf", rotation: -18, initialX: 680, initialY: 120, width: "w-24", height: "h-36" },
    { id: "stamp", type: "stamp", title: "Wax Seal", rotation: -15, initialX: 720, initialY: 320, width: "w-20", height: "h-20" },
    { id: "bappa", type: "bappa", title: "Bappa Medallion", rotation: 10, initialX: 520, initialY: 360, width: "w-28", height: "h-28" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Floating Ring Pull Trigger - Bottom Right */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 pointer-events-auto flex flex-col items-end gap-2">
        <AnimatePresence>
          {isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={resetScrapbook}
              className="p-2.5 rounded-full bg-[#350709] border border-[#B98532]/30 text-[#FAF7F2] shadow-lg hover:bg-[#8F1115] transition-colors"
              title="Reset Items"
            >
              <RotateCcw className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-3 px-5 py-3 rounded-full border shadow-[0_10px_25px_rgba(0,0,0,0.3)] font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${
            isOpen 
              ? "bg-[#FAF7F2] border-[#350709]/20 text-[#350709]" 
              : "bg-[#350709] border-[#B98532]/30 text-[#FAF7F2]"
          }`}
        >
          {isOpen ? (
            <>
              <FolderOpen className="w-4 h-4 text-[#B98532]" />
              <span>Close Drawer</span>
            </>
          ) : (
            <>
              <Folder className="w-4 h-4 text-[#B98532] animate-pulse" />
              <span>Open Memory Box</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Scattered Scrapbook Deck */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute inset-0 pointer-events-none">
            
            {/* Guide overlay text */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-28 left-1/2 -translate-x-1/2 text-center pointer-events-none bg-[#FAF7F2]/90 backdrop-blur-sm border border-black/5 px-6 py-2 rounded-full shadow-sm"
            >
              <p className="font-sans text-[11px] md:text-xs text-[#350709] tracking-wide font-medium">
                💡 Drag these keepsake scraps around to organize your scrapbook page. Double-tap to slide.
              </p>
            </motion.div>

            {/* Draggable items */}
            {scraps.map((item) => (
              <motion.div
                key={item.id}
                drag
                dragMomentum={true}
                dragElastic={0.1}
                dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
                initial={{ 
                  opacity: 0, 
                  scale: 0.3,
                  x: window.innerWidth / 2 - 100, 
                  y: window.innerHeight - 200,
                  rotate: 0 
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: item.initialX, 
                  y: item.initialY,
                  rotate: item.rotation
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.3,
                  x: window.innerWidth / 2 - 100, 
                  y: window.innerHeight - 100,
                  rotate: 0
                }}
                whileDrag={{ scale: 1.05, rotate: item.rotation + 3, zIndex: 100 }}
                className={`absolute ${item.width} ${item.height} pointer-events-auto cursor-grab active:cursor-grabbing select-none`}
              >
                
                {/* 1. SECRET RECIPE CARD */}
                {item.type === "recipe" && (
                  <div className="w-full h-full bg-[#FAF7F2] p-5 border border-[#EBE7DF] shadow-[0_15px_30px_rgba(0,0,0,0.15)] rounded-sm flex flex-col justify-between text-black relative">
                    {/* Ring binder hole */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#161413] border-2 border-[#FAF7F2] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]" />
                    
                    <div className="border-b border-[#FAF7F2]/20 pb-2 mt-4">
                      <span className="font-mono text-[8px] tracking-wider text-black/40">PUNE / ESTD 1989</span>
                      <h5 className="font-serif italic text-[#8F1115] text-sm mt-0.5">The Dosa Ratio</h5>
                    </div>

                    <div className="flex-1 mt-3 font-serif italic text-black/75 text-xs leading-relaxed space-y-2">
                      <p>
                        "3 parts broken parboiled rice, 1 part whole white urad dal."
                      </p>
                      <p>
                        "A teaspoon of fenugreek seeds for that golden-brown color."
                      </p>
                      <p>
                        "Ferment for 12 hours under the cool Pune night wind. Do not stir before pouring."
                      </p>
                    </div>

                    <div className="border-t border-[#8F1115]/10 pt-2 flex items-center justify-between text-[8px] font-mono text-black/40">
                      <span>CHEF'S JOURNAL</span>
                      <span>PAGE 12</span>
                    </div>
                  </div>
                )}

                {/* 2. VINTAGE TICKET */}
                {item.type === "ticket" && (
                  <div className="w-full h-full bg-[#F3ECE0] p-4 border-2 border-dashed border-[#B98532]/40 shadow-[0_15px_30px_rgba(0,0,0,0.15)] flex flex-col justify-between text-[#350709] relative">
                    {/* Torn receipt edge approximate using jagged border or decoration */}
                    <div className="absolute inset-x-0 -top-1 h-2 flex justify-between overflow-hidden">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-[#161413] -translate-y-1" />
                      ))}
                    </div>

                    <div className="text-center mt-2">
                      <span className="font-mono text-[9px] font-bold tracking-widest text-[#8F1115]">MAURYA VEG</span>
                      <p className="font-mono text-[7px] text-[#350709]/60 tracking-wider">KONDHWA, PUNE</p>
                    </div>

                    <div className="font-mono text-[8px] space-y-1 my-3 text-left border-y border-[#350709]/10 py-2">
                      <div className="flex justify-between">
                        <span>2x MASALA DOSA</span>
                        <span>Rs 12.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2x FILTER COFFEE</span>
                        <span>Rs 6.00</span>
                      </div>
                      <div className="flex justify-between border-t border-dashed border-[#350709]/20 pt-1 font-bold">
                        <span>TOTAL</span>
                        <span>Rs 18.00</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[7px] font-mono text-[#350709]/50">
                      <span>TICKET #001</span>
                      <span>12 NOV 1989</span>
                    </div>
                  </div>
                )}

                {/* 3. SHAKE-TO-REVEAL POLAROID */}
                {item.type === "polaroid" && (
                  <motion.div 
                    onClick={handlePolaroidClick}
                    className="w-full h-full bg-[#fdfbf7] p-3 pb-8 shadow-[0_15px_35px_rgba(0,0,0,0.2)] rounded-sm border border-black/5 flex flex-col justify-between text-black"
                    animate={shakeCount > 0 && !polaroidDeveloped ? {
                      rotate: [item.rotation, item.rotation - 10, item.rotation + 10, item.rotation],
                      x: [item.initialX, item.initialX - 8, item.initialX + 8, item.initialX]
                    } : {}}
                    transition={{ duration: 0.35 }}
                  >
                    {/* Image space with chemical overlay */}
                    <div className="relative aspect-square w-full bg-stone-900 border border-black/5 overflow-hidden">
                      <Image 
                        src="/editorial-spices.png" 
                        alt="Keepsake Spices" 
                        fill 
                        className="object-cover transition-all duration-1000" 
                        style={{ filter: polaroidDeveloped ? "none" : "contrast-[0.8] brightness-[0.7] saturate-[0.1]" }}
                        loading="lazy"
                      />
                      
                      {/* Grey haze overlay that slowly dissolves on shakes */}
                      <motion.div 
                        className="absolute inset-0 bg-stone-700/80 mix-blend-color flex flex-col items-center justify-center p-3 text-center pointer-events-none"
                        animate={{ opacity: polaroidDeveloped ? 0 : 1 - (shakeCount * 0.34) }}
                        transition={{ duration: 0.6 }}
                      >
                        {!polaroidDeveloped && (
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] text-[#FAF7F2] uppercase tracking-widest block bg-[#8F1115] px-2 py-0.5 rounded-full animate-bounce">
                              Click to Shake
                            </span>
                            <span className="font-serif text-[10px] text-[#FAF7F2]/80 block">
                              Develop memory ({shakeCount}/3)
                            </span>
                          </div>
                        )}
                      </motion.div>
                    </div>

                    <p className="font-serif italic text-center text-black/75 text-[13px] mt-2">
                      {polaroidDeveloped ? '"The Spices of Maurya."' : '"Developing..."'}
                    </p>
                  </motion.div>
                )}

                {/* 4. DRY LEAF */}
                {item.type === "leaf" && (
                  <div className="w-full h-full flex items-center justify-center text-[#B98532]/70 hover:text-[#B98532] transition-colors">
                    {/* SVG Bay Leaf representation */}
                    <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-md">
                      <path 
                        d="M50 10 C5 70, 25 150, 50 190 C75 150, 95 70, 50 10 Z" 
                        fill="currentColor" 
                        stroke="#8B7355" 
                        strokeWidth="1.5"
                      />
                      <path d="M50 10 L50 190" stroke="#8B7355" strokeWidth="1.5" strokeDasharray="3 3" />
                      <path d="M50 50 Q30 70 20 80" stroke="#8B7355" strokeWidth="1" />
                      <path d="M50 90 Q32 105 22 115" stroke="#8B7355" strokeWidth="1" />
                      <path d="M50 130 Q35 140 28 145" stroke="#8B7355" strokeWidth="1" />
                      <path d="M50 65 Q70 85 80 95" stroke="#8B7355" strokeWidth="1" />
                      <path d="M50 105 Q68 120 78 130" stroke="#8B7355" strokeWidth="1" />
                    </svg>
                  </div>
                )}

                {/* 5. WAX SEAL STAMP */}
                {item.type === "stamp" && (
                  <div className="w-full h-full rounded-full bg-[#8F1115] border-4 border-[#350709] shadow-[0_10px_20px_rgba(0,0,0,0.3)] flex items-center justify-center text-[#B98532] relative overflow-hidden group">
                    {/* Wax Stamp Ring */}
                    <div className="absolute inset-1.5 border-2 border-dashed border-[#B98532]/45 rounded-full" />
                    
                    {/* Embossed Logo Text */}
                    <span className="font-serif italic text-base font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                      M
                    </span>
                  </div>
                )}

                {/* 6. GANPATI BAPPA GOLD MEDALLION */}
                {item.type === "bappa" && (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FFCC00] via-[#FF9900] to-[#D84315] border-4 border-[#350709] shadow-[0_15px_30px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center text-[#350709] relative overflow-hidden group hover:scale-110 transition-transform cursor-pointer">
                    <div className="absolute inset-1.5 border-2 border-dashed border-[#350709]/40 rounded-full animate-spin" style={{ animationDuration: "25s" }} />
                    <span className="text-3xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">🕉️</span>
                    <span className="font-mono text-[7px] font-bold uppercase tracking-tighter mt-0.5 text-[#350709]">PUNE 1989</span>
                  </div>
                )}

              </motion.div>
            ))}

          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
