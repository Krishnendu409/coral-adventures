"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { WashiTape, BrassPaperClip, PolaroidFrame, TornPaperEdge } from "./ephemera/ScrapbookEphemera";

interface MemoryPolaroid {
  id: string;
  imageSrc: string;
  imageAlt: string;
  location: string;
  quote: string;
  author: string;
  rotationAngle: number;
  stampText: string;
  tapeColor: "amber" | "sage" | "coral" | "cream";
}

const MEMORIES: MemoryPolaroid[] = [
  {
    id: "01",
    imageSrc: "/images/malpe_basalt_yacht.jpg",
    imageAlt: "St Marys basalt columns from catamaran",
    location: "(St. Mary's Archipelago)",
    quote: "Stepping onto the volcanic basalt rocks straight from the catamaran tender was surreal. The water was crystalline turquoise, unlike anything on the mainland coast.",
    author: "— Vikram & Shweta, Bangalore",
    rotationAngle: -3,
    stampText: "ST. MARY'S · 13°22′N",
    tapeColor: "sage",
  },
  {
    id: "02",
    imageSrc: "/images/sunset_catamaran.jpg",
    imageAlt: "Sunset sailing on sky lounge",
    location: "(Arabian Horizon)",
    quote: "We chartered the vessel for my mother's 60th birthday. The golden hour west of Malpe, with chilled drinks and the sun dissolving into the sea, was unforgettable.",
    author: "— The Kulkarni Family, Mumbai",
    rotationAngle: 2,
    stampText: "SUNSET · 284° WNW",
    tapeColor: "coral",
  },
  {
    id: "03",
    imageSrc: "/images/dining_deck.jpg",
    imageAlt: "Twilight seafood dinner on deck",
    location: "(Malpe Outer Harbor)",
    quote: "Dining on open teak tables with candlelight and no walls — only the calm sound of waves beneath us. The coastal seafood tasting was world-class.",
    author: "— Ananya & Marc, London",
    rotationAngle: -2,
    stampText: "GASTRONOMY · 19:30",
    tapeColor: "amber",
  },
  {
    id: "04",
    imageSrc: "/images/wave_foam_crest.jpg",
    imageAlt: "Watersports tender launching",
    location: "(Turquoise Shallows)",
    quote: "Jet skiing in open water right off the catamaran platform. Complete freedom, top-tier safety gear, and zero tourist crowds.",
    author: "— Rahul & Friends, Goa",
    rotationAngle: 3,
    stampText: "ACTIVE · 24 KNOTS",
    tapeColor: "cream",
  },
];

export function GuestMemoriesScrapbook() {
  return (
    <section className="relative w-full bg-[#FAF6EE] text-[#0A2540] py-24 sm:py-32 overflow-hidden border-b border-[#E8DFD0]">
      <TornPaperEdge color="#FAF6EE" className="absolute top-0 left-0 right-0" />

      {/* 1. Header Telemetry */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 mb-8 z-20 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase border-b border-[#0A2540]/15 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E05A36]" />
            <span className="font-bold text-[#E05A36]">GUEST LOG · EXPEDITION SCRAPBOOK</span>
          </div>
          <div className="flex items-center gap-4 text-[#0A2540]/70 font-semibold">
            <span>AUTHENTIC TRAVEL MEMORIES</span>
            <span className="text-[#1E5E48]">MALPE & ARABIAN SEA</span>
          </div>
        </div>
      </div>

      {/* 2. Main Headline */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 text-center z-10 mb-16">
        <h3 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#0A2540] tracking-tight leading-none">
          It's more than places
        </h3>
        <p className="font-serif italic text-3xl sm:text-5xl text-[#1E5E48] mt-2">
          it is about feelings
        </p>
      </div>

      {/* 3. Tilted Polaroid Scrapbook Row */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 z-10">
        <div className="editorial-grid items-start gap-8 lg:gap-6">
          {MEMORIES.map((memory, idx) => (
            <div key={idx} className="col-span-12 sm:col-span-6 lg:col-span-3 relative">
              {idx === 0 && <BrassPaperClip className="-top-6 right-8" angle={15} />}
              
              <PolaroidFrame
                caption={memory.author}
                stamp={memory.stampText}
                angle={memory.rotationAngle}
              >
                <Image
                  src={memory.imageSrc}
                  alt={memory.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-center"
                />
              </PolaroidFrame>

              {/* Memory Body Note below Polaroid */}
              <div className="mt-3 p-3 bg-[#F7F3E9] border border-[#E2D9C8] text-xs font-serif italic text-[#4A3B32] leading-relaxed relative">
                <WashiTape angle={-2} color={memory.tapeColor} className="-top-3 left-4" />
                <span className="text-[9.5px] font-mono not-italic uppercase tracking-[0.18em] text-[#C2410C] font-semibold block mb-1">
                  {memory.location}
                </span>
                "{memory.quote}"
              </div>
            </div>
          ))}
        </div>
      </div>

      <TornPaperEdge flip color="#FAF6EE" className="absolute bottom-0 left-0 right-0" />
    </section>
  );
}
