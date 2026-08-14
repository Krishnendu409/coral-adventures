"use client";

import React from "react";
import Image from "next/image";
import { EXPEDITION_ZONES, WaypointZone } from "@/lib/three/worldData";
import { cn } from "@/lib/utils";

interface GlobalNauticalMapProps {
  isOpen: boolean;
  currentZoneIndex: number;
  onSelectZone: (index: number) => void;
  onClose: () => void;
}

export function GlobalNauticalMap({
  isOpen,
  currentZoneIndex,
  onSelectZone,
  onClose,
}: GlobalNauticalMapProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-marine-espresso/90 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-300">
      
      {/* Top Map Header */}
      <div className="flex items-center justify-between border-b border-sand/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9">
            <Image src="/images/coral_logo_mark.png" alt="Coral Emblem" fill className="object-contain" />
          </div>
          <div>
            <h2 className="font-serif text-2xl text-alabaster tracking-wide">
              GLOBAL EXPEDITION NAUTICAL MAP
            </h2>
            <div className="text-[9px] font-mono tracking-[0.25em] text-coral-sun uppercase font-semibold">
              MALPE · ST. MARY'S · ARABIAN SEA HORIZON
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-alabaster/10 border border-alabaster/20 text-alabaster hover:border-coral-sun transition-colors font-mono text-xs uppercase tracking-wider"
        >
          <span>CLOSE MAP</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Center Interactive Expedition Route Graph & Waypoint Cards */}
      <div className="my-auto max-w-6xl w-full mx-auto">
        <div className="text-center mb-8">
          <span className="text-[10px] font-mono tracking-[0.3em] text-coral-sun uppercase font-bold">
            SELECT ANY WAYPOINT TO NAVIGATE CAMERA IMMEDIATELY
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {EXPEDITION_ZONES.map((zone, i) => {
            const isCurrent = currentZoneIndex === i;

            return (
              <button
                key={zone.id}
                onClick={() => {
                  onSelectZone(i);
                  onClose();
                }}
                className={cn(
                  "p-4 rounded-xl border text-left transition-all duration-300 transform active:scale-98 flex flex-col justify-between gap-3 group relative overflow-hidden",
                  isCurrent
                    ? "bg-gradient-to-br from-coral-sun/25 to-coral-orange/20 border-coral-sun shadow-[0_8px_24px_rgba(253,184,39,0.25)] ring-2 ring-coral-sun/40"
                    : "bg-marine-deep/70 border-alabaster/10 text-alabaster/80 hover:border-coral-sun/60 hover:bg-marine-deep hover:text-alabaster"
                )}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-[10px] font-mono font-bold tracking-wider",
                    isCurrent ? "text-coral-sun" : "text-alabaster/50 group-hover:text-coral-sun"
                  )}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-alabaster/10">
                    {zone.category.split("·")[0].trim()}
                  </span>
                </div>

                {/* Main Zone Title */}
                <div>
                  <h3 className="font-serif text-sm sm:text-base text-alabaster font-medium leading-tight group-hover:text-coral-sun transition-colors">
                    {zone.title}
                  </h3>
                  <div className="text-[9.5px] font-sans text-alabaster/60 font-light mt-1 line-clamp-1">
                    {zone.subtitle}
                  </div>
                </div>

                {/* Hotspot Count */}
                <div className="pt-2 border-t border-alabaster/10 flex items-center justify-between text-[9px] font-mono text-alabaster/50">
                  <span>{zone.hotspots.length} HOTSPOTS</span>
                  <span className="text-coral-sun opacity-0 group-hover:opacity-100 transition-opacity">
                    NAVIGATE →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div className="border-t border-sand/20 pt-4 flex items-center justify-between text-[10px] font-mono text-alabaster/60 uppercase tracking-widest">
        <span>COORDINATES: 13°21′02″ N · 74°42′08″ E</span>
        <button
          onClick={onClose}
          className="text-coral-sun hover:underline font-bold"
        >
          RESUME 3D EXPLORATION →
        </button>
      </div>

    </div>
  );
}
