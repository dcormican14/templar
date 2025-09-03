import React from 'react';
import type { SearchColor, SearchVariant, SearchSize, SearchShape } from './Search.types';

// Get color variables based on color prop
export const getColorVariables = (color: SearchColor, customColor: string | undefined, cssVars: any) => {
  if (color === 'custom' && customColor) {
    return {
      main: customColor,
      foreground: '#ffffff',
      background: customColor + '10',
      border: customColor,
      hover: customColor + '20',
    };
  }

  const colorMap: Record<string, any> = {
    primary: {
      main: cssVars.primary,
      background: cssVars.primaryBackground,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      border: cssVars.primaryBorder,
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      border: cssVars.secondaryBorder,
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      border: cssVars.successBorder,
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      border: cssVars.warningBorder,
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      border: cssVars.destructiveBorder,
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      border: cssVars.infoBorder,
    },
  };

  return colorMap[color] || colorMap.primary;
};

// Get shape styles based on shape prop
export const getShapeStyles = (shape: SearchShape): React.CSSProperties => {
  switch (shape) {
    case 'sharp':
      return { borderRadius: '0' };
    case 'round':
      return { borderRadius: '12px' };
    case 'pill':
      return { borderRadius: '9999px' };
    default:
      return { borderRadius: '12px' };
  }
};

export const createSearchContainerStyles = (
  size: SearchSize,
  rounded: boolean,
  animationsEnabled: boolean,
  width?: string | number
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: width || 'auto',
    minWidth: '200px',
    transition: animationsEnabled ? 'width 0.2s ease-in-out, opacity 0.2s ease-in-out' : 'none',
  };

  return baseStyles;
};

export const getSearchInputStyles = (
  variant: SearchVariant,
  size: SearchSize,
  disabled: boolean,
  error: boolean,
  rounded: boolean,
  cssVars: any,
  animationsEnabled: boolean,
  hasLeftIcon: boolean,
  hasRightIcon: boolean,
  color: SearchColor = 'primary',
  customColor?: string
): React.CSSProperties => {
  // Base input styles
  const baseStyles: React.CSSProperties = {
    width: '100%',
    border: '1px solid',
    outline: 'none',
    fontFamily: 'inherit',
    transition: animationsEnabled ? 'background-color 0.2s ease-in-out, color 0.2s ease-in-out, opacity 0.2s ease-in-out' : 'none',
    backgroundColor: 'transparent',
    color: cssVars.foreground,
    // Reset browser styles
    WebkitAppearance: 'none',
    MozAppearance: 'none',
  };

  // Size-specific styles
  const sizeStyles = (() => {
    switch (size) {
      case 'sm':
        return {
          padding: hasLeftIcon ? '6px 8px 6px 32px' : hasRightIcon ? '6px 32px 6px 8px' : '6px 8px',
          fontSize: '14px',
          lineHeight: '1.4',
          borderRadius: rounded ? '8px' : '4px',
          height: '32px',
        };
      case 'lg':
        return {
          padding: hasLeftIcon ? '10px 12px 10px 40px' : hasRightIcon ? '10px 40px 10px 12px' : '10px 12px',
          fontSize: '16px',
          lineHeight: '1.5',
          borderRadius: rounded ? '12px' : '8px',
          height: '48px',
        };
      case 'md':
      default:
        return {
          padding: hasLeftIcon ? '8px 10px 8px 36px' : hasRightIcon ? '8px 36px 8px 10px' : '8px 10px',
          fontSize: '14px',
          lineHeight: '1.5',
          borderRadius: rounded ? '10px' : '6px',
          height: '40px',
        };
    }
  })();

  // Adjust padding if both icons are present
  if (hasLeftIcon && hasRightIcon) {
    switch (size) {
      case 'sm':
        sizeStyles.padding = '6px 32px';
        break;
      case 'lg':
        sizeStyles.padding = '10px 40px';
        break;
      case 'md':
      default:
        sizeStyles.padding = '8px 36px';
        break;
    }
  }

  // Variant-specific styles
  const variantStyles = (() => {
    if (error) {
      return {
        borderColor: cssVars.error,
        backgroundColor: cssVars.background,
        color: cssVars.foreground,
      };
    }

    switch (variant) {
      case 'solid':
        return {
          backgroundColor: getColorVariables(color, customColor, cssVars).main,
          borderColor: getColorVariables(color, customColor, cssVars).border,
          color: getColorVariables(color, customColor, cssVars).foreground,
        };
      case 'outline':
        return {
          backgroundColor: cssVars.background,
          borderColor: getColorVariables(color, customColor, cssVars).border,
          color: cssVars.foreground,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          color: cssVars.foreground,
        };
      default:
        return {
          backgroundColor: cssVars.background,
          borderColor: cssVars.border,
          color: cssVars.foreground,
        };
    }
  })();

  // State-specific styles
  const stateStyles: React.CSSProperties = {};
  
  if (disabled) {
    stateStyles.opacity = 0.5;
    stateStyles.cursor = 'not-allowed';
  }

  // Determine placeholder color based on variant
  let placeholderColor = cssVars.mutedForeground; // default
  
  switch (variant) {
    case 'solid':
      placeholderColor = cssVars.primaryForeground;
      break;
    case 'outline':
      placeholderColor = cssVars.mutedForeground;
      break;
    case 'ghost':
      placeholderColor = cssVars.mutedForeground;
      break;
    default:
      placeholderColor = cssVars.mutedForeground;
      break;
  }

  return {
    ...baseStyles,
    ...sizeStyles,
    ...variantStyles,
    ...stateStyles,
  };
};

// Separate function to get placeholder color for use in component
export const getPlaceholderColor = (cssVars: any, variant: SearchVariant = 'outline'): string => {
  switch (variant) {
    case 'solid':
      return cssVars.primaryForeground;
    case 'outline':
      return cssVars.mutedForeground;
    case 'ghost':
      return cssVars.mutedForeground;
    default:
      return cssVars.mutedForeground;
  }
};

export const getSearchIconStyles = (
  size: SearchSize,
  position: 'left' | 'right',
  disabled: boolean,
  clickable: boolean,
  cssVars: any,
  variant: SearchVariant = 'outline'
): React.CSSProperties => {
  // Determine icon color based on variant
  let iconColor = cssVars.mutedForeground; // default
  
  switch (variant) {
    case 'solid':
      iconColor = cssVars.primaryForeground;
      break;
    case 'outline':
      iconColor = cssVars.foreground;
      break;
    case 'ghost':
      iconColor = cssVars.foreground;
      break;
    default:
      iconColor = cssVars.foreground;
      break;
  }

  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    color: iconColor,
    pointerEvents: clickable ? 'auto' : 'none',
    cursor: clickable && !disabled ? 'pointer' : 'default',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Size and position specific styles
  const sizePositionStyles = (() => {
    switch (size) {
      case 'sm':
        return {
          [position]: '8px',
          fontSize: '14px',
        };
      case 'lg':
        return {
          [position]: '12px',
          fontSize: '18px',
        };
      case 'md':
      default:
        return {
          [position]: '10px',
          fontSize: '16px',
        };
    }
  })();

  const stateStyles: React.CSSProperties = {};
  
  if (disabled) {
    stateStyles.opacity = 0.5;
  }

  if (clickable && !disabled) {
    stateStyles.transition = 'color 0.2s ease-in-out';
  }

  return {
    ...baseStyles,
    ...sizePositionStyles,
    ...stateStyles,
  };
};

export const getLoadingStyles = (
  size: SearchSize,
  cssVars: any
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    color: cssVars.mutedForeground,
    zIndex: 1,
  };

  const sizeStyles = (() => {
    switch (size) {
      case 'sm':
        return { fontSize: '12px' };
      case 'lg':
        return { fontSize: '16px' };
      case 'md':
      default:
        return { fontSize: '14px' };
    }
  })();

  return { ...baseStyles, ...sizeStyles };
};

export const getFocusStyles = (
  cssVars: any, 
  variant: SearchVariant, 
  error?: boolean
): React.CSSProperties => {
  // Determine the focus outline color based on variant and error state
  let outlineColor = cssVars.primary; // default

  if (error) {
    outlineColor = cssVars.error;
  } else {
    switch (variant) {
      case 'solid':
        outlineColor = cssVars.primary;
        break;
      case 'outline':
      case 'ghost':
      default:
        outlineColor = cssVars.primary;
        break;
    }
  }

  return {
    outline: `2px solid ${outlineColor}`,
    outlineOffset: '2px',
    // Don't change the border color on focus - keep original variant border
  };
};

export const getPlaceholderStyles = (cssVars: any, variant: SearchVariant = 'outline'): React.CSSProperties => {
  // Determine placeholder color based on variant
  let placeholderColor = cssVars.mutedForeground; // default
  
  switch (variant) {
    case 'solid':
      placeholderColor = cssVars.primaryForeground;
      break;
    case 'outline':
      placeholderColor = cssVars.mutedForeground;
      break;
    case 'ghost':
      placeholderColor = cssVars.mutedForeground;
      break;
    default:
      placeholderColor = cssVars.mutedForeground;
      break;
  }

  return {
    color: placeholderColor,
    opacity: 0.7,
  };
};
