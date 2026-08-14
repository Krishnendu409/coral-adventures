export interface SpatialAudioEngine {
  start: () => void;
  stop: () => void;
  toggleMute: () => boolean;
  isMuted: () => boolean;
  setAudioZone: (zone: "road" | "gardens" | "pavilion" | "beach") => void;
  getCurrentZone: () => "road" | "gardens" | "pavilion" | "beach";
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
  
  // Generators & node references
  const oscillators: OscillatorNode[] = [];
  const nodesToDisconnect: AudioNode[] = [];

  const initContext = () => {
    if (context) return true;
    try {
      const AudioContextClass = typeof window !== 'undefined'
        ? (window.AudioContext || (window as any).webkitAudioContext)
        : null;
      if (!AudioContextClass) return false;
      context = new AudioContextClass();
      return true;
    } catch (e) {
      return false;
    }
  };

  const createNoiseBuffer = (ctx: AudioContext) => {
    const bufferSize = ctx.sampleRate ? ctx.sampleRate * 2 : 88200;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate || 44100);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  };

  const createAudioNodes = () => {
    if (!context) return;
    if (nodesCreated) return;
    nodesCreated = true;

    masterGain = context.createGain();
    if (masterGain.gain) {
      masterGain.gain.value = isMuted ? 0 : 1;
    }
    if (masterGain.connect && context.destination) {
      masterGain.connect(context.destination);
    }

    // Create 4 zone gain nodes
    const zones: Array<"road" | "gardens" | "pavilion" | "beach"> = ["road", "gardens", "pavilion", "beach"];
    zones.forEach(z => {
      const gain = context!.createGain();
      if (gain.gain) {
        gain.gain.value = z === currentZone ? 1 : 0;
      }
      if (gain.connect && masterGain) {
        gain.connect(masterGain);
      }
      zoneGains[z] = gain;
    });

    // ----------------------------------------------------
    // Zone 00: Approach Road ("road")
    // Canopy rustle in high palms, Brahminy kites, distant muffled surf
    // ----------------------------------------------------
    const roadCanopyNoise = context.createBufferSource();
    roadCanopyNoise.buffer = createNoiseBuffer(context);
    roadCanopyNoise.loop = true;
    const roadCanopyFilter = context.createBiquadFilter();
    roadCanopyFilter.type = 'bandpass';
    if (roadCanopyFilter.frequency) roadCanopyFilter.frequency.value = 1800;
    if (roadCanopyNoise.connect) roadCanopyNoise.connect(roadCanopyFilter);
    if (roadCanopyFilter.connect) roadCanopyFilter.connect(zoneGains["road"]);
    if (roadCanopyNoise.start) roadCanopyNoise.start();
    nodesToDisconnect.push(roadCanopyNoise, roadCanopyFilter);

    const kiteOsc = context.createOscillator();
    kiteOsc.type = 'sine';
    if (kiteOsc.frequency) kiteOsc.frequency.value = 2600;
    const kiteGain = context.createGain();
    if (kiteGain.gain) kiteGain.gain.value = 0.04;
    if (kiteOsc.connect) kiteOsc.connect(kiteGain);
    if (kiteGain.connect) kiteGain.connect(zoneGains["road"]);
    if (kiteOsc.start) kiteOsc.start();
    oscillators.push(kiteOsc);
    nodesToDisconnect.push(kiteGain);

    const roadSurfNoise = context.createBufferSource();
    roadSurfNoise.buffer = createNoiseBuffer(context);
    roadSurfNoise.loop = true;
    const roadSurfFilter = context.createBiquadFilter();
    roadSurfFilter.type = 'lowpass';
    if (roadSurfFilter.frequency) roadSurfFilter.frequency.value = 90;
    if (roadSurfNoise.connect) roadSurfNoise.connect(roadSurfFilter);
    if (roadSurfFilter.connect) roadSurfFilter.connect(zoneGains["road"]);
    if (roadSurfNoise.start) roadSurfNoise.start();
    nodesToDisconnect.push(roadSurfNoise, roadSurfFilter);

    // ----------------------------------------------------
    // Zone 01: Arrival Gardens ("gardens")
    // Tropical undergrowth breeze, insects, bamboo rustle
    // ----------------------------------------------------
    const gardenBreezeNoise = context.createBufferSource();
    gardenBreezeNoise.buffer = createNoiseBuffer(context);
    gardenBreezeNoise.loop = true;
    const gardenBreezeFilter = context.createBiquadFilter();
    gardenBreezeFilter.type = 'bandpass';
    if (gardenBreezeFilter.frequency) gardenBreezeFilter.frequency.value = 1200;
    if (gardenBreezeNoise.connect) gardenBreezeNoise.connect(gardenBreezeFilter);
    if (gardenBreezeFilter.connect) gardenBreezeFilter.connect(zoneGains["gardens"]);
    if (gardenBreezeNoise.start) gardenBreezeNoise.start();
    nodesToDisconnect.push(gardenBreezeNoise, gardenBreezeFilter);

    const insectOsc = context.createOscillator();
    insectOsc.type = 'sine';
    if (insectOsc.frequency) insectOsc.frequency.value = 5200;
    const insectGain = context.createGain();
    if (insectGain.gain) insectGain.gain.value = 0.03;
    if (insectOsc.connect) insectOsc.connect(insectGain);
    if (insectGain.connect) insectGain.connect(zoneGains["gardens"]);
    if (insectOsc.start) insectOsc.start();
    oscillators.push(insectOsc);
    nodesToDisconnect.push(insectGain);

    const bambooNoise = context.createBufferSource();
    bambooNoise.buffer = createNoiseBuffer(context);
    bambooNoise.loop = true;
    const bambooFilter = context.createBiquadFilter();
    bambooFilter.type = 'bandpass';
    if (bambooFilter.frequency) bambooFilter.frequency.value = 850;
    if (bambooNoise.connect) bambooNoise.connect(bambooFilter);
    if (bambooFilter.connect) bambooFilter.connect(zoneGains["gardens"]);
    if (bambooNoise.start) bambooNoise.start();
    nodesToDisconnect.push(bambooNoise, bambooFilter);

    // ----------------------------------------------------
    // Zone 02: Welcome Pavilion ("pavilion")
    // Flapping sailcloth canvas, creaking weathered teak, soft breeze, wind chime
    // ----------------------------------------------------
    const sailNoise = context.createBufferSource();
    sailNoise.buffer = createNoiseBuffer(context);
    sailNoise.loop = true;
    const sailFilter = context.createBiquadFilter();
    sailFilter.type = 'bandpass';
    if (sailFilter.frequency) sailFilter.frequency.value = 450;
    if (sailNoise.connect) sailNoise.connect(sailFilter);
    if (sailFilter.connect) sailFilter.connect(zoneGains["pavilion"]);
    if (sailNoise.start) sailNoise.start();
    nodesToDisconnect.push(sailNoise, sailFilter);

    const teakOsc = context.createOscillator();
    teakOsc.type = 'sawtooth';
    if (teakOsc.frequency) teakOsc.frequency.value = 220;
    const teakFilter = context.createBiquadFilter();
    teakFilter.type = 'lowpass';
    if (teakFilter.frequency) teakFilter.frequency.value = 350;
    const teakGain = context.createGain();
    if (teakGain.gain) teakGain.gain.value = 0.03;
    if (teakOsc.connect) teakOsc.connect(teakFilter);
    if (teakFilter.connect) teakFilter.connect(teakGain);
    if (teakGain.connect) teakGain.connect(zoneGains["pavilion"]);
    if (teakOsc.start) teakOsc.start();
    oscillators.push(teakOsc);
    nodesToDisconnect.push(teakFilter, teakGain);

    const chime1 = context.createOscillator();
    chime1.type = 'sine';
    if (chime1.frequency) chime1.frequency.value = 784; // G5
    const chime1Gain = context.createGain();
    if (chime1Gain.gain) chime1Gain.gain.value = 0.06;
    if (chime1.connect) chime1.connect(chime1Gain);
    if (chime1Gain.connect) chime1Gain.connect(zoneGains["pavilion"]);
    if (chime1.start) chime1.start();
    oscillators.push(chime1);
    nodesToDisconnect.push(chime1Gain);

    const chime2 = context.createOscillator();
    chime2.type = 'sine';
    if (chime2.frequency) chime2.frequency.value = 1046; // C6
    const chime2Gain = context.createGain();
    if (chime2Gain.gain) chime2Gain.gain.value = 0.04;
    if (chime2.connect) chime2.connect(chime2Gain);
    if (chime2Gain.connect) chime2Gain.connect(zoneGains["pavilion"]);
    if (chime2.start) chime2.start();
    oscillators.push(chime2);
    nodesToDisconnect.push(chime2Gain);

    // ----------------------------------------------------
    // Zone 03: Exploration Deck & Beach ("beach")
    // Arabian Sea ocean swells, breaking surf swash, halyards, water lapping hulls
    // ----------------------------------------------------
    const beachSurfNoise = context.createBufferSource();
    beachSurfNoise.buffer = createNoiseBuffer(context);
    beachSurfNoise.loop = true;
    const beachSurfFilter = context.createBiquadFilter();
    beachSurfFilter.type = 'lowpass';
    if (beachSurfFilter.frequency) beachSurfFilter.frequency.value = 500;
    if (beachSurfNoise.connect) beachSurfNoise.connect(beachSurfFilter);
    if (beachSurfFilter.connect) beachSurfFilter.connect(zoneGains["beach"]);
    if (beachSurfNoise.start) beachSurfNoise.start();
    nodesToDisconnect.push(beachSurfNoise, beachSurfFilter);

    const halyardOsc = context.createOscillator();
    halyardOsc.type = 'triangle';
    if (halyardOsc.frequency) halyardOsc.frequency.value = 1950;
    const halyardGain = context.createGain();
    if (halyardGain.gain) halyardGain.gain.value = 0.04;
    if (halyardOsc.connect) halyardOsc.connect(halyardGain);
    if (halyardGain.connect) halyardGain.connect(zoneGains["beach"]);
    if (halyardOsc.start) halyardOsc.start();
    oscillators.push(halyardOsc);
    nodesToDisconnect.push(halyardGain);

    const lapNoise = context.createBufferSource();
    lapNoise.buffer = createNoiseBuffer(context);
    lapNoise.loop = true;
    const lapFilter = context.createBiquadFilter();
    lapFilter.type = 'bandpass';
    if (lapFilter.frequency) lapFilter.frequency.value = 650;
    if (lapNoise.connect) lapNoise.connect(lapFilter);
    if (lapFilter.connect) lapFilter.connect(zoneGains["beach"]);
    if (lapNoise.start) lapNoise.start();
    nodesToDisconnect.push(lapNoise, lapFilter);
  };

  return {
    start: () => {
      if (!initContext()) return;
      if (context?.state === 'suspended' && typeof context.resume === 'function') {
        context.resume();
      }
      if (!isPlaying) {
        createAudioNodes();
        isPlaying = true;
      }
    },
    stop: () => {
      if (context && isPlaying && typeof context.suspend === 'function') {
        context.suspend();
        isPlaying = false;
      }
    },
    toggleMute: () => {
      isMuted = !isMuted;
      if (masterGain && context) {
        const time = context.currentTime || 0;
        const target = isMuted ? 0 : 1;
        if (masterGain.gain && typeof masterGain.gain.setTargetAtTime === 'function') {
          masterGain.gain.setTargetAtTime(target, time, 0.1);
        } else if (masterGain.gain) {
          masterGain.gain.value = target;
        }
      }
      return isMuted;
    },
    isMuted: () => isMuted,
    setAudioZone: (zone: "road" | "gardens" | "pavilion" | "beach") => {
      currentZone = zone;
      if (context && isPlaying) {
        const time = context.currentTime || 0;
        Object.keys(zoneGains).forEach(z => {
          const target = z === zone ? 1 : 0;
          const g = zoneGains[z]?.gain;
          if (g) {
            if (typeof g.setTargetAtTime === 'function') {
              g.setTargetAtTime(target, time, 0.8);
            } else {
              g.value = target;
            }
          }
        });
      }
    },
    getCurrentZone: () => currentZone
  };
}
