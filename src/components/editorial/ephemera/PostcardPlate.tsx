import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ExpeditionStamp } from "./ExpeditionStamp";

interface PostcardPlateProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  caption?: string;
  coords?: string;
  stampLocation?: string;
  rotationDeg?: number;
  className?: string;
  stampColor?: "coral" | "palm" | "ocean" | "sun";
  aspectRatio?: "landscape" | "portrait" | "square";
}

export function PostcardPlate({
  imageSrc,
  imageAlt,
  title,
  caption,
  coords = "13°21′02″ N · 74°42′08″ E",
  stampLocation = "MALPE",
  rotationDeg = -3,
  className,
  stampColor = "coral",
  aspectRatio = "landscape",
}: PostcardPlateProps) {
  const aspectClass = {
    landscape: "aspect-[4/3]",
    portrait: "aspect-[3/4]",
    square: "aspect-square",
  }[aspectRatio];

  return (
    <div
      className={cn(
        "relative bg-[#FAF6EE] p-3 sm:p-4 pb-6 sm:pb-8 postcard-shadow border border-[#E2D9C8] transition-transform duration-500 hover:rotate-0 hover:scale-[1.02] select-none",
        className
      )}
      style={{
        transform: `rotate(${rotationDeg}deg)`,
      }}
    >
      {/* Postal Stamp Badge in corner */}
      <div className="absolute -top-4 -right-4 z-20 pointer-events-none">
        <ExpeditionStamp location={stampLocation} coords={coords.split("·")[0]?.trim()} color={stampColor} />
      </div>

      {/* Main Photographic Frame */}
      <div className={cn("relative w-full overflow-hidden bg-[#F2ECE1] border border-[#E2D9C8]/80", aspectClass)}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover object-center transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* Postcard Label & Caption */}
      <div className="mt-3 sm:mt-4 flex items-end justify-between gap-2 px-1">
        <div className="flex flex-col">
          <span className="font-serif text-base sm:text-lg text-[#0A2540] tracking-tight leading-tight">
            {title}
          </span>
          {caption && (
            <span className="font-serif italic text-xs sm:text-sm text-[#0A2540]/75 mt-0.5">
              {caption}
            </span>
          )}
        </div>
        <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.2em] text-[#0A2540]/60 uppercase whitespace-nowrap">
          {coords}
        </span>
      </div>
    </div>
  );
}
