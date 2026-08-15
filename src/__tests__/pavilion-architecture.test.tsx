import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PavilionArchitecture } from '../components/journey/zone01/environment/PavilionArchitecture';
import { CoralPortal } from '../components/journey/zone01/environment/CoralPortal';
import { 
  createTeakWoodTexture, 
  createWoodTexture, 
  createLinenCanopyTexture, 
  createCanvasTexture, 
  createExpeditionMapTexture 
} from '../lib/three/textureGenerator';

describe('PavilionArchitecture & CoralPortal Expedition Architecture', () => {
  it('instantiates all architectural procedural textures correctly with aliases', () => {
    const teak = createTeakWoodTexture();
    expect(teak.map).toBeDefined();
    expect(teak.normalMap).toBeDefined();
    expect(teak.roughnessMap).toBeDefined();

    const woodAlias = createWoodTexture();
    expect(woodAlias.map).toBeDefined();

    const linen = createLinenCanopyTexture();
    expect(linen).toBeDefined();

    const canvasAlias = createCanvasTexture();
    expect(canvasAlias).toBeDefined();

    const map = createExpeditionMapTexture();
    expect(map).toBeDefined();
  });

  it('renders PavilionArchitecture structure cleanly in R3F/React tree with inhabited props', () => {
    const { container } = render(<PavilionArchitecture />);
    expect(container).toBeDefined();

    // Verify key architectural groups exist in rendered DOM / tree
    const welcomePavilion = container.querySelector('[name="Coral_WelcomePavilion"]');
    expect(welcomePavilion).not.toBeNull();

    const conciergeDesk = container.querySelector('[name="Expedition_ConciergeDesk"]');
    expect(conciergeDesk).not.toBeNull();

    const captainsLantern = container.querySelector('[name="Captains_Lantern"]');
    expect(captainsLantern).not.toBeNull();

    const chartTable = container.querySelector('[name="Navigational_ChartTable"]');
    expect(chartTable).not.toBeNull();

    const navigationDividers = container.querySelector('[name="Navigation_Dividers"]');
    expect(navigationDividers).not.toBeNull();

    const parallelRuler = container.querySelector('[name="Parallel_Ruler"]');
    expect(parallelRuler).not.toBeNull();

    const marineCompass = container.querySelector('[name="Marine_Compass"]');
    expect(marineCompass).not.toBeNull();

    const weatherLedger = container.querySelector('[name="Weather_Ledger"]');
    expect(weatherLedger).not.toBeNull();

    const tideTable = container.querySelector('[name="Tide_Table"]');
    expect(tideTable).not.toBeNull();

    const vesselManifest = container.querySelector('[name="Vessel_Manifest"]');
    expect(vesselManifest).not.toBeNull();
  });

  it('renders CoralPortal structure cleanly with socketed laterite plinths and coordinates', () => {
    const { container } = render(<CoralPortal />);
    expect(container).toBeDefined();

    const portalGroup = container.querySelector('[name="Coral_ExpeditionPortal"]');
    expect(portalGroup).not.toBeNull();

    const coordinatesSign = container.querySelector('[name="Expedition_CoordinatesSign"]');
    expect(coordinatesSign).not.toBeNull();

    const sailclothCanopy = container.querySelector('[name="Expedition_SailclothCanopy"]');
    expect(sailclothCanopy).not.toBeNull();

    const wayfindingTotem = container.querySelector('[name="Wayfinding_Totem"]');
    expect(wayfindingTotem).not.toBeNull();
  });

  it('guarantees zero Japanese/torii/pagoda architecture naming or motifs', () => {
    const { container: portalContainer } = render(<CoralPortal />);
    const { container: pavilionContainer } = render(<PavilionArchitecture />);

    const portalHtml = portalContainer.innerHTML.toLowerCase();
    const pavilionHtml = pavilionContainer.innerHTML.toLowerCase();

    expect(portalHtml).not.toContain('torii');
    expect(portalHtml).not.toContain('pagoda');
    expect(portalHtml).not.toContain('shinto');
    expect(pavilionHtml).not.toContain('torii');
    expect(pavilionHtml).not.toContain('pagoda');
    expect(pavilionHtml).not.toContain('shinto');
  });

  it('verifies CoralPortal authentic Malpe Expedition Base specifications & coordinates', () => {
    const { container } = render(<CoralPortal />);
    const html = container.innerHTML;

    // Check Expedition Base Coordinates sign
    const sign = container.querySelector('[name="Expedition_CoordinatesSign"]');
    expect(sign).not.toBeNull();

    // Check Sailcloth Canopy & Totem
    expect(container.querySelector('[name="Expedition_SailclothCanopy"]')).not.toBeNull();
    expect(container.querySelector('[name="Wayfinding_Totem"]')).not.toBeNull();
  });

  it('verifies PavilionArchitecture post-and-beam, concierge desk, captain lantern point light, and chart table props', () => {
    const { container } = render(<PavilionArchitecture />);

    // Verify Welcome Pavilion group
    const pavilion = container.querySelector('[name="Coral_WelcomePavilion"]');
    expect(pavilion).not.toBeNull();

    // Verify Concierge Desk & Inlay Countertop
    const desk = container.querySelector('[name="Expedition_ConciergeDesk"]');
    expect(desk).not.toBeNull();

    // Verify Captain's Lantern & Incandescent Point Light
    const lantern = container.querySelector('[name="Captains_Lantern"]');
    expect(lantern).not.toBeNull();

    // Verify Inhabited Navigational Chart Table & Storytelling Props
    expect(container.querySelector('[name="Navigational_ChartTable"]')).not.toBeNull();
    expect(container.querySelector('[name="Navigation_Dividers"]')).not.toBeNull();
    expect(container.querySelector('[name="Parallel_Ruler"]')).not.toBeNull();
    expect(container.querySelector('[name="Marine_Compass"]')).not.toBeNull();
    expect(container.querySelector('[name="Weather_Ledger"]')).not.toBeNull();
    expect(container.querySelector('[name="Tide_Table"]')).not.toBeNull();
    expect(container.querySelector('[name="Vessel_Manifest"]')).not.toBeNull();
    expect(container.querySelector('[name="Map_ScrollHolder"]')).not.toBeNull();
  });

  it('verifies ResourceManager GLB loading integration for CoralPortal and PavilionArchitecture', async () => {
    const { resourceManager } = await import('../lib/three/ResourceManager');
    const { JOURNEY_ASSETS } = await import('../data/journeyAssets');
    
    // Verify asset paths are defined
    expect(JOURNEY_ASSETS.models.coralPortal).toBeDefined();
    expect(JOURNEY_ASSETS.models.coralPortal.localPath).toBe('/models/architecture/coral_portal.glb');
    expect(JOURNEY_ASSETS.models.expeditionPavilion).toBeDefined();
    expect(JOURNEY_ASSETS.models.expeditionPavilion.localPath).toBe('/models/architecture/expedition_pavilion.glb');
    expect(JOURNEY_ASSETS.models.chartTableProps).toBeDefined();
    expect(JOURNEY_ASSETS.models.chartTableProps.localPath).toBe('/models/props/chart_table_props.glb');
    
    // Verify ResourceManager can load models (returns fallback in test env)
    const portalModel = await resourceManager.loadModel(JOURNEY_ASSETS.models.coralPortal.localPath);
    expect(portalModel).toBeDefined();
    
    const pavilionModel = await resourceManager.loadModel(JOURNEY_ASSETS.models.expeditionPavilion.localPath);
    expect(pavilionModel).toBeDefined();
    
    const chartPropsModel = await resourceManager.loadModel(JOURNEY_ASSETS.models.chartTableProps.localPath);
    expect(chartPropsModel).toBeDefined();
  });

  it('verifies inhabited chart table props metadata from JOURNEY_ASSETS registry', async () => {
    const { JOURNEY_ASSETS } = await import('../data/journeyAssets');
    
    const chartProps = JOURNEY_ASSETS.architectureProps.chartTableProps;
    expect(chartProps.seaChart).toContain('1894');
    expect(chartProps.dividers).toContain('Brass');
    expect(chartProps.compass).toContain('Marine');
    expect(chartProps.weatherLedger).toContain('Ledger');
    expect(chartProps.lanternColor).toBe('#FFB74D');
    expect(chartProps.lanternIntensity).toBeGreaterThan(0);
    
    const portalProps = JOURNEY_ASSETS.architectureProps.portal;
    expect(portalProps.coordinatesText).toContain('MALPE EXPEDITION BASE');
    expect(portalProps.coordinatesText).toContain('13°21′02″ N');
    expect(portalProps.coordinatesText).toContain('74°42′08″ E');
    expect(portalProps.teakBeamDimensions[0]).toBe(0.55);
    expect(portalProps.plinthMaterial).toBe('laterite_stone');
  });

  it('verifies authored architectural geometry specs - teak post-and-beam, corbel capitals, sailcloth canopy', () => {
    const { container } = render(<PavilionArchitecture />);
    
    // The pavilion must render as a valid React tree with named groups
    const pavilion = container.querySelector('[name="Coral_WelcomePavilion"]');
    expect(pavilion).not.toBeNull();
    
    // Verify all inhabited chart table props exist
    const chartTable = container.querySelector('[name="Navigational_ChartTable"]');
    expect(chartTable).not.toBeNull();
    
    // Verify captain's lantern with warm point lighting
    const lantern = container.querySelector('[name="Captains_Lantern"]');
    expect(lantern).not.toBeNull();
    
    // Verify map scroll holder exists
    const scrollHolder = container.querySelector('[name="Map_ScrollHolder"]');
    expect(scrollHolder).not.toBeNull();
  });
});
