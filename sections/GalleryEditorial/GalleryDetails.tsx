"use client";

import React, { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const WALL_IMAGES = [
  { src: "/editorial-food-3.png", top: "2%", left: "5%", width: "w-[50vw] md:w-[20vw]", aspect: "aspect-square", speed: 1.2, z: 10, caption: "FIG 01. Prep" },
  { src: "https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?q=80&w=800", top: "5%", left: "22%", width: "w-[70vw] md:w-[35vw]", aspect: "aspect-[4/5]", speed: 0.7, z: 5, caption: "Atmosphere" },
  { src: "/editorial-food-4.png", top: "12%", left: "60%", width: "w-[60vw] md:w-[25vw]", aspect: "aspect-[3/4]", speed: 1.5, z: 15, caption: "Detail" },
  { src: "https://images.unsplash.com/photo-1414235077428-9710c28afbb3?q=80&w=800", top: "18%", left: "80%", width: "w-[40vw] md:w-[15vw]", aspect: "aspect-[2/3]", speed: 2.0, z: 8, caption: "Corner" },
  
  { src: "/editorial-food-1.png", top: "25%", left: "8%", width: "w-[85vw] md:w-[40vw]", aspect: "aspect-[16/9]", speed: 0.5, z: 10, caption: "Main Dining" },
  { src: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=800", top: "30%", left: "45%", width: "w-[45vw] md:w-[20vw]", aspect: "aspect-square", speed: 1.8, z: 20, caption: "Texture" },
  { src: "/editorial-food-2.png", top: "27%", left: "68%", width: "w-[65vw] md:w-[25vw]", aspect: "aspect-[3/4]", speed: 1.0, z: 5, caption: "Service" },

  { src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800", top: "42%", left: "30%", width: "w-[90vw] md:w-[45vw]", aspect: "aspect-[21/9]", speed: 0.6, z: 5, caption: "Architecture" },
  { src: "/editorial-entrance.png", top: "46%", left: "12%", width: "w-[40vw] md:w-[18vw]", aspect: "aspect-[4/5]", speed: 2.2, z: 15, caption: "Light" },

  { src: "https://images.unsplash.com/photo-1581184953963-d15972933fc1?q=80&w=800", top: "55%", left: "55%", width: "w-[75vw] md:w-[30vw]", aspect: "aspect-[3/4]", speed: 0.8, z: 10, caption: "The Chef" },
  { src: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?q=80&w=800", top: "60%", left: "45%", width: "w-[45vw] md:w-[18vw]", aspect: "aspect-square", speed: 1.5, z: 20, caption: "Tools" },
  { src: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=800", top: "53%", left: "75%", width: "w-[60vw] md:w-[22vw]", aspect: "aspect-[16/9]", speed: 1.2, z: 5, caption: "Glassware" },

  { src: "/editorial-food-3.png", top: "68%", left: "5%", width: "w-[80vw] md:w-[35vw]", aspect: "aspect-[4/3]", speed: 0.7, z: 10, caption: "Table Setting" },
  { src: "https://images.unsplash.com/photo-1428515613728-6b4607e44363?q=80&w=800", top: "75%", left: "38%", width: "w-[40vw] md:w-[15vw]", aspect: "aspect-[2/3]", speed: 2.5, z: 15, caption: "Ingredient" },
  { src: "/editorial-food-4.png", top: "82%", left: "20%", width: "w-[60vw] md:w-[25vw]", aspect: "aspect-square", speed: 1.1, z: 5, caption: "Plating" },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800", top: "78%", left: "55%", width: "w-[70vw] md:w-[30vw]", aspect: "aspect-[3/4]", speed: 0.9, z: 10, caption: "Shadows" },
  
  { src: "https://images.unsplash.com/photo-1495474472296-da52b0bc23b3?q=80&w=800", top: "88%", left: "70%", width: "w-[50vw] md:w-[20vw]", aspect: "aspect-[16/9]", speed: 1.6, z: 20, caption: "Nature" },
  { src: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=800", top: "93%", left: "30%", width: "w-[90vw] md:w-[40vw]", aspect: "aspect-[21/9]", speed: 0.5, z: 5, caption: "Ending" },
];

const ANNOTATIONS = [
  { top: "10%", left: "5%", text: "ARCHIVE — 04" },
  { top: "22%", left: "85%", text: "COORD: 28°36'50\"N" },
  { top: "38%", left: "10%", text: "NOTE: EVENING SERVICE" },
  { top: "50%", left: "80%", text: "EXHIBITION 2024" },
  { top: "68%", left: "20%", text: "REF: 884-A" },
  { top: "90%", left: "10%", text: "THE KITCHEN" },
];

const GalleryPhotographicWall = memo(function GalleryPhotographicWall() {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Check if device is mobile to tone down heavy parallax
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    const ctx = gsap.context(() => {
      // 1. Staggered Entrance Fade-In via Batch
      ScrollTrigger.batch(itemsRef.current, {
        start: "top 85%",
        once: true,
        onEnter: (elements) => {
          gsap.fromTo(elements,
            { y: 50, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 1.2, 
              ease: "power3.out", 
              stagger: 0.1,
              onComplete: () => gsap.set(elements, { clearProps: "willChange" })
            }
          );
        }
      });

      // 2. Continuous Subtle Parallax
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        const speed = parseFloat(item.dataset.speed || "1");
        // Reduce parallax severity on mobile
        const yMove = isMobile ? -30 * speed : -100 * speed;
        
        gsap.to(item, {
          yPercent: yMove,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onEnter: () => gsap.set(item, { willChange: "transform" }),
            onLeave: () => gsap.set(item, { willChange: "auto" }),
            onEnterBack: () => gsap.set(item, { willChange: "transform" }),
            onLeaveBack: () => gsap.set(item, { willChange: "auto" }),
          }
        });
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const setItemRef = (index: number) => (el: HTMLDivElement | null) => {
    itemsRef.current[index] = el!;
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[400vh] md:h-[350vh] bg-transparent overflow-hidden content-visibility-auto"
      style={{ contain: "layout paint style" }}
    >
      {/* Editorial Annotations (Background layer) */}
      {ANNOTATIONS.map((note, i) => (
        <div 
          key={`note-${i}`} 
          className="absolute font-mono text-[8px] md:text-[10px] uppercase tracking-[0.3em] opacity-40 mix-blend-difference text-white pointer-events-none"
          style={{ top: note.top, left: note.left }}
        >
          {note.text}
        </div>
      ))}

      {/* The Photographic Wall */}
      {WALL_IMAGES.map((img, i) => (
        <div 
          key={`wall-img-${i}`}
          ref={setItemRef(i)}
          data-speed={img.speed}
          className={`absolute ${img.width} ${img.aspect} group hover-reveal cursor-pointer opacity-0 will-change-[transform,opacity] transition-transform duration-700 hover:scale-[1.02]`}
          style={{ 
            top: img.top, 
            left: img.left, 
            zIndex: img.z 
          }}
        >
          <div className="relative w-full h-full overflow-hidden bg-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.1)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.2)] transition-all duration-700 ease-out">
            <Image 
              src={img.src} 
              alt={img.caption} 
              fill 
              sizes="(max-width: 768px) 90vw, 40vw" 
              className="object-cover transition-all duration-700 group-hover:brightness-110 group-hover:scale-105" 
              decoding="async" 
              loading="lazy" 
            />
          </div>
          {/* Subtle Hover Caption */}
          <div className="absolute -bottom-6 left-0 font-mono text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-60 transition-opacity duration-500 text-current">
            {img.caption}
          </div>
        </div>
      ))}

    </section>
  );
});

export default GalleryPhotographicWall;
