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
    location: "ST. MARY'S ARCHIPELAGO",
    quote: "Stepping directly onto the volcanic basalt pillars from the tender was otherworldly. The lagoon was crystalline turquoise, sheltered completely from the outer swell.",
    author: "VIKRAM & SHWETA · BANGALORE",
    rotation: "rotate-[-2deg]",
    stampText: "13°22′N · 74°40′E",
    stampColor: "border-[#1E5E48] text-[#1E5E48]",
  },
  {
    id: "02",
    imageSrc: "/images/sunset_catamaran.jpg",
    imageAlt: "Sunset sailing on sky lounge",
    location: "WESTBOUND ARABIAN HORIZON",
    quote: "We chartered the catamaran for a family milestone. The golden hour west of Malpe, with open teak decks and twilight dissolving over the water, was truly unforgettable.",
    author: "THE KULKARNI FAMILY · MUMBAI",
    rotation: "rotate-[1.5deg]",
    stampText: "BEARING 284° WNW",
    stampColor: "border-[#E06C69] text-[#E06C69]",
  },
  {
    id: "03",
    imageSrc: "/images/dining_deck.jpg",
    imageAlt: "Twilight seafood dinner on deck",
    location: "MALPE OUTER ANCHORAGE",
    quote: "Open teak dining with candlelight and no walls—only the sound of waves beneath the hulls. The coastal Karavali seafood tasting was exceptional.",
    author: "ANANYA & MARC · LONDON",
    rotation: "rotate-[-1.5deg]",
    stampText: "GASTRONOMY · 19:30",
    stampColor: "border-[#0A2540] text-[#0A2540]",
  },
  {
    id: "04",
    imageSrc: "/images/wave_foam_crest.jpg",
    imageAlt: "Watersports tender launching",
    location: "TURQUOISE LAGOON SHALLOWS",
    quote: "Launching kayaks and jet skis right off the aft hydraulic platform. Zero tourist congestion and dedicated marine crew.",
    author: "RAHUL & FRIENDS · GOA",
    rotation: "rotate-[2deg]",
    stampText: "VELOCITY 24 KTS",
    stampColor: "border-[#0D9488] text-[#0D9488]",
  },
];

export function GuestMemoriesScrapbook() {
  return (
    <section className="relative w-full bg-[#FAF6EE] text-[#0A2540] py-20 sm:py-28 overflow-hidden border-b border-[#E2D9C8]">
      {/* 1. Header Telemetry */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[9px] sm:text-[10px] font-sans tracking-[0.24em] uppercase border-b border-[#0A2540]/12 pb-2.5">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#E06C69]" />
            <span className="font-semibold text-[#0A2540]">GUEST LOG · EXPEDITION FIELD ARCHIVE</span>
          </div>
          <div className="flex items-center gap-4 text-[#0A2540]/70 font-medium">
            <span>TRAVELER FIELD NOTES</span>
          </div>
        </div>
      </div>

      {/* 2. Headline & Introduction */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-10 mb-12">
        <div className="editorial-grid items-start">
          <div className="col-span-12 lg:col-span-7">
            <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0A2540] tracking-tight leading-tight uppercase">
              Field logs &
              <br />
              <span className="italic font-light text-[#E06C69]">voyage memories.</span>
            </h3>
          </div>
          <div className="col-span-12 lg:col-span-5 pt-2">
            <p className="font-sans text-xs sm:text-sm text-[#0A2540]/80 leading-relaxed font-light max-w-lg">
              Authentic entries from traveler field journals, private charter logs, and sunset passages across the Karnataka coastline.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Tilted Polaroid Scrapbook Row */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEMORIES.map((memory, idx) => (
            <div
              key={idx}
              className={cn(
                "bg-[#FAF6EE] p-3.5 pb-5 border border-[#E2D9C8] shadow-lg transition-all duration-300 hover:rotate-0 hover:scale-[1.02] flex flex-col justify-between",
                memory.rotation
              )}
            >
              <div>
                {/* Postal Stamp Badge */}
                <div className="flex items-center justify-between text-[7.5px] font-mono tracking-widest uppercase mb-2">
                  <span className="text-[#0A2540]/60 font-semibold">{memory.location}</span>
                  <span className={cn("border border-dashed px-1.5 py-0.2 rounded-xs", memory.stampColor)}>
                    {memory.stampText}
                  </span>
                </div>

                {/* Photo Frame */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F2ECE1] border border-[#E2D9C8] mb-3">
                  <Image
                    src={memory.imageSrc}
                    alt={memory.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover object-center"
                  />
                </div>

                {/* Quote */}
                <p className="font-serif italic text-xs text-[#0A2540]/85 leading-relaxed mb-4">
                  "{memory.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="text-[8px] font-sans text-[#0A2540]/60 uppercase tracking-wider border-t border-[#0A2540]/10 pt-2 font-medium">
                {memory.author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
