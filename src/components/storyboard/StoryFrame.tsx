"use client";

import React from "react";
import Image from "next/image";
import { StoryboardFrameData } from "@/data/storyboardData";
import { DroneFormationSimulator } from "./DroneFormationSimulator";
import { TapeStrip } from "@/components/editorial/ephemera/TapeStrip";
import { ExpeditionStamp } from "@/components/editorial/ephemera/ExpeditionStamp";

interface StoryFrameProps {
  frame: StoryboardFrameData;
  isLast: boolean;
}

export function StoryFrame({ frame, isLast }: StoryFrameProps) {
  const isNightTheme = frame.chapter >= 7;

  return (
    <article
      id={frame.id}
      className={`relative w-full py-16 sm:py-24 border-b transition-colors duration-500 overflow-hidden ${
        isNightTheme
          ? "bg-[#071A2B] text-[#FAF6EE] border-white/10"
          : "bg-[#FAF7F0] text-[#0A2540] border-[#0A2540]/10"
      }`}
    >
      {/* Background Architectural Blueprint Grid */}
      <div 
        className={`absolute inset-0 pointer-events-none ${isNightTheme ? "opacity-[0.03]" : "opacity-[0.025]"}`}
        style={{
          backgroundImage: `
            linear-gradient(to right, ${isNightTheme ? "#FAF6EE" : "#0A2540"} 1px, transparent 1px),
            linear-gradient(to bottom, ${isNightTheme ? "#FAF6EE" : "#0A2540"} 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Frame Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 mb-8 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-1 rounded font-bold uppercase tracking-widest text-[11px] ${
              isNightTheme ? "bg-[#25C4C0]/15 text-[#25C4C0] border border-[#25C4C0]/30" : "bg-[#E05A36]/10 text-[#E05A36] border border-[#E05A36]/30"
            }`}>
              {frame.chapterCode}
            </span>
            <span className={isNightTheme ? "text-white/60" : "text-[#0A2540]/60"}>
              LOC: <strong className={isNightTheme ? "text-white" : "text-[#0A2540]"}>{frame.location}</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className={isNightTheme ? "text-white/50" : "text-[#0A2540]/50"}>
              TIME: <strong className={isNightTheme ? "text-white" : "text-[#0A2540]"}>{frame.timeOfDay}</strong>
            </span>
            <span className="hidden sm:inline text-current opacity-30">·</span>
            <span className={isNightTheme ? "text-[#38BDF8]" : "text-[#1E40AF]"}>
              {frame.coordinates}
            </span>
          </div>
        </div>

        {/* Frame Title & Mood Strip */}
        <div className="mb-8">
          <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight mb-2 ${
            isNightTheme ? "text-white" : "text-[#0A2540]"
          }`}>
            {frame.title}
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="text-[#E05A36] font-bold uppercase tracking-wider">MOOD:</span>
            <span className={isNightTheme ? "text-white/80" : "text-[#0A2540]/80"}>{frame.mood}</span>
            <span className="opacity-30">·</span>
            <span className="text-[#0D9488] font-bold uppercase tracking-wider">TEMP:</span>
            <span className={isNightTheme ? "text-white/80" : "text-[#0A2540]/80"}>{frame.colorTemperature}</span>
          </div>
        </div>

        {/* Visual Composition: Hero Image Plate & Detail Crops */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Main Hero Photographic Composition (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className={`relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border ${
              isNightTheme ? "border-white/15 bg-black" : "border-[#0A2540]/15 bg-[#FAF6EE]"
            }`}>
              <Image
                src={frame.heroImage}
                alt={frame.heroImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority={frame.chapter === 1}
              />

              {/* Film Grain & Subtle Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* On-Image Telemetry Stamp */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-[10px] font-mono select-none drop-shadow-md">
                <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded border border-white/20">
                  HERO COMPOSITION · {frame.chapterCode}
                </span>
                <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded border border-white/20 hidden sm:inline">
                  {frame.camera.lens} · {frame.camera.height}
                </span>
              </div>
            </div>

            {/* Frame 08 Special Feature: 300-Drone Swarm Interactive Simulator */}
            {frame.chapter === 8 && (
              <div className="mt-8">
                <DroneFormationSimulator />
              </div>
            )}
          </div>

          {/* Supporting Detail Crops & Ephemera Plate (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {frame.supportingImages.map((crop, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl border shadow-sm relative ${
                  isNightTheme ? "bg-white/5 border-white/10" : "bg-[#FAF7F0] border-[#0A2540]/10"
                }`}
              >
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-2.5">
                  <Image
                    src={crop.src}
                    alt={crop.caption}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-mono font-bold text-white uppercase tracking-wider">
                    {crop.tag}
                  </div>
                </div>
                <p className={`text-[11px] font-sans leading-tight ${isNightTheme ? "text-white/70" : "text-[#0A2540]/70"}`}>
                  {crop.caption}
                </p>
              </div>
            ))}

            {/* Tactile Palette Chips */}
            <div className={`p-4 rounded-2xl border ${isNightTheme ? "bg-white/5 border-white/10" : "bg-[#FAF7F0] border-[#0A2540]/10"}`}>
              <span className={`text-[10px] font-mono uppercase tracking-wider font-bold block mb-2.5 ${
                isNightTheme ? "text-white/60" : "text-[#0A2540]/60"
              }`}>
                FRAME 0{frame.chapter} CHROMATIC PALETTE
              </span>
              <div className="grid grid-cols-5 gap-2">
                {frame.palette.map((p, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 text-center">
                    <div
                      className="w-full h-8 rounded-lg border border-black/10 shadow-inner"
                      style={{ backgroundColor: p.hex }}
                      title={`${p.name} (${p.hex})`}
                    />
                    <span className="text-[8px] font-mono text-current opacity-60 line-clamp-1">
                      {p.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4-Panel Production Analysis Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 text-xs">
          {/* Panel 1: Story & Narrative Action */}
          <div className={`p-5 rounded-2xl border ${isNightTheme ? "bg-white/5 border-white/10" : "bg-[#FAF7F0] border-[#0A2540]/10"}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E05A36]" />
              <span className="font-mono font-bold uppercase tracking-wider text-[10px] text-[#E05A36]">01. NARRATIVE ACTION</span>
            </div>
            <p className={`font-sans leading-relaxed text-[12.5px] ${isNightTheme ? "text-white/80" : "text-[#0A2540]/85"}`}>
              {frame.story}
            </p>
          </div>

          {/* Panel 2: Director's Camera Telemetry */}
          <div className={`p-5 rounded-2xl border ${isNightTheme ? "bg-white/5 border-white/10" : "bg-[#FAF7F0] border-[#0A2540]/10"}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span className="font-mono font-bold uppercase tracking-wider text-[10px] text-[#38BDF8]">02. CAMERA TELEMETRY</span>
            </div>
            <ul className={`font-mono text-[10.5px] space-y-1.5 ${isNightTheme ? "text-white/70" : "text-[#0A2540]/75"}`}>
              <li><strong>LENS:</strong> {frame.camera.lens} ({frame.camera.aperture})</li>
              <li><strong>HEIGHT:</strong> {frame.camera.height}</li>
              <li><strong>FOV:</strong> {frame.camera.fov}° perspective</li>
              <li><strong>MOVE:</strong> {frame.camera.movement}</li>
              <li><strong>FOCUS:</strong> {frame.camera.focusTarget}</li>
            </ul>
          </div>

          {/* Panel 3: Environmental Analysis */}
          <div className={`p-5 rounded-2xl border ${isNightTheme ? "bg-white/5 border-white/10" : "bg-[#FAF7F0] border-[#0A2540]/10"}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span className="font-mono font-bold uppercase tracking-wider text-[10px] text-[#10B981]">03. ENVIRONMENT & SPACE</span>
            </div>
            <p className={`font-sans leading-relaxed text-[12px] mb-2 ${isNightTheme ? "text-white/80" : "text-[#0A2540]/80"}`}>
              {frame.environment}
            </p>
            <div className="pt-2 border-t border-current/10 text-[10px] font-mono text-current/60">
              <strong>FOG:</strong> {frame.lighting.fogDensity}
            </div>
          </div>

          {/* Panel 4: Guide Bird Vector */}
          <div className={`p-5 rounded-2xl border ${isNightTheme ? "bg-white/5 border-white/10" : "bg-[#FAF7F0] border-[#0A2540]/10"}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
              <span className="font-mono font-bold uppercase tracking-wider text-[10px] text-[#0D9488]">04. GUIDE BIRD VECTOR</span>
            </div>
            <div className="space-y-1.5 text-[11px] font-sans">
              <div>
                <span className="font-mono text-[9px] uppercase text-current/50 block">STATE</span>
                <strong className={isNightTheme ? "text-white" : "text-[#0A2540]"}>{frame.character.state}</strong>
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase text-current/50 block">DIRECTIVE</span>
                <p className="font-serif italic text-current/80">"{frame.character.meaning}"</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Production Asset Breakdown Table */}
        <div className={`p-6 rounded-2xl border mb-10 ${
          isNightTheme ? "bg-white/5 border-white/10" : "bg-[#FAF6EE] border-[#0A2540]/10"
        }`}>
          <div className="flex items-center justify-between border-b border-current/10 pb-3 mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">
              REQUIRED 3D PRODUCTION ASSETS ({frame.assets.length} ASSETS)
            </span>
            <span className="text-[10px] font-mono text-current/50">
              POLYGON BUDGETS & SHADER REQUIREMENTS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {frame.assets.map((asset, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border text-xs ${
                  isNightTheme ? "bg-black/20 border-white/10" : "bg-[#FAF7F0] border-[#0A2540]/10"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    asset.type === "HERO ASSET"
                      ? "bg-[#E05A36]/15 text-[#E05A36]"
                      : asset.type === "SPECIAL FX"
                      ? "bg-[#25C4C0]/15 text-[#25C4C0]"
                      : "bg-[#0A2540]/10 text-current"
                  }`}>
                    {asset.type}
                  </span>
                  <span className="text-[9px] font-mono text-current/50">{asset.polyTarget}</span>
                </div>
                <strong className="block text-[12px] font-sans font-semibold mb-1 text-current">
                  {asset.name}
                </strong>
                <p className="text-[10.5px] font-sans text-current/70 leading-normal">
                  {asset.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Frame Handoff & Transition Note Bridge */}
        {!isLast && (
          <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs ${
            isNightTheme ? "bg-[#25C4C0]/10 border-[#25C4C0]/30 text-white" : "bg-[#E05A36]/5 border-[#E05A36]/20 text-[#0A2540]"
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                isNightTheme ? "bg-[#25C4C0] text-[#071A2B]" : "bg-[#E05A36] text-white"
              }`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider block opacity-70">
                  TRANSITION TO FRAME 0{frame.chapter + 1}
                </span>
                <span className="font-mono font-bold text-xs sm:text-sm">
                  {frame.transitionOut.summary}
                </span>
              </div>
            </div>
            <p className="text-[11px] font-sans opacity-80 max-w-md sm:text-right">
              {frame.transitionOut.cameraAction}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
