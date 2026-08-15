"use client";

import React from "react";

interface WaxedCrimsonCordProps {
  scrollProgress: number; // 0.0 to 1.0
}

export function WaxedCrimsonCord({ scrollProgress }: WaxedCrimsonCordProps) {
  // Continuous physical red expedition rope (z-10):
  // Routes strictly under the Hero Polaroid mounts and curves through clear margins without overlapping secondary cards or text.
  //
  // Spread 01: Enters behind Hero 1 (x: 360, y: 520) -> exits bottom of Hero 1 (x: 360, y: 880)
  // Curve through margin -> Enters behind Hero 2 (x: 960, y: 1620) -> exits bottom (x: 960, y: 1980)
  // Curve through margin -> Enters behind Hero 3 (x: 360, y: 2750) -> exits bottom (x: 360, y: 3100)
  // Curve through margin -> Enters behind Hero 4 (x: 960, y: 3880) -> exits bottom (x: 960, y: 4240)
  // Curve through margin -> Enters behind Hero 5 (x: 360, y: 5000) -> exits bottom (x: 360, y: 5360)
  // Curve through margin -> Enters behind Hero 6 (x: 960, y: 6140) -> exits bottom (x: 960, y: 6500)
  // Curve through margin -> Enters behind Hero 7 (x: 360, y: 7260) -> exits bottom (x: 360, y: 7620)
  // Curve through margin -> Enters and terminates behind Climax Hero 8 (x: 720, y: 8380)

  const cordPath = `
    M 360 520
    L 360 880
    C 360 1080, 520 1280, 720 1440
    C 840 1540, 960 1560, 960 1620
    
    L 960 1980
    C 960 2180, 800 2380, 600 2540
    C 480 2640, 360 2680, 360 2750
    
    L 360 3100
    C 360 3300, 520 3500, 720 3660
    C 840 3760, 960 3800, 960 3880
    
    L 960 4240
    C 960 4440, 800 4640, 600 4800
    C 480 4900, 360 4940, 360 5000
    
    L 360 5360
    C 360 5560, 520 5760, 720 5920
    C 840 6020, 960 6060, 960 6140
    
    L 960 6500
    C 960 6700, 800 6900, 600 7060
    C 480 7160, 360 7200, 360 7260
    
    L 360 7620
    C 360 7820, 480 8020, 600 8180
    C 660 8260, 720 8320, 720 8380
  `;

  const totalLength = 10000;
  const visibleFraction = Math.min(1, Math.max(0.12, scrollProgress * 1.15));
  const dashOffset = totalLength * (1 - visibleFraction);

  return (
    <svg
      className="absolute top-0 left-0 w-full pointer-events-none z-10"
      style={{ height: "9400px" }}
      viewBox="0 0 1440 9400"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Rich Vibrant Twisted Red Expedition Rope Gradient */}
        <linearGradient id="prominentRedRopeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="25%" stopColor="#DC2626" />
          <stop offset="55%" stopColor="#B91C1C" />
          <stop offset="85%" stopColor="#991B1B" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>

        {/* Soft Ambient Contact Shadow */}
        <filter id="prominentRopeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3.2" />
          <feOffset dx="3" dy="5" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.45" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
          </feMerge>
        </filter>
      </defs>

      <g>
        {/* 1. Ambient Drop Shadow */}
        <path
          d={cordPath}
          stroke="#1E0E05"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={totalLength}
          strokeDashoffset={dashOffset}
          filter="url(#prominentRopeShadow)"
          opacity="0.4"
        />

        {/* 2. Dark Twisted Core Base */}
        <path
          d={cordPath}
          stroke="#450A0A"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={totalLength}
          strokeDashoffset={dashOffset}
        />

        {/* 3. Main Vibrant Crimson Rope Body (4.2px) */}
        <path
          d={cordPath}
          stroke="url(#prominentRedRopeGrad)"
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={totalLength}
          strokeDashoffset={dashOffset}
        />

        {/* 4. High-Twist Braided Specular Highlight */}
        <path
          d={cordPath}
          stroke="#FECACA"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="8 5 12 6"
          strokeDashoffset={dashOffset}
          opacity="0.85"
        />
      </g>
    </svg>
  );
}
