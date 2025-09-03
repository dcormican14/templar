'use client';

import React, { useState } from 'react';
import { useCSSVariables } from '../providers';
import { Card, Icon, CodeBlock } from '../components/atoms';

export function IconsPage() {
  const cssVars = useCSSVariables();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const headingStyle = {
    color: cssVars.foreground
  };

  const mutedTextStyle = {
    color: cssVars.mutedForeground
  };

  // Sample icons to showcase
  const sampleIcons = [
    'Home', 'User', 'Settings', 'Search', 'Bell', 'Mail',
    'Calendar', 'Clock', 'Download', 'Upload', 'Edit', 'Trash',
    'Heart', 'Star', 'ShareAndroid', 'Link', 'Lock', 'CardLock',
    'Play', 'Pause', 'BusStop', 'SkipNext', 'SkipPrev', 'SoundHigh',
    'Wifi', 'BatteryCharging', 'Phone', 'Message', 'Camera', 'MediaImage'
  ];

  const iconSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  const iconColors = ['inherit', 'primary', 'secondary', 'success', 'warning', 'error'] as const;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2" style={headingStyle}>
        Icon Component
      </h1>
      <p className="mb-8" style={mutedTextStyle}>
        Comprehensive icon system built on iconoir-react with theme integration and animations.
      </p>

      {/* Icon Gallery */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={headingStyle}>Icon Gallery</h2>
        <Card className="p-6">
          <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 mb-6">
            {sampleIcons.map(iconName => (
              <div 
                key={iconName}
                className="flex flex-col items-center p-3 rounded cursor-pointer transition-colors hover:bg-muted"
                style={{ backgroundColor: selectedIcon === iconName ? cssVars.muted : 'transparent' }}
                onClick={() => setSelectedIcon(selectedIcon === iconName ? null : iconName)}
              >
                <Icon name={iconName as any} size="md" />
                <span className="text-xs mt-1 text-center" style={mutedTextStyle}>
                  {iconName}
                </span>
              </div>
            ))}
          </div>
          
          {selectedIcon && (
            <div className="mt-4 p-4 border rounded" style={{ borderColor: cssVars.border }}>
              <div className="flex items-center gap-4 mb-2">
                <Icon name={selectedIcon as any} size="lg" />
                <div>
                  <h3 className="font-semibold" style={headingStyle}>{selectedIcon}</h3>
                  <p className="text-sm" style={mutedTextStyle}>Click any icon to see details</p>
                </div>
              </div>
              <CodeBlock variant="outline" language="tsx">{`<Icon name="${selectedIcon}" size="md" />`}</CodeBlock>
            </div>
          )}
        </Card>
      </section>

      {/* Size Variations */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={headingStyle}>Sizes</h2>
        <Card className="p-6">
          <div className="flex items-center gap-6 flex-wrap">
            {iconSizes.map(size => (
              <div key={size} className="flex flex-col items-center">
                <Icon name="Star" size={size} />
                <span className="text-sm mt-2" style={mutedTextStyle}>{size}</span>
              </div>
            ))}
          </div>
          <CodeBlock language="tsx" copyable syntaxHighlighting>
{`<Icon name="Star" size="xs" />
<Icon name="Star" size="sm" />
<Icon name="Star" size="md" />
<Icon name="Star" size="lg" />
<Icon name="Star" size="xl" />`}
          </CodeBlock>
        </Card>
      </section>

      {/* Color Variations */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={headingStyle}>Colors</h2>
        <Card className="p-6">
          <div className="flex items-center gap-6 flex-wrap">
            {iconColors.map(color => (
              <div key={color} className="flex flex-col items-center">
                <Icon name="Heart" size="lg" color={color} />
                <span className="text-sm mt-2" style={mutedTextStyle}>{color}</span>
              </div>
            ))}
          </div>
          <CodeBlock language="tsx" copyable syntaxHighlighting>
{`<Icon name="Heart" color="primary" />
<Icon name="Heart" color="secondary" />
<Icon name="Heart" color="success" />
<Icon name="Heart" color="warning" />
<Icon name="Heart" color="error" />`}
          </CodeBlock>
        </Card>
      </section>

      {/* Animations */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={headingStyle}>Animations</h2>
        <Card className="p-6">
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center">
              <Icon name="Settings" size="lg" spin />
              <span className="text-sm mt-2" style={mutedTextStyle}>Spin</span>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="Heart" size="lg" pulse color="error" />
              <span className="text-sm mt-2" style={mutedTextStyle}>Pulse</span>
            </div>
          </div>
          <CodeBlock language="tsx" copyable syntaxHighlighting>
{`<Icon name="Settings" spin />
<Icon name="Heart" pulse color="error" />`}
          </CodeBlock>
        </Card>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-semibold mb-4" style={headingStyle}>Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-3" style={headingStyle}>🎨 Theme Integration</h3>
            <ul className="space-y-2 text-sm" style={mutedTextStyle}>
              <li>• Automatic color adaptation</li>
              <li>• CSS variable support</li>
              <li>• Dark/light mode compatible</li>
              <li>• Custom color override</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-3" style={headingStyle}>⚡ Performance</h3>
            <ul className="space-y-2 text-sm" style={mutedTextStyle}>
              <li>• iconoir-react powered</li>
              <li>• Tree-shakable imports</li>
              <li>• SVG-based rendering</li>
              <li>• Optimized animations</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}
