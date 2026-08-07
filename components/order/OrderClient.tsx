"use client";

import React, { useState, useEffect } from "react";
import { useTableStore } from "../../stores/table-store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShoppingBag, ChevronRight, MapPin, CreditCard, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { db } from "../../lib/db";

const checkoutSchema = z.object({
  customerName: z.string().min(3, "Name must be at least 3 characters"),
  customerPhone: z.string().regex(/^\d{10}$/, "Phone must be a valid 10-digit number"),
  orderType: z.enum(["DELIVERY", "PICKUP"]),
  address: z.string().optional(),
  landmark: z.string().optional(),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be exactly 6 digits").optional().or(z.literal("")),
  paymentPreference: z.enum(["COD", "UPI"]),
  specialInstructions: z.string().optional(),
}).refine(
  (data) => {
    if (data.orderType === "DELIVERY" && (!data.address || data.address.trim().length === 0)) {
      return false;
    }
    return true;
  },
  {
    message: "Delivery address is required",
    path: ["address"],
  }
).refine(
  (data) => {
    if (data.orderType === "DELIVERY" && (!data.pincode || data.pincode.trim().length === 0)) {
      return false;
    }
    return true;
  },
  {
    message: "Delivery pincode is required",
    path: ["pincode"],
  }
);

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function OrderClient() {
  const { items, getSubtotal, clearTable } = useTableStore();
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = getSubtotal();
  const deliveryCharge = 0; // Free under 3km service area
  const total = subtotal + (deliveryCharge);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      orderType: "DELIVERY",
      paymentPreference: "COD",
      pincode: "",
      address: "",
      landmark: "",
      specialInstructions: "",
    },
  });

  const orderType = watch("orderType");

  const onSubmit = async (data: CheckoutFormValues) => {
    setLoading(true);
    try {
      // 1. Create order in the database
      const orderPayload = {
        customer_name: data.customerName,
        customer_phone: data.customerPhone,
        order_type: data.orderType,
        address: data.orderType === "DELIVERY" ? data.address : null,
        landmark: data.orderType === "DELIVERY" ? data.landmark : null,
        pincode: data.orderType === "DELIVERY" ? data.pincode : null,
        subtotal: subtotal,
        delivery_charge: data.orderType === "DELIVERY" ? deliveryCharge : 0,
        total: data.orderType === "DELIVERY" ? total : subtotal,
        payment_preference: data.paymentPreference === "COD" ? "Cash on Delivery" : "UPI on Confirmation",
        special_instructions: data.specialInstructions || null,
      };

      const newOrder = await db.createOrder(orderPayload, items);

      if (newOrder) {
        // 2. Generate WhatsApp message
        const orderSummaryList = items
          .map((i) => `${i.quantity} × ${i.item.name.padEnd(20)} ₹${i.item.price * i.quantity}`)
          .join("\n");

        const message = `🍽️ NEW MAURYA ORDER

Order ID: ${newOrder.order_number}

CUSTOMER
Name: ${data.customerName}
Phone: ${data.customerPhone}

ORDER
${orderSummaryList}
────────────────
Subtotal               ₹${subtotal}
Delivery               ${data.orderType === "DELIVERY" ? "FREE (Under 3km)*" : "Self Pickup"}
Total                  ₹${data.orderType === "DELIVERY" ? total : subtotal}

${
  data.orderType === "DELIVERY"
    ? `DELIVERY ADDRESS\n${data.address}${data.landmark ? `\nLandmark: ${data.landmark}` : ""}${data.pincode ? `\nPincode: ${data.pincode}` : ""}\n\n*Note: Delivery is free and under 3km service area. Delivery in areas farther than 3km will have delivery charges applied.`
    : "PICKUP OPTION\nSelf Pickup from Maurya Veg, Kondhwa, Pune"
}

Payment:
${data.paymentPreference === "COD" ? "Cash on Delivery" : "UPI on Confirmation"}

${data.specialInstructions ? `Special Instructions:\n${data.specialInstructions}` : ""}

Please confirm my order.`;

        // 3. Mark whatsapp opened trigger in db
        await db.markOrderWhatsAppOpened(newOrder.id);

        // 4. Redirect to WhatsApp universal link
        const encodedText = encodeURIComponent(message);
        const whatsappNumber = "918329895846"; // Maurya primary restaurant number
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
        
        window.open(whatsappUrl, "_blank");

        // Set success state
        setOrderSuccess(newOrder);
        clearTable();
      }
    } catch (e) {
      console.error("Order submission failed", e);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-midnight pt-32 pb-16 px-6 flex items-center justify-center relative">
        <div className="absolute inset-0 noise-bg" />
        <div className="max-w-md w-full bg-wine/10 border border-white/10 p-8 rounded-2xl text-center relative z-10">
          <div className="w-16 h-16 bg-veg-green/10 border border-veg-green/30 text-veg-green rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-heading text-3xl text-gold mb-2">Order Initiated</h2>
          <p className="text-xs text-soft-ivory/60 uppercase tracking-widest mb-6">
            ID: {orderSuccess.order_number}
          </p>
          <p className="text-sm text-soft-ivory/70 leading-relaxed mb-8">
            Your table order has been recorded. We've opened a WhatsApp pre-filled chat for you to send this directly to Maurya. Our team will review and confirm availability.
          </p>
          <div className="space-y-3">
            <a
              href={`https://wa.me/918329895846?text=${encodeURIComponent(
                `Hi, checking on order status for ID: ${orderSuccess.order_number}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 bg-veg-green hover:bg-veg-green/90 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
            >
              Reopen WhatsApp Chat
            </a>
            <Link
              href="/menu"
              className="block w-full py-3 bg-white/5 hover:bg-white/10 text-soft-ivory rounded-xl border border-white/10 font-bold text-xs uppercase tracking-widest transition-all"
            >
              Back to Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight pt-28 pb-16 px-4 sm:px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 noise-bg" />
      
      <div className="max-w-5xl mx-auto mb-8 relative z-10">
        <Link href="/menu" className="inline-flex items-center gap-2 text-xs text-gold hover:text-soft-ivory transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Menu
        </Link>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Side: Order Form */}
        <div className="lg:col-span-7 bg-[#350709]/10 border border-[#B98532]/25 p-6 md:p-8 rounded-2xl backdrop-blur-md shadow-2xl">
          <h2 className="font-heading text-3xl text-[#F3E8D4] mb-6 tracking-wide">Checkout Details</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 font-sans">
            {/* Name */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#F3E8D4]/60 mb-2 font-bold">Full Name</label>
              <input
                type="text"
                {...register("customerName")}
                className="w-full px-4 py-3 rounded-xl bg-[#0B0908] border border-[#B98532]/20 text-[#F3E8D4] focus:outline-none focus:border-[#B98532]/60 focus:shadow-[0_0_12px_rgba(185,133,50,0.1)] text-sm transition-all duration-300"
                placeholder="e.g. Bhumit Gupta"
              />
              {errors.customerName && (
                <span className="text-xs text-[#8F1115] mt-1 block">{errors.customerName.message}</span>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#F3E8D4]/60 mb-2 font-bold">Phone Number</label>
              <input
                type="tel"
                {...register("customerPhone")}
                className="w-full px-4 py-3 rounded-xl bg-[#0B0908] border border-[#B98532]/20 text-[#F3E8D4] focus:outline-none focus:border-[#B98532]/60 focus:shadow-[0_0_12px_rgba(185,133,50,0.1)] text-sm transition-all duration-300"
                placeholder="e.g. 98XXXXXXXX"
              />
              {errors.customerPhone && (
                <span className="text-xs text-[#8F1115] mt-1 block">{errors.customerPhone.message}</span>
              )}
            </div>

            {/* Delivery vs Pickup Toggle */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#F3E8D4]/60 mb-2 font-bold">Order Method</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                  orderType === "DELIVERY"
                    ? "border-[#B98532] bg-[#B98532]/10 text-[#B98532]"
                    : "border-white/10 bg-[#0B0908] text-[#F3E8D4]/60"
                }`}>
                  <input type="radio" value="DELIVERY" {...register("orderType")} className="hidden" />
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Delivery</span>
                </label>
                <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                  orderType === "PICKUP"
                    ? "border-[#B98532] bg-[#B98532]/10 text-[#B98532]"
                    : "border-white/10 bg-[#0B0908] text-[#F3E8D4]/60"
                }`}>
                  <input type="radio" value="PICKUP" {...register("orderType")} className="hidden" />
                  <ShoppingBag className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Pickup</span>
                </label>
              </div>
            </div>

            {/* Address fields (Only show if Delivery is chosen) */}
            {orderType === "DELIVERY" && (
              <div className="space-y-4 pt-2">
                {/* Home delivery policy notice */}
                <div className="p-4 rounded-xl bg-[#B98532]/15 border border-[#B98532]/40 flex items-start gap-3 shadow-md">
                  <MapPin className="w-5 h-5 text-[#B98532] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#F3E8D4] uppercase tracking-wider mb-1">
                      For Home Delivery Orders
                    </h4>
                    <p className="text-xs text-[#F3E8D4]/90 leading-relaxed font-sans">
                      Delivery is <span className="text-[#B98532] font-bold">free and under 3km service area</span>. Delivery in areas farther than 3km will have delivery charges applied.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#F3E8D4]/60 mb-2 font-bold">Delivery Address</label>
                  <textarea
                    rows={3}
                    {...register("address")}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0908] border border-[#B98532]/20 text-[#F3E8D4] focus:outline-none focus:border-[#B98532]/60 focus:shadow-[0_0_12px_rgba(185,133,50,0.1)] text-sm transition-all duration-300 resize-none"
                    placeholder="Street name, building number, locality..."
                  />
                  {errors.address && (
                    <span className="text-xs text-[#8F1115] mt-1 block">{errors.address.message}</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#F3E8D4]/60 mb-2 font-bold">Landmark</label>
                    <input
                      type="text"
                      {...register("landmark")}
                      className="w-full px-4 py-3 rounded-xl bg-[#0B0908] border border-[#B98532]/20 text-[#F3E8D4] focus:outline-none focus:border-[#B98532]/60 focus:shadow-[0_0_12px_rgba(185,133,50,0.1)] text-sm transition-all duration-300"
                      placeholder="e.g. Near X School"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#F3E8D4]/60 mb-2 font-bold">Pincode</label>
                    <input
                      type="text"
                      {...register("pincode")}
                      className="w-full px-4 py-3 rounded-xl bg-[#0B0908] border border-[#B98532]/20 text-[#F3E8D4] focus:outline-none focus:border-[#B98532]/60 focus:shadow-[0_0_12px_rgba(185,133,50,0.1)] text-sm transition-all duration-300"
                      placeholder="e.g. 411048"
                    />
                    {errors.pincode && (
                      <span className="text-xs text-[#8F1115] mt-1 block">{errors.pincode.message}</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Payment options */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#F3E8D4]/60 mb-2 font-bold">Payment Option</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                  watch("paymentPreference") === "COD"
                    ? "border-[#B98532] bg-[#B98532]/10 text-[#B98532]"
                    : "border-white/10 bg-[#0B0908] text-[#F3E8D4]/60"
                }`}>
                  <input type="radio" value="COD" {...register("paymentPreference")} className="hidden" />
                  <CreditCard className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest font-sans">Cash on Delivery</span>
                </label>
                <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                  watch("paymentPreference") === "UPI"
                    ? "border-[#B98532] bg-[#B98532]/10 text-[#B98532]"
                    : "border-white/10 bg-[#0B0908] text-[#F3E8D4]/60"
                }`}>
                  <input type="radio" value="UPI" {...register("paymentPreference")} className="hidden" />
                  <CreditCard className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest font-sans">UPI on Confirm</span>
                </label>
              </div>
            </div>

            {/* Special instructions */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#F3E8D4]/60 mb-2 font-bold">Special Instructions</label>
              <textarea
                rows={2}
                {...register("specialInstructions")}
                className="w-full px-4 py-3 rounded-xl bg-[#0B0908] border border-[#B98532]/20 text-[#F3E8D4] focus:outline-none focus:border-[#B98532]/60 focus:shadow-[0_0_12px_rgba(185,133,50,0.1)] text-sm transition-all duration-300 resize-none"
                placeholder="e.g. Less spicy, keep napkins..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="w-full py-4 bg-[#8F1115] hover:bg-[#8F1115]/90 text-[#F3E8D4] rounded-xl font-bold text-xs uppercase tracking-[0.15em] transition-all shadow-lg shadow-[#8F1115]/20 flex items-center justify-center gap-2 active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed font-sans"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Creating Order...
                </>
              ) : (
                <>
                  Send Order via WhatsApp <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Table Cart Summary */}
        <div 
          className="lg:col-span-5 bg-[#F3E8D4] text-[#350709] border border-[#B98532]/35 p-6 md:p-8 rounded-2xl h-fit shadow-[0_15px_45px_rgba(0,0,0,0.45)] relative overflow-hidden font-sans"
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.03\'/%3E%3C/svg%3E")' 
          }}
        >
          <div className="border-b border-dashed border-[#350709]/15 pb-4 mb-6">
            <span className="block text-[9px] tracking-[0.25em] text-[#8F1115] font-extrabold uppercase">
              EST. 2026 / KONDHWA
            </span>
            <h3 className="font-heading text-3xl text-[#350709] mt-1 tracking-tight">Your Selections</h3>
          </div>
          
          {items.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm text-[#350709]/50">Your table has no items. Go add some dishes!</p>
              <Link 
                href="/menu" 
                className="mt-4 inline-block px-6 py-2 bg-[#8F1115] hover:bg-[#8F1115]/95 text-[#F3E8D4] rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md"
              >
                Go to Menu
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="max-h-64 overflow-y-auto space-y-3 pr-2 no-scrollbar">
                {items.map((cartItem) => (
                  <div key={cartItem.item.id} className="flex justify-between items-center gap-4 py-2 border-b border-dashed border-[#350709]/10">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        {cartItem.item.is_veg && (
                          <span className="w-2.5 h-2.5 border border-[#164C2B] flex items-center justify-center p-0.5 shrink-0">
                            <span className="w-1.5 h-1.5 bg-[#164C2B] rounded-full"></span>
                          </span>
                        )}
                        <span className="text-xs font-bold text-[#350709] truncate">{cartItem.item.name}</span>
                      </div>
                      <span className="text-[10px] text-[#350709]/60 font-mono mt-0.5 block">{cartItem.quantity} × ₹{cartItem.item.price}</span>
                    </div>
                    <span className="text-xs font-bold font-mono text-[#350709] shrink-0">₹{cartItem.item.price * cartItem.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-[#350709]/70">
                  <span className="font-bold">Subtotal</span>
                  <span className="font-mono text-[#350709] font-bold">₹{subtotal}</span>
                </div>
                {orderType === "DELIVERY" && (
                  <>
                    <div className="flex justify-between text-[#350709]/70 items-center">
                      <span className="font-bold">Delivery Charge</span>
                      <span className="font-mono text-[#164C2B] font-extrabold uppercase text-xs">FREE (Under 3km)*</span>
                    </div>
                    <p className="text-[10px] text-[#350709]/70 italic leading-tight">
                      *Delivery is free and under 3km service area. Farther areas have delivery charges applied.
                    </p>
                  </>
                )}
                <div className="pt-4 border-t border-dashed border-[#350709]/20 flex justify-between text-sm font-bold">
                  <span className="text-[#350709]">Total</span>
                  <span className="font-mono text-[#8F1115] text-lg font-extrabold">
                    ₹{orderType === "DELIVERY" ? total : subtotal}
                  </span>
                </div>
              </div>

              {/* Vintage receipt footer message */}
              <div className="border-t border-dashed border-[#350709]/15 pt-4 text-center mt-2">
                <p className="text-[9px] tracking-wide text-[#350709]/50 font-serif italic">
                  "Good choice. The kitchen will love this."
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
