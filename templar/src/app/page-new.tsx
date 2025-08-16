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
  Divider,
  Icon,
  ProgressIndicator
} from './components/atoms';
import { Navigation } from './components/molecules';

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

  // Tab navigation state
  const [activeTab, setActiveTab] = useState('overview');

  // Navigation tabs configuration
  const navigationTabs = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'css-variables', label: 'CSS Variables', icon: '🎨' },
    { id: 'css-hook', label: 'CSS Hook', icon: '🔗' },
    { id: 'progress', label: 'Progress', icon: '📊' },
    { id: 'atomic', label: 'Atomic Components', icon: '⚛️' },
    { id: 'icons', label: 'Icons', icon: '✨' },
    { id: 'cards', label: 'Cards', icon: '🃏' },
    { id: 'dividers', label: 'Dividers', icon: '📏' },
    { id: 'navigation', label: 'Navigation', icon: '🧭' },
  ];

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

  // Function to render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'css-variables':
        return <div style={sectionStyle} className="p-6 rounded-lg"><h2 style={headingStyle}>CSS Variables content coming soon...</h2></div>;
      case 'css-hook':
        return <div style={sectionStyle} className="p-6 rounded-lg"><h2 style={headingStyle}>CSS Hook content coming soon...</h2></div>;
      case 'progress':
        return <div style={sectionStyle} className="p-6 rounded-lg"><h2 style={headingStyle}>Progress content coming soon...</h2></div>;
      case 'atomic':
        return <div style={sectionStyle} className="p-6 rounded-lg"><h2 style={headingStyle}>Atomic Components content coming soon...</h2></div>;
      case 'icons':
        return <div style={sectionStyle} className="p-6 rounded-lg"><h2 style={headingStyle}>Icons content coming soon...</h2></div>;
      case 'cards':
        return <div style={sectionStyle} className="p-6 rounded-lg"><h2 style={headingStyle}>Cards content coming soon...</h2></div>;
      case 'dividers':
        return <div style={sectionStyle} className="p-6 rounded-lg"><h2 style={headingStyle}>Dividers content coming soon...</h2></div>;
      case 'navigation':
        return <div style={sectionStyle} className="p-6 rounded-lg"><h2 style={headingStyle}>Navigation content coming soon...</h2></div>;
      default:
        return <OverviewTab />;
    }
  };

  // Overview Tab Component
  const OverviewTab = () => {
    return (
      <div>
        <h1 
          className="text-3xl font-bold mb-2"
          style={{ color: cssVars.foreground }}
        >
          Templar Demo Overview
        </h1>
        <p 
          className="mb-6"
          style={mutedTextStyle}
        >
          Welcome to the Templar design system demo. Use the navigation tabs above to explore different components and features.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigationTabs.slice(1).map(tab => (
            <Card 
              key={tab.id}
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="text-2xl mb-2">{tab.icon}</div>
              <h3 className="font-semibold mb-2" style={headingStyle}>{tab.label}</h3>
              <p style={mutedTextStyle}>Click to explore this section</p>
            </Card>
          ))}
        </div>
      </div>
    );
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
        className="fixed top-4 right-4 z-50 p-4 rounded-lg min-w-48"
        style={{
          backgroundColor: cssVars.card,
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

      <div className="container mx-auto p-8 pr-20">
        {/* Main Navigation */}
        <Navigation
          appName="Templar Demo"
          icon="🏰"
          tabs={navigationTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="default"
          size="md"
          style={{ marginBottom: '32px' }}
        />

        {/* Tab Content */}
        <div className="min-h-screen">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
