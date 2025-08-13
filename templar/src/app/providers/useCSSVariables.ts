'use client';

import { useTheme } from './ThemeProvider';

/**
 * Custom hook for easy access to CSS variables from the current theme
 * @returns Object with CSS variable values and utility functions
 */
export function useCSSVariables() {
  const { themeVariables, getCSSVariable } = useTheme();

  /**
   * Get a CSS variable value with optional fallback
   * @param variable - The CSS variable name (without --)
   * @param fallback - Fallback value if variable is not found
   */
  const getVariable = (variable: string, fallback?: string): string => {
    const value = getCSSVariable(variable);
    return value || fallback || '';
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
    // All theme variables
    ...themeVariables,
    
    // Utility functions
    getVariable,
    getCSSVariable,
    createStyles,
    getColorWithOpacity,
    
    // Common color combinations
    surface: {
      primary: {
        backgroundColor: themeVariables.primary,
        color: themeVariables.primaryForeground,
      },
      secondary: {
        backgroundColor: themeVariables.secondary,
        color: themeVariables.secondaryForeground,
      },
      card: {
        backgroundColor: themeVariables.card,
        color: themeVariables.cardForeground,
        borderColor: themeVariables.border,
      },
      success: {
        backgroundColor: themeVariables.success,
        color: themeVariables.successForeground,
      },
      warning: {
        backgroundColor: themeVariables.warning,
        color: themeVariables.warningForeground,
      },
      error: {
        backgroundColor: themeVariables.error,
        color: themeVariables.errorForeground,
      },
      info: {
        backgroundColor: themeVariables.info,
        color: themeVariables.infoForeground,
      },
    },
    
    // Shadows
    shadows: {
      sm: themeVariables.shadowSm,
      md: themeVariables.shadow,
      lg: themeVariables.shadowMd,
      xl: themeVariables.shadowLg,
    },
  };
}
