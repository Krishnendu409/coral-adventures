"use client";

import React from "react";
import { cn } from "@/lib/utils";

// 1. Vintage Expedition Rubber Stamp
export function RubberStamp({
  label = "CORAL EXPEDITION",
  location = "MALPE COAST",
  coordinates = "13°21′02″ N · 74°42′08″ E",
  year = "2026",
  color = "#C2410C",
  rotation = -12,
  className,
}: {
  label?: string;
  location?: string;
  coordinates?: string;
  year?: string;
  color?: string;
  rotation?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("inline-block select-none pointer-events-none opacity-85 z-20", className)}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div
        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-dashed flex flex-col items-center justify-center p-2 text-center"
        style={{ borderColor: color, color }}
      >
        <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest font-bold">
          {label}
        </span>
        <div className="w-10 h-px my-1" style={{ backgroundColor: color }} />
        <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-wider">
          {location}
        </span>
        <span className="font-mono text-[6px] tracking-tighter opacity-80 mt-0.5">
          {coordinates}
        </span>
        <span className="font-mono text-[9px] font-bold mt-1">
          {year}
        </span>
      </div>
    </div>
  );
}

// 2. Realistic 3D Brass Pocket Compass on Sand
export function BrassCompass({ className, rotation = 25 }: { className?: string; rotation?: number }) {
  return (
    <div
      className={cn("relative select-none pointer-events-none drop-shadow-xl z-25", className)}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#F59E0B] via-[#B45309] to-[#78350F] p-1.5 shadow-[10px_16px_28px_rgba(50,25,10,0.35)] border border-[#FDE68A]/40">
        <div className="w-full h-full rounded-full bg-[#FAF5EC] border border-[#B45309]/30 flex items-center justify-center relative overflow-hidden shadow-inner">
          {/* Compass Rose Dial */}
          <div className="absolute inset-2 border border-dashed border-[#B45309]/30 rounded-full" />
          <span className="absolute top-1 font-mono text-[8px] font-bold text-[#DC2626]">N</span>
          <span className="absolute bottom-1 font-mono text-[8px] font-bold text-[#78350F]">S</span>
          <span className="absolute right-1.5 font-mono text-[8px] font-bold text-[#78350F]">E</span>
          <span className="absolute left-1.5 font-mono text-[8px] font-bold text-[#78350F]">W</span>

          {/* Needle */}
          <div className="w-1.5 h-14 relative rotate-45 flex flex-col items-center">
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[28px] border-b-[#DC2626] drop-shadow-xs" />
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[28px] border-t-[#1E293B] drop-shadow-xs" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#B45309] border border-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Small Natural Shell on Sand
export function Seashell({
  type = "cowrie",
  rotation = 15,
  className,
}: {
  type?: "cowrie" | "scallop" | "spiral";
  rotation?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("inline-block select-none pointer-events-none drop-shadow-md z-25", className)}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {type === "cowrie" && (
        <div className="w-7 h-10 rounded-[50%/40%] bg-gradient-to-r from-[#FAF6EE] via-[#E2D5C3] to-[#D5C2AB] shadow-[4px_6px_10px_rgba(60,35,15,0.25)] border border-[#FAF6EE] relative flex items-center justify-center">
          <div className="w-1 h-7 rounded-full bg-[#5D4037]/70 shadow-inner" />
        </div>
      )}
      {type === "scallop" && (
        <div className="w-9 h-8 rounded-t-full bg-gradient-to-b from-[#FFF5EB] via-[#F4E3D0] to-[#DFCAAF] shadow-[4px_6px_10px_rgba(60,35,15,0.25)] border-t border-[#FFF] relative flex items-center justify-center">
          <div className="w-full h-full flex justify-around px-1 pt-1 opacity-40">
            <div className="w-px h-full bg-[#8D6E63]" />
            <div className="w-px h-full bg-[#8D6E63]" />
            <div className="w-px h-full bg-[#8D6E63]" />
          </div>
        </div>
      )}
    </div>
  );
}
