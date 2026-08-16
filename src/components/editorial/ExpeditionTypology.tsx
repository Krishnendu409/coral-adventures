"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TypologyItem {
  id: string;
  number: string;
  count: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  highlightColor: string;
  duration: string;
  vibe: string;
}

const TYPOLOGIES: TypologyItem[] = [
  {
    id: "sunset",
    number: "01",
    count: "(04)",
    title: "Sunset Westbound Voyage",
    subtitle: "GOLDEN HOUR HORIZON",
    description: "Chase the light across the Arabian Sea as the sky shifts into burnt amber and lavender twilight with open sky deck cocktails.",
    imageSrc: "/images/sunset_catamaran.jpg",
    imageAlt: "Sunset cruise catamaran",
    highlightColor: "text-[#D97706]",
    duration: "2.5 HOURS · 17:00 — 19:30",
    vibe: "TRANQUIL & CINEMATIC",
  },
  {
    id: "basalt",
    number: "02",
    count: "(04)",
    title: "St. Mary's Basalt Discovery",
    subtitle: "GEOLOGICAL ISLES",
    description: "Navigate hexagonal basalt columns formed 88 million years ago by sub-volcanic activity during Madagascar's rift.",
    imageSrc: "/images/st_marys_island.jpg",
    imageAlt: "Basalt rock columns",
    highlightColor: "text-[#0D9488]",
    duration: "3.5 HOURS · 09:30 — 13:00",
    vibe: "EXPLORATION & HERITAGE",
  },
  {
    id: "charter",
    number: "03",
    count: "(08)",
    title: "Private Catamaran Charter",
    subtitle: "EXCLUSIVE PASSAGE",
    description: "The entire 25.90M vessel reserved exclusively for your private party, family reunion, or milestone celebration with bespoke service.",
    imageSrc: "/images/vessel_catamaran.jpg",
    imageAlt: "Private luxury catamaran",
    highlightColor: "text-[#C2410C]",
    duration: "CUSTOM TIMELINE · EXCLUSIVE",
    vibe: "ULTRA-LUXURY & PRIVACY",
  },
  {
    id: "watersports",
    number: "04",
    count: "(12)",
    title: "Active Watersports & Tender",
    subtitle: "HIGH-VELOCITY SEA",
    description: "Speed tender launches, parasailing over turquoise waters, and sea kayaking around sheltered island coves.",
    imageSrc: "/images/wave_foam_crest.jpg",
    imageAlt: "Active wave crest and spray",
    highlightColor: "text-[#0D9488]",
    duration: "4.0 HOURS · FULL AQUATIC PASS",
    vibe: "HIGH ADRENALINE",
  },
  {
    id: "dinner",
    number: "05",
    count: "(06)",
    title: "Open Teak Twilight Gastronomy",
    subtitle: "CANDLELIT TEAK DECK",
    description: "Fresh coastal seafood and artisanal Karavali pairings served under twilight on open teak tables with no walls.",
    imageSrc: "/images/dining_deck.jpg",
    imageAlt: "Candlelit teak dining at sea",
    highlightColor: "text-[#C2410C]",
    duration: "3.0 HOURS · 19:30 — 22:30",
    vibe: "FINE COASTAL DINING",
  },
];

export function ExpeditionTypology() {
  const [selectedId, setSelectedId] = useState<string>("charter");
  const selected = TYPOLOGIES.find((t) => t.id === selectedId) || TYPOLOGIES[2];

  return (
    <section 
      id="typology" 
      className="relative w-full text-[#FAF6EE] py-28 sm:py-36 overflow-hidden border-b border-white/15"
      style={{
        background: `
          radial-gradient(ellipse 90% 70% at 75% 45%, #247A65 0%, transparent 60%),
          radial-gradient(circle at 20% 25%, #1F6654 0%, transparent 55%),
          linear-gradient(175deg, #164F45 0%, #1F6654 42%, #295F4D 75%, #173F38 100%)
        `,
      }}
    >
      {/* Subtle organic paper grain & sea mist atmospheric texture */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(#FAF6EE 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#2DD4BF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 left-10 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header Telemetry */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-10 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[9.5px] sm:text-[10.5px] font-mono tracking-[0.26em] uppercase border-b border-white/20 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
            <span className="font-bold text-[#FDE68A]">EXPEDITION MATRIX · CURATED VOYAGES</span>
          </div>
          <div className="flex items-center gap-4 text-white/90 font-semibold">
            <span>MALPE DEPARTURE DESK</span>
            <span className="text-[#FDE68A]">5 DISTINCT PASSAGES</span>
          </div>
        </div>
      </div>

      {/* 2. Main Layout Grid */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-10">
        <div className="editorial-grid items-start gap-12 lg:gap-16">
          
          {/* Left Column: Typology Selection Matrix */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#FDE68A] uppercase font-bold block mb-3">
                PERSONALIZED ITINERARIES
              </span>
              <h3 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[0.92] mb-10">
                An expedition tailored
                <br />
                <span className="italic font-normal text-[#F59E0B]">just for you</span>
              </h3>
            </div>

            {/* Interactive Options List with Enhanced Active/Inactive Contrast */}
            <div className="flex flex-col gap-3.5">
              {TYPOLOGIES.map((item) => {
                const isCurrent = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={cn(
                      "text-left group relative flex items-baseline justify-between py-4 sm:py-5 px-5 sm:px-7 transition-all duration-300 rounded-xs cursor-pointer border",
                      isCurrent
                        ? "bg-[#FAF6EE] text-[#0A2540] shadow-[0_12px_30px_rgba(0,0,0,0.25)] border-white translate-x-2"
                        : "border-white/15 bg-[#0F3931]/60 hover:bg-[#0F3931]/90 text-white/90 hover:text-white hover:translate-x-1 backdrop-blur-xs"
                    )}
                  >
                    {/* Active Accent Indicator */}
                    {isCurrent && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#F59E0B] rounded-l-xs" />
                    )}

                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className={cn(
                        "text-xs font-mono font-bold tracking-wider",
                        isCurrent ? "text-[#0A2540]/60" : "text-[#FDE68A]/80"
                      )}>
                        {item.number}
                      </span>
                      <span
                        className={cn(
                          "font-serif text-2xl sm:text-4xl tracking-tight transition-colors",
                          isCurrent ? item.highlightColor : "group-hover:text-white"
                        )}
                      >
                        {item.title}
                      </span>
                    </div>
                    <span className={cn(
                      "text-xs font-mono tracking-widest shrink-0 ml-4 font-semibold",
                      isCurrent ? "text-[#0A2540]/70" : "text-white/60"
                    )}>
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Physical Editorial Print on Green Surface */}
          <div className="col-span-12 lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Masking Tape Visual Detail */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#EFE8D8]/95 border border-[#D5CBB9] rotate-[-2deg] z-30 shadow-md pointer-events-none backdrop-blur-xs" />

            <div className="relative w-full bg-[#FAF6EE] text-[#0A2540] p-4 sm:p-5 pb-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-white/90 rotate-[2deg] transition-all duration-500 rounded-xs">
              
              {/* Photo Frame */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F2ECE1] border border-[#0A2540]/10 shadow-inner">
                <Image
                  src={selected.imageSrc}
                  alt={selected.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center transition-all duration-700"
                />
                <div className="absolute top-3 right-3 bg-[#FAF6EE]/95 px-2.5 py-1 text-[8.5px] font-mono tracking-widest text-[#0A2540] uppercase border border-[#0A2540]/15 shadow-xs">
                  PASSAGE {selected.number}
                </div>
              </div>

              {/* Dynamic Description & Metadata */}
              <div className="mt-4 px-1">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#C2410C] font-bold">
                    {selected.subtitle}
                  </span>
                  <span className="text-[8.5px] font-mono uppercase tracking-[0.16em] text-[#0A2540]/60 bg-[#0A2540]/5 px-2 py-0.5 rounded-xs">
                    {selected.vibe}
                  </span>
                </div>
                <h4 className="font-serif text-2xl text-[#0A2540] tracking-tight leading-snug mb-2">
                  {selected.title}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#0A2540]/80 leading-relaxed font-light mb-4">
                  {selected.description}
                </p>
                
                <div className="pt-3 border-t border-[#0A2540]/10 flex items-center justify-between gap-2">
                  <span className="text-[9px] font-mono text-[#0A2540]/70 uppercase tracking-widest font-medium">
                    {selected.duration}
                  </span>
                  <Link
                    href="#concierge"
                    className="inline-flex items-center gap-1.5 text-[10.5px] font-mono uppercase tracking-[0.22em] text-[#0A2540] font-bold hover:text-[#C2410C] transition-colors"
                  >
                    <span>INQUIRE</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

            </div>

            {/* Pinned Note on Coastal Botanical Canvas */}
            <div className="mt-6 p-4 bg-[#0F3931]/75 border-l-2 border-[#F59E0B] text-[11px] font-mono text-white/95 tracking-wide backdrop-blur-xs shadow-lg">
              "A tailored voyage means no waiting, no tourist crowds, and complete privacy on the water."
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
