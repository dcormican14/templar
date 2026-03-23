'use client';

import React from 'react';
import { Icon, Button } from '../components/atoms';
import { useCSSVariables } from '../providers';

interface DocumentationPageProps {
  onNavigateToComponents?: () => void;
}

export function DocumentationPage({ onNavigateToComponents }: DocumentationPageProps = {}) {
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
              <li>• Installation instructions</li>
              <li>• Basic setup and configuration</li>
              <li>• Your first component</li>
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
            <ul className="space-y-2 mb-6" style={{ color: cssVars.foregroundAccent }}>
              <li>• 18+ Atomic components</li>
              <li>• Molecule combinations</li>
              <li>• Interactive examples</li>
            </ul>
            <Button 
              variant="solid" 
              color="secondary" 
              size="sm"
              icon={<Icon name="Component" size="sm" />}
              onClick={onNavigateToComponents}
            >
              Explore Components
            </Button>
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
              <li>• Theme customization</li>
              <li>• CSS variable system</li>
              <li>• Design tokens</li>
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
              <li>• Component APIs</li>
              <li>• Hook references</li>
              <li>• Utility functions</li>
            </ul>
          </div>

          <div
            className="p-8 rounded-lg border md:col-span-2"
            style={{
              backgroundColor: cssVars.card,
              borderColor: cssVars.primary,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                backgroundColor: cssVars.primary,
              }}
            />
            <div className="flex items-start gap-4">
              <Icon name="BrainResearch" size="lg" className="mt-1 shrink-0" style={{ color: cssVars.primary }} />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-2xl font-semibold">AI-Friendly Design Library</h2>
                  <span
                    className="text-xs font-medium px-2 py-1 rounded-full"
                    style={{ backgroundColor: cssVars.primaryBackground, color: cssVars.primary }}
                  >
                    llms.txt
                  </span>
                </div>
                <p className="mb-4" style={{ color: cssVars.foregroundAccent }}>
                  Templar ships with machine-readable documentation following the <strong style={{ color: cssVars.foreground }}>llms.txt standard</strong>. Point any AI tool at the docs URL to get full context on every component, design token, and configuration option — no code access required.
                </p>
                <ul className="space-y-2 mb-6" style={{ color: cssVars.foregroundAccent }}>
                  <li>• <code style={{ fontSize: '13px', backgroundColor: cssVars.backgroundAccent, padding: '1px 5px', borderRadius: '4px' }}>/llms.txt</code> — manifest of all doc endpoints</li>
                  <li>• <code style={{ fontSize: '13px', backgroundColor: cssVars.backgroundAccent, padding: '1px 5px', borderRadius: '4px' }}>/llms-full.txt</code> — everything in one file</li>
                  <li>• <code style={{ fontSize: '13px', backgroundColor: cssVars.backgroundAccent, padding: '1px 5px', borderRadius: '4px' }}>/llms/[component].txt</code> — per-component docs</li>
                </ul>
                <Button
                  variant="solid"
                  color="primary"
                  size="sm"
                  icon={<Icon name="BrainResearch" size="sm" />}
                  onClick={() => window.open('/llms.txt', '_blank')}
                >
                  View AI Docs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}