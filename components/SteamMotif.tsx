"use client";

import React from "react";

export default function SteamMotif({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes steamUp {
          0% { transform: translateY(10%) scaleX(1); opacity: 0; }
          20% { opacity: 0.15; }
          50% { transform: translateY(-20%) scaleX(1.2); opacity: 0.25; }
          80% { opacity: 0.1; }
          100% { transform: translateY(-50%) scaleX(1.5); opacity: 0; }
        }
        .steam-particle {
          position: absolute;
          bottom: 0;
          width: 60%;
          height: 80%;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%);
          filter: blur(25px);
          opacity: 0;
          animation: steamUp 12s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
        .steam-1 { left: 10%; animation-delay: 0s; width: 50%; }
        .steam-2 { left: 30%; animation-delay: 4s; width: 70%; animation-duration: 15s; }
        .steam-3 { left: 20%; animation-delay: 8s; width: 60%; animation-duration: 18s; }
      `}} />
      <div className="steam-particle steam-1" />
      <div className="steam-particle steam-2" />
      <div className="steam-particle steam-3" />
    </div>
  );
}
