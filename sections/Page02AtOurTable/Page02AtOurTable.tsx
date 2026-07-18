"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SteamMotif from "@/components/SteamMotif";

export default function Page02AtOurTable() {
  const containerRef = useRef<HTMLElement>(null);
  
  const spread01Ref = useRef<HTMLDivElement>(null);
  const spread01ImgRef = useRef<HTMLImageElement>(null);
  
  const spread02Ref = useRef<HTMLDivElement>(null);
  const spread03Ref = useRef<HTMLDivElement>(null);
  const spread04Ref = useRef<HTMLDivElement>(null);
  const spread05Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      
      // Spread 01: Slow scale down as it leaves the viewport
      if (spread01ImgRef.current) {
        gsap.to(spread01ImgRef.current, {
          scale: 0.85,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: spread01Ref.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // Spread 02 Reveal
      if (spread02Ref.current) {
        const img = spread02Ref.current.querySelector(".spread-img");
        const content = spread02Ref.current.querySelector(".spread-content");
        
        gsap.fromTo(img, 
          { y: 100, scale: 1.05 },
          { y: 0, scale: 1, duration: 2, ease: "power2.out", 
            scrollTrigger: { trigger: spread02Ref.current, start: "top 80%" } 
          }
        );
        gsap.fromTo(content,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.5, delay: 0.4, ease: "power2.out",
            scrollTrigger: { trigger: spread02Ref.current, start: "top 70%" }
          }
        );
      }

      // Spread 03 Reveal (Whitespace rhythm)
      if (spread03Ref.current) {
        const img = spread03Ref.current.querySelector(".spread-img");
        const text = spread03Ref.current.querySelector(".spread-text");
        
        gsap.fromTo(img,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 2, ease: "power1.inOut",
            scrollTrigger: { trigger: spread03Ref.current, start: "top 75%" }
          }
        );
        gsap.fromTo(text,
          { opacity: 0 },
          { opacity: 1, duration: 2, delay: 0.8, ease: "power1.inOut",
            scrollTrigger: { trigger: spread03Ref.current, start: "top 60%" }
          }
        );
      }

      // Spread 04 Reveal (Birthday)
      if (spread04Ref.current) {
        const img = spread04Ref.current.querySelector(".spread-img");
        
        gsap.fromTo(img,
          { y: 50, filter: "brightness(0.8)" },
          { y: 0, filter: "brightness(1)", duration: 2.5, ease: "power1.out",
            scrollTrigger: { trigger: spread04Ref.current, start: "top 85%" }
          }
        );
      }

      // Spread 05 Reveal (Quiet Ending)
      if (spread05Ref.current) {
        const img = spread05Ref.current.querySelector(".spread-img");
        const text = spread05Ref.current.querySelector(".spread-text");
        
        gsap.fromTo(img,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 2, ease: "power2.out",
            scrollTrigger: { trigger: spread05Ref.current, start: "top 90%" }
          }
        );
        gsap.fromTo(text,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 1.5, delay: 0.5, ease: "power2.out",
            scrollTrigger: { trigger: spread05Ref.current, start: "top 80%" }
          }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#F8F5EF] text-[#272322] overflow-hidden">
      
      {/* SPREAD 01: 100vh Full Bleed */}
      <div ref={spread01Ref} className="relative w-full h-[100dvh] overflow-hidden bg-[#272322]">
        <img 
          ref={spread01ImgRef}
          src="/editorial-food-1.png" 
          alt="Hands tearing fresh naan" 
          className="absolute inset-0 w-full h-full object-cover object-center origin-center"
        />
        {/* Very subtle steam rising from the bottom */}
        <SteamMotif className="opacity-50 mix-blend-screen" />
        
        {/* Typography sitting directly on photograph */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2 className="font-heading text-4xl md:text-6xl text-[#F8F5EF] tracking-tight mix-blend-overlay opacity-90 drop-shadow-sm">
            Meals begin together.
          </h2>
        </div>
      </div>

      {/* SPREAD 02: 65% Image, Asymmetric */}
      <div ref={spread02Ref} className="relative w-full min-h-screen py-32 md:py-48 px-6 md:px-12 max-w-[1600px] mx-auto flex items-center">
        <div className="w-full flex flex-col md:flex-row gap-12 md:gap-24 items-center md:items-start">
          
          <div className="w-full md:w-[65%] overflow-hidden bg-[#e8e4db] aspect-[3/4] md:aspect-auto md:h-[85vh]">
            <img 
              src="/editorial-food-2.png" 
              alt="Paneer arriving at the table"
              className="spread-img w-full h-full object-cover origin-bottom"
            />
          </div>
          
          <div className="spread-content w-full md:w-[35%] flex flex-col justify-center h-full pt-8 md:pt-[20vh] pr-4 md:pr-12">
            <p className="font-sans text-lg md:text-xl text-[#272322]/85 leading-[1.6] max-w-[320px]">
              When the paneer arrives, conversations pause. It is a moment of pure anticipation, passed hand to hand until everyone is served.
            </p>
            <div className="mt-16 md:mt-32">
              <span className="font-mono text-[10px] text-[#A56A43] tracking-[0.2em] mb-4 block">
                ★★★★★
              </span>
              <p className="font-serif italic text-2xl md:text-3xl text-[#4a503d] leading-snug">
                "Still our Sunday tradition."
              </p>
            </div>
          </div>
          
        </div>
      </div>

      {/* SPREAD 03: Mostly Whitespace, Dramatic Close-up */}
      <div ref={spread03Ref} className="relative w-full min-h-[110vh] flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-[600px] mx-auto flex flex-col items-center">
          <div className="relative w-full aspect-square md:aspect-[4/5] bg-[#e8e4db] overflow-hidden mb-16">
            <img 
              src="/editorial-process.png" 
              alt="Tea pouring"
              className="spread-img w-full h-full object-cover"
            />
            <SteamMotif className="opacity-40 mix-blend-screen" />
          </div>
          <p className="spread-text font-sans text-[13px] md:text-[15px] tracking-wide text-[#272322]/60 uppercase text-center">
            Patience poured into a cup.
          </p>
        </div>
      </div>

      {/* SPREAD 04: Birthday Celebration */}
      <div ref={spread04Ref} className="relative w-full min-h-screen py-24 md:py-32 px-6 md:px-16 flex items-center justify-center bg-[#F8F5EF]">
        <div className="w-full max-w-[1400px] aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-[#272322]">
          <img 
            src="/editorial-food-4.png" 
            alt="A family birthday moment"
            className="spread-img w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* SPREAD 05: Quiet Ending */}
      <div ref={spread05Ref} className="relative w-full min-h-screen flex flex-col items-center justify-end pb-32 md:pb-48 px-6">
        
        <div className="spread-text text-center mb-16 md:mb-24 z-10">
          <h2 className="font-serif italic text-3xl md:text-5xl text-[#272322]/90">
            A satisfied finish.
          </h2>
        </div>

        <div className="w-full max-w-[900px] mx-auto aspect-[3/2] overflow-hidden bg-[#e8e4db]">
          <img 
            src="/editorial-food-5.png" 
            alt="Used plates and empty tables"
            className="spread-img w-full h-full object-cover object-center"
          />
        </div>
        
      </div>

    </section>
  );
}
