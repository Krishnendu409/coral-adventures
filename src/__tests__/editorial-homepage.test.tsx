import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { ArrivalComposition } from '@/components/editorial/ArrivalComposition';
import { CoastComposition } from '@/components/editorial/CoastComposition';
import { ExpeditionTypology } from '@/components/editorial/ExpeditionTypology';
import { WatersportsComposition } from '@/components/editorial/WatersportsComposition';
import { TurnkeyVoyage } from '@/components/editorial/TurnkeyVoyage';
import { NauticalChartComposition } from '@/components/editorial/NauticalChartComposition';
import { VesselComposition } from '@/components/editorial/VesselComposition';
import { ExpeditionSteps } from '@/components/editorial/ExpeditionSteps';
import { OpenSeaComposition } from '@/components/editorial/OpenSeaComposition';
import { SunsetComposition } from '@/components/editorial/SunsetComposition';
import { DinnerComposition } from '@/components/editorial/DinnerComposition';
import { GuestMemoriesScrapbook } from '@/components/editorial/GuestMemoriesScrapbook';
import { NightComposition } from '@/components/editorial/NightComposition';
import { ExpeditionFAQ } from '@/components/editorial/ExpeditionFAQ';
import { ExploreGateway } from '@/components/editorial/ExploreGateway';

describe('Editorial Homepage Compositions', () => {
  it('renders Scene 01: ArrivalComposition with title and statement', () => {
    render(<ArrivalComposition />);
    expect(screen.getByRole('heading', { level: 1, name: /coral/i })).toBeInTheDocument();
    expect(screen.getByText(/the coast is only the beginning/i)).toBeInTheDocument();
  });

  it('renders Scene 02: CoastComposition with basalt storytelling and coordinates', () => {
    render(<CoastComposition />);
    expect(screen.getByRole('heading', { level: 2, name: /coast.*wild/i })).toBeInTheDocument();
    expect(screen.getByText(/02 \/ the coast/i)).toBeInTheDocument();
  });

  it('renders Section 02.B: ExpeditionTypology matrix with interactive passages', () => {
    render(<ExpeditionTypology />);
    expect(screen.getByRole('heading', { level: 3, name: /expedition tailored/i })).toBeInTheDocument();
    expect(screen.getAllByText(/sunset westbound voyage/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/private catamaran charter/i).length).toBeGreaterThan(0);
  });

  it('renders Scene 03: WatersportsComposition with active energy', () => {
    render(<WatersportsComposition />);
    expect(screen.getByRole('heading', { level: 2, name: /water.*moves/i })).toBeInTheDocument();
    expect(screen.getByText(/active expedition dynamics/i)).toBeInTheDocument();
  });

  it('renders Section 03.B: TurnkeyVoyage with full-bleed ocean and maritime operations', () => {
    render(<TurnkeyVoyage />);
    expect(screen.getByRole('heading', { level: 2, name: /you just travel/i })).toBeInTheDocument();
    expect(screen.getByText(/malpe port berth #2/i)).toBeInTheDocument();
    expect(screen.getByText(/solas safety standard/i)).toBeInTheDocument();
  });

  it('renders Scene 04: NauticalChartComposition with route telemetry', () => {
    render(<NauticalChartComposition />);
    expect(screen.getByText(/trajectory/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /the route/i })).toBeInTheDocument();
  });

  it('renders Scene 05: VesselComposition with verified vessel specs', () => {
    render(<VesselComposition />);
    expect(screen.getByRole('heading', { level: 2, name: /built.*further/i })).toBeInTheDocument();
    expect(screen.getAllByText(/25\.90/i).length).toBeGreaterThan(0);
  });

  it('renders Section 05.B: ExpeditionSteps with 4-stage voyage pacing', () => {
    render(<ExpeditionSteps />);
    expect(screen.getByRole('heading', { level: 3, name: /how your expedition comes/i })).toBeInTheDocument();
    expect(screen.getAllByText(/arrive/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/discover/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/sail/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/return/i).length).toBeGreaterThan(0);
  });

  it('renders Scene 06: OpenSeaComposition with horizon quote', () => {
    render(<OpenSeaComposition />);
    expect(screen.getByRole('heading', { level: 2, name: /open sea/i })).toBeInTheDocument();
    expect(screen.getByText(/no roads\. just horizon/i)).toBeInTheDocument();
  });

  it('renders Scene 07: SunsetComposition with Chase The Light', () => {
    render(<SunsetComposition />);
    expect(screen.getByRole('heading', { level: 2, name: /chase/i })).toBeInTheDocument();
    expect(screen.getByText(/sunset westbound on the arabian sea/i)).toBeInTheDocument();
  });

  it('renders Scene 08: DinnerComposition with coastal gastronomy', () => {
    render(<DinnerComposition />);
    expect(screen.getByRole('heading', { level: 2, name: /dinner/i })).toBeInTheDocument();
    expect(screen.getAllByText(/stay out a little longer/i).length).toBeGreaterThan(0);
  });

  it('renders Section 08.B: GuestMemoriesScrapbook with authentic field log quotes', () => {
    render(<GuestMemoriesScrapbook />);
    expect(screen.getByRole('heading', { level: 3, name: /field logs/i })).toBeInTheDocument();
    expect(screen.getByText(/st\. mary's archipelago/i)).toBeInTheDocument();
  });

  it('renders Scene 09: NightComposition with midnight sea quote', () => {
    render(<NightComposition />);
    expect(screen.getByRole('heading', { level: 2, name: /night.*sea/i })).toBeInTheDocument();
  });

  it('renders Section 10.A: ExpeditionFAQ with stacked tickets and accordion answers', () => {
    render(<ExpeditionFAQ />);
    expect(screen.getByRole('heading', { level: 3, name: /clarifications/i })).toBeInTheDocument();
    expect(screen.getByText(/can we book a private charter/i)).toBeInTheDocument();
    expect(screen.getByText(/st\. mary's basalt discovery/i)).toBeInTheDocument();
  });

  it('renders Scene 10: ExploreGateway with 3D link and concierge desk', () => {
    render(<ExploreGateway />);
    expect(screen.getByRole('link', { name: /enter 3d journey/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /where/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: /see you/i })).toBeInTheDocument();
  });
});
