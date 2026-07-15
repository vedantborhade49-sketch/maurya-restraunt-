"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Users, Calendar, Clock, ChevronRight, CheckCircle, Gift } from "lucide-react";
import Link from "next/link";

const groupDiningSchema = z.object({
  organizerName: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be a valid 10-digit number"),
  eventDate: z.string().refine((val) => !isNaN(Date.parse(val)), "Please choose a valid date"),
  eventTime: z.string().min(1, "Please choose a preferred time slot"),
  guestCount: z.coerce.number().min(10, "Group dining is for 10 or more guests. For smaller reservations, please request a regular table."),
  eventType: z.string().min(1, "Please choose event type"),
  specialInstructions: z.string().optional(),
});

type GroupFormValues = z.infer<typeof groupDiningSchema>;

export default function GroupDiningPage() {
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
    resolver: zodResolver(groupDiningSchema),
    defaultValues: {
      organizerName: "",
      phone: "",
      eventDate: "",
      eventTime: "",
      guestCount: 15,
      eventType: "Birthday Party",
      specialInstructions: "",
    },
  });

  const onSubmit = (data: GroupFormValues) => {
    setLoading(true);
    try {
      const dateObj = new Date(data.eventDate);
      const formattedDate = dateObj.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const message = `🎉 GROUP DINING REQUEST

Organizer: ${data.organizerName}
Phone: ${data.phone}
Event Type: ${data.eventType}
Date: ${formattedDate}
Time: ${data.eventTime}
Expected Guests: ${data.guestCount}
${data.specialInstructions ? `Notes: ${data.specialInstructions}\n` : ""}
Please confirm availability and package options.`;

      const encodedText = encodeURIComponent(message);
      const whatsappNumber = "917030777051"; // Maurya primary number
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

      // Open WhatsApp chat
      window.open(whatsappUrl, "_blank");
      setSuccess(data);
    } catch (e) {
      console.error("Failed to submit group request", e);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  if (success) {
    return (
      <div className="min-h-screen bg-[#0B0908] pt-32 pb-16 px-6 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
        <div className="max-w-md w-full bg-[#350709]/10 border border-[#B98532]/25 p-8 rounded-2xl text-center relative z-10 backdrop-blur-md">
          <div className="w-16 h-16 bg-[#B98532]/10 border border-[#B98532]/30 text-[#B98532] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="font-serif italic text-3xl text-[#B98532] mb-4">Request Sent</h2>
          <p className="text-xs text-[#F3E8D4]/70 leading-relaxed mb-8">
            Your group dining event request has been compiled. We have launched a pre-filled WhatsApp conversation to share details with the Maurya events team.
          </p>
          <div className="p-4 rounded-xl border border-white/5 bg-white/5 text-left text-xs space-y-2 mb-8 font-sans">
            <div className="flex justify-between"><span className="text-[#F3E8D4]/50">Organizer:</span> <span className="font-semibold text-white">{success.organizerName}</span></div>
            <div className="flex justify-between"><span className="text-[#F3E8D4]/50">Guests:</span> <span className="font-semibold text-white">{success.guestCount} persons</span></div>
            <div className="flex justify-between"><span className="text-[#F3E8D4]/50">Event Type:</span> <span className="font-semibold text-white">{success.eventType}</span></div>
            <div className="flex justify-between"><span className="text-[#F3E8D4]/50">Date:</span> <span className="font-semibold text-white">{success.eventDate}</span></div>
          </div>
          <div className="space-y-3">
            <a
              href={`https://wa.me/917030777051?text=${encodeURIComponent(
                `Checking availability for group booking: ${success.organizerName} on ${success.eventDate}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 bg-[#8F1115] hover:bg-[#8F1115]/90 text-[#F3E8D4] rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
            >
              Reopen WhatsApp Chat
            </a>
            <Link
              href="/"
              className="block w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 font-bold text-xs uppercase tracking-widest transition-all"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0908] pt-28 pb-16 px-4 sm:px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative z-10 mt-8">
        
        {/* Left column: Event copy & illustrations */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B98532] font-bold">04 — Host Your Moments</span>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-white tracking-tight leading-none">
            Group Dining & Events
          </h1>
          <p className="text-sm text-[#F3E8D4]/75 leading-relaxed font-light font-sans">
            Whether it is an intimate birthday party, an anniversary milestone, a family reunion, or a corporate lunch, Maurya provides the perfect pure vegetarian feast. 
          </p>
          <div className="border-t border-[#B98532]/20 pt-6 space-y-4">
            <div className="flex gap-4">
              <div className="bg-[#8F1115]/10 p-3 rounded-lg border border-[#8F1115]/20 h-11 w-11 flex items-center justify-center shrink-0">
                <Gift className="w-5 h-5 text-[#B98532]" />
              </div>
              <div>
                <h4 className="font-serif italic text-lg text-white">Customized Feasts</h4>
                <p className="text-xs text-[#F3E8D4]/50 font-sans mt-0.5">Custom North Indian, South Indian and Chinese packages tailored to your preferences.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#8F1115]/10 p-3 rounded-lg border border-[#8F1115]/20 h-11 w-11 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-[#B98532]" />
              </div>
              <div>
                <h4 className="font-serif italic text-lg text-white">Groups of 10 to 150</h4>
                <p className="text-xs text-[#F3E8D4]/50 font-sans mt-0.5">Flexible arrangements and dedicated service team for seamless dining.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: enquiry form */}
        <div className="lg:col-span-7 bg-[#350709]/10 border border-[#B98532]/25 p-6 md:p-8 rounded-2xl backdrop-blur-md relative">
          <div className="mb-6">
            <h3 className="font-serif italic text-2xl text-[#B98532]">Enquire About Your Event</h3>
            <p className="text-xs text-[#F3E8D4]/60 font-sans mt-1">Submit your basic details and we will open a chat with our banquet manager.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Organizer Name */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#F3E8D4]/60 font-bold mb-1.5">Organizer Name</label>
              <input
                type="text"
                {...register("organizerName")}
                className="w-full px-4 py-3 rounded-xl bg-[#0B0908] border border-[#B98532]/20 text-[#F3E8D4] focus:outline-none focus:border-[#B98532]/50 text-sm font-sans"
                placeholder="e.g. Priyesh Patel"
              />
              {errors.organizerName && (
                <span className="text-xs text-[#8F1115] mt-1 block">{errors.organizerName.message}</span>
              )}
            </div>

            {/* Grid contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#F3E8D4]/60 font-bold mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full px-4 py-3 rounded-xl bg-[#0B0908] border border-[#B98532]/20 text-[#F3E8D4] focus:outline-none focus:border-[#B98532]/50 text-sm font-sans"
                  placeholder="e.g. 98XXXXXXXX"
                />
                {errors.phone && (
                  <span className="text-xs text-[#8F1115] mt-1 block">{errors.phone.message}</span>
                )}
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#F3E8D4]/60 font-bold mb-1.5">Expected Guests</label>
                <input
                  type="number"
                  {...register("guestCount")}
                  className="w-full px-4 py-3 rounded-xl bg-[#0B0908] border border-[#B98532]/20 text-[#F3E8D4] focus:outline-none focus:border-[#B98532]/50 text-sm font-sans"
                />
                {errors.guestCount && (
                  <span className="text-xs text-[#8F1115] mt-1 block">{errors.guestCount.message}</span>
                )}
              </div>
            </div>

            {/* Grid Schedule */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#F3E8D4]/60 font-bold mb-1.5">Event Date</label>
                <input
                  type="date"
                  {...register("eventDate")}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 rounded-xl bg-[#0B0908] border border-[#B98532]/20 text-[#F3E8D4] focus:outline-none focus:border-[#B98532]/50 text-sm font-sans"
                />
                {errors.eventDate && (
                  <span className="text-xs text-[#8F1115] mt-1 block">{errors.eventDate.message}</span>
                )}
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#F3E8D4]/60 font-bold mb-1.5">Preferred Time Slot</label>
                <select
                  {...register("eventTime")}
                  className="w-full px-4 py-3 rounded-xl bg-[#0B0908] border border-[#B98532]/20 text-[#F3E8D4] focus:outline-none focus:border-[#B98532]/50 text-sm font-sans"
                >
                  <option value="Lunch Slot (11:30 AM - 3:30 PM)">Lunch (11:30 AM - 3:30 PM)</option>
                  <option value="Hi-Tea Slot (4:00 PM - 6:30 PM)">Hi-Tea (4:00 PM - 6:30 PM)</option>
                  <option value="Dinner Slot (7:00 PM - 11:00 PM)">Dinner (7:00 PM - 11:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Event Category */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#F3E8D4]/60 font-bold mb-1.5">Event Category</label>
              <select
                {...register("eventType")}
                className="w-full px-4 py-3 rounded-xl bg-[#0B0908] border border-[#B98532]/20 text-[#F3E8D4] focus:outline-none focus:border-[#B98532]/50 text-sm font-sans"
              >
                <option value="Birthday Party">Birthday Party</option>
                <option value="Anniversary celebration">Anniversary celebration</option>
                <option value="Family Reunion / Gathering">Family Reunion / Gathering</option>
                <option value="Corporate Event / Banquet">Corporate Event / Banquet</option>
                <option value="Kitty Party">Kitty Party</option>
                <option value="Other Celebrations">Other Celebrations</option>
              </select>
            </div>

            {/* Special notes */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#F3E8D4]/60 font-bold mb-1.5">Event Details / Menu Preferences</label>
              <textarea
                rows={2}
                {...register("specialInstructions")}
                className="w-full px-4 py-3 rounded-xl bg-[#0B0908] border border-[#B98532]/20 text-[#F3E8D4] focus:outline-none focus:border-[#B98532]/50 text-sm font-sans resize-none"
                placeholder="e.g. North Indian buffet required, Jain options needed, floral decor inquiries..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#8F1115] hover:bg-[#8F1115]/90 text-[#F3E8D4] rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 active:translate-y-px"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting Request...
                </>
              ) : (
                <>
                  Send Event Request <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
