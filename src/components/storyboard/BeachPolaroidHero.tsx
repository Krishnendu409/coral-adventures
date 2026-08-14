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
    day: "shadow-[18px_26px_45px_rgba(70,45,20,0.28),_3px_6px_12px_rgba(0,0,0,0.12)]",
    sunset: "shadow-[32px_38px_60px_rgba(90,40,10,0.38),_5px_8px_16px_rgba(0,0,0,0.18)]",
    night: "shadow-[12px_18px_36px_rgba(4,10,25,0.55),_2px_4px_10px_rgba(0,0,0,0.35)]",
  }[shadowAngle];

  return (
    <div
      className={cn(
        "relative w-full max-w-3xl sm:max-w-4xl transition-all duration-500 transform-gpu hover:scale-[1.01] hover:z-30 select-none group",
        className
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Top Left Masking Tape Strip with Peeling Edge */}
      {tapeTopLeft && (
        <div
          className="absolute -top-4 -left-3 w-28 sm:w-36 h-8 bg-[#F4EBD9]/85 backdrop-blur-[1px] border-t border-b border-black/5 shadow-sm z-30 pointer-events-none"
          style={{
            transform: "rotate(-12deg)",
            clipPath: "polygon(0% 12%, 5% 0%, 95% 0%, 100% 15%, 98% 88%, 93% 100%, 7% 100%, 0% 85%)",
          }}
        />
      )}

      {/* Top Right Masking Tape Strip */}
      {tapeTopRight && (
        <div
          className="absolute -top-4 -right-3 w-28 sm:w-36 h-8 bg-[#F4EBD9]/85 backdrop-blur-[1px] border-t border-b border-black/5 shadow-sm z-30 pointer-events-none"
          style={{
            transform: "rotate(8deg)",
            clipPath: "polygon(3% 10%, 8% 0%, 97% 0%, 100% 12%, 96% 90%, 91% 100%, 4% 100%, 0% 88%)",
          }}
        />
      )}

      {/* Oversized Heavy Physical Photographic Print (55-70% visual field) */}
      <div
        className={cn(
          "bg-[#FCFAF7] border border-[#E8E1D3] rounded-[2px] p-3.5 sm:p-5 pb-10 sm:pb-14 transition-shadow duration-300",
          shadowStyles
        )}
      >
        {/* Film Negative Area with Deep Photographic Color */}
        <div className="relative w-full aspect-[16/10] bg-[#111827] overflow-hidden rounded-[1px] shadow-inner">
          <Image
            src={imageSrc}
            alt={caption}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 75vw, 1200px"
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          {/* Natural Film Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none" />

          {/* Micro Corner Annotation Badge */}
          {annotation && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-black/65 backdrop-blur-xs text-[#FAF6EE] font-mono text-[10px] uppercase tracking-widest rounded-xs pointer-events-none">
              {annotation}
            </div>
          )}
        </div>

        {/* Handwritten Bottom Margin Area */}
        <div className="pt-3 sm:pt-4 px-1.5 flex items-baseline justify-between">
          <div>
            <h3 className="font-serif italic text-base sm:text-xl md:text-2xl text-[#241D17] leading-snug tracking-tight">
              {caption}
            </h3>
            {subcaption && (
              <p className="font-mono text-[10px] sm:text-xs text-[#7A6C5D] uppercase tracking-widest mt-0.5">
                {subcaption}
              </p>
            )}
          </div>
          <span className="font-mono text-[10px] text-[#A39686] uppercase tracking-widest hidden sm:inline-block">
            CORAL ARCHIVE · 2026
          </span>
        </div>
      </div>
    </div>
  );
}
