"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BeachPolaroidHeroProps {
  imageSrc: string;
  caption: string;
  subcaption?: string;
  annotation?: string;
  rotation?: number;
  tapeTopLeft?: boolean;
  tapeTopRight?: boolean;
  shadowAngle?: "day" | "sunset" | "night";
  className?: string;
  priority?: boolean;
}

export function BeachPolaroidHero({
  imageSrc,
  caption,
  subcaption,
  annotation,
  rotation = -1.5,
  tapeTopLeft = true,
  tapeTopRight = false,
  shadowAngle = "day",
  className,
  priority = true,
}: BeachPolaroidHeroProps) {
  const shadowStyles = {
    day: "shadow-[28px_38px_60px_rgba(70,45,20,0.38),_4px_8px_16px_rgba(0,0,0,0.18)]",
    sunset: "shadow-[42px_50px_75px_rgba(90,40,10,0.48),_6px_12px_22px_rgba(0,0,0,0.25)]",
    night: "shadow-[20px_28px_52px_rgba(4,10,25,0.7),_3px_8px_16px_rgba(0,0,0,0.5)]",
  }[shadowAngle];

  return (
    <div
      className={cn(
        "relative w-full max-w-4xl sm:max-w-5xl md:max-w-6xl transition-all duration-500 transform-gpu hover:scale-[1.01] hover:z-30 select-none group",
        className
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Top Left Masking Tape Strip with Peeling Edge */}
      {tapeTopLeft && (
        <div
          className="absolute -top-5 -left-4 w-32 sm:w-44 h-9 bg-[#F4EBD9]/90 backdrop-blur-[1px] border-t border-b border-black/10 shadow-md z-30 pointer-events-none"
          style={{
            transform: "rotate(-12deg)",
            clipPath: "polygon(0% 12%, 5% 0%, 95% 0%, 100% 15%, 98% 88%, 93% 100%, 7% 100%, 0% 85%)",
          }}
        />
      )}

      {/* Top Right Masking Tape Strip */}
      {tapeTopRight && (
        <div
          className="absolute -top-5 -right-4 w-32 sm:w-44 h-9 bg-[#F4EBD9]/90 backdrop-blur-[1px] border-t border-b border-black/10 shadow-md z-30 pointer-events-none"
          style={{
            transform: "rotate(8deg)",
            clipPath: "polygon(3% 10%, 8% 0%, 97% 0%, 100% 12%, 96% 90%, 91% 100%, 4% 100%, 0% 88%)",
          }}
        />
      )}

      {/* Massive Heavy Physical Photographic Print (60-80% visual field) */}
      <div
        className={cn(
          "bg-[#FCFAF7] border-2 border-[#E5DDD0] rounded-[2px] p-4 sm:p-7 pb-12 sm:pb-16 transition-shadow duration-300",
          shadowStyles
        )}
      >
        {/* Film Negative Area with Deep Photographic Color */}
        <div className="relative w-full aspect-[16/10] bg-[#111827] overflow-hidden rounded-[1px] shadow-inner">
          <Image
            src={imageSrc}
            alt={caption}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1400px"
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          {/* Natural Film Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/15 pointer-events-none" />

          {/* Micro Corner Annotation Badge */}
          {annotation && (
            <div className="absolute top-4 left-4 px-2.5 py-1.5 bg-black/75 backdrop-blur-xs text-[#FAF6EE] font-mono text-[11px] sm:text-xs uppercase tracking-widest rounded-xs pointer-events-none shadow-sm">
              {annotation}
            </div>
          )}
        </div>

        {/* Handwritten Bottom Margin Area */}
        <div className="pt-4 sm:pt-6 px-2 flex items-baseline justify-between">
          <div>
            <h3 className="font-serif italic text-lg sm:text-2xl md:text-3xl text-[#241D17] leading-snug tracking-tight">
              {caption}
            </h3>
            {subcaption && (
              <p className="font-mono text-xs sm:text-sm text-[#7A6C5D] uppercase tracking-widest mt-1">
                {subcaption}
              </p>
            )}
          </div>
          <span className="font-mono text-xs text-[#A39686] uppercase tracking-widest hidden sm:inline-block">
            CORAL ARCHIVE · 2026
          </span>
        </div>
      </div>
    </div>
  );
}
