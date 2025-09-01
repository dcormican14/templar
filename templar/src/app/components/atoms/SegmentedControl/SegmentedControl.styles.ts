import { SegmentedControlSize, SegmentedControlVariant } from './SegmentedControl.types';

// Helper function to get variant color for selected text
export const getVariantColor = (variant: SegmentedControlVariant, cssVars: any): string => {
  switch (variant) {
    case 'primary':
      return cssVars.primary;
    case 'secondary':
      return cssVars.secondary;
    case 'outline':
      return cssVars.primary;
    case 'ghost':
      return cssVars.primary;
    case 'destructive':
      return cssVars.destructive;
    case 'warning':
      return cssVars.warning;
    case 'success':
      return cssVars.success;
    default:
      return cssVars.primary;
  }
};

export const getContainerStyles = (
  fullWidth: boolean,
  disabled: boolean,
  rounded: boolean,
  itemCount: number,
  cssVars: any
): React.CSSProperties => ({
  position: 'relative',
  display: 'inline-flex',
  backgroundColor: cssVars.muted,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: cssVars.border,
  borderRadius: rounded ? '24px' : '12px',
  padding: '4px',
  width: fullWidth ? '100%' : `${itemCount * 120}px`, // Fixed width based on item count
  opacity: disabled ? 0.5 : 1,
  cursor: disabled ? 'not-allowed' : 'auto',
  boxSizing: 'border-box',
});

export const getSizeStyles = (size: SegmentedControlSize): React.CSSProperties => {
  const sizeMap = {
    xs: { height: '40px' },
    sm: { height: '40px' },
    md: { height: '48px' },
    lg: { height: '52px' },
    xl: { height: '60px' },
  };
  
  return sizeMap[size];
};

export const getSegmentStyles = (
  size: SegmentedControlSize,
  isSelected: boolean,
  disabled: boolean,
  rounded: boolean,
  variant: SegmentedControlVariant,
  cssVars: any
): React.CSSProperties => {
  const fontSizeMap = {
    xs: '14px',
    sm: '14px',
    md: '16px',
    lg: '16px',
    xl: '18px',
  };

  return {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
    fontSize: fontSizeMap[size],
    fontWeight: isSelected ? '600' : '400',
    color: isSelected ? getVariantColor(variant, cssVars) : cssVars.mutedForeground,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'color 0.2s ease-in-out, font-weight 0.2s ease-in-out',
    borderRadius: rounded ? '20px' : '8px',
    border: 'none',
    backgroundColor: 'transparent',
    padding: '0 16px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    userSelect: 'none',
    outline: 'none',
    minWidth: 0,
    boxSizing: 'border-box',
  };
};

export const getIndicatorStyles = (
  selectedIndex: number,
  itemCount: number,
  variant: SegmentedControlVariant,
  rounded: boolean,
  cssVars: any
): React.CSSProperties => {
  const translateX = `${selectedIndex * 100}%`;
  
  const variantStyles = {
    primary: {
      backgroundColor: cssVars.secondaryForeground,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: cssVars.border,
      boxShadow: `0 1px 2px ${cssVars.shadowSm}`,
    },
    secondary: {
      backgroundColor: cssVars.secondaryForeground,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: cssVars.border,
      boxShadow: `0 1px 2px ${cssVars.shadowSm}`,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: cssVars.primary,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    destructive: {
      backgroundColor: cssVars.secondaryForeground,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: cssVars.border,
      boxShadow: `0 1px 2px ${cssVars.shadowSm}`,
    },
    warning: {
      backgroundColor: cssVars.secondaryForeground,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: cssVars.border,
      boxShadow: `0 1px 2px ${cssVars.shadowSm}`,
    },
    success: {
      backgroundColor: cssVars.secondaryForeground,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: cssVars.border,
      boxShadow: `0 1px 2px ${cssVars.shadowSm}`,
    },
  };

  return {
    position: 'absolute',
    top: '6px',
    left: '6px',
    width: `calc((100% - 12px) / ${itemCount})`,
    height: 'calc(100% - 12px)',
    borderRadius: rounded ? '20px' : '8px',
    transform: `translateX(${translateX})`,
    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    zIndex: 1,
    ...variantStyles[variant],
  };
};

export const getVariantStyles = (variant: SegmentedControlVariant, cssVars: any) => {
  const variantMap = {
    primary: {
      // Container background is consistent across all variants
    },
    secondary: {
      // Container background is consistent across all variants
    },
    outline: {
      // Outline variant has transparent background with no border
      backgroundColor: 'transparent',
      borderWidth: '0',
    },
    ghost: {
      // Ghost variant has transparent background and no border
      backgroundColor: 'transparent',
      borderWidth: '0',
    },
    destructive: {
      // Container background is consistent across all variants
    },
    warning: {
      // Container background is consistent across all variants
    },
    success: {
      // Container background is consistent across all variants
    },
  };

  return variantMap[variant];
};