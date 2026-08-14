"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { TapeStrip } from "@/components/editorial/ephemera/TapeStrip";

interface ScrapbookPolaroidProps {
  src: string;
  alt: string;
  caption?: string;
  rotation?: number; // degrees, e.g. -3, 2, 4
  tapePosition?: "top" | "top-left" | "top-right" | "none";
  className?: string;
  aspectRatio?: "square" | "landscape" | "portrait";
  stamp?: React.ReactNode;
}

export function ScrapbookPolaroid({
  src,
  alt,
  caption,
  rotation = 0,
  tapePosition = "top",
  className,
  aspectRatio = "square",
  stamp,
}: ScrapbookPolaroidProps) {
  const aspectClasses = {
    square: "aspect-square",
    landscape: "aspect-[4/3]",
    portrait: "aspect-[3/4]",
  };

  return (
    <div
      className={cn(
        "relative p-3 pb-5 bg-white border border-[#0A2540]/10 shadow-[0_10px_25px_-5px_rgba(10,37,64,0.12),0_8px_10px_-6px_rgba(10,37,64,0.08)] select-none transition-transform duration-300 hover:scale-[1.02] hover:z-20",
        className
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Tape Strip */}
      {tapePosition === "top" && (
        <TapeStrip className="-top-3.5 left-1/2 -translate-x-1/2 z-10" />
      )}
      {tapePosition === "top-left" && (
        <TapeStrip className="-top-3 -left-2 -rotate-12 z-10" />
      )}
      {tapePosition === "top-right" && (
        <TapeStrip className="-top-3 -right-2 rotate-12 z-10" />
      )}

      {/* Optional Stamp */}
      {stamp && (
        <div className="absolute -bottom-3 -right-3 z-10 pointer-events-none">
          {stamp}
        </div>
      )}

      {/* Photo Surface */}
      <div className={cn("relative w-full overflow-hidden bg-[#FAF6EE] shadow-inner", aspectClasses[aspectRatio])}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Film grain and subtle light sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
      </div>

      {/* Handwritten / Typewritten Bottom Caption */}
      {caption && (
        <div className="pt-3 px-1 text-center">
          <span className="font-serif italic text-xs sm:text-sm text-[#0A2540]/85 tracking-wide block leading-snug">
            {caption}
          </span>
        </div>
      )}
    </div>
  );
}
