"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BrassPhotoCorner, BrassEyelet } from "./LuxuryExpeditionMaterials";

interface ArchivalPhotoPrintProps {
  imageSrc: string;
  caption: string;
  subcaption?: string;
  annotation?: string;
  plateNumber?: string;
  rotation?: number;
  size?: "sm" | "md" | "lg" | "hero" | "full";
  tone?: "day" | "sunset" | "night" | "tobacco";
  hasBrassCorners?: boolean;
  hasEyelet?: boolean;
  isMounted?: boolean;
  priority?: boolean;
  className?: string;
}

export function ArchivalPhotoPrint({
  imageSrc,
  caption,
  subcaption,
  annotation,
  plateNumber,
  rotation = 0,
  size = "md",
  tone = "day",
  hasBrassCorners = false,
  hasEyelet = false,
  isMounted = false,
  priority = false,
  className,
}: ArchivalPhotoPrintProps) {
  const sizeClasses = {
    sm: "w-full max-w-[280px] sm:max-w-[310px]",
    md: "w-full max-w-[360px] sm:max-w-[400px]",
    lg: "w-full max-w-[480px] sm:max-w-[540px]",
    hero: "w-full max-w-2xl sm:max-w-3xl",
    full: "w-full max-w-4xl sm:max-w-5xl",
  }[size];

  const shadowClasses = {
    day: "shadow-[0_20px_45px_rgba(40,25,12,0.14),_0_4px_12px_rgba(40,25,12,0.06)]",
    sunset: "shadow-[0_24px_50px_rgba(55,20,5,0.2),_0_5px_15px_rgba(55,20,5,0.1)]",
    night: "shadow-[0_20px_45px_rgba(5,12,30,0.42),_0_4px_12px_rgba(0,0,0,0.3)]",
    tobacco: "shadow-[0_20px_45px_rgba(35,18,8,0.22),_0_4px_12px_rgba(0,0,0,0.15)]",
  }[tone];

  const paperTone = {
    day: "bg-[#FCFAF7] border-[#E8DFD0] text-[#1E293B]",
    sunset: "bg-[#FAF5ED] border-[#E6D7C3] text-[#291A0E]",
    night: "bg-[#101828] border-[#1E293B] text-[#F1F5F9]",
    tobacco: "bg-[#4A2D1B] border-[#381F10] text-[#F3E5D8]",
  }[tone];

  return (
    <div
      className={cn(
        "relative rounded-[2px] border p-3.5 sm:p-5 transition-transform duration-500 transform-gpu hover:scale-[1.01] hover:z-35 select-none group block",
        paperTone,
        shadowClasses,
        sizeClasses,
        isMounted && "ring-1 ring-[#D4AF37]/30 ring-offset-2 ring-offset-[#FCFAF7]",
        className
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Optional Aged Brass Photo Corners */}
      {hasBrassCorners && (
        <>
          <BrassPhotoCorner position="top-left" size={24} />
          <BrassPhotoCorner position="bottom-right" size={24} />
        </>
      )}

      {/* Optional Top Brass Eyelet */}
      {hasEyelet && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-30">
          <BrassEyelet size={16} />
        </div>
      )}

      {/* Blind Debossed Plate Mark Frame (Fine-Art Intaglio Indentation) */}
      <div className="relative rounded-[1px] p-1.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]">
        {/* Photographic Film/Plate Area */}
        <div className="relative w-full aspect-[16/10] min-h-[160px] sm:min-h-[200px] bg-[#0A0F1D] overflow-hidden rounded-[1px]">
          <Image
            src={imageSrc}
            alt={caption}
            fill
            unoptimized={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 70vw, 1000px"
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          {/* Subtle warm film vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5 pointer-events-none" />
        </div>
      </div>

      {/* Archival Typographic Letterpress Metadata */}
      <div className="pt-3 sm:pt-4 px-1 space-y-1">
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase opacity-75 font-semibold">
          <span>{plateNumber || "PLATE 01"}</span>
          {annotation && <span className="text-[#C2410C] font-bold">{annotation}</span>}
        </div>

        <h3 className="font-serif text-sm sm:text-base tracking-tight font-semibold leading-snug">
          {caption}
        </h3>

        {subcaption && (
          <p className="font-sans text-[11px] sm:text-xs opacity-80 leading-relaxed tracking-normal">
            {subcaption}
          </p>
        )}
      </div>
    </div>
  );
}
