"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface WashiTapeProps {
  angle?: number;
  color?: "amber" | "teal" | "coral" | "sand" | "slate";
  className?: string;
  width?: number;
}

export function WashiTape({
  angle = -3,
  color = "amber",
  className,
  width = 90,
}: WashiTapeProps) {
  const colorMap = {
    amber: "bg-[#F59E0B]/70 border-[#D97706]/40",
    teal: "bg-[#0D9488]/70 border-[#0F766E]/40",
    coral: "bg-[#E06C69]/70 border-[#C94A46]/40",
    sand: "bg-[#D4C3A3]/80 border-[#BAA57E]/50",
    slate: "bg-[#475569]/70 border-[#334155]/40",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute h-5 border-y backdrop-blur-xs shadow-xs pointer-events-none select-none z-30",
        colorMap[color] || colorMap.amber,
        className
      )}
      style={{
        width: `${width}px`,
        transform: `rotate(${angle}deg)`,
        clipPath: "polygon(4% 0, 96% 2%, 100% 98%, 0% 100%)",
      }}
    />
  );
}
