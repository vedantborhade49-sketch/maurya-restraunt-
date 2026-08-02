"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";

export default function PureVegSVGAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress bound to container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth scroll-driven rotation and scale
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [-25, 45]);
  const scrollY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.05, 0.98]);

  // Interactive 3D Cursor Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 160,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 160,
    damping: 22,
  });

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
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full flex items-center justify-center py-2 select-none [perspective:1000px]"
    >
      {/* Soft Ambient Radial Glow behind the SVG (No box, pure soft aura) */}
      <div className="absolute w-[90%] h-[90%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(22,76,43,0.15)_0%,_rgba(154,92,59,0.05)_55%,_transparent_75%)] blur-2xl pointer-events-none" />

      {/* Unboxed SVG Element with natural aspect-ratio [2064/1152] in Left Column */}
      <motion.div
        style={{
          y: scrollY,
          scale: scrollScale,
          rotate: scrollRotate,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [-5, 5, -5],
        }}
        transition={{
          y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
        }}
        className="relative z-10 w-full max-w-[560px] aspect-[2064/1152] flex items-center justify-center cursor-pointer"
      >
        {/* Main Hero Transparent SVG (Untitled design.svg) */}
        <img
          src="/Untitled design.svg"
          alt="Indian Pure Vegetarian Symbol (Untitled design.svg)"
          className="w-full h-full object-contain filter drop-shadow-[0_18px_36px_rgba(22,76,43,0.2)] hover:drop-shadow-[0_28px_50px_rgba(22,76,43,0.32)] transition-all duration-500"
        />
      </motion.div>

      {/* Floating Botanical Accent (🌿 Left) */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 text-2xl sm:text-3xl pointer-events-none opacity-80 drop-shadow-md z-20"
      >
        🌿
      </motion.div>

      {/* Floating Botanical Accent (🌶️ Right) */}
      <motion.div
        animate={{ y: [6, -6, 6], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 text-2xl sm:text-3xl pointer-events-none opacity-80 drop-shadow-md z-20"
      >
        🌶️
      </motion.div>
    </div>
  );
}
