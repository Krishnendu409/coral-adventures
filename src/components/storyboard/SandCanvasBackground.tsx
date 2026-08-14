"use client";

import React from "react";

export function SandCanvasBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Base Diurnal Sand Tone Gradient across the entire 25ft beach */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: `linear-gradient(
            to bottom,
            #F3E9D2 0%,      /* 01 Arrival: Bright morning warm beige sand */
            #EBDCBE 12%,     /* 02 Watersports: Turquoise reflected beach */
            #E2D2B0 25%,     /* 03 Catamaran: High sun coastal sand */
            #D8C49E 40%,     /* 04 Onboard: Late afternoon warm sand */
            #CAAC7F 55%,     /* 05 Basalt Island: Lower raking golden sun */
            #9A6B43 70%,     /* 06 Sunset: Rich amber & fiery molten sand */
            #1B263B 82%,     /* 07 Night: Blue hour into moonlit midnight sand */
            #08121E 95%,     /* 08 Drone Show: Obsidian ocean night */
            #040910 100%
          )`,
        }}
      />

      {/* 2. Procedural SVG Sand Grains & Micro-Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-35 mix-blend-multiply" xmlns="http://www.w3.org/2000/svg">
        <filter id="sandNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0.33 0 0 0 0.6  0 0.33 0 0 0.5  0 0 0.33 0 0.4  0 0 0 0.45 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#sandNoise)" />
      </svg>

      {/* 3. Subtle Wind Ripple Waves in Sand (Wavy organic dunes) */}
      <div 
        className="absolute inset-0 w-full h-full opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -35deg,
            transparent,
            transparent 70px,
            rgba(80, 50, 20, 0.08) 75px,
            transparent 85px,
            rgba(255, 255, 255, 0.12) 90px
          )`,
        }}
      />

      {/* 4. Natural Beach Imperfections: Subtle Footprints, Shells, Pebbles, and Dried Leaves */}
      {/* Upper Beach Zone: Footprint Trails & Sand Depressions */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        {/* Footprints near Arrival (Z=0 to 1500px) */}
        <g opacity="0.18" fill="#7C5E3F" transform="translate(180, 450) rotate(-18)">
          <ellipse cx="0" cy="0" rx="14" ry="32" />
          <ellipse cx="2" cy="-38" rx="5" ry="7" />
          <ellipse cx="10" cy="-33" rx="4" ry="5.5" />
          <ellipse cx="16" cy="-26" rx="3.5" ry="4.5" />
        </g>
        <g opacity="0.16" fill="#7C5E3F" transform="translate(230, 620) rotate(-12)">
          <ellipse cx="0" cy="0" rx="14" ry="32" />
          <ellipse cx="-2" cy="-38" rx="5" ry="7" />
          <ellipse cx="-10" cy="-33" rx="4" ry="5.5" />
          <ellipse cx="-16" cy="-26" rx="3.5" ry="4.5" />
        </g>
        <g opacity="0.14" fill="#7C5E3F" transform="translate(290, 810) rotate(-22)">
          <ellipse cx="0" cy="0" rx="14" ry="32" />
          <ellipse cx="2" cy="-38" rx="5" ry="7" />
        </g>

        {/* Small Scattered Coastal Pebbles & Shells */}
        {/* Pebble 1 */}
        <ellipse cx="85%" cy="320" rx="12" ry="8" fill="#A89F91" className="drop-shadow-sm" transform="rotate(25 1200 320)" />
        <ellipse cx="85%" cy="321" rx="10" ry="6" fill="#C4BCB0" transform="rotate(25 1200 321)" />
        
        {/* Small Cowrie Shell near Arrival */}
        <g transform="translate(320, 1180) rotate(42) scale(0.65)" opacity="0.85">
          <ellipse cx="0" cy="0" rx="18" ry="26" fill="#EDE4D8" stroke="#D1C3B2" strokeWidth="1.5" />
          <path d="M0 -20 Q-6 0 0 20 Q6 0 0 -20" fill="#6B4F3A" opacity="0.55" />
          <line x1="-5" y1="-12" x2="5" y2="-12" stroke="#6B4F3A" strokeWidth="1" opacity="0.4" />
          <line x1="-6" y1="-4" x2="6" y2="-4" stroke="#6B4F3A" strokeWidth="1" opacity="0.4" />
          <line x1="-6" y1="4" x2="6" y2="4" stroke="#6B4F3A" strokeWidth="1" opacity="0.4" />
          <line x1="-5" y1="12" x2="5" y2="12" stroke="#6B4F3A" strokeWidth="1" opacity="0.4" />
        </g>

        {/* Pebble Cluster near Watersports */}
        <ellipse cx="15%" cy="1950" rx="9" ry="6" fill="#8C7A6B" opacity="0.75" />
        <ellipse cx="17%" cy="1965" rx="14" ry="9" fill="#5C4D43" opacity="0.7" />
        <ellipse cx="14%" cy="1978" rx="7" ry="5" fill="#B3A294" opacity="0.8" />

        {/* Dried Teak Leaf Fragment near Catamaran zone */}
        <g transform="translate(1120, 3650) rotate(-48) scale(0.8)" opacity="0.65">
          <path d="M0 -30 C20 -15 25 15 0 35 C-25 15 -20 -15 0 -30 Z" fill="#82522C" />
          <line x1="0" y1="-28" x2="0" y2="33" stroke="#4A2810" strokeWidth="1.5" />
          <line x1="0" y1="-10" x2="12" y2="-18" stroke="#4A2810" strokeWidth="1" opacity="0.6" />
          <line x1="0" y1="5" x2="14" y2="-2" stroke="#4A2810" strokeWidth="1" opacity="0.6" />
          <line x1="0" y1="-5" x2="-12" y2="-14" stroke="#4A2810" strokeWidth="1" opacity="0.6" />
          <line x1="0" y1="10" x2="-14" y2="2" stroke="#4A2810" strokeWidth="1" opacity="0.6" />
        </g>

        {/* Basalt Rock Shards near Island zone (Z=6000px) */}
        <polygon points="180,6200 205,6180 230,6215 210,6240 175,6225" fill="#2B282A" opacity="0.7" />
        <polygon points="235,6210 260,6195 275,6220 250,6235" fill="#3D383A" opacity="0.65" />
      </svg>
    </div>
  );
}
