import { describe, it, expect } from "vitest";
import { STORYBOARD_FRAMES, ASSET_INVENTORY_SUMMARY } from "../data/storyboardData";

describe("Storyboard Dossier Specification & 8-Frame Arc", () => {
  it("contains exactly 8 primary cinematic storyboard frames", () => {
    expect(STORYBOARD_FRAMES).toHaveLength(8);
  });

  it("verifies sequential chapter numbering from 1 to 8", () => {
    STORYBOARD_FRAMES.forEach((frame, idx) => {
      expect(frame.chapter).toBe(idx + 1);
      expect(frame.chapterCode).toMatch(new RegExp(`^0${idx + 1} / `));
    });
  });

  it("ensures each frame has complete camera telemetry", () => {
    STORYBOARD_FRAMES.forEach((frame) => {
      expect(frame.camera.lens).toBeDefined();
      expect(frame.camera.height).toBeDefined();
      expect(frame.camera.movement).toBeDefined();
      expect(frame.camera.focusTarget).toBeDefined();
      expect(frame.camera.fov).toBeGreaterThan(30);
      expect(frame.camera.fov).toBeLessThan(90);
    });
  });

  it("verifies the silent guide bird continuity across all 8 frames", () => {
    STORYBOARD_FRAMES.forEach((frame) => {
      expect(frame.character.state).toBeDefined();
      expect(frame.character.position).toBeDefined();
      expect(frame.character.action).toBeDefined();
      expect(frame.character.meaning).toBeDefined();
    });

    // Frame 1: Perched near kiosk
    expect(STORYBOARD_FRAMES[0].character.state).toContain("Perched");
    // Frame 2: Airborne over watersports
    expect(STORYBOARD_FRAMES[1].character.state).toContain("Airborne");
    // Frame 3: Circling catamaran
    expect(STORYBOARD_FRAMES[2].character.state).toContain("Circling");
    // Frame 4: Onboard railing
    expect(STORYBOARD_FRAMES[3].character.state).toContain("Perched");
    // Frame 5: Hopping basalt
    expect(STORYBOARD_FRAMES[4].character.state).toContain("Hopping");
    // Frame 6: Silhouette at sunset
    expect(STORYBOARD_FRAMES[5].character.state).toContain("silhouette");
    // Frame 7: Night trail glide
    expect(STORYBOARD_FRAMES[6].character.state).toContain("glide");
    // Frame 8: Drone finale resting vantage
    expect(STORYBOARD_FRAMES[7].character.state).toContain("Perched");
  });

  it("ensures authentic coastal Karnataka / Malpe geography references", () => {
    const allText = JSON.stringify(STORYBOARD_FRAMES);
    expect(allText).toContain("Malpe");
    expect(allText).toContain("Arabian Sea");
    expect(allText).toContain("St. Mary");
    expect(allText).toContain("basalt");
    expect(allText).toContain("catamaran");
  });

  it("verifies transition bridge notes between all sequential frames", () => {
    for (let i = 0; i < STORYBOARD_FRAMES.length - 1; i++) {
      const frame = STORYBOARD_FRAMES[i];
      expect(frame.transitionOut).toBeDefined();
      expect(frame.transitionOut.summary).toBeDefined();
      expect(frame.transitionOut.cameraAction).toBeDefined();
      expect(frame.transitionOut.birdAction).toBeDefined();
    }
  });

  it("validates 5-color palette for every frame", () => {
    STORYBOARD_FRAMES.forEach((frame) => {
      expect(frame.palette).toHaveLength(5);
      frame.palette.forEach((p) => {
        expect(p.hex).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(p.name).toBeDefined();
      });
    });
  });

  it("verifies master production asset inventory summary", () => {
    expect(ASSET_INVENTORY_SUMMARY.heroAssets.length).toBeGreaterThanOrEqual(6);
    expect(ASSET_INVENTORY_SUMMARY.environmentSystems.length).toBeGreaterThanOrEqual(5);
    expect(ASSET_INVENTORY_SUMMARY.chromaticProgression).toHaveLength(8);
  });
});
