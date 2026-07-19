"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialImage from "@/components/EditorialImage";

export default function TheArchive() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // SPREAD 1: The Monolith Parallax
      gsap.fromTo(".spread1-img",
        { y: "-10%", scale: 1.05 },
        { 
          y: "10%", scale: 1, ease: "none",
          scrollTrigger: {
            trigger: ".spread1",
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

      // SPREAD 2: The Constellation Drift
      const tinyImages = gsap.utils.toArray(".spread2-tiny");
      tinyImages.forEach((img: any, i) => {
        const speed = 1 + (i % 3) * 0.5;
        gsap.fromTo(img,
          { y: 150 * speed },
          { 
            y: -150 * speed, ease: "none",
            scrollTrigger: {
              trigger: ".spread2",
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      });

      // SPREAD 3: The Overlap
      gsap.fromTo(".spread3-text",
        { x: -100, opacity: 0 },
        { 
          x: 0, opacity: 1, duration: 1.5, ease: "power3.out",
          scrollTrigger: {
            trigger: ".spread3",
            start: "top 60%"
          }
        }
      );

      // SPREAD 5: The Scrapbook Overlap
      const scrapbookImages = gsap.utils.toArray(".spread5-img");
      gsap.fromTo(scrapbookImages,
        { y: 100, rotateZ: () => gsap.utils.random(-10, 10), opacity: 0 },
        {
          y: 0, rotateZ: () => gsap.utils.random(-3, 3), opacity: 1,
          duration: 1.2, stagger: 0.2, ease: "power2.out",
          scrollTrigger: {
            trigger: ".spread5",
            start: "top 70%"
          }
        }
      );

      // SPREAD 6: The Bleed Clip-Path
      gsap.fromTo(".spread6-bleed",
        { clipPath: "inset(20% 10% 20% 10%)", filter: "brightness(0.5)" },
        {
          clipPath: "inset(0% 0% 0% 0%)", filter: "brightness(1)",
          ease: "none",
          scrollTrigger: {
            trigger: ".spread6",
            start: "top 80%",
            end: "center center",
            scrub: true
          }
        }
      );

      // SPREAD 7: The Detail Rise
      gsap.fromTo(".spread7-text",
        { y: 150, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.5, ease: "power3.out",
          scrollTrigger: {
            trigger: ".spread7",
            start: "top 70%"
          }
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full relative bg-[#F6F1E8]">
      
      {/* 
        =========================================================
        SPREAD 1: THE MONOLITH
        ========================================================= 
      */}
      <section className="spread1 relative w-full min-h-[150vh] flex flex-col items-center justify-center py-40">
        <div className="relative w-[85vw] md:w-[45vw] aspect-[3/4] overflow-hidden shadow-2xl group cursor-none">
          <div className="spread1-img w-full h-[120%] -top-[10%] relative">
            <EditorialImage src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop" alt="The Monolith" priority />
          </div>
          {/* Custom hover interaction */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700 pointer-events-none" />
        </div>
        <div className="absolute bottom-[10%] md:bottom-[20%] left-[10%] md:left-[30%]">
          <span className="font-serif italic text-2xl md:text-3xl text-[#3A0F16]">01.</span>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#1F1F1F]/60 mt-2 max-w-[200px]">
            Morning Light. A Quiet Anticipation.
          </p>
        </div>
      </section>

      {/* 
        =========================================================
        SPREAD 2: THE CONSTELLATION
        ========================================================= 
      */}
      <section className="spread2 relative w-full min-h-[150vh] flex items-center justify-center overflow-hidden">
        
        {/* Giant Quotation */}
        <div className="relative z-0 text-center max-w-[80vw]">
          <h2 className="font-serif text-[12vw] md:text-[8vw] leading-[0.9] text-[#1F1F1F] tracking-tight">
            Before<br />
            <span className="italic text-[#B98555]">The First Guest</span><br />
            Arrives.
          </h2>
        </div>

        {/* 5 Floating Tiny Images */}
        <div className="spread2-tiny absolute top-[10%] left-[5%] md:left-[15%] w-32 md:w-48 aspect-[4/5] shadow-xl p-2 bg-white">
          <div className="relative w-full h-full">
            <EditorialImage src="/editorial-food-1.png" alt="Preparation" />
          </div>
        </div>

        <div className="spread2-tiny absolute top-[30%] right-[10%] md:right-[20%] w-40 md:w-56 aspect-[16/9] shadow-xl p-2 bg-white">
          <div className="relative w-full h-full">
            <EditorialImage src="/editorial-texture.png" alt="Texture" />
          </div>
        </div>

        <div className="spread2-tiny absolute top-[60%] left-[15%] md:left-[25%] w-24 md:w-32 aspect-square shadow-xl p-2 bg-white">
          <div className="relative w-full h-full">
            <EditorialImage src="/editorial-spices.png" alt="Spices" />
          </div>
        </div>

        <div className="spread2-tiny absolute top-[80%] right-[5%] md:right-[30%] w-36 md:w-48 aspect-[3/4] shadow-xl p-2 bg-white">
          <div className="relative w-full h-full">
            <EditorialImage src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop" alt="Details" />
          </div>
        </div>

        <div className="spread2-tiny absolute top-[45%] left-[5%] md:left-[5%] w-48 md:w-64 aspect-[21/9] shadow-xl p-2 bg-white">
          <div className="relative w-full h-full">
            <EditorialImage src="/editorial-food-3.png" alt="Food" />
          </div>
        </div>

      </section>

      {/* 
        =========================================================
        SPREAD 3: THE OVERLAP
        ========================================================= 
      */}
      <section className="spread3 relative w-full min-h-[120vh] flex flex-col justify-center overflow-hidden py-40">
        
        <div className="relative w-[90vw] md:w-[70vw] h-[60vh] md:h-[80vh] ml-auto mr-0 shadow-2xl">
           <EditorialImage src="/editorial-entrance.png" alt="Panoramic Ambience" />
           {/* Dark vignette to make overlapping text pop */}
           <div className="absolute inset-0 bg-gradient-to-r from-[#1A050A]/80 to-transparent mix-blend-multiply pointer-events-none" />
        </div>

        {/* Text breaking boundaries - physically overlapping the image edge */}
        <div className="spread3-text absolute top-[40%] left-[5%] md:left-[10%] z-20">
          <h2 className="font-serif text-[15vw] md:text-[10vw] leading-[0.8] text-[#3A0F16] mix-blend-normal">
            Some<br />
            Places<br />
            <span className="italic text-[#F6F1E8] mix-blend-difference">Become</span><br />
            Tradition.
          </h2>
        </div>

      </section>

      {/* 
        =========================================================
        SPREAD 4: THE VOID (Pure Typography)
        ========================================================= 
      */}
      <section className="relative w-full min-h-[100vh] flex items-center justify-center py-40 px-8 text-center bg-[#F6F1E8]">
        <h2 className="font-serif text-5xl md:text-[6vw] leading-[1.2] text-[#1F1F1F] tracking-tight max-w-[1200px]">
          The Warmth Of Sunday.<br />
          <span className="italic text-[#B98555]">Gather. Eat. Stay.</span>
        </h2>
      </section>

      {/* 
        =========================================================
        SPREAD 5: THE SCRAPBOOK
        ========================================================= 
      */}
      <section className="spread5 relative w-full min-h-[150vh] overflow-hidden bg-[#EFE8DB]">
        
        <div className="max-w-[1200px] mx-auto w-full h-full relative py-40">
          
          <div className="spread5-img absolute top-[10%] left-[10%] w-[50vw] md:w-[35vw] aspect-[4/5] bg-white p-3 shadow-[0_30px_60px_rgba(0,0,0,0.15)] z-10 transition-transform hover:z-50 hover:scale-105 duration-500">
             <div className="relative w-full h-full">
               <EditorialImage src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1500&auto=format&fit=crop" alt="Friends" />
             </div>
             <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#1F1F1F]/50 mt-4 px-2">Table 12. Laughter.</p>
          </div>

          <div className="spread5-img absolute top-[30%] right-[5%] md:right-[15%] w-[60vw] md:w-[45vw] aspect-[16/9] bg-white p-3 shadow-[0_40px_80px_rgba(0,0,0,0.2)] z-20 transition-transform hover:z-50 hover:scale-105 duration-500">
             <div className="relative w-full h-full">
               <EditorialImage src="https://images.unsplash.com/photo-1511690655022-07615f124bf0?q=80&w=2000&auto=format&fit=crop" alt="Family" />
             </div>
             <div className="absolute -top-6 -right-6 font-serif italic text-4xl text-[#B98555]/80 pointer-events-none -rotate-12">
               Forever.
             </div>
          </div>

          <div className="spread5-img absolute top-[60%] left-[20%] md:left-[30%] w-[45vw] md:w-[25vw] aspect-square bg-[#F6F1E8] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.1)] z-30 transition-transform hover:z-50 hover:scale-105 duration-500 border border-[#3A0F16]/10">
             <div className="relative w-full h-full">
               <EditorialImage src="/editorial-food-4.png" alt="Dish" />
             </div>
             <p className="font-serif italic text-lg text-center mt-4 text-[#3A0F16]">A memory preserved.</p>
          </div>

        </div>
      </section>

      {/* 
        =========================================================
        SPREAD 6: THE BLEED
        ========================================================= 
      */}
      <section className="spread6 relative w-full h-[120vh] bg-[#111111] overflow-hidden">
        <div className="spread6-bleed w-full h-full relative">
          <EditorialImage src="https://images.unsplash.com/photo-1414235077428-9710c28afbb3?q=80&w=2500&auto=format&fit=crop" alt="Enormous Bleed" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-overlay">
          <h2 className="font-serif text-[20vw] md:text-[15vw] text-white opacity-20 tracking-tighter">
            TEXTURE
          </h2>
        </div>
      </section>

      {/* 
        =========================================================
        SPREAD 7: THE DETAIL
        ========================================================= 
      */}
      <section className="spread7 relative w-full min-h-[120vh] flex flex-col md:flex-row items-center justify-center gap-12 px-8 py-40">
        
        <div className="w-48 md:w-64 aspect-[3/4] bg-white p-2 shadow-2xl rotate-[-2deg]">
          <div className="relative w-full h-full">
             <EditorialImage src="https://images.unsplash.com/photo-1574484284002-9ae846c48f8f?q=80&w=1500&auto=format&fit=crop" alt="Detail" />
          </div>
        </div>

        <div className="spread7-text flex flex-col mt-12 md:mt-0">
           <h2 className="font-serif text-6xl md:text-8xl leading-none tracking-tight text-[#1F1F1F]">
             It’s All<br />
             <span className="italic text-[#B98555]">In The</span><br />
             Details.
           </h2>
           <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#1F1F1F]/60 mt-12">
             The Final Impression.
           </p>
        </div>

      </section>

    </div>
  );
}
