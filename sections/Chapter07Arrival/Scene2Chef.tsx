"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Scene2Chef() {
  const containerRef = useRef<HTMLElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<SVGPathElement>(null);
  const knifeRef = useRef<HTMLDivElement>(null);
  const herbsRef = useRef<HTMLDivElement[]>([]);
  const steamRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      
      // Knife parallax
      gsap.fromTo(knifeRef.current,
        { y: -100, rotationZ: -15 },
        {
          y: 0, rotationZ: -5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "center center",
            scrub: 1,
          }
        }
      );

      // Note sliding onto the board
      gsap.fromTo(noteRef.current,
        { x: -50, y: -50, opacity: 0, rotationZ: -5 },
        {
          x: 0, y: 0, opacity: 1, rotationZ: 2,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        }
      );

      // Signature Drawing
      if (signatureRef.current) {
        const length = signatureRef.current.getTotalLength();
        gsap.set(signatureRef.current, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(signatureRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 40%",
          }
        });
      }

      // Herbs gentle air movement
      herbsRef.current.forEach((herb, i) => {
        if (!herb) return;
        gsap.to(herb, {
          rotationZ: "random(-15, 15)",
          x: "random(-5, 5)",
          y: "random(-5, 5)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2
        });
      });

      // Steam from the corner
      steamRefs.current.forEach((steam, i) => {
        if (!steam) return;
        gsap.to(steam, {
          y: -150,
          x: "random(-20, 20)",
          opacity: 0,
          scale: 2,
          duration: "random(4, 7)",
          repeat: -1,
          ease: "power1.inOut",
          delay: i * 0.8,
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[120vh] bg-[#4A2E1B] overflow-hidden flex items-center justify-center py-32">
      
      {/* ─── BACKGROUND: WALNUT WOOD ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.4] mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.08 0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(41,36,33,0.9)_100%)]" />
      </div>

      <div className="relative w-full max-w-[1200px] h-full flex items-center justify-center">

        {/* ─── THE CHEF'S KNIFE (CSS CONSTRUCTED) ─── */}
        <div ref={knifeRef} className="absolute right-[10%] top-[10%] md:right-[20%] w-[40px] h-[300px] shadow-[15px_20px_30px_rgba(0,0,0,0.5)] flex flex-col items-center">
          {/* Blade */}
          <div className="w-[35px] h-[200px] bg-gradient-to-b from-[#FDFBF7] via-[#A37A57] to-[#4A2E1B] rounded-t-full rounded-bl-3xl border-l border-white/40 shadow-inner" style={{ clipPath: "polygon(0 0, 100% 20%, 100% 100%, 0 100%)" }}></div>
          {/* Handle */}
          <div className="w-[25px] h-[100px] bg-[#292421] rounded-b-md shadow-inner flex flex-col justify-evenly items-center border border-[#A37A57]/20">
            <div className="w-2 h-2 rounded-full bg-[#A37A57]/60 shadow-inner"></div>
            <div className="w-2 h-2 rounded-full bg-[#A37A57]/60 shadow-inner"></div>
            <div className="w-2 h-2 rounded-full bg-[#A37A57]/60 shadow-inner"></div>
          </div>
        </div>

        {/* ─── SCATTERED HERBS & SPICES ─── */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { left: "25%", top: "15%", rotate: "45deg", scale: 0.8 },
            { left: "75%", top: "25%", rotate: "120deg", scale: 0.6 },
            { left: "30%", top: "80%", rotate: "210deg", scale: 0.9 },
            { left: "65%", top: "75%", rotate: "330deg", scale: 0.7 },
            { left: "85%", top: "50%", rotate: "15deg", scale: 0.85 },
            { left: "15%", top: "45%", rotate: "85deg", scale: 0.5 },
          ].map((pos, i) => (
            <div 
              key={`herb-${i}`}
              ref={el => { herbsRef.current[i] = el!; }}
              className="absolute w-4 h-8 bg-gradient-to-br from-[#6B6B45] to-[#4A4A2B] rounded-full shadow-[5px_5px_10px_rgba(0,0,0,0.5)] opacity-80"
              style={{
                left: pos.left,
                top: pos.top,
                transform: `rotate(${pos.rotate}) scale(${pos.scale})`,
                borderRadius: "50% 0 50% 0" // Leaf shape
              }}
            />
          ))}
          {/* Peppercorns */}
          {[
            { left: "32%", top: "22%" },
            { left: "68%", top: "35%" },
            { left: "45%", top: "78%" },
            { left: "58%", top: "85%" },
            { left: "82%", top: "45%" },
            { left: "22%", top: "55%" },
            { left: "38%", top: "40%" },
            { left: "72%", top: "65%" },
          ].map((pos, i) => (
            <div 
              key={`peppercorn-${i}`}
              className="absolute w-2 h-2 bg-[#292421] rounded-full shadow-[2px_2px_5px_rgba(0,0,0,0.6)]"
              style={{
                left: pos.left,
                top: pos.top,
              }}
            />
          ))}
        </div>

        {/* ─── STEAM FROM CORNER ─── */}
        <div className="absolute bottom-[-10%] left-[10%] w-[100px] h-[100px] pointer-events-none">
          {[0,1,2].map(i => (
            <div 
              key={i}
              ref={el => { steamRefs.current[i] = el!; }}
              className="absolute top-0 left-0 w-24 h-24 bg-white/10 blur-[20px] rounded-full mix-blend-screen opacity-0"
              style={{ marginLeft: i * 20 }}
            />
          ))}
        </div>

        {/* ─── WOODEN CUTTING BOARD ─── */}
        <div className="relative w-[90%] md:w-[600px] aspect-[4/3] bg-gradient-to-br from-[#A37A57] to-[#5B3A29] rounded-[20px] shadow-[20px_30px_60px_rgba(0,0,0,0.7),inset_2px_2px_10px_rgba(255,255,255,0.1)] flex items-center justify-center">
          {/* Board Texture */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay rounded-[20px]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.2 0.05' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
          
          {/* ─── HANDWRITTEN CHEF'S NOTE ─── */}
          <div 
            ref={noteRef}
            className="relative w-[85%] h-[85%] bg-[#F6F0E7] shadow-[10px_15px_30px_rgba(0,0,0,0.5)] p-8 md:p-12 flex flex-col justify-between"
          >
            {/* Paper Texture */}
            <div className="absolute inset-0 opacity-[0.3] mix-blend-multiply pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
            
            {/* Brass Clip */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-[80px] h-[30px] bg-gradient-to-b from-[#B8893F] to-[#6B5A3E] rounded-md shadow-lg border-t border-[#FDFBF7]/50" />

            <div className="relative z-10 space-y-6">
              <p className="font-serif italic text-2xl md:text-3xl text-[#292421] leading-relaxed">
                "Our kitchen prepares every meal as if we were serving our own family."
              </p>

              <div className="flex flex-col gap-2 mt-8">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#A65B3E]">• Freshly Prepared</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#A65B3E]">• Authentic Recipes</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#A65B3E]">• Premium Ingredients</span>
              </div>
            </div>

            {/* Animated Signature */}
            <div className="relative z-10 flex justify-end mt-8">
              <div className="w-[120px] h-[60px] relative">
                <svg viewBox="0 0 200 100" className="w-full h-full stroke-[#292421] fill-none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path 
                    ref={signatureRef}
                    d="M10,80 Q30,20 50,50 T90,30 T120,60 T160,40 T190,70" 
                  />
                </svg>
                <span className="absolute bottom-0 right-0 font-mono text-[8px] uppercase tracking-widest text-[#292421]/50">Executive Chef</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
