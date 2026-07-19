"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function Chapter08Wall() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".wall-item");
      
      items.forEach((item: any, i) => {
        // Different parallax speed for every item based on its index
        const speed = 1 + (i % 3) * 0.5;
        
        gsap.to(item, {
          y: -150 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-40 min-h-[250vh] bg-[#EFE8DB] overflow-hidden">
      
      <div className="max-w-[1600px] mx-auto relative w-full h-full">
        
        {/* Wall Item 1 */}
        <div className="wall-item absolute top-[5%] left-[5%] w-[40vw] md:w-[20vw] aspect-[3/4] shadow-2xl group transition-transform duration-700 hover:scale-[1.02]">
          <ImagePlaceholder category="Wall" description="Hanging portrait frame." aspectRatio="h-full" />
        </div>

        {/* Wall Item 2 */}
        <div className="wall-item absolute top-[15%] right-[10%] w-[50vw] md:w-[35vw] aspect-[16/9] shadow-2xl group transition-transform duration-700 hover:scale-[1.02]">
          <ImagePlaceholder category="Wall" description="Large floating landscape." aspectRatio="h-full" />
        </div>

        {/* Wall Item 3 */}
        <div className="wall-item absolute top-[35%] left-[25%] w-[35vw] md:w-[15vw] aspect-[4/5] shadow-2xl z-20 bg-white p-3 rotate-[-2deg] group transition-transform duration-700 hover:scale-[1.02]">
          <ImagePlaceholder category="Wall" description="Small printed artifact." aspectRatio="h-full" />
        </div>

        {/* Wall Item 4 */}
        <div className="wall-item absolute top-[45%] right-[30%] w-[45vw] md:w-[25vw] aspect-square shadow-2xl group transition-transform duration-700 hover:scale-[1.02]">
          <ImagePlaceholder category="Wall" description="Square composition." aspectRatio="h-full" />
        </div>

        {/* Wall Item 5 */}
        <div className="wall-item absolute top-[65%] left-[10%] w-[60vw] md:w-[40vw] aspect-[21/9] shadow-2xl z-10 group transition-transform duration-700 hover:scale-[1.02]">
          <ImagePlaceholder category="Wall" description="Overlapping panoramic." aspectRatio="h-full" />
        </div>

        {/* Wall Item 6 */}
        <div className="wall-item absolute top-[80%] right-[15%] w-[30vw] md:w-[18vw] aspect-[3/4] shadow-2xl z-30 group transition-transform duration-700 hover:scale-[1.02]">
          <ImagePlaceholder category="Wall" description="Final floating portrait." aspectRatio="h-full" />
        </div>

      </div>

    </section>
  );
}
