import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DiegeticNauticalMap } from '../components/journey/zone01/DiegeticNauticalMap';
import { LANDMARK_NODES } from '../lib/three/splineNetwork';

describe('DiegeticNauticalMap', () => {
  const mockOnSelectLandmark = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not render when isOpen is false', () => {
    render(
      <DiegeticNauticalMap 
        isOpen={false} 
        currentProgress={0} 
        onSelectLandmark={mockOnSelectLandmark} 
        onClose={mockOnClose} 
      />
    );
    expect(screen.queryByTestId('diegetic-map')).not.toBeInTheDocument();
  });

  it('renders map when isOpen is true', () => {
    render(
      <DiegeticNauticalMap 
        isOpen={true} 
        currentProgress={0} 
        onSelectLandmark={mockOnSelectLandmark} 
        onClose={mockOnClose} 
      />
    );
    expect(screen.getByTestId('diegetic-map')).toBeInTheDocument();
  });

  it('renders landmark names (MALPE COASTAL ROAD, CORAL ARRIVAL PAVILION, MALPE BEACH PROMENADE & SHORELINE, etc.)', () => {
    render(
      <DiegeticNauticalMap 
        isOpen={true} 
        currentProgress={0} 
        onSelectLandmark={mockOnSelectLandmark} 
        onClose={mockOnClose} 
      />
    );
    expect(screen.getByText('MALPE COASTAL ROAD')).toBeInTheDocument();
    expect(screen.getByText('WELCOME PAVILION')).toBeInTheDocument();
    expect(screen.getByText('LIVING BEACH & SHORELINE')).toBeInTheDocument();
  });

  it('calls onSelectLandmark and onClose when a waypoint is clicked', () => {
    render(
      <DiegeticNauticalMap 
        isOpen={true} 
        currentProgress={0} 
        onSelectLandmark={mockOnSelectLandmark} 
        onClose={mockOnClose} 
      />
    );
    
    // Click the first waypoint
    const waypoint = screen.getByTestId('waypoint-0');
    fireEvent.click(waypoint);
    
    expect(mockOnSelectLandmark).toHaveBeenCalledWith(LANDMARK_NODES[0]);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <DiegeticNauticalMap 
        isOpen={true} 
        currentProgress={0} 
        onSelectLandmark={mockOnSelectLandmark} 
        onClose={mockOnClose} 
      />
    );
    
    const closeBtn = screen.getByRole('button', { name: /RETURN TO EXPEDITION/i });
    fireEvent.click(closeBtn);
    
    expect(mockOnClose).toHaveBeenCalled();
  });
});
