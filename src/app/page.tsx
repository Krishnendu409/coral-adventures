"use client";

import React from "react";
import { Navigation } from "@/components/ui/navigation";
import { ScrollColorTransition, ColorSection } from "@/components/editorial/ScrollColorTransition";
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
    <ScrollColorTransition>
      <main className="relative min-h-screen text-[#0A2540] selection:bg-[#E87952] selection:text-[#FAF6EE]">
        
        {/* 1. Global Floating Editorial Navigation */}
        <Navigation />

        {/* 2. Scene 01: Arrival at Malpe (Warm Weathered Parchment) */}
        <ColorSection color="#FAF6EE">
          <ArrivalComposition />
        </ColorSection>

        {/* 3. Scene 02: The Coast */}
        <ColorSection color="#FAF6EE">
          <CoastComposition />
        </ColorSection>

        {/* 4. Section 02.B: Expedition Typology Matrix (Deep Palm Green) */}
        <ColorSection color="#1E5E48">
          <ExpeditionTypology />
        </ColorSection>

        {/* 5. Scene 03: The Water (Luminous Turquoise Water) */}
        <ColorSection color="#0F766E">
          <WatersportsComposition />
        </ColorSection>

        {/* 6. Section 03.B: Turnkey Voyage (Deep Ocean Navy) */}
        <ColorSection color="#0A2540">
          <TurnkeyVoyage />
        </ColorSection>

        {/* 7. Scene 04: Nautical Expedition Chart (Parchment Map) */}
        <ColorSection color="#FAF6EE">
          <NauticalChartComposition />
        </ColorSection>

        {/* 8. Scene 05: The Vessel */}
        <ColorSection color="#0A2540">
          <VesselComposition />
        </ColorSection>

        {/* 9. Section 05.B: Step-by-Step Chronology */}
        <ColorSection color="#FAF6EE">
          <ExpeditionSteps />
        </ColorSection>

        {/* 10. Scene 06: Open Sea */}
        <ColorSection color="#FAF6EE">
          <OpenSeaComposition />
        </ColorSection>

        {/* 11. Scene 07: Golden Hour (Sun-Cured Coral Amber Sunset) */}
        <ColorSection color="#C2410C">
          <SunsetComposition />
        </ColorSection>

        {/* 12. Scene 08: Coastal Gastronomy */}
        <ColorSection color="#FAF6EE">
          <DinnerComposition />
        </ColorSection>

        {/* 13. Section 08.B: Guest Memories Scrapbook */}
        <ColorSection color="#FAF6EE">
          <GuestMemoriesScrapbook />
        </ColorSection>

        {/* 14. Scene 09: Midnight (Midnight Sapphire Ocean) */}
        <ColorSection color="#020C1B">
          <NightComposition />
        </ColorSection>

        {/* 15. Section 10.A: Expedition FAQ */}
        <ColorSection color="#FAF6EE">
          <ExpeditionFAQ />
        </ColorSection>

        {/* 16. Scene 10: Explore Gateway Portal */}
        <ColorSection color="#FAF6EE">
          <ExploreGateway />
        </ColorSection>

      </main>
    </ScrollColorTransition>
  );
}
