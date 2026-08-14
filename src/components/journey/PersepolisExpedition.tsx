"use client";

import React from "react";
import dynamic from "next/dynamic";

const Zone01Experience = dynamic(
  () => import("./zone01/Zone01Experience").then((mod) => mod.Zone01Experience),
  {
    ssr: false,
    loading: () => (
      <div 
        data-testid="world-scene-loading"
        className="relative w-full h-screen h-[100dvh] flex flex-col items-center justify-center bg-[#071A2B] text-[#FAF6EE] select-none"
      >
        <div className="flex flex-col items-center gap-6 max-w-sm text-center px-6">
          <div className="w-12 h-12 rounded-full border border-[#C5A059]/40 border-t-[#C5A059] animate-spin" />
          <div className="flex flex-col gap-2">
            <h1 className="font-serif text-xl sm:text-2xl text-[#FAF6EE] tracking-wide">
              CORAL ADVENTURES
            </h1>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#C5A059]">
              MALPE · 13°21′02″ N · 74°42′08″ E
            </p>
          </div>
          <div className="h-[1px] w-24 bg-[#C5A059]/30" />
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#FAF6EE]/50">
            PREPARING 3D DIGITAL TWIN...
          </p>
        </div>
      </div>
    ),
  }
);

export function PersepolisExpedition() {
  return <Zone01Experience />;
}

