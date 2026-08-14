"use client";

import React, { useRef, useEffect, useState } from "react";

type FormationType = "compass" | "bird" | "wave" | "constellation";

interface DroneParticle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  size: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export function DroneFormationSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeFormation, setActiveFormation] = useState<FormationType>("compass");
  const particlesRef = useRef<DroneParticle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Generate target coordinates for each formation
  const getFormationTargets = (type: FormationType, width: number, height: number, count: number) => {
    const targets: { x: number; y: number; color: string }[] = [];
    const centerX = width / 2;
    const centerY = height * 0.42; // slightly elevated in the sky

    const colors = ["#FAF6EE", "#25C4C0", "#E05A36", "#F59E0B", "#38BDF8"];

    if (type === "compass") {
      // 1. Nautical Compass Rose with outer ring and 8 points
      const radiusOuter = Math.min(width, height) * 0.28;
      const radiusInner = radiusOuter * 0.45;

      for (let i = 0; i < count; i++) {
        const ratio = i / count;
        if (i < 80) {
          // Outer circle
          const angle = (i / 80) * Math.PI * 2;
          targets.push({
            x: centerX + Math.cos(angle) * radiusOuter,
            y: centerY + Math.sin(angle) * radiusOuter,
            color: colors[0],
          });
        } else if (i < 160) {
          // Inner circle
          const angle = ((i - 80) / 80) * Math.PI * 2;
          targets.push({
            x: centerX + Math.cos(angle) * radiusInner,
            y: centerY + Math.sin(angle) * radiusInner,
            color: colors[1],
          });
        } else {
          // 8 star points
          const pointIndex = (i - 160) % 8;
          const pointAngle = (pointIndex / 8) * Math.PI * 2 - Math.PI / 2;
          const distRatio = ((i - 160) / (count - 160));
          const r = radiusInner + (radiusOuter * 1.35 - radiusInner) * ((i % 18) / 18);
          targets.push({
            x: centerX + Math.cos(pointAngle) * r,
            y: centerY + Math.sin(pointAngle) * r,
            color: pointIndex % 2 === 0 ? colors[2] : colors[3],
          });
        }
      }
    } else if (type === "bird") {
      // 2. Soaring Guide Bird in Flight
      const span = Math.min(width, height) * 0.7;
      for (let i = 0; i < count; i++) {
        const t = (i / count) * 2 - 1; // -1 to +1
        // Wing curve: parabola with wingtip curl
        const wingY = centerY - Math.abs(t) * span * 0.3 + Math.sin(Math.abs(t) * Math.PI) * span * 0.15;
        const wingX = centerX + t * (span * 0.5);

        // Body and head
        if (i % 6 === 0) {
          const bodyY = centerY + (i / count) * 40 - 20;
          targets.push({
            x: centerX + (Math.sin(i) * 8),
            y: bodyY,
            color: colors[0],
          });
        } else {
          targets.push({
            x: wingX,
            y: wingY + (Math.sin(i * 3) * 6),
            color: Math.abs(t) > 0.6 ? colors[1] : colors[2],
          });
        }
      }
    } else if (type === "wave") {
      // 3. Rolling Arabian Sea Wave Crest
      const waveWidth = width * 0.75;
      for (let i = 0; i < count; i++) {
        const t = i / count;
        const x = centerX - waveWidth / 2 + t * waveWidth;
        // Wave curve with curling barrel
        const y = centerY + Math.sin(t * Math.PI * 2.5) * 50 - (Math.pow(t, 2) * 40);
        targets.push({
          x: x + (Math.sin(i * 5) * 4),
          y: y + (Math.cos(i * 3) * 8),
          color: t > 0.7 ? colors[0] : t > 0.4 ? colors[1] : colors[4],
        });
      }
    } else {
      // 4. St. Mary's Celestial Constellation Map
      for (let i = 0; i < count; i++) {
        const ring = Math.floor(i / 50);
        const ringAngle = (i % 50) * ((Math.PI * 2) / 50);
        const radius = (ring + 1) * 35;
        targets.push({
          x: centerX + Math.cos(ringAngle + ring) * radius,
          y: centerY + Math.sin(ringAngle * 1.5) * radius * 0.7,
          color: colors[i % colors.length],
        });
      }
    }

    return targets;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateDimensions = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    updateDimensions();

    const droneCount = 280;
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;

    // Initialize particles if empty
    if (particlesRef.current.length === 0) {
      const initialTargets = getFormationTargets(activeFormation, width, height, droneCount);
      particlesRef.current = initialTargets.map((t, idx) => ({
        x: width * 0.5 + (Math.random() - 0.5) * 100,
        y: height * 0.85 + (Math.random() - 0.5) * 50,
        targetX: t.x,
        targetY: t.y,
        color: t.color,
        size: 2.2 + Math.random() * 1.2,
        alpha: 0.8 + Math.random() * 0.2,
        pulseSpeed: 1.5 + Math.random() * 2,
        pulsePhase: Math.random() * Math.PI * 2,
      }));
    } else {
      // Update targets on formation change
      const newTargets = getFormationTargets(activeFormation, width, height, droneCount);
      particlesRef.current.forEach((p, idx) => {
        if (newTargets[idx]) {
          p.targetX = newTargets[idx].x;
          p.targetY = newTargets[idx].y;
          p.color = newTargets[idx].color;
        }
      });
    }

    let time = 0;
    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Deep Night Sky Backdrop with Subtle Stars
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, "#040D18");
      grad.addColorStop(0.65, "#071A2B");
      grad.addColorStop(1, "#0A2540");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Subtle Ocean Waterline at Bottom
      const waterY = height * 0.72;
      ctx.fillStyle = "#030A12";
      ctx.fillRect(0, waterY, width, height - waterY);

      // Water Horizon Glow
      const horizonGlow = ctx.createLinearGradient(0, waterY - 10, 0, waterY + 40);
      horizonGlow.addColorStop(0, "rgba(37, 196, 192, 0.15)");
      horizonGlow.addColorStop(1, "rgba(7, 26, 43, 0)");
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, waterY - 10, width, 50);

      // 2. Draw and Animate Drone Particles
      particlesRef.current.forEach((p, idx) => {
        // Smooth lerp physics toward target
        p.x += (p.targetX - p.x) * 0.055;
        p.y += (p.targetY - p.y) * 0.055;

        // Micro atmospheric hover drift
        const hoverX = Math.sin(time * 2 + idx) * 1.2;
        const hoverY = Math.cos(time * 1.8 + idx) * 1.2;

        const currentX = p.x + hoverX;
        const currentY = p.y + hoverY;

        const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.3 + 0.7;

        // Draw Drone Core Point
        ctx.beginPath();
        ctx.arc(currentX, currentY, p.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8 * pulse;
        ctx.fill();

        // 3. Draw Fragmented Water Reflection on Ocean Below
        if (currentY < waterY) {
          const reflectionY = waterY + (waterY - currentY) * 0.38;
          if (reflectionY < height) {
            const waveJitter = Math.sin(time * 3 + currentX * 0.08) * 6;
            ctx.beginPath();
            ctx.ellipse(
              currentX + waveJitter,
              reflectionY,
              p.size * 2 * pulse,
              p.size * 0.8,
              0,
              0,
              Math.PI * 2
            );
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 12;
            ctx.globalAlpha = 0.25 * pulse;
            ctx.fill();
            ctx.globalAlpha = 1.0;
          }
        }
      });

      // Reset shadow for subsequent draws
      ctx.shadowBlur = 0;

      // 4. Foreground Basalt Silhouette in Lower Left
      ctx.fillStyle = "#02070D";
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, height * 0.78);
      ctx.lineTo(width * 0.12, height * 0.75);
      ctx.lineTo(width * 0.18, height * 0.82);
      ctx.lineTo(width * 0.28, height * 0.88);
      ctx.lineTo(width * 0.35, height);
      ctx.closePath();
      ctx.fill();

      // Guide Bird Silhouette perched on the basalt rock
      const birdX = width * 0.12;
      const birdY = height * 0.75;
      ctx.fillStyle = "#010408";
      ctx.beginPath();
      ctx.ellipse(birdX, birdY - 4, 6, 9, -0.2, 0, Math.PI * 2); // Body
      ctx.arc(birdX + 2, birdY - 14, 4, 0, Math.PI * 2); // Head
      ctx.fill();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      updateDimensions();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeFormation]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#040D18] shadow-2xl p-4 sm:p-6 text-white select-none">
      {/* Simulator Control Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#25C4C0] animate-pulse" />
          <span className="font-bold tracking-widest uppercase text-white">
            300-DRONE SWARM CHOREOGRAPHY ENGINE (FRAME 08 SIMULATOR)
          </span>
        </div>
        <span className="text-white/50 text-[11px]">
          INTERACTIVE KINETIC FORMATION STATE PREVIEW
        </span>
      </div>

      {/* Canvas Viewport */}
      <div className="relative w-full h-[360px] sm:h-[440px] rounded-xl overflow-hidden border border-white/5 bg-[#040D18]">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Live HUD Overlay */}
        <div className="absolute top-4 left-4 p-3 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono space-y-1">
          <div className="text-white/60">ACTIVE FORMATION: <span className="font-bold text-[#25C4C0] uppercase">{activeFormation}</span></div>
          <div className="text-white/60">DRONE FLEET COUNT: <span className="text-white">280 AIRCRAFT</span></div>
          <div className="text-white/60">ALTITUDE SPAN: <span className="text-white">45m — 140m ASL</span></div>
          <div className="text-white/60">SEA REFLECTION: <span className="text-[#10B981]">ACTIVE MODULATION</span></div>
        </div>
      </div>

      {/* Formation Preset Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        {[
          { id: "compass", name: "01. Compass Rose", desc: "Nautical emblem" },
          { id: "bird", name: "02. Soaring Bird", desc: "Guide character" },
          { id: "wave", name: "03. Wave Crest", desc: "Arabian Sea swell" },
          { id: "constellation", name: "04. Constellation", desc: "Celestial geometry" },
        ].map((f) => {
          const isActive = activeFormation === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActiveFormation(f.id as FormationType)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                isActive
                  ? "border-[#25C4C0] bg-[#25C4C0]/20 text-white ring-1 ring-[#25C4C0]"
                  : "border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
              }`}
            >
              <span className="text-xs font-mono font-bold block">{f.name}</span>
              <span className="text-[10px] font-sans text-white/50">{f.desc}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
