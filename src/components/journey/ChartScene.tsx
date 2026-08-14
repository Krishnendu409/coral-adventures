"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { WAYPOINTS } from "@/lib/expeditionData";

export function ChartScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={sceneRef} 
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-marine-deep text-alabaster select-none"
    >
      {/* Background St. Mary's Basalt Coastline Photograph */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/images/malpe_basalt_yacht.jpg"
          alt="St. Mary's Volcanic Basalt Islands and Nautical Expedition Route"
          fill
          priority
          quality={92}
          className="object-cover scale-100 transition-transform duration-1000 ease-out"
          sizes="100vw"
        />
        {/* Cartographic Deep Blue Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-marine-deep/95 via-marine-deep/30 to-marine-deep/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-marine-deep/90 via-marine-deep/50 to-transparent w-full md:w-3/4 pointer-events-none" />
      </div>

      {/* Cartographic Route SVG Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70" viewBox="0 0 1440 900" fill="none">
        {/* Glowing Cartographic Route */}
        <path
          d="M 220 720 C 440 680, 580 500, 780 420 S 1120 360, 1340 220"
          stroke="url(#routeGrad)"
          strokeWidth="3"
          strokeDasharray="6 6"
          className="animate-[pulse_3s_ease-in-out_infinite]"
        />
        {/* Waypoint Pulsing Rings */}
        <circle cx="220" cy="720" r="7" fill="#EB6841" />
        <circle cx="780" cy="420" r="8" fill="#FDB827" />
        <circle cx="1340" cy="220" r="6" fill="#00A8B5" />
        <defs>
          <linearGradient id="routeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EB6841" />
            <stop offset="50%" stopColor="#FDB827" />
            <stop offset="100%" stopColor="#00A8B5" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main Narrative Display Typography */}
      <div className="relative z-20 container mx-auto px-6 sm:px-12 py-24 flex flex-col justify-between min-h-[100dvh]">
        
        {/* Top Metadata */}
        <div className="pt-8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-alabaster/90 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-coral-sun animate-ping" />
            <span>ACT 08 · NAUTICAL EXPEDITION</span>
          </div>
          <span className="text-coral-sun font-semibold">ST. MARY'S ARCHIPELAGO</span>
        </div>

        {/* Center Stage Typography */}
        <div className="my-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coral-sun/20 border border-coral-sun/40 text-coral-sun text-[10px] font-mono tracking-[0.2em] uppercase font-bold mb-6">
            88 MILLION YEARS OF GEOLOGY
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-alabaster drop-shadow-xl">
            VOLCANIC<br />
            <span className="text-coral-sun font-normal">
              BASALT PILLARS.
            </span>
          </h2>

          <div className="mt-6 flex items-center gap-4">
            <div className="w-12 h-[2px] bg-coral-sun shrink-0" />
            <p className="font-serif text-lg sm:text-xl text-alabaster/90 italic font-light">
              Hexagonal monoliths formed when Madagascar detached from India in the Cretaceous epoch.
            </p>
          </div>

          <p className="mt-4 font-sans text-xs sm:text-sm md:text-base text-alabaster/85 font-light leading-relaxed max-w-xl">
            The catamaran drops anchor in the sheltered lee of Coconut Island. The water turns from sapphire to luminous crystal aqua, inviting you beneath the surface.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-[10px] font-mono text-alabaster/70 uppercase tracking-[0.2em]">
            <span>ST. MARY'S ISLANDS</span>
            <span>·</span>
            <span>{WAYPOINTS.coconutIsland.coords}</span>
            <span>·</span>
            <span>ANCHORAGE SECURED</span>
          </div>
        </div>

        {/* Bottom Progression */}
        <div className="pb-8 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-coral-water uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-water animate-pulse" />
            PREPARING SUB-SURFACE DESCENT
          </span>
          <span>SCROLL TO DIVE UNDERWATER</span>
        </div>

      </div>
    </section>
  );
}
