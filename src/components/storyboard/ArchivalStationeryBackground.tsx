"use client";

import React from "react";

interface ArchivalStationeryBackgroundProps {
  scrollProgress: number; // 0.0 to 1.0
}

export function ArchivalStationeryBackground({ scrollProgress }: ArchivalStationeryBackgroundProps) {
  // Rich, warm sun-washed coastal canvas blending tactile luxury archival paper with subtle atmospheric shifts
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-1000">
      {/* 1. Warm Sun-Bleached Sand & Archival Parchment Canvas */}
      <div
        className="absolute inset-0 w-full h-full transition-all duration-700 ease-out"
        style={{
          background: `
            radial-gradient(ellipse at 85% 15%, rgba(228, 91, 50, 0.09) 0%, transparent 55%),
            radial-gradient(ellipse at 15% 75%, rgba(13, 124, 131, 0.1) 0%, transparent 60%),
            linear-gradient(
              180deg,
              #FAF7F0 0%,
              #F5EBE1 10%,
              #EADCC6 22%,
              #E2D5BE 35%,
              #D8C6AC 50%,
              #CEBCA0 65%,
              #C4B194 80%,
              #B9A485 100%
            )
          `,
        }}
      />

      {/* 2. Authentic Cotton Rag Paper Grain & Linen Weave Texture */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 3. Hand-Engraved Bathymetric Depth Contours (5m, 10m, 25m, 50m lines) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.18] stroke-[#78350F]"
        viewBox="0 0 1440 9400"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 5m Shoreline Contour */}
        <path d="M 0 450 C 350 480, 720 380, 1100 520 C 1280 580, 1380 500, 1440 540" strokeWidth="1.2" />
        {/* 10m Reef Depth Contour */}
        <path d="M 0 1650 C 420 1580, 800 1720, 1150 1600 C 1320 1540, 1400 1620, 1440 1660" strokeWidth="1.2" strokeDasharray="6 3" />
        {/* 25m Coastal Shelf Contour */}
        <path d="M 0 3850 C 380 3920, 780 3780, 1120 3890 C 1300 3950, 1400 3860, 1440 3900" strokeWidth="1.4" />
        {/* 50m Deep Basalt Channel Contour */}
        <path d="M 0 6250 C 450 6180, 820 6340, 1180 6200 C 1340 6140, 1410 6220, 1440 6260" strokeWidth="1.6" strokeDasharray="8 4" />
      </svg>
    </div>
  );
}
