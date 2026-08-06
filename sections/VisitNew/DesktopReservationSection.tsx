"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Users, 
  Clock, 
  Phone, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles,
  MapPin,
  Utensils
} from "lucide-react";
import { db } from "@/lib/db";

export default function DesktopReservationSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "19:30",
    guests: "4",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    try {
      // Save reservation to local/Supabase database
      await db.createReservation({
        customer_name: formData.name,
        phone: formData.phone,
        reservation_date: formData.date || new Date().toISOString().split("T")[0],
        reservation_time: formData.time,
        guest_count: parseInt(formData.guests) || 4,
        occasion: formData.notes || "Dining",
        special_request: formData.notes,
      });

      // Construct formatted WhatsApp message
      const message = `*New Table Reservation Request*

*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Date:* ${formData.date || "Today"}
*Time:* ${formData.time}
*Guests:* ${formData.guests} Guests
*Notes:* ${formData.notes || "None"}

Please confirm my table reservation.`;

      const encodedText = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/917030777051?text=${encodedText}`;

      // Open WhatsApp chat in new window
      window.open(whatsappUrl, "_blank");
      setSubmitted(true);
    } catch (err) {
      console.error("Reservation failed", err);
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reserve" className="relative w-full py-28 px-6 md:px-12 bg-[#1C1414] text-[#F8F6F1] overflow-hidden scroll-mt-16">
      {/* Background Ambience Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] font-bold text-[#B98532] block mb-3">
            RESERVATIONS & BOOKINGS
          </span>
          <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-[#F8F6F1] font-normal tracking-tight">
            Reserve Your <span className="text-[#B98532]">Table</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-[#F8F6F1]/70 mt-4 leading-relaxed">
            Planning a family lunch, birthday celebration, or quiet dinner? Book in advance and we will prepare a warm table for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#2A0E11]/40 border border-[#B98532]/30 rounded-[28px] p-8 md:p-10 shadow-2xl backdrop-blur-md">
            
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 flex flex-col items-center text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#164C2B]/30 border border-[#4ADE80]/40 flex items-center justify-center text-[#4ADE80] mb-2 shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#F8F6F1] font-normal">
                    Reservation Requested
                  </h3>
                  <p className="font-sans text-sm text-[#F8F6F1]/75 max-w-md leading-relaxed">
                    We've opened a WhatsApp pre-filled message with your table booking details. Our restaurant host will confirm availability shortly.
                  </p>
                  
                  <div className="mt-4 p-4 rounded-xl border border-white/10 bg-white/5 w-full max-w-sm text-left text-xs font-mono space-y-2">
                    <div className="flex justify-between"><span className="text-[#F8F6F1]/50">Guest:</span> <span className="text-[#FFCC00]">{formData.name}</span></div>
                    <div className="flex justify-between"><span className="text-[#F8F6F1]/50">Guests:</span> <span>{formData.guests} persons</span></div>
                    <div className="flex justify-between"><span className="text-[#F8F6F1]/50">Date & Time:</span> <span>{formData.date || "Today"} @ {formData.time}</span></div>
                  </div>

                  <div className="pt-6 flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="flex-1 py-3 px-6 rounded-full border border-white/20 hover:border-white/40 text-xs font-bold uppercase tracking-wider text-[#F8F6F1] transition-all"
                    >
                      Book Another Table
                    </button>
                    <a
                      href="https://wa.me/917030777051"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-6 rounded-full bg-[#164C2B] hover:bg-[#164C2B]/90 text-xs font-bold uppercase tracking-wider text-white text-center transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                  
                  {error && (
                    <div className="p-3.5 rounded-xl bg-[#8F1115]/30 border border-[#8F1115] text-[#FF9999] text-xs font-sans">
                      {error}
                    </div>
                  )}

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B98532] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bhumit Gupta"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#161413] border border-[#B98532]/25 text-[#F8F6F1] placeholder-[#F8F6F1]/30 focus:outline-none focus:border-[#B98532] text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B98532] mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98XXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#161413] border border-[#B98532]/25 text-[#F8F6F1] placeholder-[#F8F6F1]/30 focus:outline-none focus:border-[#B98532] text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Date, Time & Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B98532] mb-2">
                        Reservation Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#161413] border border-[#B98532]/25 text-[#F8F6F1] focus:outline-none focus:border-[#B98532] text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B98532] mb-2">
                        Preferred Time
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#161413] border border-[#B98532]/25 text-[#F8F6F1] focus:outline-none focus:border-[#B98532] text-sm transition-all"
                      >
                        <option value="12:00">12:00 PM (Lunch)</option>
                        <option value="13:00">01:00 PM (Lunch)</option>
                        <option value="14:00">02:00 PM (Lunch)</option>
                        <option value="19:00">07:00 PM (Dinner)</option>
                        <option value="19:30">07:30 PM (Dinner)</option>
                        <option value="20:00">08:00 PM (Dinner)</option>
                        <option value="20:30">08:30 PM (Dinner)</option>
                        <option value="21:00">09:00 PM (Dinner)</option>
                        <option value="21:30">09:30 PM (Dinner)</option>
                        <option value="22:00">10:00 PM (Late Dinner)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B98532] mb-2">
                        Guests Count
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#161413] border border-[#B98532]/25 text-[#F8F6F1] focus:outline-none focus:border-[#B98532] text-sm transition-all"
                      >
                        <option value="2">2 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="6">6 Guests</option>
                        <option value="8">8 Guests</option>
                        <option value="10">10 Guests</option>
                        <option value="15+">15+ (Large Party)</option>
                      </select>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B98532] mb-2">
                      Occasion or Special Requests
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Birthday celebration, anniversary, high chair needed, quiet corner..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#161413] border border-[#B98532]/25 text-[#F8F6F1] placeholder-[#F8F6F1]/30 focus:outline-none focus:border-[#B98532] text-sm transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-[#8F1115] hover:bg-[#A8161B] text-[#F8F6F1] font-sans font-bold text-xs uppercase tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-2.5 border border-[#FFCC00]/25 cursor-pointer disabled:opacity-50"
                  >
                    <MessageSquare className="w-4 h-4 text-[#FFCC00]" />
                    {loading ? "Processing..." : "Confirm Reservation via WhatsApp"}
                  </button>

                  <p className="text-center text-[11px] text-[#F8F6F1]/50 italic">
                    Instant confirmation via our dedicated guest relations host on WhatsApp.
                  </p>
                </form>
              )}
            </AnimatePresence>

          </div>

          {/* Right Column: Experience Details & Highlights (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#2A0E11]/30 border border-[#B98532]/20 rounded-[28px] p-8 shadow-xl">
              <h3 className="font-serif italic text-2xl text-[#F8F6F1] mb-4">
                What to Expect
              </h3>
              
              <ul className="space-y-4 text-xs md:text-sm text-[#F8F6F1]/80 font-sans">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#B98532]/20 border border-[#B98532]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#FFCC00]">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <span><strong>100% Satvik Pure Veg</strong> — Prepared with zero cross-contamination in dedicated pure vegetarian kitchens.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#B98532]/20 border border-[#B98532]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#FFCC00]">
                    <Clock className="w-3 h-3" />
                  </div>
                  <span><strong>15-Minute Grace Period</strong> — We hold your reserved table for up to 15 minutes past scheduled time.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#B98532]/20 border border-[#B98532]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#FFCC00]">
                    <Users className="w-3 h-3" />
                  </div>
                  <span><strong>Group Dining Packages</strong> — Customized thali & multi-course menus available for 10+ guests.</span>
                </li>
              </ul>
            </div>

            {/* Quick Contact Card */}
            <div className="bg-[#161413] border border-[#B98532]/20 rounded-[24px] p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#B98532]/10 border border-[#B98532]/30 flex items-center justify-center text-[#B98532]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#B98532] block">Direct Host Desk</span>
                  <a href="tel:+917030777051" className="font-sans text-base font-bold text-[#F8F6F1] hover:text-[#B98532] transition-colors">
                    +91 70307 77051
                  </a>
                </div>
              </div>
              <a
                href="https://wa.me/917030777051"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#164C2B] hover:bg-[#164C2B]/90 text-[10px] uppercase tracking-wider font-bold text-white transition-all"
              >
                Chat
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
