"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ConciergeScene() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "2-6 GUESTS (PRIVATE INTIMATE)",
    experience: "FULL EXPEDITION & DINING",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-alabaster text-marine-espresso select-none py-24">
      
      {/* Background Architectural Warm Linen & Sand Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-marine-espresso/90 via-alabaster/40 to-alabaster z-0 pointer-events-none" />

      {/* Main Reservation Desk Stage */}
      <div className="relative z-20 container mx-auto px-6 sm:px-12 max-w-5xl">
        
        {/* Brand Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-alabaster/90 backdrop-blur-md px-5 py-2 rounded-full border border-sand shadow-sm mb-4">
            <div className="relative w-7 h-7">
              <Image
                src="/images/coral_logo_mark.png"
                alt="Coral Adventures Emblem"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-marine-espresso/70 uppercase font-semibold">
              EXPEDITION CONCIERGE DESK
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-marine-espresso leading-[0.92] tracking-tight">
            WHERE WILL<br />
            <span className="text-coral-orange font-normal">
              YOU GO?
            </span>
          </h2>

          <p className="mt-4 font-sans text-xs sm:text-sm md:text-base text-marine-espresso/75 font-light leading-relaxed max-w-xl mx-auto">
            Your journey begins from the moment you connect. Our private concierge designs tailored nautical itineraries for discerning guests, families, and private celebrations.
          </p>
        </div>

        {/* Interactive Booking Form Card */}
        <div className="bg-alabaster/95 backdrop-blur-md border border-sand p-6 sm:p-10 rounded-2xl shadow-xl">
          {submitted ? (
            <div className="text-center py-12 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-coral-sun/20 border border-coral-sun flex items-center justify-center text-coral-orange">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="font-serif text-3xl text-marine-espresso">EXPEDITION INQUIRY RECEIVED</h3>
              <p className="font-sans text-sm text-marine-espresso/70 max-w-md">
                Our Private Concierge will reach out within 2 hours with tailored vessel availability, tide schedules, and bespoke dining options.
              </p>
              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-marine-espresso text-alabaster font-mono text-xs uppercase tracking-[0.2em] font-semibold hover:bg-coral-orange transition-colors rounded-xs"
              >
                RETURN TO HOMEPAGE
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Guest Full Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="concierge-name" className="text-[10px] font-mono tracking-[0.2em] uppercase text-marine-espresso/70 font-semibold">
                    YOUR FULL NAME *
                  </label>
                  <input
                    id="concierge-name"
                    type="text"
                    required
                    placeholder="e.g. Lord Alistair Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="p-3.5 bg-alabaster border border-sand text-marine-espresso font-sans text-sm focus:border-coral-orange focus:outline-none rounded-xs"
                  />
                </div>

                {/* Guest Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="concierge-email" className="text-[10px] font-mono tracking-[0.2em] uppercase text-marine-espresso/70 font-semibold">
                    DIRECT EMAIL *
                  </label>
                  <input
                    id="concierge-email"
                    type="email"
                    required
                    placeholder="concierge@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="p-3.5 bg-alabaster border border-sand text-marine-espresso font-sans text-sm focus:border-coral-orange focus:outline-none rounded-xs"
                  />
                </div>

                {/* Preferred Date */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="concierge-date" className="text-[10px] font-mono tracking-[0.2em] uppercase text-marine-espresso/70 font-semibold">
                    EXPEDITION DATE *
                  </label>
                  <input
                    id="concierge-date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="p-3.5 bg-alabaster border border-sand text-marine-espresso font-sans text-sm focus:border-coral-orange focus:outline-none rounded-xs"
                  />
                </div>

                {/* Charter Party Size */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="concierge-guests" className="text-[10px] font-mono tracking-[0.2em] uppercase text-marine-espresso/70 font-semibold">
                    GUEST PARTY SIZE
                  </label>
                  <select
                    id="concierge-guests"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="p-3.5 bg-alabaster border border-sand text-marine-espresso font-sans text-sm focus:border-coral-orange focus:outline-none rounded-xs"
                  >
                    <option value="2-6 GUESTS (PRIVATE INTIMATE)">2–6 GUESTS (PRIVATE INTIMATE)</option>
                    <option value="7-15 GUESTS (COASTAL SOIRÉE)">7–15 GUESTS (COASTAL SOIRÉE)</option>
                    <option value="16-40 GUESTS (CELEBRATION CHARTER)">16–40 GUESTS (CELEBRATION CHARTER)</option>
                    <option value="40-170 GUESTS (FULL VESSEL EXCLUSIVE)">40–170 GUESTS (FULL VESSEL EXCLUSIVE)</option>
                  </select>
                </div>

              </div>

              {/* Special Requests / Notes */}
              <div className="flex flex-col gap-2">
                <label htmlFor="concierge-notes" className="text-[10px] font-mono tracking-[0.2em] uppercase text-marine-espresso/70 font-semibold">
                  BESPOKE ITINERARY PREFERENCES & CULINARY REQUESTS
                </label>
                <textarea
                  id="concierge-notes"
                  rows={3}
                  placeholder="Tell us about your ideal day on the water (e.g. sunset toast, volcanic reef snorkeling, chef's seafood pairing)..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="p-3.5 bg-alabaster border border-sand text-marine-espresso font-sans text-sm focus:border-coral-orange focus:outline-none rounded-xs resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-sand">
                <div className="text-[10px] font-mono text-marine-espresso/60 uppercase tracking-widest">
                  NO DEPOSIT REQUIRED FOR INITIAL CONSULTATION
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-4 bg-coral-sun text-marine-espresso font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-coral-orange hover:text-white transition-all duration-300 rounded-xs"
                >
                  REQUEST BESPOKE CHARTER
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Footer Direct Contact Links */}
        <div className="mt-12 text-center text-[11px] font-mono text-marine-espresso/70 uppercase tracking-[0.2em] flex flex-wrap justify-center items-center gap-6">
          <Link href="/" className="hover:text-coral-orange transition-colors">
            ← RETURN TO HOMEPAGE
          </Link>
          <span>·</span>
          <a href="mailto:concierge@coraladventures.com" className="hover:text-coral-orange transition-colors">
            CONCIERGE@CORALADVENTURES.COM
          </a>
          <span>·</span>
          <span>MALPE HARBOR, KARNATAKA</span>
        </div>

      </div>
    </section>
  );
}
