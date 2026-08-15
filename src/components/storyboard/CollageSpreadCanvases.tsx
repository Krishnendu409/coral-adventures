"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// 1. SPREAD 01: ARRIVAL MULTI-SHEET COLLAGE CANVAS
// Warm ivory base + overlapping seafoam sheet + botanical fronds + torn chart
// ============================================================================
export function ArrivalCollageSpread({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("relative rounded-[2px] p-4 sm:p-8 overflow-hidden", className)}>
      {/* 1. Base Large Warm Ivory Paper Sheet with Botanical Double Border */}
      <div className="absolute inset-0 bg-[#FDFBF7] border border-[#E8DFD0] shadow-[0_15px_40px_rgba(30,18,8,0.07)]">
        <div className="absolute inset-2 sm:inset-4 border border-[#2D4A22]/20 pointer-events-none" />
        <div className="absolute inset-3 sm:inset-5 border border-dashed border-[#2D4A22]/15 pointer-events-none" />
      </div>

      {/* 2. Large Overlapping Pale Seafoam Paper Block (Bottom Left) */}
      <div
        className="absolute -bottom-10 -left-10 w-[55%] h-[65%] bg-[#E6F4F1] border border-[#C4E5DF] shadow-[0_8px_25px_rgba(20,50,45,0.06)] transform-gpu -rotate-2 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='20' viewBox='0 0 40 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 10 0, 20 10 T 40 10' stroke='%230F766E' stroke-width='0.8' stroke-opacity='0.12' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "36px 18px",
        }}
      />

      {/* 3. Overlapping Warm Tan Torn Paper Scrap (Upper Right) */}
      <div
        className="absolute -top-6 -right-6 w-[45%] h-[50%] bg-[#F5EBE1] border border-[#E4D1BF] shadow-[0_8px_20px_rgba(40,20,10,0.05)] transform-gpu rotate-2 pointer-events-none"
      />

      {/* 4. Hand-drawn Coconut Palm & Coastal Botanical Artwork (SVGs) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.14] mix-blend-multiply"
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="#2D4A22" strokeWidth="1.5">
          <path d="M 950 40 C 820 90, 700 200, 620 350" />
          <path d="M 850 90 Q 790 140, 720 160" />
          <path d="M 790 140 Q 730 200, 670 220" />
          <path d="M 720 200 Q 660 260, 620 300" />
          <path d="M 40 760 C 170 720, 300 600, 370 460" />
          <path d="M 140 710 Q 200 660, 270 640" />
          <path d="M 200 660 Q 260 600, 320 580" />
        </g>
        <text x="50" y="760" fill="#2D4A22" fontSize="13" fontFamily="monospace" letterSpacing="4">
          MALPE FORESHORE · 13°21′02″ N · 74°42′08″ E
        </text>
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// 2. SPREAD 02: WATERSPORTS MULTI-SHEET COLLAGE CANVAS
// Seafoam base + marine blue band + dynamic wave vectors + tide markings
// ============================================================================
export function WatersportsCollageSpread({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("relative rounded-[2px] p-4 sm:p-8 overflow-hidden", className)}>
      {/* 1. Base Seafoam Sheet */}
      <div className="absolute inset-0 bg-[#F0F9F7] border border-[#C4E5DF] shadow-[0_15px_40px_rgba(15,35,40,0.07)]">
        <div className="absolute inset-2 sm:inset-4 border border-[#0F766E]/20 pointer-events-none" />
      </div>

      {/* 2. Large Dark Marine Blue Torn Sheet (Top Right to Bottom Right) */}
      <div
        className="absolute -top-10 -right-10 w-[50%] h-[75%] bg-[#0F2942] border border-[#1E3A8A] shadow-[0_10px_30px_rgba(10,25,50,0.12)] transform-gpu -rotate-1 pointer-events-none opacity-95"
      >
        <div className="absolute inset-3 border border-white/10" />
      </div>

      {/* 3. Soft Sandy Cream Paper Block (Bottom Left) */}
      <div
        className="absolute -bottom-8 -left-8 w-[45%] h-[45%] bg-[#FAF6EE] border border-[#E8DFD0] shadow-md transform-gpu rotate-2 pointer-events-none"
      />

      {/* 4. Dynamic Wave Flow Diagrams */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12] mix-blend-multiply"
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="#0F766E" strokeWidth="1.8">
          <path d="M 0 160 Q 250 60, 500 160 T 1000 160" />
          <path d="M 0 290 Q 250 190, 500 290 T 1000 290" strokeDasharray="6 4" />
          <path d="M 0 460 Q 250 360, 500 460 T 1000 460" />
          <path d="M 0 660 Q 250 560, 500 660 T 1000 660" strokeDasharray="4 4" />
        </g>
        <text x="50" y="760" fill="#0F766E" fontSize="13" fontFamily="monospace" letterSpacing="4">
          INSHORE VELOCITY · 24 KNOTS · GERSTNER SWELL
        </text>
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// 3. SPREAD 03: CATAMARAN MULTI-SHEET COLLAGE CANVAS
// Deep navy blueprint base + pale blue drafting sheet + teak brown swatch
// ============================================================================
export function CatamaranCollageSpread({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("relative rounded-[2px] p-4 sm:p-8 overflow-hidden", className)}>
      {/* 1. Base Cream Sheet */}
      <div className="absolute inset-0 bg-[#FAF7F0] border border-[#E2D5C3] shadow-[0_15px_40px_rgba(20,25,40,0.08)]" />

      {/* 2. Large Deep Navy Architectural Blueprint Block (Left Side) */}
      <div
        className="absolute -top-8 -left-8 w-[60%] h-[90%] bg-[#0F172A] border-2 border-[#1E40AF]/30 shadow-[0_12px_35px_rgba(10,20,40,0.18)] transform-gpu rotate-1 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1E3A8A 1px, transparent 1px), linear-gradient(to bottom, #1E3A8A 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div className="absolute inset-3 border border-white/15" />
      </div>

      {/* 3. Teak Brown Material Paper Swatch (Bottom Right) */}
      <div
        className="absolute -bottom-6 -right-6 w-[45%] h-[40%] bg-[#3D2514] border border-[#5E381E] shadow-lg transform-gpu -rotate-2 pointer-events-none"
      />

      {/* 4. Vessel Schematics & Compass Rose */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.14]"
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="#38BDF8" strokeWidth="1.5">
          <ellipse cx="400" cy="400" rx="280" ry="140" strokeDasharray="6 3" />
          <line x1="120" y1="400" x2="680" y2="400" strokeWidth="2" />
        </g>
        <text x="50" y="760" fill="#38BDF8" fontSize="13" fontFamily="monospace" letterSpacing="4">
          FLAGSHIP 25.90M COMMERCIAL EXPEDITION CATAMARAN
        </text>
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// 4. SPREAD 04: ONBOARD LIFE MULTI-SHEET COLLAGE CANVAS
// Warm saffron parchment + burnt amber block + spice illustrations + ring stains
// ============================================================================
export function OnboardCollageSpread({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("relative rounded-[2px] p-4 sm:p-8 overflow-hidden", className)}>
      {/* 1. Base Saffron Parchment */}
      <div className="absolute inset-0 bg-[#FDF6EC] border border-[#EED7B8] shadow-[0_15px_40px_rgba(45,25,10,0.08)]">
        <div className="absolute inset-2 sm:inset-4 border border-[#B45309]/20 pointer-events-none" />
      </div>

      {/* 2. Large Burnt Amber Sheet (Bottom Left to Center) */}
      <div
        className="absolute -bottom-8 -left-8 w-[55%] h-[60%] bg-[#7C2D12] border border-[#9A3412] shadow-xl transform-gpu -rotate-2 pointer-events-none opacity-90"
      />

      {/* 3. Dark Olive Botanical Card (Top Right) */}
      <div
        className="absolute -top-6 -right-6 w-[40%] h-[45%] bg-[#1E3A1A] border border-[#2D5A27] shadow-lg transform-gpu rotate-2 pointer-events-none opacity-85"
      />

      {/* 4. Coffee / Spritz Ring Stains */}
      <div className="absolute top-16 right-20 w-36 h-36 rounded-full border-4 border-[#B45309]/15 pointer-events-none" />
      <div className="absolute top-20 right-24 w-28 h-28 rounded-full border-2 border-dashed border-[#B45309]/10 pointer-events-none" />

      {/* 5. Spice Botanicals */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.14] mix-blend-multiply"
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="#B45309" strokeWidth="1.4">
          <circle cx="850" cy="150" r="16" />
          <path d="M 850 115 L 850 185 M 815 150 L 885 150 M 825 125 L 875 175 M 825 175 L 875 125" />
          <path d="M 50 200 C 150 220, 100 350, 200 400" strokeDasharray="4 2" />
        </g>
        <text x="50" y="760" fill="#B45309" fontSize="13" fontFamily="monospace" letterSpacing="4">
          KARAVALI GASTRONOMY · LIVE FRESH CATCH GRILL
        </text>
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// 5. SPREAD 05: BASALT ISLAND MULTI-SHEET COLLAGE CANVAS
// Volcanic slate + forest green paper block + hexagonal crystal geometry
// ============================================================================
export function BasaltCollageSpread({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("relative rounded-[2px] p-4 sm:p-8 overflow-hidden", className)}>
      {/* 1. Base Slate Sheet */}
      <div className="absolute inset-0 bg-[#F1F5F9] border border-[#CBD5E1] shadow-[0_15px_40px_rgba(15,23,42,0.09)]">
        <div className="absolute inset-2 sm:inset-4 border border-[#334155]/25 pointer-events-none" />
      </div>

      {/* 2. Large Charcoal Volcanic Paper Block (Right Side) */}
      <div
        className="absolute -top-8 -right-8 w-[55%] h-[85%] bg-[#0F172A] border border-[#1E293B] shadow-2xl transform-gpu -rotate-1 pointer-events-none"
      />

      {/* 3. Deep Forest Green Paper Strip (Bottom Left) */}
      <div
        className="absolute -bottom-6 -left-6 w-[45%] h-[40%] bg-[#14301A] border border-[#1E4A28] shadow-lg transform-gpu rotate-2 pointer-events-none"
      />

      {/* 4. Hexagonal Basalt Geometry */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.15] mix-blend-multiply"
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="#334155" strokeWidth="1.4">
          <polygon points="200,100 240,125 240,175 200,200 160,175 160,125" />
          <polygon points="280,100 320,125 320,175 280,200 240,175 240,125" />
          <polygon points="240,175 280,200 280,250 240,275 200,250 200,200" />
          <polygon points="320,175 360,200 360,250 320,275 280,250 280,200" />
          <polygon points="800,200 840,225 840,275 800,300 760,275 760,225" />
        </g>
        <text x="50" y="760" fill="#334155" fontSize="13" fontFamily="monospace" letterSpacing="4">
          ST. MARY'S ISLES · 88 MILLION YEARS · COLUMNAR BASALT
        </text>
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// 6. SPREAD 06: SUNSET PAUSE MULTI-SHEET COLLAGE CANVAS
// Terracotta ochre + golden cream block + concentric solar arcs + 284° WNW vector
// ============================================================================
export function SunsetCollageSpread({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("relative rounded-[2px] p-4 sm:p-8 overflow-hidden", className)}>
      {/* 1. Base Sunset Cream */}
      <div className="absolute inset-0 bg-[#FFF7ED] border border-[#FDBA74] shadow-[0_15px_40px_rgba(50,20,5,0.09)]">
        <div className="absolute inset-2 sm:inset-4 border border-[#EA580C]/25 pointer-events-none" />
      </div>

      {/* 2. Large Terracotta Paper Block (Left Side) */}
      <div
        className="absolute -top-8 -left-8 w-[55%] h-[80%] bg-[#7C2D12] border border-[#9A3412] shadow-xl transform-gpu rotate-1 pointer-events-none opacity-90"
      />

      {/* 3. Golden Ochre Paper Block (Bottom Right) */}
      <div
        className="absolute -bottom-6 -right-6 w-[50%] h-[50%] bg-[#D97706] border border-[#B45309] shadow-lg transform-gpu -rotate-2 pointer-events-none opacity-85"
      />

      {/* 4. Concentric Solar Arcs & Bearing Line */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.15] mix-blend-multiply"
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="#EA580C" strokeWidth="1.6">
          <circle cx="500" cy="500" r="160" strokeDasharray="4 3" />
          <circle cx="500" cy="500" r="300" strokeDasharray="8 4" />
          <line x1="500" y1="500" x2="100" y2="200" strokeWidth="2" />
        </g>
        <text x="50" y="760" fill="#EA580C" fontSize="13" fontFamily="monospace" letterSpacing="4">
          WESTBOUND SUNSET PAUSE · BEARING 284° WNW
        </text>
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// 7. SPREAD 07: NIGHT EXPLORATION MULTI-SHEET COLLAGE CANVAS
// Midnight navy archival card + silver constellation star chart + lunar phases
// ============================================================================
export function NightCollageSpread({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("relative rounded-[2px] p-4 sm:p-8 overflow-hidden text-white", className)}>
      {/* 1. Base Midnight Navy */}
      <div className="absolute inset-0 bg-[#0F172A] border border-[#334155] shadow-[0_25px_60px_rgba(5,12,30,0.5)]">
        <div className="absolute inset-2 sm:inset-4 border border-[#38BDF8]/25 pointer-events-none" />
      </div>

      {/* 2. Deep Charcoal Slate Sheet (Left Side) */}
      <div
        className="absolute -top-8 -left-8 w-[55%] h-[85%] bg-[#020617] border border-[#1E293B] shadow-2xl transform-gpu -rotate-1 pointer-events-none"
      />

      {/* 3. Cyan Starlight Wash Paper Block (Bottom Right) */}
      <div
        className="absolute -bottom-6 -right-6 w-[45%] h-[45%] bg-[#075985] border border-[#0284C7] shadow-lg transform-gpu rotate-2 pointer-events-none opacity-50"
      />

      {/* 4. Constellations (Polaris & Ursa Major) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.2]"
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="#38BDF8" strokeWidth="1.2">
          <circle cx="200" cy="200" r="4.5" fill="#38BDF8" />
          <circle cx="280" cy="220" r="3.5" fill="#38BDF8" />
          <circle cx="340" cy="270" r="4" fill="#38BDF8" />
          <circle cx="380" cy="350" r="4.5" fill="#38BDF8" />
          <circle cx="480" cy="360" r="3.5" fill="#38BDF8" />
          <circle cx="520" cy="430" r="4" fill="#38BDF8" />
          <circle cx="420" cy="440" r="3.5" fill="#38BDF8" />
          <polyline points="200,200 280,220 340,270 380,350 480,360 520,430 420,440 380,350" />
        </g>
        <text x="50" y="760" fill="#38BDF8" fontSize="13" fontFamily="monospace" letterSpacing="4">
          AFTER DARK EXPEDITION · MIDNIGHT SAPPHIRE SEA
        </text>
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// 8. SPREAD 08: DRONE FINALE MULTI-SHEET COLLAGE CANVAS
// Midnight black-blue card + 300-drone constellation blueprint grid
// ============================================================================
export function DroneCollageSpread({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("relative rounded-[2px] p-4 sm:p-8 overflow-hidden text-white", className)}>
      {/* 1. Base Midnight Black-Blue */}
      <div className="absolute inset-0 bg-[#020617] border border-[#1E293B] shadow-[0_30px_70px_rgba(2,6,23,0.6)]">
        <div className="absolute inset-2 sm:inset-4 border border-[#2DD4BF]/30 pointer-events-none" />
      </div>

      {/* 2. Deep Royal Indigo Paper Block (Center Top) */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[70%] h-[60%] bg-[#0F172A] border border-[#2DD4BF]/20 shadow-2xl transform-gpu pointer-events-none"
      />

      {/* 3. Geometric 300-Drone Aerial Formation Grid */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.22]"
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="#2DD4BF" strokeWidth="1.2">
          <circle cx="500" cy="350" r="180" strokeDasharray="3 3" />
          <circle cx="500" cy="350" r="280" strokeDasharray="6 3" />
          <polygon points="500,100 520,330 500,350 480,330" fill="#2DD4BF" />
          <polygon points="500,600 520,370 500,350 480,370" fill="#2DD4BF" />
          <polygon points="750,350 520,370 500,350 520,330" fill="#2DD4BF" />
          <polygon points="250,350 480,370 500,350 480,330" fill="#2DD4BF" />
        </g>
        <text x="50" y="760" fill="#2DD4BF" fontSize="13" fontFamily="monospace" letterSpacing="4">
          300-DRONE CELESTIAL CLIMAX · THE NIGHT BELONGS TO THE SEA
        </text>
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
