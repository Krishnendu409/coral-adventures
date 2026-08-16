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

    // Kinetic Luxury Entrance Timeline on Initial Load
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (telemetryRef.current) {
      tl.fromTo(
        telemetryRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.8 }
      );
    }

    if (wordmarkRef.current) {
      tl.fromTo(
        wordmarkRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "expo.out" },
        "-=0.5"
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.8 },
        "-=0.7"
      );
    }

    if (heroImageRef.current) {
      tl.fromTo(
        heroImageRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" },
        "-=0.7"
      );
    }

    if (postcardRef.current) {
      tl.fromTo(
        postcardRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.2)" },
        "-=0.7"
      );
    }

    if (ticketRef.current) {
      tl.fromTo(
        ticketRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.2)" },
        "-=0.7"
      );
    }

    if (preludeRef.current) {
      tl.fromTo(
        preludeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="arrival"
      className="relative w-full bg-[#FAF6EE] text-[#0A2540] pt-24 sm:pt-28 lg:pt-32 pb-24 sm:pb-32 overflow-hidden border-b border-[#E2D9C8]"
    >
      <PaperTexture opacity={0.03} />

      {/* 1. Header Telemetry Bar (Clearance from fixed navbar) */}
      <div ref={telemetryRef} className="relative w-full px-6 sm:px-10 lg:px-14 mb-6 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-sans tracking-[0.26em] uppercase border-y border-[#0A2540]/12 py-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7] animate-pulse" />
            <span className="font-bold text-[#0A2540]">01 / ARRIVAL · MALPE HARBOR</span>
            <span className="text-[#0A2540]/30">·</span>
            <span className="text-[#0A2540]/70 font-mono font-medium">{WAYPOINTS.malpeHarbor.coords}</span>
          </div>
          <div className="flex items-center gap-4 font-semibold">
            <span className="text-[#1E40AF]">ARABIAN SEA EXPEDITION</span>
            <span className="text-[#0284C7]">OCT — MAY CALM WINDOW</span>
          </div>
        </div>
      </div>

      {/* 2. Hero Stage: Wordmark Layered BEHIND Hero Image (z-0 Wordmark, z-10 Image) */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mt-4">
        <div className="relative w-full">

          {/* Colossal Display Serif Wordmark BEHIND THE HERO IMAGE (z-0) */}
          <div className="relative lg:absolute top-0 left-0 w-full z-0 pointer-events-none select-none">
            <h1
              ref={wordmarkRef}
              className="font-serif text-[12vw] sm:text-[11.5vw] lg:text-[10.5vw] text-[#0A2540] leading-[0.82] tracking-[-0.035em] uppercase drop-shadow-xs"
            >
              CORAL ADVENTURES
            </h1>
            <div ref={subtitleRef} className="flex items-center justify-between mt-2 pt-2 border-t border-[#0A2540]/12 max-w-xl pointer-events-auto">
              <span className="font-serif text-2xl sm:text-3xl text-[#0284C7] italic font-normal">
                The coast is only the beginning.
              </span>
              <span className="text-[10.5px] font-mono tracking-[0.25em] text-[#0A2540]/70 uppercase font-medium">
                {WAYPOINTS.malpeHarbor.coords}
              </span>
            </div>
          </div>

          {/* Main Hero Image Overlapping in Front (Right-aligned 78% width, z-10) */}
          <div className="relative w-full lg:w-[78%] lg:ml-auto pt-[4vw] lg:pt-[6vw] z-10">
            <div
              ref={heroImageRef}
              className="group relative w-full h-[48vh] sm:h-[60vh] lg:h-[68vh] overflow-hidden postcard-shadow border border-[#E2D9C8] bg-[#F2ECE1]"
            >
              <Image
                src="/images/hero_ocean.jpg"
                alt="Golden hour coastline in Malpe with soft waves crashing on sandy shores"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/30 via-transparent to-transparent pointer-events-none" />

              {/* Plate 01.A Caption */}
              <div className="absolute bottom-4 right-4 bg-[#FAF6EE]/95 backdrop-blur-xs text-[#0A2540] px-4 py-2 text-[9.5px] font-sans tracking-[0.22em] uppercase font-bold border border-[#E2D9C8] z-20">
                PLATE 01.A · MALPE HARBOR SHORELINE
              </div>
            </div>

            {/* Overlapping Postcard (Bottom Left, z-40) */}
            <div
              ref={postcardRef}
              className="absolute -bottom-16 -left-3 lg:-left-20 w-[88%] sm:w-[52%] lg:w-[380px] z-40 transition-transform duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:rotate-[-2deg] hover:z-50 cursor-pointer"
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
              className="absolute -bottom-12 right-4 lg:right-8 w-[82%] sm:w-[48%] lg:w-[340px] z-40 hidden sm:block transition-transform duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:rotate-[4deg] hover:z-50 cursor-pointer"
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
      <div ref={preludeRef} className="relative w-full px-6 sm:px-10 lg:px-14 mt-24 sm:mt-28 z-20">
        <div className="editorial-grid items-center justify-between border-t border-[#0A2540]/12 pt-10">
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-3">
            <span className="text-[10px] font-sans tracking-[0.26em] text-[#0284C7] uppercase font-bold">
              EXPEDITION ESSAY · PRELUDE
            </span>
            <p className="font-serif text-3xl sm:text-4xl text-[#0A2540] tracking-tight leading-snug">
              A living dossier of the Arabian Sea.
            </p>
            <p className="font-sans text-sm sm:text-base text-[#0A2540]/85 font-normal leading-relaxed max-w-xl">
              Before the open sea unfolds, there is the harbor: the scent of salt air, ancient basalt cliffs rising from turquoise water, and a 25.90M catamaran waiting at the pier.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5 flex flex-wrap items-center justify-start lg:justify-end gap-4 mt-6 lg:mt-0">
            <Link
              href="#coast"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#0A2540] text-[#FAF6EE] font-sans text-[11px] uppercase tracking-[0.24em] font-semibold hover:bg-[#0284C7] transition-colors shadow-md"
            >
              <span>COMMENCE EXPEDITION</span>
              <span>↓</span>
            </Link>
            <Link
              href="/journey"
              className="inline-flex items-center gap-3 px-7 py-3.5 border border-[#0A2540] text-[#0A2540] font-sans text-[11px] uppercase tracking-[0.24em] font-semibold hover:bg-[#0A2540] hover:text-[#FAF6EE] transition-colors shadow-xs"
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
