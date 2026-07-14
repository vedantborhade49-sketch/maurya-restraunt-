"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface SignatureDish {
  num: string;
  name: string;
  copy: string;
  price: string;
  image: string;
}

export default function Chapter02() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dishPinRef = useRef<HTMLDivElement>(null);
  const [activeDish, setActiveDish] = useState(0);

  const dishes: SignatureDish[] = [
    {
      num: "01",
      name: "VEG MARATHA",
      copy: "Bold. Rich. Unmistakably Maurya.",
      price: "₹249",
      image: "https://cdn.hashtagloyalty.com/items/images/012/147/233/original/thumb_2023_01_18_12_18_15_Veg_Maratha.jpg?w=600&h=600"
    },
    {
      num: "02",
      name: "PANEER BUTTER MASALA",
      copy: "Creamy. Luxurious. A classic favorite.",
      price: "₹279",
      image: "https://cdn.hashtagloyalty.com/items/images/012/147/197/original/thumb_2023_01_18_12_05_49_Paneer_Butter_Masala.jpeg?w=600&h=600"
    },
    {
      num: "03",
      name: "MYSORE CHEESE DOSA",
      copy: "Crispy. Spiced. Authentically South Indian.",
      price: "₹155",
      image: "https://cdn.hashtagloyalty.com/images/190596/1_(4).png?v=1718102437&w=600&h=600"
    },
    {
      num: "04",
      name: "VEG HAKKA NOODLES",
      copy: "Savory. Wok-tossed. Perfection in every strand.",
      price: "₹250",
      image: "https://cdn.hashtagloyalty.com/items/images/012/147/243/original/thumb_2023_01_18_12_13_16_Veg_Hakka_Noodles.jpg?w=600&h=600"
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Signature Dishes Scroll pin & change
      const dishesPin = ScrollTrigger.create({
        trigger: dishPinRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          // Calculate active dish index based on progress
          const progress = self.progress;
          const index = Math.min(
            dishes.length - 1,
            Math.floor(progress * dishes.length)
          );
          setActiveDish(index);
        }
      });

      // Subtle dish image animations based on active changes
      dishes.forEach((_, i) => {
        gsap.fromTo(`.dish-img-${i}`,
          { scale: 1, rotation: -1 },
          { 
            scale: 1.06, 
            rotation: 1, 
            duration: 1.5, 
            ease: "power1.out",
            scrollTrigger: {
              trigger: dishPinRef.current,
              start: () => `top+=${(i / dishes.length) * 300}% top`,
              end: () => `top+=${((i + 1) / dishes.length) * 300}% top`,
              scrub: true
            }
          }
        );
      });

      // Editorial masonry image zoom animations on scroll
      gsap.utils.toArray(".gallery-item img").forEach((img: any) => {
        gsap.to(img, {
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-midnight text-soft-ivory">
      {/* SECTION 1: SIGNATURE DISHES (PINNED SLIDER) */}
      <section ref={dishPinRef} className="h-screen w-full flex items-center justify-center relative overflow-hidden border-b border-white/5">
        <div className="absolute top-12 left-6 md:left-24">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">01 — From Our Kitchen</span>
          <h2 className="font-heading text-4xl md:text-5xl text-soft-ivory tracking-wide mt-2">Signature Offerings</h2>
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 pt-16">
          {/* Left Side: Dish Details (45% width) */}
          <div className="w-full md:w-[45%] flex flex-col justify-center h-96 relative">
            {dishes.map((dish, idx) => (
              <div
                key={idx}
                className={`absolute inset-x-0 transition-all duration-700 ease-in-out ${
                  idx === activeDish 
                    ? "opacity-100 translate-y-0 pointer-events-auto" 
                    : "opacity-0 translate-y-8 pointer-events-none"
                }`}
              >
                <div className="font-heading text-gold text-7xl md:text-8xl font-extralight tracking-widest leading-none">
                  {dish.num}
                </div>
                <h3 className="font-heading text-3xl md:text-5xl font-bold tracking-wide mt-4 text-soft-ivory">
                  {dish.name}
                </h3>
                <p className="font-sans text-sm md:text-base text-soft-ivory/60 mt-4 max-w-md leading-relaxed">
                  {dish.copy}
                </p>
                <div className="flex items-center gap-4 mt-8">
                  <span className="font-mono text-2xl font-bold text-gold">{dish.price}</span>
                  <Link
                    href="/menu"
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-crimson hover:text-white transition-colors"
                  >
                    Add to Table <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Dish Image (55% width) */}
          <div className="w-full md:w-[55%] h-80 md:h-[450px] relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-wine/10" data-cursor="VIEW">
            {dishes.map((dish, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  idx === activeDish ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className={`w-full h-full object-cover origin-center dish-img-${idx}`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-midnight/60 via-transparent to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: THE MAURYA EXPERIENCE (Phase 16) */}
      <section id="story" className="py-24 md:py-36 border-b border-white/5 bg-wine/5 relative overflow-hidden">
        <div className="absolute inset-0 noise-bg" />
        
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">02 — The Gathering</span>
          <h2 className="font-heading text-4xl md:text-6xl text-soft-ivory tracking-wide mt-4 mb-16">
            The Maurya Experience
          </h2>
          
          <div className="space-y-24 md:space-y-36">
            {/* Outside */}
            <div className="flex flex-col items-center">
              <span className="text-xs tracking-widest text-gold/60 uppercase mb-4">OUTSIDE</span>
              <p className="font-heading text-xl md:text-3xl text-soft-ivory/80 max-w-2xl leading-relaxed italic">
                "Our doors open to the calm breeze of Kondhwa. Under warm lights, the city noise disappears, and your evening begins."
              </p>
            </div>

            {/* Enter */}
            <div className="flex flex-col items-center">
              <span className="text-xs tracking-widest text-gold/60 uppercase mb-4">ENTER</span>
              <p className="font-heading text-xl md:text-3xl text-soft-ivory/80 max-w-2xl leading-relaxed italic">
                "Fragrances of hand-crushed spices greet you. A sanctuary of warm wood finishes, premium seating, and gold details."
              </p>
            </div>

            {/* The Table */}
            <div className="flex flex-col items-center">
              <span className="text-xs tracking-widest text-gold/60 uppercase mb-4">THE TABLE</span>
              <p className="font-heading text-xl md:text-3xl text-soft-ivory/80 max-w-2xl leading-relaxed italic">
                "Prepared with crisp layout linens, custom brass utensils, and chilled pure water. Your space to pause and converse."
              </p>
            </div>

            {/* The Food */}
            <div className="flex flex-col items-center">
              <span className="text-xs tracking-widest text-gold/60 uppercase mb-4">THE FOOD</span>
              <p className="font-heading text-xl md:text-3xl text-soft-ivory/80 max-w-2xl leading-relaxed italic">
                "Our signature Veg Maratha arrives sizzling in an imperial bowl. Golden butter naan, fresh lassi, and hot crispy dosas follow."
              </p>
            </div>

            {/* The Moment */}
            <div className="flex flex-col items-center">
              <span className="text-xs tracking-widest text-gold/60 uppercase mb-4">THE MOMENT</span>
              <h3 className="font-heading text-3xl md:text-5xl text-gold tracking-widest leading-tight max-w-2xl uppercase">
                You don't just visit Maurya.<br/>
                <span className="text-crimson">You gather here.</span>
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MASONRY GALLERY (Phase 17) */}
      <section id="gallery" className="py-24 md:py-36 px-6 md:px-12 bg-midnight">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">03 — Immersive Gallery</span>
            <h2 className="font-heading text-4xl md:text-5xl text-soft-ivory tracking-wide mt-2">Vibe & Ambience</h2>
          </div>

          {/* Editorial Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" data-cursor="VIEW">
            {/* Column 1 */}
            <div className="flex flex-col gap-6 md:gap-8">
              {/* Item 1 - Large Food Image */}
              <div className="gallery-item overflow-hidden rounded-2xl border border-white/10 aspect-[3/4] bg-wine/10 relative group cursor-pointer">
                <img 
                  src="https://cdn.hashtagloyalty.com/items/images/012/147/233/original/thumb_2023_01_18_12_18_15_Veg_Maratha.jpg?w=500&h=600" 
                  alt="Veg Maratha Culinary details" 
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-xs tracking-widest uppercase text-gold font-bold">Signature Veg Maratha</p>
                </div>
              </div>
              
              {/* Item 2 - Small Interior */}
              <div className="gallery-item overflow-hidden rounded-2xl border border-white/10 aspect-square bg-wine/10 relative group cursor-pointer">
                <img 
                  src="https://cdn.hashtagloyalty.com/images/190596/1_(4).png?v=1718102437&w=400&h=400" 
                  alt="Ambient interior details" 
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-xs tracking-widest uppercase text-gold font-bold">Ambient Seating</p>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-6 md:gap-8 md:translate-y-12">
              {/* Item 3 - Wide Kitchen Shot */}
              <div className="gallery-item overflow-hidden rounded-2xl border border-white/10 aspect-[4/3] bg-wine/10 relative group cursor-pointer">
                <img 
                  src="https://cdn.hashtagloyalty.com/items/images/012/147/185/original/thumb_2023_01_18_12_12_01_Veg_Biryani.jpg?w=600&h=450" 
                  alt="Aromatic Biryani dish" 
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-xs tracking-widest uppercase text-gold font-bold">Tandoor & Biryani Kitchen</p>
                </div>
              </div>
              
              {/* Item 4 - Portrait Food */}
              <div className="gallery-item overflow-hidden rounded-2xl border border-white/10 aspect-[3/4] bg-wine/10 relative group cursor-pointer">
                <img 
                  src="https://cdn.hashtagloyalty.com/items/images/012/147/197/original/thumb_2023_01_18_12_05_49_Paneer_Butter_Masala.jpeg?w=500&h=650" 
                  alt="Creamy Paneer Butter Masala" 
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-xs tracking-widest uppercase text-gold font-bold">Paneer Specialities</p>
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-6 md:gap-8">
              {/* Item 5 - Portrait Food */}
              <div className="gallery-item overflow-hidden rounded-2xl border border-white/10 aspect-[3/4] bg-wine/10 relative group cursor-pointer">
                <img 
                  src="https://cdn.hashtagloyalty.com/items/images/012/147/243/original/thumb_2023_01_18_12_13_16_Veg_Hakka_Noodles.jpg?w=500&h=650" 
                  alt="Wok Tossed Chinese Hakka Noodles" 
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-xs tracking-widest uppercase text-gold font-bold">Wok-Tossed Specialities</p>
                </div>
              </div>

              {/* Item 6 - Wide Dining */}
              <div className="gallery-item overflow-hidden rounded-2xl border border-white/10 aspect-[4/3] bg-wine/10 relative group cursor-pointer">
                <img 
                  src="https://cdn.hashtagloyalty.com/items/images/012/147/254/original/thumb_2023_01_18_12_13_59_Veg_Jaipuri.jpg?w=600&h=450" 
                  alt="Rich Veg Jaipuri" 
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-xs tracking-widest uppercase text-gold font-bold">Premium Family Dinings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
