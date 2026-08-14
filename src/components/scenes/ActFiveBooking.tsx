"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { EXPEDITION_HORIZONS, WAYPOINTS, validateEmail } from "@/lib/expeditionData";

export function ActFiveBooking() {
  const [selectedHorizon, setSelectedHorizon] = useState("sunset");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your name or party title.";
    }

    if (!email.trim() || !validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setSelectedHorizon("sunset");
    setSubmitted(false);
  };

  return (
    <section 
      id="book" 
      className="relative min-h-[100dvh] w-full bg-alabaster text-marine-espresso py-24 md:py-32 flex flex-col justify-center overflow-hidden border-t border-sand"
    >
      {/* Link 10: Champagne / Gold Hairline (Moonlight Reflection into Linen) */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent opacity-80" />

      {/* Background Radial Micro-Dot Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: "radial-gradient(#12181F 1px, transparent 1px)", backgroundSize: "28px 28px" }} 
      />

      <div className="relative z-10 editorial-grid items-start gap-12 lg:gap-16">
        
        {/* Left Editorial Narrative */}
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-between h-full pr-0 lg:pr-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-coral-accent" />
              <span className="text-[11px] font-mono tracking-[0.25em] text-marine-espresso/70 uppercase font-semibold">
                08 / PRIVATE CONCIERGE DESK
              </span>
            </div>

            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] leading-[0.88] tracking-tight text-marine-espresso">
              WHERE<br />
              WILL YOU<br />
              GO?
            </h2>

            <div className="w-20 h-[1.5px] bg-champagne my-8" />

            <p className="font-sans text-base sm:text-lg text-marine-espresso/85 max-w-md leading-relaxed font-light">
              Expeditions are strictly limited to ensure uncompromising comfort and privacy. Submit your voyage preference to begin a direct consultation with our Malpe harbor concierge.
            </p>

            <div className="mt-8 p-4 bg-linen border border-sand text-[10px] font-mono text-marine-espresso/75 uppercase tracking-[0.18em]">
              <span className="font-semibold text-marine-espresso">OPTIMAL SAILING SEASON:</span> OCTOBER – MAY · CALM SEA CONDITIONS
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-sand flex flex-col gap-2">
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-marine-espresso/70 font-semibold">
              MALPE HARBOR PIER · KARNATAKA
            </span>
            <span className="text-[10px] font-mono text-marine-espresso/50">
              {WAYPOINTS.malpeHarbor.coords} · ARABIAN SEA
            </span>
          </div>
        </div>

        {/* Right Desk Form Container */}
        <div className="col-span-12 lg:col-span-6 bg-linen p-8 sm:p-12 border border-sand shadow-sm relative">
          
          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500">
              <span className="w-3 h-3 rounded-full bg-coral-accent mb-4 animate-ping" />
              
              <h3 className="font-serif text-4xl text-marine-espresso mb-3">
                REQUEST RECEIVED.
              </h3>
              
              <p className="font-sans text-base text-marine-espresso/80 max-w-md mb-6 font-light">
                Thank you, <span className="font-medium text-marine-espresso">{name}</span>. Our expedition director will contact you directly at <span className="font-medium text-marine-espresso">{email}</span> with itinerary details.
              </p>

              <div className="p-4 bg-alabaster border border-sand text-xs font-mono text-marine-espresso/70 uppercase tracking-widest mb-8">
                VOYAGE: {EXPEDITION_HORIZONS.find(h => h.id === selectedHorizon)?.label}
              </div>

              <button
                onClick={handleReset}
                className="text-xs font-mono uppercase tracking-[0.2em] text-marine-espresso underline underline-offset-4 hover:text-champagne transition-colors focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none"
              >
                BOOK ANOTHER EXPEDITION ↺
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
              
              {/* Field 1: Name */}
              <div className="flex flex-col gap-2">
                <label 
                  htmlFor="guest-name" 
                  className="text-[10px] font-mono uppercase tracking-[0.2em] text-marine-espresso/70 font-semibold"
                >
                  GUEST NAME
                </label>
                <input
                  id="guest-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                  }}
                  placeholder="e.g. Lord Sterling / Eleanor Vance"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={cn(
                    "w-full bg-transparent border-b py-3 font-serif text-xl sm:text-2xl text-marine-espresso placeholder:text-marine-espresso/30 focus:outline-none transition-colors",
                    errors.name ? "border-coral-accent" : "border-sand focus:border-marine-espresso"
                  )}
                />
                {errors.name && (
                  <span id="name-error" className="text-xs font-mono text-coral-accent tracking-wide mt-1">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Field 2: Email */}
              <div className="flex flex-col gap-2">
                <label 
                  htmlFor="contact-email" 
                  className="text-[10px] font-mono uppercase tracking-[0.2em] text-marine-espresso/70 font-semibold"
                >
                  CONTACT EMAIL
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  placeholder="concierge@voyage.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={cn(
                    "w-full bg-transparent border-b py-3 font-serif text-xl sm:text-2xl text-marine-espresso placeholder:text-marine-espresso/30 focus:outline-none transition-colors",
                    errors.email ? "border-coral-accent" : "border-sand focus:border-marine-espresso"
                  )}
                />
                {errors.email && (
                  <span id="email-error" className="text-xs font-mono text-coral-accent tracking-wide mt-1">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Field 3: Horizon Selection */}
              <div className="flex flex-col gap-3">
                <span 
                  id="horizon-selection-label"
                  className="text-[10px] font-mono uppercase tracking-[0.2em] text-marine-espresso/70 font-semibold"
                >
                  CHOOSE YOUR HORIZON
                </span>
                
                <div 
                  role="radiogroup"
                  aria-labelledby="horizon-selection-label"
                  className="flex flex-col gap-2"
                >
                  {EXPEDITION_HORIZONS.map((horizon) => {
                    const isSelected = selectedHorizon === horizon.id;
                    return (
                      <button
                        key={horizon.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSelectedHorizon(horizon.id)}
                        className={cn(
                          "w-full text-left p-4 border transition-all duration-200 flex items-center justify-between group focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none",
                          isSelected
                            ? "bg-alabaster border-marine-espresso shadow-xs"
                            : "bg-transparent border-sand/80 hover:border-sand hover:bg-alabaster/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "w-2 h-2 rounded-full transition-colors",
                            isSelected ? "bg-coral-accent" : "bg-sand group-hover:bg-sand/80"
                          )} />
                          <span className="font-mono text-xs uppercase tracking-widest font-medium text-marine-espresso">
                            {horizon.label}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-marine-espresso/50 tracking-wider">
                          {horizon.time}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 bg-marine-espresso text-alabaster font-mono text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 hover:bg-champagne hover:text-marine-espresso active:scale-98 shadow-md flex items-center justify-center gap-3 focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none"
              >
                <span>SUBMIT EXPEDITION REQUEST</span>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </button>

              <div className="text-[9px] font-mono text-marine-espresso/50 uppercase tracking-[0.18em] text-center">
                DIRECT INQUIRY · PRIVATE CONCIERGE CONFIRMATION
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
