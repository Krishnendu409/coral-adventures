"use client";

import React, { useEffect, useState } from "react";

interface RedThreadProps {
  scrollProgress: number; // 0.0 to 1.0
}

export function RedThreadSystem({ scrollProgress }: RedThreadProps) {
  // Coordinates of the 8 chapter pushpins across the 25ft sand board:
  // 1. Arrival (Top Left, x: 380, y: 720)
  // 2. Watersports (Mid Right, x: 880, y: 2150)
  // 3. Catamaran (Mid Left, x: 340, y: 3680)
  // 4. Onboard Life (Mid Right, x: 920, y: 5120)
  // 5. Basalt Island (Mid Left, x: 390, y: 6580)
  // 6. Sunset (Center Right, x: 860, y: 8050)
  // 7. Night (Center Left, x: 420, y: 9550)
  // 8. Drone Show (Center, x: 680, y: 11100)

  // A natural sagging, curving rope path connecting all 8 pins down the beach:
  const threadPath = `
    M 380 720
    C 490 1100, 720 1600, 880 2150
    C 960 2500, 520 3100, 340 3680
    C 260 4150, 780 4600, 920 5120
    C 980 5600, 480 6100, 390 6580
    C 330 7100, 760 7550, 860 8050
    C 920 8550, 520 9050, 420 9550
    C 350 10100, 600 10600, 680 11100
  `;

  // Total approximate path length for stroke dash calculations
  const totalLength = 12000;
  // Ensure at least a starter segment is visible even before scroll (10% min, smoothly unrolling to 100%)
  const visibleFraction = Math.min(1, Math.max(0.12, scrollProgress * 1.08));
  const dashOffset = totalLength * (1 - visibleFraction);

  return (
    <svg
      className="absolute top-0 left-0 w-full pointer-events-none z-15"
      style={{ height: "12200px" }}
      viewBox="0 0 1440 12200"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Thread Fiber Gradient with realistic high-twist shading */}
        <linearGradient id="redCordGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF4A4A" />
          <stop offset="30%" stopColor="#DC2626" />
          <stop offset="60%" stopColor="#991B1B" />
          <stop offset="100%" stopColor="#631010" />
        </linearGradient>

        {/* Night Strand Shading (turns deeper crimson) */}
        <linearGradient id="nightCordGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="70%" stopColor="#B91C1C" />
          <stop offset="85%" stopColor="#881337" />
          <stop offset="100%" stopColor="#4C0519" />
        </linearGradient>

        {/* Soft shadow filter on sand */}
        <filter id="stringShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
          <feOffset dx="6" dy="10" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.45" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
          </feMerge>
        </filter>
      </defs>

      {/* 1. Cast Shadow of the Red String onto the Beach Sand */}
      <path
        d={threadPath}
        stroke="#2E1708"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLength}
        strokeDashoffset={dashOffset}
        filter="url(#stringShadow)"
        opacity="0.5"
      />

      {/* 2. Base Dark Strand Core */}
      <path
        d={threadPath}
        stroke="#5A0F0F"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLength}
        strokeDashoffset={dashOffset}
      />

      {/* 3. Main Vibrant Crimson Fiber */}
      <path
        d={threadPath}
        stroke="url(#nightCordGrad)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLength}
        strokeDashoffset={dashOffset}
      />

      {/* 4. Fine Twisted Highlight Fiber on Top */}
      <path
        d={threadPath}
        stroke="#FFA3A3"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="8 4"
        strokeDashoffset={dashOffset}
        opacity="0.75"
      />
    </svg>
  );
}
