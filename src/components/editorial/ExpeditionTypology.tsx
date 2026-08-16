"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WashiTape } from "./ephemera/WashiTape";

export interface ExpeditionPassage {
  id: string;
  title: string;
  duration: string;
  capacity: string;
  summary: string;
  bestFor: string;
  bearing: string;
  rate: string;
  imageSrc: string;
  imageAlt: string;
}

export const EXPEDITION_PASSAGES: ExpeditionPassage[] = [
  {
    id: "coastal-dawn",
    title: "Coastal Dawn & Estuary Drift",
    duration: "06:30 — 09:00",
    capacity: "Up to 170 Guests",
    summary: "Gentle morning departure along Malpe rivermouth, watching local fishing fleets and early Brahminy kite thermals.",
    bestFor: "Birdwatching & Sunrise Coffee",
    bearing: "270° DUE WEST",
    rate: "CHARTER INQUIRY",
    imageSrc: "/images/hero_ocean.jpg",
    imageAlt: "Morning sunlight touching coastal waters of Malpe",
  },
  {
    id: "basalt-monolith",
    title: "St. Mary's Basalt Monolith Cruise",
    duration: "10:00 — 13:00",
    capacity: "Up to 170 Guests",
    summary: "Direct passage to the 88-million-year-old columnar basalt formations with guided geological narrative.",
    bestFor: "Geological Exploration & Island Views",
    bearing: "284° WNW",
    rate: "SCHEDULED & PRIVATE",
    imageSrc: "/images/basalt_island.jpg",
    imageAlt: "Hexagonal volcanic basalt columns of St. Mary's Island",
  },
  {
    id: "aquatic-safari",
    title: "Aquatic Safari & Coral Bay Anchor",
    duration: "14:00 — 17:00",
    capacity: "Up to 120 Guests",
    summary: "Anchor in sheltered turquoise coves for swimming, stand-up paddleboarding, and snorkeling with certified safety guides.",
    bestFor: "Watersports & Lagoon Swimming",
    bearing: "292° NW",
    rate: "PREMIUM PASSAGE",
    imageSrc: "/images/watersports_action.jpg",
    imageAlt: "Water adventures and turquoise lagoon in Malpe",
  },
  {
    id: "sunset-catamaran",
    title: "Sunset Catamaran & Golden Hour Horizon",
    duration: "17:30 — 19:30",
    capacity: "Up to 170 Guests",
    summary: "Chase the sinking equatorial sun into the open Arabian Sea with live ambient acoustic music and chilled refreshments.",
    bestFor: "Couples & Sunset Photography",
    bearing: "284° WNW",
    rate: "SIGNATURE PASSAGE",
    imageSrc: "/images/sunset_catamaran.jpg",
    imageAlt: "Catamaran sailing towards golden sunset on Arabian Sea",
  },
  {
    id: "twilight-gastronomy",
    title: "Twilight Gastronomy & Starlit Sea",
    duration: "19:30 — 22:30",
    capacity: "Up to 100 Guests",
    summary: "Full four-course Karavali coastal feast served under the open stars on our illuminated weathered teak sky lounge.",
    bestFor: "Fine Dining & Milestone Celebrations",
    bearing: "270° EXPEDITION LOOP",
    rate: "BESPOKE PRIVATE",
    imageSrc: "/images/dinner_deck.jpg",
    imageAlt: "Candlelit teak dining experience on open water",
  },
];

export function ExpeditionTypology() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activePassage = EXPEDITION_PASSAGES[activeIdx] || EXPEDITION_PASSAGES[0];

  return (
    <section
      id="typology"
      className="relative w-full bg-gradient-to-b from-[#184E3B] via-[#123E2F] to-[#0A261D] text-[#FAF6EE] py-20 sm:py-28 overflow-hidden border-b border-white/15"
    >
      {/* 1. Subtle Cartographic Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      {/* 2. Header Telemetry Bar */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[9.5px] sm:text-[10px] font-sans tracking-[0.24em] uppercase border-b border-white/20 pb-2.5">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#EAB308] animate-pulse" />
            <span className="font-bold text-white tracking-[0.24em]">02.B / EXPEDITION MATRIX · FIVE CURATED PASSAGES</span>
          </div>
          <div className="flex items-center gap-4 text-white/80 font-medium">
            <span>SEASON: OCT — MAY</span>
            <span className="text-[#EAB308]">5 VOYAGE CLASSES</span>
          </div>
        </div>
      </div>

      {/* 3. Section Headline */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-10 z-20">
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-2xl">
          Choose your sea passage.
        </h2>
        <p className="font-sans text-xs sm:text-sm text-white/85 max-w-xl mt-3 font-light leading-relaxed">
          From tranquil morning coastal excursions to multi-hour open-sea expeditions, each itinerary is calibrated to tide and light.
        </p>
      </div>

      {/* 4. Interactive Matrix & Pinned Polaroid Preview */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-20">
        <div className="editorial-grid items-start gap-8 lg:gap-12">
          
          {/* Left Column: 5 Selectable Passage Cards */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-3">
            {EXPEDITION_PASSAGES.map((passage, idx) => {
              const isSelected = idx === activeIdx;
              return (
                <button
                  key={passage.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`text-left p-5 sm:p-6 transition-all duration-300 rounded-xs border text-left cursor-pointer ${
                    isSelected
                      ? "bg-white/15 border-[#EAB308] shadow-xl translate-x-2"
                      : "bg-white/5 border-white/15 hover:bg-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className={`text-[9px] font-sans tracking-[0.2em] uppercase font-bold ${
                      isSelected ? "text-[#EAB308]" : "text-white/70"
                    }`}>
                      PASSAGE 0{idx + 1} · {passage.duration}
                    </span>
                    <span className="text-[9px] font-mono tracking-[0.18em] text-white/60 uppercase">
                      CAPACITY: {passage.capacity}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-white tracking-tight mb-2">
                    {passage.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-white/80 font-light leading-relaxed mb-3">
                    {passage.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-[9.5px] font-mono text-white/75 pt-2 border-t border-white/10">
                    <span>BEST: {passage.bestFor}</span>
                    <span className="text-white/30">|</span>
                    <span>BEARING: {passage.bearing}</span>
                    <span className="text-white/30">|</span>
                    <span className="text-[#EAB308] font-bold">RATE: {passage.rate}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Taped Polaroid Preview */}
          <div className="col-span-12 lg:col-span-5 relative lg:sticky lg:top-28">
            <div className="relative bg-[#FAF6EE] text-[#0A2540] p-4 sm:p-5 pb-7 postcard-shadow border border-[#E2D9C8] transition-all duration-500 hover:rotate-0 rotate-1 select-none">
              <WashiTape angle={-2} className="-top-3 left-6" color="teal" />
              
              <div className="relative w-full h-[300px] sm:h-[360px] overflow-hidden bg-[#0A2540] mb-4 border border-[#E2D9C8]">
                <Image
                  src={activePassage.imageSrc}
                  alt={activePassage.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-[#FAF6EE]/95 px-3 py-1 text-[8.5px] font-sans tracking-[0.2em] uppercase font-bold text-[#0A2540] border border-[#E2D9C8]">
                  {activePassage.duration}
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-[#0A2540]/10 pb-2 mb-2">
                <span className="text-[9px] font-sans tracking-[0.22em] uppercase text-[#184E3B] font-bold">
                  EXPEDITION FIELD DOSSIER
                </span>
                <span className="text-[9px] font-mono text-[#0A2540]/60">
                  REF-{activePassage.id.toUpperCase()}
                </span>
              </div>

              <h4 className="font-serif text-2xl text-[#0A2540] tracking-tight mb-2">
                {activePassage.title}
              </h4>
              <p className="font-sans text-xs text-[#0A2540]/80 font-light leading-relaxed mb-4">
                {activePassage.summary}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#0A2540]/10">
                <span className="font-mono text-xs font-bold text-[#184E3B]">
                  {activePassage.rate}
                </span>
                <a
                  href="#concierge"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#184E3B] text-[#FAF6EE] font-sans text-[9.5px] uppercase tracking-[0.2em] font-semibold hover:bg-[#0A2540] transition-colors"
                >
                  <span>INQUIRE PASSAGE</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Bottom Quote Box */}
            <div className="mt-6 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xs">
              <p className="font-serif italic text-sm text-white/90 leading-relaxed">
                &ldquo;Every voyage is private, chartered exclusively for your party, with certified crew and bespoke provisions.&rdquo;
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
