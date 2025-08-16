'use client';

import React from 'react';
import { useCSSVariables } from '../providers';
import { Card, Divider } from '../components/atoms';

export function DividersPage() {
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
        Divider Showcase
      </h1>
      <p className="mb-8" style={mutedTextStyle}>
        Advanced divider patterns and separator components with enhanced styling.
      </p>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4" style={headingStyle}>
          Enhanced Patterns
        </h2>
        <div className="space-y-6">
          <div>
            <p className="text-sm mb-2" style={mutedTextStyle}>Dashed with rounded caps</p>
            <Divider dashed rounded />
          </div>
          
          <div>
            <p className="text-sm mb-2" style={mutedTextStyle}>Dotted pattern</p>
            <Divider dotted />
          </div>
          
          <div>
            <p className="text-sm mb-2" style={mutedTextStyle}>Subtle appearance</p>
            <Divider subtle />
          </div>
        </div>
      </Card>
    </div>
  );
}
