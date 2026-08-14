"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { WAYPOINTS, VESSEL_SPECS } from "@/lib/expeditionData";

interface JourneyAct {
  id: string;
  actNumber: string;
  actTitle: string;
  headline: string;
  subline: string;
  description: string;
  image: string;
  tag: string;
  telemetry: string;
  interactiveOptions?: { name: string; desc: string; icon: string }[];
  specs?: { label: string; value: string }[];
}

const JOURNEY_ACTS: JourneyAct[] = [
  {
    id: "arrival",
    actNumber: "ACT 01",
    actTitle: "THE ARRIVAL",
    headline: "WELCOME TO THE CORAL WATERFRONT.",
    subline: "MALPE HARBOR EXPEDITION GATEWAY",
    description: "Step into our arrival plaza beneath palm-shaded pavilions. Receive your private expedition briefing, collect custom watersports gear, and prepare for departure into the Arabian Sea.",
    image: "/images/coral_arrival_pavilion.png",
    tag: "MALPE BEACH PAVILION · SHADED LOUNGE",
    telemetry: `13°21′02″ N · 74°42′08″ E · SEA TEMP 28°C`,
    interactiveOptions: [
      { name: "Welcome Pavilion", desc: "Private check-in & briefing lounge", icon: "🏛️" },
      { name: "Gear Lounge", desc: "Premium life jackets, masks & dive kits", icon: "🤿" },
      { name: "Waterfront Pier", desc: "Direct access to private tenders", icon: "⚓" },
    ]
  },
  {
    id: "beach",
    actNumber: "ACT 02",
    actTitle: "THE LIVING BEACH",
    headline: "THE COAST IS ONLY THE BEGINNING.",
    subline: "PALE SANDS, TROPICAL PALMS & OCEAN BREEZE",
    description: "Walk out along the Malpe boardwalk. Sunlit white sand stretches toward crystal turquoise shallows where the gentle surf meets the shore.",
    image: "/images/coral_beach_promenade.png",
    tag: "MALPE PROMENADE · LIVING WATERFRONT",
    telemetry: "WIND 8 KTS NW · TIDE +0.4M · SWELL 0.6M",
    interactiveOptions: [
      { name: "Boardwalk Walkway", desc: "Natural teak path connecting beach to jetty", icon: "🌴" },
      { name: "Shoreline Cabanas", desc: "Private shaded daybeds for expedition guests", icon: "⛱️" },
      { name: "Observation Deck", desc: "Panoramic vista of St. Mary's archipelago", icon: "🔭" },
    ]
  },
  {
    id: "watersports",
    actNumber: "ACT 03",
    actTitle: "ACTIVE MARINE REALM",
    headline: "ENGAGE THE OCEAN.",
    subline: "HIGH-VELOCITY WATERSPORTS & TRANQUIL SHALLOWS",
    description: "Carve the crystal turquoise surface. Select your watersports equipment—from high-power jet ski circuits and parasailing flights to tranquil guided sea kayak routes.",
    image: "/images/coral_marine_activities.png",
    tag: "TURQUOISE WATER ACTIVE ADVENTURE ZONE",
    telemetry: "DEPTH 4.5M · VISIBILITY 14M · CALM BASIN",
    interactiveOptions: [
      { name: "Jet Ski Touring", desc: "High-octane coastal exploration", icon: "⚡" },
      { name: "Sea Kayaking", desc: "Glide through basalt sea caves", icon: "🛶" },
      { name: "Parasailing Flight", desc: "300ft aerial panorama over the coast", icon: "🪂" },
      { name: "Stand-Up Paddle", desc: "Calm water balance & core touring", icon: "🏄" },
    ]
  },
  {
    id: "boarding",
    actNumber: "ACT 04",
    actTitle: "THE BOARDING",
    headline: "STEP ABOARD THE VESSEL.",
    subline: "25.90M ARCHITECTURAL TWIN-HULL CATAMARAN",
    description: "Walk down the expedition jetty as the crew welcomes you aboard. Experience 8.00 meters of beam stability designed for effortless high-seas cruising and open panoramic decks.",
    image: "/images/coral_jetty_pier.png",
    tag: "MALPE EXPEDITION JETTY · VESSEL DOCK",
    telemetry: "VESSEL CALLSIGN: CORAL-ONE · MALPE REGISTRY",
    specs: [
      { label: "OVERALL LENGTH", value: "25.90 M (85 FT)" },
      { label: "TWIN HULL BEAM", value: "8.00 M" },
      { label: "GUEST CAPACITY", value: "170 PASSENGERS" },
      { label: "DECK CONFIG", value: "SKY DECK · SHADED LOUNGE · TWIN SALONS" },
    ]
  },
  {
    id: "departure",
    actNumber: "ACT 05",
    actTitle: "LEAVING THE SHORE",
    headline: "INTO THE OPEN ARABIAN SEA.",
    subline: "THE SHORELINE RECEDES · HORIZON EXPANDS",
    description: "Twin hulls power forward with whisper-quiet stability. Look aft as Malpe's coconut groves shrink into the distance and the wide sapphire expanse unfolds.",
    image: "/images/vessel_catamaran.jpg",
    tag: "OPEN OCEAN PASSAGE · TWIN WAKE",
    telemetry: "SPEED 14.5 KTS · HEADING 285° W · OPEN SEA",
  },
  {
    id: "route",
    actNumber: "ACT 06",
    actTitle: "NAUTICAL EXPEDITION",
    headline: "ST. MARY'S VOLCANIC PILLARS.",
    subline: "88-MILLION-YEAR-OLD COLUMNAR BASALT",
    description: "Anchor off Coconut Island where ancient hexagonal lava pillars rise from the sea. A Geological Monument formed during the separation of India and Madagascar.",
    image: "/images/malpe_basalt_yacht.jpg",
    tag: "ST. MARY'S ISLANDS · VOLCANIC COVE",
    telemetry: "13°22′45″ N · 74°40′28″ E · GEO MONUMENT",
    specs: [
      { label: "COLUMNAR BASALT", value: "88M YRS OLD" },
      { label: "SHELTERED COVE", value: "SANDY BOTTOM" },
      { label: "WATER DEPTH", value: "12 METERS" },
      { label: "WATER CLARITY", value: "SAPPHIRE / EMERALD" },
    ]
  },
  {
    id: "underwater",
    actNumber: "ACT 07",
    actTitle: "SUB-SURFACE IMMERSION",
    headline: "ANOTHER WORLD BENEATH.",
    subline: "PRISTINE VOLCANIC REEFS & MARINE LIFE",
    description: "Descend into sunlit coral waters. Golden light pierces through crystalline shallows revealing colorful reef fish, sea anemones, and volcanic sea caves.",
    image: "/images/underwater_marine.jpg",
    tag: "VOLCANIC REEF SHELF · GUIDED SNORKEL",
    telemetry: "DEPTH 6-18M · REEF LIFE ACTIVE · TROPICAL WATER",
  },
  {
    id: "sunset_dinner",
    actNumber: "ACT 08",
    actTitle: "TWILIGHT TO MIDNIGHT",
    headline: "DINNER WITH NO WALLS.",
    subline: "CHASE THE LIGHT INTO SAPPHIRE STARLIGHT",
    description: "As the sun melts into liquid gold, savor fresh coastal delicacies on open teak decks. When night falls, stargaze beneath unfiltered constellations in the quiet Arabian Sea.",
    image: "/images/coral_golden_hour_deck.png",
    tag: "GOLDEN HOUR · TEAK DINING · MIDNIGHT STARS",
    telemetry: "19:30 - 22:30 · COASTAL GASTRONOMY & STARGAZING",
    interactiveOptions: [
      { name: "Sunset Cruise", desc: "Golden hour champagne & appetizers", icon: "🌅" },
      { name: "Coastal Dining", desc: "Fresh local daily harvest grilled on deck", icon: "🍷" },
      { name: "Midnight Stargazing", desc: "Acoustics & unpolluted night skies", icon: "✨" },
    ]
  }
];

export function ImmersiveJourneyTheater({ onClose }: { onClose: () => void }) {
  const [currentActIndex, setCurrentActIndex] = useState(0);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  const act = JOURNEY_ACTS[currentActIndex];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nextAct();
      if (e.key === "ArrowLeft") prevAct();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentActIndex]);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentActIndex((prev) => (prev + 1) % JOURNEY_ACTS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  // Ambient sound synthesizer via Web Audio API
  const toggleSound = () => {
    if (isPlayingSound) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsPlayingSound(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Generate gentle white noise simulating ocean surf
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = buffer;
        whiteNoise.loop = true;

        // Low-pass filter for deep water rumble
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, ctx.currentTime);

        // LFO for wave modulation
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // 8 second wave cycle
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(250, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.12, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(ctx.destination);
        whiteNoise.start();

        noiseNodeRef.current = whiteNoise;
        setIsPlayingSound(true);
      } catch (e) {
        console.warn("Web Audio not supported or blocked", e);
      }
    }
  };

  const nextAct = () => {
    if (currentActIndex < JOURNEY_ACTS.length - 1) {
      setCurrentActIndex(currentActIndex + 1);
      setSelectedOption(0);
    } else {
      // Reached the end -> jump to booking or loop
      setCurrentActIndex(0);
      setSelectedOption(0);
    }
  };

  const prevAct = () => {
    if (currentActIndex > 0) {
      setCurrentActIndex(currentActIndex - 1);
      setSelectedOption(0);
    }
  };

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-label="Coral Adventures Immersive Virtual Journey"
      className="fixed inset-0 z-[100] bg-marine-espresso text-alabaster flex flex-col justify-between overflow-hidden animate-in fade-in duration-500"
    >
      {/* 1. TOP HEADER BAR */}
      <header className="relative z-30 w-full px-6 md:px-12 py-4 flex items-center justify-between bg-gradient-to-b from-marine-espresso/90 via-marine-espresso/40 to-transparent">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 shrink-0">
            <Image
              src="/images/coral_logo_mark.png"
              alt="Coral Adventures Emblem"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-wide text-coral-sun">
              CORAL ADVENTURES
            </span>
            <span className="text-[9px] font-mono tracking-[0.25em] text-alabaster/70 uppercase">
              FIVE-STAR VIRTUAL EXPEDITION
            </span>
          </div>
        </div>

        {/* Action Controls (Sound, Auto-play, Close) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Ambient Sound Synthesizer */}
          <button
            onClick={toggleSound}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-mono uppercase tracking-[0.18em] transition-all",
              isPlayingSound 
                ? "bg-coral-sun/20 border-coral-sun text-coral-sun" 
                : "border-alabaster/30 text-alabaster/70 hover:border-alabaster hover:text-alabaster"
            )}
            title="Toggle Ambient Ocean Audio"
          >
            <span className={cn("w-1.5 h-1.5 rounded-full", isPlayingSound ? "bg-coral-sun animate-pulse" : "bg-alabaster/40")} />
            <span className="hidden sm:inline">{isPlayingSound ? "AUDIO ACTIVE" : "PLAY SOUND"}</span>
          </button>

          {/* Auto Play Toggle */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={cn(
              "hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-mono uppercase tracking-[0.18em] transition-all",
              isAutoPlay 
                ? "bg-coral-water/20 border-coral-water text-coral-water" 
                : "border-alabaster/30 text-alabaster/70 hover:border-alabaster hover:text-alabaster"
            )}
          >
            <span>{isAutoPlay ? "AUTO (7s)" : "MANUAL"}</span>
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-1.5 bg-alabaster/10 hover:bg-alabaster hover:text-marine-espresso rounded-full border border-alabaster/30 text-alabaster font-mono text-[11px] uppercase tracking-[0.2em] transition-all"
            aria-label="Close Virtual Journey"
          >
            <span>CLOSE</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </header>

      {/* 2. MAIN CINEMATIC ACT STAGE */}
      <main className="relative flex-1 w-full h-full flex items-center justify-center">
        {/* Environmental Photographic Backdrop with smooth transition */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <Image
            key={act.id}
            src={act.image}
            alt={act.headline}
            fill
            priority
            quality={92}
            className="object-cover scale-105 animate-[subtleDrift_25s_ease-in-out_infinite_alternate] transition-all duration-700"
            sizes="100vw"
          />
          {/* Subtle cinematic gradient overlays for high-contrast legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-marine-espresso/90 via-marine-espresso/50 to-transparent w-full md:w-3/5 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-marine-espresso/90 via-transparent to-marine-espresso/40 pointer-events-none" />
        </div>

        {/* Editorial Narrative Content Box in Safe Zone */}
        <div className="relative z-10 editorial-grid w-full py-12 md:py-16 items-center">
          <div className="col-span-12 md:col-span-8 lg:col-span-7 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Act Chapter & Telemetry Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-2.5 py-0.5 bg-coral-orange text-alabaster font-mono text-[10px] uppercase tracking-[0.2em] font-semibold rounded-xs shadow-xs">
                {act.actNumber}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-coral-sun font-semibold">
                {act.actTitle}
              </span>
              <span className="w-1 h-1 rounded-full bg-sand/60" />
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-alabaster/70">
                {act.tag}
              </span>
            </div>

            {/* Main Display Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.92] tracking-tight text-alabaster drop-shadow-md">
              {act.headline}
            </h2>

            {/* Subline */}
            <p className="font-serif text-lg sm:text-xl md:text-2xl text-champagne-light italic mt-2 font-normal drop-shadow-sm">
              {act.subline}
            </p>

            <div className="w-16 h-[2px] bg-gradient-to-r from-coral-sun to-coral-orange my-4" />

            {/* Prose Description */}
            <p className="font-sans text-xs sm:text-sm md:text-base text-alabaster/90 max-w-xl leading-relaxed font-light drop-shadow-xs">
              {act.description}
            </p>

            {/* Interactive Options or Specs Cards */}
            {act.interactiveOptions && (
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {act.interactiveOptions.map((opt, i) => (
                  <button
                    key={opt.name}
                    onClick={() => setSelectedOption(i)}
                    className={cn(
                      "text-left p-3 rounded-xs border transition-all duration-300 backdrop-blur-md",
                      selectedOption === i 
                        ? "bg-alabaster/20 border-coral-sun text-alabaster shadow-md scale-[1.02]" 
                        : "bg-marine-espresso/60 border-sand/30 text-alabaster/80 hover:bg-alabaster/10 hover:border-sand"
                    )}
                  >
                    <div className="text-base mb-1">{opt.icon}</div>
                    <div className="font-serif text-sm font-medium text-alabaster">{opt.name}</div>
                    <div className="font-sans text-[10px] text-alabaster/70 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            )}

            {act.specs && (
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-marine-espresso/70 backdrop-blur-md p-3.5 border border-sand/30 rounded-xs">
                {act.specs.map((sp) => (
                  <div key={sp.label} className="flex flex-col">
                    <span className="font-serif text-base sm:text-lg text-alabaster">{sp.value}</span>
                    <span className="text-[8.5px] font-mono text-coral-sun uppercase tracking-wider">{sp.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Telemetry Strip */}
            <div className="mt-5 pt-3 border-t border-alabaster/15 flex flex-wrap items-center justify-between text-[9.5px] font-mono uppercase tracking-[0.2em] text-alabaster/70">
              <span>{act.telemetry}</span>
              <span className="text-coral-sun font-semibold">MALPE COASTAL JURISDICTION</span>
            </div>

          </div>
        </div>

        {/* Left / Right Nav Arrows */}
        <button
          onClick={prevAct}
          disabled={currentActIndex === 0}
          className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-alabaster/30 bg-marine-espresso/60 backdrop-blur-md items-center justify-center text-alabaster transition-all hover:bg-alabaster hover:text-marine-espresso disabled:opacity-30 disabled:pointer-events-none"
          aria-label="Previous Act"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextAct}
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-alabaster/30 bg-marine-espresso/60 backdrop-blur-md items-center justify-center text-alabaster transition-all hover:bg-coral-sun hover:text-marine-espresso"
          aria-label="Next Act"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </main>

      {/* 3. BOTTOM ACT PROGRESS & STEP SELECTOR */}
      <footer className="relative z-30 w-full px-6 md:px-12 py-4 bg-gradient-to-t from-marine-espresso via-marine-espresso/80 to-transparent flex flex-col gap-3">
        {/* Step dots & title bar */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
          {JOURNEY_ACTS.map((a, idx) => (
            <button
              key={a.id}
              onClick={() => {
                setCurrentActIndex(idx);
                setSelectedOption(0);
              }}
              className={cn(
                "flex-1 min-w-[90px] text-left p-2 rounded-xs border transition-all duration-300 flex flex-col gap-1",
                idx === currentActIndex
                  ? "border-coral-sun bg-coral-sun/20 text-alabaster shadow-xs"
                  : idx < currentActIndex
                  ? "border-sand/40 bg-alabaster/5 text-alabaster/70 hover:border-sand"
                  : "border-sand/20 bg-marine-espresso/40 text-alabaster/40 hover:border-sand/40"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-[8.5px] font-mono uppercase tracking-widest font-semibold">{a.actNumber}</span>
                {idx === currentActIndex && <span className="w-1.5 h-1.5 rounded-full bg-coral-sun animate-ping" />}
              </div>
              <span className="font-serif text-[11px] sm:text-xs truncate font-medium">{a.actTitle}</span>
            </button>
          ))}
        </div>

        {/* Bottom Bar: Action Links & Direct Booking */}
        <div className="flex items-center justify-between text-xs pt-1">
          <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-alabaster/70">
            <span>ACT {currentActIndex + 1} OF {JOURNEY_ACTS.length}</span>
            <span className="hidden sm:inline">· PRESS ← → ARROW KEYS TO NAVIGATE</span>
          </div>

          <div className="flex items-center gap-3">
            {currentActIndex === JOURNEY_ACTS.length - 1 ? (
              <a
                href="#book"
                onClick={onClose}
                className="px-6 py-2.5 bg-gradient-to-r from-coral-sun to-coral-orange text-marine-espresso font-mono text-[11px] uppercase tracking-[0.2em] font-bold rounded-xs shadow-lg transition-transform active:scale-95"
              >
                RESERVE YOUR EXPEDITION
              </a>
            ) : (
              <button
                onClick={nextAct}
                className="inline-flex items-center gap-2 px-5 py-2 bg-alabaster text-marine-espresso font-mono text-[11px] uppercase tracking-[0.2em] font-semibold rounded-xs hover:bg-coral-sun transition-all active:scale-95"
              >
                <span>CONTINUE VOYAGE</span>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
