"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category?: string;
  is_veg?: boolean;
  is_available?: boolean;
  is_bestseller?: boolean;
  is_signature?: boolean;
  is_spicy?: boolean;
  tags?: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface TableState {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  clearTable: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
}

export const useTableStore = create<TableState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setIsOpen: (open) => set({ isOpen: open }),
      addItem: (item) => {
        const currentItems = get().items;
        const existing = currentItems.find((i) => i.item.id === item.id);
        
        if (existing) {
          set({
            items: currentItems.map((i) =>
              i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...currentItems, { item, quantity: 1 }] });
        }
      },
      removeItem: (itemId) => {
        set({
          items: get().items.filter((i) => i.item.id !== itemId),
        });
      },
      increaseQuantity: (itemId) => {
        set({
          items: get().items.map((i) =>
            i.item.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        });
      },
      decreaseQuantity: (itemId) => {
        const currentItems = get().items;
        const existing = currentItems.find((i) => i.item.id === itemId);
        
        if (existing && existing.quantity > 1) {
          set({
            items: currentItems.map((i) =>
              i.item.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
            ),
          });
        } else {
          set({
            items: currentItems.filter((i) => i.item.id !== itemId),
          });
        }
      },
      clearTable: () => set({ items: [] }),
      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.item.price * item.quantity, 0);
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "maurya_table",
    }
  )
);
