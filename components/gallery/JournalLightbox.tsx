"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  aspectRatio: "portrait" | "landscape" | "square" | "hero";
  objectPosition: string;
}

interface JournalLightboxProps {
  images: GalleryImage[];
  currentIndex: number | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function JournalLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: JournalLightboxProps) {
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") onNext();
    if (e.key === "ArrowLeft") onPrev();
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || currentIndex === null) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#141010]/95 backdrop-blur-md"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] text-[#F8F5EF]/60 hover:text-[#F8F5EF] transition-colors p-2"
            title="Close"
          >
            <X strokeWidth={1.5} size={32} />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 md:left-10 z-[110] text-[#F8F5EF]/40 hover:text-[#F8F5EF] transition-colors p-4"
          >
            <ChevronLeft strokeWidth={1.5} size={48} />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 md:right-10 z-[110] text-[#F8F5EF]/40 hover:text-[#F8F5EF] transition-colors p-4"
          >
            <ChevronRight strokeWidth={1.5} size={48} />
          </button>

          {/* Image Container */}
          <div 
            className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-12 cursor-pointer"
            onClick={onNext}
          >
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-full h-full max-h-[85vh] flex items-center justify-center"
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
                quality={100}
                priority
              />
            </motion.div>
            
            {/* Caption */}
            <motion.div
              key={`caption-${currentIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="absolute bottom-6 md:bottom-12 text-center"
            >
              <p className="font-serif italic text-[#F8F5EF]/80 text-sm md:text-base tracking-wide">
                {currentImage.caption}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
