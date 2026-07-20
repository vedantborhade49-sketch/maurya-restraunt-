"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote, Heart } from "lucide-react";
import Link from "next/link";
import { FloatingHandwriting } from "@/components/MicroArtifacts";

export default function Guestbook() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        ".gb-header",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "power4.out" }
      );

      tl.fromTo(
        ".gb-page",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const guestEntries = [
    {
      quote: "We have been coming to Maurya for 15 years every Sunday. The Dal Makhani and Paneer Butter Masala still taste exactly like the first time.",
      author: "Deshmukh Family",
      meta: "Regular Guests since 2009",
      handwriting: "Our Sunday Sanctuary",
      rotation: "-1.5deg",
      image: "/editorial-food-5.png",
    },
    {
      quote: "Best pure veg restaurant in Kondhwa! Unmatched tandoori rotis, incredible ambience, and authentic warm Indian hospitality.",
      author: "Anand Sharma",
      meta: "Verified Google Review (4.8★)",
      handwriting: "Unmatched Taste",
      rotation: "1.2deg",
      image: "/editorial-food-3.png",
    },
    {
      quote: "Held our parents' 50th anniversary dinner here. The staff made everyone feel like family. Come hungry, leave with a true memory!",
      author: "Priya & Rahul Mehta",
      meta: "Family Celebration",
      handwriting: "50th Anniversary",
      rotation: "-0.8deg",
      image: "/editorial-food-2.png",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full material-light text-[#272322] py-28 md:py-36 overflow-hidden font-sans border-t border-[#9A5C3B]/20 select-none"
    >
      <div className="container-maurya space-y-16">
        
        {/* Header Block & Google Rating Summary */}
        <div className="gb-header content-grid text-center space-y-6 max-w-3xl">
          
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#F8F5EF] border border-[#9A5C3B]/30 rounded-full shadow-sm">
            <div className="flex items-center gap-1 text-[#9A5C3B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#9A5C3B] stroke-none" />
              ))}
            </div>
            <span className="font-mono text-[11px] font-bold text-[#272322]">4.8★</span>
            <span className="text-[#272322]/40 text-xs">·</span>
            <span className="font-mono text-[10px] text-[#272322]/70 uppercase tracking-wider">Over 880+ Verified Guest Memories</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-[#272322] leading-tight font-normal">
            Dining <span className="italic text-[#9A5C3B]">Memories</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-[#272322]/75 leading-relaxed max-w-xl mx-auto">
            Pages from our guestbook and quiet notes left around the table over 28 years of pure vegetarian hospitality.
          </p>
        </div>

        {/* Guestbook Polaroid Spreads */}
        <div className="content-grid grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {guestEntries.map((entry, idx) => (
            <div
              key={idx}
              className="gb-page relative bg-[#FAF7F0] border border-[#9A5C3B]/30 p-6 md:p-8 shadow-[0_12px_35px_rgba(71,32,32,0.08)] flex flex-col justify-between space-y-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:z-10"
              style={{ transform: `rotate(${entry.rotation})` }}
            >
              {/* Polaroid Image Header with Tape Effect */}
              <div className="relative w-full aspect-[4/3] bg-[#EFE8DB] overflow-hidden border border-[#9A5C3B]/20 shadow-inner group">
                {/* Washi Tape Accent */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#EFE8DB]/80 border border-[#9A5C3B]/20 rotate-[-2deg] z-20 shadow-xs pointer-events-none" />
                <img
                  src={entry.image}
                  alt={entry.author}
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#272322]/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[#F8F5EF] z-10">
                  <FloatingHandwriting text={entry.handwriting} rotate="0deg" className="text-white text-sm font-semibold drop-shadow-md" />
                  <Heart className="w-3.5 h-3.5 fill-[#9A5C3B] stroke-none" />
                </div>
              </div>

              <div className="space-y-4">
                <Quote className="w-7 h-7 text-[#9A5C3B]/30 stroke-[1.5]" />
                <p className="font-heading italic text-lg md:text-xl text-[#272322] leading-relaxed">
                  "{entry.quote}"
                </p>
              </div>

              <div className="border-t border-[#9A5C3B]/20 pt-4">
                <p className="font-sans font-bold text-sm text-[#272322]">{entry.author}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#9A5C3B] mt-0.5">
                  {entry.meta}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action button to view all reviews */}
        <div className="content-grid text-center pt-4">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] font-bold text-[#272322] border-b border-[#9A5C3B] pb-1 hover:text-[#9A5C3B] transition-colors"
          >
            Read All Guest Stories & Google Reviews →
          </Link>
        </div>

      </div>
    </section>
  );
}
