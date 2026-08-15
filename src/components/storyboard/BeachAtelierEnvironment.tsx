"use client";

import React from "react";

export function BeachAtelierEnvironment() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {/* 1. Continuous Multi-Zone Temporal Sand Gradient */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `linear-gradient(
            180deg,
            #0D486B 0px,
            #1E6F8C 120px,
            #6EA3A6 280px,
            #C4B598 420px,
            #E7DCBE 900px,
            #E5D9BB 2200px,
            #DECDB0 3600px,
            #D5BE9E 4800px,
            #C8A888 5800px,
            #8A5A4A 6800px,
            #2C2B4B 7600px,
            #0B1224 8600px,
            #050812 9400px
          )`,
        }}
      />

      {/* 2. Arabian Sea Shoreline Swash & Foam Crest at the Top (0 to 380px) */}
      <svg
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{ height: "420px" }}
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="oceanShallowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0B4060" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#257A96" stopOpacity="0.8" />
            <stop offset="90%" stopColor="#5EA9A7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#A8D4C8" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Deep Water */}
        <path d="M 0 0 L 1440 0 L 1440 180 Q 1080 210, 720 170 T 0 190 Z" fill="url(#oceanShallowGrad)" />

        {/* Foaming Surf Breaker 1 */}
        <path
          d="M 0 160 Q 360 210, 720 175 T 1440 185 L 1440 225 Q 1080 250, 720 220 T 0 230 Z"
          fill="#FFFFFF"
          opacity="0.65"
        />

        {/* Foaming Surf Breaker 2 (Swash Line) */}
        <path
          d="M 0 210 Q 360 260, 720 230 T 1440 245 L 1440 280 Q 1080 305, 720 270 T 0 290 Z"
          fill="#FFFFFF"
          opacity="0.45"
        />

        {/* Wet Sand Sheen & Tide Marks */}
        <path
          d="M 0 265 Q 360 320, 720 285 T 1440 300 L 1440 370 Q 1080 390, 720 350 T 0 375 Z"
          fill="#947E64"
          opacity="0.35"
        />
      </svg>

      {/* 3. The Natural Ivory Linen Expedition Atelier Cloth Foundation */}
      {/* Elegantly laid over the central portion of the beach */}
      <div className="absolute top-[480px] left-[3%] right-[3%] sm:left-[6%] sm:right-[6%] max-w-6xl mx-auto h-[8400px] z-5 pointer-events-none">
        {/* Main Linen Body with Subtle Weave Texture and Deckled Shadow */}
        <div className="relative w-full h-full bg-[#FAF7F0]/85 backdrop-blur-[0.5px] rounded-[3px] shadow-[0_30px_70px_rgba(45,28,14,0.18),_0_4px_16px_rgba(0,0,0,0.06)] border border-[#EADBCC]/60">
          {/* Linen Fray / Weave Micro-Pattern */}
          <div
            className="absolute inset-0 opacity-[0.08] mix-blend-multiply rounded-[3px]"
            style={{
              backgroundImage:
                "radial-gradient(#5A3E26 0.75px, transparent 0.75px), radial-gradient(#5A3E26 0.75px, #FAF7F0 0.75px)",
              backgroundSize: "24px 24px",
              backgroundPosition: "0 0, 12px 12px",
            }}
          />

          {/* Soft Natural Fabric Fold Lines (Diagonals) */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <line x1="10%" y1="1200" x2="90%" y2="1350" stroke="#7A5635" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.4" />
            <line x1="5%" y1="2800" x2="85%" y2="2920" stroke="#7A5635" strokeWidth="1.2" opacity="0.3" />
            <line x1="15%" y1="4500" x2="95%" y2="4650" stroke="#7A5635" strokeWidth="1.5" strokeDasharray="12 8" opacity="0.4" />
            <line x1="8%" y1="6200" x2="88%" y2="6340" stroke="#7A5635" strokeWidth="1.2" opacity="0.3" />
          </svg>
        </div>
      </div>

      {/* 4. Swaying Coconut Palm Shadows across the Board */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-30 mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="palmShadowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E140A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4A341E" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* High Sun Palm Frond Silhouette 1 (Chapter 01 - Z=600px) */}
        <g transform="translate(1050, 450) rotate(24) scale(1.4)" fill="url(#palmShadowGrad)">
          <path d="M 0 0 C 40 -80, 160 -120, 280 -90 C 200 -50, 120 0, 0 0 Z" />
          <path d="M 40 -60 L 90 -130 L 70 -50 Z" />
          <path d="M 90 -80 L 160 -160 L 130 -60 Z" />
          <path d="M 140 -85 L 230 -165 L 180 -65 Z" />
          <path d="M 190 -80 L 290 -140 L 230 -60 Z" />
          <path d="M 230 -65 L 320 -105 L 260 -50 Z" />
        </g>

        {/* Afternoon Palm Frond Silhouette 2 (Chapter 03 - Z=2600px) */}
        <g transform="translate(-80, 2400) rotate(-18) scale(1.6)" fill="url(#palmShadowGrad)">
          <path d="M 0 0 C 60 -100, 220 -140, 360 -100 C 260 -50, 160 0, 0 0 Z" />
          <path d="M 60 -70 L 120 -160 L 90 -60 Z" />
          <path d="M 120 -95 L 210 -195 L 160 -75 Z" />
          <path d="M 180 -100 L 290 -195 L 230 -80 Z" />
          <path d="M 240 -95 L 360 -160 L 290 -75 Z" />
        </g>

        {/* Late Sunset Long Palm Frond (Chapter 06 - Z=5800px) */}
        <g transform="translate(920, 5600) rotate(42) scale(1.8)" fill="url(#palmShadowGrad)">
          <path d="M 0 0 C 80 -120, 280 -180, 440 -120 C 320 -60, 200 0, 0 0 Z" />
          <path d="M 80 -90 L 160 -210 L 120 -80 Z" />
          <path d="M 160 -120 L 280 -250 L 210 -95 Z" />
          <path d="M 240 -130 L 380 -250 L 300 -100 Z" />
          <path d="M 320 -120 L 460 -200 L 370 -90 Z" />
        </g>

        {/* Night Moonlit Silhouette (Chapter 07 - Z=7200px) */}
        <g transform="translate(100, 7100) rotate(-28) scale(1.5)" fill="#020617" opacity="0.6">
          <path d="M 0 0 C 50 -90, 180 -130, 300 -95 C 220 -50, 140 0, 0 0 Z" />
          <path d="M 50 -65 L 100 -145 L 80 -55 Z" />
          <path d="M 100 -90 L 180 -180 L 140 -70 Z" />
          <path d="M 160 -95 L 260 -180 L 200 -75 Z" />
          <path d="M 210 -90 L 310 -150 L 250 -70 Z" />
        </g>
      </svg>
    </div>
  );
}
