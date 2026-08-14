"use client";

import React from "react";
import Image from "next/image";
import { HotspotData } from "@/lib/three/worldData";
import { ProjectedHotspot } from "./ThreeWorld";
import { cn } from "@/lib/utils";

interface SpatialHotspotsProps {
  projectedHotspots: ProjectedHotspot[];
  focusedHotspot: HotspotData | null;
  onHotspotSelect: (hotspot: HotspotData) => void;
  onCloseHotspot: () => void;
}

export function SpatialHotspots({
  projectedHotspots,
  focusedHotspot,
  onHotspotSelect,
  onCloseHotspot,
}: SpatialHotspotsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {/* 3D Projected Screen Hotspot Markers */}
      {projectedHotspots.map(({ hotspot, screenX, screenY, visible, distance }) => {
        if (!visible) return null;
        const isSelected = focusedHotspot?.id === hotspot.id;

        // Scale marker based on distance
        const scale = Math.max(0.7, Math.min(1.2, 25 / (distance + 0.1)));

        return (
          <div
            key={hotspot.id}
            style={{
              transform: `translate3d(${screenX}px, ${screenY}px, 0) scale(${scale})`,
              transformOrigin: "center center",
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          >
            <button
              onClick={() => onHotspotSelect(hotspot)}
              className={cn(
                "group relative flex items-center gap-2 p-1.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-xl",
                isSelected
                  ? "bg-coral-sun text-marine-espresso scale-110 ring-4 ring-coral-sun/30"
                  : "bg-marine-espresso/80 text-alabaster border border-alabaster/20 hover:border-coral-sun hover:scale-105"
              )}
              title={hotspot.title}
              aria-label={`Inspect ${hotspot.title}`}
            >
              {/* Pulsing Core Radar Ring */}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral-sun opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-coral-sun" />
              </span>

              {/* Minimal Label Badge (Expands on Hover or Selection) */}
              <span className="font-serif text-[11px] tracking-wider uppercase pr-2 font-medium whitespace-nowrap">
                {hotspot.title}
              </span>
            </button>
          </div>
        );
      })}

      {/* Contextual Hotspot Detail Drawer (Persepolis Inspection Panel) */}
      {focusedHotspot && (
        <div className="absolute bottom-6 right-6 z-40 max-w-md w-full pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-marine-deep/95 backdrop-blur-xl border border-sand/30 rounded-2xl p-6 sm:p-7 text-alabaster shadow-2xl">
            
            {/* Header: Category & Close Button */}
            <div className="flex items-center justify-between border-b border-alabaster/10 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-coral-sun" />
                <span className="text-[10px] font-mono tracking-[0.25em] text-coral-sun uppercase font-bold">
                  {focusedHotspot.category}
                </span>
              </div>
              <button
                onClick={onCloseHotspot}
                className="p-1 text-alabaster/60 hover:text-alabaster transition-colors"
                aria-label="Close Inspection"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Title & Tagline */}
            <h3 className="font-serif text-2xl sm:text-3xl text-alabaster leading-tight">
              {focusedHotspot.title}
            </h3>
            <div className="text-xs font-serif italic text-coral-sun/90 mt-1">
              {focusedHotspot.tagline}
            </div>

            {/* Description Body */}
            <p className="mt-3 font-sans text-xs sm:text-sm text-alabaster/80 font-light leading-relaxed">
              {focusedHotspot.description}
            </p>

            {/* Technical Specifications Grid (if available) */}
            {focusedHotspot.specs && focusedHotspot.specs.length > 0 && (
              <div className="mt-5 grid grid-cols-2 gap-2 pt-4 border-t border-alabaster/10">
                {focusedHotspot.specs.map((spec, i) => (
                  <div key={i} className="bg-marine-espresso/60 p-2.5 rounded-lg border border-alabaster/10">
                    <div className="text-[9px] font-mono text-alabaster/50 uppercase tracking-wider">
                      {spec.label}
                    </div>
                    <div className="font-serif text-xs sm:text-sm text-coral-sun font-medium mt-0.5">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer Action */}
            <div className="mt-5 pt-3 border-t border-alabaster/10 flex items-center justify-between">
              <span className="text-[9px] font-mono text-alabaster/50 uppercase tracking-widest">
                SPATIAL INSPECTION
              </span>
              <button
                onClick={onCloseHotspot}
                className="px-4 py-1.5 bg-coral-sun/20 border border-coral-sun text-coral-sun hover:bg-coral-sun hover:text-marine-espresso font-mono text-[10px] uppercase tracking-[0.18em] font-semibold rounded-full transition-colors"
              >
                RESUME EXPEDITION →
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
