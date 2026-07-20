"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function GalleryStoryStrips() {
  const containerRef = useRef<HTMLElement>(null);
  const strip1Ref = useRef<HTMLDivElement>(null);
  const strip2Ref = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      
      // Strip 1 reveal
      gsap.fromTo(strip1Ref.current,
        { clipPath: "inset(0 100% 0 0)" },
        { 
          clipPath: "inset(0 0% 0 0)", 
          duration: 1.5, 
          ease: "power4.out",
          scrollTrigger: { trigger: strip1Ref.current, start: "top 80%" }
        }
      );

      // Parallax effect on the images within the strips
      if (img1Ref.current) {
        gsap.to(img1Ref.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: strip1Ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // Strip 2 reveal
      gsap.fromTo(strip2Ref.current,
        { clipPath: "inset(0 0 0 100%)" },
        { 
          clipPath: "inset(0 0 0 0%)", 
          duration: 1.5, 
          ease: "power4.out",
          scrollTrigger: { trigger: strip2Ref.current, start: "top 80%" }
        }
      );

      if (img2Ref.current) {
        gsap.to(img2Ref.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: strip2Ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-transparent py-32 flex flex-col gap-32 overflow-hidden">
      
      {/* Strip 1: Evening Light */}
      <div className="w-full relative px-0 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-16 group">
        <div ref={strip1Ref} className="hover-reveal w-full md:w-[75%] h-[60vh] md:h-[80vh] relative overflow-hidden transition-transform duration-700 hover:scale-[1.01]">
           <Image 
             ref={img1Ref}
             src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2500&auto=format&fit=crop" 
             alt="Evening Light" 
             fill 
             sizes="100vw"
             className="object-cover scale-110 opacity-90"
           />
           {/* Floating Line */}
           <div className="absolute top-1/2 left-[-10%] w-[120%] h-[1px] bg-white opacity-20 pointer-events-none transform -rotate-1" />
        </div>
        <div className="w-full md:w-[25%] px-8 md:px-0 flex flex-col">
           <span className="font-mono text-[9px] uppercase tracking-[0.4em] opacity-80 mb-4 block transition-transform duration-500 group-hover:-translate-y-1">Atmosphere</span>
           <h3 className="font-serif text-4xl italic mb-6">Evening Light</h3>
           <p className="font-sans text-sm opacity-70 max-w-xs leading-relaxed">
             As the sun sets, the dining room transforms. Soft shadows and warm ambient lighting create an intimate space for conversation.
           </p>
        </div>
      </div>

      {/* Strip 2: Texture & Ritual (Reversed) */}
      <div className="w-full relative px-0 md:px-12 flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16 group">
        <div className="w-full md:w-[25%] px-8 md:px-0 flex flex-col md:items-end text-left md:text-right">
           <span className="font-mono text-[9px] uppercase tracking-[0.4em] opacity-80 mb-4 block transition-transform duration-500 group-hover:-translate-y-1">Craft</span>
           <h3 className="font-serif text-4xl italic mb-6">Table Ritual</h3>
           <p className="font-sans text-sm opacity-70 max-w-xs leading-relaxed">
             Every plate, every glass, and every fold of linen is placed with precision. The table is a stage set for the evening ahead.
           </p>
        </div>
        <div ref={strip2Ref} className="hover-reveal w-full md:w-[75%] h-[60vh] md:h-[80vh] relative overflow-hidden transition-transform duration-700 hover:scale-[1.01]">
           <Image 
             ref={img2Ref}
             src="/editorial-food-1.png" 
             alt="Table Ritual" 
             fill 
             sizes="100vw"
             className="object-cover scale-110 sepia-[0.3]"
           />
        </div>
      </div>

    </section>
  );
}
