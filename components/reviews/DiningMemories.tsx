"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialImage from "@/components/EditorialImage";
import { Star, ArrowRight, ExternalLink } from "lucide-react";

interface GuestbookMemory {
  id: string;
  category: string;
  title: string;
  review: string;
  guestName: string;
  occasion: string;
  favoriteDish: string;
  visitedDate: string;
  rating: number;
}

const MEMORIES_DATA: GuestbookMemory[] = [
  {
    id: "m1",
    category: "Family Gatherings",
    title: "Sunday Family Feast",
    review: "The food was incredible, but the best part was spending two uninterrupted hours with my grandparents and kids over warm paneer curries and hot rotis.",
    guestName: "The Sharma Family",
    occasion: "Sunday Lunch",
    favoriteDish: "Paneer Maratha & Butter Naan",
    visitedDate: "October 2025",
    rating: 5,
  },
  {
    id: "m2",
    category: "Birthday Celebrations",
    title: "Mom's 60th Birthday",
    review: "Maurya made my mother feel like royalty. The staff sang warmly, brought out hot sweet gulab jamuns, and the Veg Kholapuri had the perfect authentic kick.",
    guestName: "Ananya & Family",
    occasion: "60th Birthday Dinner",
    favoriteDish: "Veg Kolhapuri & Gulab Jamun",
    visitedDate: "December 2025",
    rating: 5,
  },
  {
    id: "m3",
    category: "Friends Meetups",
    title: "College Reunion After 5 Years",
    review: "We sat in the garden seating for 3 hours reminiscing old college days. Crispy South Indian dosas and hot filter coffee made time stand still.",
    guestName: "Rohan, Varun & Sid",
    occasion: "Reunion Dinner",
    favoriteDish: "Special Cheese Masala Dosa",
    visitedDate: "January 2026",
    rating: 5,
  },
  {
    id: "m4",
    category: "Regular Guests",
    title: "Our Weekly Family Tradition",
    review: "We've been coming to Maurya every Friday for 8 years. The consistency of flavor, cleanliness, and genuine warmth from the staff never changes.",
    guestName: "Kulkarni Family",
    occasion: "Weekly Tradition",
    favoriteDish: "Dal Tadka & Jeera Rice",
    visitedDate: "February 2026",
    rating: 5,
  },
  {
    id: "m5",
    category: "First Visit",
    title: "Discovered On A Drive",
    review: "Stopped by Kondhwa after seeing glowing local recommendations. Hands down the best pure vegetarian dining experience in Pune. Impeccable hygiene.",
    guestName: "Aditya & Priya",
    occasion: "First Date Dinner",
    favoriteDish: "Kaju Curry & Garlic Naan",
    visitedDate: "March 2026",
    rating: 5,
  },
  {
    id: "m6",
    category: "Festival Dining",
    title: "Diwali Celebration Banquet",
    review: "Booked a large family table during Diwali. Festive atmosphere, beautifully decorated thali dishes, and effortless hospitality even on peak rush day.",
    guestName: "Deshmukh Parivar",
    occasion: "Diwali Celebration",
    favoriteDish: "Royal Veg Thali",
    visitedDate: "November 2025",
    rating: 5,
  },
];

const CATEGORIES = [
  "All Memories",
  "Family Gatherings",
  "Birthday Celebrations",
  "Friends Meetups",
  "Regular Guests",
  "First Visit",
  "Festival Dining",
];

export default function DiningMemories() {
  const [activeCategory, setActiveCategory] = useState("All Memories");
  const containerRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Fade in hero elements
      gsap.fromTo(
        ".memories-hero-text",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", stagger: 0.15 }
      );

      // Quote slow fade
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const filteredMemories =
    activeCategory === "All Memories"
      ? MEMORIES_DATA
      : MEMORIES_DATA.filter((m) => m.category === activeCategory);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 md:py-40 px-6 md:px-12 bg-[#F8F6F1] text-[#350709] overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="memories-hero-text font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] font-bold text-[#B98532] block">
            GUESTBOOK ARCHIVE
          </span>

          <h1 className="memories-hero-text font-serif text-5xl sm:text-7xl md:text-8xl text-[#350709] leading-[0.95] tracking-tight font-normal">
            DINING MEMORIES
          </h1>

          <p className="memories-hero-text font-serif italic text-xl md:text-2xl text-[#B98532] max-w-xl mx-auto font-light">
            "Every meal leaves behind a story. Here are a few that stayed with us."
          </p>
        </div>

        {/* Google Rating Hero Certificate / Vintage Parchment Plaque */}
        <div className="relative bg-[#F8F5EF] text-[#272322] border-2 border-[#9A5C3B]/50 p-8 md:p-12 max-w-4xl mx-auto shadow-[0_15px_40px_rgba(71,32,32,0.12)] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left material-light">
          {/* Vintage Corner Ornaments */}
          <div className="absolute top-2 left-2 text-[#9A5C3B] text-xs opacity-60">❖</div>
          <div className="absolute top-2 right-2 text-[#9A5C3B] text-xs opacity-60">❖</div>
          <div className="absolute bottom-2 left-2 text-[#9A5C3B] text-xs opacity-60">❖</div>
          <div className="absolute bottom-2 right-2 text-[#9A5C3B] text-xs opacity-60">❖</div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-1 text-[#9A5C3B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-[#9A5C3B] stroke-none" />
              ))}
            </div>
            <div className="font-heading text-6xl md:text-7xl leading-none text-[#D32F2F]">
              4.9
            </div>
            <div className="text-sm font-sans text-[#272322]/80 mt-1">
              Loved by over <strong className="text-[#D32F2F] font-bold">1,200+ Happy Guests</strong> on Google Reviews
            </div>
          </div>

          <div className="hidden md:block w-[1px] h-12 bg-[#9A5C3B]/20 mx-4" />

          <div className="flex flex-col items-center md:items-end gap-3 border-t md:border-t-0 md:border-l border-[#9A5C3B]/30 pt-6 md:pt-0 md:pl-10">
            <div className="flex items-center gap-2 bg-[#D32F2F] text-[#F8F5EF] px-5 py-2 rounded-full border border-[#9A5C3B]/40 shadow-sm">
              <span className="font-bold text-xs tracking-wider uppercase font-mono">Verified Google Reviews</span>
            </div>
            <a
              href="https://google.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] font-bold text-[#D32F2F] hover:text-[#9A5C3B] transition-colors pt-2"
            >
              <span>View On Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#9A5C3B]" />
            </a>
          </div>
        </div>

        {/* Editorial Scrapbook Wall */}
        <div className="space-y-8">
          <div className="text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#9A5C3B] font-bold">
              VISUAL MEMORY SCRAPBOOK
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF7F0] p-4 border border-[#9A5C3B]/30 shadow-md rotate-[-2deg] hover:rotate-0 transition-transform duration-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#EFE8DB]/80 border border-[#9A5C3B]/20 rotate-[-1deg] z-20 shadow-xs pointer-events-none" />
              <div className="relative w-full aspect-[4/3] overflow-hidden mb-3 border border-[#9A5C3B]/20">
                <EditorialImage src="/editorial-food-starters.webp" alt="Starters" />
              </div>
              <p className="font-heading italic text-base text-center text-[#272322]">"The Paneer Tikka was unforgettable."</p>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#9A5C3B] block text-center mt-2">— Table 8 Memories</span>
            </div>

            <div className="relative z-10 w-full max-w-sm shrink-0 md:-ml-8 mt-12 md:mt-0 transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="bg-[#D32F2F] text-[#F8F5EF] p-6 border border-[#9A5C3B]/40 shadow-xl flex flex-col justify-center text-center space-y-4 rounded-xs">
                <div className="flex justify-center gap-1 mb-2 font-mono text-[9px] uppercase tracking-[0.3em] text-[#9A5C3B] font-bold">GUESTBOOK EXCERPT</div>
                <p className="font-heading italic text-2xl text-[#F8F5EF] leading-relaxed">
                  "We didn't just share a meal. We shared stories that we hadn't spoken in years."
                </p>
                <span className="font-mono text-xs text-[#9A5C3B] uppercase tracking-[0.2em]">— The Kulkarni Family</span>
              </div>
            </div>

            <div className="bg-[#FAF7F0] p-4 border border-[#9A5C3B]/30 shadow-md rotate-[2deg] hover:rotate-0 transition-transform duration-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#EFE8DB]/80 border border-[#9A5C3B]/20 rotate-[1deg] z-20 shadow-xs pointer-events-none" />
              <div className="relative w-full aspect-[4/3] overflow-hidden mb-3 border border-[#9A5C3B]/20">
                <EditorialImage src="/editorial-food-dosa.webp" alt="Crispy Dosa" />
              </div>
              <p className="font-heading italic text-base text-center text-[#272322]">"Crispy dosa & filter coffee on Sunday."</p>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#9A5C3B] block text-center mt-2">— Sunday Breakfast Club</span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 border rounded-full ${
                  activeCategory === cat
                    ? "bg-[#D32F2F] text-[#F8F5EF] border-[#9A5C3B] shadow-md"
                    : "bg-[#F8F5EF] text-[#272322]/80 border-[#9A5C3B]/30 hover:border-[#D32F2F]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Vintage Guestbook Paper Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMemories.map((item, idx) => (
            <div
              key={item.id}
              className="bg-[#FAF7F0] border-2 border-[#9A5C3B]/30 p-8 flex flex-col justify-between space-y-6 shadow-[0_10px_30px_rgba(71,32,32,0.07)] hover:shadow-2xl hover:border-[#9A5C3B] transition-all duration-300 relative group material-light"
              style={{ transform: `rotate(${idx % 2 === 0 ? '-0.8deg' : '0.8deg'})` }}
            >
              {/* Antique Washi Tape / Paper Clip Accent */}
              <div className="absolute -top-3 left-8 w-16 h-5 bg-[#EFE8DB]/90 border border-[#9A5C3B]/30 rotate-[-1deg] z-20 shadow-xs pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#9A5C3B]/20 pb-3">
                  <div className="flex items-center gap-1 text-[#9A5C3B]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#9A5C3B] stroke-none" />
                    ))}
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#9A5C3B] font-bold">
                    {item.occasion}
                  </span>
                </div>

                <h3 className="font-heading text-2xl text-[#D32F2F] font-medium leading-snug">
                  "{item.title}"
                </h3>

                <p className="font-sans text-sm text-[#272322]/85 leading-relaxed font-light">
                  "{item.review}"
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#9A5C3B]/20">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-[#272322] uppercase tracking-wider">— {item.guestName}</span>
                  <span className="text-[#272322]/50 text-[10px]">{item.visitedDate}</span>
                </div>

                <div className="mt-4 pt-4 border-t border-[#9A5C3B]/20 text-sm">
                  <span className="font-mono uppercase tracking-widest text-[#272322]/60 text-xs">Favorite: </span>
                  <span className="font-heading italic font-semibold text-[#D32F2F]">{item.favoriteDish}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Animated Quote Divider */}
        <div ref={quoteRef} className="py-16 text-center max-w-3xl mx-auto space-y-4 border-t border-b border-[#B98532]/30">
          <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#350709] leading-relaxed font-light">
            "Some meals are remembered for their taste. The best ones are remembered for the people around the table."
          </p>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B98532] font-bold block pt-2">
            MAURYA DINING PHILOSOPHY
          </span>
        </div>

        {/* Google Reviews CTA */}
        <div className="text-center pt-4">
          <a
            href="https://maps.google.com/?q=Maurya+Pure+Veg+Restaurant+Kondhwa+Pune"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#350709] text-[#F8F6F1] font-mono text-xs uppercase tracking-[0.25em] border border-[#B98532] shadow-xl hover:bg-[#B98532] hover:text-[#350709] transition-all duration-300"
          >
            <span>Read More Dining Memories On Google</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
