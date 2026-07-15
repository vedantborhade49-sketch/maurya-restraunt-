"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import MauryaCurve from "./MauryaCurve";
import { MAURYA_EASE } from "../../lib/motion/maurya-motion";

interface BrandIntroProps {
  onComplete: () => void;
}

export default function BrandIntro({ onComplete }: BrandIntroProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [introType, setIntroType] = useState<"full" | "short">("short");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check session storage
    const seen = sessionStorage.getItem("maurya_intro_seen");
    const type = seen ? "short" : "full";
    setIntroType(type);
    
    // Lock scroll
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setShowIntro(false);
          onComplete();
        }
      });

      if (type === "full") {
        // Set seen in session
        sessionStorage.setItem("maurya_intro_seen", "true");

        // 1. Initial black screen with tiny KONDHWA, PUNE text
        tl.set(containerRef.current, { backgroundColor: "#0b0908" });
        tl.fromTo(textRef.current, 
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, ease: MAURYA_EASE.heavy }
        );

        // 2. Hold for 300ms (total 600ms with text fade)
        tl.to({}, { duration: 0.3 });

        // 3. Plate drop impact (THUD)
        tl.to(textRef.current, { opacity: 0, duration: 0.2, ease: MAURYA_EASE.soft });
        
        // Bring in plate with a massive scale impact
        tl.fromTo(plateRef.current,
          { scale: 1.35, y: -30, opacity: 0 },
          { 
            scale: 1, 
            y: 0,
            opacity: 1, 
            duration: 0.35, 
            ease: "expo.out"
          },
          "-=0.1"
        );

        // 4. Red flash for 80ms
        tl.set(flashRef.current, { opacity: 1 });
        tl.to(flashRef.current, { opacity: 0, duration: 0.08, ease: "none" });

        // 5. Short pause on the plate
        tl.to({}, { duration: 0.4 });

        // 6. Outro fade
        tl.to(containerRef.current, { opacity: 0, duration: 0.35, ease: MAURYA_EASE.soft });

      } else {
        // Short intro (refresh / returning navigate) - exactly 400ms
        tl.set(containerRef.current, { backgroundColor: "#0b0908" });
        
        // Draw the curve
        tl.fromTo(curveRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.15, ease: MAURYA_EASE.heavy }
        );
        tl.to(curveRef.current, { opacity: 0, duration: 0.1, delay: 0.05 });
        tl.to(containerRef.current, { opacity: 0, duration: 0.1, ease: MAURYA_EASE.soft });
      }

    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (!showIntro) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-auto select-none"
    >
      {/* Red flash layer */}
      <div 
        ref={flashRef}
        className="absolute inset-0 bg-[#8F1115] opacity-0 z-50 pointer-events-none"
      />

      {introType === "full" ? (
        <>
          {/* Centered Location Text */}
          <div 
            ref={textRef} 
            className="font-sans text-[10px] tracking-[0.25em] text-[#F3E8D4]/60 uppercase opacity-0"
          >
            KONDHWA, PUNE
          </div>

          {/* Falling Plate Silhouette representation */}
          <div 
            ref={plateRef} 
            className="absolute opacity-0 flex items-center justify-center"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-[#F3E8D4]/10 bg-gradient-to-br from-[#350709] to-[#0b0908] shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-center">
              {/* Maurya Curve brand device centered inside the plate */}
              <MauryaCurve 
                variant="sweep" 
                className="w-24 h-24 text-[#B98532]" 
              />
            </div>
          </div>
        </>
      ) : (
        /* Short preloader */
        <div ref={curveRef} className="w-32 h-32 text-[#B98532] flex items-center justify-center opacity-0">
          <MauryaCurve variant="sweep" className="w-full h-full" />
        </div>
      )}
    </div>
  );
}
