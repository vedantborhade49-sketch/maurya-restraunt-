"use client";

import React from "react";
import { useTableStore } from "../../stores/table-store";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function YourTableDrawer() {
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
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[100] w-full sm:w-[450px] bg-midnight border-l border-white/10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-wine/30">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-gold w-5 h-5" />
                <div>
                  <h2 className="font-heading text-xl text-gold tracking-wide">Your Table</h2>
                  <p className="text-[10px] text-soft-ivory/50 uppercase tracking-widest mt-0.5">
                    {itemCount} {itemCount === 1 ? "Dish" : "Dishes"} Selected
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-soft-ivory/60 hover:text-gold hover:bg-white/5 rounded-full transition-colors"
                aria-label="Close Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-wine/10 flex items-center justify-center mb-4 border border-wine/30">
                      <ShoppingBag className="text-gold/40 w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-lg text-gold mb-1">Your table is empty</h3>
                    <p className="text-xs text-soft-ivory/50 max-w-[250px]">
                      Explore our menu and add items to your table to begin your feast.
                    </p>
                  </motion.div>
                ) : (
                  items.map((cartItem, idx) => (
                    <motion.div
                      key={cartItem.item.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: "hidden" }}
                      transition={{ delay: idx * 0.04 }}
                      className="p-4 rounded-xl border border-white/5 bg-wine/5 flex gap-4 items-center justify-between"
                    >
                      {cartItem.item.image_url ? (
                        <img
                          src={cartItem.item.image_url}
                          alt={cartItem.item.name}
                          className="w-16 h-16 rounded-lg object-cover border border-white/10 shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-wine/20 flex items-center justify-center border border-white/10 text-gold font-heading text-lg shrink-0">
                          {cartItem.item.name[0]}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          {cartItem.item.is_veg && (
                            <span className="w-2.5 h-2.5 border border-veg-green flex items-center justify-center p-0.5">
                              <span className="w-1 h-1 bg-veg-green rounded-full"></span>
                            </span>
                          )}
                          <h4 className="font-semibold text-sm truncate text-soft-ivory hover:text-gold transition-colors">
                            {cartItem.item.name}
                          </h4>
                        </div>
                        <p className="text-xs text-gold/80 mt-1 font-mono">
                          ₹{cartItem.item.price}
                        </p>

                        {/* Quantity Adjusters */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => decreaseQuantity(cartItem.item.id)}
                            className="w-6 h-6 rounded-md bg-white/5 hover:bg-wine/30 border border-white/10 flex items-center justify-center text-soft-ivory hover:text-gold transition-colors"
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
                            className={`w-6 h-6 rounded-md bg-white/5 hover:bg-wine/30 border border-white/10 flex items-center justify-center text-soft-ivory hover:text-gold transition-colors ${
                              cartItem.item.is_available === false ? "opacity-30 cursor-not-allowed" : ""
                            }`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right flex flex-col items-end gap-2">
                        <span className="text-sm font-semibold font-mono text-soft-ivory">
                          ₹{cartItem.item.price * cartItem.quantity}
                        </span>
                        <button
                          onClick={() => removeItem(cartItem.item.id)}
                          className="p-1.5 text-soft-ivory/40 hover:text-crimson hover:bg-crimson/10 rounded-md transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-wine/10 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-soft-ivory/60">Subtotal</span>
                  <span className="font-mono text-lg font-bold text-gold">₹{subtotal}</span>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-center text-xs font-bold uppercase tracking-widest text-soft-ivory hover:bg-white/5 transition-colors"
                  >
                    Close
                  </button>
                  <Link
                    href="/order"
                    onClick={() => setIsOpen(false)}
                    className="flex-[2] py-3 px-4 rounded-xl bg-crimson hover:bg-crimson/90 text-center text-xs font-bold uppercase tracking-widest text-white transition-all hover:shadow-lg shadow-crimson/20 active:translate-y-px"
                  >
                    Continue to Order
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
