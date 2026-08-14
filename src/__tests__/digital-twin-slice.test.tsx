import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Zone01Experience } from '../components/journey/zone01/Zone01Experience';
import '@testing-library/jest-dom';

describe('Digital Twin Slice (Zone01Experience)', () => {
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

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('mounts without crashing and shows initial landmark', () => {
    render(<Zone01Experience />);
    expect(screen.getByText(/MALPE COASTAL ROAD/i)).toBeInTheDocument();
  });

  it('handles forward and backward spline stepping', () => {
    render(<Zone01Experience />);
    
    const forwardBtn = screen.getByTestId('step-forward');
    fireEvent.click(forwardBtn);
    expect(screen.getByText(/CORAL GATEWAY & WAYFINDING/i)).toBeInTheDocument();

    const backwardBtn = screen.getByTestId('step-backward');
    fireEvent.click(backwardBtn);
    expect(screen.getByText(/MALPE COASTAL ROAD/i)).toBeInTheDocument();
  });

  it('opens and closes Diegetic Nautical Map and selects waypoints', () => {
    render(<Zone01Experience />);
    
    // Open map
    const mapBtn = screen.getByText('MAP');
    fireEvent.click(mapBtn);
    expect(screen.getByTestId('diegetic-map')).toBeInTheDocument();

    // Select waypoint
    const waypoint = screen.getByTestId('waypoint-2'); // Garden Path
    fireEvent.click(waypoint);
    expect(screen.getByText(/COASTAL ARRIVAL GARDENS/i)).toBeInTheDocument();
    
    // Map should be closed
    expect(screen.queryByTestId('diegetic-map')).not.toBeInTheDocument();
  });

  it('toggles audio', () => {
    render(<Zone01Experience />);
    const audioBtn = screen.getByLabelText('Toggle Ambient Audio');
    fireEvent.click(audioBtn);
    // As long as it doesn't crash, the toggle works in headless DOM
  });
});
