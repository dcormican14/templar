'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'high-contrast' | 'sepia' | 'solarized-dark' | 'system' | 'auto';
type ResolvedTheme = 'light' | 'dark' | 'high-contrast' | 'sepia' | 'solarized-dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  availableThemes: Theme[];
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  attribute?: string;
  storageKey?: string;
}

const availableThemes: Theme[] = ['light', 'dark', 'high-contrast', 'sepia', 'solarized-dark', 'system', 'auto'];

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  attribute = 'data-theme',
  storageKey = 'templar-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

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
    root.classList.remove('light', 'dark', 'high-contrast', 'sepia', 'solarized-dark');
    
    // Add the resolved theme class
    root.classList.add(resolvedTheme);
    
    // Also handle dark mode class for Tailwind CSS compatibility
    if (resolvedTheme === 'dark' || resolvedTheme === 'solarized-dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolvedTheme, mounted, attribute]);

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const root = document.documentElement;
      const newResolvedTheme = mediaQuery.matches ? 'dark' : 'light';
      root.setAttribute(attribute, newResolvedTheme);
      root.classList.remove('light', 'dark', 'high-contrast', 'sepia', 'solarized-dark');
      root.classList.add(newResolvedTheme);
      root.classList.toggle('dark', newResolvedTheme === 'dark');
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
      root.classList.remove('light', 'dark', 'high-contrast', 'sepia', 'solarized-dark');
      root.classList.add(newResolvedTheme);
      root.classList.toggle('dark', newResolvedTheme === 'dark');
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

export { type Theme, type ResolvedTheme, type ThemeContextType };