'use client';

import React, { useState, useEffect } from 'react';
import {
  useTheme,
  useToast,
  useAuth,
  useLoading,
  useModal,
  useSettings,
  useAsyncOperation,
  useCSSVariables
} from './providers';
import { 
  Button, 
  Icon
} from './components/atoms';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-lg">Loading Templar providers...</div>
      </div>
    );
  }

  return <ProviderTestContent />;
}

function ProviderTestContent() {
  const { theme, setTheme, availableThemes, toggleTheme, resolvedTheme, getCSSVariable, themeVariables } = useTheme();
  const { success, error, warning, info, clearToasts, toasts } = useToast();
  const { user, login, logout, isAuthenticated, isLoading: authLoading } = useAuth();
  const { startLoading, stopLoading, isLoading, isAnyLoading } = useLoading();
  const { openModal, closeAllModals, modals } = useModal();
  const { settings, updateSettings, resetSettings } = useSettings();
  const { execute } = useAsyncOperation();
  const cssVars = useCSSVariables();

  // Test functions
  const handleLogin = async () => {
    try {
      await login('test@example.com', 'password123');
      success('Login Successful!', 'Welcome back to Templar');
    } catch (err) {
      error('Login Failed', 'Invalid credentials');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      info('Logged Out', 'You have been successfully logged out');
    } catch (err) {
      error('Logout Failed', 'Something went wrong');
    }
  };

  const simulateLoading = () => {
    startLoading('demo');
    setTimeout(() => {
      stopLoading('demo');
      success('Loading Complete!', 'Demo loading operation finished');
    }, 3000);
  };

  const simulateAsyncOperation = () => {
    execute('async-demo', async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return 'Async operation completed!';
    }).then(result => {
      success('Async Success', result as string);
    });
  };

  const openTestModal = () => {
    openModal({
      title: 'Test Modal',
      content: (
        <div className="p-4">
          <p className="mb-4">This is a test modal to demonstrate the Modal Provider!</p>
          <div className="flex gap-2">
            <button
              onClick={() => success('Modal Action', 'Button clicked from within modal')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Test Toast from Modal
            </button>
          </div>
        </div>
      ),
      size: 'md',
      closable: true,
    });
  };

  const openLargeModal = () => {
    openModal({
      title: 'Large Test Modal',
      content: (
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Large Modal Content</h3>
          <p className="mb-4">This demonstrates a larger modal size with more content.</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
              <h4 className="font-medium mb-2">Feature 1</h4>
              <p className="text-sm">Description of feature one</p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
              <h4 className="font-medium mb-2">Feature 2</h4>
              <p className="text-sm">Description of feature two</p>
            </div>
          </div>
          <button
            onClick={() => warning('Warning from Modal', 'This is a warning toast triggered from a modal')}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Trigger Warning Toast
          </button>
        </div>
      ),
      size: 'lg',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            Templar RoundTable Provider Demo
          </h1>
          <Button />
          <p className="text-gray-600 dark:text-gray-400">
            Testing all providers in the RoundTable ecosystem
          </p>
        </div>

        {/* Theme Provider Tests */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Theme Provider</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Current theme: <span className="font-medium">{theme}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Resolved theme: <span className="font-medium">{resolvedTheme}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {availableThemes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-3 py-1 text-sm rounded border transition-colors ${
                      theme === t
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
              >
                Toggle Theme
              </button>
            </div>
          </div>
        </section>

        {/* CSS Variables Demo */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">CSS Variables Demo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Color Swatches */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Base Colors</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: themeVariables.background }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Background: {themeVariables.background}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: themeVariables.foreground }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Foreground: {themeVariables.foreground}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: themeVariables.primary }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Primary: {themeVariables.primary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: themeVariables.secondary }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Secondary: {themeVariables.secondary}</span>
                </div>
              </div>
            </div>

            {/* Status Colors */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Status Colors</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: themeVariables.success }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Success: {themeVariables.success}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: themeVariables.warning }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Warning: {themeVariables.warning}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: themeVariables.error }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Error: {themeVariables.error}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: themeVariables.info }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Info: {themeVariables.info}</span>
                </div>
              </div>
            </div>

            {/* Dynamic Component Example */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Dynamic Components</h3>
              <div className="space-y-2">
                {/* Card using CSS variables directly */}
                <div 
                  className="p-3 rounded"
                  style={{ 
                    backgroundColor: themeVariables.card,
                    color: themeVariables.cardForeground,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: themeVariables.border,
                    boxShadow: themeVariables.shadow
                  }}
                >
                  <p className="text-sm font-medium">Dynamic Card</p>
                  <p className="text-xs opacity-75">Uses theme variables</p>
                </div>

                {/* Button using CSS variables */}
                <button
                  className="px-3 py-2 rounded text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: themeVariables.primary,
                    color: themeVariables.primaryForeground,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = themeVariables.primaryHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = themeVariables.primary;
                  }}
                >
                  Dynamic Button
                </button>

                {/* Input using CSS variables */}
                <input
                  type="text"
                  placeholder="Dynamic input..."
                  className="w-full px-3 py-2 rounded text-sm"
                  style={{
                    backgroundColor: themeVariables.input,
                    color: themeVariables.foreground,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: themeVariables.inputBorder
                  }}
                />
              </div>
            </div>
          </div>

          {/* CSS Variable Debugging */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">CSS Variable Access</h3>
            <div className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <p><code>getCSSVariable('primary')</code>: {getCSSVariable('primary')}</p>
              <p><code>themeVariables.primary</code>: {themeVariables.primary}</p>
              <p>Use these values to create dynamic components that respond to theme changes!</p>
            </div>
          </div>
        </section>

        {/* useCSSVariables Hook Demo */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">useCSSVariables Hook Demo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Surface Styles */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Pre-built Surface Styles</h3>
              
              <div className="p-3 rounded" style={cssVars.surface.primary}>
                Primary Surface
              </div>
              
              <div className="p-3 rounded" style={cssVars.surface.secondary}>
                Secondary Surface
              </div>
              
              <div className="p-3 rounded border" style={cssVars.surface.card}>
                Card Surface
              </div>
              
              <div className="p-3 rounded" style={cssVars.surface.success}>
                Success Surface
              </div>
              
              <div className="p-3 rounded" style={cssVars.surface.warning}>
                Warning Surface
              </div>
              
              <div className="p-3 rounded" style={cssVars.surface.error}>
                Error Surface
              </div>
            </div>

            {/* Advanced Usage */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Advanced Usage</h3>
              
              {/* Custom styles using createStyles */}
              <div 
                className="p-3 rounded"
                style={cssVars.createStyles({
                  backgroundColor: 'accent',
                  color: 'accent-foreground',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'border',
                })}
              >
                Using createStyles()
              </div>
              
              {/* Color with opacity */}
              <div 
                className="p-3 rounded"
                style={{
                  backgroundColor: cssVars.getColorWithOpacity('primary', 0.1),
                  color: cssVars.primary,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: cssVars.getColorWithOpacity('primary', 0.3),
                }}
              >
                Primary with Opacity
              </div>
              
              {/* Custom variable access */}
              <div 
                className="p-3 rounded"
                style={{
                  backgroundColor: cssVars.getVariable('muted'),
                  color: cssVars.getVariable('muted-foreground'),
                  boxShadow: cssVars.shadows.md,
                }}
              >
                Custom Variable Access
              </div>
              
              {/* Gradient using theme colors */}
              <div 
                className="p-3 rounded"
                style={{
                  background: `linear-gradient(135deg, ${cssVars.primary}, ${cssVars.secondary})`,
                  color: cssVars.primaryForeground,
                }}
              >
                Gradient with Theme Colors
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">useCSSVariables Usage</h3>
            <pre className="text-sm overflow-x-auto">
{`const cssVars = useCSSVariables();

// Use pre-built surface styles
<div style={cssVars.surface.primary}>Primary Button</div>

// Create custom styles
<div style={cssVars.createStyles({
  backgroundColor: 'card',
  color: 'card-foreground',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'border'
})}>Custom Card</div>

// Access individual variables
<div style={{ color: cssVars.primary }}>Primary Text</div>

// Use with opacity
<div style={{ 
  backgroundColor: cssVars.getColorWithOpacity('primary', 0.1) 
}}>Subtle Background</div>`}
            </pre>
          </div>
        </section>

        {/* Atomic Components Demo */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Atomic Components Demo</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Demonstrating fully integrated atomic components with RoundTable providers
          </p>
          
          <div className="space-y-6">
            {/* Button Variants */}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Button Component</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Variants</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="primary" size="md">
                      Primary
                    </Button>
                    <Button variant="secondary" size="md">
                      Secondary
                    </Button>
                    <Button variant="outline" size="md">
                      Outline
                    </Button>
                    <Button variant="ghost" size="md">
                      Ghost
                    </Button>
                    <Button variant="destructive" size="md">
                      Destructive
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Sizes</h4>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="primary" size="xs">
                      XS
                    </Button>
                    <Button variant="primary" size="sm">
                      SM
                    </Button>
                    <Button variant="primary" size="md">
                      MD
                    </Button>
                    <Button variant="primary" size="lg">
                      LG
                    </Button>
                    <Button variant="primary" size="xl">
                      XL
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">States & Features</h4>
                  <div className="space-y-2">
                    <Button
                      variant="primary"
                      loadingKey="demo-async"
                      onAsyncClick={async () => {
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        // Will automatically show success toast
                      }}
                    >
                      Async Action
                    </Button>
                    <Button variant="secondary" disabled>
                      Disabled
                    </Button>
                    <Button variant="outline" fullWidth>
                      Full Width
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Integration Demo */}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Provider Integration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Loading Integration</h4>
                  <div className="space-y-2">
                    <Button
                      variant="primary"
                      loadingKey="custom-loading"
                      onAsyncClick={async () => {
                        // Simulate API call
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        throw new Error('Demo error handling');
                      }}
                    >
                      Test Error Handling
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        startLoading('manual-loading');
                        setTimeout(() => stopLoading('manual-loading'), 2000);
                      }}
                    >
                      Manual Loading
                    </Button>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Buttons automatically integrate with LoadingProvider and ToastProvider
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme Adaptation</h4>
                  <div className="space-y-2">
                    <Button
                      variant="primary"
                      onClick={() => {
                        info('Theme Info', `Current theme: ${theme}, Resolved: ${resolvedTheme}`);
                      }}
                    >
                      Show Theme Info
                    </Button>
                    <Button
                      variant="outline"
                      onClick={toggleTheme}
                    >
                      Toggle Theme
                    </Button>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Colors automatically adapt using useCSSVariables()
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Implementation Code */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Usage Example</h3>
              <pre className="text-sm overflow-x-auto">
{`import { Button } from './components/atoms';

// Basic usage
<Button variant="primary" size="md">
  Click me
</Button>

// With async action and loading states
<Button
  variant="primary"
  loadingKey="my-action"
  onAsyncClick={async () => {
    // Automatic loading states and toast notifications
    await performAsyncAction();
  }}
>
  Async Action
</Button>

// Fully integrated with providers
<Button
  variant="outline"
  onClick={() => {
    // Access to all provider hooks
    success('Success!', 'Action completed');
  }}
>
  Show Toast
</Button>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Icon Component Demo */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Icon Component Demo</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Iconoir-powered icon system with theme integration and animation support
          </p>
          
          <div className="space-y-6">
            {/* Basic Icon Usage */}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Basic Usage</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Common Icons</h4>
                  <div className="flex flex-wrap gap-3 items-center">
                    <div className="flex items-center gap-2">
                      <Icon name="Home" />
                      <span className="text-sm">Home</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="User" />
                      <span className="text-sm">User</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Settings" />
                      <span className="text-sm">Settings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Bell" />
                      <span className="text-sm">Bell</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Search" />
                      <span className="text-sm">Search</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Action Icons</h4>
                  <div className="flex flex-wrap gap-3 items-center">
                    <div className="flex items-center gap-2">
                      <Icon name="Check" color="success" />
                      <span className="text-sm">Check</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Xmark" color="error" />
                      <span className="text-sm">Close</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Plus" color="primary" />
                      <span className="text-sm">Add</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Minus" />
                      <span className="text-sm">Remove</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="EditPencil" color="info" />
                      <span className="text-sm">Edit</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme Icons</h4>
                  <div className="flex flex-wrap gap-3 items-center">
                    <div className="flex items-center gap-2">
                      <Icon name="SunLight" color="warning" />
                      <span className="text-sm">Light</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="HalfMoon" color="info" />
                      <span className="text-sm">Dark</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Heart" color="error" />
                      <span className="text-sm">Love</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Star" color="warning" />
                      <span className="text-sm">Star</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Size Variations */}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Size Variations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Predefined Sizes</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Icon name="Star" size="xs" color="warning" />
                      <span className="text-sm">XS (12px)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Star" size="sm" color="warning" />
                      <span className="text-sm">SM (16px)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Star" size="md" color="warning" />
                      <span className="text-sm">MD (20px)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Star" size="lg" color="warning" />
                      <span className="text-sm">LG (24px)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Star" size="xl" color="warning" />
                      <span className="text-sm">XL (32px)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Custom Sizes</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Icon name="Heart" size={14} color="error" />
                      <span className="text-sm">14px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Heart" size={28} color="error" />
                      <span className="text-sm">28px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Heart" size={40} color="error" />
                      <span className="text-sm">40px</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Color Variations */}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Color System Integration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme Colors</h4>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <Icon name="User" color="inherit" />
                      <span className="text-sm">Inherit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="User" color="primary" />
                      <span className="text-sm">Primary</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="User" color="secondary" />
                      <span className="text-sm">Secondary</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="User" color="muted" />
                      <span className="text-sm">Muted</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Status Colors</h4>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <Icon name="Check" color="success" />
                      <span className="text-sm">Success</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="WarningTriangle" color="warning" />
                      <span className="text-sm">Warning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Xmark" color="error" />
                      <span className="text-sm">Error</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="InfoCircle" color="info" />
                      <span className="text-sm">Info</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animations */}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Animation Support</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Loading Animations</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Icon name="RefreshDouble" />
                      <span className="text-sm">Auto Spin</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Settings" spin color="primary" />
                      <span className="text-sm">Manual Spin</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Heart" pulse color="error" />
                      <span className="text-sm">Pulse</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Interactive Example</h4>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const isAnimated = !settings.appearance.animations;
                      updateSettings({
                        appearance: {
                          ...settings.appearance,
                          animations: isAnimated
                        }
                      });
                      info('Animations', `Animations ${isAnimated ? 'enabled' : 'disabled'}`);
                    }}
                    icon={<Icon name={settings.appearance.animations ? "Check" : "Xmark"} color={settings.appearance.animations ? "success" : "error"} />}
                    iconPosition="left"
                  >
                    {settings.appearance.animations ? 'Disable' : 'Enable'} Animations
                  </Button>
                </div>
              </div>
            </div>

            {/* Buttons with Icons */}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Integration with Button Component</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Icon Positions</h4>
                  <div className="space-y-2">
                    <Button
                      variant="primary"
                      icon={<Icon name="ArrowLeft" />}
                      iconPosition="left"
                    >
                      Back
                    </Button>
                    <Button
                      variant="secondary"
                      icon={<Icon name="ArrowRight" />}
                      iconPosition="right"
                    >
                      Next
                    </Button>
                    <Button
                      variant="outline"
                      icon={<Icon name="Plus" />}
                      iconPosition="left"
                      onClick={() => success('Added!', 'Item added successfully')}
                    >
                      Add Item
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Action Buttons</h4>
                  <div className="space-y-2">
                    <Button
                      variant="destructive"
                      icon={<Icon name="Trash" />}
                      iconPosition="left"
                      size="sm"
                      onClick={() => error('Deleted!', 'Item deleted')}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="ghost"
                      icon={<Icon name="EditPencil" />}
                      iconPosition="left"
                      size="sm"
                      onClick={() => info('Edit Mode', 'Editing enabled')}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      icon={<Icon name="Search" />}
                      iconPosition="left"
                      size="sm"
                      onClick={() => info('Searching...', 'Search initiated')}
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Implementation Code */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Usage Examples</h3>
              <pre className="text-sm overflow-x-auto">
{`import { Icon } from './components/atoms';

// Basic usage
<Icon name="User" size="md" color="primary" />

// With animations
<Icon name="Settings" spin color="primary" />
<Icon name="Heart" pulse color="error" />

// Custom icon component
import CustomIcon from 'iconoir/icons/custom-icon.svg';
<Icon name={CustomIcon} size={24} color="#ff0000" />

// In buttons
<Button
  icon={<Icon name="Plus" />}
  iconPosition="left"
  variant="primary"
>
  Add Item
</Button>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Toast Provider Tests */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Toast Provider</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <button
              onClick={() => success('Success!', 'This is a success message')}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Success Toast
            </button>
            <button
              onClick={() => error('Error!', 'This is an error message')}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Error Toast
            </button>
            <button
              onClick={() => warning('Warning!', 'This is a warning message')}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
            >
              Warning Toast
            </button>
            <button
              onClick={() => info('Info!', 'This is an info message')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Info Toast
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={clearToasts}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Clear All Toasts
            </button>
            <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              Active toasts: {toasts.length}
            </span>
          </div>
        </section>

        {/* Auth Provider Tests */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Auth Provider</h2>
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Status: <span className="font-medium">
                {authLoading ? 'Loading...' : isAuthenticated ? 'Authenticated' : 'Not authenticated'}
              </span>
            </p>
            {user && (
              <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded">
                <p className="text-sm text-gray-600 dark:text-gray-400"><strong>User:</strong> {user.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Email:</strong> {user.email}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Role:</strong> {user.role || 'User'}</p>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {!isAuthenticated ? (
              <button
                onClick={handleLogin}
                disabled={authLoading}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 transition-colors"
              >
                {authLoading ? 'Logging in...' : 'Login (Demo)'}
              </button>
            ) : (
              <button
                onClick={handleLogout}
                disabled={authLoading}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 transition-colors"
              >
                {authLoading ? 'Logging out...' : 'Logout'}
              </button>
            )}
          </div>
        </section>

        {/* Loading Provider Tests */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Loading Provider</h2>
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Demo loading: <span className="font-medium">{isLoading('demo') ? 'Active' : 'Inactive'}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Any loading: <span className="font-medium">{isAnyLoading ? 'Yes' : 'No'}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={simulateLoading}
              disabled={isLoading('demo')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              {isLoading('demo') ? 'Loading... (3s)' : 'Start Demo Loading'}
            </button>
            <button
              onClick={simulateAsyncOperation}
              disabled={isLoading('async-demo')}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50 transition-colors"
            >
              {isLoading('async-demo') ? 'Async Loading...' : 'Test Async Operation'}
            </button>
          </div>
        </section>

        {/* Modal Provider Tests */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Modal Provider</h2>
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Active modals: <span className="font-medium">{modals.length}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={openTestModal}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              Open Test Modal
            </button>
            <button
              onClick={openLargeModal}
              className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
            >
              Open Large Modal
            </button>
            <button
              onClick={closeAllModals}
              disabled={modals.length === 0}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50 transition-colors"
            >
              Close All Modals
            </button>
          </div>
        </section>

        {/* Settings Provider Tests */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Settings Provider</h2>
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Current settings:
            </p>
            <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-3 rounded overflow-x-auto">
              {JSON.stringify(settings, null, 2)}
            </pre>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => updateSettings({ 
                appearance: { 
                  ...settings.appearance, 
                  fontSize: settings.appearance.fontSize === 'md' ? 'lg' : 'md' 
                } 
              })}
              className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
            >
              Toggle Font Size
            </button>
            <button
              onClick={() => updateSettings({ language: settings.language === 'en' ? 'es' : 'en' })}
              className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors"
            >
              Toggle Language
            </button>
            <button
              onClick={resetSettings}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Reset Settings
            </button>
          </div>
        </section>

        {/* Status Summary */}
        <section className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Provider Status Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <p><strong>Theme:</strong> {resolvedTheme}</p>
              <p><strong>Auth:</strong> {isAuthenticated ? '✅ Logged in' : '❌ Not logged in'}</p>
            </div>
            <div className="space-y-2">
              <p><strong>Active Toasts:</strong> {toasts.length}</p>
              <p><strong>Active Modals:</strong> {modals.length}</p>
            </div>
            <div className="space-y-2">
              <p><strong>Loading States:</strong> {isAnyLoading ? '🔄 Active' : '✅ Idle'}</p>
              <p><strong>Language:</strong> {settings.language || 'en'}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
