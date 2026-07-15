"use client";

import React, { useState } from "react";
import { useTableStore } from "../../stores/table-store";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function YourTableDrawer() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const { 
    items, 
    isOpen, 
    setIsOpen, 
    increaseQuantity, 
    decreaseQuantity, 
    removeItem, 
    getSubtotal,
    getItemCount
  } = useTableStore();

  const subtotal = getSubtotal();
  const itemCount = getItemCount();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Panel - Styled as a Vintage Restaurant Order Slip */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-[100] w-full sm:w-[460px] bg-[#F3E8D4] text-[#350709] border-l border-[#350709]/20 shadow-2xl flex flex-col font-sans select-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E")`,
            }}
          >
            {/* Header: Vintage Receipt Design */}
            <div className="p-8 border-b border-[#350709]/20">
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-heading text-2xl font-bold tracking-widest text-[#8F1115]">
                  MAURYA
                </span>
                <span className="font-mono text-xs tracking-wider border border-[#350709]/30 px-2 py-0.5 rounded">
                  TBL-03
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-heading text-lg italic tracking-wide text-[#350709]/80 uppercase">
                    Your Table
                  </h2>
                  <p className="text-[10px] text-[#350709]/60 font-mono tracking-wider mt-1">
                    {itemCount} {itemCount === 1 ? "Dish" : "Dishes"} on the table
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-[#350709]/60 hover:text-[#350709] border border-[#350709]/10 rounded-full hover:bg-[#350709]/5 transition-colors"
                  aria-label="Close Drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {/* Receipt Dotted Separator */}
              <div className="border-b border-dashed border-[#350709]/20 w-full mt-4" />
            </div>

            {/* Items List (Receipt Slip Rows) */}
            <div className="flex-1 overflow-y-auto px-8 py-4 space-y-6 no-scrollbar">
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-12 h-12 rounded-full border border-dashed border-[#350709]/30 flex items-center justify-center mb-4">
                      <span className="text-[#350709]/40 font-heading text-xl">M</span>
                    </div>
                    <h3 className="font-heading italic text-lg text-[#350709]/80 mb-2">
                      Your table looks lonely
                    </h3>
                    <p className="text-xs text-[#350709]/50 max-w-[240px] leading-relaxed">
                      Select dishes from the menu to populate your table and begin the feast.
                    </p>
                  </motion.div>
                ) : (
                  items.map((cartItem, idx) => (
                    <motion.div
                      key={cartItem.item.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, overflow: "hidden", marginBottom: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="flex flex-col gap-2 pb-4 border-b border-dashed border-[#350709]/15"
                    >
                      <div className="flex gap-4 items-start justify-between">
                        {/* Image representation or letter placeholder */}
                        {cartItem.item.image_url && !imageErrors[cartItem.item.id] ? (
                          <img
                            src={cartItem.item.image_url}
                            alt={cartItem.item.name}
                            className="w-14 h-14 rounded-md object-cover border border-[#350709]/20 shrink-0"
                            onError={() => {
                              setImageErrors((prev) => ({ ...prev, [cartItem.item.id]: true }));
                            }}
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-md bg-[#350709]/5 flex items-center justify-center border border-[#350709]/10 text-[#350709] font-heading text-lg font-bold shrink-0">
                            {cartItem.item.name[0]}
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            {cartItem.item.is_veg && (
                              <span className="w-2.5 h-2.5 border border-[#164C2B] flex items-center justify-center p-0.5 shrink-0">
                                <span className="w-1 h-1 bg-[#164C2B] rounded-full"></span>
                              </span>
                            )}
                            <h4 className="font-sans font-bold text-xs uppercase tracking-wider truncate text-[#350709]">
                              {cartItem.item.name}
                            </h4>
                          </div>

                          <div className="text-[11px] text-[#350709]/70 font-mono mt-1">
                            {cartItem.quantity} × ₹{cartItem.item.price}
                          </div>

                          {/* Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => decreaseQuantity(cartItem.item.id)}
                              className="w-5 h-5 rounded bg-[#350709]/5 hover:bg-[#350709]/10 border border-[#350709]/20 flex items-center justify-center text-[#350709] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono w-4 text-center">
                              {cartItem.item.is_available === false ? 0 : cartItem.quantity}
                            </span>
                            <button
                              onClick={() => {
                                if (cartItem.item.is_available !== false) {
                                  increaseQuantity(cartItem.item.id);
                                }
                              }}
                              disabled={cartItem.item.is_available === false}
                              className="w-5 h-5 rounded bg-[#350709]/5 hover:bg-[#350709]/10 border border-[#350709]/20 flex items-center justify-center text-[#350709] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Price and Remove */}
                        <div className="text-right flex flex-col items-end justify-between h-14">
                          <span className="text-xs font-bold font-mono text-[#350709]">
                            ₹{cartItem.item.price * cartItem.quantity}
                          </span>
                          <button
                            onClick={() => removeItem(cartItem.item.id)}
                            className="text-[#350709]/40 hover:text-[#8F1115] p-1 rounded hover:bg-[#8F1115]/5 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer Summary - Styled like Receipt Total */}
            {items.length > 0 && (
              <div className="p-8 border-t border-[#350709]/20 space-y-6">
                <div className="flex items-center justify-between font-sans">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#350709]/70">
                    YOUR FEAST
                  </span>
                  <span className="font-mono text-xl font-extrabold text-[#8F1115]">
                    ₹{subtotal}
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  <Link
                    href="/order"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-4 rounded-xl bg-[#8F1115] hover:bg-[#8F1115]/95 text-center text-xs font-bold uppercase tracking-widest text-[#F3E8D4] transition-all hover:shadow-lg hover:shadow-[#8F1115]/20 flex items-center justify-center gap-2"
                  >
                    Continue to Order
                    <span className="text-sm">→</span>
                  </Link>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full py-2 text-center text-[10px] font-sans uppercase tracking-widest text-[#350709]/60 hover:text-[#350709] transition-colors"
                  >
                    Close Table
                  </button>
                </div>

                {/* Microcopy message */}
                <div className="text-center font-heading italic text-xs text-[#350709]/70 pt-2 border-t border-[#350709]/10">
                  Good choice. The kitchen will love this.
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
