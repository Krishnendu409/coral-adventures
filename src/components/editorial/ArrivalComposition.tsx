"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WAYPOINTS } from "@/lib/expeditionData";
import { PostcardPlate } from "./ephemera/PostcardPlate";
import { BoardingPassStub } from "./ephemera/BoardingPassStub";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ArrivalComposition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const postcardRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Parallax drift on primary image & wordmark
    if (heroImageRef.current) {
      gsap.to(heroImageRef.current, {
        y: 50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    if (postcardRef.current) {
      gsap.to(postcardRef.current, {
        y: -35,
        rotate: -5,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }

    if (ticketRef.current) {
      gsap.to(ticketRef.current, {
        y: -25,
        rotate: 3,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="arrival"
      className="relative w-full bg-[#FAF6EE] text-[#0A2540] pt-24 sm:pt-28 pb-20 overflow-hidden border-b border-[#E2D9C8]"
    >
      {/* 1. Header Telemetry Bar & Journal Registration */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 mb-4 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase border-b border-[#0A2540]/15 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C2410C] animate-pulse" />
            <span className="font-bold text-[#C2410C]">01 / ARRIVAL · MALPE HARBOR</span>
            <span className="text-[#0A2540]/50 hidden sm:inline">·</span>
            <span className="text-[#0A2540]/80 hidden sm:inline">{WAYPOINTS.malpeHarbor.coords}</span>
          </div>
          <div className="flex items-center gap-4 text-[#0A2540]/70 font-semibold">
            <span className="text-[#1E40AF]">ARABIAN SEA EXPEDITION</span>
            <span className="text-[#C2410C]">OCT — MAY CALM SEA SEASON</span>
          </div>
        </div>
      </div>

      {/* 2. Colossal Display Serif Typography: CORAL ADVENTURES */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 z-10 select-none pointer-events-none overflow-visible">
        <h1
          ref={wordmarkRef}
          className="font-serif text-[11vw] sm:text-[9.5vw] lg:text-[8.5vw] text-[#0A2540] leading-[0.82] tracking-[-0.03em] uppercase will-change-transform"
        >
          CORAL ADVENTURES
        </h1>
      </div>

      {/* 3. Asymmetrical Photographic Collage + Physical Ephemera */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 -mt-4 sm:-mt-8 lg:-mt-10 z-20">
        <div className="editorial-grid items-start relative">
          
          {/* Primary Coastal Photographic Frame (Columns 3-12) */}
          <div className="col-span-12 lg:col-start-3 lg:col-span-10 relative">
            <div
              ref={heroImageRef}
              className="relative w-full h-[52vh] sm:h-[65vh] lg:h-[76vh] overflow-hidden postcard-shadow border border-[#E2D9C8] will-change-transform bg-[#F2ECE1]"
            >
              <Image
                src="/images/hero_ocean.jpg"
                alt="Golden hour coastline in Malpe with soft waves crashing on sandy shores"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 85vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Photo Caption Pill */}
              <div className="absolute bottom-4 right-4 bg-[#FAF6EE]/95 backdrop-blur-xs text-[#0A2540] px-3.5 py-1.5 text-[9px] font-mono tracking-[0.2em] uppercase border border-[#E2D9C8]">
                PLATE 01.A · MALPE HARBOR SHORELINE
              </div>
            </div>
          </div>

          {/* Physical Ephemera 1: Tilted Malpe Postcard (Collides from bottom-left Columns 1-5) */}
          <div
            ref={postcardRef}
            className="col-span-10 sm:col-span-6 lg:col-span-5 relative -mt-20 sm:-mt-32 lg:-mt-48 z-30 pointer-events-auto"
          >
            <PostcardPlate
              imageSrc="/images/shoreline_foam.jpg"
              imageAlt="Coastal surf waves and tropical palms at Malpe beach"
              title="Malpe Shores & Palm Groves"
              caption="Where golden sands meet the calm Arabian Sea tide."
              coords={WAYPOINTS.malpeHarbor.coords}
              stampLocation="MALPE"
              stampColor="coral"
              rotationDeg={-3}
            />
          </div>

          {/* Physical Ephemera 2: Boarding Pass Stub + Narrative (Columns 7-12) */}
          <div
            ref={ticketRef}
            className="col-span-12 lg:col-start-7 lg:col-span-6 relative mt-6 lg:-mt-24 z-30 flex flex-col gap-6"
          >
            <BoardingPassStub
              passNumber="CR-2026-MALPE"
              routeFrom="MALPE PIER"
              routeTo="ST. MARY'S ARCHIPELAGO"
              departureTime="DAILY EXPEDITIONS"
              vesselName="CORAL EXPLORER · 25.90M"
              season="OCTOBER — MAY CALM WINDOW"
              colorTheme="coral"
            />

            <div className="p-6 bg-[#F7F3E9] border border-[#E2D9C8] postcard-shadow">
              <span className="text-[10px] font-mono tracking-[0.22em] text-[#C2410C] uppercase font-bold block mb-2">
                EXPEDITION ESSAY · PRELUDE
              </span>
              <p className="font-serif text-2xl sm:text-3xl text-[#0A2540] leading-snug tracking-tight mb-3">
                The coast is only the beginning.
              </p>
              <p className="font-sans text-sm sm:text-base text-[#0A2540]/80 leading-relaxed font-light mb-5">
                Before the open Arabian Sea unfolds, there is the harbor: the scent of salt air, ancient basalt cliffs rising from turquoise water, and a 25.90M catamaran waiting at the pier.
              </p>
              
              {/* Printed Editorial Instruction Links */}
              <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-[#0A2540]/10">
                <Link
                  href="#coast"
                  className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#0A2540] font-semibold hover:text-[#C2410C] transition-colors group"
                >
                  <span>COMMENCE EXPEDITION</span>
                  <span className="inline-block transition-transform group-hover:translate-y-0.5">↓</span>
                </Link>
                <Link
                  href="/journey"
                  className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#C2410C] font-semibold hover:text-[#0A2540] transition-colors group"
                >
                  <span>3D DIGITAL TWIN</span>
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
