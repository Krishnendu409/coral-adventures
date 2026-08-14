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

  return (
    <section className="relative w-full bg-[#FAF6EE] text-[#0A2540] py-24 sm:py-32 overflow-hidden border-b border-[#E8DFD0]">
      {/* 1. Header Telemetry */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase border-b border-[#0A2540]/15 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E5E48]" />
            <span className="font-bold text-[#1E5E48]">EXPEDITION INQUIRIES · CLARIFICATIONS</span>
          </div>
          <div className="flex items-center gap-4 text-[#0A2540]/70 font-semibold">
            <span>FREQUENTLY ANSWERED QUESTIONS</span>
            <span className="text-[#E05A36]">MALPE DESK</span>
          </div>
        </div>
      </div>

      {/* 2. Main Grid: Stacked Physical Tickets on Left, Editorial FAQ on Right */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 z-10">
        <div className="editorial-grid items-start gap-12 lg:gap-16">
          
          {/* Left Column: Stack of 3 Physical Vacation Tickets */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="font-serif italic text-3xl sm:text-5xl text-[#1E5E48] block mb-1">
                What you might
              </span>
              <h3 className="font-serif text-4xl sm:text-6xl text-[#0A2540] tracking-tight leading-none mb-6">
                be wondering
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#0A2540]/80 leading-relaxed font-light mb-8 max-w-md">
                We've compiled everything you need to know about weather windows, private charters, vessel stability, and onboarding in Malpe.
              </p>
            </div>

            {/* Stacked Physical Tickets Graphic */}
            <div className="relative min-h-[340px] sm:min-h-[380px] w-full max-w-sm mt-4 select-none">
              
              {/* Ticket 1 (Bottom): Deep Palm Green */}
              <div className="absolute top-0 left-0 w-full bg-[#1E5E48] text-[#FAF6EE] p-5 rounded-xs border border-[#1E5E48] postcard-shadow rotate-[-4deg] transition-transform duration-300 hover:rotate-0 hover:z-30">
                <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-3">
                  <span className="text-[9px] font-mono tracking-[0.2em] uppercase font-bold text-[#F59E0B]">
                    EXPEDITION TICKET
                  </span>
                  <span className="text-[8px] font-mono text-white/60">NO. 01-GEO</span>
                </div>
                <div className="font-serif text-2xl mb-1">St. Mary's Basalt Pass</div>
                <div className="text-[9px] font-mono tracking-widest text-white/70 uppercase">
                  MALPE PIER → BASALT ARCHIPELAGO
                </div>
              </div>

              {/* Ticket 2 (Middle): Turquoise Water */}
              <div className="absolute top-16 left-3 w-full bg-[#0D9488] text-[#0A2540] p-5 rounded-xs border border-[#0D9488] postcard-shadow rotate-[3deg] transition-transform duration-300 hover:rotate-0 hover:z-30">
                <div className="flex items-center justify-between border-b border-[#0A2540]/20 pb-2 mb-3">
                  <span className="text-[9px] font-mono tracking-[0.2em] uppercase font-bold text-[#0A2540]">
                    WATERS & TENDER PASS
                  </span>
                  <span className="text-[8px] font-mono text-[#0A2540]/60">NO. 02-ACT</span>
                </div>
                <div className="font-serif text-2xl mb-1 text-white">Active Marine & Kayak</div>
                <div className="text-[9px] font-mono tracking-widest text-white/80 uppercase">
                  OPEN SHALLOWS · SPEED TENDER
                </div>
              </div>

              {/* Ticket 3 (Top): Coral Orange */}
              <div className="absolute top-32 left-6 w-full bg-[#E05A36] text-[#FAF6EE] p-5 rounded-xs border border-[#E05A36] postcard-shadow rotate-[-2deg] transition-transform duration-300 hover:rotate-0 hover:z-30">
                <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-3">
                  <span className="text-[9px] font-mono tracking-[0.2em] uppercase font-bold text-white">
                    PRIVATE CHARTER PASS
                  </span>
                  <span className="text-[8px] font-mono text-white/70">NO. 03-VIP</span>
                </div>
                <div className="font-serif text-2xl mb-1">Sunset Horizon & Dinner</div>
                <div className="text-[9px] font-mono tracking-widest text-white/80 uppercase">
                  25.90M CATAMARAN · 17:30 WESTBOUND
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Editorial FAQ Accordion */}
          <div className="col-span-12 lg:col-span-7 flex flex-col divide-y divide-[#0A2540]/15 pt-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="py-5 sm:py-6">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-hidden"
                  >
                    <span className="font-serif text-xl sm:text-2xl text-[#0A2540] tracking-tight group-hover:text-[#E05A36] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <span className="text-xl font-mono text-[#E05A36] transition-transform duration-300 shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-3.5 pr-6 animate-in fade-in duration-300">
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
