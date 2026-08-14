"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { WashiTape, BrassPaperClip, TornPaperEdge } from "./ephemera/ScrapbookEphemera";

interface TypologyOption {
  id: string;
  number: string;
  count: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  highlightColor: string;
}

const TYPOLOGIES: TypologyOption[] = [
  {
    id: "sunset",
    number: "01",
    count: "(15)",
    title: "Sunset Westbound Voyage",
    subtitle: "CHASE THE LIGHT",
    description: "Golden hour sailing into the open Arabian Sea as the sky shifts from cyan to liquid amber and deep maritime twilight.",
    imageSrc: "/images/sunset_catamaran.jpg",
    imageAlt: "Catamaran sailing into golden sunset",
    highlightColor: "text-[#C2410C]",
  },
  {
    id: "coast",
    number: "02",
    count: "(11)",
    title: "St. Mary's Basalt Discovery",
    subtitle: "GEOLOGICAL WONDER",
    description: "Navigate close to 88-million-year-old columnar basalt columns rising vertically from crystal-clear shallows.",
    imageSrc: "/images/malpe_basalt_yacht.jpg",
    imageAlt: "Basalt cliffs and anchored yacht",
    highlightColor: "text-[#1E5E48]",
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
    highlightColor: "text-[#C2410C]",
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
  },
  {
    id: "dinner",
    number: "05",
    count: "(06)",
    title: "Open Teak Twilight Gastronomy",
    subtitle: "CANDLELIT TEAK DECK",
    description: "Fresh coastal seafood and artisanal pairings served under twilight on open teak tables with no walls.",
    imageSrc: "/images/dining_deck.jpg",
    imageAlt: "Candlelit teak dining at sea",
    highlightColor: "text-[#C2410C]",
  },
];

export function ExpeditionTypology() {
  const [selectedId, setSelectedId] = useState<string>("charter");
  const selected = TYPOLOGIES.find((t) => t.id === selectedId) || TYPOLOGIES[2];

  return (
    <section 
      id="typology" 
      className="relative w-full bg-gradient-to-br from-[#2D7D5F] via-[#1E5E48] to-[#0F3828] text-[#FAF6EE] py-24 sm:py-32 overflow-hidden"
    >
      <TornPaperEdge color="#FAF6EE" className="absolute top-0 left-0 right-0" />

      {/* Botanical Sunlight Dapple Effect */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#52B788]/25 via-[#1E5E48]/10 to-transparent blur-2xl pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-96 h-96 bg-[#D97706]/15 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header Telemetry */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 mb-8 z-20 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase border-b border-white/20 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
            <span className="font-bold text-[#F59E0B]">EXPEDITION MATRIX · CURATED VOYAGES</span>
          </div>
          <div className="flex items-center gap-4 text-white/80 font-semibold">
            <span>MALPE DEPARTURE DESK</span>
            <span className="text-[#F59E0B]">5 DISTINCT PASSAGES</span>
          </div>
        </div>
      </div>

      {/* 2. Main Layout Grid */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 z-10">
        <div className="editorial-grid items-start gap-12 lg:gap-16">
          
          {/* Left Column: Typology Selection Matrix */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#F59E0B] uppercase font-bold block mb-2">
                PERSONALIZED ITINERARIES
              </span>
              <h3 className="font-serif text-4xl sm:text-6xl text-white tracking-tight leading-tight mb-8">
                An expedition tailored
                <br />
                <span className="italic font-normal text-[#F59E0B]">just for you</span>
              </h3>
            </div>

            {/* Interactive Options List */}
            <div className="flex flex-col gap-3">
              {TYPOLOGIES.map((item) => {
                const isCurrent = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={cn(
                      "text-left group flex items-baseline justify-between py-3.5 px-4 sm:px-6 transition-all duration-300 rounded-xs cursor-pointer border relative",
                      isCurrent
                        ? "bg-[#FAF6EE] text-[#0A2540] shadow-xl border-white translate-x-2"
                        : "border-white/10 hover:bg-white/10 text-white/80 hover:text-white hover:translate-x-1"
                    )}
                  >
                    {isCurrent && <WashiTape angle={-4} className="-top-3 right-4" color="amber" />}
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className={cn(
                        "text-xs font-mono font-bold",
                        isCurrent ? "text-[#0A2540]/50" : "text-white/40"
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
                      "text-xs font-mono tracking-widest shrink-0 ml-4",
                      isCurrent ? "text-[#0A2540]/60" : "text-white/50"
                    )}>
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Tilted Polaroid Preview & Narrative Plate */}
          <div className="col-span-12 lg:col-span-5 relative mt-8 lg:mt-0">
            <BrassPaperClip className="-top-5 left-8" angle={-15} />

            <div className="relative w-full bg-[#FAF6EE] text-[#0A2540] p-4 sm:p-5 pb-8 shadow-2xl border border-[#E8DFD0] rotate-[2deg] transition-all duration-500">
              
              {/* Photo Frame */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F2ECE1] border border-[#0A2540]/10">
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

              {/* Dynamic Description */}
              <div className="mt-4 px-1">
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#C2410C] font-bold block mb-1">
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
                  className="inline-flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.22em] text-[#0A2540] font-bold hover:text-[#C2410C] transition-colors"
                >
                  <span>INQUIRE THIS PASSAGE</span>
                  <span>→</span>
                </Link>
              </div>

            </div>

            {/* Pinned Note on Green Botanical Canvas */}
            <div className="mt-6 p-4 bg-black/25 border-l-2 border-[#F59E0B] text-[11px] font-mono text-white/90 tracking-wide backdrop-blur-xs relative">
              <WashiTape angle={2} className="-bottom-3 right-4" color="cream" />
              "A tailored voyage means no waiting, no tourist crowds, and complete privacy on the water."
            </div>

          </div>

        </div>
      </div>

      <TornPaperEdge flip color="#0D9488" className="absolute bottom-0 left-0 right-0" />
    </section>
  );
}
