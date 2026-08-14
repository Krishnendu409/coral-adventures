"use client";

import React from "react";

interface RealRedThreadProps {
  scrollProgress: number; // 0.0 to 1.0
}

export function RealRedThread({ scrollProgress }: RealRedThreadProps) {
  // A thick, continuous physical nylon cord path weaving through all 8 spatial hubs
  const cordPath = `
    M 420 580
    C 560 980, 820 1480, 940 2020
    C 1040 2380, 560 2920, 360 3480
    C 260 3980, 840 4400, 960 4920
    C 1040 5380, 520 5850, 410 6350
    C 320 6850, 820 7300, 900 7800
    C 960 8280, 520 8750, 420 9250
    C 340 9800, 640 10280, 720 10750
  `;

  const pinCoordinates = [
    { x: 420, y: 580 },
    { x: 940, y: 2020 },
    { x: 360, y: 3480 },
    { x: 960, y: 4920 },
    { x: 410, y: 6350 },
    { x: 900, y: 7800 },
    { x: 420, y: 9250 },
    { x: 720, y: 10750 },
  ];

  const totalLength = 12000;
  // Progressively reveal the thread as user scrolls
  const visibleFraction = Math.min(1, Math.max(0.18, scrollProgress * 1.15));
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
        {/* Deep Crimson Fiber Gradient */}
        <linearGradient id="heavyRedRopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="25%" stopColor="#DC2626" />
          <stop offset="70%" stopColor="#991B1B" />
          <stop offset="100%" stopColor="#580808" />
        </linearGradient>

        {/* Ambient Drop Shadow on Sand */}
        <filter id="heavyCordSandShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
          <feOffset dx="10" dy="16" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
          </feMerge>
        </filter>
      </defs>

      {/* 1. Sand Ambient Drop Shadow */}
      <path
        d={cordPath}
        stroke="#1E0E05"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLength}
        strokeDashoffset={dashOffset}
        filter="url(#heavyCordSandShadow)"
        opacity="0.75"
      />

      {/* 2. Heavy Dark Twisted Rope Base Core */}
      <path
        d={cordPath}
        stroke="#450A0A"
        strokeWidth="7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLength}
        strokeDashoffset={dashOffset}
      />

      {/* 3. Main Vibrant Crimson Twisted Body */}
      <path
        d={cordPath}
        stroke="url(#heavyRedRopeGrad)"
        strokeWidth="5.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLength}
        strokeDashoffset={dashOffset}
      />

      {/* 4. High-Twist Highlight Strand */}
      <path
        d={cordPath}
        stroke="#FECACA"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="12 7"
        strokeDashoffset={dashOffset}
        opacity="0.85"
      />

      {/* 5. Physical Cord Loops Around Pushpins */}
      {pinCoordinates.map((pin, i) => (
        <g key={i} opacity={scrollProgress * 8 >= i ? 1 : 0.4} className="transition-opacity duration-300">
          {/* Shadow loop */}
          <circle cx={pin.x + 8} cy={pin.y + 12} r={14} stroke="#1E0E05" strokeWidth="6" opacity="0.4" />
          {/* Base loop */}
          <circle cx={pin.x} cy={pin.y} r={12} stroke="#450A0A" strokeWidth="5.5" />
          {/* Red loop */}
          <circle cx={pin.x} cy={pin.y} r={12} stroke="#DC2626" strokeWidth="3.8" />
          {/* Highlight loop */}
          <circle cx={pin.x} cy={pin.y} r={12} stroke="#FECACA" strokeWidth="1.4" strokeDasharray="6 4" />
        </g>
      ))}
    </svg>
  );
}
