"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TypologyOption {
  id: string;
  number: string;
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
    title: "Sunset Westbound Voyage",
    subtitle: "WESTBOUND ARABIAN SEA",
    description: "Golden hour sailing into the open Arabian Sea as the sky shifts from pale ivory to blush coastal azure and deep maritime dusk.",
    imageSrc: "/images/sunset_catamaran.jpg",
    imageAlt: "Catamaran sailing into golden sunset",
  },
  {
    id: "coast",
    number: "02",
    title: "St. Mary's Basalt Discovery",
    subtitle: "GEOLOGICAL ARCHIPELAGO",
    description: "Circumnavigation of the 88-million-year-old columnar basalt columns, anchoring in the sheltered turquoise cove for exploration.",
    imageSrc: "/images/malpe_basalt_yacht.jpg",
    imageAlt: "Basalt cliffs and anchored yacht",
  },
  {
    id: "charter",
    number: "03",
    title: "Private Catamaran Charter",
    subtitle: "EXCLUSIVE PASSAGE",
    description: "The entire 25.90M vessel reserved exclusively for your private expedition, family voyage, or milestone gathering.",
    imageSrc: "/images/vessel_catamaran.jpg",
    imageAlt: "Private luxury catamaran",
  },
  {
    id: "watersports",
    number: "04",
    title: "Active Watersports & Tender",
    subtitle: "COASTAL LAGOON DYNAMICS",
    description: "Sea-Doo jet ski runs, parasail tows over turquoise shallows, and sea kayaking around sheltered island coves.",
    imageSrc: "/images/wave_foam_crest.jpg",
    imageAlt: "Active wave crest and spray",
  },
  {
    id: "dinner",
    number: "05",
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
      className="relative w-full bg-[#12382B] text-[#FAF6EE] py-20 sm:py-28 overflow-hidden border-b border-[#0A2540]/30"
    >
      {/* Subtle organic light accent */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#1E5E48]/30 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header Telemetry */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[9px] sm:text-[10px] font-sans tracking-[0.24em] uppercase border-b border-white/15 pb-2.5">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
            <span className="font-semibold text-white/90">CURATED PASSAGES · MALPE DEPARTURES</span>
          </div>
          <div className="flex items-center gap-4 text-white/70 font-medium">
            <span>5 TAILORED VOYAGES</span>
          </div>
        </div>
      </div>

      {/* 2. Main Layout Grid */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-10">
        <div className="editorial-grid items-start gap-10 lg:gap-14">
          
          {/* Left Column: Typology Selection */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
            <div>
              <h3 className="font-serif text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-6">
                An expedition tailored
                <br />
                <span className="italic font-light text-[#38BDF8]">to your passage.</span>
              </h3>
            </div>

            {/* Interactive Options List */}
            <div className="flex flex-col divide-y divide-white/10">
              {TYPOLOGIES.map((item) => {
                const isCurrent = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={cn(
                      "text-left group flex items-baseline justify-between py-4 px-2 sm:px-4 transition-all duration-300 cursor-pointer",
                      isCurrent
                        ? "bg-white/10 text-white pl-4 sm:pl-6"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className={cn(
                        "text-xs font-mono",
                        isCurrent ? "text-[#38BDF8] font-bold" : "text-white/40"
                      )}>
                        {item.number}
                      </span>
                      <span
                        className={cn(
                          "font-serif text-2xl sm:text-3xl tracking-tight transition-colors",
                          isCurrent ? "text-white" : "group-hover:text-white"
                        )}
                      >
                        {item.title}
                      </span>
                    </div>
                    <span className="text-[9px] font-sans tracking-[0.2em] uppercase text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity">
                      SELECT →
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Polaroid Preview & Narrative Plate */}
          <div className="col-span-12 lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative w-full bg-[#FAF6EE] text-[#0A2540] p-3.5 sm:p-4 pb-6 shadow-2xl border border-white/80 rotate-[1.5deg] transition-all duration-500">
              
              {/* Photo Frame */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F2ECE1] border border-[#0A2540]/10">
                <Image
                  src={selected.imageSrc}
                  alt={selected.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center transition-all duration-700"
                />
                <div className="absolute top-3 right-3 bg-[#FAF6EE]/95 px-2.5 py-1 text-[8px] font-sans tracking-[0.2em] text-[#0A2540] uppercase border border-[#0A2540]/15">
                  PASSAGE {selected.number}
                </div>
              </div>

              {/* Dynamic Description */}
              <div className="mt-4 px-1">
                <span className="text-[8.5px] font-sans uppercase tracking-[0.22em] text-[#0284C7] font-bold block mb-1">
                  {selected.subtitle}
                </span>
                <h4 className="font-serif text-2xl text-[#0A2540] tracking-tight leading-snug mb-2">
                  {selected.title}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#0A2540]/80 leading-relaxed font-light mb-4">
                  {selected.description}
                </p>
                <Link
                  href="#book"
                  className="inline-flex items-center gap-2 text-[9.5px] font-sans uppercase tracking-[0.22em] text-[#0A2540] font-semibold hover:text-[#0284C7] transition-colors"
                >
                  <span>INQUIRE THIS PASSAGE</span>
                  <span>→</span>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
