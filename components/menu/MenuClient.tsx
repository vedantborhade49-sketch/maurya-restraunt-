"use client";

import React, { useState, useTransition, useMemo } from "react";
import { useTableStore, MenuItem } from "../../stores/table-store";
import { Search, Sparkles, AlertCircle, ShoppingBag, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuClientProps {
  initialCategories: any[];
  initialItems: MenuItem[];
}

export default function MenuClient({ initialCategories, initialItems }: MenuClientProps) {
  const [categories] = useState(initialCategories);
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [isPending, startTransition] = useTransition();

  const { items: cartItems, addItem, decreaseQuantity } = useTableStore();

  // Local filter
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === "ALL" ||
        item.category?.toUpperCase() === selectedCategory.toUpperCase();
      
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  // Track quantities in cart
  const getItemQuantity = (itemId: string) => {
    return cartItems.find((i) => i.item.id === itemId)?.quantity || 0;
  };

  // Add to table animation triggers
  const handleAddToTable = (item: MenuItem) => {
    addItem(item);
    
    // Custom micro-animation trigger (Card scale squeeze / particle trail)
    const cardEl = document.getElementById(`dish-card-${item.id}-${item.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`);
    if (cardEl) {
      cardEl.classList.add("scale-[0.97]", "border-gold/50");
      setTimeout(() => {
        cardEl.classList.remove("scale-[0.97]", "border-gold/50");
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-midnight pt-28 pb-16 px-4 sm:px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 noise-bg" />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center relative z-10">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold">04 — Culinary Feast</span>
        <h1 className="font-heading text-4xl md:text-6xl text-soft-ivory tracking-wide mt-2">The Living Menu</h1>
        <p className="text-xs text-soft-ivory/60 uppercase tracking-widest mt-2">
          Pure Veg • Prepared Fresh Daily
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
        {/* Sticky Sidebar Category Rail (Desktop) / Horizontal Rail (Mobile) */}
        <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-24 h-fit bg-wine/5 border border-white/5 p-4 rounded-2xl backdrop-blur-md">
          <h3 className="hidden lg:block font-heading text-lg text-gold tracking-wide mb-4">Categories</h3>
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 no-scrollbar pb-2 lg:pb-0">
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-200 text-left shrink-0 ${
                selectedCategory === "ALL"
                  ? "bg-gold text-midnight"
                  : "bg-white/5 text-soft-ivory/70 hover:bg-white/10 hover:text-soft-ivory"
              }`}
            >
              All Dishes
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-200 text-left shrink-0 ${
                  selectedCategory.toUpperCase() === cat.name.toUpperCase()
                    ? "bg-gold text-midnight"
                    : "bg-white/5 text-soft-ivory/70 hover:bg-white/10 hover:text-soft-ivory"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-ivory/40" />
            <input
              type="text"
              placeholder="Search dishes (e.g. paneer, dosa, maratha)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-wine/5 border border-white/10 text-soft-ivory placeholder:text-soft-ivory/40 focus:outline-none focus:border-gold/40 transition-colors text-sm"
            />
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                const qty = getItemQuantity(item.id);
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    id={`dish-card-${item.id}-${item.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    key={`${item.id}-${item.category}`}
                    className="p-5 rounded-2xl border border-white/5 bg-wine/5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:bg-wine/10"
                    data-cursor="EXPLORE"
                  >
                    <div>
                      {/* Image header */}
                      <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 border border-white/10 bg-wine/20">
                        {item.image_url && !imageErrors[item.id] ? (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={() => {
                              setImageErrors((prev) => ({ ...prev, [item.id]: true }));
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gold font-heading text-3xl">
                            {item.name[0]}
                          </div>
                        )}
                        
                        {/* Badges overlay */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                          {item.is_veg && (
                            <span className="w-5 h-5 border-2 border-veg-green bg-midnight flex items-center justify-center p-1 rounded-sm shadow-md">
                              <span className="w-2 h-2 bg-veg-green rounded-full"></span>
                            </span>
                          )}
                        </div>

                        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                          {item.is_signature && (
                            <span className="px-2.5 py-0.5 rounded-full bg-gold text-midnight text-[8px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-md">
                              <Sparkles className="w-2 h-2" /> Signature
                            </span>
                          )}
                          {item.is_bestseller && (
                            <span className="px-2.5 py-0.5 rounded-full bg-crimson text-white text-[8px] font-bold uppercase tracking-widest shadow-md">
                              Bestseller
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title & Desc */}
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-heading text-lg font-bold tracking-wide text-soft-ivory">
                          {item.name}
                        </h3>
                        <span className="font-mono text-base font-bold text-gold shrink-0">
                          ₹{item.price}
                        </span>
                      </div>
                      
                      <p className="text-xs text-soft-ivory/60 mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Actions footer */}
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] text-soft-ivory/40 uppercase tracking-widest font-mono">
                        {item.category}
                      </span>

                      {item.is_available === false ? (
                        <span className="px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> Unavailable
                        </span>
                      ) : qty > 0 ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-wine/30 border border-white/10 flex items-center justify-center text-soft-ivory hover:text-gold transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-mono font-bold w-6 text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => handleAddToTable(item)}
                            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-wine/30 border border-white/10 flex items-center justify-center text-soft-ivory hover:text-gold transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToTable(item)}
                          className="px-4 py-2 rounded-lg bg-crimson hover:bg-crimson/90 text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Add to Table
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredItems.length === 0 && (
              <div className="col-span-full py-16 text-center">
                <p className="text-soft-ivory/50 text-sm">No dishes found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
