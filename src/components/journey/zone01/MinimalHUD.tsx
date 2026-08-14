"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MinimalHUDProps {
  onToggleMap?: () => void;
  locationLabel?: string;
}

export function MinimalHUD({
  onToggleMap,
  locationLabel = "MALPE WATERFRONT · EXPEDITION TERMINAL",
}: MinimalHUDProps) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Web Audio API ambient morning sea breeze & gentle surf synthesizer
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

        // Coastal pink/brown noise wave generation
        const bufferSize = ctx.sampleRate * 4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = data[i];
          data[i] *= 2.2;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(280, ctx.currentTime);

        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.1, ctx.currentTime); // 10-second coastal wave rhythm
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(140, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        const mainGain = ctx.createGain();
        mainGain.gain.setValueAtTime(0.01, ctx.currentTime);
        mainGain.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + 1.5);

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
    <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none p-5 sm:p-8 flex items-center justify-between">
      
      {/* Top Left: Authentic Coral Adventures Logo */}
      <div className="pointer-events-auto flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3.5 group" title="Return to Homepage">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/coral_logo_mark.png"
              alt="Coral Adventures Official Emblem"
              fill
              sizes="(max-width: 640px) 40px, 44px"
              className="object-contain drop-shadow-md"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base sm:text-lg tracking-wide text-alabaster drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] group-hover:text-coral-sun transition-colors">
              CORAL ADVENTURES
            </span>
            <span className="text-[8.5px] sm:text-[9px] font-mono tracking-[0.25em] text-coral-sun uppercase font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              VIRTUAL EXPEDITION
            </span>
          </div>
        </Link>

        {/* Minimalist Location Tag */}
        <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-alabaster/20 text-[10px] font-mono tracking-[0.2em] text-alabaster/80 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-coral-sun animate-pulse" />
          <span>{locationLabel}</span>
        </div>
      </div>

      {/* Top Right: Unobtrusive Action Controls */}
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
        {/* Ambient Sound Toggle */}
        <button
          onClick={toggleAudio}
          className={cn(
            "flex items-center gap-2 px-3.5 py-2 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] font-semibold backdrop-blur-md transition-all shadow-md",
            isAudioPlaying
              ? "bg-coral-sun/30 border border-coral-sun text-coral-sun"
              : "bg-marine-espresso/60 border border-alabaster/20 text-alabaster/90 hover:border-coral-sun"
          )}
          title="Toggle Coastal Ambience"
          aria-label="Toggle Ambient Audio"
        >
          <span className="relative flex h-2 w-2">
            {isAudioPlaying && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral-sun opacity-75" />
            )}
            <span className={cn("relative inline-flex rounded-full h-2 w-2", isAudioPlaying ? "bg-coral-sun" : "bg-alabaster/40")} />
          </span>
          <span className="hidden sm:inline">{isAudioPlaying ? "SOUND ON" : "SOUND"}</span>
        </button>

        {/* Nautical Map Button */}
        {onToggleMap && (
          <button
            onClick={onToggleMap}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] font-bold bg-marine-espresso/60 border border-coral-sun/50 text-coral-sun hover:bg-coral-sun hover:text-marine-espresso backdrop-blur-md transition-all shadow-md"
            aria-label="Open Nautical Map"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              <line x1="8" y1="2" x2="8" y2="18" />
              <line x1="16" y1="6" x2="16" y2="22" />
            </svg>
            <span>MAP</span>
          </button>
        )}

        {/* Exit / Return */}
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] font-semibold bg-alabaster/95 hover:bg-coral-orange text-marine-espresso hover:text-alabaster transition-colors shadow-md"
          title="Return to Main Website"
        >
          <span>EXIT</span>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>
      </div>

    </header>
  );
}
