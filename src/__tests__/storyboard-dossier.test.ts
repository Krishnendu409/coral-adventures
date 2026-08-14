import { describe, it, expect } from "vitest";
import { STORYBOARD_FRAMES } from "../data/storyboardData";

describe("Visual Scrapbook Storyboard Specification & Flow", () => {
  it("contains all 8 sequential journey chapters", () => {
    expect(STORYBOARD_FRAMES).toHaveLength(8);
  });

  it("verifies the 8-chapter narrative progression: Beach → Water → Boat → Life → Island → Sunset → Night → Drones", () => {
    const codes = STORYBOARD_FRAMES.map((f) => f.chapterCode);
    expect(codes[0]).toContain("ARRIVAL");
    expect(codes[1]).toContain("WATERSPORTS");
    expect(codes[2]).toContain("VESSEL");
    expect(codes[3]).toContain("ONBOARD");
    expect(codes[4]).toContain("BASALT");
    expect(codes[5]).toContain("SUNSET");
    expect(codes[6]).toContain("NIGHT");
    expect(codes[7]).toContain("SKY");
  });

  it("verifies the guide bird presence and changing narrative role across all frames", () => {
    STORYBOARD_FRAMES.forEach((frame) => {
      expect(frame.character.state).toBeDefined();
      expect(frame.character.action).toBeDefined();
      expect(frame.character.meaning).toBeDefined();
    });
  });

  it("confirms authentic Malpe / Arabian Sea geography throughout", () => {
    const text = JSON.stringify(STORYBOARD_FRAMES);
    expect(text).toContain("Malpe");
    expect(text).toContain("Arabian Sea");
    expect(text).toContain("St. Mary");
    expect(text).toContain("basalt");
    expect(text).toContain("catamaran");
  });
});
