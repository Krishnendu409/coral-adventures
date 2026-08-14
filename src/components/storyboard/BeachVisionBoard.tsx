"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { SandCanvasBackground } from "./SandCanvasBackground";
import { RedThreadSystem } from "./RedThreadSystem";
import { RedPushPin } from "./RedPushPin";
import { PhysicalPolaroid } from "./PhysicalPolaroid";
import { PhysicalPaperNote } from "./PhysicalPaperNote";
import { RubberStamp, BrassCompass, Seashell } from "./PhysicalEphemera";
import { BoardingPassStub } from "../editorial/ephemera/BoardingPassStub";
import { AmbientSoundToggle } from "./AmbientSoundToggle";

export function BeachVisionBoard() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / totalScroll)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen selection:bg-[#E05A36] selection:text-white">
      {/* 1. Procedural Realistic Sand Canvas Background */}
      <SandCanvasBackground />

      {/* 2. Continuous Red String System */}
      <RedThreadSystem scrollProgress={scrollProgress} />

      {/* 3. Ambient Wave Audio Controller */}
      <AmbientSoundToggle />

      {/* 4. Top Editorial Header pinned on the Sand */}
      <header className="relative z-30 pt-10 sm:pt-14 px-6 max-w-6xl mx-auto flex flex-col items-center text-center">
        <div className="w-full flex items-center justify-between border-b border-[#0A2540]/15 pb-4 mb-8">
          <Link
            href="/"
            className="group flex items-center gap-2 px-3 py-1.5 bg-[#FAF6EE]/90 hover:bg-[#FAF6EE] border border-[#0A2540]/15 rounded-full text-xs font-mono tracking-wider text-[#0A2540] transition-all shadow-xs"
          >
            <span>←</span>
            <span className="font-semibold">HOME</span>
          </Link>
          <div className="font-mono text-[10px] sm:text-xs text-[#0A2540]/75 tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E05A36] animate-pulse" />
            <span>MALPE · ARABIAN SEA · 13°21′02″ N · 74°42′08″ E</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FAF6EE]/95 border border-[#0A2540]/15 rounded-full text-xs font-mono tracking-widest text-[#0A2540] uppercase shadow-xs mb-4">
          <span className="w-2 h-2 rounded-full bg-[#C2410C]" />
          <span>EXPEDITION VISION BOARD · SPREAD ON MALPE SAND</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#0A2540] tracking-tight font-normal">
          The Journey
        </h1>
        <p className="font-serif italic text-xl sm:text-2xl text-[#C2410C] mt-1">
          before it becomes real.
        </p>

        <p className="font-sans text-xs sm:text-sm text-[#0A2540]/75 max-w-xl mt-3 leading-relaxed">
          The complete Coral Adventures expedition physically laid onto the beach sand. Follow the red thread west from the morning foreshore to the midnight constellation.
        </p>

        <div className="mt-6 flex items-center gap-2 text-[10px] font-mono text-[#0A2540]/60 uppercase tracking-widest">
          <span>SCROLL TO TRAVEL ACROSS THE BOARD</span>
          <span>↓</span>
        </div>
      </header>

      {/* 5. Master Serpentine 25ft Vision Board Canvas */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 z-20 pb-32">

        {/* ---------------------------------------------------- */}
        {/* FRAME 01: ARRIVAL (Top-Left Cluster on Sand) */}
        {/* ---------------------------------------------------- */}
        <section className="relative min-h-[1400px] pt-12">
          {/* Pushpin 01 */}
          <div className="absolute top-[690px] left-[15%] sm:left-[26%] z-35">
            <RedPushPin shadowAngle="bottom" size={32} />
          </div>

          {/* Chapter Title Badge pinned on sand */}
          <div className="absolute top-12 left-4 sm:left-12 z-25 max-w-md">
            <div className="inline-block px-2.5 py-0.5 bg-[#FAF6EE]/90 border border-[#0A2540]/15 rounded-xs font-mono text-[10px] text-[#C2410C] uppercase tracking-widest mb-1 shadow-xs">
              01 / ARRIVAL · FORESHORE HUB · 11:30 AM
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A2540] tracking-tight">
              The Journey Starts on the Sand.
            </h2>
          </div>

          {/* Hero Polaroid: Malpe Beach Arrival */}
          <div className="absolute top-44 left-4 sm:left-12 z-20">
            <PhysicalPolaroid
              imageSrc="/images/malpe_coast.jpg"
              caption="Malpe Foreshore Arrival · High Sun"
              subcaption="13°21′02″ N · 74°42′08″ E"
              size="hero"
              rotation={-1.5}
              shadowIntensity="day"
              priority={true}
              annotation="STATION 01 · BEACH HEAD"
            />
          </div>

          {/* Supporting Polaroid: Beach Pavilion */}
          <div className="absolute top-[680px] right-4 sm:right-16 z-25">
            <PhysicalPolaroid
              imageSrc="/images/coral_arrival_pavilion.png"
              caption="The beach kiosk & boarding pass counter"
              subcaption="Weathered teak & sailcloth shade"
              size="md"
              rotation={4.5}
              shadowIntensity="day"
            />
          </div>

          {/* Supporting Polaroid: Promenade */}
          <div className="absolute top-[1020px] right-12 sm:right-48 z-20">
            <PhysicalPolaroid
              imageSrc="/images/coral_beach_promenade.png"
              caption="Crushed laterite trail leading seaward"
              subcaption="High palms & salt spray"
              size="sm"
              rotation={-5}
              shadowIntensity="day"
            />
          </div>

          {/* Perforated Boarding Pass Stub */}
          <div className="absolute top-[820px] left-8 sm:left-24 z-25">
            <BoardingPassStub
              passNumber="CR-2026-0814"
              routeFrom="MALPE FORESHORE"
              routeTo="ST. MARY'S ISLES"
              departureTime="11:30 AM"
              vesselName="CORAL CATAMARAN · 25.90M"
              className="shadow-xl -rotate-2"
            />
          </div>

          {/* Torn Paper Note: Start Here */}
          <div className="absolute top-[1140px] left-12 sm:left-36 z-25">
            <PhysicalPaperNote
              tag="EXPEDITION NOTE 01"
              text="The journey begins on the sand. Warm breezes through high palms, roasting spices from beach stalls, and the distant catamaran moored offshore."
              subtext="FOLLOW THE RED STRING SEAWARD →"
              theme="parchment"
              rotation={2.5}
              tapeTop={true}
              pebbleCorner={true}
            />
          </div>

          {/* Ephemera: Seashell & Rubber Stamp */}
          <div className="absolute top-[620px] left-[42%] z-20">
            <RubberStamp
              label="CORAL EXPEDITION"
              location="MALPE FORESHORE"
              coordinates="13°21′02″ N · 74°42′08″ E"
              year="2026"
              rotation={-14}
            />
          </div>
          <div className="absolute top-[1280px] left-[52%] z-20">
            <Seashell type="cowrie" rotation={35} />
          </div>
        </section>


        {/* ---------------------------------------------------- */}
        {/* FRAME 02: WATERSPORTS (Mid-Right Dynamic Spray on Sand) */}
        {/* ---------------------------------------------------- */}
        <section className="relative min-h-[1400px] pt-16">
          {/* Pushpin 02 */}
          <div className="absolute top-[720px] right-[18%] sm:right-[38%] z-35">
            <RedPushPin shadowAngle="bottom" size={32} />
          </div>

          {/* Chapter Title */}
          <div className="absolute top-12 right-6 sm:right-16 z-25 max-w-md text-right">
            <div className="inline-block px-2.5 py-0.5 bg-[#FAF6EE]/90 border border-[#0A2540]/15 rounded-xs font-mono text-[10px] text-[#0D9488] uppercase tracking-widest mb-1 shadow-xs">
              02 / WATERSPORTS · ACTIVE SURF ZONE · 12:45 PM
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A2540] tracking-tight">
              The Water Gets Louder.
            </h2>
          </div>

          {/* Hero Polaroid: Marine Activities */}
          <div className="absolute top-40 right-4 sm:right-12 z-20">
            <PhysicalPolaroid
              imageSrc="/images/coral_marine_activities.png"
              caption="High-Spray Jet Skis, Parasailing & Kayaks"
              subcaption="Cyan shallows · Inshore surf zone"
              size="hero"
              rotation={2.5}
              shadowIntensity="day"
              annotation="STATION 02 · 24 KNOTS"
            />
          </div>

          {/* Polaroid: Bow Wake Spray */}
          <div className="absolute top-[680px] left-6 sm:left-20 z-25">
            <PhysicalPolaroid
              imageSrc="/images/wave_foam_crest.jpg"
              caption="Carving bow wakes through cyan shallows"
              subcaption="5-harmonic Gerstner surf"
              size="md"
              rotation={-4}
              shadowIntensity="day"
            />
          </div>

          {/* Polaroid: Aerial Sandbar */}
          <div className="absolute top-[1020px] left-16 sm:left-48 z-20">
            <PhysicalPolaroid
              imageSrc="/images/aerial_wave_foam.jpg"
              caption="Sandbars & multi-harmonic surf swash"
              subcaption="Tidal surge line"
              size="sm"
              rotation={5.5}
              shadowIntensity="day"
            />
          </div>

          {/* Torn Paper Note */}
          <div className="absolute top-[1120px] right-12 sm:right-32 z-25">
            <PhysicalPaperNote
              tag="AIRBORNE GUIDE"
              text="The bird slices across the spray. Yellow kayaks cut through gentle swells. Direction points straight toward the open sea."
              subtext="LEAVING THE SHALLOWS BEHIND →"
              theme="cream"
              rotation={-2}
              pinTop={true}
            />
          </div>

          {/* Ephemera: Scallop Shell */}
          <div className="absolute top-[960px] right-[48%] z-20">
            <Seashell type="scallop" rotation={-20} />
          </div>
        </section>


        {/* ---------------------------------------------------- */}
        {/* FRAME 03: CATAMARAN (Center-Left Dominant Vessel Reveal) */}
        {/* ---------------------------------------------------- */}
        <section className="relative min-h-[1450px] pt-16">
          {/* Pushpin 03 */}
          <div className="absolute top-[720px] left-[15%] sm:left-[24%] z-35">
            <RedPushPin shadowAngle="bottom" size={32} />
          </div>

          {/* Chapter Title */}
          <div className="absolute top-12 left-4 sm:left-12 z-25 max-w-md">
            <div className="inline-block px-2.5 py-0.5 bg-[#FAF6EE]/90 border border-[#0A2540]/15 rounded-xs font-mono text-[10px] text-[#2563EB] uppercase tracking-widest mb-1 shadow-xs">
              03 / VESSEL REVEAL · OFFSHORE MOORING · 02:15 PM
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A2540] tracking-tight">
              The Boat Changes the Scale.
            </h2>
          </div>

          {/* Hero Polaroid: Flagship Catamaran */}
          <div className="absolute top-40 left-4 sm:left-12 z-20">
            <PhysicalPolaroid
              imageSrc="/images/vessel_catamaran.jpg"
              caption="Flagship 25.90M Expedition Catamaran"
              subcaption="Twin wave-piercing hulls · Three decks"
              size="hero"
              rotation={-1}
              shadowIntensity="day"
              annotation="FLAGSHIP 25.90M"
            />
          </div>

          {/* Detail Polaroid: Upper Deck */}
          <div className="absolute top-[680px] right-6 sm:right-20 z-25">
            <PhysicalPolaroid
              imageSrc="/images/vessel_yacht.jpg"
              caption="Upper deck radar & sun canopy"
              subcaption="Teak decking · 360° horizon terrace"
              size="md"
              rotation={3.5}
              shadowIntensity="day"
            />
          </div>

          {/* Polaroid: Offshore Mooring */}
          <div className="absolute top-[1020px] right-16 sm:right-48 z-20">
            <PhysicalPolaroid
              imageSrc="/images/malpe_basalt_yacht.jpg"
              caption="Submersible boarding platform"
              subcaption="Moored 700m in deep sapphire water"
              size="sm"
              rotation={-4}
              shadowIntensity="day"
            />
          </div>

          {/* Brass Compass resting on sand */}
          <div className="absolute top-[820px] left-12 sm:left-32 z-25">
            <BrassCompass rotation={18} />
          </div>

          {/* Torn Paper Note: Vessel Scale */}
          <div className="absolute top-[1140px] left-16 sm:left-40 z-25">
            <PhysicalPaperNote
              tag="VESSEL MANIFEST"
              text="Not a billionaire's yacht: an authentic commercial expedition ship built for the Arabian Sea. Three decks of open air, teak joinery, and ocean swells."
              subtext="ALL ABOARD · WESTBOUND TRAJECTORY →"
              theme="parchment"
              rotation={-1.5}
              tapeTop={true}
            />
          </div>
        </section>


        {/* ---------------------------------------------------- */}
        {/* FRAME 04: ONBOARD LIFE (Mid-Right Warm Amber Cluster) */}
        {/* ---------------------------------------------------- */}
        <section className="relative min-h-[1400px] pt-16">
          {/* Pushpin 04 */}
          <div className="absolute top-[720px] right-[20%] sm:right-[38%] z-35">
            <RedPushPin shadowAngle="sunset" size={32} />
          </div>

          {/* Chapter Title */}
          <div className="absolute top-12 right-6 sm:right-16 z-25 max-w-md text-right">
            <div className="inline-block px-2.5 py-0.5 bg-[#FAF6EE]/90 border border-[#0A2540]/15 rounded-xs font-mono text-[10px] text-[#D97706] uppercase tracking-widest mb-1 shadow-xs">
              04 / ONBOARD LIFE · UPPER TEAK DECK · 04:00 PM
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A2540] tracking-tight">
              Stay a Little Longer.
            </h2>
          </div>

          {/* Hero Polaroid: Social Dining */}
          <div className="absolute top-40 right-4 sm:right-12 z-20">
            <PhysicalPolaroid
              imageSrc="/images/dining_deck.jpg"
              caption="Upper Teak Deck · Social Dining & Music"
              subcaption="Candlelit tables · Arabian Sea horizon"
              size="hero"
              rotation={1.5}
              shadowIntensity="sunset"
              annotation="ONBOARD DINING"
            />
          </div>

          {/* Polaroid: Live Seafood Grill */}
          <div className="absolute top-[680px] left-6 sm:left-20 z-25">
            <PhysicalPolaroid
              imageSrc="/images/curated_dining.jpg"
              caption="Live coastal fresh catch grill"
              subcaption="Sear fish rava fry & kokum marinades"
              size="md"
              rotation={-3.5}
              shadowIntensity="sunset"
            />
          </div>

          {/* Polaroid: Salon Theatre */}
          <div className="absolute top-[1020px] left-16 sm:left-48 z-20">
            <PhysicalPolaroid
              imageSrc="/images/coral_dining_theatre.png"
              caption="Salon navigational chart table"
              subcaption="Brass dividers & acoustic music"
              size="sm"
              rotation={4.5}
              shadowIntensity="sunset"
            />
          </div>

          {/* Torn Paper Note: Gastronomy */}
          <div className="absolute top-[1140px] right-12 sm:right-32 z-25">
            <PhysicalPaperNote
              tag="KARAVALI GASTRONOMY"
              text="Butter-garlic prawns, sear fish rava fry, tender coconut coolers. Acoustic music mixes with warm wind. The social heart of the expedition."
              subtext="APPROACHING ST. MARY'S ARCHIPELAGO →"
              theme="burntAmber"
              rotation={2}
              tapeTop={true}
              pebbleCorner={true}
            />
          </div>
        </section>


        {/* ---------------------------------------------------- */}
        {/* FRAME 05: BASALT ISLAND (Center-Left Geological Wonder) */}
        {/* ---------------------------------------------------- */}
        <section className="relative min-h-[1400px] pt-16">
          {/* Pushpin 05 */}
          <div className="absolute top-[720px] left-[18%] sm:left-[27%] z-35">
            <RedPushPin shadowAngle="sunset" size={32} />
          </div>

          {/* Chapter Title */}
          <div className="absolute top-12 left-4 sm:left-12 z-25 max-w-md">
            <div className="inline-block px-2.5 py-0.5 bg-[#FAF6EE]/90 border border-[#0A2540]/15 rounded-xs font-mono text-[10px] text-[#B45309] uppercase tracking-widest mb-1 shadow-xs">
              05 / BASALT ISLAND · ST. MARY'S ISLES · 05:15 PM
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A2540] tracking-tight">
              Leave the Noise Behind.
            </h2>
          </div>

          {/* Hero Polaroid: St. Mary's Basalt */}
          <div className="absolute top-40 left-4 sm:left-12 z-20">
            <PhysicalPolaroid
              imageSrc="/images/malpe_basalt_island_1786648030492.jpg"
              caption="St. Mary's 6-Sided Hexagonal Columnar Basalt"
              subcaption="88 million years old · Geological monument"
              size="hero"
              rotation={-2}
              shadowIntensity="sunset"
              annotation="GEOLOGICAL MONUMENT"
            />
          </div>

          {/* Polaroid: Basalt Trail */}
          <div className="absolute top-[680px] right-6 sm:right-20 z-25">
            <PhysicalPolaroid
              imageSrc="/images/coral_jetty_pier.png"
              caption="Natural volcanic stepping-stone paths"
              subcaption="Crystal turquoise lagoon boundary"
              size="md"
              rotation={3.5}
              shadowIntensity="sunset"
            />
          </div>

          {/* Polaroid: Rock Pool */}
          <div className="absolute top-[1020px] right-16 sm:right-48 z-20">
            <PhysicalPolaroid
              imageSrc="/images/shoreline_foam.jpg"
              caption="Tidal surge pools in rock fissures"
              subcaption="Wind-bowed coastal flora"
              size="sm"
              rotation={-5}
              shadowIntensity="sunset"
            />
          </div>

          {/* Torn Paper Note: Geology */}
          <div className="absolute top-[1140px] left-12 sm:left-32 z-25">
            <PhysicalPaperNote
              tag="GEOLOGICAL RECORD"
              text="Six-sided dark pillars formed when Madagascar tore away from India. Quiet cathedral of stone. The bird lands on the western ledge."
              subtext="THE SUN TOUCHES THE HORIZON →"
              theme="laterite"
              rotation={-2.5}
              pinTop={true}
            />
          </div>
        </section>


        {/* ---------------------------------------------------- */}
        {/* FRAME 06: SUNSET PAUSE (Center-Right Golden Hour Horizon) */}
        {/* ---------------------------------------------------- */}
        <section className="relative min-h-[1450px] pt-16">
          {/* Pushpin 06 */}
          <div className="absolute top-[750px] right-[18%] sm:right-[38%] z-35">
            <RedPushPin shadowAngle="sunset" size={32} />
          </div>

          {/* Chapter Title */}
          <div className="absolute top-12 right-6 sm:right-16 z-25 max-w-md text-right">
            <div className="inline-block px-2.5 py-0.5 bg-[#FAF6EE]/90 border border-[#0A2540]/15 rounded-xs font-mono text-[10px] text-[#C2410C] uppercase tracking-widest mb-1 shadow-xs">
              06 / SUNSET PAUSE · WESTERN HORIZON · 06:30 PM
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A2540] tracking-tight">
              Chase the Light.
            </h2>
          </div>

          {/* Hero Polaroid: Grand Sunset */}
          <div className="absolute top-40 right-4 sm:right-12 z-20">
            <PhysicalPolaroid
              imageSrc="/images/sunset_catamaran.jpg"
              caption="Westbound Arabian Sea Sunset"
              subcaption="284° WNW · Molten gold horizon"
              size="hero"
              rotation={0}
              shadowIntensity="sunset"
              annotation="GOLDEN HOUR · 284°"
            />
          </div>

          {/* Polaroid: Liquid Gold Swell */}
          <div className="absolute top-[700px] left-6 sm:left-20 z-25">
            <PhysicalPolaroid
              imageSrc="/images/golden_hour.jpg"
              caption="Liquid gold reflection on ocean"
              subcaption="Deep swell specular highlights"
              size="md"
              rotation={-3}
              shadowIntensity="sunset"
            />
          </div>

          {/* Polaroid: Deck Silhouette */}
          <div className="absolute top-[1040px] left-16 sm:left-48 z-20">
            <PhysicalPolaroid
              imageSrc="/images/coral_golden_hour_deck.png"
              caption="Distant vessel in sunset path"
              subcaption="Silhouetted Brahminy kite"
              size="sm"
              rotation={4}
              shadowIntensity="sunset"
            />
          </div>

          {/* Torn Paper Note: Sunset */}
          <div className="absolute top-[1160px] right-12 sm:right-32 z-25">
            <PhysicalPaperNote
              tag="MOMENT OF STILLNESS"
              text="The bird stands in dark silhouette on the cliff. The ocean turns to molten gold. The world goes quiet."
              subtext="LIGHT COLLAPSES INTO NIGHT →"
              theme="burntAmber"
              rotation={2.5}
              tapeTop={true}
            />
          </div>
        </section>


        {/* ---------------------------------------------------- */}
        {/* FRAME 07: NIGHT (Center-Left Deep Sapphire Midnight) */}
        {/* ---------------------------------------------------- */}
        <section className="relative min-h-[1400px] pt-16">
          {/* Pushpin 07 */}
          <div className="absolute top-[720px] left-[18%] sm:left-[28%] z-35">
            <RedPushPin shadowAngle="night" size={32} />
          </div>

          {/* Chapter Title */}
          <div className="absolute top-12 left-4 sm:left-12 z-25 max-w-md">
            <div className="inline-block px-2.5 py-0.5 bg-[#0A2540] border border-[#38BDF8]/30 rounded-xs font-mono text-[10px] text-[#38BDF8] uppercase tracking-widest mb-1 shadow-md">
              07 / NIGHT · AFTER DARK · 08:45 PM
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF6EE] tracking-tight">
              No Road Ahead. Just Horizon.
            </h2>
          </div>

          {/* Hero Polaroid: Moonlit Basalt */}
          <div className="absolute top-40 left-4 sm:left-12 z-20">
            <PhysicalPolaroid
              imageSrc="/images/night_sapphire.jpg"
              caption="Moonlit Basalt · Midnight Sapphire"
              subcaption="Ambient starlight · Deep ocean calm"
              size="hero"
              rotation={-1}
              shadowIntensity="night"
              annotation="NIGHT EXPEDITION"
            />
          </div>

          {/* Polaroid: Starry Sea */}
          <div className="absolute top-[680px] right-6 sm:right-20 z-25">
            <PhysicalPolaroid
              imageSrc="/images/sapphire_night_ocean.jpg"
              caption="Rolling surf & celestial starlight"
              subcaption="Silver reflections on black basalt"
              size="md"
              rotation={3}
              shadowIntensity="night"
            />
          </div>

          {/* Polaroid: Nightfall Ocean */}
          <div className="absolute top-[1020px] right-16 sm:right-48 z-20">
            <PhysicalPolaroid
              imageSrc="/images/nightfall_ocean.jpg"
              caption="The last light fades into the horizon"
              subcaption="13°21′02″ N · Midnight sea"
              size="sm"
              rotation={-3.5}
              shadowIntensity="night"
            />
          </div>

          {/* Torn Paper Note: Night */}
          <div className="absolute top-[1140px] left-12 sm:left-32 z-25">
            <PhysicalPaperNote
              tag="NIGHT RECORD"
              text="Silver moonlight on volcanic rock. Distant breaking waves. The guide bird glides through the dark canyon toward the open sky."
              subtext="AND THEN THE SKY LIGHTS UP →"
              theme="navy"
              rotation={-2}
              pinTop={true}
            />
          </div>
        </section>


        {/* ---------------------------------------------------- */}
        {/* FRAME 08: DRONE SHOW (Celestial Climax & Finale on Sand) */}
        {/* ---------------------------------------------------- */}
        <section className="relative min-h-[1600px] pt-16">
          {/* Pushpin 08 (Final Termination) */}
          <div className="absolute top-[720px] left-1/2 -translate-x-1/2 z-35">
            <RedPushPin shadowAngle="night" size={36} />
          </div>

          {/* Chapter Title */}
          <div className="text-center max-w-2xl mx-auto z-25 relative mb-12">
            <div className="inline-block px-3 py-1 bg-[#0A2540] border border-[#2DD4BF]/40 rounded-xs font-mono text-[10px] text-[#2DD4BF] uppercase tracking-widest mb-2 shadow-md">
              08 / DRONE SHOW · AERIAL CELESTIAL CLIMAX · 09:30 PM
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-[#FAF6EE] tracking-tight">
              The Night Belongs <br />
              <span className="italic text-[#2DD4BF]">to the Sea.</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#FAF6EE]/75 max-w-lg mx-auto mt-3">
              Three hundred synchronized lights rise from the dark water into the open sky above St. Mary's.
            </p>
          </div>

          {/* Hero Polaroid: 300-Drone Constellation */}
          <div className="max-w-4xl mx-auto z-20 relative">
            <PhysicalPolaroid
              imageSrc="/images/hero_ocean.jpg"
              caption="300-Drone Constellation over the Arabian Sea"
              subcaption="Wave & Brahminy kite formations · Water reflections"
              size="hero"
              rotation={0}
              shadowIntensity="night"
              annotation="THE CELESTIAL FINALE"
            />
          </div>

          {/* Supporting Polaroids */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12 z-25 relative">
            <div className="flex justify-center sm:justify-start">
              <PhysicalPolaroid
                imageSrc="/images/coral_event_spaces.png"
                caption="The nautical compass rose formation"
                subcaption="Synchronized celestial choreography"
                size="md"
                rotation={-2.5}
                shadowIntensity="night"
              />
            </div>

            <div className="flex justify-center sm:justify-end">
              <PhysicalPolaroid
                imageSrc="/images/underwater_marine.jpg"
                caption="Fragmented wave reflections below"
                subcaption="Glowing bioluminescent tones"
                size="md"
                rotation={3}
                shadowIntensity="night"
              />
            </div>
          </div>

          {/* Torn Paper Note: Climax */}
          <div className="max-w-md mx-auto mt-8 z-25 relative">
            <PhysicalPaperNote
              tag="THE CLIMAX"
              text="And then the sky lights up. The bird rests on the basalt ledge below, witnessing the constellation."
              subtext="EXPEDITION CONCLUDED · MALPE ARCHIPELAGO"
              theme="navy"
              rotation={0}
              pinTop={true}
              className="mx-auto"
            />
          </div>

          {/* Final Vision Board Seal & Epilogue Sign-off */}
          <div className="text-center pt-24 pb-16 max-w-xl mx-auto z-25 relative">
            <div className="inline-block mb-6">
              <RubberStamp
                label="EXPEDITION ARCHIVE"
                location="MALPE · ARABIAN SEA"
                coordinates="13°21′02″ N · 74°42′08″ E"
                year="2026"
                color="#E05A36"
                rotation={0}
              />
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF6EE] tracking-tight">
              The Journey Continues.
            </h3>
            <p className="font-mono text-xs text-[#E05A36] uppercase tracking-widest mt-1">
              CORAL ADVENTURES · MALPE · ARABIAN SEA
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
              <Link
                href="/"
                className="px-4 py-2 bg-[#FAF6EE]/10 hover:bg-[#FAF6EE]/20 border border-[#FAF6EE]/30 text-[#FAF6EE] rounded-full transition-all tracking-wider"
              >
                ← RETURN TO EDITORIAL HOME
              </Link>
              <Link
                href="/journey"
                className="px-4 py-2 bg-[#E05A36] hover:bg-[#C2410C] text-white rounded-full transition-all tracking-wider shadow-lg"
              >
                EXPLORE 3D DIGITAL TWIN →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
