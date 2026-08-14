"use client";

import React from "react";

interface RealRedThreadProps {
  scrollProgress: number; // 0.0 to 1.0
}

export function RealRedThread({ scrollProgress }: RealRedThreadProps) {
  // A natural, slightly slack cord path weaving through the 8 spatial hubs
  const cordPath = `
    M 420 580
    C 540 950, 780 1480, 940 1980
    C 1020 2320, 560 2900, 360 3450
    C 280 3920, 820 4350, 960 4850
    C 1020 5320, 520 5800, 410 6280
    C 340 6780, 790 7220, 880 7720
    C 940 8200, 540 8680, 430 9150
    C 360 9700, 640 10200, 720 10650
  `;

  const totalLength = 11500;
  // Progressively reveal the thread as user scrolls
  const visibleFraction = Math.min(1, Math.max(0.15, scrollProgress * 1.1));
  const dashOffset = totalLength * (1 - visibleFraction);

  return (
    <svg
      className="absolute top-0 left-0 w-full pointer-events-none z-15"
      style={{ height: "11800px" }}
      viewBox="0 0 1440 11800"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Deep Crimson Fiber Gradient */}
        <linearGradient id="deepRedRopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF4D4D" />
          <stop offset="25%" stopColor="#DC2626" />
          <stop offset="70%" stopColor="#991B1B" />
          <stop offset="100%" stopColor="#4A0B0B" />
        </linearGradient>

        {/* Night Strand Shader */}
        <linearGradient id="nightRopeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="65%" stopColor="#991B1B" />
          <stop offset="85%" stopColor="#7F1D1D" />
          <stop offset="100%" stopColor="#450A0A" />
        </linearGradient>

        {/* Ambient Drop Shadow on Sand */}
        <filter id="cordSandShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
          <feOffset dx="8" dy="12" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.4" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
          </feMerge>
        </filter>
      </defs>

      {/* 1. Sand Ambient Shadow */}
      <path
        d={cordPath}
        stroke="#2E1708"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLength}
        strokeDashoffset={dashOffset}
        filter="url(#cordSandShadow)"
        opacity="0.6"
      />

      {/* 2. Base Dark Twisted Core */}
      <path
        d={cordPath}
        stroke="#4A0B0B"
        strokeWidth="4.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLength}
        strokeDashoffset={dashOffset}
      />

      {/* 3. Main Vibrant Crimson Twisted Cord */}
      <path
        d={cordPath}
        stroke="url(#nightRopeGrad)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLength}
        strokeDashoffset={dashOffset}
      />

      {/* 4. High-Twist Highlight Strand */}
      <path
        d={cordPath}
        stroke="#FFB3B3"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="9 5"
        strokeDashoffset={dashOffset}
        opacity="0.8"
      />
    </svg>
  );
}
