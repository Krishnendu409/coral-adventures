"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface Zone01Hotspot {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  position: { xPercent: number; yPercent: number }; // Screen coordinate percentage
  specs?: { label: string; value: string }[];
  targetLocation?: { x: number; z: number }; // 3D navigation target
}

export const ZONE_01_HOTSPOTS: Zone01Hotspot[] = [
  {
    id: "welcome-pavilion",
    title: "WELCOME PAVILION & RECEPTION",
    category: "ARCHITECTURE · BASE",
    tagline: "Shaded Teak & Palm Kiosk",
    position: { xPercent: 48, yPercent: 42 },
    description:
      "The physical gateway to Coral Adventures. Step beneath the timber-framed pavilion where expedition hosts provide cold-pressed refreshments, itinerary briefings, and marine sanctuary guidelines.",
    specs: [
      { label: "FACILITY", value: "Private Departure Lounge" },
      { label: "COORDINATES", value: "13°21′02″ N · 74°42′08″ E" },
      { label: "AMENITIES", value: "Gear Staging & Concierge" },
    ],
    targetLocation: { x: 0, z: -10 },
  },
  {
    id: "beach-promenade",
    title: "BEACH PROMENADE & SHALLOWS",
    category: "WAYFINDING · SHORELINE",
    tagline: "Stone & Sand Pathway",
    position: { xPercent: 78, yPercent: 58 },
    description:
      "The natural seaside path leading directly from the reception plaza to the pale sands and crystal shallows of Malpe Beach.",
    specs: [
      { label: "TERRAIN", value: "Natural Sand & Teak" },
      { label: "DISTANCE", value: "35m to Shoreline" },
      { label: "ACTIVITIES", value: "Watersports & Sun Loungers" },
    ],
    targetLocation: { x: 12, z: -5 },
  },
  {
    id: "watersports-staging",
    title: "WATERSPORTS STAGING AREA",
    category: "OPERATIONS · EXPEDITION",
    tagline: "Active Marine Preparation Zone",
    position: { xPercent: 22, yPercent: 54 },
    description:
      "Where jet skis, sea kayaks, and parasailing harnesses are prepared and safety-certified by our licensed marine instructors.",
    specs: [
      { label: "CRAFT", value: "Jet Skis, Kayaks, SUP" },
      { label: "INSTRUCTORS", value: "Certified Marine Crew" },
    ],
    targetLocation: { x: -12, z: -6 },
  },
  {
    id: "marina-pier",
    title: "EXPEDITION PIER & CATAMARAN",
    category: "MARITIME · BERTH 01",
    tagline: "Deepwater Boarding Dock",
    position: { xPercent: 52, yPercent: 28 },
    description:
      "Extending into the sheltered harbor waters where our 25.90M flagship catamaran, Coral Explorer, is moored and ready for open-sea departure.",
    specs: [
      { label: "BERTH", value: "Deepwater Slip 01" },
      { label: "VESSEL", value: "25.90M Catamaran" },
    ],
    targetLocation: { x: 0, z: -25 },
  },
];

interface EnvironmentalHotspotsProps {
  onSelectHotspot: (hotspot: Zone01Hotspot) => void;
  focusedHotspot: Zone01Hotspot | null;
  onCloseHotspot: () => void;
  onNavigateToLocation?: (loc: { x: number; z: number }) => void;
}

export function EnvironmentalHotspots({
  onSelectHotspot,
  focusedHotspot,
  onCloseHotspot,
  onNavigateToLocation,
}: EnvironmentalHotspotsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <>
      {/* 3D-Projected Subtle Environmental Markers */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {ZONE_01_HOTSPOTS.map((hotspot) => {
          const isSelected = focusedHotspot?.id === hotspot.id;
          const isHovered = hoveredId === hotspot.id;

          return (
            <div
              key={hotspot.id}
              style={{
                left: `${hotspot.position.xPercent}%`,
                top: `${hotspot.position.yPercent}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            >
              <button
                onClick={() => onSelectHotspot(hotspot)}
                onMouseEnter={() => setHoveredId(hotspot.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={cn(
                  "group relative flex items-center gap-2.5 p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-xl",
                  isSelected
                    ? "bg-coral-sun text-marine-espresso scale-110 ring-4 ring-coral-sun/40"
                    : "bg-marine-espresso/70 text-alabaster border border-alabaster/25 hover:border-coral-sun hover:scale-105"
                )}
                aria-label={`Discover ${hotspot.title}`}
              >
                {/* Museum-Grade Minimalist Pulsing Ring */}
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral-sun opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-coral-sun" />
                </span>

                {/* Expanding Elegant Waypoint Label */}
                {(isHovered || isSelected) && (
                  <span className="font-serif text-xs tracking-wider uppercase pr-2.5 font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-200">
                    {hotspot.title}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Contextual Discovery Drawer / Plaque */}
      {focusedHotspot && (
        <aside className="absolute bottom-8 right-6 sm:right-10 z-40 max-w-md w-full pointer-events-auto animate-in fade-in slide-in-from-bottom-6 duration-300">
          <div className="bg-marine-deep/95 backdrop-blur-2xl border border-sand/30 rounded-2xl p-6 sm:p-7 text-alabaster shadow-2xl">
            
            {/* Header: Category Tag & Close Button */}
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
                aria-label="Close Information Plaque"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Title & Subtitle */}
            <h3 className="font-serif text-2xl sm:text-3xl text-alabaster leading-tight">
              {focusedHotspot.title}
            </h3>
            <div className="text-xs font-serif italic text-coral-sun/90 mt-1">
              {focusedHotspot.tagline}
            </div>

            {/* Body */}
            <p className="mt-3 font-sans text-xs sm:text-sm text-alabaster/85 font-light leading-relaxed">
              {focusedHotspot.description}
            </p>

            {/* Technical Metadata Grid */}
            {focusedHotspot.specs && focusedHotspot.specs.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-alabaster/10">
                {focusedHotspot.specs.map((spec, i) => (
                  <div key={i} className="bg-marine-espresso/70 p-2.5 rounded-lg border border-alabaster/10">
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

            {/* Actions */}
            <div className="mt-5 pt-3 border-t border-alabaster/10 flex items-center justify-between">
              {focusedHotspot.targetLocation && onNavigateToLocation ? (
                <button
                  onClick={() => {
                    onNavigateToLocation(focusedHotspot.targetLocation!);
                    onCloseHotspot();
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-coral-sun to-coral-orange text-marine-espresso font-mono text-[10px] uppercase tracking-[0.2em] font-bold rounded-full hover:scale-105 transition-all shadow-md"
                >
                  WALK HERE →
                </button>
              ) : (
                <span className="text-[9px] font-mono text-alabaster/50 uppercase tracking-widest">
                  DESTINATION DETAILS
                </span>
              )}

              <button
                onClick={onCloseHotspot}
                className="text-[10px] font-mono uppercase tracking-[0.18em] text-alabaster/70 hover:text-coral-sun transition-colors underline decoration-1 underline-offset-4"
              >
                RESUME EXPLORATION
              </button>
            </div>

          </div>
        </aside>
      )}
    </>
  );
}
