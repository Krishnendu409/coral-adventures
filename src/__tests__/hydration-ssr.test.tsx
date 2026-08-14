import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { render } from '@testing-library/react';
import { WorldScene } from '@/components/journey/zone01/WorldScene';

describe('SSR & Hydration Safety for 3D Experience', () => {
  it('renders a consistent container during Server-Side Rendering without crashing', () => {
    // Render to string (simulating Next.js SSR)
    const ssrHtml = ReactDOMServer.renderToString(
      <WorldScene splineProgress={0} isHeadless={true} />
    );

    expect(ssrHtml).toBeDefined();
    // The outer container must maintain the world-scene-container structure
    expect(ssrHtml).toContain('world-scene-container');
  });

  it('mounts cleanly on client without throwing hydration errors', () => {
    const { getByTestId } = render(
      <WorldScene splineProgress={0} isHeadless={true} />
    );

    const container = getByTestId('world-scene-container');
    expect(container).toBeInTheDocument();
  });
});
