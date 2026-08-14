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
import { RegistrationMark } from "./ephemera/RegistrationMark";
import { TapeStrip } from "./ephemera/TapeStrip";
import { PaperTexture } from "./ephemera/PaperTexture";

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

    // Parallax motion
    if (heroImageRef.current) {
      gsap.to(heroImageRef.current, {
        y: 40,
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
        y: -30,
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
        y: -20,
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
      className="relative w-full bg-[#FAF6EE] text-[#0A2540] pt-20 sm:pt-24 pb-20 overflow-hidden border-b border-[#E2D9C8]"
    >
      <PaperTexture opacity={0.03} />

      {/* 1. Print Dossier Header Telemetry Bar */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 mb-6 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase border-b border-[#0A2540]/15 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C2410C] animate-pulse" />
            <span className="font-bold text-[#C2410C]">CORAL ADVENTURES 01 / MALPE</span>
            <span className="text-[#0A2540]/40 hidden sm:inline">·</span>
            <span className="text-[#0A2540]/80 hidden sm:inline">{WAYPOINTS.malpeHarbor.coords}</span>
          </div>
          <div className="flex items-center gap-4 text-[#0A2540]/70 font-semibold">
            <RegistrationMark label="CROP 01.A" />
            <span className="text-[#1E40AF]">ARABIAN SEA EXPEDITION</span>
          </div>
        </div>
      </div>

      {/* 2. Hero Stage: Image & Wordmark Stacking */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 z-20">
        <div className="relative w-full">
          
          {/* Colossal Display Serif Wordmark IN FRONT OF IMAGES (z-40) */}
          <div className="relative lg:absolute top-0 left-0 w-full z-40 select-none pointer-events-none mb-4 lg:mb-0">
            <h1
              ref={wordmarkRef}
              className="font-serif text-[11vw] sm:text-[9.5vw] lg:text-[8.5vw] text-[#0A2540] leading-[0.82] tracking-[-0.03em] uppercase drop-shadow-md"
            >
              CORAL ADVENTURES
            </h1>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#0A2540]/10 max-w-xl">
              <span className="font-serif text-xl sm:text-2xl text-[#C2410C] italic font-light">
                The coast is only the beginning.
              </span>
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#0A2540]/60 uppercase">
                {WAYPOINTS.malpeHarbor.coords}
              </span>
            </div>
          </div>

          {/* Primary Coastal Photographic Frame (z-20 underneath wordmark) */}
          <div className="w-full lg:pt-[6.5vw] z-20">
            <div
              ref={heroImageRef}
              className="relative w-full h-[48vh] sm:h-[60vh] lg:h-[68vh] overflow-hidden postcard-shadow border border-[#E2D9C8] bg-[#F2ECE1]"
            >
              <Image
                src="/images/hero_ocean.jpg"
                alt="Golden hour coastline in Malpe with soft waves crashing on sandy shores"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 85vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/30 via-transparent to-transparent pointer-events-none" />
              
              {/* Photo Tape Strip & Caption */}
              <TapeStrip className="absolute top-3 left-6 z-30" rotationDeg={-3} widthPx={80} />
              <div className="absolute bottom-4 right-4 bg-[#FAF6EE]/95 backdrop-blur-xs text-[#0A2540] px-3.5 py-1.5 text-[9px] font-mono tracking-[0.2em] uppercase border border-[#E2D9C8]">
                PLATE 01.A · MALPE HARBOR SHORELINE
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Asymmetrical Physical Ephemera Collage */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 mt-8 sm:mt-12 lg:mt-16 z-30">
        <div className="editorial-grid items-start relative">
          
          {/* Ephemera 1: Tilted Postcard */}
          <div
            ref={postcardRef}
            className="col-span-10 sm:col-span-6 lg:col-span-5 relative z-30 pointer-events-auto"
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

          {/* Ephemera 2: Boarding Pass Stub + Prelude Essay */}
          <div
            ref={ticketRef}
            className="col-span-12 lg:col-start-7 lg:col-span-6 relative z-30 flex flex-col gap-6"
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

            <div className="p-6 bg-[#F7F3E9] border border-[#E2D9C8] postcard-shadow relative">
              <TapeStrip className="absolute -top-3 right-8" rotationDeg={2} widthPx={70} />
              <span className="text-[10px] font-mono tracking-[0.22em] text-[#C2410C] uppercase font-bold block mb-2">
                EXPEDITION ESSAY · PRELUDE
              </span>
              <p className="font-serif text-2xl sm:text-3xl text-[#0A2540] leading-snug tracking-tight mb-3">
                A living dossier of the Arabian Sea.
              </p>
              <p className="font-sans text-sm sm:text-base text-[#0A2540]/80 leading-relaxed font-light mb-5">
                Before the open sea unfolds, there is the harbor: the scent of salt air, ancient basalt cliffs rising from turquoise water, and a 25.90M catamaran waiting at the pier.
              </p>
              
              <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-[#0A2540]/10">
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
