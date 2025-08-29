import { CSSProperties } from 'react';
import { RadioButtonSize, RadioButtonVariant } from './RadioButton.types';

// Size configurations
export const getRadioButtonDimensions = (size: RadioButtonSize) => {
  switch (size) {
    case 'sm':
      return {
        size: 16,
        dotSize: 6,
        padding: 2,
      };
    case 'lg':
      return {
        size: 24,
        dotSize: 10,
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

// Get variant colors
export const getRadioButtonColors = (variant: RadioButtonVariant, checked: boolean, disabled: boolean, invalid: boolean, cssVars: any) => {
  // Handle invalid state first
  if (invalid) {
    return {
      border: cssVars.error,
      background: checked ? cssVars.error : cssVars.background,
      dot: cssVars.errorForeground || cssVars.background,
      variantColor: cssVars.error,
    };
  }

  // Get the variant's primary color
  let variantColor;
  let variantForeground;
  
  switch (variant) {
    case 'primary':
      variantColor = cssVars.primary;
      variantForeground = cssVars.primaryForeground;
      break;
    case 'secondary':
      variantColor = cssVars.secondary;
      variantForeground = cssVars.secondaryForeground;
      break;
    case 'success':
      variantColor = cssVars.success || cssVars.primary;
      variantForeground = cssVars.successForeground || cssVars.primaryForeground;
      break;
    case 'warning':
      variantColor = cssVars.warning || cssVars.primary;
      variantForeground = cssVars.warningForeground || cssVars.primaryForeground;
      break;
    case 'error':
      variantColor = cssVars.error;
      variantForeground = cssVars.errorForeground;
      break;
    default:
      variantColor = cssVars.primary;
      variantForeground = cssVars.primaryForeground;
  }

  if (!checked) {
    return {
      border: cssVars.border,
      background: cssVars.background,
      dot: 'transparent',
      variantColor,
    };
  }

  return {
    border: variantColor,
    background: variantColor,
    dot: variantForeground,
    variantColor,
  };
};

// Main radio button container styles
export const getRadioButtonContainerStyles = (
  size: RadioButtonSize,
  disabled: boolean,
  contentToggleable: boolean,
  className?: string
): CSSProperties => {
  return {
    display: 'inline-flex',
    alignItems: 'flex-start',
    gap: size === 'sm' ? '8px' : size === 'lg' ? '12px' : '10px',
    cursor: disabled ? 'not-allowed' : (contentToggleable ? 'pointer' : 'default'),
    fontFamily: 'inherit',
  };
};

// Radio button circle styles
export const getRadioButtonCircleStyles = (
  size: RadioButtonSize,
  variant: RadioButtonVariant,
  checked: boolean,
  disabled: boolean,
  focused: boolean,
  invalid: boolean,
  cssVars: any
): CSSProperties => {
  const dimensions = getRadioButtonDimensions(size);
  const colors = getRadioButtonColors(variant, checked, disabled, invalid, cssVars);
  
  return {
    position: 'relative',
    width: `${dimensions.size}px`,
    height: `${dimensions.size}px`,
    borderRadius: '50%',
    border: `2px solid ${colors.border}`,
    backgroundColor: colors.background,
    transition: 'border-color 0.2s ease-in-out, background-color 0.2s ease-in-out, opacity 0.2s ease-in-out',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    outline: focused ? `2px solid ${colors.variantColor}` : 'none',
    outlineOffset: '2px',
    boxShadow: focused ? `0 0 0 2px ${colors.variantColor}20` : 'none',
    flexShrink: 0,
    marginTop: size === 'sm' ? '1px' : size === 'lg' ? '2px' : '2px', // Align with first line of text
  };
};

// Radio button dot styles
export const getRadioButtonDotStyles = (
  size: RadioButtonSize,
  variant: RadioButtonVariant,
  checked: boolean,
  disabled: boolean,
  invalid: boolean,
  cssVars: any
): CSSProperties => {
  const dimensions = getRadioButtonDimensions(size);
  const colors = getRadioButtonColors(variant, checked, disabled, invalid, cssVars);
  
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: `${dimensions.dotSize}px`,
    height: `${dimensions.dotSize}px`,
    borderRadius: '50%',
    backgroundColor: colors.dot,
    transform: `translate(-50%, -50%) scale(${checked ? 1 : 0})`,
    transition: 'all 0.2s ease-in-out',
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
  invalid: boolean,
  labelPosition: 'left' | 'right',
  contentToggleable: boolean,
  cssVars: any
): CSSProperties => {
  const fontSize = size === 'sm' ? '14px' : size === 'lg' ? '16px' : '15px';
  const order = labelPosition === 'left' ? -1 : 1;
  
  return {
    fontSize,
    fontWeight: 500,
    color: disabled ? cssVars.mutedForeground : (invalid ? cssVars.error : cssVars.foreground),
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
  invalid: boolean,
  contentToggleable: boolean,
  cssVars: any
): CSSProperties => {
  const fontSize = size === 'sm' ? '12px' : size === 'lg' ? '14px' : '13px';
  
  return {
    fontSize,
    color: disabled ? cssVars.mutedForeground : (invalid ? cssVars.error : cssVars.mutedForeground),
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
