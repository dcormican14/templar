import React from 'react';
import type { CheckBoxVariant, CheckBoxSize } from './CheckBox.types';

export const getVariantStyles = (variant: CheckBoxVariant, cssVars: any, checked: boolean, error: boolean): React.CSSProperties => {
  if (error) {
    return {
      borderColor: checked ? cssVars.error : 'transparent',
      backgroundColor: checked ? cssVars.error : cssVars.background,
      color: cssVars.errorForeground,
      borderWidth: checked ? '1px' : '0px',
      borderStyle: 'solid' as const,
    };
  }

  const baseStyles = {
    borderWidth: checked ? '1px' : '0px',
    borderStyle: 'solid' as const,
  };

  switch (variant) {
    case 'primary':
      return {
        borderColor: checked ? cssVars.primary : 'transparent',
        backgroundColor: checked ? cssVars.primary : cssVars.background,
        color: cssVars.primaryForeground,
        ...baseStyles,
      };
    case 'secondary':
      return {
        borderColor: checked ? cssVars.secondary : 'transparent',
        backgroundColor: checked ? cssVars.secondary : cssVars.background,
        color: cssVars.secondaryForeground,
        ...baseStyles,
      };
    case 'success':
      return {
        borderColor: checked ? cssVars.success : 'transparent',
        backgroundColor: checked ? cssVars.success : cssVars.background,
        color: cssVars.successForeground,
        ...baseStyles,
      };
    case 'warning':
      return {
        borderColor: checked ? cssVars.warning : 'transparent',
        backgroundColor: checked ? cssVars.warning : cssVars.background,
        color: cssVars.warningForeground,
        ...baseStyles,
      };
    case 'error':
      return {
        borderColor: checked ? cssVars.error : 'transparent',
        backgroundColor: checked ? cssVars.error : cssVars.background,
        color: cssVars.errorForeground,
        ...baseStyles,
      };
    case 'default':
    default:
      return {
        borderColor: checked ? cssVars.primary : 'transparent',
        backgroundColor: checked ? cssVars.primary : cssVars.background,
        color: cssVars.primaryForeground,
        ...baseStyles,
      };
  }
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
  rounded: boolean,
  size: CheckBoxSize,
  animationsEnabled: boolean
): React.CSSProperties => {
  // Smaller radius for smaller checkboxes
  const getBorderRadius = () => {
    if (rounded) return '24px';
    
    switch (size) {
      case 'xs':
        return '4px';
      case 'sm':
      case 'md':
        return '6px';
      case 'lg':
      case 'xl':
        return '8px';
      default:
        return '8px';
    }
  };

  return {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    borderRadius: getBorderRadius(),
    transition: animationsEnabled ? 'background-color 0.2s ease-in-out, color 0.2s ease-in-out, opacity 0.2s ease-in-out' : 'none',
    outline: 'none',
    flexShrink: 0,
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
  cssVars: any, 
  variant: CheckBoxVariant, 
  error: boolean
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
      case 'success':
        outlineColor = cssVars.success;
        break;
      case 'warning':
        outlineColor = cssVars.warning;
        break;
      case 'error':
        outlineColor = cssVars.error;
        break;
      case 'default':
      default:
        outlineColor = cssVars.primary;
        break;
    }
  }

  return {
    outline: `2px solid ${outlineColor}`,
    outlineOffset: '2px',
  };
};
