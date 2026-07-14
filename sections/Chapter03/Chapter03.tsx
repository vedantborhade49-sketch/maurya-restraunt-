"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAABgf/xAAeEAABBAIDAQAAAAAAAAAAAAABAAIDBAUREiFBMf/aAAwDAQACEQMRAD8AqslrWx2TWxPkPtxya0NJGPfGMYAVE0snu//Z";

export default function Chapter03() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Elegant, singular fade-in sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        }
      });

      tl.fromTo(
        ".editorial-reveal",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 2, stagger: 0.15, ease: "power3.out" }
      );

      // Subtle image parallax
      gsap.utils.toArray<HTMLElement>(".image-parallax").forEach((el) => {
        gsap.fromTo(
          el,
          { y: -30, scale: 1.05 },
          {
            y: 30,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-ch3-bg text-ch3-text overflow-hidden"
    >
      {/* Texture Layer - Layer 1 */}
      <div className="texture-ch3" />
      {/* Warm radial lighting + subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,_rgba(255,245,230,0.06)_0%,_transparent_60%)] pointer-events-none z-[1]" />
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(15,5,10,0.8)] pointer-events-none z-[2]" />
      
      {/* Paper Grain Top Overlay - Layer 5 */}
      <div className="absolute inset-0 bg-[url('/editorial-texture.png')] opacity-[0.08] mix-blend-multiply pointer-events-none z-[50]" />
      
      {/* 
        The Staggered Editorial Container
        Moving away from 50/50 split to a highly art-directed magazine spread. 
      */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto min-h-[160vh] flex flex-col py-32 md:py-48 px-8 md:px-16">
        
        {/* ─────────────────────────────────────────────
            1. Oversized Editorial Headline (Top Left, Layer 2)
            ───────────────────────────────────────────── */}
        <div className="editorial-reveal relative z-30 w-full max-w-[800px] mt-12 md:ml-[3%]">
          <h2 className="font-heading text-[clamp(65px,8.5vw,150px)] leading-[0.82] tracking-tighter opacity-95 text-ch3-text mix-blend-overlay">
            EVERY<br />
            PLATE<br />
            TELLS A<br />
            {/* The subtle overlap word */}
            <span className="relative z-30 italic text-ch3-accent pr-12 drop-shadow-md">STORY.</span>
          </h2>
          {/* Micro details */}
          <div className="absolute top-8 -left-8 hidden md:block">
            <span className="font-label text-[9px] tracking-[0.4em] uppercase text-ch3-text/30" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
              SPRING EDITION / VOL. IV
            </span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────
            2. Large Hero Image (Middle Right, Overlapping, Layer 3)
            ───────────────────────────────────────────── */}
        <div className="editorial-reveal relative z-20 self-end w-[95%] md:w-[65%] mt-12 md:-mt-[22vh] mr-0 md:-mr-[2%] rotate-[0.5deg]">
          {/* Museum Print Framing - Subtle padding */}
          <div className="relative w-full aspect-[4/5] bg-ivory pt-6 pb-12 pl-6 pr-6 shadow-[0_30px_60px_-15px_rgba(20,10,12,0.4)]">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/editorial-food-3.png"
                alt="Culinary Focus"
                fill sizes="60vw"
                priority
                placeholder="blur" blurDataURL={BLUR}
                className="image-parallax object-cover object-center opacity-95"
              />
            </div>
            {/* Elegant Image Caption */}
            <div className="absolute bottom-4 left-6 flex flex-col gap-1 opacity-70">
              <span className="font-label text-[9px] uppercase tracking-[0.2em] text-[#333]">
                FIG. 01
              </span>
              <span className="font-heading italic text-[13px] text-[#333]">
                The Masterpiece
              </span>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────
            3. Detail Block (Bottom Left, Staggered)
            ───────────────────────────────────────────── */}
        <div className="editorial-reveal relative z-20 flex flex-col items-start gap-8 mt-24 md:-mt-[15vh] md:ml-[8%]">
          
          {/* Tiny Detail Image with Museum Label */}
          <div className="flex flex-col gap-4">
            <div className="w-[160px] md:w-[200px] aspect-[3/4] relative shadow-lg overflow-hidden rotate-[-0.5deg]">
              <Image
                src="/editorial-spices.png"
                alt="Raw ingredients detail"
                fill sizes="15vw"
                placeholder="blur" blurDataURL={BLUR}
                className="image-parallax object-cover opacity-95"
              />
            </div>
            <div className="flex flex-col gap-1 opacity-60">
              <span className="font-label text-[8px] tracking-[0.3em] uppercase text-ch3-text">FIG. 02</span>
              <span className="font-label text-[8px] tracking-[0.2em] uppercase text-ch3-text/70">STONE-GROUND SPICES<br/>EDITORIAL ARCHIVE</span>
            </div>
          </div>

          {/* Supporting Paragraph & Details */}
          <div className="max-w-[320px] flex flex-col gap-6 mt-8">
            <div className="w-12 h-[1px] bg-ch3-accent/50" />
            <p className="font-body text-[13px] md:text-[14px] leading-[2.2] text-ch3-text/80 font-light">
              Every recipe at Maurya is shaped by tradition, refined through patience, and served with intention. Unforgettable meals are never rushed.
            </p>
            
            {/* Micro Details */}
            <div className="flex items-center gap-6 mt-6 opacity-50">
              <span className="font-label text-[9px] tracking-[0.3em] uppercase text-ch3-secondary">
                03.
              </span>
              <span className="font-label text-[8px] tracking-[0.1em] text-ch3-secondary">
                18°31'40.9"N 73°51'54.2"E
              </span>
            </div>
          </div>
        </div>

      </div>
      
      {/* 
        Spread 02: Editorial Gallery & Typography Interaction
        Replacing the centered block with an asymmetrical, museum-print layout.
      */}
      <div className="relative z-10 w-full min-h-[140vh] flex flex-col md:flex-row items-center justify-between py-32 md:py-48 px-0 md:px-0">
        
        {/* LEFT SIDE: Bleeding Hero Image & Metadata */}
        <div className="w-full md:w-[55%] flex items-end relative">
          
          {/* Bleeding Gallery Print (No thick border, cinematic bleed) */}
          <div className="editorial-reveal relative w-full aspect-[4/5] shadow-[0_30px_80px_rgba(15,5,10,0.6)]">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/editorial-process.png"
                alt="The Final Tempering"
                fill sizes="55vw"
                placeholder="blur" blurDataURL={BLUR}
                className="image-parallax object-cover object-center grade-ch3 opacity-95"
              />
            </div>
          </div>
          
          {/* Metadata Beside Image */}
          <div className="editorial-reveal absolute -right-24 bottom-12 hidden lg:flex flex-col gap-3 opacity-60">
            <span className="font-label text-[9px] uppercase tracking-[0.4em] text-ch3-text">FIG. 03</span>
            <span className="font-label text-[9px] uppercase tracking-[0.4em] text-ch3-text">THE FINAL TEMPERING</span>
            <div className="w-8 h-[1px] bg-ch3-text/40 my-2" />
            <span className="font-label text-[9px] uppercase tracking-[0.4em] text-ch3-text">MAURYA JOURNAL</span>
            <span className="font-label text-[9px] uppercase tracking-[0.4em] text-ch3-text">PUNE, INDIA</span>
            <span className="font-label text-[9px] uppercase tracking-[0.4em] text-ch3-text">SPRING EDITION</span>
          </div>
        </div>

        {/* RIGHT SIDE: Broken Typography & Detail */}
        <div className="w-full md:w-[45%] flex flex-col justify-center px-12 md:pl-32 md:pr-16 mt-24 md:mt-0 relative">
          
          <div className="editorial-reveal w-full max-w-[500px]">
            
            {/* Pull Quote Marker */}
            <div className="flex items-center gap-6 mb-12 opacity-60">
              <span className="font-label text-[9px] tracking-[0.3em] uppercase text-ch3-text">
                CHEF'S NOTE
              </span>
              <div className="w-12 h-[1px] bg-ch3-text/40" />
            </div>

            {/* The Broken Quote */}
            <div className="flex flex-col items-start gap-8">
              <span className="font-heading italic text-[clamp(40px,5vw,75px)] leading-[1.05] tracking-tight text-ch3-text opacity-95">
                "The fire<br />
                must speak,
              </span>
              <span className="font-heading italic text-[clamp(40px,5vw,75px)] leading-[1.05] tracking-tight text-ch3-text opacity-95 md:ml-12">
                but never shout."
              </span>
              
              <div className="h-4" /> {/* Intentional breathing room */}
              
              <span className="font-heading italic text-[clamp(28px,3vw,42px)] leading-[1.2] text-ch3-text/80 md:ml-24">
                True flavour<br />
                is coaxed,<br />
                not forced.
              </span>
            </div>

            {/* Tiny Supporting Detail (< 8%) */}
            <div className="editorial-reveal absolute bottom-0 right-12 md:-right-8 w-16 md:w-20 aspect-square shadow-lg overflow-hidden translate-y-32">
              <div className="relative w-full h-full opacity-90">
                <Image
                  src="/editorial-spices.png"
                  alt="Spice Detail"
                  fill sizes="8vw"
                  className="object-cover grade-ch3 grayscale"
                />
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
