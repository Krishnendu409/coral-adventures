"use client";

import React from "react";
import { PatternedPaperSheet } from "./DesignedPatternPapers";
import { FabricSwatch } from "./TornEdgePaperSheet";
import {
  PostalCancellationStamp,
  BotanicalIllustration,
  SpecimenDiagram,
  HandwrittenAnnotation,
} from "./ScrapbookArtworkDetails";
import {
  WaxSeal,
  LeatherLuggageTag,
  VellumOverlayCard,
  BlindEmbossedBadge,
  MotherOfPearlMarker,
  DeckledFieldNote,
} from "./LuxuryExpeditionMaterials";
import { ArchivalPhotoPrint } from "./ArchivalPhotoPrint";
import { ScrollRevealWrapper } from "./ScrollReveal";
import { BoardingPassStub } from "../editorial/ephemera/BoardingPassStub";
import { ActivityWristband, BuoyTag, CoiledRope, DrinkCoaster, SeaGlass, LifeJacketStrap } from "./PhysicalBeachDebris";
import { BrassCompass } from "./PhysicalEphemera";

// ============================================================================
// SPREAD 01: THE BEACHHEAD ARRIVAL (Sun-Washed Archival Sand & Malpe Turquoise)
// ============================================================================
export function Spread01Arrival() {
  return (
    <section className="relative w-full">
      {/* Handcrafted Archival Paper Collage Substrate */}
      <div className="relative w-full rounded-tr-[44px] rounded-bl-[36px] bg-[#FAF7F0] border-2 border-[#E2D5BE] p-6 sm:p-10 shadow-[0_25px_65px_rgba(40,20,5,0.14)] overflow-hidden">
        
        {/* Large Malpe Turquoise Wave-Cut Sheet (Top Left ~40% of spread) */}
        <div className="absolute -top-12 -left-12 w-[65%] h-[80%] pointer-events-none">
          <PatternedPaperSheet
            variant="tealWaves"
            shape="wavy"
            tabLabel="ARRIVAL"
            tabColor="teal"
            rotation={-2}
            className="w-full h-full"
          />
        </div>

        {/* Coral Striped Zigzag Paper Scrap (Upper Right) */}
        <div className="absolute -top-6 -right-6 w-[45%] h-[48%] pointer-events-none">
          <PatternedPaperSheet
            variant="coralStripes"
            shape="zigzag"
            rotation={3}
            className="w-full h-full"
          />
        </div>

        {/* Bleed Sheet into Next Chapter: Turquoise Gingham Fragment (Bottom Right) */}
        <div className="absolute -bottom-8 -right-8 w-[40%] h-[35%] pointer-events-none">
          <PatternedPaperSheet
            variant="seafoamGingham"
            shape="postage"
            rotation={-2}
            className="w-full h-full"
          />
        </div>

        {/* Linen Fabric Swatch */}
        <div className="absolute top-10 right-24 z-10">
          <FabricSwatch material="linen" rotation={-3} />
        </div>

        {/* Printed Palm Botanical Watermark Background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.2] mix-blend-multiply"
          viewBox="0 0 1000 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="#15803D" strokeWidth="1.8">
            <path d="M 960 30 C 820 80, 700 200, 620 350" />
            <path d="M 860 80 Q 800 130, 730 150" />
            <path d="M 800 130 Q 740 190, 680 210" />
            <path d="M 30 770 C 160 730, 290 610, 360 470" />
            <path d="M 130 720 Q 190 670, 260 650" />
          </g>
          <text x="40" y="760" fill="#15803D" fontSize="13" fontFamily="monospace" letterSpacing="4">
            MALPE FORESHORE · 13°21′02″ N · 74°42′08″ E
          </text>
        </svg>

        {/* Top Chapter Header & Postal Marks (High-Contrast Protective Plaque) */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#FAF7F0]/95 backdrop-blur-sm p-4 rounded-sm border border-[#00A896]/30 shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span className="inline-block px-3 py-0.5 bg-[#0F223D] text-[#FAF7F0] rounded-[1px] font-mono text-[9.5px] uppercase tracking-[0.25em]">
                PAGE 01 · BEACHHEAD ARRIVAL
              </span>
              <span className="font-mono text-xs text-[#DC2626] tracking-widest font-bold">
                11:30 AM · HIGH SUN
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#0F223D] tracking-tight font-normal">
              The Journey Starts Here.
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <PostalCancellationStamp city="MALPE FORESHORE" date="14 AUG 2026" code="EXP-01" color="coral" rotation={-6} />
            <BotanicalIllustration type="palmFrond" size={70} rotation={22} color="#15803D" opacity={0.75} />
          </div>
        </div>

        {/* Collage Content Grid */}
        <div className="relative z-30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Hero Photo Mounted onto Radiant Turquoise & Coral Backing Card */}
          <div className="lg:col-span-7 space-y-6 relative">
            <div className="absolute -top-4 right-8 z-35">
              <WaxSeal text="CORAL EXPEDITION" subtext="MALPE 2026" color="coral" size={58} rotation={-4} />
            </div>

            {/* Custom Multi-Layered Hero Polaroid Mount */}
            <div className="relative p-3.5 bg-[#E0F2F1] rounded-sm shadow-2xl border-2 border-[#00A896] -rotate-1">
              <ScrollRevealWrapper animation="scaleUp" delay={0}>
                <ArchivalPhotoPrint
                  imageSrc="/images/malpe_beach_arrival_hero.jpg"
                  caption="Malpe Foreshore Arrival · High Sun"
                  subcaption="13°21′02″ N · 74°42′08″ E · Coastal Karnataka Arabian Sea"
                  annotation="STATION 01 · EXPEDITION HEAD"
                  plateNumber="PLATE I · FORESHORE"
                  size="hero"
                  tone="day"
                  hasBrassCorners={true}
                  priority={true}
                />
              </ScrollRevealWrapper>
            </div>

            {/* Collage Details: Boarding Pass + Leather Tag + Field Note */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <ScrollRevealWrapper animation="slideLeft" delay={140}>
                <LeatherLuggageTag
                  title="CORAL EXPEDITION"
                  code="MALPE FORESHORE"
                  subtext="CABIN PASSENGERS ONLY"
                  color="cognac"
                  rotation={-3}
                />
              </ScrollRevealWrapper>

              <ScrollRevealWrapper animation="fadeUp" delay={200}>
                <BoardingPassStub
                  passNumber="CR-2026-0814"
                  routeFrom="MALPE FORESHORE"
                  routeTo="ST. MARY'S ISLES"
                  departureTime="11:30 AM"
                  vesselName="CORAL CATAMARAN · 25.90M"
                  className="shadow-xl -rotate-2 scale-95"
                />
              </ScrollRevealWrapper>

              <ScrollRevealWrapper animation="dropIn" delay={260} className="flex-1 min-w-[260px]">
                <DeckledFieldNote
                  tag="DIRECTOR'S LOG"
                  text="START HERE. First light on the sand. Roasting spices from beach stalls, warm wind through high palms, and the private catamaran moored offshore."
                  subtext="FOLLOW THE EXPEDITION ROPE SEAWARD →"
                  tone="parchment"
                  rotation={2}
                />
              </ScrollRevealWrapper>
            </div>
          </div>

          {/* Right Column: Vellum Route Map + Guide Bird + Snapshots */}
          <div className="lg:col-span-5 space-y-6 relative lg:pt-2">
            <ScrollRevealWrapper animation="fadeUp" delay={120}>
              <ArchivalPhotoPrint
                imageSrc="/images/guide_bird_coastal_perched.jpg"
                caption="Brahminy Kite · Coastal Guide"
                subcaption="Perched on weathered teak post overlooking the bay"
                plateNumber="PLATE II · WILDLIFE"
                size="sm"
                tone="day"
                hasEyelet={true}
                rotation={6}
              />
            </ScrollRevealWrapper>

            <ScrollRevealWrapper animation="slideLeft" delay={180}>
              <VellumOverlayCard
                title="St. Mary's Archipelago Route"
                subtitle="Navigational soundings, 88M-year basalt bearings, and lighthouse triangulation."
                bearing="284° WNW"
                rotation={-3}
              >
                <div className="relative rounded-sm overflow-hidden border border-[#0A2540]/10 my-2">
                  <ArchivalPhotoPrint
                    imageSrc="/images/nautical_route_chart_scrap.jpg"
                    caption="Nautical Chart · St. Mary's Red Route"
                    subcaption="Depth soundings & lighthouse bearings"
                    plateNumber="CHART 01"
                    size="sm"
                    tone="day"
                  />
                </div>
              </VellumOverlayCard>
            </ScrollRevealWrapper>

            <div className="flex flex-wrap sm:flex-nowrap gap-4 items-start pt-2">
              <ScrollRevealWrapper animation="dropIn" delay={280}>
                <ArchivalPhotoPrint
                  imageSrc="/images/coral_arrival_pavilion.png"
                  caption="Foreshore Pavilion"
                  subcaption="Weathered teak & sailcloth canopy"
                  plateNumber="PLATE III"
                  size="sm"
                  tone="day"
                  rotation={-5}
                />
              </ScrollRevealWrapper>

              <ScrollRevealWrapper animation="slideRight" delay={340} className="-ml-2 sm:-ml-4 mt-4 sm:mt-0">
                <ArchivalPhotoPrint
                  imageSrc="/images/coral_beach_promenade.png"
                  caption="Laterite Palm Trail"
                  subcaption="High palms & salt breeze"
                  plateNumber="PLATE IV"
                  size="sm"
                  tone="day"
                  rotation={7}
                />
              </ScrollRevealWrapper>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <SpecimenDiagram type="shellSpiral" size={54} rotation={-10} />
              <BlindEmbossedBadge
                label="CORAL ADVENTURES"
                sublabel="EXPEDITION ARCHIVE"
                year="EST. 2026"
                rotation={-2}
              />
              <MotherOfPearlMarker size={28} />
              <HandwrittenAnnotation text="landfall here →" arrowDirection="right" rotation={-2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SPREAD 02: INSHORE WATERSPORTS (Seafoam, Cyan & Ocean Gold)
// ============================================================================
export function Spread02Watersports() {
  return (
    <section className="relative w-full">
      <div className="relative w-full rounded-tl-[40px] rounded-br-[44px] bg-[#FAF7F0] border-2 border-[#B2EBF2] p-6 sm:p-10 shadow-[0_25px_65px_rgba(0,119,182,0.18)] overflow-hidden">
        
        {/* Large Marine Blue Wave Pattern Sheet (Right Side ~40% of spread) */}
        <div className="absolute -top-10 -right-10 w-[60%] h-[85%] pointer-events-none">
          <PatternedPaperSheet
            variant="sandPolkaDot"
            shape="wavy"
            tabLabel="WATER"
            tabColor="cyan"
            rotation={-1}
            className="w-full h-full"
          />
        </div>

        {/* Sand Polka Dot Cutout Paper Strip (Bottom Left) */}
        <div className="absolute -bottom-6 -left-6 w-[45%] h-[40%] pointer-events-none">
          <PatternedPaperSheet
            variant="coralPolkaDot"
            shape="scalloped"
            rotation={2}
            className="w-full h-full"
          />
        </div>

        {/* Bleed Sheet from Arrival: Sand/Turquoise Strip (Top Left) */}
        <div className="absolute -top-6 -left-6 w-[35%] h-[30%] bg-[#E0F2F1] border border-[#00A896]/30 shadow-sm transform-gpu rotate-2 pointer-events-none opacity-85" />

        {/* Canvas Fabric Swatch */}
        <div className="absolute top-8 left-12 z-10">
          <FabricSwatch material="canvas" rotation={4} />
        </div>

        {/* Header (High-Contrast Protective Plaque) */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#FAF7F0]/95 backdrop-blur-sm p-4 rounded-sm border border-[#00B4D8]/30 shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span className="inline-block px-3 py-0.5 bg-[#FFB703] text-[#03045E] rounded-[1px] font-mono text-[9.5px] uppercase tracking-[0.25em] font-bold">
                PAGE 02 · ACTIVE SURF ZONE
              </span>
              <span className="font-mono text-xs text-[#0077B6] tracking-widest font-semibold">
                12:45 PM · 24 KNOTS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#03045E] tracking-tight font-normal">
              The Water Gets Louder.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <PostalCancellationStamp city="MALPE SURF ZONE" date="14 AUG 2026" code="SPD-24KT" color="teal" rotation={6} />
            <SpecimenDiagram type="waveVector" size={56} rotation={0} />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6 relative lg:order-1">
            <ScrollRevealWrapper animation="fadeUp" delay={120}>
              <ArchivalPhotoPrint
                imageSrc="/images/wave_foam_crest.jpg"
                caption="Bow Wake Spray in Shallows"
                subcaption="Five-harmonic Gerstner wave displacement through cyan water"
                plateNumber="PLATE V · HYDRODYNAMICS"
                size="md"
                tone="day"
                rotation={-6}
              />
            </ScrollRevealWrapper>

            <div className="flex flex-wrap sm:flex-nowrap gap-4 items-start pt-2">
              <ScrollRevealWrapper animation="slideLeft" delay={180}>
                <ArchivalPhotoPrint
                  imageSrc="/images/aerial_wave_foam.jpg"
                  caption="Sandbar Surf Swash"
                  subcaption="Tidal surge boundary"
                  plateNumber="PLATE VI"
                  size="sm"
                  tone="day"
                  rotation={8}
                />
              </ScrollRevealWrapper>

              <ScrollRevealWrapper animation="dropIn" delay={260} className="-ml-2 sm:-ml-4 mt-4 sm:mt-0">
                <ArchivalPhotoPrint
                  imageSrc="/images/coral_marine_activities.png"
                  caption="Equipment Staging"
                  subcaption="Kayaks & life vests"
                  plateNumber="PLATE VII"
                  size="sm"
                  tone="day"
                  rotation={-5}
                />
              </ScrollRevealWrapper>
            </div>

            <ScrollRevealWrapper animation="fadeUp" delay={300}>
              <DeckledFieldNote
                tag="SURF OBSERVATION"
                text="THE WATER GETS LOUDER. 24 knots through turquoise shallows. The guide bird slices across the spray. Yellow kayaks cut through gentle swells toward the open sea."
                subtext="LEAVING THE SHALLOWS BEHIND →"
                tone="cream"
                rotation={-2}
              />
            </ScrollRevealWrapper>

            <div className="flex items-center gap-3 pt-2">
              <ActivityWristband color="cyan" code="ACT-24KT" label="MALPE SURF PASS" rotation={-4} />
              <BuoyTag rotation={10} />
              <CoiledRope rotation={-14} />
              <HandwrittenAnnotation text="spray velocity 24kt" arrowDirection="down-left" rotation={2} />
            </div>
          </div>

          {/* Right Column: Hero Watersports Print */}
          <div className="lg:col-span-7 space-y-6 relative lg:order-2">
            <div className="absolute -top-4 left-8 z-35">
              <WaxSeal text="ACTIVE ZONE" subtext="24 KNOTS" color="amber" size={56} rotation={6} />
            </div>

            <div className="relative p-3.5 bg-[#E0F7FA] rounded-sm shadow-2xl border-2 border-[#00B4D8] rotate-1">
              <ScrollRevealWrapper animation="slideRight" delay={0}>
                <ArchivalPhotoPrint
                  imageSrc="/images/malpe_watersports_hero.jpg"
                  caption="High-Spray Jet Skis, Parasailing & Kayaks"
                  subcaption="Turquoise shallows · Inshore surf zone · Active momentum"
                  annotation="ACTIVE ZONE · 24 KNOTS"
                  plateNumber="PLATE VIII · WATERSPORTS"
                  size="hero"
                  tone="day"
                  hasBrassCorners={true}
                  className="lg:ml-auto"
                />
              </ScrollRevealWrapper>
            </div>

            <div className="flex items-center gap-4 justify-end pt-2">
              <LifeJacketStrap rotation={-8} />
              <SeaGlass color="turquoise" rotation={12} />
              <LeatherLuggageTag
                title="SAFETY BRIEFING"
                code="INSHORE 24KT"
                subtext="CERTIFIED SKIPPER"
                color="navy"
                rotation={4}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SPREAD 03: CATAMARAN (Deep Navy Blueprint & Aged Teak Joinery)
// ============================================================================
export function Spread03Catamaran() {
  return (
    <section className="relative w-full">
      <div className="relative w-full rounded-[2px] bg-[#FAF7F0] border-2 border-[#457B9D] p-6 sm:p-10 shadow-[0_25px_65px_rgba(29,53,87,0.2)] overflow-hidden">
        
        {/* Large Nautical Graticule Drafting Paper Block (Left Side) */}
        <div className="absolute -top-8 -left-8 w-[65%] h-[90%] pointer-events-none">
          <PatternedPaperSheet
            variant="nauticalGraticule"
            shape="postage"
            tabLabel="VESSEL"
            tabColor="navy"
            rotation={1}
            className="w-full h-full"
          />
        </div>

        {/* Teak Brown Wood-Grain Paper Swatch (Bottom Right) */}
        <div className="absolute -bottom-6 -right-6 w-[45%] h-[40%] bg-[#5E2B08] border border-[#E9C46A] shadow-lg transform-gpu -rotate-2 pointer-events-none opacity-90" />

        {/* Navy Cloth Swatch */}
        <div className="absolute top-8 right-12 z-10">
          <FabricSwatch material="navyCloth" rotation={-2} />
        </div>

        {/* Header (High-Contrast Protective Navy Plaque) */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#0F223D]/95 backdrop-blur-sm p-5 rounded-sm border-2 border-[#E9C46A] shadow-xl">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span className="inline-block px-3 py-0.5 bg-[#E9C46A] text-[#0F223D] rounded-[1px] font-mono text-[9.5px] uppercase tracking-[0.25em] font-bold">
                PAGE 03 · VESSEL REVEAL
              </span>
              <span className="font-mono text-xs text-[#E9C46A] tracking-widest font-semibold">
                02:15 PM · 700M OFFSHORE
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF7F0] tracking-tight font-semibold">
              The Boat Changes the Scale.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <PostalCancellationStamp city="OFFSHORE MOORING" date="14 AUG 2026" code="FLAGSHIP-25M" color="navy" rotation={-5} />
            <SpecimenDiagram type="compassRose" size={60} rotation={15} />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Hero Catamaran */}
          <div className="lg:col-span-7 space-y-6 relative">
            <div className="absolute -top-4 right-8 z-35">
              <WaxSeal text="FLAGSHIP CAT" subtext="25.90 METERS" color="crimson" size={58} rotation={-5} />
            </div>

            <div className="relative p-3.5 bg-[#0F223D] rounded-sm shadow-2xl border-2 border-[#E9C46A] -rotate-1">
              <ScrollRevealWrapper animation="rotateIn" delay={0}>
                <ArchivalPhotoPrint
                  imageSrc="/images/coral_catamaran_flagship_hero.jpg"
                  caption="Flagship 25.90M Commercial Expedition Catamaran"
                  subcaption="Twin wave-piercing demi-hulls · Three decks · Arabian Sea scale"
                  annotation="FLAGSHIP 25.90M"
                  plateNumber="PLATE IX · VESSEL ARCHITECTURE"
                  size="hero"
                  tone="day"
                  hasBrassCorners={true}
                />
              </ScrollRevealWrapper>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <ScrollRevealWrapper animation="dropIn" delay={220} className="flex-1 min-w-[280px]">
                <DeckledFieldNote
                  tag="VESSEL LOG"
                  text="THERE SHE IS. Not a billionaire's yacht: an authentic commercial expedition ship built for the Arabian Sea. Three decks of open air, teak joinery, and ocean swells."
                  subtext="ALL ABOARD · WESTBOUND TRAJECTORY →"
                  tone="parchment"
                  rotation={-1.5}
                />
              </ScrollRevealWrapper>
              <LeatherLuggageTag
                title="VESSEL REGISTRY"
                code="CORAL FLAGSHIP"
                subtext="LENGTH: 25.90M"
                color="tobacco"
                rotation={3}
              />
              <BrassCompass rotation={18} />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-6 relative lg:pt-2">
            <ScrollRevealWrapper animation="fadeUp" delay={120}>
              <VellumOverlayCard
                title="Three-Deck Arrangement Blueprint"
                subtitle="Upper Social Lounge · Middle Enclosed Salon · Lower Submersible Platform."
                bearing="FLAGSHIP DRAFTING"
                rotation={4}
              >
                <div className="relative rounded-sm overflow-hidden border border-[#0A2540]/10 my-2">
                  <ArchivalPhotoPrint
                    imageSrc="/images/catamaran_deck_plans_sketch.jpg"
                    caption="Arrangement Blueprint"
                    subcaption="General arrangement field sketch"
                    plateNumber="PLAN 01"
                    size="sm"
                    tone="day"
                  />
                </div>
              </VellumOverlayCard>
            </ScrollRevealWrapper>

            <div className="flex flex-wrap sm:flex-nowrap gap-4 items-start pt-2">
              <ScrollRevealWrapper animation="slideRight" delay={200}>
                <ArchivalPhotoPrint
                  imageSrc="/images/vessel_yacht.jpg"
                  caption="Upper Observation Deck"
                  subcaption="360° terrace · Teak joinery"
                  plateNumber="PLATE X"
                  size="sm"
                  tone="day"
                  rotation={-6}
                />
              </ScrollRevealWrapper>

              <ScrollRevealWrapper animation="dropIn" delay={260} className="-ml-2 sm:-ml-4 mt-4 sm:mt-0">
                <ArchivalPhotoPrint
                  imageSrc="/images/malpe_basalt_yacht.jpg"
                  caption="Submersible Platform"
                  subcaption="Moored 700m offshore"
                  plateNumber="PLATE XI"
                  size="sm"
                  tone="day"
                  rotation={7}
                />
              </ScrollRevealWrapper>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <BlindEmbossedBadge
                label="LLOYD'S REGISTER"
                sublabel="EXPEDITION CERTIFIED"
                year="REG. 2026"
                rotation={-2}
              />
              <ActivityWristband color="amber" code="CAT-25.90M" label="FLAGSHIP MANIFEST" rotation={4} />
              <HandwrittenAnnotation text="300 passenger capacity" arrowDirection="up-left" rotation={-3} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SPREAD 04: ONBOARD LIFE & KARAVALI GASTRONOMY (Saffron Gold & Rich Cinnamon)
// ============================================================================
export function Spread04Onboard() {
  return (
    <section className="relative w-full">
      <div className="relative w-full rounded-[2px] bg-[#FAF7F0] border-2 border-[#D35400] p-6 sm:p-10 shadow-[0_25px_65px_rgba(211,84,0,0.18)] overflow-hidden">
        
        {/* Large Saffron Amber Polka-Dot Paper Block (Bottom Left) */}
        <div className="absolute -bottom-8 -left-8 w-[60%] h-[70%] pointer-events-none">
          <PatternedPaperSheet
            variant="coralPolkaDot"
            shape="scalloped"
            tabLabel="ONBOARD"
            tabColor="turmeric"
            rotation={-2}
            className="w-full h-full"
          />
        </div>

        {/* Botanical Foliage Paper Card (Top Right) */}
        <div className="absolute -top-6 -right-6 w-[45%] h-[45%] pointer-events-none">
          <PatternedPaperSheet
            variant="coastalBotanical"
            shape="foldedCorner"
            rotation={2}
            className="w-full h-full"
          />
        </div>

        {/* Coffee / Spritz Ring Stains */}
        <div className="absolute top-16 right-20 w-36 h-36 rounded-full border-4 border-[#D35400]/25 pointer-events-none" />

        {/* Header (High-Contrast Protective Plaque) */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#FAF7F0]/95 backdrop-blur-sm p-4 rounded-sm border border-[#D35400]/30 shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span className="inline-block px-3 py-0.5 bg-[#D35400] text-white rounded-[1px] font-mono text-[9.5px] uppercase tracking-[0.25em] font-bold">
                PAGE 04 · ONBOARD SOCIAL DECK
              </span>
              <span className="font-mono text-xs text-[#B91C1C] tracking-widest font-semibold">
                04:00 PM · UPPER TEAK DECK
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1E293B] tracking-tight font-normal">
              Stay a Little Longer.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <PostalCancellationStamp city="KARAVALI GRILL" date="14 AUG 2026" code="CHEF-SELECT" color="sepia" rotation={-4} />
            <BotanicalIllustration type="coastalFlower" size={60} rotation={12} color="#D35400" opacity={0.75} />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Recipe Card */}
          <div className="lg:col-span-5 space-y-6 relative lg:order-1">
            <ScrollRevealWrapper animation="fadeUp" delay={120}>
              <ArchivalPhotoPrint
                imageSrc="/images/recipe_karavali_seafood_note.jpg"
                caption="Chef's Karavali Recipe · Sear Fish Rava Fry"
                subcaption="Kokum marinade · Turmeric spice crust · Fresh curry leaves"
                plateNumber="RECIPE CARD 01"
                size="md"
                tone="sunset"
                hasBrassCorners={true}
                rotation={-5}
              />
            </ScrollRevealWrapper>

            <div className="flex flex-wrap sm:flex-nowrap gap-4 items-start pt-2">
              <ScrollRevealWrapper animation="slideLeft" delay={200}>
                <ArchivalPhotoPrint
                  imageSrc="/images/curated_dining.jpg"
                  caption="Live Fresh Catch Grill"
                  subcaption="Sear fish & butter garlic prawns"
                  plateNumber="PLATE XII"
                  size="sm"
                  tone="sunset"
                  rotation={7}
                />
              </ScrollRevealWrapper>

              <ScrollRevealWrapper animation="dropIn" delay={260} className="-ml-2 sm:-ml-4 mt-4 sm:mt-0">
                <ArchivalPhotoPrint
                  imageSrc="/images/dining_deck.jpg"
                  caption="Candlelit Social Dining"
                  subcaption="Open horizon evening tables"
                  plateNumber="PLATE XIII"
                  size="sm"
                  tone="sunset"
                  rotation={-5}
                />
              </ScrollRevealWrapper>
            </div>

            <ScrollRevealWrapper animation="fadeUp" delay={300}>
              <DeckledFieldNote
                tag="KARAVALI GASTRONOMY"
                text="STAY A LITTLE LONGER. Food. Music. Sea. Butter-garlic prawns, sear fish rava fry, tender coconut coolers. Acoustic music mixes with warm wind."
                subtext="APPROACHING ST. MARY'S ARCHIPELAGO →"
                tone="amber"
                rotation={2}
              />
            </ScrollRevealWrapper>

            <div className="flex items-center gap-3 pt-2">
              <DrinkCoaster rotation={8} />
              <ActivityWristband color="orange" code="DJ-SUNSET" label="UPPER DECK PASS" rotation={-5} />
              <HandwrittenAnnotation text="kokum & roasted spices" arrowDirection="right" rotation={-3} />
            </div>
          </div>

          {/* Right Column: Hero Social Deck */}
          <div className="lg:col-span-7 space-y-6 relative lg:order-2">
            <div className="absolute -top-4 left-8 z-35">
              <WaxSeal text="ONBOARD LIFE" subtext="UPPER TEAK" color="crimson" size={56} rotation={4} />
            </div>

            <div className="relative p-3.5 bg-[#FFF3E0] rounded-sm shadow-2xl border-2 border-[#F39C12] rotate-1">
              <ScrollRevealWrapper animation="slideLeft" delay={0}>
                <ArchivalPhotoPrint
                  imageSrc="/images/catamaran_onboard_life_hero.jpg"
                  caption="Upper Teak Deck · Live Karavali Grill & Music"
                  subcaption="Fresh sear fish rava fry, drinks, DJ & perched Brahminy kite"
                  annotation="ONBOARD SOCIAL DECK"
                  plateNumber="PLATE XIV · SOCIAL ATELIER"
                  size="hero"
                  tone="sunset"
                  hasBrassCorners={true}
                  className="lg:ml-auto"
                />
              </ScrollRevealWrapper>
            </div>

            <div className="flex items-center gap-4 justify-end pt-2">
              <BlindEmbossedBadge
                label="KARAVALI KITCHEN"
                sublabel="ARTISANAL COASTAL CUISINE"
                year="HARVEST 2026"
                rotation={2}
              />
              <MotherOfPearlMarker size={28} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SPREAD 05: BASALT ISLAND SANCTUARY (Lighter Vibrant Greens + Jade + Basalt Hexagons)
// ============================================================================
export function Spread05Basalt() {
  return (
    <section className="relative w-full">
      <div className="relative w-full rounded-[2px] bg-[#FAF7F0] border-2 border-[#52B788] p-6 sm:p-10 shadow-[0_25px_65px_rgba(27,67,50,0.2)] overflow-hidden">
        
        {/* Large Pistachio Light Green Botanical Pattern Sheet (Right Side ~40% of spread) */}
        <div className="absolute -top-10 -right-10 w-[65%] h-[85%] pointer-events-none">
          <PatternedPaperSheet
            variant="pistachioBotanical"
            shape="wavy"
            tabLabel="ISLAND"
            tabColor="sage"
            rotation={-1}
            className="w-full h-full"
          />
        </div>

        {/* Lighter Emerald Gingham Cutout Paper Strip (Bottom Left) */}
        <div className="absolute -bottom-6 -left-6 w-[45%] h-[40%] pointer-events-none">
          <PatternedPaperSheet
            variant="emeraldGingham"
            shape="scalloped"
            rotation={2}
            className="w-full h-full"
          />
        </div>

        {/* Luminous Sage Hexagonal Pattern Scrap (Top Left) */}
        <div className="absolute -top-6 -left-6 w-[35%] h-[30%] pointer-events-none">
          <PatternedPaperSheet
            variant="sageHexagons"
            shape="postage"
            rotation={-3}
            className="w-full h-full"
          />
        </div>

        {/* Header (High-Contrast Protective Plaque) */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#FAF7F0]/95 backdrop-blur-sm p-4 rounded-sm border border-[#52B788]/40 shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span className="inline-block px-3 py-0.5 bg-[#1B4332] text-[#D8F3DC] rounded-[1px] font-mono text-[9.5px] uppercase tracking-[0.25em] font-bold">
                PAGE 05 · GEOLOGICAL MONUMENT
              </span>
              <span className="font-mono text-xs text-[#2D6A4F] tracking-widest font-semibold">
                05:15 PM · 88 MILLION YEARS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#081C15] tracking-tight font-semibold">
              Leave the Noise Behind.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <PostalCancellationStamp city="ST. MARY'S ISLES" date="14 AUG 2026" code="BASALT-88M" color="green" rotation={-8} />
            <SpecimenDiagram type="basaltCrystal" size={56} rotation={10} />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Hero Basalt Mounted on Lighter Jade & Mint Paper */}
          <div className="lg:col-span-7 space-y-6 relative">
            <div className="absolute -top-4 right-8 z-35">
              <WaxSeal text="GEOLOGICAL" subtext="88M YEARS" color="navy" size={58} rotation={-6} />
            </div>

            <div className="relative p-3.5 bg-[#D8F3DC] rounded-sm shadow-2xl border-2 border-[#52B788] -rotate-1">
              <ScrollRevealWrapper animation="dropIn" delay={0}>
                <ArchivalPhotoPrint
                  imageSrc="/images/st_marys_basalt_island_hero.jpg"
                  caption="St. Mary's 6-Sided Hexagonal Columnar Basalt"
                  subcaption="88 million years old · Geological monument · Distant Catamaran"
                  annotation="GEOLOGICAL MONUMENT"
                  plateNumber="PLATE XV · VOLCANIC FORMATION"
                  size="hero"
                  tone="sunset"
                  hasBrassCorners={true}
                />
              </ScrollRevealWrapper>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <ScrollRevealWrapper animation="fadeUp" delay={220} className="flex-1 min-w-[280px]">
                <DeckledFieldNote
                  tag="GEOLOGICAL RECORD"
                  text="LEAVE THE NOISE BEHIND. Follow the rocks. Six-sided dark pillars formed when Madagascar tore away from India 88 million years ago. Quiet cathedral of stone."
                  subtext="THE SUN TOUCHES THE HORIZON →"
                  tone="parchment"
                  rotation={-2}
                />
              </ScrollRevealWrapper>
              <BuoyTag rotation={-8} />
              <SeaGlass color="white" rotation={30} />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-6 relative lg:pt-2">
            <ScrollRevealWrapper animation="fadeUp" delay={120}>
              <VellumOverlayCard
                title="Geological Survey of India · Record 88M"
                subtitle="Sub-aerial volcanic columnar jointing. Deccan Volcanic Province rifting sequence."
                bearing="MONUMENT 01"
                rotation={3}
              >
                <div className="relative rounded-sm overflow-hidden border border-[#52B788]/30 my-2">
                  <ArchivalPhotoPrint
                    imageSrc="/images/coral_jetty_pier.png"
                    caption="Volcanic Stepping-Stone Paths"
                    subcaption="Crystal turquoise lagoon boundary"
                    plateNumber="PLATE XVI"
                    size="sm"
                    tone="sunset"
                  />
                </div>
              </VellumOverlayCard>
            </ScrollRevealWrapper>

            <div className="flex flex-wrap sm:flex-nowrap gap-4 items-start pt-2">
              <ScrollRevealWrapper animation="slideRight" delay={200}>
                <ArchivalPhotoPrint
                  imageSrc="/images/shoreline_foam.jpg"
                  caption="Tidal Rock Pools"
                  subcaption="Basalt fissure surge pools"
                  plateNumber="PLATE XVII"
                  size="sm"
                  tone="sunset"
                  rotation={-8}
                />
              </ScrollRevealWrapper>

              <ScrollRevealWrapper animation="slideLeft" delay={260} className="-ml-2 sm:-ml-4 mt-4 sm:mt-0">
                <ArchivalPhotoPrint
                  imageSrc="/images/malpe_coast.jpg"
                  caption="Hexagonal Pillar Geometry"
                  subcaption="Ancient basalt columns"
                  plateNumber="PLATE XVIII"
                  size="sm"
                  tone="sunset"
                  rotation={6}
                />
              </ScrollRevealWrapper>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <BlindEmbossedBadge
                label="GEOLOGICAL HERITAGE"
                sublabel="NATURAL MONUMENT ARCHIVE"
                year="88,000,000 BCE"
                rotation={-2}
              />
              <HandwrittenAnnotation text="columnar jointing" arrowDirection="up-right" rotation={2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SPREAD 06: SUNSET PAUSE (Radiant Sunset Gold & Crimson Horizon)
// ============================================================================
export function Spread06Sunset() {
  return (
    <section className="relative w-full">
      <div className="relative w-full rounded-tl-[40px] rounded-br-[40px] bg-[#FAF7F0] border-2 border-[#F77F00] p-6 sm:p-10 shadow-[0_25px_65px_rgba(193,18,31,0.2)] overflow-hidden">
        
        {/* Large Semicircular Solar Arc Cutout Paper Block */}
        <div className="absolute -top-8 -left-8 w-[60%] h-[80%] pointer-events-none">
          <PatternedPaperSheet
            variant="radiantSunsetSunburst"
            shape="scalloped"
            tabLabel="SUNSET"
            tabColor="terracotta"
            rotation={1}
            className="w-full h-full"
          />
        </div>

        {/* Concentric Solar Arcs */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.25]"
          viewBox="0 0 1000 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="#F77F00" strokeWidth="2">
            <circle cx="500" cy="500" r="160" strokeDasharray="4 3" />
            <circle cx="500" cy="500" r="300" strokeDasharray="8 4" />
            <line x1="500" y1="500" x2="100" y2="200" strokeWidth="2.5" />
          </g>
          <text x="40" y="760" fill="#F77F00" fontSize="13" fontFamily="monospace" letterSpacing="4">
            WESTBOUND SUNSET PAUSE · BEARING 284° WNW
          </text>
        </svg>

        {/* Header (High-Contrast Protective Plaque) */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#FAF7F0]/95 backdrop-blur-sm p-4 rounded-sm border border-[#F77F00]/40 shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span className="inline-block px-3 py-0.5 bg-[#D62828] text-white rounded-[1px] font-mono text-[9.5px] uppercase tracking-[0.25em] font-bold">
                PAGE 06 · GOLDEN HOUR
              </span>
              <span className="font-mono text-xs text-[#F77F00] tracking-widest font-semibold">
                06:30 PM · 284° WNW
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1E293B] tracking-tight font-normal">
              Chase the Light.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <PostalCancellationStamp city="WESTERN HORIZON" date="14 AUG 2026" code="AZI-284" color="coral" rotation={4} />
            <SpecimenDiagram type="compassRose" size={56} rotation={-45} />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6 relative lg:order-1">
            <ScrollRevealWrapper animation="fadeUp" delay={120}>
              <ArchivalPhotoPrint
                imageSrc="/images/golden_hour.jpg"
                caption="Liquid Gold Ocean Swells"
                subcaption="Deep swell specular highlights at 284° sunset bearing"
                plateNumber="PLATE XIX · GOLDEN HOUR"
                size="md"
                tone="sunset"
                rotation={-5}
              />
            </ScrollRevealWrapper>

            <div className="flex flex-wrap sm:flex-nowrap gap-4 items-start pt-2">
              <ScrollRevealWrapper animation="slideLeft" delay={200}>
                <ArchivalPhotoPrint
                  imageSrc="/images/sunset_catamaran.jpg"
                  caption="Westbound Catamaran"
                  subcaption="Silhouetted vessel in sunset path"
                  plateNumber="PLATE XX"
                  size="sm"
                  tone="sunset"
                  rotation={7}
                />
              </ScrollRevealWrapper>

              <ScrollRevealWrapper animation="dropIn" delay={260} className="-ml-2 sm:-ml-4 mt-4 sm:mt-0">
                <ArchivalPhotoPrint
                  imageSrc="/images/coral_golden_hour_deck.png"
                  caption="Observation Deck at Dusk"
                  subcaption="Silhouetted kite in evening light"
                  plateNumber="PLATE XXI"
                  size="sm"
                  tone="sunset"
                  rotation={-6}
                />
              </ScrollRevealWrapper>
            </div>

            <ScrollRevealWrapper animation="fadeUp" delay={300}>
              <DeckledFieldNote
                tag="MOMENT OF STILLNESS"
                text="CHASE THE LIGHT. 284° WNW · 17:30. The bird stands in dark silhouette on the cliff. The ocean turns to molten gold. The world goes quiet."
                subtext="LIGHT COLLAPSES INTO NIGHT →"
                tone="amber"
                rotation={2.5}
              />
            </ScrollRevealWrapper>

            <div className="flex items-center gap-3 pt-2">
              <LeatherLuggageTag
                title="BEARING 284°"
                code="GOLDEN HOUR"
                subtext="ARABIAN SUNSET"
                color="cognac"
                rotation={-4}
              />
              <HandwrittenAnnotation text="world goes quiet..." arrowDirection="down-right" rotation={-3} />
            </div>
          </div>

          {/* Right Column: Hero Sunset */}
          <div className="lg:col-span-7 space-y-6 relative lg:order-2">
            <div className="absolute -top-4 left-8 z-35">
              <WaxSeal text="GOLDEN HOUR" subtext="284° WNW" color="amber" size={56} rotation={-4} />
            </div>

            <div className="relative p-3.5 bg-[#FFF3E0] rounded-sm shadow-2xl border-2 border-[#D62828] rotate-1">
              <ScrollRevealWrapper animation="flipIn" delay={0}>
                <ArchivalPhotoPrint
                  imageSrc="/images/st_marys_sunset_horizon_hero.jpg"
                  caption="Westbound Arabian Sea Sunset over Basalt Island"
                  subcaption="284° WNW · Molten gold horizon · Silhouetted Brahminy Kite"
                  annotation="GOLDEN HOUR · 284°"
                  plateNumber="PLATE XXII · HORIZON"
                  size="hero"
                  tone="sunset"
                  hasBrassCorners={true}
                  className="lg:ml-auto"
                />
              </ScrollRevealWrapper>
            </div>

            <div className="flex items-center gap-4 justify-end pt-2">
              <BlindEmbossedBadge
                label="WESTBOUND HORIZON"
                sublabel="SOLAR BEARINGS 284°"
                year="18:30 IST"
                rotation={1}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SPREAD 07: NIGHT EXPLORATION (Deep Sapphire & Luminous Cyan Nocturne)
// ============================================================================
export function Spread07Night() {
  return (
    <section className="relative w-full">
      <div className="relative w-full rounded-[2px] bg-[#FAF7F0] border-2 border-[#0077B6] p-6 sm:p-10 shadow-[0_25px_65px_rgba(11,19,43,0.3)] overflow-hidden">
        
        {/* Large Celestial Star Chart Pattern Paper */}
        <div className="absolute -top-8 -left-8 w-[60%] h-[85%] pointer-events-none">
          <PatternedPaperSheet
            variant="celestialStars"
            shape="postage"
            tabLabel="NIGHT"
            tabColor="cyan"
            rotation={-1}
            className="w-full h-full"
          />
        </div>

        {/* Header (High-Contrast Protective Obsidian Plaque) */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#0B132B]/95 backdrop-blur-sm p-5 rounded-sm border-2 border-[#00B4D8]/50 shadow-2xl">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span className="inline-block px-3 py-0.5 bg-[#0077B6] text-[#FFFFFF] rounded-[1px] font-mono text-[9.5px] uppercase tracking-[0.25em] font-bold border border-[#00F5D4]/40">
                PAGE 07 · AFTER DARK
              </span>
              <span className="font-mono text-xs text-[#00F5D4] tracking-widest font-bold">
                08:45 PM · SAPPHIRE SEA
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#FFFFFF] tracking-tight font-semibold">
              No Road Ahead. Just Horizon.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <PostalCancellationStamp city="ST. MARY'S NIGHT" date="14 AUG 2026" code="NIT-BEACON" color="navy" rotation={6} />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Hero Moonlit Basalt */}
          <div className="lg:col-span-7 space-y-6 relative">
            <div className="absolute -top-4 right-8 z-35">
              <WaxSeal text="AFTER DARK" subtext="SAPPHIRE SEA" color="navy" size={58} rotation={6} />
            </div>

            <div className="relative p-3.5 bg-[#0B132B] rounded-sm shadow-2xl border-2 border-[#00F5D4] -rotate-1">
              <ScrollRevealWrapper animation="scaleUp" delay={0}>
                <ArchivalPhotoPrint
                  imageSrc="/images/st_marys_night_sapphire_hero.jpg"
                  caption="Moonlit Basalt · Midnight Sapphire Arabian Sea"
                  subcaption="Milky Way starlight · Lantern pathway · St. Mary's night"
                  annotation="NIGHT EXPEDITION"
                  plateNumber="PLATE XXIII · NOCTURNE"
                  size="hero"
                  tone="night"
                  hasBrassCorners={true}
                />
              </ScrollRevealWrapper>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <ScrollRevealWrapper animation="fadeUp" delay={220} className="flex-1 min-w-[280px]">
                <DeckledFieldNote
                  tag="NIGHT LOG"
                  text="AFTER DARK. NO ROAD AHEAD. JUST HORIZON. Silver moonlight on volcanic rock. Distant breaking waves. The guide bird glides through the dark canyon."
                  subtext="AND THEN THE SKY LIGHTS UP →"
                  tone="navy"
                  rotation={-2}
                />
              </ScrollRevealWrapper>
              <LeatherLuggageTag
                title="NOCTURNAL VOYAGE"
                code="ST. MARY'S NIGHT"
                subtext="BEACON ACTIVE"
                color="navy"
                rotation={-3}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-6 relative lg:pt-2">
            <ScrollRevealWrapper animation="fadeUp" delay={120}>
              <VellumOverlayCard
                title="Celestial Navigation Chart · St. Mary's"
                subtitle="Milky Way galactic core bearings. Orientation via Polaris and southern constellations."
                bearing="000° DUE NORTH"
                rotation={-3}
              >
                <div className="relative rounded-sm overflow-hidden border border-[#00B4D8]/40 my-2">
                  <ArchivalPhotoPrint
                    imageSrc="/images/sapphire_night_ocean.jpg"
                    caption="Starry Sea Surf & Celestial Sky"
                    subcaption="Silver reflections on black basalt"
                    plateNumber="PLATE XXIV"
                    size="sm"
                    tone="night"
                  />
                </div>
              </VellumOverlayCard>
            </ScrollRevealWrapper>

            <div className="flex flex-wrap sm:flex-nowrap gap-4 items-start pt-2">
              <ScrollRevealWrapper animation="slideRight" delay={200}>
                <ArchivalPhotoPrint
                  imageSrc="/images/night_sapphire.jpg"
                  caption="Moonlit Basalt Pillars"
                  subcaption="13°21′02″ N · Midnight sea"
                  plateNumber="PLATE XXV"
                  size="sm"
                  tone="night"
                  rotation={-7}
                />
              </ScrollRevealWrapper>

              <ScrollRevealWrapper animation="dropIn" delay={260} className="-ml-2 sm:-ml-4 mt-4 sm:mt-0">
                <ArchivalPhotoPrint
                  imageSrc="/images/nightfall_ocean.jpg"
                  caption="Last Light on Horizon"
                  subcaption="Distant navigation beacon"
                  plateNumber="PLATE XXVI"
                  size="sm"
                  tone="night"
                  rotation={6}
                />
              </ScrollRevealWrapper>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <BlindEmbossedBadge
                label="NOCTURNAL RECORD"
                sublabel="CELESTIAL ARCHIVE"
                year="20:45 IST"
                rotation={-1}
              />
              <HandwrittenAnnotation text="polaris 13° elevation" color="#0077B6" arrowDirection="right" rotation={2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SPREAD 08: DRONE FINALE (Electric Neon Turquoise & Cyber Climax)
// ============================================================================
export function Spread08DroneFinale() {
  return (
    <section className="relative w-full">
      <div className="relative w-full rounded-[2px] bg-[#FAF7F0] border-2 border-[#00F5D4] p-6 sm:p-10 shadow-[0_30px_70px_rgba(0,245,212,0.25)] overflow-hidden">
        
        {/* Large Drone Geometry Pattern Card */}
        <div className="absolute -top-8 -right-8 w-[65%] h-[85%] pointer-events-none">
          <PatternedPaperSheet
            variant="droneGeometry"
            shape="wavy"
            tabLabel="FINALE"
            tabColor="coral"
            rotation={1}
            className="w-full h-full"
          />
        </div>

        {/* Top Chapter Metadata (High-Contrast Protective Obsidian Plaque) */}
        <div className="relative z-20 text-center max-w-2xl mx-auto mb-8 bg-[#03071E]/95 backdrop-blur-sm p-6 sm:p-8 rounded-sm border-2 border-[#00F5D4]/50 shadow-2xl">
          <div className="inline-block px-4 py-1.5 bg-[#0F223D] border border-[#00F5D4] rounded-[1px] font-mono text-[10px] sm:text-xs text-[#00F5D4] uppercase tracking-[0.25em] mb-3 shadow-md font-bold">
            FINAL EXPEDITION SPREAD · CELESTIAL FINALE · 09:30 PM
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl text-[#FFFFFF] tracking-tight font-normal">
            The Night Belongs <br />
            <span className="italic text-[#00F5D4] font-semibold">to the Sea.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#E2E8F0] max-w-lg mx-auto mt-3 leading-relaxed">
            Three hundred synchronized lights rise above St. Mary's basalt island into the open night sky, forming glowing waves, nautical compass roses, and soaring kites.
          </p>
        </div>

        {/* Hero Finale Fine-Art Print */}
        <ScrollRevealWrapper animation="fadeUp" delay={0} className="relative z-30 max-w-3xl mx-auto">
          <div className="absolute -top-4 right-10 z-35">
            <WaxSeal text="FINALE" subtext="300 DRONES" color="crimson" size={62} rotation={-3} />
          </div>

          <div className="relative p-3.5 bg-[#03071E] rounded-sm shadow-2xl border-2 border-[#00F5D4]">
            <ArchivalPhotoPrint
              imageSrc="/images/drone_constellation_finale_hero.jpg"
              caption="300-Drone Constellation over St. Mary's Basalt"
              subcaption="Glowing wave, nautical compass rose & soaring Brahminy kite lights"
              annotation="THE CELESTIAL FINALE"
              plateNumber="PLATE XXVII · CLIMAX"
              size="hero"
              tone="night"
              hasBrassCorners={true}
              className="mx-auto"
            />
          </div>
        </ScrollRevealWrapper>

        {/* 3 Satellite Nocturne Prints Below Hero */}
        <div className="relative z-30 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto mt-8 items-start">
          <ScrollRevealWrapper animation="slideLeft" delay={120} className="flex justify-center">
            <ArchivalPhotoPrint
              imageSrc="/images/drone_sketch_formation.jpg"
              caption="Drone Formation Blueprint"
              subcaption="Compass rose & flight path sketch"
              plateNumber="SKETCH 01"
              size="sm"
              tone="night"
              rotation={-5}
            />
          </ScrollRevealWrapper>

          <ScrollRevealWrapper animation="fadeUp" delay={180} className="flex justify-center">
            <ArchivalPhotoPrint
              imageSrc="/images/hero_ocean.jpg"
              caption="Celestial Starlight"
              subcaption="Midnight Arabian Sea expanse"
              plateNumber="PLATE XXVIII"
              size="sm"
              tone="night"
              rotation={4}
            />
          </ScrollRevealWrapper>

          <ScrollRevealWrapper animation="slideRight" delay={240} className="flex justify-center">
            <ArchivalPhotoPrint
              imageSrc="/images/underwater_marine.jpg"
              caption="Bioluminescence Below"
              subcaption="Illuminated wave water reflection"
              plateNumber="PLATE XXIX"
              size="sm"
              tone="night"
              rotation={-6}
            />
          </ScrollRevealWrapper>
        </div>

        {/* Climax Note */}
        <div className="relative z-30 max-w-md mx-auto mt-8">
          <DeckledFieldNote
            tag="THE CLIMAX"
            text="AND THEN THE SKY LIGHTS UP. The bird rests on the basalt ledge below, witnessing the constellation. Expedition concluded."
            subtext="EXPEDITION ARCHIVE COMPLETED · MALPE ARCHIPELAGO"
            tone="navy"
            rotation={0}
            className="mx-auto"
          />
        </div>

        {/* Final Archival Seal & Navigation */}
        <div className="relative z-30 text-center pt-16 pb-10 max-w-xl mx-auto">
          <div className="inline-block mb-4">
            <BlindEmbossedBadge
              label="CORAL ADVENTURES"
              sublabel="EXPEDITION ARCHIVE COMPLETED"
              year="MALPE · 2026"
              rotation={0}
            />
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-[#1E293B] tracking-tight">
            The Journey Continues.
          </h3>
          <p className="font-mono text-xs text-[#DC2626] uppercase tracking-[0.25em] mt-1 font-bold">
            CORAL ADVENTURES · MALPE · ARABIAN SEA
          </p>
        </div>
      </div>
    </section>
  );
}
