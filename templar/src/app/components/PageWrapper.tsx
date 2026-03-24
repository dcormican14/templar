'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from './molecules/Navigation/Navigation';
import { Icon, Button, Scrollbar } from './atoms';
import { useSafeTheme } from '../hooks/useSafeTheme';
import { useSafeCSSVariables } from '../hooks/useSafeCSSVariables';
import { useSafeLoading } from '../hooks/useSafeLoading';

interface PageWrapperProps {
  children: React.ReactNode;
  activeTab: 'overview' | 'docs' | 'components' | 'contact' | 'environment';
}

export function PageWrapper({ children, activeTab }: PageWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [displayTab, setDisplayTab] = useState(activeTab);
  const router = useRouter();
  const { theme, setTheme } = useSafeTheme();
  const cssVars = useSafeCSSVariables();
  const { stopLoading } = useSafeLoading();

  // Custom theme cycling for demo website - only cycles through selected themes
  const allowedThemes = ['valor-dark', 'sepia-dark', 'solarized-dark', 'contrast'] as const;

  const cycleTheme = () => {
    const currentIndex = allowedThemes.indexOf(theme as any);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % allowedThemes.length;
    setTheme(allowedThemes[nextIndex]);
  };

  // Mount on client, then dismiss the loading screen
  useEffect(() => {
    setMounted(true);
    stopLoading('app-init');
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [stopLoading]);

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

  // Don't render during SSR — the loading screen covers the page
  if (!mounted) return null;

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
          router.push('/');
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
          router.push('/');
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
          router.push('/');
        }
        break;
      default:
        router.push('/');
    }
  };

  // Theme icon mapping
  const getThemeIcon = (themeName: string) => {
    switch (themeName) {
      case 'light':
        return 'SunLight';
      case 'contrast':
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
      case 'contrast':
        return 'High Contrast';
      case 'sepia-dark':
        return 'Sepia';
      case 'sepia-light':
        return 'Sepia Light';
      case 'solarized-dark':
        return 'Solarized';
      case 'valor-dark':
        return 'Valor';
      default:
        return themeName.charAt(0).toUpperCase() + themeName.slice(1);
    }
  };

  return (
    <div
      className="transition-all duration-300"
      style={{
        color: cssVars.foreground,
        height: '100dvh',
        backgroundColor: cssVars.background,
      }}
    >
      {/* Background Image Strip (behind nav bar) - Not shown on overview page */}
      {activeTab !== 'overview' && (
        <div
          className="fixed top-0 left-0 right-0 z-30"
          style={{
            height: 'calc(48px + env(safe-area-inset-top))',
            backgroundImage: 'url(/assets/knight_background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%'
          }}
        />
      )}

      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0" style={{ zIndex: 9999 }}>
        <Navigation
          icon={
            <div style={{
              width: '28px',
              height: '28px',
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              WebkitMaskImage: 'url(/assets/AppHeaderImg.svg)',
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskImage: 'url(/assets/AppHeaderImg.svg)',
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
            }} />
          }
          appName="Mourn Design"
          onBrandClick={() => router.push('/')}
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
              v1.2.4
            </div>
          }
        />
      </div>

      {/* Main content */}
      {activeTab === 'overview' ? (
        // Overview page has its own scrolling system with parallax - don't wrap in Scrollbar
        <div style={{
          marginTop: 'calc(48px + env(safe-area-inset-top))',
          height: 'calc(100dvh - 48px - env(safe-area-inset-top))',
          width: '100%',
        }}>
          {children}
        </div>
      ) : (
        // Other pages use PageWrapper's Scrollbar
        <div className="flex flex-col" style={{
          marginTop: 'calc(48px + env(safe-area-inset-top))',
          height: 'calc(100dvh - 48px - env(safe-area-inset-top))',
        }}>
          <Scrollbar
            variant="ghost"
            color="secondary"
            size="md"
            visibility={isMobile ? 'hidden' : 'always'}
            disabled={false}
            smoothScrolling={true}
            height="100%"
            width="100%"
          >
            {activeTab === 'components' || activeTab === 'environment' ? (
              // Full width for components and environment pages (have their own side menu layout)
              <div style={{ width: '100%', margin: 0, padding: 0, paddingBottom: 'env(safe-area-inset-bottom)' }}>
                {children}
              </div>
            ) : (
              // Container for other pages
              <main className="container mx-auto px-6 py-8" style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))' }}>
                {children}
              </main>
            )}
          </Scrollbar>
        </div>
      )}
      
      {/* Floating Theme Switcher */}
      <div className="fixed right-6 z-50" style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}>
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
          {!isMobile && <span className="ml-2">{getThemeLabel(theme)}</span>}
        </Button>
      </div>
    </div>
  );
}