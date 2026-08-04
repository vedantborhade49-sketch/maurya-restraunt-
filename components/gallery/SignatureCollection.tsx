"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DISHES = [
  {
    name: "Veg Maratha",
    story: "Spicy vegetable koftas simmered in our signature fiery red gravy.",
    image: "/editorial-food-mains.png",
    layoutType: "imageLeft",
    bgPattern: "ivory",
  },
  {
    name: "Paneer Tikka Masala",
    story: "Charcoal-smoked paneer cubes in a rich, buttery tomato sauce.",
    image: "/dish-paneer-butter-masala.png",
    layoutType: "fullWidth",
    bgPattern: "charcoal",
  },
  {
    name: "Dal Makhani",
    story: "Slow-cooked for 12 hours over tandoori embers. A Maurya classic.",
    image: "/editorial-food-1.png",
    layoutType: "portrait",
    bgPattern: "ivory",
  },
  {
    name: "Subz Biryani",
    story: "Aromatic basmati rice layered with saffron, fresh vegetables, and dum-cooked.",
    image: "/dish-veg-biryani.png",
    layoutType: "landscape",
    bgPattern: "wine",
  },
  {
    name: "Stuffed Kulcha",
    story: "Crisp, golden, and packed with aromatic spiced potatoes and herbs.",
    image: "/dish-butter-naan.png",
    layoutType: "fullWidth",
    bgPattern: "ivory",
  }
];

export default function SignatureCollection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      
      const sections = gsap.utils.toArray(".dish-section");
      
      sections.forEach((sec: any) => {
        const image = sec.querySelector(".dish-image");
        const overlay = sec.querySelector(".dish-overlay");

        // Scale down effect on scroll past
        if (image) {
          gsap.to(image, {
            scale: 0.95,
            opacity: 0.7,
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              start: "bottom bottom",
              end: "bottom top",
              scrub: true,
            }
          });

          // Fade in from bottom on enter
          gsap.fromTo(image, 
            { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", scale: 1.05 },
            { 
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", 
              scale: 1, 
              duration: 1.5, 
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: sec,
                start: "top 85%",
              }
            }
          );
        }

        if(overlay) {
          gsap.fromTo(overlay,
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 1.0,
              delay: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sec,
                start: "top 60%",
              }
            }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getBgClass = (bg: string) => {
    switch(bg) {
      case "charcoal": return "bg-[#2a2420] text-[#F8F5EF]";
      case "wine": return "bg-[#350709] text-[#F8F5EF]";
      case "ivory": 
      default: return "bg-[#F8F5EF] text-[#2a2420]";
    }
  };

  return (
    <section ref={containerRef} className="w-full relative z-20 flex flex-col">
      {DISHES.map((dish, idx) => {
        
        // Define height for images
        const imgHeightClass = "h-[55vh] md:h-[70vh]";

        const renderOverlayInfo = () => (
          <div className="dish-overlay absolute bottom-6 left-6 md:bottom-12 md:left-12 z-10 max-w-sm drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <h3 className="font-serif text-4xl md:text-5xl text-white drop-shadow-lg leading-none mb-3">
              {dish.name}
            </h3>
            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#B98532] font-bold block mb-3 drop-shadow-sm">
              Chef's Signature • Since 1998
            </span>
            <p className="font-sans text-sm text-white/90 leading-relaxed font-light drop-shadow-sm">
              {dish.story}
            </p>
          </div>
        );

        const renderImage = (className: string) => (
          <div className={`relative overflow-hidden group ${className}`}>
            <div className={`dish-image relative w-full ${imgHeightClass} w-full transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]`}>
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              {/* Subtle Brass Border Glow on Hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-[#B98532]/40 transition-colors duration-700 pointer-events-none" />
            </div>
            {renderOverlayInfo()}
          </div>
        );

        return (
          <div key={idx} className={`dish-section relative w-full py-20 md:py-32 ${getBgClass(dish.bgPattern)} transition-colors duration-1000`}>
            
            {/* Texture overlay for depth */}
            <div className="absolute inset-0 z-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-0 z-0 opacity-[0.05] md:opacity-[0.07] bg-[url('/food-pattern-collage-bg.png')] bg-repeat mix-blend-multiply pointer-events-none" />
            
            <div className="relative z-10 w-full max-w-[1600px] mx-auto px-0 md:px-12">
              
              {/* Image Left Layout */}
              {dish.layoutType === "imageLeft" && (
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 px-6 md:px-0">
                  {renderImage("w-full md:w-[60%]")}
                  <div className="w-full md:w-[40%] flex flex-col justify-center space-y-6">
                    <span className="font-mono text-xs tracking-[0.3em] uppercase opacity-50">0{idx + 1} // Signature</span>
                    <h2 className="font-serif text-5xl md:text-7xl leading-tight">{dish.name}</h2>
                    <p className="font-sans text-base md:text-lg opacity-80 max-w-md font-light leading-relaxed">{dish.story}</p>
                  </div>
                </div>
              )}

              {/* Full Width Layout */}
              {dish.layoutType === "fullWidth" && (
                <div className="w-full">
                  {renderImage("w-full")}
                </div>
              )}

              {/* Portrait Layout */}
              {dish.layoutType === "portrait" && (
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 px-6 md:px-0">
                  <div className="w-full md:w-[40%] text-center md:text-right space-y-6 order-2 md:order-1">
                    <p className="font-serif text-2xl md:text-4xl italic opacity-90">"{dish.story}"</p>
                    <span className="font-mono text-xs tracking-widest uppercase text-[#B98532]">0{idx + 1}</span>
                  </div>
                  <div className="w-full md:w-[45%] order-1 md:order-2">
                    {renderImage("w-full md:aspect-[4/5]")}
                  </div>
                </div>
              )}

              {/* Landscape Layout */}
              {dish.layoutType === "landscape" && (
                <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center gap-12 px-6 md:px-0 text-center">
                  {renderImage("w-full md:aspect-[16/9]")}
                  <div className="max-w-2xl space-y-4">
                    <h2 className="font-serif text-4xl md:text-5xl">{dish.name}</h2>
                    <p className="font-sans text-base opacity-80 leading-relaxed">{dish.story}</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        );
      })}
    </section>
  );
}
