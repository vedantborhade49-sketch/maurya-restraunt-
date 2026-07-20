"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MarginNote } from "@/components/MicroArtifacts";

export default function Chapter04() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile entrance reveals without pinning
        gsap.fromTo(imageRef.current,
          { clipPath: "inset(20% 20% 20% 20%)", scale: 1.1 },
          { 
            clipPath: "inset(0% 0% 0% 0%)", 
            scale: 1, 
            duration: 1.2, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%"
            }
          }
        );

        const lines = gsap.utils.toArray<HTMLElement>(".reveal-line");
        gsap.fromTo(lines,
          { yPercent: 50, opacity: 0 },
          { 
            yPercent: 0, 
            opacity: 1, 
            stagger: 0.15, 
            duration: 1.0, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 85%"
            }
          }
        );

        gsap.fromTo(".reveal-accent",
          { opacity: 0, scale: 0.95 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.8, 
            scrollTrigger: {
              trigger: ".reveal-accent",
              start: "top 90%"
            }
          }
        );
        return;
      }
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: "+=150%",
          scrub: 1,
        }
      });

      // Initially, the image is hidden behind a clip-path mask
      gsap.set(imageRef.current, { 
        clipPath: "inset(50% 50% 50% 50%)",
        scale: 1.2,
        filter: "brightness(0.3) saturate(0)" 
      });

      // Initially, text is hidden (translated down)
      const lines = gsap.utils.toArray<HTMLElement>(".reveal-line");
      gsap.set(lines, { yPercent: 100, opacity: 0 });
      gsap.set(".reveal-accent", { opacity: 0, scale: 0.9 });

      // Animate the mask opening
      tl.to(imageRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        filter: "brightness(1) saturate(1.2)",
        duration: 2,
        ease: "power3.inOut"
      }, 0);

      // Animate the text revealing slowly as the mask opens
      tl.to(lines, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1.5,
        ease: "power2.out"
      }, 0.5);

      tl.to(".reveal-accent", {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }, 1);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={`relative w-full material-dark text-[#F8F5EF] overflow-hidden z-20 flex flex-col items-center justify-center ${isMobile ? "h-auto py-16" : "h-screen"}`}>
      
      {/* Depth Vignette & Brass Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#472020]/40 via-transparent to-[#161413]/90 pointer-events-none z-10" />

      {/* Hero Object / Visual */}
      <div className={isMobile ? "relative w-full h-[40vh] mt-8 z-0 overflow-hidden container-maurya" : "absolute inset-0 flex items-center justify-center z-0 overflow-hidden"}>
        <div ref={imageRef} className={isMobile ? "w-full h-full relative" : "w-[100vw] h-[100vh] md:w-[60vw] md:h-[80vh] relative"}>
          <img 
            src="/editorial-spices.png" 
            alt="The Craft" 
            className="w-full h-full object-cover sepia-[20%]"
          />
          {/* Gradient overlay on the image to help text pop */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1414] via-[#1C1414]/30 to-transparent" />
        </div>
      </div>

      {/* Typography and Layout */}
      <div className={`relative z-20 container-maurya flex flex-col items-center text-center ${isMobile ? "mt-8" : "mt-32 md:mt-48"}`}>
        
        <div className="content-grid flex flex-col items-center">
          <div className="reveal-accent mb-6 md:mb-12">
            <MarginNote text="Act II — The Craft" className="text-[#9A5C3B]" rotate="0deg" />
            <div className="w-[1px] h-12 bg-[#9A5C3B]/40 mx-auto mt-4"></div>
          </div>

          <h2 ref={headlineRef} className={`font-heading leading-[0.85] tracking-tight uppercase overflow-hidden ${isMobile ? "text-[10vw]" : "text-[12vw] md:text-[8vw]"}`}>
            <div className="reveal-line">Every Plate Begins</div>
            <div className="reveal-line italic text-[#9A5C3B]">Long Before It</div>
            <div className="reveal-line">Reaches Your Table</div>
          </h2>
          
          <div className="mt-8 overflow-hidden max-w-[420px] mx-auto">
            <p className="reveal-line font-sans text-[14px] md:text-[16px] text-[#F8F5EF]/75 leading-relaxed">
              The foundation of our cuisine isn't just a recipe. It's the hands that roll the dough, the patience required for overnight slow-cooking, and the uncompromising selection of whole spices.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}
