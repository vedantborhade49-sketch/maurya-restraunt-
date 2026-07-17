"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const PRINCIPLES = [
  {
    word: "Fresh.",
    desc: "Ingredients prepared every day with uncompromising quality.",
    align: "left" as const,
    margin: "ml-0",
  },
  {
    word: "Pure.",
    desc: "100% vegetarian recipes rooted in tradition and refined with care.",
    align: "right" as const,
    margin: "ml-auto",
  },
  {
    word: "Together.",
    desc: "Designed for families, celebrations, and everyday moments.",
    align: "left" as const,
    margin: "ml-[15%]",
  },
];

const MATERIALS = [
  { src: "/editorial-process.png",  caption: "Morning Spices"   },
  { src: "/restaurant-interior.png", caption: "Copper Accents"  },
  { src: "/editorial-food-1.png",   caption: "Handmade Roti"    },
  { src: "/editorial-process.png",  caption: "Stone & Mortar"   },
  { src: "/editorial-food-1.png",   caption: "Cotton Napkins"   },
];

export default function Chapter02() {
  const sectionRef = useRef<HTMLElement>(null);

  // Sec 1
  const s1LabelRef = useRef<HTMLDivElement>(null);
  const s1H1aRef   = useRef<HTMLSpanElement>(null);
  const s1H1bRef   = useRef<HTMLSpanElement>(null);
  const s1ParaRef  = useRef<HTMLParagraphElement>(null);

  // Sec 2
  const s2WrapRef  = useRef<HTMLDivElement>(null);
  const s2InnerRef = useRef<HTMLDivElement>(null);

  // Sec 3
  const s3Refs = useRef<(HTMLDivElement | null)[]>([]);

  // Sec 4
  const s4StripRef = useRef<HTMLDivElement>(null);

  // Sec 5
  const s5WrapRef = useRef<HTMLDivElement>(null);
  const s5CopyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      const ease = "power3.out";

      // ── Reveal helper ──────────────────────────────────────
      const reveal = (el: Element | null, y = 24, dur = 1.3, delay = 0) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y },
          { opacity: 1, y: 0, duration: dur, ease, delay,
            scrollTrigger: { trigger: el, start: "top 87%" } }
        );
      };

      // ── Section 1 ─────────────────────────────────────────
      reveal(s1LabelRef.current,  8,  0.8, 0);
      reveal(s1H1aRef.current,   28, 1.35, 0.05);
      reveal(s1H1bRef.current,   28, 1.35, 0.13);
      reveal(s1ParaRef.current,  16, 1.1,  0.22);

      // ── Section 2: scale parallax ─────────────────────────
      gsap.fromTo(s2WrapRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.5, ease,
          scrollTrigger: { trigger: s2WrapRef.current, start: "top 82%" } }
      );
      gsap.fromTo(s2InnerRef.current,
        { scale: 1.06 },
        { scale: 1, ease: "none",
          scrollTrigger: {
            trigger: s2WrapRef.current,
            start: "top bottom", end: "bottom top", scrub: true,
          } }
      );

      // ── Section 3: principles ─────────────────────────────
      s3Refs.current.forEach((el, i) => {
        reveal(el, 20, 1.2, i * 0.05);
      });

      // ── Section 4: strip moves 6% slower than scroll ──────
      gsap.to(s4StripRef.current, {
        x: "-6%",
        ease: "none",
        scrollTrigger: {
          trigger: s4StripRef.current,
          start: "top bottom", end: "bottom top", scrub: true,
        },
      });

      // ── Section 5 ─────────────────────────────────────────
      gsap.fromTo(s5WrapRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease,
          scrollTrigger: { trigger: s5WrapRef.current, start: "top 80%" } }
      );
      reveal(s5CopyRef.current, 12, 1.1, 0.2);

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#F8F4EE" }}
    >
      {/* Grain */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
           style={{ filter: "url(#grain)", backgroundColor: "#b09060" }} />

      {/* Warm radial depth */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0" style={{
        background: [
          "radial-gradient(ellipse 70% 40% at 0% 0%,   rgba(197,164,108,0.08) 0%, transparent 70%)",
          "radial-gradient(ellipse 50% 35% at 100% 60%, rgba(139,106,67,0.06) 0%, transparent 65%)",
        ].join(","),
      }} />

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — EMOTIONAL STATEMENT
      ══════════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-[1380px] mx-auto px-8 md:px-14 lg:px-20 pt-32 md:pt-44 pb-24 md:pb-32">

        {/* Label */}
        <div ref={s1LabelRef} className="flex items-center gap-3 mb-14 opacity-0">
          <div className="w-5 h-px" style={{ backgroundColor: "#C5A46C" }} />
          <span className="font-mono text-[8px] uppercase tracking-[0.42em]" style={{ color: "#C5A46C" }}>
            Serving Families Since 1998
          </span>
        </div>

        {/* Headline — occupies ≈ half the viewport */}
        <h2 className="font-heading leading-[0.86] tracking-tight mb-16" style={{ color: "#2B241D" }}>
          <span ref={s1H1aRef} className="block opacity-0"
                style={{ fontSize: "clamp(52px, 9.5vw, 138px)" }}>
            Every meal begins
          </span>
          <span ref={s1H1bRef} className="block italic opacity-0"
                style={{ fontSize: "clamp(52px, 9.5vw, 138px)", color: "#8B6A43" }}>
            with a moment.
          </span>
        </h2>

        {/* Body — quiet, secondary */}
        <p ref={s1ParaRef}
           className="opacity-0 font-heading leading-[1.6]"
           style={{
             fontSize: "clamp(16px, 1.5vw, 20px)",
             color: "#7A7060",
             maxWidth: 480,
             marginLeft: "auto", // right-anchored asymmetry
             marginRight: 0,
           }}>
          For decades, families have gathered around our tables—not just for food, but for conversations, celebrations, and memories that last far beyond the final serving.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — THE SPACE
      ══════════════════════════════════════════════════════ */}
      <div className="relative z-10 px-4 md:px-6 pb-28 md:pb-40">
        <div
          ref={s2WrapRef}
          className="relative overflow-hidden opacity-0"
          style={{ borderRadius: 36, aspectRatio: "16 / 10" }}
        >
          <div ref={s2InnerRef} className="absolute inset-0 will-change-transform">
            <Image
              src="/maurya-family-dining.jpg"
              alt="Three generations of an Indian family sharing a vegetarian meal at Maurya — warm candid evening"
              fill sizes="98vw"
              className="object-cover object-center"
              style={{
                filter: "sepia(0.12) saturate(0.75) hue-rotate(-4deg) contrast(1.04) brightness(0.98)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — THREE EDITORIAL PRINCIPLES
      ══════════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-[1380px] mx-auto px-8 md:px-14 lg:px-20 pb-28 md:pb-40">

        {PRINCIPLES.map((p, i) => (
          <div key={i}>
            {/* Brass divider — before each except first */}
            {i > 0 && (
              <div className="w-full h-px my-16 md:my-20" style={{ backgroundColor: "#C5A46C", opacity: 0.2 }} />
            )}
            <div
              ref={el => { s3Refs.current[i] = el }}
              className={`opacity-0 flex flex-col ${p.margin}`}
              style={{ maxWidth: "60%" }}
            >
              <span
                className="font-heading tracking-tight leading-none mb-4"
                style={{ fontSize: "clamp(64px, 10vw, 148px)", color: "#2B241D" }}
              >
                {p.word}
              </span>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] leading-[1.9]"
                 style={{ color: "#8B8070", maxWidth: 300 }}>
                {p.desc}
              </p>
            </div>
          </div>
        ))}

        {/* Final brass rule */}
        <div className="w-full h-px mt-16 md:mt-20" style={{ backgroundColor: "#C5A46C", opacity: 0.2 }} />
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — MATERIAL STORY STRIP
      ══════════════════════════════════════════════════════ */}
      <div className="relative z-10 overflow-hidden pb-28 md:pb-40">
        {/* Section label */}
        <div className="max-w-[1380px] mx-auto px-8 md:px-14 lg:px-20 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-5 h-px" style={{ backgroundColor: "#C5A46C" }} />
            <span className="font-mono text-[8px] uppercase tracking-[0.4em]" style={{ color: "#C5A46C" }}>
              The Craft
            </span>
          </div>
        </div>

        {/* Horizontal strip — will-change-transform for the parallax */}
        <div
          ref={s4StripRef}
          className="flex gap-4 pl-8 md:pl-14 lg:pl-20 will-change-transform"
          style={{ width: "max-content" }}
        >
          {MATERIALS.map((mat, i) => (
            <div key={i} className="flex flex-col gap-3 shrink-0">
              <div
                className="relative overflow-hidden"
                style={{
                  width: "clamp(200px, 28vw, 380px)",
                  aspectRatio: "4 / 5",
                  borderRadius: 12,
                }}
              >
                <Image
                  src={mat.src}
                  alt={mat.caption}
                  fill sizes="30vw"
                  className="object-cover object-center"
                  style={{
                    filter: "sepia(0.2) saturate(0.6) hue-rotate(-5deg) contrast(1.06) brightness(0.96)",
                  }}
                />
              </div>
              <span className="font-mono text-[8px] uppercase tracking-[0.32em]" style={{ color: "#B09070" }}>
                {mat.caption}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — CLOSING EDITORIAL MOMENT
      ══════════════════════════════════════════════════════ */}
      <div className="relative z-10 px-4 md:px-6 pb-0">
        <div
          ref={s5WrapRef}
          className="relative overflow-hidden opacity-0"
          style={{ borderRadius: "28px 28px 0 0", aspectRatio: "21 / 9", minHeight: 320 }}
        >
          <Image
            src="/restaurant-interior.png"
            alt="A family sharing dinner at Maurya — candid evening"
            fill sizes="100vw"
            className="object-cover object-center"
            style={{
              filter: "sepia(0.2) saturate(0.62) hue-rotate(-5deg) contrast(1.06) brightness(0.9)",
            }}
          />
          {/* Soft bottom vignette only */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "linear-gradient(to top, rgba(43,36,29,0.55) 0%, transparent 45%)",
          }} />

          {/* Caption — bottom left only */}
          <div ref={s5CopyRef} className="absolute bottom-8 md:bottom-12 left-8 md:left-14 opacity-0">
            <p className="font-heading italic leading-[1.1]"
               style={{ fontSize: "clamp(22px, 3vw, 44px)", color: "#F8F4EE", maxWidth: 400 }}>
              Some traditions are<br />served daily.
            </p>
            {/* Animated arrow hint */}
            <div className="flex items-center gap-3 mt-5">
              <div className="w-4 h-px" style={{ backgroundColor: "#C5A46C" }} />
              <span className="font-mono text-[8px] uppercase tracking-[0.35em]" style={{ color: "#C5A46C" }}>
                Scroll to continue
              </span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
