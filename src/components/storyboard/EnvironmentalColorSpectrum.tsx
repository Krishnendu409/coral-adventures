"use client";

import React from "react";
import { ASSET_INVENTORY_SUMMARY } from "@/data/storyboardData";

export function EnvironmentalColorSpectrum() {
  const { chromaticProgression } = ASSET_INVENTORY_SUMMARY;

  return (
    <section className="relative w-full py-10 bg-[#FAF6EE] border-b border-[#0A2540]/10 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded border border-[#F59E0B]/30 bg-[#F59E0B]/5 text-[#D97706] text-[10px] font-mono font-bold uppercase tracking-widest mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              ATMOSPHERIC LIGHTING & CHROMATIC SPECTRUM
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#0A2540] font-normal tracking-tight">
              Diurnal Lighting Arc: <span className="italic text-[#E05A36]">5500K Solar → 0K Obsidian Void</span>
            </h3>
          </div>
          <span className="text-xs font-mono text-[#0A2540]/60">
            NATURAL CHROMATIC SHIFT WITHOUT ARBITRARY POST-PROCESSING
          </span>
        </div>

        {/* 8-Stage Color Continuum Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {chromaticProgression.map((stage) => {
            return (
              <div
                key={stage.chapter}
                className="p-3 rounded-xl border border-[#0A2540]/10 bg-[#FAF7F0] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-[#0A2540]/50 mb-1">
                    <span>CH 0{stage.chapter}</span>
                    <span className="font-bold text-[#0A2540]">{stage.kelvin}</span>
                  </div>
                  <span className="text-xs font-serif font-bold text-[#0A2540] block line-clamp-1">
                    {stage.title}
                  </span>
                </div>

                {/* Color Swatch Pill */}
                <div className="my-2.5 flex items-center gap-1.5">
                  <div
                    className="w-6 h-6 rounded-lg border border-black/10 shadow-inner flex-shrink-0"
                    style={{ backgroundColor: stage.baseHex }}
                    title={`Base: ${stage.baseHex}`}
                  />
                  <div
                    className="w-4 h-6 rounded-lg border border-black/10 shadow-inner flex-shrink-0"
                    style={{ backgroundColor: stage.accentHex }}
                    title={`Accent: ${stage.accentHex}`}
                  />
                </div>

                <span className="text-[9.5px] font-mono text-[#0A2540]/70 leading-tight">
                  {stage.vibe}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
