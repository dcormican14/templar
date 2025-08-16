'use client';

import React from 'react';
import { Card } from '../components/atoms';
import { useCSSVariables } from '../providers';

interface OverviewPageProps {
  onNavigate: (tabId: string) => void;
  availableTabs: Array<{ id: string; label: string }>;
}

export function OverviewPage({ onNavigate, availableTabs }: OverviewPageProps) {
  const cssVars = useCSSVariables();

  const headingStyle = {
    color: cssVars.foreground
  };

  const mutedTextStyle = {
    color: cssVars.mutedForeground
  };

  return (
    <div>
      <h1 
        className="text-3xl font-bold mb-2"
        style={{ color: cssVars.foreground }}
      >
        Templar Demo Overview
      </h1>
      <p 
        className="mb-6"
        style={mutedTextStyle}
      >
        Welcome to the Templar design system demo. Use the navigation tabs above to explore different components and features.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableTabs.slice(1).map(tab => (
          <Card 
            key={tab.id}
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate(tab.id)}
          >
            <h3 className="font-semibold mb-2" style={headingStyle}>{tab.label}</h3>
            <p style={mutedTextStyle}>Click to explore this section</p>
          </Card>
        ))}
      </div>
      
      <Card className="p-6 mt-16">
          <h3 className="font-semibold mb-3" style={headingStyle}>🎨 Design System</h3>
          <p style={mutedTextStyle} className="mb-4">
            Templar provides a comprehensive design system with atomic components, theming support, and provider-based state management.
          </p>
          <ul className="space-y-2 text-sm" style={mutedTextStyle}>
            <li>• Atomic design methodology</li>
            <li>• Dynamic theming with CSS variables</li>
            <li>• Provider-based architecture</li>
            <li>• TypeScript-first development</li>
          </ul>
        </Card>
    </div>
  );
}
