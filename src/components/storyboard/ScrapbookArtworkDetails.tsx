"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// 1. VINTAGE POSTAL CANCELLATION STAMPS & INK MARKS
// Hand-inked, slightly imperfect postal marks with realistic rotations & ink bleeds
// ============================================================================
interface PostalCancellationStampProps {
  city?: string;
  date?: string;
  code?: string;
  rotation?: number;
  color?: "coral" | "navy" | "green" | "teal" | "sepia";
  className?: string;
}

export function PostalCancellationStamp({
  city = "MALPE FORESHORE",
  date = "14 AUG 2026",
  code = "EXP-KARAVALI",
  rotation = -8,
  color = "coral",
  className,
}: PostalCancellationStampProps) {
  const colorMap = {
    coral: "text-[#BE123C] border-[#BE123C] stroke-[#BE123C]",
    navy: "text-[#1E3A8A] border-[#1E3A8A] stroke-[#1E3A8A]",
    green: "text-[#166534] border-[#166534] stroke-[#166534]",
    teal: "text-[#0F766E] border-[#0F766E] stroke-[#0F766E]",
    sepia: "text-[#78350F] border-[#78350F] stroke-[#78350F]",
  }[color];

  return (
    <div
      className={cn(
        "relative inline-flex items-center gap-2 px-3 py-1.5 select-none pointer-events-none opacity-85 mix-blend-multiply transform-gpu",
        colorMap,
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Circular Inked Stamp */}
      <div className="relative w-14 h-14 rounded-full border-2 border-dashed border-current flex flex-col items-center justify-center text-center p-1">
        <div className="text-[6.5px] font-mono tracking-[0.2em] font-bold uppercase leading-tight">
          {city}
        </div>
        <div className="text-[7.5px] font-serif font-bold tracking-wider my-0.5 border-t border-b border-current py-0.5 w-full">
          {date}
        </div>
        <div className="text-[5.5px] font-mono tracking-[0.15em] opacity-80">{code}</div>
      </div>

      {/* Wavy Postal Cancellation Lines */}
      <svg width="60" height="24" viewBox="0 0 60 24" fill="none" className="stroke-current opacity-75">
        <path d="M 0 4 Q 15 0, 30 4 T 60 4" strokeWidth="1.2" />
        <path d="M 0 12 Q 15 8, 30 12 T 60 12" strokeWidth="1.2" />
        <path d="M 0 20 Q 15 16, 30 20 T 60 20" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

// ============================================================================
// 2. BOTANICAL INK ILLUSTRATIONS (Palm Fronds, Pandanus, Sea Grass & Flowers)
// ============================================================================
interface BotanicalIllustrationProps {
  type?: "palmFrond" | "seaGrass" | "pandanusLeaf" | "coastalBranch" | "coastalFlower";
  size?: number;
  rotation?: number;
  color?: string;
  opacity?: number;
  className?: string;
}

export function BotanicalIllustration({
  type = "palmFrond",
  size = 120,
  rotation = 0,
  color = "#2D4A22",
  opacity = 0.45,
  className,
}: BotanicalIllustrationProps) {
  return (
    <div
      className={cn("relative select-none pointer-events-none transform-gpu mix-blend-multiply", className)}
      style={{
        width: size,
        height: size * 1.3,
        transform: `rotate(${rotation}deg)`,
        opacity,
      }}
    >
      {type === "palmFrond" && (
        <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Main Stem */}
          <path d="M 50 125 C 50 80, 48 35, 45 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          {/* Left Leaflets */}
          <path d="M 49 105 Q 25 90, 8 80" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 48 88 Q 20 72, 4 60" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 48 72 Q 22 55, 6 42" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 47 56 Q 24 40, 10 26" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 46 40 Q 28 26, 18 14" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 45 25 Q 32 15, 26 6" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          {/* Right Leaflets */}
          <path d="M 50 100 Q 75 85, 92 75" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 49 84 Q 80 68, 96 55" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 48 68 Q 78 50, 94 36" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 47 52 Q 76 35, 90 22" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 46 36 Q 72 22, 82 12" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 45 22 Q 68 12, 74 4" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )}

      {type === "seaGrass" && (
        <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M 30 125 C 20 90, 10 50, 25 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 45 125 C 40 85, 45 45, 60 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 60 125 C 70 95, 85 60, 80 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 50 125 C 48 100, 35 70, 42 40" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )}

      {type === "pandanusLeaf" && (
        <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M 50 125 C 50 70, 70 30, 85 5" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M 50 125 C 45 75, 25 35, 12 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M 50 125 C 50 65, 45 25, 48 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}

      {type === "coastalFlower" && (
        <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M 50 125 C 50 85, 52 50, 50 30" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          {/* Flower Petals */}
          <circle cx="50" cy="25" r="5" stroke={color} strokeWidth="1.2" />
          <path d="M 50 20 C 50 10, 45 5, 50 2 C 55 5, 50 10, 50 20" stroke={color} strokeWidth="1" />
          <path d="M 55 25 C 65 25, 70 20, 73 25 C 70 30, 65 25, 55 25" stroke={color} strokeWidth="1" />
          <path d="M 50 30 C 50 40, 55 45, 50 48 C 45 45, 50 40, 50 30" stroke={color} strokeWidth="1" />
          <path d="M 45 25 C 35 25, 30 30, 27 25 C 30 20, 35 25, 45 25" stroke={color} strokeWidth="1" />
          {/* Tiny Leaves */}
          <path d="M 50 75 Q 30 65, 22 55 Q 35 55, 50 70" stroke={color} strokeWidth="1" />
          <path d="M 51 90 Q 70 80, 78 70 Q 65 70, 51 85" stroke={color} strokeWidth="1" />
        </svg>
      )}
    </div>
  );
}

// ============================================================================
// 3. TORN PAPER SCRAP BLOCK (Multi-Color Layered Collage Elements)
// ============================================================================
interface TornPaperBlockProps {
  color?: "cream" | "seafoam" | "navy" | "tan" | "terracotta" | "olive" | "charcoal";
  rotation?: number;
  width?: string | number;
  height?: string | number;
  hasPattern?: "waves" | "botanical" | "hexagons" | "dots" | "none";
  className?: string;
  children?: React.ReactNode;
}

export function TornPaperBlock({
  color = "cream",
  rotation = 0,
  width = "100%",
  height = "auto",
  hasPattern = "none",
  className,
  children,
}: TornPaperBlockProps) {
  const bgStyles = {
    cream: "bg-[#FDFBF7] text-[#2D241E] border-[#E8DFD0]",
    seafoam: "bg-[#E6F4F1] text-[#134E4A] border-[#C4E5DF]",
    navy: "bg-[#0F172A] text-[#F8FAFC] border-[#1E293B]",
    tan: "bg-[#F5EBE1] text-[#451A03] border-[#E4D1BF]",
    terracotta: "bg-[#FAECE6] text-[#7C2D12] border-[#ECCDC3]",
    olive: "bg-[#EDF3E8] text-[#1E3A1A] border-[#D1E2C8]",
    charcoal: "bg-[#18181B] text-[#F4F4F5] border-[#27272A]",
  }[color];

  return (
    <div
      className={cn(
        "relative p-4 sm:p-6 shadow-[0_10px_25px_rgba(20,10,5,0.08),_0_2px_6px_rgba(0,0,0,0.04)] select-none transform-gpu rounded-[1px] border",
        bgStyles,
        className
      )}
      style={{
        width,
        height,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Pattern Watermark Overlay */}
      {hasPattern === "waves" && (
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='20' viewBox='0 0 40 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 10 0, 20 10 T 40 10' stroke='%23000' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: "40px 20px",
          }}
        />
      )}

      {hasPattern === "hexagons" && (
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='48' viewBox='0 0 28 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 0 L28 8 L28 24 L14 32 L0 24 L0 8 Z M14 48 L28 40 L28 24 L14 16 L0 24 L0 40 Z' stroke='%23000' stroke-width='0.8' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: "28px 48px",
          }}
        />
      )}

      {hasPattern === "dots" && (
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#000 0.8px, transparent 0.8px)",
            backgroundSize: "16px 16px",
          }}
        />
      )}

      {/* Torn Edge Effect on Left or Right Margin */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// 4. NATURALIST'S SPECIMEN DIAGRAMS (Shells, Basalt Crystals, Compass Roses)
// ============================================================================
interface SpecimenDiagramProps {
  type: "shellSpiral" | "compassRose" | "basaltCrystal" | "waveVector";
  size?: number;
  rotation?: number;
  className?: string;
}

export function SpecimenDiagram({ type, size = 64, rotation = 0, className }: SpecimenDiagramProps) {
  return (
    <div
      className={cn("relative select-none pointer-events-none transform-gpu opacity-60 mix-blend-multiply", className)}
      style={{ width: size, height: size, transform: `rotate(${rotation}deg)` }}
    >
      {type === "compassRose" && (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[#451A03]">
          <circle cx="50" cy="50" r="45" strokeWidth="1" />
          <circle cx="50" cy="50" r="40" strokeWidth="0.6" strokeDasharray="3 2" />
          <polygon points="50,10 54,46 50,50 46,46" fill="#451A03" />
          <polygon points="50,90 54,54 50,50 46,54" fill="#8A4822" />
          <polygon points="90,50 54,54 50,50 54,46" fill="#8A4822" />
          <polygon points="10,50 46,54 50,50 46,46" fill="#8A4822" />
          <text x="50" y="8" textAnchor="middle" fontSize="7" fontFamily="monospace" fontWeight="bold" fill="#451A03">N</text>
          <text x="96" y="52" textAnchor="middle" fontSize="7" fontFamily="monospace" fontWeight="bold" fill="#451A03">E</text>
          <text x="50" y="98" textAnchor="middle" fontSize="7" fontFamily="monospace" fontWeight="bold" fill="#451A03">S</text>
          <text x="4" y="52" textAnchor="middle" fontSize="7" fontFamily="monospace" fontWeight="bold" fill="#451A03">W</text>
        </svg>
      )}

      {type === "basaltCrystal" && (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[#18181B]">
          <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" strokeWidth="1.5" />
          <polygon points="50,25 72,38 72,62 50,75 28,62 28,38" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="50" y1="10" x2="50" y2="25" strokeWidth="1" />
          <line x1="85" y1="30" x2="72" y2="38" strokeWidth="1" />
          <line x1="85" y1="70" x2="72" y2="62" strokeWidth="1" />
          <line x1="50" y1="90" x2="50" y2="75" strokeWidth="1" />
          <line x1="15" y1="70" x2="28" y2="62" strokeWidth="1" />
          <line x1="15" y1="30" x2="28" y2="38" strokeWidth="1" />
        </svg>
      )}

      {type === "shellSpiral" && (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[#78350F]">
          <path d="M 50 50 A 5 5 0 0 1 55 55 A 10 10 0 0 1 45 65 A 20 20 0 0 1 25 45 A 35 35 0 0 1 60 15 A 45 45 0 0 1 95 60" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="50" y1="50" x2="80" y2="25" strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="50" y1="50" x2="20" y2="70" strokeWidth="0.8" strokeDasharray="2 2" />
        </svg>
      )}

      {type === "waveVector" && (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[#0F766E]">
          <path d="M 5 50 Q 25 15, 50 50 T 95 50" strokeWidth="1.8" />
          <path d="M 5 65 Q 25 30, 50 65 T 95 65" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="50" y1="5" x2="50" y2="95" strokeWidth="0.8" strokeDasharray="4 2" />
          <circle cx="50" cy="50" r="3" fill="#0F766E" />
        </svg>
      )}
    </div>
  );
}

// ============================================================================
// 5. HANDWRITTEN ANNOTATION WITH SKETCH ARROW
// ============================================================================
interface HandwrittenAnnotationProps {
  text: string;
  arrowDirection?: "down-left" | "down-right" | "up-left" | "up-right" | "right";
  color?: string;
  rotation?: number;
  className?: string;
}

export function HandwrittenAnnotation({
  text,
  arrowDirection = "down-right",
  color = "#451A03",
  rotation = -4,
  className,
}: HandwrittenAnnotationProps) {
  return (
    <div
      className={cn("inline-flex flex-col items-center select-none pointer-events-none transform-gpu font-serif italic text-xs sm:text-sm", className)}
      style={{ color, transform: `rotate(${rotation}deg)` }}
    >
      <span className="tracking-wide">{text}</span>
      <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="stroke-current mt-0.5 opacity-75">
        {arrowDirection === "down-right" && (
          <>
            <path d="M 5 2 Q 20 12, 35 15" strokeWidth="1.2" strokeLinecap="round" />
            <polyline points="28,12 35,15 32,7" strokeWidth="1.2" strokeLinecap="round" />
          </>
        )}
        {arrowDirection === "down-left" && (
          <>
            <path d="M 35 2 Q 20 12, 5 15" strokeWidth="1.2" strokeLinecap="round" />
            <polyline points="12,12 5,15 8,7" strokeWidth="1.2" strokeLinecap="round" />
          </>
        )}
        {arrowDirection === "right" && (
          <>
            <path d="M 2 10 L 35 10" strokeWidth="1.2" strokeLinecap="round" />
            <polyline points="28,5 35,10 28,15" strokeWidth="1.2" strokeLinecap="round" />
          </>
        )}
      </svg>
    </div>
  );
}
