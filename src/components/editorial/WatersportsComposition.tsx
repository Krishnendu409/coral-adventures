"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BoardingPassStub } from "./ephemera/BoardingPassStub";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function WatersportsComposition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const waveCrestRef = useRef<HTMLDivElement>(null);
  const underwaterRef = useRef<HTMLDivElement>(null);
  const titleWaterRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (waveCrestRef.current) {
      gsap.to(waveCrestRef.current, {
        y: 25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }

    if (underwaterRef.current) {
      gsap.to(underwaterRef.current, {
        y: -30,
        rotate: 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="watersports"
      className="relative w-full bg-[#FAF6EE] text-[#0A2540] py-20 sm:py-28 overflow-hidden border-b border-[#E2D9C8]"
    >
      {/* 1. Header Telemetry Bar */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[9px] sm:text-[10px] font-sans tracking-[0.24em] uppercase border-b border-[#0A2540]/12 pb-2.5">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#0D9488]" />
            <span className="font-semibold text-[#0D9488]">03 / THE WATER · ACTIVE EXPEDITION DYNAMICS</span>
          </div>
          <div className="flex items-center gap-4 text-[#0A2540]/70 font-medium">
            <span>VELOCITY: 24 KNOTS</span>
            <span className="text-[#0D9488]">TURQUOISE SHALLOWS</span>
          </div>
        </div>
      </div>

      {/* 2. Editorial Headline & Introduction */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-10 mb-8">
        <div className="editorial-grid items-start">
          <div className="col-span-12 lg:col-span-7">
            <h2
              ref={titleWaterRef}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0A2540] leading-[0.95] tracking-tight uppercase"
            >
              Water moves.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 pt-2">
            <p className="font-sans text-xs sm:text-sm text-[#0A2540]/80 leading-relaxed font-light max-w-lg">
              Beyond the harbor breakwater, the calm lagoon between Malpe and St. Mary’s becomes an active aquatic playground—sheltered shallows for high-speed jet ski runs, parasail tows, and ocean kayaking.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Photographic Composition + Ephemera */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-20">
        <div className="editorial-grid items-start relative">
          
          {/* Primary Wave Crest Image (Columns 2-11) */}
          <div className="col-span-12 lg:col-start-2 lg:col-span-10 relative">
            <div
              ref={waveCrestRef}
              className="relative w-full h-[46vh] sm:h-[56vh] lg:h-[64vh] overflow-hidden bg-[#F2ECE1] border border-[#E2D9C8] will-change-transform"
            >
              <Image
                src="/images/wave_foam_crest.jpg"
                alt="Turquoise ocean waves with dynamic sea foam cresting under tropical sunlight"
                fill
                sizes="(max-width: 1024px) 100vw, 85vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/35 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-4 left-4 bg-[#FAF6EE]/95 backdrop-blur-xs text-[#0A2540] px-3.5 py-1.5 text-[8.5px] font-sans tracking-[0.2em] uppercase border border-[#E2D9C8]">
                HYDRODYNAMIC SPRAY · MALPE SPEED HORIZON
              </div>
            </div>
          </div>

          {/* Colliding Underwater Crystalline Marine Frame (Columns 6-12) */}
          <div
            ref={underwaterRef}
            className="col-span-11 sm:col-span-7 lg:col-start-6 lg:col-span-6 relative -mt-16 sm:-mt-24 lg:-mt-36 z-30 pointer-events-auto"
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#FAF6EE] p-2.5 sm:p-3 border border-[#E2D9C8] shadow-xl">
              <div className="relative w-full h-full overflow-hidden bg-[#F2ECE1]">
                <Image
                  src="/images/underwater_marine.jpg"
                  alt="Clear turquoise underwater view with sunlight rays piercing through crystalline tropical Arabian Sea water"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-[8px] sm:text-[8.5px] font-mono tracking-[0.16em] text-[#0A2540]/70 uppercase">
                <span>PLATE 03.B · REEF CLARITY</span>
                <span>VISIBILITY: 18 METERS</span>
              </div>
            </div>
          </div>

          {/* Ephemera: Watersports Activity Ticket Stub (Columns 1-5) */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-5 relative mt-6 lg:-mt-20 z-30">
            <BoardingPassStub
              passNumber="ACT-03-TURQUOISE"
              routeFrom="TENDER LAUNCH"
              routeTo="OPEN REEF SHALLOWS"
              departureTime="ON-DEMAND WATERSPORTS"
              vesselName="PARASAIL · SEA TENDER · KAYAK"
              season="ST. MARY'S ARCHIPELAGO"
              colorTheme="cyan"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
