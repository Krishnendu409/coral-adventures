import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { JourneyExperience } from "@/components/journey/JourneyExperience";
import { ArrivalScene } from "@/components/journey/ArrivalScene";
import { BeachScene } from "@/components/journey/BeachScene";
import { WaterScene } from "@/components/journey/WaterScene";
import { ActivityScene } from "@/components/journey/ActivityScene";
import { JettyScene } from "@/components/journey/JettyScene";
import { VesselScene } from "@/components/journey/VesselScene";
import { DepartureScene } from "@/components/journey/DepartureScene";
import { ChartScene } from "@/components/journey/ChartScene";
import { UnderwaterScene } from "@/components/journey/UnderwaterScene";
import { SunsetScene } from "@/components/journey/SunsetScene";
import { DinnerScene } from "@/components/journey/DinnerScene";
import { NightScene } from "@/components/journey/NightScene";
import { ConciergeScene } from "@/components/journey/ConciergeScene";

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => {
    return <a href={href} {...props}>{children}</a>;
  },
}));

describe("Virtual Journey Scenes", () => {
  it("renders ArrivalScene with official Coral branding and coordinates", () => {
    render(<ArrivalScene />);
    expect(screen.getByRole("heading", { level: 1, name: /WELCOME TO/i })).toBeInTheDocument();
    expect(screen.getByText(/CORAL WATERFRONT/i)).toBeInTheDocument();
  });

  it("renders BeachScene with landmark statement", () => {
    render(<BeachScene />);
    expect(screen.getByRole("heading", { level: 2, name: /THE COAST/i })).toBeInTheDocument();
    expect(screen.getByText(/MALPE · KARNATAKA/i)).toBeInTheDocument();
  });

  it("renders WaterScene with stepped water progression", () => {
    render(<WaterScene />);
    expect(screen.getByRole("heading", { level: 2, name: /ENTER/i })).toBeInTheDocument();
    expect(screen.getByText(/TURQUOISE SHALLOWS/i)).toBeInTheDocument();
  });

  it("renders ActivityScene with interactive watersports options", () => {
    render(<ActivityScene />);
    expect(screen.getByRole("heading", { level: 2, name: /ENGAGE/i })).toBeInTheDocument();
    expect(screen.getAllByText(/HIGH-VELOCITY JET SKI/i)[0]).toBeInTheDocument();
  });

  it("renders JettyScene with boarding prompt", () => {
    render(<JettyScene />);
    expect(screen.getByRole("heading", { level: 2, name: /STEP/i })).toBeInTheDocument();
  });

  it("renders VesselScene with catamaran specifications", () => {
    render(<VesselScene />);
    expect(screen.getByRole("heading", { level: 2, name: /BUILT TO GO/i })).toBeInTheDocument();
  });

  it("renders DepartureScene with open sea expansion", () => {
    render(<DepartureScene />);
    expect(screen.getByRole("heading", { level: 2, name: /OPEN/i })).toBeInTheDocument();
  });

  it("renders ChartScene with St. Mary's geology", () => {
    render(<ChartScene />);
    expect(screen.getByRole("heading", { level: 2, name: /VOLCANIC/i })).toBeInTheDocument();
    expect(screen.getByText(/ST. MARY'S ISLANDS/i)).toBeInTheDocument();
  });

  it("renders UnderwaterScene with coral dive", () => {
    render(<UnderwaterScene />);
    expect(screen.getByRole("heading", { level: 2, name: /BELOW THE/i })).toBeInTheDocument();
  });

  it("renders SunsetScene with chase the light", () => {
    render(<SunsetScene />);
    expect(screen.getByRole("heading", { level: 2, name: /CHASE/i })).toBeInTheDocument();
  });

  it("renders DinnerScene with dinner with no walls", () => {
    render(<DinnerScene />);
    expect(screen.getByRole("heading", { level: 2, name: /DINNER, WITH/i })).toBeInTheDocument();
  });

  it("renders NightScene with starlight horizon", () => {
    render(<NightScene />);
    expect(screen.getByRole("heading", { level: 2, name: /NIGHT BELONGS/i })).toBeInTheDocument();
  });

  it("renders ConciergeScene with bespoke charter form", () => {
    render(<ConciergeScene />);
    expect(screen.getByRole("heading", { level: 2, name: /WHERE WILL/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /REQUEST BESPOKE CHARTER/i })).toBeInTheDocument();
  });

  it("renders JourneyExperience full orchestration container", () => {
    render(<JourneyExperience />);
    expect(screen.getByText(/MALPE VOYAGE/i)).toBeInTheDocument();
    expect(screen.getByText(/AMBIENT SOUND/i)).toBeInTheDocument();
  });
});
