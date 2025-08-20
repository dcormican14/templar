'use client';

import React, { useState } from 'react';
import { useCSSVariables } from '../providers';
import { Card, Divider } from '../components/atoms';
import { LoadingSpinners } from '../components/molecules/LoadingSpinners';

export function MoleculeComponentPage() {
  const [selectedColor, setSelectedColor] = useState<'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'>('primary');
  const [selectedVariant, setSelectedVariant] = useState<'parrot' | 'spinner' | 'dots' | 'pulse'>('parrot');
  const [selectedSize, setSelectedSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  const [selectedDuration, setSelectedDuration] = useState(2);
  const cssVars = useCSSVariables();

  const headingStyle = {
    color: cssVars.foreground
  };

  const mutedTextStyle = {
    color: cssVars.mutedForeground
  };

  const colors = ['primary', 'secondary', 'accent', 'success', 'warning', 'error'] as const;
  const variants = ['parrot', 'spinner', 'dots', 'pulse'] as const;
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2" style={headingStyle}>
        Molecule Components
      </h1>
      <p className="mb-8" style={mutedTextStyle}>
        Complex components built from atomic components. These molecules provide more sophisticated functionality and user interactions.
      </p>

      {/* LoadingSpinners Component Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={headingStyle}>LoadingSpinners</h2>
        <p className="mb-6" style={mutedTextStyle}>
          A comprehensive collection of animated loading spinners and placeholders built with React, TypeScript, and Framer Motion.
        </p>

        {/* Interactive Selector */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4" style={headingStyle}>Interactive Selector</h3>
          <p className="mb-4" style={mutedTextStyle}>
            Adjust the parameters below to see the LoadingSpinners component change in real-time.
          </p>
          
          <Card className="p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Variant Selector */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: cssVars.foreground }}>
                  Variant
                </label>
                <select
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  style={{
                    backgroundColor: cssVars.background,
                    borderColor: cssVars.border,
                    color: cssVars.foreground
                  }}
                >
                  {variants.map((variant) => (
                    <option key={variant} value={variant}>
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size Selector */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: cssVars.foreground }}>
                  Size
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  style={{
                    backgroundColor: cssVars.background,
                    borderColor: cssVars.border,
                    color: cssVars.foreground
                  }}
                >
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color Selector */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: cssVars.foreground }}>
                  Color
                </label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  style={{
                    backgroundColor: cssVars.background,
                    borderColor: cssVars.border,
                    color: cssVars.foreground
                  }}
                >
                  {colors.map((color) => (
                    <option key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration Slider */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: cssVars.foreground }}>
                  Duration: {selectedDuration}s
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.1"
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(parseFloat(e.target.value))}
                  className="w-full"
                  style={{
                    accentColor: cssVars.primary
                  }}
                />
              </div>
            </div>

                         {/* Live Preview */}
             <div className="flex justify-center items-center h-48 border-2 border-dashed rounded-lg" style={{ borderColor: cssVars.border }}>
               <LoadingSpinners
                 variant={selectedVariant}
                 size={selectedSize}
                 color={selectedColor}
                 duration={selectedDuration}
                 centered
               />
             </div>
          </Card>
        </div>

        {/* All Variants */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4" style={headingStyle}>Animation Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {variants.map((variant) => (
              <Card key={variant} className="p-6 text-center">
                <h4 className="font-semibold mb-4 capitalize" style={headingStyle}>{variant}</h4>
                                 <div className="flex justify-center items-center h-32">
                   <LoadingSpinners
                     variant={variant}
                     size="md"
                     color="primary"
                     duration={2}
                     centered
                   />
                 </div>
                <p className="text-sm mt-4" style={mutedTextStyle}>
                  {variant === 'parrot' && 'Complex animated parrot face with rotating elements'}
                  {variant === 'spinner' && 'Simple spinning circle animation'}
                  {variant === 'dots' && 'Three bouncing dots with staggered timing'}
                  {variant === 'pulse' && 'Pulsing circle with scale and opacity changes'}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* All Sizes */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4" style={headingStyle}>Size Variations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {sizes.map((size) => (
              <Card key={size} className="p-6 text-center">
                <h4 className="font-semibold mb-4 uppercase" style={headingStyle}>{size}</h4>
                                 <div className="flex justify-center items-center h-32">
                   <LoadingSpinners
                     variant="parrot"
                     size={size}
                     color="primary"
                     duration={2}
                     centered
                   />
                 </div>
                <p className="text-sm mt-4" style={mutedTextStyle}>
                  {size === 'xs' && '16px - Extra small'}
                  {size === 'sm' && '24px - Small'}
                  {size === 'md' && '48px - Medium'}
                  {size === 'lg' && '64px - Large'}
                  {size === 'xl' && '96px - Extra large'}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* All Colors */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4" style={headingStyle}>Color Variations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colors.map((color) => (
              <Card key={color} className="p-6 text-center">
                <h4 className="font-semibold mb-4 capitalize" style={headingStyle}>{color}</h4>
                <div className="flex justify-center items-center h-32">
                  <LoadingSpinners
                    variant="parrot"
                    size="md"
                    color={color}
                    duration={2}
                    centered
                  />
                </div>
                <p className="text-sm mt-4" style={mutedTextStyle}>
                  Uses theme {color} color for the crest
                </p>
              </Card>
            ))}
          </div>
        </div>



        {/* Code Examples */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <pre className="text-sm" style={mutedTextStyle}>
{`// Basic usage
<LoadingSpinners variant="parrot" size="md" />

// With custom color and duration
<LoadingSpinners 
  variant="parrot" 
  size="lg" 
  color="primary"
  duration={3}
/>

// Different variants
<LoadingSpinners variant="spinner" />
<LoadingSpinners variant="dots" />
<LoadingSpinners variant="pulse" />

// Conditional display
<LoadingSpinners 
  variant="parrot" 
  show={isLoading} 
  centered
/>`}
          </pre>
        </div>
      </section>

      {/* Component Features */}
      <section>
        <h2 className="text-2xl font-semibold mb-4" style={headingStyle}>Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-3" style={headingStyle}>🎨 Animation Variants</h3>
            <ul className="space-y-2 text-sm" style={mutedTextStyle}>
              <li>• Parrot: Complex animated face with rotating elements</li>
              <li>• Spinner: Simple spinning circle animation</li>
              <li>• Dots: Three bouncing dots with staggered timing</li>
              <li>• Pulse: Pulsing circle with scale and opacity changes</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-3" style={headingStyle}>🔧 Customization</h3>
            <ul className="space-y-2 text-sm" style={mutedTextStyle}>
              <li>• Multiple sizes: xs, sm, md, lg, xl</li>
              <li>• Theme color integration</li>
              <li>• Customizable duration</li>
              <li>• Accessibility support</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}
