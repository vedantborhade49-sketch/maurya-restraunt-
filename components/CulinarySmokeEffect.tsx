"use client";

import React, { useEffect, useRef } from "react";

interface SmokeParticle {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  vx: number;
  vy: number;
  opacity: number;
  maxOpacity: number;
  rotation: number;
  rotationSpeed: number;
  life: number;
  maxLife: number;
  colorType: "warmSteam" | "amberSpice" | "crimsonGlow";
}

interface EmberParticle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
  pulseSpeed: number;
  angle: number;
  color: string;
}

export default function CulinarySmokeEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const smokeParticles: SmokeParticle[] = [];
    const emberParticles: EmberParticle[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener("resize", resize);

    const createSmokeParticle = (initialY?: number): SmokeParticle => {
      const startX = width * 0.1 + Math.random() * (width * 0.8);
      const startY = initialY !== undefined ? initialY : height + Math.random() * 80;
      const maxLife = 400 + Math.random() * 300;
      const randType = Math.random();
      let colorType: "warmSteam" | "amberSpice" | "crimsonGlow" = "warmSteam";
      if (randType > 0.65) colorType = "amberSpice";
      if (randType > 0.85) colorType = "crimsonGlow";

      return {
        x: startX,
        y: startY,
        radius: 40 + Math.random() * 60,
        maxRadius: 180 + Math.random() * 140,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(0.4 + Math.random() * 0.5),
        opacity: 0,
        maxOpacity: 0.12 + Math.random() * 0.14,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.002,
        life: 0,
        maxLife,
        colorType,
      };
    };

    const createEmberParticle = (initialY?: number): EmberParticle => {
      const colors = [
        "rgba(212, 147, 89, ", // Warm Amber Terracotta
        "rgba(224, 175, 106, ", // Golden Brass
        "rgba(198, 40, 40, ",   // Crimson Spice
      ];
      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : height + Math.random() * 20,
        size: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(0.3 + Math.random() * 0.7),
        opacity: Math.random() * 0.7 + 0.2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        angle: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    // Pre-populate smoke and embers so the canvas starts with rich atmosphere
    for (let i = 0; i < 28; i++) {
      smokeParticles.push(createSmokeParticle(Math.random() * height));
    }
    for (let i = 0; i < 45; i++) {
      emberParticles.push(createEmberParticle(Math.random() * height));
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Volumetric Radial Base Light
      const baseGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.65
      );
      baseGradient.addColorStop(0, "rgba(154, 92, 59, 0.08)");
      baseGradient.addColorStop(0.5, "rgba(143, 17, 21, 0.04)");
      baseGradient.addColorStop(1, "rgba(22, 20, 19, 0)");
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Render & Update Smoke Particles
      for (let i = smokeParticles.length - 1; i >= 0; i--) {
        const p = smokeParticles[i];
        p.life++;

        // Life cycle opacity calculation (fade in, stay, fade out)
        const progress = p.life / p.maxLife;
        if (progress < 0.25) {
          p.opacity = (progress / 0.25) * p.maxOpacity;
        } else if (progress > 0.7) {
          p.opacity = ((1 - progress) / 0.3) * p.maxOpacity;
        } else {
          p.opacity = p.maxOpacity;
        }

        // Expand radius gently over time
        p.radius += (p.maxRadius - p.radius) * 0.003;

        // Drift horizontally with sine wave for organic smoke billow
        p.x += p.vx + Math.sin(time + p.life * 0.01) * 0.3;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.life >= p.maxLife || p.y < -p.radius * 2) {
          smokeParticles[i] = createSmokeParticle();
          continue;
        }

        // Draw soft volumetric smoke puff
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        const smkGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.radius);
        if (p.colorType === "warmSteam") {
          smkGrad.addColorStop(0, `rgba(215, 190, 170, ${p.opacity})`);
          smkGrad.addColorStop(0.4, `rgba(160, 110, 80, ${p.opacity * 0.6})`);
          smkGrad.addColorStop(0.8, `rgba(70, 35, 25, ${p.opacity * 0.25})`);
          smkGrad.addColorStop(1, "rgba(22, 20, 19, 0)");
        } else if (p.colorType === "amberSpice") {
          smkGrad.addColorStop(0, `rgba(224, 160, 90, ${p.opacity * 0.9})`);
          smkGrad.addColorStop(0.5, `rgba(154, 92, 59, ${p.opacity * 0.4})`);
          smkGrad.addColorStop(1, "rgba(22, 20, 19, 0)");
        } else {
          smkGrad.addColorStop(0, `rgba(198, 40, 40, ${p.opacity * 0.7})`);
          smkGrad.addColorStop(0.6, `rgba(90, 20, 20, ${p.opacity * 0.3})`);
          smkGrad.addColorStop(1, "rgba(22, 20, 19, 0)");
        }

        ctx.fillStyle = smkGrad;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Maintain smoke count
      while (smokeParticles.length < 28) {
        smokeParticles.push(createSmokeParticle());
      }

      // 3. Render & Update Floating Spice Embers
      for (let i = emberParticles.length - 1; i >= 0; i--) {
        const e = emberParticles[i];
        e.x += e.vx + Math.sin(time * 2 + e.angle) * 0.4;
        e.y += e.vy;
        e.angle += e.pulseSpeed;

        const currentOpacity = Math.max(0.1, e.opacity + Math.sin(e.angle) * 0.25);

        if (e.y < -10 || e.x < -20 || e.x > width + 20) {
          emberParticles[i] = createEmberParticle();
          continue;
        }

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fillStyle = `${e.color}${currentOpacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `${e.color}0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      while (emberParticles.length < 45) {
        emberParticles.push(createEmberParticle());
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background Volumetric Glow & Subtle Grain Filter overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C1414]/90 via-[#161413]/70 to-[#1C1414] mix-blend-multiply" />
      
      {/* CSS Steam wisps for soft blurred depth background */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none blur-3xl"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, rgba(154, 92, 59, 0.25) 0%, rgba(143, 17, 21, 0.15) 45%, transparent 75%)"
        }}
      />

      {/* HTML5 Canvas for real-time smoke & spice embers */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Vignette frame for cinematic depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(18,15,14,0.95)_100%)] pointer-events-none" />
    </div>
  );
}
