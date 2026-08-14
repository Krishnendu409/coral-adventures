"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrapbookPolaroid } from "./ScrapbookPolaroid";
import { ScrapbookNote } from "./ScrapbookNote";
import { ExpeditionStamp } from "@/components/editorial/ephemera/ExpeditionStamp";
import { TapeStrip } from "@/components/editorial/ephemera/TapeStrip";

export function ScrapbookHero() {
  return (
    <section className="relative w-full pt-12 pb-24 sm:pb-32 overflow-hidden bg-[#FAF7F0] select-none">
      {/* Studio Planning Table Background Surface */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, #0A2540 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Direct Navigation Handoff Strip */}
        <div className="flex items-center justify-between border-b border-[#0A2540]/10 pb-6 mb-12 text-xs font-mono tracking-widest text-[#0A2540]/70">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0A2540]/20 bg-[#FAF6EE] hover:bg-[#0A2540] hover:text-[#FAF6EE] transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>HOME</span>
            </Link>
            <span className="opacity-40">·</span>
            <span className="font-bold text-[#E05A36] uppercase">EXPEDITION STORYBOARD</span>
          </div>

          <div className="text-right">
            <span className="font-mono text-[#0A2540]/50 text-[11px]">MALPE · ARABIAN SEA · </span>
            <span className="font-mono font-bold text-[#0A2540] text-[11px]">13°21′02″ N · 74°42′08″ E</span>
          </div>
        </div>

        {/* Master Editorial Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0A2540]/15 bg-[#FAF6EE] text-[#0A2540] text-[11px] font-mono tracking-widest uppercase mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#E05A36]" />
            EXPEDITION PRODUCTION ARCHIVE
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-[#0A2540] font-normal tracking-tight leading-[0.95] mb-4">
            The Journey
          </h1>

          <p className="font-serif italic text-2xl sm:text-3xl text-[#E05A36] font-normal mb-6">
            before it becomes real.
          </p>

          <p className="font-sans text-sm sm:text-base text-[#0A2540]/75 max-w-xl mx-auto leading-relaxed font-light">
            A visual expedition moodboard across the Malpe coast, inshore surf, the 25.90M catamaran, 
            and the ancient columnar basalt of St. Mary’s.
          </p>
        </div>

        {/* Layered Physical Scrapbook Collage (The Opening Table) */}
        <div className="relative w-full min-h-[520px] sm:min-h-[640px] lg:min-h-[720px] my-6">
          {/* Main Large Hero Print (Center-Left) */}
          <div className="relative lg:absolute lg:left-8 lg:top-4 w-full lg:w-[62%] aspect-[16/10] bg-white p-3 sm:p-4 rounded-xs border border-[#0A2540]/15 shadow-[0_20px_50px_-12px_rgba(10,37,64,0.18)] -rotate-1 z-0">
            <TapeStrip className="-top-3.5 left-12 rotate-3 z-10" />
            <TapeStrip className="-top-3.5 right-12 -rotate-2 z-10" />
            <div className="relative w-full h-full overflow-hidden bg-[#FAF6EE]">
              <Image
                src="/images/malpe_coast.jpg"
                alt="Malpe Arabian Sea Coastline"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 65vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white font-mono text-xs drop-shadow-md">
                <span className="font-bold tracking-widest uppercase block text-[11px]">MALPE FORESHORE ARRIVAL</span>
                <span className="text-[10px] opacity-80">13°21′02″ N · 74°42′08″ E · HIGH SUN</span>
              </div>
            </div>
          </div>

          {/* Overlapping Polaroid 01: The Catamaran (Top-Right) */}
          <div className="mt-6 lg:mt-0 lg:absolute lg:right-6 lg:top-0 w-full sm:w-[320px] lg:w-[340px] z-10">
            <ScrapbookPolaroid
              src="/images/vessel_catamaran.jpg"
              alt="Coral Adventures Expedition Catamaran"
              caption="The 25.90M flagship moored offshore"
              rotation={3}
              tapePosition="top"
              aspectRatio="landscape"
            />
          </div>

          {/* Overlapping Polaroid 02: Basalt Columns (Bottom-Right) */}
          <div className="mt-6 lg:mt-0 lg:absolute lg:right-16 lg:bottom-4 w-full sm:w-[280px] lg:w-[300px] z-20">
            <ScrapbookPolaroid
              src="/images/malpe_basalt_yacht.jpg"
              alt="St. Mary's Basalt Rock Formations"
              caption="St. Mary’s volcanic columns"
              rotation={-4}
              tapePosition="top-left"
              aspectRatio="square"
            />
          </div>

          {/* Overlapping Field Note (Center Floating) */}
          <div className="mt-6 lg:mt-0 lg:absolute lg:left-[45%] lg:bottom-12 w-full sm:w-[280px] z-30">
            <ScrapbookNote
              variant="parchment"
              rotation={2}
              pin={true}
              className="max-w-xs"
            >
              <div className="flex items-center justify-between border-b border-[#0A2540]/10 pb-2 mb-2 text-[10px] font-mono text-[#0A2540]/60">
                <span>EXPEDITION NOTE 01</span>
                <span>MALPE</span>
              </div>
              <p className="font-serif italic text-lg text-[#0A2540] font-normal leading-snug mb-2">
                "The journey begins on the sand. Follow the water west."
              </p>
              <span className="font-mono text-[9px] text-[#E05A36] uppercase font-bold tracking-wider">
                8 SPATIAL CHAPTERS AHEAD ↓
              </span>
            </ScrapbookNote>
          </div>

          {/* Vintage Expedition Stamp (Bottom-Left) */}
          <div className="hidden lg:block absolute left-20 -bottom-8 z-30 pointer-events-none">
            <ExpeditionStamp
              location="MALPE EXPEDITION"
              year="2026"
              coords="74°42′08″ E"
              color="coral"
              className="scale-110"
            />
          </div>

          {/* Guide Bird Sketch Fragment (Top-Left) */}
          <div className="hidden sm:block absolute left-2 -top-6 p-3 bg-white border border-[#0A2540]/10 shadow-sm rounded-xs rotate-[-6deg] z-20">
            <div className="flex items-center gap-2 text-[9px] font-mono text-[#0A2540]/70 uppercase">
              <span className="w-2 h-2 rounded-full bg-[#0D9488]" />
              <span>GUIDE BIRD: SILENT THREAD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
