"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface JourneyNavigationProps {
  currentChapter: number;
  totalChapters: number;
  chapterTitle: string;
  onJumpToChapter: (index: number) => void;
}

const CHAPTERS = [
  { id: 0, title: "ARRIVAL", tag: "PAVILION" },
  { id: 1, title: "THE BEACH", tag: "PROMENADE" },
  { id: 2, title: "WATER LEVEL", tag: "SHALLOWS" },
  { id: 3, title: "ADVENTURE", tag: "WATERSPORTS" },
  { id: 4, title: "THE JETTY", tag: "MARINA" },
  { id: 5, title: "THE VESSEL", tag: "CATAMARAN" },
  { id: 6, title: "OPEN SEA", tag: "DEPARTURE" },
  { id: 7, title: "EXPEDITION", tag: "ST. MARY'S" },
  { id: 8, title: "SUB-SURFACE", tag: "DIVE" },
  { id: 9, title: "SUNSET", tag: "GOLDEN HOUR" },
  { id: 10, title: "DINNER", tag: "COASTAL TABLE" },
  { id: 11, title: "MIDNIGHT", tag: "STARLIGHT" },
  { id: 12, title: "CONCIERGE", tag: "RESERVATIONS" },
];

export function JourneyNavigation({
  currentChapter,
  totalChapters,
  chapterTitle,
  onJumpToChapter,
}: JourneyNavigationProps) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Web Audio API ambient ocean wave sound synthesizer
  const toggleAudio = () => {
    if (isAudioPlaying) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
        setTimeout(() => {
          setIsAudioPlaying(false);
        }, 500);
      }
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = audioCtxRef.current || new AudioCtx();
        audioCtxRef.current = ctx;

        if (ctx.state === "suspended") {
          ctx.resume();
        }

        // Generate Pink/Brownish Noise Buffer for Ocean Waves
        const bufferSize = ctx.sampleRate * 4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + (0.02 * white)) / 1.02;
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
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // 8-second wave cycle
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

  const progressPercent = Math.min(100, Math.max(0, (currentChapter / (totalChapters - 1)) * 100));

  return (
    <>
      {/* Top Cinematic Journey HUD */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none p-4 sm:p-6 md:p-8 flex items-center justify-between">
        
        {/* Left: Brand Identity & Active Location */}
        <div className="pointer-events-auto flex items-center gap-3.5 bg-marine-espresso/70 backdrop-blur-md px-4 py-2 rounded-full border border-alabaster/15 shadow-lg">
          <Link href="/" className="flex items-center gap-3 group" title="Return to Homepage">
            <div className="relative w-7 h-7 shrink-0 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/images/coral_logo_mark.png"
                alt="Coral Adventures Emblem"
                fill
                className="object-contain drop-shadow-sm"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm tracking-wide text-alabaster font-light group-hover:text-coral-sun transition-colors">
                CORAL ADVENTURES
              </span>
              <span className="text-[8px] font-mono tracking-[0.22em] text-coral-sun uppercase font-semibold">
                VIRTUAL JOURNEY
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Live Spatial Chapter Marker */}
        <div className="hidden md:flex pointer-events-auto items-center gap-3 bg-marine-espresso/70 backdrop-blur-md px-5 py-2 rounded-full border border-alabaster/15 text-alabaster shadow-lg">
          <span className="w-2 h-2 rounded-full bg-coral-sun animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-alabaster/70 font-semibold">
            ACT {String(currentChapter + 1).padStart(2, "0")} / {String(totalChapters).padStart(2, "0")}
          </span>
          <span className="text-alabaster/30 font-mono">|</span>
          <span className="font-serif text-xs uppercase tracking-wider text-coral-sun font-medium">
            {chapterTitle}
          </span>
        </div>

        {/* Right: Sound Toggle, Chapters Menu & Exit */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          {/* Ambient Sound Synthesizer Button */}
          <button
            onClick={toggleAudio}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] font-semibold border backdrop-blur-md transition-all duration-300 shadow-md",
              isAudioPlaying
                ? "bg-coral-sun/20 border-coral-sun text-coral-sun hover:bg-coral-sun hover:text-marine-espresso"
                : "bg-marine-espresso/70 border-alabaster/15 text-alabaster/80 hover:border-coral-sun hover:text-alabaster"
            )}
            title="Toggle Ambient Ocean Surf Sound"
          >
            <span className="relative flex h-2 w-2">
              {isAudioPlaying && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral-sun opacity-75" />
              )}
              <span className={cn("relative inline-flex rounded-full h-2 w-2", isAudioPlaying ? "bg-coral-sun" : "bg-alabaster/40")} />
            </span>
            <span className="hidden sm:inline">{isAudioPlaying ? "SOUND ON" : "AMBIENT SOUND"}</span>
          </button>

          {/* Chapter Quick Jump Selector */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-3.5 py-2 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] font-semibold bg-marine-espresso/70 backdrop-blur-md border border-alabaster/15 text-alabaster hover:border-coral-sun transition-all duration-300 shadow-md"
            aria-label="Toggle Chapters Menu"
          >
            CHAPTERS
          </button>

          {/* Exit / Return to Main Website */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] font-semibold bg-alabaster/95 hover:bg-coral-orange text-marine-espresso hover:text-alabaster transition-all duration-300 shadow-md"
          >
            <span>EXIT</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Chapter Menu Modal/Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-marine-espresso/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-marine-deep/95 border border-sand/30 rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-sand/20 mb-6">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8">
                  <Image src="/images/coral_logo_mark.png" alt="Emblem" fill className="object-contain" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-alabaster">EXPEDITION ITINERARY</h3>
                  <span className="text-[9px] font-mono tracking-[0.2em] text-coral-sun uppercase">SELECT VIRTUAL WAYPOINT</span>
                </div>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-alabaster/60 hover:text-alabaster transition-colors"
                aria-label="Close Itinerary"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-2">
              {CHAPTERS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    onJumpToChapter(ch.id);
                    setMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between p-3.5 rounded-lg border text-left transition-all duration-200",
                    currentChapter === ch.id
                      ? "bg-coral-sun/20 border-coral-sun text-coral-sun"
                      : "bg-marine-espresso/50 border-alabaster/10 text-alabaster/80 hover:border-coral-sun/60 hover:text-alabaster hover:bg-marine-espresso/80"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-bold text-coral-sun">
                      {String(ch.id + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-sm font-medium">
                      {ch.title}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono tracking-wider opacity-60 uppercase">
                    {ch.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Floating Timeline Progress Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none p-4 sm:p-6 flex flex-col items-center">
        <div className="w-full max-w-xl bg-marine-espresso/70 backdrop-blur-md px-4 py-2.5 rounded-full border border-alabaster/15 flex items-center gap-4 shadow-lg pointer-events-auto">
          <span className="text-[9px] font-mono tracking-[0.2em] text-alabaster/70 uppercase shrink-0 font-semibold">
            MALPE VOYAGE
          </span>
          <div className="relative flex-1 h-1.5 bg-alabaster/20 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-coral-water via-coral-sun to-coral-orange transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[9px] font-mono text-coral-sun shrink-0 font-bold">
            {Math.round(progressPercent)}%
          </span>
        </div>
      </footer>
    </>
  );
}
