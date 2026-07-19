import React from "react";

interface ImagePlaceholderProps {
  category: string;
  description: string;
  aspectRatio?: string;
}

export default function ImagePlaceholder({ category, description, aspectRatio = "aspect-[4/3]" }: ImagePlaceholderProps) {
  return (
    <div className={`w-full h-full min-h-[200px] flex flex-col items-center justify-center bg-[#EFE8DB] border border-dashed border-[#B98555]/50 text-[#1F1F1F]/60 p-6 text-center ${aspectRatio}`}>
      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-[#B98555] mb-3">
        [ Image Required: {category} ]
      </span>
      <span className="font-sans text-sm font-light leading-relaxed max-w-[80%]">
        {description}
      </span>
    </div>
  );
}
