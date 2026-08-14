import React from 'react';
import { LandmarkDiscovery } from '../../../lib/three/splineNetwork';

export interface ProjectedDiscovery {
  discovery: LandmarkDiscovery;
  screenX: number; // 0 to 100 percentage
  screenY: number; // 0 to 100 percentage
  visible: boolean;
}

export interface EditorialAnnotationsProps {
  projectedDiscoveries: ProjectedDiscovery[];
  activeDiscovery: LandmarkDiscovery | null;
  onSelectDiscovery: (discovery: LandmarkDiscovery) => void;
  onCloseDiscovery: () => void;
  onStepToDiscovery: (discovery: LandmarkDiscovery) => void;
}

export const EditorialAnnotations: React.FC<EditorialAnnotationsProps> = ({
  projectedDiscoveries,
  activeDiscovery,
  onSelectDiscovery,
  onCloseDiscovery,
  onStepToDiscovery
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {projectedDiscoveries.map((pd, index) => {
        if (!pd.visible) return null;
        
        return (
          <div
            key={pd.discovery.id || index}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto group cursor-pointer"
            style={{ left: `${pd.screenX}%`, top: `${pd.screenY}%` }}
            onClick={() => onSelectDiscovery(pd.discovery)}
            data-testid={`pin-${pd.discovery.id}`}
          >
            <div className="w-3 h-3 rounded-full bg-[#C5A059] shadow-[0_0_10px_rgba(197,160,89,0.5)] transition-transform group-hover:scale-150" />
            <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-3 py-1.5 border border-[#EFE9DF] shadow-md whitespace-nowrap pointer-events-none">
              <div className="text-[10px] font-mono tracking-widest text-[#6B7C85] uppercase mb-0.5">Discovery</div>
              <div className="text-sm font-serif text-[#1A2328]">{pd.discovery.title}</div>
            </div>
          </div>
        );
      })}

      {activeDiscovery && (
        <div className="absolute inset-0 bg-[#FDFCF7]/80 flex items-center justify-center pointer-events-auto p-4" data-testid="field-note-overlay">
          <div className="max-w-md w-full bg-[#FDFCF7] border border-[#EFE9DF] shadow-2xl p-8 relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] bg-[#C5A059] flex-1" />
              <div className="font-mono text-xs tracking-[0.2em] text-[#C5A059] uppercase">Field Note</div>
              <div className="h-[1px] bg-[#C5A059] flex-1" />
            </div>
            
            <h2 className="font-serif text-3xl text-[#1A2328] mb-2 text-center" data-testid="field-note-title">
              {activeDiscovery.title}
            </h2>
            
            <p className="font-mono text-xs text-[#6B7C85] text-center mb-8 uppercase tracking-wider" data-testid="field-note-subtitle">
              Expedition Registry
            </p>
            
            <div className="text-[#334155] leading-relaxed mb-8 text-center" data-testid="field-note-description">
              {activeDiscovery.description}
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8 text-xs font-mono border-t border-b border-[#EFE9DF] py-4">
              <div className="flex flex-col gap-1">
                <span className="text-[#6B7C85]">Coordinates</span>
                <span className="text-[#1A2328]">13°21'N 74°42'E</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#6B7C85]">Craft</span>
                <span className="text-[#1A2328]">Observation</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
               <button 
                className="w-full py-3 px-6 border border-[#C5A059] text-[#C5A059] font-mono text-xs tracking-widest uppercase hover:bg-[#C5A059] hover:text-white transition-colors duration-300"
                onClick={onCloseDiscovery}
                data-testid="resume-button"
              >
                Resume Expedition &rarr;
              </button>
              <button 
                className="w-full py-3 px-6 bg-[#1A2328] text-white font-mono text-xs tracking-widest uppercase hover:bg-[#2A363E] transition-colors duration-300"
                onClick={() => onStepToDiscovery(activeDiscovery)}
                data-testid="step-to-button"
              >
                Approach Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
