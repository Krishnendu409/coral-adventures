import React from "react";
import { cn } from "@/lib/utils";

interface FieldNoteBadgeProps {
  noteNumber?: string;
  headline?: string;
  body: string;
  author?: string;
  coords?: string;
  className?: string;
  color?: "palm" | "ocean" | "coral" | "sun" | "azure" | "gold";
}

export function FieldNoteBadge({
  noteNumber = "FIELD NOTE 02",
  headline = "THE BASALT COLUMNS",
  body,
  author = "CAPTAIN'S LOG · ARABIAN SEA",
  coords,
  className,
  color = "palm",
}: FieldNoteBadgeProps) {
  const accentDotMap = {
    palm: "bg-[#1E5E48]",
    ocean: "bg-[#1E40AF]",
    coral: "bg-[#0284C7]",
    azure: "bg-[#0284C7]",
    sun: "bg-[#C5A059]",
    gold: "bg-[#C5A059]",
  };

  const tagColorMap = {
    palm: "text-[#1E5E48]",
    ocean: "text-[#1E40AF]",
    coral: "text-[#0284C7]",
    azure: "text-[#0284C7]",
    sun: "text-[#C5A059]",
    gold: "text-[#C5A059]",
  };

  return (
    <div
      className={cn(
        "relative p-4 sm:p-5 border border-[#E2D9C8] rounded-xs postcard-shadow max-w-sm select-none transition-transform duration-300 hover:scale-[1.02] bg-[#FAF6EE] text-[#0A2540]",
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={cn("w-2 h-2 rounded-full", accentDotMap[color] || accentDotMap.azure)} />
          <span className={cn("text-[8.5px] font-sans tracking-[0.25em] font-bold uppercase", tagColorMap[color] || tagColorMap.azure)}>
            {noteNumber}
          </span>
        </div>
        {coords && (
          <span className="text-[8px] font-mono tracking-[0.15em] text-[#0A2540]/60 uppercase">
            {coords}
          </span>
        )}
      </div>
      {headline && (
        <h4 className="font-serif text-lg text-[#0A2540] font-semibold tracking-tight mb-1.5 leading-tight">
          {headline}
        </h4>
      )}
      <p className="font-serif italic text-sm text-[#0A2540]/85 leading-relaxed mb-3">
        &ldquo;{body}&rdquo;
      </p>
      <div className="text-[8px] font-sans tracking-[0.2em] text-[#0A2540]/60 uppercase border-t border-[#0A2540]/10 pt-2">
        {author}
      </div>
    </div>
  );
}
