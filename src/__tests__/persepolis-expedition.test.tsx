import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { PersepolisExpedition } from '../components/journey/PersepolisExpedition';
import { Zone01Experience } from '../components/journey/zone01/Zone01Experience';
import '@testing-library/jest-dom';

describe('PersepolisExpedition', () => {
  beforeEach(() => {
    // Mock audio context
    window.AudioContext = vi.fn().mockImplementation(() => ({
      createGain: vi.fn(() => ({
        gain: { 
          setTargetAtTime: vi.fn(), 
          value: 0,
          setValueAtTime: vi.fn(),
          exponentialRampToValueAtTime: vi.fn()
        },
        connect: vi.fn()
      })),
      createBufferSource: vi.fn(() => ({
        connect: vi.fn(),
        start: vi.fn(),
        buffer: {},
        loop: false
      })),
      createBiquadFilter: vi.fn(() => ({
        frequency: { value: 0, setValueAtTime: vi.fn() },
        connect: vi.fn(),
        type: 'lowpass'
      })),
      createOscillator: vi.fn(() => ({
        frequency: { value: 0, setValueAtTime: vi.fn() },
        connect: vi.fn(),
        start: vi.fn(),
        type: 'sine'
      })),
      createBuffer: vi.fn((channels, size, sampleRate) => ({
        getChannelData: vi.fn(() => new Float32Array(size || 100))
      })),
      destination: {},
      currentTime: 0,
      state: 'running',
      sampleRate: 44100,
      resume: vi.fn(),
      suspend: vi.fn(),
      close: vi.fn()
    })) as any;
  });

  it('renders the PersepolisExpedition dynamic loading gate', () => {
    render(<PersepolisExpedition />);
    expect(screen.getByTestId('world-scene-loading')).toBeInTheDocument();
    expect(screen.getByText(/PREPARING 3D DIGITAL TWIN/i)).toBeInTheDocument();
  });

  it('renders the Zone01Experience successfully', () => {
    render(<Zone01Experience />);
    expect(screen.getByText(/MALPE COASTAL ROAD/i)).toBeInTheDocument();
  });
});
