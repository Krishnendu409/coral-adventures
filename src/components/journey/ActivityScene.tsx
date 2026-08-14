"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  name: string;
  category: string;
  speed: string;
  depth: string;
  desc: string;
  vibe: string;
}

const ACTIVITIES: Activity[] = [
  {
    id: "jetski",
    name: "HIGH-VELOCITY JET SKI",
    category: "SURFACE SPEED",
    speed: "45+ KNOTS",
    depth: "SURFACE",
    desc: "Cut through the open Arabian Sea with twin spray wake and unrestricted throttle.",
    vibe: "Adrenaline & High Velocity",
  },
  {
    id: "kayak",
    name: "COASTAL SEA KAYAKING",
    category: "SHORELINE EXPEDITION",
    speed: "3-5 KNOTS",
    depth: "SHALLOWS",
    desc: "Navigate tranquil volcanic basalt rock formations and hidden sea coves at your own rhythm.",
    vibe: "Tranquil & Intimate Exploration",
  },
  {
    id: "parasail",
    name: "HIGH-ALTITUDE PARASAILING",
    category: "AERIAL PERSPECTIVE",
    speed: "22 KNOTS",
    depth: "300 FT ELEVATION",
    desc: "Ascend above the Malpe coastline for a 360-degree panorama of St. Mary's and the Western Ghats.",
    vibe: "Panoramic Freedom & Horizon Scale",
  },
  {
    id: "sup",
    name: "STAND-UP PADDLEBOARDING",
    category: "CRYSTAL SHALLOWS",
    speed: "2-4 KNOTS",
    depth: "1.5 METERS",
    desc: "Glide over crystal clear turquoise waters with direct visibility to the sandy seabed below.",
    vibe: "Serenity & Equilibrium",
  },
];

export function ActivityScene() {
  const [selectedActivity, setSelectedActivity] = useState<Activity>(ACTIVITIES[0]);

  return (
    <section 
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-marine-deep text-alabaster select-none"
    >
      {/* Background Active Watersports Image */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/images/coral_marine_activities.png"
          alt="Coral Adventures Active Marine Watersports Zone"
          fill
          priority
          quality={92}
          className="object-cover scale-105 transition-transform duration-700 ease-out"
          sizes="100vw"
        />
        {/* Dynamic Activity Lighting Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-marine-deep via-marine-deep/40 to-marine-deep/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-marine-deep/90 via-marine-deep/50 to-transparent w-full md:w-3/4 pointer-events-none" />
      </div>

      {/* Main Content & Interactive Selector */}
      <div className="relative z-20 container mx-auto px-6 sm:px-12 py-24 flex flex-col justify-between min-h-[100dvh]">
        
        {/* Top Waypoint */}
        <div className="pt-8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-alabaster/90 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-coral-orange animate-ping" />
            <span>ACT 04 · ACTIVE MARINE REALM</span>
          </div>
          <span className="text-coral-orange font-semibold">AUTHENTIC WATERSPORTS</span>
        </div>

        {/* Center Grid: Storytelling & Interactive Activity Selector */}
        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Narrative Headline */}
          <div className="lg:col-span-7 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coral-orange/20 border border-coral-orange/40 text-coral-orange text-[10px] font-mono tracking-[0.2em] uppercase font-bold mb-4">
              CHOOSE YOUR ADVENTURE
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-alabaster drop-shadow-xl">
              ENGAGE<br />
              <span className="text-coral-orange font-normal">
                THE OCEAN.
              </span>
            </h2>

            <p className="mt-4 font-sans text-xs sm:text-sm md:text-base text-alabaster/90 font-light leading-relaxed">
              Every guest finds their element. From high-speed open-throttle sea runs to tranquil paddleboard glides across volcanic reefs, the water is your playground.
            </p>

            {/* Active Telemetry Readout for Selected Activity */}
            <div className="mt-6 p-4 sm:p-5 rounded-xl bg-marine-espresso/80 backdrop-blur-md border border-coral-sun/30 shadow-xl">
              <div className="flex items-center justify-between border-b border-alabaster/10 pb-3 mb-3">
                <span className="font-serif text-lg sm:text-xl text-coral-sun font-medium">
                  {selectedActivity.name}
                </span>
                <span className="text-[10px] font-mono text-coral-orange font-bold uppercase tracking-wider">
                  {selectedActivity.speed}
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-alabaster/85 leading-relaxed font-light">
                {selectedActivity.desc}
              </p>
              <div className="mt-3 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-alabaster/60 uppercase tracking-widest pt-2 border-t border-alabaster/10">
                <span>ZONE: {selectedActivity.depth}</span>
                <span>VIBE: {selectedActivity.vibe}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Spatial Activity Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {ACTIVITIES.map((act) => {
              const isSelected = selectedActivity.id === act.id;
              return (
                <button
                  key={act.id}
                  onClick={() => setSelectedActivity(act)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border backdrop-blur-md transition-all duration-300 transform active:scale-98 flex items-center justify-between group",
                    isSelected
                      ? "bg-marine-espresso/90 border-coral-sun text-alabaster shadow-[0_8px_20px_rgba(235,104,65,0.25)] translate-x-1"
                      : "bg-marine-espresso/60 border-alabaster/10 text-alabaster/70 hover:border-coral-sun/50 hover:text-alabaster hover:bg-marine-espresso/80"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={cn(
                      "w-2.5 h-2.5 rounded-full transition-transform duration-300",
                      isSelected ? "bg-coral-sun scale-125" : "bg-alabaster/30 group-hover:bg-coral-sun"
                    )} />
                    <div>
                      <div className="font-serif text-sm sm:text-base font-medium">
                        {act.name}
                      </div>
                      <div className="text-[9px] font-mono tracking-wider opacity-60 uppercase">
                        {act.category}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-coral-sun font-bold uppercase tracking-wider">
                    {act.speed}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Bottom Transition Notice */}
        <div className="pb-8 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-coral-sun uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-sun animate-pulse" />
            JET SKI WATER SPRAY EXPANDING
          </span>
          <span>SCROLL FORWARD TO JETTY BOARDING</span>
        </div>

      </div>
    </section>
  );
}
