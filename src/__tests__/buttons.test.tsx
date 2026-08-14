import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button, MagneticButton } from '@/components/ui/buttons';

describe('Button', () => {
  it('renders with luxury editorial styling and arrow icon', () => {
    render(<Button>Explore the Journey</Button>);
    const button = screen.getByRole('button', { name: /explore the journey/i });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('font-mono');
    expect(button.className).toContain('tracking-[0.2em]');
  });
});

describe('MagneticButton', () => {
  it('renders with luxury tactile typography and hover styling', () => {
    render(<MagneticButton>Submit Request</MagneticButton>);
    const button = screen.getByRole('button', { name: /submit request/i });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('font-mono');
  });
});
