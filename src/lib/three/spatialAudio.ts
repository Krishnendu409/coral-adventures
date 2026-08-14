export interface SpatialAudioEngine {
  start: () => void;
  stop: () => void;
  toggleMute: () => boolean;
  isMuted: () => boolean;
  setAudioZone: (zone: "road" | "gardens" | "pavilion" | "beach") => void;
}

export function createSpatialAudioEngine(): SpatialAudioEngine {
  let context: AudioContext | null = null;
  let isMuted = false;
  let isPlaying = false;
  let currentZone: "road" | "gardens" | "pavilion" | "beach" = "beach";
  
  // Nodes mapping
  const zoneGains: Record<string, GainNode> = {};
  let masterGain: GainNode | null = null;
  let nodesCreated = false;
  
  // Generators
  const oscillators: OscillatorNode[] = [];
  const nodesToDisconnect: AudioNode[] = [];

  const initContext = () => {
    if (context) return true;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return false;
      context = new AudioContextClass();
      return true;
    } catch (e) {
      return false;
    }
  };

  const createNoiseBuffer = (ctx: AudioContext, type: 'white' | 'pink') => {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      let white = Math.random() * 2 - 1;
      output[i] = white;
    }
    return buffer;
  };

  const createAudioNodes = () => {
    if (!context) return;
    if (nodesCreated) return;
    nodesCreated = true;

    masterGain = context.createGain();
    masterGain.gain.value = isMuted ? 0 : 1;
    masterGain.connect(context.destination);

    // Create zone gains
    const zones = ["road", "gardens", "pavilion", "beach"];
    zones.forEach(z => {
      const gain = context!.createGain();
      gain.gain.value = z === currentZone ? 1 : 0;
      gain.connect(masterGain!);
      zoneGains[z] = gain;
    });

    // 1. Road (lowpass filtered noise, 80Hz + distant harbour)
    const roadNoise = context.createBufferSource();
    roadNoise.buffer = createNoiseBuffer(context, 'white');
    roadNoise.loop = true;
    const roadFilter = context.createBiquadFilter();
    roadFilter.type = 'lowpass';
    roadFilter.frequency.value = 80;
    roadNoise.connect(roadFilter);
    roadFilter.connect(zoneGains["road"]);
    nodesToDisconnect.push(roadNoise, roadFilter);
    roadNoise.start();

    // 2. Gardens (bandpass noise, 1.2kHz + oscillators for bird chirps)
    const gardenNoise = context.createBufferSource();
    gardenNoise.buffer = createNoiseBuffer(context, 'white');
    gardenNoise.loop = true;
    const gardenFilter = context.createBiquadFilter();
    gardenFilter.type = 'bandpass';
    gardenFilter.frequency.value = 1200;
    gardenNoise.connect(gardenFilter);
    gardenFilter.connect(zoneGains["gardens"]);
    nodesToDisconnect.push(gardenNoise, gardenFilter);
    gardenNoise.start();

    // 3. Pavilion (soft wind chime harmonics)
    const chimeOsc = context.createOscillator();
    chimeOsc.type = 'sine';
    chimeOsc.frequency.value = 800;
    const chimeGain = context.createGain();
    chimeGain.gain.value = 0.1;
    chimeOsc.connect(chimeGain);
    chimeGain.connect(zoneGains["pavilion"]);
    chimeOsc.start();
    oscillators.push(chimeOsc);
    nodesToDisconnect.push(chimeGain);

    // 4. Beach (wave surge, swept lowpass)
    const beachNoise = context.createBufferSource();
    beachNoise.buffer = createNoiseBuffer(context, 'white');
    beachNoise.loop = true;
    const beachFilter = context.createBiquadFilter();
    beachFilter.type = 'lowpass';
    beachFilter.frequency.value = 400; 
    beachNoise.connect(beachFilter);
    beachFilter.connect(zoneGains["beach"]);
    nodesToDisconnect.push(beachNoise, beachFilter);
    beachNoise.start();
  };

  return {
    start: () => {
      if (!initContext()) return;
      if (context?.state === 'suspended') {
        context.resume();
      }
      if (!isPlaying) {
        createAudioNodes();
        isPlaying = true;
      }
    },
    stop: () => {
      if (context && isPlaying) {
        context.suspend();
        isPlaying = false;
      }
    },
    toggleMute: () => {
      isMuted = !isMuted;
      if (masterGain && context) {
        masterGain.gain.setTargetAtTime(isMuted ? 0 : 1, context.currentTime, 0.1);
      }
      return isMuted;
    },
    isMuted: () => isMuted,
    setAudioZone: (zone: "road" | "gardens" | "pavilion" | "beach") => {
      currentZone = zone;
      if (context && isPlaying) {
        const time = context.currentTime;
        Object.keys(zoneGains).forEach(z => {
          const target = z === zone ? 1 : 0;
          zoneGains[z].gain.setTargetAtTime(target, time, 1.0); // 1 sec crossfade
        });
      }
    }
  };
}
