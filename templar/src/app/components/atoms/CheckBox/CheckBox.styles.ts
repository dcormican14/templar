import React from 'react';
import type { CheckBoxColor, CheckBoxSize, CheckBoxShape } from './CheckBox.types';

// Get color variables based on color prop
export const getColorVariables = (color: CheckBoxColor, customColor: string | undefined, cssVars: any) => {
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

// Get shape styles based on shape prop
export const getShapeStyles = (shape: CheckBoxShape): React.CSSProperties => {
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

export const getVariantStyles = (
  color: CheckBoxColor,
  customColor: string | undefined,
  cssVars: any, 
  checked: boolean, 
  error: boolean
): React.CSSProperties => {
  const colors = getColorVariables(color, customColor, cssVars);

  // Error state override
  if (error) {
    return {
      borderColor: checked ? cssVars.destructive : cssVars.destructive,
      backgroundColor: checked ? cssVars.destructive : cssVars.background,
      color: cssVars.destructiveForeground,
      borderWidth: '1px',
      borderStyle: 'solid' as const,
    };
  }

  // Normal state styles
  return {
    borderColor: checked ? colors.main : cssVars.border,
    backgroundColor: checked ? colors.main : cssVars.background,
    color: colors.foreground,
    borderWidth: '1px',
    borderStyle: 'solid' as const,
  };
};

export const getSizeStyles = (size: CheckBoxSize): React.CSSProperties => {
  const sizeMap = {
    xs: {
      width: '16px',
      height: '16px',
      fontSize: '10px',
    },
    sm: {
      width: '18px',
      height: '18px',
      fontSize: '12px',
    },
    md: {
      width: '20px',
      height: '20px',
      fontSize: '14px',
    },
    lg: {
      width: '24px',
      height: '24px',
      fontSize: '16px',
    },
    xl: {
      width: '28px',
      height: '28px',
      fontSize: '18px',
    },
  };
  return sizeMap[size];
};

export const createBaseStyles = (
  disabled: boolean,
  shape: CheckBoxShape,
  animationsEnabled: boolean,
  // Legacy support
  rounded?: boolean
): React.CSSProperties => {
  // Handle legacy rounded prop
  const finalShape = rounded !== undefined ? (rounded ? 'pill' : 'round') : shape;
  
  return {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: animationsEnabled 
      ? 'background-color var(--duration-fast) var(--animation-smooth), color var(--duration-fast) var(--animation-smooth), border-color var(--duration-fast) var(--animation-smooth), opacity var(--duration-fast) var(--animation-smooth)'
      : 'none',
    outline: 'none',
    flexShrink: 0,
    ...getShapeStyles(finalShape),
  };
};

export const getInputStyles = (): React.CSSProperties => ({
  position: 'absolute',
  opacity: 0,
  width: '100%',
  height: '100%',
  margin: 0,
  cursor: 'inherit',
});

export const getLabelStyles = (cssVars: any, size: CheckBoxSize, disabled: boolean, contentToggleable: boolean): React.CSSProperties => {
  const fontSizeMap = {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
  };

  return {
    marginLeft: '8px',
    fontSize: fontSizeMap[size],
    color: disabled ? cssVars.mutedForeground : cssVars.foreground,
    cursor: contentToggleable ? (disabled ? 'not-allowed' : 'pointer') : 'default',
    userSelect: 'none',
  };
};

export const getDescriptionStyles = (cssVars: any, size: CheckBoxSize, disabled: boolean, contentToggleable: boolean): React.CSSProperties => {
  const fontSizeMap = {
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '18px',
  };

  return {
    marginTop: '4px',
    marginLeft: size === 'xs' ? '24px' : size === 'sm' ? '26px' : size === 'md' ? '28px' : size === 'lg' ? '32px' : '36px',
    fontSize: fontSizeMap[size],
    color: cssVars.mutedForeground,
    lineHeight: '1.4',
    cursor: contentToggleable ? (disabled ? 'not-allowed' : 'pointer') : 'default',
    userSelect: 'none',
  };
};

export const getWrapperStyles = (): React.CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

export const getCheckboxWrapperStyles = (): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
});

export const getFocusStyles = (
  color: CheckBoxColor,
  customColor: string | undefined,
  cssVars: any,
  error: boolean
): React.CSSProperties => {
  let outlineColor = cssVars.primary; // default

  if (error) {
    outlineColor = cssVars.destructive;
  } else {
    const colors = getColorVariables(color, customColor, cssVars);
    outlineColor = colors.main;
  }

  return {
    outline: `2px solid ${outlineColor}`,
    outlineOffset: '2px',
  };
};
