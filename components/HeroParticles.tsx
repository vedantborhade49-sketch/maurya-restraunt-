"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resize);
    resize();

    // Create Golden Embers
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() * -0.3) - 0.1,
        opacity: Math.random() * 0.5 + 0.1,
        shimmerSpeed: Math.random() * 0.02 + 0.01,
        angle: Math.random() * Math.PI * 2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.shimmerSpeed;

        // Reset if offscreen
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        const currentOpacity = p.opacity + Math.sin(p.angle) * 0.2;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196, 154, 72, ${Math.max(0, currentOpacity)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(196, 154, 72, 0.4)";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Volumetric Smoke (CSS driven) */}
      <div 
        id="hero-volumetric-smoke" 
        className="absolute inset-0 opacity-0 mix-blend-screen"
        style={{
          background: "radial-gradient(ellipse at 30% 80%, rgba(120,70,40,0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(150,100,50,0.08) 0%, transparent 40%)",
          filter: "blur(40px)"
        }}
      />
      
      {/* Golden Embers Canvas */}
      <canvas 
        ref={canvasRef} 
        id="hero-embers-canvas"
        className="absolute inset-0 w-full h-full opacity-0"
      />
    </div>
  );
}
