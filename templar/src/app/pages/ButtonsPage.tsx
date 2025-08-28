'use client';

import React, { useState } from 'react';
import { Button, Icon, Card, Badge } from '../components/atoms';
import { useCSSVariables, useToast, useLoading } from '../providers';

export function ButtonsPage() {
  const cssVars = useCSSVariables();
  const { success, error, info } = useToast();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  const variants = ['primary', 'secondary', 'outline', 'ghost', 'destructive'] as const;

  const handleAsyncClick = async (label: string) => {
    const key = `demo-${label}`;
    setLoadingStates(prev => ({ ...prev, [key]: true }));
    
    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      success(`${label} action completed!`);
    } catch (err) {
      error(`${label} action failed`);
    } finally {
      setLoadingStates(prev => ({ ...prev, [key]: false }));
    }
  };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 
      className="text-2xl font-bold mb-6"
      style={{ color: cssVars.foreground }}
    >
      {children}
    </h2>
  );

  const SubsectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 
      className="text-lg font-semibold mb-4"
      style={{ color: cssVars.foreground }}
    >
      {children}
    </h3>
  );

  const CodeBlock = ({ children }: { children: string }) => (
    <pre 
      className="text-sm p-3 rounded mb-4 overflow-x-auto"
      style={{ 
        backgroundColor: cssVars.muted,
        color: cssVars.mutedForeground,
        border: `1px solid ${cssVars.border}`
      }}
    >
      <code>{children}</code>
    </pre>
  );

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: cssVars.foreground }}
        >
          Button Components
        </h1>
        <p 
          className="text-lg max-w-3xl mx-auto"
          style={{ color: cssVars.mutedForeground }}
        >
          A comprehensive showcase of the Templar button component system featuring multiple variants, sizes, 
          loading states, icon integration, and async operation handling.
        </p>
      </div>

      {/* Size Variations */}
      <Card className="p-6">
        <SectionTitle>Size Variations</SectionTitle>
        <p className="mb-6" style={{ color: cssVars.mutedForeground }}>
          Buttons come in 5 standardized sizes following the Templar design system.
        </p>
        
        <div className="grid gap-6">
          {sizes.map(size => (
            <div key={size} className="space-y-3">
              <div className="flex items-center gap-4 mb-3">
                <Badge variant="outline" size="sm">
                  {size.toUpperCase()}
                </Badge>
                <span style={{ color: cssVars.mutedForeground }}>
                  {size === 'xs' && '40px height, 82px min-width'}
                  {size === 'sm' && '40px height, 82px min-width'}
                  {size === 'md' && '48px height, 112px min-width'}
                  {size === 'lg' && '52px height, 112px min-width'}
                  {size === 'xl' && '60px height, 142px min-width'}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {variants.map(variant => (
                  <Button
                    key={`${size}-${variant}`}
                    variant={variant}
                    size={size}
                    onClick={() => info(`Clicked ${variant} ${size} button`)}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <CodeBlock>{`<Button variant="primary" size="md">Button Text</Button>
<Button variant="secondary" size="lg">Secondary</Button>
<Button variant="outline" size="sm">Outline</Button>`}</CodeBlock>
      </Card>

      {/* Variant Showcase */}
      <Card className="p-6">
        <SectionTitle>Variant Types</SectionTitle>
        <p className="mb-6" style={{ color: cssVars.mutedForeground }}>
          Each variant serves a specific purpose in the interface hierarchy.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {variants.map(variant => (
            <div key={variant} className="space-y-3">
              <SubsectionTitle>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </SubsectionTitle>
              
              <div className="space-y-2">
                <Button variant={variant} size="md" fullWidth>
                  Default
                </Button>
                <Button variant={variant} size="md" fullWidth disabled>
                  Disabled
                </Button>
                <Button 
                  variant={variant} 
                  size="md" 
                  fullWidth 
                  rounded
                >
                  Rounded
                </Button>
              </div>

              <p className="text-sm" style={{ color: cssVars.mutedForeground }}>
                {variant === 'primary' && 'Main call-to-action buttons'}
                {variant === 'secondary' && 'Secondary actions and alternatives'}
                {variant === 'outline' && 'Outlined style with transparent background'}
                {variant === 'ghost' && 'Minimal style with no background'}
                {variant === 'destructive' && 'Dangerous actions like delete or remove'}
              </p>
            </div>
          ))}
        </div>

        <CodeBlock>{`<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outlined Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="destructive">Delete</Button>`}</CodeBlock>
      </Card>

      {/* Icon Integration */}
      <Card className="p-6">
        <SectionTitle>Icon Integration</SectionTitle>
        <p className="mb-6" style={{ color: cssVars.mutedForeground }}>
          Buttons support icons in leading and trailing positions with automatic sizing.
        </p>

        <div className="space-y-6">
          <div>
            <SubsectionTitle>Leading Icons</SubsectionTitle>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="primary" 
                icon={<Icon name="Plus" />}
                iconPosition="leading"
              >
                Add Item
              </Button>
              <Button 
                variant="secondary" 
                icon={<Icon name="Download" />}
                iconPosition="leading"
              >
                Download
              </Button>
              <Button 
                variant="outline" 
                icon={<Icon name="Settings" />}
                iconPosition="leading"
              >
                Settings
              </Button>
              <Button 
                variant="ghost" 
                icon={<Icon name="Edit" />}
                iconPosition="leading"
              >
                Edit
              </Button>
            </div>
          </div>

          <div>
            <SubsectionTitle>Trailing Icons</SubsectionTitle>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="primary" 
                icon={<Icon name="ArrowRight" />}
                iconPosition="trailing"
              >
                Next
              </Button>
              <Button 
                variant="secondary" 
                icon={<Icon name="Link" />}
                iconPosition="trailing"
              >
                Open Link
              </Button>
              <Button 
                variant="outline" 
                icon={<Icon name="FloppyDisk" />}
                iconPosition="trailing"
              >
                Save
              </Button>
            </div>
          </div>

          <div>
            <SubsectionTitle>Icon-only Buttons</SubsectionTitle>
            <div className="flex flex-wrap gap-3">
              {sizes.map(size => (
                <Button 
                  key={size}
                  variant="ghost" 
                  size={size}
                  icon={<Icon name="Heart" />}
                  rounded
                  title={`${size} icon button`}
                />
              ))}
            </div>
          </div>
        </div>

        <CodeBlock>{`<Button 
  variant="primary" 
  icon={<Icon name="Plus" />}
  iconPosition="leading"
>
  Add Item
</Button>

<Button 
  variant="secondary" 
  icon={<Icon name="ArrowRight" />}
  iconPosition="trailing"
>
  Next
</Button>`}</CodeBlock>
      </Card>

      {/* Loading States */}
      <Card className="p-6">
        <SectionTitle>Loading States & Async Operations</SectionTitle>
        <p className="mb-6" style={{ color: cssVars.mutedForeground }}>
          Buttons support loading states and async operations with automatic error handling.
        </p>

        <div className="space-y-6">
          <div>
            <SubsectionTitle>Loading States</SubsectionTitle>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" loading>
                Loading...
              </Button>
              <Button variant="secondary" loading>
                Please wait
              </Button>
              <Button variant="ghost" loading size="lg">
                Processing
              </Button>
              <Button variant="outline" loading size="lg">
                Processing
              </Button>
            </div>
          </div>

          <div>
            <SubsectionTitle>Async Operations</SubsectionTitle>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                onAsyncClick={() => handleAsyncClick('Save')}
                loading={loadingStates['demo-Save']}
                icon={<Icon name="Save" />}
              >
                Save Changes
              </Button>
              <Button
                variant="secondary"
                onAsyncClick={() => handleAsyncClick('Upload')}
                loading={loadingStates['demo-Upload']}
                icon={<Icon name="Upload" />}
              >
                Upload File
              </Button>
              <Button
                variant="destructive"
                onAsyncClick={() => handleAsyncClick('Delete')}
                loading={loadingStates['demo-Delete']}
                icon={<Icon name="Trash" />}
              >
                Delete Item
              </Button>
            </div>
          </div>
        </div>

        <CodeBlock>{`// Manual loading
<Button variant="primary" loading>
  Loading...
</Button>

// Async operations with automatic loading
<Button
  variant="primary"
  onAsyncClick={async () => {
    await saveData();
  }}
>
  Save
</Button>`}</CodeBlock>
      </Card>

      {/* Layout Options */}
      <Card className="p-6">
        <SectionTitle>Layout Options</SectionTitle>
        <p className="mb-6" style={{ color: cssVars.mutedForeground }}>
          Buttons can be styled for different layout needs.
        </p>

        <div className="space-y-6">
          <div>
            <SubsectionTitle>Full Width Buttons</SubsectionTitle>
            <div className="space-y-3 max-w-md">
              <Button variant="primary" fullWidth>
                Full Width Primary
              </Button>
              <Button variant="outline" fullWidth>
                Full Width Outline
              </Button>
            </div>
          </div>

          <div>
            <SubsectionTitle>Button Groups</SubsectionTitle>
            <div className="flex gap-0">
              <Button 
                variant="outline" 
                className="rounded-r-none border-r-0"
              >
                Left
              </Button>
              <Button 
                variant="outline" 
                className="rounded-none border-r-0"
              >
                Center
              </Button>
              <Button 
                variant="outline" 
                className="rounded-l-none"
              >
                Right
              </Button>
            </div>
          </div>

          <div>
            <SubsectionTitle>Rounded Buttons</SubsectionTitle>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" rounded>
                Rounded Primary
              </Button>
              <Button 
                variant="secondary" 
                rounded 
                icon={<Icon name="Heart" />}
              >
                Like
              </Button>
              <Button 
                variant="outline" 
                rounded 
                icon={<Icon name="Share" />}
                iconPosition="trailing"
              >
                Share
              </Button>
            </div>
          </div>
        </div>

        <CodeBlock>{`<Button variant="primary" fullWidth>
  Full Width Button
</Button>

<Button variant="secondary" rounded>
  Rounded Button
</Button>`}</CodeBlock>
      </Card>

      {/* Interactive Examples */}
      <Card className="p-6">
        <SectionTitle>Interactive Examples</SectionTitle>
        <p className="mb-6" style={{ color: cssVars.mutedForeground }}>
          Try these interactive buttons to see hover effects and click handlers.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <SubsectionTitle>Click Handlers</SubsectionTitle>
            <div className="space-y-3">
              <Button 
                variant="primary" 
                onClick={() => success('Success! Button clicked.')}
                icon={<Icon name="CheckCircle" />}
              >
                Show Success
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => error('Error! Something went wrong.')}
                icon={<Icon name="AlertTriangle" />}
              >
                Show Error
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => info('Info: This is an information message.')}
                icon={<Icon name="Info" />}
              >
                Show Info
              </Button>
            </div>
          </div>

          <div>
            <SubsectionTitle>State Combinations</SubsectionTitle>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                size="lg"
                icon={<Icon name="Sparkles" />}
                rounded
                onClick={() => success('Fancy button clicked!')}
              >
                Fancy Button
              </Button>
              <Button 
                variant="ghost" 
                fullWidth
                icon={<Icon name="Zap" />}
                iconPosition="trailing"
                onClick={() => info('Ghost button with trailing icon')}
              >
                Ghost with Icon
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Badge Component Showcase */}
      <Card className="p-6">
        <SectionTitle>Badge Components</SectionTitle>
        <p className="mb-6" style={{ color: cssVars.mutedForeground }}>
          Badges are built using the same design system as buttons, perfect for status indicators and labels.
        </p>

        <div className="space-y-6">
          <div>
            <SubsectionTitle>Badge Variants</SubsectionTitle>
            <div className="flex flex-wrap gap-3">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="ghost">Ghost</Badge>
              <Badge variant="destructive">Error</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
            </div>
          </div>

          <div>
            <SubsectionTitle>Badge Sizes</SubsectionTitle>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="primary" size="xs">XS</Badge>
              <Badge variant="primary" size="sm">SM</Badge>
              <Badge variant="primary" size="md">MD</Badge>
              <Badge variant="primary" size="lg">LG</Badge>
              <Badge variant="primary" size="xl">XL</Badge>
            </div>
          </div>

          <div>
            <SubsectionTitle>Badges with Icons</SubsectionTitle>
            <div className="flex flex-wrap gap-3">
              <Badge 
                variant="success" 
                icon={<Icon name="CheckCircle" />}
              >
                Verified
              </Badge>
              <Badge 
                variant="warning" 
                icon={<Icon name="WarningTriangle" />}
                iconPosition="trailing"
                removable
                onRemove={() => info('Warning badge removed!')}
              >
                Warning
              </Badge>
              <Badge 
                variant="primary" 
                icon={<Icon name="Star" />}
                rounded
              >
                Featured
              </Badge>
            </div>
          </div>

          <div>
            <SubsectionTitle>Removable Badges</SubsectionTitle>
            <div className="flex flex-wrap gap-3">
              <Badge 
                variant="warning"
                removable 
                onRemove={() => info('Tag removed!')}
              >
                JavaScript
              </Badge>
              <Badge 
                variant="outline" 
                removable 
                onRemove={() => info('Tag removed!')}
              >
                React
              </Badge>
              <Badge 
                variant="outline" 
                removable 
                onRemove={() => info('Tag removed!')}
              >
                TypeScript
              </Badge>
            </div>
          </div>

          <div>
            <SubsectionTitle>Notification Badges</SubsectionTitle>
            <div className="flex flex-wrap items-center gap-6">
              <div className="relative">
                <Button variant="secondary" icon={<Icon name="Bell" />} />
                <Badge 
                  variant="destructive" 
                  size="xs" 
                  rounded
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    minWidth: '18px',
                    height: '18px'
                  }}
                >
                  3
                </Badge>
              </div>
              <div className="relative">
                <Button variant="outline" icon={<Icon name="Mail" />} />
                <Badge 
                  variant="primary" 
                  size="xs" 
                  rounded
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    minWidth: '18px',
                    height: '18px'
                  }}
                >
                  12
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <CodeBlock>{`<Badge variant="primary">Status</Badge>
<Badge variant="success" icon={<Icon name="CheckCircle" />}>
  Verified
</Badge>
<Badge variant="outline" removable onRemove={handleRemove}>
  Removable Tag
</Badge>`}</CodeBlock>
      </Card>

      {/* Usage Guidelines */}
      <Card className="p-6">
        <SectionTitle>Usage Guidelines</SectionTitle>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 
              className="text-lg font-semibold mb-4"
              style={{ color: '#22c55e' }}
            >
              ✅ Do
            </h4>
            <ul className="space-y-2" style={{ color: cssVars.mutedForeground }}>
              <li>• Use primary buttons for main actions</li>
              <li>• Use secondary buttons for alternative actions</li>
              <li>• Use outline buttons for less important actions</li>
              <li>• Use ghost buttons for minimal visual weight</li>
              <li>• Use destructive buttons for dangerous actions</li>
              <li>• Use appropriate sizes for your interface</li>
              <li>• Provide loading states for async operations</li>
            </ul>
          </div>
          
          <div>
            <h4 
              className="text-lg font-semibold mb-4"
              style={{ color: '#ef4444' }}
            >
              ❌ Don't
            </h4>
            <ul className="space-y-2" style={{ color: cssVars.mutedForeground }}>
              <li>• Use multiple primary buttons in the same area</li>
              <li>• Mix different sizes in the same button group</li>
              <li>• Use destructive variant for non-dangerous actions</li>
              <li>• Forget to handle loading states for async operations</li>
              <li>• Use buttons for navigation (use links instead)</li>
              <li>• Make buttons too small for touch interfaces</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
