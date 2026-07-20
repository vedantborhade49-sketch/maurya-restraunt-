"use client";

import React, { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

const GalleryStatement = memo(function GalleryStatement() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      
      // Image clip-path reveal and scale down on scroll
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { scale: 1.1, clipPath: "inset(100% 0 0 0)" },
          {
            scale: 1,
            clipPath: "inset(0% 0 0 0)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom top",
              scrub: 1,
              onEnter: () => gsap.set(imageRef.current, { willChange: "transform" }),
              onLeave: () => gsap.set(imageRef.current, { willChange: "auto" }),
              onEnterBack: () => gsap.set(imageRef.current, { willChange: "transform" }),
              onLeaveBack: () => gsap.set(imageRef.current, { willChange: "auto" }),
            }
          }
        );
      }

      // Text reveal
      if (textRef.current) {
        gsap.fromTo(textRef.current,
          { opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
            }
          }
        );
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-transparent flex flex-col items-center justify-center overflow-hidden content-visibility-auto [contain-intrinsic-size:100vh]">
      
      {/* Hero Image */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
         <Image 
           ref={imageRef}
           src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2500&auto=format&fit=crop" 
           alt="The Maurya Evening" 
           fill 
           sizes="100vw"
           className="object-cover opacity-60 mix-blend-luminosity sepia-[0.4]"
           decoding="async"
           loading="lazy"
         />
         {/* Dark Gradient Overlay for Text Readability - Olive green base */}
         <div className="absolute inset-0 bg-gradient-to-t from-[#273128]/90 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] px-6 text-center mt-32">
        <h2 ref={textRef} className="font-serif text-5xl md:text-8xl leading-[1.1] tracking-tight mb-16">
          <span className="italic opacity-80">Experience</span><br />
          the evening.
        </h2>

        <Link href="/visit" className="group inline-flex flex-col items-center gap-3 cursor-pointer hover-reveal">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            Plan Your Visit
          </span>
          <div className="w-full h-[1px] bg-current opacity-30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-current transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          </div>
        </Link>
      </div>

    </section>
  );
});

export default GalleryStatement;
