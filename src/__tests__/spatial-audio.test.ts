import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createSpatialAudioEngine } from '../lib/three/spatialAudio';

describe('SpatialAudioEngine', () => {
  beforeEach(() => {
    // Mock AudioContext for headless testing environment
    (global as any).window = (global as any).window || {};
    (global as any).window.AudioContext = class {
      state = 'suspended';
      currentTime = 0;
      sampleRate = 44100;
      destination = {};

      createGain() {
        return {
          gain: { value: 1, setTargetAtTime: vi.fn() },
          connect: vi.fn()
        };
      }

      createBufferSource() {
        return {
          buffer: null,
          loop: false,
          connect: vi.fn(),
          start: vi.fn(),
          stop: vi.fn()
        };
      }

      createBuffer() {
        return {
          getChannelData: () => new Float32Array(44100 * 2)
        };
      }

      createBiquadFilter() {
        return {
          type: 'lowpass',
          frequency: { value: 1000 },
          Q: { value: 1.0 },
          connect: vi.fn()
        };
      }

      createOscillator() {
        return {
          type: 'sine',
          frequency: { value: 440 },
          connect: vi.fn(),
          start: vi.fn(),
          stop: vi.fn()
        };
      }

      resume() {
        this.state = 'running';
        return Promise.resolve();
      }

      suspend() {
        this.state = 'suspended';
        return Promise.resolve();
      }
    };
  });

  afterEach(() => {
    delete (global as any).window.AudioContext;
  });

  it('initializes cleanly without side effects', () => {
    const engine = createSpatialAudioEngine();
    expect(engine).toBeDefined();
    expect(engine.isMuted()).toBe(false);
    expect(engine.getCurrentZone()).toBe('beach');
  });

  it('handles mute toggling correctly', () => {
    const engine = createSpatialAudioEngine();
    engine.start();
    expect(engine.isMuted()).toBe(false);
    expect(engine.toggleMute()).toBe(true);
    expect(engine.isMuted()).toBe(true);
    expect(engine.toggleMute()).toBe(false);
    expect(engine.isMuted()).toBe(false);
  });

  it('transitions across all 4 spatial audio zones seamlessly', () => {
    const engine = createSpatialAudioEngine();
    engine.start();

    // Zone 00: Approach Road
    engine.setAudioZone('road');
    expect(engine.getCurrentZone()).toBe('road');

    // Zone 01: Arrival Gardens
    engine.setAudioZone('gardens');
    expect(engine.getCurrentZone()).toBe('gardens');

    // Zone 02: Welcome Pavilion
    engine.setAudioZone('pavilion');
    expect(engine.getCurrentZone()).toBe('pavilion');

    // Zone 03: Exploration Deck & Beach
    engine.setAudioZone('beach');
    expect(engine.getCurrentZone()).toBe('beach');
  });

  it('supports lifecycle start and stop calls', () => {
    const engine = createSpatialAudioEngine();
    engine.start();
    engine.stop();
    expect(engine).toBeDefined();
  });

  it('handles missing AudioContext gracefully without throwing', () => {
    delete (global as any).window.AudioContext;
    const engine = createSpatialAudioEngine();
    expect(() => engine.start()).not.toThrow();
    expect(() => engine.setAudioZone('road')).not.toThrow();
    expect(() => engine.toggleMute()).not.toThrow();
    expect(() => engine.stop()).not.toThrow();
  });
});
