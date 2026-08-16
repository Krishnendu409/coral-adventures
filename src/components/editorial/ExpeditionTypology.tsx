"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TypologyOption {
  id: string;
  number: string;
  count: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const TYPOLOGIES: TypologyOption[] = [
  {
    id: "sunset",
    number: "01",
    count: "(15)",
    title: "Sunset Westbound Voyage",
    subtitle: "WESTBOUND ARABIAN SEA",
    description: "Golden hour sailing into the open Arabian Sea as the sky shifts from pale ivory to blush coastal azure and deep maritime dusk.",
    imageSrc: "/images/sunset_catamaran.jpg",
    imageAlt: "Catamaran sailing into golden sunset",
  },
  {
    id: "coast",
    number: "02",
    count: "(11)",
    title: "St. Mary's Basalt Discovery",
    subtitle: "GEOLOGICAL ARCHIPELAGO",
    description: "Circumnavigation of the 88-million-year-old columnar basalt columns, anchoring in the sheltered turquoise cove for exploration.",
    imageSrc: "/images/malpe_basalt_yacht.jpg",
    imageAlt: "Basalt cliffs and anchored yacht",
  },
  {
    id: "charter",
    number: "03",
    count: "(08)",
    title: "Private Catamaran Charter",
    subtitle: "EXCLUSIVE PASSAGE",
    description: "The entire 25.90M vessel reserved exclusively for your private party, family reunion, or milestone celebration.",
    imageSrc: "/images/vessel_catamaran.jpg",
    imageAlt: "Private luxury catamaran",
  },
  {
    id: "watersports",
    number: "04",
    count: "(12)",
    title: "Active Watersports & Tender",
    subtitle: "COASTAL LAGOON DYNAMICS",
    description: "Sea-Doo jet ski runs, parasail tows over turquoise shallows, and sea kayaking around sheltered island coves.",
    imageSrc: "/images/wave_foam_crest.jpg",
    imageAlt: "Active wave crest and spray",
  },
  {
    id: "dinner",
    number: "05",
    count: "(06)",
    title: "Open Teak Twilight Gastronomy",
    subtitle: "STARLIT COASTAL DINING",
    description: "Artisanal coastal Karavali seafood, local spice pairings, and refreshments served on open teak tables with no walls.",
    imageSrc: "/images/dining_deck.jpg",
    imageAlt: "Candlelit teak dining at sea",
  },
];

export function ExpeditionTypology() {
  const [selectedId, setSelectedId] = useState<string>("charter");
  const selected = TYPOLOGIES.find((t) => t.id === selectedId) || TYPOLOGIES[2];

  return (
    <section 
      id="typology" 
      className="relative w-full bg-[#184E3B] text-[#FAF6EE] py-24 sm:py-32 overflow-hidden border-b border-[#0A2540]/30"
    >
      {/* Subtle organic light accent */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#1E5E48]/40 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header Telemetry Bar */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-10 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-sans tracking-[0.26em] uppercase border-b border-white/20 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
            <span className="font-bold text-white tracking-[0.26em]">EXPEDITION MATRIX · CURATED VOYAGES</span>
          </div>
          <div className="flex items-center gap-4 font-semibold text-white/80">
            <span>MALPE DEPARTURE DESK</span>
            <span className="text-[#F59E0B]">5 DISTINCT PASSAGES</span>
          </div>
        </div>
      </div>

      {/* 2. Main Layout Grid */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-10">
        <div className="editorial-grid items-start gap-10 lg:gap-14">
          
          {/* Left Column: Typology Selection */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-[10px] font-sans tracking-[0.26em] uppercase text-[#F59E0B] font-bold block mb-2">
                PERSONALIZED ITINERARIES
              </span>
              <h3 className="font-serif text-4xl sm:text-6xl text-white tracking-tight leading-[0.98] mb-8">
                An expedition tailored
                <br />
                <span className="italic font-light text-[#F59E0B]">just for you</span>
              </h3>
            </div>

            {/* Interactive Options List Matching Reference */}
            <div className="flex flex-col gap-2.5">
              {TYPOLOGIES.map((item) => {
                const isCurrent = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={cn(
                      "text-left group flex items-center justify-between py-4 px-5 sm:px-6 transition-all duration-300 cursor-pointer rounded-xs border",
                      isCurrent
                        ? "bg-[#FAF6EE] text-[#0A2540] border-white shadow-2xl scale-[1.01]"
                        : "bg-white/5 border-white/12 text-white/85 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className={cn(
                        "font-mono text-sm sm:text-base font-bold",
                        isCurrent ? "text-[#C2410C]" : "text-white/45"
                      )}>
                        {item.number}
                      </span>
                      <span
                        className={cn(
                          "font-serif text-2xl sm:text-3xl tracking-tight transition-colors",
                          isCurrent ? "text-[#C2410C] font-normal" : "text-white"
                        )}
                      >
                        {item.title}
                      </span>
                    </div>
                    <span className={cn(
                      "font-mono text-xs sm:text-sm tracking-wider font-medium",
                      isCurrent ? "text-[#0A2540]/60" : "text-white/40"
                    )}>
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Taped Polaroid Card & Quote Block */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6 relative mt-6 lg:mt-0">
            
            {/* Taped Polaroid Frame */}
            <div className="relative w-full bg-[#FAF6EE] text-[#0A2540] p-4 sm:p-5 pb-8 shadow-2xl border border-white/80 rotate-[1.5deg] transition-all duration-500 rounded-xs">
              
              {/* Washi Masking Tape Accent at Top Center */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#E8E0CE]/90 shadow-xs rotate-[-1deg] border border-[#D5CDBC] z-30" />

              {/* Photo Frame */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F2ECE1] border border-[#0A2540]/10 rounded-xs">
                <Image
                  src={selected.imageSrc}
                  alt={selected.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center transition-all duration-700"
                />
                <div className="absolute top-3 right-3 bg-[#FAF6EE]/95 px-3 py-1 text-[8.5px] font-sans tracking-[0.2em] text-[#0A2540] uppercase font-bold border border-[#0A2540]/15 shadow-xs">
                  PASSAGE {selected.number}
                </div>
              </div>

              {/* Dynamic Description */}
              <div className="mt-5 px-1">
                <span className="text-[9px] font-sans uppercase tracking-[0.24em] text-[#C2410C] font-bold block mb-1">
                  {selected.subtitle}
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl text-[#0A2540] tracking-tight leading-snug mb-2">
                  {selected.title}
                </h4>
                <p className="font-sans text-sm text-[#0A2540]/80 leading-relaxed font-light mb-5">
                  {selected.description}
                </p>
                <Link
                  href="#book"
                  className="inline-flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.24em] text-[#0A2540] font-bold hover:text-[#C2410C] transition-colors pb-0.5 border-b border-[#0A2540]/30 hover:border-[#C2410C]"
                >
                  <span>INQUIRE THIS PASSAGE</span>
                  <span>→</span>
                </Link>
              </div>

            </div>

            {/* Bottom Quote Box */}
            <div className="p-5 sm:p-6 bg-[#0E3527] border-l-4 border-[#F59E0B] text-white shadow-xl rounded-xs">
              <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed font-light">
                &ldquo;A tailored voyage means <span className="font-semibold text-white">no waiting</span>, <span className="font-semibold text-white">no tourist crowds</span>, and <span className="font-semibold text-white">complete privacy</span> on the water.&rdquo;
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
