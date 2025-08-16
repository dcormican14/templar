'use client';

import { useTheme } from './ThemeProvider';
import { useContext } from 'react';

/**
 * Custom hook for easy access to CSS variables from the current theme
 * @returns Object with CSS variable values and utility functions
 */
export function useCSSVariables() {
  let themeVariables: any = {};
  let getCSSVariable: (variable: string) => string = () => '';

  try {
    const themeContext = useTheme();
    themeVariables = themeContext.themeVariables;
    getCSSVariable = themeContext.getCSSVariable;
  } catch (error) {
    // Fallback values when theme context is not available
    console.warn('useCSSVariables: Theme context not available, using fallback values');
  }

  /**
   * Get a CSS variable value with optional fallback
   * @param variable - The CSS variable name (without --)
   * @param fallback - Fallback value if variable is not found
   */
  const getVariable = (variable: string, fallback?: string): string => {
    try {
      const value = getCSSVariable(variable);
      return value || fallback || getDefaultValue(variable);
    } catch {
      return fallback || getDefaultValue(variable);
    }
  };

  /**
   * Get default fallback values for common CSS variables
   */
  const getDefaultValue = (variable: string): string => {
    const defaults: Record<string, string> = {
      'background': '#ffffff',
      'foreground': '#000000',
      'primary': '#0066cc',
      'secondary': '#6b7280',
      'muted': '#f3f4f6',
      'border': '#e5e7eb',
      'card': '#ffffff',
      'input': '#ffffff',
    };
    return defaults[variable] || '#000000';
  };

  /**
   * Create a style object using theme variables
   * @param styles - Object with CSS property keys and variable names as values
   */
  const createStyles = (styles: Record<string, string>) => {
    const result: Record<string, string> = {};
    for (const [property, variableName] of Object.entries(styles)) {
      result[property] = getVariable(variableName);
    }
    return result;
  };

  /**
   * Get color with opacity
   * @param colorVariable - The color variable name
   * @param opacity - Opacity value (0-1)
   */
  const getColorWithOpacity = (colorVariable: string, opacity: number): string => {
    const color = getVariable(colorVariable);
    if (!color) return '';
    
    // Handle hex colors
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    
    // Handle rgb colors
    if (color.startsWith('rgb')) {
      return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
    }
    
    return color;
  };

  return {
    // All theme variables with fallbacks
    background: getVariable('background'),
    foreground: getVariable('foreground'),
    primary: getVariable('primary'),
    primaryForeground: getVariable('primary-foreground', '#ffffff'),
    primaryHover: getVariable('primary-hover'),
    secondary: getVariable('secondary'),
    secondaryForeground: getVariable('secondary-foreground'),
    secondaryHover: getVariable('secondary-hover'),
    accent: getVariable('accent'),
    accentForeground: getVariable('accent-foreground'),
    border: getVariable('border'),
    borderHover: getVariable('border-hover'),
    muted: getVariable('muted'),
    mutedForeground: getVariable('muted-foreground'),
    success: getVariable('success'),
    successForeground: getVariable('success-foreground'),
    warning: getVariable('warning'),
    warningForeground: getVariable('warning-foreground'),
    error: getVariable('error'),
    errorForeground: getVariable('error-foreground'),
    info: getVariable('info'),
    infoForeground: getVariable('info-foreground'),
    card: getVariable('card'),
    cardForeground: getVariable('card-foreground'),
    input: getVariable('input'),
    inputBorder: getVariable('input-border'),
    inputPlaceholder: getVariable('input-placeholder'),
    shadowSm: getVariable('shadow-sm'),
    shadow: getVariable('shadow'),
    shadowMd: getVariable('shadow-md'),
    shadowLg: getVariable('shadow-lg'),
    
    // Utility functions
    getVariable,
    getCSSVariable,
    createStyles,
    getColorWithOpacity,
    
    // Common color combinations
    surface: {
      primary: {
        backgroundColor: getVariable('primary'),
        color: getVariable('primary-foreground', '#ffffff'),
      },
      secondary: {
        backgroundColor: getVariable('secondary'),
        color: getVariable('secondary-foreground'),
      },
      card: {
        backgroundColor: getVariable('card'),
        color: getVariable('card-foreground'),
        borderColor: getVariable('border'),
      },
      success: {
        backgroundColor: getVariable('success'),
        color: getVariable('success-foreground'),
      },
      warning: {
        backgroundColor: getVariable('warning'),
        color: getVariable('warning-foreground'),
      },
      error: {
        backgroundColor: getVariable('error'),
        color: getVariable('error-foreground'),
      },
      info: {
        backgroundColor: getVariable('info'),
        color: getVariable('info-foreground'),
      },
    },
    
    // Shadows
    shadows: {
      sm: getVariable('shadow-sm'),
      md: getVariable('shadow'),
      lg: getVariable('shadow-md'),
      xl: getVariable('shadow-lg'),
    },
  };
}
