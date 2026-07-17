"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";

interface TransitionContextType {
  startTransition: (href: string, rect: DOMRect | null) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
  startTransition: () => {},
  isTransitioning: false,
});

export const useTransition = () => useContext(TransitionContext);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const curtainRef = useRef<HTMLDivElement>(null);
  const pageContainerRef = useRef<HTMLDivElement>(null);

  // Handle route change entrance reveal
  useEffect(() => {
    if (isPending) {
      const curtain = curtainRef.current;
      const container = pageContainerRef.current;
      
      if (curtain) {
        gsap.killTweensOf(curtain);
        gsap.killTweensOf(container);
        
        const tl = gsap.timeline({
          onComplete: () => {
            setIsTransitioning(false);
            setIsPending(false);
            curtain.style.pointerEvents = "none";
          }
        });

        // Crimson curtain slides off top
        tl.fromTo(curtain,
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
          { 
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", 
            duration: 0.6, 
            ease: "power3.inOut" 
          }
        );

        // New page slides up slightly and grows
        if (container) {
          tl.fromTo(container,
            { y: 15, opacity: 0.9, scale: 0.98 },
            { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: "power3.out" },
            "-=0.45"
          );
        }
      }
    }
  }, [pathname, isPending]);

  const startTransition = (href: string, rect: DOMRect | null) => {
    if (isTransitioning) return;
    if (pathname === href) return;

    setIsTransitioning(true);
    const curtain = curtainRef.current;
    
    if (curtain) {
      curtain.style.pointerEvents = "auto";
      
      // Curtain sweeps up from the bottom to cover the screen
      gsap.killTweensOf(curtain);
      gsap.fromTo(curtain,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        { 
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            setIsPending(true);
            router.push(href);
          }
        }
      );
    } else {
      // Fallback if curtain ref is missing
      setIsPending(true);
      router.push(href);
    }
  };

  return (
    <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
      {/* Dynamic page container */}
      <div ref={pageContainerRef} className="will-change-transform">
        {children}
      </div>

      {/* Fullscreen crimson curtain transition overlay */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[99999] bg-[#8F1115] pointer-events-none"
        style={{
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        }}
      />
    </TransitionContext.Provider>
  );
}
