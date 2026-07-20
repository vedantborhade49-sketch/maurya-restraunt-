"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { MessageSquare, Phone, Calendar } from "lucide-react";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import ButtonSecondary from "@/components/ui/ButtonSecondary";

export default function Chapter06Reservation() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-32 md:py-44 px-6 bg-[#164C2B] text-[#F8F6F1] overflow-hidden select-none">
      
      <div ref={textRef} className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-10">
        
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] font-bold text-[#B98532]">
          CHAPTER 06 — TABLE RESERVATION
        </span>

        <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight font-normal text-[#F8F6F1]">
          Reserve Your Table<br />
          <span className="italic font-serif text-[#B98532]">In Advance.</span>
        </h2>

        <p className="font-sans text-sm md:text-base text-[#F8F6F1]/80 max-w-xl mx-auto font-light leading-relaxed">
          Planning a family celebration, birthday dinner, or weekend gathering? Reserve ahead and we'll ensure your table is waiting.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link href="/menu">
            <ButtonPrimary className="w-full sm:w-auto bg-[#B98532] text-[#350709] hover:bg-[#D4A373]">
              <Calendar className="w-4 h-4 mr-2 inline" />
              <span>Reserve Table Online</span>
            </ButtonPrimary>
          </Link>

          <a
            href="https://wa.me/917030777051"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <ButtonSecondary className="w-full sm:w-auto border-[#B98532] text-[#F8F6F1] hover:bg-[#B98532] hover:text-[#350709]">
              <MessageSquare className="w-4 h-4 mr-2 inline text-[#B98532]" />
              <span>Instant WhatsApp Booking</span>
            </ButtonSecondary>
          </a>
        </div>

      </div>

    </section>
  );
}
