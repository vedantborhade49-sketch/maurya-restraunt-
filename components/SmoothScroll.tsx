"use client";

import { useEffect } from "react";
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Disable and skip loading Lenis & GSAP on mobile for native 60fps scrolling
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    let lenisInstance: any = null;
    let tickerCallback: any = null;

    Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger")
    ]).then(([{ default: Lenis }, { default: gsap }, { default: ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 2,
      });

      lenisInstance = lenis;
      lenis.on("scroll", ScrollTrigger.update);

      tickerCallback = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);

  return <>{children}</>;
}
