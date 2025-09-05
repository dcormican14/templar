'use client';

import React from 'react';
import { Icon } from '../components/atoms';
import { useCSSVariables } from '../providers';

export function DocumentationPage() {
  const cssVars = useCSSVariables();

  return (
    <div className="max-w-4xl mx-auto">
      <div 
        className="py-20"
        style={{ color: cssVars.foreground }}
      >
        <div className="text-center mb-12">
          <Icon name="Book" size="xl" className="mx-auto mb-6" style={{ color: cssVars.info }} />
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ color: cssVars.primary }}
          >
            Documentation
          </h1>
          <p 
            className="text-lg"
            style={{ color: cssVars.foregroundAccent }}
          >
            Comprehensive guides, API references, and examples
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div 
            className="p-8 rounded-lg border"
            style={{ 
              backgroundColor: cssVars.card,
              borderColor: cssVars.border 
            }}
          >
            <Icon name="Play" size="lg" className="mb-4" style={{ color: cssVars.primary }} />
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <p className="mb-4" style={{ color: cssVars.foregroundAccent }}>
              Learn how to install and set up Templar in your project. Quick start guides and basic usage examples.
            </p>
            <ul className="space-y-2" style={{ color: cssVars.foregroundAccent }}>
              <li>" Installation instructions</li>
              <li>" Basic setup and configuration</li>
              <li>" Your first component</li>
            </ul>
          </div>
          
          <div 
            className="p-8 rounded-lg border"
            style={{ 
              backgroundColor: cssVars.card,
              borderColor: cssVars.border 
            }}
          >
            <Icon name="Component" size="lg" className="mb-4" style={{ color: cssVars.secondary }} />
            <h2 className="text-2xl font-semibold mb-4">Component Library</h2>
            <p className="mb-4" style={{ color: cssVars.foregroundAccent }}>
              Explore all available components with interactive examples, props documentation, and usage patterns.
            </p>
            <ul className="space-y-2" style={{ color: cssVars.foregroundAccent }}>
              <li>" 18+ Atomic components</li>
              <li>" Molecule combinations</li>
              <li>" Interactive examples</li>
            </ul>
          </div>
          
          <div 
            className="p-8 rounded-lg border"
            style={{ 
              backgroundColor: cssVars.card,
              borderColor: cssVars.border 
            }}
          >
            <Icon name="ColorFilter" size="lg" className="mb-4" style={{ color: cssVars.warning }} />
            <h2 className="text-2xl font-semibold mb-4">Theme Guide</h2>
            <p className="mb-4" style={{ color: cssVars.foregroundAccent }}>
              Master the theming system with detailed guides on customization, CSS variables, and design tokens.
            </p>
            <ul className="space-y-2" style={{ color: cssVars.foregroundAccent }}>
              <li>" Theme customization</li>
              <li>" CSS variable system</li>
              <li>" Design tokens</li>
            </ul>
          </div>
          
          <div 
            className="p-8 rounded-lg border"
            style={{ 
              backgroundColor: cssVars.card,
              borderColor: cssVars.border 
            }}
          >
            <Icon name="Safari" size="lg" className="mb-4" style={{ color: cssVars.success }} />
            <h2 className="text-2xl font-semibold mb-4">API Reference</h2>
            <p className="mb-4" style={{ color: cssVars.foregroundAccent }}>
              Complete API documentation for all components, hooks, and utilities with TypeScript definitions.
            </p>
            <ul className="space-y-2" style={{ color: cssVars.foregroundAccent }}>
              <li>" Component APIs</li>
              <li>" Hook references</li>
              <li>" Utility functions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}