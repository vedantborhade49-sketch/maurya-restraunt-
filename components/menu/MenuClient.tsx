"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useTableStore, MenuItem } from "../../stores/table-store";
import { Search, Plus, Minus, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CategoryHeroDish from "./CategoryHeroDish";
import FloatingFoodPreview from "./FloatingFoodPreview";
import MenuFinalCTA from "./MenuFinalCTA";
import BrassDivider from "../ui/BrassDivider";

interface MenuClientProps {
  initialCategories: any[];
  initialItems: MenuItem[];
}

const PLACEHOLDERS = [
  'Try "Paneer"',
  'Try "Dosa"',
  'Try "Manchurian"',
  'Try "Biryani"',
  'Try "Veg Paratha"'
];

const MOODS = [
  { label: "SPICY", tag: "spicy", border: "border-red-900/30 text-red-400" },
  { label: "RICH & CREAMY", tag: "rich", border: "border-amber-900/30 text-amber-400" },
  { label: "QUICK BITES", tag: "quick", border: "border-blue-900/30 text-blue-400" },
  { label: "MADE TO SHARE", tag: "sharing", border: "border-emerald-900/30 text-emerald-400" },
  { label: "MAURYA FAVOURITES", tag: "maurya_favourite", border: "border-purple-900/30 text-purple-400" },
  { label: "LIGHT", tag: "light", border: "border-orange-900/30 text-orange-400" }
];

const CATEGORY_SUBTITLES: Record<string, string> = {
  STARTERS: "Where every meal begins with warmth & spice.",
  DOSA: "Crispy golden crepes crafted on traditional hot griddles.",
  UTTAPAM: "Soft savory pancakes layered with fresh toppings.",
  MAINS: "Rich curries simmered over slow tandoori embers.",
  CHINESE: "Wok-tossed delicacies full of bold oriental aroma.",
  RICE: "Fragrant basmati biryanis infused with aromatic spices.",
  DESSERTS: "Pure indulgence to conclude a memorable dining story.",
  BEVERAGES: "Cooling traditional coolers & refreshing blends.",
};

export default function MenuClient({ initialCategories, initialItems }: MenuClientProps) {
  const [categories] = useState(initialCategories);
  const [items] = useState<MenuItem[]>(initialItems);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  
  // Rotating search placeholder
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Menu entrance preloader state
  const [showEntrance, setShowEntrance] = useState(true);
  
  // Mobile Dish Peek Bottom Sheet
  const [peekItem, setPeekItem] = useState<MenuItem | null>(null);
  
  // "Can't Decide" Selection
  const [decideMood, setDecideMood] = useState<"one" | "two" | "table" | null>(null);

  // Cart operations
  const { items: cartItems, addItem, decreaseQuantity, setIsOpen: setCartOpen, isOpen: isCartOpen } = useTableStore();

  const totalItemsCount = useMemo(() => {
    return cartItems.reduce((acc, i) => acc + i.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, i) => acc + (i.item.price * i.quantity), 0);
  }, [cartItems]);

  // Contextual Hover Preview Coordinates (Desktop)
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseX = useSpring(0, { stiffness: 180, damping: 22 });
  const mouseY = useSpring(0, { stiffness: 180, damping: 22 });
  const previewRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver variables
  const isClickScrolling = useRef(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Menu entrance animation timeout
    const timer = setTimeout(() => {
      setShowEntrance(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Placeholder rotation interval
  useEffect(() => {
    if (isSearchFocused || searchQuery.trim() !== "") return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isSearchFocused, searchQuery]);

  // Track mouse coordinates on desktop
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX + 20, y: e.clientY + 20 });
    if (!hoveredItem) return;
    mouseX.set(e.clientX + 20);
    mouseY.set(e.clientY + 20);
  };

  // Scroll sync: Set rail category on scroll
  useEffect(() => {
    if (typeof window === "undefined" || showEntrance) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        
        // Find the section that has the largest visible area near the top
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          const categoryName = visibleSection.target.getAttribute("data-category");
          if (categoryName) {
            setSelectedCategory(categoryName);
            // Auto scroll rail element
            const railBtn = document.getElementById(`rail-btn-${categoryName.replace(/[^a-z0-9]+/g, "-")}`);
            if (railBtn) {
              railBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
            }
          }
        }
      },
      {
        rootMargin: "-100px 0px -60% 0px",
        threshold: 0.1
      }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [showEntrance]);

  const handleRailClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    isClickScrolling.current = true;

    if (categoryName === "ALL") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = sectionRefs.current[categoryName];
      if (section) {
        const offset = section.offsetTop - 180;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    }

    setTimeout(() => {
      isClickScrolling.current = false;
    }, 700);
  };

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Mood tag match
      if (selectedMood && (!item.tags || !item.tags.includes(selectedMood))) {
        return false;
      }
      
      // Search matching
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = (item.description || "").toLowerCase().includes(query);
        const matchesCat = item.category?.toLowerCase().includes(query);
        const matchesTags = item.tags?.some(t => t.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesCat || matchesTags;
      }

      return true;
    });
  }, [items, selectedMood, searchQuery]);

  // Curated Favourites
  const favourites = useMemo(() => {
    return items.filter(item => item.tags?.includes("maurya_favourite") || item.is_signature).slice(0, 6);
  }, [items]);

  // Group filtered items by category for high-density listing
  const groupedItems = useMemo(() => {
    const groups: Record<string, MenuItem[]> = {};
    filteredItems.forEach((item) => {
      const cat = item.category || "GENERAL";
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(item);
    });
    return groups;
  }, [filteredItems]);

  const getItemQuantity = (itemId: string) => {
    return cartItems.find((i) => i.item.id === itemId)?.quantity || 0;
  };

  // Custom animation trigger on tap + button
  const handleAdd = (item: MenuItem, e?: React.MouseEvent) => {
    if (e) {
      const btn = e.currentTarget;
      btn.classList.add("scale-85");
      setTimeout(() => btn.classList.remove("scale-85"), 150);
    }
    addItem(item);
  };

  // Can't Decide items recommendations
  const recommendedDecideItems = useMemo(() => {
    if (!decideMood) return [];
    if (decideMood === "one") {
      return items.filter(i => i.price < 180).slice(0, 4);
    } else if (decideMood === "two") {
      return items.filter(i => i.tags?.includes("sharing") && i.price < 280).slice(0, 4);
    } else {
      return items.filter(i => i.tags?.includes("sharing")).slice(0, 6);
    }
  }, [items, decideMood]);

  return (
    <div 
      className="min-h-screen bg-[#F8F6F1] text-[#350709] pt-24 pb-20 relative overflow-x-hidden font-sans"
      onMouseMove={handleMouseMove}
      style={{
        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjAwIDIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSdub2lzZSc+PGZlVHVyYnVsZW5jZSB0eXBlPSdmcmFjdGFsTm9pc2UnIGJhc2VGcmVxdWVuY3k9JzAuNjUnIG51bU9jdGF2ZXM9JzMnIHN0aXRjaFRpbGVzPSdzdGl0Y2gnLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWx0ZXI9J3VybCgjbm9pc2UpJyBvcGFjaXR5PScwLjAyJy8+PC9zdmc+")`,
      }}
    >
      {/* 1. Cinematic Entrance Preloader */}
      <AnimatePresence>
        {showEntrance && (
          <motion.div 
            className="fixed inset-0 bg-[#350709] z-[120] flex flex-col items-center justify-center text-center px-6"
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          >
            <motion.span 
              className="font-sans text-[10px] tracking-[0.3em] text-[#B98532] font-bold uppercase mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              THE MAURYA KITCHEN
            </motion.span>
            <motion.h2 
              className="font-heading text-4xl md:text-5xl text-[#F8F6F1] max-w-md mb-6 leading-tight"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.6 } }}
            >
              What are you craving today?
            </motion.h2>
            
            {/* Draw curve sweep */}
            <div className="w-24 h-4 relative">
              <svg viewBox="0 0 100 10" className="w-full h-full text-[#B98532] fill-none">
                <motion.path
                  d="M0,5 C30,2 70,8 100,5"
                  stroke="currentColor"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: "easeInOut" }}
                />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Brass Accent Overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23B98532' stroke-width='0.75'%3E%3Cpath d='M0 0l40 40L0 80'/%3E%3Cpath d='M80 0L40 40l40 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="mb-10 text-center md:text-left mt-8">
          <span className="font-sans text-[10px] tracking-[0.25em] text-[#8F1115] font-bold uppercase">
            THE MAURYA KITCHEN
          </span>
          <h1 className="font-heading text-5xl md:text-6xl text-[#350709] tracking-tight mt-1">
            What are you<br className="md:hidden" /> craving today?
          </h1>
        </div>

        {/* Dimmer overlay for search focus */}
        {searchQuery.trim() !== "" && (
          <div className="fixed inset-0 bg-[#0B0908]/20 z-0 pointer-events-none transition-opacity duration-300" />
        )}

        {/* 2. Sticky Fixed Search & Category Navigation Header */}
        <div className="sticky top-16 md:top-20 z-40 w-full bg-[#F8F6F1]/95 backdrop-blur-md border-b border-[#B98532]/25 py-3.5 mb-10 -mx-4 px-4 md:-mx-8 md:px-8 space-y-4 shadow-sm">
          {/* Sticky Search Input Bar */}
          <div className="max-w-3xl mx-auto relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-[#350709]/40" />
            <input
              type="text"
              placeholder={isSearchFocused ? "Search paneer, dosa, noodles..." : PLACEHOLDERS[placeholderIndex]}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => {
                setIsSearchFocused(false);
                if (searchQuery === "") setPlaceholderIndex(0);
              }}
              className="w-full pl-12 md:pl-14 pr-10 py-3 rounded-full bg-white border border-[#350709]/15 text-[#350709] placeholder:text-[#350709]/40 focus:outline-none focus:border-[#8F1115]/50 focus:shadow-[0_0_20px_rgba(143,17,21,0.06)] transition-all duration-300 text-sm md:text-base shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#350709]/50 hover:text-[#350709]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {/* Animated bottom brass line */}
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#B98532] transition-all duration-500 rounded-full ${isSearchFocused ? "w-[90%]" : "w-0"}`} />
          </div>

          {/* Mood Filters (Collapsed when search active) */}
          {!searchQuery.trim() && (
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
              {MOODS.map((mood) => {
                const isSelected = selectedMood === mood.tag;
                return (
                  <button
                    key={mood.tag}
                    onClick={() => setSelectedMood(isSelected ? null : mood.tag)}
                    className={`px-3 py-1.5 border rounded-full text-[9px] font-bold tracking-wider uppercase transition-all duration-200 ${
                      isSelected 
                        ? "bg-[#350709] border-[#350709] text-[#F3E8D4]" 
                        : `bg-white hover:bg-[#350709]/5 border-[#350709]/15 text-[#350709]`
                    }`}
                  >
                    {mood.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Horizontal Category Rail */}
          {!searchQuery.trim() && (
            <div className="overflow-x-auto no-scrollbar pt-1">
              <div className="flex items-center gap-6 md:gap-8 font-sans text-xs font-bold uppercase tracking-[0.2em] justify-start md:justify-center">
                <button
                  id="rail-btn-ALL"
                  onClick={() => handleRailClick("ALL")}
                  className={`relative py-1.5 shrink-0 transition-colors ${
                    selectedCategory === "ALL" ? "text-[#8F1115]" : "text-[#350709]/60 hover:text-[#350709]"
                  }`}
                >
                  <span>01 ALL</span>
                  {selectedCategory === "ALL" && (
                    <motion.svg className="absolute bottom-0 left-0 w-full h-1 text-[#8F1115]" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <motion.path d="M0,5 C30,2 70,8 100,5" fill="none" stroke="currentColor" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
                    </motion.svg>
                  )}
                </button>

                {categories.map((cat, index) => {
                  const displayIndex = String(index + 2).padStart(2, "0");
                  const isSelected = selectedCategory === cat.name;
                  const slug = cat.name.replace(/[^a-z0-9]+/g, "-");
                  return (
                    <button
                      key={cat.id}
                      id={`rail-btn-${slug}`}
                      onClick={() => handleRailClick(cat.name)}
                      className={`relative py-1.5 shrink-0 transition-colors ${
                        isSelected ? "text-[#8F1115]" : "text-[#350709]/60 hover:text-[#350709]"
                      }`}
                    >
                      <span>{displayIndex} {cat.name}</span>
                      {isSelected && (
                        <motion.svg className="absolute bottom-0 left-0 w-full h-1 text-[#8F1115]" viewBox="0 0 100 10" preserveAspectRatio="none">
                          <motion.path d="M0,5 C30,2 70,8 100,5" fill="none" stroke="currentColor" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
                        </motion.svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 4. Curated Recommendations: Maurya Favourites */}
        {!searchQuery && !selectedMood && selectedCategory === "ALL" && (
          <div className="mb-16">
            <span className="block text-[10px] tracking-[0.25em] text-[#8F1115] font-bold uppercase mb-2">
              START WITH
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-[#350709] tracking-tight mb-8">
              A Maurya Favourite.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favourites.map((item) => {
                const qty = getItemQuantity(item.id);
                return (
                  <div 
                    key={item.id}
                    className="bg-white rounded-2xl p-6 border border-[#350709]/10 shadow-[0_12px_35px_rgba(53,7,9,0.04)] hover:shadow-[0_20px_50px_rgba(53,7,9,0.08)] transition-all duration-300 flex flex-col justify-between min-h-[540px]"
                  >
                    <div>
                      {/* Image header with crop-scaling and fallback plate */}
                      <div className="relative w-full h-[280px] rounded-xl overflow-hidden mb-5 border border-[#B98532]/20 bg-gradient-to-br from-[#350709] to-[#0B0908] flex items-center justify-center">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const f = e.currentTarget.parentElement?.querySelector(".fallback-card-plate");
                              if (f) f.classList.remove("hidden");
                            }}
                          />
                        ) : null}
                        
                        <div className={`fallback-card-plate ${item.image_url ? 'hidden' : ''} absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-[#350709] to-[#0B0908]`}>
                          <div className="w-20 h-20 rounded-full border border-[#B98532]/25 flex items-center justify-center mb-3 bg-[#0B0908]/40 shadow-inner">
                            <span className="font-serif italic text-4xl text-[#B98532] font-bold">{item.name[0]}</span>
                          </div>
                          <span className="font-sans text-[8px] tracking-[0.25em] text-[#B98532] font-extrabold uppercase">Maurya Kitchen</span>
                        </div>

                        {/* Spice Tag */}
                        {item.is_spicy && (
                          <span className="absolute top-4 right-4 bg-[#8F1115] text-[#F3E8D4] text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full z-10 shadow-md">
                            SPICY
                          </span>
                        )}
                      </div>

                      <span className="text-[9px] tracking-[0.2em] text-[#B98532] font-bold uppercase">
                        MAURYA FAVOURITE
                      </span>
                      <h3 className="font-heading text-2.5xl text-[#350709] mt-1 mb-2 leading-tight">
                        {item.name}
                      </h3>
                      <p className="font-sans text-xs text-[#350709]/70 leading-relaxed mb-6">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#350709]/10 pt-4 mt-auto">
                      <span className="font-mono text-base font-bold text-[#350709]">
                        ₹{item.price}
                      </span>

                      {/* Tap add target */}
                      {qty > 0 ? (
                        <div className="flex items-center gap-3 bg-[#8F1115] text-[#F3E8D4] rounded-full px-3 py-1.5 shadow-md">
                          <button 
                            onClick={() => decreaseQuantity(item.id)}
                            className="hover:scale-110 active:scale-95 transition-transform"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono text-xs font-bold min-w-4 text-center">{qty}</span>
                          <button 
                            onClick={(e) => handleAdd(item, e)}
                            className="hover:scale-110 active:scale-95 transition-transform"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => handleAdd(item, e)}
                          className="w-9 h-9 rounded-full bg-[#8F1115] hover:bg-[#8F1115]/90 text-[#F3E8D4] flex items-center justify-center shadow-md active:scale-90 transition-all duration-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. Search Results / Availability Checks */}
        {searchQuery && (
          <div className="mb-10 text-center md:text-left">
            <span className="font-sans text-xs text-[#350709]/60 font-semibold">
              {filteredItems.length} {filteredItems.length === 1 ? "DISH" : "DISHES"} FOUND FOR "{searchQuery.toUpperCase()}"
            </span>
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="py-20 text-center">
            <h3 className="font-heading text-3xl text-[#350709]/80 mb-3">
              NOTHING ON THE TABLE YET.
            </h3>
            <p className="font-sans text-xs text-[#350709]/50 uppercase tracking-widest mb-6">
              Try another craving.
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
              {["PANEER", "DOSA", "CHINESE", "RICE"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSearchQuery(s)}
                  className="px-4 py-2 bg-white hover:bg-[#350709]/5 border border-[#350709]/15 rounded-full text-[10px] font-bold tracking-widest text-[#350709] transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 6. High-Density Menu Category Listings */}
        <div className="space-y-20">
          {Object.entries(groupedItems).map(([catName, dishList], groupIndex) => {
            const slug = catName.replace(/[^a-z0-9]+/g, "-");
            const subtitle =
              CATEGORY_SUBTITLES[catName.toUpperCase()] ||
              "Crafted with fresh ingredients and authentic hospitality.";
            const heroDish =
              dishList.find((d) => d.is_spicy || d.tags?.includes("maurya_favourite")) ||
              dishList[0];

            return (
              <div
                key={catName}
                data-category={catName}
                ref={(el) => {
                  sectionRefs.current[catName] = el;
                }}
                className="scroll-mt-32 space-y-8"
              >
                {/* Category Header */}
                <div className="border-b border-[#B98532]/30 pb-4 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B98532] font-bold">
                      CHAPTER {String(groupIndex + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-serif text-4xl md:text-5xl text-[#350709] font-normal leading-tight">
                      {catName}
                    </h3>
                    <p className="font-serif italic text-sm text-[#B98532]">
                      "{subtitle}"
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#350709]/60 font-bold">
                    {dishList.length} DISHES ON THE TABLE
                  </span>
                </div>

                {/* Giant Category Hero Dish Showcase */}
                {heroDish && (
                  <CategoryHeroDish
                    item={heroDish}
                    onAdd={handleAdd}
                    quantity={getItemQuantity(heroDish.id)}
                  />
                )}

                {/* Two-Column high density Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pt-4">
                  {dishList.map((item) => {
                    const qty = getItemQuantity(item.id);
                    return (
                      <div 
                        key={item.id}
                        className={`flex items-center justify-between min-h-[96px] py-3 border-b border-[#350709]/5 transition-opacity duration-300 ${
                          !item.is_available ? "opacity-50" : ""
                        }`}
                      >
                        {/* Left Details */}
                        <div className="space-y-1 pr-6 flex-1">
                          <div className="flex items-center gap-2.5">
                            {/* Tap target to open peek sheet on mobile */}
                            <button
                              onClick={() => {
                                if (window.innerWidth < 768) {
                                  setPeekItem(item);
                                }
                              }}
                              className="text-left font-sans text-[#350709] font-bold text-sm hover:text-[#8F1115] transition-colors"
                            >
                              {item.name}
                            </button>
                            {item.is_spicy && (
                              <span className="text-[8px] font-bold text-[#8F1115] tracking-widest uppercase">
                                SPICY
                              </span>
                            )}
                          </div>
                          <p className="font-sans text-xs text-[#350709]/60 line-clamp-1">
                            {item.description}
                          </p>
                          {!item.is_available && (
                            <span className="inline-block text-[8px] font-bold text-[#8F1115] tracking-wider uppercase mt-1">
                              CURRENTLY OFF THE TABLE
                            </span>
                          )}
                        </div>

                        {/* Right Price & Controls */}
                        <div className="flex items-center gap-6 shrink-0">
                          <span className="font-mono text-xs font-bold text-[#350709]">
                            ₹{item.price}
                          </span>

                          {item.is_available && (
                            <>
                              {qty > 0 ? (
                                <div className="flex items-center gap-2.5 bg-[#8F1115] text-[#F3E8D4] rounded-full px-2.5 py-1 shadow-md">
                                  <button 
                                    onClick={() => decreaseQuantity(item.id)}
                                    className="hover:scale-110 active:scale-95 transition-transform"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="font-mono text-[10px] font-bold min-w-3 text-center">{qty}</span>
                                  <button 
                                    onClick={(e) => handleAdd(item, e)}
                                    className="hover:scale-110 active:scale-95 transition-transform"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={(e) => handleAdd(item, e)}
                                  className="w-7 h-7 rounded-full bg-[#8F1115] hover:bg-[#8F1115]/90 text-[#F3E8D4] flex items-center justify-center shadow-md active:scale-90 transition-all"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 12. Recommendation Break ("Can't Decide?") */}
                {groupIndex === 1 && (
                  <div 
                    className="w-full bg-[#350709] rounded-3xl p-8 md:p-12 text-center my-16 text-[#F3E8D4]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E")`,
                    }}
                  >
                    <span className="font-sans text-[10px] tracking-[0.25em] text-[#B98532] font-bold uppercase block mb-3">
                      CAN'T DECIDE?
                    </span>
                    <h4 className="font-heading text-3xl md:text-5xl text-[#F3E8D4] mb-8 leading-tight">
                      Let Maurya start the table.
                    </h4>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-8">
                      <button
                        onClick={() => setDecideMood(decideMood === "one" ? null : "one")}
                        className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${
                          decideMood === "one" 
                            ? "bg-[#B98532] border-[#B98532] text-[#350709]" 
                            : "bg-transparent border-[#F3E8D4]/25 text-[#F3E8D4] hover:bg-[#F3E8D4]/5"
                        }`}
                      >
                        FOR ONE
                      </button>
                      <button
                        onClick={() => setDecideMood(decideMood === "two" ? null : "two")}
                        className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${
                          decideMood === "two" 
                            ? "bg-[#B98532] border-[#B98532] text-[#350709]" 
                            : "bg-transparent border-[#F3E8D4]/25 text-[#F3E8D4] hover:bg-[#F3E8D4]/5"
                        }`}
                      >
                        FOR TWO
                      </button>
                      <button
                        onClick={() => setDecideMood(decideMood === "table" ? null : "table")}
                        className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${
                          decideMood === "table" 
                            ? "bg-[#B98532] border-[#B98532] text-[#350709]" 
                            : "bg-transparent border-[#F3E8D4]/25 text-[#F3E8D4] hover:bg-[#F3E8D4]/5"
                        }`}
                      >
                        FOR THE TABLE
                      </button>
                    </div>

                    {/* Can't decide recommendations drawer */}
                    <AnimatePresence>
                      {decideMood && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-white/5 rounded-2xl p-5 border border-white/10 overflow-hidden text-left"
                        >
                          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                            <span className="text-[10px] tracking-widest uppercase text-[#B98532] font-bold">
                              RECOMMENDED FEAST ITEMS
                            </span>
                            <button onClick={() => setDecideMood(null)}>
                              <X className="w-4 h-4 text-white/50" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {recommendedDecideItems.map(item => {
                              const qty = getItemQuantity(item.id);
                              return (
                                <div key={item.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                  <div>
                                    <span className="text-xs text-[#F3E8D4] font-bold">{item.name}</span>
                                    <span className="block font-mono text-[10px] text-[#F3E8D4]/50">₹{item.price}</span>
                                  </div>
                                  <button
                                    onClick={(e) => handleAdd(item, e)}
                                    className="px-3 py-1 bg-[#8F1115] hover:bg-[#8F1115]/90 rounded text-[9px] font-bold uppercase tracking-widest text-[#F3E8D4]"
                                  >
                                    {qty > 0 ? `ADD MORE (${qty})` : "ADD"}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Contextual Hover Image Preview (Desktop) */}
      <AnimatePresence>
        {hoveredItem && hoveredItem.image_url && (
          <motion.div
            ref={previewRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="hidden md:block fixed z-50 pointer-events-none w-56 aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#B98532]/40 bg-[#350709] shadow-2xl"
            style={{
              x: mouseX,
              y: mouseY,
            }}
          >
            <img
              src={hoveredItem.image_url}
              alt={hoveredItem.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. Dish Peek Bottom Sheet (Mobile) */}
      <AnimatePresence>
        {peekItem && (
          <div className="fixed inset-0 z-[110] flex items-end justify-center md:hidden">
            {/* Overlay */}
            <motion.div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPeekItem(null)}
            />
            {/* Sheet */}
            <motion.div 
              className="relative w-full bg-[#F3E8D4] rounded-t-3xl border-t border-[#350709]/10 p-6 flex flex-col gap-6 shadow-2xl z-10"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
            >
              {/* Drag bar indicator */}
              <div className="w-12 h-1.5 bg-[#350709]/10 rounded-full mx-auto" />
              
              {/* Peek Content */}
              <div>
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 border border-[#350709]/10 bg-[#350709]/5">
                  {peekItem.image_url ? (
                    <img
                      src={peekItem.image_url}
                      alt={peekItem.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl font-heading text-[#350709]/20">
                      {peekItem.name[0]}
                    </div>
                  )}
                </div>
                <h3 className="font-heading text-3xl text-[#350709] mb-1">{peekItem.name}</h3>
                <p className="font-sans text-xs text-[#350709]/70 leading-relaxed mb-4">{peekItem.description}</p>
                <div className="font-mono text-lg font-bold text-[#350709]">₹{peekItem.price}</div>
              </div>

              {/* Add / Qty block */}
              <div className="flex items-center gap-4 mt-auto">
                {getItemQuantity(peekItem.id) > 0 ? (
                  <div className="flex-1 flex items-center justify-between bg-[#8F1115] text-[#F3E8D4] rounded-xl px-5 py-3 shadow-md">
                    <button 
                      onClick={() => decreaseQuantity(peekItem.id)}
                      className="text-lg p-1"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="font-mono text-sm font-bold">{getItemQuantity(peekItem.id)}</span>
                    <button 
                      onClick={() => addItem(peekItem)}
                      className="text-lg p-1"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addItem(peekItem)}
                    className="flex-1 py-4 bg-[#8F1115] text-[#F3E8D4] text-xs font-bold uppercase tracking-widest rounded-xl shadow-md"
                  >
                    ADD TO TABLE
                  </button>
                )}
                <button
                  onClick={() => setPeekItem(null)}
                  className="px-5 py-4 border border-[#350709]/20 text-[#350709] text-xs font-bold uppercase tracking-widest rounded-xl"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 9. Mobile Sticky "Your Table" Bar */}
      <AnimatePresence>
        {mounted && totalItemsCount > 0 && !isCartOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 w-full bg-[#350709] text-[#F3E8D4] z-40 border-t border-[#B98532]/25 pb-safe md:hidden"
            onClick={() => setCartOpen(true)}
          >
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <span className="block text-[8px] tracking-[0.2em] text-[#B98532] font-bold uppercase">
                  {String(totalItemsCount).padStart(2, "0")} ON YOUR TABLE
                </span>
                <span className="font-mono text-base font-bold text-[#F3E8D4]">
                  ₹{cartTotal}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F3E8D4]">
                <span>VIEW YOUR TABLE</span>
                <ArrowRight className="w-4 h-4 text-[#B98532]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 10. Desktop Persistent Summary Tab */}
      <AnimatePresence>
        {mounted && totalItemsCount > 0 && !isCartOpen && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="hidden md:flex fixed right-0 top-1/3 z-40 group"
          >
            {/* Small tab */}
            <div className="bg-[#350709] text-[#F3E8D4] border-l-2 border-y border-[#B98532]/35 py-6 px-3.5 rounded-l-2xl shadow-xl flex flex-col items-center gap-4 cursor-pointer group-hover:hidden transition-all duration-300">
              <span className="font-mono text-lg font-bold text-[#B98532]">
                {String(totalItemsCount).padStart(2, "0")}
              </span>
              <span className="font-sans text-[8px] font-bold tracking-[0.25em] vertical-text uppercase">
                YOUR TABLE
              </span>
              <span className="font-mono text-xs font-bold">
                ₹{cartTotal}
              </span>
            </div>

            {/* Hover Expansion summary card */}
            <div 
              onClick={() => setCartOpen(true)}
              className="hidden group-hover:flex flex-col bg-[#350709] text-[#F3E8D4] border-l-2 border-y border-[#B98532]/30 p-5 rounded-l-2xl shadow-2xl w-64 gap-4 cursor-pointer transition-all duration-300"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[10px] tracking-widest uppercase font-bold text-[#B98532]">
                  YOUR TABLE
                </span>
                <span className="font-mono text-xs font-bold bg-[#8F1115] px-2 py-0.5 rounded-full">
                  {totalItemsCount}
                </span>
              </div>
              
              <div className="max-h-48 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {cartItems.map((i) => (
                  <div key={i.item.id} className="flex justify-between text-xs font-sans text-white/80">
                    <span className="truncate max-w-[140px]">{i.item.name}</span>
                    <span className="font-mono text-[10px]">{i.quantity} × ₹{i.item.price}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                <span className="text-xs font-bold text-white/50">SUBTOTAL</span>
                <span className="font-mono text-sm font-bold text-[#F3E8D4]">₹{cartTotal}</span>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B98532] mt-2 group/btn">
                <span>VIEW TABLE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 11. Final CTA: LET MAURYA SET THE TABLE */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <MenuFinalCTA onSelectOption={(m) => setDecideMood(m as any)} />
      </div>
    </div>
  );
}
