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
      quote: "Best veg family restaurant in this area. I had thali here and staff politely explained and asked everything. Thali was fulfilling, everything was perfect and has a good taste. Will definitely visit again to try something different",
      author: "Prashant Choudhary",
      meta: "Local Guide · 60 reviews · 22 photos",
      handwriting: "Fulfilling Thali Spread",
      rating: 5,
      rotation: "-1.5deg",
      image: "/editorial-table-feast.webp",
      tag: "Local Guide",
    },
    {
      id: "2",
      category: "family",
      quote: "This was my first visit to this restaurant, and I must say I was thoroughly impressed. The atmosphere and ambiance were excellent, creating a very pleasant dining experience. The food was not only delicious but also offered great quantity and quality for the price.",
      author: "Vinay Kumar",
      meta: "Verified Diner · Dinner Review",
      handwriting: "Impressive Ambiance & Food",
      rating: 5,
      rotation: "1.2deg",
      image: "/inside-1.webp",
      tag: "First Visit",
    },
    {
      id: "3",
      category: "foodie",
      quote: "Authentic pure vegetarian food with fantastic taste. Their Paneer Patiala, Pav Bhaji, and Dal Khichdi with Tadka are absolute must-tries. Fast service and courteous staff.",
      author: "Nitin Gaikwad",
      meta: "Google Verified Review · 5.0★",
      handwriting: "Paneer Patiala & Dal Khichdi",
      rating: 5,
      rotation: "-0.8deg",
      image: "/dish-paneer-butter-masala.webp",
      tag: "5.0★ Experience",
    },
    {
      id: "4",
      category: "family",
      quote: "Best pure veg restaurant in Kondhwa at Khadi Machine Chowk. The Paneer Angara Masala with Butter Garlic Naan is exceptional, and the service is always fast and polite with ample parking space.",
      author: "Sachin Patil",
      meta: "Google Local Guide · Regular Diner",
      handwriting: "Our Regular Family Spot",
      rating: 5,
      rotation: "1.5deg",
      image: "/inside3.webp",
      tag: "Pure Vegetarian",
    },
    {
      id: "5",
      category: "foodie",
      quote: "Our non-negotiable stop whenever we visit ISKCON Temple Kondhwa. Super crispy Mysore Masala Dosa, rich South Indian filter coffee, and authentic Maharashtrian Misal Pav. Cleanliness is top notch.",
      author: "Pooja Kulkarni & Family",
      meta: "Verified Google Review · 5.0★",
      handwriting: "Crispy Mysore Dosa",
      rating: 5,
      rotation: "-1.2deg",
      image: "/dish-butter-naan.webp",
      tag: "Temple Tradition",
    },
    {
      id: "6",
      category: "celebration",
      quote: "Celebrated my mother's birthday in their AC dining section. Staff managed our 14-person table effortlessly. The Kaju Curry, Veg Kolhapuri, and Dal Makhani were delicious and piping hot.",
      author: "Rahul Shinde & Family",
      meta: "Family Birthday Celebration · 5.0★",
      handwriting: "Birthday Celebration",
      rating: 5,
      rotation: "0.8deg",
      image: "/inside-2.webp",
      tag: "Family Feast",
    },
    {
      id: "7",
      category: "foodie",
      quote: "Great hangout spot near Yewalewadi Road. Their Special Misal Pav has the exact spicy tarri kick we love, and Veg Manchurian was fresh and crispy. Quick service even during evening rush.",
      author: "Nikhil Ranade & Friends",
      meta: "Verified Diner · 4.0★",
      handwriting: "Spicy Misal Pav",
      rating: 4,
      rotation: "-1.0deg",
      image: "/editorial-food-starters.webp",
      tag: "Evening Hangout",
    },
    {
      id: "8",
      category: "celebration",
      quote: "We ordered Special Pav Bhaji, Paneer Patiala, and Veg Biryani. Everything arrived hot with generous portion sizes. Kids loved the cheese pav bhaji and butter rotis. Free parking right out front.",
      author: "Kunal Chavan & Parivar",
      meta: "Sunday Family Dinner · 5.0★",
      handwriting: "Generous Portions",
      rating: 5,
      rotation: "1.1deg",
      image: "/editorial-interior-ambience.webp",
      tag: "Kondhwa Favorite",
    },
    {
      id: "9",
      category: "family",
      quote: "Cleanliness and pure vegetarian kitchen standards are why we keep returning. Soft fresh paneer, piping hot tandoori rotis, and genuine hospitality every single time. Very reasonable pricing.",
      author: "Dr. Mahesh Joshi",
      meta: "Regular Family Diners · 5.0★",
      handwriting: "Pure Veg Standard",
      rating: 5,
      rotation: "-1.4deg",
      image: "/editorial-chef-cooking.webp",
      tag: "Pure Vegetarian",
    },
    {
      id: "10",
      category: "family",
      quote: "First time dining at Maurya on recommendations from friends in Kondhwa. The Paneer Butter Masala was rich without feeling heavy, and tandoori rotis were soft and fresh. Cozy seating and polite staff.",
      author: "Amitabh & Snigdha Sen",
      meta: "First Visit Dinner · 4.0★",
      handwriting: "Rich Paneer Gravy",
      rating: 4,
      rotation: "0.9deg",
      image: "/editorial-table-feast.webp",
      tag: "First Visit",
    },
    {
      id: "11",
      category: "celebration",
      quote: "Brought 10 family members during festive week. The Royal Veg Thali spread and prompt service during peak rush was commendable. Gulab jamun and hot jalebis were a sweet highlight.",
      author: "Anand Deshmukh & Family",
      meta: "Festive Celebration · 5.0★",
      handwriting: "Royal Feast",
      rating: 5,
      rotation: "-0.7deg",
      image: "/inside-1.webp",
      tag: "Festive Dining",
    },
    {
      id: "12",
      category: "foodie",
      quote: "Best Medu Vada Sambar and Rava Dosa in this part of Kondhwa. Fresh coconut chutney, hot piping sambar, and great tea. Plenty of space for kids to sit comfortably.",
      author: "Rohit & Sneha Kadam",
      meta: "Sunday Brunch · 5.0★",
      handwriting: "Crispy Medu Vada",
      rating: 5,
      rotation: "1.3deg",
      image: "/editorial-food-dosa.webp",
      tag: "Sunday Brunch",
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
            <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#272322]">4.5★</span>
            <span className="text-[#272322]/40 text-xs">·</span>
            <span className="font-mono text-[9px] sm:text-[10px] text-[#272322]/70 uppercase tracking-wider">Over 933+ Verified Google Reviews</span>
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
                  loading="lazy"
                  decoding="async"
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#9A5C3B]">
                    {[...Array(entry.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#9A5C3B] stroke-none" />
                    ))}
                    <span className="font-mono text-[10px] font-bold text-[#272322] ml-1">{entry.rating}.0★</span>
                  </div>
                  <Quote className="w-5 h-5 md:w-6 md:h-6 text-[#9A5C3B]/30 stroke-[1.5]" />
                </div>
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
