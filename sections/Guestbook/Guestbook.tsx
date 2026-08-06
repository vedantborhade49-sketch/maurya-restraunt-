"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FloatingHandwriting } from "@/components/MicroArtifacts";

export default function Guestbook() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

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
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const guestEntries = [
    {
      id: "1",
      category: "family",
      quote: "We've been coming to Maurya every Sunday since 2009. The Dal Makhani and Paneer Butter Masala still carry the exact same rich, slow-cooked warmth as the day we first visited.",
      author: "The Deshmukh Family",
      meta: "Sunday Sanctuary • Guests for 15+ Years",
      handwriting: "Our Sunday Sanctuary",
      rotation: "-1.5deg",
      image: "/editorial-table-feast.png",
      tag: "Sunday Tradition",
    },
    {
      id: "2",
      category: "foodie",
      quote: "Watching the chef pull piping hot tandoori rotis straight from the clay ember oven is an experience in itself. Best pure veg dining sanctuary in Kondhwa!",
      author: "Anand Sharma & Friends",
      meta: "Verified Google Review (4.9★)",
      handwriting: "Fresh Tandoori Embers",
      rotation: "1.2deg",
      image: "/dish-butter-naan.png",
      tag: "Clay Oven Craft",
    },
    {
      id: "3",
      category: "celebration",
      quote: "We hosted my parents' 50th Wedding Anniversary here. The candle-lit dining room and traditional royal feast made everyone feel like family.",
      author: "Priya & Rahul Mehta",
      meta: "Golden Jubilee Celebration",
      handwriting: "50th Anniversary Memory",
      rotation: "-0.8deg",
      image: "/inside-1.jpg",
      tag: "50th Anniversary",
    },
    {
      id: "4",
      category: "family",
      quote: "Whenever out-of-town guests visit Pune, Maurya is our non-negotiable first stop. The authentic Sattvik flavours and heritage timber ambience never fail to impress.",
      author: "Dr. Kulkarni & Family",
      meta: "Family Traditions",
      handwriting: "First Stop in Pune",
      rotation: "1.5deg",
      image: "/inside3.png",
      tag: "Heritage Dining",
    },
    {
      id: "5",
      category: "foodie",
      quote: "Hands down the softest paneer and richest gravy in the city. You can feel the purity of real butter and hand-ground whole spices in every single bite.",
      author: "Vikram & Neha Joshi",
      meta: "Food Critics' Pick • 5.0★",
      handwriting: "Pure Spice Magic",
      rotation: "-1.2deg",
      image: "/dish-paneer-butter-masala.png",
      tag: "Signature Dish",
    },
    {
      id: "6",
      category: "celebration",
      quote: "From my childhood birthday parties to now bringing my own kids here—Maurya has been the backdrop to three generations of our family's happiest moments.",
      author: "Rohan Agarwal",
      meta: "3rd Generation Guest",
      handwriting: "Generations of Memories",
      rotation: "0.8deg",
      image: "/inside-2.jpg",
      tag: "3 Generations",
    },
  ];

  const filteredEntries =
    activeCategory === "all"
      ? guestEntries
      : guestEntries.filter((e) => e.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      className="relative w-full material-light text-[#272322] py-12 md:py-36 overflow-hidden font-sans border-t border-[#9A5C3B]/20 select-none"
    >
      {/* Subtle Journal Dot Pattern Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(#9A5C3B 1.5px, transparent 1.5px)`,
          backgroundSize: '36px 36px'
        }}
      />

      <div className="relative z-10 container-maurya space-y-8 md:space-y-12">
        
        {/* Header Block & Google Rating Summary */}
        <div className="gb-header content-grid text-center space-y-4 md:space-y-6 max-w-3xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 bg-[#F8F5EF] border border-[#9A5C3B]/30 rounded-full shadow-sm">
            <div className="flex items-center gap-1 text-[#9A5C3B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#9A5C3B] stroke-none" />
              ))}
            </div>
            <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#272322]">4.9★</span>
            <span className="text-[#272322]/40 text-xs">·</span>
            <span className="font-mono text-[9px] sm:text-[10px] text-[#272322]/70 uppercase tracking-wider">Over 1,200+ Verified Guest Memories</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl text-[#272322] leading-tight font-normal tracking-tight">
            Dining <span className="italic text-[#9A5C3B] font-serif pr-2">Memories</span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 py-2 opacity-60">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#9A5C3B]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#9A5C3B]" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#9A5C3B]" />
          </div>

          <p className="font-sans text-sm md:text-lg text-[#272322]/80 leading-relaxed max-w-2xl mx-auto font-light">
            Pages from our guestbook and quiet notes left around the table over 35 years of pure vegetarian hospitality.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-4 md:pt-6">
            {[
              { id: "all", label: "All Memories" },
              { id: "family", label: "Family Traditions" },
              { id: "foodie", label: "Culinary Highlights" },
              { id: "celebration", label: "Celebrations" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border transition-all duration-300 font-bold ${
                  activeCategory === cat.id
                    ? "bg-[#9A5C3B] text-white border-[#9A5C3B] shadow-[0_4px_15px_rgba(154,92,59,0.3)] scale-105"
                    : "bg-[#F8F5EF] text-[#272322]/60 border-[#9A5C3B]/20 hover:border-[#9A5C3B]/60 hover:text-[#9A5C3B]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Guestbook Polaroid Spreads Grid with Motion Scroll & Touch Animations */}
        <div className="content-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
          {filteredEntries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.97, rotate: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5 }}
              className="gb-page relative bg-[#FAF7F0] border border-[#9A5C3B]/30 p-5 md:p-7 shadow-[0_10px_30px_rgba(71,32,32,0.08)] flex flex-col justify-between space-y-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:z-10 rounded-sm"
              style={{ transform: `rotate(${entry.rotation})` }}
            >
              {/* Polaroid Image Header with Tape Effect */}
              <div className="relative w-full aspect-[4/3] bg-[#EFE8DB] overflow-hidden border border-[#9A5C3B]/20 shadow-inner group rounded-xs">
                {/* Washi Tape Accent */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#EFE8DB]/90 border border-[#9A5C3B]/30 rotate-[-2deg] z-20 shadow-xs pointer-events-none" />
                
                <img
                  src={entry.image}
                  alt={entry.author}
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />

                {/* Top Right Tag */}
                <div className="absolute top-3 right-3 bg-[#272322]/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[8.5px] font-mono uppercase tracking-wider text-[#F8F5EF] z-10 border border-white/20">
                  {entry.tag}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#272322]/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[#F8F5EF] z-10">
                  <FloatingHandwriting text={entry.handwriting} rotate="0deg" className="text-white text-sm font-semibold drop-shadow-md" />
                  <Heart className="w-3.5 h-3.5 fill-[#9A5C3B] stroke-none" />
                </div>
              </div>

              <div className="space-y-2.5">
                <Quote className="w-5 h-5 md:w-6 md:h-6 text-[#9A5C3B]/40 stroke-[1.5]" />
                <p className="font-heading italic text-sm sm:text-lg text-[#272322] leading-relaxed">
                  "{entry.quote}"
                </p>
              </div>

              <div className="border-t border-[#9A5C3B]/20 pt-3 flex items-center justify-between">
                <div>
                  <p className="font-sans font-bold text-xs sm:text-sm text-[#272322]">{entry.author}</p>
                  <p className="font-mono text-[9px] sm:text-[9.5px] uppercase tracking-[0.15em] text-[#9A5C3B] mt-0.5">
                    {entry.meta}
                  </p>
                </div>
                <Sparkles className="w-4 h-4 text-[#9A5C3B]/50" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action button to view all reviews */}
        <div className="content-grid text-center pt-2 md:pt-4">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold text-[#272322] border-b border-[#9A5C3B] pb-1 hover:text-[#9A5C3B] transition-colors"
          >
            Read All Guest Stories & Google Reviews →
          </Link>
        </div>

      </div>
    </section>
  );
}
