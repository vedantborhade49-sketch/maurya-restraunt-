"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, MessageSquare, Calendar, Users, CheckCircle2, Navigation, Leaf, Car, Wind, Star, Sparkles } from "lucide-react";

export default function MobileVisit() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "19:30",
    guests: "4",
    notes: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please enter your name and phone number.");
      return;
    }
    
    // Create WhatsApp message for reservation
    const text = `*New Table Reservation Request*%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Date:* ${encodeURIComponent(formData.date || "Today")}%0A*Time:* ${encodeURIComponent(formData.time)}%0A*Guests:* ${encodeURIComponent(formData.guests)}%0A*Notes:* ${encodeURIComponent(formData.notes || "None")}`;
    
    window.open(`https://wa.me/917030777051?text=${text}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#161413] text-[#F8F6F1] flex flex-col pt-24 pb-20 overflow-x-hidden">
      
      {/* ─── 1. HERO BANNER ─── */}
      <div className="relative w-full px-6 py-12 flex flex-col items-center text-center overflow-hidden">
        {/* Background Image Scrim */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/outside.webp" 
            alt="Maurya Pure Veg Restaurant" 
            className="w-full h-full object-cover brightness-[0.35] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#161413]/90 via-[#161413]/70 to-[#161413]" />
        </div>

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-[360px] flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B98532]/20 border border-[#B98532]/40 text-[#B98532] text-[10px] font-mono uppercase tracking-[0.2em] font-bold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B98532] animate-ping" />
            Kondhwa · Pune
          </div>

          <h1 className="font-heading text-[40px] leading-[1.05] text-[#F8F6F1] tracking-tight mb-3">
            Visit <span className="italic font-serif text-[#B98532]">Maurya</span>
          </h1>

          <p className="font-sans text-[14px] leading-[1.6] text-[#F8F6F1]/80 mb-6">
            We've been expecting you. Step into Pune's timeless pure vegetarian culinary sanctuary.
          </p>

          {/* Quick Action Pills */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <a 
              href="https://maps.google.com/?q=Maurya+Pure+Veg+Restaurant+Kondhwa+Pune" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-[48px] bg-[#6D2323] hover:bg-[#8F1115] text-[#F8F6F1] rounded-xl font-sans text-[12px] font-bold uppercase tracking-wider shadow-md active:scale-95 transition-all border border-[#FFCC00]/20"
            >
              <Navigation className="w-4 h-4 text-[#FFCC00]" />
              Directions
            </a>
            <a 
              href="tel:+917030777051"
              className="flex items-center justify-center gap-2 h-[48px] bg-white/10 hover:bg-white/20 text-[#F8F6F1] rounded-xl font-sans text-[12px] font-bold uppercase tracking-wider backdrop-blur-md active:scale-95 transition-all border border-white/20"
            >
              <Phone className="w-4 h-4 text-[#B98532]" />
              Call Us
            </a>
          </div>
        </motion.div>
      </div>

      {/* ─── 2. ESSENTIAL INFORMATION CARD ─── */}
      <div className="px-6 py-6 w-full max-w-[440px] mx-auto">
        <div className="bg-[#1C1414] border border-[#B98532]/25 rounded-[24px] p-6 shadow-xl flex flex-col gap-5">
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#B98532]/10 border border-[#B98532]/30 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-5 h-5 text-[#B98532]" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#B98532] font-bold">Address</span>
              <span className="font-sans text-[14px] text-[#F8F6F1] font-medium mt-0.5">
                Tilekar Nagar, Kondhwa Khurd, Near ISKCON Temple, Pune, Maharashtra 411048
              </span>
            </div>
          </div>

          <div className="w-full h-[1px] bg-white/10" />

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#B98532]/10 border border-[#B98532]/30 flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-5 h-5 text-[#B98532]" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#B98532] font-bold">Dining Hours</span>
              <span className="font-sans text-[14px] text-[#F8F6F1] font-medium mt-0.5">
                11:00 AM — 11:00 PM <br/>
                <span className="text-[12px] text-[#F8F6F1]/60">Open all 7 days for Lunch & Dinner</span>
              </span>
            </div>
          </div>

          <div className="w-full h-[1px] bg-white/10" />

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#B98532]/10 border border-[#B98532]/30 flex items-center justify-center shrink-0 mt-0.5">
              <Phone className="w-5 h-5 text-[#B98532]" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#B98532] font-bold">Inquiries & Takeaway</span>
              <a href="tel:+917030777051" className="font-sans text-[15px] text-[#F8F6F1] font-bold mt-0.5 hover:text-[#B98532] transition-colors">
                +91 70307 77051
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ─── 3. INTERACTIVE MAP ─── */}
      <div className="px-6 py-4 w-full max-w-[440px] mx-auto">
        <div className="w-full aspect-[16/10] rounded-[24px] overflow-hidden border border-[#B98532]/30 shadow-lg relative bg-[#1C1414]">
          <iframe 
            src="https://maps.google.com/maps?q=Maurya%20Pure%20Veg%20Restaurant%20Kondhwa%20Pune&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            className="w-full h-full grayscale-[0.3] contrast-[1.1]" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* ─── 4. TABLE RESERVATION FORM ─── */}
      <section id="reserve" className="px-6 py-8 w-full max-w-[440px] mx-auto scroll-mt-20">
        <div className="bg-[#F8F6F1] text-[#1F1F1F] rounded-[28px] p-6 sm:p-8 shadow-2xl border border-[#B98532]/40">
          
          <div className="text-center mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#6D2323] font-bold block mb-1">
              Table Booking
            </span>
            <h2 className="font-serif italic text-[30px] leading-tight text-[#1F1F1F]">
              Reserve Your Table
            </h2>
            <p className="font-sans text-[13px] text-[#1F1F1F]/70 mt-1">
              Book in advance for family dinners & celebrations.
            </p>
          </div>

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-8 gap-3"
            >
              <CheckCircle2 className="w-12 h-12 text-[#164C2B]" />
              <h3 className="font-serif text-[22px] font-bold text-[#1F1F1F]">Request Sent!</h3>
              <p className="font-sans text-[13px] text-[#1F1F1F]/70">
                We've opened WhatsApp with your reservation details. Our host will confirm your table shortly.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-[#1F1F1F] text-white rounded-full font-sans text-xs font-bold uppercase tracking-wider"
              >
                Book Another Table
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block font-sans text-[12px] font-bold uppercase tracking-wider text-[#1F1F1F]/80 mb-1.5">
                  Your Name *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-[48px] px-4 rounded-xl bg-white border border-[#1F1F1F]/15 text-[15px] font-sans text-[#1F1F1F] placeholder-[#1F1F1F]/40 focus:outline-none focus:border-[#6D2323] transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-[12px] font-bold uppercase tracking-wider text-[#1F1F1F]/80 mb-1.5">
                  Phone Number *
                </label>
                <input 
                  type="tel" 
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-[48px] px-4 rounded-xl bg-white border border-[#1F1F1F]/15 text-[15px] font-sans text-[#1F1F1F] placeholder-[#1F1F1F]/40 focus:outline-none focus:border-[#6D2323] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-sans text-[12px] font-bold uppercase tracking-wider text-[#1F1F1F]/80 mb-1.5">
                    Date
                  </label>
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full h-[48px] px-3 rounded-xl bg-white border border-[#1F1F1F]/15 text-[14px] font-sans text-[#1F1F1F] focus:outline-none focus:border-[#6D2323] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[12px] font-bold uppercase tracking-wider text-[#1F1F1F]/80 mb-1.5">
                    Guests
                  </label>
                  <select 
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full h-[48px] px-3 rounded-xl bg-white border border-[#1F1F1F]/15 text-[14px] font-sans text-[#1F1F1F] focus:outline-none focus:border-[#6D2323] transition-colors"
                  >
                    <option value="2">2 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="8">8 Guests</option>
                    <option value="10+">10+ Guests (Party)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-sans text-[12px] font-bold uppercase tracking-wider text-[#1F1F1F]/80 mb-1.5">
                  Special Requests / Occasion
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Birthday celebration, Quiet corner"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full h-[48px] px-4 rounded-xl bg-white border border-[#1F1F1F]/15 text-[14px] font-sans text-[#1F1F1F] placeholder-[#1F1F1F]/40 focus:outline-none focus:border-[#6D2323] transition-colors"
                />
              </div>

              <button 
                type="submit"
                className="w-full h-[54px] bg-[#6D2323] hover:bg-[#8F1115] text-[#F8F6F1] rounded-full font-sans text-[14px] font-bold uppercase tracking-wider shadow-lg active:scale-95 transition-all mt-3 cursor-pointer flex items-center justify-center gap-2 border border-[#FFCC00]/30"
              >
                <MessageSquare className="w-4 h-4 text-[#FFCC00]" />
                Confirm via WhatsApp
              </button>
            </form>
          )}

        </div>
      </section>

      {/* ─── 5. DINING AMENITIES (LUXURY BADGES) ─── */}
      <div className="px-6 py-6 w-full max-w-[440px] mx-auto">
        <div className="grid grid-cols-2 gap-3.5">
          {/* Card 1 */}
          <div className="bg-gradient-to-b from-[#2A0E11] to-[#1A0A0C] border border-[#B98532]/30 rounded-[20px] p-4 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-[#164C2B]/30 border border-[#4ADE80]/40 flex items-center justify-center mb-2.5 shadow-inner">
              <Leaf className="w-5 h-5 text-[#4ADE80]" />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#4ADE80] font-extrabold">100% Satvik</span>
            <span className="font-sans text-[13px] font-bold text-[#F8F6F1] mt-0.5">Pure Vegetarian</span>
            <span className="font-sans text-[10px] text-[#F8F6F1]/60 mt-0.5 leading-tight">Strict pure veg kitchen</span>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-b from-[#2A0E11] to-[#1A0A0C] border border-[#B98532]/30 rounded-[20px] p-4 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-[#B98532]/20 border border-[#FFCC00]/40 flex items-center justify-center mb-2.5 shadow-inner">
              <Car className="w-5 h-5 text-[#FFCC00]" />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#FFCC00] font-extrabold">Valet Parking</span>
            <span className="font-sans text-[13px] font-bold text-[#F8F6F1] mt-0.5">Ample Space</span>
            <span className="font-sans text-[10px] text-[#F8F6F1]/60 mt-0.5 leading-tight">Hassle-free arrival</span>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-b from-[#2A0E11] to-[#1A0A0C] border border-[#B98532]/30 rounded-[20px] p-4 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-[#0284C7]/20 border border-[#38BDF8]/40 flex items-center justify-center mb-2.5 shadow-inner">
              <Wind className="w-5 h-5 text-[#38BDF8]" />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#38BDF8] font-extrabold">AC Dining</span>
            <span className="font-sans text-[13px] font-bold text-[#F8F6F1] mt-0.5">Luxury Ambience</span>
            <span className="font-sans text-[10px] text-[#F8F6F1]/60 mt-0.5 leading-tight">Family dining hall</span>
          </div>

          {/* Card 4 */}
          <div className="bg-gradient-to-b from-[#2A0E11] to-[#1A0A0C] border border-[#B98532]/30 rounded-[20px] p-4 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-[#B98532]/20 border border-[#F59E0B]/40 flex items-center justify-center mb-2.5 shadow-inner">
              <Star className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#F59E0B] font-extrabold">4.9 ★ Rating</span>
            <span className="font-sans text-[13px] font-bold text-[#F8F6F1] mt-0.5">Top Rated</span>
            <span className="font-sans text-[10px] text-[#F8F6F1]/60 mt-0.5 leading-tight">3,000+ happy reviews</span>
          </div>
        </div>
      </div>

    </div>
  );
}
