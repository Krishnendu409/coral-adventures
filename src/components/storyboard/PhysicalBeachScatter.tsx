"use client";

import React from "react";
import { cn } from "@/lib/utils";

// Shared base classes for physical objects
const sandShadow = "shadow-[2px_3px_5px_rgba(60,35,15,0.25)]";
const baseScatterClass = "absolute pointer-events-none select-none origin-center";

export interface ScatterItemProps {
  className?: string;
  rotation?: number;
}

// 1. TornTicketStub
interface TornTicketStubProps extends ScatterItemProps {
  text?: string;
  code?: string;
  theme?: "cream" | "blue" | "pink";
}

export function TornTicketStub({
  className,
  rotation = 0,
  text = "FERRY PASS",
  code = "No. 84920",
  theme = "cream",
}: TornTicketStubProps) {
  const themeColors = {
    cream: "bg-[#f4ebd0] text-[#3e2723]",
    blue: "bg-[#d0e4f4] text-[#1a237e]",
    pink: "bg-[#f4d0d8] text-[#880e4f]",
  };

  return (
    <div
      className={cn(
        baseScatterClass,
        sandShadow,
        themeColors[theme],
        "w-24 h-12 flex flex-col justify-center items-center rounded-sm",
        className
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
        clipPath: "polygon(0% 0%, 95% 0%, 100% 10%, 95% 20%, 100% 30%, 95% 40%, 100% 50%, 95% 60%, 100% 70%, 95% 80%, 100% 90%, 95% 100%, 0% 100%)",
      }}
    >
      <div className="border border-dashed border-current opacity-30 w-full h-full absolute inset-0 m-1 pointer-events-none" />
      <span className="font-mono text-[10px] uppercase font-bold tracking-widest opacity-80 z-10">
        {text}
      </span>
      <span className="font-serif text-[8px] opacity-60 mt-1 z-10">{code}</span>
    </div>
  );
}

// 2. FilmNegativeStrip
export function FilmNegativeStrip({ className, rotation = 0 }: ScatterItemProps) {
  return (
    <div
      className={cn(
        baseScatterClass,
        sandShadow,
        "w-32 h-10 bg-black/90 p-[2px] flex gap-[2px] rounded-sm",
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Top and bottom sprocket holes container */}
      <div className="absolute inset-y-0 left-0 right-0 flex flex-col justify-between py-[1px] px-[2px]">
        <div className="flex justify-between w-full opacity-70">
          {[...Array(12)].map((_, i) => (
            <div key={`top-${i}`} className="w-[2px] h-[3px] bg-[#e0d8c0] rounded-[1px]" />
          ))}
        </div>
        <div className="flex justify-between w-full opacity-70">
          {[...Array(12)].map((_, i) => (
            <div key={`bot-${i}`} className="w-[2px] h-[3px] bg-[#e0d8c0] rounded-[1px]" />
          ))}
        </div>
      </div>
      
      {/* Frames */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex-1 bg-[#4a3b2c] opacity-60 h-full rounded-sm relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-[#d2a362] opacity-30 mix-blend-overlay"></div>
        </div>
      ))}
    </div>
  );
}

// 3. HandwrittenPostcard
interface HandwrittenPostcardProps extends ScatterItemProps {
  message?: string;
}

export function HandwrittenPostcard({
  className,
  rotation = 0,
  message = "Wish you were here...",
}: HandwrittenPostcardProps) {
  return (
    <div
      className={cn(
        baseScatterClass,
        sandShadow,
        "w-28 h-20 bg-[#f8f1e5] p-2 flex border border-[#d1c2a3] rounded-sm",
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="flex-1 border-r border-[#d1c2a3] pr-2 mr-2">
        <p className="font-['Caveat',cursive,serif] text-[#3e2a14] text-[10px] leading-tight opacity-80 transform -rotate-2">
          {message}
        </p>
      </div>
      <div className="w-10 flex flex-col items-end gap-1">
        <div className="w-5 h-6 bg-[#e4d5b7] border border-[#c2b292] shadow-sm flex items-center justify-center p-[1px]">
          <div className="w-full h-full bg-[#d8c3a5] opacity-50" />
        </div>
        <div className="w-full space-y-1 mt-2">
          <div className="h-[1px] w-full bg-[#d1c2a3]" />
          <div className="h-[1px] w-full bg-[#d1c2a3]" />
          <div className="h-[1px] w-3/4 bg-[#d1c2a3]" />
        </div>
      </div>
    </div>
  );
}

// 4. FishingHookLure
export function FishingHookLure({ className, rotation = 0 }: ScatterItemProps) {
  return (
    <svg
      className={cn(baseScatterClass, "drop-shadow-[2px_2px_3px_rgba(60,35,15,0.3)]", className)}
      width="24"
      height="40"
      viewBox="0 0 24 40"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <defs>
        <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0e0e0" />
          <stop offset="50%" stopColor="#9e9e9e" />
          <stop offset="100%" stopColor="#616161" />
        </linearGradient>
      </defs>
      <path
        d="M12,4 L12,28 C12,32 18,32 18,28 L18,24 L16,26 M12,4 C14,4 15,2 13,1 C11,0 10,2 12,4 Z"
        fill="none"
        stroke="url(#metal)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 5. SandDollar
interface SandDollarProps extends ScatterItemProps {
  size?: number;
}

export function SandDollar({ className, rotation = 0, size = 40 }: SandDollarProps) {
  return (
    <svg
      className={cn(baseScatterClass, sandShadow, className)}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <circle cx="50" cy="50" r="48" fill="#f5f0e6" stroke="#dcd5c7" strokeWidth="1" />
      <g stroke="#c8bcab" strokeWidth="1" fill="none" opacity="0.6">
        <path d="M50,20 Q55,40 50,50 Q45,40 50,20" />
        <path d="M78,40 Q65,50 50,50 Q65,45 78,40" />
        <path d="M68,75 Q55,60 50,50 Q60,65 68,75" />
        <path d="M32,75 Q45,60 50,50 Q40,65 32,75" />
        <path d="M22,40 Q35,50 50,50 Q35,45 22,40" />
      </g>
      <circle cx="50" cy="50" r="2" fill="#c8bcab" />
      <path d="M50,50 L50,15 M50,50 L85,38 M50,50 L65,80 M50,50 L35,80 M50,50 L15,38" stroke="#e8e0d2" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

// 6. DriftWoodPiece
interface DriftWoodPieceProps extends ScatterItemProps {
  length?: "short" | "medium" | "long";
}

export function DriftWoodPiece({ className, rotation = 0, length = "medium" }: DriftWoodPieceProps) {
  const width = length === "short" ? 40 : length === "medium" ? 70 : 100;
  
  return (
    <svg
      className={cn(baseScatterClass, "drop-shadow-[3px_4px_5px_rgba(60,35,15,0.4)]", className)}
      width={width}
      height="24"
      viewBox={`0 0 ${width} 24`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <defs>
        <linearGradient id="wood" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a39171" />
          <stop offset="50%" stopColor="#8b7355" />
          <stop offset="100%" stopColor="#6b543c" />
        </linearGradient>
      </defs>
      <path
        d={`M5,10 Q${width/4},5 ${width/2},8 T${width-5},12 Q${width},15 ${width-4},20 Q${width/2},18 5,20 Q0,15 5,10 Z`}
        fill="url(#wood)"
      />
      <path d={`M10,12 Q${width/3},9 ${width-15},14`} stroke="#5c452e" strokeWidth="0.5" fill="none" opacity="0.6" />
      <path d={`M8,15 Q${width/2},13 ${width-10},18`} stroke="#5c452e" strokeWidth="0.5" fill="none" opacity="0.6" />
      <path d={`M15,10 Q${width/2},11 ${width-20},13`} stroke="#5c452e" strokeWidth="0.5" fill="none" opacity="0.6" />
    </svg>
  );
}

// 7. WeatheredMapFragment
export function WeatheredMapFragment({ className, rotation = 0 }: ScatterItemProps) {
  return (
    <div
      className={cn(
        baseScatterClass,
        sandShadow,
        "w-24 h-24 bg-[#e8e0c8] opacity-90",
        className
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
        clipPath: "polygon(5% 0%, 90% 10%, 100% 40%, 85% 90%, 40% 100%, 0% 70%, 10% 20%)",
      }}
    >
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(#c2b28c_1px,transparent_1px),linear-gradient(90deg,#c2b28c_1px,transparent_1px)] bg-[size:16px_16px] opacity-40"></div>
      
      {/* Depth lines */}
      <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 100 100">
        <path d="M-10,30 Q20,20 40,50 T110,60" stroke="#a08d6a" fill="none" strokeWidth="0.5" />
        <path d="M-10,40 Q25,30 45,60 T110,70" stroke="#a08d6a" fill="none" strokeWidth="0.5" />
        <text x="30" y="45" fontSize="6" fill="#8c7853" transform="rotate(15, 30, 45)">12m</text>
        <circle cx="70" cy="30" r="1" fill="#8c7853" />
        <circle cx="70" cy="30" r="3" fill="none" stroke="#8c7853" strokeWidth="0.5" strokeDasharray="1 1" />
      </svg>
      
      {/* Water stain */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-[#d4c8a9] rounded-full blur-md opacity-40 mix-blend-multiply transform -translate-y-4 translate-x-4"></div>
    </div>
  );
}

// 8. PalmLeafFragment
export function PalmLeafFragment({ className, rotation = 0 }: ScatterItemProps) {
  return (
    <svg
      className={cn(baseScatterClass, sandShadow, className)}
      width="60"
      height="30"
      viewBox="0 0 60 30"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path d="M0,15 Q30,0 60,10 Q40,25 0,15 Z" fill="#b09f74" />
      <path d="M0,15 Q30,5 60,10" stroke="#8b7b53" strokeWidth="1" fill="none" />
      <path d="M15,11 L20,18 M25,9 L30,16 M35,7 L40,14 M45,7 L50,13 M55,8 L58,11" stroke="#8b7b53" strokeWidth="0.5" fill="none" opacity="0.6" />
    </svg>
  );
}

// 9. CameraLensCap
export function CameraLensCap({ className, rotation = 0 }: ScatterItemProps) {
  return (
    <div
      className={cn(
        baseScatterClass,
        "w-12 h-12 bg-[#222] rounded-full flex items-center justify-center border-2 border-[#111]",
        "drop-shadow-[3px_5px_4px_rgba(60,35,15,0.5)]",
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center">
        <span className="text-[#555] font-sans text-[6px] tracking-[2px] uppercase opacity-70">LENS</span>
      </div>
    </div>
  );
}

// 10. SunscreenBottle
export function SunscreenBottle({ className, rotation = 0 }: ScatterItemProps) {
  return (
    <div
      className={cn(
        baseScatterClass,
        "w-8 h-16 bg-[#f99236] rounded-xl rounded-t-3xl relative",
        "drop-shadow-[3px_6px_5px_rgba(60,35,15,0.4)]",
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Cap */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-3 bg-[#e87d20] rounded-sm"></div>
      {/* Label */}
      <div className="absolute top-4 left-1 right-1 h-6 bg-white/90 rounded-sm flex flex-col items-center justify-center">
        <div className="w-3 h-1 bg-[#f99236] rounded-full mb-[2px]"></div>
        <div className="text-[4px] font-black text-[#2a5c8a]">SPF 50</div>
      </div>
      {/* Highlight */}
      <div className="absolute inset-y-0 left-1 w-1 bg-white/20 rounded-full"></div>
    </div>
  );
}

// 11. AnchorCharm
export function AnchorCharm({ className, rotation = 0 }: ScatterItemProps) {
  return (
    <svg
      className={cn(baseScatterClass, "drop-shadow-[1px_2px_2px_rgba(60,35,15,0.4)]", className)}
      width="20"
      height="24"
      viewBox="0 0 20 24"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <circle cx="10" cy="4" r="2" fill="none" stroke="#d4af37" strokeWidth="1.5" />
      <path d="M10,6 L10,20 M6,10 L14,10" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4,14 Q4,20 10,20 Q16,20 16,14" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2,13 L6,15 L4,15 Z M18,13 L14,15 L16,15 Z" fill="#d4af37" />
    </svg>
  );
}

// 12. KnotTiedRope
export function KnotTiedRope({ className, rotation = 0 }: ScatterItemProps) {
  return (
    <svg
      className={cn(baseScatterClass, "drop-shadow-[2px_3px_3px_rgba(60,35,15,0.35)]", className)}
      width="50"
      height="30"
      viewBox="0 0 50 30"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path d="M5,15 C15,15 20,5 25,15 C30,25 35,15 45,15" fill="none" stroke="#e0cdab" strokeWidth="3" strokeLinecap="round" />
      <path d="M15,20 C25,20 20,10 25,15" fill="none" stroke="#e0cdab" strokeWidth="3" strokeLinecap="round" />
      <path d="M5,15 C15,15 20,5 25,15 C30,25 35,15 45,15" fill="none" stroke="#c2ae89" strokeWidth="1" strokeDasharray="1 1" opacity="0.6" />
      <path d="M15,20 C25,20 20,10 25,15" fill="none" stroke="#c2ae89" strokeWidth="1" strokeDasharray="1 1" opacity="0.6" />
    </svg>
  );
}
