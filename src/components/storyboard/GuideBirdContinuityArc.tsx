"use client";

import React, { useState } from "react";
import { STORYBOARD_FRAMES } from "@/data/storyboardData";

export function GuideBirdContinuityArc() {
  const [selectedFrameIndex, setSelectedFrameIndex] = useState(0);
  const currentFrame = STORYBOARD_FRAMES[selectedFrameIndex];

  return (
    <section className="relative w-full py-12 bg-[#FAF7F0] border-b border-[#0A2540]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-[#0D9488]/30 bg-[#0D9488]/5 text-[#0D9488] text-[10px] font-mono font-bold uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
              NARRATIVE THREAD & CHARACTER CONTINUITY
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A2540] font-normal tracking-tight">
              The Silent Guide Bird: <span className="italic text-[#0D9488]">8-Stage Vector Arc</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-[#0A2540]/60 max-w-md">
            The guide bird is NOT a cartoon mascot or fantasy creature. It is an authentic coastal Brahminy/Kingfisher hybrid whose movement silently directs camera navigation across all 8 spatial beats.
          </p>
        </div>

        {/* 8-Stage Interactive Arc Tracker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: 8-Step Timeline Selector */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STORYBOARD_FRAMES.map((frame, index) => {
              const isSelected = selectedFrameIndex === index;
              return (
                <button
                  key={frame.id}
                  onClick={() => setSelectedFrameIndex(index)}
                  className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 ${
                    isSelected
                      ? "border-[#0D9488] bg-[#FAF6EE] shadow-md ring-1 ring-[#0D9488]"
                      : "border-[#0A2540]/10 bg-[#FAF7F0] hover:bg-[#FAF6EE] hover:border-[#0A2540]/20"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className={`text-[10px] font-mono font-bold ${isSelected ? "text-[#0D9488]" : "text-[#0A2540]/50"}`}>
                      FRAME 0{frame.chapter}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-[#0D9488]" : "bg-[#0A2540]/20"}`} />
                  </div>
                  <div>
                    <span className="text-xs font-serif font-bold text-[#0A2540] block line-clamp-1">
                      {frame.title.split('&')[0].split('·')[0]}
                    </span>
                    <span className="text-[10px] font-mono text-[#0A2540]/70 mt-1 block line-clamp-1">
                      {frame.character.state}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Selected Bird State Detail Card */}
          <div className="lg:col-span-5 p-6 rounded-2xl border border-[#0D9488]/20 bg-[#FAF6EE] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#0A2540]/10 pb-3 mb-4">
                <span className="text-xs font-mono font-bold text-[#0D9488] uppercase tracking-wider">
                  {currentFrame.chapterCode} CHARACTER TELEMETRY
                </span>
                <span className="text-[10px] font-mono text-[#0A2540]/60">
                  {currentFrame.timeOfDay}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#0A2540]/50 block">Bird Posture & State</span>
                  <p className="font-serif text-lg text-[#0A2540] font-bold">
                    {currentFrame.character.state}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#0A2540]/50 block">Spatial Position</span>
                  <p className="text-xs font-sans text-[#0A2540]/80">
                    {currentFrame.character.position}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#0A2540]/50 block">Action & Flight Vector</span>
                  <p className="text-xs font-sans text-[#0A2540]/80">
                    {currentFrame.character.action}
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-[#0D9488]/20 bg-[#0D9488]/5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#0D9488] font-bold block mb-0.5">Narrative Directive</span>
                  <p className="text-xs font-serif italic text-[#0A2540]">
                    "{currentFrame.character.meaning}"
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Feather Palette Chips */}
            <div className="mt-4 pt-3 border-t border-[#0A2540]/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#0A2540]/50 uppercase">Plumage Palette</span>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-black/10 bg-[#0D9488]" title="Iridescent Turquoise" />
                <span className="w-3.5 h-3.5 rounded-full border border-black/10 bg-[#1E40AF]" title="Cobalt Marine" />
                <span className="w-3.5 h-3.5 rounded-full border border-black/10 bg-[#F2ECE1]" title="Sandy Breast Feather" />
                <span className="w-3.5 h-3.5 rounded-full border border-black/10 bg-[#071A2B]" title="Dark Wingtip Slate" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
