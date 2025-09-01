import { CSSProperties } from 'react';
import { RadioButtonSize, RadioButtonColor, RadioButtonShape } from './RadioButton.types';

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

  const colorMap = {
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
    display: 'inline-flex',
    alignItems: 'flex-start',
    gap: gapMap[size],
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
  checked: boolean,
  disabled: boolean,
  focused: boolean,
  error: boolean,
  animationsEnabled: boolean,
  cssVars: any
): CSSProperties => {
  const dimensions = getRadioButtonDimensions(size);
  const colors = getRadioButtonColors(color, customColor, checked, disabled, error, cssVars);
  
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
  
  return {
    position: 'relative',
    width: `${dimensions.size}px`,
    height: `${dimensions.size}px`,
    borderRadius: getBorderRadius(),
    border: `2px solid ${colors.border}`,
    backgroundColor: colors.background,
    transition: animationsEnabled
      ? 'border-color var(--duration-fast) var(--animation-smooth), background-color var(--duration-fast) var(--animation-smooth), opacity var(--duration-fast) var(--animation-smooth)'
      : 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    outline: focused ? `2px solid ${colors.variantColor}` : 'none',
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
  checked: boolean,
  disabled: boolean,
  error: boolean,
  animationsEnabled: boolean,
  cssVars: any
): CSSProperties => {
  const dimensions = getRadioButtonDimensions(size);
  const colors = getRadioButtonColors(color, customColor, checked, disabled, error, cssVars);
  
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
  
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: `${dimensions.dotSize}px`,
    height: `${dimensions.dotSize}px`,
    borderRadius: getDotRadius(),
    backgroundColor: colors.dot,
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

// Description styles
export const getDescriptionStyles = (
  size: RadioButtonSize,
  disabled: boolean,
  error: boolean,
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
  
  return {
    fontSize: fontSizeMap[size],
    color: disabled ? cssVars.mutedForeground : (error ? cssVars.destructive : cssVars.mutedForeground),
    marginTop: '2px',
    lineHeight: 1.3,
    userSelect: 'none',
    cursor: disabled ? 'not-allowed' : (contentToggleable ? 'pointer' : 'default'),
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
