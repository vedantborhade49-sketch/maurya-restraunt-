"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Chapter03() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── ATMOSPHERIC STEAM REVEAL ─────────────────────────
      // We animate multiple volumetric "steam clouds" drifting 
      // diagonally across the empty paper canvas.
      
      const steamClouds = gsap.utils.toArray<HTMLElement>(".steam-cloud-anim");
      
      steamClouds.forEach((cloud, index) => {
        // Vary speeds and drift distances for organic motion
        const speed = 1.5 + (index * 0.5);
        const yDrift = 80 + (index * 20);
        const xDrift = -60 - (index * 15);

        gsap.fromTo(
          cloud,
          { 
            yPercent: -20, 
            xPercent: 10,
            opacity: 0.8,
            scale: 1 
          },
          {
            yPercent: yDrift,
            xPercent: xDrift,
            opacity: 0, // Dissipates as it drifts away
            scale: 2 + index, // Expands
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: speed,
            }
          }
        );
      });

      // ── TEXT CONDENSATION REVEAL ───────────────────────
      // The text is initially hidden. As the scroll progresses 
      // (and the steam hypothetically passes over it), the text 
      // fades in gently.
      
      const notes = gsap.utils.toArray<HTMLElement>(".kitchen-note");
      notes.forEach((note, index) => {
        gsap.fromTo(
          note,
          { opacity: 0, y: 10 },
          {
            opacity: 0.8,
            y: 0,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: note,
              start: "top 75%", // Triggers when the note enters the view
            }
          }
        );
      });

      // Warm morning light tracking across the paper
      gsap.fromTo(
        ".morning-light",
        { xPercent: -30, opacity: 0 },
        {
          xPercent: 30,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 2,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#F7F3EC" }} // Warm Handmade Paper
    >
      {/* Texture Layer */}
      <div className="texture-ch3-paper" />

      {/* Morning Light Gradient */}
      <div 
        className="morning-light absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(230, 218, 199, 0.4) 0%, transparent 60%)",
        }}
      />

      {/* 
        =========================================
        DESKTOP COMPOSITION 
        =========================================
      */}
      <div className="hidden md:block relative z-10 w-full min-h-[160vh] py-24">
        
        {/* 
          THE SOURCE (Upper Right)
          The image is heavily cropped, acting merely as the origin 
          point for the steam. It bleeds off the edge.
        */}
        <div className="absolute top-0 right-0 w-[45vw] aspect-[4/3] translate-x-[15%] -translate-y-[10%] opacity-90">
          <div className="relative w-full h-full overflow-hidden mask-steam">
            <Image
              src="/editorial-process.png"
              alt="Kitchen Preparation"
              fill
              sizes="50vw"
              className="object-cover object-top grade-ch3-warm"
              priority
            />
            {/* Fade edge into paper */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#F7F3EC]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F7F3EC] via-transparent to-transparent" />
          </div>
        </div>

        {/* 
          THE STEAM VOLUME
          Multiple layers of blurred CSS gradients simulating steam
        */}
        <div className="absolute top-0 right-0 w-full h-screen pointer-events-none z-20">
          <div className="steam-cloud steam-cloud-anim w-[60vw] h-[60vh] top-[10%] right-[-10%]" />
          <div className="steam-cloud steam-cloud-anim w-[80vw] h-[50vh] top-[5%] right-[10%]" style={{ animationDelay: "0.2s" }} />
          <div className="steam-cloud steam-cloud-anim w-[50vw] h-[70vh] top-[-5%] right-[5%]" style={{ animationDelay: "0.5s" }} />
        </div>

        {/* 
          KITCHEN TIMESTAMPS (The Reveal)
          Scattered asymmetrically across the vast negative space.
        */}
        <div className="relative z-30 w-full h-full max-w-[1400px] mx-auto px-16 pt-[40vh]">
          
          {/* Note 1 */}
          <div className="kitchen-note absolute left-[15%] top-[45vh] max-w-[200px]">
            <span className="block font-sans text-[9px] tracking-[0.25em] uppercase text-[#A25F3D] mb-2 border-b border-[#A25F3D]/20 pb-1">
              04:30 AM
            </span>
            <p className="font-heading text-[18px] text-[#6F4B36] italic leading-relaxed">
              The silence of the kitchen before the fire is lit.
            </p>
          </div>

          {/* Note 2 */}
          <div className="kitchen-note absolute left-[35%] top-[85vh] max-w-[240px]">
            <span className="block font-sans text-[9px] tracking-[0.25em] uppercase text-[#A25F3D] mb-2 border-b border-[#A25F3D]/20 pb-1">
              06:15 AM
            </span>
            <p className="font-sans text-[11px] text-[#6F4B36]/80 font-light leading-[2] tracking-wide text-justify">
              Heat transforms everything. Whole spices hit the copper vessel. The air changes instantly. A ritual that refuses to be rushed.
            </p>
          </div>

          {/* Note 3 */}
          <div className="kitchen-note absolute left-[10%] top-[125vh] max-w-[180px]">
            <span className="block font-sans text-[9px] tracking-[0.25em] uppercase text-[#A25F3D] mb-2 border-b border-[#A25F3D]/20 pb-1">
              08:00 AM
            </span>
            <p className="font-heading text-[22px] text-[#6F4B36] leading-tight">
              Reduction.
            </p>
            <span className="block font-sans text-[8px] tracking-[0.1em] text-[#6F4B36]/60 mt-3 uppercase">
              Action / Friction
            </span>
          </div>

        </div>
      </div>

      {/* 
        =========================================
        MOBILE COMPOSITION
        =========================================
      */}
      <div className="block md:hidden relative z-10 w-full min-h-[140vh] pt-12 pb-32 overflow-hidden">
        
        {/* Mobile Source Image */}
        <div className="absolute top-0 right-[-10%] w-[80vw] aspect-square opacity-85">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src="/editorial-process.png"
              alt="Kitchen Preparation"
              fill
              sizes="80vw"
              className="object-cover object-top grade-ch3-warm"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F7F3EC]/50 to-[#F7F3EC]" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#F7F3EC]" />
          </div>
        </div>

        {/* Mobile Steam */}
        <div className="absolute top-0 right-0 w-full h-[80vh] pointer-events-none z-20">
          <div className="steam-cloud steam-cloud-anim w-[120vw] h-[60vh] top-[10%] right-[-20%]" />
        </div>

        {/* Mobile Notes */}
        <div className="relative z-30 flex flex-col gap-32 px-8 pt-[60vh]">
          
          <div className="kitchen-note w-full max-w-[200px]">
            <span className="block font-sans text-[8px] tracking-[0.25em] uppercase text-[#A25F3D] mb-2 border-b border-[#A25F3D]/20 pb-1">
              04:30 AM
            </span>
            <p className="font-heading text-[18px] text-[#6F4B36] italic leading-relaxed">
              The silence before the fire.
            </p>
          </div>

          <div className="kitchen-note w-[85%] self-end">
            <span className="block font-sans text-[8px] tracking-[0.25em] uppercase text-[#A25F3D] mb-2 border-b border-[#A25F3D]/20 pb-1 text-right">
              06:15 AM
            </span>
            <p className="font-sans text-[11px] text-[#6F4B36]/80 font-light leading-[2] tracking-wide text-right">
              Heat transforms everything. Whole spices hit the copper vessel. A ritual that refuses to be rushed.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}
