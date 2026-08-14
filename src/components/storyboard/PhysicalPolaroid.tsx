"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhysicalPolaroidProps {
  imageSrc: string;
  caption: string;
  subcaption?: string;
  tapeTop?: boolean;
  tapeBottom?: boolean;
  tapeRotation?: number;
  rotation?: number; // degrees e.g. -4, +6
  shadowIntensity?: "day" | "sunset" | "night";
  className?: string;
  size?: "sm" | "md" | "lg" | "hero";
  priority?: boolean;
  annotation?: string;
}

export function PhysicalPolaroid({
  imageSrc,
  caption,
  subcaption,
  tapeTop = true,
  tapeBottom = false,
  tapeRotation = -3,
  rotation = 0,
  shadowIntensity = "day",
  className,
  size = "md",
  priority = false,
  annotation,
}: PhysicalPolaroidProps) {
  const sizeClasses = {
    sm: "w-48 sm:w-56 p-2 sm:p-2.5 pb-5 sm:pb-6",
    md: "w-64 sm:w-80 p-2.5 sm:p-3 pb-7 sm:pb-9",
    lg: "w-80 sm:w-96 p-3 sm:p-3.5 pb-8 sm:pb-10",
    hero: "w-full max-w-2xl sm:max-w-3xl p-3.5 sm:p-4 pb-9 sm:pb-12",
  }[size];

  // Dynamic sand shadow styles depending on sun angle
  const shadowStyles = {
    day: "shadow-[12px_18px_30px_rgba(74,48,25,0.22),_2px_4px_8px_rgba(0,0,0,0.1)]",
    sunset: "shadow-[24px_28px_45px_rgba(90,40,10,0.32),_4px_6px_12px_rgba(0,0,0,0.15)]",
    night: "shadow-[8px_12px_24px_rgba(4,10,20,0.45),_1px_2px_6px_rgba(0,0,0,0.3)]",
  }[shadowIntensity];

  return (
    <div
      className={cn(
        "relative transition-all duration-300 transform-gpu hover:scale-[1.02] hover:z-30 select-none group",
        className
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Top Masking Tape Strip */}
      {tapeTop && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-6 sm:h-7 bg-[#F4EBD9]/85 backdrop-blur-[1px] border-t border-b border-black/5 shadow-xs z-30 pointer-events-none"
          style={{
            transform: `translateX(-50%) rotate(${tapeRotation}deg)`,
            clipPath:
              "polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 94% 100%, 6% 100%, 0% 85%)",
          }}
        />
      )}

      {/* Bottom Masking Tape Strip (Optional) */}
      {tapeBottom && (
        <div
          className="absolute -bottom-3 right-6 w-16 sm:w-20 h-5 sm:h-6 bg-[#F4EBD9]/85 backdrop-blur-[1px] border-t border-b border-black/5 shadow-xs z-30 pointer-events-none"
          style={{
            transform: `rotate(${tapeRotation * -1.5}deg)`,
            clipPath:
              "polygon(2% 10%, 6% 0%, 98% 0%, 100% 12%, 96% 90%, 92% 100%, 4% 100%, 0% 88%)",
          }}
        />
      )}

      {/* Main Physical Polaroid Board */}
      <div
        className={cn(
          "bg-[#FAF8F5] border border-[#E5DFD3] rounded-[2px] transition-shadow duration-300",
          shadowStyles,
          sizeClasses
        )}
      >
        {/* Subtle Paper Texture Gradient */}
        <div className="relative w-full aspect-[4/3] bg-[#1E293B] overflow-hidden rounded-[1px] shadow-inner">
          <Image
            src={imageSrc}
            alt={caption}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {/* Film Grain Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none" />

          {/* Micro Corner Annotation if provided */}
          {annotation && (
            <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-xs text-[#FAF6EE] font-mono text-[9px] uppercase tracking-wider rounded-xs pointer-events-none">
              {annotation}
            </div>
          )}
        </div>

        {/* Handwritten Bottom Margin / Caption Area */}
        <div className="pt-2 sm:pt-2.5 px-1 flex flex-col justify-center">
          <p className="font-serif italic text-xs sm:text-sm text-[#2C241D] leading-snug tracking-tight">
            {caption}
          </p>
          {subcaption && (
            <p className="font-mono text-[9px] sm:text-[10px] text-[#786C5E] uppercase tracking-widest mt-0.5">
              {subcaption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
