import React, { useState } from 'react';
import { SplineLandmark, LANDMARK_NODES } from '../../../lib/three/splineNetwork';

export interface DiegeticNauticalMapProps {
  isOpen: boolean;
  currentProgress: number;
  onSelectLandmark: (landmark: SplineLandmark) => void;
  onClose: () => void;
}

const DISPLAY_NAMES = [
  "MALPE COASTAL ROAD",
  "CORAL ARRIVAL PAVILION",
  "NATURE PATH",
  "GATHERING CENTER",
  "VIEWPOINT DECK",
  "MALPE BEACH PROMENADE & SHORELINE"
];

export const DiegeticNauticalMap: React.FC<DiegeticNauticalMapProps> = ({
  isOpen,
  currentProgress,
  onSelectLandmark,
  onClose
}) => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1720]/95 text-[#D4AF37] font-mono overflow-hidden"
      data-testid="diegetic-map"
    >
      {/* Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: 'linear-gradient(to right, #D4AF37 1px, transparent 1px), linear-gradient(to bottom, #D4AF37 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      {/* Bathymetric contours - simulated via SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,20 Q50,40 100,20" fill="none" stroke="#D4AF37" strokeWidth="0.2" />
        <path d="M0,40 Q50,60 100,40" fill="none" stroke="#D4AF37" strokeWidth="0.2" />
        <path d="M0,60 Q50,80 100,60" fill="none" stroke="#D4AF37" strokeWidth="0.2" />
        <path d="M0,80 Q50,100 100,80" fill="none" stroke="#D4AF37" strokeWidth="0.2" />
      </svg>
      
      {/* Watermark */}
      <div className="absolute bottom-8 left-8 text-sm opacity-50 tracking-widest">
        13°21′02″ N · 74°42′08″ E · ARABIAN SEA
      </div>

      {/* Close Button */}
      <button 
        className="absolute top-8 right-8 text-sm tracking-widest hover:text-white transition-colors flex items-center gap-2 group"
        onClick={onClose}
      >
        RETURN TO EXPEDITION 
        <span className="text-[#D4AF37] group-hover:text-white">[✕]</span>
      </button>

      {/* Expedition Route */}
      <div className="relative w-full max-w-5xl h-96 mx-auto mt-32">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
           <line x1="5%" y1="50%" x2="95%" y2="50%" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" className="opacity-50" />
        </svg>

        {LANDMARK_NODES.map((landmark, index) => {
          const isActive = Math.abs(currentProgress - landmark.splineProgress) < 0.1;
          const leftPercent = 5 + (index / (LANDMARK_NODES.length - 1)) * 90;

          return (
            <div 
              key={landmark.id} 
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center justify-center cursor-pointer group z-10"
              style={{ left: `${leftPercent}%` }}
              onMouseEnter={() => setHoveredNode(index)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => {
                onSelectLandmark(landmark);
                onClose();
              }}
              data-testid={`waypoint-${index}`}
            >
              {/* Waypoint Node */}
              <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border border-[#D4AF37] bg-[#0B1720] transition-colors ${hoveredNode === index ? 'bg-[#D4AF37] text-[#0B1720]' : ''}`}>
                <span className="text-xs font-bold">{String(index).padStart(2, '0')}</span>
                
                {/* Active Pulse */}
                {isActive && (
                  <div className="absolute inset-0 rounded-full border border-[#D4AF37] animate-ping" />
                )}
              </div>

              {/* Hover Label */}
              <div className={`absolute top-14 whitespace-nowrap text-sm tracking-widest transition-opacity duration-300 ${hoveredNode === index ? 'opacity-100' : 'opacity-0'}`}>
                {DISPLAY_NAMES[index] || landmark.name.toUpperCase()}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};
