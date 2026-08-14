"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// 1. WASHI TAPE STRIP (Semi-transparent paper tape with torn edges)
// ============================================================================
interface WashiTapeProps {
  className?: string;
  angle?: number;
  color?: "cream" | "amber" | "sage" | "coral" | "translucent";
}

export function WashiTape({ className, angle = -3, color = "cream" }: WashiTapeProps) {
  const colorMap = {
    cream: "bg-[#F3EDE0]/80 border-[#E5DAC6]/60 shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
    amber: "bg-[#FDE68A]/85 border-[#F59E0B]/40 shadow-[0_2px_8px_rgba(180,83,9,0.1)]",
    sage: "bg-[#D1FAE5]/85 border-[#10B981]/40 shadow-[0_2px_8px_rgba(16,185,129,0.1)]",
    coral: "bg-[#FFEDD5]/85 border-[#F97316]/40 shadow-[0_2px_8px_rgba(249,115,22,0.1)]",
    translucent: "bg-white/40 border-white/60 backdrop-blur-[2px] shadow-[0_2px_6px_rgba(0,0,0,0.05)]",
  };

  return (
    <div
      aria-hidden="true"
      style={{ transform: `rotate(${angle}deg)` }}
      className={cn(
        "absolute z-20 h-7 w-28 pointer-events-none border-y select-none transition-transform duration-300",
        colorMap[color],
        className
      )}
    >
      {/* Torn Jagged Edges (Left & Right) */}
      <div className="absolute -left-1 top-0 bottom-0 w-2.5 bg-current opacity-20 [clip-path:polygon(100%_0,0_25%,100%_50%,0_75%,100%_100%)]" />
      <div className="absolute -right-1 top-0 bottom-0 w-2.5 bg-current opacity-20 [clip-path:polygon(0_0,100%_25%,0_50%,100%_75%,0_100%)]" />
      {/* Paper Fibers Detail */}
      <div className="w-full h-full opacity-30 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:6px_6px]" />
    </div>
  );
}

// ============================================================================
// 2. BRASS PAPER CLIP (3D Metallic Brass Clip holding paper)
// ============================================================================
export function BrassPaperClip({ className, angle = 12 }: { className?: string; angle?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{ transform: `rotate(${angle}deg)` }}
      className={cn("absolute z-30 w-7 h-14 pointer-events-none drop-shadow-md select-none", className)}
    >
      <svg viewBox="0 0 28 56" fill="none" className="w-full h-full">
        {/* Metal Clip Outer Loop */}
        <path
          d="M 8 50 V 12 A 6 6 0 0 1 20 12 V 42 A 4 4 0 0 1 12 42 V 18"
          stroke="#D97706"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Brass Highlight */}
        <path
          d="M 8 50 V 12 A 6 6 0 0 1 20 12 V 42 A 4 4 0 0 1 12 42 V 18"
          stroke="#FCD34D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ============================================================================
// 3. TORN PAPER EDGE DIVIDER (SVG Deckled Paper Separator)
// ============================================================================
interface TornPaperEdgeProps {
  flip?: boolean;
  color?: string;
  className?: string;
}

export function TornPaperEdge({ flip = false, color = "#FAF6EE", className }: TornPaperEdgeProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-full overflow-hidden leading-none z-10 pointer-events-none select-none",
        flip ? "rotate-180 -mt-1" : "-mb-1",
        className
      )}
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="relative block w-full h-8 sm:h-12 text-current"
        style={{ color }}
      >
        <path
          fill="currentColor"
          d="M0,0 Q30,18 60,8 Q90,22 120,5 Q150,19 180,12 Q210,25 240,6 Q270,18 300,10 Q330,22 360,4 Q390,16 420,9 Q450,24 480,7 Q510,18 540,11 Q570,26 600,5 Q630,20 660,8 Q690,22 720,12 Q750,26 780,6 Q810,19 840,10 Q870,24 900,8 Q930,19 960,12 Q990,27 1020,7 Q1050,20 1080,10 Q1110,23 1140,5 Q1170,18 1200,8 L1200,60 L0,60 Z"
        />
      </svg>
    </div>
  );
}

// ============================================================================
// 4. POLAROID FRAME (Vintage Paper Polaroid with Handwritten Caption)
// ============================================================================
interface PolaroidFrameProps {
  children: React.ReactNode;
  caption?: string;
  stamp?: string;
  angle?: number;
  className?: string;
}

export function PolaroidFrame({
  children,
  caption,
  stamp,
  angle = -2,
  className,
}: PolaroidFrameProps) {
  return (
    <div
      style={{ transform: `rotate(${angle}deg)` }}
      className={cn(
        "relative p-3 pb-6 sm:p-4 sm:pb-8 bg-[#FAF6EE] border border-[#E8DFD0] rounded-xs shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-transform duration-500 hover:scale-[1.02] hover:z-30 group select-none",
        className
      )}
    >
      {/* Washi Tape Corner Accent */}
      <WashiTape angle={-6} className="-top-3 left-6" color="cream" />

      {/* Polaroid Image Slot */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EFE8D8] rounded-xs border border-[#E2D9C8]">
        {children}
      </div>

      {/* Handwritten Caption & Postal Stamp */}
      {(caption || stamp) && (
        <div className="mt-3 flex items-center justify-between px-1">
          {caption && (
            <span className="font-serif italic text-xs sm:text-sm text-[#4A3B32] tracking-wide">
              {caption}
            </span>
          )}
          {stamp && (
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C2410C]/80 border border-[#C2410C]/30 px-2 py-0.5 rounded-full bg-[#FFEDD5]/50">
              {stamp}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 5. PARCHMENT OVERLAY (SVG Noise Grain Filter for Paper Texture)
// ============================================================================
export function ParchmentOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.035] mix-blend-multiply"
    >
      <svg className="w-full h-full">
        <filter id="parchmentNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#parchmentNoise)" />
      </svg>
    </div>
  );
}
