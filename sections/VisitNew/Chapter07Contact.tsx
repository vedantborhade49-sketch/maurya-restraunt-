"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, MapPin, Clock, Mail } from "lucide-react";

export default function Chapter07Contact() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".contact-card");
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-28 md:py-40 px-6 md:px-12 bg-[#F8F6F1] text-[#350709] overflow-hidden">
      
      <div className="max-w-[1320px] mx-auto space-y-16">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-[#B98532]">
            CHAPTER 07 — CONTACT DESK
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#350709] leading-tight">
            Here For Your Dining Questions.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="contact-card bg-white border border-[#B98532]/30 p-8 space-y-4 shadow-sm text-center">
            <Phone className="w-6 h-6 text-[#B98532] mx-auto stroke-[1.5]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B98532] font-bold block">RESERVATIONS & HELPLINE</span>
            <a href="tel:+918329895846" className="font-serif text-2xl text-[#350709] hover:text-[#B98532] transition-colors block">
              +91 83298 95846
            </a>
            <p className="font-sans text-xs text-[#1F1F1F]/60">Available 8:00 AM — 11:30 PM daily</p>
          </div>

          <div className="contact-card bg-[#350709] text-[#F8F6F1] border border-[#B98532]/40 p-8 space-y-4 shadow-xl text-center">
            <MapPin className="w-6 h-6 text-[#B98532] mx-auto stroke-[1.5]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B98532] font-bold block">RESTAURANT ADDRESS</span>
            <p className="font-serif text-xl leading-relaxed text-[#F8F6F1]">
              Shop 5,6 Sun Radiant Commercial Society, Khadi Machine Chowk, Kondhwa, Pune 411048
            </p>
            <p className="font-sans text-xs text-[#B98532]">Khadi Machine Chowk Junction</p>
          </div>

          <div className="contact-card bg-white border border-[#B98532]/30 p-8 space-y-4 shadow-sm text-center">
            <Clock className="w-6 h-6 text-[#B98532] mx-auto stroke-[1.5]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B98532] font-bold block">DINING HOURS</span>
            <p className="font-serif text-2xl text-[#350709]">
              Open Daily
            </p>
            <p className="font-sans text-xs text-[#1F1F1F]/70">8:00 AM — 11:30 PM</p>
          </div>

        </div>

      </div>

    </section>
  );
}
