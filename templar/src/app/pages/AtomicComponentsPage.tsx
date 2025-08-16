'use client';

import React from 'react';
import { useCSSVariables } from '../providers';
import { Card, Divider } from '../components/atoms';

export function AtomicComponentsPage() {
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
        Atomic Components
      </h1>
      <p className="mb-8" style={mutedTextStyle}>
        Basic building blocks of the design system. These atomic components can be combined to create more complex molecules and organisms.
      </p>

      {/* Card Component Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={headingStyle}>Card</h2>
        <p className="mb-6" style={mutedTextStyle}>
          Flexible container component with consistent styling and theming support.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-2" style={headingStyle}>Default Card</h3>
            <p style={mutedTextStyle}>Basic card with default styling and padding.</p>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="font-semibold mb-2" style={headingStyle}>Interactive Card</h3>
            <p style={mutedTextStyle}>Card with hover effects and cursor pointer.</p>
          </Card>
          
          <Card className="p-6 border-2" style={{ borderColor: cssVars.primary }}>
            <h3 className="font-semibold mb-2" style={headingStyle}>Styled Card</h3>
            <p style={mutedTextStyle}>Card with custom border using theme colors.</p>
          </Card>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <pre className="text-sm" style={mutedTextStyle}>
{`<Card className="p-6">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>`}
          </pre>
        </div>
      </section>

      {/* Divider Component Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={headingStyle}>Divider</h2>
        <p className="mb-6" style={mutedTextStyle}>
          Flexible separator component with multiple styles and orientations.
        </p>

        <div className="space-y-8">
          {/* Horizontal Dividers */}
          <div>
            <h3 className="text-lg font-medium mb-4" style={headingStyle}>Horizontal Dividers</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Solid</p>
                <Divider />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Dashed</p>
                <Divider dashed />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Dotted</p>
                <Divider dotted />
              </div>
            </div>
          </div>

          {/* Dividers with Labels */}
          <div>
            <h3 className="text-lg font-medium mb-4" style={headingStyle}>Labeled Dividers</h3>
            <div className="space-y-6">
              <Divider label="Center Label" />
              <Divider label="Start Label" labelPosition="start" />
              <Divider label="End Label" labelPosition="end" />
            </div>
          </div>

          {/* Vertical Dividers */}
          <div>
            <h3 className="text-lg font-medium mb-4" style={headingStyle}>Vertical Dividers</h3>
            <div className="flex items-center gap-4 h-20">
              <span style={mutedTextStyle}>Item 1</span>
              <Divider orientation="vertical" className="h-12" />
              <span style={mutedTextStyle}>Item 2</span>
              <Divider orientation="vertical" dashed className="h-12" />
              <span style={mutedTextStyle}>Item 3</span>
              <Divider orientation="vertical" dotted className="h-12" />
              <span style={mutedTextStyle}>Item 4</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-6">
          <pre className="text-sm" style={mutedTextStyle}>
{`// Basic divider
<Divider />

// Styled divider
<Divider dashed />

// Labeled divider
<Divider label="Section Title" />

// Vertical divider
<Divider orientation="vertical" className="h-12" />`}
          </pre>
        </div>
      </section>

      {/* Component Features */}
      <section>
        <h2 className="text-2xl font-semibold mb-4" style={headingStyle}>Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-3" style={headingStyle}>🎨 Theme Integration</h3>
            <ul className="space-y-2 text-sm" style={mutedTextStyle}>
              <li>• Automatic color adaptation</li>
              <li>• CSS variable support</li>
              <li>• Dark/light mode compatibility</li>
              <li>• Custom theme support</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-3" style={headingStyle}>🔧 Flexibility</h3>
            <ul className="space-y-2 text-sm" style={mutedTextStyle}>
              <li>• Customizable props</li>
              <li>• Style composition</li>
              <li>• TypeScript support</li>
              <li>• Accessibility built-in</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}
