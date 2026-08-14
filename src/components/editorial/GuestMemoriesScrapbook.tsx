"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MemoryPolaroid {
  id: string;
  imageSrc: string;
  imageAlt: string;
  location: string;
  quote: string;
  author: string;
  rotation: string;
  stampText: string;
  stampColor: string;
}

const MEMORIES: MemoryPolaroid[] = [
  {
    id: "01",
    imageSrc: "/images/malpe_basalt_yacht.jpg",
    imageAlt: "St Marys basalt columns from catamaran",
    location: "(St. Mary's Archipelago)",
    quote: "Stepping onto the volcanic basalt rocks straight from the catamaran tender was surreal. The water was crystalline turquoise, unlike anything on the mainland coast.",
    author: "— Vikram & Shweta, Bangalore",
    rotation: "rotate-[-3deg]",
    stampText: "ST. MARY'S · 13°22′N",
    stampColor: "border-[#1E5E48] text-[#1E5E48]",
  },
  {
    id: "02",
    imageSrc: "/images/sunset_catamaran.jpg",
    imageAlt: "Sunset sailing on sky lounge",
    location: "(Arabian Horizon)",
    quote: "We charted the vessel for my mother's 60th birthday. The golden hour west of Malpe, with chilled drinks and the sun dissolving into the sea, was unforgettable.",
    author: "— The Kulkarni Family, Mumbai",
    rotation: "rotate-[2deg]",
    stampText: "SUNSET · 284° WNW",
    stampColor: "border-[#E05A36] text-[#E05A36]",
  },
  {
    id: "03",
    imageSrc: "/images/dining_deck.jpg",
    imageAlt: "Twilight seafood dinner on deck",
    location: "(Malpe Outer Harbor)",
    quote: "Dining on open teak tables with candlelight and no walls — only the calm sound of waves beneath us. The coastal seafood tasting was world-class.",
    author: "— Ananya & Marc, London",
    rotation: "rotate-[-2deg]",
    stampText: "GASTRONOMY · 19:30",
    stampColor: "border-[#F59E0B] text-[#F59E0B]",
  },
  {
    id: "04",
    imageSrc: "/images/wave_foam_crest.jpg",
    imageAlt: "Watersports tender launching",
    location: "(Turquoise Shallows)",
    quote: "Jet skiing in open water right off the catamaran platform. Complete freedom, top-tier safety gear, and zero tourist crowds.",
    author: "— Rahul & Friends, Goa",
    rotation: "rotate-[3deg]",
    stampText: "ACTIVE · 24 KNOTS",
    stampColor: "border-[#0D9488] text-[#0D9488]",
  },
];

export function GuestMemoriesScrapbook() {
  return (
    <section className="relative w-full bg-[#FAF6EE] text-[#0A2540] py-24 sm:py-32 overflow-hidden border-b border-[#E8DFD0]">
      {/* 1. Header Telemetry */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 mb-8 z-20">
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
            <div
              key={idx}
              className={cn(
                "col-span-12 sm:col-span-6 lg:col-span-3 bg-[#FAF6EE] p-4 pb-6 border border-[#E8DFD0] postcard-shadow transition-all duration-500 hover:rotate-0 hover:scale-105 relative group",
                memory.rotation
              )}
            >
              {/* Masking Tape Graphic */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#EFE8D8]/95 border border-[#D5CBB9] rotate-[-1deg] z-20 shadow-xs pointer-events-none" />

              {/* Postal Stamp Badge */}
              <div
                className={cn(
                  "absolute top-2 right-2 border border-dashed rounded-full px-2 py-0.5 text-[7px] font-mono tracking-widest uppercase z-20 bg-[#FAF6EE]/95",
                  memory.stampColor
                )}
              >
                {memory.stampText}
              </div>

              {/* Photo Frame */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F2ECE1] border border-[#E8DFD0]/80 mb-3.5">
                <Image
                  src={memory.imageSrc}
                  alt={memory.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Location Tag */}
              <span className="text-[9px] font-mono tracking-[0.18em] text-[#E05A36] font-semibold block mb-2">
                {memory.location}
              </span>

              {/* Quote & Author */}
              <p className="font-serif italic text-xs sm:text-sm text-[#0A2540]/85 leading-relaxed mb-3">
                "{memory.quote}"
              </p>
              <div className="text-[8.5px] font-mono text-[#0A2540]/60 uppercase tracking-widest border-t border-[#0A2540]/10 pt-2">
                {memory.author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
