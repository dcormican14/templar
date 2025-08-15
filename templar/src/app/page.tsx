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
  Card,
  Icon,
  ProgressIndicator
} from './components/atoms';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-lg text-gray-900 dark:text-gray-100">
          Loading Templar providers...
        </div>
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

  // Theme-aware styling helpers
  const sectionStyle = {
    backgroundColor: cssVars.card,
    color: cssVars.cardForeground,
    borderWidth: '1px',
    borderStyle: 'solid' as const,
    borderColor: cssVars.border,
    boxShadow: cssVars.shadows.sm
  };

  const headingStyle = {
    color: cssVars.foreground
  };

  const mutedTextStyle = {
    color: cssVars.mutedForeground
  };

  const codeBlockStyle = {
    backgroundColor: cssVars.muted,
    color: cssVars.mutedForeground
  };

  // Progress bar state
  const [progressValue, setProgressValue] = useState(0);
  const [isProgressRunning, setIsProgressRunning] = useState(false);
  const [demoProgress1, setDemoProgress1] = useState(0);
  const [demoProgress2, setDemoProgress2] = useState(0);
  const [demoProgress3, setDemoProgress3] = useState(0);
  const [demoProgress4, setDemoProgress4] = useState(0);

  // Animate demo progress bars on mount
  useEffect(() => {
    const intervals = [
      setInterval(() => setDemoProgress1(prev => (prev + 1) % 101), 150),
      setInterval(() => setDemoProgress2(prev => (prev + 1.2) % 101), 120),
      setInterval(() => setDemoProgress3(prev => (prev + 0.8) % 101), 180),
      setInterval(() => setDemoProgress4(prev => (prev + 1.5) % 101), 100),
    ];

    return () => intervals.forEach(clearInterval);
  }, []);

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

  const startProgressDemo = () => {
    if (isProgressRunning) return;
    
    setIsProgressRunning(true);
    setProgressValue(0);
    info('Progress Started', 'Simulating file upload progress...');
    
    const interval = setInterval(() => {
      setProgressValue(prev => {
        const newValue = prev + Math.random() * 15; // Random increment
        
        if (newValue >= 100) {
          clearInterval(interval);
          setIsProgressRunning(false);
          setProgressValue(100);
          success('Upload Complete!', 'File has been uploaded successfully');
          
          // Reset after 2 seconds
          setTimeout(() => {
            setProgressValue(0);
          }, 2000);
          
          return 100;
        }
        
        return newValue;
      });
    }, 200); // Update every 200ms
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
          <h3 className="text-lg font-semibold mb-4" style={headingStyle}>Large Modal Content</h3>
          <p className="mb-4" style={mutedTextStyle}>This demonstrates a larger modal size with more content.</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div 
              className="p-4 rounded"
              style={{
                backgroundColor: cssVars.muted,
                color: cssVars.mutedForeground
              }}
            >
              <h4 className="font-medium mb-2" style={headingStyle}>Feature 1</h4>
              <p className="text-sm" style={mutedTextStyle}>Description of feature one</p>
            </div>
            <div 
              className="p-4 rounded"
              style={{
                backgroundColor: cssVars.muted,
                color: cssVars.mutedForeground
              }}
            >
              <h4 className="font-medium mb-2" style={headingStyle}>Feature 2</h4>
              <p className="text-sm" style={mutedTextStyle}>Description of feature two</p>
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
    <div 
      className="min-h-screen transition-colors duration-200"
      style={{ 
        backgroundColor: cssVars.background,
        color: cssVars.foreground
      }}
    >
      {/* Floating Theme Switcher */}
      <div 
        className="fixed top-6 right-6 z-50 rounded-lg p-4 space-y-3"
        style={{
          backgroundColor: cssVars.card,
          color: cssVars.cardForeground,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: cssVars.border,
          boxShadow: cssVars.shadows.lg
        }}
      >
        <div 
          className="text-sm font-medium"
          style={{ color: cssVars.foreground }}
        >
          Theme Controls
        </div>
        
        <div className="space-y-2">
          <div 
            className="text-xs"
            style={{ color: cssVars.mutedForeground }}
          >
            Current: <span className="font-medium">{theme}</span>
          </div>
          <div 
            className="text-xs"
            style={{ color: cssVars.mutedForeground }}
          >
            Resolved: <span className="font-medium">{resolvedTheme}</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          {availableThemes.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className="px-3 py-1.5 text-xs rounded transition-colors"
              style={theme === t ? {
                backgroundColor: cssVars.primary,
                color: cssVars.primaryForeground,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: cssVars.primary
              } : {
                backgroundColor: cssVars.muted,
                color: cssVars.mutedForeground,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: cssVars.border
              }}
            >
              {t}
            </button>
          ))}
        </div>
        
        <button
          onClick={toggleTheme}
          className="w-full px-3 py-1.5 text-xs rounded transition-colors"
          style={{
            backgroundColor: cssVars.secondary,
            color: cssVars.secondaryForeground
          }}
        >
          Quick Toggle
        </button>
      </div>

      <div className="container mx-auto p-8 pr-20"> {/* Added right padding to avoid overlap with floating controls */}
        <div className="mb-8">
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: cssVars.foreground }}
          >
            Templar Demo
          </h1>
          <p 
            className="mb-2"
            style={mutedTextStyle}
          >
            Testing all providers, icons, and elements in the RoundTable ecosystem
          </p>
        </div>

        {/* CSS Variables Demo */}
        <section 
          className="mb-8 p-6 rounded-lg"
          style={{
            backgroundColor: cssVars.card,
            color: cssVars.cardForeground,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: cssVars.border,
            boxShadow: cssVars.shadows.sm
          }}
        >
          <h2 
            className="text-xl font-semibold mb-4"
            style={headingStyle}
          >
            CSS Variables Demo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Color Swatches */}
            <div className="space-y-3">
              <h3 className="font-medium" style={headingStyle}>Base Colors</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: themeVariables.background }}
                  />
                  <span className="text-sm" style={mutedTextStyle}>Background: {themeVariables.background}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: themeVariables.foreground }}
                  />
                  <span className="text-sm" style={mutedTextStyle}>Foreground: {themeVariables.foreground}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: themeVariables.primary }}
                  />
                  <span className="text-sm" style={mutedTextStyle}>Primary: {themeVariables.primary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: themeVariables.secondary }}
                  />
                  <span className="text-sm" style={mutedTextStyle}>Secondary: {themeVariables.secondary}</span>
                </div>
              </div>
            </div>

            {/* Status Colors */}
            <div className="space-y-3">
              <h3 className="font-medium" style={headingStyle}>Status Colors</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: themeVariables.success }}
                  />
                  <span className="text-sm" style={mutedTextStyle}>Success: {themeVariables.success}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: themeVariables.warning }}
                  />
                  <span className="text-sm" style={mutedTextStyle}>Warning: {themeVariables.warning}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: themeVariables.error }}
                  />
                  <span className="text-sm" style={mutedTextStyle}>Error: {themeVariables.error}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: themeVariables.info }}
                  />
                  <span className="text-sm" style={mutedTextStyle}>Info: {themeVariables.info}</span>
                </div>
              </div>
            </div>

            {/* Dynamic Component Example */}
            <div className="space-y-3">
              <h3 className="font-medium" style={headingStyle}>Dynamic Components</h3>
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
        </section>

        {/* useCSSVariables Hook Demo */}
        <section 
          className="mb-8 p-6 rounded-lg"
          style={sectionStyle}
        >
          <h2 
            className="text-xl font-semibold mb-4"
            style={headingStyle}
          >
            useCSSVariables Hook Demo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Surface Styles */}
            <div className="space-y-4">
              <h3 className="font-medium" style={headingStyle}>Pre-built Surface Styles</h3>
              
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
              <h3 className="font-medium" style={headingStyle}>Advanced Usage</h3>
              
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
        </section>

        {/* ProgressIndicator Component Demo */}
        <section 
          className="mb-8 p-6 rounded-lg"
          style={sectionStyle}
        >
          <h2 
            className="text-xl font-semibold mb-4"
            style={headingStyle}
          >
            ProgressIndicator Component Demo
          </h2>
          <p 
            className="mb-6"
            style={mutedTextStyle}
          >
            Versatile progress component that can display both spinners and progress bars
          </p>
          
          <div className="space-y-6">
            {/* Progress Bar Demo */}
            <div>
              <h3 className="font-medium mb-3" style={headingStyle}>Interactive Progress Bar</h3>
              <div className="space-y-4">
                <div 
                  className="p-4 rounded-lg"
                  style={{
                    backgroundColor: cssVars.muted,
                    color: cssVars.mutedForeground
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium" style={headingStyle}>
                      File Upload Progress
                    </span>
                    <span className="text-sm" style={mutedTextStyle}>
                      {Math.round(progressValue)}%
                    </span>
                  </div>
                  
                  <ProgressIndicator
                    type="progressBar"
                    value={progressValue}
                    max={100}
                    showPercentage={true}
                    color="primary"
                    width="100%"
                    label={`Upload progress: ${Math.round(progressValue)}%`}
                  />
                  
                  <div className="mt-3 flex gap-2">
                    <Button
                      variant="primary"
                      onClick={startProgressDemo}
                      disabled={isProgressRunning}
                      icon={<Icon name={isProgressRunning ? "RefreshDouble" : "ArrowUp"} spin={isProgressRunning} />}
                      iconPosition="leading"
                    >
                      {isProgressRunning ? 'Uploading...' : 'Start Upload Demo'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => {
                        setProgressValue(0);
                        setIsProgressRunning(false);
                      }}
                      disabled={progressValue === 0}
                      icon={<Icon name="RefreshDouble" />}
                      iconPosition="leading"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Preset Examples */}
            <div>
              <h3 className="font-medium mb-3" style={headingStyle}>Progress Bar Presets</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs mb-1" style={mutedTextStyle}>Small (6px bar, 6px background)</p>
                  <ProgressIndicator type="progressBar" value={demoProgress1} preset="sm" width="100%" color="primary" />
                </div>
                
                <div>
                  <p className="text-xs mb-1" style={mutedTextStyle}>Medium (12px bar, 6px background)</p>
                  <ProgressIndicator type="progressBar" value={demoProgress2} preset="md" width="100%" color="success" />
                </div>
                
                <div>
                  <p className="text-xs mb-1" style={mutedTextStyle}>Large (12px bar, 12px background)</p>
                  <ProgressIndicator type="progressBar" value={demoProgress3} preset="lg" width="100%" color="warning" />
                </div>
                
                <div>
                  <p className="text-xs mb-1" style={mutedTextStyle}>Medium with percentage (track gap effect)</p>
                  <ProgressIndicator type="progressBar" value={demoProgress2} preset="md" width="100%" color="info" showPercentage />
                </div>
                
                <div>
                  <p className="text-xs mb-1" style={mutedTextStyle}>Large with percentage (track gap effect)</p>
                  <ProgressIndicator type="progressBar" value={demoProgress3} preset="lg" width="100%" color="error" showPercentage />
                </div>
              </div>
            </div>

            {/* Spinner Preset Examples */}
            <div>
              <h3 className="font-medium mb-3" style={headingStyle}>Spinner Presets</h3>
              <div className="flex gap-6 items-center">
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs" style={mutedTextStyle}>Small (32px, 2px border + track)</p>
                  <ProgressIndicator type="spinner" preset="sm" color="primary" />
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs" style={mutedTextStyle}>Medium (40px, 3px border + track)</p>
                  <ProgressIndicator type="spinner" preset="md" color="success" />
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs" style={mutedTextStyle}>Large (48px, 4px border + track)</p>
                  <ProgressIndicator type="spinner" preset="lg" color="warning" />
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs" style={mutedTextStyle}>Large with percentage</p>
                  <ProgressIndicator type="spinner" preset="lg" color="info" value={demoProgress2} showPercentage />
                </div>
              </div>
            </div>

            {/* Track Size Examples */}
            <div>
              <h3 className="font-medium mb-3" style={headingStyle}>Customizable Track Sizes</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-3" style={headingStyle}>Spinner Track Sizes</h4>
                  <div className="flex gap-6 items-center">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-xs text-gray-500">None</p>
                      <ProgressIndicator type="spinner" preset="md" color="primary" trackSize="none" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-xs text-gray-500">Small</p>
                      <ProgressIndicator type="spinner" preset="md" color="success" trackSize="sm" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-xs text-gray-500">Medium</p>
                      <ProgressIndicator type="spinner" preset="md" color="warning" trackSize="md" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-xs text-gray-500">Large</p>
                      <ProgressIndicator type="spinner" preset="md" color="error" trackSize="lg" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Progress Bar Track Sizes</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">No track</p>
                      <ProgressIndicator type="progressBar" preset="md" value={60} width="100%" color="primary" trackSize="none" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Small track (fixed 2px)</p>
                      <ProgressIndicator type="progressBar" preset="md" value={60} width="100%" color="success" trackSize="sm" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Medium track (half bar height)</p>
                      <ProgressIndicator type="progressBar" preset="md" value={60} width="100%" color="warning" trackSize="md" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Large track (same as bar height)</p>
                      <ProgressIndicator type="progressBar" preset="md" value={60} width="100%" color="error" trackSize="lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Atomic Components Demo */}
        <section style={sectionStyle} className='p-6 rounded-lg mb-8'>
          <h2 style={headingStyle} className="text-xl font-semibold mb-4">Atomic Components Demo</h2>
          <p style={mutedTextStyle} className="mb-6">
            Demonstrating fully integrated atomic components with RoundTable providers
          </p>
          
          <div className="space-y-6">
            {/* Button Variants Grid */}
            <div>
              <h3 className="font-medium mb-3" style={headingStyle}>Button Component Matrix</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Complete showcase of all button variants across all available sizes
              </p>
              
              {/* Create grid for each variant */}
              {(['primary', 'secondary', 'outline', 'ghost', 'destructive'] as const).map((variant) => (
                <div key={variant} className="mb-4 space-y-3">
                  <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2 capitalize">
                    {variant}
                  </h4>
                  <div className="grid grid-cols-5 gap-2 p-3 bg-gray-50 bg-transparent rounded-md">
                    {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                      <div key={size} className="flex flex-col items-center space-y-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">
                          {size}
                        </span>
                        <Button 
                          variant={variant} 
                          size={size}
                          onClick={() => info(`${variant} ${size}`, `Clicked ${variant} button in ${size} size`)}
                        >
                          {variant}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Primary Buttons with Icons */}
            <div>
              {/* Leading Icons Row */}
              <div className="mb-4">
                <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Leading Icons
                </h4>
                <div className="grid grid-cols-5 gap-2 p-3 bg-transparent rounded-md">
                  {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                    <div key={size} className="flex flex-col items-center space-y-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">
                        {size}
                      </span>
                      <Button 
                        variant="primary" 
                        size={size}
                        icon={<Icon name="Plus" />}
                        iconPosition="leading"
                        onClick={() => info(`Add ${size}`, `Clicked add button in ${size} size`)}
                      >
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trailing Icons Row */}
              <div className="mb-4">
                <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Trailing Icons
                </h4>
                <div className="grid grid-cols-5 gap-2 p-3 bg-gray-50 bg-transparent rounded-md">
                  {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                    <div key={size} className="flex flex-col items-center space-y-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">
                        {size}
                      </span>
                      <Button 
                        variant="primary" 
                        size={size}
                        icon={<Icon name="ArrowRight" />}
                        iconPosition="trailing"
                        onClick={() => info(`Next ${size}`, `Clicked next button in ${size} size`)}
                      >
                        Next
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rounded Buttons Row */}
              <div className="mb-4">
                <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Rounded Buttons
                </h4>
                <div className="grid grid-cols-5 gap-2 p-3 bg-gray-50 bg-transparent rounded-md">
                  {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                    <div key={size} className="flex flex-col items-center space-y-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">
                        {size}
                      </span>
                      <Button 
                        variant="primary" 
                        size={size}
                        rounded
                        icon={<Icon name="Star" />}
                        iconPosition="leading"
                        onClick={() => info(`Rounded ${size}`, `Clicked rounded button in ${size} size`)}
                      >
                        Rounded
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Icon Component Demo */}
        <section style={sectionStyle} className='p-6 rounded-lg mb-8'>
          <div >
            <h2 style={headingStyle}>Icon Component Demo</h2>
            <p style={mutedTextStyle} className="mb-6">
              Iconoir-powered icon system with theme integration and animation support
            </p>
            
            <div className="space-y-6">
              {/* Basic Usage */}
              <div>
                <h3 style={headingStyle} className="text-lg mb-3">Basic Usage</h3>
                <div className="flex flex-wrap gap-4 items-center">
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

              {/* Sizes & Colors */}
              <div>
                <h3 style={headingStyle} className="text-lg mb-3">Sizes & Colors</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Icon name="Star" size="xs" color="warning" />
                    <Icon name="Star" size="sm" color="warning" />
                    <Icon name="Star" size="md" color="warning" />
                    <Icon name="Star" size="lg" color="warning" />
                    <Icon name="Star" size="xl" color="warning" />
                    <span className="text-sm">Size Variations</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Icon name="Check" color="success" />
                    <Icon name="WarningTriangle" color="warning" />
                    <Icon name="Xmark" color="error" />
                    <Icon name="InfoCircle" color="info" />
                    <Icon name="User" color="primary" />
                    <span className="text-sm">Color Variations</span>
                  </div>
                </div>
              </div>

              {/* Animations */}
              <div>
                <h3 style={headingStyle} className="text-lg mb-3">Animations</h3>
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

              {/* In Buttons */}
              <div>
                <h3 style={headingStyle} className="text-lg mb-3">In Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="primary"
                    icon={<Icon name="Plus" />}
                    iconPosition="leading"
                    onClick={() => success('Added!', 'Item added successfully')}
                  >
                    Add Item
                  </Button>
                  <Button
                    variant="destructive"
                    icon={<Icon name="Trash" />}
                    iconPosition="leading"
                    size="sm"
                    onClick={() => error('Deleted!', 'Item deleted')}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline"
                    icon={<Icon name="EditPencil" />}
                    iconPosition="leading"
                    onClick={() => info('Edit Mode', 'Editing enabled')}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Card Component Demo */}
        <section style={sectionStyle} className='p-6 rounded-lg mb-8'>
          <h2 style={headingStyle} className="text-xl font-semibold mb-4">Card Component Demo</h2>
          <p style={mutedTextStyle} className="mb-6">
            Standardized card component following design system principles with consistent variants, sizing, theming, and interactive capabilities. 
            Now fully integrated with CSS variables and 4px-based spacing system.
          </p>
          
          <div className="space-y-6">
            {/* Card Variants */}
            <div>
              <h3 className="font-medium mb-3" style={headingStyle}>Card Variants</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <Card variant="default" padding="md">
                  <h4 className="font-medium mb-2">Default</h4>
                  <p className="text-sm opacity-75">Standard card with border and shadow</p>
                </Card>
                
                <Card variant="primary" padding="md">
                  <h4 className="font-medium mb-2">Primary</h4>
                  <p className="text-sm opacity-75">Primary theme background</p>
                </Card>
                
                <Card variant="secondary" padding="md">
                  <h4 className="font-medium mb-2">Secondary</h4>
                  <p className="text-sm opacity-75">Secondary theme background</p>
                </Card>
                
                <Card variant="outline" padding="md">
                  <h4 className="font-medium mb-2">Outline</h4>
                  <p className="text-sm opacity-75">Outlined with transparent background</p>
                </Card>
                
                <Card variant="ghost" padding="md">
                  <h4 className="font-medium mb-2">Ghost</h4>
                  <p className="text-sm opacity-75">Minimal styling, hover effects</p>
                </Card>
              </div>
            </div>

            {/* Rounded Cards */}
            <div>
              <h3 className="font-medium mb-3" style={headingStyle}>Rounded Cards</h3>
              <p className="text-sm mb-4" style={mutedTextStyle}>
                Cards can use rounded corners (24px) instead of the standard border radius (8px)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card variant="default" padding="md">
                  <div className="text-center">
                    <Icon name="Square" size="lg" className="mb-2" />
                    <h4 className="font-medium mb-2">Standard</h4>
                    <p className="text-sm opacity-75">8px border radius</p>
                  </div>
                </Card>
                
                <Card variant="primary" padding="md" rounded>
                  <div className="text-center">
                    <Icon name="Circle" size="lg" className="mb-2" />
                    <h4 className="font-medium mb-2">Rounded</h4>
                    <p className="text-sm opacity-75">24px border radius</p>
                  </div>
                </Card>
                
                <Card variant="secondary" padding="md" rounded>
                  <div className="text-center">
                    <Icon name="Heart" size="lg" className="mb-2" />
                    <h4 className="font-medium mb-2">Rounded Secondary</h4>
                    <p className="text-sm opacity-75">Smooth corners</p>
                  </div>
                </Card>
                
                <Card variant="outline" padding="md" rounded>
                  <div className="text-center">
                    <Icon name="Star" size="lg" className="mb-2" />
                    <h4 className="font-medium mb-2">Rounded Outline</h4>
                    <p className="text-sm opacity-75">Outlined with rounded corners</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Interactive Cards */}
            <div>
              <h3 className="font-medium mb-3" style={headingStyle}>Interactive Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card 
                  variant="outline" 
                  clickable 
                  onClick={() => info('Card Clicked!', 'Basic click handler triggered')}
                  padding="md"
                >
                  <div className="text-center">
                    <Icon name="MouseButtonLeft" size="lg" className="mb-2" />
                    <h4 className="font-medium mb-2">Clickable Card</h4>
                    <p className="text-sm opacity-75">Click me for a toast message</p>
                  </div>
                </Card>
                
                <Card 
                  variant="primary" 
                  clickable 
                  onAsyncClick={async () => {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    success('Async Complete!', 'Async operation finished successfully');
                  }}
                  padding="md"
                >
                  <div className="text-center">
                    <Icon name="CloudSync" size="lg" className="mb-2" />
                    <h4 className="font-medium mb-2">Async Card</h4>
                    <p className="text-sm opacity-75">Click for async operation</p>
                  </div>
                </Card>
                
                <Card variant="default" disabled padding="md">
                  <div className="text-center">
                    <Icon name="Ban" size="lg" className="mb-2" />
                    <h4 className="font-medium mb-2">Disabled Card</h4>
                    <p className="text-sm opacity-75">Cannot interact with this card</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Padding System */}
            <div>
              <h3 className="font-medium mb-3" style={headingStyle}>Padding System (4px Scale)</h3>
              <p className="text-sm mb-4" style={mutedTextStyle}>
                Cards use a consistent 4px-based padding system for harmonious spacing
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((padding) => (
                  <Card key={padding} variant="outline" padding={padding}>
                    <div className="text-center">
                      <h4 className="font-medium text-sm">{padding.toUpperCase()}</h4>
                      <p className="text-xs opacity-75">
                        {padding === 'none' ? '0px' : 
                         padding === 'xs' ? '8px' :
                         padding === 'sm' ? '12px' :
                         padding === 'md' ? '16px' :
                         padding === 'lg' ? '20px' : '24px'}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Structured Cards */}
            <div>
              <h3 className="font-medium mb-3" style={headingStyle}>Structured Cards with Header/Footer</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card 
                  variant="default"
                  header={
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Analytics Dashboard</h4>
                      <Icon name="BarChart" color="primary" />
                    </div>
                  }
                  footer={
                    <div className="flex gap-2">
                      <Button variant="primary" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Export
                      </Button>
                    </div>
                  }
                  padding="md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">1,234</span>
                      <span className="text-sm text-green-600">+12%</span>
                    </div>
                    <p className="text-sm opacity-75">Total visitors this month</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </Card>

                <Card 
                  variant="secondary"
                  header={
                    <div className="flex items-center gap-2">
                      <Icon name="User" color="secondary" />
                      <h4 className="font-medium">User Profile</h4>
                    </div>
                  }
                  footer={
                    <div className="text-xs opacity-75">
                      Last updated: {new Date().toLocaleDateString()}
                    </div>
                  }
                  padding="md"
                >
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm opacity-75">Software Engineer</p>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="font-medium">Projects:</span> 12
                      </div>
                      <div>
                        <span className="font-medium">Tasks:</span> 8
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Loading State */}
            <div>
              <h3 className="font-medium mb-3" style={headingStyle}>Loading State</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card variant="default" loading padding="md">
                  <h4 className="font-medium mb-2">Loading Content</h4>
                  <p className="text-sm opacity-75">This content is being loaded...</p>
                  <div className="space-y-2 mt-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                  </div>
                </Card>

                <Card 
                  variant="outline" 
                  padding="md"
                  onClick={() => {
                    // Simulate loading state toggle
                    const card = document.querySelector('[data-loading-demo]') as HTMLElement;
                    if (card) {
                      card.style.opacity = '0.6';
                      setTimeout(() => {
                        card.style.opacity = '1';
                        success('Loaded!', 'Content has been refreshed');
                      }, 2000);
                    }
                  }}
                  data-loading-demo
                >
                  <div className="text-center">
                    <Icon name="RefreshDouble" size="lg" className="mb-2" />
                    <h4 className="font-medium mb-2">Refresh Content</h4>
                    <p className="text-sm opacity-75">Click to simulate loading</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        
      </div>
    </div>
  );
}
