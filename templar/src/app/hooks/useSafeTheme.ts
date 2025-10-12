import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider';

// Safe hook that doesn't throw if context is not available
export function useSafeTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    // Return default values instead of throwing
    return {
      theme: 'light' as const,
      setTheme: () => {},
      availableThemes: [],
      cycleTheme: () => {},
      resolvedTheme: 'light' as const
    };
  }
  
  return context;
}