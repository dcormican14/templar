'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/molecules/Navigation/Navigation';
import { Icon, Button, Scrollbar } from './components/atoms';
import { OverviewPage, DocumentationPage, ContactPage, ComponentsPage } from './pages';
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
    { id: 'components', label: 'Components'},
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
        return <OverviewPage />;
      case 'docs':
        return <DocumentationPage onNavigateToComponents={() => setActiveTab('components')} />;
      case 'components':
        return <ComponentsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <OverviewPage />;
    }
  };

  const isComponentsPage = activeTab === 'components';


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
      {isComponentsPage ? (
        <div style={{ marginTop: '48px', height: 'calc(100vh - 48px)' }}>
          {renderTabContent()}
        </div>
      ) : (
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
      )}
      
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
