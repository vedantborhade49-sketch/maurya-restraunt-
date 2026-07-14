"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronRight, Calendar, Users, Clock, Award, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { db } from "../../lib/db";

const bookingSchema = z.object({
  customerName: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be a valid 10-digit number"),
  reservationDate: z.string().refine((val) => !isNaN(Date.parse(val)), "Please choose a valid date"),
  reservationTime: z.string().min(1, "Please choose a preferred time"),
  guestCount: z.coerce.number().min(1, "At least 1 guest required").max(30, "For groups larger than 30, please contact us directly"),
  occasion: z.string().optional(),
  specialRequest: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookATablePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customerName: "",
      phone: "",
      reservationDate: "",
      reservationTime: "",
      guestCount: 2,
      occasion: "None",
      specialRequest: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const payload = {
        customer_name: data.customerName,
        phone: data.phone,
        reservation_date: data.reservationDate,
        reservation_time: data.reservationTime,
        guest_count: data.guestCount,
        occasion: data.occasion === "None" ? null : data.occasion,
        special_request: data.specialRequest || null,
      };

      const newRes = await db.createReservation(payload);

      if (newRes) {
        // Compile WhatsApp request string (Phase 15 layout)
        const dateObj = new Date(data.reservationDate);
        const formattedDate = dateObj.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        const message = `🍽️ TABLE REQUEST

Name: ${data.customerName}
Phone: ${data.phone}
Date: ${formattedDate}
Time: ${data.reservationTime}
Guests: ${data.guestCount}
${data.occasion && data.occasion !== "None" ? `Occasion: ${data.occasion}\n` : ""}${data.specialRequest ? `Special Request: ${data.specialRequest}\n` : ""}
Please confirm table availability.`;

        // Redirect to WhatsApp Universal pre-filled link
        const encodedText = encodeURIComponent(message);
        const whatsappNumber = "917030777051"; // Maurya primary restaurant number
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

        window.open(whatsappUrl, "_blank");
        setSuccess(newRes);
      }
    } catch (e) {
      console.error("Failed to submit reservation", e);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  if (success) {
    return (
      <div className="min-h-screen bg-midnight pt-32 pb-16 px-6 flex items-center justify-center relative">
        <div className="absolute inset-0 noise-bg" />
        <div className="max-w-md w-full bg-wine/10 border border-white/10 p-8 rounded-2xl text-center relative z-10">
          <div className="w-16 h-16 bg-gold/10 border border-gold/30 text-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="font-heading text-3xl text-gold mb-4">Request Sent</h2>
          <p className="text-sm text-soft-ivory/70 leading-relaxed mb-8">
            Your booking request has been saved. We have opened a pre-filled WhatsApp chat to send this table request directly to the Maurya reservations desk.
          </p>
          <div className="p-4 rounded-xl border border-white/5 bg-white/5 text-left text-xs space-y-2 mb-8 font-sans">
            <div className="flex justify-between"><span className="text-soft-ivory/50">Name:</span> <span className="font-semibold text-soft-ivory">{success.customer_name}</span></div>
            <div className="flex justify-between"><span className="text-soft-ivory/50">Guests:</span> <span className="font-semibold text-soft-ivory">{success.guest_count} persons</span></div>
            <div className="flex justify-between"><span className="text-soft-ivory/50">Date:</span> <span className="font-semibold text-soft-ivory">{success.reservation_date}</span></div>
            <div className="flex justify-between"><span className="text-soft-ivory/50">Time:</span> <span className="font-semibold text-soft-ivory">{success.reservation_time}</span></div>
          </div>
          <div className="space-y-3">
            <a
              href={`https://wa.me/917030777051?text=${encodeURIComponent(
                `Checking availability for reservation: ${success.customer_name} on ${success.reservation_date}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 bg-veg-green hover:bg-veg-green/90 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
            >
              Reopen WhatsApp Chat
            </a>
            <Link
              href="/"
              className="block w-full py-3 bg-white/5 hover:bg-white/10 text-soft-ivory rounded-xl border border-white/10 font-bold text-xs uppercase tracking-widest transition-all"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight pt-28 pb-16 px-4 sm:px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 noise-bg" />

      <div className="max-w-xl mx-auto mb-8 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-gold hover:text-soft-ivory transition-colors">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
      </div>

      <div className="max-w-xl mx-auto bg-wine/5 border border-white/5 p-6 md:p-8 rounded-2xl relative z-10 backdrop-blur-md">
        <div className="text-center mb-8">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">05 — Gather Together</span>
          <h1 className="font-heading text-3xl md:text-4xl text-soft-ivory tracking-wide mt-2">Request Your Table</h1>
          <p className="text-xs text-soft-ivory/50 mt-2 max-w-sm mx-auto leading-relaxed">
            Please submit this form to inquire about table availability. We will verify and confirm via WhatsApp shortly.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-soft-ivory/60 mb-2">Name</label>
            <input
              type="text"
              {...register("customerName")}
              className="w-full px-4 py-3 rounded-xl bg-midnight border border-white/10 text-soft-ivory focus:outline-none focus:border-gold/40 text-sm transition-colors"
              placeholder="e.g. Bhumit Gupta"
            />
            {errors.customerName && (
              <span className="text-xs text-crimson mt-1 block">{errors.customerName.message}</span>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-soft-ivory/60 mb-2">Phone Number</label>
            <input
              type="tel"
              {...register("phone")}
              className="w-full px-4 py-3 rounded-xl bg-midnight border border-white/10 text-soft-ivory focus:outline-none focus:border-gold/40 text-sm transition-colors"
              placeholder="e.g. 98XXXXXXXX"
            />
            {errors.phone && (
              <span className="text-xs text-crimson mt-1 block">{errors.phone.message}</span>
            )}
          </div>

          {/* Date & Time Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-soft-ivory/60 mb-2">Date</label>
              <div className="relative">
                <input
                  type="date"
                  {...register("reservationDate")}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 rounded-xl bg-midnight border border-white/10 text-soft-ivory focus:outline-none focus:border-gold/40 text-sm transition-colors"
                />
              </div>
              {errors.reservationDate && (
                <span className="text-xs text-crimson mt-1 block">{errors.reservationDate.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-soft-ivory/60 mb-2">Preferred Time</label>
              <select
                {...register("reservationTime")}
                className="w-full px-4 py-3 rounded-xl bg-midnight border border-white/10 text-soft-ivory focus:outline-none focus:border-gold/40 text-sm transition-colors"
              >
                <option value="">Choose Time...</option>
                <option value="11:30 AM">11:30 AM (Lunch)</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="1:00 PM">01:00 PM</option>
                <option value="2:00 PM">02:00 PM</option>
                <option value="7:00 PM">07:00 PM (Dinner)</option>
                <option value="7:30 PM">07:30 PM</option>
                <option value="8:00 PM">08:00 PM</option>
                <option value="8:30 PM">08:30 PM</option>
                <option value="9:00 PM">09:00 PM</option>
                <option value="9:30 PM">09:30 PM</option>
                <option value="10:00 PM">10:00 PM</option>
              </select>
              {errors.reservationTime && (
                <span className="text-xs text-crimson mt-1 block">{errors.reservationTime.message}</span>
              )}
            </div>
          </div>

          {/* Guest count & Occasion */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-soft-ivory/60 mb-2">Guests</label>
              <input
                type="number"
                {...register("guestCount")}
                min={1}
                max={30}
                className="w-full px-4 py-3 rounded-xl bg-midnight border border-white/10 text-soft-ivory focus:outline-none focus:border-gold/40 text-sm transition-colors"
              />
              {errors.guestCount && (
                <span className="text-xs text-crimson mt-1 block">{errors.guestCount.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-soft-ivory/60 mb-2">Occasion</label>
              <select
                {...register("occasion")}
                className="w-full px-4 py-3 rounded-xl bg-midnight border border-white/10 text-soft-ivory focus:outline-none focus:border-gold/40 text-sm transition-colors"
              >
                <option value="None">Just dining</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Business Meeting">Business Meeting</option>
                <option value="Family Gathering">Family Gathering</option>
              </select>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-soft-ivory/60 mb-2">Special Request / Note</label>
            <textarea
              rows={2}
              {...register("specialRequest")}
              className="w-full px-4 py-3 rounded-xl bg-midnight border border-white/10 text-soft-ivory focus:outline-none focus:border-gold/40 text-sm transition-colors resize-none"
              placeholder="e.g. Require high chair for baby, quiet table, decor requests..."
            />
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-crimson hover:bg-crimson/90 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-crimson/20 flex items-center justify-center gap-2 active:translate-y-px"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Sending Request...
              </>
            ) : (
              <>
                Request Your Table <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
