"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Phone, MapPin, Clock, MessageSquare, Compass } from "lucide-react";
import gsap from "gsap";

export default function VisitPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".fade-in-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#0B0908] text-[#F3E8D4] pt-32 pb-24 px-4 sm:px-6 md:px-12 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        
        {/* Header Section */}
        <div className="text-center space-y-4 fade-in-item">
          <span className="font-sans text-xs tracking-[0.3em] text-[#B98532] font-extrabold uppercase block">
            LOCATION & CONTACT
          </span>
          <h1 className="font-serif font-bold text-5xl md:text-7xl tracking-tight text-white leading-none">
            Visit Maurya
          </h1>
          <p className="text-xs text-[#F3E8D4]/60 max-w-sm mx-auto tracking-wide uppercase font-sans">
            Come gather at our table in Kondhwa, Pune.
          </p>
          <div className="w-16 h-[1.5px] bg-[#B98532] mx-auto mt-6" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch fade-in-item">
          
          {/* Address & Hours Column (7 columns) */}
          <div className="md:col-span-7 bg-[#350709]/10 border border-[#B98532]/25 p-8 rounded-2xl backdrop-blur-md space-y-8 flex flex-col justify-between">
            
            <div className="space-y-6">
              {/* Address card */}
              <div className="flex gap-4 items-start">
                <div className="bg-[#8F1115]/10 p-3.5 rounded-xl border border-[#8F1115]/20 text-[#B98532] shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif italic text-xl text-white">Our Address</h3>
                  <p className="text-sm text-[#F3E8D4]/80 font-sans mt-1.5 leading-relaxed">
                    Maurya Pure Veg Restaurant,<br />
                    Near Mithanagar, Kondhwa Khurd,<br />
                    Pune, Maharashtra 411048
                  </p>
                </div>
              </div>

              {/* Hours card */}
              <div className="flex gap-4 items-start border-t border-white/5 pt-6">
                <div className="bg-[#8F1115]/10 p-3.5 rounded-xl border border-[#8F1115]/20 text-[#B98532] shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif italic text-xl text-white">Opening Hours</h3>
                  <p className="text-sm text-[#F3E8D4]/80 font-sans mt-1.5 leading-relaxed">
                    Monday to Sunday<br />
                    <span className="font-semibold text-white">11:00 AM – 11:00 PM</span><br />
                    <span className="text-[11px] text-[#B98532]">Open for Lunch, Hi-Tea, and Dinner</span>
                  </p>
                </div>
              </div>

              {/* Contact Card */}
              <div className="flex gap-4 items-start border-t border-white/5 pt-6">
                <div className="bg-[#8F1115]/10 p-3.5 rounded-xl border border-[#8F1115]/20 text-[#B98532] shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif italic text-xl text-white">Phone & Enquiry</h3>
                  <p className="text-sm text-[#F3E8D4]/80 font-sans mt-1.5">
                    Reservations & Delivery orders:<br />
                    <a href="tel:+917030777051" className="font-bold text-white hover:text-[#B98532] transition-colors text-base block mt-0.5">
                      +91 70307 77051
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Direct buttons */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
              <a
                href="https://wa.me/917030777051"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-[#164C2B] hover:bg-[#164C2B]/90 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
              >
                <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
              </a>
              <a
                href="https://maps.google.com/?q=Maurya+Pure+Veg+Kondhwa+Pune"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
              >
                <Compass className="w-4 h-4 text-[#B98532]" /> Get Directions
              </a>
            </div>

          </div>

          {/* Styled Map / Visual Graphic (5 columns) */}
          <div className="md:col-span-5 bg-wine/5 border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between relative shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {/* Styled Static Map Representation */}
            <div className="absolute inset-0 bg-[#350709]/20 flex items-center justify-center p-6 text-center select-none z-0">
              <div className="space-y-4">
                <MapPin className="w-12 h-12 text-[#8F1115] mx-auto animate-bounce" />
                <h4 className="font-serif italic text-2xl text-white">Find Us in Kondhwa</h4>
                <p className="text-xs text-[#F3E8D4]/60 font-sans max-w-[240px] mx-auto leading-relaxed">
                  Located near Mithanagar, easily accessible with ample parking space for our dining guests.
                </p>
              </div>
            </div>
            
            {/* Interactive Overlay map banner */}
            <div className="relative w-full aspect-[4/3] border-b border-white/5 z-10 pointer-events-none opacity-40">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/restaurant-interior.png')" }} />
            </div>

            <div className="p-6 bg-[#0B0908] border-t border-white/5 z-10 text-center">
              <Link
                href="/menu"
                className="block w-full py-3.5 bg-[#8F1115] hover:bg-[#8F1115]/90 text-[#F3E8D4] rounded-xl font-bold text-xs uppercase tracking-widest transition-all text-center"
              >
                Explore the Menu
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
