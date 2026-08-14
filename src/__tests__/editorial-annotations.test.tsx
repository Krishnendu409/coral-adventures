import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EditorialAnnotations, ProjectedDiscovery } from '../components/journey/zone01/EditorialAnnotations';

const mockDiscovery = {
  id: 'test-1',
  title: 'Ancient Anchor',
  description: 'A deeply weathered iron anchor.',
};

const mockProjectedDiscoveries: ProjectedDiscovery[] = [
  {
    discovery: mockDiscovery,
    screenX: 25,
    screenY: 75,
    visible: true,
  },
  {
    discovery: { id: 'test-2', title: 'Hidden Cave', description: 'Dark cave' },
    screenX: 50,
    screenY: 50,
    visible: false,
  }
];

describe('EditorialAnnotations', () => {
  it('renders visible pins at correct screen percentages', () => {
    render(
      <EditorialAnnotations
        projectedDiscoveries={mockProjectedDiscoveries}
        activeDiscovery={null}
        onSelectDiscovery={vi.fn()}
        onCloseDiscovery={vi.fn()}
        onStepToDiscovery={vi.fn()}
      />
    );

    const pin = screen.getByTestId('pin-test-1');
    expect(pin).toBeInTheDocument();
    expect(pin).toHaveStyle('left: 25%');
    expect(pin).toHaveStyle('top: 75%');

    // test-2 is not visible
    expect(screen.queryByTestId('pin-test-2')).not.toBeInTheDocument();
  });

  it('clicking a pin triggers onSelectDiscovery', () => {
    const onSelectDiscovery = vi.fn();
    render(
      <EditorialAnnotations
        projectedDiscoveries={mockProjectedDiscoveries}
        activeDiscovery={null}
        onSelectDiscovery={onSelectDiscovery}
        onCloseDiscovery={vi.fn()}
        onStepToDiscovery={vi.fn()}
      />
    );

    const pin = screen.getByTestId('pin-test-1');
    fireEvent.click(pin);
    expect(onSelectDiscovery).toHaveBeenCalledWith(mockDiscovery);
  });

  it('displays field note when activeDiscovery is set', () => {
    const onCloseDiscovery = vi.fn();
    const onStepToDiscovery = vi.fn();
    
    render(
      <EditorialAnnotations
        projectedDiscoveries={mockProjectedDiscoveries}
        activeDiscovery={mockDiscovery}
        onSelectDiscovery={vi.fn()}
        onCloseDiscovery={onCloseDiscovery}
        onStepToDiscovery={onStepToDiscovery}
      />
    );

    expect(screen.getByTestId('field-note-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('field-note-title')).toHaveTextContent('Ancient Anchor');
    expect(screen.getByTestId('field-note-description')).toHaveTextContent('A deeply weathered iron anchor.');
    
    const resumeBtn = screen.getByTestId('resume-button');
    fireEvent.click(resumeBtn);
    expect(onCloseDiscovery).toHaveBeenCalled();

    const stepBtn = screen.getByTestId('step-to-button');
    fireEvent.click(stepBtn);
    expect(onStepToDiscovery).toHaveBeenCalledWith(mockDiscovery);
  });
});
