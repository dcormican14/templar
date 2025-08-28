import React from 'react';
import type { DropdownVariant, DropdownSize, DropdownPosition } from './Dropdown.types';

export const createBaseStyles = (
  size: DropdownSize,
  rounded: boolean,
  animationsEnabled: boolean,
  width?: string | number
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    width: width || '200px', // Use provided width or default to 200px
    minWidth: '120px',
    transition: animationsEnabled ? 'width 0.2s ease-in-out, opacity 0.2s ease-in-out' : 'none',
  };

  return baseStyles;
};

export const getTriggerStyles = (
  variant: DropdownVariant,
  size: DropdownSize,
  disabled: boolean,
  error: boolean,
  open: boolean,
  rounded: boolean,
  cssVars: any,
  animationsEnabled: boolean
): React.CSSProperties => {
  // Base trigger styles
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    cursor: disabled ? 'not-allowed' : 'pointer',
    outline: 'none',
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    transition: animationsEnabled ? 'background-color 0.2s ease-in-out, color 0.2s ease-in-out, opacity 0.2s ease-in-out' : 'none',
    position: 'relative',
    // Reset browser focus styles
    boxShadow: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
  };

  // Size-specific styles
  const sizeStyles = (() => {
    switch (size) {
      case 'sm':
        return {
          padding: '8px 12px',
          fontSize: '14px',
          lineHeight: '1.4',
          borderRadius: rounded ? '8px' : '4px',
          minHeight: '32px',
        };
      case 'lg':
        return {
          padding: '12px 16px',
          fontSize: '16px',
          lineHeight: '1.5',
          borderRadius: rounded ? '12px' : '8px',
          minHeight: '48px',
        };
      case 'md':
      default:
        return {
          padding: '10px 14px',
          fontSize: '14px',
          lineHeight: '1.5',
          borderRadius: rounded ? '10px' : '6px',
          minHeight: '40px',
        };
    }
  })();

  // Variant-specific styles
  const variantStyles = (() => {
    if (error) {
      return {
        borderColor: cssVars.error,
        color: cssVars.error,
        backgroundColor: cssVars.background,
      };
    }

    switch (variant) {
      case 'primary':
        return {
          backgroundColor: cssVars.primary,
          borderColor: cssVars.primary,
          color: cssVars.primaryForeground,
        };
      case 'secondary':
        return {
          backgroundColor: cssVars.secondary,
          borderColor: cssVars.secondary,
          color: cssVars.secondaryForeground,
        };
      case 'outline':
        return {
          backgroundColor: cssVars.background,
          borderColor: cssVars.border,
          color: cssVars.foreground,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          color: cssVars.foreground,
        };
      case 'destructive':
        return {
          backgroundColor: cssVars.error,
          borderColor: cssVars.error,
          color: cssVars.errorForeground,
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

  if (open && !disabled) {
    if (variant === 'outline' || variant === 'ghost') {
      stateStyles.borderColor = cssVars.primary;
      // Focus outline is handled separately in the component
    }
  }

  return {
    ...baseStyles,
    ...sizeStyles,
    ...variantStyles,
    ...stateStyles,
  };
};

export const getArrowStyles = (
  size: DropdownSize,
  open: boolean,
  animationsEnabled: boolean,
  cssVars: any,
  variant: DropdownVariant = 'outline'
): React.CSSProperties => {
  // Determine arrow color based on variant
  let arrowColor = cssVars.foreground; // default
  
  switch (variant) {
    case 'primary':
      arrowColor = cssVars.primaryForeground;
      break;
    case 'secondary':
      arrowColor = cssVars.secondaryForeground;
      break;
    case 'outline':
      arrowColor = cssVars.foreground;
      break;
    case 'ghost':
      arrowColor = cssVars.foreground;
      break;
    case 'destructive':
      arrowColor = cssVars.errorForeground;
      break;
    default:
      arrowColor = cssVars.foreground;
      break;
  }

  const baseStyles: React.CSSProperties = {
    flexShrink: 0,
    marginLeft: '8px',
    transition: animationsEnabled ? 'transform 0.2s ease-in-out, color 0.2s ease-in-out' : 'none',
    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
    color: arrowColor,
  };

  const sizeStyles = (() => {
    switch (size) {
      case 'sm':
        return { fontSize: '14px' };
      case 'lg':
        return { fontSize: '18px' };
      case 'md':
      default:
        return { fontSize: '16px' };
    }
  })();

  return { ...baseStyles, ...sizeStyles };
};

export const getMenuStyles = (
  position: DropdownPosition,
  maxHeight: string,
  rounded: boolean,
  cssVars: any,
  animationsEnabled: boolean
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    zIndex: 9999,
    backgroundColor: cssVars.popover || cssVars.card || cssVars.background,
    borderRadius: rounded ? '12px' : '8px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    maxHeight,
    overflowY: 'auto',
    minWidth: '100%',
    marginTop: '4px',
    opacity: 1,
    transform: 'translateY(0)',
    transition: animationsEnabled ? 'all 0.2s ease-in-out' : 'none',
  };

  // Position-specific styles
  const positionStyles = (() => {
    switch (position) {
      case 'bottom-start':
        return { top: '100%', left: '0' };
      case 'bottom-end':
        return { top: '100%', right: '0' };
      case 'top-start':
        return { bottom: '100%', left: '0', marginTop: '0', marginBottom: '4px' };
      case 'top-end':
        return { bottom: '100%', right: '0', marginTop: '0', marginBottom: '4px' };
      case 'left':
        return { top: '0', right: '100%', marginTop: '0', marginRight: '4px' };
      case 'right':
        return { top: '0', left: '100%', marginTop: '0', marginLeft: '4px' };
      default:
        return { top: '100%', left: '0' };
    }
  })();

  return { ...baseStyles, ...positionStyles };
};

export const getOptionStyles = (
  size: DropdownSize,
  selected: boolean,
  disabled: boolean,
  highlighted: boolean,
  cssVars: any,
  animationsEnabled: boolean,
  variant: DropdownVariant = 'outline'
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    border: 'none',
    backgroundColor: 'transparent',
    textAlign: 'left',
    cursor: disabled ? 'not-allowed' : 'pointer',
    outline: 'none',
    transition: animationsEnabled ? 'all 0.15s ease-in-out' : 'none',
    color: 'inherit',
    fontFamily: 'inherit',
  };

  // Size-specific styles
  const sizeStyles = (() => {
    switch (size) {
      case 'sm':
        return {
          padding: '6px 12px',
          fontSize: '14px',
          lineHeight: '1.4',
        };
      case 'lg':
        return {
          padding: '10px 16px',
          fontSize: '16px',
          lineHeight: '1.5',
        };
      case 'md':
      default:
        return {
          padding: '8px 14px',
          fontSize: '14px',
          lineHeight: '1.5',
        };
    }
  })();

  // State-specific styles
  const stateStyles: React.CSSProperties = {};
  
  if (disabled) {
    stateStyles.opacity = 0.5;
    stateStyles.cursor = 'not-allowed';
  } else if (selected) {
    // Use variant-specific colors for selected state
    switch (variant) {
      case 'primary':
        stateStyles.backgroundColor = cssVars.primary + '20';
        stateStyles.color = cssVars.primary;
        break;
      case 'secondary':
        stateStyles.backgroundColor = cssVars.secondary + '20';
        stateStyles.color = cssVars.secondary;
        break;
      case 'destructive':
        stateStyles.backgroundColor = cssVars.error + '20';
        stateStyles.color = cssVars.error;
        break;
      case 'outline':
      case 'ghost':
      default:
        stateStyles.backgroundColor = cssVars.primary + '20';
        stateStyles.color = cssVars.primary;
        break;
    }
    stateStyles.fontWeight = '500';
  } else if (highlighted) {
    stateStyles.backgroundColor = cssVars.muted || cssVars.secondary + '30';
  }

  return {
    ...baseStyles,
    ...sizeStyles,
    ...stateStyles,
  };
};

export const getSearchStyles = (
  size: DropdownSize,
  rounded: boolean,
  cssVars: any,
  variant: DropdownVariant = 'outline'
): React.CSSProperties => {
  // Determine placeholder and text colors based on variant
  let textColor = cssVars.foreground;
  let placeholderColor = cssVars.mutedForeground;
  
  switch (variant) {
    case 'primary':
      textColor = cssVars.primaryForeground;
      placeholderColor = cssVars.primaryForeground;
      break;
    case 'secondary':
      textColor = cssVars.secondaryForeground;
      placeholderColor = cssVars.secondaryForeground;
      break;
    case 'outline':
      textColor = cssVars.foreground;
      placeholderColor = cssVars.mutedForeground;
      break;
    case 'ghost':
      textColor = cssVars.foreground;
      placeholderColor = cssVars.mutedForeground;
      break;
    case 'destructive':
      textColor = cssVars.errorForeground;
      placeholderColor = cssVars.errorForeground;
      break;
    default:
      textColor = cssVars.foreground;
      placeholderColor = cssVars.mutedForeground;
      break;
  }

  const baseStyles: React.CSSProperties = {
    width: '100%',
    backgroundColor: cssVars.background,
    color: textColor,
    outline: 'none',
    fontFamily: 'inherit',
    border: '1px solid transparent',
    transition: 'border-color 0.2s ease-in-out',
    // Hide native search clear button
    WebkitAppearance: 'none',
    // Placeholder styling
    '::placeholder': {
      color: placeholderColor,
      opacity: 1,
    },
  } as React.CSSProperties & {
    '::placeholder': { color: string; opacity: number };
  };

  const sizeStyles = (() => {
    switch (size) {
      case 'sm':
        return {
          padding: '6px 12px',
          fontSize: '14px',
          borderRadius: rounded ? '6px' : '4px',
        };
      case 'lg':
        return {
          padding: '10px 16px',
          fontSize: '16px',
          borderRadius: rounded ? '10px' : '8px',
        };
      case 'md':
      default:
        return {
          padding: '8px 14px',
          fontSize: '14px',
          borderRadius: rounded ? '8px' : '6px',
        };
    }
  })();

  return { ...baseStyles, ...sizeStyles };
};

export const getLoadingStyles = (
  size: DropdownSize,
  cssVars: any
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: cssVars.mutedForeground,
    fontStyle: 'italic',
  };

  const sizeStyles = (() => {
    switch (size) {
      case 'sm':
        return { padding: '12px', fontSize: '14px' };
      case 'lg':
        return { padding: '16px', fontSize: '16px' };
      case 'md':
      default:
        return { padding: '14px', fontSize: '14px' };
    }
  })();

  return { ...baseStyles, ...sizeStyles };
};

export const getEmptyStyles = (
  size: DropdownSize,
  cssVars: any
): React.CSSProperties => {
  return getLoadingStyles(size, cssVars);
};

export const getDividerStyles = (cssVars: any): React.CSSProperties => ({
  height: '1px',
  backgroundColor: cssVars.border,
  margin: '4px 0',
});

export const getGroupLabelStyles = (
  size: DropdownSize,
  cssVars: any
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    color: cssVars.mutedForeground,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.025em',
  };

  const sizeStyles = (() => {
    switch (size) {
      case 'sm':
        return {
          padding: '6px 12px 2px',
          fontSize: '11px',
        };
      case 'lg':
        return {
          padding: '10px 16px 4px',
          fontSize: '13px',
        };
      case 'md':
      default:
        return {
          padding: '8px 14px 3px',
          fontSize: '12px',
        };
    }
  })();

  return { ...baseStyles, ...sizeStyles };
};

export const getPlaceholderStyles = (cssVars: any, variant: DropdownVariant = 'outline'): React.CSSProperties => {
  // Determine placeholder color based on variant
  let placeholderColor = cssVars.mutedForeground; // default
  
  switch (variant) {
    case 'primary':
      placeholderColor = cssVars.primaryForeground;
      break;
    case 'secondary':
      placeholderColor = cssVars.secondaryForeground;
      break;
    case 'destructive':
      placeholderColor = cssVars.errorForeground;
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

export const getValueDisplayStyles = (): React.CSSProperties => ({
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  textAlign: 'left',
});

export const getMultiValueStyles = (
  size: DropdownSize,
  rounded: boolean,
  cssVars: any,
  variant: DropdownVariant = 'outline'
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    margin: '2px',
    maxWidth: '150px',
    overflow: 'hidden',
  };

  // Variant-specific colors for multi-value tags
  const variantStyles = (() => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: cssVars.primary + '20',
          color: cssVars.primary,
        };
      case 'secondary':
        return {
          backgroundColor: cssVars.secondary + '20',
          color: cssVars.secondary,
        };
      case 'destructive':
        return {
          backgroundColor: cssVars.error + '20',
          color: cssVars.error,
        };
      case 'outline':
      case 'ghost':
      default:
        return {
          backgroundColor: cssVars.primary + '20',
          color: cssVars.primary,
        };
    }
  })();

  const sizeStyles = (() => {
    switch (size) {
      case 'sm':
        return {
          padding: '2px 6px',
          fontSize: '12px',
          borderRadius: rounded ? '4px' : '2px',
        };
      case 'lg':
        return {
          padding: '4px 8px',
          fontSize: '14px',
          borderRadius: rounded ? '8px' : '4px',
        };
      case 'md':
      default:
        return {
          padding: '3px 7px',
          fontSize: '13px',
          borderRadius: rounded ? '6px' : '3px',
        };
    }
  })();

  return { ...baseStyles, ...variantStyles, ...sizeStyles };
};

export const getFocusStyles = (
  cssVars: any, 
  variant: DropdownVariant, 
  error?: boolean
): React.CSSProperties => {
  // Determine the focus outline color based on variant and error state
  let outlineColor = cssVars.primary; // default

  if (error) {
    outlineColor = cssVars.error;
  } else {
    switch (variant) {
      case 'primary':
        outlineColor = cssVars.primary;
        break;
      case 'secondary':
        outlineColor = cssVars.secondary;
        break;
      case 'destructive':
        outlineColor = cssVars.error;
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
    boxShadow: 'none',
  };
};
