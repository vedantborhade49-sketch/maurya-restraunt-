"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialImage from "@/components/EditorialImage";

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
          <EditorialImage src="/editorial-food-3.png" alt="Hanging portrait frame" />
        </div>

        {/* Wall Item 2 */}
        <div className="wall-item absolute top-[15%] right-[10%] w-[50vw] md:w-[35vw] aspect-[16/9] shadow-2xl group transition-transform duration-700 hover:scale-[1.02]">
          <EditorialImage src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2000&auto=format&fit=crop" alt="Large floating landscape" />
        </div>

        {/* Wall Item 3 */}
        <div className="wall-item absolute top-[35%] left-[25%] w-[35vw] md:w-[15vw] aspect-[4/5] shadow-2xl z-20 bg-white p-3 rotate-[-2deg] group transition-transform duration-700 hover:scale-[1.02]">
          <EditorialImage src="/editorial-food-4.png" alt="Small printed artifact" />
        </div>

        {/* Wall Item 4 */}
        <div className="wall-item absolute top-[45%] right-[30%] w-[45vw] md:w-[25vw] aspect-square shadow-2xl group transition-transform duration-700 hover:scale-[1.02]">
          <EditorialImage src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1500&auto=format&fit=crop" alt="Square composition" />
        </div>

        {/* Wall Item 5 */}
        <div className="wall-item absolute top-[65%] left-[10%] w-[60vw] md:w-[40vw] aspect-[21/9] shadow-2xl z-10 group transition-transform duration-700 hover:scale-[1.02]">
          <EditorialImage src="https://images.unsplash.com/photo-1414235077428-9710c28afbb3?q=80&w=2500&auto=format&fit=crop" alt="Overlapping panoramic" />
        </div>

        {/* Wall Item 6 */}
        <div className="wall-item absolute top-[80%] right-[15%] w-[30vw] md:w-[18vw] aspect-[3/4] shadow-2xl z-30 group transition-transform duration-700 hover:scale-[1.02]">
          <EditorialImage src="/editorial-food-5.png" alt="Final floating portrait" />
        </div>

      </div>

    </section>
  );
}
