"use client";

import React from "react";

export function BeachShorelineCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Full-Width Base Sand & Ocean Diurnal Gradient */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `linear-gradient(
            to bottom,
            #063B44 0%,       /* Top 0-140px: Deep Arabian Sea turquoise water across entire width */
            #0D9488 2.2%,     /* Shallow turquoise water swash */
            #A69070 3.8%,     /* Wet reflective sand wash line */
            #D8C9B0 5.5%,     /* Damp transition sand with wind ripples */
            #F6EBDE 10%,      /* 01 Arrival: Warm golden dry sand */
            #EBDAB8 20%,      /* 02 Watersports: High sun golden sand */
            #D8C49E 34%,      /* 03 Catamaran: Ocean breeze golden sand */
            #CAA97B 48%,      /* 04 Onboard: Afternoon warm amber sand */
            #9A6B42 62%,      /* 05 Basalt Island: Laterite & volcanic rock sand */
            #7A3F1E 74%,      /* 06 Sunset: Molten gold fiery sand */
            #151F33 84%,      /* 07 Night: Deep midnight blue sand */
            #060B14 94%,      /* 08 Drone Show: Obsidian ocean night */
            #02050A 100%
          )`,
        }}
      />

      {/* 2. Full-Width Ocean Water & Foaming Shoreline Swash at Top (Z=0 to 380px) */}
      <div className="absolute top-0 left-0 right-0 h-[380px] pointer-events-none z-2">
        {/* Full-width water surface gradient with wave depth */}
        <div 
          className="absolute inset-0 w-full h-[220px]"
          style={{
            background: "linear-gradient(180deg, #043038 0%, #096874 35%, #14B8A6 75%, transparent 100%)",
          }}
        />

        {/* SVG Full-Width Foaming Surf Swash & Wet Sand Waves */}
        <svg viewBox="0 0 1440 380" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full opacity-95" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Deep Turquoise Water Body with Swell Curves */}
          <path
            d="M 0 0 L 1440 0 L 1440 160 Q 1180 190 920 150 T 460 175 Q 220 195 0 165 Z"
            fill="#0D8997"
            opacity="0.9"
          />

          {/* Wet Reflective Sand Glisten Layer */}
          <path
            d="M 0 0 L 1440 0 L 1440 240 Q 1200 270 940 230 T 480 255 Q 240 275 0 245 Z"
            fill="#AFA089"
            opacity="0.65"
          />

          {/* Main Foaming Surf Wave 1 */}
          <path
            d="M 0 170 Q 240 205 480 185 T 940 205 Q 1200 170 1440 200"
            stroke="#FFFFFF"
            strokeWidth="18"
            strokeLinecap="round"
            opacity="0.88"
            filter="blur(3px)"
          />

          {/* Sharp Wave Crest Foam Line */}
          <path
            d="M 0 180 Q 235 212 485 192 T 945 212 Q 1205 178 1440 208"
            stroke="#F0FDFA"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.95"
          />

          {/* Effervescent White Sea Foam Bubbles */}
          <path
            d="M 0 195 Q 230 225 470 205 T 930 225 Q 1190 195 1440 220"
            stroke="#FFFFFF"
            strokeWidth="4.5"
            strokeDasharray="25 15 40 10 15 20"
            strokeLinecap="round"
            opacity="0.98"
          />

          {/* Thin Swash Wash Limit onto Damp Sand */}
          <path
            d="M 0 245 Q 240 275 480 255 T 940 275 Q 1200 240 1440 268"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            strokeDasharray="18 12 35 15"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Washed-Up Dark Seaweed Strands along Shoreline (Z=260px) */}
          <path d="M 120 250 Q 140 255 165 248 T 210 254" stroke="#253518" strokeWidth="2.5" opacity="0.8" />
          <path d="M 680 265 Q 705 272 730 266 T 770 270" stroke="#2A3B1C" strokeWidth="3" opacity="0.75" />
          <path d="M 1120 252 Q 1145 260 1175 255 T 1220 258" stroke="#253518" strokeWidth="2.5" opacity="0.8" />
        </svg>
      </div>

      {/* 3. Procedural SVG Sand Micro-Grain Noise */}
      <svg className="absolute inset-0 w-full h-full opacity-45 mix-blend-multiply pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <filter id="coastalSandGrainsUltra">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0.33 0 0 0 0.55  0 0.33 0 0 0.48  0 0 0.33 0 0.38  0 0 0 0.5 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#coastalSandGrainsUltra)" />
      </svg>

      {/* 4. Rich Physical Debris, Footprints & Natural Coastal Artifacts on Sand */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        {/* Footprint Trail Walking from Shoreline Inland (Z=380 to 1500px) */}
        {/* Adult Left Footprint */}
        <g opacity="0.22" fill="#52361D" transform="translate(310, 420) rotate(-24)">
          <ellipse cx="0" cy="0" rx="14" ry="30" />
          <ellipse cx="2" cy="-36" rx="5" ry="7" />
          <ellipse cx="10" cy="-32" rx="4" ry="6" />
          <ellipse cx="15" cy="-26" rx="3.5" ry="5" />
        </g>
        {/* Adult Right Footprint */}
        <g opacity="0.2" fill="#52361D" transform="translate(370, 640) rotate(-16)">
          <ellipse cx="0" cy="0" rx="14" ry="30" />
          <ellipse cx="-2" cy="-36" rx="5" ry="7" />
          <ellipse cx="-10" cy="-32" rx="4" ry="6" />
          <ellipse cx="-15" cy="-26" rx="3.5" ry="5" />
        </g>
        {/* Barefoot Child Footprint */}
        <g opacity="0.18" fill="#52361D" transform="translate(430, 780) rotate(-28) scale(0.65)">
          <ellipse cx="0" cy="0" rx="12" ry="24" />
          <ellipse cx="2" cy="-28" rx="4" ry="5.5" />
          <ellipse cx="8" cy="-25" rx="3.5" ry="4.5" />
        </g>
        {/* Dragged Footprint */}
        <g opacity="0.17" fill="#52361D" transform="translate(440, 920) rotate(-20)">
          <ellipse cx="0" cy="0" rx="14" ry="32" />
          <path d="M-6 10 L-2 40 L6 38 L4 10 Z" opacity="0.5" />
          <ellipse cx="2" cy="-36" rx="5" ry="7" />
        </g>

        {/* Subtle Handmade Sand Turtle Sculpture near Arrival (Z=740px) */}
        <g transform="translate(160, 740) rotate(-18) scale(0.85)" opacity="0.32" fill="#422915">
          <ellipse cx="0" cy="0" rx="28" ry="36" />
          <ellipse cx="0" cy="-42" rx="10" ry="12" />
          <ellipse cx="-28" cy="-20" rx="8" ry="16" transform="rotate(-30 -28 -20)" />
          <ellipse cx="28" cy="-20" rx="8" ry="16" transform="rotate(30 28 -20)" />
          <ellipse cx="-24" cy="24" rx="6" ry="12" transform="rotate(-40 -24 24)" />
          <ellipse cx="24" cy="24" rx="6" ry="12" transform="rotate(40 24 24)" />
        </g>

        {/* Half-Buried Coconut Husk near Arrival (Z=890px) */}
        <g transform="translate(840, 890) rotate(35) scale(0.95)" opacity="0.8">
          <path d="M0 0 C18 -12 40 6 35 30 C30 52 6 46 0 0 Z" fill="#4D2E17" />
          <path d="M6 10 C20 2 32 15 28 28" stroke="#7A4E2B" strokeWidth="2" fill="none" />
          <path d="M10 18 C20 12 28 24 24 32" stroke="#7A4E2B" strokeWidth="2" fill="none" />
        </g>

        {/* Weathered Driftwood Stick near Watersports (Z=2380px) */}
        <g transform="translate(150, 2380) rotate(-38) scale(1.1)" opacity="0.75">
          <path d="M0 0 L160 14 Q165 18 160 22 L0 10 Q-6 5 0 0 Z" fill="#756756" />
          <line x1="18" y1="6" x2="145" y2="16" stroke="#524639" strokeWidth="1.5" opacity="0.7" />
          <line x1="40" y1="8" x2="110" y2="14" stroke="#524639" strokeWidth="1.5" opacity="0.7" />
        </g>

        {/* Tropical Coastal Dune Grass Cluster (Z=3780px) */}
        <g transform="translate(1260, 3780) rotate(14) scale(1.15)" opacity="0.75">
          <path d="M0 45 Q-18 12 -42 -22 Q-18 18 0 45" fill="#557032" />
          <path d="M0 45 Q-6 6 -18 -40 Q-2 12 0 45" fill="#445D25" />
          <path d="M0 45 Q12 10 24 -45 Q6 14 0 45" fill="#62803B" />
          <path d="M0 45 Q22 18 50 -18 Q24 20 0 45" fill="#4D682B" />
        </g>

        {/* Palm Frond Shadow cast diagonally across sand (Z=5150px) */}
        <g transform="translate(50, 5150) rotate(-32) scale(1.6)" opacity="0.14" fill="#18240D">
          <path d="M0 0 L240 48 C215 72 165 95 0 0 Z" />
          <line x1="0" y1="0" x2="260" y2="52" stroke="#18240D" strokeWidth="5" />
          <path d="M45 10 L70 42 M95 20 L130 60 M145 30 L185 78 M190 40 L240 98" stroke="#18240D" strokeWidth="3.5" />
        </g>

        {/* Hexagonal Basalt Column Shards near Island (Z=6680px) */}
        <polygon points="175,6680 210,6645 245,6695 218,6732 170,6708" fill="#1C1A1D" opacity="0.85" />
        <polygon points="250,6690 288,6665 310,6702 278,6725" fill="#2E2A30" opacity="0.8" />
        <polygon points="315,6710 335,6695 348,6720 330,6735" fill="#443F47" opacity="0.75" />
        <ellipse cx="295" cy="6745" rx="10" ry="6" fill="#4B4550" opacity="0.65" />

        {/* Raking Sunset Shadows on Sand (Z=7950px) */}
        <ellipse cx="980" cy="7950" rx="130" ry="20" fill="#3D1D09" opacity="0.3" transform="rotate(12 980 7950)" />
      </svg>
    </div>
  );
}
