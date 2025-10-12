import { CSSProperties } from 'react';
import { RadioButtonSize, RadioButtonColor, RadioButtonShape, RadioButtonVariant } from './RadioButton.types';

// Get color variables based on color prop
export const getColorVariables = (color: RadioButtonColor, customColor: string | undefined, cssVars: any) => {
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

// Get variant styles for radio button
export const getVariantStyles = (
  variant: RadioButtonVariant,
  color: RadioButtonColor,
  customColor: string | undefined,
  cssVars: any,
  checked: boolean,
  error: boolean
): CSSProperties => {
  const colors = getColorVariables(color, customColor, cssVars);

  // Error state override (matching Search component)
  if (error) {
    const baseErrorStyle = {
      borderWidth: '2px',
      borderStyle: 'solid' as const,
    };

    switch (variant) {
      case 'solid':
        return {
          ...baseErrorStyle,
          borderColor: cssVars.destructive,
          backgroundColor: checked ? cssVars.destructive : (cssVars.destructiveAccent || cssVars.destructive),
        };
      case 'ghost':
        return {
          ...baseErrorStyle,
          borderColor: cssVars.destructive,
          backgroundColor: checked ? cssVars.destructive : 'transparent',
        };
      case 'glassmorphic':
        return {
          ...baseErrorStyle,
          borderColor: cssVars.destructive,
          backgroundColor: checked ? cssVars.destructive : cssVars.destructiveBackground,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        };
      case 'outline':
      default:
        return {
          ...baseErrorStyle,
          borderColor: cssVars.destructive,
          backgroundColor: checked ? cssVars.destructive : cssVars.background,
        };
    }
  }

  // Normal state styles by variant (matching Search component)
  switch (variant) {
    case 'solid':
      return {
        borderColor: checked ? (colors.accent || colors.main) : cssVars.mutedForeground,
        backgroundColor: checked ? (colors.accent || colors.main) : cssVars.mutedForeground,
        borderWidth: '2px',
        borderStyle: 'solid' as const,
      };
    case 'ghost':
      return {
        borderColor: checked ? colors.main : 'transparent',
        backgroundColor: checked ? colors.main : 'transparent',
        borderWidth: '2px',
        borderStyle: 'solid' as const,
      };
    case 'glassmorphic':
      return {
        borderColor: checked ? colors.main : colors.border,
        backgroundColor: checked ? colors.main : colors.background,
        borderWidth: '2px',
        borderStyle: 'solid' as const,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      };
    case 'outline':
    default:
      return {
        borderColor: checked ? colors.main : colors.main,
        backgroundColor: checked ? colors.main : cssVars.background,
        borderWidth: '2px',
        borderStyle: 'solid' as const,
      };
  }
};

// Size configurations
export const getRadioButtonDimensions = (size: RadioButtonSize) => {
  switch (size) {
    case 'xs':
      return {
        size: 16,
        dotSize: 6,
        padding: 2,
      };
    case 'sm':
      return {
        size: 18,
        dotSize: 6,
        padding: 2,
      };
    case 'lg':
      return {
        size: 24,
        dotSize: 10,
        padding: 3,
      };
    case 'xl':
      return {
        size: 28,
        dotSize: 12,
        padding: 3,
      };
    case 'md':
    default:
      return {
        size: 20,
        dotSize: 8,
        padding: 2,
      };
  }
};

// Get radio button colors
export const getRadioButtonColors = (
  color: RadioButtonColor,
  customColor: string | undefined,
  checked: boolean,
  disabled: boolean,
  error: boolean,
  cssVars: any
) => {
  // Handle error state first
  if (error) {
    return {
      border: cssVars.destructive,
      background: checked ? cssVars.destructive : cssVars.background,
      dot: cssVars.destructiveForeground || cssVars.background,
      variantColor: cssVars.destructive,
    };
  }

  const colors = getColorVariables(color, customColor, cssVars);

  if (!checked) {
    return {
      border: cssVars.border,
      background: cssVars.background,
      dot: 'transparent',
      variantColor: colors.main,
    };
  }

  return {
    border: colors.main,
    background: colors.main,
    dot: colors.foreground,
    variantColor: colors.main,
  };
};

// Main radio button container styles
export const getRadioButtonContainerStyles = (
  size: RadioButtonSize,
  disabled: boolean,
  contentToggleable: boolean,
  className?: string
): CSSProperties => {
  const gapMap = {
    xs: '6px',
    sm: '8px',
    md: '10px',
    lg: '12px',
    xl: '14px',
  };

  return {
    display: 'inline-block',
    cursor: disabled ? 'not-allowed' : (contentToggleable ? 'pointer' : 'default'),
    fontFamily: 'inherit',
  };
};

// Radio button circle styles
export const getRadioButtonCircleStyles = (
  size: RadioButtonSize,
  color: RadioButtonColor,
  customColor: string | undefined,
  shape: RadioButtonShape,
  variant: RadioButtonVariant,
  checked: boolean,
  disabled: boolean,
  focused: boolean,
  error: boolean,
  animationsEnabled: boolean,
  cssVars: any
): CSSProperties => {
  const dimensions = getRadioButtonDimensions(size);
  const variantStyles = getVariantStyles(variant, color, customColor, cssVars, checked, error);

  const getBorderRadius = () => {
    switch (shape) {
      case 'sharp':
        return '0';
      case 'round':
        return '12px';
      case 'pill':
      default:
        return '50%';
    }
  };

  const getMarginTop = () => {
    const marginMap = {
      xs: '1px',
      sm: '1px',
      md: '2px',
      lg: '2px',
      xl: '3px',
    };
    return marginMap[size];
  };

  const colors = getColorVariables(color, customColor, cssVars);

  return {
    position: 'relative',
    width: `${dimensions.size}px`,
    height: `${dimensions.size}px`,
    borderRadius: getBorderRadius(),
    ...variantStyles,
    transition: animationsEnabled
      ? 'border-color var(--duration-fast) var(--animation-smooth), background-color var(--duration-fast) var(--animation-smooth), opacity var(--duration-fast) var(--animation-smooth)'
      : 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    outline: focused ? `2px solid ${colors.main}` : 'none',
    outlineOffset: '2px',
    flexShrink: 0,
    marginTop: getMarginTop(),
  };
};

// Radio button dot styles
export const getRadioButtonDotStyles = (
  size: RadioButtonSize,
  color: RadioButtonColor,
  customColor: string | undefined,
  shape: RadioButtonShape,
  variant: RadioButtonVariant,
  checked: boolean,
  disabled: boolean,
  error: boolean,
  animationsEnabled: boolean,
  cssVars: any
): CSSProperties => {
  const dimensions = getRadioButtonDimensions(size);
  const colors = getColorVariables(color, customColor, cssVars);

  const getDotRadius = () => {
    switch (shape) {
      case 'sharp':
        return '0';
      case 'round':
        return '6px';
      case 'pill':
      default:
        return '50%';
    }
  };

  // Get dot color based on variant and state
  const getDotColor = () => {
    if (!checked) return 'transparent';

    if (error) {
      return cssVars.destructiveForeground || cssVars.background;
    }

    switch (variant) {
      case 'solid':
      case 'ghost':
      case 'glassmorphic':
        return colors.foreground || cssVars.background;
      case 'outline':
      default:
        return colors.foreground || cssVars.background;
    }
  };

  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: `${dimensions.dotSize}px`,
    height: `${dimensions.dotSize}px`,
    borderRadius: getDotRadius(),
    backgroundColor: getDotColor(),
    transform: `translate(-50%, -50%) scale(${checked ? 1 : 0})`,
    transition: animationsEnabled
      ? 'all var(--duration-fast) var(--animation-spring)'
      : 'none',
  };
};

// Hidden input styles
export const getHiddenInputStyles = (): CSSProperties => ({
  position: 'absolute',
  opacity: 0,
  width: 0,
  height: 0,
  margin: 0,
  padding: 0,
  border: 'none',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  clip: 'rect(0, 0, 0, 0)',
});

// Label styles
export const getLabelStyles = (
  size: RadioButtonSize,
  disabled: boolean,
  error: boolean,
  labelPosition: 'left' | 'right',
  contentToggleable: boolean,
  cssVars: any
): CSSProperties => {
  const fontSizeMap = {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
  };
  
  const order = labelPosition === 'left' ? -1 : 1;
  
  return {
    fontSize: fontSizeMap[size],
    fontWeight: 500,
    color: disabled ? cssVars.mutedForeground : (error ? cssVars.destructive : cssVars.foreground),
    order,
    userSelect: 'none',
    lineHeight: 1.4,
    cursor: disabled ? 'not-allowed' : (contentToggleable ? 'pointer' : 'default'),
  };
};

// Header styles
export const getHeaderStyles = (
  size: RadioButtonSize,
  color: RadioButtonColor,
  customColor: string | undefined,
  disabled: boolean,
  error: boolean,
  checked: boolean,
  contentToggleable: boolean,
  cssVars: any
): CSSProperties => {
  const fontSizeMap = {
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '18px',
  };

  // Get the color that matches the selected element
  const colors = getColorVariables(color, customColor, cssVars);
  let headerColor;

  if (disabled) {
    headerColor = cssVars.mutedForeground;
  } else if (error) {
    headerColor = cssVars.destructive;
  } else if (checked) {
    headerColor = colors.main; // Use the same color as the selected radio button
  } else {
    headerColor = cssVars.foreground;
  }

  return {
    fontSize: fontSizeMap[size],
    color: headerColor,
    marginBottom: '8px',
    lineHeight: 1.3,
    userSelect: 'none',
    cursor: disabled ? 'not-allowed' : (contentToggleable ? 'pointer' : 'default'),
    fontWeight: '500',
  };
};

// Label container styles (for label + description)
export const getLabelContainerStyles = (
  position: 'left' | 'right'
): CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  order: position === 'left' ? -1 : 1,
});

// Radio button group styles
export const getRadioButtonGroupStyles = (
  orientation: 'horizontal' | 'vertical'
): CSSProperties => ({
  display: 'flex',
  flexDirection: orientation === 'horizontal' ? 'row' : 'column',
  gap: orientation === 'horizontal' ? '16px' : '12px',
  alignItems: orientation === 'horizontal' ? 'center' : 'stretch',
});
