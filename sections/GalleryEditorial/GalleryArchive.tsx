"use client";

import React, { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const GalleryArchive = memo(function GalleryArchive() {
  const containerRef = useRef<HTMLElement>(null);
  const breakTextRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      
      // Editorial Break Fade
      if (breakTextRef.current) {
        gsap.fromTo(breakTextRef.current,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.5, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: breakTextRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Staggered Entrance for Contact Sheet items
      ScrollTrigger.batch(itemsRef.current, {
        start: "top 85%",
        once: true,
        onEnter: (elements) => {
          gsap.fromTo(elements,
            { y: 30, opacity: 0, scale: 0.98 },
            { 
              y: 0, 
              opacity: 1, 
              scale: 1,
              duration: 1, 
              ease: "power3.out", 
              stagger: 0.1,
              onComplete: () => gsap.set(elements, { clearProps: "willChange" })
            }
          );
        }
      });

      // Compressed Parallax (Slight drift)
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        const speed = i % 2 === 0 ? -15 : -25;
        gsap.to(item, {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Slight smoothing for paper drift feel
            onEnter: () => gsap.set(item, { willChange: "transform" }),
            onLeave: () => gsap.set(item, { willChange: "auto" }),
            onEnterBack: () => gsap.set(item, { willChange: "transform" }),
            onLeaveBack: () => gsap.set(item, { willChange: "auto" }),
          }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const setItemRef = (index: number) => (el: HTMLDivElement | null) => {
    itemsRef.current[index] = el!;
  };

  return (
    <section ref={containerRef} className="relative w-full overflow-visible content-visibility-auto -mt-16 z-20">
      
      {/* The Archive Content (Compressed Pacing) */}
      <div className="relative w-full min-h-[70vh] flex flex-col justify-start items-center pt-8 pb-20 px-6 md:px-12">
        
        {/* Ambient Dust/Paper texture layer */}
        <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-20 mix-blend-overlay pointer-events-none" />

        <div className="relative w-full max-w-[1200px] z-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-start">
          
          {/* Integrated Editorial Typography */}
          <div className="col-span-2 md:col-span-4 flex justify-start pl-4 md:pl-8 mb-4">
            <h2 ref={breakTextRef} className="font-serif text-5xl md:text-7xl italic opacity-90 tracking-tighter mix-blend-multiply">
              Since 1989.
            </h2>
          </div>
          
          {/* Contact Sheet Item 1 */}
          <div ref={setItemRef(0)} className="col-span-2 md:col-span-2 aspect-[4/3] relative bg-[#fdfbf7] p-3 md:p-5 shadow-[0_5px_15px_rgba(0,0,0,0.08)] transform rotate-1">
            {/* Binder Clip */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-md shadow-sm z-20" />
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-6 border-2 border-gray-400 rounded-full z-10" />
            
            <div className="relative w-full h-full overflow-hidden border border-black/10">
              <Image src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800" alt="Archive 1" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover contrast-125" decoding="async" loading="lazy" />
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-black/60 mt-3">REF: 884-A</p>
          </div>

          {/* Contact Sheet Item 2 */}
          <div ref={setItemRef(1)} className="col-span-1 md:col-span-1 aspect-square relative bg-[#fdfbf7] p-2 md:p-3 shadow-[0_5px_15px_rgba(0,0,0,0.08)] transform -rotate-2 mt-12">
             <div className="relative w-full h-full overflow-hidden border border-black/10">
              <Image src="/editorial-food-4.png" alt="Archive 2" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" decoding="async" loading="lazy" />
            </div>
          </div>

          {/* Contact Sheet Item 3 */}
          <div ref={setItemRef(2)} className="col-span-1 md:col-span-1 aspect-[3/4] relative bg-[#fdfbf7] p-2 md:p-3 shadow-[0_5px_15px_rgba(0,0,0,0.08)] transform rotate-3">
             <div className="relative w-full h-full overflow-hidden border border-black/10">
              <Image src="/editorial-entrance.png" alt="Archive 3" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" decoding="async" loading="lazy" />
            </div>
          </div>
          
          {/* Handwritten Note */}
          <div ref={setItemRef(3)} className="col-span-2 md:col-span-1 aspect-square flex items-center justify-center p-6 bg-[#fdfbf7] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transform -rotate-1">
            <p className="font-serif italic text-2xl text-black/70 transform -rotate-6">
              "The foundation of every evening."
            </p>
          </div>

          {/* Contact Sheet Item 4 (Bleeds out) */}
          <div ref={setItemRef(4)} className="col-span-2 md:col-span-3 aspect-[21/9] relative bg-[#fdfbf7] p-3 md:p-4 shadow-[0_5px_15px_rgba(0,0,0,0.08)] transform rotate-1 mt-8 md:mt-0 md:-mb-24 z-30">
             {/* Binder Clip */}
             <div className="absolute -top-3 left-[20%] w-8 h-4 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-md shadow-sm z-20" />
             <div className="absolute -top-1 left-[20%] w-4 h-6 border-2 border-gray-400 rounded-full z-10" />
             
             <div className="relative w-full h-full overflow-hidden border border-black/10">
              <Image src="/editorial-food-1.png" alt="Archive 4" fill sizes="(max-width: 768px) 100vw, 75vw" className="object-cover" decoding="async" loading="lazy" />
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[9px] uppercase tracking-widest text-black/60 bg-white/80 px-2 py-1">ARCHIVE.1989</div>
          </div>

        </div>
      </div>
    </section>
  );
});

export default GalleryArchive;
