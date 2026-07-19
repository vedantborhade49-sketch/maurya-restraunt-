import React from "react";
import Image from "next/image";

interface EditorialImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export default function EditorialImage({ src, alt, priority = false }: EditorialImageProps) {
  return (
    <>
      <Image 
        src={src} 
        alt={alt} 
        fill 
        className="object-cover"
        priority={priority}
      />
      {/* 
        The Editorial Color Grade Engine 
        Forces all images into the same Golden-Hour / Rich Brown / Copper universe.
      */}
      <div className="absolute inset-0 bg-[#3A0F16] mix-blend-color opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A050A]/40 to-transparent pointer-events-none" />
      {/* Subtle vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(26,5,10,0.3)_100%)] pointer-events-none" />
    </>
  );
}
