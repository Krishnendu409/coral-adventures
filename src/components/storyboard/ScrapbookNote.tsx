"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TapeStrip } from "@/components/editorial/ephemera/TapeStrip";

interface ScrapbookNoteProps {
  children: React.ReactNode;
  variant?: "parchment" | "cream" | "laterite" | "navy" | "tape-note";
  rotation?: number;
  tape?: boolean;
  className?: string;
  pin?: boolean;
}

export function ScrapbookNote({
  children,
  variant = "parchment",
  rotation = 0,
  tape = true,
  className,
  pin = false,
}: ScrapbookNoteProps) {
  const variantStyles = {
    parchment: "bg-[#F4ECE1] text-[#0A2540] border-[#0A2540]/15 shadow-md",
    cream: "bg-[#FAF6EE] text-[#0A2540] border-[#0A2540]/10 shadow-sm",
    laterite: "bg-[#964831] text-[#FAF6EE] border-[#964831] shadow-md",
    navy: "bg-[#071A2B] text-[#FAF6EE] border-white/10 shadow-lg",
    "tape-note": "bg-[#FDF9EE] text-[#0A2540] border-[#E8DFD0] shadow-sm",
  };

  return (
    <div
      className={cn(
        "relative p-4 sm:p-5 border select-none transition-transform duration-300 hover:scale-[1.02] hover:z-20",
        variantStyles[variant],
        className
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Tape Strip */}
      {tape && !pin && (
        <TapeStrip className="-top-3 left-6 -rotate-2 z-10" />
      )}

      {/* Brass Push Pin */}
      {pin && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-tr from-[#854D0E] via-[#CA8A04] to-[#FEF08A] border border-[#713F12] shadow-md z-10 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FEF08A]" />
        </div>
      )}

      {/* Subtle Paper Texture & Watermark */}
      <div className="relative z-0">
        {children}
      </div>
    </div>
  );
}
