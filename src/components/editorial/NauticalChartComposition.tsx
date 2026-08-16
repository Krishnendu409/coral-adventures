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
        scrub: 1.0,
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
      }, 0.15);
    }
  }, { scope: sectionRef });

  const waypoints = [
    {
      key: "malpeHarbor",
      data: WAYPOINTS.malpeHarbor,
      cx: "18%",
      cy: "65%",
      label: "WP 01 · MALPE BERTH",
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
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-10 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[9.5px] sm:text-[10.5px] font-sans tracking-[0.26em] uppercase border-b border-[#0A2540]/12 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" />
            <span className="font-bold text-[#0A2540]">04 / THE CHART · NAUTICAL EXPEDITION TRAJECTORY</span>
          </div>
          <div className="flex items-center gap-4 text-[#0A2540]/75 font-medium">
            <span>HYDROGRAPHIC SOUNDINGS</span>
            <span className="font-mono">CHART 2026-MALPE</span>
          </div>
        </div>
      </div>

      {/* 2. Editorial Headline & Introduction */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-20 mb-10">
        <div className="editorial-grid items-start">
          <div className="col-span-12 lg:col-span-8">
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-[#0A2540] leading-[0.92] tracking-tight uppercase">
              The route becomes
              <br />
              <span className="italic font-light text-[#0284C7]">the wake.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 flex lg:justify-end items-center pt-3 lg:pt-0">
            <ExpeditionStamp location="MALPE CHART" coords="HYDRO 2026" color="azure" />
          </div>
        </div>
      </div>

      {/* 3. Tactile Expedition Chart Map Surface */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-10">
        <div className="relative w-full h-[52vh] sm:h-[62vh] lg:h-[70vh] bg-[#F7F3E9] border border-[#E2D9C8] shadow-lg p-4 sm:p-6 overflow-hidden">
          
          {/* Subtle Cartographic Grid */}
          <div 
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #0A2540 1px, transparent 1px), linear-gradient(to bottom, #0A2540 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Compass Rose Accent */}
          <div className="absolute top-6 right-6 opacity-25 select-none pointer-events-none hidden sm:block">
            <div className="w-20 h-20 border border-[#0A2540] rounded-full flex items-center justify-center relative">
              <span className="absolute top-1 text-[7px] font-mono font-bold">N</span>
              <span className="absolute bottom-1 text-[7px] font-mono font-bold">S</span>
              <span className="absolute left-1 text-[7px] font-mono font-bold">W</span>
              <span className="absolute right-1 text-[7px] font-mono font-bold">E</span>
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
              opacity="0.2"
            />
            <path
              d="M 80 550 Q 350 480 650 380 T 980 200"
              fill="none"
              stroke="#0D9488"
              strokeWidth="1"
              strokeDasharray="4 8"
              opacity="0.15"
            />

            {/* Catamaran Foaming Wake Line */}
            <path
              ref={wakeRef}
              d="M 180 390 Q 420 270 680 210 T 900 120"
              fill="none"
              stroke="#0D9488"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.3"
            />

            {/* Primary Expedition Route Line in Riviera Azure */}
            <path
              ref={routeRef}
              d="M 180 390 Q 420 270 680 210 T 900 120"
              fill="none"
              stroke="#0284C7"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Waypoint Markers */}
          {waypoints.map((wp) => {
            const isSelected = activePoint === wp.key;
            return (
              <div
                key={wp.key}
                style={{ left: wp.cx, top: wp.cy }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                onClick={() => setActivePoint(wp.key)}
              >
                <div className={`relative flex items-center justify-center transition-transform duration-300 ${
                  isSelected ? "scale-125" : "hover:scale-110"
                }`}>
                  <div className={`w-3.5 h-3.5 rounded-full border-2 transition-colors ${
                    isSelected ? "bg-[#0284C7] border-[#FAF6EE] shadow-md" : "bg-[#0A2540] border-[#FAF6EE]"
                  }`} />
                  <div className="absolute -top-6 whitespace-nowrap bg-[#0A2540] text-[#FAF6EE] px-2 py-0.5 text-[8px] font-sans tracking-[0.16em] uppercase rounded-xs">
                    {wp.label}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Dynamic Active Waypoint Legend Telemetry Card */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-30 max-w-xs sm:max-w-sm bg-[#FAF6EE]/95 backdrop-blur-md border border-[#E2D9C8] p-4 shadow-xl">
            <div className="flex items-center justify-between text-[8px] font-sans tracking-[0.2em] text-[#0284C7] uppercase font-bold mb-1.5">
              <span>ACTIVE TELEMETRY FIX</span>
              <span className="font-mono">{WAYPOINTS[activePoint]?.coords}</span>
            </div>
            <h4 className="font-serif text-lg text-[#0A2540] mb-1">
              {WAYPOINTS[activePoint]?.name}
            </h4>
            <p className="font-sans text-xs text-[#0A2540]/80 font-light leading-relaxed">
              {WAYPOINTS[activePoint]?.description}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
