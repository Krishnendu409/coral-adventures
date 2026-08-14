"use client";

import React from "react";
import Link from "next/link";
import { ExpeditionStamp } from "@/components/editorial/ephemera/ExpeditionStamp";

export function DirectorEpilogue() {
  return (
    <footer className="relative w-full py-24 sm:py-32 bg-[#040D18] text-[#FAF6EE] overflow-hidden select-none border-t border-white/10">
      {/* Subtle Starfield & Celestial Noise */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, #FAF6EE 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Physical Production Seal */}
        <div className="flex justify-center mb-8">
          <ExpeditionStamp
            location="MALPE EXPEDITION"
            year="2026"
            coords="13°21′02″ N"
            color="coral"
            className="opacity-90"
          />
        </div>

        {/* Cinematic Epilogue Titles */}
        <div className="space-y-4 mb-12">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#25C4C0] font-bold block">
            CINEMATIC EXPEDITION DOSSIER // CONCLUDED
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl text-white font-normal tracking-tight">
            The Journey Continues.
          </h2>

          <p className="font-sans text-sm sm:text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed">
            From the sunlit sands of Malpe to the moonlit columnar basalt of St. Mary’s, every frame is an intentional spatial prediction of what the explorable 3D world will become.
          </p>
        </div>

        {/* Technical Production Credits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-2xl border border-white/10 bg-white/5 text-left text-xs font-mono mb-12">
          <div>
            <span className="text-[10px] uppercase text-white/40 block mb-1">DIRECTORATE</span>
            <strong className="text-white block font-sans">Coral Adventures Art Dept.</strong>
            <span className="text-[10px] text-white/60">Spatial Experience Team</span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-white/40 block mb-1">GEOGRAPHY</span>
            <strong className="text-white block font-sans">Malpe, Udupi, Karnataka</strong>
            <span className="text-[10px] text-white/60">Arabian Sea Basin</span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-white/40 block mb-1">ENGINEERING TARGET</span>
            <strong className="text-white block font-sans">Three.js / WebGL Twin</strong>
            <span className="text-[10px] text-white/60">12-Beat Continuous World</span>
          </div>
        </div>

        {/* Clean Navigational Handoff Links (Restrained, Not Spammy) */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/10 hover:bg-white text-white hover:text-[#071A2B] transition-colors"
          >
            <span>RETURN TO EDITORIAL HOME</span>
          </Link>

          <Link
            href="/journey"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#25C4C0]/40 bg-[#25C4C0]/10 hover:bg-[#25C4C0] text-[#25C4C0] hover:text-[#071A2B] transition-colors"
          >
            <span>INSPECT 3D WORLD /JOURNEY</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Small Technical Footer Line */}
        <div className="mt-16 pt-8 border-t border-white/10 text-[10px] font-mono text-white/40 flex flex-wrap items-center justify-between gap-2">
          <span>CORAL ADVENTURES · EXPEDITION ARCHIVE</span>
          <span>MALPE · ARABIAN SEA · 13°21′02″ N · 74°42′08″ E</span>
        </div>
      </div>
    </footer>
  );
}
