import { describe, it, expect } from "vitest";
import {
  WAYPOINTS,
  VESSEL_SPECS,
  EXPEDITION_HORIZONS,
  getNavThemeForSection,
  validateEmail,
} from "@/lib/expeditionData";

describe("Expedition Verified Data & Telemetry", () => {
  it("contains verified exact coordinates for Malpe and St Marys archipelago", () => {
    expect(WAYPOINTS.malpeHarbor.coords).toBe("13°21′02″ N · 74°42′08″ E");
    expect(WAYPOINTS.coconutIsland.coords).toBe("13°22′45″ N · 74°40′28″ E");
    expect(WAYPOINTS.dariaBahadurgad.coords).toBe("13°20′18″ N · 74°41′32″ E");
    expect(WAYPOINTS.openArabianSea.coords).toBe("13°22′00″ N · 74°35′00″ E");
  });

  it("contains authentic vessel specifications for the 25.90M catamaran", () => {
    expect(VESSEL_SPECS.length).toBe("25.90 M");
    expect(VESSEL_SPECS.beam).toBe("8.00 M");
    expect(VESSEL_SPECS.capacity).toBe("170");
    expect(VESSEL_SPECS.decks.length).toBeGreaterThanOrEqual(3);
  });

  it("maps section IDs to environment-aware navigation themes", () => {
    expect(getNavThemeForSection("hero")).toBe("transparent");
    expect(getNavThemeForSection("discover")).toBe("alabaster");
    expect(getNavThemeForSection("chart")).toBe("paper");
    expect(getNavThemeForSection("underwater")).toBe("marine");
    expect(getNavThemeForSection("night")).toBe("sapphire");
    expect(getNavThemeForSection("book")).toBe("linen");
  });

  it("validates RFC-compliant email formats properly", () => {
    expect(validateEmail("guest@luxuryvoyage.com")).toBe(true);
    expect(validateEmail("user.name+tag@domain.co.in")).toBe(true);
    expect(validateEmail("invalid-email")).toBe(false);
    expect(validateEmail("test@")).toBe(false);
    expect(validateEmail("@domain.com")).toBe(false);
    expect(validateEmail("")).toBe(false);
  });

  it("contains 5 curated expedition horizons", () => {
    expect(EXPEDITION_HORIZONS.length).toBe(5);
    const ids = EXPEDITION_HORIZONS.map((h) => h.id);
    expect(ids).toEqual(["sunset", "dinner", "dj", "private", "celebration"]);
  });
});
