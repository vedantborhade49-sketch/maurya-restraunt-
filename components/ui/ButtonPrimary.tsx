"use client";

import React from "react";
import Link from "next/link";

interface ButtonPrimaryProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function ButtonPrimary({
  children,
  href,
  onClick,
  className = "",
  type = "button",
}: ButtonPrimaryProps) {
  const baseStyles =
    "min-h-[48px] px-9 py-3.5 bg-[#350709] hover:bg-[#250406] text-[#F8F6F1] font-mono text-[11px] uppercase tracking-[0.25em] font-bold rounded-none inline-flex items-center justify-center transition-transform duration-250 hover:-translate-y-0.5 active:translate-y-0 select-none shadow-none cursor-pointer";

  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${baseStyles} ${className}`}>
      {children}
    </button>
  );
}
