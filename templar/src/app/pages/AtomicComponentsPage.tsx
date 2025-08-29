'use client';

import React from 'react';
import { useCSSVariables } from '../providers';
import { Card, Divider, CodeBlock, FilePicker, Toggle, RadioButton, RadioButtonGroup } from '../components/atoms';

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

        <CodeBlock language="tsx" copyable syntaxHighlighting>
{`<Card className="p-6">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>`}
        </CodeBlock>
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

        <CodeBlock language="tsx" copyable syntaxHighlighting>
{`// Basic divider
<Divider />

// Styled divider
<Divider dashed />

// Labeled divider
<Divider label="Section Title" />

// Vertical divider
<Divider orientation="vertical" className="h-12" />`}
        </CodeBlock>
      </section>

      {/* FilePicker Component Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={headingStyle}>FilePicker</h2>
        <p className="mb-6" style={mutedTextStyle}>
          Drag-and-drop file upload component with validation, multiple file support, and customizable styling.
        </p>

        <div className="space-y-8">
          {/* Basic FilePicker */}
          <div>
            <h3 className="text-lg font-medium mb-4" style={headingStyle}>Basic Usage</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Default (Outline)</p>
                <FilePicker
                  onFilesChange={(files) => console.log('Files selected:', files)}
                  placeholder="Drop files here or click to browse"
                />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Primary Variant</p>
                <FilePicker
                  variant="primary"
                  onFilesChange={(files) => console.log('Files selected:', files)}
                  placeholder="Upload your files"
                />
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-lg font-medium mb-4" style={headingStyle}>Sizes</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Small</p>
                <FilePicker
                  size="sm"
                  onFilesChange={(files) => console.log('Files selected:', files)}
                  placeholder="Small file picker"
                />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Medium (Default)</p>
                <FilePicker
                  size="md"
                  onFilesChange={(files) => console.log('Files selected:', files)}
                  placeholder="Medium file picker"
                />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Large</p>
                <FilePicker
                  size="lg"
                  onFilesChange={(files) => console.log('Files selected:', files)}
                  placeholder="Large file picker"
                />
              </div>
            </div>
          </div>

          {/* File Validation */}
          <div>
            <h3 className="text-lg font-medium mb-4" style={headingStyle}>File Validation</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Images Only (Max 5MB)</p>
                <FilePicker
                  accept="image/*"
                  maxSize={5 * 1024 * 1024}
                  onFilesChange={(files) => console.log('Images selected:', files)}
                  placeholder="Drop images here"
                  helperText="PNG, JPG, GIF up to 5MB"
                />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Multiple Documents</p>
                <FilePicker
                  multiple
                  accept=".pdf,.doc,.docx"
                  maxFiles={3}
                  onFilesChange={(files) => console.log('Documents selected:', files)}
                  placeholder="Upload documents"
                  helperText="Select up to 3 documents (PDF, Word)"
                />
              </div>
            </div>
          </div>

          {/* States */}
          <div>
            <h3 className="text-lg font-medium mb-4" style={headingStyle}>States</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Disabled</p>
                <FilePicker
                  disabled
                  onFilesChange={(files) => console.log('Files selected:', files)}
                  placeholder="File upload not available"
                  helperText="Please complete the previous step first"
                />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>With Error</p>
                <FilePicker
                  errorText="File upload failed. Please try again."
                  onFilesChange={(files) => console.log('Files selected:', files)}
                  placeholder="Try uploading again"
                />
              </div>
            </div>
          </div>
        </div>

        <CodeBlock language="tsx" copyable syntaxHighlighting>
{`// Basic file picker
<FilePicker
  onFilesChange={(files) => console.log('Files:', files)}
  placeholder="Drop files here or click to browse"
/>

// Image upload with validation
<FilePicker
  accept="image/*"
  maxSize={5 * 1024 * 1024} // 5MB
  placeholder="Drop images here"
  helperText="PNG, JPG, GIF up to 5MB"
/>

// Multiple file upload
<FilePicker
  multiple
  maxFiles={5}
  accept=".pdf,.doc,.docx"
  placeholder="Upload documents"
  helperText="Select up to 5 documents"
/>

// Different variants and sizes
<FilePicker variant="primary" size="lg" />
<FilePicker variant="secondary" size="sm" />`}
        </CodeBlock>
      </section>

      {/* Toggle Component Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={headingStyle}>Toggle</h2>
        <p className="mb-6" style={mutedTextStyle}>
          Animated toggle component with bouncy bubble animation and multiple variants.
        </p>

        <div className="space-y-8">
          {/* Basic Toggle */}
          <div>
            <h3 className="text-lg font-medium mb-4" style={headingStyle}>Basic Usage</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Default (Primary)</p>
                <Toggle label="Enable notifications" />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>With Description</p>
                <Toggle 
                  label="Auto-save"
                  description="Automatically save your work every 5 minutes"
                />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Label on Left</p>
                <Toggle 
                  label="Dark mode"
                  labelPosition="left"
                />
              </div>
            </div>
          </div>

          {/* Variants */}
          <div>
            <h3 className="text-lg font-medium mb-4" style={headingStyle}>Variants</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Primary</p>
                <Toggle variant="primary" label="Primary toggle" defaultChecked />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Secondary</p>
                <Toggle variant="secondary" label="Secondary toggle" defaultChecked />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Success</p>
                <Toggle variant="success" label="Success toggle" defaultChecked />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Warning</p>
                <Toggle variant="warning" label="Warning toggle" defaultChecked />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Error</p>
                <Toggle variant="error" label="Error toggle" defaultChecked />
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-lg font-medium mb-4" style={headingStyle}>Sizes</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Small</p>
                <Toggle size="sm" label="Small toggle" />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Medium (Default)</p>
                <Toggle size="md" label="Medium toggle" />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Large</p>
                <Toggle size="lg" label="Large toggle" />
              </div>
            </div>
          </div>

          {/* States */}
          <div>
            <h3 className="text-lg font-medium mb-4" style={headingStyle}>States</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Disabled (Off)</p>
                <Toggle disabled label="Disabled toggle" />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Disabled (On)</p>
                <Toggle disabled defaultChecked label="Disabled toggle (checked)" />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Without Label</p>
                <Toggle aria-label="Toggle without visible label" />
              </div>
            </div>
          </div>
        </div>

        <CodeBlock language="tsx" copyable syntaxHighlighting>
{`// Basic toggle
<Toggle 
  label="Enable notifications"
  onChange={(checked) => console.log(checked)}
/>

// With description
<Toggle
  label="Auto-save"
  description="Automatically save your work every 5 minutes"
/>

// Different variants
<Toggle variant="primary" label="Primary" />
<Toggle variant="success" label="Success" />
<Toggle variant="error" label="Error" />

// Different sizes
<Toggle size="sm" label="Small" />
<Toggle size="md" label="Medium" />
<Toggle size="lg" label="Large" />

// Label positioning
<Toggle label="Right label" labelPosition="right" />
<Toggle label="Left label" labelPosition="left" />

// Form integration
<Toggle 
  name="notifications"
  value="email"
  required
  label="Email notifications"
/>`}
        </CodeBlock>
      </section>

      {/* RadioButton Component Demo */}
      <section>
        <h2 className="text-2xl font-semibold mb-4" style={headingStyle}>RadioButton</h2>
        <p className="mb-6" style={mutedTextStyle}>
          Accessible radio button component with variants, sizes, and grouping functionality.
        </p>

        <div className="space-y-8">
          {/* Basic RadioButton */}
          <div>
            <h3 className="text-lg font-medium mb-4" style={headingStyle}>Basic RadioButton</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Simple</p>
                <RadioButton name="basic-demo" value="option1" label="Option 1" />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>With Description</p>
                <RadioButton 
                  name="basic-demo" 
                  value="option2" 
                  label="Premium Plan"
                  description="Get access to all features"
                />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Pre-selected</p>
                <RadioButton 
                  name="basic-demo" 
                  value="option3" 
                  label="Selected Option"
                  defaultChecked
                />
              </div>
            </div>
          </div>

          {/* RadioButton Variants */}
          <div>
            <h3 className="text-lg font-medium mb-4" style={headingStyle}>Variants</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Primary</p>
                <RadioButton variant="primary" name="variant-demo" value="primary" label="Primary" defaultChecked />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Secondary</p>
                <RadioButton variant="secondary" name="variant-demo" value="secondary" label="Secondary" />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Success</p>
                <RadioButton variant="success" name="variant-demo" value="success" label="Success" />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Warning</p>
                <RadioButton variant="warning" name="variant-demo" value="warning" label="Warning" />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Error</p>
                <RadioButton variant="error" name="variant-demo" value="error" label="Error" />
              </div>
            </div>
          </div>

          {/* RadioButton Sizes */}
          <div>
            <h3 className="text-lg font-medium mb-4" style={headingStyle}>Sizes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Small</p>
                <RadioButton size="sm" name="size-demo" value="small" label="Small radio button" />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Medium (Default)</p>
                <RadioButton size="md" name="size-demo" value="medium" label="Medium radio button" defaultChecked />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Large</p>
                <RadioButton size="lg" name="size-demo" value="large" label="Large radio button" />
              </div>
            </div>
          </div>

          {/* RadioButton Group */}
          <div>
            <h3 className="text-lg font-medium mb-4" style={headingStyle}>RadioButton Group</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm mb-4" style={mutedTextStyle}>Vertical Group (Default)</p>
                <RadioButtonGroup
                  name="plan-vertical"
                  variant="primary"
                  options={[
                    {
                      value: 'basic',
                      label: 'Basic Plan',
                      description: 'Perfect for getting started'
                    },
                    {
                      value: 'premium',
                      label: 'Premium Plan',
                      description: 'For growing businesses'
                    },
                    {
                      value: 'enterprise',
                      label: 'Enterprise Plan',
                      description: 'For large organizations'
                    }
                  ]}
                />
              </div>
              
              <div>
                <p className="text-sm mb-4" style={mutedTextStyle}>Horizontal Group</p>
                <RadioButtonGroup
                  name="preference-horizontal"
                  orientation="horizontal"
                  variant="secondary"
                  options={[
                    { value: 'email', label: 'Email' },
                    { value: 'sms', label: 'SMS' },
                    { value: 'push', label: 'Push' }
                  ]}
                />
              </div>
            </div>
          </div>

          {/* RadioButton States */}
          <div>
            <h3 className="text-lg font-medium mb-4" style={headingStyle}>States</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Normal</p>
                <RadioButton name="state-demo" value="normal" label="Normal state" />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Checked</p>
                <RadioButton name="state-demo" value="checked" label="Checked state" defaultChecked />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Disabled</p>
                <RadioButton name="state-demo" value="disabled" label="Disabled state" disabled />
              </div>
              
              <div>
                <p className="text-sm mb-2" style={mutedTextStyle}>Invalid</p>
                <RadioButton name="state-demo" value="invalid" label="Invalid state" invalid />
              </div>
            </div>
          </div>
        </div>

        <CodeBlock language="tsx" copyable syntaxHighlighting>
{`// Basic radio button
<RadioButton 
  name="choice"
  value="option1"
  label="Option 1"
  onChange={(e) => console.log(e.target.value)}
/>

// With description
<RadioButton
  name="plan"
  value="premium"
  label="Premium Plan"
  description="Get access to all features"
  variant="primary"
/>

// Different variants
<RadioButton variant="primary" name="variant" value="primary" label="Primary" />
<RadioButton variant="success" name="variant" value="success" label="Success" />
<RadioButton variant="error" name="variant" value="error" label="Error" />

// Different sizes
<RadioButton size="sm" name="size" value="sm" label="Small" />
<RadioButton size="md" name="size" value="md" label="Medium" />
<RadioButton size="lg" name="size" value="lg" label="Large" />

// RadioButton Group
<RadioButtonGroup
  name="plan"
  value={selectedPlan}
  onChange={setSelectedPlan}
  options={[
    {
      value: 'basic',
      label: 'Basic Plan',
      description: 'Perfect for getting started'
    },
    {
      value: 'premium', 
      label: 'Premium Plan',
      description: 'For growing businesses'
    }
  ]}
/>

// States
<RadioButton disabled label="Disabled" />
<RadioButton invalid label="Invalid" />
<RadioButton required label="Required" />`}
        </CodeBlock>
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
