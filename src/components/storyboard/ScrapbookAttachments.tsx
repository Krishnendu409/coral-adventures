"use client";

import React from "react";
import { cn } from "@/lib/utils";

// 1. MetalPaperClip
export interface MetalPaperClipProps {
  rotation?: number;
  size?: "sm" | "md" | "lg";
  color?: "silver" | "gold" | "rose";
  className?: string;
}
export function MetalPaperClip({ rotation = 0, size = "md", color = "silver", className }: MetalPaperClipProps) {
  const sizeMap = { sm: { w: 12, h: 40 }, md: { w: 18, h: 60 }, lg: { w: 24, h: 80 } };
  const dims = sizeMap[size];
  
  const colors = {
    silver: { stop1: "#E0E0E0", stop2: "#9E9E9E", stop3: "#F5F5F5" },
    gold: { stop1: "#F1C40F", stop2: "#B7950B", stop3: "#F9E79F" },
    rose: { stop1: "#E6A8D7", stop2: "#C27BA0", stop3: "#F4C2C2" }
  };
  const c = colors[color];

  return (
    <div
      className={cn("pointer-events-none select-none drop-shadow-md", className)}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <svg width={dims.w} height={dims.h} viewBox="0 0 24 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={c.stop1} />
            <stop offset="50%" stopColor={c.stop2} />
            <stop offset="100%" stopColor={c.stop3} />
          </linearGradient>
          <filter id="clip-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodOpacity="0.4" />
          </filter>
        </defs>
        <path
          d="M12 2C6.47715 2 2 6.47715 2 12V60C2 63.3137 4.68629 66 8 66C11.3137 66 14 63.3137 14 60V16C14 13.7909 15.7909 12 18 12C20.2091 12 22 13.7909 22 16V68C22 73.5228 17.5228 78 12 78C6.47715 78 2 73.5228 2 68"
          stroke={`url(#grad-${color})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#clip-shadow)"
        />
      </svg>
    </div>
  );
}

// 2. BinderClip
export interface BinderClipProps {
  rotation?: number;
  size?: "sm" | "md";
  className?: string;
}
export function BinderClip({ rotation = 0, size = "md", className }: BinderClipProps) {
  const scale = size === "sm" ? 0.7 : 1;
  return (
    <div
      className={cn("pointer-events-none select-none relative drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]", className)}
      style={{ transform: `rotate(${rotation}deg) scale(${scale})`, width: 40, height: 40 }}
    >
      {/* Handles */}
      <svg width="40" height="30" viewBox="0 0 40 30" className="absolute -top-6 left-0">
        <path d="M12 25 L8 5 A3 3 0 0 1 14 5 L16 25" stroke="#7f8c8d" strokeWidth="2" fill="none" />
        <path d="M28 25 L32 5 A3 3 0 0 0 26 5 L24 25" stroke="#7f8c8d" strokeWidth="2" fill="none" />
      </svg>
      {/* Body */}
      <div className="absolute top-0 left-0 w-10 h-6 bg-gray-900 rounded-sm border-t-2 border-gray-700 shadow-inner">
        <div className="w-full h-full bg-gradient-to-b from-gray-800 to-black opacity-80 rounded-sm"></div>
      </div>
    </div>
  );
}

// 3. WashiTapeStrip
export interface WashiTapeStripProps {
  pattern?: "dots" | "stripes" | "plain" | "chevron";
  color?: string;
  width?: number;
  rotation?: number;
  className?: string;
}
export function WashiTapeStrip({ pattern = "dots", color = "#ff9a9e", width = 120, rotation = -5, className }: WashiTapeStripProps) {
  const getPattern = () => {
    switch (pattern) {
      case "dots": return `radial-gradient(circle, rgba(255,255,255,0.4) 2px, transparent 2px)`;
      case "stripes": return `repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.3) 5px, rgba(255,255,255,0.3) 10px)`;
      case "chevron": return `repeating-linear-gradient(135deg, transparent, transparent 4px, rgba(255,255,255,0.2) 4px, rgba(255,255,255,0.2) 8px)`;
      default: return 'none';
    }
  };

  return (
    <div
      className={cn("pointer-events-none select-none opacity-80 mix-blend-multiply drop-shadow-sm", className)}
      style={{
        width: `${width}px`,
        height: '24px',
        backgroundColor: color,
        backgroundImage: getPattern(),
        backgroundSize: pattern === 'dots' ? '10px 10px' : 'auto',
        transform: `rotate(${rotation}deg)`,
        clipPath: 'polygon(2% 0, 98% 2%, 100% 98%, 1% 100%)', // Irregular torn edges
        filter: 'drop-shadow(1px 2px 2px rgba(0,0,0,0.1))'
      }}
    />
  );
}

// 4. VintagePostageStamp
export interface VintagePostageStampProps {
  value?: "₹5" | "₹10" | "₹20";
  color?: "red" | "green" | "blue" | "purple";
  rotation?: number;
  className?: string;
}
export function VintagePostageStamp({ value = "₹5", color = "red", rotation = 5, className }: VintagePostageStampProps) {
  const bgColors = { red: "bg-red-50", green: "bg-green-50", blue: "bg-blue-50", purple: "bg-purple-50" };
  const inkColors = { red: "text-red-800 border-red-800", green: "text-green-800 border-green-800", blue: "text-blue-800 border-blue-800", purple: "text-purple-800 border-purple-800" };
  
  return (
    <div
      className={cn("pointer-events-none select-none w-14 h-16 bg-white p-1 drop-shadow-md", className)}
      style={{
        transform: `rotate(${rotation}deg)`,
        maskImage: `radial-gradient(circle 2px at 0 0, transparent 0, transparent 2px, black 2px)`,
        maskSize: `8px 8px`,
        maskPosition: `-4px -4px`
      }}
    >
      <div className={cn("w-full h-full border border-dashed flex flex-col items-center justify-center p-1", bgColors[color], inkColors[color])}>
        <span className="text-[10px] uppercase font-serif tracking-widest opacity-80">India</span>
        <div className={cn("w-full h-full border mt-1 mb-1 flex items-center justify-center opacity-70", inkColors[color])}>
          {/* Simple geo design */}
          <div className="w-4 h-4 rotate-45 border border-current"></div>
        </div>
        <span className="text-sm font-serif font-bold">{value}</span>
      </div>
    </div>
  );
}

// 5. PhotoCornerMount
export interface PhotoCornerMountProps {
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  color?: "black" | "gold" | "kraft";
  className?: string;
}
export function PhotoCornerMount({ position = "topLeft", color = "black", className }: PhotoCornerMountProps) {
  const colors = {
    black: "#222",
    gold: "linear-gradient(135deg, #d4af37, #aa801e)",
    kraft: "#c19a6b"
  };

  const getTransform = () => {
    switch (position) {
      case "topLeft": return "rotate(0deg)";
      case "topRight": return "rotate(90deg)";
      case "bottomRight": return "rotate(180deg)";
      case "bottomLeft": return "rotate(-90deg)";
    }
  };

  return (
    <div
      className={cn("pointer-events-none select-none w-6 h-6 absolute drop-shadow-sm", className)}
      style={{ transform: getTransform() }}
    >
      <div 
        className="w-full h-full"
        style={{
          background: color === 'gold' ? colors.gold : colors[color],
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
          boxShadow: "inset -1px -1px 2px rgba(0,0,0,0.3)"
        }}
      />
      <div 
        className="absolute top-1 left-1 w-4 h-4 bg-transparent border-t border-l border-white/20"
        style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
      />
    </div>
  );
}

// 6. CircularSticker
export interface CircularStickerProps {
  text?: string;
  subtext?: string;
  color?: string;
  size?: "sm" | "md";
  rotation?: number;
  className?: string;
}
export function CircularSticker({ text = "APPROVED", subtext, color = "#ff5252", size = "md", rotation = -10, className }: CircularStickerProps) {
  const d = size === "sm" ? 40 : 64;
  return (
    <div
      className={cn("pointer-events-none select-none rounded-full flex flex-col items-center justify-center text-white font-bold tracking-wider drop-shadow-md", className)}
      style={{
        width: d, height: d,
        backgroundColor: color,
        transform: `rotate(${rotation}deg)`,
        boxShadow: "inset -2px -2px 6px rgba(0,0,0,0.2), 2px 4px 6px rgba(0,0,0,0.15)",
        border: "2px solid rgba(255,255,255,0.2)"
      }}
    >
      <span style={{ fontSize: size === 'sm' ? '8px' : '12px' }}>{text}</span>
      {subtext && <span style={{ fontSize: size === 'sm' ? '6px' : '8px', opacity: 0.8 }}>{subtext}</span>}
      {/* Glossy highlight */}
      <div className="absolute top-1 left-1 w-1/2 h-1/2 bg-white/20 rounded-full blur-[2px]"></div>
    </div>
  );
}

// 7. InkStampMark
export interface InkStampMarkProps {
  text?: string;
  date?: string;
  shape?: "circle" | "rectangle";
  color?: "red" | "blue" | "black";
  rotation?: number;
  className?: string;
}
export function InkStampMark({ text = "VISITED", date = "12 OCT 2023", shape = "circle", color = "red", rotation = 15, className }: InkStampMarkProps) {
  const c = { red: "text-red-600 border-red-600", blue: "text-blue-600 border-blue-600", black: "text-gray-800 border-gray-800" }[color];
  
  if (shape === "circle") {
    return (
      <div
        className={cn("pointer-events-none select-none w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center opacity-60 mix-blend-multiply", c, className)}
        style={{ transform: `rotate(${rotation}deg)`, filter: 'url(#rough-edge)' }} // pseudo filter
      >
        <div className="w-16 h-16 rounded-full border border-dashed flex flex-col items-center justify-center opacity-80">
          <span className="text-[10px] font-bold tracking-widest uppercase">{text}</span>
          <span className="text-[8px] font-mono mt-1">{date}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("pointer-events-none select-none px-4 py-2 border-4 flex flex-col items-center justify-center opacity-60 mix-blend-multiply", c, className)}
      style={{ transform: `rotate(${rotation}deg)`, borderRadius: '4px' }}
    >
      <span className="text-sm font-bold tracking-widest uppercase">{text}</span>
      <span className="text-[10px] font-mono mt-1 opacity-90">{date}</span>
    </div>
  );
}

// 8. MaskingTapePiece
export interface MaskingTapePieceProps {
  width?: number;
  rotation?: number;
  className?: string;
}
export function MaskingTapePiece({ width = 80, rotation = -3, className }: MaskingTapePieceProps) {
  return (
    <div
      className={cn("pointer-events-none select-none bg-[#f4ebd0] opacity-85 mix-blend-multiply drop-shadow-sm", className)}
      style={{
        width: `${width}px`,
        height: '22px',
        transform: `rotate(${rotation}deg)`,
        clipPath: 'polygon(3% 0, 97% 2%, 99% 98%, 1% 100%)',
        boxShadow: 'inset 0 0 4px rgba(0,0,0,0.05)'
      }}
    >
      {/* Texture */}
      <div className="w-full h-full opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)' }}></div>
    </div>
  );
}

// 9. CorkBoardPin
export interface CorkBoardPinProps {
  color?: "red" | "blue" | "green" | "yellow" | "white";
  rotation?: number;
  className?: string;
}
export function CorkBoardPin({ color = "red", rotation = 45, className }: CorkBoardPinProps) {
  const colors = { red: "#e74c3c", blue: "#3498db", green: "#2ecc71", yellow: "#f1c40f", white: "#ecf0f1" };
  const c = colors[color];
  return (
    <div
      className={cn("pointer-events-none select-none relative", className)}
      style={{ width: 16, height: 16, transform: `rotate(${rotation}deg)` }}
    >
      {/* Pin Shadow */}
      <div className="absolute top-2 left-2 w-4 h-4 bg-black/30 rounded-full blur-sm"></div>
      {/* Pin Head */}
      <div 
        className="absolute top-0 left-0 w-full h-full rounded-full border border-black/10"
        style={{ 
          backgroundColor: c,
          boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.6)'
        }}
      ></div>
    </div>
  );
}

// 10. StringTag
export interface StringTagProps {
  text?: string;
  rotation?: number;
  className?: string;
}
export function StringTag({ text = "Note", rotation = 10, className }: StringTagProps) {
  return (
    <div
      className={cn("pointer-events-none select-none relative w-16 h-8 drop-shadow-md", className)}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* String */}
      <svg className="absolute -left-6 top-1/2 -translate-y-1/2 w-8 h-8 overflow-visible">
        <path d="M 24 4 C 10 -10, -5 20, 4 4" fill="none" stroke="#e0d6c8" strokeWidth="1.5" strokeDasharray="1 1" />
      </svg>
      {/* Tag */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-[#d2b48c] border border-[#c19a6b] flex items-center pl-4 rounded-r-sm"
        style={{ clipPath: 'polygon(15% 0%, 100% 0, 100% 100%, 15% 100%, 0% 50%)' }}
      >
        <div className="absolute left-[3px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#4a3b2c] rounded-full"></div>
        <span className="text-[10px] font-mono text-[#4a3b2c] ml-1">{text}</span>
      </div>
    </div>
  );
}

// 11. FoldedMapCorner
export interface FoldedMapCornerProps {
  rotation?: number;
  className?: string;
}
export function FoldedMapCorner({ rotation = 0, className }: FoldedMapCornerProps) {
  return (
    <div
      className={cn("pointer-events-none select-none relative w-12 h-12", className)}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div 
        className="absolute bottom-0 right-0 w-full h-full bg-white drop-shadow-md"
        style={{ 
          clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
          background: 'linear-gradient(135deg, #fff 40%, #e0e0e0)'
        }}
      ></div>
    </div>
  );
}

// 12. StickyNotePad
export interface StickyNotePadProps {
  text?: string;
  color?: "yellow" | "pink" | "blue" | "green";
  rotation?: number;
  className?: string;
}
export function StickyNotePad({ text = "Remember!", color = "yellow", rotation = 2, className }: StickyNotePadProps) {
  const colors = {
    yellow: "bg-[#fff740]",
    pink: "bg-[#ff7eb9]",
    blue: "bg-[#7afcff]",
    green: "bg-[#bcff7a]"
  };
  return (
    <div
      className={cn("pointer-events-none select-none w-24 h-24 p-3 relative flex items-center justify-center text-center shadow-[2px_4px_6px_rgba(0,0,0,0.15)]", colors[color], className)}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Curl effect */}
      <div className="absolute bottom-0 right-0 w-8 h-8 shadow-[-2px_-2px_4px_rgba(0,0,0,0.1)] rounded-tl-lg bg-white/20" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}></div>
      <span className="font-sans text-sm text-gray-800 rotate-[-2deg] opacity-80 leading-tight">{text}</span>
    </div>
  );
}
