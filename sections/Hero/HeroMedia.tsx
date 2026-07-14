"use client";

import { useRef, useEffect } from "react";
interface HeroMediaProps {
  onVideoEnd: () => void;
}

export default function HeroMedia({ onVideoEnd }: HeroMediaProps) {
  const container = useRef<HTMLDivElement>(null);

  const handleVideoEndLocal = () => {
    const video = document.getElementById("hero-main-video") as HTMLVideoElement;
    if (video) {
      setTimeout(() => {
        video.currentTime = 0;
        video.loop = true;
        video.play();
        onVideoEnd();
      }, 300);
    } else {
      onVideoEnd();
    }
  };

  return (
    <div ref={container} className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#111]">
      {/* Fullscreen Video Background with Cinematic Color Grade */}
      <video 
        id="hero-main-video"
        autoPlay 
        muted 
        playsInline
        preload="auto"
        onEnded={handleVideoEndLocal}
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* OVERLAYS (Cinematic Grading Stack) */}
      
      {/* 1. Deep Espresso base overlay for rich shadows instead of pure black */}
      <div id="hero-overlay-black" className="absolute inset-0 bg-[#1A100C] opacity-0" />
      
      {/* 2. Abstract Mandala Layer (Revealed by spotlight mask and smoke) */}
      <div 
        id="hero-mandala"
        className="absolute inset-0 opacity-0 mix-blend-color-dodge flex items-center justify-center pointer-events-none"
        style={{
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 0%, transparent 40%)',
          maskImage: 'radial-gradient(circle at 50% 50%, black 0%, transparent 40%)'
        }}
      >
        <svg viewBox="0 0 800 800" className="w-[120%] h-[120%] md:w-[80%] md:h-[80%] max-w-none opacity-[0.15] animate-[spin_120s_linear_infinite]" style={{ transformOrigin: "center" }}>
          {/* Subtle geometric mandala pattern */}
          <g stroke="rgba(196,154,72,0.8)" strokeWidth="1" fill="none">
            {Array.from({ length: 12 }).map((_, i) => (
              <g key={i} transform={`rotate(${i * 30} 400 400)`}>
                <path d="M400,200 Q450,300 400,400 Q350,300 400,200" />
                <circle cx="400" cy="150" r="10" />
                <path d="M400,100 L420,120 L400,140 L380,120 Z" />
              </g>
            ))}
            {Array.from({ length: 24 }).map((_, i) => (
              <path key={i} d="M400,300 Q420,350 400,400" transform={`rotate(${i * 15} 400 400)`} />
            ))}
            <circle cx="400" cy="400" r="250" strokeWidth="0.5" strokeDasharray="4 4" />
            <circle cx="400" cy="400" r="150" strokeWidth="0.5" />
          </g>
        </svg>
      </div>

      {/* 3. Deep cinematic gradient (Burnt Umber to Espresso) */}
      <div 
        id="hero-overlay-gradient" 
        className="absolute inset-0 opacity-0 mix-blend-multiply"
        style={{ background: "linear-gradient(180deg, rgba(56,25,18,0.65) 0%, rgba(20,10,8,0.85) 100%)" }}
      />
      
      {/* Warm ivory tint for highlights */}
      <div id="hero-overlay-ivory" className="absolute inset-0 bg-[#F6F1EA] mix-blend-screen opacity-0" />
      
      {/* Paper grain and noise */}
      <div className="absolute inset-0 paper-grain opacity-40 mix-blend-overlay pointer-events-none" />
      
      {/* Floating Dust Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0ibm9uZSIvPgogIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjgpIi8+CiAgPGNpcmNsZSBjeD0iMjUwIiBjeT0iMTAwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMykiLz4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjMwMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjUpIi8+CiAgPGNpcmNsZSBjeD0iMzAwIiBjeT0iMjAwIiByPSIwLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC42KSIvPgo8L3N2Zz4=')] bg-[length:400px_400px] animate-[parallax_100s_linear_infinite]" />
      </div>
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.4)] pointer-events-none" />
    </div>
  );
}
