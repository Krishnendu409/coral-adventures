"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface StepData {
  number: string;
  pill: string;
  pillColor: string;
  subtitle: string;
  title: string;
  description: string;
  duration: string;
  bgCard: string;
  borderCard: string;
  numColor: string;
}

const STEPS: StepData[] = [
  {
    number: "(01)",
    pill: "ARRIVE",
    pillColor: "bg-[#FDE68A] text-[#92400E] border-[#FCD34D]",
    subtitle: "MALPE PIER · 08:30 / 16:30",
    title: "Harbor Welcome & Private Boarding",
    description: "Welcome drink and personal greeting at the private Malpe harbor pier. Settle into the 360° observation lounge before slip release.",
    duration: "30 MINS",
    bgCard: "bg-[#FEFCE8]",
    borderCard: "border-[#FDE047]",
    numColor: "text-[#B45309]",
  },
  {
    number: "(02)",
    pill: "DISCOVER",
    pillColor: "bg-[#A7F3D0] text-[#065F46] border-[#6EE7B7]",
    subtitle: "NATIONAL GEOLOGICAL MONUMENT",
    title: "St. Mary's Basalt Archipelago",
    description: "Navigate closely along the 88-million-year-old hexagonal columnar cliffs. Zodiac tender access provided for private shore landings.",
    duration: "60 MINS",
    bgCard: "bg-[#ECFDF5]",
    borderCard: "border-[#86EFAC]",
    numColor: "text-[#047857]",
  },
  {
    number: "(03)",
    pill: "SAIL",
    pillColor: "bg-[#A5F3FC] text-[#155E75] border-[#67E8F9]",
    subtitle: "30-FATHOM OFFSHORE WAYPOINT",
    title: "Open Sea Anchorage & Watersports",
    description: "Anchor in calm turquoise waters. Enjoy sea kayaking, parasailing launches, or unwind with fresh deck refreshments under the canopy.",
    duration: "90 MINS",
    bgCard: "bg-[#ECFEFF]",
    borderCard: "border-[#67E8F9]",
    numColor: "text-[#0E7490]",
  },
  {
    number: "(04)",
    pill: "RETURN",
    pillColor: "bg-[#FED7AA] text-[#9A3412] border-[#FDBA74]",
    subtitle: "WESTBOUND SUNSET CRUISE",
    title: "Golden Hour Toast & Twilight Return",
    description: "Glide westward as the sky turns to liquid amber. Toast the sunset from the teak sky deck before smooth passage back into Malpe harbor.",
    duration: "45 MINS",
    bgCard: "bg-[#FFF7ED]",
    borderCard: "border-[#FDBA74]",
    numColor: "text-[#C2410C]",
  },
];

export function ExpeditionSteps() {
  return (
    <section className="relative w-full bg-[#FAF6EE] text-[#0A2540] py-20 sm:py-28 overflow-hidden border-b border-[#E2D9C8]">
      {/* 1. Header Title & Telemetry */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-10 z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#0A2540]/12 pb-5">
          <div>
            <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0A2540] tracking-tight leading-[0.98]">
              How your expedition comes
              <br />
              <span className="italic font-light text-[#B45309]">to life (step-by-step)</span>
            </h3>
          </div>
          <div className="text-[9px] font-sans tracking-[0.24em] uppercase text-[#0A2540]/60 font-semibold shrink-0">
            SEAMLESS PASSAGE ARCHITECTURE
          </div>
        </div>
      </div>

      {/* 2. Four Color-Tinted Chronological Cards Grid */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className={cn(
                "p-6 sm:p-7 border flex flex-col justify-between shadow-md transition-transform duration-300 hover:scale-[1.02] rounded-xs",
                step.bgCard,
                step.borderCard
              )}
            >
              <div>
                {/* Card Top: Number + Badge Pill */}
                <div className="flex items-center justify-between mb-4">
                  <span className={cn("font-serif text-2xl font-normal tracking-tight", step.numColor)}>
                    {step.number}
                  </span>
                  <span className={cn("px-2.5 py-0.5 text-[8.5px] font-sans tracking-[0.2em] font-bold uppercase rounded-xs border shadow-xs", step.pillColor)}>
                    {step.pill}
                  </span>
                </div>

                {/* Subtitle & Title */}
                <span className="text-[8px] font-sans tracking-[0.2em] text-[#0A2540]/60 uppercase block mb-1 font-semibold">
                  {step.subtitle}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl text-[#0A2540] tracking-tight leading-snug mb-3">
                  {step.title}
                </h4>
                <p className="font-sans text-xs text-[#0A2540]/80 leading-relaxed font-light mb-6">
                  {step.description}
                </p>
              </div>

              {/* Card Footer: Estimated Window */}
              <div className="flex items-center justify-between border-t border-[#0A2540]/10 pt-3 text-[8.5px] font-mono text-[#0A2540]/70 uppercase">
                <span className="tracking-[0.15em]">EST. WINDOW</span>
                <span className="font-bold text-[#0A2540] tracking-wider">{step.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Bottom Action */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mt-10 text-center z-10">
        <Link
          href="#book"
          className="inline-flex items-center gap-2 text-[9.5px] font-sans uppercase tracking-[0.24em] text-[#0A2540] font-semibold hover:text-[#0284C7] transition-colors pb-0.5 border-b border-[#0A2540]/30 hover:border-[#0284C7]"
        >
          <span>CUSTOMIZE EXPEDITION CHRONOLOGY</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
