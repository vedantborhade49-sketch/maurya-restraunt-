"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
 * Editorial Image Layer — Chapter 02
 *
 * DESIGN PHILOSOPHY:
 *   Each scroll position is a fully art-directed magazine spread.
 *   Images are NOT floating cards. They are composed, placed,
 *   printed photographs with clean edges, generous white space,
 *   and deliberate relationship to the typography.
 *
 * STORY ARC (3 images):
 *   1. THE INTRODUCTION — Left-column hero, sets the mood
 *   2. THE CRAFT — Cinematic widescreen strip, intimate texture
 *   3. THE FINALE — Right portrait, closes with impact
 *
 * COMPOSITION LOGIC:
 *   As the existing text animation separates #ch2-part-1 (up-left)
 *   and #ch2-part-2 (down-right), images emerge in the spaces
 *   that open up — never competing, always composing together.
 *
 * MOTION:
 *   Nearly invisible. Slow fade, 0.97→1 scale, <0.5° rotation.
 *   The motion should almost disappear.
 */

const BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwY" +
  "IChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQc" +
  "HBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoK" +
  "CgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAABv/EAB8QAAICAQUBAAAAA" +
  "AAAAAAAAAECAwQABREhMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAA" +
  "AAAABAgADEf/aAAwDAQACEQMRAD8AoNfqKtiKOWCxPBKqkoySFcg+cZh6u0NmVpIbVhEY7hFKgD9x" +
  "jGMVG0snuf/2Q==";

/*
 * ─── COMPOSITION DEFINITIONS ───────────────────────────────
 *
 * Each composition is designed as a magazine spread:
 *   - Clean rectangular crop (no masks, no gradient fades)
 *   - Deliberate grid-aligned placement
 *   - Generous breathing room
 *   - "Printed photograph" aesthetic: subtle shadow, clean edges
 */

interface Composition {
  src: string;
  alt: string;
  /** Outer wrapper — positions the image on the editorial grid */
  position: React.CSSProperties;
  /** Inner image container — controls the crop/aspect ratio */
  frame: React.CSSProperties;
}

const COMPOSITIONS: Composition[] = [
  {
    // ─── COMPOSITION A: Left Column Hero ──────────────────
    // Large portrait image anchored to the left margin.
    // The existing centered typography lives in the right 40%.
    // Feels like opening a magazine to the feature story.
    src: "/editorial-food-1.png",
    alt: "Signature thali — brass plate, warm natural light",
    position: {
      left: "4%",
      top: "8%",
    },
    frame: {
      width: "42vw",
      height: "76vh",
    },
  },
  {
    // ─── COMPOSITION B: Cinematic Widescreen Strip ────────
    // Wide horizontal crop, centred vertically.
    // By this scroll point, text has separated up and down,
    // leaving the middle open for a cinematic landscape strip.
    // Feels like a full-bleed spread across a centrefold.
    src: "/editorial-food-2.png",
    alt: "Charred paneer — texture detail, shallow depth of field",
    position: {
      left: "8%",
      top: "50%",
      transform: "translateY(-50%)",
    },
    frame: {
      width: "84vw",
      height: "42vh",
    },
  },
  {
    // ─── COMPOSITION C: Right Portrait Finale ─────────────
    // Tall portrait anchored to the right margin.
    // Strong negative space on the left balances the annotations.
    // Feels like the closing spread of a magazine feature.
    src: "/editorial-food-5.png",
    alt: "Gulab jamun with gold leaf — editorial dessert finale",
    position: {
      right: "4%",
      left: "auto",
      top: "6%",
    },
    frame: {
      width: "40vw",
      height: "80vh",
    },
  },
];

export default function EditorialImageLayer() {
  const layerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!layerRef.current) return;

    const ctx = gsap.context(() => {
      /*
       * 3 compositions across the 200% pinned scroll.
       *
       * Each gets ~40% of the scroll with ~8% overlap for
       * continuous page-turn transitions.
       *
       *   Composition A: 0.00 → 0.40 (Introduction)
       *   Composition B: 0.32 → 0.72 (Craft)
       *   Composition C: 0.64 → 1.00 (Finale)
       *
       * Three phases per image:
       *   ARRIVAL:   20% — slow cinematic fade + scale
       *   PRESENCE:  55% — holds, barely perceptible parallax
       *   DEPARTURE: 25% — gentle fade into next composition
       */
      const ranges = [
        { start: 0.0,  end: 0.40 },
        { start: 0.32, end: 0.72 },
        { start: 0.64, end: 1.0  },
      ];

      // Motion — almost invisible. The image should feel like it
      // was always there, slowly being noticed.
      const motions = [
        // A: Slow push forward — the eye discovers the photograph
        { fromScale: 0.97, toScale: 1.0, fromY: 12, toY: -4, fromRotate: 0.15, toRotate: 0 },
        // B: Gentle depth pull — cinematic strip settles into place
        { fromScale: 1.02, toScale: 1.0, fromY: -8,  toY: 3,  fromRotate: -0.1,  toRotate: 0 },
        // C: Slow reveal — the finale materialises calmly
        { fromScale: 0.97, toScale: 1.0, fromY: 10,  toY: -3, fromRotate: 0.12, toRotate: 0 },
      ];

      imageRefs.current.forEach((imageEl, i) => {
        if (!imageEl) return;

        const range = ranges[i];
        const motion = motions[i];

        gsap.set(imageEl, {
          opacity: 0,
          scale: motion.fromScale,
          y: motion.fromY,
          rotation: motion.fromRotate,
        });

        ScrollTrigger.create({
          trigger: layerRef.current!.closest("section"),
          start: "top top",
          end: "+=200%",
          scrub: 1.8, // very smooth, cinematic scrub
          onUpdate: (self) => {
            const p = self.progress;

            if (p < range.start || p > range.end) {
              gsap.set(imageEl, { opacity: 0 });
              return;
            }

            const rp = (p - range.start) / (range.end - range.start);

            // Three-phase opacity envelope
            //   ARRIVAL:   0.00–0.20 → 0 to max
            //   PRESENCE:  0.20–0.75 → hold at max
            //   DEPARTURE: 0.75–1.00 → max to 0
            const maxOpacity = 0.88;
            let opacity: number;
            if (rp < 0.2) {
              opacity = (rp / 0.2) * maxOpacity;
            } else if (rp > 0.75) {
              opacity = ((1 - rp) / 0.25) * maxOpacity;
            } else {
              opacity = maxOpacity;
            }

            // Interpolate transform
            const scale = motion.fromScale + (motion.toScale - motion.fromScale) * rp;
            const y = motion.fromY + (motion.toY - motion.fromY) * rp;
            const rotation = motion.fromRotate + (motion.toRotate - motion.fromRotate) * rp;

            gsap.set(imageEl, { opacity, scale, y, rotation });
          },
        });
      });
    }, layerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={layerRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 8 }}
    >
      {COMPOSITIONS.map((comp, i) => (
        <div
          key={comp.src}
          ref={(el) => { imageRefs.current[i] = el; }}
          className="absolute will-change-transform"
          style={{
            ...comp.position,
            ...comp.frame,
            opacity: 0,
          }}
        >
          {/* 
            The photograph frame.
            Subtle shadow gives "placed on paper" depth.
            No gradient masks, no fades — clean printed edges.
          */}
          <div
            className="relative w-full h-full overflow-hidden"
            style={{
              borderRadius: "3px",
              boxShadow:
                "0 4px 20px rgba(10, 10, 10, 0.06), 0 1px 4px rgba(10, 10, 10, 0.03)",
            }}
          >
            <Image
              src={comp.src}
              alt={comp.alt}
              fill
              sizes={i === 1 ? "(max-width: 768px) 95vw, 84vw" : "(max-width: 768px) 90vw, 42vw"}
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              quality={90}
              className="object-cover grade-ch2"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
