"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialImage from "@/components/EditorialImage";

export default function Chapter05Sequence() {
  const containerRef = useRef<HTMLElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the whole container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Scroll distance for 2 page turns
          scrub: true,
          pin: true,
        }
      });

      // Page 2 slides up over Page 1 physically
      tl.fromTo(page2Ref.current,
        { y: "100%", boxShadow: "0 -20px 50px rgba(0,0,0,0.5)" },
        { y: "0%", ease: "none", duration: 1 }
      );

      // Page 3 slides up over Page 2 physically
      tl.fromTo(page3Ref.current,
        { y: "100%", boxShadow: "0 -20px 50px rgba(0,0,0,0.5)" },
        { y: "0%", ease: "none", duration: 1 }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#1F1F1F] overflow-hidden">
      
      {/* Page 1 (Base) */}
      <div className="absolute inset-0 w-full h-full z-10">
          <EditorialImage src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2000&auto=format&fit=crop" alt="Cooking process" />
        <div className="absolute top-12 left-12 text-[#F6F1E8] font-mono text-[10px] tracking-widest mix-blend-difference">
          MOMENT 01
        </div>
      </div>

      {/* Page 2 */}
      <div ref={page2Ref} className="absolute inset-0 w-full h-full z-20 origin-bottom">
          <EditorialImage src="https://images.unsplash.com/photo-1555243896-c709bfa0b564?q=80&w=2000&auto=format&fit=crop" alt="Plating" />
        <div className="absolute top-12 left-12 text-[#F6F1E8] font-mono text-[10px] tracking-widest mix-blend-difference">
          MOMENT 02
        </div>
      </div>

      {/* Page 3 */}
      <div ref={page3Ref} className="absolute inset-0 w-full h-full z-30 origin-bottom">
          <EditorialImage src="https://images.unsplash.com/photo-1585937421612-70100de8e8fb?q=80&w=2000&auto=format&fit=crop" alt="Naan preparation" />
        <div className="absolute top-12 left-12 text-[#F6F1E8] font-mono text-[10px] tracking-widest mix-blend-difference">
          MOMENT 03
        </div>
      </div>

    </section>
  );
}
