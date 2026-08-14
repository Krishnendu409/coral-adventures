"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { STORYBOARD_FRAMES } from "@/data/storyboardData";
import { ExpeditionStamp } from "@/components/editorial/ephemera/ExpeditionStamp";
import { TapeStrip } from "@/components/editorial/ephemera/TapeStrip";

interface StoryboardHeaderProps {
  activeChapter: number;
  onSelectChapter: (chapter: number) => void;
}

export function StoryboardHeader({ activeChapter, onSelectChapter }: StoryboardHeaderProps) {
  const [mapOverlayOpen, setMapOverlayOpen] = useState(false);

  return (
    <header className="relative w-full border-b border-[#0A2540]/10 bg-[#FAF6EE] pt-8 pb-12 overflow-hidden select-none">
      {/* Subtle Background Grid & Telemetry Lines */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0A2540 1px, transparent 1px),
            linear-gradient(to bottom, #0A2540 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Control & Navigation Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#0A2540]/10 pb-6 mb-8 text-xs font-mono tracking-widest text-[#0A2540]/70">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0A2540]/20 bg-[#FAF7F0] hover:bg-[#0A2540] hover:text-[#FAF6EE] transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>EDITORIAL HOME</span>
            </Link>
            <span className="hidden sm:inline text-[#0A2540]/40">·</span>
            <span className="hidden sm:inline font-bold text-[#E05A36]">3D WORLD STORYBOARD DOSSIER</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <div className="hidden md:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>STORYBOARD VERSION 1.0 · PRE-PRODUCTION</span>
            </div>
            <div className="text-right">
              <span className="text-[#0A2540]/50">COORD: </span>
              <span className="font-bold text-[#0A2540]">13°21′02″ N · 74°42′08″ E</span>
            </div>
          </div>
        </div>

        {/* Dossier Header Title Block with Physical Ephemera */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-[#E05A36]/30 bg-[#E05A36]/5 text-[#E05A36] text-[10px] font-mono font-bold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E05A36]" />
              EXPEDITION DIRECTOR'S VISION BOARD
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0A2540] font-normal leading-[1.08] tracking-tight mb-4">
              The Spatial Journey, <br />
              <span className="italic text-[#E05A36]">Before It Becomes Real.</span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#0A2540]/80 max-w-2xl leading-relaxed mb-6 font-light">
              An 8-chapter cinematic storyboard establishing the complete narrative arc, camera choreography, 
              atmospheric lighting progression, authentic coastal Kerala/Karnataka geography, and the silent 
              guide bird continuity for the future <span className="font-mono text-xs font-semibold text-[#0A2540]">/journey</span> digital twin.
            </p>

            {/* Quick Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border border-[#0A2540]/10 bg-[#FAF7F0] text-xs font-mono">
              <div>
                <span className="block text-[10px] uppercase text-[#0A2540]/50 tracking-wider">Total Frames</span>
                <span className="font-serif text-xl font-bold text-[#0A2540]">08 Chapters</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-[#0A2540]/50 tracking-wider">Spatial Range</span>
                <span className="font-serif text-xl font-bold text-[#0A2540]">1,200m Coast</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-[#0A2540]/50 tracking-wider">Time Shift</span>
                <span className="font-serif text-xl font-bold text-[#0A2540]">Midday → Night</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-[#0A2540]/50 tracking-wider">Guide Thread</span>
                <span className="font-serif text-xl font-bold text-[#E05A36]">Silent Bird</span>
              </div>
            </div>
          </div>

          {/* Right Column: Physical Production Stamp & Map Blueprint Badge */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end gap-6 relative">
            <div className="relative">
              <TapeStrip className="-top-3 left-6 rotate-2 z-10" />
              <div className="p-5 rounded-2xl border border-[#0A2540]/15 bg-[#FAF7F0] shadow-sm max-w-xs text-center relative rotate-1">
                <ExpeditionStamp location="MALPE EXPEDITION" year="2026" coords="74°42′08″ E" color="coral" className="mx-auto mb-3" />
                <div className="text-[11px] font-mono font-bold tracking-widest text-[#0A2540] uppercase">
                  MASTER WORLD SPECIFICATION
                </div>
                <p className="text-[10px] font-sans text-[#0A2540]/70 mt-1 leading-normal">
                  Authentic Arabian Sea geography · Basalt columnar geology · Commercial expedition catamaran.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Master Spatial Map Blueprint (Collapsible or Preview Strip) */}
        <div className="p-6 rounded-2xl border border-[#0A2540]/15 bg-[#071A2B] text-[#FAF6EE] relative overflow-hidden shadow-lg mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
              <span className="font-bold tracking-widest uppercase text-white">MASTER SPATIAL TOPOGRAPHY BLUEPRINT (1,200M AXIS)</span>
            </div>
            <span className="text-white/60 text-[11px]">WESTWARD EXPEDITION VECTOR (278° WSW)</span>
          </div>

          {/* Spatial Blueprint Graphic */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 relative z-10">
            {STORYBOARD_FRAMES.map((frame, index) => {
              const isActive = activeChapter === frame.chapter;
              return (
                <button
                  key={frame.id}
                  onClick={() => onSelectChapter(frame.chapter)}
                  className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200 ${
                    isActive
                      ? "border-[#38BDF8] bg-[#38BDF8]/15 ring-1 ring-[#38BDF8] text-white"
                      : "border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                  }`}
                >
                  <span className="text-[9px] font-mono text-[#38BDF8] font-bold tracking-wider">
                    {frame.chapterCode}
                  </span>
                  <span className="text-xs font-serif font-medium mt-1 line-clamp-1 text-white">
                    {frame.title.split('&')[0].split('·')[0]}
                  </span>
                  <span className="text-[9px] font-mono text-white/50 mt-1">
                    {frame.timeOfDay.split('·')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Topography Distance Marker */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
            <span>Z = 0m (Foreshore Beach)</span>
            <div className="flex-1 mx-4 h-[1px] bg-gradient-to-r from-[#FAF6EE]/20 via-[#25C4C0]/40 to-[#F59E0B]/40" />
            <span>Z = 1,200m (St. Mary's Basalt Promontory)</span>
          </div>
        </div>
      </div>
    </header>
  );
}
