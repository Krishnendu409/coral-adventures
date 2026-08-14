"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WAYPOINTS } from "@/lib/expeditionData";
import { ExpeditionStamp } from "./ephemera/ExpeditionStamp";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function NauticalChartComposition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const wakeRef = useRef<SVGPathElement>(null);
  const [activePoint, setActivePoint] = useState<string>("coconutIsland");

  useGSAP(() => {
    if (!sectionRef.current || !routeRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const pathLength = typeof routeRef.current.getTotalLength === 'function' ? routeRef.current.getTotalLength() : 1000;
    
    gsap.set(routeRef.current, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    if (wakeRef.current) {
      gsap.set(wakeRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1.5,
      },
    });

    tl.to(routeRef.current, {
      strokeDashoffset: 0,
      ease: "none",
    });

    if (wakeRef.current) {
      tl.to(wakeRef.current, {
        strokeDashoffset: 0,
        ease: "none",
      }, 0.2);
    }
  }, { scope: sectionRef });

  const waypoints = [
    {
      key: "malpeHarbor",
      data: WAYPOINTS.malpeHarbor,
      cx: "18%",
      cy: "65%",
      label: "WP 01 · MALPE DEPARTURE",
    },
    {
      key: "dariaBahadurgad",
      data: WAYPOINTS.dariaBahadurgad,
      cx: "42%",
      cy: "45%",
      label: "WP 02 · DARIA-BAHADURGAD",
    },
    {
      key: "coconutIsland",
      data: WAYPOINTS.coconutIsland,
      cx: "68%",
      cy: "35%",
      label: "WP 03 · ST. MARY'S ISLES",
    },
    {
      key: "openArabianSea",
      data: WAYPOINTS.openArabianSea,
      cx: "90%",
      cy: "20%",
      label: "WP 04 · ARABIAN HORIZON",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="chart"
      className="relative w-full bg-[#FAF6EE] text-[#0A2540] py-24 sm:py-32 overflow-hidden border-b border-[#E2D9C8]"
    >
      {/* 1. Header Telemetry Bar */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase border-b border-[#0A2540]/15 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C2410C]" />
            <span className="font-bold text-[#C2410C]">04 / THE CHART · NAUTICAL EXPEDITION TRAJECTORY</span>
          </div>
          <div className="flex items-center gap-4 text-[#0A2540]/70 font-semibold">
            <span className="text-[#1E40AF]">HYDROGRAPHIC SURVEY</span>
            <span>CHART 2026-MALPE</span>
          </div>
        </div>
      </div>

      {/* 2. Colossal Headline */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 z-20 mb-8">
        <div className="editorial-grid items-start">
          <div className="col-span-12 lg:col-span-9">
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-[7vw] text-[#0A2540] leading-[0.88] tracking-tight uppercase">
              THE ROUTE
              <br />
              BECOMES
              <br />
              THE WAKE.
            </h2>
            <div className="w-20 h-[3px] bg-[#C2410C] my-6" />
          </div>
          <div className="col-span-12 lg:col-span-3 flex lg:justify-end">
            <ExpeditionStamp location="MALPE CHART" coords="HYDRO 2026" color="ocean" />
          </div>
        </div>
      </div>

      {/* 3. Tactile Expedition Chart Map Surface */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 z-10">
        <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[78vh] bg-[#F7F3E9] border border-[#E2D9C8] postcard-shadow p-4 sm:p-8 overflow-hidden">
          
          {/* Subtle Cartographic Grid & Compass Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #0A2540 1px, transparent 1px), linear-gradient(to bottom, #0A2540 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Compass Rose Accent */}
          <div className="absolute top-6 right-6 opacity-30 select-none pointer-events-none hidden sm:block">
            <div className="w-24 h-24 border border-[#0A2540] rounded-full flex items-center justify-center relative">
              <span className="absolute top-1 text-[8px] font-mono font-bold">N</span>
              <span className="absolute bottom-1 text-[8px] font-mono font-bold">S</span>
              <span className="absolute left-1 text-[8px] font-mono font-bold">W</span>
              <span className="absolute right-1 text-[8px] font-mono font-bold">E</span>
              <div className="w-[1px] h-full bg-[#0A2540]" />
              <div className="h-[1px] w-full bg-[#0A2540]" />
            </div>
          </div>

          {/* SVG Cartographic Expedition Route */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >
            {/* Ambient Water Depth Contours */}
            <path
              d="M 50 500 Q 300 450 600 350 T 950 150"
              fill="none"
              stroke="#1E40AF"
              strokeWidth="1"
              strokeDasharray="4 8"
              opacity="0.25"
            />
            <path
              d="M 80 550 Q 350 480 650 380 T 980 200"
              fill="none"
              stroke="#0D9488"
              strokeWidth="1"
              strokeDasharray="4 8"
              opacity="0.2"
            />

            {/* Catamaran Foaming Wake Line */}
            <path
              ref={wakeRef}
              d="M 180 390 Q 420 270 680 210 T 900 120"
              fill="none"
              stroke="#0D9488"
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.35"
            />

            {/* Primary Coral Expedition Route Line */}
            <path
              ref={routeRef}
              d="M 180 390 Q 420 270 680 210 T 900 120"
              fill="none"
              stroke="#C2410C"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Waypoint Markers */}
          {waypoints.map((wp) => {
            const isSelected = activePoint === wp.key;
            return (
              <button
                key={wp.key}
                onClick={() => setActivePoint(wp.key)}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group focus:outline-hidden"
                style={{ left: wp.cx, top: wp.cy }}
                aria-label={`Select ${wp.data.name}`}
              >
                <div className="relative flex items-center justify-center">
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      isSelected
                        ? "border-[#C2410C] bg-[#C2410C] text-white scale-125 shadow-lg"
                        : "border-[#0A2540] bg-[#FAF6EE] text-[#0A2540] group-hover:border-[#C2410C] group-hover:scale-110"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  </div>
                  
                  {/* Waypoint Label Tag */}
                  <div
                    className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 whitespace-nowrap text-[8px] sm:text-[9px] font-mono tracking-[0.2em] uppercase transition-all duration-300 ${
                      isSelected
                        ? "bg-[#0A2540] text-[#FAF6EE] shadow-md z-30"
                        : "bg-[#FAF6EE]/95 text-[#0A2540] border border-[#E2D9C8] group-hover:bg-[#0A2540] group-hover:text-[#FAF6EE]"
                    }`}
                  >
                    {wp.label}
                  </div>
                </div>
              </button>
            );
          })}

          {/* Active Waypoint Detail Drawer */}
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-[#FAF6EE]/95 backdrop-blur-md border border-[#E2D9C8] p-5 z-30 postcard-shadow">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-mono tracking-[0.22em] text-[#C2410C] uppercase font-bold">
                ACTIVE SOUNDING TELEMETRY
              </span>
              <span className="text-[9px] font-mono tracking-[0.15em] text-[#0A2540]/60 uppercase">
                {WAYPOINTS[activePoint]?.coords}
              </span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl text-[#0A2540] tracking-tight mb-2">
              {WAYPOINTS[activePoint]?.name}
            </h4>
            <p className="font-sans text-xs sm:text-sm text-[#0A2540]/80 font-light leading-relaxed">
              {WAYPOINTS[activePoint]?.description}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
