"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Link from "next/link";

export default function TheLongTable() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const breathingRef = useRef<HTMLDivElement>(null);
  const shadowLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. HUMAN CAMERA BREATHING (Micro-drift, hesitation, non-linear)
      gsap.to(breathingRef.current, {
        y: 10,
        x: -5,
        rotationZ: 0.2,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

      // 2. THE DOCUMENTARY SCRUB TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=700%", 
          scrub: 2, // Very soft scrub
          pin: true,
        }
      });

      // Camera glides organically over the continuous visual river
      // Instead of harsh stops, we use sine easings to create 'hesitations'
      tl.to(canvasRef.current, {
        x: "-10vw", y: "-30vh", scale: 1.02, rotationZ: -0.5,
        ease: "power1.inOut", duration: 1.5
      })
      .to(canvasRef.current, {
        x: "-25vw", y: "-70vh", scale: 0.98, rotationZ: 0.5,
        ease: "sine.inOut", duration: 1.5
      })
      .to(canvasRef.current, {
        x: "-45vw", y: "-130vh", scale: 1.05, rotationZ: -0.2,
        ease: "power2.inOut", duration: 2
      })
      .to(canvasRef.current, {
        x: "-30vw", y: "-180vh", scale: 1.01, rotationZ: 0.3,
        ease: "sine.inOut", duration: 1.5
      })
      .to(canvasRef.current, {
        x: "-40vw", y: "-240vh", scale: 1, rotationZ: 0,
        ease: "power3.inOut", duration: 2.5
      });

      // PAUSE for emotional impact at the end setting
      tl.to({}, { duration: 1 }); 

      // Fade in typography silently
      tl.to(".final-typography", { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" });

      // 3. LIGHT & SHADOW EVOLUTION
      // As time passes (scroll progresses), the global shadow angle shifts,
      // simulating the sun moving across the room.
      gsap.to(shadowLayerRef.current, {
        x: 40, // Shadows grow longer to the right
        y: 20, 
        opacity: 0.8, // Shadows deepen in the evening
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=700%",
          scrub: true
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#0A0705] overflow-hidden">
      
      {/* BREATHING WRAPPER */}
      <div ref={breathingRef} className="absolute inset-0 w-full h-full transform-gpu origin-center">
        
        {/* THE CAMERA CANVAS */}
        <div ref={canvasRef} className="absolute top-0 left-0 w-[150vw] h-[350vh] transform-gpu origin-center">
          
          {/* THE WALNUT TABLE BACKGROUND */}
          <div className="absolute inset-0 w-full h-full bg-[#1F140E] opacity-95 mix-blend-multiply">
            <ImagePlaceholder 
              category="The Table" 
              description="Deep walnut wood. Natural knots. Oil finish. Micro scratches." 
              aspectRatio="h-full" 
            />
          </div>

          {/* DYNAMIC SHADOW LAYER (Moves on scroll) */}
          <div ref={shadowLayerRef} className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-50 z-[5]">
             {/* Complex shadow gradients will be applied per-object relative to this shifting layer if needed, 
                 but to keep it performant, we use CSS drop shadows mostly, and rely on this for ambient occlusion shifts */}
          </div>


          {/* =========================================================================
              THE VISUAL RIVER (Overlapping Continuous Narrative)
          ========================================================================= */}
          
          {/* Object Cluster 1: Faded Flowers -> Old Receipt */}
          <div className="absolute top-[5vh] left-[10vw] w-[30vw] h-[30vh] z-10 brightness-110">
            {/* Soft flower petals scattered */}
            <div className="absolute top-0 right-10 w-[8vw] h-[8vw] bg-[#8C5E3C]/40 rounded-full blur-[8px] mix-blend-multiply" />
            
            {/* Vintage Handwritten Note (2005) tucked under petals */}
            <div className="absolute top-10 left-10 bg-[#E8E1D5] w-[18vw] p-8 -rotate-3 shadow-[15px_20px_40px_rgba(10,5,3,0.5)] border-[0.5px] border-[#D4A373]/20">
              <p className="font-serif italic text-2xl text-[#2B231F] opacity-90 leading-relaxed">
                "We celebrated our first anniversary here in 2005. The taste has never changed."
              </p>
            </div>
            
            {/* Spoon pointing downwards to the next cluster */}
            <div className="absolute -bottom-8 right-0 w-[4vw] h-[12vw] bg-white/5 border border-white/10 rounded-full rotate-[160deg] shadow-[5px_10px_20px_rgba(0,0,0,0.4)] backdrop-blur-sm pointer-events-none" />
          </div>

          {/* Object Cluster 2: Dessert Plate -> Google Stationery -> Polaroids */}
          <div className="absolute top-[28vh] left-[25vw] w-[45vw] h-[45vh] z-20 brightness-110">
            {/* Half-finished Dessert Plate overlapping stationery */}
            <div className="absolute top-0 left-[10%] w-[16vw] h-[16vw] rounded-full bg-[#1A120F] shadow-[inset_0_5px_15px_rgba(255,255,255,0.1),_20px_30px_50px_rgba(0,0,0,0.8)] z-30 opacity-90" />
            
            {/* Google Review printed on Restaurant Stationery */}
            <div className="absolute top-[10%] left-[20%] bg-[#FCF8F2] w-[22vw] p-8 rotate-2 shadow-[20px_30px_60px_rgba(10,5,3,0.6)] border-l-[3px] border-[#D4A373]/40 z-20">
              <span className="font-mono text-[6px] uppercase tracking-[0.4em] text-[#D4A373] block mb-3 font-bold">Google Review</span>
              <div className="flex gap-1 mb-3 text-[#D4A373] text-[7px]">★★★★★</div>
              <h3 className="font-serif text-xl text-[#2B231F] leading-snug">
                "Every birthday ends here. We wouldn't have it any other way."
              </h3>
            </div>

            {/* Overlapping Family Polaroid */}
            <div className="absolute bottom-[5%] right-[5%] w-[18vw] aspect-square bg-[#FAFAFA] p-2 pb-6 shadow-[25px_35px_60px_rgba(10,5,3,0.7)] -rotate-[6deg] z-10">
              <div className="w-full h-full bg-[#3A261D] opacity-80 blur-[1px]">
                <ImagePlaceholder category="Memory" description="Blurred family blowing out candles." aspectRatio="h-full" />
              </div>
            </div>
          </div>

          {/* Embedded Brass Plaque (Google) */}
          <div className="absolute top-[60vh] left-[60vw] w-[14vw] h-[8vw] bg-gradient-to-br from-[#8C5E3C] via-[#C59B76] to-[#5C3A21] rounded-[2px] shadow-[-2px_-2px_4px_rgba(255,255,255,0.1),_15px_20px_40px_rgba(10,5,3,0.8)] p-[1px] -rotate-1 z-0">
            <div className="w-full h-full bg-gradient-to-br from-[#A67B5B] to-[#7A5035] flex flex-col items-center justify-center border-[0.5px] border-[#C59B76]/30">
              <span className="font-serif text-xl text-[#2A1B0E] font-bold tracking-widest uppercase opacity-85 mix-blend-color-burn">Google</span>
              <span className="font-serif text-3xl italic text-[#2A1B0E] opacity-95 mix-blend-color-burn my-1">4.5★</span>
              <span className="font-mono text-[6px] uppercase tracking-[0.4em] text-[#2A1B0E] opacity-80 mix-blend-color-burn font-bold">888 Reviews</span>
            </div>
          </div>

          {/* Object Cluster 3: Reading Glasses -> Delivery Bag -> Swiggy Receipt */}
          <div className="absolute top-[85vh] left-[15vw] w-[50vw] h-[40vh] z-10 brightness-110">
            {/* Reading glasses creating light refraction */}
            <div className="absolute top-[10%] left-[45%] w-[10vw] h-[4vw] border-[2px] border-white/10 rounded-full rotate-[25deg] shadow-[10px_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md z-30" />

            {/* Delivery Bag Texture (Large overlapping shadow creator) */}
            <div className="absolute top-[20%] left-[10%] w-[22vw] h-[26vw] bg-[#A67B5B]/20 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] blur-[4px] rotate-[-4deg] z-0" />

            {/* Swiggy receipt folded and resting on bag */}
            <div className="absolute top-[30%] left-[20%] bg-[#FCFAF6] w-[14vw] p-5 rotate-4 shadow-[10px_20px_40px_rgba(10,5,3,0.6)] border-b-[2px] border-dashed border-[#8C5E3C]/30 z-20">
               <div className="absolute inset-x-0 top-1/2 h-px bg-[#8C5E3C]/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)]" /> {/* Fold crease */}
              <span className="font-mono text-[6px] uppercase tracking-[0.3em] text-[#D4A373] block mb-2 font-bold">Swiggy</span>
              <div className="flex gap-1 mb-2 text-[#D4A373] text-[7px]">★★★★★</div>
              <p className="font-serif italic text-sm text-[#2B231F] leading-tight opacity-90">
                "The Dal Makhani arrived piping hot. Perfect for a rainy afternoon."
              </p>
            </div>
          </div>

          {/* Object Cluster 4: Copper Bowl -> Child's Drawing -> Zomato Plate */}
          <div className="absolute top-[130vh] left-[45vw] w-[55vw] h-[55vh] z-30 brightness-110">
            {/* Copper Bowl intersecting the drawing */}
            <div className="absolute top-[10%] left-[10%] w-[16vw] h-[16vw] rounded-full bg-gradient-to-br from-[#D4A373] via-[#8C5E3C] to-[#3A261D] shadow-[-15px_25px_50px_rgba(10,5,3,0.9),_inset_0_5px_15px_rgba(255,255,255,0.2)] z-30 flex items-center justify-center">
               <div className="w-[14vw] h-[14vw] rounded-full bg-[#1F140E] shadow-[inset_0_15px_30px_rgba(0,0,0,0.95)] opacity-80" />
            </div>

            {/* Child's drawing partially hidden under bowl */}
            <div className="absolute top-[20%] left-[22%] bg-[#FFFDF9] w-[18vw] p-4 rotate-[-6deg] shadow-[20px_30px_50px_rgba(10,5,3,0.6)] z-20">
              <div className="w-full aspect-[4/3] border border-[#1F1F1F]/10 opacity-60">
                 <ImagePlaceholder category="Memory" description="Crayon sketch." aspectRatio="h-full" />
              </div>
              <p className="font-mono text-[8px] text-[#2B231F]/80 mt-3 handwriting-simulated leading-loose">
                "To the nice uncle who gave me ice cream."
              </p>
            </div>

            {/* Heavy Card Zomato Review tucked under drawing */}
            <div className="absolute top-[40%] left-[35%] bg-[#1A120F] w-[20vw] p-8 rotate-[3deg] shadow-[25px_35px_60px_rgba(10,5,3,0.8)] border-[0.5px] border-[#D4A373]/20 z-10">
              <span className="font-mono text-[6px] uppercase tracking-[0.3em] text-[#D4A373] block mb-3 font-bold">Zomato</span>
              <div className="flex gap-1 mb-3 text-[#D4A373] text-[8px]">★★★★☆</div>
              <h3 className="font-serif text-xl text-[#F9F6F0] leading-snug opacity-90">
                "Sunday lunch here is a non-negotiable family ritual."
              </h3>
            </div>
          </div>

          {/* Embedded Brass Plaque (Zomato & Swiggy Combined) */}
          <div className="absolute top-[190vh] left-[25vw] w-[22vw] h-[12vw] bg-gradient-to-br from-[#8C5E3C] via-[#C59B76] to-[#5C3A21] rounded-[2px] shadow-[-2px_-2px_4px_rgba(255,255,255,0.1),_20px_30px_50px_rgba(10,5,3,0.8)] p-[1px] rotate-2 z-0">
            <div className="w-full h-full bg-gradient-to-br from-[#A67B5B] to-[#7A5035] flex items-center justify-center border-[0.5px] border-[#C59B76]/30 px-6 gap-6">
               <div className="flex flex-col items-center">
                  <span className="font-serif text-lg text-[#2A1B0E] font-bold tracking-widest uppercase opacity-85 mix-blend-color-burn mb-1">Zomato</span>
                  <span className="font-serif text-2xl italic text-[#2A1B0E] opacity-95 mix-blend-color-burn">4.2★</span>
               </div>
               <div className="w-px h-[60%] bg-[#2A1B0E]/20" />
               <div className="flex flex-col items-center">
                  <span className="font-serif text-lg text-[#2A1B0E] font-bold tracking-widest uppercase opacity-85 mix-blend-color-burn mb-1">Swiggy</span>
                  <span className="font-serif text-2xl italic text-[#2A1B0E] opacity-95 mix-blend-color-burn">4.5★</span>
               </div>
            </div>
          </div>


          {/* =========================================================================
              THE FINAL MOMENT
              Silent, warm evening light, empty place setting. 
              Typography delays before appearing.
          ========================================================================= */}
          <div className="absolute top-[260vh] left-[50vw] -translate-x-1/2 w-[70vw] flex flex-col items-center z-40 brightness-110">
            
            <div className="relative w-full aspect-[21/9] mb-16 shadow-[0_100px_200px_rgba(5,2,1,0.95)] border border-[#D4A373]/5 bg-[#0A0705]">
              <ImagePlaceholder 
                category="Setting" 
                description="One folded napkin. One copper plate. Fresh flower. Glass of water. Warm evening light." 
                aspectRatio="h-full" 
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_10%,rgba(5,2,1,0.95)_100%)] pointer-events-none mix-blend-multiply" />
            </div>
            
            {/* Typography that fades in after the long pause */}
            <div className="final-typography opacity-0 translate-y-8 flex flex-col items-center">
              <h2 className="font-serif text-5xl md:text-7xl text-[#F9F6F0] text-center leading-[1.1] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] tracking-tight">
                We've Saved<br />
                <span className="italic text-[#D4A373]">A Place<br />For You.</span>
              </h2>

              <Link 
                href="/menu"
                className="mt-16 group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden transition-all duration-700"
              >
                <div className="absolute bottom-4 left-8 right-8 h-[0.5px] bg-[#D4A373] scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-center" />
                <span className="font-sans text-[8px] uppercase tracking-[0.4em] text-[#D4A373] font-bold transition-all duration-700 relative z-10">
                  Explore the Menu
                </span>
              </Link>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
