'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'high-contrast' | 'sepia' | 'sepia-dark' | 'solarized-dark' | 'system' | 'auto';
type ResolvedTheme = 'light' | 'dark' | 'high-contrast' | 'sepia' | 'sepia-dark' | 'solarized-dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  availableThemes: Theme[];
  cycleTheme: () => void;
  // CSS Variables access
  getCSSVariable: (variableName: string) => string;
  themeVariables: ThemeVariables;
}

interface ThemeVariables {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  primaryHover: string;
  secondary: string;
  secondaryForeground: string;
  secondaryHover: string;
  accent: string;
  accentForeground: string;
  border: string;
  borderHover: string;
  muted: string;
  mutedForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  error: string;
  errorForeground: string;
  info: string;
  infoForeground: string;
  card: string;
  cardForeground: string;
  input: string;
  inputBorder: string;
  inputPlaceholder: string;
  shadowSm: string;
  shadow: string;
  shadowMd: string;
  shadowLg: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  attribute?: string;
  storageKey?: string;
}

const availableThemes: Theme[] = ['light', 'dark', 'high-contrast', 'sepia', 'sepia-dark', 'solarized-dark', 'system', 'auto'];

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  attribute = 'data-theme',
  storageKey = 'templar-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);
  const [themeVariables, setThemeVariables] = useState<ThemeVariables>({} as ThemeVariables);

  // Get CSS variable value
  const getCSSVariable = (variableName: string): string => {
    if (typeof window === 'undefined') return '';
    const style = getComputedStyle(document.documentElement);
    return style.getPropertyValue(`--${variableName}`).trim();
  };

  // Update theme variables when theme changes
  const updateThemeVariables = () => {
    if (typeof window === 'undefined') return;
    
    const variables: ThemeVariables = {
      background: getCSSVariable('background'),
      foreground: getCSSVariable('foreground'),
      primary: getCSSVariable('primary'),
      primaryForeground: getCSSVariable('primary-foreground'),
      primaryHover: getCSSVariable('primary-hover'),
      secondary: getCSSVariable('secondary'),
      secondaryForeground: getCSSVariable('secondary-foreground'),
      secondaryHover: getCSSVariable('secondary-hover'),
      accent: getCSSVariable('accent'),
      accentForeground: getCSSVariable('accent-foreground'),
      border: getCSSVariable('border'),
      borderHover: getCSSVariable('border-hover'),
      muted: getCSSVariable('muted'),
      mutedForeground: getCSSVariable('muted-foreground'),
      success: getCSSVariable('success'),
      successForeground: getCSSVariable('success-foreground'),
      warning: getCSSVariable('warning'),
      warningForeground: getCSSVariable('warning-foreground'),
      error: getCSSVariable('error'),
      errorForeground: getCSSVariable('error-foreground'),
      info: getCSSVariable('info'),
      infoForeground: getCSSVariable('info-foreground'),
      card: getCSSVariable('card'),
      cardForeground: getCSSVariable('card-foreground'),
      input: getCSSVariable('input'),
      inputBorder: getCSSVariable('input-border'),
      inputPlaceholder: getCSSVariable('input-placeholder'),
      shadowSm: getCSSVariable('shadow-sm'),
      shadow: getCSSVariable('shadow'),
      shadowMd: getCSSVariable('shadow-md'),
      shadowLg: getCSSVariable('shadow-lg'),
    };
    
    setThemeVariables(variables);
  };

  // Get system preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  // Get time-based theme for 'auto' mode
  const getAutoTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      const hour = new Date().getHours();
      // Dark theme from 6 PM to 6 AM
      return hour >= 18 || hour < 6 ? 'dark' : 'light';
    }
    return 'light';
  };

  // Resolve the actual theme to apply
  const resolvedTheme: ResolvedTheme = (() => {
    switch (theme) {
      case 'system':
        return getSystemTheme();
      case 'auto':
        return getAutoTheme();
      case 'light':
      case 'dark':
      case 'high-contrast':
      case 'sepia':
      case 'sepia-dark':
      case 'solarized-dark':
        return theme;
      default:
        return 'light';
    }
  })();

  // Initialize theme from localStorage or default
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored && availableThemes.includes(stored as Theme)) {
      setThemeState(stored as Theme);
    }
    setMounted(true);
  }, [storageKey]);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.setAttribute(attribute, resolvedTheme);
    
    // Remove all theme classes first
    root.classList.remove('light', 'dark', 'high-contrast', 'sepia', 'sepia-dark', 'solarized-dark');
    
    // Add the resolved theme class
    root.classList.add(resolvedTheme);
    
    // Also handle dark mode class for Tailwind CSS compatibility
    if (resolvedTheme === 'dark' || resolvedTheme === 'sepia-dark' || resolvedTheme === 'solarized-dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Update theme variables after DOM changes
    setTimeout(updateThemeVariables, 0);
  }, [resolvedTheme, mounted, attribute]);

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const root = document.documentElement;
      const newResolvedTheme = mediaQuery.matches ? 'dark' : 'light';
      root.setAttribute(attribute, newResolvedTheme);
      root.classList.remove('light', 'dark', 'high-contrast', 'sepia', 'sepia-dark', 'solarized-dark');
      root.classList.add(newResolvedTheme);
      root.classList.toggle('dark', newResolvedTheme === 'dark');
      setTimeout(updateThemeVariables, 0);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, attribute]);

  // Listen for time changes when in auto mode
  useEffect(() => {
    if (theme !== 'auto') return;

    const checkTime = () => {
      const root = document.documentElement;
      const newResolvedTheme = getAutoTheme();
      root.setAttribute(attribute, newResolvedTheme);
      root.classList.remove('light', 'dark', 'high-contrast', 'sepia', 'sepia-dark', 'solarized-dark');
      root.classList.add(newResolvedTheme);
      root.classList.toggle('dark', newResolvedTheme === 'dark');
      setTimeout(updateThemeVariables, 0);
    };

    // Check every minute for time-based theme changes
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, [theme, attribute]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(storageKey, newTheme);
  };

  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme(getSystemTheme() === 'dark' ? 'light' : 'dark');
    } else if (theme === 'auto') {
      setTheme(getAutoTheme() === 'dark' ? 'light' : 'dark');
    } else {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };

  const cycleTheme = () => {
    const currentIndex = availableThemes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    setTheme(availableThemes[nextIndex]);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  const value: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    availableThemes,
    cycleTheme,
    getCSSVariable,
    themeVariables,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Alias for backward compatibility
export const DarkModeProvider = ThemeProvider;

export { type Theme, type ResolvedTheme, type ThemeContextType, type ThemeVariables };