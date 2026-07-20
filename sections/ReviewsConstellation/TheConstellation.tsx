"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  size: number;
  alpha: number;
  speedOffset: number; // to add organic stagger
}

export default function TheConstellation() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // A ref object to hold GSAP tweened progress
  const progressRef = useRef({ val: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // Optimize performance
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const TOTAL_PARTICLES = 3888; // The exact number from the user's prompt
    let particles: Particle[] = [];

    // --- STEP 1: Generate Target Coordinates for "MAURYA" ---
    const generateTargetMap = () => {
      const offCanvas = document.createElement("canvas");
      const offCtx = offCanvas.getContext("2d");
      if (!offCtx) return [];
      
      // Use a smaller canvas for sampling to keep it fast
      const sW = width;
      const sH = height;
      offCanvas.width = sW;
      offCanvas.height = sH;

      offCtx.fillStyle = "white";
      // Adjust font size based on screen width
      const fontSize = Math.min(sW * 0.15, 200);
      offCtx.font = `bold ${fontSize}px serif`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillText("MAURYA", sW / 2, sH / 2);

      const imgData = offCtx.getImageData(0, 0, sW, sH).data;
      const validCoords = [];

      // Sample pixels. We don't need every pixel, just enough to form the shape
      const sampleStep = sW < 768 ? 2 : 4; 
      
      for (let y = 0; y < sH; y += sampleStep) {
        for (let x = 0; x < sW; x += sampleStep) {
          const index = (y * sW + x) * 4;
          const alpha = imgData[index + 3];
          if (alpha > 128) {
            validCoords.push({ x, y });
          }
        }
      }
      return validCoords;
    };

    const targetCoords = generateTargetMap();

    // --- STEP 2: Initialize Particles ---
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < TOTAL_PARTICLES; i++) {
        // Random origin across the screen (with some bleeding)
        const originX = (Math.random() - 0.2) * (width * 1.4);
        const originY = (Math.random() - 0.2) * (height * 1.4);
        
        // Pick a random target coordinate from the text map, or just center if none found
        const target = targetCoords.length > 0 
          ? targetCoords[Math.floor(Math.random() * targetCoords.length)] 
          : { x: width/2, y: height/2 };

        // Add slight random noise to the target so it feels like a cloud, not sharp pixels
        const noiseX = (Math.random() - 0.5) * 10;
        const noiseY = (Math.random() - 0.5) * 10;

        particles.push({
          x: originX,
          y: originY,
          originX: originX,
          originY: originY,
          targetX: target.x + noiseX,
          targetY: target.y + noiseY,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.5 + 0.2,
          speedOffset: Math.random() * 0.5 + 0.5 // Allows some particles to arrive faster
        });
      }
      particlesRef.current = particles;
    };

    initParticles();

    // --- STEP 3: Render Loop ---
    const render = () => {
      // Clear with Oxblood background
      ctx.fillStyle = "#1A050A"; 
      ctx.fillRect(0, 0, width, height);

      const pVal = progressRef.current.val; // Between 0 and 1

      // Draw all particles
      ctx.fillStyle = "#D4A373"; // Copper color
      
      for (let i = 0; i < TOTAL_PARTICLES; i++) {
        const p = particles[i];
        
        // Interpolate position based on global progress
        // Use an easing function (ease-out) for smoother settling
        const easedProgress = Math.min(1, Math.pow(pVal * p.speedOffset, 1.2));
        
        p.x = p.originX + (p.targetX - p.originX) * easedProgress;
        p.y = p.originY + (p.targetY - p.originY) * easedProgress;
        
        // As they converge, increase brightness
        const currentAlpha = p.alpha + (easedProgress * 0.5);
        ctx.globalAlpha = Math.min(1, currentAlpha);
        
        // Slight organic floating if not fully converged
        const floatY = (1 - easedProgress) * Math.sin(Date.now() * 0.001 + i) * 2;

        ctx.beginPath();
        ctx.arc(p.x, p.y + floatY, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(render);
    };
    
    render();

    // Handle Resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles(); // Re-calculate text map and positions
    };
    window.addEventListener("resize", handleResize);

    // --- STEP 4: GSAP ScrollTrigger Sequence ---
    const gsapCtx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500%", 
          scrub: 1,
          pin: true,
        }
      });

      // 1. Particle Convergence
      // Drives the progressRef.val from 0 to 1.5 (ensuring all reach 1 due to speedOffset)
      tl.to(progressRef.current, {
        val: 1.5,
        ease: "power2.inOut",
        duration: 2
      });

      // 2. The 3D Push (Scale up the canvas drastically and fade it out)
      tl.to(canvasRef.current, {
        scale: 8,
        opacity: 0,
        ease: "power3.in",
        duration: 2
      }, "+=0.5"); // Short pause over the fully formed "MAURYA"

      // 3. Fade in DOM Memory Nodes (The specific zoomed-in reviews)
      // These act as the "dots" we zoomed into.
      tl.fromTo(".memory-node", 
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, stagger: 0.3, duration: 1.5, ease: "back.out(1.2)" },
        "-=1.5"
      );

      // 4. Fade out DOM Memory Nodes
      tl.to(".memory-node", {
        y: -50, opacity: 0, duration: 1, ease: "power2.in"
      }, "+=1");

      // 5. Final CTA Reveal
      tl.fromTo(".final-cta",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
      );

    }, containerRef);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      gsapCtx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#1A050A] overflow-hidden">
      
      {/* THE CONSTELLATION CANVAS */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full origin-center"
      />

      {/* THE MEMORY NODES (Zoomed in dots) */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-8 z-10">
        
        {/* Node 1: Google */}
        <div className="memory-node absolute top-[20%] left-[10%] md:left-[20%] max-w-[350px] bg-gradient-to-b from-[#2A0B10] to-[#1A050A] p-8 border-[0.5px] border-[#D4A373]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] opacity-0">
          <div className="flex gap-2 mb-4 text-[#D4A373] text-[10px]">★★★★★</div>
          <p className="font-serif text-2xl text-[#F9F6F0] leading-snug mb-6">
            "The warmth of the staff is only matched by the perfection of the food. Every celebration belongs here."
          </p>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#D4A373]">Google • 888 Reviews</span>
        </div>

        {/* Node 2: Zomato */}
        <div className="memory-node absolute top-[45%] right-[5%] md:right-[15%] max-w-[400px] bg-gradient-to-b from-[#2A0B10] to-[#1A050A] p-8 border-[0.5px] border-[#D4A373]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] opacity-0">
          <div className="flex gap-2 mb-4 text-[#D4A373] text-[10px]">★★★★☆</div>
          <p className="font-serif text-3xl text-[#F9F6F0] leading-snug mb-6">
            "Sunday lunch is a non-negotiable family ritual. The Dal Makhani tastes like nostalgia."
          </p>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#D4A373]">Zomato • 2200 Reviews</span>
        </div>

        {/* Node 3: Swiggy */}
        <div className="memory-node absolute bottom-[15%] left-[15%] md:left-[30%] max-w-[300px] bg-gradient-to-b from-[#2A0B10] to-[#1A050A] p-8 border-[0.5px] border-[#D4A373]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] opacity-0">
          <div className="flex gap-2 mb-4 text-[#D4A373] text-[10px]">★★★★★</div>
          <p className="font-serif italic text-xl text-[#F9F6F0] leading-snug mb-6">
            "Arrived piping hot. Perfect for a rainy afternoon when we couldn't make it to the restaurant."
          </p>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#D4A373]">Swiggy • 800+ Ratings</span>
        </div>

      </div>

      {/* FINAL CTA */}
      <div className="final-cta absolute inset-0 pointer-events-none flex flex-col items-center justify-center opacity-0 z-20 bg-[radial-gradient(ellipse_at_center,rgba(26,5,10,0.6)_0%,rgba(26,5,10,1)_100%)]">
        <h2 className="font-serif text-[8vw] md:text-[6vw] text-[#F9F6F0] text-center leading-[1] tracking-tight drop-shadow-2xl">
          Perhaps<br />
          <span className="italic text-[#D4A373]">Your Story</span><br />
          Will Be Next.
        </h2>
        
        <Link 
          href="/menu"
          className="mt-16 pointer-events-auto group relative inline-flex items-center justify-center px-12 py-5 border border-[#D4A373]/60 hover:border-[#D4A373] transition-colors duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#D4A373]/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#F9F6F0] font-bold relative z-10">
            Explore the Menu
          </span>
        </Link>
      </div>

    </section>
  );
}
