"use client";

import React from "react";
import { Navigation } from "@/components/ui/navigation";
import { ArrivalComposition } from "@/components/editorial/ArrivalComposition";
import { CoastComposition } from "@/components/editorial/CoastComposition";
import { ExpeditionTypology } from "@/components/editorial/ExpeditionTypology";
import { WatersportsComposition } from "@/components/editorial/WatersportsComposition";
import { TurnkeyVoyage } from "@/components/editorial/TurnkeyVoyage";
import { NauticalChartComposition } from "@/components/editorial/NauticalChartComposition";
import { VesselComposition } from "@/components/editorial/VesselComposition";
import { ExpeditionSteps } from "@/components/editorial/ExpeditionSteps";
import { OpenSeaComposition } from "@/components/editorial/OpenSeaComposition";
import { SunsetComposition } from "@/components/editorial/SunsetComposition";
import { DinnerComposition } from "@/components/editorial/DinnerComposition";
import { GuestMemoriesScrapbook } from "@/components/editorial/GuestMemoriesScrapbook";
import { NightComposition } from "@/components/editorial/NightComposition";
import { ExpeditionFAQ } from "@/components/editorial/ExpeditionFAQ";
import { ExploreGateway } from "@/components/editorial/ExploreGateway";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#FAF7F0] text-[#0A2540] selection:bg-[#E87952] selection:text-[#FAF7F0]">
      
      {/* 1. Global Floating Editorial Navigation */}
      <Navigation />

      {/* 2. Scene 01: Arrival at Malpe (Colossal CORAL Wordmark, Postcard & Boarding Pass) */}
      <ArrivalComposition />

      {/* 3. Scene 02: The Coast (Columnar Basalt Archipelago & Geological Field Note) */}
      <CoastComposition />

      {/* 4. Section 02.B: Expedition Typology Matrix (An Expedition Tailored Just For You) */}
      <ExpeditionTypology />

      {/* 5. Scene 03: The Water (WATER MOVES · Active Dynamics & Watersports Ticket) */}
      <WatersportsComposition />

      {/* 6. Section 03.B: Turnkey Voyage (You Just Travel · We'll Handle The Rest) */}
      <TurnkeyVoyage />

      {/* 7. Scene 04: Nautical Expedition Chart (Parchment Surface & Vector Wake Route) */}
      <NauticalChartComposition />

      {/* 8. Scene 05: The Vessel (25.90M Catamaran Hero & Strategic Deep Ocean Chapter) */}
      <VesselComposition />

      {/* 9. Section 05.B: Step-by-Step Chronology (How Your Expedition Comes to Life) */}
      <ExpeditionSteps />

      {/* 10. Scene 06: Open Sea (Radical Oceanic Minimalism · No road ahead. Just horizon.) */}
      <OpenSeaComposition />

      {/* 11. Scene 07: Golden Hour (CHASE THE LIGHT · Westbound Sunset Catamaran) */}
      <SunsetComposition />

      {/* 12. Scene 08: Coastal Gastronomy (DINNER, WITH NO WALLS · Candlelit Teak Dining) */}
      <DinnerComposition />

      {/* 13. Section 08.B: Guest Memories Scrapbook (It's More Than Places · Feelings) */}
      <GuestMemoriesScrapbook />

      {/* 14. Scene 09: Midnight (NIGHT BELONGS TO THE SEA · Sapphire Starlight Chapter) */}
      <NightComposition />

      {/* 15. Section 10.A: Expedition FAQ & Stacked Vacation Tickets */}
      <ExpeditionFAQ />

      {/* 16. Scene 10: Explore Gateway Portal (3D Digital Twin Passport & Concierge Desk) */}
      <ExploreGateway />

    </main>
  );
}
