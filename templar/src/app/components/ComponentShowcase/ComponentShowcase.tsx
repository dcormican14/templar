'use client';

import React, { useState, useEffect } from 'react';
import { useCSSVariables } from '../../providers';
import { InteractiveComponentDisplay } from '../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay';
import { ReadmeDisplay } from '../molecules/ReadmeDisplay/ReadmeDisplay';
import { Scrollbar, Icon, Button, SegmentedControl, CodeBlock, Card } from '../atoms';
import { generateCodeString, getComponentName } from '../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.utils';
import { getComponentType, getReadmePath } from '../../utils/componentUtils';
import { getComponentInteractiveConfig } from './componentConfigs';

interface ComponentShowcaseProps {
  componentName: string;
}

export function ComponentShowcase({ componentName }: ComponentShowcaseProps) {
  const cssVars = useCSSVariables();
  const [activeTab, setActiveTab] = useState<'overview' | 'interactive'>('overview');
  const [readmeContent, setReadmeContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [componentProps, setComponentProps] = useState<Record<string, any>>({});

  const componentType = getComponentType(componentName);

  // Load README content (simulated for now)
  useEffect(() => {
    setLoading(true);
    // In a real implementation, this would load the actual README.md file
    // For now, we'll simulate it with a timeout
    const timer = setTimeout(() => {
      setReadmeContent(generatePlaceholderReadme(componentName, componentType));
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [componentName, componentType]);

  const generatePlaceholderReadme = (name: string, type: string | null) => {
    return `## Overview
The ${name} component is a ${type} component in the Templar design system. It provides a consistent and accessible interface for ${name.toLowerCase()} functionality.

## Features
- **Accessibility**: Full ARIA support and keyboard navigation
- **Theming**: Integrates with the Templar theme system
- **TypeScript**: Complete type safety with TypeScript definitions
- **Responsive**: Works across all device sizes
- **Customizable**: Extensive prop system for customization

## Props
This component extends the Universal Props System, providing consistent theming, sizing, and behavior across all Templar components.

### Universal Props
- \`color\`: Color theme variant (primary, secondary, success, warning, destructive, info, custom)
- \`variant\`: Visual variant (solid, ghost, outline)
- \`size\`: Component size (xs, sm, md, lg, xl)
- \`shape\`: Border radius style (sharp, round, pill)
- \`disabled\`: Disabled state
- \`loading\`: Loading state

## Usage Examples

### Basic Usage
\`\`\`tsx
import { ${name} } from '@templar/components';

function Example() {
  return (
    <${name}>
      Content
    </${name}>
  );
}
\`\`\`

### With Props
\`\`\`tsx
<${name} 
  color="primary" 
  variant="solid" 
  size="md"
>
  Styled ${name}
</${name}>
\`\`\`

## Accessibility
- Follows WCAG 2.1 AA guidelines
- Supports keyboard navigation
- Screen reader compatible
- High contrast mode support

## Design Tokens
The component uses design tokens from the Templar design system:
- Colors: CSS variables for consistent theming
- Spacing: 4px grid system
- Typography: System font stack
- Shadows: Elevation system

## Related Components
- Other atomic components in the same category
- Molecule components that use this atom
- Layout components for composition

For more detailed documentation, examples, and API reference, visit the [Templar Documentation](https://templar-docs.example.com).
`;
  };

  const renderOverview = () => {
    return (
      <div style={{ 
        padding: '32px',
        maxWidth: 'none',
        textAlign: 'left'
      }}>
        <ReadmeDisplay
          content={readmeContent}
          loading={loading}
        />
      </div>
    );
  };

  const renderInteractive = () => {
    const config = getComponentInteractiveConfig(componentName);
    
    if (!config) {
      return (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center' 
        }}>
          <Icon name="Component" size="lg" style={{ color: cssVars.foregroundAccent, marginBottom: '16px' }} />
          <p style={{ color: cssVars.foregroundAccent }}>
            Interactive example not yet available for {componentName}
          </p>
        </div>
      );
    }

    // Generate code string for the separate CodeBlock
    const componentNameForCode = getComponentName(config.component);
    const codeString = generateCodeString(componentNameForCode, componentProps, (config.component as any).props?.children);

    return (
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Interactive Component Display */}
        <InteractiveComponentDisplay
          leftControls={config.leftControls}
          rightControls={config.rightControls}
          initialProps={config.initialProps}
          onPropsChange={setComponentProps}
          showControls={true}
          size="lg"
        >
          {config.component}
        </InteractiveComponentDisplay>

        {/* Code Block in separate Card matching InteractiveComponentDisplay styling */}
        <div style={{
          width: '100%',
          maxWidth: '1200px', // Match lg size from InteractiveComponentDisplay
          margin: '0 auto',
          backgroundColor: cssVars.card,
          borderRadius: '12px',
          border: `1px solid ${cssVars.border}`,
          overflow: 'hidden',
          boxShadow: cssVars.shadowMd
        }}>
          <div style={{
            padding: '16px 24px',
            borderBottom: `1px solid ${cssVars.border}`,
            backgroundColor: cssVars.backgroundAccent,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Icon name="Code" size="sm" style={{ color: cssVars.foreground }} />
            <h4 style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: '600',
              color: cssVars.foreground
            }}>
              Code Preview
            </h4>
          </div>
          <div style={{ padding: '24px' }}>
            <CodeBlock
              language="tsx"
              size="sm"
              lineNumbers={false}
              copyable={true}
              color="primary"
              variant="outline"
              style={{ margin: 0 }}
            >
              {codeString}
            </CodeBlock>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div 
        style={{
          borderBottom: `1px solid ${cssVars.border}`,
          padding: '20px 32px',
          backgroundColor: cssVars.background,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Icon 
              name={componentType === 'atom' ? 'Component' : 'Atom'} 
              size="lg" 
              style={{ color: cssVars.primary }} 
            />
            <div>
              <h1 
                style={{ 
                  color: cssVars.foreground, 
                  fontSize: '24px', 
                  fontWeight: '700',
                  margin: 0
                }}
              >
                {componentName}
              </h1>
              <p 
                style={{ 
                  color: cssVars.foregroundAccent, 
                  fontSize: '14px',
                  margin: 0,
                  textTransform: 'capitalize'
                }}
              >
                {componentType} Component
              </p>
            </div>
          </div>
          
          <SegmentedControl
            items={['Overview', 'Interactive']}
            selectedIndex={activeTab === 'overview' ? 0 : 1}
            onChange={(index) => setActiveTab(index === 0 ? 'overview' : 'interactive')}
            size="sm"
          />
        </div>
      </div>

      {/* Content */}
      <Scrollbar 
        style={{ flex: 1 }}
        visibility="hover"
        smoothScrolling={true}
      >
        {activeTab === 'overview' ? renderOverview() : renderInteractive()}
      </Scrollbar>
    </div>
  );
}