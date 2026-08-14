"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BeachShorelineCanvas } from "./BeachShorelineCanvas";
import { RealRedThread } from "./RealRedThread";
import { RedPushPin } from "./RedPushPin";
import { BeachPolaroidHero } from "./BeachPolaroidHero";
import { PhysicalPolaroid } from "./PhysicalPolaroid";
import { PhysicalPaperNote } from "./PhysicalPaperNote";
import { RubberStamp, BrassCompass, Seashell } from "./PhysicalEphemera";
import { BoardingPassStub } from "../editorial/ephemera/BoardingPassStub";
import { AmbientSoundToggle } from "./AmbientSoundToggle";

export function BeachVisionBoardMaster() {
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
    <div className="relative w-full min-h-screen selection:bg-[#E05A36] selection:text-white overflow-x-hidden">
      {/* 1. Procedural Realistic Shoreline & Sand Background */}
      <BeachShorelineCanvas />

      {/* 2. Continuous 3D Twisted Red Cord */}
      <RealRedThread scrollProgress={scrollProgress} />

      {/* 3. Synthesized Ambient Arabian Sea Surf Sound Controller */}
      <AmbientSoundToggle />

      {/* 4. Compact Floating Expedition Header */}
      <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-none max-w-7xl mx-auto">
        <Link
          href="/"
          className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 bg-[#FAF6EE]/90 hover:bg-[#FAF6EE] text-[#0A2540] backdrop-blur-md rounded-full shadow-md border border-[#0A2540]/15 text-xs font-mono tracking-wider transition-all"
        >
          <span>←</span>
          <span className="font-semibold">HOME</span>
        </Link>

        <div className="pointer-events-auto hidden sm:flex items-center gap-3 px-4 py-1.5 bg-[#FAF6EE]/90 backdrop-blur-md rounded-full border border-[#0A2540]/15 shadow-md font-mono text-xs text-[#0A2540]">
          <span className="w-2 h-2 rounded-full bg-[#E05A36] animate-pulse" />
          <span className="font-bold tracking-widest text-[#C2410C]">MALPE EXPEDITION VISION BOARD</span>
          <span className="opacity-40">|</span>
          <span className="opacity-75">13°21′02″ N · 74°42′08″ E</span>
        </div>

        <Link
          href="/journey"
          className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 bg-[#E05A36] hover:bg-[#C2410C] text-white rounded-full shadow-md text-xs font-mono tracking-wider transition-all"
        >
          <span>3D WORLD</span>
          <span>→</span>
        </Link>
      </div>

      {/* 5. Master Serpentine 25ft Physical Beach Vision Board */}
      <div className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 pt-16 z-20 pb-36">

        {/* ------------------------------------------------------------------ */}
        {/* FRAME 01: ARRIVAL (Immediate Shoreline Cluster · Zero Empty Space) */}
        {/* ------------------------------------------------------------------ */}
        <section className="relative min-h-[1420px] pt-4">
          {/* Chapter Title Badge pinned directly on sand */}
          <div className="absolute top-2 left-4 sm:left-10 z-25 max-w-md">
            <div className="inline-block px-3 py-1 bg-[#FAF6EE]/95 border border-[#0A2540]/15 rounded-xs font-mono text-[10px] sm:text-xs text-[#C2410C] uppercase tracking-widest mb-1.5 shadow-sm">
              01 / ARRIVAL · MALPE FORESHORE · 11:30 AM
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#0A2540] tracking-tight">
              The Journey Starts on the Sand.
            </h1>
            <p className="font-serif italic text-base sm:text-lg text-[#C2410C] mt-0.5">
              The complete expedition laid onto the beach.
            </p>
          </div>

          {/* 3D Pushpin 01 at (420, 580) */}
          <div className="absolute top-[480px] left-[26%] sm:left-[30%] z-35">
            <RedPushPin shadowAngle="bottom" size={34} />
          </div>

          {/* MASSIVE HERO POLAROID (55-70% Visual Field) */}
          <div className="absolute top-28 left-2 sm:left-8 z-20">
            <BeachPolaroidHero
              imageSrc="/images/malpe_coast.jpg"
              caption="Malpe Foreshore Arrival · High Sun"
              subcaption="13°21′02″ N · 74°42′08″ E · COASTAL KARNATAKA"
              annotation="STATION 01 · BEACH HEAD"
              rotation={-1.5}
              shadowAngle="day"
              priority={true}
            />
          </div>

          {/* Supporting Polaroid: Beach Kiosk */}
          <div className="absolute top-[520px] right-2 sm:right-12 z-25">
            <PhysicalPolaroid
              imageSrc="/images/coral_arrival_pavilion.png"
              caption="The beach kiosk & boarding pass counter"
              subcaption="Weathered teak & sailcloth canopy"
              size="md"
              rotation={4.5}
              shadowIntensity="day"
            />
          </div>

          {/* Supporting Polaroid: Palm Trail */}
          <div className="absolute top-[880px] right-8 sm:right-36 z-20">
            <PhysicalPolaroid
              imageSrc="/images/coral_beach_promenade.png"
              caption="Crushed laterite trail leading seaward"
              subcaption="High palms & salt breeze"
              size="sm"
              rotation={-4.5}
              shadowIntensity="day"
            />
          </div>

          {/* Perforated Boarding Pass Stub on Sand */}
          <div className="absolute top-[720px] left-6 sm:left-24 z-25">
            <BoardingPassStub
              passNumber="CR-2026-0814"
              routeFrom="MALPE FORESHORE"
              routeTo="ST. MARY'S ISLES"
              departureTime="11:30 AM"
              vesselName="CORAL CATAMARAN · 25.90M"
              className="shadow-2xl -rotate-2"
            />
          </div>

          {/* Torn Paper Note: Start Here */}
          <div className="absolute top-[1060px] left-10 sm:left-32 z-25">
            <PhysicalPaperNote
              tag="EXPEDITION NOTE 01"
              text="START HERE. The journey begins on the sand. Roasting spices from beach stalls, warm wind through high palms, and the catamaran moored offshore."
              subtext="FOLLOW THE RED CORD SEAWARD →"
              theme="parchment"
              rotation={2}
              tapeTop={true}
              pebbleCorner={true}
            />
          </div>

          {/* Ephemera on Sand */}
          <div className="absolute top-[480px] left-[52%] z-20">
            <RubberStamp
              label="CORAL EXPEDITION"
              location="MALPE FORESHORE"
              coordinates="13°21′02″ N · 74°42′08″ E"
              year="2026"
              rotation={-12}
            />
          </div>
          <div className="absolute top-[1200px] left-[48%] z-20">
            <Seashell type="cowrie" rotation={28} />
          </div>
        </section>


        {/* ------------------------------------------------------------------ */}
        {/* FRAME 02: WATERSPORTS (Mid-Right Active Surf Zone Cluster) */}
        {/* ------------------------------------------------------------------ */}
        <section className="relative min-h-[1420px] pt-12">
          {/* 3D Pushpin 02 */}
          <div className="absolute top-[520px] right-[24%] sm:right-[38%] z-35">
            <RedPushPin shadowAngle="bottom" size={34} />
          </div>

          {/* Chapter Title */}
          <div className="absolute top-6 right-4 sm:right-12 z-25 max-w-md text-right">
            <div className="inline-block px-3 py-1 bg-[#FAF6EE]/95 border border-[#0A2540]/15 rounded-xs font-mono text-[10px] sm:text-xs text-[#0D9488] uppercase tracking-widest mb-1.5 shadow-sm">
              02 / WATERSPORTS · ACTIVE SURF ZONE · 12:45 PM
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A2540] tracking-tight">
              The Water Gets Louder.
            </h2>
          </div>

          {/* Hero Polaroid: Marine Activities */}
          <div className="absolute top-28 right-2 sm:right-8 z-20">
            <BeachPolaroidHero
              imageSrc="/images/coral_marine_activities.png"
              caption="High-Spray Jet Skis, Parasailing & Kayaks"
              subcaption="Turquoise shallows · Inshore surf zone · Active momentum"
              annotation="ACTIVE ZONE · 24 KNOTS"
              rotation={2}
              shadowAngle="day"
            />
          </div>

          {/* Supporting Polaroid: Bow Wake Spray */}
          <div className="absolute top-[540px] left-4 sm:left-16 z-25">
            <PhysicalPolaroid
              imageSrc="/images/wave_foam_crest.jpg"
              caption="Carving bow wakes through cyan shallows"
              subcaption="5-harmonic Gerstner wave displacement"
              size="md"
              rotation={-4}
              shadowIntensity="day"
            />
          </div>

          {/* Supporting Polaroid: Sandbar Surf */}
          <div className="absolute top-[900px] left-12 sm:left-40 z-20">
            <PhysicalPolaroid
              imageSrc="/images/aerial_wave_foam.jpg"
              caption="Sandbars & multi-harmonic surf swash"
              subcaption="Tidal surge boundary"
              size="sm"
              rotation={5}
              shadowIntensity="day"
            />
          </div>

          {/* Torn Paper Note: Watersports */}
          <div className="absolute top-[1040px] right-8 sm:right-28 z-25">
            <PhysicalPaperNote
              tag="AIRBORNE GUIDE"
              text="The water gets louder. The guide bird slices across the spray. Yellow kayaks cut through gentle swells toward the open sea."
              subtext="LEAVING THE SHALLOWS BEHIND →"
              theme="cream"
              rotation={-2.5}
              pinTop={true}
            />
          </div>

          {/* Ephemera: Scallop Shell */}
          <div className="absolute top-[920px] right-[46%] z-20">
            <Seashell type="scallop" rotation={-18} />
          </div>
        </section>


        {/* ------------------------------------------------------------------ */}
        {/* FRAME 03: CATAMARAN REVEAL (Center-Left Dominant Flagship Vessel) */}
        {/* ------------------------------------------------------------------ */}
        <section className="relative min-h-[1450px] pt-12">
          {/* 3D Pushpin 03 */}
          <div className="absolute top-[540px] left-[22%] sm:left-[28%] z-35">
            <RedPushPin shadowAngle="bottom" size={34} />
          </div>

          {/* Chapter Title */}
          <div className="absolute top-6 left-4 sm:left-10 z-25 max-w-md">
            <div className="inline-block px-3 py-1 bg-[#FAF6EE]/95 border border-[#0A2540]/15 rounded-xs font-mono text-[10px] sm:text-xs text-[#2563EB] uppercase tracking-widest mb-1.5 shadow-sm">
              03 / VESSEL REVEAL · OFFSHORE MOORING · 02:15 PM
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A2540] tracking-tight">
              The Boat Changes the Scale.
            </h2>
          </div>

          {/* Hero Polaroid: Flagship Catamaran */}
          <div className="absolute top-28 left-2 sm:left-8 z-20">
            <BeachPolaroidHero
              imageSrc="/images/vessel_catamaran.jpg"
              caption="Flagship 25.90M Expedition Catamaran"
              subcaption="Twin wave-piercing demi-hulls · Three decks · Arabian Sea scale"
              annotation="FLAGSHIP 25.90M"
              rotation={-1}
              shadowAngle="day"
            />
          </div>

          {/* Detail Polaroid: Upper Deck */}
          <div className="absolute top-[540px] right-4 sm:right-16 z-25">
            <PhysicalPolaroid
              imageSrc="/images/vessel_yacht.jpg"
              caption="Upper deck radar & sun canopy"
              subcaption="360° observation terrace · Teak joinery"
              size="md"
              rotation={3.5}
              shadowIntensity="day"
            />
          </div>

          {/* Detail Polaroid: Offshore Platform */}
          <div className="absolute top-[900px] right-12 sm:right-40 z-20">
            <PhysicalPolaroid
              imageSrc="/images/malpe_basalt_yacht.jpg"
              caption="Submersible boarding platform"
              subcaption="Moored 700m offshore in deep sapphire water"
              size="sm"
              rotation={-4}
              shadowIntensity="day"
            />
          </div>

          {/* Brass Pocket Compass on Sand */}
          <div className="absolute top-[720px] left-10 sm:left-28 z-25">
            <BrassCompass rotation={22} />
          </div>

          {/* Torn Paper Note: Scale */}
          <div className="absolute top-[1060px] left-12 sm:left-36 z-25">
            <PhysicalPaperNote
              tag="VESSEL MANIFEST"
              text="THERE SHE IS. Not a billionaire's yacht: an authentic commercial expedition ship built for the Arabian Sea. Three decks of open air, teak joinery, and ocean swells."
              subtext="ALL ABOARD · WESTBOUND TRAJECTORY →"
              theme="parchment"
              rotation={-1.5}
              tapeTop={true}
              pebbleCorner={true}
            />
          </div>
        </section>


        {/* ------------------------------------------------------------------ */}
        {/* FRAME 04: ONBOARD LIFE (Mid-Right Warm Golden Amber Cluster) */}
        {/* ------------------------------------------------------------------ */}
        <section className="relative min-h-[1420px] pt-12">
          {/* 3D Pushpin 04 */}
          <div className="absolute top-[540px] right-[24%] sm:right-[38%] z-35">
            <RedPushPin shadowAngle="sunset" size={34} />
          </div>

          {/* Chapter Title */}
          <div className="absolute top-6 right-4 sm:right-12 z-25 max-w-md text-right">
            <div className="inline-block px-3 py-1 bg-[#FAF6EE]/95 border border-[#0A2540]/15 rounded-xs font-mono text-[10px] sm:text-xs text-[#D97706] uppercase tracking-widest mb-1.5 shadow-sm">
              04 / ONBOARD LIFE · UPPER TEAK DECK · 04:00 PM
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A2540] tracking-tight">
              Stay a Little Longer.
            </h2>
          </div>

          {/* Hero Polaroid: Social Dining */}
          <div className="absolute top-28 right-2 sm:right-8 z-20">
            <BeachPolaroidHero
              imageSrc="/images/dining_deck.jpg"
              caption="Upper Teak Deck · Social Dining & Music"
              subcaption="Candlelit tables · Arabian Sea horizon · Karavali cuisine"
              annotation="ONBOARD DINING"
              rotation={1.5}
              shadowAngle="sunset"
            />
          </div>

          {/* Detail Polaroid: Live Seafood Grill */}
          <div className="absolute top-[540px] left-4 sm:left-16 z-25">
            <PhysicalPolaroid
              imageSrc="/images/curated_dining.jpg"
              caption="Live coastal fresh catch grill"
              subcaption="Sear fish rava fry & kokum marinades"
              size="md"
              rotation={-3.5}
              shadowIntensity="sunset"
            />
          </div>

          {/* Detail Polaroid: Salon Chart Table */}
          <div className="absolute top-[900px] left-12 sm:left-40 z-20">
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
          <div className="absolute top-[1060px] right-8 sm:right-28 z-25">
            <PhysicalPaperNote
              tag="KARAVALI GASTRONOMY"
              text="FOOD. MUSIC. SEA. Butter-garlic prawns, sear fish rava fry, tender coconut coolers. Acoustic music mixes with warm wind. The social heart of the expedition."
              subtext="APPROACHING ST. MARY'S ARCHIPELAGO →"
              theme="burntAmber"
              rotation={2}
              tapeTop={true}
              pebbleCorner={true}
            />
          </div>
        </section>


        {/* ------------------------------------------------------------------ */}
        {/* FRAME 05: BASALT ISLAND (Center-Left 88M-Yr-Old Columnar Basalt) */}
        {/* ------------------------------------------------------------------ */}
        <section className="relative min-h-[1420px] pt-12">
          {/* 3D Pushpin 05 */}
          <div className="absolute top-[540px] left-[24%] sm:left-[30%] z-35">
            <RedPushPin shadowAngle="sunset" size={34} />
          </div>

          {/* Chapter Title */}
          <div className="absolute top-6 left-4 sm:left-10 z-25 max-w-md">
            <div className="inline-block px-3 py-1 bg-[#FAF6EE]/95 border border-[#0A2540]/15 rounded-xs font-mono text-[10px] sm:text-xs text-[#B45309] uppercase tracking-widest mb-1.5 shadow-sm">
              05 / BASALT ISLAND · ST. MARY'S ISLES · 05:15 PM
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A2540] tracking-tight">
              Leave the Noise Behind.
            </h2>
          </div>

          {/* Hero Polaroid: St. Mary's Basalt */}
          <div className="absolute top-28 left-2 sm:left-8 z-20">
            <BeachPolaroidHero
              imageSrc="/images/malpe_basalt_island_1786648030492.jpg"
              caption="St. Mary's 6-Sided Hexagonal Columnar Basalt"
              subcaption="88 million years old · Geological monument · St. Mary's Archipelago"
              annotation="GEOLOGICAL MONUMENT"
              rotation={-2}
              shadowAngle="sunset"
            />
          </div>

          {/* Detail Polaroid: Basalt Path */}
          <div className="absolute top-[540px] right-4 sm:right-16 z-25">
            <PhysicalPolaroid
              imageSrc="/images/coral_jetty_pier.png"
              caption="Natural volcanic stepping-stone paths"
              subcaption="Crystal turquoise lagoon boundary"
              size="md"
              rotation={3.5}
              shadowIntensity="sunset"
            />
          </div>

          {/* Detail Polaroid: Rock Pools */}
          <div className="absolute top-[900px] right-12 sm:right-40 z-20">
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
          <div className="absolute top-[1060px] left-10 sm:left-32 z-25">
            <PhysicalPaperNote
              tag="GEOLOGICAL RECORD"
              text="FOLLOW THE ROCKS. Six-sided dark pillars formed when Madagascar tore away from India. Quiet cathedral of stone. The bird lands on the western ledge."
              subtext="THE SUN TOUCHES THE HORIZON →"
              theme="laterite"
              rotation={-2}
              pinTop={true}
            />
          </div>
        </section>


        {/* ------------------------------------------------------------------ */}
        {/* FRAME 06: SUNSET PAUSE (Center-Right Molten Gold Horizon) */}
        {/* ------------------------------------------------------------------ */}
        <section className="relative min-h-[1450px] pt-12">
          {/* 3D Pushpin 06 */}
          <div className="absolute top-[560px] right-[24%] sm:right-[38%] z-35">
            <RedPushPin shadowAngle="sunset" size={34} />
          </div>

          {/* Chapter Title */}
          <div className="absolute top-6 right-4 sm:right-12 z-25 max-w-md text-right">
            <div className="inline-block px-3 py-1 bg-[#FAF6EE]/95 border border-[#0A2540]/15 rounded-xs font-mono text-[10px] sm:text-xs text-[#C2410C] uppercase tracking-widest mb-1.5 shadow-sm">
              06 / SUNSET PAUSE · WESTERN HORIZON · 06:30 PM
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A2540] tracking-tight">
              Chase the Light.
            </h2>
          </div>

          {/* Hero Polaroid: Grand Sunset */}
          <div className="absolute top-28 right-2 sm:right-8 z-20">
            <BeachPolaroidHero
              imageSrc="/images/sunset_catamaran.jpg"
              caption="Westbound Arabian Sea Sunset"
              subcaption="284° WNW · Molten gold horizon · Distant catamaran silhouette"
              annotation="GOLDEN HOUR · 284°"
              rotation={0}
              shadowAngle="sunset"
            />
          </div>

          {/* Detail Polaroid: Liquid Gold Reflection */}
          <div className="absolute top-[560px] left-4 sm:left-16 z-25">
            <PhysicalPolaroid
              imageSrc="/images/golden_hour.jpg"
              caption="Liquid gold reflection on ocean"
              subcaption="Deep swell specular highlights"
              size="md"
              rotation={-3}
              shadowIntensity="sunset"
            />
          </div>

          {/* Detail Polaroid: Catamaran Silhouette */}
          <div className="absolute top-[920px] left-12 sm:left-40 z-20">
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
          <div className="absolute top-[1080px] right-8 sm:right-28 z-25">
            <PhysicalPaperNote
              tag="MOMENT OF STILLNESS"
              text="CHASE THE LIGHT. 284° WNW · 17:30. The bird stands in dark silhouette on the cliff. The ocean turns to molten gold. The world goes quiet."
              subtext="LIGHT COLLAPSES INTO NIGHT →"
              theme="burntAmber"
              rotation={2.5}
              tapeTop={true}
            />
          </div>
        </section>


        {/* ------------------------------------------------------------------ */}
        {/* FRAME 07: NIGHT (Center-Left Moonlit Midnight Sapphire) */}
        {/* ------------------------------------------------------------------ */}
        <section className="relative min-h-[1420px] pt-12">
          {/* 3D Pushpin 07 */}
          <div className="absolute top-[540px] left-[24%] sm:left-[30%] z-35">
            <RedPushPin shadowAngle="night" size={34} />
          </div>

          {/* Chapter Title */}
          <div className="absolute top-6 left-4 sm:left-10 z-25 max-w-md">
            <div className="inline-block px-3 py-1 bg-[#0A2540] border border-[#38BDF8]/30 rounded-xs font-mono text-[10px] sm:text-xs text-[#38BDF8] uppercase tracking-widest mb-1.5 shadow-md">
              07 / NIGHT · AFTER DARK · 08:45 PM
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF6EE] tracking-tight">
              No Road Ahead. Just Horizon.
            </h2>
          </div>

          {/* Hero Polaroid: Moonlit Basalt */}
          <div className="absolute top-28 left-2 sm:left-8 z-20">
            <BeachPolaroidHero
              imageSrc="/images/night_sapphire.jpg"
              caption="Moonlit Basalt · Midnight Sapphire"
              subcaption="Ambient starlight · Deep ocean calm · St. Mary's night"
              annotation="NIGHT EXPEDITION"
              rotation={-1}
              shadowAngle="night"
            />
          </div>

          {/* Detail Polaroid: Starry Sea */}
          <div className="absolute top-[540px] right-4 sm:right-16 z-25">
            <PhysicalPolaroid
              imageSrc="/images/sapphire_night_ocean.jpg"
              caption="Rolling surf & celestial starlight"
              subcaption="Silver reflections on black basalt"
              size="md"
              rotation={3}
              shadowIntensity="night"
            />
          </div>

          {/* Detail Polaroid: Nightfall Ocean */}
          <div className="absolute top-[900px] right-12 sm:right-40 z-20">
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
          <div className="absolute top-[1060px] left-10 sm:left-32 z-25">
            <PhysicalPaperNote
              tag="NIGHT RECORD"
              text="AFTER DARK. NO ROAD AHEAD. JUST HORIZON. Silver moonlight on volcanic rock. Distant breaking waves. The guide bird glides through the dark canyon."
              subtext="AND THEN THE SKY LIGHTS UP →"
              theme="navy"
              rotation={-2}
              pinTop={true}
            />
          </div>
        </section>


        {/* ------------------------------------------------------------------ */}
        {/* FRAME 08: DRONE SHOW (Celestial Climax & Finale on Sand) */}
        {/* ------------------------------------------------------------------ */}
        <section className="relative min-h-[1600px] pt-12">
          {/* Final 3D Pushpin 08 Termination */}
          <div className="absolute top-[540px] left-1/2 -translate-x-1/2 z-35">
            <RedPushPin shadowAngle="night" size={38} />
          </div>

          {/* Chapter Title */}
          <div className="text-center max-w-2xl mx-auto z-25 relative mb-8">
            <div className="inline-block px-3 py-1 bg-[#0A2540] border border-[#2DD4BF]/40 rounded-xs font-mono text-[10px] sm:text-xs text-[#2DD4BF] uppercase tracking-widest mb-2 shadow-md">
              08 / DRONE SHOW · AERIAL CELESTIAL CLIMAX · 09:30 PM
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-[#FAF6EE] tracking-tight">
              The Night Belongs <br />
              <span className="italic text-[#2DD4BF]">to the Sea.</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#FAF6EE]/75 max-w-lg mx-auto mt-2">
              Three hundred synchronized lights rise from the dark water into the open sky above St. Mary's.
            </p>
          </div>

          {/* Hero Polaroid: 300-Drone Constellation */}
          <div className="max-w-4xl mx-auto z-20 relative flex justify-center">
            <BeachPolaroidHero
              imageSrc="/images/hero_ocean.jpg"
              caption="300-Drone Constellation over the Arabian Sea"
              subcaption="Wave & Brahminy kite formations · Water reflections · St. Mary's sky"
              annotation="THE CELESTIAL FINALE"
              rotation={0}
              shadowAngle="night"
            />
          </div>

          {/* Supporting Polaroids */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto mt-10 z-25 relative">
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
              text="AND THEN THE SKY LIGHTS UP. The bird rests on the basalt ledge below, witnessing the constellation."
              subtext="EXPEDITION CONCLUDED · MALPE ARCHIPELAGO"
              theme="navy"
              rotation={0}
              pinTop={true}
              className="mx-auto"
            />
          </div>

          {/* Final Vision Board Seal & Epilogue Sign-off */}
          <div className="text-center pt-20 pb-16 max-w-xl mx-auto z-25 relative">
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

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
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
