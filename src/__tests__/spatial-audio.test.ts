import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createSpatialAudioEngine } from '../lib/three/spatialAudio';

describe('SpatialAudioEngine', () => {
  beforeEach(() => {
    // Mock AudioContext for headless testing
    (global as any).window = (global as any).window || {};
    (global as any).window.AudioContext = class {
      state = 'suspended';
      currentTime = 0;
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

  it('initializes without throwing errors', () => {
    const engine = createSpatialAudioEngine();
    expect(engine).toBeDefined();
  });

  it('handles mute toggling', () => {
    const engine = createSpatialAudioEngine();
    engine.start();
    expect(engine.isMuted()).toBe(false);
    expect(engine.toggleMute()).toBe(true);
    expect(engine.isMuted()).toBe(true);
  });

  it('can transition zones', () => {
    const engine = createSpatialAudioEngine();
    engine.start();
    expect(() => engine.setAudioZone('road')).not.toThrow();
    expect(() => engine.setAudioZone('gardens')).not.toThrow();
    expect(() => engine.setAudioZone('pavilion')).not.toThrow();
    expect(() => engine.setAudioZone('beach')).not.toThrow();
  });

  it('handles start and stop', () => {
    const engine = createSpatialAudioEngine();
    engine.start();
    engine.stop();
    expect(true).toBe(true);
  });
  
  it('handles missing AudioContext gracefully', () => {
    delete (global as any).window.AudioContext;
    const engine = createSpatialAudioEngine();
    expect(() => engine.start()).not.toThrow();
    expect(() => engine.setAudioZone('road')).not.toThrow();
  });
});
