import React from 'react';
import type { DropdownColor, DropdownVariant, DropdownSize, DropdownShape, DropdownPosition } from './Dropdown.types';

// Get color variables based on color prop
export const getColorVariables = (color: DropdownColor, customColor: string | undefined, cssVars: any) => {
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
      accent: cssVars.primaryAccent,
      shadow: cssVars.primaryShadow,
      disabled: cssVars.primaryDisabled,
      border: cssVars.primaryBorder,
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      accent: cssVars.secondaryAccent,
      shadow: cssVars.secondaryShadow,
      disabled: cssVars.secondaryDisabled,
      border: cssVars.secondaryBorder,
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      accent: cssVars.successAccent,
      shadow: cssVars.successShadow,
      disabled: cssVars.successDisabled,
      border: cssVars.successBorder,
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      accent: cssVars.warningAccent,
      shadow: cssVars.warningShadow,
      disabled: cssVars.warningDisabled,
      border: cssVars.warningBorder,
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      accent: cssVars.destructiveAccent,
      shadow: cssVars.destructiveShadow,
      disabled: cssVars.destructiveDisabled,
      border: cssVars.destructiveBorder,
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      accent: cssVars.infoAccent,
      shadow: cssVars.infoShadow,
      disabled: cssVars.infoDisabled,
      border: cssVars.infoBorder,
    },
  };

  return colorMap[color] || colorMap.primary;
};

// Get shape styles based on shape prop
export const getShapeStyles = (shape: DropdownShape): React.CSSProperties => {
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

export const createBaseStyles = (
  size: DropdownSize,
  shape: DropdownShape,
  animationsEnabled: boolean,
  width?: string | number,
  // Legacy support
  rounded?: boolean
): React.CSSProperties => {
  // Handle legacy rounded prop
  const finalShape = rounded !== undefined ? (rounded ? 'pill' : 'round') : shape;
  
  const baseStyles: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    width: width || '200px',
    minWidth: '120px',
    transition: animationsEnabled 
      ? 'width var(--duration-fast) var(--animation-smooth), opacity var(--duration-fast) var(--animation-smooth)' 
      : 'none',
    ...getShapeStyles(finalShape),
  };

  return baseStyles;
};

// Get size styles for dropdowns
export const getSizeStyles = (size: DropdownSize): React.CSSProperties => {
  const sizeMap = {
    xs: { paddingTop: '4px', paddingRight: '12px', paddingBottom: '4px', paddingLeft: '12px', fontSize: '14px', minHeight: '40px' },
    sm: { paddingTop: '6px', paddingRight: '12px', paddingBottom: '6px', paddingLeft: '12px', fontSize: '14px', minHeight: '40px' },
    md: { paddingTop: '8px', paddingRight: '16px', paddingBottom: '8px', paddingLeft: '16px', fontSize: '16px', minHeight: '48px' },
    lg: { paddingTop: '10px', paddingRight: '20px', paddingBottom: '10px', paddingLeft: '20px', fontSize: '16px', minHeight: '52px' },
    xl: { paddingTop: '12px', paddingRight: '24px', paddingBottom: '12px', paddingLeft: '24px', fontSize: '18px', minHeight: '60px' },
  };
  return sizeMap[size] || sizeMap.md;
};

export const getTriggerStyles = (
  color: DropdownColor,
  variant: DropdownVariant,
  size: DropdownSize,
  shape: DropdownShape,
  disabled: boolean,
  error: boolean,
  open: boolean,
  customColor: string | undefined,
  cssVars: any,
  animationsEnabled: boolean,
  // Legacy support
  rounded?: boolean
): React.CSSProperties => {
  const colors = getColorVariables(color, customColor, cssVars);
  const sizeStyles = getSizeStyles(size);
  const finalShape = rounded !== undefined ? (rounded ? 'pill' : 'round') : shape;

  // Base trigger styles
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    cursor: disabled ? 'not-allowed' : 'pointer',
    outline: 'none',
    fontFamily: 'inherit',
    transition: animationsEnabled
      ? 'background-color var(--duration-fast) var(--animation-smooth), color var(--duration-fast) var(--animation-smooth), border-top-color var(--duration-fast) var(--animation-smooth), border-right-color var(--duration-fast) var(--animation-smooth), border-bottom-color var(--duration-fast) var(--animation-smooth), border-left-color var(--duration-fast) var(--animation-smooth)'
      : 'none',
    position: 'relative',
    boxShadow: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    opacity: disabled ? 0.6 : 1,
    ...sizeStyles,
    ...getShapeStyles(finalShape),
  };

  // Base border styles (individual properties to avoid conflicts)
  const baseBorderStyles = {
    borderTopWidth: '1px',
    borderRightWidth: '1px',
    borderBottomWidth: '1px',
    borderLeftWidth: '1px',
    borderTopStyle: 'solid' as const,
    borderRightStyle: 'solid' as const,
    borderBottomStyle: 'solid' as const,
    borderLeftStyle: 'solid' as const,
  };

  // Variant-specific styles
  const variantStyles = (() => {
    switch (variant) {
      case 'solid':
        return {
          backgroundColor: colors.accent || colors.main,
          color: colors.foreground,
          borderTopColor: colors.accent || colors.main,
          borderRightColor: colors.accent || colors.main,
          borderBottomColor: colors.accent || colors.main,
          borderLeftColor: colors.accent || colors.main,
          ...baseBorderStyles,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: colors.main,
          borderTopColor: colors.main,
          borderRightColor: colors.main,
          borderBottomColor: colors.main,
          borderLeftColor: colors.main,
          ...baseBorderStyles,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: colors.main,
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
          ...baseBorderStyles,
        };
      case 'glassmorphic':
        // Create reflection gradient lines using the hover color with transparency
        const reflectionColor = colors.hover || colors.main || '#ffffff';
        const topReflectionGradient = `linear-gradient(135deg, transparent 0%, ${reflectionColor}20 20%, ${reflectionColor}15 25%, transparent 35%)`;
        const bottomReflectionGradient = `linear-gradient(135deg, transparent 45%, ${reflectionColor}25 55%, ${reflectionColor}20 65%, transparent 80%)`;
        
        return {
          background: `
            ${topReflectionGradient},
            ${bottomReflectionGradient},
            rgba(255, 255, 255, 0.1)
          `,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)', // Safari support
          color: colors.main,
          borderTopColor: 'rgba(255, 255, 255, 0.2)',
          borderRightColor: 'rgba(255, 255, 255, 0.2)',
          borderBottomColor: 'rgba(255, 255, 255, 0.2)',
          borderLeftColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: `0 8px 32px 0 ${colors.main}40`, // Use dropdown color with transparency for shadow
          position: 'relative',
          overflow: 'hidden',
          ...baseBorderStyles,
        };
      default:
        // Default case should behave like outline variant for consistency
        return {
          backgroundColor: 'transparent',
          color: colors.main,
          borderTopColor: colors.main,
          borderRightColor: colors.main,
          borderBottomColor: colors.main,
          borderLeftColor: colors.main,
          ...baseBorderStyles,
        };
    }
  })();

  // Error state override - use destructive styling for borders only, preserve text color
  if (error) {
    const destructiveColors = getColorVariables('destructive', undefined, cssVars);
    const destructiveVariantStyles = (() => {
      switch (variant) {
        case 'solid':
          return {
            backgroundColor: destructiveColors.accent || destructiveColors.main,
            // Keep original foreground color, not destructive
            color: colors.foreground,
            borderTopColor: destructiveColors.accent || destructiveColors.main,
            borderRightColor: destructiveColors.accent || destructiveColors.main,
            borderBottomColor: destructiveColors.accent || destructiveColors.main,
            borderLeftColor: destructiveColors.accent || destructiveColors.main,
            ...baseBorderStyles,
          };
        case 'outline':
          return {
            backgroundColor: 'transparent',
            // Keep original variant color, not destructive
            color: colors.main,
            borderTopColor: destructiveColors.main,
            borderRightColor: destructiveColors.main,
            borderBottomColor: destructiveColors.main,
            borderLeftColor: destructiveColors.main,
            ...baseBorderStyles,
          };
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            // Keep original variant color, not destructive
            color: colors.main,
            borderTopColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
            ...baseBorderStyles,
          };
        case 'glassmorphic':
          const reflectionColor = destructiveColors.hover || destructiveColors.main || '#ff0000';
          const topReflectionGradient = `linear-gradient(135deg, transparent 0%, ${reflectionColor}20 20%, ${reflectionColor}15 25%, transparent 35%)`;
          const bottomReflectionGradient = `linear-gradient(135deg, transparent 45%, ${reflectionColor}25 55%, ${reflectionColor}20 65%, transparent 80%)`;

          // Convert destructive color to rgba for consistent theming
          const destructiveMainColor = destructiveColors.main;
          let destructiveRgba = 'rgba(220, 50, 47, 0.1)'; // fallback
          if (destructiveMainColor && destructiveMainColor.startsWith('#')) {
            const hex = destructiveMainColor.replace('#', '');
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);
            destructiveRgba = `rgba(${r}, ${g}, ${b}, 0.1)`;
          }

          return {
            background: `
              ${topReflectionGradient},
              ${bottomReflectionGradient},
              ${destructiveRgba}
            `,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            // Keep original variant color, not destructive
            color: colors.main,
            borderTopColor: `${destructiveColors.main}33`, // 20% opacity
            borderRightColor: `${destructiveColors.main}33`,
            borderBottomColor: `${destructiveColors.main}33`,
            borderLeftColor: `${destructiveColors.main}33`,
            ...baseBorderStyles,
          };
        default:
          return {
            backgroundColor: 'transparent',
            // Keep original variant color, not destructive
            color: colors.main,
            borderTopColor: destructiveColors.main,
            borderRightColor: destructiveColors.main,
            borderBottomColor: destructiveColors.main,
            borderLeftColor: destructiveColors.main,
            ...baseBorderStyles,
          };
      }
    })();

    return {
      ...baseStyles,
      ...destructiveVariantStyles,
    } as React.CSSProperties;
  }

  return {
    ...baseStyles,
    ...variantStyles,
  } as React.CSSProperties;
};

export const getArrowStyles = (
  size: DropdownSize,
  open: boolean,
  animationsEnabled: boolean,
  cssVars: any,
  variant: DropdownVariant = 'outline',
  colors?: any
): React.CSSProperties => {
  // Determine arrow color based on variant
  let arrowColor = cssVars.foreground; // default
  
  if (colors) {
    switch (variant) {
      case 'solid':
        arrowColor = colors.foreground || cssVars.foreground;
        break;
      case 'outline':
        arrowColor = colors.main; // Match the text color in outline variant
        break;
      case 'ghost':
        arrowColor = colors.main; // Match the text color in ghost variant
        break;
      case 'glassmorphic':
        arrowColor = colors.main; // Match the text color in glassmorphic variant
        break;
      default:
        arrowColor = cssVars.foreground;
        break;
    }
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
    overflow: 'hidden',
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
  variant: DropdownVariant = 'outline',
  colors?: ReturnType<typeof getColorVariables>
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
    // Use the component's theme color background for selected state
    stateStyles.backgroundColor = colors?.background || cssVars.primaryBackground;
    stateStyles.color = colors?.main || cssVars.primary;
    stateStyles.fontWeight = '500';
  } else if (highlighted) {
    // Enhanced hover background logic for maximum visibility across all themes
    // Always use a semi-transparent overlay of the component's primary color
    // This ensures consistent, visible hover effects regardless of theme
    const primaryColor = colors?.main || cssVars.primary;

    // Convert hex to rgba for proper transparency
    let hoverBackground;
    if (primaryColor.startsWith('#')) {
      // Convert hex to rgba with 15% opacity for subtle but visible effect
      const hex = primaryColor.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      hoverBackground = `rgba(${r}, ${g}, ${b}, 0.15)`;
    } else {
      // Fallback for non-hex colors
      hoverBackground = cssVars.backgroundHover || cssVars.muted || primaryColor + '20';
    }

    stateStyles.backgroundColor = hoverBackground;
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
  // Use standard foreground colors
  const textColor = cssVars.foreground;
  const placeholderColor = cssVars.mutedForeground;

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

export const getPlaceholderStyles = (
  cssVars: any,
  variant: DropdownVariant = 'outline',
  colors?: ReturnType<typeof getColorVariables>
): React.CSSProperties => {
  // Use component's color scheme to match the variant and selected color
  let placeholderColor: string;

  switch (variant) {
    case 'solid':
      // For solid variant, use the foreground color (usually white/light on colored background)
      placeholderColor = colors?.foreground || cssVars.foreground;
      break;
    case 'outline':
    case 'ghost':
    case 'glassmorphic':
      // For outline, ghost, and glassmorphic variants, use the main component color
      placeholderColor = colors?.main || cssVars.primary;
      break;
    default:
      placeholderColor = colors?.main || cssVars.primary;
      break;
  }

  return {
    color: placeholderColor,
    opacity: 1,
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
  variant: DropdownVariant = 'outline',
  colors?: ReturnType<typeof getColorVariables>
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    margin: '2px',
    maxWidth: '150px',
    overflow: 'hidden',
  };

  // Use the component's theme color background (same as selected options)
  // Text color depends on variant: solid uses foreground, outline uses main color
  const textColor = variant === 'solid' 
    ? (colors?.foreground || cssVars.primaryForeground)
    : (colors?.main || cssVars.primary);
    
  const variantStyles = {
    backgroundColor: colors?.background || cssVars.primaryBackground,
    color: textColor,
  };

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
  error?: boolean,
  colors?: ReturnType<typeof getColorVariables>
): React.CSSProperties => {
  // Determine the focus outline color based on variant and error state
  let outlineColor: string;

  if (error) {
    outlineColor = cssVars.destructive;
  } else {
    // Use the component's theme color for focus
    outlineColor = colors?.main || cssVars.primary;
  }

  return {
    outline: `2px solid ${outlineColor}`,
    outlineOffset: '2px',
    // Don't change the border color on focus - keep original variant border
    boxShadow: 'none',
  };
};

// Get isometric animation styles for Dropdown
export const getIsometricStyles = (color: any, variant: DropdownVariant, shape: DropdownShape) => {
  // Ghost and glassmorphic variants don't support isometric animation
  if (variant === 'ghost' || variant === 'glassmorphic') {
    return {};
  }
  
  // For outline variant, use the main color. For solid, use foreground color.
  const borderColor = variant === 'outline' ? color.main : color.foreground || '#000000';
  
  const styles: any = {
    // Use individual border properties to avoid conflict with shorthand
    borderTopWidth: '1px',
    borderLeftWidth: '1px', 
    borderRightWidth: '1px',
    borderBottomWidth: '4px', // Smaller than Button/Card since Dropdown is more compact
    borderTopStyle: 'solid',
    borderLeftStyle: 'solid',
    borderRightStyle: 'solid',
    borderBottomStyle: 'solid',
    borderTopColor: borderColor,
    borderLeftColor: borderColor,
    borderRightColor: borderColor,
    borderBottomColor: borderColor,
    transform: 'translateY(0)',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    // Ensure proper box-sizing and prevent collapse
    boxSizing: 'border-box',
    position: 'relative',
    // Adjust padding to account for larger bottom border
    paddingBottom: '6px', // Reduce bottom padding to compensate for thicker border
  };
  
  return styles;
};
