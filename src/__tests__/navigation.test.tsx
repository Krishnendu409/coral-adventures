import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navigation } from '@/components/ui/navigation';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('Navigation', () => {
  it('renders navigation links and provides keyboard access', async () => {
    render(<Navigation />);
    const link = screen.getByRole('link', { name: /horizons/i });
    expect(link).toBeInTheDocument();
    
    // Check keyboard focus
    link.focus();
    expect(document.activeElement).toBe(link);
  });

  it('renders mobile menu button with correct accessibility attributes', () => {
    render(<Navigation />);
    const button = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', 'mobile-menu');
  });
});
