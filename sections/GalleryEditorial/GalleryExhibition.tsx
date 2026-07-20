"use client";

import React, { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

const GalleryExhibition = memo(function GalleryExhibition() {
  const containerRef = useRef<HTMLElement>(null);
  const breakTextRef = useRef<HTMLHeadingElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

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

      // Solitary Frame Entrance
      if (frameRef.current) {
        gsap.fromTo(frameRef.current,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: frameRef.current,
              start: "top 80%",
              onEnter: () => gsap.set(frameRef.current, { clearProps: "willChange" })
            }
          }
        );
        
        // Very slow drift for the ending
        gsap.to(frameRef.current, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: frameRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onEnter: () => gsap.set(frameRef.current, { willChange: "transform" }),
            onLeave: () => gsap.set(frameRef.current, { willChange: "auto" }),
            onEnterBack: () => gsap.set(frameRef.current, { willChange: "transform" }),
            onLeaveBack: () => gsap.set(frameRef.current, { willChange: "auto" }),
          }
        });
      }

      // Final Text Reveal
      if (finalRef.current) {
        gsap.fromTo(finalRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 2.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: finalRef.current,
              start: "top 70%",
            }
          }
        );
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden content-visibility-auto">
      
      {/* Editorial Break */}
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h2 ref={breakTextRef} className="font-serif text-3xl md:text-5xl italic opacity-80 text-center tracking-wide">
          The Sound<br />Of Service.
        </h2>
      </div>

      {/* The Final Exhibition Content */}
      <div className="relative w-full flex flex-col justify-start items-center pb-32">
        
        {/* Solitary Brass Framed Photograph */}
        <div className="w-full min-h-screen flex items-center justify-center">
          <div ref={frameRef} className="relative w-[60%] md:w-[30%] aspect-[3/4] group will-change-[transform,opacity]">
            
            {/* Brass Frame */}
            <div className="absolute inset-[-15px] border-[12px] border-[#c5a059] bg-[#1a1a1a] shadow-[0_30px_60px_rgba(0,0,0,0.3)] z-0 rounded-sm overflow-hidden">
              {/* Brass metallic reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/40 mix-blend-overlay" />
            </div>
            
            <div className="relative w-full h-full overflow-hidden z-10 m-2 border border-white/20">
              <Image 
                src="https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=800" 
                alt="Evening Service" 
                fill 
                sizes="(max-width: 768px) 60vw, 30vw" 
                className="object-cover sepia-[0.3] brightness-90 transition-all duration-1000 group-hover:brightness-100 group-hover:scale-105" 
                decoding="async" 
                loading="lazy" 
              />
            </div>

            <p className="absolute -bottom-16 right-0 font-mono text-[9px] uppercase tracking-widest text-[#322A26]/60 text-right">
              Evening Service<br />
              <span className="italic">Shared Moments</span>
            </p>
          </div>
        </div>

        {/* Final Outro Screen */}
        <div ref={finalRef} className="w-full min-h-[80vh] flex flex-col items-center justify-center mt-32 px-6">
          <h3 className="font-serif text-4xl md:text-6xl text-center leading-[1.2] tracking-tighter opacity-90">
            Thank you<br />
            <span className="italic">for sharing</span><br />
            our table.
          </h3>
          
          <Link href="/visit" className="mt-16 group relative overflow-hidden rounded-full border border-current px-8 py-4 text-xs uppercase tracking-widest transition-colors duration-500 hover:bg-[#322A26] hover:text-[#F8F4ED]">
            <span className="relative z-10">Visit Maurya</span>
          </Link>
        </div>

      </div>
    </section>
  );
});

export default GalleryExhibition;
