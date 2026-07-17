"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Act02TheSoul() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // Long pinning for slow cinematic fade
          scrub: 1,
          pin: true,
        }
      });

      // Image 1
      tl.to(imageRefs.current[0], { opacity: 1, scale: 1.05, duration: 2 })
        .to(textRefs.current[0], { opacity: 1, y: 0, duration: 1 }, "-=1.5")
        .to(imageRefs.current[0], { opacity: 0, duration: 1 }, "+=1")
        .to(textRefs.current[0], { opacity: 0, y: -20, duration: 1 }, "-=1");

      // Image 2
      tl.to(imageRefs.current[1], { opacity: 1, scale: 1.05, duration: 2 })
        .to(textRefs.current[1], { opacity: 1, y: 0, duration: 1 }, "-=1.5")
        .to(imageRefs.current[1], { opacity: 0, duration: 1 }, "+=1")
        .to(textRefs.current[1], { opacity: 0, y: -20, duration: 1 }, "-=1");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#2E2926] overflow-hidden">
      
      {/* Sequence 1 */}
      <div ref={el => { imageRefs.current[0] = el }} className="absolute inset-0 opacity-0 transform scale-110">
        <Image src="/editorial-process.png" alt="Soul 1" fill className="object-cover opacity-50 mix-blend-luminosity filter sepia-[0.3]" />
        <div className="absolute inset-0 bg-[#6D755F] opacity-40 mix-blend-overlay" />
      </div>
      <div ref={el => { textRefs.current[0] = el }} className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-8 z-10 px-6">
        <h2 className="font-heading italic text-[36px] md:text-[50px] lg:text-[70px] text-[#F2E8DA] max-w-3xl text-center leading-[1.1] drop-shadow-xl">
          A father bringing his family<br />every Sunday.
        </h2>
      </div>

      {/* Sequence 2 */}
      <div ref={el => { imageRefs.current[1] = el }} className="absolute inset-0 opacity-0 transform scale-110">
        <Image src="/editorial-spices.png" alt="Soul 2" fill className="object-cover opacity-50 mix-blend-luminosity filter sepia-[0.3]" />
        <div className="absolute inset-0 bg-[#AF6048] opacity-30 mix-blend-overlay" />
      </div>
      <div ref={el => { textRefs.current[1] = el }} className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-8 z-10 px-6">
        <h2 className="font-heading italic text-[36px] md:text-[50px] lg:text-[70px] text-[#F2E8DA] max-w-3xl text-center leading-[1.1] drop-shadow-xl">
          The first flame.<br />The first customer.
        </h2>
      </div>

    </section>
  );
}
