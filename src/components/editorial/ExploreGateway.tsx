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
      className="relative w-full bg-[#FAF6EE] text-[#0A2540] pt-20 pb-14 overflow-hidden border-t border-[#E2D9C8]"
    >
      {/* 1. 3D Digital Twin Passport Banner */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-20">
        <div className="bg-[#0A2540] text-[#FAF6EE] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-white/15">
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0D9488]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0284C7]/12 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="flex flex-col gap-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="relative w-7 h-7">
                  <Image
                    src="/images/coral_logo_mark.png"
                    alt="Coral Adventures Emblem"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-[9px] font-sans tracking-[0.24em] text-[#38BDF8] uppercase font-semibold">
                  10 / DIGITAL TWIN IMMERSION · THREE.JS WEBGL
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-[#FAF6EE] uppercase">
                Explore the
                <br />
                <span className="italic font-light text-[#38BDF8]">digital twin.</span>
              </h2>

              <p className="font-sans text-xs sm:text-sm text-[#FAF6EE]/80 font-light leading-relaxed max-w-lg">
                Enter our interactive 3D digital-twin journey. Freely navigate the Malpe waterfront, examine the 25.90M catamaran, and preview the expedition route before stepping on board.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
              <Link
                href="/journey"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FAF6EE] text-[#0A2540] font-sans text-xs uppercase tracking-[0.24em] font-semibold transition-all duration-300 hover:bg-[#0284C7] hover:text-white shadow-lg border border-white"
              >
                <span>ENTER 3D JOURNEY</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Private Concierge Reservation Desk */}
      <div id="book" className="editorial-grid items-start gap-10 lg:gap-14 px-6 sm:px-10 lg:px-14 mb-20">
        
        {/* Left Editorial Narrative */}
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-between h-full pr-0 lg:pr-6">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
              <span className="text-[9px] font-sans tracking-[0.24em] text-[#0A2540]/80 uppercase font-semibold">
                PRIVATE CONCIERGE DESK · MALPE
              </span>
            </div>
            
            <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-[#0A2540] uppercase mb-4">
              Where will
              <br />
              <span className="italic font-light text-[#0284C7]">you go?</span>
            </h3>
            
            <p className="font-sans text-xs sm:text-sm text-[#0A2540]/80 max-w-md leading-relaxed font-light mb-6">
              Expeditions are strictly limited to ensure tranquility and individual attention on the water. Submit your voyage preference to begin direct consultation with our Malpe harbor concierge.
            </p>
          </div>

          {/* Telemetry Footnote */}
          <div className="border-t border-[#0A2540]/12 pt-5 mt-4 flex flex-col gap-2 font-mono text-[9.5px] text-[#0A2540]/70">
            <div className="flex items-center justify-between">
              <span>HARBOR DEPARTURE BERTH:</span>
              <span className="font-semibold text-[#0A2540]">{WAYPOINTS.malpeHarbor.coords}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>EXPEDITION VESSEL:</span>
              <span className="font-semibold text-[#0A2540]">CORAL EXPLORER · 25.90M</span>
            </div>
            <div className="flex items-center justify-between text-[#0284C7]">
              <span>ACTIVE SEASON:</span>
              <span className="font-semibold">OCTOBER — MAY (CALM WATER WINDOW)</span>
            </div>
          </div>
        </div>

        {/* Right Reservation Form */}
        <div className="col-span-12 lg:col-span-6 bg-[#F5F0E6] p-6 sm:p-8 border border-[#E2D9C8] shadow-lg">
          {submitted ? (
            <div className="py-10 flex flex-col items-center justify-center text-center gap-3">
              <ExpeditionStamp location="RESERVED" year="2026" color="azure" />
              <h4 className="font-serif text-2xl text-[#0A2540] mt-3">Expedition Request Logged</h4>
              <p className="font-sans text-xs text-[#0A2540]/75 max-w-sm leading-relaxed">
                Thank you, {formData.name || "Explorer"}. Our harbor concierge will review your voyage details and reach out within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2 border border-[#0A2540] font-sans text-[9px] uppercase tracking-[0.2em] font-semibold hover:bg-[#0A2540] hover:text-[#FAF6EE] transition-colors cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#0A2540]/10 pb-2.5 mb-1">
                <span className="text-[9px] font-sans uppercase tracking-[0.22em] text-[#0A2540]/80 font-bold">
                  EXPEDITION INQUIRY FORM
                </span>
                <span className="text-[9px] font-mono text-[#0284C7]">BERTH #2</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-[9.5px] font-sans uppercase tracking-[0.16em] text-[#0A2540]/80 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FAF6EE] border border-[#E2D9C8] px-3.5 py-2.5 text-xs font-sans text-[#0A2540] focus:outline-hidden focus:border-[#0284C7]"
                    placeholder="e.g. Captain Ananya Rao"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-[9.5px] font-sans uppercase tracking-[0.16em] text-[#0A2540]/80 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAF6EE] border border-[#E2D9C8] px-3.5 py-2.5 text-xs font-sans text-[#0A2540] focus:outline-hidden focus:border-[#0284C7]"
                    placeholder="ananya@expedition.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="flex flex-col gap-1">
                  <label htmlFor="phone" className="text-[9.5px] font-sans uppercase tracking-[0.16em] text-[#0A2540]/80 font-medium">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF6EE] border border-[#E2D9C8] px-3.5 py-2.5 text-xs font-sans text-[#0A2540] focus:outline-hidden focus:border-[#0284C7]"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="date" className="text-[9.5px] font-sans uppercase tracking-[0.16em] text-[#0A2540]/80 font-medium">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#FAF6EE] border border-[#E2D9C8] px-3.5 py-2.5 text-xs font-sans text-[#0A2540] focus:outline-hidden focus:border-[#0284C7]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="guests" className="text-[9.5px] font-sans uppercase tracking-[0.16em] text-[#0A2540]/80 font-medium">
                    Party Size
                  </label>
                  <select
                    id="guests"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-[#FAF6EE] border border-[#E2D9C8] px-3.5 py-2.5 text-xs font-sans text-[#0A2540] focus:outline-hidden focus:border-[#0284C7]"
                  >
                    <option value="1-2">1 – 2 Guests</option>
                    <option value="3-6">3 – 6 Small Group</option>
                    <option value="7-20">7 – 20 Private Group</option>
                    <option value="charter">Full Charter (Up to 170)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="horizon" className="text-[9.5px] font-sans uppercase tracking-[0.16em] text-[#0A2540]/80 font-medium">
                  Preferred Voyage Itinerary
                </label>
                <select
                  id="horizon"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full bg-[#FAF6EE] border border-[#E2D9C8] px-3.5 py-2.5 text-xs font-sans text-[#0A2540] focus:outline-hidden focus:border-[#0284C7]"
                >
                  <option value="sunset">Sunset Westbound Voyage (17:30 - 19:15)</option>
                  <option value="coast">St. Mary's Basalt Archipelago Discovery</option>
                  <option value="watersports">Active Watersports & Marine Tender</option>
                  <option value="dinner">Open Teak Twilight Gastronomy (19:30 - 22:00)</option>
                  <option value="charter">Full Private Vessel Charter</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-[9.5px] font-sans uppercase tracking-[0.16em] text-[#0A2540]/80 font-medium">
                  Voyage Notes or Dietary Requests
                </label>
                <textarea
                  id="message"
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#FAF6EE] border border-[#E2D9C8] px-3.5 py-2 text-xs font-sans text-[#0A2540] focus:outline-hidden focus:border-[#0284C7]"
                  placeholder="Catering preferences, special celebrations, custom departure timings..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#0A2540] text-[#FAF6EE] font-sans text-[10px] uppercase tracking-[0.24em] font-semibold transition-all duration-300 hover:bg-[#0284C7] shadow-sm cursor-pointer mt-1"
              >
                REQUEST EXPEDITION CONSULTATION →
              </button>
            </form>
          )}
        </div>

      </div>

      {/* 3. Official Editorial Footer */}
      <footer className="editorial-grid items-start border-t border-[#0A2540]/12 pt-12 px-6 sm:px-10 lg:px-14 text-[#0A2540]">
        
        {/* Brand Column */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-3 mb-6 lg:mb-0">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 shrink-0">
              <Image
                src="/images/coral_logo_mark.png"
                alt="Coral Adventures Emblem"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-normal text-[#0A2540]">
                CORAL ADVENTURES
              </span>
              <span className="text-[8px] font-sans tracking-[0.24em] uppercase text-[#0284C7] font-bold">
                MALPE · ARABIAN SEA
              </span>
            </div>
          </div>
          <p className="font-sans text-xs text-[#0A2540]/75 leading-relaxed font-light max-w-sm">
            Curated coastal expeditions across Malpe Harbor, St. Mary's columnar basalt archipelago, and the Arabian Sea.
          </p>
          <div className="text-[9px] font-mono text-[#0A2540]/50 tracking-wider mt-1">
            © 2026 CORAL ADVENTURES. ALL RIGHTS RESERVED.
          </div>
        </div>

        {/* Directory */}
        <div className="col-span-6 lg:col-span-3 mb-4 lg:mb-0">
          <span className="text-[9px] font-sans uppercase tracking-[0.22em] text-[#0A2540]/60 font-bold block mb-3">
            EXPEDITIONS
          </span>
          <ul className="flex flex-col gap-2 text-xs font-sans text-[#0A2540]/80">
            <li><Link href="#arrival" className="hover:text-[#0284C7] transition-colors">01 / Malpe Harbor Arrival</Link></li>
            <li><Link href="#coast" className="hover:text-[#0284C7] transition-colors">02 / St. Mary's Basalt Archipelago</Link></li>
            <li><Link href="#watersports" className="hover:text-[#0284C7] transition-colors">03 / Active Lagoon Watersports</Link></li>
            <li><Link href="#chart" className="hover:text-[#0284C7] transition-colors">04 / Nautical Route Chart</Link></li>
            <li><Link href="#vessel" className="hover:text-[#0284C7] transition-colors">05 / 25.90M Catamaran</Link></li>
            <li><Link href="#sunset" className="hover:text-[#0284C7] transition-colors">07 / Golden Hour Sunset</Link></li>
            <li><Link href="#dinner" className="hover:text-[#0284C7] transition-colors">08 / Karavali Gastronomy</Link></li>
          </ul>
        </div>

        {/* Telemetry & Coordinates */}
        <div className="col-span-6 lg:col-span-3 mb-4 lg:mb-0">
          <span className="text-[9px] font-sans uppercase tracking-[0.22em] text-[#0A2540]/60 font-bold block mb-3">
            HARBOR TELEMETRY
          </span>
          <ul className="flex flex-col gap-2 text-xs font-mono text-[#0A2540]/75">
            <li>LAT: 13°21′02″ N</li>
            <li>LONG: 74°42′08″ E</li>
            <li>BEARING: 284° WNW</li>
            <li>PORT: MALPE, KARNATAKA</li>
            <li>REGISTRY: IN-MLP-2026</li>
          </ul>
        </div>

        {/* Captain's Log */}
        <div className="col-span-12 lg:col-span-2">
          <span className="text-[9px] font-sans uppercase tracking-[0.22em] text-[#0A2540]/60 font-bold block mb-3">
            CAPTAIN'S LOG
          </span>
          <h4 className="font-serif text-2xl text-[#0A2540] leading-none mb-1.5">
            See you at sea.
          </h4>
          <p className="font-sans text-xs text-[#0A2540]/70 leading-relaxed font-light">
            Season runs October through May under calm Arabian Sea weather windows.
          </p>
        </div>

      </footer>
    </section>
  );
}
