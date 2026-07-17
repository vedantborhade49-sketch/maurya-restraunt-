"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// ── Scene definitions ────────────────────────────────────────────
const SCENES = [
  {
    id: "entrance",
    image: "/restaurant-interior.png",
    copy: ["Before the evening begins,", "someone always lights the lamps."],
    copyPosition: "bottom-left",
    overlayOpacity: 0.45,
    filter: "sepia(0.2) saturate(0.6) hue-rotate(-5deg) contrast(1.08) brightness(0.88)",
    tint: "#1A0E08",
  },
  {
    id: "garden",
    image: "/editorial-process.png",
    copy: ["Some tables", "are lit by the sun."],
    copyPosition: "top-right",
    overlayOpacity: 0.25,
    filter: "sepia(0.15) saturate(0.7) hue-rotate(-3deg) contrast(1.05) brightness(1.0)",
    tint: "#3A1A08",
  },
  {
    id: "dining",
    image: "/restaurant-interior.png",
    copy: ["Every conversation", "finds its length here."],
    copyPosition: "bottom-left",
    overlayOpacity: 0.38,
    filter: "sepia(0.22) saturate(0.6) hue-rotate(-6deg) contrast(1.06) brightness(0.92)",
    tint: "#1A0E08",
  },
  {
    id: "kitchen",
    image: "/editorial-process.png",
    copy: ["Made with intention."],
    copyPosition: "center",
    overlayOpacity: 0.52,
    filter: "sepia(0.3) saturate(0.5) hue-rotate(-8deg) contrast(1.18) brightness(0.82)",
    tint: "#0E0806",
  },
  {
    id: "food",
    image: "/editorial-food-1.png",
    copy: ["Everything on the menu", "began as someone's memory."],
    copyPosition: "top-left",
    overlayOpacity: 0.30,
    filter: "sepia(0.18) saturate(0.65) hue-rotate(-4deg) contrast(1.08) brightness(0.96)",
    tint: "#2A1208",
  },
  {
    id: "guests",
    image: "/editorial-food-3.png",
    copy: ["You will return."],
    copyPosition: "center",
    overlayOpacity: 0.40,
    filter: "sepia(0.2) saturate(0.58) hue-rotate(-6deg) contrast(1.1) brightness(0.88)",
    tint: "#1A0E08",
  },
] as const;

type CopyPosition = "bottom-left" | "top-right" | "top-left" | "center";

function copyClasses(pos: CopyPosition) {
  switch (pos) {
    case "bottom-left":
      return "absolute bottom-12 md:bottom-16 left-8 md:left-14 max-w-[480px]";
    case "top-right":
      return "absolute top-28 md:top-32 right-8 md:right-14 max-w-[480px] text-right";
    case "top-left":
      return "absolute top-28 md:top-32 left-8 md:left-14 max-w-[480px]";
    case "center":
      return "absolute inset-0 flex items-center justify-center text-center px-8";
  }
}

// ── Component ────────────────────────────────────────────────────
export default function CinematicJourney() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sceneRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const copyRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const locationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      SCENES.forEach((scene, i) => {
        const sceneEl = sceneRefs.current[i];
        const imgEl   = imgRefs.current[i];
        const copyEl  = copyRefs.current[i];
        if (!sceneEl || !imgEl || !copyEl) return;

        // ── Camera depth: image scales as you scroll through the scene ──
        gsap.fromTo(imgEl,
          { scale: 1.08 },
          {
            scale: 1.0,
            ease: "none",
            scrollTrigger: {
              trigger: sceneEl,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        // ── Copy: fades in as scene enters, fades out as it exits ──
        const copyTl = gsap.timeline({
          scrollTrigger: {
            trigger: sceneEl,
            start: "top 60%",
            end: "bottom 30%",
            scrub: true,
          },
        });
        copyTl
          .fromTo(copyEl,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
          )
          .to(copyEl,
            { opacity: 0, y: -10, duration: 0.4, ease: "power2.in" }
          );
      });

      // ── Location closing scene ──
      if (locationRef.current) {
        gsap.fromTo(locationRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: locationRef.current,
              start: "top 70%",
            },
          }
        );
      }

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef}>

      {/* ═══════════════════════════════════════════════════════
          CINEMATIC SCENES — one continuous walk through Maurya
      ═══════════════════════════════════════════════════════ */}
      {SCENES.map((scene, i) => (
        <div
          key={scene.id}
          ref={el => { sceneRefs.current[i] = el }}
          className="relative w-full overflow-hidden"
          style={{ height: "100svh" }}
        >

          {/* ── Image layer ── */}
          <div
            ref={el => { imgRefs.current[i] = el }}
            className="absolute inset-0 will-change-transform"
            style={{ scale: 1.08 }} // initial state for GSAP
          >
            <Image
              src={scene.image}
              alt={`Maurya — ${scene.id}`}
              fill
              sizes="100vw"
              className="object-cover object-center"
              style={{ filter: scene.filter }}
              priority={i === 0}
            />
            {/* Warm brand tint */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: scene.tint, opacity: scene.overlayOpacity, mixBlendMode: "multiply" }}
            />
          </div>

          {/* ── Gradient transitions between scenes ── */}
          {/* Bottom of this scene fades to black */}
          <div
            className="absolute inset-x-0 bottom-0 h-36 pointer-events-none z-10"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.7))" }}
          />
          {/* Top of this scene fades from black (except first) */}
          {i > 0 && (
            <div
              className="absolute inset-x-0 top-0 h-28 pointer-events-none z-10"
              style={{ background: "linear-gradient(to top, transparent, rgba(0,0,0,0.65))" }}
            />
          )}

          {/* ── Floating typography ── */}
          <div
            ref={el => { copyRefs.current[i] = el }}
            className={`z-20 pointer-events-none ${copyClasses(scene.copyPosition)}`}
            style={{ opacity: 0 }}
          >
            {scene.copyPosition === "center" ? (
              <p
                className="font-heading text-[#F8F5EF] leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(36px, 6vw, 80px)" }}
              >
                {scene.copy.join("\n")}
              </p>
            ) : (
              <div className="flex flex-col gap-0">
                {scene.copy.map((line, j) => (
                  <span
                    key={j}
                    className="font-heading text-[#F8F5EF] leading-[1.05] tracking-tight"
                    style={{
                      fontSize: "clamp(32px, 4.5vw, 64px)",
                      fontStyle: j === 1 ? "italic" : "normal",
                      opacity: j === 1 ? 0.85 : 1,
                    }}
                  >
                    {line}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ── Scene identifier — micro detail ── */}
          <div
            className="absolute top-7 right-8 md:right-14 z-20 font-mono text-[8px] uppercase tracking-[0.35em]"
            style={{ color: "rgba(248,245,239,0.3)" }}
          >
            {String(i + 2).padStart(3, "0")}
          </div>

        </div>
      ))}

      {/* ═══════════════════════════════════════════════════════
          LOCATION — closing scene, warm parchment
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={locationRef}
        className="relative w-full flex flex-col justify-center"
        style={{
          minHeight: "70vh",
          backgroundColor: "#F6EBDD",
          opacity: 0,
        }}
      >
        {/* Depth background */}
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{
          background: [
            "radial-gradient(ellipse 80% 50% at 10% 15%, rgba(185,100,55,0.07) 0%, transparent 70%)",
            "radial-gradient(ellipse 60% 45% at 88% 80%, rgba(155,65,40,0.06) 0%, transparent 65%)",
          ].join(","),
        }} />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.022]"
             style={{ filter: "url(#grain)", backgroundColor: "#a08060" }} />

        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-8 md:px-14 lg:px-20 py-24 md:py-32">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-14">
            <div className="w-5 h-px" style={{ backgroundColor: "#A56A43" }} />
            <span className="font-mono text-[9px] uppercase tracking-[0.35em]" style={{ color: "#A56A43" }}>
              Find us
            </span>
          </div>

          {/* Location heading */}
          <h2
            className="font-heading leading-[0.9] tracking-tight mb-10"
            style={{ fontSize: "clamp(40px, 7vw, 100px)", color: "#2C1810" }}
          >
            Kondhwa,<br />
            <span className="italic" style={{ color: "#6E3236" }}>Pune.</span>
          </h2>

          <p className="font-heading italic mb-16" style={{
            fontSize: "clamp(15px, 1.4vw, 20px)",
            color: "#8B7355",
            lineHeight: 1.6,
            maxWidth: 340,
          }}>
            Five minutes from Khadi Machine Chowk.<br />
            Open every day, from breakfast until late evening.
          </p>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {["Open Garden", "Pure Vegetarian", "Air Conditioned", "Parking"].map((item, i, arr) => (
              <span
                key={i}
                className="flex items-center gap-5 font-mono text-[8px] md:text-[9px] uppercase tracking-[0.28em]"
                style={{ color: "#B09070" }}
              >
                {item}
                {i < arr.length - 1 && <span style={{ color: "#C8A882", opacity: 0.4 }}>·</span>}
              </span>
            ))}
          </div>

          {/* Reserve CTA */}
          <a
            href="#reserve"
            className="inline-block mt-12 font-mono text-[10px] uppercase tracking-[0.3em] border-b pb-1 transition-all duration-500 hover:tracking-[0.4em]"
            style={{ color: "#6E3236", borderColor: "rgba(110,50,54,0.35)" }}
          >
            Reserve a table →
          </a>

        </div>
      </section>

    </div>
  );
}
