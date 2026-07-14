"use client";

// Maurya Analytics Event Tracker (Phase 20)
export type MauryaEventName =
  | "hero_menu_click"
  | "hero_order_click"
  | "menu_view"
  | "category_select"
  | "menu_search"
  | "dish_view"
  | "add_to_table"
  | "remove_from_table"
  | "cart_open"
  | "checkout_start"
  | "delivery_selected"
  | "pickup_selected"
  | "order_created"
  | "whatsapp_opened"
  | "booking_started"
  | "booking_submitted"
  | "call_clicked"
  | "directions_clicked"
  | "instagram_clicked";

export const trackEvent = (eventName: MauryaEventName, params?: Record<string, any>) => {
  if (typeof window === "undefined") return;

  // Log to console for development audit tracking
  console.log(`[Maurya Analytics] Event fired: "${eventName}"`, params || "");

  // Push to Google Analytics (gtag) if loaded
  if (typeof (window as any).gtag === "function") {
    try {
      (window as any).gtag("event", eventName, params);
    } catch (e) {
      console.warn("Failed to log event to Google Analytics:", e);
    }
  }
};
