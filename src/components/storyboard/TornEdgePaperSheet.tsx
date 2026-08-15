"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// 1. TORN-EDGE PAPER SHEET
// Real irregular torn paper with SVG torn border clip/feathers & paper fiber drop shadows
// ============================================================================
interface TornEdgePaperSheetProps {
  color?: "ivory" | "seafoam" | "navy" | "tan" | "terracotta" | "olive" | "charcoal" | "dustyBlue" | "saffron";
  edgeStyle?: "tornTop" | "tornBottom" | "tornLeft" | "tornRight" | "tornAll" | "deckled" | "foldedCorner";
  pattern?: "botanicalFronds" | "waveContours" | "blueprintGrid" | "spiceBotanicals" | "basaltHexagons" | "solarArcs" | "starChart" | "droneGrid" | "none";
  rotation?: number;
  className?: string;
  children?: React.ReactNode;
}

export function TornEdgePaperSheet({
  color = "ivory",
  edgeStyle = "deckled",
  pattern = "none",
  rotation = 0,
  className,
  children,
}: TornEdgePaperSheetProps) {
  const colorStyles = {
    ivory: "bg-[#FDFBF7] text-[#2D241E] border-[#E8DFD0]",
    seafoam: "bg-[#E6F4F1] text-[#134E4A] border-[#C4E5DF]",
    navy: "bg-[#0F172A] text-[#F8FAFC] border-[#1E293B]",
    tan: "bg-[#F5EBE1] text-[#451A03] border-[#E4D1BF]",
    terracotta: "bg-[#7C2D12] text-[#FAECE6] border-[#9A3412]",
    olive: "bg-[#1E3A1A] text-[#EDF3E8] border-[#2D5A27]",
    charcoal: "bg-[#18181B] text-[#F4F4F5] border-[#27272A]",
    dustyBlue: "bg-[#1E293B] text-[#E0F2FE] border-[#334155]",
    saffron: "bg-[#FDF6EC] text-[#451A03] border-[#EED7B8]",
  }[color];

  return (
    <div
      className={cn(
        "relative p-5 sm:p-7 shadow-[0_12px_32px_rgba(20,10,5,0.09),_0_2px_6px_rgba(0,0,0,0.04)] transform-gpu rounded-[1px] border overflow-hidden select-none",
        colorStyles,
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Pattern Overlays */}
      {pattern === "botanicalFronds" && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.14] mix-blend-multiply"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="currentColor" strokeWidth="1.2">
            <path d="M 450 20 C 380 60, 300 150, 260 250" />
            <path d="M 400 50 Q 350 90, 310 110" />
            <path d="M 360 90 Q 310 140, 270 160" />
            <path d="M 320 140 Q 270 190, 240 220" />
            <path d="M 20 480 C 120 440, 220 340, 280 220" />
            <path d="M 80 440 Q 140 390, 190 380" />
          </g>
        </svg>
      )}

      {pattern === "waveContours" && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12] mix-blend-multiply"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="currentColor" strokeWidth="1.5">
            <path d="M 0 100 Q 125 30, 250 100 T 500 100" />
            <path d="M 0 200 Q 125 130, 250 200 T 500 200" strokeDasharray="5 3" />
            <path d="M 0 320 Q 125 250, 250 320 T 500 320" />
            <path d="M 0 440 Q 125 370, 250 440 T 500 440" strokeDasharray="4 4" />
          </g>
        </svg>
      )}

      {pattern === "blueprintGrid" && (
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      )}

      {pattern === "spiceBotanicals" && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.14] mix-blend-multiply"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="currentColor" strokeWidth="1.2">
            <circle cx="420" cy="80" r="14" />
            <path d="M 420 50 L 420 110 M 390 80 L 450 80 M 400 60 L 440 100 M 400 100 L 440 60" />
            <path d="M 20 120 C 100 140, 60 250, 140 300" strokeDasharray="4 2" />
          </g>
        </svg>
      )}

      {pattern === "basaltHexagons" && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.15] mix-blend-multiply"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="currentColor" strokeWidth="1.2">
            <polygon points="100,50 130,70 130,110 100,130 70,110 70,70" />
            <polygon points="160,50 190,70 190,110 160,130 130,110 130,70" />
            <polygon points="130,110 160,130 160,170 130,190 100,170 100,130" />
            <polygon points="380,120 410,140 410,180 380,200 350,180 350,140" />
          </g>
        </svg>
      )}

      {pattern === "solarArcs" && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.16] mix-blend-multiply"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="currentColor" strokeWidth="1.4">
            <circle cx="250" cy="250" r="100" strokeDasharray="3 3" />
            <circle cx="250" cy="250" r="180" strokeDasharray="6 4" />
            <line x1="250" y1="250" x2="60" y2="80" strokeWidth="1.8" />
          </g>
        </svg>
      )}

      {pattern === "starChart" && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.2]"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="#38BDF8" strokeWidth="1">
            <circle cx="100" cy="100" r="3" fill="#38BDF8" />
            <circle cx="160" cy="120" r="2.5" fill="#38BDF8" />
            <circle cx="210" cy="170" r="3" fill="#38BDF8" />
            <circle cx="250" cy="230" r="3.5" fill="#38BDF8" />
            <circle cx="320" cy="240" r="2.5" fill="#38BDF8" />
            <polyline points="100,100 160,120 210,170 250,230 320,240" />
          </g>
        </svg>
      )}

      {pattern === "droneGrid" && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.22]"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="#2DD4BF" strokeWidth="1">
            <circle cx="250" cy="200" r="90" strokeDasharray="3 3" />
            <circle cx="250" cy="200" r="150" strokeDasharray="5 3" />
            <polygon points="250,80 260,190 250,200 240,190" fill="#2DD4BF" />
            <polygon points="250,320 260,210 250,200 240,210" fill="#2DD4BF" />
          </g>
        </svg>
      )}

      {/* Folded Corner Effect */}
      {edgeStyle === "foldedCorner" && (
        <div className="absolute top-0 right-0 w-8 h-8 border-b border-l border-black/20 bg-black/5 pointer-events-none" />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// 2. PHYSICAL FABRIC SWATCH (Pressed Linen, Canvas, Navy Cloth)
// ============================================================================
interface FabricSwatchProps {
  material?: "linen" | "canvas" | "navyCloth" | "leatherStrip";
  rotation?: number;
  className?: string;
}

export function FabricSwatch({ material = "linen", rotation = 0, className }: FabricSwatchProps) {
  const styles = {
    linen: "bg-[#EFE7D8] border-[#DACDB8] text-[#5C4A36]",
    canvas: "bg-[#E3DCB8] border-[#CCC49D] text-[#4A4224]",
    navyCloth: "bg-[#132238] border-[#22395C] text-[#93C5FD]",
    leatherStrip: "bg-[#5C2B14] border-[#78381A] text-[#FDE047]",
  }[material];

  return (
    <div
      className={cn(
        "relative px-4 py-2 text-[10px] font-mono tracking-[0.2em] uppercase rounded-[1px] border shadow-sm select-none pointer-events-none transform-gpu",
        styles,
        className
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 2px, transparent 2px, transparent 4px)",
      }}
    >
      <div className="border-t border-b border-current/20 py-0.5">{material} swatch</div>
    </div>
  );
}
