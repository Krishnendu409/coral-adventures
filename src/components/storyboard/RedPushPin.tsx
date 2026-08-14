"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RedPushPinProps {
  className?: string;
  shadowAngle?: "left" | "right" | "bottom" | "sunset" | "night";
  size?: number; // default 24px
}

export function RedPushPin({
  className,
  shadowAngle = "bottom",
  size = 28,
}: RedPushPinProps) {
  // Shadow offsets based on light direction
  const shadowOffsets = {
    bottom: "translate(4px, 8px) scale(0.85, 0.4)",
    left: "translate(-6px, 8px) scale(0.9, 0.45)",
    right: "translate(8px, 6px) scale(0.9, 0.45)",
    sunset: "translate(18px, 12px) scale(1.4, 0.35)", // long sunset shadow
    night: "translate(2px, 4px) scale(0.7, 0.3)", // subtle moonlit shadow
  };

  return (
    <div
      className={cn("relative inline-block select-none pointer-events-none z-30", className)}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-hidden="true"
    >
      {/* Realistic Cast Shadow on Sand */}
      <div
        className="absolute inset-0 rounded-full bg-[#1A0B05]/35 blur-[2.5px] transition-transform duration-300"
        style={{
          transform: shadowOffsets[shadowAngle],
          transformOrigin: "center center",
        }}
      />

      {/* 3D Red Pushpin Head */}
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full drop-shadow-sm filter"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radial Gradient for Glossy Red Pin Dome */}
          <radialGradient id="pinHeadGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="35%" stopColor="#E02424" />
            <stop offset="70%" stopColor="#9B1C1C" />
            <stop offset="100%" stopColor="#5E0D0D" />
          </radialGradient>

          {/* Metal Pin Collar Gradient */}
          <linearGradient id="pinCollarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5E7EB" />
            <stop offset="50%" stopColor="#9CA3AF" />
            <stop offset="100%" stopColor="#4B5563" />
          </linearGradient>

          {/* Gloss Highlight on Dome */}
          <linearGradient id="pinGloss" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Pin Stem Insertion Base into Sand */}
        <ellipse cx="16" cy="27" rx="2.5" ry="1.2" fill="#374151" opacity="0.6" />
        <rect x="15" y="20" width="2" height="7" rx="1" fill="url(#pinCollarGrad)" />

        {/* Pin Flange Collar */}
        <ellipse cx="16" cy="20" rx="6" ry="2.2" fill="#771D1D" />
        <ellipse cx="16" cy="19.2" rx="5.6" ry="1.8" fill="url(#pinCollarGrad)" />

        {/* Main Spherical/Cylindrical Pin Head */}
        <path
          d="M16 4C10.5 4 6 8.5 6 14C6 17.5 8 18.8 10 19.5L22 19.5C24 18.8 26 17.5 26 14C26 8.5 21.5 4 16 4Z"
          fill="url(#pinHeadGrad)"
        />

        {/* Top Spherical Cap */}
        <ellipse cx="16" cy="10" rx="9" ry="5.5" fill="url(#pinHeadGrad)" />

        {/* Gloss Specular Glint */}
        <ellipse cx="13" cy="8" rx="4" ry="2.2" fill="url(#pinGloss)" transform="rotate(-15 13 8)" />
        <circle cx="12" cy="7" r="1.2" fill="#FFFFFF" opacity="0.9" />
      </svg>
    </div>
  );
}
