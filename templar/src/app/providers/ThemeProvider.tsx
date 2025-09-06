'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'high-contrast' | 'sepia-light' | 'sepia-dark' | 'solarized-dark' | 'system' | 'auto';
type ResolvedTheme = 'light' | 'dark' |  'high-contrast' | 'sepia-light' | 'sepia-dark' | 'solarized-dark';

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
  // Base colors
  background: string;
  backgroundHover: string;
  backgroundAccent: string;
  backgroundShadow: string;
  backgroundDisabled: string;
  backgroundBorder: string;
  backgroundFont: string;
  
  foreground: string;
  foregroundHover: string;
  foregroundAccent: string;
  foregroundShadow: string;
  foregroundDisabled: string;
  foregroundBorder: string;
  foregroundFont: string;
  
  // Primary colors
  primary: string;
  primaryBackground: string;
  primaryForeground: string;
  primaryHover: string;
  primaryAccent: string;
  primaryShadow: string;
  primaryDisabled: string;
  primaryBorder: string;
  primaryFont: string;
  
  // Secondary colors
  secondary: string;
  secondaryBackground: string;
  secondaryForeground: string;
  secondaryHover: string;
  secondaryAccent: string;
  secondaryShadow: string;
  secondaryDisabled: string;
  secondaryBorder: string;
  secondaryFont: string;
  
  // Success colors
  success: string;
  successBackground: string;
  successForeground: string;
  successHover: string;
  successAccent: string;
  successShadow: string;
  successDisabled: string;
  successBorder: string;
  successFont: string;
  
  // Warning colors
  warning: string;
  warningBackground: string;
  warningForeground: string;
  warningHover: string;
  warningAccent: string;
  warningShadow: string;
  warningDisabled: string;
  warningBorder: string;
  warningFont: string;
  
  // Destructive colors
  destructive: string;
  destructiveBackground: string;
  destructiveForeground: string;
  destructiveHover: string;
  destructiveAccent: string;
  destructiveShadow: string;
  destructiveDisabled: string;
  destructiveBorder: string;
  destructiveFont: string;
  
  // Info colors
  info: string;
  infoBackground: string;
  infoForeground: string;
  infoHover: string;
  infoAccent: string;
  infoShadow: string;
  infoDisabled: string;
  infoBorder: string;
  infoFont: string;
  
  // Legacy compatibility
  accent: string;
  accentForeground: string;
  border: string;
  borderHover: string;
  muted: string;
  mutedForeground: string;
  error: string;
  errorForeground: string;
  card: string;
  cardForeground: string;
  input: string;
  inputBorder: string;
  inputPlaceholder: string;
  inputForeground: string;
  shadowSm: string;
  shadow: string;
  shadowMd: string;
  shadowLg: string;
  progressTrack: string;
  progressTrackText: string;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  attribute?: string;
  storageKey?: string;
}

const availableThemes: Theme[] = ['light', 'dark', 'high-contrast', 'sepia-light', 'sepia-dark', 'solarized-dark', 'system', 'auto'];

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
      // Base colors
      background: getCSSVariable('background'),
      backgroundHover: getCSSVariable('background-hover'),
      backgroundAccent: getCSSVariable('background-accent'),
      backgroundShadow: getCSSVariable('background-shadow'),
      backgroundDisabled: getCSSVariable('background-disabled'),
      backgroundBorder: getCSSVariable('background-border'),
      backgroundFont: getCSSVariable('background-font'),
      
      foreground: getCSSVariable('foreground'),
      foregroundHover: getCSSVariable('foreground-hover'),
      foregroundAccent: getCSSVariable('foreground-accent'),
      foregroundShadow: getCSSVariable('foreground-shadow'),
      foregroundDisabled: getCSSVariable('foreground-disabled'),
      foregroundBorder: getCSSVariable('foreground-border'),
      foregroundFont: getCSSVariable('foreground-font'),
      
      // Primary colors
      primary: getCSSVariable('primary'),
      primaryBackground: getCSSVariable('primary-background'),
      primaryForeground: getCSSVariable('primary-foreground'),
      primaryHover: getCSSVariable('primary-hover'),
      primaryAccent: getCSSVariable('primary-accent'),
      primaryShadow: getCSSVariable('primary-shadow'),
      primaryDisabled: getCSSVariable('primary-disabled'),
      primaryBorder: getCSSVariable('primary-border'),
      primaryFont: getCSSVariable('primary-font'),
      
      // Secondary colors
      secondary: getCSSVariable('secondary'),
      secondaryBackground: getCSSVariable('secondary-background'),
      secondaryForeground: getCSSVariable('secondary-foreground'),
      secondaryHover: getCSSVariable('secondary-hover'),
      secondaryAccent: getCSSVariable('secondary-accent'),
      secondaryShadow: getCSSVariable('secondary-shadow'),
      secondaryDisabled: getCSSVariable('secondary-disabled'),
      secondaryBorder: getCSSVariable('secondary-border'),
      secondaryFont: getCSSVariable('secondary-font'),
      
      // Success colors
      success: getCSSVariable('success'),
      successBackground: getCSSVariable('success-background'),
      successForeground: getCSSVariable('success-foreground'),
      successHover: getCSSVariable('success-hover'),
      successAccent: getCSSVariable('success-accent'),
      successShadow: getCSSVariable('success-shadow'),
      successDisabled: getCSSVariable('success-disabled'),
      successBorder: getCSSVariable('success-border'),
      successFont: getCSSVariable('success-font'),
      
      // Warning colors
      warning: getCSSVariable('warning'),
      warningBackground: getCSSVariable('warning-background'),
      warningForeground: getCSSVariable('warning-foreground'),
      warningHover: getCSSVariable('warning-hover'),
      warningAccent: getCSSVariable('warning-accent'),
      warningShadow: getCSSVariable('warning-shadow'),
      warningDisabled: getCSSVariable('warning-disabled'),
      warningBorder: getCSSVariable('warning-border'),
      warningFont: getCSSVariable('warning-font'),
      
      // Destructive colors
      destructive: getCSSVariable('destructive'),
      destructiveBackground: getCSSVariable('destructive-background'),
      destructiveForeground: getCSSVariable('destructive-foreground'),
      destructiveHover: getCSSVariable('destructive-hover'),
      destructiveAccent: getCSSVariable('destructive-accent'),
      destructiveShadow: getCSSVariable('destructive-shadow'),
      destructiveDisabled: getCSSVariable('destructive-disabled'),
      destructiveBorder: getCSSVariable('destructive-border'),
      destructiveFont: getCSSVariable('destructive-font'),
      
      // Info colors
      info: getCSSVariable('info'),
      infoBackground: getCSSVariable('info-background'),
      infoForeground: getCSSVariable('info-foreground'),
      infoHover: getCSSVariable('info-hover'),
      infoAccent: getCSSVariable('info-accent'),
      infoShadow: getCSSVariable('info-shadow'),
      infoDisabled: getCSSVariable('info-disabled'),
      infoBorder: getCSSVariable('info-border'),
      infoFont: getCSSVariable('info-font'),
      
      // Legacy compatibility
      accent: getCSSVariable('accent'),
      accentForeground: getCSSVariable('accent-foreground'),
      border: getCSSVariable('border'),
      borderHover: getCSSVariable('border-hover'),
      muted: getCSSVariable('muted'),
      mutedForeground: getCSSVariable('muted-foreground'),
      error: getCSSVariable('error'),
      errorForeground: getCSSVariable('error-foreground'),
      card: getCSSVariable('card'),
      cardForeground: getCSSVariable('card-foreground'),
      input: getCSSVariable('input'),
      inputBorder: getCSSVariable('input-border'),
      inputPlaceholder: getCSSVariable('input-placeholder'),
      inputForeground: getCSSVariable('input-foreground'),
      shadowSm: getCSSVariable('shadow-sm'),
      shadow: getCSSVariable('shadow'),
      shadowMd: getCSSVariable('shadow-md'),
      shadowLg: getCSSVariable('shadow-lg'),
      progressTrack: getCSSVariable('progress-track'),
      progressTrackText: getCSSVariable('progress-track-text'),
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
      case 'sepia-light':
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
    root.classList.remove('light', 'dark', 'high-contrast', 'sepia-light', 'sepia-dark', 'solarized-dark');
    
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
      root.classList.remove('light', 'dark', 'high-contrast', 'sepia-light', 'sepia-dark', 'solarized-dark');
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
      root.classList.remove('light', 'dark', 'high-contrast', 'sepia-light', 'sepia-dark', 'solarized-dark');
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

// Dedicated hook for CSS variables access (as mentioned in CSS_VARIABLES.md)
export function useCSSVariables(): ThemeVariables {
  const { themeVariables } = useTheme();
  return themeVariables;
}

// Alias for backward compatibility
export const DarkModeProvider = ThemeProvider;

export { type Theme, type ResolvedTheme, type ThemeContextType, type ThemeVariables };