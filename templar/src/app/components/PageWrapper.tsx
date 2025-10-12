'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from './molecules/Navigation/Navigation';
import { Icon, Button, Scrollbar } from './atoms';
import { useSafeTheme } from '../hooks/useSafeTheme';
import { useSafeCSSVariables } from '../hooks/useSafeCSSVariables';

interface PageWrapperProps {
  children: React.ReactNode;
  activeTab: 'overview' | 'docs' | 'components' | 'contact' | 'environment';
}

export function PageWrapper({ children, activeTab }: PageWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const [displayTab, setDisplayTab] = useState(activeTab);
  const router = useRouter();
  const { theme, cycleTheme } = useSafeTheme();
  const cssVars = useSafeCSSVariables();

  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update display tab when activeTab changes
  useEffect(() => {
    setDisplayTab(activeTab);
  }, [activeTab]);

  // Handle scroll-based tab switching for overview/docs/contact
  useEffect(() => {
    if (activeTab !== 'overview') return;

    const handleOverviewScroll = (event: Event) => {
      const customEvent = event as CustomEvent;
      const currentSection = customEvent.detail?.currentSection;

      if (currentSection === 'contact') {
        setDisplayTab('contact');
      } else if (currentSection === 'docs') {
        setDisplayTab('docs');
      } else {
        setDisplayTab('overview');
      }
    };

    window.addEventListener('overviewScroll', handleOverviewScroll);
    return () => window.removeEventListener('overviewScroll', handleOverviewScroll);
  }, [activeTab]);

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
    { id: 'contact', label: 'Contact'},
    { id: 'components', label: 'Components'},
    { id: 'environment', label: 'Environment'}
  ];

  const handleTabChange = (tabId: string) => {
    // Navigate based on tab selection
    switch (tabId) {
      case 'overview':
        if (activeTab === 'overview') {
          // Scroll to top if already on overview page
          const scrollContainer = (window as any).__overviewScrollContainer;
          if (scrollContainer) {
            scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } else {
          // Navigate to overview page
          router.push('/overview');
        }
        break;
      case 'docs':
        // Scroll to docs section on overview page
        if (activeTab === 'overview') {
          const docsSection = document.getElementById('docs-section');
          if (docsSection) {
            docsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
          // Navigate to overview and scroll after navigation
          router.push('/overview#docs-section');
        }
        break;
      case 'components':
        router.push('/components');
        break;
      case 'environment':
        router.push('/environment');
        break;
      case 'contact':
        // Scroll to contact section on overview page
        if (activeTab === 'overview') {
          const contactSection = document.getElementById('contact-section');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
          // Navigate to overview and scroll after navigation
          router.push('/overview#contact-section');
        }
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
      case 'valor':
        return 'HistoricShield';
      case 'valor-dark':
        return 'HomeShield';
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
      case 'valor-dark':
        return 'Valor Dark';
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
      {/* Background Image Strip (behind nav bar) - Not shown on overview page */}
      {activeTab !== 'overview' && (
        <div
          className="fixed top-0 left-0 right-0 z-30"
          style={{
            height: '48px',
            backgroundImage: 'url(/assets/knight_background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%'
          }}
        />
      )}

      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <Navigation
          icon={<Icon name="HomeShield" size="lg" />}
          appName="Templar"
          tabs={tabs}
          activeTab={displayTab}
          onTabChange={handleTabChange}
          variant="glassmorphic"
          color="primary"
          size="md"
          trailingContent={
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: cssVars.foregroundAccent,
              fontSize: '14px',
              fontWeight: '500'
            }}>
              v1.0.0
            </div>
          }
        />
      </div>

      {/* Main content */}
      <Scrollbar
        height="calc(100vh - 48px)"
        variant="ghost"
        color="secondary"
        size="md"
        visibility="hover"
        smoothScrolling={true}
        style={{ marginTop: '48px' }}
      >
        {activeTab === 'overview' ? (
          // Full width and height for overview page
          <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
            {children}
          </div>
        ) : activeTab === 'components' || activeTab === 'environment' ? (
          // Full width for components and environment pages (have their own side menu layout)
          <div style={{ width: '100vw', height: '100%', margin: 0, padding: 0 }}>
            {children}
          </div>
        ) : (
          // Container for other pages
          <main className="container mx-auto px-6 py-8">
            {children}
          </main>
        )}
      </Scrollbar>
      
      {/* Floating Theme Switcher */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="solid"
          size="lg"
          shape="pill"
          animationMode="isometric"
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