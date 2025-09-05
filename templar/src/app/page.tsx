'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/molecules/Navigation/Navigation';
import { Icon, Button, Scrollbar } from './components/atoms';
import {
  useTheme,
  useCSSVariables
} from './providers';

export default function Page() {
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to avoid SSR issues
  if (!mounted) {
    return (
      <div className="!h-screen transition-all duration-300" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <div className="h-16 animate-pulse" style={{ backgroundColor: 'var(--muted)' }}></div>
        <main className="container mx-auto px-6 py-8">
          <div className="h-32 animate-pulse rounded" style={{ backgroundColor: 'var(--muted)' }}></div>
        </main>
      </div>
    );
  }

  return <PageContent />;
}

function PageContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const { theme, setTheme, availableThemes, cycleTheme } = useTheme();
  const cssVars = useCSSVariables();

  const tabs = [
    { id: 'overview', label: 'Overview'},
    { id: 'docs', label: 'Docs'},
    { id: 'contact', label: 'Contact'}
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Theme icon mapping
  const getThemeIcon = (themeName: string) => {
    switch (themeName) {
      case 'light':
        return 'SunLight';
      case 'dark':
        return 'HalfMoon';
      case 'high-contrast':
        return 'Lens';
      case 'sepia-light':
        return 'Lamp';
      case 'sepia-dark':
        return 'CoffeeCup';
      case 'solarized-dark':
        return 'SeaAndSun';
      default:
        return 'Palette';
    }
  };

  const getThemeLabel = (themeName: string) => {
    switch (themeName) {
      case 'high-contrast':
        return 'High Contrast';
      case 'sepia-dark':
        return 'Sepia Dark';
      case 'sepia-light':
        return 'Sepia Light';
      case 'solarized-dark':
        return 'Solarized Dark';
      default:
        return themeName.charAt(0).toUpperCase() + themeName.slice(1);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPlaceholder />;
      case 'docs':
        return <DocsPlaceholder />;
      case 'contact':
        return <ContactPlaceholder />;
      default:
        return <OverviewPlaceholder />;
    }
  };

  // Placeholder components
  const OverviewPlaceholder = () => (
    <div className="max-w-4xl mx-auto">
      <div 
        className="text-center py-20"
        style={{ color: cssVars.foreground }}
      >
        <Icon name="HomeShield" size="xl" className="mx-auto mb-6" />
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: cssVars.primary }}
        >
          Welcome to Templar
        </h1>
        <p 
          className="text-lg mb-8"
          style={{ color: cssVars.foregroundAccent }}
        >
          A comprehensive React component library and design system
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: cssVars.card,
              borderColor: cssVars.border 
            }}
          >
            <Icon name="Atom" size="lg" className="mx-auto mb-4" style={{ color: cssVars.primary }} />
            <h3 className="text-xl font-semibold mb-2">Atomic Design</h3>
            <p style={{ color: cssVars.foregroundAccent }}>
              Built on atomic design principles with comprehensive component architecture
            </p>
          </div>
          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: cssVars.card,
              borderColor: cssVars.border 
            }}
          >
            <Icon name="Palette" size="lg" className="mx-auto mb-4" style={{ color: cssVars.secondary }} />
            <h3 className="text-xl font-semibold mb-2">Theme System</h3>
            <p style={{ color: cssVars.foregroundAccent }}>
              Advanced theming with 80+ CSS variables and multiple theme options
            </p>
          </div>
          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: cssVars.card,
              borderColor: cssVars.border 
            }}
          >
            <Icon name="Code" size="lg" className="mx-auto mb-4" style={{ color: cssVars.success }} />
            <h3 className="text-xl font-semibold mb-2">TypeScript</h3>
            <p style={{ color: cssVars.foregroundAccent }}>
              Full TypeScript support with comprehensive type safety
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const DocsPlaceholder = () => (
    <div className="max-w-4xl mx-auto">
      <div 
        className="py-20"
        style={{ color: cssVars.foreground }}
      >
        <div className="text-center mb-12">
          <Icon name="Book" size="xl" className="mx-auto mb-6" style={{ color: cssVars.info }} />
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ color: cssVars.primary }}
          >
            Documentation
          </h1>
          <p 
            className="text-lg"
            style={{ color: cssVars.foregroundAccent }}
          >
            Comprehensive guides, API references, and examples
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div 
            className="p-8 rounded-lg border"
            style={{ 
              backgroundColor: cssVars.card,
              borderColor: cssVars.border 
            }}
          >
            <Icon name="PlayOutline" size="lg" className="mb-4" style={{ color: cssVars.primary }} />
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <p className="mb-4" style={{ color: cssVars.foregroundAccent }}>
              Learn how to install and set up Templar in your project. Quick start guides and basic usage examples.
            </p>
            <ul className="space-y-2" style={{ color: cssVars.foregroundAccent }}>
              <li>• Installation instructions</li>
              <li>• Basic setup and configuration</li>
              <li>• Your first component</li>
            </ul>
          </div>
          
          <div 
            className="p-8 rounded-lg border"
            style={{ 
              backgroundColor: cssVars.card,
              borderColor: cssVars.border 
            }}
          >
            <Icon name="Component" size="lg" className="mb-4" style={{ color: cssVars.secondary }} />
            <h2 className="text-2xl font-semibold mb-4">Component Library</h2>
            <p className="mb-4" style={{ color: cssVars.foregroundAccent }}>
              Explore all available components with interactive examples, props documentation, and usage patterns.
            </p>
            <ul className="space-y-2" style={{ color: cssVars.foregroundAccent }}>
              <li>• 18+ Atomic components</li>
              <li>• Molecule combinations</li>
              <li>• Interactive examples</li>
            </ul>
          </div>
          
          <div 
            className="p-8 rounded-lg border"
            style={{ 
              backgroundColor: cssVars.card,
              borderColor: cssVars.border 
            }}
          >
            <Icon name="ColorFilter" size="lg" className="mb-4" style={{ color: cssVars.warning }} />
            <h2 className="text-2xl font-semibold mb-4">Theme Guide</h2>
            <p className="mb-4" style={{ color: cssVars.foregroundAccent }}>
              Master the theming system with detailed guides on customization, CSS variables, and design tokens.
            </p>
            <ul className="space-y-2" style={{ color: cssVars.foregroundAccent }}>
              <li>• Theme customization</li>
              <li>• CSS variable system</li>
              <li>• Design tokens</li>
            </ul>
          </div>
          
          <div 
            className="p-8 rounded-lg border"
            style={{ 
              backgroundColor: cssVars.card,
              borderColor: cssVars.border 
            }}
          >
            <Icon name="ApiOutline" size="lg" className="mb-4" style={{ color: cssVars.success }} />
            <h2 className="text-2xl font-semibold mb-4">API Reference</h2>
            <p className="mb-4" style={{ color: cssVars.foregroundAccent }}>
              Complete API documentation for all components, hooks, and utilities with TypeScript definitions.
            </p>
            <ul className="space-y-2" style={{ color: cssVars.foregroundAccent }}>
              <li>• Component APIs</li>
              <li>• Hook references</li>
              <li>• Utility functions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPlaceholder = () => (
    <div className="max-w-2xl mx-auto">
      <div 
        className="text-center py-20"
        style={{ color: cssVars.foreground }}
      >
        <Icon name="MessageText" size="xl" className="mx-auto mb-6" style={{ color: cssVars.primary }} />
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: cssVars.primary }}
        >
          Get in Touch
        </h1>
        <p 
          className="text-lg mb-12"
          style={{ color: cssVars.foregroundAccent }}
        >
          Have questions, feedback, or want to contribute? We'd love to hear from you!
        </p>
        
        <div className="grid gap-6">
          <div 
            className="p-6 rounded-lg border text-left"
            style={{ 
              backgroundColor: cssVars.card,
              borderColor: cssVars.border 
            }}
          >
            <Icon name="Github" size="lg" className="mb-4" style={{ color: cssVars.foreground }} />
            <h3 className="text-xl font-semibold mb-2">GitHub Repository</h3>
            <p className="mb-4" style={{ color: cssVars.foregroundAccent }}>
              Find the source code, report issues, and contribute to the project
            </p>
            <Button 
              variant="outline" 
              size="sm"
              icon={<Icon name="OpenInWindow" size="sm" />}
            >
              View on GitHub
            </Button>
          </div>
          
          <div 
            className="p-6 rounded-lg border text-left"
            style={{ 
              backgroundColor: cssVars.card,
              borderColor: cssVars.border 
            }}
          >
            <Icon name="ChatBubbleEmpty" size="lg" className="mb-4" style={{ color: cssVars.info }} />
            <h3 className="text-xl font-semibold mb-2">Community Discussion</h3>
            <p className="mb-4" style={{ color: cssVars.foregroundAccent }}>
              Join the community discussions, ask questions, and share your creations
            </p>
            <Button 
              variant="outline" 
              size="sm"
              icon={<Icon name="User" size="sm" />}
            >
              Join Community
            </Button>
          </div>
          
          <div 
            className="p-6 rounded-lg border text-left"
            style={{ 
              backgroundColor: cssVars.card,
              borderColor: cssVars.border 
            }}
          >
            <Icon name="Mail" size="lg" className="mb-4" style={{ color: cssVars.success }} />
            <h3 className="text-xl font-semibold mb-2">Direct Contact</h3>
            <p className="mb-4" style={{ color: cssVars.foregroundAccent }}>
              For direct inquiries, collaboration opportunities, or enterprise support
            </p>
            <Button 
              variant="outline" 
              size="sm"
              icon={<Icon name="Send" size="sm" />}
            >
              Send Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="h-screen transition-all duration-300 overflow-hidden"
      style={{
        backgroundColor: cssVars.background,
        color: cssVars.foreground
      }}
    >
      {/* Floating Navigation */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-opacity-95 backdrop-blur-sm" style={{ backgroundColor: cssVars.background }}>
        <Navigation
          icon={<Icon name="HomeShield" size="lg" />}
          appName="Templar Demo"
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          trailingContent={
            <div className="flex items-center gap-2">
              <span className="text-md" style={{color: 'var(--foreground)'}}>v1.0.0</span>
            </div>
          }
        />
        {/* Subtle shadow for floating effect */}
        <div 
          className="h-px" 
          style={{ 
            background: `linear-gradient(90deg, transparent, ${cssVars.border}, transparent)`,
            opacity: 0.5
          }}
        />
      </div>
      
      {/* Main content with custom scrollbar */}
      <Scrollbar
        height="calc(100vh - 48px)" // Full viewport minus nav height
        color="secondary"
        size="md"
        visibility="hover"
        smoothScrolling={true}
        style={{ marginTop: '48px' }}
      >
        <main className="container mx-auto px-6 py-8">
          {renderTabContent()}
        </main>
      </Scrollbar>
      
      {/* Floating Theme Switcher */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="solid"
          size="lg"
          shape="pill"
          icon={<Icon name={getThemeIcon(theme)} size="md" />}
          onClick={cycleTheme}
          className="shadow-lg hover:shadow-xl transition-shadow duration-200"
          title={`Current theme: ${getThemeLabel(theme)}. Click to cycle themes.`}
        >
          <span className="hidden sm:inline ml-2">{getThemeLabel(theme)}</span>
        </Button>
      </div>
    </div>
  );
}
