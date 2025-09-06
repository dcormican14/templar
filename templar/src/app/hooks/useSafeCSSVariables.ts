import { useSafeTheme } from './useSafeTheme';

// Default CSS variables for fallback
const defaultCSSVars = {
  background: '#ffffff',
  foreground: '#000000',
  border: '#e5e5e5',
  primary: '#007acc',
  primaryForeground: '#ffffff',
  backgroundAccent: '#f8f9fa',
  foregroundAccent: '#6c757d',
  backgroundHover: '#e9ecef',
  card: '#ffffff',
  shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  getColorWithOpacity: (color: string, opacity: number) => `rgba(0, 122, 204, ${opacity})`
};

export function useSafeCSSVariables() {
  const { theme } = useSafeTheme();
  
  // If no theme context, return defaults
  if (theme === 'light' && typeof window === 'undefined') {
    return defaultCSSVars;
  }
  
  try {
    // Try to get actual CSS variables if available
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      const getVar = (name: string, fallback: string) => {
        const value = getComputedStyle(root).getPropertyValue(`--${name}`).trim();
        return value || fallback;
      };
      
      return {
        background: getVar('background', defaultCSSVars.background),
        foreground: getVar('foreground', defaultCSSVars.foreground),
        border: getVar('border', defaultCSSVars.border),
        primary: getVar('primary', defaultCSSVars.primary),
        primaryForeground: getVar('primary-foreground', defaultCSSVars.primaryForeground),
        backgroundAccent: getVar('background-accent', defaultCSSVars.backgroundAccent),
        foregroundAccent: getVar('foreground-accent', defaultCSSVars.foregroundAccent),
        backgroundHover: getVar('background-hover', defaultCSSVars.backgroundHover),
        card: getVar('card', defaultCSSVars.card),
        shadowMd: getVar('shadow-md', defaultCSSVars.shadowMd),
        getColorWithOpacity: (color: string, opacity: number) => {
          const primaryColor = getVar('primary', '#007acc');
          return `${primaryColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
        }
      };
    }
  } catch (error) {
    // Fall back to defaults if anything fails
  }
  
  return defaultCSSVars;
}