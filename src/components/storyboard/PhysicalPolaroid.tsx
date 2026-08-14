"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhysicalPolaroidProps {
  imageSrc: string;
  caption: string;
  subcaption?: string;
  size?: "sm" | "md" | "lg" | "hero";
  rotation?: number; // degrees
  shadowIntensity?: "day" | "sunset" | "night";
  tapeTop?: boolean;
  pinTop?: boolean;
  annotation?: string;
  priority?: boolean;
  className?: string;
}

export function PhysicalPolaroid({
  imageSrc,
  caption,
  subcaption,
  size = "md",
  rotation = 0,
  shadowIntensity = "day",
  tapeTop = false,
  pinTop = false,
  annotation,
  priority = false,
  className,
}: PhysicalPolaroidProps) {
  const sizeClasses = {
    sm: "w-56 sm:w-72",
    md: "w-72 sm:w-96",
    lg: "w-88 sm:w-[480px]",
    hero: "w-full max-w-4xl sm:max-w-5xl",
  }[size];

  const shadowClasses = {
    day: "shadow-[18px_24px_45px_rgba(70,45,20,0.32),_3px_6px_12px_rgba(0,0,0,0.14)]",
    sunset: "shadow-[28px_36px_60px_rgba(90,40,10,0.42),_4px_8px_16px_rgba(0,0,0,0.18)]",
    night: "shadow-[14px_20px_40px_rgba(4,10,25,0.6),_2px_5px_12px_rgba(0,0,0,0.4)]",
  }[shadowIntensity];

  return (
    <div
      className={cn(
        "relative transition-all duration-300 transform-gpu hover:scale-105 hover:z-40 select-none group",
        sizeClasses,
        className
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Masking tape piece at top */}
      {tapeTop && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-7 bg-[#F4EBD9]/90 backdrop-blur-[1px] border-t border-b border-black/10 shadow-sm z-30 pointer-events-none"
          style={{
            transform: "rotate(-3deg)",
            clipPath: "polygon(0% 15%, 4% 0%, 96% 0%, 100% 12%, 98% 85%, 92% 100%, 8% 100%, 0% 88%)",
          }}
        />
      )}

      {/* Mini Brass Pin at top */}
      {pinTop && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-[#E6CA65] via-[#B89736] to-[#6A5216] border border-[#3D2E0B] shadow-md z-30 pointer-events-none">
          <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full bg-white/70" />
        </div>
      )}

      {/* Main Polaroid Frame */}
      <div
        className={cn(
          "bg-[#FBF9F5] border border-[#E3DDD1] rounded-[2px] p-3 sm:p-4 pb-8 sm:pb-10 transition-shadow duration-200",
          shadowClasses
        )}
      >
        {/* Photo area */}
        <div className="relative w-full aspect-square bg-[#1E293B] overflow-hidden rounded-[1px] shadow-inner">
          <Image
            src={imageSrc}
            alt={caption}
            fill
            sizes="(max-width: 768px) 300px, 480px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle film grain & gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none" />
        </div>

        {/* Handwritten caption space */}
        <div className="pt-3 px-1">
          <p className="font-serif italic text-xs sm:text-base text-[#2E241D] leading-tight tracking-tight">
            {caption}
          </p>
          {subcaption && (
            <p className="font-mono text-[9px] sm:text-[11px] text-[#786C5E] uppercase tracking-wider mt-0.5">
              {subcaption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
