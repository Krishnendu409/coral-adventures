"use client";

import React from "react";
import { ASSET_INVENTORY_SUMMARY } from "@/data/storyboardData";

export function ProductionAssetMatrix() {
  const { heroAssets, environmentSystems } = ASSET_INVENTORY_SUMMARY;

  return (
    <section className="relative w-full py-16 sm:py-20 bg-[#FAF7F0] border-b border-[#0A2540]/10 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-[#1E40AF]/30 bg-[#1E40AF]/5 text-[#1E40AF] text-[10px] font-mono font-bold uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E40AF]" />
              TECHNICAL DIRECTIVE & SOURCING BLUEPRINT
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A2540] font-normal tracking-tight">
              Production Asset Registry: <span className="italic text-[#1E40AF]">LOD & Poly Budgets</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-[#0A2540]/60 max-w-md">
            Authoritative technical specification distinguishing custom hero models, PBR material dependencies, and procedural compute shaders for 3D world engineering.
          </p>
        </div>

        {/* Hero Assets Grid */}
        <div className="mb-10">
          <h3 className="text-xs font-mono font-bold text-[#0A2540] uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E05A36]" />
            PRIMARY HERO ASSETS (AUTHORED GLB PIPELINE)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {heroAssets.map((asset, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-[#0A2540]/10 bg-[#FAF6EE] flex flex-col justify-between text-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#E05A36]/10 text-[#E05A36]">
                      {asset.category}
                    </span>
                    <span className="text-[10px] font-mono text-[#0A2540]/60">{asset.polyBudget}</span>
                  </div>
                  <strong className="block text-sm font-sans font-bold text-[#0A2540] mb-1">
                    {asset.name}
                  </strong>
                </div>
                <div className="pt-2 mt-2 border-t border-[#0A2540]/10 text-[10px] font-mono text-[#0A2540]/70">
                  SOURCE: <strong>{asset.source}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Environment Shaders & Systems */}
        <div>
          <h3 className="text-xs font-mono font-bold text-[#0A2540] uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0D9488]" />
            ENVIRONMENTAL SHADER ENGINES & PROCEDURAL SYSTEMS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {environmentSystems.map((sys, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-[#0A2540]/10 bg-[#FAF6EE] flex flex-col justify-between text-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0D9488]/10 text-[#0D9488]">
                      {sys.type}
                    </span>
                  </div>
                  <strong className="block text-sm font-sans font-bold text-[#0A2540] mb-1">
                    {sys.name}
                  </strong>
                  <p className="text-[11px] font-sans text-[#0A2540]/75 leading-relaxed">
                    {sys.specs}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
