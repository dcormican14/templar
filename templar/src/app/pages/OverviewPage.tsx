'use client';

import React from 'react';
import { Icon } from '../components/atoms';
import { useCSSVariables } from '../providers';

export function OverviewPage() {
  const cssVars = useCSSVariables();

  return (
    <div className="max-w-4xl mx-auto">
      <div 
        className="text-center py-20"
        style={{ color: cssVars.foreground }}
      >
        <Icon name="HomeShield" size="xl" className="mx-auto mb-6" />
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: cssVars.primary }}
        >
          Welcome to Templar
        </h1>
        <p 
          className="text-lg mb-8"
          style={{ color: cssVars.foregroundAccent }}
        >
          A comprehensive React component library and design system
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: cssVars.card,
              borderColor: cssVars.border 
            }}
          >
            <Icon name="Atom" size="lg" className="mx-auto mb-4" style={{ color: cssVars.primary }} />
            <h3 className="text-xl font-semibold mb-2">Atomic Design</h3>
            <p style={{ color: cssVars.foregroundAccent }}>
              Built on atomic design principles with comprehensive component architecture
            </p>
          </div>
          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: cssVars.card,
              borderColor: cssVars.border 
            }}
          >
            <Icon name="Palette" size="lg" className="mx-auto mb-4" style={{ color: cssVars.secondary }} />
            <h3 className="text-xl font-semibold mb-2">Theme System</h3>
            <p style={{ color: cssVars.foregroundAccent }}>
              Advanced theming with 80+ CSS variables and multiple theme options
            </p>
          </div>
          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: cssVars.card,
              borderColor: cssVars.border 
            }}
          >
            <Icon name="Code" size="lg" className="mx-auto mb-4" style={{ color: cssVars.success }} />
            <h3 className="text-xl font-semibold mb-2">TypeScript</h3>
            <p style={{ color: cssVars.foregroundAccent }}>
              Full TypeScript support with comprehensive type safety
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}