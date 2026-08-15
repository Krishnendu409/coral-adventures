"use client";

import React from "react";

interface RealRedThreadProps {
  scrollProgress: number; // 0.0 to 1.0
}

export function RealRedThread({ scrollProgress }: RealRedThreadProps) {
  // Snaking organic red cord connecting the 8 clustered spatial stations
  const cordPath = `
    M 460 520
    C 450 680, 520 850, 620 1000
    C 720 1150, 880 1350, 920 1500
    C 935 1580, 955 1620, 940 1650
    
    C 920 1850, 820 2050, 700 2250
    C 580 2420, 480 2580, 450 2700
    C 440 2730, 435 2745, 440 2750
    
    C 460 2950, 600 3150, 740 3350
    C 860 3520, 970 3680, 955 3800
    C 950 3830, 970 3845, 960 3850
    
    C 940 4050, 800 4250, 660 4450
    C 540 4620, 460 4780, 445 4900
    C 440 4930, 460 4945, 450 4950

    C 470 5150, 620 5350, 760 5550
    C 880 5720, 960 5880, 935 6000
    C 930 6030, 950 6045, 940 6050
    
    C 910 6250, 780 6450, 640 6650
    C 520 6820, 470 6980, 455 7100
    C 450 7130, 470 7145, 460 7150
    
    C 480 7350, 560 7550, 640 7750
    C 700 7920, 715 8100, 720 8250
  `;

  const pinCoordinates = [
    { x: 460, y: 520, r: 13, over: true },
    { x: 940, y: 1650, r: 12, over: false },
    { x: 440, y: 2750, r: 14, over: true },
    { x: 960, y: 3850, r: 12, over: false },
    { x: 450, y: 4950, r: 13, over: true },
    { x: 940, y: 6050, r: 12, over: false },
    { x: 460, y: 7150, r: 13, over: true },
    { x: 720, y: 8250, r: 12, over: false },
  ];

  const totalLength = 10500;
  const visibleFraction = Math.min(1, Math.max(0.12, scrollProgress * 1.18));
  const dashOffset = totalLength * (1 - visibleFraction);

  // Sand contact grains
  const sandGrains = [
    { x: 520, y: 850, r: 1.2 }, { x: 525, y: 855, r: 0.9 },
    { x: 700, y: 2250, r: 1.1 }, { x: 704, y: 2248, r: 0.8 },
    { x: 660, y: 4450, r: 1.3 }, { x: 655, y: 4455, r: 1.0 },
    { x: 760, y: 5550, r: 0.9 }, { x: 765, y: 5545, r: 1.2 },
    { x: 640, y: 6650, r: 1.1 }, { x: 638, y: 6655, r: 0.8 },
    { x: 640, y: 7750, r: 1.2 }, { x: 645, y: 7755, r: 0.9 }
  ];

  return (
    <svg
      className="absolute top-0 left-0 w-full pointer-events-none z-15"
      style={{ height: "9400px" }}
      viewBox="0 0 1440 9400"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="heavyRedRopeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="25%" stopColor="#DC2626" />
          <stop offset="60%" stopColor="#B91C1C" />
          <stop offset="85%" stopColor="#991B1B" />
          <stop offset="100%" stopColor="#580808" />
        </linearGradient>

        <filter id="heavyCordSandShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
          <feOffset dx="6" dy="10" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
          </feMerge>
        </filter>
      </defs>

      <g>
        {/* 1. Deep Ambient Sand Shadow */}
        <path
          d={cordPath}
          stroke="#1E0E05"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={totalLength}
          strokeDashoffset={dashOffset}
          filter="url(#heavyCordSandShadow)"
          opacity="0.55"
        />

        {/* 2. Heavy Dark Twisted Rope Base Core */}
        <path
          d={cordPath}
          stroke="#450A0A"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={totalLength}
          strokeDashoffset={dashOffset}
        />

        {/* 3. Main Vibrant Crimson Twisted Body */}
        <path
          d={cordPath}
          stroke="url(#heavyRedRopeGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={totalLength}
          strokeDashoffset={dashOffset}
        />

        {/* 4. High-Twist Highlight Strand */}
        <path
          d={cordPath}
          stroke="#FECACA"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="8 6 12 8"
          strokeDashoffset={dashOffset}
          opacity="0.85"
        />

        {/* Physical Cord Loops Around Pushpins */}
        {pinCoordinates.map((pin, i) => {
          const isRevealed = scrollProgress * 8 >= i;
          const loopOpacity = isRevealed ? 1 : 0.2;
          const rot = i % 2 === 0 ? "45" : "-45";

          return (
            <g 
              key={i} 
              opacity={loopOpacity} 
              className="transition-opacity duration-500 ease-out"
              style={{
                transformOrigin: `${pin.x}px ${pin.y}px`,
                transform: `rotate(${rot}deg)`
              }}
            >
              {/* Shadow loop */}
              <circle cx={pin.x + 5} cy={pin.y + 8} r={pin.r} stroke="#1E0E05" fill="none" strokeWidth="6" opacity="0.4" />
              
              {/* Base loop */}
              <circle cx={pin.x} cy={pin.y} r={pin.r} stroke="#450A0A" fill="none" strokeWidth="5.5" />
              
              {/* Red loop */}
              <circle cx={pin.x} cy={pin.y} r={pin.r} stroke="url(#heavyRedRopeGrad)" fill="none" strokeWidth="3.8" />
              
              {/* Highlight loop */}
              <circle cx={pin.x} cy={pin.y} r={pin.r} stroke="#FECACA" fill="none" strokeWidth="1.2" strokeDasharray="5 3" opacity="0.9" />

              {/* Knot Bump */}
              <circle cx={pin.x + (i % 2 === 0 ? pin.r : -pin.r)} cy={pin.y} r="3" fill="#DC2626" />
              <circle cx={pin.x + (i % 2 === 0 ? pin.r : -pin.r)} cy={pin.y} r="1.5" fill="#FECACA" opacity="0.8"/>
            </g>
          );
        })}

        {/* Sand Grains */}
        {sandGrains.map((grain, i) => (
          <circle 
            key={`grain-${i}`}
            cx={grain.x} 
            cy={grain.y} 
            r={grain.r} 
            fill="#D4A373"
            opacity="0.8"
          />
        ))}
      </g>
    </svg>
  );
}
