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

  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle route change entrance wipe
  useEffect(() => {
    if (isPending) {
      const el = overlayRef.current;
      if (el) {
        // Sweep crimson curtain to the right to reveal the new page
        gsap.killTweensOf(el);
        gsap.killTweensOf(contentRef.current);
        
        const tl = gsap.timeline({
          onComplete: () => {
            setIsTransitioning(false);
            setIsPending(false);
            el.style.pointerEvents = "none";
          }
        });

        // Curtains slide right
        tl.fromTo(el,
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
          { 
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", 
            duration: 0.7, 
            ease: "power3.inOut" 
          }
        );

        // Page content scale and fade in slightly
        if (contentRef.current) {
          tl.fromTo(contentRef.current,
            { scale: 0.96, opacity: 0.7 },
            { scale: 1, opacity: 1, duration: 0.75, ease: "power3.out" },
            "-=0.55"
          );
        }
      }
    }
  }, [pathname, isPending]);

  const startTransition = (href: string, rect: DOMRect | null) => {
    if (isTransitioning) return;
    
    // If navigating to the current path, just ignore
    if (pathname === href) return;

    setIsTransitioning(true);
    const el = overlayRef.current;
    
    if (el && rect) {
      el.style.pointerEvents = "auto";
      
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // circular ripple expands from the center of the clicked nav link
      gsap.killTweensOf(el);
      gsap.fromTo(el,
        { clipPath: `circle(0px at ${x}px ${y}px)` },
        { 
          clipPath: `circle(150% at ${x}px ${y}px)`,
          duration: 0.75,
          ease: "power3.inOut",
          onComplete: () => {
            setIsPending(true);
            router.push(href);
          }
        }
      );
    } else {
      // Fallback if coordinates are not available (e.g. key triggers)
      setIsPending(true);
      router.push(href);
    }
  };

  return (
    <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
      {/* Dynamic page content wrapper */}
      <div ref={contentRef} className="will-change-transform">
        {children}
      </div>

      {/* Fullscreen crimson curtain transition layer */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[99999] bg-[#8F1115] pointer-events-none"
        style={{
          clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        }}
      />
    </TransitionContext.Provider>
  );
}
