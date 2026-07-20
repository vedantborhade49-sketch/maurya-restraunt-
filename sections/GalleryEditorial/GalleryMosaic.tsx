"use client";

import React, { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const GalleryMosaic = memo(function GalleryMosaic() {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      
      // Batch reveal to save performance
      ScrollTrigger.batch(itemsRef.current, {
        start: "top 85%",
        once: true,
        onEnter: (elements) => {
          gsap.fromTo(elements,
            { y: 50, opacity: 0, scale: 1.06, clipPath: "inset(100% 0 0 0)" },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              clipPath: "inset(0% 0 0 0)",
              duration: 1.5,
              ease: "power4.out",
              stagger: 0.15,
              onComplete: () => {
                gsap.set(elements, { clearProps: "clipPath,willChange" });
              }
            }
          );
        },
        onLeave: () => {
          ScrollTrigger.getAll().forEach(t => {
            if (itemsRef.current.includes(t.vars.trigger as HTMLDivElement)) t.kill();
          });
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const setItemRef = (index: number) => (el: HTMLDivElement | null) => {
    itemsRef.current[index] = el!;
  };

  return (
    <section ref={containerRef} className="relative w-full bg-transparent py-32 px-4 md:px-12 content-visibility-auto [contain-intrinsic-size:1000px]">
      
      <div className="relative w-full max-w-[1600px] mx-auto z-10 flex flex-col md:flex-row gap-6 md:gap-12">
        
        {/* Column 1 */}
        <div className="w-full md:w-1/3 flex flex-col gap-12 mt-12 md:mt-24">
          <div ref={setItemRef(0)} className="w-full aspect-[3/4] relative group hover-reveal">
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm shadow-xl p-4 transform transition-transform duration-700 group-hover:scale-[1.02]">
              <div className="relative w-full h-full overflow-hidden border border-black/5">
<Image src="/editorial-food-4.png" alt="Gallery Image" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" decoding="async" loading="lazy" />
              </div>
            </div>
          </div>
          
          <div ref={setItemRef(1)} className="w-full aspect-square relative group hover-reveal">
            <div className="w-full h-full relative overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
<Image src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1000&auto=format&fit=crop" alt="Gallery Image" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" decoding="async" loading="lazy" />
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest opacity-60 mt-4 text-right transition-transform duration-500 group-hover:-translate-y-1">The Evening Preparation</p>
          </div>
        </div>

        {/* Column 2 (Offset upwards) */}
        <div className="w-full md:w-1/3 flex flex-col gap-12">
          <div ref={setItemRef(2)} className="w-full aspect-[4/5] relative group hover-reveal">
            <div className="w-full h-full relative overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
<Image src="/editorial-food-2.png" alt="Gallery Image" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" decoding="async" loading="lazy" />
            </div>
          </div>

          <div ref={setItemRef(3)} className="w-full aspect-[3/4] relative group px-6 hover-reveal">
            <h3 className="font-serif italic text-3xl md:text-5xl opacity-80 mb-8 leading-tight">
              "We eat first with our eyes, then with our hearts."
            </h3>
            <div className="w-full aspect-[4/3] bg-white/50 backdrop-blur-sm shadow-lg p-3 transform rotate-2 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-[1.02]">
              <div className="relative w-full h-full overflow-hidden border border-black/5">
<Image src="/editorial-food-1.png" alt="Gallery Image" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" decoding="async" loading="lazy" />
              </div>
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="w-full md:w-1/3 flex flex-col gap-12 mt-24 md:mt-48">
          <div ref={setItemRef(4)} className="w-full aspect-square relative group hover-reveal">
            <div className="w-full h-full relative overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
<Image src="/editorial-food-3.png" alt="Gallery Image" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" decoding="async" loading="lazy" />
            </div>
          </div>

          <div ref={setItemRef(5)} className="w-full aspect-[2/3] relative group hover-reveal">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="w-full h-full relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-transform duration-700 group-hover:scale-[1.02]">
<Image src="https://images.unsplash.com/photo-1414235077428-9710c28afbb3?q=80&w=1000&auto=format&fit=crop" alt="Gallery Image" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" decoding="async" loading="lazy" />
            </div>
            <div className="absolute bottom-6 left-6 z-20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform translate-y-4 group-hover:translate-y-0">
              <span className="font-mono text-[9px] uppercase tracking-widest block mb-2 text-white/80">08:00 PM</span>
              <span className="font-serif italic text-xl">The Dining Room</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
});

export default GalleryMosaic;
