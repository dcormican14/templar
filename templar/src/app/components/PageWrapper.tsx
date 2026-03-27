'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from './molecules/Navigation/Navigation';
import { Icon, Button } from './atoms';
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
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useSafeTheme();
  const cssVars = useSafeCSSVariables();
  const { stopLoading } = useSafeLoading();

  const allowedThemes = ['valor-dark', 'sepia-dark', 'solarized-dark', 'contrast'] as const;

  const cycleTheme = () => {
    const currentIndex = allowedThemes.indexOf(theme as any);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % allowedThemes.length;
    setTheme(allowedThemes[nextIndex]);
  };

  useEffect(() => {
    setMounted(true);
    stopLoading('app-init');
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [stopLoading]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!mounted) return null;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'docs', label: 'Docs' },
    { id: 'contact', label: 'Contact' },
    { id: 'components', label: 'Components' },
    { id: 'environment', label: 'Environment' },
  ];

  const handleTabChange = (tabId: string) => {
    switch (tabId) {
      case 'overview':
        if (activeTab === 'overview') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          router.push('/');
        }
        break;
      case 'docs':
        if (activeTab === 'overview') {
          document.getElementById('docs-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          router.push('/');
        }
        break;
      case 'contact':
        if (activeTab === 'overview') {
          document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          router.push('/');
        }
        break;
      case 'components':
        router.push('/components');
        break;
      case 'environment':
        router.push('/environment');
        break;
      default:
        router.push('/');
    }
  };

  const getThemeIcon = (t: string) => {
    const map: Record<string, string> = {
      light: 'SunLight', contrast: 'Lens', 'sepia-light': 'Lamp',
      'sepia-dark': 'CoffeeCup', 'solarized-dark': 'SeaAndSun',
      valor: 'HistoricShield', 'valor-dark': 'HomeShield',
    };
    return map[t] || 'Palette';
  };

  const getThemeLabel = (t: string) => {
    const map: Record<string, string> = {
      contrast: 'High Contrast', 'sepia-dark': 'Sepia', 'sepia-light': 'Sepia Light',
      'solarized-dark': 'Solarized', 'valor-dark': 'Valor',
    };
    return map[t] || t.charAt(0).toUpperCase() + t.slice(1);
  };

  return (
    <>
      {/* Fixed navbar — transparent at top, glassmorphic on scroll */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? `${cssVars.background}CC` : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? `1px solid ${cssVars.border}` : '1px solid transparent',
          transition: 'background 300ms ease, backdrop-filter 300ms ease, -webkit-backdrop-filter 300ms ease, border-color 300ms ease',
        }}
      >
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
          activeTab={activeTab}
          onTabChange={handleTabChange}
          variant="ghost"
          color="primary"
          size="md"
          trailingContent={
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: cssVars.foregroundAccent, fontSize: '14px', fontWeight: '500' }}>
              v1.2.4
            </div>
          }
        />
      </div>

      {/* Main content — normal document flow */}
      <main style={{ paddingTop: 'calc(var(--nav-height) + var(--safe-top))', minHeight: '100vh' }}>
        {children}
      </main>

      {/* Theme switcher */}
      <div style={{ position: 'fixed', right: '1.5rem', bottom: 'calc(1.5rem + var(--safe-bottom))', zIndex: 50 }}>
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
    </>
  );
}
