"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Chapter07Contact() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".contact-item");
      
      gsap.fromTo(items, 
        { opacity: 0, y: 30 },
        {
          opacity: 1, 
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-40 min-h-screen bg-[#3A0F16] overflow-hidden flex flex-col items-center justify-center text-center">
      
      <div className="w-px h-24 bg-[#B98555]/30 mb-16 contact-item" />

      <div className="contact-item mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#B98555] block mb-4">Reservations</span>
        <a href="tel:+918237858687" className="font-serif text-4xl md:text-5xl text-[#F6F1E8] hover:text-[#B98555] transition-colors">
          +91 82378 58687
        </a>
      </div>

      <div className="w-1.5 h-1.5 rounded-full bg-[#B98555] mb-16 contact-item" />

      <div className="contact-item mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#B98555] block mb-4">Location</span>
        <address className="font-serif text-3xl md:text-4xl text-[#F6F1E8] not-italic leading-relaxed">
          Bramha Majestic, NIBM Road<br />
          Kondhwa, Pune
        </address>
      </div>

      <div className="w-1.5 h-1.5 rounded-full bg-[#B98555] mb-16 contact-item" />

      <div className="contact-item mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#B98555] block mb-4">Hours</span>
        <p className="font-serif text-3xl md:text-4xl text-[#F6F1E8]">
          Open Daily<br />
          11:00 AM — 11:30 PM
        </p>
      </div>

      <div className="w-px h-24 bg-[#B98555]/30 mt-8 contact-item" />

    </section>
  );
}
