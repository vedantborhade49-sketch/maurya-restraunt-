"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PlatformRatings() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Refs for the counters
  const googleRef = useRef<HTMLSpanElement>(null);
  const zomatoDiningRef = useRef<HTMLSpanElement>(null);
  const zomatoDeliveryRef = useRef<HTMLSpanElement>(null);
  const swiggyRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true, // Only trigger the count once
        }
      });

      // 1. Fade up the column containers
      tl.fromTo(".rating-col", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power2.out" }
      );

      // 2. Draw the copper dividers
      tl.fromTo(".copper-divider",
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 1.5, ease: "power3.inOut" },
        "-=1"
      );

      // 3. Counter animations
      const animateCounter = (ref: React.RefObject<HTMLSpanElement | null>, endValue: number, suffix: string = "★") => {
        if (ref.current) {
          gsap.to(ref.current, {
            innerHTML: endValue,
            duration: 2,
            ease: "power2.out",
            snap: { innerHTML: 0.1 },
            onUpdate: function() {
              ref.current!.innerHTML = Number(this.targets()[0].innerHTML).toFixed(1) + suffix;
            }
          });
        }
      };

      animateCounter(googleRef, 4.5);
      animateCounter(zomatoDiningRef, 4.2);
      animateCounter(zomatoDeliveryRef, 4.0);
      animateCounter(swiggyRef, 4.5);
      
      // Star shimmer effect
      tl.to(".star-shimmer", {
        opacity: 0.4,
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut"
      }, "-=0.5");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full py-40 px-8 md:px-12 flex flex-col items-center justify-center">
      <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row justify-between items-center md:items-stretch gap-16 md:gap-8">
        
        {/* Google */}
        <div className="rating-col flex-1 flex flex-col items-center text-center">
          <span className="font-serif text-3xl md:text-4xl text-[#1F1F1F] tracking-widest uppercase mb-8">Google</span>
          <span ref={googleRef} className="star-shimmer font-serif text-5xl md:text-6xl italic text-[#B98555] mb-6">0.0★</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#1F1F1F]/60">888 Reviews</span>
        </div>

        {/* Divider 1 */}
        <div className="copper-divider hidden md:block w-[1px] bg-[#B98555]/40" />

        {/* Zomato */}
        <div className="rating-col flex-1 flex flex-col items-center text-center">
          <span className="font-serif text-3xl md:text-4xl text-[#1F1F1F] tracking-widest uppercase mb-8">Zomato</span>
          <div className="flex gap-8 items-center">
            <div className="flex flex-col items-center">
              <span ref={zomatoDiningRef} className="star-shimmer font-serif text-4xl md:text-5xl italic text-[#B98555] mb-4">0.0★</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#1F1F1F]/60">Dining</span>
            </div>
            <div className="copper-divider w-[1px] h-16 bg-[#B98555]/40" />
            <div className="flex flex-col items-center">
              <span ref={zomatoDeliveryRef} className="star-shimmer font-serif text-4xl md:text-5xl italic text-[#B98555] mb-4">0.0★</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#1F1F1F]/60">Delivery</span>
            </div>
          </div>
        </div>

        {/* Divider 2 */}
        <div className="copper-divider hidden md:block w-[1px] bg-[#B98555]/40" />

        {/* Swiggy */}
        <div className="rating-col flex-1 flex flex-col items-center text-center">
          <span className="font-serif text-3xl md:text-4xl text-[#1F1F1F] tracking-widest uppercase mb-8">Swiggy</span>
          <span ref={swiggyRef} className="star-shimmer font-serif text-5xl md:text-6xl italic text-[#B98555] mb-6">0.0★</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#1F1F1F]/60">800+ Ratings</span>
        </div>

      </div>
    </section>
  );
}
