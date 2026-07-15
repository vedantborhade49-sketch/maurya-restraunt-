"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function OurStory() {
  return (
    <section 
      id="story" 
      className="relative w-full bg-[#F3E8D4] text-[#350709] py-24 px-8 md:px-16 lg:px-24 flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-24 overflow-hidden border-t border-[#350709]/10"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E")`,
      }}
    >
      {/* Left Column: Text & Content */}
      <div className="flex-1 flex flex-col items-start gap-6 max-w-2xl">
        <h2 className="font-heading text-5xl md:text-6xl text-[#8F1115] tracking-tight">
          Our Story
        </h2>
        
        <p className="font-sans text-sm md:text-base leading-relaxed text-[#350709]/90 font-light">
          People wanting an experience of fine dining, dishes with spice, curry and delicious flavours, We have it all. Experience the joy of vegetarian food, the pureness of it. Our team of talented chefs are here to offer the mouth watering flavours of Indian cuisine. We are here to offer everyone the experience you all deserve. We host Birthday parties, your special occasions celebrate them with us. And after all our aim is to serve the community the people living in them. There is no greater joy than having guests with food in their stomach, a smile on their face, satisfaction in the mind. So visit us today to celebrate your special occasions may it be your son's birthday or you want to take your spouse on a date or may it be a casual weekend or may it be the cheat meal of the week or you want your family to have a beautiful time together because you have no idea the taste of Pure Vegetarian food you are missing.
        </p>

        <Link
          href="/menu"
          className="mt-4 px-8 py-3 bg-[#8F1115] hover:bg-[#8F1115]/90 text-[#F3E8D4] text-xs font-bold uppercase tracking-widest rounded shadow-md hover:shadow-lg transition-all active:translate-y-px"
        >
          Read More
        </Link>
      </div>

      {/* Right Column: Premium Framed Photograph */}
      <div className="flex-1 w-full md:w-auto flex justify-center">
        <div className="relative w-full max-w-[450px] aspect-[4/5] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(53,7,9,0.15)] border-4 border-white/50 bg-[#350709]/5">
          <Image
            src="/restaurant-interior.png"
            alt="Maurya Restaurant Interior"
            fill
            sizes="(max-width: 768px) 100vw, 450px"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
