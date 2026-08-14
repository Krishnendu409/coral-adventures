"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface StepData {
  number: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  bgTint: string;
  accentColor: string;
  borderTint: string;
  badgeBg: string;
}

const STEPS: StepData[] = [
  {
    number: "01",
    code: "ARRIVE",
    title: "Harbor Welcome & Private Boarding",
    subtitle: "MALPE PIER · 08:30 / 16:30",
    description: "Welcome drink and personal greeting at the private Malpe harbor pier. Settle into the 360° observation lounge before slip release.",
    duration: "30 MINS",
    bgTint: "bg-[#FEF3C7]/90 hover:bg-[#FEF3C7]",
    accentColor: "text-[#B45309]",
    borderTint: "border-[#F59E0B]/50",
    badgeBg: "bg-[#F59E0B]/20 text-[#B45309]",
  },
  {
    number: "02",
    code: "DISCOVER",
    title: "St. Mary's Basalt Archipelago",
    subtitle: "NATIONAL GEOLOGICAL MONUMENT",
    description: "Navigate closely along the 88-million-year-old hexagonal columnar cliffs. Zodiac tender access provided for private shore landings.",
    duration: "60 MINS",
    bgTint: "bg-[#D1FAE5]/90 hover:bg-[#D1FAE5]",
    accentColor: "text-[#164E3D]",
    borderTint: "border-[#1E5E48]/50",
    badgeBg: "bg-[#1E5E48]/20 text-[#164E3D]",
  },
  {
    number: "03",
    code: "SAIL",
    title: "Open Sea Anchorage & Watersports",
    subtitle: "30-FATHOM OFFSHORE WAYPOINT",
    description: "Anchor in calm turquoise waters. Enjoy sea kayaking, parasailing launches, or unwind with fresh deck refreshments under the canopy.",
    duration: "90 MINS",
    bgTint: "bg-[#CCFBF1]/90 hover:bg-[#CCFBF1]",
    accentColor: "text-[#0F766E]",
    borderTint: "border-[#0D9488]/50",
    badgeBg: "bg-[#0D9488]/20 text-[#0F766E]",
  },
  {
    number: "04",
    code: "RETURN",
    title: "Golden Hour Toast & Twilight Return",
    subtitle: "WESTBOUND SUNSET CRUISE",
    description: "Glide westward as the sky turns to liquid amber. Toast the sunset from the teak sky deck before smooth passage back into Malpe harbor.",
    duration: "45 MINS",
    bgTint: "bg-[#FFEDD5]/90 hover:bg-[#FFEDD5]",
    accentColor: "text-[#C2410C]",
    borderTint: "border-[#E87952]/50",
    badgeBg: "bg-[#E87952]/20 text-[#C2410C]",
  },
];

export function ExpeditionSteps() {
  return (
    <section className="relative w-full bg-[#FAF6EE] text-[#0A2540] py-24 sm:py-32 overflow-hidden border-b border-[#E2D9C8]">
      {/* 1. Header Telemetry */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase border-b border-[#0A2540]/15 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E5E48]" />
            <span className="font-bold text-[#1E5E48]">EXPEDITION PROTOCOL · CHRONOLOGY</span>
          </div>
          <div className="flex items-center gap-4 text-[#0A2540]/70 font-semibold">
            <span>4-STAGE VOYAGE PACING</span>
            <span className="text-[#C2410C]">OCT — MAY WINDOW</span>
          </div>
        </div>
      </div>

      {/* 2. Main Headline */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 z-10 mb-12">
        <div className="editorial-grid items-end justify-between">
          <div className="col-span-12 lg:col-span-8">
            <span className="font-serif italic text-3xl sm:text-5xl text-[#1E5E48] block mb-1">
              How your expedition comes
            </span>
            <h3 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#0A2540] tracking-tight leading-none">
              to life <span className="text-[#C2410C] font-light">(step-by-step)</span>
            </h3>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:text-right mt-4 lg:mt-0">
            <span className="text-xs font-mono text-[#0A2540]/60 tracking-widest uppercase">
              SEAMLESS PASSAGE ARCHITECTURE
            </span>
          </div>
        </div>
      </div>

      {/* 3. Four Asymmetrical Richly Tinted Editorial Step Cards */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 z-10">
        <div className="editorial-grid items-stretch gap-6">
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className={cn(
                "col-span-12 sm:col-span-6 lg:col-span-3 p-6 sm:p-8 border postcard-shadow transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between relative group rounded-xs",
                step.bgTint,
                step.borderTint
              )}
            >
              {/* Step Number & Code */}
              <div>
                <div className="flex items-center justify-between border-b border-[#0A2540]/15 pb-3 mb-6">
                  <span className="font-serif text-3xl sm:text-4xl text-[#0A2540] font-light">
                    ({step.number})
                  </span>
                  <span className={cn("text-[10px] font-mono tracking-[0.25em] font-bold uppercase px-2 py-0.5 rounded-xs", step.badgeBg)}>
                    {step.code}
                  </span>
                </div>

                <span className="text-[8.5px] font-mono tracking-[0.18em] text-[#0A2540]/70 uppercase font-semibold block mb-2">
                  {step.subtitle}
                </span>
                <h4 className="font-serif text-2xl text-[#0A2540] tracking-tight leading-snug mb-4">
                  {step.title}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#0A2540]/80 leading-relaxed font-light mb-6">
                  {step.description}
                </p>
              </div>

              {/* Card Footer Telemetry */}
              <div className="flex items-center justify-between border-t border-[#0A2540]/15 pt-3 text-[9px] font-mono text-[#0A2540]/75 tracking-widest uppercase">
                <span>EST. WINDOW</span>
                <span className="font-bold text-[#0A2540]">{step.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Bottom Reservation Bridge */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 mt-12 text-center z-10">
        <Link
          href="#book"
          className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#0A2540] font-bold hover:text-[#C2410C] transition-colors pb-1 border-b border-[#0A2540]/30 hover:border-[#C2410C]"
        >
          <span>PLAN YOUR STEP-BY-STEP EXPEDITION</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
