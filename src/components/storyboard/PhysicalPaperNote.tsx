"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PhysicalPaperNoteProps {
  text: string;
  tag?: string;
  subtext?: string;
  theme?: "parchment" | "cream" | "laterite" | "navy" | "burntAmber";
  rotation?: number;
  tapeTop?: boolean;
  pinTop?: boolean;
  pebbleCorner?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function PhysicalPaperNote({
  text,
  tag,
  subtext,
  theme = "parchment",
  rotation = 0,
  tapeTop = false,
  pinTop = false,
  pebbleCorner = false,
  className,
  size = "md",
}: PhysicalPaperNoteProps) {
  const themeStyles = {
    parchment: "bg-[#F7F2E7] text-[#2C241D] border-[#E0D7C4] shadow-[8px_12px_22px_rgba(70,45,20,0.18)]",
    cream: "bg-[#FAF7F0] text-[#1F2937] border-[#ECE4D5] shadow-[8px_12px_22px_rgba(70,45,20,0.16)]",
    laterite: "bg-[#8B3A2B] text-[#FAF6EE] border-[#722F22] shadow-[8px_14px_24px_rgba(50,15,10,0.28)]",
    navy: "bg-[#0E1E2E] text-[#FAF6EE] border-[#1E3A5F] shadow-[10px_16px_28px_rgba(4,10,20,0.45)]",
    burntAmber: "bg-[#9A5B2B] text-[#FFF9F2] border-[#7D451E] shadow-[10px_16px_28px_rgba(60,25,10,0.32)]",
  }[theme];

  const sizeClasses = {
    sm: "max-w-[220px] p-3 text-xs",
    md: "max-w-[280px] p-4 text-sm",
    lg: "max-w-[340px] p-5 text-base",
  }[size];

  return (
    <div
      className={cn(
        "relative select-none pointer-events-auto transition-transform duration-300 hover:scale-[1.03] z-25",
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Masking Tape */}
      {tapeTop && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#F4EBD9]/85 backdrop-blur-xs border-t border-b border-black/5 shadow-xs z-30 pointer-events-none"
          style={{
            transform: "translateX(-50%) rotate(2deg)",
            clipPath: "polygon(2% 10%, 6% 0%, 98% 0%, 100% 12%, 96% 90%, 92% 100%, 4% 100%, 0% 88%)",
          }}
        />
      )}

      {/* Brass Pin on top */}
      {pinTop && (
        <div className="absolute -top-2.5 left-6 z-35 pointer-events-none">
          <div className="w-3.5 h-3.5 rounded-full bg-radial from-[#FDE047] via-[#D97706] to-[#78350F] shadow-md border border-[#FDE047]/60" />
        </div>
      )}

      {/* Small Smooth Beach Pebble holding down a corner */}
      {pebbleCorner && (
        <div className="absolute -bottom-2 -right-2 z-35 pointer-events-none">
          <div className="w-5 h-4 rounded-full bg-[#8A7D70] shadow-[3px_4px_6px_rgba(40,20,10,0.4)] border-t border-[#A89C8F]" />
        </div>
      )}

      {/* Paper Surface with Torn Bottom Edge */}
      <div
        className={cn(
          "relative border-t border-l border-r rounded-[1px]",
          themeStyles,
          sizeClasses
        )}
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 97%, 95% 100%, 90% 96%, 82% 99%, 75% 96%, 68% 100%, 55% 96%, 42% 99%, 30% 96%, 18% 100%, 8% 97%, 0% 100%)",
        }}
      >
        {tag && (
          <div className="flex items-center justify-between border-b border-current/15 pb-1.5 mb-2">
            <span className="font-mono text-[9px] uppercase tracking-widest opacity-75 font-semibold">
              {tag}
            </span>
            <span className="font-mono text-[9px] opacity-60">MALPE</span>
          </div>
        )}

        <p className="font-serif italic font-medium leading-snug">
          "{text}"
        </p>

        {subtext && (
          <p className="font-mono text-[9px] tracking-wider uppercase opacity-75 mt-2 pt-1.5 border-t border-current/10">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}
