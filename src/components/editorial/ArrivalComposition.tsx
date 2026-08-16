"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { WAYPOINTS } from "@/lib/expeditionData";
import { PostcardPlate } from "./ephemera/PostcardPlate";
import { BoardingPassStub } from "./ephemera/BoardingPassStub";
import { PaperTexture } from "./ephemera/PaperTexture";

export function ArrivalComposition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const postcardRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);
  const preludeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (telemetryRef.current) {
      tl.fromTo(
        telemetryRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8 }
      );
    }

    if (wordmarkRef.current) {
      tl.fromTo(
        wordmarkRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "expo.out" },
        "-=0.4"
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );
    }

    if (heroImageRef.current) {
      tl.fromTo(
        heroImageRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" },
        "-=0.6"
      );
    }

    if (postcardRef.current) {
      tl.fromTo(
        postcardRef.current,
        { opacity: 0, y: 25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.2)" },
        "-=0.7"
      );
    }

    if (ticketRef.current) {
      tl.fromTo(
        ticketRef.current,
        { opacity: 0, y: 25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.2)" },
        "-=0.7"
      );
    }

    if (preludeRef.current) {
      tl.fromTo(
        preludeRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="arrival"
      className="relative w-full bg-[#FAF6EE] text-[#0A2540] pt-20 sm:pt-24 lg:pt-28 pb-24 sm:pb-32 overflow-hidden border-b border-[#E2D9C8]"
    >
      <PaperTexture opacity={0.03} />

      {/* 1. Header Telemetry Bar */}
      <div ref={telemetryRef} className="relative w-full px-6 sm:px-10 lg:px-14 mb-4 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[9.5px] sm:text-[10px] font-sans tracking-[0.24em] uppercase border-y border-[#0A2540]/12 py-2.5">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
            <span className="font-semibold text-[#0A2540]">01 / ARRIVAL · MALPE HARBOR</span>
            <span className="text-[#0A2540]/30">·</span>
            <span className="text-[#0A2540]/70 font-mono">{WAYPOINTS.malpeHarbor.coords}</span>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <span className="text-[#1E40AF]">ARABIAN SEA EXPEDITION</span>
            <span className="text-[#0284C7] font-semibold">OCT — MAY CALM WINDOW</span>
          </div>
        </div>
      </div>

      {/* 2. Hero Stage: Wordmark IN FRONT OF IMAGE (z-30) */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mt-2">
        <div className="relative w-full">

          {/* Colossal Display Serif Wordmark IN FRONT OF IMAGE (z-30) */}
          <div className="relative lg:absolute -top-2 left-0 w-full z-30 pointer-events-none mb-4 lg:mb-0">
            <h1
              ref={wordmarkRef}
              className="font-serif text-[11vw] sm:text-[10vw] lg:text-[9.2vw] text-[#0A2540] leading-[0.82] tracking-[-0.03em] uppercase drop-shadow-xs select-none"
            >
              CORAL ADVENTURES
            </h1>
            <div ref={subtitleRef} className="flex items-center justify-between mt-1 pt-1.5 border-t border-[#0A2540]/10 max-w-xl pointer-events-auto">
              <span className="font-serif text-xl sm:text-2xl text-[#0284C7] italic font-light">
                The coast is only the beginning.
              </span>
              <span className="text-[9.5px] font-mono tracking-[0.25em] text-[#0A2540]/60 uppercase">
                {WAYPOINTS.malpeHarbor.coords}
              </span>
            </div>
          </div>

          {/* Main Hero Image (Right-aligned 78% width) */}
          <div className="relative w-full lg:w-[78%] lg:ml-auto pt-[2vw] lg:pt-[4.5vw] z-10">
            <div
              ref={heroImageRef}
              className="group relative w-full h-[46vh] sm:h-[58vh] lg:h-[66vh] overflow-hidden postcard-shadow border border-[#E2D9C8] bg-[#F2ECE1]"
            >
              <Image
                src="/images/hero_ocean.jpg"
                alt="Golden hour coastline in Malpe with soft waves crashing on sandy shores"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/25 via-transparent to-transparent pointer-events-none" />

              {/* Plate 01.A Caption */}
              <div className="absolute bottom-4 right-4 bg-[#FAF6EE]/95 backdrop-blur-xs text-[#0A2540] px-3.5 py-1.5 text-[8.5px] font-sans tracking-[0.2em] uppercase border border-[#E2D9C8] z-20">
                PLATE 01.A · MALPE HARBOR SHORELINE
              </div>
            </div>

            {/* Overlapping Postcard (Bottom Left, z-40) */}
            <div
              ref={postcardRef}
              className="absolute -bottom-14 -left-3 lg:-left-20 w-[85%] sm:w-[50%] lg:w-[370px] z-40 transition-transform duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:rotate-[-2deg] hover:z-50 cursor-pointer"
            >
              <PostcardPlate
                imageSrc="/images/shoreline_foam.jpg"
                imageAlt="Coastal surf waves and tropical palms at Malpe beach"
                title="Malpe Shores & Palm Groves"
                caption="Where golden sands meet the calm Arabian Sea tide."
                coords={WAYPOINTS.malpeHarbor.coords}
                stampLocation="MALPE"
                stampColor="ocean"
                rotationDeg={-4}
              />
            </div>

            {/* Overlapping Boarding Pass Stub (Bottom Right, z-40) */}
            <div
              ref={ticketRef}
              className="absolute -bottom-10 right-4 lg:right-8 w-[80%] sm:w-[45%] lg:w-[330px] z-40 hidden sm:block transition-transform duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:rotate-[4deg] hover:z-50 cursor-pointer"
            >
              <BoardingPassStub
                passNumber="CR-2026-MALPE"
                routeFrom="MALPE PIER"
                routeTo="ST. MARY'S ARCHIPELAGO"
                departureTime="DAILY EXPEDITIONS"
                vesselName="CORAL EXPLORER · 25.90M"
                season="OCTOBER — MAY CALM WINDOW"
                colorTheme="azure"
              />
            </div>

          </div>

        </div>
      </div>

      {/* 3. Narrative Prelude Bar */}
      <div ref={preludeRef} className="relative w-full px-6 sm:px-10 lg:px-14 mt-20 sm:mt-24 z-20">
        <div className="editorial-grid items-center justify-between border-t border-[#0A2540]/12 pt-8">
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-2">
            <span className="text-[9px] font-sans tracking-[0.24em] text-[#0284C7] uppercase font-bold">
              EXPEDITION ESSAY · PRELUDE
            </span>
            <p className="font-serif text-2xl sm:text-3xl text-[#0A2540] tracking-tight leading-snug">
              A living dossier of the Arabian Sea.
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#0A2540]/80 font-light leading-relaxed max-w-xl">
              Before the open sea unfolds, there is the harbor: the scent of salt air, ancient basalt cliffs rising from turquoise water, and a 25.90M catamaran waiting at the pier.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5 flex flex-wrap items-center justify-start lg:justify-end gap-4 mt-4 lg:mt-0">
            <Link
              href="#coast"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#0A2540] text-[#FAF6EE] font-sans text-[10px] uppercase tracking-[0.22em] font-semibold hover:bg-[#0284C7] transition-colors shadow-xs"
            >
              <span>COMMENCE EXPEDITION</span>
              <span>↓</span>
            </Link>
            <Link
              href="/journey"
              className="inline-flex items-center gap-2.5 px-6 py-3 border border-[#0A2540] text-[#0A2540] font-sans text-[10px] uppercase tracking-[0.22em] font-semibold hover:bg-[#0A2540] hover:text-[#FAF6EE] transition-colors"
            >
              <span>3D DIGITAL TWIN</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
