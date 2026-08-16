"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Can we book a private charter for our family or celebration?",
    answer: "Yes. The entire 25.90M catamaran is available for exclusive private charters. We provide custom departure schedules, curated coastal gastronomy, bespoke music/soundscapes, and zodiac tender landings on St. Mary's Island.",
  },
  {
    question: "What is the operational season and best weather window?",
    answer: "Our expedition season runs strictly from October through May when the Arabian Sea is at its calmest. All voyages are monitored via real-time hydrographic radar to guarantee smooth, tranquil passage.",
  },
  {
    question: "Are watersports equipment and zodiac tenders included?",
    answer: "Active watersports equipment (parasailing launches, sea kayaks, snorkeling gear, and speed tender transfers) are available based on your chosen passage tier. Our crew handles all logistics and safety gear.",
  },
  {
    question: "Can children and senior guests sail comfortably?",
    answer: "Absolutely. The 25.90M catamaran features twin-hull hydrodynamic stability, preventing heavy rolling. Our shaded observation lounges, non-slip teak decks, and air-conditioned salons provide complete safety for all ages.",
  },
  {
    question: "How do we coordinate custom dining and beverage preferences?",
    answer: "Upon booking confirmation, your dedicated Malpe harbor concierge will contact you to coordinate dietary needs, celebratory cakes, chilled wine pairings, and local coastal seafood specialties.",
  },
];

export function ExpeditionFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative w-full bg-[#FAF6EE] text-[#0A2540] py-20 sm:py-28 overflow-hidden border-b border-[#E2D9C8]">
      {/* 1. Header Telemetry */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[9px] sm:text-[10px] font-sans tracking-[0.24em] uppercase border-b border-[#0A2540]/12 pb-2.5">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#1E5E48]" />
            <span className="font-semibold text-[#1E5E48]">EXPEDITION INQUIRIES · CLARIFICATIONS</span>
          </div>
          <div className="flex items-center gap-4 text-[#0A2540]/70 font-medium">
            <span>MALPE CONCIERGE DESK</span>
          </div>
        </div>
      </div>

      {/* 2. Main Grid */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-10">
        <div className="editorial-grid items-start gap-10 lg:gap-14">
          
          {/* Left Column: Context & Interactive Stacked Tickets */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            <div>
              <h3 className="font-serif text-3xl sm:text-5xl text-[#0A2540] tracking-tight leading-tight uppercase mb-4">
                Frequently asked
                <br />
                <span className="italic font-light text-[#0284C7]">clarifications.</span>
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#0A2540]/80 leading-relaxed font-light max-w-md">
                Essential details regarding weather windows, private charters, catamaran stability, and harbor boarding procedures in Malpe. Hover over the passes below to expand them.
              </p>
            </div>

            {/* Interactive Fan-Out Stacked Tickets Graphic */}
            <div 
              className="relative min-h-[380px] w-full max-w-md mt-4 select-none cursor-pointer group py-4"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              aria-label="Interactive Expedition Passes Stack"
            >
              
              {/* Ticket 1: Deep Pine Green (#1E5E48) */}
              <div 
                className={cn(
                  "absolute left-0 right-4 top-2 bg-[#1B4D3E] text-[#FAF6EE] p-4 sm:p-5 border border-[#143B30] shadow-md transition-all duration-500 cubic-bezier(0.16,1,0.3,1) will-change-transform rounded-xs group-hover:-translate-y-12 group-hover:-rotate-6 group-hover:scale-[1.03] group-hover:shadow-2xl group-hover:z-30",
                  isHovered 
                    ? "-translate-y-12 -rotate-6 scale-[1.03] shadow-2xl z-30" 
                    : "translate-y-0 rotate-[-4deg] z-10"
                )}
              >
                <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-2 text-[8.5px] font-sans tracking-[0.22em] uppercase">
                  <span className="font-bold text-[#F59E0B]">EXPEDITION TICKET</span>
                  <span className="text-white/70 font-mono">NO. 01-GEO</span>
                </div>
                <div className="font-serif text-xl sm:text-2xl text-white tracking-tight mb-1">
                  St. Mary's Basalt Discovery
                </div>
                <div className="text-[8.5px] font-mono tracking-widest text-white/75 uppercase">
                  MALPE PIER → 88M-YR BASALT ARCHIPELAGO
                </div>
              </div>

              {/* Ticket 2: Vibrant Ocean Teal (#0D9488) */}
              <div 
                className={cn(
                  "absolute left-2 right-2 top-14 bg-[#0D9488] text-[#FAF6EE] p-4 sm:p-5 border border-[#0F766E] shadow-lg transition-all duration-500 cubic-bezier(0.16,1,0.3,1) will-change-transform rounded-xs group-hover:translate-y-12 group-hover:rotate-1 group-hover:scale-[1.04] group-hover:shadow-2xl group-hover:z-40",
                  isHovered 
                    ? "translate-y-12 rotate-1 scale-[1.04] shadow-2xl z-40" 
                    : "translate-y-0 rotate-[3deg] z-20"
                )}
              >
                <div className="flex items-center justify-between border-b border-[#0A2540]/20 pb-2 mb-2 text-[8.5px] font-sans tracking-[0.22em] uppercase">
                  <span className="font-bold text-[#0A2540]">WATERS & TENDER PASS</span>
                  <span className="text-[#0A2540]/70 font-mono">NO. 02-ACT</span>
                </div>
                <div className="font-serif text-xl sm:text-2xl text-white tracking-tight mb-1">
                  Active Marine & Watersports
                </div>
                <div className="text-[8.5px] font-mono tracking-widest text-white/85 uppercase">
                  OPEN SHALLOWS · SEA KAYAKS · PARASAIL
                </div>
              </div>

              {/* Ticket 3: Warm Coral Terracotta (#E05A36) */}
              <div 
                className={cn(
                  "absolute left-4 right-0 top-28 bg-[#E05A36] text-[#FAF6EE] p-4 sm:p-5 border border-[#C2410C] shadow-xl transition-all duration-500 cubic-bezier(0.16,1,0.3,1) will-change-transform rounded-xs group-hover:translate-y-36 group-hover:rotate-6 group-hover:scale-[1.05] group-hover:shadow-2xl group-hover:z-50",
                  isHovered 
                    ? "translate-y-36 rotate-6 scale-[1.05] shadow-2xl z-50" 
                    : "translate-y-0 rotate-[-2deg] z-30"
                )}
              >
                <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-2 text-[8.5px] font-sans tracking-[0.22em] uppercase">
                  <span className="font-bold text-white tracking-wider">PRIVATE CHARTER PASS</span>
                  <span className="text-white/80 font-mono">NO. 03-VIP</span>
                </div>
                <div className="font-serif text-xl sm:text-2xl text-white tracking-tight mb-1">
                  Sunset Horizon & Dinner
                </div>
                <div className="text-[8.5px] font-mono tracking-widest text-white/90 uppercase">
                  25.90M CATAMARAN · 17:30 WESTBOUND
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Editorial FAQ Accordion */}
          <div className="col-span-12 lg:col-span-7 flex flex-col divide-y divide-[#0A2540]/12 pt-2">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="py-4 sm:py-5">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-hidden"
                  >
                    <span className="font-serif text-lg sm:text-xl text-[#0A2540] tracking-tight group-hover:text-[#0284C7] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <span className="text-lg font-mono text-[#0284C7] transition-transform duration-300 shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`faq-question-${idx}`}
                      className="mt-2.5 pr-6"
                    >
                      <p className="font-sans text-xs sm:text-sm text-[#0A2540]/80 leading-relaxed font-light">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
