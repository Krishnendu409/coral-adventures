"use client";

import React from "react";
import { cn } from "@/lib/utils";

// 1. Coiled Marine Rope on Sand
export function CoiledRope({ className, rotation = 0 }: { className?: string; rotation?: number }) {
  return (
    <div
      className={cn("relative pointer-events-none select-none", className)}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <svg width="110" height="90" viewBox="0 0 110 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
        {/* Ambient Sand Shadow */}
        <ellipse cx="55" cy="50" rx="46" ry="32" fill="#26180B" opacity="0.35" filter="blur(6px)" />
        {/* Outer Loop */}
        <path d="M 20 50 C 20 28, 90 26, 90 48 C 90 68, 24 70, 24 50" stroke="#8C6E4E" strokeWidth="8" strokeLinecap="round" />
        <path d="M 20 50 C 20 28, 90 26, 90 48 C 90 68, 24 70, 24 50" stroke="#D2B48C" strokeWidth="6" strokeLinecap="round" />
        <path d="M 20 50 C 20 28, 90 26, 90 48 C 90 68, 24 70, 24 50" stroke="#F5DEB3" strokeWidth="2" strokeDasharray="4 3" />
        {/* Inner Loop */}
        <path d="M 32 48 C 32 34, 78 32, 78 48 C 78 62, 36 62, 36 48" stroke="#8C6E4E" strokeWidth="8" strokeLinecap="round" />
        <path d="M 32 48 C 32 34, 78 32, 78 48 C 78 62, 36 62, 36 48" stroke="#C4A47C" strokeWidth="6" strokeLinecap="round" />
        <path d="M 32 48 C 32 34, 78 32, 78 48 C 78 62, 36 62, 36 48" stroke="#F5DEB3" strokeWidth="2" strokeDasharray="4 3" />
        {/* Loose Frayed End */}
        <path d="M 78 48 Q 95 62 102 75" stroke="#8C6E4E" strokeWidth="7" strokeLinecap="round" />
        <path d="M 78 48 Q 95 62 102 75" stroke="#C4A47C" strokeWidth="5" strokeLinecap="round" />
        <path d="M 78 48 Q 95 62 102 75" stroke="#F5DEB3" strokeWidth="1.5" strokeDasharray="4 3" />
      </svg>
    </div>
  );
}

// 2. Activity Wristband (Blue / Orange Waterproof Tag)
export function ActivityWristband({
  color = "cyan",
  code = "ACT-24KT",
  label = "MALPE SURF PASS",
  rotation = -8,
  className,
}: {
  color?: "cyan" | "orange" | "amber";
  code?: string;
  label?: string;
  rotation?: number;
  className?: string;
}) {
  const bgStyles = {
    cyan: "bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] text-white",
    orange: "bg-gradient-to-r from-[#EA580C] via-[#F97316] to-[#FB923C] text-white",
    amber: "bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#FBBF24] text-[#1E1B18]",
  }[color];

  return (
    <div
      className={cn(
        "relative inline-flex items-center gap-3 px-3 py-1.5 rounded-[1px] shadow-[4px_6px_14px_rgba(40,25,10,0.3)] border border-white/20 select-none pointer-events-none transform-gpu",
        bgStyles,
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Barcode Lines */}
      <div className="flex items-center gap-0.5 opacity-80">
        <div className="w-[1.5px] h-4 bg-current" />
        <div className="w-[3px] h-4 bg-current" />
        <div className="w-[1px] h-4 bg-current" />
        <div className="w-[2px] h-4 bg-current" />
        <div className="w-[1px] h-4 bg-current" />
        <div className="w-[2.5px] h-4 bg-current" />
      </div>
      <div>
        <p className="font-mono text-[9px] font-bold tracking-widest leading-none">{label}</p>
        <p className="font-mono text-[8px] opacity-75 tracking-wider mt-0.5 leading-none">{code} · 2026</p>
      </div>
      {/* Adhesive Lock Notch */}
      <div className="w-2.5 h-2.5 rounded-full bg-white/40 border border-current/30 ml-1" />
    </div>
  );
}

// 3. Orange Buoy Tag with Brass Eyelet & Twine
export function BuoyTag({ rotation = 12, className }: { rotation?: number; className?: string }) {
  return (
    <div
      className={cn("relative inline-block select-none pointer-events-none transform-gpu", className)}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="relative bg-[#FF6B35] text-[#FAF6EE] px-3.5 py-2 rounded-[2px] shadow-[6px_8px_18px_rgba(50,20,5,0.35)] border border-[#D94814]">
        {/* Brass Eyelet Hole at Top Corner */}
        <div className="absolute top-1.5 left-1.5 w-3 h-3 rounded-full bg-[#D4AF37] border border-[#8C6D1F] flex items-center justify-center shadow-inner">
          <div className="w-1.5 h-1.5 rounded-full bg-[#2A180B]" />
        </div>
        <div className="pl-3.5">
          <p className="font-mono text-[8px] uppercase tracking-widest text-black/60 font-bold">SAFETY SPEC</p>
          <p className="font-mono text-[10px] font-extrabold tracking-wider leading-none mt-0.5">ZONE 02 · 150M SWASH</p>
          <p className="font-mono text-[8px] text-white/80 tracking-widest mt-0.5 leading-none">LIFE VEST COMPULSORY</p>
        </div>
      </div>
    </div>
  );
}

// 4. Life-Jacket Strap & Buckle
export function LifeJacketStrap({ className, rotation = -15 }: { className?: string; rotation?: number }) {
  return (
    <div
      className={cn("relative pointer-events-none select-none", className)}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
        {/* Shadow */}
        <path d="M 0 20 L 120 20" stroke="#2A180B" strokeWidth="14" opacity="0.3" filter="blur(4px)" />
        {/* Heavy Black Webbing Strap */}
        <path d="M 0 18 L 120 18" stroke="#1C1917" strokeWidth="12" strokeLinecap="round" />
        <path d="M 0 18 L 120 18" stroke="#44403C" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Plastic Quick-Release Buckle */}
        <rect x="45" y="8" width="30" height="20" rx="3" fill="#0C0A09" stroke="#57534E" strokeWidth="1.5" />
        <line x1="55" y1="12" x2="55" y2="24" stroke="#78716C" strokeWidth="2" />
        <line x1="65" y1="12" x2="65" y2="24" stroke="#78716C" strokeWidth="2" />
      </svg>
    </div>
  );
}

// 5. Onboard Drink Coaster with Coffee/Drink Ring Stain
export function DrinkCoaster({ rotation = 6, className }: { rotation?: number; className?: string }) {
  return (
    <div
      className={cn(
        "relative w-28 h-28 rounded-full bg-[#F5EADB] border border-[#D6C4AD] p-2 shadow-[8px_12px_22px_rgba(60,35,15,0.28)] flex flex-col items-center justify-center text-center select-none pointer-events-none transform-gpu",
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Dark Coffee / Drink Ring Stain SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 112 112" fill="none">
        <circle cx="56" cy="56" r="44" stroke="#8C532B" strokeWidth="3" opacity="0.35" strokeDasharray="14 6 22 4" filter="blur(0.5px)" />
        <circle cx="58" cy="54" r="42" stroke="#6E3E1C" strokeWidth="1.5" opacity="0.25" />
      </svg>
      <p className="font-mono text-[7px] uppercase tracking-widest text-[#8C6D46] font-bold">CORAL BAR · UPPER DECK</p>
      <p className="font-serif italic text-[11px] text-[#3D2817] font-semibold mt-0.5">Tender Coconut Spritz</p>
      <p className="font-mono text-[7px] text-[#A68A64] tracking-wider mt-0.5">13°21′ N · ARABIAN SEA</p>
    </div>
  );
}

// 6. Sea Glass Pebble (Frosted Turquoise or Amber)
export function SeaGlass({
  color = "turquoise",
  rotation = 0,
  className,
}: {
  color?: "turquoise" | "amber" | "white";
  rotation?: number;
  className?: string;
}) {
  const colorStyles = {
    turquoise: "from-[#2DD4BF]/80 via-[#14B8A6]/70 to-[#0D9488]/90 shadow-[4px_6px_12px_rgba(13,148,136,0.3)]",
    amber: "from-[#FBBF24]/80 via-[#F59E0B]/70 to-[#D97706]/90 shadow-[4px_6px_12px_rgba(217,119,6,0.3)]",
    white: "from-white/90 via-[#F1F5F9]/80 to-[#CBD5E1]/90 shadow-[4px_6px_12px_rgba(70,45,20,0.25)]",
  }[color];

  return (
    <div
      className={cn(
        "relative w-7 h-5 rounded-[45%_55%_65%_35%/50%_60%_40%_50%] bg-gradient-to-br backdrop-blur-xs border border-white/40 pointer-events-none select-none transform-gpu",
        colorStyles,
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Specular Wet Glint */}
      <div className="absolute top-1 left-1.5 w-2 h-1 rounded-full bg-white/70" />
    </div>
  );
}
