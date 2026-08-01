"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PureVegSVGAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [detached, setDetached] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 70%",
        onEnter: () => setDetached(true),
        once: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Falling ingredient elements definition
  const ingredients = [
    // Cloves
    { id: "clove1", text: "🧄", type: "clove", x: "-35%", y: "-30%", fallX: -20, fallY: 280, rot: 180, delay: 0.1 },
    { id: "clove2", text: "🤎", type: "clove", x: "35%", y: "-25%", fallX: 25, fallY: 300, rot: -160, delay: 0.15 },

    // Cinnamon
    { id: "cinnamon1", text: "🪵", type: "cinnamon", x: "-40%", y: "10%", fallX: -35, fallY: 320, rot: 270, delay: 0.2 },
    { id: "cinnamon2", text: "🪵", type: "cinnamon", x: "40%", y: "15%", fallX: 30, fallY: 310, rot: -240, delay: 0.25 },

    // Cardamom
    { id: "cardamom1", text: "🟢", type: "cardamom", x: "-25%", y: "-40%", fallX: -15, fallY: 260, rot: 90, delay: 0.05 },
    { id: "cardamom2", text: "🟢", type: "cardamom", x: "25%", y: "-38%", fallX: 18, fallY: 270, rot: -110, delay: 0.1 },

    // Coriander / Curry Leaves
    { id: "leaf1", text: "🌿", type: "leaf", x: "-42%", y: "-10%", fallX: -50, fallY: 340, rot: 360, delay: 0.12 },
    { id: "leaf2", text: "🍃", type: "leaf", x: "42%", y: "-5%", fallX: 45, fallY: 330, rot: -320, delay: 0.18 },

    // Chillies
    { id: "chilli1", text: "🌶️", type: "chilli", x: "-20%", y: "40%", fallX: -25, fallY: 290, rot: 140, delay: 0.22 },
    { id: "chilli2", text: "🌶️", type: "chilli", x: "22%", y: "38%", fallX: 28, fallY: 295, rot: -150, delay: 0.28 },

    // Tiny Herb Fragments & Peppercorns
    { id: "herb1", text: "✨", type: "herb", x: "-15%", y: "-45%", fallX: -10, fallY: 200, rot: 45, delay: 0.02 },
    { id: "herb2", text: "✨", type: "herb", x: "15%", y: "-45%", fallX: 12, fallY: 210, rot: -45, delay: 0.04 },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[420px] sm:h-[480px] rounded-2xl bg-[#FAF7F2] border border-[#9A5C3B]/25 shadow-xl flex items-center justify-center overflow-hidden p-6 select-none [perspective:1000px]"
    >
      {/* Light Sweep Reflector */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ repeat: Infinity, repeatDelay: 4, duration: 2, ease: "easeInOut" }}
        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-12 pointer-events-none z-10"
      />

      {/* Emerald Hover Glow Behind Symbol */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.45 : 0.15,
          scale: isHovered ? 1.25 : 1,
        }}
        transition={{ duration: 0.6 }}
        className="absolute w-64 h-64 rounded-full bg-[radial-gradient(circle,_#164C2B_0%,_transparent_70%)] blur-2xl pointer-events-none"
      />

      {/* Central 3D Symbol Wrapper */}
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: isHovered ? [0, -8, 0] : [0, -5, 0],
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          y: { repeat: Infinity, duration: isHovered ? 2.5 : 4, ease: "easeInOut" },
          scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        }}
        className="relative z-20 w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center cursor-pointer"
      >
        {/* Main Transparent SVG (Untitled design.svg) */}
        <img
          src="/Untitled design.svg"
          alt="Indian Vegetarian Pure Symbol"
          className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(22,76,43,0.15)]"
        />

        {/* Hover Micro Green Particles */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1.4] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            <span className="absolute -top-2 left-6 text-sm">✨</span>
            <span className="absolute bottom-2 right-6 text-sm">🌿</span>
            <span className="absolute top-8 right-2 text-xs">✨</span>
          </motion.div>
        )}
      </motion.div>

      {/* ── DETACHING FALLING INGREDIENTS ON SCROLL ── */}
      {ingredients.map((item) => (
        <motion.div
          key={item.id}
          initial={{
            opacity: 1,
            x: item.x,
            y: item.y,
            rotate: 0,
          }}
          animate={
            detached
              ? {
                  opacity: 0,
                  x: `calc(${item.x} + ${item.fallX}px)`,
                  y: `calc(${item.y} + ${item.fallY}px)`,
                  rotate: item.rot,
                }
              : {
                  opacity: 1,
                  x: item.x,
                  y: item.y,
                }
          }
          transition={
            detached
              ? {
                  duration: 2.2,
                  delay: item.delay,
                  ease: [0.25, 0.1, 0.25, 1],
                }
              : { duration: 0.5 }
          }
          className="absolute z-30 text-xl sm:text-2xl pointer-events-none drop-shadow-md"
        >
          {item.text}
        </motion.div>
      ))}

      {/* Bottom Quiet Pure Veg Label */}
      <div className="absolute bottom-4 left-6 z-20 flex items-center gap-2 bg-[#FAF7F2]/90 px-3.5 py-1.5 rounded-full border border-[#164C2B]/30 shadow-sm backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-[#164C2B] animate-pulse" />
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#164C2B] font-extrabold">
          PURE VEGETARIAN SYMBOL
        </span>
      </div>
    </div>
  );
}
