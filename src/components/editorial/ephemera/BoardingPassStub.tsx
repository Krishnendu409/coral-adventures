import React from "react";
import { cn } from "@/lib/utils";

interface BoardingPassStubProps {
  passNumber?: string;
  routeFrom?: string;
  routeTo?: string;
  departureTime?: string;
  vesselName?: string;
  season?: string;
  className?: string;
  colorTheme?: "coral" | "cyan" | "gold";
}

export function BoardingPassStub({
  passNumber = "CR-2026-084",
  routeFrom = "MALPE HARBOR",
  routeTo = "ST. MARY'S ISLES",
  departureTime = "17:30 WESTBOUND",
  vesselName = "CORAL EXPLORER · 25.90M",
  season = "OCT — MAY · CALM SEA",
  className,
  colorTheme = "coral",
}: BoardingPassStubProps) {
  const themeStyles = {
    coral: "border-[#C2410C]/40 bg-[#FAF6EE] text-[#0A2540] shadow-md",
    cyan: "border-[#0D9488]/40 bg-[#FAF6EE] text-[#0A2540] shadow-md",
    gold: "border-[#D97706]/50 bg-[#FAF6EE] text-[#0A2540] shadow-md",
  }[colorTheme];

  return (
    <div
      className={cn(
        "relative p-4 sm:p-5 border border-dashed rounded-xs select-none max-w-sm postcard-shadow transition-transform duration-300 hover:scale-[1.02]",
        themeStyles,
        className
      )}
    >
      {/* Header Band */}
      <div className="flex items-center justify-between border-b border-[#0A2540]/15 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C2410C]" />
          <span className="text-[9px] font-mono uppercase tracking-[0.22em] font-bold text-[#0A2540]">
            EXPEDITION BOARDING PASS
          </span>
        </div>
        <span className="text-[8.5px] font-mono tracking-[0.2em] text-[#C2410C] font-semibold">
          {passNumber}
        </span>
      </div>

      {/* Route & Departure */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <span className="text-[7.5px] font-mono tracking-[0.2em] text-[#0A2540]/60 uppercase block">
            DEPARTURE
          </span>
          <span className="font-serif text-sm font-semibold text-[#0A2540] leading-tight block">
            {routeFrom}
          </span>
        </div>
        <div>
          <span className="text-[7.5px] font-mono tracking-[0.2em] text-[#0A2540]/60 uppercase block">
            DESTINATION
          </span>
          <span className="font-serif text-sm font-semibold text-[#0A2540] leading-tight block">
            {routeTo}
          </span>
        </div>
      </div>

      {/* Vessel & Season telemetry */}
      <div className="flex items-center justify-between border-t border-b border-[#0A2540]/10 py-2 mb-3 text-[8.5px] font-mono tracking-[0.15em] text-[#0A2540]/80">
        <span>{vesselName}</span>
        <span className="font-semibold text-[#C2410C]">{departureTime}</span>
      </div>

      {/* Barcode graphic & notch */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1 opacity-70">
          <div className="w-[2px] h-5 bg-[#0A2540]" />
          <div className="w-[1px] h-5 bg-[#0A2540]" />
          <div className="w-[3px] h-5 bg-[#0A2540]" />
          <div className="w-[1px] h-5 bg-[#0A2540]" />
          <div className="w-[2px] h-5 bg-[#0A2540]" />
          <div className="w-[4px] h-5 bg-[#0A2540]" />
          <div className="w-[1px] h-5 bg-[#0A2540]" />
          <div className="w-[2px] h-5 bg-[#0A2540]" />
          <div className="w-[3px] h-5 bg-[#0A2540]" />
          <div className="w-[1px] h-5 bg-[#0A2540]" />
        </div>
        <span className="text-[8px] font-mono tracking-[0.2em] text-[#0A2540]/60 uppercase">
          {season}
        </span>
      </div>
    </div>
  );
}
