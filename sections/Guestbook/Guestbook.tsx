"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";
import Link from "next/link";

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
      rating: 5,
    },
    {
      quote: "Best pure veg restaurant in Kondhwa! Unmatched tandoori rotis, incredible ambience, and the fastest WhatsApp delivery in town.",
      author: "Anand Sharma",
      meta: "Verified Google Review (4.5★)",
      rating: 5,
    },
    {
      quote: "Held our parents' 50th anniversary dinner here. The staff made everyone feel like family. Come hungry, leave with a true memory!",
      author: "Priya & Rahul Mehta",
      meta: "Family Celebration",
      rating: 5,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#EFE8DB] text-[#350709] py-28 px-6 md:px-12 lg:px-20 overflow-hidden font-sans border-t border-[#B98532]/25"
    >
      <div className="max-w-[1320px] mx-auto space-y-16">
        
        {/* Header */}
        <div className="gb-header text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B98532] font-bold">
            MEMORIES AT THE TABLE
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#350709] leading-tight font-normal">
            Pages From Our <span className="italic text-[#B98532]">Guestbook</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-[#1F1F1F]/75 leading-relaxed">
            Over 28 years of shared laughter, anniversary toasts, and Sunday family feasts.
          </p>
        </div>

        {/* Guestbook Spreads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guestEntries.map((entry, idx) => (
            <div
              key={idx}
              className="gb-page relative bg-[#F8F6F1] border border-[#B98532]/30 p-8 md:p-10 shadow-[0_10px_30px_rgba(53,7,9,0.06)] flex flex-col justify-between space-y-6 rotate-[-0.5deg] hover:rotate-0 transition-transform duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#B98532]">
                  {[...Array(entry.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#B98532] stroke-none" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-[#B98532]/30 stroke-[1.5]" />
                <p className="font-serif italic text-lg md:text-xl text-[#350709] leading-relaxed">
                  "{entry.quote}"
                </p>
              </div>

              <div className="border-t border-[#B98532]/20 pt-4">
                <p className="font-sans font-bold text-sm text-[#350709]">{entry.author}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#B98532] mt-0.5">
                  {entry.meta}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action button to view all reviews */}
        <div className="text-center pt-4">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] font-bold text-[#350709] border-b border-[#B98532] pb-1 hover:text-[#B98532] transition-colors"
          >
            Read All Guest Stories & Google Reviews →
          </Link>
        </div>

      </div>
    </section>
  );
}
