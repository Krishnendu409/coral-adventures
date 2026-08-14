"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExpeditionStamp } from "@/components/editorial/ephemera/ExpeditionStamp";
import { TapeStrip } from "@/components/editorial/ephemera/TapeStrip";

export function ScrapbookEpilogue() {
  return (
    <footer className="relative w-full py-24 sm:py-36 bg-[#02070D] text-[#FAF6EE] overflow-hidden select-none border-t border-white/10">
      {/* Subtle Star Dust Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, #FAF6EE 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        
        {/* The Last Photograph in the Scrapbook */}
        <div className="relative max-w-lg mx-auto bg-[#071A2B] p-4 sm:p-5 rounded-xs border border-white/15 shadow-2xl mb-12 -rotate-1">
          <TapeStrip className="-top-3.5 left-1/2 -translate-x-1/2 rotate-1 z-10" />
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-black">
            <Image
              src="/images/nightfall_ocean.jpg"
              alt="The Dark Arabian Sea at Midnight"
              fill
              className="object-cover opacity-90"
              sizes="(max-width: 768px) 100vw, 500px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 text-white text-[10px] font-mono opacity-70">
              MALPE · ARABIAN SEA · 13°21′02″ N
            </div>
          </div>
          
          <div className="pt-3 text-center">
            <span className="font-serif italic text-sm sm:text-base text-white/90 tracking-wide block">
              The last light fades into the horizon.
            </span>
          </div>
        </div>

        {/* Physical Expedition Stamp */}
        <div className="flex justify-center mb-8">
          <ExpeditionStamp
            location="MALPE EXPEDITION"
            year="2026"
            coords="13°21′02″ N"
            color="coral"
            className="scale-110 opacity-90"
          />
        </div>

        {/* Final Quiet Titles */}
        <div className="space-y-3 mb-12">
          <h3 className="font-serif text-3xl sm:text-5xl text-white font-normal tracking-tight">
            The Journey Continues.
          </h3>
          <p className="font-mono text-xs text-[#E05A36] uppercase tracking-[0.25em] font-semibold">
            CORAL ADVENTURES · MALPE · ARABIAN SEA
          </p>
        </div>

        {/* Restrained Editorial Links (Quiet, Not a SaaS CTA Bar) */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-white/70">
          <Link
            href="/"
            className="hover:text-white pb-0.5 border-b border-white/20 hover:border-white transition-colors"
          >
            ← RETURN TO EDITORIAL HOME
          </Link>
          <span className="opacity-30">·</span>
          <Link
            href="/journey"
            className="hover:text-[#25C4C0] pb-0.5 border-b border-[#25C4C0]/40 hover:border-[#25C4C0] transition-colors"
          >
            EXPLORE 3D DIGITAL TWIN →
          </Link>
        </div>
      </div>
    </footer>
  );
}
