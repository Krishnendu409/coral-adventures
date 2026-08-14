"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { EXPEDITION_ZONES } from "@/lib/three/worldData";
import { cn } from "@/lib/utils";

interface ExpeditionHUDProps {
  currentZoneIndex: number;
  onNextZone: () => void;
  onPrevZone: () => void;
  onSelectZone: (index: number) => void;
  onToggleMap: () => void;
  isMapOpen: boolean;
}

export function ExpeditionHUD({
  currentZoneIndex,
  onNextZone,
  onPrevZone,
  onSelectZone,
  onToggleMap,
  isMapOpen,
}: ExpeditionHUDProps) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const currentZone = EXPEDITION_ZONES[currentZoneIndex] || EXPEDITION_ZONES[0];
  const nextZone = EXPEDITION_ZONES[currentZoneIndex + 1];
  const isLastZone = currentZoneIndex === EXPEDITION_ZONES.length - 1;

  // Web Audio API ambient ocean wave surf synthesizer
  const toggleAudio = () => {
    if (isAudioPlaying) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
        setTimeout(() => setIsAudioPlaying(false), 500);
      }
    } else {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = audioCtxRef.current || new AudioCtx();
        audioCtxRef.current = ctx;

        if (ctx.state === "suspended") {
          ctx.resume();
        }

        const bufferSize = ctx.sampleRate * 4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = data[i];
          data[i] *= 2.5;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(180, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        const mainGain = ctx.createGain();
        mainGain.gain.setValueAtTime(0.01, ctx.currentTime);
        mainGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 1.2);

        noise.connect(filter);
        filter.connect(mainGain);
        mainGain.connect(ctx.destination);

        noise.start();
        lfo.start();

        gainNodeRef.current = mainGain;
        setIsAudioPlaying(true);
      } catch (err) {
        console.warn("Ambient audio error:", err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <>
      {/* Top Persistent Cinematic Header */}
      <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none p-4 sm:p-6 flex items-center justify-between">
        
        {/* Left: Brand Seal */}
        <div className="pointer-events-auto flex items-center gap-3 bg-marine-espresso/80 backdrop-blur-md px-4 py-2 rounded-full border border-alabaster/15 shadow-xl">
          <Link href="/" className="flex items-center gap-2.5 group" title="Return to Homepage">
            <div className="relative w-7 h-7 shrink-0 transition-transform group-hover:scale-110">
              <Image src="/images/coral_logo_mark.png" alt="Coral Emblem" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm text-alabaster font-light group-hover:text-coral-sun transition-colors">
                CORAL ADVENTURES
              </span>
              <span className="text-[8px] font-mono tracking-[0.22em] text-coral-sun uppercase font-bold">
                REIMAGINED 3D EXPEDITION
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Live Waypoint Telemetry Indicator */}
        <div className="hidden md:flex pointer-events-auto items-center gap-3 bg-marine-espresso/80 backdrop-blur-md px-5 py-2 rounded-full border border-alabaster/15 text-alabaster shadow-xl">
          <span className="w-2 h-2 rounded-full bg-coral-sun animate-ping" />
          <span className="text-[10px] font-mono tracking-[0.25em] text-coral-sun font-bold uppercase">
            ZONE {String(currentZoneIndex + 1).padStart(2, "0")} / {String(EXPEDITION_ZONES.length).padStart(2, "0")}
          </span>
          <span className="text-alabaster/30 font-mono">|</span>
          <span className="font-serif text-xs uppercase tracking-wider text-alabaster font-medium">
            {currentZone.title}
          </span>
        </div>

        {/* Right Controls */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          {/* Ambient Sound Button */}
          <button
            onClick={toggleAudio}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] font-semibold border backdrop-blur-md transition-all shadow-md",
              isAudioPlaying
                ? "bg-coral-sun/20 border-coral-sun text-coral-sun"
                : "bg-marine-espresso/80 border-alabaster/15 text-alabaster/80 hover:border-coral-sun"
            )}
            title="Toggle Ambient Audio"
          >
            <span className="relative flex h-2 w-2">
              {isAudioPlaying && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral-sun opacity-75" />
              )}
              <span className={cn("relative inline-flex rounded-full h-2 w-2", isAudioPlaying ? "bg-coral-sun" : "bg-alabaster/40")} />
            </span>
            <span className="hidden sm:inline">{isAudioPlaying ? "SOUND ON" : "SOUND"}</span>
          </button>

          {/* Global Nautical Map Mode Button (Persepolis Map) */}
          <button
            onClick={onToggleMap}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] font-bold border backdrop-blur-md transition-all shadow-md",
              isMapOpen
                ? "bg-coral-sun text-marine-espresso border-coral-sun"
                : "bg-marine-espresso/80 border-coral-sun/50 text-coral-sun hover:bg-coral-sun hover:text-marine-espresso"
            )}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              <line x1="8" y1="2" x2="8" y2="18" />
              <line x1="16" y1="6" x2="16" y2="22" />
            </svg>
            <span>NAUTICAL MAP</span>
          </button>

          {/* Exit to Main Homepage */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] font-semibold bg-alabaster/95 hover:bg-coral-orange text-marine-espresso hover:text-alabaster transition-colors shadow-md"
          >
            <span>EXIT</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Bottom Floating Waypoint Controller & Primary Route Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none p-4 sm:p-6 flex flex-col items-center gap-2">
        
        {/* Drag Hint */}
        <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-alabaster/70 bg-marine-espresso/70 backdrop-blur-md px-4 py-1 rounded-full border border-alabaster/10 shadow-sm pointer-events-none">
          DRAG TO LOOK 360° · CLICK RADAR HOTSPOTS TO INSPECT
        </div>

        {/* Primary Guided Route Navigation Bar */}
        <div className="w-full max-w-xl bg-marine-espresso/85 backdrop-blur-xl px-4 py-3 rounded-2xl border border-sand/30 shadow-2xl flex items-center justify-between gap-4 pointer-events-auto">
          
          {/* Previous Zone Button */}
          <button
            onClick={onPrevZone}
            disabled={currentZoneIndex === 0}
            className={cn(
              "p-2 rounded-full border transition-all text-xs",
              currentZoneIndex === 0
                ? "opacity-30 border-transparent text-alabaster/40 cursor-not-allowed"
                : "border-alabaster/20 text-alabaster hover:border-coral-sun hover:text-coral-sun active:scale-95"
            )}
            aria-label="Previous Zone"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Center Scrubber & Location Title */}
          <div className="flex flex-col items-center gap-1.5 flex-1 text-center">
            <div className="text-[9px] font-mono tracking-[0.2em] text-coral-sun uppercase font-bold">
              {currentZone.category}
            </div>
            <div className="font-serif text-sm sm:text-base text-alabaster font-medium line-clamp-1">
              {currentZone.title}
            </div>

            {/* Waypoint Scrubber Dots */}
            <div className="flex items-center gap-1.5 mt-0.5">
              {EXPEDITION_ZONES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectZone(idx)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    currentZoneIndex === idx
                      ? "bg-coral-sun w-4 scale-110"
                      : "bg-alabaster/30 hover:bg-alabaster/60"
                  )}
                  aria-label={`Jump to Zone ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Next Zone Primary Action Button */}
          <button
            onClick={onNextZone}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-coral-sun to-coral-orange text-marine-espresso font-mono text-[11px] uppercase tracking-[0.2em] font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-md shrink-0"
          >
            <span>{isLastZone ? "RESTART" : "CONTINUE →"}</span>
          </button>

        </div>
      </footer>
    </>
  );
}
