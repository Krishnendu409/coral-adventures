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

      {/* 3. High-Performance Sand Grain Pattern (Tiled 40x40, zero GPU math) */}
      <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-multiply pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="coastalSandPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="8" r="0.75" fill="#5C4033" opacity="0.6" />
            <circle cx="15" cy="22" r="0.6" fill="#3D2817" opacity="0.5" />
            <circle cx="28" cy="12" r="0.8" fill="#5C4033" opacity="0.7" />
            <circle cx="35" cy="32" r="0.65" fill="#3D2817" opacity="0.6" />
            <circle cx="8" cy="35" r="0.7" fill="#5C4033" opacity="0.5" />
            <circle cx="22" cy="4" r="0.5" fill="#3D2817" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#coastalSandPattern)" />
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

        {/* --- NEW ADDITIONS --- */}
        
        {/* A. MORE FOOTPRINT TRAILS */}
        {/* Second trail from Z=2000 to Z=4000 (diagonal) */}
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={`trail2-${i}`} opacity="0.15" fill="#52361D" transform={`translate(${600 + i * 30 + (i % 2 === 0 ? 0 : 60)}, ${2000 + i * 180}) rotate(${i % 2 === 0 ? -15 : 10})`}>
            <ellipse cx="0" cy="0" rx="14" ry="30" />
            <ellipse cx={i % 2 === 0 ? "2" : "-2"} cy="-36" rx="5" ry="7" />
            <ellipse cx={i % 2 === 0 ? "10" : "-10"} cy="-32" rx="4" ry="6" />
            <ellipse cx={i % 2 === 0 ? "15" : "-15"} cy="-26" rx="3.5" ry="5" />
          </g>
        ))}

        {/* Third trail near Z=5500 to Z=6500 */}
        {Array.from({ length: 6 }).map((_, i) => (
          <g key={`trail3-${i}`} opacity="0.2" fill="#3A2415" transform={`translate(${900 - i * 20 + (i % 2 === 0 ? 0 : 60)}, ${5500 + i * 180}) rotate(${i % 2 === 0 ? -25 : -5})`}>
            <ellipse cx="0" cy="0" rx="14" ry="30" />
            <ellipse cx={i % 2 === 0 ? "2" : "-2"} cy="-36" rx="5" ry="7" />
            <ellipse cx={i % 2 === 0 ? "10" : "-10"} cy="-32" rx="4" ry="6" />
            <ellipse cx={i % 2 === 0 ? "15" : "-15"} cy="-26" rx="3.5" ry="5" />
          </g>
        ))}

        {/* Barefoot prints near Z=2800 */}
        <g opacity="0.18" fill="#52361D" transform="translate(300, 2800) rotate(45) scale(0.65)">
          <ellipse cx="0" cy="0" rx="12" ry="24" />
          <ellipse cx="2" cy="-28" rx="4" ry="5.5" />
          <ellipse cx="8" cy="-25" rx="3.5" ry="4.5" />
        </g>
        <g opacity="0.18" fill="#52361D" transform="translate(350, 2850) rotate(35) scale(0.65)">
          <ellipse cx="0" cy="0" rx="12" ry="24" />
          <ellipse cx="-2" cy="-28" rx="4" ry="5.5" />
          <ellipse cx="-8" cy="-25" rx="3.5" ry="4.5" />
        </g>

        {/* B. SAND RIPPLE PATTERNS */}
        <path d="M100 2000 Q 300 1980 500 2020 T 900 1980 T 1300 2020" fill="none" stroke="#A69070" strokeWidth="1.5" opacity="0.15" />
        <path d="M150 2030 Q 350 2010 550 2050 T 950 2010 T 1350 2050" fill="none" stroke="#A69070" strokeWidth="1.5" opacity="0.15" />
        
        <path d="M200 4400 Q 400 4370 600 4420 T 1000 4370 T 1400 4420" fill="none" stroke="#8C7A5E" strokeWidth="2" opacity="0.15" />
        <path d="M250 4440 Q 450 4410 650 4460 T 1050 4410 T 1450 4460" fill="none" stroke="#8C7A5E" strokeWidth="2" opacity="0.15" />

        <path d="M50 7400 Q 250 7360 450 7410 T 850 7360 T 1250 7410" fill="none" stroke="#3D2010" strokeWidth="2" opacity="0.15" />
        <path d="M100 7450 Q 300 7410 500 7460 T 900 7410 T 1300 7460" fill="none" stroke="#3D2010" strokeWidth="2" opacity="0.15" />

        {/* C. MORE DRIFTWOOD */}
        {/* Z=3200 */}
        <g transform="translate(1100, 3200) rotate(60) scale(1.2)" opacity="0.75">
          <path d="M0 0 L140 10 Q145 15 140 20 L0 12 Q-5 5 0 0 Z" fill="#6B5945" />
          <line x1="15" y1="5" x2="125" y2="15" stroke="#4A3C2D" strokeWidth="1.5" opacity="0.7" />
        </g>
        {/* Z=5800 longer */}
        <g transform="translate(300, 5800) rotate(-15) scale(1.6)" opacity="0.8">
          <path d="M0 0 L200 15 Q210 20 200 25 L0 12 Q-8 5 0 0 Z" fill="#4A3B2C" />
          <line x1="20" y1="6" x2="180" y2="18" stroke="#2C231A" strokeWidth="1.5" opacity="0.8" />
          <line x1="40" y1="9" x2="150" y2="20" stroke="#2C231A" strokeWidth="1.5" opacity="0.8" />
        </g>
        {/* Z=8500 dark */}
        <g transform="translate(800, 8500) rotate(40) scale(1.1)" opacity="0.85">
          <path d="M0 0 L120 12 Q125 18 120 22 L0 14 Q-5 6 0 0 Z" fill="#251C17" />
          <line x1="10" y1="5" x2="105" y2="16" stroke="#100C09" strokeWidth="1" opacity="0.8" />
        </g>

        {/* D. MORE VEGETATION */}
        {/* Z=1600 */}
        <g transform="translate(100, 1600) rotate(-20) scale(0.9)" opacity="0.7">
          <path d="M0 40 Q-15 10 -35 -20 Q-15 15 0 40" fill="#5A7535" />
          <path d="M0 40 Q5 5 15 -35 Q5 12 0 40" fill="#486025" />
          <path d="M0 40 Q20 15 45 -15 Q20 20 0 40" fill="#688540" />
        </g>
        {/* Z=4800 */}
        <g transform="translate(1300, 4800) rotate(35) scale(1.2)" opacity="0.75">
          <path d="M0 45 Q-20 15 -45 -25 Q-20 20 0 45" fill="#4B632C" />
          <path d="M0 45 Q-5 5 -15 -45 Q0 15 0 45" fill="#3A4D20" />
          <path d="M0 45 Q15 10 30 -40 Q10 15 0 45" fill="#587532" />
        </g>
        {/* Z=6200 dried */}
        <g transform="translate(200, 6200) rotate(-10) scale(1.1)" opacity="0.8">
          <path d="M0 45 Q-15 15 -35 -20 Q-15 20 0 45" fill="#8B7B50" />
          <path d="M0 45 Q-5 10 -15 -35 Q0 15 0 45" fill="#75653C" />
          <path d="M0 45 Q15 15 35 -15 Q15 20 0 45" fill="#9C8B5C" />
        </g>

        {/* E. TINY SCATTERED PEBBLES */}
        <ellipse cx="250" cy="1200" rx="6" ry="4" fill="#A69070" opacity="0.8" transform="rotate(25 250 1200)" />
        <ellipse cx="1150" cy="1800" rx="7" ry="5" fill="#8C7A5E" opacity="0.8" transform="rotate(-15 1150 1800)" />
        <ellipse cx="550" cy="2500" rx="5" ry="3" fill="#A69070" opacity="0.85" transform="rotate(45 550 2500)" />
        <ellipse cx="850" cy="3800" rx="8" ry="4" fill="#8C7A5E" opacity="0.8" transform="rotate(-30 850 3800)" />
        <ellipse cx="350" cy="4900" rx="6" ry="4" fill="#3D3635" opacity="0.85" transform="rotate(10 350 4900)" />
        <ellipse cx="1250" cy="5600" rx="5" ry="3" fill="#2E2A30" opacity="0.9" transform="rotate(60 1250 5600)" />
        <ellipse cx="750" cy="6800" rx="7" ry="5" fill="#3D3635" opacity="0.85" transform="rotate(-25 750 6800)" />
        <ellipse cx="450" cy="7700" rx="8" ry="4" fill="#2E2A30" opacity="0.9" transform="rotate(15 450 7700)" />
        <ellipse cx="1050" cy="8200" rx="6" ry="4" fill="#2E2A30" opacity="0.9" transform="rotate(-40 1050 8200)" />

        {/* F. WET SAND PATCHES */}
        <ellipse cx="400" cy="1000" rx="80" ry="25" fill="#4A3420" opacity="0.1" />
        <ellipse cx="1100" cy="3000" rx="110" ry="35" fill="#4A3420" opacity="0.12" />
        <ellipse cx="300" cy="5000" rx="90" ry="30" fill="#3A2415" opacity="0.15" />

        {/* G. PALM FROND SHADOWS */}
        {/* Z=2800 */}
        <g transform="translate(1150, 2800) rotate(145) scale(1.4)" opacity="0.12" fill="#203010">
          <path d="M0 0 L240 48 C215 72 165 95 0 0 Z" />
          <line x1="0" y1="0" x2="260" y2="52" stroke="#203010" strokeWidth="5" />
          <path d="M45 10 L70 42 M95 20 L130 60 M145 30 L185 78 M190 40 L240 98" stroke="#203010" strokeWidth="3.5" />
        </g>
        {/* Z=4500 */}
        <g transform="translate(100, 4500) rotate(-25) scale(1.5)" opacity="0.15" fill="#15200A">
          <path d="M0 0 L240 48 C215 72 165 95 0 0 Z" />
          <line x1="0" y1="0" x2="260" y2="52" stroke="#15200A" strokeWidth="5" />
          <path d="M45 10 L70 42 M95 20 L130 60 M145 30 L185 78 M190 40 L240 98" stroke="#15200A" strokeWidth="3.5" />
        </g>
      </svg>
    </div>
  );
}
