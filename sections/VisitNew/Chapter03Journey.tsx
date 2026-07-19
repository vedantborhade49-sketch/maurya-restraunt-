"use client";

import React, { useState } from "react";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function Chapter03Journey() {
  const [mapRevealed, setMapRevealed] = useState(false);

  return (
    <section className="relative w-full min-h-screen bg-[#EFE8DB] flex flex-col md:flex-row items-center justify-center py-32 px-8 md:px-24 gap-16 overflow-hidden">
      
      {/* Left side: Typography */}
      <div className="w-full md:w-5/12 flex flex-col z-10">
        <h2 className="font-serif text-5xl md:text-7xl leading-[1.1] text-[#1F1F1F]">
          Just A Short<br />
          Journey<br />
          <span className="italic text-[#B98555]">To A Place<br />Worth Returning To.</span>
        </h2>
      </div>

      {/* Right side: Map Interaction */}
      <div className="w-full md:w-7/12 relative aspect-square md:aspect-[4/3] shadow-[0_30px_60px_rgba(31,31,31,0.08)] bg-white p-2 md:p-4 group">
        
        {!mapRevealed ? (
          <div 
            className="relative w-full h-full cursor-pointer overflow-hidden"
            onClick={() => setMapRevealed(true)}
          >
            <ImagePlaceholder 
              category="Illustration" 
              description="Beautiful styled map illustration. Warm monochrome, copper roads, minimal labels." 
              aspectRatio="h-full" 
            />
            {/* Hover overlay instructing interaction */}
            <div className="absolute inset-0 bg-[#B98555]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#1F1F1F] bg-white/90 px-6 py-3 rounded-full shadow-lg">
                Reveal Directions
              </span>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full animate-[fadeIn_1s_ease-out]">
            {/* Actual Google Maps Embed */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.3415951666687!2d73.88371301489196!3d18.46813498743977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eaf64ecbf2b9%3A0x6b80145c26b2bf5e!2sMaurya%20Pure%20Veg%20Restaurant!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[30%] sepia-[20%] contrast-[0.9]"
            />
          </div>
        )}

      </div>

    </section>
  );
}
