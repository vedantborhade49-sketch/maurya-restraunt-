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
      
      {/* Base black overlay */}
      <div id="hero-overlay-black" className="absolute inset-0 bg-[#000000] opacity-0" />
      
      {/* Deep cinematic gradient */}
      <div 
        id="hero-overlay-gradient" 
        className="absolute inset-0 opacity-0 mix-blend-multiply"
        style={{ background: "linear-gradient(180deg, rgba(46,20,18,0.55) 0%, rgba(18,18,18,0.65) 100%)" }}
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
