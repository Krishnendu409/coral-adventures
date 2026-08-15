"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// BOLD VIBRANT PATTERNED PAPERS & CUT SHAPES
// Including lighter vibrant greens for Basalt Island and high-chroma coastal prints
// ============================================================================

export interface PatternedPaperSheetProps {
  variant:
    | "tealPolkaDot"
    | "coralPolkaDot"
    | "sandPolkaDot"
    | "navyStripes"
    | "coralStripes"
    | "tealStripes"
    | "seafoamGingham"
    | "terracottaGingham"
    | "navyGingham"
    | "tealWaves"
    | "creamWaves"
    | "coastalBotanical"
    | "nauticalGraticule"
    | "basaltHexagons"
    | "celestialStars"
    | "droneGeometry"
    | "pistachioBotanical"
    | "sageHexagons"
    | "emeraldGingham"
    | "radiantSunsetSunburst";
  shape?: "rectangle" | "scalloped" | "zigzag" | "wavy" | "postage" | "arched" | "foldedCorner";
  tabLabel?: string;
  tabColor?: "teal" | "coral" | "navy" | "turmeric" | "green" | "terracotta" | "sage" | "cyan";
  rotation?: number;
  className?: string;
  children?: React.ReactNode;
}

export function PatternedPaperSheet({
  variant,
  shape = "rectangle",
  tabLabel,
  tabColor = "teal",
  rotation = 0,
  className,
  children,
}: PatternedPaperSheetProps) {
  // Pattern Backgrounds & Vibrant SVG Overlays
  const patternStyles = {
    tealPolkaDot: {
      bg: "bg-[#00A896] text-[#F4EBDD] border-[#028073]",
      patternSvg: (
        <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotTealBold" width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="13" cy="13" r="4.5" fill="#F4EBDD" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotTealBold)" />
        </svg>
      ),
    },
    coralPolkaDot: {
      bg: "bg-[#F4A261] text-[#E76F51] border-[#E76F51]",
      patternSvg: (
        <svg className="absolute inset-0 w-full h-full opacity-45 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotCoralBold" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="5.5" fill="#E76F51" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotCoralBold)" />
        </svg>
      ),
    },
    sandPolkaDot: {
      bg: "bg-[#0077B6] text-[#FFE8D6] border-[#023E8A]",
      patternSvg: (
        <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotSandBold" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="14" cy="14" r="5" fill="#FFE8D6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotSandBold)" />
        </svg>
      ),
    },
    navyStripes: {
      bg: "bg-[#1D3557] text-[#F1FAEE] border-[#0F223D]",
      patternSvg: (
        <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stripesNavyBold" width="22" height="22" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="22" stroke="#A8DADC" strokeWidth="5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stripesNavyBold)" />
        </svg>
      ),
    },
    coralStripes: {
      bg: "bg-[#FFF3E0] text-[#FF5A36] border-[#FFCCBC]",
      patternSvg: (
        <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stripesCoralBold" width="20" height="20" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="20" stroke="#FF5A36" strokeWidth="4.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stripesCoralBold)" />
        </svg>
      ),
    },
    tealStripes: {
      bg: "bg-[#E0F2F1] text-[#00897B] border-[#B2DFDB]",
      patternSvg: (
        <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stripesTealBold" width="20" height="20" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="20" stroke="#00897B" strokeWidth="4.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stripesTealBold)" />
        </svg>
      ),
    },
    seafoamGingham: {
      bg: "bg-[#E0F7FA] text-[#00ACC1] border-[#B2EBF2]",
      patternSvg: (
        <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ginghamSeafoamBold" width="32" height="32" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="16" height="16" fill="#00ACC1" />
              <rect x="16" y="16" width="16" height="16" fill="#00ACC1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ginghamSeafoamBold)" />
        </svg>
      ),
    },
    terracottaGingham: {
      bg: "bg-[#FFE0B2] text-[#E65100] border-[#FFCC80]",
      patternSvg: (
        <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ginghamTerracottaBold" width="32" height="32" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="16" height="16" fill="#E65100" />
              <rect x="16" y="16" width="16" height="16" fill="#E65100" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ginghamTerracottaBold)" />
        </svg>
      ),
    },
    navyGingham: {
      bg: "bg-[#F1FAEE] text-[#1D3557] border-[#A8DADC]",
      patternSvg: (
        <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ginghamNavyBold" width="30" height="30" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="15" height="15" fill="#1D3557" />
              <rect x="15" y="15" width="15" height="15" fill="#1D3557" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ginghamNavyBold)" />
        </svg>
      ),
    },
    tealWaves: {
      bg: "bg-[#028090] text-[#F0FDF4] border-[#005F73]",
      patternSvg: (
        <svg className="absolute inset-0 w-full h-full opacity-45 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wavesTealBold" width="44" height="22" patternUnits="userSpaceOnUse">
              <path d="M 0 11 Q 11 0, 22 11 T 44 11" stroke="#00F5D4" strokeWidth="2.4" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wavesTealBold)" />
        </svg>
      ),
    },
    creamWaves: {
      bg: "bg-[#FFFBEB] text-[#028090] border-[#FDE68A]",
      patternSvg: (
        <svg className="absolute inset-0 w-full h-full opacity-50 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wavesCreamBold" width="44" height="22" patternUnits="userSpaceOnUse">
              <path d="M 0 11 Q 11 0, 22 11 T 44 11" stroke="#00A896" strokeWidth="2.2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wavesCreamBold)" />
        </svg>
      ),
    },
    coastalBotanical: {
      bg: "bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]",
      patternSvg: (
        <svg className="absolute inset-0 w-full h-full opacity-45 pointer-events-none" viewBox="0 0 500 500" fill="none">
          <g stroke="#16A34A" strokeWidth="2">
            <path d="M 460 30 C 370 80, 280 180, 240 290" />
            <path d="M 410 60 Q 350 110, 300 130" />
            <path d="M 360 110 Q 300 160, 260 180" />
            <path d="M 30 470 C 130 430, 230 330, 290 200" />
            <path d="M 90 430 Q 160 380, 210 360" />
          </g>
        </svg>
      ),
    },
    // LIGHT VIBRANT GREEN PATTERNS (PAGE 5 UPGRADE)
    pistachioBotanical: {
      bg: "bg-[#D8F3DC] text-[#1B4332] border-[#95D5B2]",
      patternSvg: (
        <svg className="absolute inset-0 w-full h-full opacity-55 pointer-events-none" viewBox="0 0 500 500" fill="none">
          <g stroke="#40916C" strokeWidth="2.2">
            <path d="M 460 30 C 380 90, 290 190, 250 300" />
            <path d="M 420 70 Q 360 120, 310 140" />
            <path d="M 370 120 Q 310 170, 270 190" />
            <path d="M 40 460 C 140 420, 240 320, 300 190" />
            <path d="M 100 420 Q 170 370, 220 350" />
          </g>
          <g fill="#74C69D" opacity="0.6">
            <circle cx="340" cy="160" r="10" />
            <circle cx="280" cy="210" r="12" />
            <circle cx="190" cy="380" r="11" />
          </g>
        </svg>
      ),
    },
    sageHexagons: {
      bg: "bg-[#B7E4C7] text-[#1B4332] border-[#74C69D]",
      patternSvg: (
        <svg className="absolute inset-0 w-full h-full opacity-50 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexSageBold" width="44" height="76" patternUnits="userSpaceOnUse">
              <path
                d="M 22 0 L 44 13 L 44 39 L 22 52 L 0 39 L 0 13 Z M 22 76 L 44 63 L 44 39 L 22 26 L 0 39 L 0 63 Z"
                stroke="#2D6A4F"
                strokeWidth="1.8"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexSageBold)" />
        </svg>
      ),
    },
    emeraldGingham: {
      bg: "bg-[#D8F3DC] text-[#2D6A4F] border-[#95D5B2]",
      patternSvg: (
        <svg className="absolute inset-0 w-full h-full opacity-45 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ginghamEmeraldBold" width="32" height="32" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="16" height="16" fill="#52B788" />
              <rect x="16" y="16" width="16" height="16" fill="#52B788" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ginghamEmeraldBold)" />
        </svg>
      ),
    },
    nauticalGraticule: {
      bg: "bg-[#1D3557] text-[#A8DADC] border-[#457B9D]",
      patternSvg: (
        <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="nauticalGridBold" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="none" stroke="#F1FAEE" strokeWidth="1.2" />
              <circle cx="20" cy="20" r="6" fill="none" stroke="#A8DADC" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#nauticalGridBold)" />
        </svg>
      ),
    },
    basaltHexagons: {
      bg: "bg-[#1B4332] text-[#D8F3DC] border-[#2D6A4F]",
      patternSvg: (
        <svg className="absolute inset-0 w-full h-full opacity-45 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexBasaltBold" width="44" height="76" patternUnits="userSpaceOnUse">
              <path
                d="M 22 0 L 44 13 L 44 39 L 22 52 L 0 39 L 0 13 Z M 22 76 L 44 63 L 44 39 L 22 26 L 0 39 L 0 63 Z"
                stroke="#74C69D"
                strokeWidth="1.6"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexBasaltBold)" />
        </svg>
      ),
    },
    radiantSunsetSunburst: {
      bg: "bg-[#D62828] text-[#FCBF49] border-[#F77F00]",
      patternSvg: (
        <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sunburstBold" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="14" fill="none" stroke="#FCBF49" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="25" y1="5" x2="25" y2="45" stroke="#FCBF49" strokeWidth="1.5" />
              <line x1="5" y1="25" x2="45" y2="25" stroke="#FCBF49" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sunburstBold)" />
        </svg>
      ),
    },
    celestialStars: {
      bg: "bg-[#0B132B] text-[#00B4D8] border-[#1C2541]",
      patternSvg: (
        <svg className="absolute inset-0 w-full h-full opacity-55 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="starsPatternBold" width="64" height="64" patternUnits="userSpaceOnUse">
              <circle cx="16" cy="16" r="3" fill="#00F5D4" />
              <circle cx="48" cy="48" r="2.5" fill="#48CAE4" />
              <circle cx="48" cy="16" r="1.5" fill="#F1FAEE" />
              <circle cx="16" cy="48" r="1.5" fill="#F1FAEE" />
              <line x1="16" y1="16" x2="48" y2="48" stroke="#00BBF9" strokeWidth="1" strokeDasharray="4 3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#starsPatternBold)" />
        </svg>
      ),
    },
    droneGeometry: {
      bg: "bg-[#03071E] text-[#00F5D4] border-[#0A192F]",
      patternSvg: (
        <svg className="absolute inset-0 w-full h-full opacity-55 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dronePatternBold" width="54" height="54" patternUnits="userSpaceOnUse">
              <circle cx="27" cy="27" r="15" stroke="#00F5D4" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
              <polygon points="27,6 33,24 27,27 21,24" fill="#00BBF9" />
              <polygon points="27,48 33,30 27,27 21,30" fill="#00BBF9" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dronePatternBold)" />
        </svg>
      ),
    },
  }[variant];

  // Tab Styles
  const tabStyles = {
    teal: "bg-[#00A896] text-white",
    coral: "bg-[#FF5A36] text-white",
    navy: "bg-[#1D3557] text-white",
    turmeric: "bg-[#FFB703] text-[#023047]",
    green: "bg-[#15803D] text-white",
    terracotta: "bg-[#D35400] text-white",
    sage: "bg-[#52B788] text-[#081C15]",
    cyan: "bg-[#00B4D8] text-[#03045E]",
  }[tabColor];

  // Cut-Paper Shapes (Scalloped, Zigzag, Wavy, Postage, Arched, Folded Corner)
  return (
    <div
      className={cn(
        "relative shadow-[0_18px_40px_rgba(10,25,20,0.18),_0_3px_10px_rgba(0,0,0,0.1)] transform-gpu select-none border overflow-hidden p-6 sm:p-8",
        patternStyles.bg,
        shape === "scalloped" && "rounded-t-[36px] rounded-b-md border-t-4",
        shape === "zigzag" && "border-dashed border-2",
        shape === "wavy" && "rounded-tr-[50px] rounded-bl-[50px] rounded-tl-sm rounded-br-sm",
        shape === "postage" && "border-4 border-dotted",
        shape === "arched" && "rounded-t-full pt-12",
        shape === "foldedCorner" && "rounded-tl-none",
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Attached Physical Index Tab */}
      {tabLabel && (
        <div
          className={cn(
            "absolute -top-3 left-6 px-3.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.25em] shadow-md rounded-[1px] border border-white/30 z-20",
            tabStyles
          )}
        >
          {tabLabel}
        </div>
      )}

      {/* Folded Corner Effect: Reveals Contrasting Paper Underneath */}
      {shape === "foldedCorner" && (
        <div className="absolute top-0 right-0 w-10 h-10 bg-[#FF5A36] border-b-2 border-l-2 border-[#FFE8D6] shadow-md pointer-events-none transform-gpu rotate-0" />
      )}

      {/* Pattern SVG Layer */}
      {patternStyles.patternSvg}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
