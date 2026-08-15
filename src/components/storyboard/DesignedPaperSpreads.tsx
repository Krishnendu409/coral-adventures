"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// SPREAD 01 DESIGNED PAPER CANVAS: COASTAL BOTANICAL & NAUTICAL EXPEDITION
// Warm ivory paper with delicate coconut leaf drawings, sea grass, and postal graticules
// ============================================================================
export function Spread01PaperCanvas({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative rounded-[2px] border border-[#E5DAC8] bg-[#FDFBF7] p-6 sm:p-10 shadow-[0_20px_50px_rgba(35,20,10,0.08)] overflow-hidden",
        className
      )}
    >
      {/* Decorative Botanical Border Linework */}
      <div className="absolute inset-2 sm:inset-4 border border-[#2D4A22]/20 pointer-events-none rounded-[1px]" />
      <div className="absolute inset-3 sm:inset-5 border border-dashed border-[#2D4A22]/15 pointer-events-none" />

      {/* Hand-drawn Botanical Watermark Background (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.09] mix-blend-multiply"
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Palm Fronds along Top Right & Bottom Left */}
        <g stroke="#2D4A22" strokeWidth="1.5">
          <path d="M 980 20 C 850 60, 720 180, 650 320" />
          <path d="M 880 70 Q 820 120, 750 140" />
          <path d="M 820 120 Q 760 180, 700 200" />
          <path d="M 750 180 Q 690 240, 650 280" />
          <path d="M 20 780 C 150 740, 280 620, 350 480" />
          <path d="M 120 730 Q 180 680, 250 660" />
          <path d="M 180 680 Q 240 620, 300 600" />
        </g>
        {/* Nautical Coordinates Watermark */}
        <text x="50" y="750" fill="#2D4A22" fontSize="14" fontFamily="monospace" letterSpacing="4">
          MALPE FORESHORE · 13°21′02″ N · 74°42′08″ E
        </text>
      </svg>

      {/* Content Container */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// SPREAD 02 DESIGNED PAPER CANVAS: ENERGETIC SEAFOAM & MARINE FLOW
// Seafoam & washed turquoise paper with wave contour diagrams and buoy symbols
// ============================================================================
export function Spread02PaperCanvas({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative rounded-[2px] border border-[#C4E5DF] bg-[#F2FAF8] p-6 sm:p-10 shadow-[0_20px_50px_rgba(15,35,40,0.08)] overflow-hidden",
        className
      )}
    >
      {/* Wave Pattern Decorative Border */}
      <div className="absolute inset-2 sm:inset-4 border border-[#0F766E]/20 pointer-events-none rounded-[1px]" />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08] mix-blend-multiply"
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hydrodynamic Wave Contours */}
        <g stroke="#0F766E" strokeWidth="1.8">
          <path d="M 0 150 Q 250 50, 500 150 T 1000 150" />
          <path d="M 0 280 Q 250 180, 500 280 T 1000 280" strokeDasharray="6 4" />
          <path d="M 0 450 Q 250 350, 500 450 T 1000 450" />
          <path d="M 0 650 Q 250 550, 500 650 T 1000 650" strokeDasharray="4 4" />
        </g>
        <text x="50" y="750" fill="#0F766E" fontSize="14" fontFamily="monospace" letterSpacing="4">
          INSHORE VELOCITY · 24 KNOTS · GERSTNER SWELL
        </text>
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// SPREAD 03 DESIGNED PAPER CANVAS: ARCHITECTURAL BLUEPRINT & YACHT DOSSIER
// Technical blueprint grid with navigation charts, vessel schematics, and double borders
// ============================================================================
export function Spread03PaperCanvas({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative rounded-[2px] border border-[#BFDBFE] bg-[#F5F8FF] p-6 sm:p-10 shadow-[0_20px_50px_rgba(20,35,65,0.09)] overflow-hidden",
        className
      )}
    >
      {/* Double Technical Border */}
      <div className="absolute inset-2 sm:inset-4 border-2 border-[#1E40AF]/20 pointer-events-none rounded-[1px]" />
      <div className="absolute inset-3 sm:inset-5 border border-[#1E40AF]/15 pointer-events-none" />

      {/* Blueprint Grid Watermark */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1E40AF 1px, transparent 1px), linear-gradient(to bottom, #1E40AF 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08] mix-blend-multiply"
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Catamaran Hull Schematics */}
        <g stroke="#1E40AF" strokeWidth="1.5">
          <ellipse cx="500" cy="400" rx="350" ry="180" strokeDasharray="8 4" />
          <line x1="150" y1="400" x2="850" y2="400" strokeWidth="2" />
          <line x1="500" y1="150" x2="500" y2="650" strokeWidth="1" strokeDasharray="4 4" />
        </g>
        <text x="50" y="750" fill="#1E40AF" fontSize="14" fontFamily="monospace" letterSpacing="4">
          FLAGSHIP 25.90M COMMERCIAL EXPEDITION CATAMARAN
        </text>
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// SPREAD 04 DESIGNED PAPER CANVAS: SAFFRON PARCHMENT & SPICE BOTANICALS
// Warm tan / saffron paper with cardamom, turmeric, and star anise spice illustrations
// ============================================================================
export function Spread04PaperCanvas({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative rounded-[2px] border border-[#EED7B8] bg-[#FDF6EC] p-6 sm:p-10 shadow-[0_20px_50px_rgba(45,25,10,0.08)] overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-2 sm:inset-4 border border-[#B45309]/20 pointer-events-none rounded-[1px]" />
      <div className="absolute inset-3 sm:inset-5 border border-dotted border-[#B45309]/25 pointer-events-none" />

      {/* Coffee/Spritz Ring Stain Watermark */}
      <div className="absolute top-12 right-16 w-32 h-32 rounded-full border-4 border-[#B45309]/10 pointer-events-none" />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08] mix-blend-multiply"
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Spice Botanicals (Star Anise & Pepper Vines) */}
        <g stroke="#B45309" strokeWidth="1.2">
          {/* Star Anise in Corner */}
          <circle cx="850" cy="150" r="15" />
          <path d="M 850 120 L 850 180 M 820 150 L 880 150 M 830 130 L 870 170 M 830 170 L 870 130" />
          {/* Pepper Vines */}
          <path d="M 50 200 C 150 220, 100 350, 200 400" strokeDasharray="4 2" />
        </g>
        <text x="50" y="750" fill="#B45309" fontSize="14" fontFamily="monospace" letterSpacing="4">
          KARAVALI GASTRONOMY · LIVE FRESH CATCH GRILL
        </text>
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// SPREAD 05 DESIGNED PAPER CANVAS: VOLCANIC SLATE & HEXAGONAL GEOLOGY
// Charcoal & deep green paper with geometric hexagonal basalt column linework
// ============================================================================
export function Spread05PaperCanvas({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative rounded-[2px] border border-[#CBD5E1] bg-[#F1F5F9] p-6 sm:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.09)] overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-2 sm:inset-4 border border-[#334155]/25 pointer-events-none rounded-[1px]" />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.09] mix-blend-multiply"
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hexagonal Basalt Column Grid */}
        <g stroke="#334155" strokeWidth="1.2">
          <polygon points="200,100 240,125 240,175 200,200 160,175 160,125" />
          <polygon points="280,100 320,125 320,175 280,200 240,175 240,125" />
          <polygon points="240,175 280,200 280,250 240,275 200,250 200,200" />
          <polygon points="320,175 360,200 360,250 320,275 280,250 280,200" />
          {/* Top Right Basalt Crystal Cluster */}
          <polygon points="800,200 840,225 840,275 800,300 760,275 760,225" />
          <polygon points="880,200 920,225 920,275 880,300 840,275 840,225" />
        </g>
        <text x="50" y="750" fill="#334155" fontSize="14" fontFamily="monospace" letterSpacing="4">
          ST. MARY'S ISLES · 88 MILLION YEARS · COLUMNAR BASALT
        </text>
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// SPREAD 06 DESIGNED PAPER CANVAS: TERRACOTTA OCHRE & SOLAR ARCS
// Warm sunset parchment with concentric solar arcs and 284° WNW bearing vectors
// ============================================================================
export function Spread06PaperCanvas({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative rounded-[2px] border border-[#FDBA74] bg-[#FFF7ED] p-6 sm:p-10 shadow-[0_20px_50px_rgba(50,20,5,0.09)] overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-2 sm:inset-4 border border-[#EA580C]/25 pointer-events-none rounded-[1px]" />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.09] mix-blend-multiply"
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Concentric Solar Arcs & Bearing Line */}
        <g stroke="#EA580C" strokeWidth="1.5">
          <circle cx="500" cy="500" r="150" strokeDasharray="4 3" />
          <circle cx="500" cy="500" r="280" strokeDasharray="8 4" />
          <circle cx="500" cy="500" r="420" strokeDasharray="12 6" />
          <line x1="500" y1="500" x2="100" y2="200" strokeWidth="2" />
        </g>
        <text x="50" y="750" fill="#EA580C" fontSize="14" fontFamily="monospace" letterSpacing="4">
          WESTBOUND SUNSET PAUSE · BEARING 284° WNW
        </text>
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// SPREAD 07 DESIGNED PAPER CANVAS: MIDNIGHT NAVY & CELESTIAL STAR CHART
// Deep navy paper with silver constellation lines, lunar phases, and navigation graticules
// ============================================================================
export function Spread07PaperCanvas({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative rounded-[2px] border border-[#334155] bg-[#0F172A] p-6 sm:p-10 shadow-[0_25px_60px_rgba(5,12,30,0.5)] overflow-hidden text-white",
        className
      )}
    >
      <div className="absolute inset-2 sm:inset-4 border border-[#38BDF8]/20 pointer-events-none rounded-[1px]" />
      <div className="absolute inset-3 sm:inset-5 border border-dashed border-[#38BDF8]/15 pointer-events-none" />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.14]"
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Constellation Star Lines & Moon Phases */}
        <g stroke="#38BDF8" strokeWidth="1">
          {/* Polaris & Ursa Major */}
          <circle cx="200" cy="200" r="4" fill="#38BDF8" />
          <circle cx="280" cy="220" r="3" fill="#38BDF8" />
          <circle cx="340" cy="270" r="3.5" fill="#38BDF8" />
          <circle cx="380" cy="350" r="4" fill="#38BDF8" />
          <circle cx="480" cy="360" r="3" fill="#38BDF8" />
          <circle cx="520" cy="430" r="3.5" fill="#38BDF8" />
          <circle cx="420" cy="440" r="3" fill="#38BDF8" />
          <polyline points="200,200 280,220 340,270 380,350 480,360 520,430 420,440 380,350" />
        </g>
        <text x="50" y="750" fill="#38BDF8" fontSize="14" fontFamily="monospace" letterSpacing="4">
          AFTER DARK EXPEDITION · MIDNIGHT SAPPHIRE SEA
        </text>
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// SPREAD 08 DESIGNED PAPER CANVAS: CELESTIAL CONSTELLATION & DRONE BLUEPRINT
// Midnight black-blue card with geometric 300-drone vector formation linework
// ============================================================================
export function Spread08PaperCanvas({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative rounded-[2px] border border-[#1E293B] bg-[#020617] p-6 sm:p-10 shadow-[0_30px_70px_rgba(2,6,23,0.6)] overflow-hidden text-white",
        className
      )}
    >
      <div className="absolute inset-2 sm:inset-4 border border-[#2DD4BF]/25 pointer-events-none rounded-[1px]" />
      <div className="absolute inset-3 sm:inset-5 border border-dotted border-[#2DD4BF]/20 pointer-events-none" />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.16]"
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 300-Drone Aerial Formation Grid */}
        <g stroke="#2DD4BF" strokeWidth="1">
          <circle cx="500" cy="350" r="180" strokeDasharray="3 3" />
          <circle cx="500" cy="350" r="280" strokeDasharray="6 3" />
          {/* Compass Rose Geometry */}
          <polygon points="500,100 520,330 500,350 480,330" fill="#2DD4BF" />
          <polygon points="500,600 520,370 500,350 480,370" fill="#2DD4BF" />
          <polygon points="750,350 520,370 500,350 520,330" fill="#2DD4BF" />
          <polygon points="250,350 480,370 500,350 480,330" fill="#2DD4BF" />
        </g>
        <text x="50" y="750" fill="#2DD4BF" fontSize="14" fontFamily="monospace" letterSpacing="4">
          300-DRONE CELESTIAL CLIMAX · THE NIGHT BELONGS TO THE SEA
        </text>
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
