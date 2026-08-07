"use client";

import React, { useState } from "react";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

export default function Chapter03Journey() {
  const [mapRevealed, setMapRevealed] = useState(true);

  return (
    <section className="relative w-full py-28 md:py-36 px-6 md:px-16 bg-[#F6F1E8] text-[#350709] overflow-hidden">
      <div className="max-w-[1320px] mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-[#B98532]">
              CHAPTER 03 — FINDING YOUR WAY
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#350709] leading-tight">
              Just A Short Journey<br />
              <span className="italic text-[#B98532]">To A Place Worth Returning To.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <a
              href="https://maps.google.com/?q=Maurya+Pure+Veg+Restaurant+Kondhwa+Pune"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#350709] text-[#F8F6F1] font-mono text-xs uppercase tracking-[0.2em] border border-[#B98532] shadow-lg hover:bg-[#B98532] hover:text-[#350709] transition-all duration-300"
            >
              <Navigation className="w-4 h-4 text-[#B98532]" />
              <span>Open Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Styled Interactive Map Box */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] border border-[#B98532]/40 bg-[#350709] shadow-2xl overflow-hidden group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.3415951666687!2d73.88371301489196!3d18.46813498743977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eaf64ecbf2b9%3A0x6b80145c26b2bf5e!2sMaurya%20Pure%20Veg%20Restaurant!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[25%] sepia-[15%] contrast-[0.95] opacity-90 group-hover:grayscale-0 transition-all duration-700"
          />

          {/* Floating Address Overlay */}
          <div className="absolute bottom-6 left-6 right-6 md:right-auto bg-[#350709]/95 text-[#F8F6F1] p-6 border border-[#B98532]/40 backdrop-blur-md max-w-md shadow-2xl space-y-2">
            <div className="flex items-center gap-2 text-[#B98532]">
              <MapPin className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-widest font-bold">ADDRESS</span>
            </div>
            <p className="font-serif text-lg leading-snug text-[#F8F6F1]">
              Shop 5,6 Sun Radiant Commercial Society, Khadi Machine Chowk, Kondhwa, Pune 411048
            </p>
            <p className="font-sans text-xs text-[#F8F6F1]/70">Landmark: Khadi Machine Chowk Junction</p>
          </div>
        </div>

      </div>
    </section>
  );
}
