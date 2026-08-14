"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TapeStripProps {
  className?: string;
  rotationDeg?: number;
  widthPx?: number;
}

export function TapeStrip({
  className,
  rotationDeg = -2,
  widthPx = 90,
}: TapeStripProps) {
  return (
    <div
      className={cn(
        "h-6 bg-[#E8DFD0]/60 backdrop-blur-xs border-y border-[#FAF6EE]/50 shadow-xs pointer-events-none select-none",
        className
      )}
      style={{
        width: `${widthPx}px`,
        transform: `rotate(${rotationDeg}deg)`,
      }}
    />
  );
}
