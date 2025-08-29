'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/molecules/Navigation/Navigation';
import { Icon, Button, Scrollbar } from './components/atoms';
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
  OverviewPage, 
  CSSVariablesPage, 
  ProgressPage, 
  AtomicComponentsPage, 
  IconsPage,
  NavigationPage,
  ButtonsPage,
  InteractivePage,
} from './pages';

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
    { id: 'css-variables', label: 'CSS Variables'},
    { id: 'progress', label: 'Progress'},
    { id: 'atomic', label: 'Components'},
    { id: 'buttons', label: 'Buttons'},
    { id: 'interactive', label: 'Interactive'},
    { id: 'icons', label: 'Icons'},
    { id: 'navigation', label: 'Navigation'}
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
        return <OverviewPage onNavigate={handleTabChange} availableTabs={tabs} />;
      case 'css-variables':
        return <CSSVariablesPage />;
      case 'progress':
        return <ProgressPage />;
      case 'atomic':
        return <AtomicComponentsPage />;
      case 'buttons':
        return <ButtonsPage />;
      case 'interactive':
        return <InteractivePage />;
      case 'icons':
        return <IconsPage />;
      case 'navigation':
        return <NavigationPage />;
      default:
        return <OverviewPage onNavigate={handleTabChange} availableTabs={tabs} />;
    }
  };

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
        variant="primary"
        size="md"
        visibility="hover"
        trackSize="sm"
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
          variant="primary"
          size="lg"
          rounded
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
