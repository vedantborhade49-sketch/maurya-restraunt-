"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import gsap from "gsap";

const PreloaderContext = createContext({ loading: true });

export const usePreloader = () => useContext(PreloaderContext);

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(1);
  const [isReturning, setIsReturning] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only determine state on first mount
    const seen = sessionStorage.getItem("maurya_intro_seen");
    if (seen === "true") {
      setIsReturning(true);
    } else {
      sessionStorage.setItem("maurya_intro_seen", "true");
    }
  }, []);

  useEffect(() => {
    // Only run animations after we know the return state
    let ctx = gsap.context(() => {
      if (isReturning) {
        // Micro loader for returning visitors
        const tl = gsap.timeline({
          onComplete: () => setLoading(false),
        });
        tl.to(".micro-loader-bar", {
          width: "100%",
          duration: 0.5,
          ease: "power2.out",
        }).to(".loader-bg", {
          opacity: 0,
          duration: 0.2,
        });
      } else {
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.timeline({
              onComplete: () => setLoading(false)
            })
            .to(".loader-logo", { 
              scale: 2.5, 
              opacity: 0, 
              duration: 0.8, 
              ease: "power3.inOut" 
            })
            .to(".loader-bg", { 
              opacity: 0, 
              duration: 0.4, 
              ease: "power2.out" 
            }, "-=0.4");
          }
        });

        tl.to(".loader-line-draw", {
          x: "0%",
          duration: 1.0,
          ease: "power2.inOut",
        });

        tl.to(".loader-m-path", {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
        }, "-=0.5");
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isReturning]);

  useEffect(() => {
    if (isReturning) return;
    
    // Progress counter updates
    const steps = [1, 12, 28, 47, 73, 100];
    let stepIndex = 0;
    
    const interval = setInterval(() => {
      if (stepIndex < steps.length - 1) {
        stepIndex++;
        setProgress(steps[stepIndex]);
      } else {
        clearInterval(interval);
      }
    }, 350);

    return () => clearInterval(interval);
  }, [isReturning]);

  return (
    <PreloaderContext.Provider value={{ loading }}>
      <div ref={containerRef} className="contents">
        {loading && (
          <div className="loader-bg fixed inset-0 z-[9999] bg-midnight flex flex-col items-center justify-center select-none overflow-hidden">
          {isReturning ? (
            // Simple micro loader
            <div className="flex flex-col items-center">
              <h2 className="font-heading text-2xl text-gold tracking-widest mb-4">MAURYA</h2>
              <div className="w-32 h-[1px] bg-wine relative">
                <div className="micro-loader-bar absolute top-0 left-0 bottom-0 bg-gold w-0"></div>
              </div>
            </div>
          ) : (
            // Full cinematic loader
            <div className="flex flex-col items-center loader-logo">
              {/* Horizontal line draw */}
              <div className="w-48 h-[1px] bg-neutral-900 relative overflow-hidden mb-8">
                <div className="absolute inset-0 bg-gold translate-x-[-100%] loader-line-draw"></div>
              </div>

              {/* M Logo Drawing */}
              <svg viewBox="0 0 120 120" className="w-20 h-20 mb-6 stroke-gold fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round">
                <path 
                  className="loader-m-path"
                  d="M30,90 V30 L60,70 L90,30 V90" 
                  strokeDasharray="300" 
                  strokeDashoffset="300"
                />
              </svg>

              <h1 className="text-3xl md:text-4xl font-heading text-gold tracking-[0.25em] mb-2 text-center">
                MAURYA
              </h1>
              <p className="text-[10px] tracking-[0.35em] text-royal-ivory opacity-60 mb-12">
                PURE VEG
              </p>

              <div className="text-[9px] tracking-[0.2em] text-gold uppercase opacity-80 mb-2">
                PREPARING YOUR TABLE
              </div>
              
              <div className="font-heading text-3xl text-gold tabular-nums">
                {String(progress).padStart(2, "0")}
              </div>
            </div>
          )}
        </div>
      )}
        <div className={loading ? "invisible opacity-0" : "visible opacity-100 transition-opacity duration-1000"}>
          {children}
        </div>
      </div>
    </PreloaderContext.Provider>
  );
}
