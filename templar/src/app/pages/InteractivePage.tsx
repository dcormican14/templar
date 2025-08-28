'use client';

import React, { useState } from 'react';
import { useCSSVariables, useToast } from '../providers';
import { Card, CheckBox, CodeBlock, Divider, Notification, Button } from '../components/atoms';

export function InteractivePage() {
  const cssVars = useCSSVariables();
  
  // State for interactive examples
  const [labelChecked, setLabelChecked] = useState(true); // Keep this for controlled example
  const [disabledChecked, setDisabledChecked] = useState(true);
  
  // Content toggle demo state
  const [contentToggleEnabled, setContentToggleEnabled] = useState(true);
  const [demoChecked, setDemoChecked] = useState(false);
  
  // Group checkbox state for indeterminate example
  const [items, setItems] = useState([
    { id: 1, label: 'Item 1', checked: true },
    { id: 2, label: 'Item 2', checked: false },
    { id: 3, label: 'Item 3', checked: false },
  ]);

  const allChecked = items.every(item => item.checked);
  const someChecked = items.some(item => item.checked);
  const indeterminate = someChecked && !allChecked;

  const handleSelectAll = (checked: boolean) => {
    setItems(items.map(item => ({ ...item, checked })));
  };

  const handleItemChange = (id: number, checked: boolean) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked } : item
    ));
  };

  const headingStyle = {
    color: cssVars.foreground,
    marginBottom: '1rem'
  };

  const mutedTextStyle = {
    color: cssVars.mutedForeground
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <section>
        <h1 className="text-4xl font-bold mb-4" style={headingStyle}>Interactive Components</h1>
        <p className="text-lg" style={mutedTextStyle}>
          Interactive components with advanced functionality and accessibility features following the Templar design standards.
          This page showcases components with dynamic behaviors and user interaction patterns.
        </p>
      </section>

      {/* CheckBox Section Header */}
      <section>
        <h2 className="text-3xl font-semibold mb-4" style={headingStyle}>CheckBox Components</h2>
        <p className="text-base mb-6" style={mutedTextStyle}>
          Interactive checkboxes with multiple variants, sizes, and advanced features like content toggling.
        </p>
      </section>

      {/* Basic Usage */}
      <section>
        <h2 className="text-2xl font-semibold mb-6" style={headingStyle}>Basic Usage</h2>
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4" style={headingStyle}>Interactive Examples</h3>
              <div className="space-y-4">
                <CheckBox
                  id="basic"
                  defaultChecked={false}
                  onChange={(checked) => console.log('Basic checkbox:', checked)}
                  label="Simple uncontrolled checkbox"
                  description="Uses internal state - no need to manage checked state yourself"
                />
                
                <CheckBox
                  id="with-label"
                  defaultChecked={true}
                  onChange={(checked) => console.log('Label checkbox:', checked)}
                  label="Another simple checkbox"
                  description="This one starts checked by default"
                />
                
                <CheckBox
                  id="controlled"
                  checked={labelChecked}
                  onChange={setLabelChecked}
                  label="Controlled checkbox (advanced)"
                  description="This checkbox demonstrates controlled mode where parent manages state"
                />
                
                <CheckBox
                  id="disabled"
                  checked={disabledChecked}
                  onChange={setDisabledChecked}
                  disabled
                  label="Disabled checkbox"
                  description="This checkbox is disabled and cannot be interacted with"
                />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4" style={headingStyle}>Code Example</h3>
              <CodeBlock language="tsx" copyable syntaxHighlighting>
{`import { CheckBox } from '@/components/atoms';

// Simple usage - no state management needed!
function SimpleExample() {
  return (
    <CheckBox
      id="newsletter"
      defaultChecked={false}
      onChange={(checked) => {
        console.log('Newsletter subscription:', checked);
        // API call or other side effects here
      }}
      label="Subscribe to newsletter"
      description="Get updates about new features"
    />
  );
}

// Advanced controlled usage
function ControlledExample() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <CheckBox
      id="controlled"
      checked={isChecked}
      onChange={setIsChecked}
      label="Controlled checkbox"
      description="Parent component manages the state"
    />
  );
}`}
              </CodeBlock>
            </div>
          </div>
        </Card>
      </section>

      {/* Controlled vs Uncontrolled */}
      <section>
        <h2 className="text-2xl font-semibold mb-6" style={headingStyle}>Controlled vs Uncontrolled</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-3" style={headingStyle}>🎯 Uncontrolled (Recommended)</h3>
            <p className="text-sm mb-4" style={mutedTextStyle}>
              CheckBox manages its own state internally. Perfect for most use cases.
            </p>
            <CodeBlock language="tsx" copyable syntaxHighlighting>
{`// Just handle the change event
<CheckBox
  defaultChecked={false}
  onChange={(checked) => {
    // Handle side effects
    updateUserPreference(checked);
  }}
  label="Email notifications"
/>`}
            </CodeBlock>
            <ul className="space-y-2 text-sm mt-4" style={mutedTextStyle}>
              <li>• <strong>Less code:</strong> No state management needed</li>
              <li>• <strong>Better performance:</strong> No re-renders on change</li>
              <li>• <strong>Simpler:</strong> Just set defaultChecked and handle onChange</li>
            </ul>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-semibold mb-3" style={headingStyle}>⚙️ Controlled (Advanced)</h3>
            <p className="text-sm mb-4" style={mutedTextStyle}>
              Parent component manages the checked state. Use when you need complex state logic.
            </p>
            <CodeBlock language="tsx" copyable syntaxHighlighting>
{`// Manage state yourself
const [checked, setChecked] = useState(false);

<CheckBox
  checked={checked}
  onChange={setChecked}
  label="Complex checkbox"
/>`}
            </CodeBlock>
            <ul className="space-y-2 text-sm mt-4" style={mutedTextStyle}>
              <li>• <strong>Full control:</strong> Complete state management</li>
              <li>• <strong>Complex logic:</strong> When you need validation, side effects</li>
              <li>• <strong>Form libraries:</strong> Required by some form libraries</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h2 className="text-2xl font-semibold mb-6" style={headingStyle}>Sizes</h2>
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4" style={headingStyle}>Size Variations</h3>
              <div className="space-y-4">
                <CheckBox 
                  id="size-xs"
                  size="xs" 
                  defaultChecked 
                  label="Extra Small (xs)"
                  onChange={(checked) => console.log('Size XS:', checked)}
                />
                <CheckBox 
                  id="size-sm"
                  size="sm" 
                  defaultChecked 
                  label="Small (sm)"
                  onChange={(checked) => console.log('Size SM:', checked)}
                />
                <CheckBox 
                  id="size-md"
                  size="md" 
                  defaultChecked 
                  label="Medium (md) - Default"
                  onChange={(checked) => console.log('Size MD:', checked)}
                />
                <CheckBox 
                  id="size-lg"
                  size="lg" 
                  defaultChecked 
                  label="Large (lg)"
                  onChange={(checked) => console.log('Size LG:', checked)}
                />
                <CheckBox 
                  id="size-xl"
                  size="xl" 
                  defaultChecked 
                  label="Extra Large (xl)"
                  onChange={(checked) => console.log('Size XL:', checked)}
                />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4" style={headingStyle}>Size Code</h3>
              <CodeBlock language="tsx" copyable syntaxHighlighting>
{`<CheckBox id="size-xs" size="xs" defaultChecked label="Extra Small" />
<CheckBox id="size-sm" size="sm" defaultChecked label="Small" />
<CheckBox id="size-md" size="md" defaultChecked label="Medium (Default)" />
<CheckBox id="size-lg" size="lg" defaultChecked label="Large" />
<CheckBox id="size-xl" size="xl" defaultChecked label="Extra Large" />`}
              </CodeBlock>
            </div>
          </div>
        </Card>
      </section>

      {/* Variants */}
      <section>
        <h2 className="text-2xl font-semibold mb-6" style={headingStyle}>Variants</h2>
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4" style={headingStyle}>Color Variants</h3>
              <div className="space-y-4">
                <CheckBox 
                  id="variant-default"
                  variant="default" 
                  defaultChecked 
                  label="Default"
                  onChange={(checked) => console.log('Variant Default:', checked)}
                />
                <CheckBox 
                  id="variant-primary"
                  variant="primary" 
                  defaultChecked 
                  label="Primary"
                  onChange={(checked) => console.log('Variant Primary:', checked)}
                />
                <CheckBox 
                  id="variant-secondary"
                  variant="secondary" 
                  defaultChecked 
                  label="Secondary"
                  onChange={(checked) => console.log('Variant Secondary:', checked)}
                />
                <CheckBox 
                  id="variant-success"
                  variant="success" 
                  defaultChecked 
                  label="Success"
                  onChange={(checked) => console.log('Variant Success:', checked)}
                />
                <CheckBox 
                  id="variant-warning"
                  variant="warning" 
                  defaultChecked 
                  label="Warning"
                  onChange={(checked) => console.log('Variant Warning:', checked)}
                />
                <CheckBox 
                  id="variant-error"
                  variant="error" 
                  defaultChecked 
                  label="Error"
                  onChange={(checked) => console.log('Variant Error:', checked)}
                />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4" style={headingStyle}>Variant Code</h3>
              <CodeBlock language="tsx" copyable syntaxHighlighting>
{`<CheckBox id="variant-default" variant="default" defaultChecked label="Default" />
<CheckBox id="variant-primary" variant="primary" defaultChecked label="Primary" />
<CheckBox id="variant-secondary" variant="secondary" defaultChecked label="Secondary" />
<CheckBox id="variant-success" variant="success" defaultChecked label="Success" />
<CheckBox id="variant-warning" variant="warning" defaultChecked label="Warning" />
<CheckBox id="variant-error" variant="error" defaultChecked label="Error" />`}
              </CodeBlock>
            </div>
          </div>
        </Card>
      </section>

      {/* Special States */}
      <section>
        <h2 className="text-2xl font-semibold mb-6" style={headingStyle}>Special States</h2>
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4" style={headingStyle}>Indeterminate & Error States</h3>
              <div className="space-y-6">
                {/* Indeterminate example */}
                <div>
                  <CheckBox
                    id="select-all"
                    checked={allChecked}
                    indeterminate={indeterminate}
                    onChange={handleSelectAll}
                    label="Select all items"
                    description={`${items.filter(item => item.checked).length} of ${items.length} items selected`}
                  />
                  
                  <div className="ml-6 mt-2 space-y-2">
                    {items.map(item => (
                      <CheckBox
                        key={item.id}
                        id={`item-${item.id}`}
                        checked={item.checked}
                        onChange={(checked) => handleItemChange(item.id, checked)}
                        label={item.label}
                        size="sm"
                      />
                    ))}
                  </div>
                </div>

                <Divider />

                {/* Error state */}
                <CheckBox
                  id="error-example"
                  defaultChecked={false}
                  error
                  label="Required field"
                  description="This field must be checked to continue"
                  onChange={(checked) => console.log('Required field:', checked)}
                />

                {/* Rounded style */}
                <CheckBox
                  id="rounded-example"
                  defaultChecked={false}
                  rounded
                  label="Rounded checkbox"
                  description="Uses rounded corner styling"
                  onChange={(checked) => console.log('Rounded:', checked)}
                />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4" style={headingStyle}>Special States Code</h3>
              <CodeBlock language="tsx" copyable syntaxHighlighting>
{`// Indeterminate state (controlled mode needed)
const [allChecked, setAllChecked] = useState(false);
const [indeterminate, setIndeterminate] = useState(true);

<CheckBox
  checked={allChecked}
  indeterminate={indeterminate}
  onChange={handleSelectAll}
  label="Select all"
/>

// Error state (simple)
<CheckBox
  error={true}
  defaultChecked={false}
  label="Required field"
  description="Must be checked"
  onChange={(checked) => {
    if (checked) clearError();
  }}
/>

// Rounded style (simple)
<CheckBox
  rounded={true}
  defaultChecked={false}
  label="Rounded checkbox"
/>`}
              </CodeBlock>
            </div>
          </div>
        </Card>
      </section>

      {/* Content Toggle Behavior */}
      <section>
        <h2 className="text-2xl font-semibold mb-6" style={headingStyle}>Content Toggle Behavior</h2>
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4" style={headingStyle}>Toggle Control Demo</h3>
              
              {/* Control toggle */}
              <div className="mb-6 p-4 border rounded-lg" style={{ borderColor: cssVars.border }}>
                <CheckBox
                  id="content-toggle-control"
                  checked={contentToggleEnabled}
                  onChange={setContentToggleEnabled}
                  label="Enable content toggle"
                  description="When enabled, clicking on labels and descriptions will toggle the checkbox"
                  variant="primary"
                />
              </div>

              {/* Demo checkbox */}
              <div className="space-y-4">
                <h4 className="font-medium" style={headingStyle}>Test it out:</h4>
                <CheckBox
                  id="toggle-demo"
                  checked={demoChecked}
                  onChange={setDemoChecked}
                  contentToggleable={contentToggleEnabled}
                  label="Click this label to test"
                  description="Click this description text too! Try toggling the control above to see the difference."
                  variant="success"
                />
                
                <p className="text-sm" style={mutedTextStyle}>
                  <strong>Current state:</strong> {demoChecked ? 'Checked' : 'Unchecked'}<br/>
                  <strong>Content toggle:</strong> {contentToggleEnabled ? 'Enabled' : 'Disabled'}<br/>
                  <strong>Label cursor:</strong> {contentToggleEnabled ? 'Pointer (clickable)' : 'Default (not clickable)'}
                </p>
              </div>
              
              <Divider className="my-6" />
              
              <div className="space-y-4">
                <h4 className="font-medium" style={headingStyle}>Real-world Examples:</h4>
                
                <CheckBox
                  id="form-example"
                  defaultChecked={false}
                  contentToggleable={true}
                  label="Newsletter subscription"
                  description="Enable to receive updates about new features and promotions"
                  variant="default"
                  onChange={(checked) => console.log('Newsletter:', checked)}
                />
                
                <CheckBox
                  id="readonly-example"
                  defaultChecked={true}
                  contentToggleable={false}
                  label="Read-only agreement"
                  description="This agreement cannot be toggled by clicking the text (checkbox only)"
                  variant="secondary"
                  onChange={(checked) => console.log('Agreement:', checked)}
                />
                
                <CheckBox
                  id="conditional-example"
                  defaultChecked={false}
                  contentToggleable={!false} // Simulating dynamic condition
                  label="Conditional interaction"
                  description="Content toggle can be controlled dynamically based on app state"
                  variant="warning"
                  onChange={(checked) => console.log('Conditional:', checked)}
                />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4" style={headingStyle}>Implementation Guide</h3>
              <CodeBlock language="tsx" copyable syntaxHighlighting>
{`// Simple uncontrolled usage (recommended)
<CheckBox
  contentToggleable={true}
  defaultChecked={false}
  label="Clickable label"
  description="Clickable description"
  onChange={(checked) => console.log('Changed:', checked)}
/>

// Disable content toggle
<CheckBox
  contentToggleable={false}
  defaultChecked={false}
  label="Non-clickable label"
  description="Non-clickable description"
/>

// Controlled mode for complex state management
const [isAccepted, setIsAccepted] = useState(false);
const [isLoading, setIsLoading] = useState(false);

<CheckBox
  checked={isAccepted}
  onChange={setIsAccepted}
  contentToggleable={!isLoading}
  label="Terms and conditions"
  description="Interaction disabled during submission"
/>

// Simple form usage
<CheckBox
  defaultChecked={false}
  error={form.errors.terms}
  required
  label="I accept the terms"
  description="Required to continue"
  onChange={(checked) => {
    // Handle change - no need to manage state!
    if (checked) {
      validateTerms();
    }
  }}
/>`}
              </CodeBlock>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3" style={headingStyle}>When to Use</h4>
                <ul className="space-y-2 text-sm" style={mutedTextStyle}>
                  <li>• <strong>Enable (default):</strong> Standard form inputs, simple toggles</li>
                  <li>• <strong>Disable:</strong> Read-only states, confirmation dialogs</li>
                  <li>• <strong>Dynamic:</strong> Based on loading states, permissions, validation</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-2xl font-semibold mb-6" style={headingStyle}>Accessibility</h2>
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4" style={headingStyle}>Keyboard Navigation</h3>
              <p className="text-sm mb-4" style={mutedTextStyle}>
                Try navigating these checkboxes with your keyboard:
              </p>
              <div className="space-y-4">
                <CheckBox 
                  id="keyboard-1"
                  defaultChecked={false}
                  label="Tab to focus, Space to toggle"
                  description="Use Tab key to focus, Space or Enter to toggle"
                  onChange={(checked) => console.log('Keyboard 1:', checked)}
                />
                <CheckBox 
                  id="keyboard-2"
                  defaultChecked={false}
                  label="Screen reader friendly"
                  description="Proper ARIA attributes for assistive technology"
                  onChange={(checked) => console.log('Keyboard 2:', checked)}
                />
                <CheckBox 
                  id="keyboard-3"
                  defaultChecked={false}
                  label="Focus indicators"
                  description="Clear visual focus indicators for keyboard users"
                  onChange={(checked) => console.log('Keyboard 3:', checked)}
                />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4" style={headingStyle}>Accessibility Features</h3>
              <ul className="space-y-3 text-sm" style={mutedTextStyle}>
                <li>• <strong>Keyboard Support:</strong> Tab, Space, and Enter key navigation</li>
                <li>• <strong>ARIA Labels:</strong> Proper aria-checked and aria-describedby attributes</li>
                <li>• <strong>Focus Management:</strong> Clear focus indicators and logical tab order</li>
                <li>• <strong>Screen Readers:</strong> Descriptive labels and state announcements</li>
                <li>• <strong>Color Independence:</strong> Icons and states don't rely solely on color</li>
                <li>• <strong>Touch Friendly:</strong> Adequate touch targets on all devices</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Best Practices */}
      <section>
        <h2 className="text-2xl font-semibold mb-6" style={headingStyle}>Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-3" style={headingStyle}>✅ Do</h3>
            <ul className="space-y-2 text-sm" style={mutedTextStyle}>
              <li>• Use defaultChecked for simple, uncontrolled usage</li>
              <li>• Handle changes with onChange callback for side effects</li>
              <li>• Use clear, concise labels</li>
              <li>• Provide descriptions for complex options</li>
              <li>• Group related checkboxes logically</li>
              <li>• Use controlled mode only when needed for complex state</li>
              <li>• Include proper error states and messaging</li>
              <li>• Ensure adequate contrast and touch targets</li>
            </ul>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-semibold mb-3" style={headingStyle}>❌ Don't</h3>
            <ul className="space-y-2 text-sm" style={mutedTextStyle}>
              <li>• Don't use checked prop unless you need controlled mode</li>
              <li>• Don't use checkboxes for mutually exclusive options</li>
              <li>• Don't make labels too long or unclear</li>
              <li>• Don't disable checkboxes without explanation</li>
              <li>• Don't rely solely on color to indicate state</li>
              <li>• Don't use too many variants in one interface</li>
              <li>• Don't forget to handle keyboard interactions</li>
              <li>• Don't manage state manually unless absolutely necessary</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Notifications Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-4" style={headingStyle}>Notification Components</h2>
        <p className="text-base mb-6" style={mutedTextStyle}>
          Toast notifications with card-like styling and theme integration, powered by the ToastProvider.
        </p>
      </section>

      {/* Toast Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-6" style={headingStyle}>Toast Notifications</h2>
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4" style={headingStyle}>Try the Toast System</h3>
              <div className="space-y-4">
                <ToastDemoButtons />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4" style={headingStyle}>Usage Code</h3>
              <CodeBlock language="tsx" copyable syntaxHighlighting>
{`import { useToast } from '@/providers';

function Example() {
  const toast = useToast();

  const handleSuccess = () => {
    toast.success("Success!", "Operation completed");
  };

  const handleError = () => {
    toast.error("Error", "Something went wrong");
  };

  return (
    <div>
      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleError}>Error</button>
    </div>
  );
}`}
              </CodeBlock>
            </div>
          </div>
        </Card>
      </section>

      {/* Static Notification Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-6" style={headingStyle}>Static Notifications</h2>
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4" style={headingStyle}>Different Types</h3>
              <div className="space-y-4">
                <Notification
                  type="success"
                  title="Success Notification"
                  description="This is a success message with a solid card background"
                  dismissible={false}
                />
                <Notification
                  type="destructive"
                  title="Error Notification"
                  description="This is an error message with a red accent border"
                  dismissible={false}
                />
                <Notification
                  type="warning"
                  title="Warning Notification"
                  description="This is a warning message with an orange accent border"
                  dismissible={false}
                />
                <Notification
                  type="primary"
                  title="Info Notification"
                  description="This is an info message with a blue accent border"
                  dismissible={false}
                />
                <Notification
                  type="default"
                  title="Default Notification"
                  description="This is a default notification with standard card styling"
                  dismissible={false}
                />
              </div>
            </div>

            <Divider />

            <div>
              <h3 className="font-semibold mb-4" style={headingStyle}>Different Sizes</h3>
              <div className="space-y-4">
                <Notification
                  size="sm"
                  type="primary"
                  title="Small Notification"
                  description="Compact size for subtle notifications"
                  dismissible={false}
                />
                <Notification
                  size="md"
                  type="primary"
                  title="Medium Notification"
                  description="Default size for most use cases"
                  dismissible={false}
                />
                <Notification
                  size="lg"
                  type="primary"
                  title="Large Notification"
                  description="Larger size for important notifications that need more attention"
                  dismissible={false}
                />
              </div>
            </div>

            <Divider />

            <div>
              <h3 className="font-semibold mb-4" style={headingStyle}>With Actions</h3>
              <Notification
                type="default"
                title="Confirm Action"
                description="Are you sure you want to delete this item? This action cannot be undone."
                actions={[
                  {
                    label: "Cancel",
                    onClick: () => console.log("Cancelled"),
                    variant: "secondary"
                  },
                  {
                    label: "Delete",
                    onClick: () => console.log("Deleted"),
                    variant: "primary"
                  }
                ]}
                dismissible={false}
              />
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

// Helper component for toast demo buttons
function ToastDemoButtons() {
  const toast = useToast();

  return (
    <div className="space-y-3">
      <Button
        variant="primary"
        onClick={() => toast.success("Success!", "Your operation completed successfully")}
        className="w-full"
      >
        Show Success Toast
      </Button>
      <Button
        variant="destructive"
        onClick={() => toast.error("Error!", "Something went wrong, please try again")}
        className="w-full"
      >
        Show Error Toast
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.warning("Warning!", "Please review your input before continuing")}
        className="w-full"
      >
        Show Warning Toast
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.info("Info", "Here's some helpful information for you")}
        className="w-full"
      >
        Show Info Toast
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.addToast({
          type: 'default',
          title: 'With Action',
          description: 'This notification has an action button. That button can be used to trigger any function you want. This is longer than normal just to show how it looks with more text.',
          action: {
            label: 'View Details',
            onClick: () => alert('Action clicked!')
          }
        })}
        className="w-full"
      >
        Show Toast with Action
      </Button>
    </div>
  );
}
