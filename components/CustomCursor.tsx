"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    };
    
    checkTouch();
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorTarget = target.closest("[data-cursor]") as HTMLElement;
      
      if (cursorTarget) {
        const cursorText = cursorTarget.getAttribute("data-cursor") || "";
        setText(cursorText);
        setIsHovered(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorTarget = target.closest("[data-cursor]") as HTMLElement;
      
      if (cursorTarget) {
        setText("");
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-gold pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[7px] font-bold tracking-widest uppercase transition-[width,height,background-color,border-color,transform] duration-200 ease-out ${
        isHovered
          ? "w-16 h-16 bg-gold text-midnight border-transparent scale-100"
          : "bg-transparent text-transparent scale-75"
      }`}
    >
      {text}
    </div>
  );
}
