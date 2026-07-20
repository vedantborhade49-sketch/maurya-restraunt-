"use client";

import React from "react";
import Link from "next/link";

interface ButtonSecondaryProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
}

export default function ButtonSecondary({
  children,
  href,
  onClick,
  className = "",
  target,
  rel,
}: ButtonSecondaryProps) {
  const baseStyles =
    "min-h-[48px] px-9 py-3.5 bg-transparent border border-[#B98532] text-[#350709] hover:bg-[#350709] hover:text-[#F8F6F1] hover:border-[#350709] font-mono text-[11px] uppercase tracking-[0.25em] font-bold rounded-none inline-flex items-center justify-center transition-all duration-250 hover:-translate-y-0.5 active:translate-y-0 select-none cursor-pointer";

  if (href) {
    if (href.startsWith("http")) {
      return (
        <a href={href} target={target} rel={rel} className={`${baseStyles} ${className}`}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={`${baseStyles} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${className}`}>
      {children}
    </button>
  );
}
