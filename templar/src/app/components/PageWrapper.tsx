'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from './molecules/Navigation/Navigation';
import { Icon, Button, Scrollbar } from './atoms';
import { useSafeTheme } from '../hooks/useSafeTheme';
import { useSafeCSSVariables } from '../hooks/useSafeCSSVariables';

interface PageWrapperProps {
  children: React.ReactNode;
  activeTab: 'overview' | 'docs' | 'components' | 'contact';
  useScrollbar?: boolean;
}

export function PageWrapper({ children, activeTab, useScrollbar = true }: PageWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { theme, cycleTheme } = useSafeTheme();
  const cssVars = useSafeCSSVariables();

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

  const tabs = [
    { id: 'overview', label: 'Overview'},
    { id: 'docs', label: 'Docs'},
    { id: 'components', label: 'Components'},
    { id: 'contact', label: 'Contact'}
  ];

  const handleTabChange = (tabId: string) => {
    // Navigate based on tab selection
    switch (tabId) {
      case 'overview':
        router.push('/overview');
        break;
      case 'docs':
        router.push('/docs');
        break;
      case 'components':
        router.push('/components');
        break;
      case 'contact':
        router.push('/contact');
        break;
      default:
        router.push('/overview');
    }
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
      
      {/* Main content */}
      {useScrollbar ? (
        <Scrollbar
          height="calc(100vh - 48px)" // Full viewport minus nav height
          color="secondary"
          size="md"
          visibility="hover"
          smoothScrolling={true}
          style={{ marginTop: '48px' }}
        >
          <main className="container mx-auto px-6 py-8">
            {children}
          </main>
        </Scrollbar>
      ) : (
        <div style={{ marginTop: '48px', height: 'calc(100vh - 48px)' }}>
          {children}
        </div>
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