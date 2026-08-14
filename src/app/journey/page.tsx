import React from "react";
import type { Metadata } from "next";
import { PersepolisExpedition } from "@/components/journey/PersepolisExpedition";

export const metadata: Metadata = {
  title: "Coral Adventures: Reimagined — 3D Virtual Expedition",
  description:
    "An interactive 3D WebGL reconstruction of Coral Adventures across Malpe Harbor, active watersports, 25.90M catamaran, St. Mary's volcanic basalt archipelago, and sub-surface coral gardens.",
};

export default function JourneyPage() {
  return <PersepolisExpedition />;
}
