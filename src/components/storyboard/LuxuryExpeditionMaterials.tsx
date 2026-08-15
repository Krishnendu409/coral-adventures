"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// 1. CRIMSON, CORAL, AMBER & NAVY WAX SEALS
// Hand-pressed, irregular molten wax seal with recessed blind debossed emblem
// ============================================================================
interface WaxSealProps {
  text?: string;
  subtext?: string;
  color?: "coral" | "navy" | "crimson" | "amber";
  size?: number;
  rotation?: number;
  className?: string;
}

export function WaxSeal({
  text = "CORAL EXPEDITION",
  subtext = "2026",
  color = "coral",
  size = 56,
  rotation = -6,
  className,
}: WaxSealProps) {
  const colorMap = {
    coral: {
      base: "#991B1B",
      mid: "#DC2626",
      light: "#EF4444",
      highlight: "#FCA5A5",
      dark: "#450A0A",
    },
    crimson: {
      base: "#881337",
      mid: "#BE123C",
      light: "#E11D48",
      highlight: "#FDA4AF",
      dark: "#4C0519",
    },
    navy: {
      base: "#0F172A",
      mid: "#1E293B",
      light: "#334155",
      highlight: "#94A3B8",
      dark: "#020617",
    },
    amber: {
      base: "#78350F",
      mid: "#B45309",
      light: "#D97706",
      highlight: "#FDE68A",
      dark: "#451A03",
    },
  }[color];

  return (
    <div
      className={cn("relative select-none pointer-events-none transform-gpu drop-shadow-[0_8px_16px_rgba(25,10,5,0.25)]", className)}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`waxGrad-${color}`} cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor={colorMap.highlight} stopOpacity="0.85" />
            <stop offset="35%" stopColor={colorMap.mid} />
            <stop offset="75%" stopColor={colorMap.base} />
            <stop offset="100%" stopColor={colorMap.dark} />
          </radialGradient>
        </defs>

        {/* Irregular Molten Wax Rim */}
        <path
          d="M 50 6 C 68 4, 86 14, 92 30 C 98 46, 94 66, 84 80 C 74 94, 54 96, 38 94 C 22 92, 8 82, 5 66 C 2 50, 8 32, 20 18 C 32 4, 42 7, 50 6 Z"
          fill={`url(#waxGrad-${color})`}
        />

        {/* Recessed Inner Debossed Stamp Plate */}
        <circle cx="50" cy="50" r="32" fill={colorMap.dark} opacity="0.35" />
        <circle cx="50" cy="50" r="30" fill={colorMap.base} stroke={colorMap.mid} strokeWidth="1.2" />

        {/* Etched Monogram / Text Ring */}
        <circle cx="50" cy="50" r="26" stroke={colorMap.highlight} strokeWidth="0.6" strokeDasharray="2 1.5" opacity="0.6" />
        
        {/* Central Coral Crest / Anchor Motif */}
        <g transform="translate(50, 50) scale(0.65)" stroke={colorMap.highlight} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
          <circle cx="0" cy="-14" r="5" strokeWidth="2" />
          <line x1="0" y1="-9" x2="0" y2="18" strokeWidth="2.5" />
          <line x1="-10" y1="-2" x2="10" y2="-2" strokeWidth="2.5" />
          <path d="M -16 6 C -12 18, 12 18, 16 6" strokeWidth="2.5" />
          <polyline points="-18,2 -16,6 -12,4" strokeWidth="2" />
          <polyline points="18,2 16,6 12,4" strokeWidth="2" />
        </g>

        {/* Curved Stamp Text */}
        <text
          x="50"
          y="28"
          textAnchor="middle"
          fill={colorMap.highlight}
          fontSize="5.5"
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
          letterSpacing="1.5"
          opacity="0.85"
        >
          {text.slice(0, 16)}
        </text>
        <text
          x="50"
          y="76"
          textAnchor="middle"
          fill={colorMap.highlight}
          fontSize="5"
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
          letterSpacing="2"
          opacity="0.75"
        >
          {subtext}
        </text>
      </svg>
    </div>
  );
}

// ============================================================================
// 2. AGED BRASS PHOTO CORNERS
// ============================================================================
interface BrassPhotoCornerProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  className?: string;
}

export function BrassPhotoCorner({
  position = "top-left",
  size = 28,
  className,
}: BrassPhotoCornerProps) {
  const rotation = {
    "top-left": "0",
    "top-right": "90",
    "bottom-right": "180",
    "bottom-left": "270",
  }[position];

  return (
    <div
      className={cn("absolute z-30 pointer-events-none select-none", className)}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="brassGradCorner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D77F" />
            <stop offset="30%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA7C11" />
            <stop offset="100%" stopColor="#664600" />
          </linearGradient>
        </defs>
        <path d="M 0 0 L 38 0 L 0 38 Z" fill="url(#brassGradCorner)" />
        <path d="M 2 2 L 32 2 L 2 32 Z" stroke="#3D2800" strokeWidth="0.8" opacity="0.6" />
        <circle cx="8" cy="8" r="1.5" fill="#3D2800" opacity="0.7" />
        <path d="M 12 4 L 4 12" stroke="#FFF3C4" strokeWidth="1" opacity="0.8" />
      </svg>
    </div>
  );
}

// ============================================================================
// 3. BRASS EYELET GROMMET
// ============================================================================
interface BrassEyeletProps {
  size?: number;
  className?: string;
}

export function BrassEyelet({ size = 18, className }: BrassEyeletProps) {
  return (
    <div
      className={cn("relative inline-block pointer-events-none select-none", className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 30 30" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="brassEyeletGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FCE794" />
            <stop offset="40%" stopColor="#D4AF37" />
            <stop offset="85%" stopColor="#8A6409" />
            <stop offset="100%" stopColor="#4A3403" />
          </radialGradient>
        </defs>
        <circle cx="15" cy="15" r="13" fill="url(#brassEyeletGrad)" stroke="#573E05" strokeWidth="0.8" />
        <circle cx="15" cy="15" r="8" stroke="#FFEBA4" strokeWidth="0.8" opacity="0.8" />
        <circle cx="15" cy="15" r="6" fill="#1C1402" opacity="0.85" />
      </svg>
    </div>
  );
}

// ============================================================================
// 4. BESPOKE SADDLE-STITCHED LEATHER EXPEDITION TAG
// ============================================================================
interface LeatherLuggageTagProps {
  title?: string;
  code?: string;
  subtext?: string;
  rotation?: number;
  color?: "cognac" | "tobacco" | "navy";
  className?: string;
}

export function LeatherLuggageTag({
  title = "CORAL EXPEDITION",
  code = "MALPE · 25.90M",
  subtext = "PRIVATE DOSSIER",
  rotation = -4,
  color = "cognac",
  className,
}: LeatherLuggageTagProps) {
  const styles = {
    cognac: {
      bg: "bg-[#8A4822]",
      border: "border-[#5E2E10]",
      stitch: "border-[#E5C29F]/50",
      text: "text-[#F8E3CD]",
      sub: "text-[#E5C29F]/70",
    },
    tobacco: {
      bg: "bg-[#4A2D1B]",
      border: "border-[#2E1A0E]",
      stitch: "border-[#C9A98A]/50",
      text: "text-[#EFE0D0]",
      sub: "text-[#C9A98A]/70",
    },
    navy: {
      bg: "bg-[#14233A]",
      border: "border-[#0B1524]",
      stitch: "border-[#96B3DA]/50",
      text: "text-[#E2ECF8]",
      sub: "text-[#96B3DA]/70",
    },
  }[color];

  return (
    <div
      className={cn(
        "relative rounded-md px-4 py-3 shadow-[0_12px_24px_rgba(20,10,5,0.28),_0_2px_6px_rgba(0,0,0,0.18)] select-none pointer-events-none transform-gpu",
        styles.bg,
        className
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div className={cn("absolute inset-1 rounded-[4px] border border-dashed pointer-events-none", styles.stitch)} />

      <div className="absolute top-2 left-2 z-10">
        <BrassEyelet size={16} />
      </div>

      <div className="pl-5 pt-0.5 space-y-0.5">
        <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
          {title}
        </div>
        <div className={cn("font-serif text-sm tracking-tight font-semibold", styles.text)}>
          {code}
        </div>
        <div className={cn("font-mono text-[8px] uppercase tracking-[0.18em]", styles.sub)}>
          {subtext}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 5. TRANSLUCENT VELLUM NAUTICAL OVERLAY CARD
// ============================================================================
interface VellumOverlayCardProps {
  title: string;
  subtitle?: string;
  bearing?: string;
  coordinates?: string;
  rotation?: number;
  className?: string;
  children?: React.ReactNode;
}

export function VellumOverlayCard({
  title,
  subtitle,
  bearing = "284° WNW",
  coordinates = "13°21′02″ N · 74°42′08″ E",
  rotation = 2,
  className,
  children,
}: VellumOverlayCardProps) {
  return (
    <div
      className={cn(
        "relative bg-[#FAF7F0]/85 backdrop-blur-md border border-[#1E293B]/15 rounded-sm p-4 sm:p-5 shadow-[0_16px_36px_rgba(15,25,45,0.1),_0_2px_6px_rgba(0,0,0,0.05)] text-[#0F172A] select-none transform-gpu",
        className
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Blueprint Grid Watermark */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none rounded-sm"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0F172A 1px, transparent 1px), linear-gradient(to bottom, #0F172A 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="absolute top-2.5 right-2.5">
        <BrassEyelet size={14} />
      </div>

      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between pr-5">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#C2410C] font-semibold">
            EXPEDITION VELLUM
          </span>
          <span className="font-mono text-[9px] text-[#0F172A]/60">{bearing}</span>
        </div>

        <div>
          <h4 className="font-serif text-base sm:text-lg text-[#0F172A] tracking-tight font-medium">
            {title}
          </h4>
          {subtitle && (
            <p className="font-sans text-xs text-[#0F172A]/75 leading-relaxed mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {children}

        <div className="pt-2 border-t border-[#0F172A]/10 flex items-center justify-between text-[8.5px] font-mono text-[#0F172A]/55 tracking-wider">
          <span>{coordinates}</span>
          <span>ARABIAN SEA</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 6. BLIND EMBOSSED ATELIER BADGE
// ============================================================================
interface BlindEmbossedBadgeProps {
  label?: string;
  sublabel?: string;
  year?: string;
  rotation?: number;
  className?: string;
}

export function BlindEmbossedBadge({
  label = "CORAL ADVENTURES",
  sublabel = "PRIVATE EXPEDITION ARCHIVE",
  year = "EST. 2026",
  rotation = 0,
  className,
}: BlindEmbossedBadgeProps) {
  return (
    <div
      className={cn(
        "relative inline-block px-5 py-3 rounded-[2px] bg-[#FAF7F0] border border-[#E5DAC8] shadow-[inset_0_1px_2px_rgba(255,255,255,0.95),_0_6px_14px_rgba(40,25,15,0.06)] select-none pointer-events-none transform-gpu",
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="text-center space-y-0.5">
        <div className="font-mono text-[8px] tracking-[0.3em] text-[#A89078] uppercase">
          {year}
        </div>
        <div className="font-serif text-xs sm:text-sm font-semibold tracking-[0.18em] text-[#3D2F22] uppercase drop-shadow-[0_1px_0_rgba(255,255,255,0.9)]">
          {label}
        </div>
        <div className="font-mono text-[7.5px] tracking-[0.22em] text-[#8C745E] uppercase">
          {sublabel}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 7. MOTHER-OF-PEARL SHELL PAPERWEIGHT
// ============================================================================
interface MotherOfPearlMarkerProps {
  size?: number;
  className?: string;
}

export function MotherOfPearlMarker({ size = 28, className }: MotherOfPearlMarkerProps) {
  return (
    <div
      className={cn("relative select-none pointer-events-none transform-gpu drop-shadow-[0_4px_10px_rgba(20,10,5,0.15)]", className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="mopGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#F5EFE6" />
            <stop offset="50%" stopColor="#E0F2FE" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#FCE7F3" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#D6D3D1" />
          </radialGradient>
        </defs>
        <circle cx="20" cy="20" r="18" fill="url(#mopGrad)" stroke="#FFFFFF" strokeWidth="0.8" />
        <ellipse cx="17" cy="14" rx="8" ry="4" fill="#FFFFFF" opacity="0.6" />
      </svg>
    </div>
  );
}

// ============================================================================
// 8. PRESSED BOTANICAL SPECIMEN (Coastal Palm Leaflet & Lavender Sprig)
// ============================================================================
interface BotanicalSpecimenProps {
  type?: "palm" | "herb";
  rotation?: number;
  className?: string;
}

export function BotanicalSpecimen({ type = "palm", rotation = 12, className }: BotanicalSpecimenProps) {
  return (
    <div
      className={cn("relative select-none pointer-events-none transform-gpu opacity-45 mix-blend-multiply", className)}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <svg width="48" height="72" viewBox="0 0 48 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 24 70 C 24 45, 24 20, 24 2" stroke="#2D4A22" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 24 50 Q 10 40, 2 34" stroke="#2D4A22" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M 24 44 Q 38 34, 46 28" stroke="#2D4A22" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M 24 32 Q 12 22, 6 16" stroke="#2D4A22" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M 24 26 Q 36 16, 42 10" stroke="#2D4A22" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M 24 14 Q 16 6, 12 2" stroke="#2D4A22" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M 24 10 Q 32 4, 36 2" stroke="#2D4A22" strokeWidth="0.9" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// ============================================================================
// 9. DECKLED-EDGE DIRECTOR'S HANDWRITTEN FIELD NOTE
// ============================================================================
interface DeckledFieldNoteProps {
  tag?: string;
  text: string;
  subtext?: string;
  rotation?: number;
  tone?: "parchment" | "cream" | "amber" | "navy";
  className?: string;
}

export function DeckledFieldNote({
  tag = "DIRECTOR'S OBSERVATION",
  text,
  subtext,
  rotation = 1,
  tone = "parchment",
  className,
}: DeckledFieldNoteProps) {
  const styles = {
    parchment: "bg-[#FAF5ED] text-[#2B2319] border-[#E8DFC8]",
    cream: "bg-[#FBF8F2] text-[#231E18] border-[#EADFCB]",
    amber: "bg-[#FDF4E7] text-[#3D250F] border-[#EED7B8]",
    navy: "bg-[#0F172A] text-[#F1F5F9] border-[#2A3B58]",
  }[tone];

  return (
    <div
      className={cn(
        "relative p-4 sm:p-5 rounded-[1px] border shadow-[0_12px_28px_rgba(20,10,5,0.12),_0_2px_6px_rgba(0,0,0,0.06)] select-none transform-gpu",
        styles,
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="flex items-center justify-between pb-2 border-b border-current/10">
        <span className="font-mono text-[8.5px] uppercase tracking-[0.24em] opacity-65 font-semibold">
          {tag}
        </span>
        <BrassEyelet size={12} />
      </div>

      <p className="font-serif text-xs sm:text-sm leading-relaxed mt-2 italic opacity-90 tracking-wide">
        "{text}"
      </p>

      {subtext && (
        <div className="mt-2 text-[8px] font-mono tracking-[0.2em] uppercase opacity-60">
          {subtext}
        </div>
      )}
    </div>
  );
}
