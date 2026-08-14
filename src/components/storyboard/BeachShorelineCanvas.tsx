"use client";

import React from "react";

export function BeachShorelineCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Base Diurnal Sand & Shoreline Gradient */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `linear-gradient(
            to bottom,
            #E8DFC8 0%,       /* Top 01: Shoreline wet/damp sand */
            #F2E7D0 8%,       /* Morning dry golden sand */
            #EADBBE 20%,      /* 02 Watersports: Turquoise reflected beach */
            #DFCEAD 35%,      /* 03 Catamaran: High sun golden sand */
            #D4BE98 48%,      /* 04 Onboard: Warm afternoon sand */
            #B88E5E 62%,      /* 05 Basalt Island: Low raking golden sand */
            #8A562B 74%,      /* 06 Sunset: Molten gold & fiery sand */
            #182338 84%,      /* 07 Night: Blue hour to midnight sand */
            #07101C 94%,      /* 08 Drone Show: Obsidian ocean night */
            #03070E 100%
          )`,
        }}
      />

      {/* 2. Procedural SVG Sand Micro-Grain Noise */}
      <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-multiply" xmlns="http://www.w3.org/2000/svg">
        <filter id="coastalSandGrains">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0.33 0 0 0 0.55  0 0.33 0 0 0.48  0 0 0.33 0 0.38  0 0 0 0.5 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#coastalSandGrains)" />
      </svg>

      {/* 3. Shoreline Water Swash & Ocean Foam at Top-Left (Z=0 to 1200px) */}
      <div className="absolute -top-12 -left-20 w-[650px] h-[750px] pointer-events-none">
        {/* Shallow Turquoise Ocean Water Layer */}
        <div 
          className="absolute inset-0 rounded-[45%_55%_65%_35%/40%_60%_40%_60%] opacity-45 blur-md"
          style={{
            background: "radial-gradient(ellipse at top left, #14B8A6 0%, #0D9488 45%, #065E6B 75%, transparent 100%)",
          }}
        />

        {/* Wet Sand Sheen & Wave Edge Foam (SVG Shoreline) */}
        <svg viewBox="0 0 600 700" className="w-full h-full opacity-65" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Wet Sand Glisten Boundary */}
          <path
            d="M -50 0 Q 180 120 280 260 T 420 540 Q 480 660 520 800 L -50 800 Z"
            fill="#C9B89D"
            opacity="0.6"
          />
          {/* Swashing Wave Crest 1 */}
          <path
            d="M -50 40 Q 160 150 250 290 T 380 570 Q 440 680 480 800"
            stroke="#FFFFFF"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.85"
            filter="blur(3px)"
          />
          {/* White Sea Foam Bubbles 2 */}
          <path
            d="M -50 20 Q 140 130 230 270 T 360 550 Q 420 660 460 800"
            stroke="#E0F2FE"
            strokeWidth="6"
            strokeDasharray="12 8 20 6"
            strokeLinecap="round"
            opacity="0.9"
          />
          {/* Thin Effervescent Foam Swash Boundary */}
          <path
            d="M -50 65 Q 175 165 265 310 T 395 590 Q 455 700 495 800"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.95"
          />
        </svg>
      </div>

      {/* 4. Natural Beach Imperfections: Wind Ripples, Footprints, Shells & Coastal Plants */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        {/* Footprint Trail Walking from Shoreline Inland (Z=400 to 1400px) */}
        <g opacity="0.2" fill="#6E5034" transform="translate(340, 520) rotate(-24)">
          <ellipse cx="0" cy="0" rx="13" ry="28" />
          <ellipse cx="2" cy="-34" rx="4.5" ry="6" />
          <ellipse cx="9" cy="-30" rx="3.5" ry="5" />
          <ellipse cx="14" cy="-24" rx="3" ry="4" />
        </g>
        <g opacity="0.18" fill="#6E5034" transform="translate(390, 720) rotate(-16)">
          <ellipse cx="0" cy="0" rx="13" ry="28" />
          <ellipse cx="-2" cy="-34" rx="4.5" ry="6" />
          <ellipse cx="-9" cy="-30" rx="3.5" ry="5" />
          <ellipse cx="-14" cy="-24" rx="3" ry="4" />
        </g>
        <g opacity="0.16" fill="#6E5034" transform="translate(450, 930) rotate(-22)">
          <ellipse cx="0" cy="0" rx="13" ry="28" />
          <ellipse cx="2" cy="-34" rx="4.5" ry="6" />
        </g>

        {/* Small Coconut Husk Fragment near Arrival (Z=880px) */}
        <g transform="translate(780, 880) rotate(35) scale(0.85)" opacity="0.75">
          <path d="M0 0 C15 -10 35 5 30 25 C25 45 5 40 0 0 Z" fill="#5A3820" className="drop-shadow-md" />
          <path d="M5 8 C18 0 28 12 24 24" stroke="#8D5B38" strokeWidth="1.5" fill="none" />
          <path d="M8 15 C18 10 24 20 20 28" stroke="#8D5B38" strokeWidth="1" fill="none" />
        </g>

        {/* Driftwood Stick Fragment near Watersports (Z=2400px) */}
        <g transform="translate(180, 2420) rotate(-42) scale(0.9)" opacity="0.7">
          <path d="M0 0 L140 12 Q145 16 140 20 L0 8 Q-5 4 0 0 Z" fill="#8C7D6B" className="drop-shadow-md" />
          <line x1="15" y1="5" x2="125" y2="14" stroke="#63574A" strokeWidth="1" opacity="0.6" />
          <line x1="35" y1="7" x2="95" y2="12" stroke="#63574A" strokeWidth="1" opacity="0.6" />
        </g>

        {/* Coastal Dune Grass Cluster appearing inland (Z=3800px) */}
        <g transform="translate(1220, 3850) rotate(12) scale(0.9)" opacity="0.65">
          <path d="M0 40 Q-15 10 -35 -20 Q-15 15 0 40" fill="#607D3B" />
          <path d="M0 40 Q-5 5 -15 -35 Q-2 10 0 40" fill="#4D682D" />
          <path d="M0 40 Q10 8 20 -40 Q5 12 0 40" fill="#6B8A42" />
          <path d="M0 40 Q18 15 42 -15 Q20 18 0 40" fill="#557332" />
        </g>

        {/* Palm Leaf Shadow cast across sand (Z=5200px) */}
        <g transform="translate(80, 5200) rotate(-35) scale(1.4)" opacity="0.12" fill="#1E2D12">
          <path d="M0 0 L200 40 C180 60 140 80 0 0 Z" />
          <line x1="0" y1="0" x2="220" y2="44" stroke="#1E2D12" strokeWidth="4" />
          <path d="M40 8 L60 35 M80 16 L110 50 M120 24 L155 65 M160 32 L200 80" stroke="#1E2D12" strokeWidth="3" />
        </g>

        {/* Basalt Rock Shards & Coastal Gravel near Island (Z=6700px) */}
        <polygon points="190,6720 220,6690 250,6735 225,6765 185,6745" fill="#242124" opacity="0.75" className="drop-shadow-md" />
        <polygon points="255,6730 285,6710 305,6740 275,6760" fill="#383338" opacity="0.7" />
        <ellipse cx="270" cy="6775" rx="8" ry="5" fill="#504A50" opacity="0.6" />
      </svg>
    </div>
  );
}
