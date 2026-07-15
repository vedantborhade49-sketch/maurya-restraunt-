"use client";

import React from "react";

interface MauryaCurveProps {
  variant?: "sweep" | "underline" | "frame" | "transition" | "trail";
  className?: string;
  progress?: number; // 0 to 1, maps to strokeDashoffset
  style?: React.CSSProperties;
}

export default function MauryaCurve({ 
  variant = "sweep", 
  className = "", 
  progress,
  style = {}
}: MauryaCurveProps) {
  // SVG paths visually derived from the curved logo elements (e.g. sweep, underline)
  const paths = {
    sweep: "M 10,20 C 30,5 5,85 55,90 C 95,95 85,25 95,10",
    underline: "M 5,20 C 25,35 75,5 95,20",
    frame: "M 5,5 C 5,45 15,85 45,95 C 75,105 95,95 95,95",
    transition: "M 0,100 C 30,70 70,30 100,0",
    trail: "M 0,80 C 30,50 70,50 100,20"
  };

  const selectedPath = paths[variant] || paths.sweep;

  const pathStyle: React.CSSProperties = {};
  if (progress !== undefined) {
    const dashLength = 1000;
    pathStyle.strokeDasharray = `${dashLength}`;
    pathStyle.strokeDashoffset = `${dashLength * (1 - progress)}`;
  }

  return (
    <svg 
      viewBox="0 0 100 100" 
      preserveAspectRatio="none" 
      className={`inline-block fill-none ${className}`}
      style={style}
    >
      <path 
        d={selectedPath} 
        stroke="currentColor" 
        strokeWidth={variant === "underline" ? "3" : "1.5"}
        strokeLinecap="round"
        style={pathStyle}
      />
    </svg>
  );
}
