'use client';

import React, { useState, useEffect } from 'react';
import { useCSSVariables } from '../../providers';
import { InteractiveComponentDisplay } from '../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay';
import { Scrollbar, Icon, Button, SegmentedControl } from '../atoms';
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
    return `# ${name} Component

## Overview
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
    if (loading) {
      return (
        <div style={{ 
          padding: '40px', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          gap: '16px' 
        }}>
          <Icon name="Loading" spin size="lg" style={{ color: cssVars.primary }} />
          <p style={{ color: cssVars.foregroundAccent }}>Loading documentation...</p>
        </div>
      );
    }

    return (
      <div style={{ 
        padding: '32px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div 
          style={{
            color: cssVars.foreground,
            lineHeight: '1.6',
            fontSize: '14px'
          }}
        >
          {/* Parse and render markdown-style content */}
          {readmeContent.split('\n').map((line, index) => {
            if (line.startsWith('# ')) {
              return (
                <h1 
                  key={index}
                  style={{ 
                    color: cssVars.primary, 
                    fontSize: '28px', 
                    fontWeight: '700',
                    marginBottom: '16px',
                    marginTop: index === 0 ? '0' : '32px'
                  }}
                >
                  {line.replace('# ', '')}
                </h1>
              );
            }
            if (line.startsWith('## ')) {
              return (
                <h2 
                  key={index}
                  style={{ 
                    color: cssVars.foreground, 
                    fontSize: '22px', 
                    fontWeight: '600',
                    marginBottom: '12px',
                    marginTop: '24px'
                  }}
                >
                  {line.replace('## ', '')}
                </h2>
              );
            }
            if (line.startsWith('### ')) {
              return (
                <h3 
                  key={index}
                  style={{ 
                    color: cssVars.foreground, 
                    fontSize: '18px', 
                    fontWeight: '600',
                    marginBottom: '8px',
                    marginTop: '20px'
                  }}
                >
                  {line.replace('### ', '')}
                </h3>
              );
            }
            if (line.startsWith('```')) {
              return null; // Handle code blocks separately
            }
            if (line.startsWith('- ')) {
              return (
                <li 
                  key={index}
                  style={{ 
                    color: cssVars.foregroundAccent,
                    marginBottom: '4px',
                    listStyleType: 'disc',
                    marginLeft: '20px'
                  }}
                >
                  {line.replace('- ', '')}
                </li>
              );
            }
            if (line.trim() === '') {
              return <br key={index} />;
            }
            return (
              <p 
                key={index}
                style={{ 
                  color: cssVars.foregroundAccent,
                  marginBottom: '12px',
                  lineHeight: '1.6'
                }}
              >
                {line}
              </p>
            );
          })}
        </div>
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

    return (
      <div style={{ padding: '24px' }}>
        <InteractiveComponentDisplay
          title={`${componentName} Interactive Example`}
          description={`Explore the ${componentName} component with live controls`}
          leftControls={config.leftControls}
          rightControls={config.rightControls}
          initialProps={config.initialProps}
          showCode={true}
          showControls={true}
          size="lg"
        >
          {config.component}
        </InteractiveComponentDisplay>
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