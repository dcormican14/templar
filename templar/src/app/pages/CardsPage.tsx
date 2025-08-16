'use client';

import React from 'react';
import { useCSSVariables } from '../providers';
import { Card } from '../components/atoms';

export function CardsPage() {
  const cssVars = useCSSVariables();

  const headingStyle = {
    color: cssVars.foreground
  };

  const mutedTextStyle = {
    color: cssVars.mutedForeground
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2" style={headingStyle}>
        Card Variations
      </h1>
      <p className="mb-8" style={mutedTextStyle}>
        Advanced card components with various layouts and interactive features.
      </p>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4" style={headingStyle}>
          🚧 Coming Soon
        </h2>
        <p style={mutedTextStyle}>
          This section will showcase advanced card variants and compositions.
        </p>
      </Card>
    </div>
  );
}
