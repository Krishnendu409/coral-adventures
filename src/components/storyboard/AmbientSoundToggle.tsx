"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function AmbientSoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const toggleAudio = () => {
    if (isPlaying) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 1.2);
        setTimeout(() => {
          setIsPlaying(false);
        }, 1200);
      }
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Generate 5-second pink noise buffer for gentle ocean wave wash
        const bufferSize = ctx.sampleRate * 5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
          b6 = white * 0.115926;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        noiseSourceRef.current = noise;

        // Low-pass filter for deep ocean swell tone
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 420;

        // Wave swell LFO
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.15; // 6.6s ocean wave swell cycle
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 280;
        lfo.connect(filter.frequency);
        lfo.start();

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2.0);
        gainNodeRef.current = gainNode;

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        noise.start();
        setIsPlaying(true);
      } catch {
        // Fallback gracefully if audio blocked
      }
    }
  };

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-2 bg-[#FAF6EE]/90 hover:bg-[#FAF6EE] text-[#0A2540] backdrop-blur-md rounded-full shadow-lg border border-[#0A2540]/15 transition-all text-xs font-mono tracking-wider cursor-pointer"
      title="Toggle gentle ocean ambient sound"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 text-[#C2410C] animate-pulse" />
          <span className="text-[11px] font-semibold text-[#C2410C]">ARABIAN SEA SURF</span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-[#0A2540]/60" />
          <span className="text-[11px] text-[#0A2540]/75">ENABLE AMBIENCE</span>
        </>
      )}
    </button>
  );
}
