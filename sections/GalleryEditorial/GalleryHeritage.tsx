"use client";

import React, { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const GalleryHeritage = memo(function GalleryHeritage() {
  const containerRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      
      // Strip reveal
      gsap.fromTo(stripRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        { 
          clipPath: "inset(0 0% 0 0)", 
          duration: 1.5, 
          ease: "power4.out",
          scrollTrigger: { trigger: stripRef.current, start: "top 80%" }
        }
      );

      // Parallax effect on the image
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: stripRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onEnter: () => gsap.set(imgRef.current, { willChange: "transform" }),
            onLeave: () => gsap.set(imgRef.current, { willChange: "auto" }),
            onEnterBack: () => gsap.set(imgRef.current, { willChange: "transform" }),
            onLeaveBack: () => gsap.set(imgRef.current, { willChange: "auto" }),
          }
        });
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-transparent py-32 flex flex-col items-center justify-center overflow-hidden content-visibility-auto [contain-intrinsic-size:800px]">
      
      <div className="w-full max-w-[1600px] relative px-0 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-16 group">
        <div ref={stripRef} className="hover-reveal w-full md:w-[75%] h-[60vh] md:h-[80vh] relative overflow-hidden transition-transform duration-700 hover:scale-[1.01]">
           <Image 
             ref={imgRef}
             src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2500&auto=format&fit=crop" 
             alt="Evening Light" 
             fill 
             sizes="100vw"
             className="object-cover scale-[1.15] opacity-90"
             decoding="async"
             loading="lazy"
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

    </section>
  );
});

export default GalleryHeritage;
