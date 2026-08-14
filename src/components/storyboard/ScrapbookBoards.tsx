"use client";

import React from "react";
import Image from "next/image";
import { ScrapbookPolaroid } from "./ScrapbookPolaroid";
import { ScrapbookNote } from "./ScrapbookNote";
import { ExpeditionStamp } from "@/components/editorial/ephemera/ExpeditionStamp";
import { TapeStrip } from "@/components/editorial/ephemera/TapeStrip";
import { BoardingPassStub } from "@/components/editorial/ephemera/BoardingPassStub";

export function ScrapbookBoards() {
  return (
    <div className="relative w-full overflow-hidden select-none">
      
      {/* ─────────────────────────────────────────────────────────────────
          01. BOARD 01 — BEACH ARRIVAL & KIOSK
          ───────────────────────────────────────────────────────────────── */}
      <section className="relative w-full py-20 sm:py-28 border-t border-[#0A2540]/10 bg-[#FAF7F0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Chapter Header Stamp */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-sm bg-[#E05A36]/10 text-[#E05A36] border border-[#E05A36]/20">
              01 / ARRIVAL
            </span>
            <span className="font-mono text-xs text-[#0A2540]/60 uppercase tracking-widest">
              MALPE BEACH · FORESHORE HUB · 11:30 AM
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl text-[#0A2540] font-normal tracking-tight mb-12">
            The Journey Starts Here.
          </h2>

          {/* Asymmetric Visual Composition */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Huge Hero Print (7 Cols) */}
            <div className="lg:col-span-7 relative">
              <div className="relative w-full aspect-[16/11] bg-white p-3 sm:p-4 rounded-xs border border-[#0A2540]/15 shadow-xl -rotate-1">
                <TapeStrip className="-top-3 left-10 rotate-2 z-10" />
                <div className="relative w-full h-full overflow-hidden bg-[#FAF6EE]">
                  <Image
                    src="/images/malpe_coast.jpg"
                    alt="Malpe Beach Arrival with Coconut Palms"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] font-mono rounded">
                    MALPE FORESHORE · STARTING POINT
                  </div>
                </div>
              </div>

              {/* Taped Field Note underneath */}
              <div className="mt-6 sm:-mt-8 sm:ml-12 relative z-20 max-w-sm">
                <ScrapbookNote variant="parchment" rotation={2} tape={true}>
                  <span className="text-[10px] font-mono uppercase text-[#E05A36] font-bold block mb-1">FIELD NOTE</span>
                  <p className="font-serif text-base sm:text-lg italic text-[#0A2540] leading-snug">
                    "Warm sand, roasting spices from local stalls, salt breeze through high palms. The ticket kiosk stands at the edge of the trail."
                  </p>
                </ScrapbookNote>
              </div>
            </div>

            {/* Right: Overlapping Polaroids & Boarding Stub (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 relative">
              
              {/* Polaroid 01: Ticket Kiosk */}
              <div className="max-w-xs ml-auto">
                <ScrapbookPolaroid
                  src="/images/coral_arrival_pavilion.png"
                  alt="Coral Adventures Ticket Kiosk"
                  caption="The beach kiosk & boarding pass counter"
                  rotation={3}
                  tapePosition="top-right"
                  aspectRatio="landscape"
                />
              </div>

              {/* Polaroid 02: Palm Trail */}
              <div className="max-w-xs mr-auto relative z-10 -mt-6">
                <ScrapbookPolaroid
                  src="/images/coral_beach_promenade.png"
                  alt="Laterite Palm Trail"
                  caption="Crushed laterite trail leading seaward"
                  rotation={-3}
                  tapePosition="top-left"
                  aspectRatio="square"
                />
              </div>

              {/* Perforated Boarding Pass Stub */}
              <div className="pt-2 relative z-20">
                <BoardingPassStub
                  passNumber="CR-2026-0814"
                  routeFrom="MALPE HARBOR"
                  routeTo="ST. MARY'S ISLES"
                  departureTime="11:30 AM"
                  vesselName="CORAL CATAMARAN · 25.90M"
                  className="shadow-md rotate-1"
                />
              </div>
            </div>
          </div>

          {/* Hand-Drawn Route Indicator to Next Chapter */}
          <div className="mt-16 pt-8 border-t border-dashed border-[#0A2540]/15 flex items-center justify-between text-xs font-mono text-[#0A2540]/60">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E05A36]" />
              <strong className="text-[#0A2540]">ROUTE:</strong> KIOSK → SHALLOW WATERLINE
            </span>
            <span className="italic text-[#E05A36] font-serif text-sm">Follow the bird toward the water →</span>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────────
          02. BOARD 02 — WATERSPORTS & HYDRO-DYNAMICS
          ───────────────────────────────────────────────────────────────── */}
      <section className="relative w-full py-20 sm:py-28 border-t border-[#0A2540]/10 bg-[#F2ECE1]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Chapter Header Stamp */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-sm bg-[#0D9488]/10 text-[#0D9488] border border-[#0D9488]/20">
              02 / WATERSPORTS
            </span>
            <span className="font-mono text-xs text-[#0A2540]/60 uppercase tracking-widest">
              INSHORE SURF ZONE · ACTIVE MOMENTUM · 12:45 PM
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl text-[#0A2540] font-normal tracking-tight mb-12">
            The Coast Gets Louder.
          </h2>

          {/* High Energy Dynamic Collage */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Jet Ski Wake & Kayak Polaroids (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
              <div className="max-w-xs mr-auto">
                <ScrapbookPolaroid
                  src="/images/wave_foam_crest.jpg"
                  alt="Jet Ski Spray Wake"
                  caption="Carving wakes through cyan shallows"
                  rotation={-4}
                  tapePosition="top-left"
                  aspectRatio="landscape"
                />
              </div>

              <div className="max-w-xs ml-auto -mt-6">
                <ScrapbookPolaroid
                  src="/images/aerial_wave_foam.jpg"
                  alt="Aerial Surf Swash"
                  caption="Sandbars & multi-harmonic surf"
                  rotation={4}
                  tapePosition="top-right"
                  aspectRatio="square"
                />
              </div>

              <div className="pt-2">
                <ScrapbookNote variant="tape-note" rotation={-1}>
                  <span className="text-[10px] font-mono uppercase text-[#0D9488] font-bold block mb-1">AIRBORNE GUIDE</span>
                  <p className="font-serif italic text-base text-[#0A2540] leading-snug">
                    "The bird slices across the spray. Yellow kayaks cut through gentle swells. Direction points straight toward the open sea."
                  </p>
                </ScrapbookNote>
              </div>
            </div>

            {/* Right: Giant Turquoise Watersports Hero (7 Cols) */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative w-full aspect-[16/10] bg-white p-3 sm:p-4 rounded-xs border border-[#0A2540]/15 shadow-2xl rotate-1">
                <TapeStrip className="-top-3.5 right-16 rotate-2 z-10" />
                <div className="relative w-full h-full overflow-hidden bg-[#FAF6EE]">
                  <Image
                    src="/images/coral_marine_activities.png"
                    alt="Active Watersports on Malpe Coast"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] font-mono rounded">
                    HIGH SPRAY · JET SKIS & PARASAIL
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Route Transition */}
          <div className="mt-16 pt-8 border-t border-dashed border-[#0A2540]/15 flex items-center justify-between text-xs font-mono text-[#0A2540]/60">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0D9488]" />
              <strong className="text-[#0A2540]">ROUTE:</strong> INSHORE WATERS → 700M OFFSHORE MOORING
            </span>
            <span className="italic text-[#0D9488] font-serif text-sm">Leaving the shallows behind →</span>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────────
          03. BOARD 03 — CATAMARAN REVEAL
          ───────────────────────────────────────────────────────────────── */}
      <section className="relative w-full py-20 sm:py-28 border-t border-[#0A2540]/10 bg-[#FAF6EE]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Chapter Header Stamp */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-sm bg-[#1E40AF]/10 text-[#1E40AF] border border-[#1E40AF]/20">
              03 / VESSEL REVEAL
            </span>
            <span className="font-mono text-xs text-[#0A2540]/60 uppercase tracking-widest">
              OFFSHORE MOORING · 25.90M FLAGSHIP · 02:15 PM
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl text-[#0A2540] font-normal tracking-tight mb-12">
            The Boat Changes the Scale.
          </h2>

          {/* Grand Catamaran Hero Reveal */}
          <div className="relative w-full aspect-[16/9] bg-white p-3 sm:p-5 rounded-xs border border-[#0A2540]/15 shadow-2xl mb-12">
            <TapeStrip className="-top-3.5 left-20 rotate-1 z-10" />
            <TapeStrip className="-top-3.5 right-20 -rotate-2 z-10" />
            <div className="relative w-full h-full overflow-hidden bg-[#071A2B]">
              <Image
                src="/images/vessel_catamaran.jpg"
                alt="25.90M Expedition Catamaran Moored Offshore"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute bottom-4 left-4 text-white font-mono text-xs drop-shadow-md">
                <span className="font-bold tracking-widest uppercase block text-[11px]">FLAGSHIP 25.90M CATAMARAN</span>
                <span className="text-[10px] opacity-80">TWIN WAVE-PIERCING HULLS · THREE DECKS</span>
              </div>
            </div>
          </div>

          {/* Overlapping Supporting Detail Photos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
            <ScrapbookPolaroid
              src="/images/malpe_basalt_yacht.jpg"
              alt="Catamaran Hull Profile"
              caption="Submersible boarding platform"
              rotation={-2}
              tapePosition="top"
              aspectRatio="landscape"
            />

            <ScrapbookPolaroid
              src="/images/vessel_yacht.jpg"
              alt="Upper Observation Deck"
              caption="Upper deck radar & sun canopy"
              rotation={3}
              tapePosition="top-right"
              aspectRatio="landscape"
            />

            <ScrapbookNote variant="parchment" rotation={-1} pin={true}>
              <span className="text-[10px] font-mono uppercase text-[#1E40AF] font-bold block mb-1">VESSEL NOTE</span>
              <p className="font-serif italic text-base sm:text-lg text-[#0A2540] leading-snug">
                "Not a billionaire's yacht: an authentic commercial expedition ship built for the Arabian Sea."
              </p>
            </ScrapbookNote>
          </div>

          {/* Route Transition */}
          <div className="mt-16 pt-8 border-t border-dashed border-[#0A2540]/15 flex items-center justify-between text-xs font-mono text-[#0A2540]/60">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1E40AF]" />
              <strong className="text-[#0A2540]">ROUTE:</strong> WATER → MAIN DECK SALON
            </span>
            <span className="italic text-[#1E40AF] font-serif text-sm">Step onboard →</span>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────────
          04. BOARD 04 — ONBOARD LIFE & GASTRONOMY
          ───────────────────────────────────────────────────────────────── */}
      <section className="relative w-full py-20 sm:py-28 border-t border-[#0A2540]/10 bg-[#FAF7F0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Chapter Header Stamp */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-sm bg-[#E05A36]/10 text-[#E05A36] border border-[#E05A36]/20">
              04 / ONBOARD LIFE
            </span>
            <span className="font-mono text-xs text-[#0A2540]/60 uppercase tracking-widest">
              TRIPLE-DECK SOCIAL EXPERIENCE · 04:00 PM
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl text-[#0A2540] font-normal tracking-tight mb-12">
            Stay a Little Longer.
          </h2>

          {/* Human & Gastronomic Collage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Upper Deck Social Hero (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="relative w-full aspect-[16/10] bg-white p-3 sm:p-4 rounded-xs border border-[#0A2540]/15 shadow-xl -rotate-1">
                <TapeStrip className="-top-3.5 left-12 rotate-2 z-10" />
                <div className="relative w-full h-full overflow-hidden bg-[#FAF6EE]">
                  <Image
                    src="/images/dining_deck.jpg"
                    alt="Onboard Upper Deck Social Dining"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] font-mono rounded">
                    UPPER TEAK DECK · SOCIAL & MUSIC
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:-mt-6 sm:ml-8 relative z-20 max-w-md">
                <ScrapbookNote variant="cream" rotation={1} tape={true}>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#E05A36] font-bold uppercase mb-1">
                    <span>KARAVALI GASTRONOMY</span>
                  </div>
                  <p className="font-serif italic text-base text-[#0A2540] leading-snug">
                    "Butter-garlic prawns, sear fish rava fry, tender coconut coolers. Acoustic music mixes with warm wind."
                  </p>
                </ScrapbookNote>
              </div>
            </div>

            {/* Right: Food & Chart Table Polaroids (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="max-w-xs ml-auto">
                <ScrapbookPolaroid
                  src="/images/curated_dining.jpg"
                  alt="Fresh Catch Coastal Grill"
                  caption="Live coastal fresh catch grill"
                  rotation={3}
                  tapePosition="top"
                  aspectRatio="square"
                />
              </div>

              <div className="max-w-xs mr-auto -mt-4">
                <ScrapbookPolaroid
                  src="/images/coral_dining_theatre.png"
                  alt="Salon Navigational Chart Table"
                  caption="Vintage charts & compass in salon"
                  rotation={-3}
                  tapePosition="top-left"
                  aspectRatio="landscape"
                />
              </div>
            </div>
          </div>

          {/* Route Transition */}
          <div className="mt-16 pt-8 border-t border-dashed border-[#0A2540]/15 flex items-center justify-between text-xs font-mono text-[#0A2540]/60">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E05A36]" />
              <strong className="text-[#0A2540]">ROUTE:</strong> CATAMARAN BOW → BASALT CLIFFS
            </span>
            <span className="italic text-[#E05A36] font-serif text-sm">The boat recedes, the island looms →</span>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────────
          05. BOARD 05 — BASALT ISLAND DISCOVERY
          ───────────────────────────────────────────────────────────────── */}
      <section className="relative w-full py-20 sm:py-28 border-t border-[#0A2540]/10 bg-[#F4ECE1]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Chapter Header Stamp */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-sm bg-[#1C1E24]/10 text-[#0A2540] border border-[#0A2540]/20">
              05 / BASALT ISLAND
            </span>
            <span className="font-mono text-xs text-[#0A2540]/60 uppercase tracking-widest">
              ST. MARY’S ARCHIPELAGO · 05:15 PM
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl text-[#0A2540] font-normal tracking-tight mb-12">
            Leave the Noise Behind.
          </h2>

          {/* Giant Basalt Column Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Huge Island Hero Print (8 Cols) */}
            <div className="lg:col-span-8">
              <div className="relative w-full aspect-[16/10] bg-white p-3 sm:p-5 rounded-xs border border-[#0A2540]/15 shadow-2xl rotate-1">
                <TapeStrip className="-top-3.5 left-16 rotate-2 z-10" />
                <div className="relative w-full h-full overflow-hidden bg-[#1C1E24]">
                  <Image
                    src="/images/malpe_basalt_yacht.jpg"
                    alt="Hexagonal Columnar Basalt Formations"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  <div className="absolute bottom-4 left-4 text-white font-mono text-xs drop-shadow-md">
                    <span className="font-bold tracking-widest uppercase block text-[11px]">HEXAGONAL COLUMNAR BASALT</span>
                    <span className="text-[10px] opacity-80">88 MILLION YEARS OLD · SUB-VOLCANIC RIFTING</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Geology Notes & Tidal Pool (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              <ScrapbookPolaroid
                src="/images/coral_jetty_pier.png"
                alt="Stone Trail Through Basalt"
                caption="Natural stepping stone paths"
                rotation={-3}
                tapePosition="top"
                aspectRatio="square"
              />

              <ScrapbookPolaroid
                src="/images/shoreline_foam.jpg"
                alt="Tidal Rock Pool"
                caption="Tidal surge pools in rock fissures"
                rotation={2}
                tapePosition="top-right"
                aspectRatio="landscape"
              />

              <ScrapbookNote variant="laterite" rotation={-1} tape={false} pin={true}>
                <span className="text-[9px] font-mono uppercase text-[#FAF6EE]/70 font-bold block mb-1">GEOLOGICAL RECORD</span>
                <p className="font-serif italic text-base text-[#FAF6EE] leading-snug">
                  "Six-sided dark pillars formed when Madagascar tore away from India. Quiet cathedral of stone."
                </p>
              </ScrapbookNote>
            </div>
          </div>

          {/* Route Transition */}
          <div className="mt-16 pt-8 border-t border-dashed border-[#0A2540]/15 flex items-center justify-between text-xs font-mono text-[#0A2540]/60">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0A2540]" />
              <strong className="text-[#0A2540]">ROUTE:</strong> ROCK CREVICE → WESTERN CLIFF RIM
            </span>
            <span className="italic text-[#0A2540] font-serif text-sm">Sun touches the horizon →</span>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────────
          06. BOARD 06 — THE WESTBOUND SUNSET PAUSE
          ───────────────────────────────────────────────────────────────── */}
      <section className="relative w-full py-20 sm:py-32 border-t border-[#0A2540]/10 bg-[#FDF6EC]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Chapter Header Stamp */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-sm bg-[#F59E0B]/15 text-[#D97706] border border-[#F59E0B]/30">
              06 / SUNSET PAUSE
            </span>
            <span className="font-mono text-xs text-[#0A2540]/60 uppercase tracking-widest">
              WESTERN HORIZON · 284° WNW · 06:30 PM
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl text-[#0A2540] font-normal tracking-tight mb-12">
            Chase the Light.
          </h2>

          {/* Giant Full-Bleed Anamorphic Sunset Print */}
          <div className="relative w-full aspect-[21/9] sm:aspect-[16/8] bg-white p-3 sm:p-5 rounded-xs border border-[#0A2540]/15 shadow-2xl mb-8">
            <TapeStrip className="-top-3.5 left-24 rotate-1 z-10" />
            <TapeStrip className="-top-3.5 right-24 -rotate-2 z-10" />
            <div className="relative w-full h-full overflow-hidden bg-[#78350F]">
              <Image
                src="/images/sunset_catamaran.jpg"
                alt="Sunset over the Arabian Sea"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-6 text-white font-mono drop-shadow-md">
                <span className="font-bold text-sm tracking-widest uppercase block">284° WNW · WESTERN ARABIAN HORIZON</span>
                <span className="text-xs opacity-80">MOLTEN LIQUID GOLD SWELLS · LONG SHADOWS</span>
              </div>
            </div>
          </div>

          {/* Minimalist Floating Supporting Strips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            <ScrapbookPolaroid
              src="/images/golden_hour.jpg"
              alt="Golden Water Swells"
              caption="Liquid gold reflection on ocean"
              rotation={-2}
              tapePosition="top-left"
              aspectRatio="landscape"
            />

            <ScrapbookPolaroid
              src="/images/coral_golden_hour_deck.png"
              alt="Catamaran Silhouette at Sunset"
              caption="Distant vessel in sunset path"
              rotation={2}
              tapePosition="top-right"
              aspectRatio="landscape"
            />

            <ScrapbookNote variant="parchment" rotation={-1} pin={true}>
              <span className="text-[10px] font-mono uppercase text-[#D97706] font-bold block mb-1">MOMENT OF STILLNESS</span>
              <p className="font-serif italic text-base sm:text-lg text-[#0A2540] leading-snug">
                "The bird stands in dark silhouette on the cliff. The ocean turns to molten gold. The world goes quiet."
              </p>
            </ScrapbookNote>
          </div>

          {/* Route Transition */}
          <div className="mt-16 pt-8 border-t border-dashed border-[#0A2540]/15 flex items-center justify-between text-xs font-mono text-[#0A2540]/60">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D97706]" />
              <strong className="text-[#0A2540]">ROUTE:</strong> DUSK → BLUE HOUR → MIDNIGHT
            </span>
            <span className="italic text-[#D97706] font-serif text-sm">Light collapses into night →</span>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────────
          07. BOARD 07 — BLUE HOUR & NIGHT EXPLORATION
          ───────────────────────────────────────────────────────────────── */}
      <section className="relative w-full py-20 sm:py-32 border-t border-white/10 bg-[#071A2B] text-[#FAF6EE]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Chapter Header Stamp */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-sm bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30">
              07 / NIGHT
            </span>
            <span className="font-mono text-xs text-white/60 uppercase tracking-widest">
              AFTER DARK · NO ROAD AHEAD · 08:45 PM
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl text-white font-normal tracking-tight mb-12">
            No Road Ahead. Just Horizon.
          </h2>

          {/* Sparse High-Contrast Night Photography */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Moonlit Sapphire Ocean (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="relative w-full aspect-[16/10] bg-[#040D18] p-3 sm:p-4 rounded-xs border border-white/15 shadow-2xl -rotate-1">
                <TapeStrip className="-top-3.5 left-12 rotate-2 z-10" />
                <div className="relative w-full h-full overflow-hidden bg-black">
                  <Image
                    src="/images/night_sapphire.jpg"
                    alt="Moonlit Ocean & Basalt Rocks at Night"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] font-mono rounded">
                    MOONLIT BASALT · MIDNIGHT SAPPHIRE
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Sparse Night Polaroids & Note (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <ScrapbookPolaroid
                src="/images/sapphire_night_ocean.jpg"
                alt="Starry Sapphire Ocean"
                caption="Rolling surf & celestial starlight"
                rotation={3}
                tapePosition="top-right"
                aspectRatio="square"
              />

              <ScrapbookNote variant="navy" rotation={-2} tape={true}>
                <span className="text-[10px] font-mono uppercase text-[#38BDF8] font-bold block mb-1">NIGHT RECORD</span>
                <p className="font-serif italic text-base sm:text-lg text-white leading-snug">
                  "Silver moonlight on volcanic rock. Distant breaking waves. The guide bird glides through the dark canyon toward the open sky."
                </p>
              </ScrapbookNote>
            </div>
          </div>

          {/* Route Transition */}
          <div className="mt-16 pt-8 border-t border-dashed border-white/15 flex items-center justify-between text-xs font-mono text-white/60">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
              <strong className="text-white">ROUTE:</strong> DARK CANYON → OPEN SKY ARENA
            </span>
            <span className="italic text-[#38BDF8] font-serif text-sm">And then the sky lights up →</span>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────────
          08. BOARD 08 — DRONE SHOW FINALE
          ───────────────────────────────────────────────────────────────── */}
      <section className="relative w-full py-20 sm:py-36 border-t border-white/10 bg-[#040D18] text-[#FAF6EE]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Chapter Header Stamp */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-sm bg-[#25C4C0]/20 text-[#25C4C0] border border-[#25C4C0]/40">
              08 / DRONE SHOW
            </span>
            <span className="font-mono text-xs text-white/60 uppercase tracking-widest">
              AERIAL CELESTIAL CLIMAX · 09:30 PM
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-7xl text-white font-normal tracking-tight mb-4 leading-[1.05]">
            The Night Belongs <br />
            <span className="italic text-[#25C4C0]">to the Sea.</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-white/70 max-w-xl font-light mb-12 leading-relaxed">
            Three hundred synchronized lights rise from the dark water into the open sky above St. Mary’s.
          </p>

          {/* Monumental Drone Finale Hero Photo */}
          <div className="relative w-full aspect-[16/9] bg-black p-3 sm:p-5 rounded-xs border border-white/20 shadow-2xl mb-12">
            <TapeStrip className="-top-3.5 left-20 rotate-1 z-10" />
            <TapeStrip className="-top-3.5 right-20 -rotate-2 z-10" />
            <div className="relative w-full h-full overflow-hidden bg-[#030A12]">
              <Image
                src="/images/hero_ocean.jpg"
                alt="300-Drone Aerial Formation over the Arabian Sea"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-6 text-white font-mono drop-shadow-md">
                <span className="font-bold text-sm tracking-widest uppercase block">300-DRONE KINETIC CONSTELLATION</span>
                <span className="text-xs text-[#25C4C0]">CORAL NAUTICAL EMBLEM · BIRD · WAVE · CELESTIAL CODE</span>
              </div>
            </div>
          </div>

          {/* Supporting Drone Reflection Photos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
            <ScrapbookPolaroid
              src="/images/coral_event_spaces.png"
              alt="Drone Constellation Swarm"
              caption="The nautical compass rose formation"
              rotation={-2}
              tapePosition="top"
              aspectRatio="square"
            />

            <ScrapbookPolaroid
              src="/images/underwater_marine.jpg"
              alt="Ocean Surface Reflections"
              caption="Fragmented wave reflections below"
              rotation={3}
              tapePosition="top-right"
              aspectRatio="square"
            />

            <ScrapbookNote variant="navy" rotation={-1} pin={true}>
              <span className="text-[10px] font-mono uppercase text-[#25C4C0] font-bold block mb-1">THE CLIMAX</span>
              <p className="font-serif italic text-base sm:text-lg text-white leading-snug">
                "And then the sky lights up. The bird rests on the basalt ledge below, witnessing the constellation."
              </p>
            </ScrapbookNote>
          </div>
        </div>
      </section>
    </div>
  );
}
