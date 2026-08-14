"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WAYPOINTS } from "@/lib/expeditionData";
import { ExpeditionStamp } from "./ephemera/ExpeditionStamp";

export function ExploreGateway() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "2",
    date: "",
    experience: "sunset",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="explore"
      className="relative w-full bg-[#FAF6EE] text-[#0A2540] pt-28 pb-16 overflow-hidden border-t border-[#E8DFD0]"
    >
      {/* 1. 3D Digital Twin Passport Booklet Card */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 mb-28">
        <div className="bg-[#0A2540] text-[#FAF6EE] p-8 sm:p-14 lg:p-20 relative overflow-hidden postcard-shadow border border-[#E05A36]/40">
          
          {/* Ambient Lighting Accents */}
          <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-[#06B6D4]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-[#E05A36]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="flex flex-col gap-5 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9">
                  <Image
                    src="/images/coral_logo_mark.png"
                    alt="Coral Adventures Emblem"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#F59E0B] uppercase font-bold">
                  10 / DIGITAL TWIN IMMERSION · THREE.JS WEBGL
                </span>
              </div>

              <h2 className="font-serif text-5xl sm:text-7xl lg:text-[7.5vw] leading-[0.85] tracking-tight text-[#FAF6EE]">
                READY TO GO
                <br />
                FURTHER?
              </h2>

              <p className="font-sans text-sm sm:text-base text-[#FAF6EE]/85 font-light leading-relaxed max-w-lg">
                Enter our interactive 3D digital-twin journey. Freely navigate the Malpe waterfront, examine the 25.90M catamaran, and preview the expedition route before stepping on board.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
              <Link
                href="/journey"
                className="inline-flex items-center justify-center gap-4 px-10 py-5 bg-[#FAF6EE] text-[#0A2540] font-mono text-xs uppercase tracking-[0.28em] font-bold transition-all duration-300 hover:bg-[#F59E0B] active:scale-95 shadow-xl border border-white"
              >
                <span>EXPLORE JOURNEY</span>
                <span className="text-base">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Private Concierge Reservation Desk */}
      <div id="book" className="editorial-grid items-start gap-12 lg:gap-16 mb-28">
        
        {/* Left Editorial Narrative */}
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-between h-full pr-0 lg:pr-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E05A36]" />
              <span className="text-[10.5px] font-mono tracking-[0.25em] text-[#0A2540]/80 uppercase font-bold">
                PRIVATE CONCIERGE DESK · MALPE
              </span>
            </div>
            
            <h3 className="font-serif text-5xl sm:text-7xl lg:text-[6.5vw] leading-[0.88] tracking-tight text-[#0A2540]">
              WHERE
              <br />
              WILL YOU
              <br />
              GO?
            </h3>
            
            <div className="w-20 h-[3px] bg-[#E05A36] my-6" />
            
            <p className="font-sans text-sm sm:text-base text-[#0A2540]/85 max-w-md leading-relaxed font-light mb-8">
              Expeditions are strictly limited to ensure uncompromising comfort and privacy. Submit your voyage preference to begin a direct consultation with our Malpe harbor concierge.
            </p>
          </div>

          {/* Telemetry Footnote */}
          <div className="border-t border-[#0A2540]/15 pt-6 mt-6 flex flex-col gap-2 font-mono text-[10.5px] text-[#0A2540]/70">
            <div className="flex items-center justify-between">
              <span>HARBOR DEPARTURE PIER:</span>
              <span className="font-semibold text-[#0A2540]">{WAYPOINTS.malpeHarbor.coords}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>EXPEDITION VESSEL:</span>
              <span className="font-semibold text-[#0A2540]">CORAL EXPLORER · 25.90M</span>
            </div>
            <div className="flex items-center justify-between text-[#E05A36]">
              <span>ACTIVE SEASON:</span>
              <span className="font-semibold">OCTOBER — MAY (CALM SEA)</span>
            </div>
          </div>
        </div>

        {/* Right Reservation Form */}
        <div className="col-span-12 lg:col-span-6 bg-[#F7F3E9] p-6 sm:p-10 border border-[#E8DFD0] postcard-shadow">
          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-4 animate-in fade-in duration-400">
              <ExpeditionStamp location="RESERVED" year="2026" color="coral" />
              <h4 className="font-serif text-3xl text-[#0A2540] mt-4">Expedition Request Logged</h4>
              <p className="font-sans text-sm text-[#0A2540]/75 max-w-sm leading-relaxed">
                Thank you, {formData.name || "Explorer"}. Our harbor concierge will review your voyage preference and respond within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 border border-[#0A2540] font-mono text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#0A2540] hover:text-[#FAF6EE] transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-[#0A2540]/10 pb-3 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#0A2540]/80 font-bold">
                  EXPEDITION CONSULTATION REQUEST
                </span>
                <span className="text-[10px] font-mono text-[#E05A36] font-semibold">FORM 01-A</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[10.5px] font-mono uppercase tracking-[0.18em] text-[#0A2540]/80">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FAF6EE] border border-[#E8DFD0] px-4 py-3 text-sm font-sans text-[#0A2540] focus:outline-hidden focus:border-[#E05A36]"
                    placeholder="e.g. Captain Ananya Rao"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[10.5px] font-mono uppercase tracking-[0.18em] text-[#0A2540]/80">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAF6EE] border border-[#E8DFD0] px-4 py-3 text-sm font-sans text-[#0A2540] focus:outline-hidden focus:border-[#E05A36]"
                    placeholder="ananya@expedition.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-[10.5px] font-mono uppercase tracking-[0.18em] text-[#0A2540]/80">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF6EE] border border-[#E8DFD0] px-4 py-3 text-sm font-sans text-[#0A2540] focus:outline-hidden focus:border-[#E05A36]"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="guests" className="text-[10.5px] font-mono uppercase tracking-[0.18em] text-[#0A2540]/80">
                    Party Size
                  </label>
                  <select
                    id="guests"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-[#FAF6EE] border border-[#E8DFD0] px-4 py-3 text-sm font-sans text-[#0A2540] focus:outline-hidden focus:border-[#E05A36]"
                  >
                    <option value="1-2">1 – 2 Explorers</option>
                    <option value="3-6">3 – 6 Family / Small Group</option>
                    <option value="7-20">7 – 20 Private Gathering</option>
                    <option value="charter">Full Vessel Charter (Up to 170)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="horizon" className="text-[10.5px] font-mono uppercase tracking-[0.18em] text-[#0A2540]/80">
                  Preferred Horizon Expedition
                </label>
                <select
                  id="horizon"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full bg-[#FAF6EE] border border-[#E8DFD0] px-4 py-3.5 text-sm font-sans text-[#0A2540] focus:outline-hidden focus:border-[#E05A36]"
                >
                  <option value="sunset">Sunset Westbound Horizon (17:30 - 19:30)</option>
                  <option value="coast">St. Mary's Basalt Isles Exploration (Day)</option>
                  <option value="watersports">Active Watersports & Marine Tender</option>
                  <option value="dinner">Open Teak Twilight Gastronomy (19:30 - 22:00)</option>
                  <option value="charter">Full Private Vessel Charter</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[10.5px] font-mono uppercase tracking-[0.18em] text-[#0A2540]/80">
                  Special Requests or Voyage Requirements
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#FAF6EE] border border-[#E8DFD0] px-4 py-3 text-sm font-sans text-[#0A2540] focus:outline-hidden focus:border-[#E05A36]"
                  placeholder="Private catering preferences, milestone celebrations, custom departure timings..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4.5 bg-[#0A2540] text-[#FAF6EE] font-mono text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 hover:bg-[#E05A36] shadow-sm mt-2 cursor-pointer"
              >
                REQUEST EXPEDITION CONSULTATION →
              </button>
            </form>
          )}
        </div>

      </div>

      {/* 3. Official Editorial Travel Pamphlet Footer */}
      <footer className="editorial-grid items-start border-t border-[#0A2540]/15 pt-16 mt-16 text-[#0A2540]">
        
        {/* Brand Column */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 mb-8 lg:mb-0">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 shrink-0">
              <Image
                src="/images/coral_logo_mark.png"
                alt="Coral Adventures Emblem"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-normal text-[#0A2540]">
                CORAL ADVENTURES
              </span>
              <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#E05A36] font-semibold">
                MALPE · ARABIAN SEA
              </span>
            </div>
          </div>
          <p className="font-sans text-xs text-[#0A2540]/80 leading-relaxed font-light max-w-sm mt-2">
            An art-directed coastal expedition experience across Malpe Harbor, St. Mary's columnar basalt archipelago, and the open Arabian Sea horizon.
          </p>
          <div className="text-[10px] font-mono text-[#0A2540]/60 tracking-[0.15em] mt-2">
            © 2026 CORAL ADVENTURES. ALL MARITIME RIGHTS RESERVED.
          </div>
        </div>

        {/* Expedition Directory */}
        <div className="col-span-6 lg:col-span-3 mb-6 lg:mb-0">
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#0A2540]/60 font-bold block mb-4">
            EXPEDITIONS
          </span>
          <ul className="flex flex-col gap-2.5 text-xs font-sans text-[#0A2540]/85">
            <li><Link href="#arrival" className="hover:text-[#E05A36] transition-colors">01 / Arrival at Malpe</Link></li>
            <li><Link href="#coast" className="hover:text-[#E05A36] transition-colors">02 / St. Mary's Basalt Isles</Link></li>
            <li><Link href="#watersports" className="hover:text-[#E05A36] transition-colors">03 / Active Watersports</Link></li>
            <li><Link href="#chart" className="hover:text-[#E05A36] transition-colors">04 / Nautical Route Chart</Link></li>
            <li><Link href="#vessel" className="hover:text-[#E05A36] transition-colors">05 / 25.90M Catamaran</Link></li>
            <li><Link href="#sunset" className="hover:text-[#E05A36] transition-colors">07 / Golden Hour Sunset</Link></li>
            <li><Link href="#dinner" className="hover:text-[#E05A36] transition-colors">08 / Coastal Gastronomy</Link></li>
          </ul>
        </div>

        {/* Telemetry & Coordinates */}
        <div className="col-span-6 lg:col-span-3 mb-6 lg:mb-0">
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#0A2540]/60 font-bold block mb-4">
            HARBOR TELEMETRY
          </span>
          <ul className="flex flex-col gap-2.5 text-xs font-mono text-[#0A2540]/80">
            <li>LAT: 13°21′02″ N</li>
            <li>LONG: 74°42′08″ E</li>
            <li>BEARING: 284° WNW</li>
            <li>TIDE: +1.2M SPRINGS</li>
            <li>PORT: MALPE, KARNATAKA</li>
            <li>REGISTRY: IN-MLP-2026</li>
          </ul>
        </div>

        {/* Captain's Log Sign-Off */}
        <div className="col-span-12 lg:col-span-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#0A2540]/60 font-bold block mb-4">
            CAPTAIN'S LOG
          </span>
          <h4 className="font-serif text-3xl text-[#0A2540] leading-none mb-2">
            See you at sea.
          </h4>
          <p className="font-sans text-xs text-[#0A2540]/75 leading-relaxed font-light">
            Restricted capacity voyages operating October through May under calm Arabian Sea weather windows.
          </p>
        </div>

      </footer>
    </section>
  );
}
