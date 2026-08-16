import React from "react";
import { cn } from "@/lib/utils";

interface ExpeditionStampProps {
  location?: string;
  year?: string;
  coords?: string;
  className?: string;
  color?: "coral" | "palm" | "ocean" | "sun" | "azure" | "gold";
}

export function ExpeditionStamp({
  location = "MALPE HARBOR",
  year = "2026",
  coords = "13°21′02″ N",
  className,
  color = "azure",
}: ExpeditionStampProps) {
  const colorMap = {
    coral: "text-[#0284C7] border-[#0284C7]/50",
    azure: "text-[#0284C7] border-[#0284C7]/50",
    palm: "text-[#1E5E48] border-[#1E5E48]/40",
    ocean: "text-[#1E40AF] border-[#1E40AF]/40",
    sun: "text-[#C5A059] border-[#C5A059]/50",
    gold: "text-[#C5A059] border-[#C5A059]/50",
  };

  return (
    <div
      className={cn(
        "relative inline-flex flex-col items-center justify-center p-3 border-2 border-dashed rounded-full select-none rotate-[-6deg] opacity-90 transition-transform duration-300 hover:rotate-0",
        colorMap[color] || colorMap.azure,
        className
      )}
      style={{ width: "96px", height: "96px" }}
      aria-hidden="true"
    >
      <span className="text-[7.5px] font-sans uppercase tracking-[0.2em] font-bold text-center leading-tight">
        CORAL
        <br />
        EXPEDITION
      </span>
      <div className="w-8 h-[1px] bg-current my-0.5 opacity-60" />
      <span className="text-[7px] font-sans uppercase tracking-[0.15em] opacity-80">
        {location}
      </span>
      <span className="text-[6.5px] font-mono tracking-[0.1em] opacity-65">
        {coords}
      </span>
      <span className="text-[8px] font-mono font-bold tracking-widest mt-0.5">
        {year}
      </span>
    </div>
  );
}
