'use client';

import React, { useState } from 'react';
import { useCSSVariables } from '../providers';
import { Card } from '../components/atoms';

export function CSSVariablesPage() {
  const cssVars = useCSSVariables();
  const [selectedVariable, setSelectedVariable] = useState<string | null>(null);

  const variableGroups = {
    'Core Colors': {
      'Primary': cssVars.primary,
      'Primary Foreground': cssVars.primaryForeground,
      'Secondary': cssVars.secondary,
      'Secondary Foreground': cssVars.secondaryForeground,
      'Accent': cssVars.accent,
      'Accent Foreground': cssVars.accentForeground,
    },
    'Layout Colors': {
      'Background': cssVars.background,
      'Foreground': cssVars.foreground,
      'Muted': cssVars.muted,
      'Muted Foreground': cssVars.mutedForeground,
      'Card': cssVars.card,
      'Card Foreground': cssVars.cardForeground,
    },
    'Interactive Colors': {
      'Border': cssVars.border,
      'Border Hover': cssVars.borderHover,
      'Primary Hover': cssVars.primaryHover,
      'Secondary Hover': cssVars.secondaryHover,
    },
    'Status Colors': {
      'Success': cssVars.success,
      'Success Foreground': cssVars.successForeground,
      'Warning': cssVars.warning,
      'Warning Foreground': cssVars.warningForeground,
      'Error': cssVars.error,
      'Error Foreground': cssVars.errorForeground,
      'Info': cssVars.info,
      'Info Foreground': cssVars.infoForeground,
    },
    'Form Elements': {
      'Input': cssVars.input,
      'Input Border': cssVars.inputBorder,
      'Input Placeholder': cssVars.inputPlaceholder,
    }
  };

  const headingStyle = {
    color: cssVars.foreground
  };

  const mutedTextStyle = {
    color: cssVars.mutedForeground
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2" style={headingStyle}>
        CSS Variables
      </h1>
      <p className="mb-6" style={mutedTextStyle}>
        Dynamic CSS variables that adapt to the current theme. Click on any variable to see its current value.
      </p>

      <div className="space-y-8">
        {Object.entries(variableGroups).map(([groupName, variables]) => (
          <Card key={groupName} className="p-6">
            <h2 className="text-xl font-semibold mb-4" style={headingStyle}>
              {groupName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(variables).map(([name, value]) => (
                <div
                  key={name}
                  className="p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md"
                  style={{ 
                    borderColor: cssVars.border,
                    backgroundColor: selectedVariable === name ? cssVars.muted : 'transparent'
                  }}
                  onClick={() => setSelectedVariable(selectedVariable === name ? null : name)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ 
                        backgroundColor: value,
                        borderColor: cssVars.border
                      }}
                    />
                    <span className="font-medium text-sm" style={headingStyle}>
                      {name}
                    </span>
                  </div>
                  {selectedVariable === name && (
                    <div className="mt-3 pt-3 border-t" style={{ borderColor: cssVars.border }}>
                      <div className="text-xs space-y-1" style={mutedTextStyle}>
                        <div><strong>Value:</strong> {value}</div>
                        <div><strong>Variable:</strong> --{name.toLowerCase().replace(/\s+/g, '-')}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
