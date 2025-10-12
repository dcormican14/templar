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
      // Base defaults
      'background': '#ffffff',
      'background-hover': '#f9fafb',
      'background-accent': '#f3f4f6',
      'background-disabled': '#f3f4f6',
      'foreground': '#000000',
      'foreground-hover': '#111827',
      'foreground-accent': '#6b7280',
      'foreground-disabled': '#9ca3af',
      
      // Primary defaults
      'primary': '#0066cc',
      'primary-background': '#eff6ff',
      'primary-foreground': '#ffffff',
      'primary-hover': '#0052a3',
      
      // Secondary defaults
      'secondary': '#6b7280',
      'secondary-background': '#f9fafb',
      'secondary-foreground': '#ffffff',
      'secondary-hover': '#4b5563',
      
      // Success defaults
      'success': '#10b981',
      'success-background': '#ecfdf5',
      'success-foreground': '#ffffff',
      
      // Warning defaults
      'warning': '#f59e0b',
      'warning-background': '#fffbeb',
      'warning-foreground': '#ffffff',
      
      // Destructive defaults
      'destructive': '#ef4444',
      'destructive-background': '#fef2f2',
      'destructive-foreground': '#ffffff',
      
      // Info defaults
      'info': '#3b82f6',
      'info-background': '#eff6ff',
      'info-foreground': '#ffffff',
      
      // Legacy defaults
      'muted': '#f3f4f6',
      'border': '#e5e7eb',
      'card': '#ffffff',
      'input': '#ffffff',
      'accent': '#0066cc',
      'error': '#ef4444',
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
    // Base colors
    background: getVariable('background'),
    backgroundHover: getVariable('background-hover'),
    backgroundAccent: getVariable('background-accent'),
    backgroundShadow: getVariable('background-shadow'),
    backgroundDisabled: getVariable('background-disabled'),
    backgroundBorder: getVariable('background-border'),
    backgroundFont: getVariable('background-font'),
    
    foreground: getVariable('foreground'),
    foregroundHover: getVariable('foreground-hover'),
    foregroundAccent: getVariable('foreground-accent'),
    foregroundShadow: getVariable('foreground-shadow'),
    foregroundDisabled: getVariable('foreground-disabled'),
    foregroundBorder: getVariable('foreground-border'),
    foregroundFont: getVariable('foreground-font'),
    
    // Primary colors
    primary: getVariable('primary'),
    primaryBackground: getVariable('primary-background'),
    primaryForeground: getVariable('primary-foreground', '#ffffff'),
    primaryHover: getVariable('primary-hover'),
    primaryAccent: getVariable('primary-accent'),
    primaryShadow: getVariable('primary-shadow'),
    primaryDisabled: getVariable('primary-disabled'),
    primaryBorder: getVariable('primary-border'),
    primaryFont: getVariable('primary-font'),
    
    // Secondary colors
    secondary: getVariable('secondary'),
    secondaryBackground: getVariable('secondary-background'),
    secondaryForeground: getVariable('secondary-foreground'),
    secondaryHover: getVariable('secondary-hover'),
    secondaryAccent: getVariable('secondary-accent'),
    secondaryShadow: getVariable('secondary-shadow'),
    secondaryDisabled: getVariable('secondary-disabled'),
    secondaryBorder: getVariable('secondary-border'),
    secondaryFont: getVariable('secondary-font'),
    
    // Success colors
    success: getVariable('success'),
    successBackground: getVariable('success-background'),
    successForeground: getVariable('success-foreground'),
    successHover: getVariable('success-hover'),
    successAccent: getVariable('success-accent'),
    successShadow: getVariable('success-shadow'),
    successDisabled: getVariable('success-disabled'),
    successBorder: getVariable('success-border'),
    successFont: getVariable('success-font'),
    
    // Warning colors
    warning: getVariable('warning'),
    warningBackground: getVariable('warning-background'),
    warningForeground: getVariable('warning-foreground'),
    warningHover: getVariable('warning-hover'),
    warningAccent: getVariable('warning-accent'),
    warningShadow: getVariable('warning-shadow'),
    warningDisabled: getVariable('warning-disabled'),
    warningBorder: getVariable('warning-border'),
    warningFont: getVariable('warning-font'),
    
    // Destructive colors
    destructive: getVariable('destructive'),
    destructiveBackground: getVariable('destructive-background'),
    destructiveForeground: getVariable('destructive-foreground'),
    destructiveHover: getVariable('destructive-hover'),
    destructiveAccent: getVariable('destructive-accent'),
    destructiveShadow: getVariable('destructive-shadow'),
    destructiveDisabled: getVariable('destructive-disabled'),
    destructiveBorder: getVariable('destructive-border'),
    destructiveFont: getVariable('destructive-font'),
    
    // Info colors
    info: getVariable('info'),
    infoBackground: getVariable('info-background'),
    infoForeground: getVariable('info-foreground'),
    infoHover: getVariable('info-hover'),
    infoAccent: getVariable('info-accent'),
    infoShadow: getVariable('info-shadow'),
    infoDisabled: getVariable('info-disabled'),
    infoBorder: getVariable('info-border'),
    infoFont: getVariable('info-font'),
    
    // Legacy compatibility
    accent: getVariable('accent'),
    accentForeground: getVariable('accent-foreground'),
    border: getVariable('border'),
    borderHover: getVariable('border-hover'),
    muted: getVariable('muted'),
    mutedForeground: getVariable('muted-foreground'),
    error: getVariable('error'),
    errorForeground: getVariable('error-foreground'),
    card: getVariable('card'),
    cardForeground: getVariable('card-foreground'),
    input: getVariable('input'),
    inputBorder: getVariable('input-border'),
    inputPlaceholder: getVariable('input-placeholder'),
    inputForeground: getVariable('input-foreground'),
    shadowSm: getVariable('shadow-sm'),
    shadow: getVariable('shadow'),
    shadowMd: getVariable('shadow-md'),
    shadowLg: getVariable('shadow-lg'),
    progressTrack: getVariable('progress-track'),
    progressTrackText: getVariable('progress-track-text'),
    
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
        borderColor: getVariable('primary-border'),
        boxShadow: getVariable('primary-shadow'),
      },
      primaryBackground: {
        backgroundColor: getVariable('primary-background'),
        color: getVariable('primary'),
        borderColor: getVariable('primary-border'),
      },
      secondary: {
        backgroundColor: getVariable('secondary'),
        color: getVariable('secondary-foreground'),
        borderColor: getVariable('secondary-border'),
        boxShadow: getVariable('secondary-shadow'),
      },
      secondaryBackground: {
        backgroundColor: getVariable('secondary-background'),
        color: getVariable('secondary'),
        borderColor: getVariable('secondary-border'),
      },
      success: {
        backgroundColor: getVariable('success'),
        color: getVariable('success-foreground'),
        borderColor: getVariable('success-border'),
        boxShadow: getVariable('success-shadow'),
      },
      successBackground: {
        backgroundColor: getVariable('success-background'),
        color: getVariable('success'),
        borderColor: getVariable('success-border'),
      },
      warning: {
        backgroundColor: getVariable('warning'),
        color: getVariable('warning-foreground'),
        borderColor: getVariable('warning-border'),
        boxShadow: getVariable('warning-shadow'),
      },
      warningBackground: {
        backgroundColor: getVariable('warning-background'),
        color: getVariable('warning'),
        borderColor: getVariable('warning-border'),
      },
      destructive: {
        backgroundColor: getVariable('destructive'),
        color: getVariable('destructive-foreground'),
        borderColor: getVariable('destructive-border'),
        boxShadow: getVariable('destructive-shadow'),
      },
      destructiveBackground: {
        backgroundColor: getVariable('destructive-background'),
        color: getVariable('destructive'),
        borderColor: getVariable('destructive-border'),
      },
      info: {
        backgroundColor: getVariable('info'),
        color: getVariable('info-foreground'),
        borderColor: getVariable('info-border'),
        boxShadow: getVariable('info-shadow'),
      },
      infoBackground: {
        backgroundColor: getVariable('info-background'),
        color: getVariable('info'),
        borderColor: getVariable('info-border'),
      },
      card: {
        backgroundColor: getVariable('card'),
        color: getVariable('card-foreground'),
        borderColor: getVariable('border'),
      },
      background: {
        backgroundColor: getVariable('background'),
        color: getVariable('foreground'),
        borderColor: getVariable('background-border'),
      },
      // Legacy compatibility
      error: {
        backgroundColor: getVariable('error'),
        color: getVariable('error-foreground'),
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
