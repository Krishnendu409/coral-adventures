import * as THREE from 'three';

/**
 * Procedural PBR Texture Generator
 * Creates realistic, high-resolution textures dynamically:
 * - Coastal Sand (fine grains, wind ripples, normal map)
 * - Karnataka Laterite Stone (porous reddish-brown gravel)
 * - Weathered Coastal Teak Wood (linear grain, plank seams, knots)
 * - Natural Linen Canvas (woven fibers, subtle folds)
 * - Palm Frond Leaf Alpha & Albedo (feathered leaflets, stem, veins)
 * - Expedition Route Map (navigational chart parchment)
 */

function createFallbackTexture(): THREE.Texture {
  return new THREE.Texture();
}

export function createSandTexture(): { map: THREE.Texture; normalMap: THREE.Texture; roughnessMap: THREE.Texture } {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { 
      map: createFallbackTexture(), 
      normalMap: createFallbackTexture(),
      roughnessMap: createFallbackTexture() 
    };
  }

  const size = 512;
  const canvas = window.document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return { 
      map: createFallbackTexture(), 
      normalMap: createFallbackTexture(),
      roughnessMap: createFallbackTexture() 
    };
  }

  // Height map for Sobel normal calculation
  const heights = new Float32Array(size * size);
  const angle = 0.28; // ~16 degree wind shear angle
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = y * size + x;
      // Seamless wrapped coordinates
      const nx = (x / size) * Math.PI * 2;
      const ny = (y / size) * Math.PI * 2;
      
      const u = (x * cosA + y * sinA) * 0.07;
      const v = (-x * sinA + y * cosA) * 0.035;

      // Multi-harmonic wind-blown sand ripples
      const r1 = Math.sin(u * 2.0 + Math.cos(v * 1.5) * 1.6) * 7.5;
      const r2 = Math.sin(u * 4.2 - v * 0.8) * 3.2;
      const r3 = Math.cos((u + v) * 8.5) * 1.4;
      const microGrain = (Math.sin(nx * 32.0) * Math.cos(ny * 32.0) + (Math.random() - 0.5)) * 1.8;

      heights[idx] = r1 + r2 + r3 + microGrain;
    }
  }

  // Albedo Map: Warm golden Malpe beach sand tone with grain noise and ripple crest highlights
  const imgData = ctx.createImageData(size, size);
  const data = imgData.data;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = y * size + x;
      const pIdx = idx * 4;
      const h = heights[idx];
      const grain = (Math.random() - 0.5) * 16;
      const crest = Math.max(0, h * 1.5);

      // Base warm golden sand tone (#EAD6B8 -> #DEC4A0)
      data[pIdx] = Math.min(255, Math.max(0, 234 + crest + grain));     // R
      data[pIdx + 1] = Math.min(255, Math.max(0, 214 + crest * 0.8 + grain * 0.85)); // G
      data[pIdx + 2] = Math.min(255, Math.max(0, 184 + crest * 0.5 + grain * 0.7));  // B
      data[pIdx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(16, 24);

  // Normal Map via central difference Sobel filter
  const nCanvas = window.document.createElement('canvas');
  nCanvas.width = size;
  nCanvas.height = size;
  const nCtx = nCanvas.getContext('2d');
  if (!nCtx) {
    return { map: texture, normalMap: createFallbackTexture(), roughnessMap: createFallbackTexture() };
  }

  const nData = nCtx.createImageData(size, size);
  const normalStrength = 0.22;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const left = heights[y * size + ((x - 1 + size) % size)];
      const right = heights[y * size + ((x + 1) % size)];
      const top = heights[((y - 1 + size) % size) * size + x];
      const bottom = heights[((y + 1) % size) * size + x];

      const dx = (right - left) * normalStrength;
      const dy = (bottom - top) * normalStrength;
      const dz = 1.0;

      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const nx = -dx / len;
      const ny = -dy / len;
      const nz = dz / len;

      const pIdx = (y * size + x) * 4;
      nData.data[pIdx] = Math.floor((nx * 0.5 + 0.5) * 255);
      nData.data[pIdx + 1] = Math.floor((ny * 0.5 + 0.5) * 255);
      nData.data[pIdx + 2] = Math.floor((nz * 0.5 + 0.5) * 255);
      nData.data[pIdx + 3] = 255;
    }
  }
  nCtx.putImageData(nData, 0, 0);
  const normalTexture = new THREE.CanvasTexture(nCanvas);
  normalTexture.wrapS = THREE.RepeatWrapping;
  normalTexture.wrapT = THREE.RepeatWrapping;
  normalTexture.repeat.set(16, 24);

  // Roughness Map
  const rCanvas = window.document.createElement('canvas');
  rCanvas.width = size;
  rCanvas.height = size;
  const rCtx = rCanvas.getContext('2d');
  if (!rCtx) {
    return { map: texture, normalMap: normalTexture, roughnessMap: createFallbackTexture() };
  }

  const rData = rCtx.createImageData(size, size);
  for (let i = 0; i < rData.data.length; i += 4) {
    const rough = Math.floor(220 + (Math.random() - 0.5) * 30);
    rData.data[i] = rough;
    rData.data[i + 1] = rough;
    rData.data[i + 2] = rough;
    rData.data[i + 3] = 255;
  }
  rCtx.putImageData(rData, 0, 0);
  const roughnessTexture = new THREE.CanvasTexture(rCanvas);
  roughnessTexture.wrapS = THREE.RepeatWrapping;
  roughnessTexture.wrapT = THREE.RepeatWrapping;
  roughnessTexture.repeat.set(16, 24);

  return { map: texture, normalMap: normalTexture, roughnessMap: roughnessTexture };
}

/**
 * Karnataka Laterite Gravel & Porous Stone PBR Texture
 * Rich iron-oxide red-brown pigments with porous cavities & crushed stone facets
 */
export function createLateriteTexture(): { map: THREE.Texture; normalMap: THREE.Texture; roughnessMap: THREE.Texture } {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { 
      map: createFallbackTexture(), 
      normalMap: createFallbackTexture(),
      roughnessMap: createFallbackTexture() 
    };
  }

  const size = 512;
  const canvas = window.document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return { 
      map: createFallbackTexture(), 
      normalMap: createFallbackTexture(),
      roughnessMap: createFallbackTexture() 
    };
  }

  const heights = new Float32Array(size * size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = y * size + x;
      // Porous laterite cellular structure
      const cell1 = Math.sin(x * 0.15) * Math.cos(y * 0.15) * 6.0;
      const cell2 = Math.sin(x * 0.35 + y * 0.2) * 3.5;
      const cavity = (Math.sin(x * 0.08) * Math.sin(y * 0.08) < -0.3) ? -8.0 : 0.0;
      const grain = (Math.random() - 0.5) * 6.0;

      heights[idx] = cell1 + cell2 + cavity + grain;
    }
  }

  const imgData = ctx.createImageData(size, size);
  const data = imgData.data;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = y * size + x;
      const pIdx = idx * 4;
      const h = heights[idx];
      const grain = (Math.random() - 0.5) * 20;

      // Base Karnataka Laterite #9E5A44 (R:158, G:90, B:68)
      let r = 158 + h * 2.5 + grain;
      let g = 90 + h * 1.5 + grain * 0.6;
      let b = 68 + h * 1.0 + grain * 0.4;

      if (h < -4.0) {
        // Deep porous cavities
        r *= 0.65;
        g *= 0.6;
        b *= 0.55;
      }

      data[pIdx] = Math.min(255, Math.max(0, r));
      data[pIdx + 1] = Math.min(255, Math.max(0, g));
      data[pIdx + 2] = Math.min(255, Math.max(0, b));
      data[pIdx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(12, 18);

  // Laterite Normal Map
  const nCanvas = window.document.createElement('canvas');
  nCanvas.width = size;
  nCanvas.height = size;
  const nCtx = nCanvas.getContext('2d');
  if (!nCtx) {
    return { map: texture, normalMap: createFallbackTexture(), roughnessMap: createFallbackTexture() };
  }

  const nData = nCtx.createImageData(size, size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const left = heights[y * size + ((x - 1 + size) % size)];
      const right = heights[y * size + ((x + 1) % size)];
      const top = heights[((y - 1 + size) % size) * size + x];
      const bottom = heights[((y + 1) % size) * size + x];

      const dx = (right - left) * 0.28;
      const dy = (bottom - top) * 0.28;
      const dz = 1.0;

      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const nx = -dx / len;
      const ny = -dy / len;
      const nz = dz / len;

      const pIdx = (y * size + x) * 4;
      nData.data[pIdx] = Math.floor((nx * 0.5 + 0.5) * 255);
      nData.data[pIdx + 1] = Math.floor((ny * 0.5 + 0.5) * 255);
      nData.data[pIdx + 2] = Math.floor((nz * 0.5 + 0.5) * 255);
      nData.data[pIdx + 3] = 255;
    }
  }
  nCtx.putImageData(nData, 0, 0);
  const normalTexture = new THREE.CanvasTexture(nCanvas);
  normalTexture.wrapS = THREE.RepeatWrapping;
  normalTexture.wrapT = THREE.RepeatWrapping;
  normalTexture.repeat.set(12, 18);

  // Roughness Map
  const rCanvas = window.document.createElement('canvas');
  rCanvas.width = size;
  rCanvas.height = size;
  const rCtx = rCanvas.getContext('2d');
  if (!rCtx) {
    return { map: texture, normalMap: normalTexture, roughnessMap: createFallbackTexture() };
  }

  const rData = rCtx.createImageData(size, size);
  for (let i = 0; i < rData.data.length; i += 4) {
    const rough = Math.floor(240 + (Math.random() - 0.5) * 25);
    rData.data[i] = rough;
    rData.data[i + 1] = rough;
    rData.data[i + 2] = rough;
    rData.data[i + 3] = 255;
  }
  rCtx.putImageData(rData, 0, 0);
  const roughnessTexture = new THREE.CanvasTexture(rCanvas);
  roughnessTexture.wrapS = THREE.RepeatWrapping;
  roughnessTexture.wrapT = THREE.RepeatWrapping;
  roughnessTexture.repeat.set(12, 18);

  return { map: texture, normalMap: normalTexture, roughnessMap: roughnessTexture };
}

/**
 * Coastal Weathered Laterite Rock PBR Texture
 * Stratified volcanic & laterite rock patina for boulders and cliff formations
 */
export function createLateriteRockTexture(): { map: THREE.Texture; normalMap: THREE.Texture; roughnessMap: THREE.Texture } {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { 
      map: createFallbackTexture(), 
      normalMap: createFallbackTexture(),
      roughnessMap: createFallbackTexture() 
    };
  }

  const size = 512;
  const canvas = window.document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return { 
      map: createFallbackTexture(), 
      normalMap: createFallbackTexture(),
      roughnessMap: createFallbackTexture() 
    };
  }

  const heights = new Float32Array(size * size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = y * size + x;
      // Horizontal stratified cleavage and jagged fracture lines
      const strata = Math.sin(y * 0.12 + Math.cos(x * 0.04) * 3.0) * 8.0;
      const fracture = Math.sin(x * 0.25 + y * 0.08) * 4.5;
      const microRoughness = (Math.random() - 0.5) * 5.0;

      heights[idx] = strata + fracture + microRoughness;
    }
  }

  const imgData = ctx.createImageData(size, size);
  const data = imgData.data;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = y * size + x;
      const pIdx = idx * 4;
      const h = heights[idx];
      const noise = (Math.random() - 0.5) * 18;

      // Stratified laterite / basalt palette: #5C3D2B base, #7A4B33 rust bands, #3D2C22 charcoal shadow
      let r = 92 + h * 2.2 + noise;
      let g = 61 + h * 1.4 + noise * 0.7;
      let b = 43 + h * 1.0 + noise * 0.5;

      data[pIdx] = Math.min(255, Math.max(0, r));
      data[pIdx + 1] = Math.min(255, Math.max(0, g));
      data[pIdx + 2] = Math.min(255, Math.max(0, b));
      data[pIdx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  // Rock Normal Map
  const nCanvas = window.document.createElement('canvas');
  nCanvas.width = size;
  nCanvas.height = size;
  const nCtx = nCanvas.getContext('2d');
  if (!nCtx) {
    return { map: texture, normalMap: createFallbackTexture(), roughnessMap: createFallbackTexture() };
  }

  const nData = nCtx.createImageData(size, size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const left = heights[y * size + ((x - 1 + size) % size)];
      const right = heights[y * size + ((x + 1) % size)];
      const top = heights[((y - 1 + size) % size) * size + x];
      const bottom = heights[((y + 1) % size) * size + x];

      const dx = (right - left) * 0.35;
      const dy = (bottom - top) * 0.35;
      const dz = 1.0;

      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const nx = -dx / len;
      const ny = -dy / len;
      const nz = dz / len;

      const pIdx = (y * size + x) * 4;
      nData.data[pIdx] = Math.floor((nx * 0.5 + 0.5) * 255);
      nData.data[pIdx + 1] = Math.floor((ny * 0.5 + 0.5) * 255);
      nData.data[pIdx + 2] = Math.floor((nz * 0.5 + 0.5) * 255);
      nData.data[pIdx + 3] = 255;
    }
  }
  nCtx.putImageData(nData, 0, 0);
  const normalTexture = new THREE.CanvasTexture(nCanvas);
  normalTexture.wrapS = THREE.RepeatWrapping;
  normalTexture.wrapT = THREE.RepeatWrapping;

  // Roughness Map
  const rCanvas = window.document.createElement('canvas');
  rCanvas.width = size;
  rCanvas.height = size;
  const rCtx = rCanvas.getContext('2d');
  if (!rCtx) {
    return { map: texture, normalMap: normalTexture, roughnessMap: createFallbackTexture() };
  }

  const rData = rCtx.createImageData(size, size);
  for (let i = 0; i < rData.data.length; i += 4) {
    const rough = Math.floor(245 + (Math.random() - 0.5) * 20);
    rData.data[i] = rough;
    rData.data[i + 1] = rough;
    rData.data[i + 2] = rough;
    rData.data[i + 3] = 255;
  }
  rCtx.putImageData(rData, 0, 0);
  const roughnessTexture = new THREE.CanvasTexture(rCanvas);

  return { map: texture, normalMap: normalTexture, roughnessMap: roughnessTexture };
}

export function createTeakWoodTexture(): { map: THREE.Texture; normalMap: THREE.Texture; roughnessMap: THREE.Texture } {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { 
      map: createFallbackTexture(), 
      normalMap: createFallbackTexture(),
      roughnessMap: createFallbackTexture() 
    };
  }

  const size = 512;
  const canvas = window.document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return { 
      map: createFallbackTexture(), 
      normalMap: createFallbackTexture(),
      roughnessMap: createFallbackTexture() 
    };
  }

  const heights = new Float32Array(size * size);

  // Knot whorl parameters
  const knots = [
    { x: 140, y: 180, r: 24, swirl: 18 },
    { x: 380, y: 340, r: 30, swirl: -22 },
    { x: 220, y: 460, r: 18, swirl: 14 }
  ];

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = y * size + x;

      // Base linear grain with organic distortion
      let grainDistortX = x;
      let grainDistortY = y;

      for (const knot of knots) {
        const dx = x - knot.x;
        const dy = y - knot.y;
        const distSq = dx * dx + dy * dy;
        const radiusSq = knot.r * knot.r * 6;
        if (distSq < radiusSq) {
          const factor = Math.exp(-distSq / (knot.r * knot.r * 2.5));
          const angle = Math.atan2(dy, dx) + knot.swirl * factor * 0.15;
          const dist = Math.sqrt(distSq);
          grainDistortX += Math.cos(angle) * dist * factor * 0.4;
          grainDistortY += Math.sin(angle) * dist * factor * 0.4;
        }
      }

      // Multi-octave fine wood rings & medullary rays
      const ring1 = Math.sin(grainDistortY * 0.08 + Math.cos(grainDistortX * 0.015) * 4.0) * 6.0;
      const ring2 = Math.sin(grainDistortY * 0.22 + Math.sin(grainDistortX * 0.03) * 2.0) * 3.2;
      const fineFibers = Math.sin(grainDistortY * 1.2) * 1.5 + (Math.random() - 0.5) * 2.0;

      // Plank seams every 64 pixels with bevel chamfer
      const plankY = y % 64;
      let seam = 0;
      if (plankY < 3 || plankY > 61) {
        seam = -8.0;
      } else if (plankY === 3 || plankY === 61) {
        seam = -3.5;
      }

      heights[idx] = ring1 + ring2 + fineFibers + seam;
    }
  }

  // Albedo Generation: Aged Weathered Malpe Coastal Teak
  const imgData = ctx.createImageData(size, size);
  const data = imgData.data;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = y * size + x;
      const pIdx = idx * 4;
      const h = heights[idx];
      const fiberNoise = (Math.random() - 0.5) * 12;

      // Rich golden amber heartwood to weathered umber
      // Base: #6B462B (R:107, G:70, B:43)
      let r = 108 + h * 2.2 + fiberNoise;
      let g = 72 + h * 1.6 + fiberNoise * 0.7;
      let b = 45 + h * 1.1 + fiberNoise * 0.5;

      // Check knot proximity for darker knot core
      for (const knot of knots) {
        const dx = x - knot.x;
        const dy = y - knot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < knot.r) {
          const kFactor = 1.0 - (dist / knot.r);
          r -= kFactor * 42;
          g -= kFactor * 32;
          b -= kFactor * 22;
        }
      }

      // Dark shadow in plank grooves
      const plankY = y % 64;
      if (plankY < 3 || plankY > 61) {
        r *= 0.52;
        g *= 0.48;
        b *= 0.45;
      }

      data[pIdx] = Math.min(255, Math.max(0, r));
      data[pIdx + 1] = Math.min(255, Math.max(0, g));
      data[pIdx + 2] = Math.min(255, Math.max(0, b));
      data[pIdx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  // Wood Normal Map
  const nCanvas = window.document.createElement('canvas');
  nCanvas.width = size;
  nCanvas.height = size;
  const nCtx = nCanvas.getContext('2d');
  if (!nCtx) {
    return { map: texture, normalMap: createFallbackTexture(), roughnessMap: createFallbackTexture() };
  }

  const nData = nCtx.createImageData(size, size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const left = heights[y * size + ((x - 1 + size) % size)];
      const right = heights[y * size + ((x + 1) % size)];
      const top = heights[((y - 1 + size) % size) * size + x];
      const bottom = heights[((y + 1) % size) * size + x];

      const dx = (right - left) * 0.25;
      const dy = (bottom - top) * 0.25;
      const dz = 1.0;

      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const nx = -dx / len;
      const ny = -dy / len;
      const nz = dz / len;

      const pIdx = (y * size + x) * 4;
      nData.data[pIdx] = Math.floor((nx * 0.5 + 0.5) * 255);
      nData.data[pIdx + 1] = Math.floor((ny * 0.5 + 0.5) * 255);
      nData.data[pIdx + 2] = Math.floor((nz * 0.5 + 0.5) * 255);
      nData.data[pIdx + 3] = 255;
    }
  }
  nCtx.putImageData(nData, 0, 0);
  const normalTexture = new THREE.CanvasTexture(nCanvas);
  normalTexture.wrapS = THREE.RepeatWrapping;
  normalTexture.wrapT = THREE.RepeatWrapping;

  // Wood Roughness Map
  const rCanvas = window.document.createElement('canvas');
  rCanvas.width = size;
  rCanvas.height = size;
  const rCtx = rCanvas.getContext('2d');
  if (!rCtx) {
    return { map: texture, normalMap: normalTexture, roughnessMap: createFallbackTexture() };
  }

  const rData = rCtx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = y * size + x;
      const pIdx = idx * 4;
      const plankY = y % 64;
      let baseRough = 160 + (Math.random() - 0.5) * 20; // Satin teak polish
      if (plankY < 3 || plankY > 61) {
        baseRough = 240; // High roughness in plank joint groove
      }
      rData.data[pIdx] = baseRough;
      rData.data[pIdx + 1] = baseRough;
      rData.data[pIdx + 2] = baseRough;
      rData.data[pIdx + 3] = 255;
    }
  }
  rCtx.putImageData(rData, 0, 0);
  const roughnessTexture = new THREE.CanvasTexture(rCanvas);
  roughnessTexture.wrapS = THREE.RepeatWrapping;
  roughnessTexture.wrapT = THREE.RepeatWrapping;

  return { map: texture, normalMap: normalTexture, roughnessMap: roughnessTexture };
}

/** Export aliases for flexible imports */
export const createWoodTexture = createTeakWoodTexture;

export function createPalmFrondTexture(): THREE.Texture {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return createFallbackTexture();
  }

  const width = 512;
  const height = 1024;
  const canvas = window.document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return createFallbackTexture();

  ctx.clearRect(0, 0, width, height);

  // Central thick fibrous rachis (frond spine)
  const gradient = ctx.createLinearGradient(width / 2, height, width / 2, 20);
  gradient.addColorStop(0, '#5C4A28'); // Woody brownish base
  gradient.addColorStop(0.3, '#7D8C38'); // Olive green mid-spine
  gradient.addColorStop(1, '#A0B448'); // Bright apex tip

  ctx.strokeStyle = gradient;
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(width / 2, height - 10);
  ctx.quadraticCurveTo(width / 2 + 8, height * 0.5, width / 2, 24);
  ctx.stroke();

  // Dense, layered pinnate leaflets (64 pairs radiating outward)
  const pairs = 72;
  for (let i = 0; i < pairs; i++) {
    const t = i / pairs;
    const y = (height - 30) - t * (height - 60);
    
    // Natural parabolic leaflet length profile: short at base, longest in middle, tapering at apex
    const baseLengthFactor = Math.sin(t * Math.PI);
    const leafLen = (baseLengthFactor * (width * 0.44)) + (Math.sin(i * 1.3) * 6);
    const leafWidth = 3.5 + Math.sin(t * Math.PI) * 3.0;
    const droopAngle = 0.22 + t * 0.42 + (Math.sin(i * 0.7) * 0.05);

    // Leaflet color with realistic sunlight penetration gradient
    const rVal = Math.floor(38 + t * 45 + (i % 3) * 8);
    const gVal = Math.floor(105 + Math.sin(t * Math.PI) * 45 + (i % 2) * 12);
    const bVal = Math.floor(24 + t * 20);
    const leafColor = `rgba(${rVal}, ${gVal}, ${bVal}, 0.95)`;
    const highlightColor = `rgba(${rVal + 25}, ${gVal + 20}, ${bVal + 15}, 0.95)`;

    // Left leaflet (tapered polygon)
    const lxEnd = width / 2 - leafLen;
    const lyEnd = y + leafLen * Math.sin(droopAngle);
    const lCtrlX = width / 2 - leafLen * 0.55;
    const lCtrlY = y - leafLen * 0.12;

    ctx.fillStyle = (i % 2 === 0) ? leafColor : highlightColor;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 3, y - leafWidth * 0.5);
    ctx.quadraticCurveTo(lCtrlX, lCtrlY - leafWidth * 0.4, lxEnd, lyEnd);
    ctx.quadraticCurveTo(lCtrlX, lCtrlY + leafWidth * 0.4, width / 2 - 3, y + leafWidth * 0.5);
    ctx.closePath();
    ctx.fill();

    // Right leaflet (tapered polygon)
    const rxEnd = width / 2 + leafLen;
    const ryEnd = y + leafLen * Math.sin(droopAngle);
    const rCtrlX = width / 2 + leafLen * 0.55;
    const rCtrlY = y - leafLen * 0.12;

    ctx.fillStyle = (i % 2 === 0) ? highlightColor : leafColor;
    ctx.beginPath();
    ctx.moveTo(width / 2 + 3, y - leafWidth * 0.5);
    ctx.quadraticCurveTo(rCtrlX, rCtrlY - leafWidth * 0.4, rxEnd, ryEnd);
    ctx.quadraticCurveTo(rCtrlX, rCtrlY + leafWidth * 0.4, width / 2 + 3, y + leafWidth * 0.5);
    ctx.closePath();
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function createBroadleafTexture(): THREE.Texture {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return createFallbackTexture();
  }

  const size = 512;
  const canvas = window.document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return createFallbackTexture();

  ctx.clearRect(0, 0, size, size);

  // Large tropical heart/lanceolate leaf blade (Monstera / Alocasia shape)
  const cx = size / 2;
  const topY = 40;
  const botY = size - 40;

  // Leaf blade fill with glossy forest gradient
  const grad = ctx.createRadialGradient(cx, size * 0.4, 20, cx, size * 0.5, size * 0.5);
  grad.addColorStop(0, '#4A7D2C');
  grad.addColorStop(0.6, '#2E551B');
  grad.addColorStop(1, '#1D3B10');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(cx, topY);
  ctx.bezierCurveTo(size - 30, size * 0.25, size - 40, size * 0.7, cx, botY);
  ctx.bezierCurveTo(40, size * 0.7, 30, size * 0.25, cx, topY);
  ctx.closePath();
  ctx.fill();

  // Prominent pale midrib vein
  ctx.strokeStyle = '#7AA844';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(cx, botY);
  ctx.lineTo(cx, topY + 10);
  ctx.stroke();

  // Lateral pinnate veins
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = 'rgba(135, 180, 80, 0.75)';
  for (let y = botY - 40; y > topY + 50; y -= 35) {
    const prog = (botY - y) / (botY - topY);
    const span = Math.sin(prog * Math.PI) * (size * 0.38);

    // Left lateral vein
    ctx.beginPath();
    ctx.moveTo(cx, y);
    ctx.quadraticCurveTo(cx - span * 0.5, y - 20, cx - span, y - 35);
    ctx.stroke();

    // Right lateral vein
    ctx.beginPath();
    ctx.moveTo(cx, y);
    ctx.quadraticCurveTo(cx + span * 0.5, y - 20, cx + span, y - 35);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function createLinenCanopyTexture(): THREE.Texture {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return createFallbackTexture();
  }

  const size = 512;
  const canvas = window.document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return createFallbackTexture();

  // Base warm natural ivory tone
  ctx.fillStyle = '#F4EFE6';
  ctx.fillRect(0, 0, size, size);

  // Micro woven linen warp and weft fibers
  for (let x = 0; x < size; x += 2) {
    const alpha = 0.08 + (Math.random() * 0.08);
    ctx.strokeStyle = `rgba(180, 165, 145, ${alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, size);
    ctx.stroke();
  }

  for (let y = 0; y < size; y += 2) {
    const alpha = 0.08 + (Math.random() * 0.08);
    ctx.strokeStyle = `rgba(180, 165, 145, ${alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }

  // Structural seam tape bands with stitch details
  for (let i = 0; i < size; i += 128) {
    // Seam band shadow and tape
    ctx.fillStyle = 'rgba(195, 180, 158, 0.45)';
    ctx.fillRect(i, 0, 12, size);

    // Double stitching line
    ctx.strokeStyle = 'rgba(120, 105, 88, 0.7)';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    
    ctx.beginPath();
    ctx.moveTo(i + 3, 0);
    ctx.lineTo(i + 3, size);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i + 9, 0);
    ctx.lineTo(i + 9, size);
    ctx.stroke();
    
    ctx.setLineDash([]);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

export const createCanvasTexture = createLinenCanopyTexture;

/**
 * Expedition Route Map Nautical Chart Texture
 * Photorealistic navigational chart for the concierge reception desk
 */
export function createExpeditionMapTexture(): THREE.Texture {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return createFallbackTexture();
  }

  const size = 512;
  const canvas = window.document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return createFallbackTexture();

  // Aged parchment paper background #EFE6D5
  ctx.fillStyle = '#EDE2CF';
  ctx.fillRect(0, 0, size, size);

  // Subtle paper grain noise & vignette edges
  for (let i = 0; i < 4000; i++) {
    const rx = Math.random() * size;
    const ry = Math.random() * size;
    ctx.fillStyle = `rgba(140, 115, 80, ${Math.random() * 0.08})`;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Border and Graticule Grid (Latitude/Longitude)
  ctx.strokeStyle = 'rgba(120, 95, 65, 0.5)';
  ctx.lineWidth = 2;
  ctx.strokeRect(16, 16, size - 32, size - 32);
  ctx.strokeStyle = 'rgba(120, 95, 65, 0.2)';
  ctx.lineWidth = 1;

  for (let i = 48; i < size - 16; i += 48) {
    ctx.beginPath();
    ctx.moveTo(i, 16);
    ctx.lineTo(i, size - 16);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(16, i);
    ctx.lineTo(size - 16, i);
    ctx.stroke();
  }

  // Coastline of Malpe (East side of chart)
  ctx.fillStyle = 'rgba(215, 195, 165, 0.6)';
  ctx.beginPath();
  ctx.moveTo(size - 80, 20);
  ctx.bezierCurveTo(size - 100, 150, size - 70, 280, size - 90, size - 20);
  ctx.lineTo(size - 20, size - 20);
  ctx.lineTo(size - 20, 20);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#8B6B48';
  ctx.lineWidth = 2;
  ctx.stroke();

  // St. Mary's Island Outlines (West side archipelago)
  const islands = [
    { x: 120, y: 160, rx: 28, ry: 45, angle: 0.2 },
    { x: 155, y: 240, rx: 18, ry: 26, angle: -0.3 },
    { x: 110, y: 310, rx: 22, ry: 32, angle: 0.15 }
  ];

  ctx.fillStyle = '#6E5339';
  ctx.strokeStyle = '#4A3420';
  ctx.lineWidth = 1.5;
  for (const isl of islands) {
    ctx.beginPath();
    ctx.ellipse(isl.x, isl.y, isl.rx, isl.ry, isl.angle, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  // Bathymetric Depth Contours
  ctx.strokeStyle = 'rgba(80, 115, 140, 0.45)';
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 4]);

  ctx.beginPath();
  ctx.ellipse(135, 230, 70, 150, 0.1, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(140, 230, 110, 190, 0.1, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Expedition Catamaran Route (Dashed Crimson Track)
  ctx.strokeStyle = '#A8281E';
  ctx.lineWidth = 2.5;
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.moveTo(size - 110, 360); // Malpe Departure Pier
  ctx.bezierCurveTo(280, 320, 220, 260, 160, 220); // Route to St. Mary's
  ctx.stroke();
  ctx.setLineDash([]);

  // Waypoint Markers
  const waypoints = [
    { x: size - 110, y: 360, label: 'WP-01 DEPARTURE' },
    { x: 260, y: 300, label: 'WP-02 REEF SHOAL' },
    { x: 160, y: 220, label: 'WP-03 BASALT COVE' }
  ];

  for (const wp of waypoints) {
    ctx.fillStyle = '#A8281E';
    ctx.beginPath();
    ctx.arc(wp.x, wp.y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#4A3320';
    ctx.font = 'bold 9px monospace';
    ctx.fillText(wp.label, wp.x + 8, wp.y + 3);
  }

  // Compass Rose
  const cx = 360;
  const cy = 130;
  ctx.strokeStyle = '#5A402A';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, 32, 0, Math.PI * 2);
  ctx.stroke();

  // Cardinal Points
  ctx.fillStyle = '#8B251E'; // North arrow
  ctx.beginPath();
  ctx.moveTo(cx, cy - 38);
  ctx.lineTo(cx + 6, cy);
  ctx.lineTo(cx, cy - 4);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#3A281A';
  ctx.beginPath();
  ctx.moveTo(cx, cy - 38);
  ctx.lineTo(cx - 6, cy);
  ctx.lineTo(cx, cy - 4);
  ctx.closePath();
  ctx.fill();

  // Typography Header
  ctx.fillStyle = '#2C1E12';
  ctx.font = 'bold 12px serif';
  ctx.fillText("MALPE HARBOUR & ST. MARY'S ARCHIPELAGO", 32, 40);
  ctx.font = 'italic 9px sans-serif';
  ctx.fillText("EXPEDITION NAUTICAL CHART · 13°21'02\"N 74°42'08\"E", 32, 54);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
