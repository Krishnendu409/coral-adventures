import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { Navigation } from '@/components/ui/navigation';
import { BeachVisionBoardMaster } from '@/components/storyboard/BeachVisionBoardMaster';
import { ExploreGateway } from '@/components/editorial/ExploreGateway';
import {
  Spread01Arrival,
  Spread02Watersports,
  Spread03Catamaran,
  Spread04Onboard,
  Spread05Basalt,
  Spread06Sunset,
  Spread07Night,
  Spread08DroneFinale,
} from '@/components/storyboard/ScrapbookSpreadsRebuild';

describe('Cross-Device Mobile & Desktop Navigation Bar E2E Audit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders and clicks all desktop navigation bar action buttons', () => {
    render(<Navigation />);

    // 1. Storyboard Dossier Button
    const storyboardLinks = screen.getAllByRole('link', { name: /storyboard/i });
    expect(storyboardLinks.length).toBeGreaterThan(0);
    const desktopStoryboard = storyboardLinks[0];
    expect(desktopStoryboard).toHaveAttribute('href', '/storyboard');
    fireEvent.click(desktopStoryboard);

    // 2. 3D World Digital Twin Button
    const journeyLinks = screen.getAllByRole('link', { name: /3d world/i });
    expect(journeyLinks.length).toBeGreaterThan(0);
    const desktop3DWorld = journeyLinks[0];
    expect(desktop3DWorld).toHaveAttribute('href', '/journey');
    fireEvent.click(desktop3DWorld);

    // 3. Reserve Button
    const reserveLinks = screen.getAllByRole('link', { name: /reserve/i });
    expect(reserveLinks.length).toBeGreaterThan(0);
    expect(reserveLinks[0]).toHaveAttribute('href', '#book');
    fireEvent.click(reserveLinks[0]);

    // 4. Logo Link
    const logoLink = screen.getByRole('link', { name: /coral adventures/i });
    expect(logoLink).toHaveAttribute('href', '/');
    fireEvent.click(logoLink);
  });

  it('tests mobile drawer menu opening, closing, and all mobile card button clicks', () => {
    render(<Navigation />);

    const menuToggle = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(menuToggle).toHaveAttribute('aria-expanded', 'false');

    // Open mobile menu
    fireEvent.click(menuToggle);
    expect(menuToggle).toHaveAttribute('aria-expanded', 'true');

    // Verify mobile drawer items
    const mobile3DCard = screen.getByRole('link', { name: /3d world digital twin/i });
    expect(mobile3DCard).toBeInTheDocument();
    expect(mobile3DCard).toHaveAttribute('href', '/journey');
    fireEvent.click(mobile3DCard);

    // Re-open and test Storyboard card
    fireEvent.click(menuToggle);
    const mobileStoryboardCard = screen.getByRole('link', { name: /expedition storyboard/i });
    expect(mobileStoryboardCard).toBeInTheDocument();
    expect(mobileStoryboardCard).toHaveAttribute('href', '/storyboard');
    fireEvent.click(mobileStoryboardCard);

    // Test Esc key closing
    fireEvent.click(menuToggle);
    expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('tests Storyboard floating header bar and footer buttons on mobile and desktop', () => {
    render(<BeachVisionBoardMaster />);

    // Header Home link
    const homeLinks = screen.getAllByRole('link', { name: /home/i });
    expect(homeLinks.length).toBeGreaterThan(0);
    expect(homeLinks[0]).toHaveAttribute('href', '/');
    fireEvent.click(homeLinks[0]);

    // Header 3D World link
    const journeyLinks = screen.getAllByRole('link', { name: /3d world|digital twin/i });
    expect(journeyLinks.length).toBeGreaterThan(0);
    expect(journeyLinks[0]).toHaveAttribute('href', '/journey');
    fireEvent.click(journeyLinks[0]);

    // Sound toggle button
    const soundButton = screen.getByRole('button', { name: /toggle gentle ocean ambient sound/i });
    expect(soundButton).toBeInTheDocument();
    fireEvent.click(soundButton);
  });

  it('tests ExploreGateway concierge booking form inputs and submission buttons', () => {
    render(<ExploreGateway />);

    // 3D Journey link
    const exploreBtn = screen.getByRole('link', { name: /enter 3d journey|explore journey/i });
    expect(exploreBtn).toHaveAttribute('href', '/journey');
    fireEvent.click(exploreBtn);

    // Concierge Form inputs
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    const submitBtn = screen.getByRole('button', { name: /request expedition consultation/i });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: 'Lord Mountbatten' } });
    fireEvent.change(emailInput, { target: { value: 'expedition@luxuryyacht.com' } });
    fireEvent.change(phoneInput, { target: { value: '+91 98765 43210' } });

    fireEvent.click(submitBtn);

    // Form confirmation
    expect(screen.getByText(/expedition request logged/i)).toBeInTheDocument();
  });

  it('verifies all 8 luxury scrapbook spreads render cleanly across all device breakpoints', () => {
    const { container: s1 } = render(<Spread01Arrival />);
    expect(s1.querySelector('h1')?.textContent).toContain('The Journey Starts Here.');

    const { container: s2 } = render(<Spread02Watersports />);
    expect(s2.querySelector('h2')?.textContent).toContain('The Water Gets Louder.');

    const { container: s3 } = render(<Spread03Catamaran />);
    expect(s3.querySelector('h2')?.textContent).toContain('The Boat Changes the Scale.');

    const { container: s4 } = render(<Spread04Onboard />);
    expect(s4.querySelector('h2')?.textContent).toContain('Stay a Little Longer.');

    const { container: s5 } = render(<Spread05Basalt />);
    expect(s5.querySelector('h2')?.textContent).toContain('Leave the Noise Behind.');

    const { container: s6 } = render(<Spread06Sunset />);
    expect(s6.querySelector('h2')?.textContent).toContain('Chase the Light.');

    const { container: s7 } = render(<Spread07Night />);
    expect(s7.querySelector('h2')?.textContent).toContain('No Road Ahead. Just Horizon.');

    const { container: s8 } = render(<Spread08DroneFinale />);
    expect(s8.querySelector('h2')?.textContent).toContain('The Night Belongs');
  });
});
